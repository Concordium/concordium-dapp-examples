import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import { ConcordiumGRPCClient } from '@concordium/web-sdk';

import './styles.scss';
import { WalletProvider } from './wallet-connection';
import { version } from '../package.json';
import { LandingPage } from './components/LandingPage';
import { ConnectWallet } from './components/ConnectWallet';
import { ZkProofSubmission } from './components/ZkProofSubmission';
import { Admin } from './components/Admin/Admin';
import { TweetSubmission } from './components/TweetSubmission';

export const App = () => {
    const [provider, setProvider] = useState<WalletProvider>();
    const [connectedAccount, setConnectedAccount] = useState<string>();

    const grpcClient = useRef(new ConcordiumGRPCClient(new GrpcWebFetchTransport({ baseUrl: CONFIG.node }))).current;
    const capitalizedNetwork = CONFIG.network[0].toUpperCase() + CONFIG.network.substring(1);

    useEffect(() => {
        if (provider) {
            return () => {
                provider?.disconnect?.().then(() => provider.removeAllListeners());
            };
        }
    }, [provider]);

    useEffect(() => {
        const handleAccountChange = (newAccount: string | undefined) => {
            setConnectedAccount(newAccount);
        };

        provider?.on('accountChanged', handleAccountChange);

        return () => {
            provider?.off('accountChanged', handleAccountChange);
        };
    }, [provider]);

    const connectProvider = async (provider: WalletProvider) => {
        const account = await provider.connect();
        if (account) {
            setConnectedAccount(account);
        }
        setProvider(provider);
    };

    return (
        <Router>
            <div className="navbar">
                <div>
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://github.com/Concordium/concordium-dapp-examples/tree/main/compliant-reward-distribution`}
                    >
                        Version {version} ({capitalizedNetwork})
                    </a>
                </div>
                <Link className="secondary" to="/landingPage">
                    LandingPage
                </Link>
                <Link className="secondary" to="/connectWallet">
                    ConnectWallet
                </Link>
                <Link className="secondary" to="/tweetSubmission">
                    SubmitTweet
                </Link>
                <Link className="secondary" to="/zkProofSubmission">
                    SubmitZKProof
                </Link>
                <Link className="secondary" to="/admin">
                    Admin
                </Link>

                <Button id="accountAddress" disabled={true}>
                    {connectedAccount
                        ? connectedAccount.slice(0, 5) + '...' + connectedAccount.slice(-5)
                        : 'No Account Connected'}
                </Button>
            </div>

            <Routes>
                <Route path="/landingPage" element={<LandingPage />} />
                <Route
                    path="/connectWallet"
                    element={<ConnectWallet connectProvider={connectProvider} connectedAccount={connectedAccount} />}
                />
                <Route
                    path="/zkProofSubmission"
                    element={
                        <ZkProofSubmission prover={connectedAccount} provider={provider} grpcClient={grpcClient} />
                    }
                />
                <Route
                    path="/tweetSubmission"
                    element={<TweetSubmission signer={connectedAccount} provider={provider} grpcClient={grpcClient} />}
                />

                <Route
                    path="/Admin"
                    element={<Admin signer={connectedAccount} provider={provider} grpcClient={grpcClient} />}
                />
                <Route path="/" element={<div></div>} />
            </Routes>
        </Router>
    );
};
