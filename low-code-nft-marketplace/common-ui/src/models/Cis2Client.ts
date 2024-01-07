import { SmartContractParameters, WalletApi } from "@concordium/browser-wallet-api-helpers";
import { CIS2, ContractAddress, BlockItemSummaryInBlock } from "@concordium/web-sdk";

import * as conClient from "./ConcordiumContractClient";

/**
 * Structure of a JSON-formatted metadata.
 */
export interface Metadata {
  name?: string;
  description?: string;
  display?: {
    url: string;
  };
  unique?: boolean;
  attributes?: Attribute[];
}

export interface Attribute {
  name: string;
  type: string;
  value: string;
}

/**
 * Mints multiple NFT in Contract: {@link tokenContractAddress}
 * represented by {@link tokens}
 * @param provider Wallet Provider.
 * @param account Account address.
 * @param tokens Map of Token Id and Metadata Url.
 * @param tokenContractAddress Token contract address.
 * @param contractInfo Contract info of CIS-2 contract.
 * @param maxContractExecutionEnergy Max allowed energy ot Minting.
 * @returns Transaction outcomes {@link Record<string, TransactionSummary>}
 */
export async function mint(
  provider: WalletApi,
  account: string,
  tokens: { [tokenId: string]: [CIS2.MetadataUrl, string] },
  tokenContractAddress: ContractAddress,
  contractInfo: conClient.ContractInfo,
  maxContractExecutionEnergy = BigInt(9999),
): Promise<{ txnHash: string; outcomes: BlockItemSummaryInBlock }> {
  const paramJson = {
    owner: {
      Account: [account],
    },
    tokens: Object.keys(tokens).map((tokenId) => [
      tokenId,
      {
        metadata_url: {
          url: tokens[tokenId][0].url,
          hash: tokens[tokenId][0].hash
            ? {
              Some: [tokens[tokenId][0].hash!],
            }
            : {
              None: [],
            },
        },
        token_amount: tokens[tokenId][1],
      },
    ]),
  };

  return conClient.updateContract(
    provider,
    contractInfo,
    paramJson as SmartContractParameters,
    account,
    tokenContractAddress,
    "mint",
    maxContractExecutionEnergy,
    BigInt(0)
  );
}

export const toTokenId = (integer: number, contractInfo: conClient.Cis2ContractInfo) => {
  return integer.toString(16).padStart(contractInfo.tokenIdByteSize * 2, "0");
};