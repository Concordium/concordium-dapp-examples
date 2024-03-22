import './App.css';

import React, { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { detectConcordiumProvider, WalletApi } from '@concordium/browser-wallet-api-helpers';
import { ConcordiumGRPCClient, createConcordiumClient } from '@concordium/web-sdk';
import { Box, Link, Typography } from '@mui/material';

import ConnectWallet from './components/ConnectWallet';
import Header from './components/ui/Header';
import { CIS2_MULTI_CONTRACT_INFO, CONCORDIUM_NODE_PORT, CONNCORDIUM_NODE_ENDPOINT } from './Constants';
import MintPage from './pages/MintPage';

function App() {
    const [state, setState] = useState<{
        provider?: WalletApi;
        account?: string;
        grpcClient: ConcordiumGRPCClient;
    }>({
        grpcClient: createConcordiumClient(CONNCORDIUM_NODE_ENDPOINT, Number(CONCORDIUM_NODE_PORT)),
    });

    const connect = useCallback(() => {
        detectConcordiumProvider()
            .then((provider) => {
                provider
                    .getMostRecentlySelectedAccount()
                    .then((account) => (account ? Promise.resolve(account) : provider.connect()))
                    .then((account) => {
                        setState((state) => ({ ...state, provider, account }));
                    })
                    .catch(() => {
                        alert('Please allow wallet connection');
                    });
                provider.on('accountDisconnected', () => {
                    setState((state) => ({ ...state, account: undefined }));
                });
                provider.on('accountChanged', (account) => {
                    setState((state) => ({ ...state, account }));
                });
                provider.on('chainChanged', () => {
                    setState((state) => ({ ...state, account: undefined, provider: undefined }));
                });
            })
            .catch(() => {
                console.error(`could not find provider`);
                alert('Please download Concordium Wallet');
            });
    }, []);

    useEffect(() => {
        if (state.provider && state.account) {
            return;
        }

        connect();
        return () => {
            state.provider?.removeAllListeners();
        };
    }, [connect, state.account, state.provider]);

    function isConnected() {
        return !!state.provider && !!state.account;
    }

    const pages = new Array<{
        path: string;
        href?: string;
        name: string;
        component: JSX.Element;
        display: 'primary' | 'secondary';
    }>();

    pages.push({
        path: '/mint-multi-batch',
        name: 'Mint',
        component: (
            <MintPage
                key={CIS2_MULTI_CONTRACT_INFO.contractName}
                contractInfo={CIS2_MULTI_CONTRACT_INFO}
                provider={state.provider!}
                account={state.account!}
                grpcClient={state.grpcClient}
            />
        ),
        display: 'primary',
    });

    function DefaultRouteElement() {
        return <Navigate replace to={'/mint-multi-batch'} />;
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
                <Typography textAlign={'center'} sx={{ color: 'white' }}>
                    <Link
                        sx={{ color: 'white' }}
                        href="https://by0.gitbook.io/low-code-nft-framework/overview/concordium-low-code-nft-framework"
                        target={'_blank'}
                    >
                        Low-Code NFT Tools Documentation
                    </Link>
                </Typography>
            </footer>
        </>
    );
}

export default App;
