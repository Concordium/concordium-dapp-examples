import { useState, FormEvent } from "react";
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	TextField,
	CardActions,
	Button,
	SxProps,
	Theme,
} from "@mui/material";

import { isValidTokenId } from "../models/Cis2Client";
import DisplayError from "./ui/DisplayError";
import { Cis2ContractInfo } from "../models/ConcordiumContractClient";

const cardMediaSx: SxProps<Theme> = { maxHeight: "200px" };

function GetTokenIdCardStep(props: {
	imageUrl: string;
	tokenId: string;
	contractInfo: Cis2ContractInfo;
	onDone: (data: { tokenId: string }) => void;
}) {
	const [state, setState] = useState({
		tokenId: props.tokenId.toString(),
		error: "",
		imageUrl: props.imageUrl,
	});

	function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const tokenId = formData.get("tokenId")?.toString() || "";

		if (!tokenId || !isValidTokenId(tokenId, props.contractInfo)) {
			setState({ ...state, error: "Invalid Token Id" });
			return;
		}

		setState({ ...state, tokenId, error: "" });
		props.onDone({ tokenId });
	}

	return (
		<Card variant="outlined">
			<CardMedia
				component="img"
				image={state.imageUrl}
				alt="NFT"
				sx={cardMediaSx}
			/>
			<form noValidate autoComplete="off" onSubmit={(e) => submit(e)}>
				<CardContent>
					<Typography gutterBottom component="div">
						Set Token Id
					</Typography>
					<TextField
						defaultValue={props.tokenId}
						name="tokenId"
						id="token-id"
						label="Token Id"
						variant="outlined"
						size="small"
						fullWidth={true}
						required={true}
					/>
					<DisplayError error={state.error} />
				</CardContent>
				<CardActions>
					<Button size="small" color="primary" type="submit">
						Set Token Id
					</Button>
				</CardActions>
			</form>
		</Card>
	);
}

export default GetTokenIdCardStep;
