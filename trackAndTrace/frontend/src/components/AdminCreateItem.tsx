import { useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';

import { WalletConnection } from '@concordium/wallet-connectors';
import {
    AccountAddress,
    TransactionHash,
    TransactionKindString,
    TransactionSummaryType,
    UpdatedEvent,
} from '@concordium/web-sdk';
import { useGrpcClient } from '@concordium/react-components';

import * as constants from '../constants';
import { TxHashLink } from './CCDScanLinks';
import { createItem } from '../track_and_trace_contract';
import * as TrackAndTraceContract from '../../generated/module_track_and_trace';
import { FromTokenIdU64 } from '../utils';

interface Props {
    connection: WalletConnection | undefined;
    accountAddress: string | undefined;
    activeConnectorError: string | undefined;
}

interface PartialItemCreatedEvent {
    item_id: string;
}

export function AdminCreateItem(props: Props) {
    const { connection, accountAddress, activeConnectorError } = props;

    interface FormType {
        url: string | undefined;
    }
    const { control, register, formState, handleSubmit } = useForm<FormType>({ mode: 'all' });

    const [url] = useWatch({
        control: control,
        name: ['url'],
    });

    const [txHash, setTxHash] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    const [newItemId, setNewItemId] = useState<number | bigint | undefined>(undefined);
    const [itemIdError, setItemIdError] = useState<string | undefined>(undefined);

    const grpcClient = useGrpcClient(constants.NETWORK);

    // Wait until the submitted transaction is finalized.
    // Once the transaction is finalized, extract the
    // newly created ItemIndex from the event emitted within the transaction.
    useEffect(() => {
        if (connection && grpcClient && txHash !== undefined) {
            grpcClient
                .waitForTransactionFinalization(TransactionHash.fromHexString(txHash))
                .then((report) => {
                    if (
                        report.summary.type === TransactionSummaryType.AccountTransaction &&
                        report.summary.transactionType === TransactionKindString.Update
                    ) {
                        const eventList = report.summary.events[0] as UpdatedEvent;

                        const parsedEvent = TrackAndTraceContract.parseEvent(eventList.events[0]);
                        const itemCreatedEvent = parsedEvent.content as unknown as PartialItemCreatedEvent;

                        // The `item_id` is of type `TokenIdU64` in the smart contract and logged in the event as
                        // a little-endian hex string.
                        // E.g. the `TokenIdU64` representation of `1` is the hex string `0100000000000000`.
                        // This function converts the `TokenIdU64` representation into a bigint type here.
                        const itemId: bigint = FromTokenIdU64(itemCreatedEvent.item_id);
                        setNewItemId(itemId);
                    } else {
                        setItemIdError('Tansaction failed and event decoding failed.');
                    }
                })
                .catch((e) => {
                    setNewItemId(undefined);
                    setItemIdError((e as Error).message);
                });
        }
    }, [connection, grpcClient, txHash]);

    function onSubmit() {
        setError(undefined);

        if (url === undefined) {
            setError(`'url' input field is undefined`);
            throw Error(`'url' input field is undefined`);
        }

        const parameter: TrackAndTraceContract.CreateItemParameter = {
            type: 'Some',
            content: {
                url,
                hash: { type: 'None' },
            },
        };

        // Send transaction
        if (accountAddress && connection) {
            createItem(connection, AccountAddress.fromBase58(accountAddress), parameter)
                .then((txHash) => {
                    setTxHash(txHash);
                })
                .catch((e) => {
                    setError((e as Error).message);
                });
        } else {
            setError(`Wallet is not connected. Click 'Connect Wallet' button.`);
        }
    }

    return (
        <div className="centered">
            <div className="card">
                <h2 className="centered"> Create New Product</h2>
                <br />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="col mb-3">
                        <Form.Label>Url</Form.Label>
                        <Form.Control {...register('url', { required: true })} placeholder="Enter metadata URL" />
                        {formState.errors.url && <Alert variant="info"> Url is required </Alert>}
                        <Form.Text />
                    </Form.Group>
                    <Button variant="secondary" type="submit">
                        Add New Product
                    </Button>
                </Form>

                {error && <Alert variant="danger">{error}</Alert>}
                {activeConnectorError && (
                    <Alert variant="danger">
                        Connect Error: {activeConnectorError}. Refresh page if you have the browser wallet installed.
                    </Alert>
                )}
                {txHash && (
                    <>
                        <Alert variant="info">
                            <TxHashLink txHash={txHash} />
                        </Alert>
                        <Alert variant="info">You will see the item id below after the transaction is finalized.</Alert>
                    </>
                )}
                {newItemId !== undefined && <Alert variant="info">Item ID: {newItemId.toString()}</Alert>}
                {itemIdError && <Alert variant="danger">Error: {itemIdError}</Alert>}
            </div>
        </div>
    );
}
