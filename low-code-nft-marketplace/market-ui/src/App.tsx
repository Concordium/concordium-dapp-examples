import "./App.css";

import { useEffect, useState } from "react";
import {
	detectConcordiumProvider,
	WalletApi,
} from "@concordium/browser-wallet-api-helpers";
import { Box, Link, Typography } from "@mui/material";
import {
	Route,
	Routes,
	useParams,
	Navigate,
	useNavigate,
} from "react-router-dom";
import { ConcordiumGRPCClient, ContractAddress, createConcordiumClient } from "@concordium/web-sdk";

import BuyPage from "./pages/BuyPage";
import SellPage from "./pages/SellPage";
import ContractFindInstanceOrInit from "./pages/ContractFindInstanceOrInit";
import MintPage from "./pages/MintPage";
import {
	CIS2_MULTI_CONTRACT_INFO,
	CONCORDIUM_NODE_PORT,
	CONNCORDIUM_NODE_ENDPOINT,
	CREATE_NEW_MARKETPLACE,
	MARKETPLACE_CONTRACT_INFO,
	MARKET_CONTRACT_ADDRESS,
} from "./Constants";
import ConnectWallet from "./components/ConnectWallet";
import Header from "./components/ui/Header";
import { MINTING_UI_ONLY } from "./Constants";

function App() {
	const params = useParams();
	const navigate = useNavigate();

	let marketplaceContractAddress: ContractAddress | undefined = undefined;
	if (!MINTING_UI_ONLY) {
		marketplaceContractAddress = MARKET_CONTRACT_ADDRESS;

		if (params.index && params.subindex) {
			marketplaceContractAddress = {
				index: BigInt(params.index),
				subindex: BigInt(params.subindex),
			};
		}
	}

	const [state, setState] = useState<{
		grpcClient: ConcordiumGRPCClient;
		provider?: WalletApi;
		account?: string;
		marketplaceContractAddress?: ContractAddress;
	}>({
		marketplaceContractAddress,
		grpcClient: createConcordiumClient(CONNCORDIUM_NODE_ENDPOINT, Number(CONCORDIUM_NODE_PORT)),
	});

	function connect() {
		detectConcordiumProvider()
			.then((provider) => {
				provider
					.getMostRecentlySelectedAccount()
					.then((account) =>
						!!account ? Promise.resolve(account) : provider.connect()
					)
					.then((account) => {
						setState({ ...state, provider, account });
					})
					.catch((_) => {
						alert("Please allow wallet connection");
					});
				provider.on("accountDisconnected", () => {
					setState({ ...state, account: undefined });
				});
				provider.on("accountChanged", (account) => {
					setState({ ...state, account });
				});
				provider.on("chainChanged", () => {
					setState({ ...state, account: undefined, provider: undefined });
				});
			})
			.catch((_) => {
				console.error(`could not find provider`);
				alert("Please download Concordium Wallet");
			});
	}

	useEffect(() => {
		if (state.provider && state.account) {
			return;
		}

		connect();
		return () => {
			state.provider?.removeAllListeners();
		};
	}, [state.account]);

	function isConnected() {
		return !!state.provider && !!state.account;
	}

	function onMarketplaceContractChanged(
		marketplaceContractAddress: ContractAddress
	) {
		setState({ ...state, marketplaceContractAddress });
		navigate("/");
	}

	let pages = new Array<{
		path: string;
		href?: string;
		name: string;
		component: JSX.Element;
		display: "primary" | "secondary";
	}>();

	if (state.marketplaceContractAddress) {
		pages.push({
			path: "/buy/:index/:subindex",
			href: `/buy/${state.marketplaceContractAddress.index.toString()}/${state.marketplaceContractAddress.subindex.toString()}`,
			name: "Buy",
			component: (
				<BuyPage
					provider={state.provider!}
					account={state.account!}
					marketContractAddress={state.marketplaceContractAddress!}
					grpcClient={state.grpcClient!}
				/>
			),
			display: "primary",
		});

		pages.push({
			path: "/sell/:index/:subindex",
			href: `/sell/${state.marketplaceContractAddress.index.toString()}/${state.marketplaceContractAddress.subindex.toString()}`,
			name: "Sell",
			component: (
				<SellPage
					provider={state.provider!}
					grpcClient={state.grpcClient!}
					account={state.account!}
					marketContractAddress={state.marketplaceContractAddress!}
					contractInfo={CIS2_MULTI_CONTRACT_INFO}
				/>
			),
			display: "primary",
		});
	}

	pages.push({
		path: "/mint-multi-batch",
		name: "Mint",
		component: (
			<MintPage
				key={CIS2_MULTI_CONTRACT_INFO.contractName}
				contractInfo={CIS2_MULTI_CONTRACT_INFO}
				provider={state.provider!}
				account={state.account!}
				grpcClient={state.grpcClient}
			/>
		),
		display: "primary",
	});

	if (CREATE_NEW_MARKETPLACE) {
		pages.push({
			path: "/marketplace-init-or-add",
			name: "Create My Marketplace",
			component: (
				<ContractFindInstanceOrInit
					provider={state.provider!}
					grpcClient={state.grpcClient}
					account={state.account!}
					contractInfo={MARKETPLACE_CONTRACT_INFO}
					onDone={(address) => onMarketplaceContractChanged(address)}
				/>
			),
			display: "secondary",
		});
	}

	function DefaultRouteElement() {
		if (MINTING_UI_ONLY) {
			return <Navigate replace to={"/mint-multi-batch"} />;
		} else
			if (state.marketplaceContractAddress) {
				return (
					<Navigate
						replace
						to={`/buy/${state.marketplaceContractAddress.index.toString()}/${state.marketplaceContractAddress.subindex.toString()}`}
					/>
				);
			} else if (CREATE_NEW_MARKETPLACE) {
				return <Navigate replace to={"/marketplace-init-or-add"} />;
			} else {
				return <Navigate replace to={"/mint-multi-batch"} />;
			}
	}

	return (
		<>
			<Header pages={pages} />
			<Box className="App">
				{isConnected() ? (
					<Routes>
						{pages.map((p) => (
							<Route path={p.path} element={p.component} key={p.name} />
						))}
						<Route path="/" element={<DefaultRouteElement />} />
					</Routes>
				) : (
					<ConnectWallet connect={connect} />
				)}
			</Box>
			<footer className="footer">
				<Typography textAlign={"center"} sx={{ color: "white" }}>
					{/* <Link sx={{color: "white"}} href="https://developer.concordium.software/en/mainnet/index.html" target={"_blank"}>Concordium Developer Documentation</Link> */}
					<Link
						sx={{ color: "white" }}
						href="https://developer.concordium.software/en/mainnet/net/guides/low-code-nft-marketplace/introduction.html"
						target={"_blank"}>Visit the Concordium documentation portal to create your own marketplace in a few minutes!
					</Link>
				</Typography>
			</footer>
		</>
	);
}

export default App;
