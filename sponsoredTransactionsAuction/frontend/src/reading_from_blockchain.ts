import {
    toBuffer,
    deserializeTypeValue,
    ConcordiumGRPCClient,
    serializeTypeValue,
    AccountAddress,
} from '@concordium/web-sdk';
import JSONbig from 'json-bigint';
import {
    CONTRACT_SUB_INDEX,
    AUCTION_CONTRACT_NAME,
    VIEW_ITEM_PARAMETER_SCHEMA,
    VIEW_ITEM_RETURN_VALUE_SCHEMA,
    SPONSORED_TX_CONTRACT_NAME,
    NONCE_OF_PARAMETER_SCHEMA,
    NONCE_OF_RETURN_VALUE_SCHEMA,
} from './constants';

/*
 * This function views an item from the auction contract.
 */
export async function viewItemState(rpcClient: ConcordiumGRPCClient, itenIndex: string) {
    const param = serializeTypeValue(Number(itenIndex), toBuffer(VIEW_ITEM_PARAMETER_SCHEMA, 'base64'));

    const res = await rpcClient.invokeContract({
        method: `${AUCTION_CONTRACT_NAME}.viewItemState`,
        contract: { index: BigInt(Number(process.env.AUCTION_CONTRACT_INDEX)), subindex: CONTRACT_SUB_INDEX },
        parameter: param,
    });

    if (!res || res.tag === 'failure' || !res.returnValue) {
        throw new Error(
            `RPC call 'invokeContract' on method '${AUCTION_CONTRACT_NAME}.viewItemState' of contract '${
                process.env.AUCTION_CONTRACT_INDEX
            }' failed. Response: ${JSONbig.stringify(res)}`
        );
    }

    const returnValues = deserializeTypeValue(
        toBuffer(res.returnValue, 'hex'),
        toBuffer(VIEW_ITEM_RETURN_VALUE_SCHEMA, 'base64')
    );

    if (returnValues === undefined) {
        throw new Error(
            `Deserializing the returnValue from the '${AUCTION_CONTRACT_NAME}.viewItemState' method of contract '${process.env.AUCTION_CONTRACT_INDEX}' failed`
        );
    } else {
        // Return item
        return returnValues;
    }
}

/*
 * This function gets the public key of an account.
 * This function works with a wallet account that has just one public-private key pair in its two-level key map.
 */
export async function getPublicKey(rpcClient: ConcordiumGRPCClient, account: string) {
    const res = await rpcClient.getAccountInfo(new AccountAddress(account));
    const publicKey = res?.accountCredentials[0].value.contents.credentialPublicKeys.keys[0].verifyKey;
    return publicKey;
}

/*
 * This function gets the current nonce of an account from the sponsored enabled token contract.
 */
export async function getNonceOf(rpcClient: ConcordiumGRPCClient, account: string) {
    const param = serializeTypeValue(
        {
            queries: [
                {
                    account,
                },
            ],
        },
        toBuffer(NONCE_OF_PARAMETER_SCHEMA, 'base64')
    );

    const res = await rpcClient.invokeContract({
        method: `${SPONSORED_TX_CONTRACT_NAME}.nonceOf`,
        contract: { index: BigInt(Number(process.env.CIS2_TOKEN_CONTRACT_INDEX)), subindex: CONTRACT_SUB_INDEX },
        parameter: param,
    });

    if (!res || res.tag === 'failure' || !res.returnValue) {
        throw new Error(
            `RPC call 'invokeContract' on method '${SPONSORED_TX_CONTRACT_NAME}.nonceOf' of contract '${
                process.env.CIS2_TOKEN_CONTRACT_INDEX
            }' failed. Response: ${JSONbig.stringify(res)}`
        );
    }

    const returnValues = deserializeTypeValue(
        toBuffer(res.returnValue, 'hex'),
        toBuffer(NONCE_OF_RETURN_VALUE_SCHEMA, 'base64')
    ) as number[][];

    if (returnValues === undefined) {
        throw new Error(
            `Deserializing the returnValue from the '${SPONSORED_TX_CONTRACT_NAME}.nonceOf' method of contract '${process.env.CIS2_TOKEN_CONTRACT_INDEX}' failed`
        );
    } else {
        // Return next nonce of a user
        return returnValues[0][0];
    }
}
