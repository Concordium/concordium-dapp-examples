import { ConcordiumGRPCWebClient } from '@concordium/web-sdk/grpc';
import { CONTRACT_ADDRESS, NODE_HOST, NODE_PORT } from './constants';
import * as Contract from '../generated/module_smart_contract_wallet';
import { Hex, PUBLIC_KEY } from './keys';
import { Buffer } from 'buffer/';
import { ContractAddress } from '@concordium/web-sdk/types';
import { useEffect, useState } from 'react';

const EUROE_ID = ''; // EUROe token ID
const EUROE_CONTRACT_ADDRESS = ContractAddress.create(7260, 0); // EUROe contract address

const grpc = new ConcordiumGRPCWebClient(NODE_HOST, NODE_PORT);
export const client = Contract.createUnchecked(grpc, CONTRACT_ADDRESS);

export const createTokenAmount = (
    amount: bigint | number,
): Contract.ViewInternalTransferMessageHashTokenAmountParameter['service_fee_amount'] => ({
    token_amount: amount,
    token_id: EUROE_ID,
    cis2_token_contract_address: EUROE_CONTRACT_ADDRESS,
});

export async function getNonce(): Promise<[Hex, bigint]> {
    const pubKey = Buffer.from(PUBLIC_KEY).toString('hex');
    const nonce = Contract.parseReturnValueNonceOf(await Contract.dryRunNonceOf(await client, [pubKey]));

    if (nonce?.[0] === undefined) {
        throw new Error('Failed to get nonce for key');
    }

    return [pubKey, BigInt(nonce[0])];
}

export async function getBalance() {
    const public_key = Buffer.from(PUBLIC_KEY).toString('hex');

    const result = await Contract.dryRunBalanceOfCis2Tokens(await client, [
        {
            token_id: EUROE_ID,
            cis2_token_contract_address: EUROE_CONTRACT_ADDRESS,
            public_key,
        },
    ]);
    const balances = Contract.parseReturnValueBalanceOfCis2Tokens(result);
    if (balances === undefined) {
        console.warn('Unexpected balance return value:', balances);
    }
    return BigInt(balances?.[0] ?? 0);
}

export function useBalance(interval: number) {
    const [state, setState] = useState(0n);
    useEffect(() => {
        getBalance().then(setState);
    }, []);
    useEffect(() => {
        const id = setInterval(() => {
            getBalance().then(setState);
        }, interval);
        return () => {
            clearInterval(id);
        };
    }, [interval]);
    return state;
}
