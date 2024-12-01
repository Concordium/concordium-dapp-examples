import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Buffer } from 'buffer/';
import JSONbig from 'json-bigint';

import { WalletConnection, typeSchemaFromBase64 } from '@concordium/wallet-connectors';
import { useGrpcClient } from '@concordium/react-components';
import { AccountAddress, Timestamp } from '@concordium/web-sdk';

import { TxHashLink } from '@/components/CCDScanLinks';
import * as constants from '.././constants';
import { getItemState, nonceOf } from '../track_and_trace_contract';
import * as TrackAndTraceContract from '../../generated/module_track_and_trace'; // Code generated from a smart contract module. The naming convention of the generated file is `moduleName_smartContractName`.
import { ToTokenIdU64, fetchIPFSMetadata, fetchJson, getLocation, objectToBytes } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/Alert';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LocationPicker } from '@/components/LocationPicker';
import { LocationDetector } from '@/components/LocationDetector';
import { PinataSDK } from 'pinata';
import { Loader2 } from 'lucide-react';
import { ItemStatus } from '@/lib/itemEvents';
import { InputFile } from '@/components/InputFile';

interface Props {
    connection: WalletConnection | undefined;
    accountAddress: string | undefined;
    activeConnectorError: string | undefined;
    pinata: PinataSDK;
}

const NEW_STATUS_OPTIONS = [
    { label: 'Produced', value: 'Produced' },
    { label: 'InTransit', value: 'InTransit' },
    { label: 'InStore', value: 'InStore' },
    { label: 'Sold', value: 'Sold' },
];

function generateMessage(
    itemID: number | bigint,
    expiryTimeSignature: Date,
    nonce: number | bigint,
    newStatus: ItemStatus,
    newMetadataUrl: string | undefined,
    newLocation: string | undefined,
) {
    try {
        // if (newStatus === '') {
        //     throw Error(`'newStatus' input field is undefined`);
        // }

        // The `item_id` is of type `TokenIdU64` in the smart contract which is represented as a little-endian hex string.
        // E.g. the `TokenIdU64` representation of `1` is the hex string `0100000000000000`.
        const tokenIdU64 = ToTokenIdU64(itemID);

        // Create ChangeItemStatus parameter
        const changeItemStatusParameter: TrackAndTraceContract.ChangeItemStatusParameter = {
            additional_data: {
                bytes: objectToBytes({ currentLocation: newLocation }),
            },
            item_id: tokenIdU64,
            new_status: {
                type: newStatus,
            },
            new_metadata_url: newMetadataUrl
                ? { type: 'Some', content: { url: newMetadataUrl, hash: { type: 'None' } } }
                : { type: 'None' },
        };

        const payload = TrackAndTraceContract.createChangeItemStatusParameter(changeItemStatusParameter);

        const message: TrackAndTraceContract.SerializationHelperParameter = {
            contract_address: constants.CONTRACT_ADDRESS,
            nonce: Number(nonce),
            timestamp: Timestamp.fromDate(expiryTimeSignature),
            entry_point: 'changeItemStatus',
            payload: Array.from(payload.buffer),
        };

        const serializedMessage = TrackAndTraceContract.createSerializationHelperParameter(message);

        return [payload, serializedMessage];
    } catch (error) {
        throw new Error(`Generating message failed. Orginal error: ${(error as Error).message}`);
    }
}

