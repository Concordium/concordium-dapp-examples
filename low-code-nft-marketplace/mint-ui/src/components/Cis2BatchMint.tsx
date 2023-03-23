import { useState } from "react";
import { Button, Grid, Typography, Stack } from "@mui/material";
import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { ContractAddress } from "@concordium/web-sdk";

import { mint } from "../models/Cis2Client";
import { TokenInfo } from "../models/Cis2Types";
import Cis2BatchItemMint from "./Cis2BatchItemMint";
import { ContractInfo } from "../models/ConcordiumContractClient";

interface TokenState {
	tokenInfo: TokenInfo;
	minting: boolean;
	minted: boolean;
	error: string;
}

function Cis2BatchMint(props: {
	contractInfo: ContractInfo;
	provider: WalletApi;
	account: string;
	nftContractAddress: ContractAddress;
	tokenMetadataMap: { [tokenId: string]: TokenInfo };
	onDone: (data: { [tokenId: string]: TokenInfo }) => void;
}) {
	var tokens: { [tokenId: string]: TokenState } = {};

	Object.keys(props.tokenMetadataMap).forEach(
		(tokenId) =>
			(tokens[tokenId] = {
				tokenInfo: props.tokenMetadataMap[tokenId],
				minting: false,
				minted: false,
				error: "",
			})
	);

	const [state, setState] = useState({
		tokens,
		mintingCount: 0,
	});

	function onMintClicked() {
		var tokens = state.tokens;
		var mintingCount = Object.keys(tokens).length;
		setTokensState(tokens, true, false);
		setState({
			...state,
			tokens,
			mintingCount: state.mintingCount + mintingCount,
		});
		mint(
			props.provider,
			props.account,
			props.tokenMetadataMap,
			props.nftContractAddress,
			props.contractInfo
		)
			.then((_) => {
				setTokensState(tokens, false, true);
				var mintingCount = Object.keys(tokens).length;
				setState({
					...state,
					tokens,
					mintingCount: state.mintingCount + mintingCount,
				});
				props.onDone(props.tokenMetadataMap);
			})
			.catch((e: Error) => {
				setTokensState(tokens, false, false, e.message);
				var mintingCount = Object.keys(tokens).length;
				setState({
					...state,
					tokens,
					mintingCount: state.mintingCount - mintingCount,
				});
			});
	}

	return (
		<Stack>
			<Typography variant="button" color={"InfoText"}>
				<>
					Contract : {props.nftContractAddress.index.toString()}/
					{props.nftContractAddress.subindex.toString()} ({props.contractInfo.contractName})
				</>
			</Typography>
			<Grid container spacing={2}>
				{Object.keys(state.tokens).map((tokenId) => (
					<Grid item xs={4} key={tokenId}>
						<Cis2BatchItemMint
							contractInfo={props.contractInfo}
							error={state.tokens[tokenId].error}
							key={tokenId}
							tokenInfo={state.tokens[tokenId].tokenInfo}
							minted={state.tokens[tokenId].minted}
							minting={state.tokens[tokenId].minting}
							tokenId={tokenId}
						/>
					</Grid>
				))}
			</Grid>
			<br />
			<Button
				variant="contained"
				disabled={state.mintingCount > 0}
				onClick={() => onMintClicked()}
			>
				Mint
			</Button>
		</Stack>
	);

	function setTokensState(
		tokens: { [tokenId: string]: TokenState },
		isMinting: boolean,
		isMinted: boolean,
		error?: string
	) {
		Object.keys(tokens).forEach((tokenId) => {
			tokens[tokenId].error = error || "";
			tokens[tokenId].minting = isMinting;

			if (isMinting) {
				tokens[tokenId].minted = false;
			} else {
				tokens[tokenId].minted = isMinted;
			}
		});
	}
}

export default Cis2BatchMint;
