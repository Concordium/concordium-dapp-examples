import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';

import { WalletConnection } from '@concordium/react-components';
import {
    TransactionKindString,
    TransactionSummaryType,
    ConcordiumGRPCClient,
    UpdatedEvent,
    // toBuffer,
    // deserializeTypeValue,
    TransactionHash,
} from '@concordium/web-sdk';

// EVENT_SCHEMA
import { REFRESH_INTERVAL } from '../constants';
import { addItem } from '../writing_to_blockchain';

interface ConnectionProps {
    setTxHash: (hash: string | undefined) => void;
    setTransactionError: (error: string | undefined) => void;
    txHash: string | undefined;
    account: string | undefined;
    connection: WalletConnection;
    grpcClient: ConcordiumGRPCClient | undefined;
}

// interface Event {
//     AddItemEvent: {
//         item_index: string;
//     };
// }

/*
 * A component that manages the input fields and corresponding state to add an item to the auction contract.
 * This component creates an `Update` transaction.
 */
export default function AddItemToAuction(props: ConnectionProps) {
    const { account, connection, grpcClient, setTxHash, txHash, setTransactionError } = props;

    interface FormType {
        tokenID: string;
        name: string;
    }
    const form = useForm<FormType>({ mode: 'all' });

    const [itemIndex, setItemIndex] = useState<string | undefined>(undefined);
    const [itemIndexError, setItemIndexError] = useState<string | undefined>(undefined);
    const [showMessage, setShowMessage] = useState(false);

    function onSubmit(data: FormType) {
        setTxHash(undefined);
        setTransactionError(undefined);
        setShowMessage(false);

        if (account) {
            const tx = addItem(connection, account, data.tokenID, data.name);
            tx.then(setTxHash)
                .catch((err: Error) => setTransactionError(err.message))
                .finally(() => setShowMessage(true));
        }
    }

    // Periodically fetch the status of the submitted transaction until it is finalized.
    // Once the transaction is finalized extract the
    // newly created ItemIndex from the event emitted within the transaction.

    useEffect(() => {
        if (connection && grpcClient && txHash !== undefined) {
            const interval = setInterval(() => {
                grpcClient
                    .getBlockItemStatus(TransactionHash.fromHexString(txHash))
                    .then((report) => {
                        if (report !== undefined) {
                            setItemIndex(undefined);
                            if (report.status === 'finalized') {
                                if (
                                    report.outcome.summary.type === TransactionSummaryType.AccountTransaction &&
                                    report.outcome.summary.transactionType === TransactionKindString.Update
                                ) {
                                    const eventList = report.outcome.summary.events[0] as UpdatedEvent;

                                    console.log(eventList);
                                    // TODO

                                    // const returnValues = deserializeTypeValue(
                                    //     toBuffer(eventList.events[0] as unknown as string, 'hex'),
                                    //     toBuffer(EVENT_SCHEMA, 'base64'),
                                    // );

                                    // const event = returnValues as unknown as Event;
                                    // setItemIndex(event.AddItemEvent.item_index);
                                    // clearInterval(interval);
                                } else {
                                    setItemIndexError('Tansaction failed or event decoding failed.');
                                    clearInterval(interval);
                                }
                            }
                        }
                    })
                    .catch((e) => {
                        setItemIndex(undefined);
                        setItemIndexError((e as Error).message);
                        clearInterval(interval);
                    });
            }, REFRESH_INTERVAL.asMilliseconds());
            return () => clearInterval(interval);
        }
    }, [connection, grpcClient, txHash]);

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
            {itemIndex && <Alert variant="info">Item index: {itemIndex}</Alert>}
            {itemIndexError && <Alert variant="danger">Error: {itemIndexError}</Alert>}
        </>
    );
}
