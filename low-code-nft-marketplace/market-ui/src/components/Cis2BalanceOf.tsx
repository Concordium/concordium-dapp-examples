import { useState } from "react";
import {
	TextField,
	Typography,
	Button,
	Stack,
	ButtonGroup,
} from "@mui/material";
import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import {
	ContractAddress,
	InvokeContractFailedResult,
	RejectReasonTag,
} from "@concordium/web-sdk";

import { balanceOf, isValidTokenId } from "../models/Cis2Client";
import { Cis2ContractInfo } from "../models/ConcordiumContractClient";

function Cis2BalanceOf(props: {
	provider: WalletApi;
	account: string;
	cis2ContractAddress: ContractAddress;
	contractInfo: Cis2ContractInfo;
	onDone: (tokenId: string, balance: bigint) => void;
}) {
	const [state, setState] = useState({
		checking: false,
		error: "",
		tokenId: "",
	});

	function checkBalance() {
		setState({ ...state, checking: true, error: "" });
		balanceOf(
			props.provider,
			props.account,
			props.cis2ContractAddress,
			props.contractInfo,
			state.tokenId
		)
			.then((balance) => {
				if (balance > 0) {
					setState({ ...state, checking: false, error: "" });
					props.onDone(state.tokenId, balance);
				} else {
					setState({ ...state, checking: false, error: "Not enough balance" });
				}
			})
			.catch((err: Error) => {
				if (err.cause) {
					let cause = err.cause as InvokeContractFailedResult;
					if (cause.reason.tag === RejectReasonTag.RejectedReceive) {
						switch (cause.reason.rejectReason) {
							case -42000001:
								setState({
									...state,
									checking: false,
									error: "Token not found",
								});
								return;
							case -42000002:
								setState({
									...state,
									checking: false,
									error: "Insufficient Funds",
								});
								return;
							case -42000003:
								setState({ ...state, checking: false, error: "Unauthorized" });
								return;
						}
					}
				}
				setState({ ...state, checking: false, error: err.message });
			});
	}

	function isValid() {
		return (
			!!state.tokenId &&
			isValidTokenId(state.tokenId, props.contractInfo)
		);
	}

	function onOkClicked() {
		checkBalance();
	}

	return (
		<Stack component={"form"} spacing={2}>
			<TextField
				id="token-id"
				label="Token Id"
				variant="standard"
				value={state.tokenId}
				onChange={(v) => setState({ ...state, tokenId: v.target.value })}
				disabled={state.checking}
			/>
			{state.error && (
				<Typography component="div" color="error" variant="button">
					{state.error}
				</Typography>
			)}
			{state.checking && <Typography component="div">Checking..</Typography>}
			<ButtonGroup fullWidth size="large" disabled={state.checking}>
				<Button
					variant="contained"
					disabled={!isValid()}
					onClick={() => onOkClicked()}
				>
					Ok
				</Button>
			</ButtonGroup>
		</Stack>
	);
}

export default Cis2BalanceOf;
