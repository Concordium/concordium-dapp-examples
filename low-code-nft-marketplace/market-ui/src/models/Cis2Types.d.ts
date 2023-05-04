import { ContractAddress } from "@concordium/web-sdk";
import { ParamContractAddress } from "./ConcordiumTypes";

export type TokenIdU32 = number;
export type Address = string | ContractAddress;
export type ContractTokenId = string;
export type OperatorOfQueryResponse = boolean[];
export interface MetadataUrl {
	url: string;
	hash: string;
}
export type TokenInfo = MetadataUrl | [MetadataUrl, string];

export type ParamAddress =
	| { Account: string[] }
	| { Contract: ParamContractAddress[] };

export interface Metadata {
	name: string;
	description: string;
	display: Display;
	unique?: boolean;
	attributes?: Attribute[];
}

export interface Display {
	url: string;
}

export interface Attribute {
	name: string;
	type: string;
	value: string;
}
