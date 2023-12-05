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
import { submitBid } from '../utils';

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

function clearInputFields() {
    const operator = document.getElementById('operator') as HTMLTextAreaElement;
    if (operator !== null) {
        operator.value = '';
    }

    const from = document.getElementById('from') as HTMLTextAreaElement;
    if (from !== null) {
        from.value = '';
    }

    const to = document.getElementById('to') as HTMLTextAreaElement;
    if (to !== null) {
        to.value = '';
    }

    const tokenID = document.getElementById('tokenID') as HTMLTextAreaElement;
    if (tokenID !== null) {
        tokenID.value = '';
    }

    const nonce = document.getElementById('nonce') as HTMLTextAreaElement;
    if (nonce !== null) {
        nonce.value = '';
    }

    const signer = document.getElementById('signer') as HTMLTextAreaElement;
    if (signer !== null) {
        signer.value = '';
    }
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

                    // setNonce('');
                    // setSigner('');
                    // clearInputFields();
                }
            }).catch((err: Error) => setTransactionError((err as Error).message));
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
                <Form.Label>Step 4: Generate signature</Form.Label>
                <Form.Group className="mb-3 text-center">
                    <Form.Label>Amount of Cis2 tokens</Form.Label>
                    <Form.Control {...formGenerateSignature.register('tokenAmount', { required: true })} />
                    {formGenerateSignature.formState.errors.tokenAmount && (
                        <Alert key="info" variant="info">
                            {' '}
                            Token amount is required{' '}
                        </Alert>
                    )}
                    <Form.Text />
                </Form.Group>
                <Form.Group className="mb-3 text-center">
                    <Form.Label>Item Index</Form.Label>
                    <Form.Control {...formGenerateSignature.register('itemIndex', { required: true })} />
                    {formGenerateSignature.formState.errors.itemIndex && (
                        <Alert key="info" variant="info">
                            {' '}
                            Item Index is required{' '}
                        </Alert>
                    )}
                    <Form.Text />
                </Form.Group>
                <Form.Group className="mb-3 text-center">
                    <Form.Label>Nonce</Form.Label>
                    <Form.Control {...formGenerateSignature.register('nonce', { required: true })} />
                    {formGenerateSignature.formState.errors.nonce && (
                        <Alert key="info" variant="info">
                            {' '}
                            Nonce is required{' '}
                        </Alert>
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
            {signingError && <div style={{ color: 'red' }}>Error: {signingError}.</div>}
            <br />
            <Form onSubmit={formBid.handleSubmit((data) => onSubmitBid(data, account))}>
                <Form.Label>Step 4: Submit Sponsored Transaction</Form.Label>

                <Form.Group className="mb-3 text-center">
                    <Form.Label>Signer</Form.Label>
                    <Form.Control {...formBid.register('signer', { required: true })} />
                    {formBid.formState.errors.signer && (
                        <Alert key="info" variant="info">
                            {' '}
                            Signer is required{' '}
                        </Alert>
                    )}
                    <Form.Text />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit Sponsored Transaction
                </Button>
            </Form>
        </>
    );
}
