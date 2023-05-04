/**
 * This file has functions to interact with the contract following CIS2 Standard {@link https://proposals.concordium.software/CIS/cis-2.html}
 */

import { SmartContractParameters, WalletApi } from "@concordium/browser-wallet-api-helpers";
import {
	ContractAddress,
	TransactionSummary,
	deserializeReceiveReturnValue,
} from '@concordium/web-sdk';

import { ContractInfo, Cis2ContractInfo } from "./ConcordiumContractClient";
import * as connClient from "./ConcordiumContractClient";
import { TokenInfo } from "./Cis2Types";

export const enum MethodName {
	supports = "supports",
	mint = "mint",
}

/**
 * Throws an error if the input {@link address} does not support CIS2 format.
 * @param provider Wallet provider.
 * @param address Address of a Smart Contract.
 * @returns undefined.
 */
export async function ensureSupportsCis2(
	provider: WalletApi,
	contractInfo: Cis2ContractInfo,
	address: ContractAddress
): Promise<undefined> {
	const paramsJson = ["CIS-2"];
	const retValue = await connClient.invokeContract(
		provider,
		contractInfo,
		address,
		MethodName.supports,
		paramsJson,
	);

	const result = deserializeReceiveReturnValue(retValue, contractInfo.schemaBuffer, contractInfo.contractName, MethodName.supports);
	if (!Object.hasOwn(result[0], "Support")) {
		return Promise.reject("Contract does not support CIS2");
	}
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
		MethodName.mint,
		maxContractExecutionEnergy,
		BigInt(0)
	);
}

export const toTokenId = (integer: number, contractInfo: Cis2ContractInfo) => {
	return integer.toString(16).padStart(contractInfo.tokenIdByteSize * 2, "0");
};
