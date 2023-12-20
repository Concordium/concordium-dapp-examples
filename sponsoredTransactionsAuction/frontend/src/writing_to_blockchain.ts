import { AccountTransactionType, CcdAmount, UpdateContractPayload } from '@concordium/web-sdk';
import { WalletConnection, typeSchemaFromBase64 } from '@concordium/react-components';
import {
    SPONSORED_TX_CONTRACT_NAME,
    CONTRACT_SUB_INDEX,
    MINT_PARAMETER_SCHEMA,
    ADD_ITEM_PARAMETER_SCHEMA,
    AUCTION_CONTRACT_NAME,
} from './constants';

/*
 * This function sends the bidding signature to back end and other parameters.
 * The back end will then submit the sponsored transaction on behalf of the user.
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
    itemIndexAuction: string | undefined,
) {
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
            expiry_timestamp: expiryTimeSignature,
        }),
    });

    if (!response.ok) {
        const error = (await response.json()) as Error;
        throw new Error(`Unable to submit bid: ${JSON.stringify(error)}`);
    }
    const body = (await response.json()) as string;
    if (body) {
        return body;
    }
    throw new Error('Unable to submit bid');
}

/*
 * This function submits a transaction to mint/airdrop tokens to an account.
 */
export async function mint(connection: WalletConnection, account: string, tokenId: string, to: string) {
    return connection.signAndSendTransaction(
        account,
        AccountTransactionType.Update,
        {
            amount: CcdAmount.zero(),
            address: {
                index: BigInt(Number(process.env.CIS2_TOKEN_CONTRACT_INDEX)),
                subindex: CONTRACT_SUB_INDEX,
            },
            receiveName: `${SPONSORED_TX_CONTRACT_NAME.value}.mint`,
            maxContractExecutionEnergy: 30000n,
        } as unknown as UpdateContractPayload,
        {
            parameters: {
                owner: { Account: [to] },
                metadata_url: {
                    hash: {
                        None: [],
                    },
                    url: 'https://s3.eu-central-1.amazonaws.com/tokens.testnet.concordium.com/ft/wccd', // Hardcoded value for simplicity for this demo dApp. In production, you should consider using a different metadata file for each token_id.
                },
                token_id: `0${Number(tokenId).toString(16)}`.slice(-2),
            },
            schema: typeSchemaFromBase64(MINT_PARAMETER_SCHEMA),
        },
    );
}

/*
 * This function submits a transaction to add an item to the auction contract.
 */
export async function addItem(connection: WalletConnection, account: string, tokenId: string, name: string) {
    return connection.signAndSendTransaction(
        account,
        AccountTransactionType.Update,
        {
            amount: CcdAmount.zero(),
            address: {
                index: BigInt(Number(process.env.AUCTION_CONTRACT_INDEX)),
                subindex: CONTRACT_SUB_INDEX,
            },
            receiveName: `${AUCTION_CONTRACT_NAME.value}.addItem`,
            maxContractExecutionEnergy: 30000n,
        } as unknown as UpdateContractPayload,
        {
            parameters: {
                name,
                end: '2050-01-01T12:00:00Z', // Hardcoded value for simplicity for this demo dApp.
                start: '2000-01-01T12:00:00Z', // Hardcoded value for simplicity for this demo dApp.
                minimum_bid: '0',
                token_id: `0${Number(tokenId).toString(16)}`.slice(-2),
            },
            schema: typeSchemaFromBase64(ADD_ITEM_PARAMETER_SCHEMA),
        },
    );
}
