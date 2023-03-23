import { ContractAddress } from "@concordium/web-sdk";

export function toLocalStorageKey(tokenId: string, contract: ContractAddress): string {
	return `NFT_${tokenId}_${contract.index}_${contract.subindex}`;
}

export async function fetchJson<T>(metadataUrl: string): Promise<T> {
	let res = await fetch(metadataUrl);

	if (!res.ok) {
		return Promise.reject(new Error("Could not load Metadata"));
	}

	let json = await res.json();

	return json as T;
}
