import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	Link,
	SxProps,
	Theme,
} from "@mui/material";

import { MetadataUrl } from "../models/Cis2Types";

const cardMediaSx: SxProps<Theme> = { maxHeight: "200px" };

function GetMintCardStep(props: {
	imageUrl: string;
	tokenId: string;
	imageIpfsUrl: string;
	metadataUrl: MetadataUrl;
	quantity?: string;
}) {
	return (
		<Card variant="outlined">
			<CardMedia
				component="img"
				image={props.imageUrl}
				alt="NFT"
				sx={cardMediaSx}
			/>
			<CardContent>
				<Typography>Ready to be Minted</Typography>
				<Typography variant="caption" component="div">
					Token Id: {props.tokenId}
				</Typography>
				{props.quantity && (
					<Typography variant="caption" component="div">
						Quantity: {props.quantity}
					</Typography>
				)}
				<Link href={props.imageIpfsUrl} variant="caption" component="div">
					Image IPFS Url
				</Link>
				<Link href={props.metadataUrl.url} variant="caption" target="_blank">
					Metadata Url
				</Link>
			</CardContent>
		</Card>
	);
}

export default GetMintCardStep;
