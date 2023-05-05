import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { CIS2Contract } from "@concordium/web-sdk";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchJson } from "../models/Utils";
import { Metadata } from "../models/Cis2Types";

function Cis2MetadataImageLazy(props: {
	provider: WalletApi;
	account: string;
	tokenId: string;
	cis2Contract: CIS2Contract;
}) {
	const [state, setState] = useState<{
		metadata?: Metadata;
		error?: string;
		loading: boolean;
	}>({ loading: false });

	useEffect(() => {
		if (state.metadata) {
			return;
		}

		setState({ ...state, loading: true });
		props.cis2Contract.tokenMetadata(props.tokenId)
			.then((m) => fetchJson<Metadata>(m.url))
			.then((metadata) => {
				setState({ ...state, loading: false, metadata });
			});
	}, [props.tokenId, props.cis2Contract]);

	return state.loading ? (
		<Skeleton variant="rectangular" width={"100%"} height={"200px"} />
	) : (
		<img
			src={state.metadata?.display?.url}
			srcSet={state.metadata?.display?.url}
			alt={state.metadata?.name}
			loading="lazy"
			width="100%"
		/>
	);
}

export default Cis2MetadataImageLazy;
