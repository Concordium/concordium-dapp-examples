import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';

import { WalletConnection } from '@concordium/react-components';
import {
    TransactionKindString,
    TransactionSummaryType,
    ConcordiumGRPCClient,
    UpdatedEvent,
    TransactionHash,
    AccountAddress,
    Timestamp,
} from '@concordium/web-sdk';

import { AUCTION_END, AUCTION_START } from '../constants';
import { addItem } from '../auction_contract';

import * as AuctionContract from '../../generated/sponsored_tx_enabled_auction_sponsored_tx_enabled_auction'; // Code generated from a smart contract module.

interface ConnectionProps {
    setTxHash: (hash: TransactionHash.Type | undefined) => void;
    setTransactionError: (error: string | undefined) => void;
    account: string | undefined;
    connection: WalletConnection;
    grpcClient: ConcordiumGRPCClient | undefined;
}

/*
 * A component that manages the input fields and corresponding state to add an item to the auction contract.
 * This component creates an `Update` transaction.
 */
export default function AddItemToAuction(props: ConnectionProps) {
    const { account, connection, grpcClient, setTxHash, setTransactionError } = props;

    interface FormType {
        tokenID: string;
        name: string;
    }
    const form = useForm<FormType>({ mode: 'all' });

    const [itemIndex, setItemIndex] = useState<number | undefined>(undefined);
    const [itemIndexError, setItemIndexError] = useState<string | undefined>(undefined);
    const [showMessage, setShowMessage] = useState(false);
    const [addItemTxHash, setAddItemTxHash] = useState<TransactionHash.Type | undefined>(undefined);

    function onSubmit(data: FormType) {
        setAddItemTxHash(undefined);
        setTxHash(undefined);
        setTransactionError(undefined);
        setShowMessage(false);

        const addItemParameter: AuctionContract.AddItemParameter = {
            name: data.name,
            start: Timestamp.fromDate(new Date(AUCTION_START)), // Hardcoded value for simplicity for this demo dApp.
            end: Timestamp.fromDate(new Date(AUCTION_END)), // Hardcoded value for simplicity for this demo dApp.
            minimum_bid: 0,
            token_id: `0${Number(data.tokenID).toString(16)}`.slice(-2),
        };

        if (account) {
            const tx = addItem(connection, AccountAddress.fromBase58(account), addItemParameter);

            tx.then((hash) => {
                setTxHash(hash);
                setAddItemTxHash(hash);
            })
                .catch((err: Error) => setTransactionError(err.message))
                .finally(() => setShowMessage(true));
        }
    }

    // Wait until the submitted transaction is finalized.
    // Once the transaction is finalized, extract the
    // newly created ItemIndex from the event emitted within the transaction.
    useEffect(() => {
        if (connection && grpcClient && addItemTxHash !== undefined) {
            grpcClient
                .waitForTransactionFinalization(addItemTxHash)
                .then((report) => {
                    if (
                        report.summary.type === TransactionSummaryType.AccountTransaction &&
                        report.summary.transactionType === TransactionKindString.Update
                    ) {
                        const eventList = report.summary.events[0] as UpdatedEvent;

                        const parsedEvent = AuctionContract.parseEvent(eventList.events[0]);

                        setItemIndex(parsedEvent.content.item_index);
                    } else {
                        setItemIndexError('Tansaction failed or event decoding failed.');
                    }
                })
                .catch((e) => {
                    setItemIndex(undefined);
                    setItemIndexError((e as Error).message);
                });
        }
    }, [connection, grpcClient, addItemTxHash]);

    return (
        <>
            <Form onSubmit={form.handleSubmit(onSubmit)}>
                <Form.Label className="h2">Step 2: Add item to auction</Form.Label>
                <Form.Group className="mb-3 text-center">
                    <Form.Label>Cis2 Token ID (payment token) in decimal</Form.Label>
                    <Form.Control
                        type="number"
                        {...form.register('tokenID', {
                            required: 'Token ID is required.',
                            min: { value: 0, message: 'Number must be greater than or equal to 0.' },
                            max: { value: 255, message: 'Number must be lower than or equal to 255.' },
                        })}
                    />
                    {form.formState.errors.tokenID && (
                        <Alert variant="danger">{form.formState.errors.tokenID.message}</Alert>
                    )}
                    <Form.Text />
                </Form.Group>
                <Form.Group className=" mb-3 text-center">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        {...form.register('name', {
                            required: 'Name is required.',
                        })}
                    />
                    {form.formState.errors.name && <Alert variant="danger">{form.formState.errors.name.message}</Alert>}
                    <Form.Text />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add item
                </Button>
            </Form>

            <br />

            {showMessage && (
                <>
                    <Alert variant="info">
                        The `Transaction status` at the top of this page was updated. It displays the transaction hash
                        link (or an error if one occurred).
                    </Alert>
                    <Alert variant="info">You will see the item index below after the transaction is finalized.</Alert>
                </>
            )}
            {itemIndex && <Alert variant="info">Item index: {itemIndex.toString()}</Alert>}
            {itemIndexError && <Alert variant="danger">Error: {itemIndexError}</Alert>}
        </>
    );
}
