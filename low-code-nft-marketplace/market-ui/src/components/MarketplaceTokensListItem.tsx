import { useEffect, useState } from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckIcon from "@mui/icons-material/Check";
import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { CIS2Contract, ContractAddress } from "@concordium/web-sdk";
import { Typography } from "@mui/material";

import { fetchJson, toLocalStorageKey } from "../models/Utils";
import { TokenListItem } from "../models/MarketplaceTypes";
import { Metadata } from "../models/Cis2Types";
import Cis2MetadataImageLazy from "./Cis2MetadataImageLazy";

/**
 * Displays a single token from the list of all the tokens listed on Marketplace.
 */
function MarketplaceTokensListItem(props: {
	item: TokenListItem;
	itemCis2Contract: CIS2Contract;
	provider: WalletApi;
	account: string;
	marketContractAddress: ContractAddress;
	onBuyClicked: (token: TokenListItem) => void;
}) {
	const { item } = props;

	let [state, setState] = useState({
		isLoading: true,
		url: "",
		name: "",
		desc: "",
		price: item.price,
		isBought: false,
	});

	useEffect(() => {
		let setStateMetadata = (metadata: Metadata) =>
			setState({
				...state,
				isLoading: false,
				url: metadata.display.url,
				name: metadata.name,
				desc: metadata.description,
				price: item.price,
			});

		let metadataJson = localStorage.getItem(
			toLocalStorageKey(item.tokenId, item.contract)
		);
		if (metadataJson) {
			setStateMetadata(JSON.parse(metadataJson));
		} else {
			props.itemCis2Contract.tokenMetadata(props.item.tokenId)
				.then((m) => fetchJson<Metadata>(m.url))
				.then((metadata) => {
					setStateMetadata(metadata);
				});
		}
	}, [item]);

	return (
		<ImageListItem
			sx={{ display: state.isBought ? "none" : "" }}
			key={item.tokenId + item.contract.index + item.contract.subindex}
		>
			<Cis2MetadataImageLazy
				provider={props.provider}
				account={props.account}
				cis2Contract={props.itemCis2Contract}
				tokenId={item.tokenId}
			/>
			<ImageListItemBar
				title={`Price: ${state.price} CCD`}
				position="below"
				subtitle={
					<>
						<Typography variant="caption" component={"div"}>
							{state.name}
						</Typography>
						<Typography variant="caption" component={"div"}>
							{state.desc}
						</Typography>
						<Typography variant="caption" component={"div"}>
							Index : {item.contract.index.toString()} /{" "}
							{item.contract.subindex.toString()}
						</Typography>
						<Typography variant="caption" component={"div"} title={item.owner}>
							Owner : {item.owner.slice(0, 5)}...
						</Typography>
					</>
				}
				actionIcon={
					<IconButton
						sx={{ height: "100%" }}
						aria-label={`buy ${item.tokenId}`}
						onClick={() =>
							item.owner !== props.account && props.onBuyClicked(item)
						}
					>
						{state.isBought || item.owner === props.account ? (
							<CheckIcon />
						) : (
							<ShoppingCartIcon />
						)}
					</IconButton>
				}
			/>
		</ImageListItem>
	);
}

export default MarketplaceTokensListItem;
