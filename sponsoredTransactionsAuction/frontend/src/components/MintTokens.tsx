import React from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';

import { WalletConnection } from '@concordium/react-components';
import { mint } from 'src/utils';

interface ConnectionProps {
    setTxHash: (hash: string) => void;
    setTransactionError: (error: string) => void;
    account: string | undefined;
    connection: WalletConnection;
}

/* A component that manages the input fields and corresponding state to update a smart contract instance on the chain.
 * This components creates an `Update` transaction.
 */
export default function MintTokens(props: ConnectionProps) {
    const { account, connection, setTxHash, setTransactionError } = props;

    type FormType = {
        toAddress: string;
        tokenId: string;
    };
    const form = useForm<FormType>({ mode: 'all' });

    function onSubmit(data: FormType) {
        setTxHash('');
        setTransactionError('');

        if (connection && account) {
            const tx = mint(connection, account, data.tokenId, data.toAddress);
            tx.then(setTxHash).catch((err: Error) => setTransactionError((err as Error).message));
        }
    }

    return (
        <Form onSubmit={form.handleSubmit(onSubmit)}>
            <Form.Label>Step 1: Mint 100 tokens to an account</Form.Label>
            <Form.Group className="mb-3 text-center">
                <Form.Label>Token ID</Form.Label>
                <Form.Control {...form.register('tokenId', { required: true })} />
                {form.formState.errors.tokenId && (
                    <Alert key="info" variant="info">
                        {' '}
                        Token ID is required{' '}
                    </Alert>
                )}
                <Form.Text />
            </Form.Group>
            <Form.Group className=" mb-3 text-center">
                <Form.Label>To Address</Form.Label>
                <Form.Control {...form.register('toAddress', { required: true })} />
                {form.formState.errors.toAddress && (
                    <Alert key="info" variant="info">
                        {' '}
                        To Address is required{' '}
                    </Alert>
                )}
                <Form.Text />
            </Form.Group>
            <Button variant="primary" type="submit">
                Mint 100 tokens
            </Button>
        </Form>
    );
}
