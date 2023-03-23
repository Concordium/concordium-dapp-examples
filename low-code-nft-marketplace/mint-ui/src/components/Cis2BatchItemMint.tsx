import {
	Card,
	CardContent,
	CardMedia,
	Link,
	Skeleton,
	SxProps,
	Theme,
	Typography,
} from "@mui/material";

import { MetadataUrl, TokenInfo } from "../models/Cis2Types";
import { ContractInfo } from "../models/ConcordiumContractClient";
import LazyCis2Metadata from "./LazyCis2Metadata";
const cardMediaSx: SxProps<Theme> = { maxHeight: "200px" };

function Cis2BatchItemMint(props: {
	contractInfo: ContractInfo;
	tokenId: string;
	tokenInfo: TokenInfo;
	minting: boolean;
	minted: boolean;
	error: string;
}) {
	var heading = props.minting
		? "Minting"
		: props.minted
		? "Minted"
		: "Ready to be Minted";

	const metadataUrl = (props.tokenInfo as [MetadataUrl, string])[0];

	const TokenAmount = function () {
		return (
			<Typography variant="caption" component="div">
				Quantity: {(props.tokenInfo as [MetadataUrl, string])[1]}
			</Typography>
		);
	};
	return (
		<Card variant="outlined">
			<LazyCis2Metadata
				metadataUrl={metadataUrl}
				loadedTemplate={(metadata) => (
					<CardMedia
						component="img"
						image={metadata.display.url}
						alt="NFT"
						sx={cardMediaSx}
					/>
				)}
				loadingTemplate={() => (
					<Skeleton
						sx={{ ...cardMediaSx, height: "200px" }}
						animation="wave"
						variant="rectangular"
					/>
				)}
				errorLoadingTemplate={(error) => <Typography>{error}</Typography>}
			/>
			<CardContent>
				<Typography>{heading}</Typography>
				<Typography variant="caption" component="div">
					Token Id: {props.tokenId}
				</Typography>
				<TokenAmount />
				<Link href={metadataUrl.url} variant="caption" target="_blank">
					Metadata Url
				</Link>
				{props.error && <Typography>{props.error}</Typography>}
			</CardContent>
		</Card>
	);
}

export default Cis2BatchItemMint;
