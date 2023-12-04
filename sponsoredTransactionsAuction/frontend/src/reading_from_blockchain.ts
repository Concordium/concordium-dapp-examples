/* eslint-disable consistent-return */
/* eslint-disable no-alert */
import { toBuffer, deserializeTypeValue, ConcordiumGRPCClient, serializeTypeValue } from '@concordium/web-sdk';
import JSONbig from 'json-bigint';
import {
    CONTRACT_SUB_INDEX,
    AUCTION_CONTRACT_NAME,
    VIEW_ITEM_PARAMETER_SCHEMA,
    VIEW_ITEM_RETURN_VALUE_SCHEMA,
} from './constants';

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

    // eslint-disable-next-line  @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
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
