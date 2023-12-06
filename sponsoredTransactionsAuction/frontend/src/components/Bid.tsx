/* eslint-disable no-alert */
import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';

import { viewItemState } from 'src/reading_from_blockchain';
import { AccountAddress, ConcordiumGRPCClient, Timestamp, serializeTypeValue, toBuffer } from '@concordium/web-sdk';

import {
    SERIALIZATION_HELPER_SCHEMA_ADDITIONAL_DATA,
    SERIALIZATION_HELPER_SCHEMA_PERMIT_MESSAGE,
    TRANSFER_SCHEMA,
    VERIFIER_URL,
} from 'src/constants';
import { WalletConnection, typeSchemaFromBase64 } from '@concordium/react-components';
import { submitBid } from '../writing_to_blockchain';

interface ConnectionProps {
    grpcClient: ConcordiumGRPCClient | undefined;
    account: string | undefined;
    connection: WalletConnection;
    setTxHash: (hash: string) => void;
    setTransactionError: (error: string) => void;
}

/**
 * Send bidding signature to backend.
 */
interface ItemState {
    auction_state: object;
    creator: AccountAddress;
    end: Timestamp;
    highest_bid: string;
    highest_bidder: object;
    name: string;
    start: Timestamp;
    token_id: string;
}

async function generateTransferMessage(
    setTokenIDAuction: (arg0: string) => void,
    grpcClient: ConcordiumGRPCClient | undefined,
    expiryTimeSignature: string,
    account: string,
    nonce: string,
    amount: string | undefined,
    itemIndexAuction: string | undefined
) {
    if (amount === undefined) {
        alert('Insert an amount.');
        return '';
    }

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(Number(nonce))) {
        alert('Your nonce needs to be a number.');
        return '';
    }

    if (itemIndexAuction === undefined) {
        alert('Insert a itemIndexAuction.');
        return '';
    }

    if (grpcClient === undefined) {
        alert('grpcClient undefined.');
        return '';
    }

    try {
        const returnValue = await viewItemState(grpcClient, itemIndexAuction);

        const itemState = returnValue as unknown as ItemState;

        setTokenIDAuction(itemState.token_id);

        const data = serializeTypeValue(
            Number(itemIndexAuction),
            toBuffer(SERIALIZATION_HELPER_SCHEMA_ADDITIONAL_DATA, 'base64')
        );

        const transfer = [
            {
                amount,
                data: data.toString('hex'), // e.g. 0100 (for item with index 1)
                from: {
                    Account: [account],
                },
                to: {
                    Contract: [
                        {
                            index: Number(process.env.AUCTION_CONTRACT_INDEX),
                            subindex: 0,
                        },
                        'bid',
                    ],
                },
                token_id: itemState.token_id,
            },
        ];

        const payload = serializeTypeValue(transfer, toBuffer(TRANSFER_SCHEMA, 'base64'));

        const message = {
            contract_address: {
                index: Number(process.env.CIS2_TOKEN_CONTRACT_INDEX),
                subindex: 0,
            },
            nonce: Number(nonce),
            timestamp: expiryTimeSignature,
            entry_point: 'transfer',
            payload: Array.from(payload),
        };

        const serializedMessage = serializeTypeValue(
            message,
            toBuffer(SERIALIZATION_HELPER_SCHEMA_PERMIT_MESSAGE, 'base64')
        );

        return serializedMessage;
    } catch (error) {
        console.log(error);
        alert(error);
        return '';
    }
}

/* A component that manages the input fields and corresponding state to update a smart contract instance on the chain.
 * This components creates an `Update` transaction.
 */
