import { useState } from "react";
import { Typography, Grid } from "@mui/material";

import { TokenInfo } from "../models/Cis2Types";
import Cis2BatchItemMetadataPrepare from "./Cis2BatchItemMetadataPrepare";
import { Cis2ContractInfo } from "../models/ConcordiumContractClient";
import { toTokenId } from "../models/Cis2Client";

function Cis2BatchMetadataPrepare(props: {
	files: File[];
	pinataJwt: string;
	contractInfo: Cis2ContractInfo;
	onDone: (tokens: { [tokenId: string]: TokenInfo }) => void;
}) {
	let filesMap: {
		[filename: string]: {
			file: File;
			tokenId?: string;
			tokenInfo?: TokenInfo;
		};
	} = {};
	props.files.forEach((file) => (filesMap[file.name] = { file }));

	const [state, setState] = useState({
		files: filesMap,
		error: "",
		filesCount: props.files.length,
		preparedFilesCount: 0,
	});

	function onMetadataPrepared(
		filename: string,
		tokenId: string,
		tokenInfo: TokenInfo
	) {
		const newState = {
			files: {
				...state.files,
				[filename]: {
					...state.files[filename],
					tokenId,
					tokenInfo,
				},
			},
		};

		var preparedFilesCount = Object.values(newState.files).filter(
			(f) => f.tokenId && f.tokenInfo
		).length;

		setState({ ...state, ...newState, preparedFilesCount });

		if (preparedFilesCount === props.files.length) {
			var ret: { [tokenId: string]: TokenInfo } = {};
			Object.values(newState.files).forEach(
				(f) => (ret[f.tokenId as string] = f.tokenInfo as TokenInfo)
			);

			props.onDone(ret);
		}
	}

	return (
		<>
			{state.error && (
				<div>
					<Typography>{state.error}</Typography>
				</div>
			)}
			<Typography>
				Total no of files : {state.preparedFilesCount} / {props.files.length}
			</Typography>
			<Grid container spacing={2} padding="10px">
				{props.files.map((file, index) => (
					<Grid item xs={4} key={file.name}>
						<Cis2BatchItemMetadataPrepare
							file={file}
							tokenId={toTokenId(index + 1, props.contractInfo)}
							pinataJwtKey={props.pinataJwt}
							contractInfo={props.contractInfo}
							onDone={(data) =>
								onMetadataPrepared(file.name, data.tokenId, data.tokenInfo)
							}
						/>
					</Grid>
				))}
			</Grid>
		</>
	);
}

export default Cis2BatchMetadataPrepare;
