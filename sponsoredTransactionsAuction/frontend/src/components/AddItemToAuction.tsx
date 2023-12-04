import React from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';

import { WalletConnection } from '@concordium/react-components';
import { addItem } from 'src/utils';

interface ConnectionProps {
    setTxHash: (hash: string) => void;
    setTransactionError: (error: string) => void;
    account: string | undefined;
    connection: WalletConnection;
}

/* A component that manages the input fields and corresponding state to update a smart contract instance on the chain.
 * This components creates an `Update` transaction.
 */
export default function AddItemToAuction(props: ConnectionProps) {
    const { account, connection, setTxHash, setTransactionError } = props;

    type FormType = {
        tokenID: string;
        name: string;
    };
    const form = useForm<FormType>({ mode: 'all' });

    function onSubmit(data: FormType) {
        setTxHash('');
        setTransactionError('');

        if (account) {
            const tx = addItem(connection, account, data.tokenID, data.name);
            tx.then(setTxHash).catch((err: Error) => setTransactionError((err as Error).message));
        }
    }

    return (
        <Form onSubmit={form.handleSubmit(onSubmit)}>
            <Form.Label>Step 2: Add item to auction</Form.Label>
            <Form.Group className="mb-3 text-center">
                <Form.Label>Token ID</Form.Label>
                <Form.Control {...form.register('tokenID', { required: true })} />
                {form.formState.errors.tokenID && (
                    <Alert key="info" variant="info">
                        {' '}
                        Token ID is required{' '}
                    </Alert>
                )}
                <Form.Text />
            </Form.Group>
            <Form.Group className=" mb-3 text-center">
                <Form.Label>Name</Form.Label>
                <Form.Control {...form.register('name', { required: true })} />
                {form.formState.errors.name && (
                    <Alert key="info" variant="info">
                        {' '}
                        Name is required{' '}
                    </Alert>
                )}
                <Form.Text />
            </Form.Group>
            <Button variant="primary" type="submit">
                Add item
            </Button>
        </Form>
    );
}
