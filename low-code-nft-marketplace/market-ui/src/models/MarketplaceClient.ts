import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { ContractAddress, TransactionSummary } from "@concordium/web-sdk";

import { MarketplaceDeserializer } from "./MarketplaceDeserializer";
import { AddParams, TokenList, TransferParams } from "./MarketplaceTypes";
import { MARKETPLACE_CONTRACT_INFO } from "../Constants";
import {
	invokeContract,
	toParamContractAddress,
	updateContract,
} from "./ConcordiumContractClient";

const enum MethodNames {
	add = "add",
	transfer = "transfer",
	list = "list",
}

/**
 * Gets a list of Tokens available to buy.
 * @param provider Wallet Provider.
 * @param marketContractAddress Contract Address.
 * @returns List of buyable tokens.
 */
export async function list(
	provider: WalletApi,
	marketContractAddress: ContractAddress
): Promise<TokenList> {
	const retValue = await invokeContract(
		provider,
		MARKETPLACE_CONTRACT_INFO,
		marketContractAddress,
		MethodNames.list
	);

	return new MarketplaceDeserializer(retValue).readTokenList();
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
	maxContractExecutionEnergy = BigInt(9999)
): Promise<Record<string, TransactionSummary>> {
	return updateContract(
		provider,
		MARKETPLACE_CONTRACT_INFO,
		paramJson,
		account,
		marketContractAddress,
		MethodNames.add,
		maxContractExecutionEnergy
	);
}

/**
 * Transfers token ownership from the current owner to {@link account}.
 * @param provider Wallet Provider.
 * @param account Account address buying the token.
 * @param marketContractAddress Market contract address.
 * @param nftContractAddress CIS-NFT contract address.
 * @param tokenId Hex encoded Token Id
 * @param priceCcd Price of the Token
 * @param maxContractExecutionEnergy Max Energy allowed for the transaction.
 * @returns Transaction outcomes.
 */
export async function transfer(
	provider: WalletApi,
	account: string,
	marketContractAddress: ContractAddress,
	nftContractAddress: ContractAddress,
	tokenId: string,
	priceCcd: bigint,
	owner: string,
	quantity: bigint,
	maxContractExecutionEnergy = BigInt(6000)
): Promise<Record<string, TransactionSummary>> {
	const paramJson: TransferParams = {
		nft_contract_address: toParamContractAddress(nftContractAddress),
		token_id: tokenId,
		to: account,
		owner,
		quantity: quantity.toString(),
	};

	return updateContract(
		provider,
		MARKETPLACE_CONTRACT_INFO,
		paramJson,
		account,
		marketContractAddress,
		MethodNames.transfer,
		maxContractExecutionEnergy,
		priceCcd * quantity
	);
}
