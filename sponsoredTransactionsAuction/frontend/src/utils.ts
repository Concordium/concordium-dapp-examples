/* eslint-disable consistent-return */
/* eslint-disable no-alert */
import { AccountTransactionType, CcdAmount, UpdateContractPayload } from '@concordium/web-sdk';
import { WalletConnection, typeSchemaFromBase64 } from '@concordium/react-components';
import {
    SPONSORED_TX_CONTRACT_NAME,
    CONTRACT_SUB_INDEX,
    MINT_PARAMETER_SCHEMA,
    ADD_ITEM_PARAMETER_SCHEMA,
    AUCTION_CONTRACT_NAME,
    PERMIT_PARAMETER_SCHEMA,
} from './constants';

/**
 * Send bidding signature to backend.
 */
export async function submitBid(
    backend: string,
    signer: string,
    nonce: string,
    signature: string,
    expiryTimeSignature: string,
    tokenID: string | undefined,
    from: string,
    tokenAmount: string | undefined,
    itemIndexAuction: string | undefined
) {
    if (tokenAmount === undefined) {
        alert('Insert an amount.');
        return '';
    }

    if (itemIndexAuction === undefined) {
        alert('itemIndexAuction needs to be defined.');
        return '';
    }

    if (signer === '') {
        alert('Insert an signer address.');
        return '';
    }

    if (signer.length !== 50) {
        alert('Signer address needs to have 50 digits.');
        return '';
    }

    if (nonce === '') {
        alert('Insert a nonce.');
        return '';
    }

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(Number(nonce))) {
        alert('Your nonce needs to be a number.');
        return '';
    }

    if (signature === '') {
        alert('Insert a signature.');
        return '';
    }

    if (signature.length !== 128) {
        alert('Signature needs to have 128 digits.');
        return '';
    }

    if (tokenID === undefined) {
        alert('tokenID is undefined.');
        return '';
    }

    if (from === '') {
        alert('Insert an `from` address.');
        return '';
    }

    if (from.length !== 50) {
        alert('`From` address needs to have 50 digits.');
        return '';
    }

    const response = await fetch(`${backend}/bid`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({
            signer,
            nonce: Number(nonce),
            signature,
            token_id: tokenID,
            from,
            token_amount: tokenAmount,
            item_index_auction: Number(itemIndexAuction),
            timestamp: expiryTimeSignature,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Unable to submit bid: ${JSON.stringify(error)}`);
    }
    const body = await response.json();
    if (body) {
        return body;
    }
    throw new Error('Unable to submit bid');
}

/**
 * Action for minting a token to the an account.
 */
export async function mint(connection: WalletConnection, account: string, tokenId: string, to: string) {
    return connection.signAndSendTransaction(
        account,
        AccountTransactionType.Update,
        {
            amount: new CcdAmount(BigInt(0n)),
            address: {
                index: BigInt(Number(process.env.CIS2_TOKEN_CONTRACT_INDEX)),
                subindex: CONTRACT_SUB_INDEX,
            },
            receiveName: `${SPONSORED_TX_CONTRACT_NAME}.mint`,
            maxContractExecutionEnergy: 30000n,
        } as unknown as UpdateContractPayload,
        {
            parameters: {
                owner: { Account: [to] },
                metadata_url: {
                    hash: {
                        None: [],
                    },
                    url: 'https://s3.eu-central-1.amazonaws.com/tokens.testnet.concordium.com/ft/wccd',
                },
                token_id: tokenId,
            },
            schema: typeSchemaFromBase64(MINT_PARAMETER_SCHEMA),
        }
    );
}

/**
 * Action for minting a token to the an account.
 */
export async function bid(
    connection: WalletConnection,
    account: string,
    nonce: string,
    payload: number[],
    expiryTimeSignature: string,
    signature: string
) {
    return connection.signAndSendTransaction(
        account,
        AccountTransactionType.Update,
        {
            amount: new CcdAmount(BigInt(0n)),
            address: {
                index: BigInt(Number(process.env.CIS2_TOKEN_CONTRACT_INDEX)),
                subindex: CONTRACT_SUB_INDEX,
            },
            receiveName: `${SPONSORED_TX_CONTRACT_NAME}.permit`,
            maxContractExecutionEnergy: 30000n,
        } as unknown as UpdateContractPayload,
        {
            parameters: {
                message: {
                    contract_address: {
                        index: Number(process.env.CIS2_TOKEN_CONTRACT_INDEX),
                        subindex: 0,
                    },
                    entry_point: 'transfer',
                    nonce: Number(nonce),
                    payload,
                    timestamp: expiryTimeSignature,
                },
                signature: [
                    [
                        0,
                        [
                            [
                                0,
                                {
                                    Ed25519: [signature],
                                },
                            ],
                        ],
                    ],
                ],
                signer: account,
            },
            schema: typeSchemaFromBase64(PERMIT_PARAMETER_SCHEMA),
        }
    );
}

/**
 * Action for adding an item to an auction.
 */
export async function addItem(connection: WalletConnection, account: string, tokenId: string, name: string) {
    return connection.signAndSendTransaction(
        account,
        AccountTransactionType.Update,
        {
            amount: new CcdAmount(BigInt(0n)),
            address: {
                index: BigInt(Number(process.env.AUCTION_CONTRACT_INDEX)),
                subindex: CONTRACT_SUB_INDEX,
            },
            receiveName: `${AUCTION_CONTRACT_NAME}.addItem`,
            maxContractExecutionEnergy: 30000n,
        } as unknown as UpdateContractPayload,
        {
            parameters: {
                name,
                end: '2050-01-01T12:00:00Z',
                start: '2000-01-01T12:00:00Z',
                minimum_bid: '0',
                token_id: tokenId,
            },
            schema: typeSchemaFromBase64(ADD_ITEM_PARAMETER_SCHEMA),
        }
    );
}
