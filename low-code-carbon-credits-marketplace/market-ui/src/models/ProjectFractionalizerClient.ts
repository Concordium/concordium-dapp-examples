import { SmartContractParameters, WalletApi } from '@concordium/browser-wallet-api-helpers';
import { ContractAddress, RejectReasonTag, TransactionStatusEnum } from '@concordium/web-sdk';

import * as connClient from './ConcordiumContractClient';
import { Attribute } from './ProjectNFTClient';
import { ModuleEvent } from './web/Events';
import { getContractEventsByTransactionHash } from './web/WebClient';

export type Option<T> = { None: [] } | { Some: [T] };

export type MintParam = {
  amount: string;
  contract: {
    index: number;
    subindex: number;
  };
  token_id: string;
  metadata: {
    url: string;
    hash: Option<string>;
  };
};

export interface MintParams {
  owner: { Account: [string] };
  tokens: MintParam[];
}

export interface BurnParams {
  owner: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
  tokens: { token_id: string; amount: string }[];
}

/**
 * Adds a token to buyable list of tokens in marketplace.
 * @param provider Wallet Provider.
 * @param account Account address.
 * @param fracContractAddress Market place contract Address.
 * @param paramJson Marketplace Add Method Params.
 * @param maxContractExecutionEnergy Max energy allowed for the transaction.
 * @returns Transaction outcomes.
 */
export async function mint(
  provider: WalletApi,
  account: string,
  fracContractAddress: ContractAddress,
  paramJson: MintParams,
  contractInfo: connClient.ContractInfo,
  maxContractExecutionEnergy = BigInt(9999),
  onStatusUpdate: (status: TransactionStatusEnum, txnHash: string) => void = (status, txnHash) =>
    console.log(`txn #${txnHash}, status:${status}`),
): Promise<ModuleEvent[]> {
  try {
    const { txnHash } = await connClient.updateContract(
      provider,
      contractInfo,
      paramJson as unknown as SmartContractParameters,
      account,
      fracContractAddress,
      "mint",
      maxContractExecutionEnergy,
      BigInt(0),
      onStatusUpdate,
    );

    return getContractEventsByTransactionHash(txnHash);
  } catch (err: any) {
    if (err.cause && err.cause.tag === RejectReasonTag.RejectedReceive) {
      throw new Error(getErrorString(err.cause.rejectReason));
    }
    throw err;
  }
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
 * Error string for fractionalizer contract.
 * This should be kept in sync with the error codes in the contract at contracts/cis2-fractionalizer/src/error.rs.
 * @param error Cis2 Fractionalizer Error Code
 */
function getErrorString(error: number): string {
  switch (error) {
    case -1:
      return "Could not parse the given parameters";
    case -2:
      return "Logs are full";
    case -3:
      return "Logs are Malformed";
    case -4:
      return "Invalid Contract Name";
    case -5:
      return "Only Contracts can call this method";
    case -6:
      return "Error while calling the contract (Invoke Contract Error)";
    case -7:
      return "The token has already been minted";
    case -8:
      return "Invalid Collateral / Invalid transferred CIS2 token";
    case -9:
      return "No Balance to Burn";
    case -10:
      return "Only Accounts can call this method";
    case -11:
      return "CIS2 Client Error";
    case -12:
      return "Method is not implemented";
    default:
      return `Unknown Error Code: ${error}`;
  }
}

export function getDefaultAttributes(copyValuesFrom?: Attribute[]): Attribute[] {
  const attributes = [
    {
      type: "string",
      name: "Registry",
      value: "",
      required: true,
    },
    {
      type: "string",
      name: "Serial Key",
      value: "",
      required: true,
    },
    {
      type: "number",
      name: "Number of Credits",
      value: "1",
      required: true,
      force: true,
    },
    {
      type: "string",
      name: "Project Name",
      value: "",
      required: true,
    },
    {
      type: "string",
      name: "Project Description",
      value: "",
    },
    {
      type: "string",
      name: "Methodology",
      value: "",
    },
    {
      type: "string",
      name: "Vintage",
      value: "",
    },
    {
      type: "string",
      name: "Country",
      value: "",
    },
    {
      type: "string",
      name: "Latitude",
      value: "",
    },
    {
      type: "string",
      name: "Longitude",
      value: "",
    },
    {
      type: "string",
      name: "Token Type",
      value: "Carbon Credit",
      required: true,
      force: true,
    },
  ];

  if (copyValuesFrom) {
    attributes.forEach((attr) => {
      const copyFrom = copyValuesFrom.find((a) => a.name === attr.name);
      if (copyFrom && !attr.value) {
        attr.value = copyFrom.value;
      }
    });
  }

  return attributes;
}

export function getCarbonCreditQuantityAttribute(): Attribute {
  return {
    type: "number",
    name: "Number of Credits",
    value: "",
  };
}
