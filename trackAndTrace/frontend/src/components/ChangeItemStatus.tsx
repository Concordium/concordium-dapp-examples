import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import { Buffer } from 'buffer/';
import JSONbig from 'json-bigint';

import { TESTNET, WalletConnection, typeSchemaFromBase64 } from '@concordium/wallet-connectors';
import { useGrpcClient } from '@concordium/react-components';
import { AccountAddress, serializeTypeValue, toBuffer } from '@concordium/web-sdk';

import { TxHashLink } from './CCDScanLinks';
import {
    CHANGE_ITEM_STATUS_PARAMETER_SCHEMA,
    CONTRACT_SUB_INDEX,
    REFRESH_INTERVAL,
    SERIALIZATION_HELPER_SCHEMA_PERMIT_MESSAGE,
} from '../../constants';
import { nonceOf } from '../track_and_trace_contract';
import * as TrackAndTraceContract from '../../generated/module_track_and_trace'; // Code generated from a smart contract module. The naming convention of the generated file is `moduleName_smartContractName`.

interface Props {
    connection: WalletConnection | undefined;
    accountAddress: string | undefined;
}

const NEW_STATUS_OPTIONS = [
    { label: 'Produced', value: 'Produced' },
    { label: 'InTransit', value: 'InTransit' },
    { label: 'InStore', value: 'InStore' },
    { label: 'Sold', value: 'Sold' },
];

async function generateMessage(newStatus: string, itemID: bigint, expiryTimeSignature: string, nonce: number | bigint) {
    try {
        // Create ChangeItemStatus parameter
        let changeItemStatusParameter = {
            additional_data: {
                bytes: [],
            },
            item_id: Number(itemID),
            new_status: {
                [newStatus]: [],
            },
        };

        const payload = serializeTypeValue(
            changeItemStatusParameter,
            toBuffer(CHANGE_ITEM_STATUS_PARAMETER_SCHEMA, 'base64')
        );

        const message = {
            contract_address: {
                index: Number(process.env.TRACK_AND_TRACE_CONTRACT_INDEX),
                subindex: 0,
            },
            nonce: Number(nonce),
            timestamp: expiryTimeSignature,
            entry_point: 'changeItemStatus',
            payload: Array.from(payload.buffer),
        };

        const serializedMessage = serializeTypeValue(
            message,
            toBuffer(SERIALIZATION_HELPER_SCHEMA_PERMIT_MESSAGE, 'base64')
        );

        return [payload, serializedMessage];
    } catch (error) {
        throw new Error(`Generating message failed. Orginal error: ${(error as Error).message}`);
    }
}

export function ChangeItemStatus(props: Props) {
    const { connection, accountAddress } = props;

    type FormType = {
        itemID: bigint | undefined;
        newStatus: 'Produced' | 'InTransit' | 'InStore' | 'Sold' | undefined;
    };
    const { control, register, formState, handleSubmit } = useForm<FormType>({ mode: 'all' });

    const [newStatus, itemID] = useWatch({
        control: control,
        name: ['newStatus', 'itemID'],
    });

    const [txHash, setTxHash] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);
    const [nextNonceError, setNextNonceError] = useState<undefined | string>(undefined);
    const [nextNonce, setNextNonce] = useState<number | bigint>(0);

    const grpcClient = useGrpcClient(TESTNET);

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
        const interval = setInterval(refreshNonce, REFRESH_INTERVAL.asMilliseconds());
        return () => clearInterval(interval);
    }, [refreshNonce]);

    async function onSubmit() {
        setError(undefined);

        if (newStatus === undefined) {
            throw Error(`'newStatus' undefined`);
        }
        if (itemID === undefined) {
            throw Error(`'itemID' undefined`);
        }

        // Signatures should expire in one day. Add 1 day to the current time.
        const date = new Date();
        date.setTime(date.getTime() + 86400 * 1000);

        // RFC 3339 format (e.g. 2030-08-08T05:15:00Z)
        const expiryTimeSignature = date.toISOString();

        if (connection && accountAddress) {
            try {
                const [payload, serializedMessage] = await generateMessage(
                    newStatus,
                    itemID,
                    expiryTimeSignature,
                    nextNonce
                );

                const permitSignature = await connection.signMessage(accountAddress, {
                    type: 'BinaryMessage',
                    value: Buffer.from(serializedMessage.buffer),
                    schema: typeSchemaFromBase64(SERIALIZATION_HELPER_SCHEMA_PERMIT_MESSAGE),
                });

                const response = await fetch(
                    process.env.SPONSORED_TRANSACTION_BACKEND_BASE_URL + `/api/submitTransaction`,
                    {
                        method: 'POST',
                        headers: new Headers({ 'content-type': 'application/json' }),
                        body: JSONbig.stringify({
                            signer: accountAddress,
                            nonce: Number(nextNonce),
                            signature: permitSignature[0][0],
                            expiry_time: expiryTimeSignature,
                            contract_address: {
                                index: Number(process.env.TRACK_AND_TRACE_CONTRACT_INDEX),
                                subindex: CONTRACT_SUB_INDEX,
                            },
                            contract_name: TrackAndTraceContract.contractName.value,
                            entrypoint_name: 'changeItemStatus',
                            parameter: Buffer.from(payload.buffer).toString('hex'),
                        }),
                    }
                );

                if (!response.ok) {
                    const error = (await response.json()) as Error;
                    throw new Error(`Unable to get item's change status events: ${JSON.stringify(error)}`);
                }
                const txHash = (await response.json()) as string;

                if (txHash) {
                    setTxHash(txHash);
                } else {
                    throw new Error(`Unable to get item's change status events`);
                }
            } catch (err) {
                setError((err as Error).message);
            }
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
                        <Form.Control {...register('itemID', { required: true })} placeholder="12345" />
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

                {txHash && (
                    <Alert variant="info">
                        <TxHashLink txHash={txHash} />
                    </Alert>
                )}
                {error && <Alert variant="danger">{error}</Alert>}
                {nextNonceError && <Alert variant="danger">Error: {nextNonceError}. </Alert>}
            </div>
        </div>
    );
}
