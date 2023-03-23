import { ContractAddress } from "@concordium/web-sdk";
import { ParamContractAddress } from "./ConcordiumTypes";

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

export interface AddParams {
	nft_contract_address: ParamContractAddress;
	token_id: string;
	price: string;
	royalty: number;
	quantity: string;
}

export interface TransferParams {
	nft_contract_address: ParamContractAddress;
	token_id: string;
	to: string;
	owner: string;
	quantity: string;
}
