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
            tx.then(setTxHash)
                .catch((err: Error) => setTransactionError((err as Error).message))
                .finally(() => setShowMessage(true));
        }
    }

    return (
        <>
            <Form onSubmit={form.handleSubmit(onSubmit)}>
                <Form.Label className="h5">Step 1: Mint 100 tokens to your account</Form.Label>
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
                    <Form.Label>To Address</Form.Label>
                    <Form.Control
                        {...form.register('toAddress', {
                            required: 'To address is required.',
                            pattern: {
                                value: /^[1-9A-HJ-NP-Za-km-z]{50}$/,
                                message:
                                    'Please enter a valid account address. It is a base58 string with a fixed length of 50 characters.',
                            },
                        })}
                    />
                    {form.formState.errors.toAddress && (
                        <Alert variant="danger">{form.formState.errors.toAddress.message}</Alert>
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
                    The `Transaction status` at the top of this page was updated. It displays the transaction hash link
                    (or an error if one occured).
                </Alert>
            )}
        </>
    );
}
