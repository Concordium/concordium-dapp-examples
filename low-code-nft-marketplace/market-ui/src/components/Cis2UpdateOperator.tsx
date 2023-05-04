import { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { CIS2Contract, ContractAddress } from "@concordium/web-sdk";

import { Cis2ContractInfo, waitAndThrowError } from "../models/ConcordiumContractClient";

function Cis2UpdateOperator(props: {
	provider: WalletApi;
	account: string;
	marketContractAddress: ContractAddress;
	cis2Contract: CIS2Contract;
	contractInfo: Cis2ContractInfo;
	onDone: () => void;
}) {
	const [state, setState] = useState({ updating: false, error: "" });

	function update() {
		setState({ ...state, updating: true, error: "" });
		const { type, payload, parameter: { json } } = props.cis2Contract.createUpdateOperator(
			{ energy: BigInt(6000) },
			{
				address: props.marketContractAddress,
				type: 'add'
			});

		props.provider.sendTransaction(
			props.account,
			type,
			payload,
			json,
			props.contractInfo.schemaBuffer.toString("base64")
		)
			.then(txnHash => waitAndThrowError(props.provider, txnHash))
			.then((_) => {
				setState({ ...state, updating: false, error: "" });
				props.onDone();
			})
			.catch((err: Error) => {
				setState({ ...state, updating: false, error: err.message });
			});
	}

	useEffect(() => {
		if (!state.updating) {
			update();
		}
	}, [props.provider, props.cis2Contract]);

	return (
		<>
			<h3>Update Collection Ownership</h3>
			<div>{state.error && <Typography>{state.error}</Typography>}</div>
			<Button
				variant="contained"
				disabled={state.updating}
				onClick={() => update()}
			>
				{state.updating ? "Updating..." : "Update"}
			</Button>
		</>
	);
}

export default Cis2UpdateOperator;
