import {
    toBuffer,
    deserializeTypeValue,
    ConcordiumGRPCClient,
    serializeTypeValue,
    AccountAddress,
    ReceiveName,
    ContractAddress,
    EntrypointName,
} from '@concordium/web-sdk';
import JSONbig from 'json-bigint';
import {
    CONTRACT_SUB_INDEX,
    AUCTION_CONTRACT_NAME,
    VIEW_ITEM_PARAMETER_SCHEMA,
    VIEW_ITEM_RETURN_VALUE_SCHEMA,
} from './constants';

/*
 * This function views an item from the auction contract.
 */
export async function viewItemState(rpcClient: ConcordiumGRPCClient, itenIndex: string) {
    const param = serializeTypeValue(Number(itenIndex), toBuffer(VIEW_ITEM_PARAMETER_SCHEMA, 'base64'));

    const res = await rpcClient.invokeContract({
        method: ReceiveName.create(AUCTION_CONTRACT_NAME, EntrypointName.fromString('viewItemState')),
        contract: ContractAddress.create(BigInt(Number(process.env.AUCTION_CONTRACT_INDEX)), CONTRACT_SUB_INDEX),
        parameter: param,
    });

    if (!res || res.tag === 'failure' || !res.returnValue) {
        throw new Error(
            `RPC call 'invokeContract' on method '${AUCTION_CONTRACT_NAME.value}.viewItemState' of contract '${
                process.env.AUCTION_CONTRACT_INDEX
            }' failed. Response: ${JSONbig.stringify(res)}`,
        );
    }

    const returnValues = deserializeTypeValue(
        res.returnValue.buffer,
        toBuffer(VIEW_ITEM_RETURN_VALUE_SCHEMA, 'base64'),
    );

    if (returnValues === undefined) {
        throw new Error(
            `Deserializing the returnValue from the '${AUCTION_CONTRACT_NAME.value}.viewItemState' method of contract '${process.env.AUCTION_CONTRACT_INDEX}' failed`,
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
    const res = await rpcClient.getAccountInfo(AccountAddress.fromBase58(account));
    const publicKey = res?.accountCredentials[0].value.contents.credentialPublicKeys.keys[0].verifyKey;
    return publicKey;
}
