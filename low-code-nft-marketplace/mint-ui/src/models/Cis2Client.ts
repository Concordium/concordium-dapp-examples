/**
 * This file has functions to interact with the contract following CIS2 Standard {@link https://proposals.concordium.software/CIS/cis-2.html}
 */

import { Buffer } from "buffer/";
import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import {
	ContractAddress,
	TransactionSummary,
	AccountAddress,
} from "@concordium/web-sdk";

import { Cis2Deserializer } from "./Cis2Deserializer";
import {
	MetadataUrl,
	OperatorOfQuery,
	OperatorOfQueryParams,
	UpdateOperatorParams,
} from "./Cis2Types";
import { ContractInfo, Cis2ContractInfo } from "./ConcordiumContractClient";
import * as connClient from "./ConcordiumContractClient";

export const enum MethodName {
	operatorOf = "operatorOf",
	supports = "supports",
	balanceOf = "balanceOf",
	updateOperator = "updateOperator",
	mint = "mint",
	tokenMetadata = "tokenMetadata",
}

/**
 * Initializes CIS2-NFT contract.
 * @param provider Wallet Provider.
 * @param account Account to initialize the contract with.
 * @returns
 */
export async function initContract(
	provider: WalletApi,
	contractInfo: ContractInfo,
	account: string
): Promise<ContractAddress> {
	return await connClient.initContract(provider, contractInfo, account);
}

/**
 * Checks wether the input market address in an Operator Of the input account in the CIS2 contract.
 * @param provider Wallet Provider.
 * @param account Account address.
 * @param marketAddress Marketplace Contract Address.
 * @param cis2Address CIS2-NFT contract address.
 * @returns true if @see marketAddress is an operator of @see account in @see cis2Address
 */
export async function isOperator(
	provider: WalletApi,
	account: string,
	marketAddress: ContractAddress,
	cis2Address: ContractAddress,
	contractInfo: Cis2ContractInfo
): Promise<boolean> {
	const params = [
		{
			owner: {
				Account: [account],
			},
			address: {
				Contract: [connClient.toParamContractAddress(marketAddress)],
			},
		} as OperatorOfQuery,
	] as OperatorOfQueryParams;

	const retValue = await invokeContract(
		provider,
		cis2Address,
		MethodName.operatorOf,
		params,
		contractInfo
	);

	let parsedResult = new Cis2Deserializer(
		retValue
	).readOperatorOfQueryResponse();
	return parsedResult[0];
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
	const retValue = await invokeContract(
		provider,
		address,
		MethodName.supports,
		paramsJson,
		contractInfo
	);

	let parsedResult = new Cis2Deserializer(retValue).readSupportsQueryResponse();

	if (!parsedResult.results || parsedResult.results[0].type !== "Support") {
		return Promise.reject("Contract does not support CIS2");
	}
}

/**
 * Gets token balance of an account.
 * @param provider Wallet Provider.
 * @param account Account to check the balance.
 * @param nftAddress Address of CIS2 smart contract.
 * @param tokenId Hex encoded Token Id.
 * @returns Balance of the {@link tokenId} Token for account {@link account} in CIS2 contract {@link nftAddress}
 */
export async function balanceOf(
	provider: WalletApi,
	account: string,
	nftAddress: ContractAddress,
	contractInfo: Cis2ContractInfo,
	tokenId: string
): Promise<bigint> {
	const paramsJson = [
		{
			token_id: tokenId,
			address: { Account: [account] },
		},
	];

	const retValue = await invokeContract(
		provider,
		nftAddress,
		MethodName.balanceOf,
		paramsJson,
		contractInfo
	);

	let parsedResult = new Cis2Deserializer(
		retValue
	).readBalanceOfQueryResponse();

	return parsedResult[0] as bigint;
}

/**
 * Gets token Metadata Url.
 * @param provider Wallet Provider.
 * @param account Account address.
 * @param nftContractAddress Contract Address.
 * @param tokenId Hex encoded Token Id.
 * @returns Token Metadata {@link MetadataUrl}
 */
