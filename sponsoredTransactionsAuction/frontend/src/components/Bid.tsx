import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';

import {
    AccountTransactionSignature,
    EntrypointName,
    Parameter,
    serializeTypeValue,
    toBuffer,
    TransactionHash,
} from '@concordium/web-sdk';
import { WalletConnection } from '@concordium/react-components';

import { SERIALIZATION_HELPER_SCHEMA_ADDITIONAL_DATA, SPONSORED_TX_CONTRACT_NAME, TRANSFER_SCHEMA } from '../constants';
import { submitBid, validateAccountAddress } from '../utils';

import { viewItemState } from '../auction_contract';
import * as AuctionContract from '../../generated/sponsored_tx_enabled_auction_sponsored_tx_enabled_auction'; // Code generated from a smart contract module.

/**
 * This function generates the transfer message to be signed in the browser wallet.
 */
async function generateTransferMessage(
    setTokenID: (arg0: string) => void,
    account: string,
    amount: string | undefined,
    itemIndexAuction: string,
) {
    try {
        const viewItemStateParam: AuctionContract.ViewItemStateParameter = Number(itemIndexAuction);

        if (Number.isNaN(viewItemStateParam)) {
            throw new Error(`ItemIndex is NaN.`);
        }

        // Figure out the `tokenId` that the item is up for auction.
        const itemState: AuctionContract.ReturnValueViewItemState = await viewItemState(viewItemStateParam);

        setTokenID(itemState.token_id);

        const data = serializeTypeValue(
            Number(itemIndexAuction),
            toBuffer(SERIALIZATION_HELPER_SCHEMA_ADDITIONAL_DATA, 'base64'),
        );

        const hexStringData = [...data.buffer].map((b) => b.toString(16).padStart(2, '0')).join('');

        // Generate transfer parameter.
        const transfer = [
            {
                amount,
                // The item index in the auction contract is of type u16.
                // A little endian hex string of 2 bytes represents the index here. E.g. `0100` for item with index 1.
                data: hexStringData,
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

        const payload = Parameter.toHexString(serializeTypeValue(transfer, toBuffer(TRANSFER_SCHEMA, 'base64')));

        return payload;
    } catch (error) {
        throw new Error(`Generating transfer message failed. Orginal error: ${(error as Error).message}`);
    }
}

function signCIS3Message(
    connection: WalletConnection,
    nonce: string,
    expiryTimeSignature: string,
    account: string,
    payload: string,
): Promise<AccountTransactionSignature> {
    const contractAddress = { index: Number(process.env.CIS2_TOKEN_CONTRACT_INDEX), subindex: 0 };
    const contractName = SPONSORED_TX_CONTRACT_NAME;
    const entrypointName = EntrypointName.fromString('transfer');
    const _nonce = Number(nonce);
    const payloadMessage = { data: payload, schema: TRANSFER_SCHEMA };

    // @ts-expect-error Temporary expected ts-error, will be fixed with WalletConnection update
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    return connection.client.signCIS3Message(
        contractAddress,
        contractName,
        entrypointName,
        _nonce,
        expiryTimeSignature,
        account,
        payloadMessage,
    );
}

interface ConnectionProps {
    account: string | undefined;
    connection: WalletConnection;
    setTxHash: (hash: TransactionHash.Type | undefined) => void;
    setTransactionError: (error: string | undefined) => void;
}

/**
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

    /**
     * When submitting the form, the browser wallet is prompt to sign the transferMessage.
     */
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
                    account,
                    data.tokenAmount,
                    data.itemIndex,
                );

                const permitSignature = await signCIS3Message(
                    connection,
                    data.nonce,
                    expiryTimeSignature,
                    account,
                    serializedMessage,
                );

                setSignature(permitSignature[0][0]);
            } catch (err) {
                setSigningError((err as Error).message);
            }
        }
    }

    /**
     * When submitting the form, the generated signature from the previous step is sent to the backend.
     */
    function onSubmitBid(data: FormTypeBid, accountAddress: string | undefined) {
        setTxHash(undefined);
        setTransactionError(undefined);
        setShowMessage(false);

        if (accountAddress && signature) {
            const tx = submitBid(
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
                            validate: validateAccountAddress,
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
