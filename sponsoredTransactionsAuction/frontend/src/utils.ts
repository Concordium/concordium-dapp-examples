import { TransactionHash, ConcordiumGRPCClient, AccountAddress } from '@concordium/web-sdk';

/*
 * This function gets the public key of an account.
 * This function works with a wallet account that has just one public-private key pair in its two-level key map.
 */
export async function getPublicKey(rpcClient: ConcordiumGRPCClient, account: string) {
    const res = await rpcClient.getAccountInfo(AccountAddress.fromBase58(account));
    const publicKey = res?.accountCredentials[0].value.contents.credentialPublicKeys.keys[0].verifyKey;
    return publicKey;
}

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
        return TransactionHash.fromHexString(body);
    }
    throw new Error('Unable to submit bid');
}
