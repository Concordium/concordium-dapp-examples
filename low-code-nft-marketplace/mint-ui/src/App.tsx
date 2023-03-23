import "./App.css";

import { useEffect, useState } from "react";
import {
	detectConcordiumProvider,
	WalletApi,
} from "@concordium/browser-wallet-api-helpers";
import { Box, Link, Typography } from "@mui/material";
import { Route, Routes, Navigate } from "react-router-dom";

import MintPage from "./pages/MintPage";
import { CIS2_MULTI_CONTRACT_INFO } from "./Constants";
import ConnectWallet from "./components/ConnectWallet";
import Header from "./components/ui/Header";

function App() {
	const [state, setState] = useState<{
		provider?: WalletApi;
		account?: string;
	}>({});

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

	let pages = new Array<{
		path: string;
		href?: string;
		name: string;
		component: JSX.Element;
		display: "primary" | "secondary";
	}>();

	pages.push({
		path: "/mint-multi-batch",
		name: "Mint",
		component: (
			<MintPage
				key={CIS2_MULTI_CONTRACT_INFO.contractName}
				contractInfo={CIS2_MULTI_CONTRACT_INFO}
				provider={state.provider!}
				account={state.account!}
			/>
		),
		display: "primary",
	});

	function DefaultRouteElement() {
		return <Navigate replace to={"/mint-multi-batch"} />;
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
					{/* <Link
						sx={{ color: "white" }}
						href="https://developer.concordium.software/en/mainnet/index.html"
						target={"_blank"}
					>
						Concordium Developer Documentation
					</Link> */}
					<Link
						sx={{ color: "white" }}
						href="https://by0.gitbook.io/low-code-nft-framework/overview/concordium-low-code-nft-framework"
						target={"_blank"}
					>
						Low-Code NFT Tools Documentation
					</Link>
				</Typography>
			</footer>
		</>
	);
}

export default App;
