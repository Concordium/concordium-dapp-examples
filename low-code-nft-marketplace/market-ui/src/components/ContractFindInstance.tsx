import { FormEvent, useState } from "react";
import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { ContractAddress } from "@concordium/web-sdk";
import {
	TextField,
	Typography,
	Button,
	Stack,
} from "@mui/material";

import { getInstanceInfo } from "../models/ConcordiumContractClient";

function ContractFindInstance(props: {
	provider: WalletApi;
	onDone: (address: ContractAddress) => void;
}) {
	const [state, setState] = useState({
		error: "",
		checking: false,
	});

	function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setState({ ...state, error: "", checking: true });
		const formData = new FormData(event.currentTarget);

		const index = BigInt(formData.get("contractIndex")?.toString() || "0");
		const subindex = BigInt(
			formData.get("contractSubindex")?.toString() || "0"
		);

		if (!(index >= 0)) {
			setState({ ...state, error: "Invalid Contract Index" });
			return;
		}

		if (!(subindex >= 0)) {
			setState({ ...state, error: "Invalid Contract Subindex" });
			return;
		}

		const address = { index, subindex };
		getInstanceInfo(props.provider, address)
			.then((info) => {
				setState({ ...state, checking: false, error: "" });
				props.onDone(address);
			})
			.catch((e: Error) => {
				setState({ ...state, checking: false, error: e.message });
			});
	}

	return (
		<Stack
			component={"form"}
			spacing={2}
			onSubmit={submit}
			autoComplete={"true"}
		>
			<TextField
				id="contract-index"
				name="contractIndex"
				label="Contract Index"
				variant="standard"
				type={"number"}
				disabled={state.checking}
			/>
			<TextField
				id="contract-subindex"
				name="contractSubindex"
				label="Contract Sub Index"
				variant="standard"
				type={"number"}
				disabled={state.checking}
				value={0}
			/>
			{state.error && (
				<Typography component="div" color="error">
					{state.error}
				</Typography>
			)}
			{state.checking && <Typography component="div">Checking..</Typography>}
			<Button
				type="submit"
				variant="contained"
				disabled={state.checking}
				fullWidth
				size="large"
				sx={{ maxWidth: "100px" }}
			>
				Find
			</Button>
		</Stack>
	);
}

export default ContractFindInstance;
