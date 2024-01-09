import { SmartContractParameters, WalletApi } from '@concordium/browser-wallet-api-helpers';
import {
    AccountAddress, BlockItemSummaryInBlock, ConcordiumGRPCClient, ContractAddress,
    deserializeReceiveReturnValue, TransactionStatusEnum
} from '@concordium/web-sdk';

import {
    ContractInfo, invokeContract, ParamContractAddress, toParamContractAddress, updateContract
} from './ConcordiumContractClient';

export const enum MethodNames {
  add = "add",
  transfer = "transfer",
  listOwned = "list_owned",
  list = "list",
}

/**
 * Gets a list of Tokens available to buy.
 * @param provider Wallet Provider.
 * @param marketContractAddress Contract Address.
 * @returns List of buyable tokens.
 */
export async function list(
  grpcClient: ConcordiumGRPCClient,
  marketContractAddress: ContractAddress,
  contractInfo: ContractInfo,
): Promise<TokenList> {
  const retValue = await invokeContract(grpcClient, contractInfo, marketContractAddress, MethodNames.list);
  const retValueDe = deserializeReceiveReturnValue(
    retValue,
    contractInfo.schemaBuffer,
    contractInfo.contractName,
    MethodNames.list,
  );
  const tokens = retValueDe[0].map(
    (t: any) =>
      ({
        contract: t.contract,
        owner: t.owner,
        price: BigInt(t.price),
        primaryOwner: t.primary_owner,
        quantity: BigInt(t.quantity),
        royalty: t.royalty,
        tokenId: t.token_id,
      } as TokenListItem),
  );

  return tokens;
}

export async function listOwned(
  grpcClient: ConcordiumGRPCClient,
  marketContractAddress: ContractAddress,
  contractInfo: ContractInfo,
  account: string,
): Promise<TokenList> {
  const retValue = await invokeContract(
    grpcClient,
    contractInfo,
    marketContractAddress,
    MethodNames.listOwned,
    undefined,
    new AccountAddress(account),
  );
  const retValueDe = deserializeReceiveReturnValue(
    retValue,
    contractInfo.schemaBuffer,
    contractInfo.contractName,
    MethodNames.listOwned,
  );
  const tokens = retValueDe.map(
    (t: any) =>
      ({
        tokenId: t.token_id,
        contract: t.contract,
        owner: t.owner,
        quantity: BigInt(t.quantity),
      } as OwnedTokenListItem),
  );

  return tokens;
}

/**
 * Adds a token to buyable list of tokens in marketplace.
 * @param provider Wallet Provider.
 * @param account Account address.
 * @param marketContractAddress Market place contract Address.
 * @param paramJson Marketplace Add Method Params.
 * @param maxContractExecutionEnergy Max energy allowed for the transaction.
 * @returns Transaction outcomes.
 */
export async function add(
  provider: WalletApi,
  account: string,
  marketContractAddress: ContractAddress,
  paramJson: AddParams,
  contractInfo: ContractInfo,
  maxContractExecutionEnergy = BigInt(9999),
  onStatusUpdate: (status: TransactionStatusEnum, txnHash: string) => void = (status, txnHash) =>
    console.log(`txn #${txnHash}, status:${status}`),
): Promise<{ txnHash: string; outcomes: BlockItemSummaryInBlock }> {
  return updateContract(
    provider,
    contractInfo,
    paramJson as unknown as SmartContractParameters,
    account,
    marketContractAddress,
    MethodNames.add,
    maxContractExecutionEnergy,
    BigInt(0),
    onStatusUpdate,
  );
}

/**
 * Transfers token ownership from the current owner to {@link payerAccount}.
 * @param provider Wallet Provider.
 * @param payerAccount Account address buying the token.
 * @param to Account address receiving the token.
 * @param marketContractAddress Market contract address.
 * @param nftContractAddress CIS-NFT contract address.
 * @param tokenId Hex encoded Token Id
 * @param priceCcd Price of the Token
 * @param maxContractExecutionEnergy Max Energy allowed for the transaction.
 * @returns Transaction outcomes.
 */
export async function transfer({
  provider,
  payerAccount,
  to,
  marketContractAddress,
  nftContractAddress,
  tokenId,
  priceCcd,
  owner,
  quantity,
  contractInfo,
  maxContractExecutionEnergy = BigInt(99999),
  onStatusUpdate = (status, txnHash) => console.log(`txn #${txnHash}, status:${status}`),
}: {
  provider: WalletApi;
  payerAccount: string;
  to: string;
  marketContractAddress: ContractAddress;
  nftContractAddress: ContractAddress;
  tokenId: string;
  priceCcd: bigint;
  owner: string;
  quantity: bigint;
  contractInfo: ContractInfo;
  maxContractExecutionEnergy?: bigint;
  onStatusUpdate?: (status: TransactionStatusEnum, txnHash: string) => void;
}): Promise<{ txnHash: string; outcomes: BlockItemSummaryInBlock }> {
  const paramJson: TransferParams = {
    cis_contract_address: toParamContractAddress(nftContractAddress),
    token_id: tokenId,
    to,
    owner,
    quantity: quantity.toString(),
  };

  return updateContract(
    provider,
    contractInfo,
    paramJson as unknown as SmartContractParameters,
    payerAccount,
    marketContractAddress,
    MethodNames.transfer,
    maxContractExecutionEnergy,
    priceCcd * quantity,
    onStatusUpdate,
  );
}

export type TokenList = TokenListItem[];

export interface TokenListItem {
  /**
   * Hex of token Id
   */
  tokenId: string;
  contract: ContractAddress;
  price: bigint;
  owner: string;
  royalty: number;
  primaryOwner: string;
  quantity: bigint;
}

export type OwnedTokenList = OwnedTokenListItem[];
export interface OwnedTokenListItem {
  tokenId: string;
  contract: ContractAddress;
  owner: string;
  quantity: bigint;
}

export interface AddParams {
  cis_contract_address: ParamContractAddress;
  token_id: string;
  price: string;
  royalty: number;
}

export interface TransferParams {
  cis_contract_address: ParamContractAddress;
  token_id: string;
  to: string;
  owner: string;
  quantity: string;
}
