import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { ContractAddress } from "@concordium/web-sdk";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { getTokenMetadata } from "../models/Cis2Client";
import { Metadata } from "../models/Cis2Types";
import { Cis2ContractInfo } from "../models/ConcordiumContractClient";
import { fetchJson, toLocalStorageKey } from "../models/Utils";

function Cis2MetadataImageLazy(props: {
	provider: WalletApi;
	account: string;
	tokenId: string;
	contractAddress: ContractAddress;
	contractInfo: Cis2ContractInfo;
}) {
	const [state, setState] = useState<{
		metadata?: Metadata;
		error?: string;
		loading: boolean;
	}>({ loading: false });

	const localStorageKey = toLocalStorageKey(
		props.tokenId,
		props.contractAddress
	);

	useEffect(() => {
		if (state.metadata) {
			return;
		}

		setState({ ...state, loading: true });
		let nftJson = localStorage.getItem(localStorageKey);
		if (nftJson) {
			setState({ ...state, loading: false, metadata: JSON.parse(nftJson) });
		} else {
			getTokenMetadata(
				props.provider,
				props.account,
				props.contractInfo,
				props.contractAddress,
				props.tokenId
			)
				.then((m) => fetchJson<Metadata>(m.url))
				.then((metadata) => {
					setState({ ...state, loading: false, metadata });
				});
		}
	}, [
		props.tokenId,
		props.contractAddress.index,
		props.contractAddress.subindex,
	]);

	return state.loading ? (
		<Skeleton variant="rectangular" width={"100%"} height={"200px"} />
	) : (
		<img
			src={state.metadata?.display.url}
			srcSet={state.metadata?.display.url}
			alt={state.metadata?.name}
			loading="lazy"
			width="100%"
		/>
	);
}

export default Cis2MetadataImageLazy;
