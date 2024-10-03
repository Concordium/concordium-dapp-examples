import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
import { Alert } from 'react-bootstrap';
import { FinalPage } from './components/FinalPage';

export const App = () => {
    const [provider, setProvider] = useState<WalletProvider>();
    const [connectedAccount, setConnectedAccount] = useState<string>();
    const [error, setError] = useState<string | undefined>();

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
        try {
            setError(undefined);
            const account = await provider.connect();
            account ? setConnectedAccount(account) : setError('Connecting to wallet but no account found');
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setProvider(provider);
        }
    };

    return (
        <Router>
            <div className="navbar">
                <div className="centered">
                    <div>
                        <a
                            className="customGreen"
                            target="_blank"
                            rel="noreferrer"
                            href={`https://github.com/Concordium/concordium-dapp-examples/tree/main/compliant-reward-distribution`}
                        >
                            Version {version} ({capitalizedNetwork})
                        </a>
                    </div>

                    {error && <Alert variant="error">{error}</Alert>}

                    {connectedAccount && (
                        <a
                            className="customGreen"
                            target="_blank"
                            rel="noreferrer"
                            // TODO: add link to CCDscan account address.
                            href={`https://testnet.ccdscan.io/`}
                        >
                            {connectedAccount.slice(0, 5) + '...' + connectedAccount.slice(-5)}
                        </a>
                    )}
                </div>
            </div>

            <Routes>
                <Route path="/landingPage" element={<LandingPage />} />
                <Route
                    path="/connectWallet"
                    element={<ConnectWallet connectProvider={connectProvider} connectedAccount={connectedAccount} />}
                />
                <Route
                    path="/tweetSubmission"
                    element={<TweetSubmission signer={connectedAccount} provider={provider} grpcClient={grpcClient} />}
                />
                <Route
                    path="/zkProofSubmission"
                    element={
                        <ZkProofSubmission prover={connectedAccount} provider={provider} grpcClient={grpcClient} />
                    }
                />
                <Route path="/finalPage" element={<FinalPage />} />
                <Route
                    path="/Admin"
                    element={
                        <Admin
                            signer={connectedAccount}
                            provider={provider}
                            grpcClient={grpcClient}
                            connectProvider={connectProvider}
                        />
                    }
                />
                <Route path="/" element={<div></div>} />
            </Routes>
        </Router>
    );
};
