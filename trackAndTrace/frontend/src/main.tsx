import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import {
    WithWalletConnector,
    WalletConnectionProps,
    useConnection,
    useConnect,
} from '@concordium/react-components';

import './styles.scss';
import { AdminCreateItem } from './components/AdminCreateItem';
import { AdminChangeRoles } from './components/AdminChangeRoles';
import { ChangeItemStatus } from './components/ChangeItemStatus';
import { Explorer } from './components/Explorer';
import * as constants from './constants';

const App = (props: WalletConnectionProps) => {
    const { setActiveConnectorType, activeConnectorError, activeConnector, connectedAccounts, genesisHashes } = props;

    const { connection, setConnection, account } = useConnection(connectedAccounts, genesisHashes);
    const { connect } = useConnect(activeConnector, setConnection);

    useEffect(() => {
        setActiveConnectorType(constants.BROWSER_WALLET);
    }, [setActiveConnectorType]);

    return (
        <Router>
            <div className="navbar">
                <div>
                    Track And Trace{' '}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://${constants.NETWORK.name}.ccdscan.io/?dcount=1&dentity=contract&dcontractAddressIndex=${constants.CONTRACT_ADDRESS.index}&dcontractAddressSubIndex=${constants.CONTRACT_ADDRESS.subindex}`}
                    >
            &lt;{Number(constants.CONTRACT_ADDRESS.index)},{Number(constants.CONTRACT_ADDRESS.subindex)}&gt;
                    </a>
                </div>
                <Link className="secondary" to="/explorer">
                    Explorer
                </Link>
                <Link className="secondary" to="/changeItemStatus">
                    Admin1
                </Link>
                <Link className="secondary" to="/adminCreateItem">
                    Admin2
                </Link>
                <Link className="secondary" to="/adminChangeRoles">
                    Admin3
                </Link>
                <Button
                    variant="primary"
                    id="account"
                    disabled={activeConnector && !account ? false : true}
                    onClick={connect}
                >
                    {account
                        ? account.slice(0, 5) + '...' + account.slice(-5)
                        : activeConnector
                          ? 'Connect Wallet'
                          : 'Loading...'}
                </Button>
            </div>

            <Routes>
                <Route path="/explorer" element={<Explorer />} />
                <Route
                    path="/adminCreateItem"
                    element={
                        <AdminCreateItem
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
                    path="/changeItemStatus"
                    element={
                        <ChangeItemStatus
                            activeConnectorError={activeConnectorError}
                            connection={connection}
                            accountAddress={account}
                        />
                    }
                />
                <Route path="/" element={<div></div>} />
            </Routes>
        </Router>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <WithWalletConnector network={constants.NETWORK}>{(props) => <App {...props} />}</WithWalletConnector>
    </React.StrictMode>
);
