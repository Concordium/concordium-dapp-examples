import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import { ConcordiumGRPCClient } from '@concordium/web-sdk';

import './styles.scss';
import { WalletProvider } from './wallet-connection';
import { version } from '../package.json';
import { ZkProofSubmission } from './components/ZkProofSubmission';
import { Admin } from './components/Admin/Admin';
import { TweetSubmission } from './components/TweetSubmission';
import BackButton from './components/elements/BackButton';
import Home from './components/Home';
import image1 from "/images/Frame 1958.svg";
import ConnectWallet from './components/connect-wallet/ConnectWallet';
import TweetPost from './components/tweet-post/TweetPost';
import Proof from './components/proof/Proof';
import Submission from './components/submission/Submission';

export const App = () => {
    const [showLogo, setShowLogo] = useState(true);
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


    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLogo(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/connectWallet"
                    element={<ConnectWallet />}
                />
                <Route
                    path="/tweetPost"
                    element={<TweetPost />}
                />
                <Route
                    path="/proof"
                    element={<Proof />}
                />
                <Route
                    path="/submission"
                    element={<Submission />}
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
            </Routes>
        </Router>
    );
};
