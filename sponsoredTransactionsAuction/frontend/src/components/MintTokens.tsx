import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';

import { WalletConnection } from '@concordium/react-components';
import { mint } from 'src/writing_to_blockchain';

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
        tokenID: string;
    };
    const form = useForm<FormType>({ mode: 'all' });

    const [showMessage, setShowMessage] = useState(false);

    function onSubmit(data: FormType) {
        setTxHash('');
        setTransactionError('');
        setShowMessage(false);

        if (connection && account) {
            const tx = mint(connection, account, data.tokenID, data.toAddress);
            tx.then((hash) => {
                setTxHash(hash);
                setShowMessage(true);
            }).catch((err: Error) => setTransactionError((err as Error).message));
        }
    }

    return (
        <>
            <Form onSubmit={form.handleSubmit(onSubmit)}>
                <Form.Label>Step 1: Mint 100 tokens to an account</Form.Label>
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
            <br />
            {showMessage && (
                <Alert variant="info">
                    The `Transaction status` was updated with the link to your transaction at the top of this page.
                </Alert>
            )}
        </>
    );
}
