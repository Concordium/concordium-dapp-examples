import { useState, useEffect } from "react";
import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import ImageList from "@mui/material/ImageList";
import Container from "@mui/material/Container";
import { ContractAddress } from "@concordium/web-sdk";

import MarketplaceTokensListItem from "./MarketplaceTokensListItem";
import { TokenListItem } from "../models/MarketplaceTypes";
import { list } from "../models/MarketplaceClient";
import { Cis2ContractInfo } from "../models/ConcordiumContractClient";
import MarketplaceTransferDialog from "./MarketplaceTransferDialog";

/**
 * Gets the List of buyable tokens from Marketplace contract and displays them.
 */
function MarketplaceTokensList(props: {
	marketContractAddress: ContractAddress;
	provider: WalletApi;
	contractInfo: Cis2ContractInfo;
	account: string;
}) {
	let [state, setState] = useState<{
		selectedToken?: TokenListItem;
		tokens: TokenListItem[];
	}>({ tokens: [] });

	useEffect(() => {
		list(props.provider, props.marketContractAddress).then((tokens) =>
			setState({ ...state, tokens })
		);
	}, [props.account, state.selectedToken]);

	const setSelectedToken = (token?: TokenListItem) =>
		setState({ ...state, selectedToken: token });

	return (
		<Container maxWidth={"md"}>
			<ImageList key="nft-image-list" cols={3}>
				{state.tokens.map((t) => (
					<MarketplaceTokensListItem
						provider={props.provider}
						account={props.account}
						contractInfo={props.contractInfo}
						marketContractAddress={props.marketContractAddress}
						item={t}
						key={t.tokenId + t.contract.index + t.contract.subindex + t.owner}
						onBuyClicked={setSelectedToken}
					/>
				))}
			</ImageList>
			{state.selectedToken && (
				<MarketplaceTransferDialog
					provider={props.provider}
					account={props.account}
					marketContractAddress={props.marketContractAddress}
					isOpen={!!state.selectedToken}
					token={state.selectedToken}
					onClose={() => setSelectedToken(undefined)}
				/>
			)}
		</Container>
	);
}

export default MarketplaceTokensList;
