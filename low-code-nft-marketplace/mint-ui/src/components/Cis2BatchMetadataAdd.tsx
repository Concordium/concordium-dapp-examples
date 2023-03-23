import { Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { useState } from "react";

import { toTokenId } from "../models/Cis2Client";
import { TokenInfo } from "../models/Cis2Types";
import { Cis2ContractInfo } from "../models/ConcordiumContractClient";
import Cis2BatchItemMetadataAdd from "./Cis2BatchItemMetadataAdd";

function Cis2BatchMetadataAdd(props: {
	contractInfo: Cis2ContractInfo;
	onDone: (tokens: { [tokenId: string]: TokenInfo }) => void;
	startingTokenId: number;
}) {
	const [state, setState] = useState<{
		error: string;
		tokens: { tokenId: string; tokenInfo?: TokenInfo }[];
	}>({
		error: "",
		tokens: [],
	});

	function onMetadataPrepared(
		index: number,
		tokenId: string,
		tokenInfo: TokenInfo
	) {
		let tokens = [...state.tokens];
		tokens[index] = { tokenId, tokenInfo };
		setState({ ...state, tokens });
	}

	function onAdd() {
		let tokens = [...state.tokens];
		tokens.push({
			tokenId: toTokenId(
				tokens.length + 1 + props.startingTokenId,
				props.contractInfo
			),
		});

		setState({ ...state, tokens });
	}

	function onRemove(index: number) {
		let tokens = [...state.tokens];
		tokens.splice(index, 1);

		setState({ ...state, tokens });
	}

	function onDone() {
		setState({ ...state, error: "" });
		const anyInValidForm = state.tokens.findIndex(
			(t) => !t.tokenInfo || !t.tokenId
		);

		if (anyInValidForm > -1) {
			setState({ ...state, error: "Invalid Values. Please check again" });
			return;
		}

		var ret: { [tokenId: string]: TokenInfo } = {};
		state.tokens
			.filter((t) => t.tokenInfo)
			.forEach((t) => (ret[t.tokenId] = t.tokenInfo!));

		props.onDone(ret);
	}

	return (
		<>
			{state.error && (
				<div>
					<Typography>{state.error}</Typography>
				</div>
			)}
			<ButtonGroup fullWidth>
				<Button onClick={() => onAdd()} variant="contained" size="large">
					Add New Metadata Url
				</Button>
			</ButtonGroup>
			<Grid container spacing={2} padding="10px">
				{state.tokens.map((token, index) => (
					<Grid item xs={4} key={index.toString()}>
						<Cis2BatchItemMetadataAdd
							contractInfo={props.contractInfo}
							index={index}
							tokenId={token.tokenId}
							onDone={(data) =>
								onMetadataPrepared(index, data.tokenId, data.tokenInfo)
							}
							onCancel={(index: number) => onRemove(index)}
						/>
					</Grid>
				))}
			</Grid>
			<ButtonGroup fullWidth>
				<Button onClick={() => onDone()} size="large">
					Done
				</Button>
			</ButtonGroup>
		</>
	);
}

export default Cis2BatchMetadataAdd;