export async function getTokenMetadata(
	provider: WalletApi,
	account: string,
	contractInfo: Cis2ContractInfo,
	nftContractAddress: ContractAddress,
	tokenId: string
): Promise<MetadataUrl> {
	const params = [tokenId];
	const retValue = await invokeContract(
		provider,
		nftContractAddress,
		MethodName.tokenMetadata,
		params,
		contractInfo,
		new AccountAddress(account)
	);
	return new Cis2Deserializer(retValue).readTokenMetadata();
}

/**
 * Updates the operator for Account: {@link account}
 * in Contract: {@link nftContractAddress} to Contract: {@link marketAddress}
 * @param provider Wallet Provider.
 * @param account Account address.
 * @param marketAddress Marketplace contract address.
 * @param nftContractAddress CIS2-NFT contract address.
 * @param maxContractExecutionEnergy Max energy to spend on the operation.
 * @returns Transaction outcomes {@link Record<string, TransactionSummary>}
 */
export async function updateOperator(
	provider: WalletApi,
	account: string,
	marketAddress: ContractAddress,
	nftContractAddress: ContractAddress,
	contractInfo: ContractInfo,
	maxContractExecutionEnergy = BigInt(6000)
): Promise<Record<string, TransactionSummary> | undefined> {
	const paramJson = [
		{
			update: { Add: {} },
			operator: {
				Contract: [connClient.toParamContractAddress(marketAddress)],
			},
		},
	] as UpdateOperatorParams;

	return updateContract(
		provider,
		paramJson,
		account,
		nftContractAddress,
		MethodName.updateOperator,
		contractInfo,
		maxContractExecutionEnergy,
		BigInt(0)
	);
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
export async function mint<T>(
	provider: WalletApi,
	account: string,
	tokens: { [tokenId: string]: T },
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

	return updateContract(
		provider,
		paramJson,
		account,
		nftContractAddress,
		MethodName.mint,
		contractInfo,
		maxContractExecutionEnergy,
		BigInt(0)
	);
}

/**
 * Invokes a CIS2 Smart Contract.
 */
async function invokeContract<T>(
	provider: WalletApi,
	contract: ContractAddress,
	methodName: MethodName,
	params: T,
	contractInfo: ContractInfo,
	invoker?: ContractAddress | AccountAddress
): Promise<Buffer> {
	return connClient.invokeContract(
		provider,
		contractInfo,
		contract,
		methodName,
		params,
		invoker
	);
}

/**
 * Updates a CIS2 Smart Contract.
 */
async function updateContract<T>(
	provider: WalletApi,
	paramJson: T,
	account: string,
	contractAddress: ContractAddress,
	methodName: MethodName,
	contractInfo: ContractInfo,
	maxContractExecutionEnergy: bigint,
	ccdAmount: bigint
): Promise<Record<string, TransactionSummary>> {
	return connClient.updateContract(
		provider,
		contractInfo,
		paramJson,
		account,
		contractAddress,
		methodName,
		maxContractExecutionEnergy,
		ccdAmount
	);
}

/**
 * Checks if an input hex encoded token id is a valid token id.
 * @param tokenIdHex Hex encoded token id.
 * @param byteSize Size of the token in bytes in the Contract.
 * @returns true if token is valid.
 */
export function isValidTokenId(
	tokenIdHex: string,
	contractInfo: Cis2ContractInfo
): boolean {
	try {
		let buff = Buffer.from(tokenIdHex, "hex");
		let parsedTokenIdHex = Buffer.from(
			buff.subarray(0, contractInfo.tokenIdByteSize)
		).toString("hex");

		return parsedTokenIdHex === tokenIdHex;
	} catch (error) {
		console.error(error);
		return false;
	}
}

export const toTokenId = (integer: number, contractInfo: Cis2ContractInfo) => {
	return integer.toString(16).padStart(contractInfo.tokenIdByteSize * 2, "0");
};
