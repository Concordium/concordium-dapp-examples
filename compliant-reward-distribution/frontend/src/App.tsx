import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { WalletProvider } from '../wallet-connection';
import { ConnectWallet } from './components/ConnectWallet';
import { ZkProofSubmission } from './components/ZkProofSubmission';
import { version } from '../package.json';
import './styles.scss';
import { TESTNET, useGrpcClient } from '@concordium/react-components';

export const App = () => {
    const [provider, setProvider] = useState<WalletProvider>();
    const [account, setAccount] = useState<string>();

    const grpcClient = useGrpcClient(TESTNET);

    useEffect(() => {
        if (provider !== undefined) {
            return () => {
                provider?.disconnect?.().then(() => provider.removeAllListeners());
            };
        }
    }, [provider]);

    const connectProvider = async (provider: WalletProvider) => {
        const accounts = await provider.connect();
        // TODO if no account or wrong network; report error.
        if (accounts && accounts?.length != 0) {
            setAccount(accounts[0]);
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
                        Version {version}
                    </a>
                </div>
                <Link className="secondary" to="/connectWallet">
                    ConnectWallet
                </Link>
                <Link className="secondary" to="/tweetSubmission">
                    Tweet
                </Link>
                <Link className="secondary" to="/zkProofSubmission">
                    ZKProof
                </Link>
                <Link className="secondary" to="/adminChangeRoles">
                    Admin3
                </Link>
                <Link className="secondary" to="/addTransitionRule">
                    Admin4
                </Link>

                <Button id="accountAddress" disabled={true}>
                    {account ? account.slice(0, 5) + '...' + account.slice(-5) : 'No Account Connected'}
                </Button>
            </div>

            <Routes>
                <Route
                    path="/connectWallet"
                    element={<ConnectWallet connectProvider={connectProvider} account={account} />}
                />
                <Route
                    path="/zkProofSubmission"
                    element={<ZkProofSubmission accountAddress={account} provider={provider} grpcClient={grpcClient} />}
                />
                {/* <Route
                    path="/tweetSubmission"
                    element={
                        <TweetSubmission
                            activeConnectorError={activeConnectorError}
                            connection={connection}
                            accountAddress={account}
                        />
                    }
                />
                <Route
                    path="/adminChangeRoles"
                    element={
                        <AdminChangeRoles
                            activeConnectorError={activeConnectorError}
                            connection={connection}
                            accountAddress={account}
                        />
                    }
                />

                <Route
                    path="/addTransitionRule"
                    element={
                        <AddTransitionRule
                            activeConnectorError={activeConnectorError}
                            connection={connection}
                            accountAddress={account}
                        />
                    }
                /> */}
                <Route path="/" element={<div></div>} />
            </Routes>
        </Router>
    );
};
