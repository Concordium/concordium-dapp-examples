import { AccountAddress, TransactionHash } from '@concordium/web-sdk';

/*
 * This function sends the bidding signature and other parameters to the back end.
 * The back end will send the sponsored transaction on behalf of the user to the chain.
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
        return TransactionHash.fromHexString(body);
    }
    throw new Error('Unable to submit bid');
}

export function validateAccountAddress(accountAddress: string) {
    try {
        AccountAddress.fromBase58(accountAddress);
    } catch (e) {
        return `Please enter a valid account address. It is a base58 string with a fixed length of 50 characters. Original error: ${
            (e as Error).message
        }.`;
    }
}
