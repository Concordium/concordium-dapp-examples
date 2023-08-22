import { SmartContractParameters, WalletApi } from '@concordium/browser-wallet-api-helpers';
import { CIS2, ContractAddress, TransactionStatusEnum } from '@concordium/web-sdk';

import * as connClient from './ConcordiumContractClient';
import { ModuleEvent } from './web/Events';
import { getContractEventsByTransactionHash } from './web/WebClient';

interface MintParams {
  owner: { Account: [string] };
  tokens: MintParam[];
}

interface MintParam {
  metadata_url: {
    url: string;
    hash: { None: never[] } | { Some: [number[]] };
  };
  maturity_time: string;
}

/**
 * Structure of a JSON-formatted metadata.
 */
export interface Metadata {
  name?: string;
  description?: string;
  display?: {
    url: string;
  };
  artifact?: {
    url: string;
  };
  unique?: boolean;
  attributes?: Attribute[];
}

export interface Attribute {
  name: string;
  type: string;
  value: string;
  required?: boolean;
  force?: boolean;
}

export interface TokenInfo {
  metadataUrl: CIS2.MetadataUrl;
  maturityTime: Date;
}

export interface BurnParams {
  owner: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
  tokens: { token_id: string; amount: string }[];
}


/**
 * Mints multiple NFT in Contract: {@link nftContractAddress}
 * represented by {@link tokens}
 * @param provider Wallet Provider.
 * @param account Account address.
 * @param tokens Map of Token Id and Metadata Url.
 * @param nftContractAddress CIS-NFT contract address.
 * @param maxContractExecutionEnergy Max allowed energy ot Minting.
 * @returns Transaction outcomes {@link Record<string, TransactionSummary>}
 */
export async function mint(
  provider: WalletApi,
  account: string,
  tokens: TokenInfo[],
  nftContractAddress: ContractAddress,
  contractInfo: connClient.ContractInfo,
  maxContractExecutionEnergy = BigInt(9999),
  onStatusUpdate: (status: TransactionStatusEnum, hash: string) => void = (status, hash) => console.log(status, hash),
): Promise<ModuleEvent[]> {
  const paramJson = {
    owner: {
      Account: [account],
    },
    tokens: tokens.map(
      (token) =>
        ({
          metadata_url: {
            url: token.metadataUrl.url,
            hash: token.metadataUrl.hash ? { Some: [token.metadataUrl.hash] } : { None: [] },
          },
          maturity_time: token.maturityTime.toISOString(),
        } as MintParam),
    ),
  } as MintParams;

  const { txnHash } = await connClient.updateContract(
    provider,
    contractInfo,
    paramJson as unknown as SmartContractParameters,
    account,
    nftContractAddress,
    "mint",
    maxContractExecutionEnergy,
    BigInt(0),
    onStatusUpdate,
  );

  return getContractEventsByTransactionHash(txnHash);
}

export async function retire(
  provider: WalletApi,
  account: string,
  contractAddress: ContractAddress,
  contractInfo: connClient.ContractInfo,
  params: BurnParams,
  maxContractExecutionEnergy = BigInt(9999),
  onStatusUpdate: (status: TransactionStatusEnum, hash: string) => void = (status, hash) => console.log(status, hash),
) {
  const outcomes = await connClient.updateContract(
    provider,
    contractInfo,
    params as unknown as SmartContractParameters,
    account,
    contractAddress,
    "retire",
    maxContractExecutionEnergy,
    BigInt(0),
    onStatusUpdate,
  );

  return outcomes;
}

export async function retract(
  provider: WalletApi,
  account: string,
  contractAddress: ContractAddress,
  contractInfo: connClient.ContractInfo,
  params: BurnParams,
  maxContractExecutionEnergy = BigInt(9999),
  onStatusUpdate: (status: TransactionStatusEnum, hash: string) => void = (status, hash) => console.log(status, hash),
) {
  const outcomes = await connClient.updateContract(
    provider,
    contractInfo,
    params as unknown as SmartContractParameters,
    account,
    contractAddress,
    "retract",
    maxContractExecutionEnergy,
    BigInt(0),
    onStatusUpdate,
  );

  return outcomes;
}

/**
 * Adds a verifier to the contract.
 * @param provider Wallet Provider.
 * @param account Account address.
 * @param nftContractAddress CIS-NFT contract address.
 * @param contractInfo Contract info.
 * @param verifier Verifier address.
 * @param maxContractExecutionEnergy Max allowed energy.
 * @returns Transaction outcomes {@link Record<string, TransactionSummary>}
 */
export async function addVerifier(
  provider: WalletApi,
  account: string,
  nftContractAddress: ContractAddress,
  contractInfo: connClient.ContractInfo,
  verifier: string,
  maxContractExecutionEnergy = BigInt(9999),
  onStatusUpdate: (status: TransactionStatusEnum, hash: string) => void = (status, hash) => console.log(status, hash),
) {
  const paramsJson = {
    verifier: {
      Account: [verifier],
    },
  };

  const outcomes = await connClient.updateContract(
    provider,
    contractInfo,
    paramsJson as unknown as SmartContractParameters,
    account,
    nftContractAddress,
    "addVerifier",
    maxContractExecutionEnergy,
    BigInt(0),
    onStatusUpdate,
  );

  return outcomes;
}

/**
 * Removes a verifier from the contract.
 * @param provider Wallet Provider.
 * @param account Account address.
 * @param nftContractAddress CIS-NFT contract address.
 * @param contractInfo Contract info.
 * @param verifier Verifier address.
 * @param maxContractExecutionEnergy Max allowed energy.
 * @returns Transaction outcomes {@link Record<string, TransactionSummary>}
 */
export async function removeVerifier(
  provider: WalletApi,
  account: string,
  nftContractAddress: ContractAddress,
  contractInfo: connClient.ContractInfo,
  verifier: string,
  maxContractExecutionEnergy = BigInt(9999),
  onStatusUpdate: (status: TransactionStatusEnum, hash: string) => void = (status, hash) => console.log(status, hash),
) {
  const paramsJson = {
    verifier: {
      Account: [verifier],
    },
  };

  const outcomes = await connClient.updateContract(
    provider,
    contractInfo,
    paramsJson as unknown as SmartContractParameters,
    account,
    nftContractAddress,
    "removeVerifier",
    maxContractExecutionEnergy,
    BigInt(0),
    onStatusUpdate,
  );

  return outcomes;
}

/**
 * Verifies a token.
 * @param provider Wallet Provider.
 * @param account Account address.
 * @param nftContractAddress CIS-NFT contract address.
 * @param contractInfo Contract info.
 * @param tokenId Token Id.
 * @param maxContractExecutionEnergy Max allowed energy.
 * @returns Transaction outcomes {@link Record<string, TransactionSummary>}
 */
export async function verify(
  provider: WalletApi,
  account: string,
  nftContractAddress: ContractAddress,
  contractInfo: connClient.ContractInfo,
  tokenId: string,
  maxContractExecutionEnergy = BigInt(9999),
  onStatusUpdate: (status: TransactionStatusEnum, hash: string) => void = (status, hash) => console.log(status, hash),
) {
  const paramsJson = {
    token_id: tokenId,
  };

  const outcomes = await connClient.updateContract(
    provider,
    contractInfo,
    paramsJson as unknown as SmartContractParameters,
    account,
    nftContractAddress,
    "verify",
    maxContractExecutionEnergy,
    BigInt(0),
    onStatusUpdate,
  );

  return outcomes;
}
