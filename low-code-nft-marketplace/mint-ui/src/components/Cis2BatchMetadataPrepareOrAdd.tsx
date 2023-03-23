import { useState } from "react";

import { TokenInfo } from "../models/Cis2Types";
import Cis2BatchMetadataAdd from "./Cis2BatchMetadataAdd";
import Cis2BatchMetadataPrepare from "./Cis2BatchMetadataPrepare";
import { Stack, Typography } from "@mui/material";
import { Cis2ContractInfo } from "../models/ConcordiumContractClient";

function Cis2BatchMetadataPrepareOrAdd(props: {
	contractInfo: Cis2ContractInfo;
	files?: File[];
	pinataJwt?: string;
	onDone: (tokens: { [tokenId: string]: TokenInfo }) => void;
}) {
	const [state, setState] = useState({
		isPrepDone: props.files && props.files.length ? false : true,
		isAddDone: false,
		tokens: {},
	});

	function onPrepDone(tokens: { [tokenId: string]: TokenInfo }) {
		const tokensCombined = { ...state.tokens, ...tokens };

		setState({
			...state,
			isPrepDone: true,
			tokens: tokensCombined,
		});

		if (state.isAddDone) {
			props.onDone(tokensCombined);
		}
	}

	function onAddDone(tokens: { [tokenId: string]: TokenInfo }) {
		const tokensCombined = { ...state.tokens, ...tokens };
		setState({
			...state,
			isAddDone: true,
			tokens: tokensCombined,
		});

		if (state.isPrepDone) {
			props.onDone(tokensCombined);
		}
	}

	return (
		<Stack>
			{props.files && props.files.length && props.pinataJwt ? (
				<Cis2BatchMetadataPrepare
					contractInfo={props.contractInfo}
					files={props.files}
					pinataJwt={props.pinataJwt}
					onDone={onPrepDone}
				/>
			) : (
				<Typography variant="body1" component="div" gutterBottom>
					{/* No uploaded Files */}
				</Typography>
			)}

			<Cis2BatchMetadataAdd
				contractInfo={props.contractInfo}
				onDone={onAddDone}
				startingTokenId={props.files?.length || 0}
			/>
		</Stack>
	);
}

export default Cis2BatchMetadataPrepareOrAdd;