export default function Bid(props: ConnectionProps) {
    const { grpcClient, account, connection, setTxHash, setTransactionError } = props;

    const [signature, setSignature] = useState('');
    const [signingError, setSigningError] = useState('');

    const [expiryTime, setExpiryTime] = useState('');
    const [tokenIDAuction, setTokenIDAuction] = useState<string | undefined>(undefined);
    const [showMessage, setShowMessage] = useState(false);

    type FormTypeGenerateSignature = {
        itemIndex: string;
        tokenAmount: string;
        nonce: string;
    };
    const formGenerateSignature = useForm<FormTypeGenerateSignature>({ mode: 'all' });

    const [nonce, tokenAmount, itemIndex] = useWatch({
        control: formGenerateSignature.control,
        name: ['nonce', 'tokenAmount', 'itemIndex'],
    });

    type FormTypeBid = {
        signer: string;
    };
    const formBid = useForm<FormTypeBid>({ mode: 'all' });

    async function onSubmitBid(data: FormTypeBid, accountValue: string | undefined) {
        setTxHash('');
        setTransactionError('');
        setShowMessage(false);

        if (accountValue) {
            const tx = submitBid(
                VERIFIER_URL,
                data.signer,
                nonce,
                signature,
                expiryTime,
                tokenIDAuction,
                accountValue,
                tokenAmount,
                itemIndex
            );

            tx.then((txHashReturned) => {
                setTxHash(txHashReturned.tx_hash);

                if (txHashReturned.tx_hash !== '') {
                    setSignature('');
                    formGenerateSignature.reset();
                    formBid.reset();
                }
            })
                .catch((err: Error) => setTransactionError((err as Error).message))
                .finally(() => setShowMessage(true));
        }
    }

    async function onSubmit(data: FormTypeGenerateSignature) {
        setSigningError('');
        setSignature('');

        // Signatures should expire in one day. Add 1 day to the current time.
        const date = new Date();
        date.setTime(date.getTime() + 86400 * 1000);

        // RFC 3339 format (e.g. 2030-08-08T05:15:00Z)
        const expiryTimeSignature = date.toISOString();
        setExpiryTime(expiryTimeSignature);

        if (account) {
            const serializedMessage = await generateTransferMessage(
                setTokenIDAuction,
                grpcClient,
                expiryTimeSignature,
                account,
                data.nonce,
                data.tokenAmount,
                data.itemIndex
            );

            if (serializedMessage !== '') {
                const promise = connection.signMessage(account, {
                    type: 'BinaryMessage',
                    value: serializedMessage,
                    schema: typeSchemaFromBase64(SERIALIZATION_HELPER_SCHEMA_PERMIT_MESSAGE),
                });

                promise
                    .then((permitSignature) => {
                        setSignature(permitSignature[0][0]);
                    })
                    .catch((err: Error) => setSigningError((err as Error).message));
            } else {
                setSigningError('Serialization Error');
            }
        }
    }

    return (
        <>
            <Form onSubmit={formGenerateSignature.handleSubmit(onSubmit)}>
                <Form.Label className="h5">Step 4: Generate signature</Form.Label>
                <Form.Group className="mb-3 text-center">
                    <Form.Label>Amount of Cis2 tokens (payment token)</Form.Label>
                    <Form.Control
                        type="number"
                        {...formGenerateSignature.register('tokenAmount', {
                            required: 'Token amount is required.',
                            min: { value: 0, message: 'Number must be greater than or equal to 0.' },
                        })}
                    />
                    {formGenerateSignature.formState.errors.tokenAmount && (
                        <Alert variant="danger">{formGenerateSignature.formState.errors.tokenAmount.message}</Alert>
                    )}
                    <Form.Text />
                </Form.Group>
                <Form.Group className="mb-3 text-center">
                    <Form.Label>Item Index</Form.Label>
                    <Form.Control
                        type="number"
                        {...formGenerateSignature.register('itemIndex', {
                            required: 'Item index is required.',
                            min: { value: 0, message: 'Number must be greater than or equal to 0.' },
                        })}
                    />
                    {formGenerateSignature.formState.errors.itemIndex && (
                        <Alert variant="danger">{formGenerateSignature.formState.errors.itemIndex.message}</Alert>
                    )}
                    <Form.Text />
                </Form.Group>
                <Form.Group className="mb-3 text-center">
                    <Form.Label>Nonce</Form.Label>
                    <Form.Control
                        type="number"
                        {...formGenerateSignature.register('nonce', {
                            required: 'Nonce is required.',
                            min: { value: 0, message: 'Number must be greater than or equal to 0.' },
                        })}
                    />
                    {formGenerateSignature.formState.errors.nonce && (
                        <Alert variant="danger">{formGenerateSignature.formState.errors.nonce.message}</Alert>
                    )}
                    <Form.Text />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Generate Signature
                </Button>
            </Form>
            <br />

            {signature !== '' && (
                <>
                    <div> Your generated signature is: </div>
                    <div className="loadingText">{signature}</div>
                </>
            )}
            {signingError && <Alert variant="danger">Error: {signingError}.</Alert>}
            <hr />
            <Form onSubmit={formBid.handleSubmit((data) => onSubmitBid(data, account))}>
                <Form.Label className="h5">Step 5: Submit Sponsored Transaction</Form.Label>

                <Form.Group className="mb-3 text-center">
                    <Form.Label>Signer</Form.Label>

                    <Form.Control
                        {...formBid.register('signer', {
                            required: 'Signer is required.',
                            pattern: {
                                value: /^[1-9A-HJ-NP-Za-km-z]{50}$/,
                                message:
                                    'Please enter a valid account address. It is a base58 string with a fixed length of 50 characters.',
                            },
                        })}
                    />
                    {formBid.formState.errors.signer && (
                        <Alert variant="danger">{formBid.formState.errors.signer.message}</Alert>
                    )}

                    <Form.Text />
                </Form.Group>
                <Button disabled={!signature} variant={signature ? 'primary' : 'disabled'} type="submit">
                    {signature ? 'Submit Sponsored Transaction' : 'Generate a signature in step 4 first'}
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
