import { FormEvent, useState } from "react";
import { TextField, Typography, Button, Stack } from "@mui/material";
import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { ContractAddress } from "@concordium/web-sdk";

import { add } from "../models/MarketplaceClient";
import { toParamContractAddress } from "../models/ConcordiumContractClient";
import { AddParams } from "../models/MarketplaceTypes";

interface MarketplaceAddProps {
	provider: WalletApi;
	account: string;
	marketContractAddress: ContractAddress;
	nftContractAddress: ContractAddress;
	tokenId: string;
	maxQuantity: bigint;
	onDone: () => void;
}

/**
 * Displays UI to add a token to the list of buyable tokens on Marketplace.
 */
function MarketplaceAdd(props: MarketplaceAddProps) {
	const [state, setState] = useState({
		adding: false,
		error: "",
	});

	function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const price = formData.get("price")?.toString() || "";
		const royalty = formData.get("royalty")?.toString() || "0";
		const quantity = formData.get("quantity")?.toString() || "0";

		if (!price || BigInt(price) <= 0) {
			setState({ ...state, error: "Invalid Price" });
			return;
		}

		if (!royalty || parseInt(royalty) < 0) {
			setState({ ...state, error: "Invalid Royalty" });
			return;
		}

		if (
			!quantity ||
			BigInt(quantity) <= 0 ||
			BigInt(quantity) > props.maxQuantity
		) {
			setState({
				...state,
				error: `Invalid Quantity: ${quantity.toString()}, Should be less than Or equal to ${props.maxQuantity.toString()}`,
			});
			return;
		}

		setState({ ...state, adding: true, error: "" });

		const paramJson: AddParams = {
			price,
			royalty: parseInt(royalty) * 100, //conversion to basis points
			nft_contract_address: toParamContractAddress(props.nftContractAddress),
			token_id: props.tokenId,
			quantity,
		};

		add(props.provider, props.account, props.marketContractAddress, paramJson)
			.then(() => {
				setState({ ...state, error: "", adding: false });
				props.onDone();
			})
			.catch((err: Error) => {
				setState({ ...state, error: err.message, adding: false });
			});
	}

	return (
		<Stack component={"form"} onSubmit={submit} spacing={2}>
			<TextField
				id="token-id"
				label="Token Id"
				variant="standard"
				value={props.tokenId}
				disabled
				fullWidth
			/>
			<TextField
				name="price"
				id="price"
				type="number"
				label="Token Price in CCD"
				variant="standard"
				fullWidth
				disabled={state.adding}
				required
			/>
			<TextField
				name="royalty"
				id="royalty"
				type="number"
				label="Primary Seller Royalty %"
				variant="standard"
				fullWidth
				disabled={state.adding}
				required
				defaultValue="0"
			/>
			<TextField
				name="quantity"
				id="quantity"
				type="number"
				label="Quantity"
				variant="standard"
				fullWidth
				disabled={state.adding}
				required
				defaultValue={props.maxQuantity.toString()}
			/>
			{state.error && (
				<Typography
					color={"error"}
					variant={"body1"}
					component="div"
					gutterBottom
				>
					{state.error}
				</Typography>
			)}
			{state.adding && (
				<Typography variant={"body1"} component="div" gutterBottom>
					Adding..
				</Typography>
			)}
			<Button variant="contained" disabled={state.adding} type="submit">
				Add
			</Button>
		</Stack>
	);
}

export default MarketplaceAdd;
