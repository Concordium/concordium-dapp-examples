/**
 * This file has functions to interact with the contract following CIS2 Standard {@link https://proposals.concordium.software/CIS/cis-2.html}
 */

import { SmartContractParameters, WalletApi } from '@concordium/browser-wallet-api-helpers';
import { ContractAddress, TransactionSummary } from '@concordium/web-sdk';

import * as connClient from './ConcordiumContractClient';

export interface MetadataUrl {
	url: string;
	hash: string;
}

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
	tokens: { [tokenId: string]: [MetadataUrl, string] },
	nftContractAddress: ContractAddress,
	contractInfo: connClient.ContractInfo,
	maxContractExecutionEnergy = BigInt(9999)
): Promise<Record<string, TransactionSummary>> {
	const paramJson = {
		owner: {
			Account: [account],
		},
		tokens: Object.keys(tokens).map((tokenId) => [tokenId, {
			metadata_url: {
				url: tokens[tokenId][0].url,
				hash: !!tokens[tokenId][0].hash ? {
					Some: [hexToUnsignedInt(tokens[tokenId][0].hash)]
				} : {
					None: []
				}
			},
			token_amount: tokens[tokenId][1],
		}]),
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

export const toTokenId = (integer: number, contractInfo: connClient.Cis2ContractInfo) => {
	return integer.toString(16).padStart(contractInfo.tokenIdByteSize * 2, "0");
};

const hexToUnsignedInt = (inputStr: string) => {
	var hex = inputStr.toString();
	var Uint8Array = new Array<number>();
	for (var n = 0; n < hex.length; n += 2) {
		Uint8Array.push(parseInt(hex.substr(n, 2), 16));
	}

	return Uint8Array;
}