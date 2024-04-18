import { ConcordiumGRPCWebClient } from '@concordium/web-sdk/grpc';
import { CONTRACT_ADDRESS, NODE_HOST, NODE_PORT } from './constants';
import * as Contract from '../generated/module_smart_contract_wallet';
import { Hex, getPublicKey } from './keys';
import { Buffer } from 'buffer/';
import { ContractAddress } from '@concordium/web-sdk/types';

const EUROE_ID = ''; // EUROe token ID
const EUROE_CONTRACT_ADDRESS = ContractAddress.create(7260, 0); // EUROe contract address

const grpc = new ConcordiumGRPCWebClient(NODE_HOST, NODE_PORT);
export const client = Contract.create(grpc, CONTRACT_ADDRESS);

export const createTokenAmount = (
  amount: bigint | number,
): Contract.ViewInternalTransferMessageHashTokenAmountParameter['service_fee_amount'] => ({
  token_amount: amount,
  token_id: EUROE_ID,
  cis2_token_contract_address: EUROE_CONTRACT_ADDRESS,
});

export async function getNonce(): Promise<[Hex, bigint]> {
  const pubKey = Buffer.from(await getPublicKey()).toString('hex');
  const nonce = Contract.parseReturnValueNonceOf(await Contract.dryRunNonceOf(await client, [pubKey]));

  if (nonce?.[0] === undefined) {
    throw new Error('Failed to get nonce for key');
  }

  return [pubKey, BigInt(nonce[0])];
}
