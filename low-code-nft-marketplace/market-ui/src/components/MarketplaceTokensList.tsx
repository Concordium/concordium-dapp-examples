import { useState, useEffect } from "react";
import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import ImageList from "@mui/material/ImageList";
import Container from "@mui/material/Container";
import { CIS2Contract, ConcordiumGRPCClient, ContractAddress } from "@concordium/web-sdk";

import MarketplaceTokensListItem from "./MarketplaceTokensListItem";
import { TokenListItem } from "../models/MarketplaceTypes";
import { list } from "../models/MarketplaceClient";
import MarketplaceTransferDialog from "./MarketplaceTransferDialog";

/**
 * Gets the List of buyable tokens from Marketplace contract and displays them.
 */
function MarketplaceTokensList(props: {
	grpcClient: ConcordiumGRPCClient;
	marketContractAddress: ContractAddress;
	provider: WalletApi;
	account: string;
}) {
	let [state, setState] = useState<{
		selectedToken?: TokenListItem;
		tokens: Array<TokenListItem & { cis2Contract: CIS2Contract }>;
	}>({ tokens: [] });

	useEffect(() => {
		(async () => {
			const tokens = await list(props.provider, props.marketContractAddress);
			const tokensWContract = await Promise.all(tokens.map(async (t) => {
				return {
					...t,
					cis2Contract: await CIS2Contract.create(props.grpcClient, t.contract)
				}
			}));

			setState({ ...state, tokens: tokensWContract });
		})()
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
						marketContractAddress={props.marketContractAddress}
						item={t}
						itemCis2Contract={t.cis2Contract}
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