export function ChangeItemStatus(props: Props) {
    const { connection, accountAddress, activeConnectorError, pinata } = props;

    interface FormType {
        itemID: string;
        newLocation: string;
        newStatus: ItemStatus;
        newMetadataUrl: string;
        productImages: File[];
    }

    const form = useForm<FormType>({
        mode: 'all',
        defaultValues: { itemID: '', newLocation: '', newStatus: 'Produced', newMetadataUrl: '', productImages: [] },
    });

    const [txHash, setTxHash] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState<string | undefined>(undefined);
    const [nextNonce, setNextNonce] = useState<number | bigint>(0);

    const grpcClient = useGrpcClient(constants.NETWORK);

    /**
     * This function querries the nonce (CIS3 standard) of an acccount in the track-and-trace contract.
     */
    const refreshNonce = useCallback(() => {
        if (grpcClient && accountAddress) {
            const nonceOfParam: TrackAndTraceContract.NonceOfParameter = [AccountAddress.fromBase58(accountAddress)];

            nonceOf(nonceOfParam)
                .then((nonceValue: TrackAndTraceContract.ReturnValueNonceOf) => {
                    if (nonceValue !== undefined) {
                        setNextNonce(nonceValue[0]);
                    }
                    setError(undefined);
                })
                .catch((e) => {
                    setError((e as Error).message);
                    setNextNonce(0);
                });
        }
    }, [grpcClient, accountAddress]);

    useEffect(() => {
        refreshNonce();
        // Refresh the next nonce value periodically.
        const interval = setInterval(refreshNonce, constants.REFRESH_INTERVAL.asMilliseconds());
        return () => clearInterval(interval);
    }, [refreshNonce]);

    function onDetectLocation() {
        getLocation(
            (location) => form.setValue('newLocation', `${location.latitude},${location.longitude}`),
            (error) => setError(error),
        );
    }

    function onSaveLocation(location: string) {
        form.setValue('newLocation', location);
    }

    async function onSubmit(values: FormType) {
        setError(undefined);

        // if (values.newStatus === "") {
        //     setError(`'newStatus' input field is undefined`);
        //     throw Error(`'newStatus' input field is undefined`);
        // }
        if (values.itemID === '') {
            setError(`'itemID' input field is undefined`);
            throw Error(`'itemID' input field is undefined`);
        }

        // Signatures should expire in one day. Add 1 day to the current time.
        const expiryTimeSignature = new Date();
        expiryTimeSignature.setTime(expiryTimeSignature.getTime() + 86400 * 1000);

        if (connection && accountAddress) {
            setIsLoading(true);

            let newMetadataUrl: string | undefined;
            if (values.newMetadataUrl != '') {
                let newMetadata: Record<string, unknown> | undefined;

                try {
                    newMetadata = await fetchJson(values.newMetadataUrl);
                } catch (e) {
                    setError((e as Error).message);
                    return;
                }

                if (!(values.productImages.length > 0)) {
                    const itemState = await getItemState(ToTokenIdU64(Number(values.itemID)));

                    if (itemState.metadata_url.type === 'Some') {
                        const currentMetadata = await fetchIPFSMetadata(itemState.metadata_url.content.url, pinata);

                        if (currentMetadata.imageUrl) {
                            newMetadata = {
                                ...newMetadata,
                                imageUrl: currentMetadata.imageUrl,
                            };
                        }
                    }
                } else {
                    try {
                        const imageCid = (await pinata.upload.file(values.productImages[0])).cid;
                        newMetadata = {
                            ...newMetadata,
                            imageUrl: `ipfs://${imageCid}`,
                        };
                    } catch (e) {
                        setError((e as Error).message);
                        return;
                    }
                }

                if (newMetadata) {
                    try {
                        const metadataCid = (await pinata.upload.json(newMetadata)).cid;
                        newMetadataUrl = `ipfs://${metadataCid}`;
                    } catch (e) {
                        setError((e as Error).message);
                        setIsLoading(false);
                        return;
                    }
                }
            }

            const [payload, serializedMessage] = generateMessage(
                Number(values.itemID),
                expiryTimeSignature,
                nextNonce,
                values.newStatus,
                newMetadataUrl,
                values.newLocation || undefined,
            );

            const permitSignature = await connection.signMessage(accountAddress, {
                type: 'BinaryMessage',
                value: Buffer.from(serializedMessage.buffer),
                schema: typeSchemaFromBase64(constants.SERIALIZATION_HELPER_SCHEMA_PERMIT_MESSAGE),
            });

            const response = await fetch(constants.SPONSORED_TRANSACTION_BACKEND + `api/submitTransaction`, {
                method: 'POST',
                headers: new Headers({ 'content-type': 'application/json' }),
                body: JSONbig.stringify({
                    signer: accountAddress,
                    nonce: Number(nextNonce),
                    signature: permitSignature[0][0],
                    // RFC 3339 format (e.g. 2030-08-08T05:15:00Z)
                    expiryTime: expiryTimeSignature.toISOString(),
                    contractAddress: constants.CONTRACT_ADDRESS,
                    contractName: TrackAndTraceContract.contractName.value,
                    entrypointName: 'changeItemStatus',
                    parameter: Buffer.from(payload.buffer).toString('hex'),
                }),
            });

            if (!response.ok) {
                const error = (await response.json()) as Error;
                throw new Error(`Unable to get txHash from backend: ${JSON.stringify(error)}`);
            }
            const txHash = (await response.json()) as string;

            if (txHash) {
                setTxHash(txHash);
                form.reset();
            } else {
                throw new Error(`Unable to get txHash from backend`);
            }
        } else {
            setError(`Wallet is not connected. Click 'Connect Wallet' button.`);
        }
    }

    return (
        <div className="h-full w-full flex flex-col items-center py-16 px-2">
            <p>{nextNonce.toString()}</p>
            <Card className="w-full sm:max-w-md">
                <CardHeader>
                    <CardTitle>Update The Product Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="itemID"
                                rules={{ required: 'Item ID is required' }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Item ID</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Enter the tracking number ID"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newLocation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <div className="flex w-full max-w-sm items-center space-x-1">
                                                <Input placeholder="Enter the location coordinates" {...field} />
                                                <LocationDetector onDetectLocation={onDetectLocation} />
                                                <LocationPicker onSaveLocation={onSaveLocation} />
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            Use the &quot;latitude,longitude&quot; format.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newStatus"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a verified email to display" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {NEW_STATUS_OPTIONS.map((opt) => (
                                                    <SelectItem key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newMetadataUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Metadata URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the metadata URL" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <InputFile onChange={(imageFiles) => form.setValue('productImages', imageFiles)} />
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin" /> : 'Submit'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <div className="fixed bottom-4">
                {error && <Alert destructive title="Error" description={error} />}
                {activeConnectorError && (
                    <Alert
                        destructive
                        title="Connect Error"
                        description={
                            <>
                                <p>{activeConnectorError}</p>
                                <p>Refresh page if you have the browser wallet installed.</p>
                            </>
                        }
                    />
                )}
                {txHash && <Alert title="Transaction Result" description={<TxHashLink txHash={txHash} />} />}
            </div>
        </div>
    );
}
