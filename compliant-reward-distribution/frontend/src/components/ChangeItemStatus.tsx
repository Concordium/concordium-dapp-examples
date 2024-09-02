import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import { Buffer } from 'buffer/';
import JSONbig from 'json-bigint';

import { WalletConnection, typeSchemaFromBase64 } from '@concordium/wallet-connectors';
import { useGrpcClient } from '@concordium/react-components';
import { AccountAddress, Timestamp } from '@concordium/web-sdk';

import { TxHashLink } from './CCDScanLinks';
import * as constants from '.././constants';
import { nonceOf } from '../track_and_trace_contract';
import * as TrackAndTraceContract from '../../generated/module_track_and_trace'; // Code generated from a smart contract module. The naming convention of the generated file is `moduleName_smartContractName`.
import { ToTokenIdU64 } from '../utils';

interface Props {
    connection: WalletConnection | undefined;
    accountAddress: string | undefined;
    activeConnectorError: string | undefined;
}

const NEW_STATUS_OPTIONS = [
    { label: 'Produced', value: 'Produced' },
    { label: 'InTransit', value: 'InTransit' },
    { label: 'InStore', value: 'InStore' },
    { label: 'Sold', value: 'Sold' },
];

function generateMessage(
    newStatus: 'Produced' | 'InTransit' | 'InStore' | 'Sold' | undefined,
    itemID: number | bigint,
    expiryTimeSignature: Date,
    nonce: number | bigint,
) {
    try {
        if (newStatus === undefined) {
            throw Error(`'newStatus' input field is undefined`);
        }

        // The `item_id` is of type `TokenIdU64` in the smart contract which is represented as a little-endian hex string.
        // E.g. the `TokenIdU64` representation of `1` is the hex string `0100000000000000`.
        const tokenIdU64 = ToTokenIdU64(itemID);

        // Create ChangeItemStatus parameter
        const changeItemStatusParameter: TrackAndTraceContract.ChangeItemStatusParameter = {
            additional_data: {
                bytes: [],
            },
            item_id: tokenIdU64,
            new_status: {
                type: newStatus,
            },
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
    const { connection, accountAddress, activeConnectorError } = props;

    interface FormType {
        itemID: number | bigint | undefined;
        newStatus: 'Produced' | 'InTransit' | 'InStore' | 'Sold' | undefined;
    }
    const { control, register, formState, handleSubmit } = useForm<FormType>({ mode: 'all' });

    const [newStatus, itemID] = useWatch({
        control: control,
        name: ['newStatus', 'itemID'],
    });

    const [txHash, setTxHash] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);
    const [nextNonceError, setNextNonceError] = useState<undefined | string>(undefined);
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
                    setNextNonceError(undefined);
                })
                .catch((e) => {
                    setNextNonceError((e as Error).message);
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

    async function onSubmit() {
        setError(undefined);

        if (newStatus === undefined) {
            setError(`'newStatus' input field is undefined`);
            throw Error(`'newStatus' input field is undefined`);
        }
        if (itemID === undefined) {
            setError(`'itemID' input field is undefined`);
            throw Error(`'itemID' input field is undefined`);
        }

        // Signatures should expire in one day. Add 1 day to the current time.
        const expiryTimeSignature = new Date();
        expiryTimeSignature.setTime(expiryTimeSignature.getTime() + 86400 * 1000);

        if (connection && accountAddress) {
            try {
                const [payload, serializedMessage] = generateMessage(newStatus, itemID, expiryTimeSignature, nextNonce);

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
                } else {
                    throw new Error(`Unable to get txHash from backend`);
                }
            } catch (err) {
                setError((err as Error).message);
            }
        } else {
            setError(`Wallet is not connected. Click 'Connect Wallet' button.`);
        }
    }

    return (
        <div className="centered">
            <div className="card">
                <h2 className="centered"> Update The Product Status</h2>
                <br />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="col mb-3">
                        <Form.Label>Item ID</Form.Label>
                        <Form.Control {...register('itemID', { required: true })} type="number" placeholder="12345" />
                        {formState.errors.itemID && <Alert variant="info"> Item ID is required </Alert>}
                        <Form.Text />
                    </Form.Group>

                    <Form.Group className="col mb-3">
                        <Form.Label>New Status</Form.Label>
                        <Controller
                            name="newStatus"
                            control={control}
                            defaultValue={'InTransit'}
                            render={({ field: { onChange } }) => (
                                <Select
                                    getOptionValue={(option) => option.value}
                                    options={NEW_STATUS_OPTIONS}
                                    onChange={(e) => {
                                        onChange(e?.value);
                                    }}
                                />
                            )}
                        />
                    </Form.Group>

                    {nextNonce !== undefined && (
                        <Alert variant="info">Your next nonce: {JSONbig.stringify(nextNonce)} </Alert>
                    )}

                    <Button variant="secondary" type="submit">
                        Update Status
                    </Button>
                </Form>

                {error && <Alert variant="danger">{error}</Alert>}
                {activeConnectorError && (
                    <Alert variant="danger">
                        Connect Error: {activeConnectorError}. Refresh page if you have the browser wallet installed.
                    </Alert>
                )}
                {nextNonceError && <Alert variant="danger">Error: {nextNonceError}. </Alert>}
                {txHash && (
                    <Alert variant="info">
                        <TxHashLink txHash={txHash} />
                    </Alert>
                )}
            </div>
        </div>
    );
}
