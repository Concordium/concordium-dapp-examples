import { FormEvent, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { ContractAddress } from "@concordium/web-sdk";

import { TokenListItem } from "../models/MarketplaceTypes";
import { transfer } from "../models/MarketplaceClient";
import {AlertColor, Paper, Typography } from "@mui/material";

import Alert from "../components/ui/Alert";
import { Container } from "@mui/system";


export default function MarketplaceTransferDialog(props: {
	isOpen: boolean;
	token: TokenListItem;
	provider: WalletApi;
	account: string;
	marketContractAddress: ContractAddress;
	onClose: () => void;
}) {
	const [open, setOpen] = useState(props.isOpen);
	const [state, setState] = useState<{
		isBought?: boolean;
		isBeingBought?: boolean;
		error?: string;
		totalAmount?: BigInt;
	}>({
		totalAmount: props.token.quantity * props.token.price,
	});

	const handleClose = () => {
		setOpen(false);
		props.onClose();
	};

	const { token: item, provider, account, marketContractAddress } = props;

	const [alertState, setAlertState] = useState<{
		open: boolean;
		message: string;
		severity?: AlertColor;
	}>({
		open: false,
		message: "",
	});

	function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const quantity = BigInt(formData.get("quantity")?.toString() || "0");

		if (!quantity || quantity > item.quantity || quantity <= 0) {
			setState({ ...state, error: "Invalid Quantity" });
			return;
		}

		setState({
			...state,
			isBought: false,
			isBeingBought: true,
			error: "",
		});

		transfer(
			provider,
			account,
			marketContractAddress,
			item.contract,
			item.tokenId,
			item.price,
			item.owner,
			quantity
		)
			.then((_) => {
				setState({
					...state,
					isBought: true,
					isBeingBought: false,
					error: "",
				});
				// alert("Bought");
				setAlertState({
					open: true,
					message: "Purchase succesful",
					severity: "success"
				});
				// handleClose();
			
			})
			.catch((err) => {
				setState({
					...state,
					isBought: false,
					isBeingBought: false,
					error: err.message,
				});
				setAlertState({
					open: true,
					message: "Purchasing failed",
					severity: "error"
				});
			});
	}

	const handleQuantityChanged = (value: bigint) => {
		if (value && value > 0 && value <= props.token.quantity) {
			setState({ ...state, totalAmount: value * item.price });
		} else {
			setState({ ...state, totalAmount: BigInt(0) });
		}
	};

	return (
		<Container>
		<Paper>
			<Alert
			open={alertState.open}
			message={alertState.message}
			onClose={() => handleClose}
			severity={alertState.severity}
			// anchorOrigin={{ vertical: "top", horizontal: "center" }}
		/> 
		</Paper>
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Buy Token: {props.token.tokenId}</DialogTitle>
			<form onSubmit={(e) => submit(e)}>				
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="quantity"
						label={`Quantity (Max ${props.token.quantity})`}
						type="number"
						name="quantity"
						fullWidth
						variant="standard"
						defaultValue={props.token.quantity.toString()}
						onChange={(e) => handleQuantityChanged(BigInt(e.target.value))}
					/>
					{state.error && (
						<Typography component="div" color="error">
							{state.error}
						</Typography>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>
						{state.isBought ? "Ok" : "Cancel"}
					</Button>
					<Button
						type="submit"
						disabled={state.isBought || state.isBeingBought}
					>
						Buy{" "}
						{state.totalAmount ? `(${state.totalAmount?.toString()} CCD)` : ""}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
		</Container>
	);
}
