import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';

import { TransactionHash, serializeTypeValue, toBuffer } from '@concordium/web-sdk';
import { WalletConnection, typeSchemaFromBase64 } from '@concordium/react-components';

import { Buffer } from 'buffer/';

import {
    SERIALIZATION_HELPER_SCHEMA_ADDITIONAL_DATA,
    SERIALIZATION_HELPER_SCHEMA_PERMIT_MESSAGE,
    TRANSFER_SCHEMA,
    VERIFIER_URL,
} from '../constants';

import { submitBid } from '../utils';
import { viewItemState } from '../auction_contract';

import * as AuctionContract from '../../generated/sponsored_tx_enabled_auction_sponsored_tx_enabled_auction'; // Code generated from a smart contract module.

/*
 * This function generates the transfer message to be signed in the browser wallet.
 */
async function generateTransferMessage(
    setTokenID: (arg0: string) => void,
    expiryTimeSignature: string,
    account: string,
    nonce: string,
    amount: string | undefined,
    itemIndexAuction: string,
) {
    try {
        const viewItemStateParam: AuctionContract.ViewItemStateParameter = itemIndexAuction as unknown as number;

        const itemState: AuctionContract.ReturnValueViewItemState = await viewItemState(viewItemStateParam);

        setTokenID(itemState.token_id);

        const data = serializeTypeValue(
            Number(itemIndexAuction),
            toBuffer(SERIALIZATION_HELPER_SCHEMA_ADDITIONAL_DATA, 'base64'),
        );

        const hexStringData = [...data.buffer].map((b) => b.toString(16).padStart(2, '0')).join('');

        const transfer = [
            {
                amount,
                data: hexStringData, // e.g. 0100 (for item with index 1)
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
            payload: Array.from(payload.buffer),
        };

        const serializedMessage = serializeTypeValue(
            message,
            toBuffer(SERIALIZATION_HELPER_SCHEMA_PERMIT_MESSAGE, 'base64'),
        );

        return serializedMessage;
    } catch (error) {
        throw new Error(`Generating transfer message failed. Orginal error: ${(error as Error).message}`);
    }
}

interface ConnectionProps {
    account: string | undefined;
    connection: WalletConnection;
    setTxHash: (hash: TransactionHash.Type | undefined) => void;
    setTransactionError: (error: string | undefined) => void;
}

/*
 * A component that manages the input fields and corresponding state to sign a bid message and submit the signature to the backend.
 */
export default function Bid(props: ConnectionProps) {
    const { account, connection, setTxHash, setTransactionError } = props;

    const [signature, setSignature] = useState<undefined | string>(undefined);
    const [signingError, setSigningError] = useState<undefined | string>(undefined);

    const [expiryTime, setExpiryTime] = useState('');
    const [tokenID, setTokenID] = useState<string | undefined>(undefined);
    const [showMessage, setShowMessage] = useState(false);

    interface FormTypeGenerateSignature {
        itemIndex: string;
        tokenAmount: string;
        nonce: string;
    }
    const formGenerateSignature = useForm<FormTypeGenerateSignature>({ mode: 'all' });

    const [nonce, tokenAmount, itemIndex] = useWatch({
        control: formGenerateSignature.control,
        name: ['nonce', 'tokenAmount', 'itemIndex'],
    });

    interface FormTypeBid {
        signer: string;
    }
    const formBid = useForm<FormTypeBid>({ mode: 'all' });

    async function onSubmitSigning(data: FormTypeGenerateSignature) {
        setSigningError(undefined);
        setSignature(undefined);

        // Signatures should expire in one day. Add 1 day to the current time.
        const date = new Date();
        date.setTime(date.getTime() + 86400 * 1000);

        // RFC 3339 format (e.g. 2030-08-08T05:15:00Z)
        const expiryTimeSignature = date.toISOString();
        setExpiryTime(expiryTimeSignature);

        if (account) {
            try {
                const serializedMessage = await generateTransferMessage(
                    setTokenID,
                    expiryTimeSignature,
                    account,
                    data.nonce,
                    data.tokenAmount,
                    data.itemIndex,
                );

                const permitSignature = await connection.signMessage(account, {
                    type: 'BinaryMessage',
                    value: Buffer.from(serializedMessage.buffer),
                    schema: typeSchemaFromBase64(SERIALIZATION_HELPER_SCHEMA_PERMIT_MESSAGE),
                });

                setSignature(permitSignature[0][0]);
            } catch (err) {
                setSigningError((err as Error).message);
            }
        }
    }

    function onSubmitBid(data: FormTypeBid, accountAddress: string | undefined) {
        setTxHash(undefined);
        setTransactionError(undefined);
        setShowMessage(false);

        if (accountAddress && signature) {
            const tx = submitBid(
                VERIFIER_URL,
                data.signer,
                nonce,
                signature,
                expiryTime,
                tokenID,
                accountAddress,
                tokenAmount,
                itemIndex,
            );

            tx.then((txHashReturned) => {
                setTxHash(txHashReturned);
                setSignature(undefined);
                formGenerateSignature.reset();
                formBid.reset();
            })
                .catch((err: Error) => setTransactionError(err.message))
                .finally(() => setShowMessage(true));
        }
    }
    return (
        <>
            <Form onSubmit={formGenerateSignature.handleSubmit(onSubmitSigning)}>
                <Form.Label className="h2">Step 4: Generate signature</Form.Label>
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
                    <div className="loading-text">{signature}</div>
                </>
            )}
            {signingError && <Alert variant="danger">Error: {signingError}.</Alert>}
            <hr />
            <Form onSubmit={formBid.handleSubmit((data) => onSubmitBid(data, account))}>
                <Form.Label className="h2">Step 5: Submit Sponsored Transaction</Form.Label>

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
                    (or an error if one occurred).
                </Alert>
            )}
        </>
    );
}
