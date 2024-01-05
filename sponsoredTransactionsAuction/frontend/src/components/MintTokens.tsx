import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';

import { WalletConnection } from '@concordium/react-components';
import { AccountAddress, TransactionHash } from '@concordium/web-sdk';

import { METADATA_URL } from '../constants';
import { validateAccountAddress } from '../utils';

import { mint } from '../cis2_token_contract';
import * as Cis2MultiContract from '../../generated/cis2_multi_cis2_multi'; // Code generated from a smart contract module.

interface ConnectionProps {
    setTxHash: (hash: TransactionHash.Type | undefined) => void;
    setTransactionError: (error: string | undefined) => void;
    account: string | undefined;
    connection: WalletConnection;
}

/**
 * A component that manages the input fields and corresponding state to mint/airdrop some cis2 tokens to the user.
 * This component creates an `Update` transaction.
 */
export default function MintTokens(props: ConnectionProps) {
    const { account, connection, setTxHash, setTransactionError } = props;

    interface FormType {
        toAddress: string;
        tokenID: string;
    }
    const form = useForm<FormType>({ mode: 'all' });

    const [showMessage, setShowMessage] = useState(false);

    function onSubmit(data: FormType) {
        setTxHash(undefined);
        setTransactionError(undefined);
        setShowMessage(false);

        if (connection && account) {
            const mintParam: Cis2MultiContract.MintParameter = {
                owner: {
                    type: 'Account',
                    content: AccountAddress.fromBase58(account),
                },
                metadata_url: {
                    hash: { type: 'None' },
                    url: METADATA_URL, // In production, you should consider using a different metadata file for each token_id.
                },
                // The token id in the cis2 token contract is of type u8.
                // A hex string of 1 byte represents the token id here. E.g. `01` for token id 1.
                // The input field has a max/min value validation, so that `data.tokenID` is not greater than 255.
                token_id: `0${Number(data.tokenID).toString(16)}`.slice(-2),
            };

            const tx = mint(connection, AccountAddress.fromBase58(account), mintParam);

            tx.then(setTxHash)
                .catch((err: Error) => setTransactionError(err.message))
                .finally(() => setShowMessage(true));
        }
    }

    return (
        <>
            <Form onSubmit={form.handleSubmit(onSubmit)}>
                <Form.Label className="h2">Step 1: Mint 100 tokens to your account</Form.Label>
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
                            validate: validateAccountAddress,
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
                    (or an error if one occurred).
                </Alert>
            )}
        </>
    );
}
