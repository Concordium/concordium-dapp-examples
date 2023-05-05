/**
 * This file has functions to interact with the contract following CIS2 Standard {@link https://proposals.concordium.software/CIS/cis-2.html}
 */

import { SmartContractParameters, WalletApi } from "@concordium/browser-wallet-api-helpers";
import {
	ContractAddress,
	TransactionSummary,
} from '@concordium/web-sdk';

import { ContractInfo, Cis2ContractInfo } from "./ConcordiumContractClient";
import * as connClient from "./ConcordiumContractClient";
import { TokenInfo } from "./Cis2Types";

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
	tokens: { [tokenId: string]: TokenInfo },
	nftContractAddress: ContractAddress,
	contractInfo: ContractInfo,
	maxContractExecutionEnergy = BigInt(9999)
): Promise<Record<string, TransactionSummary>> {
	const paramJson = {
		owner: {
			Account: [account],
		},
		tokens: Object.keys(tokens).map((tokenId) => [tokenId, tokens[tokenId]]),
	};

	return connClient.updateContract(
		provider,
		contractInfo,
		paramJson as SmartContractParameters,
		account,
		nftContractAddress,
		"mint",
		maxContractExecutionEnergy,
		BigInt(0)
	);
}

export const toTokenId = (integer: number, contractInfo: Cis2ContractInfo) => {
	return integer.toString(16).padStart(contractInfo.tokenIdByteSize * 2, "0");
};
