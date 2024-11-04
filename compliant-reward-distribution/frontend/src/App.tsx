import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import { ConcordiumGRPCClient } from '@concordium/web-sdk';
import './styles.scss';
import { WalletProvider } from './wallet-connection';
import { ZkProofSubmission } from './components/ZkProofSubmission';
import { Admin } from './components/Admin/Admin';
import { TweetSubmission } from './components/TweetSubmission';
import Home from './components/Home';
import ConnectWallet from './components/connect-wallet/ConnectWallet';
import TweetPost from './components/tweet-post/TweetPost';
import Proof from './components/proof/Proof';
import Submission from './components/submission/Submission';

export const App = () => {
    const [provider] = useState<WalletProvider>();
    const [connectedAccount] = useState<string>();

    const grpcClient = useRef(new ConcordiumGRPCClient(new GrpcWebFetchTransport({ baseUrl: CONFIG.node }))).current;

    useEffect(() => {
        const timer = setTimeout(() => {}, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/connectWallet" element={<ConnectWallet />} />
                <Route path="/tweetPost" element={<TweetPost />} />
                <Route path="/proof" element={<Proof />} />
                <Route path="/submission" element={<Submission />} />
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

                <Route path="/Admin" element={<Admin />} />
            </Routes>
        </Router>
    );
};
