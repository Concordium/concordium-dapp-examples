import { list, TokenListItem } from 'common-ui';
import { useEffect, useState } from 'react';

import { WalletApi } from '@concordium/browser-wallet-api-helpers';
import { CIS2Contract, ConcordiumGRPCClient, ContractAddress } from '@concordium/web-sdk';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';

import { MARKETPLACE_CONTRACT_INFO } from '../Constants';
import MarketplaceTokensListItem from './MarketplaceTokensListItem';
import MarketplaceTransferDialog from './MarketplaceTransferDialog';

type ListItem = TokenListItem & { cis2Contract: CIS2Contract };

/**
 * Gets the List of buyable tokens from Marketplace contract and displays them.
 */
function MarketplaceTokensList(props: {
	grpcClient: ConcordiumGRPCClient;
	marketContractAddress: ContractAddress;
	provider: WalletApi;
	account: string;
}) {
	let [selectedToken, setSelectedToken] = useState<ListItem>();
	let [tokens, setTokens] = useState<Array<ListItem>>([]);

	useEffect(() => {
		(async () => {
			const tokens = await list(props.grpcClient, props.marketContractAddress, MARKETPLACE_CONTRACT_INFO);
			return Promise.all(tokens.map(async (t) => {
				return {
					...t,
					cis2Contract: await CIS2Contract.create(props.grpcClient, t.contract)
				}
			}));
		})().then(setTokens)
	}, [props.account, selectedToken]);

	return (
		<Container maxWidth={"md"}>
			<ImageList key="nft-image-list" cols={3}>
				{tokens.map((t) => (
					<MarketplaceTokensListItem
						account={props.account}
						marketContractAddress={props.marketContractAddress}
						item={t}
						key={t.tokenId + t.contract.index + t.contract.subindex + t.owner}
						onBuyClicked={setSelectedToken}
					/>
				))}
			</ImageList>
			{selectedToken && (
				<MarketplaceTransferDialog
					provider={props.provider}
					account={props.account}
					marketContractAddress={props.marketContractAddress}
					isOpen={true}
					token={selectedToken}
					onClose={() => setSelectedToken(undefined)}
				/>
			)}
		</Container>
	);
}

export default MarketplaceTokensList;
