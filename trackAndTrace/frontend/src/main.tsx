import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import { Explorer } from './components/Explorer';
import './styles.scss';
import {
    WithWalletConnector,
    WalletConnectionProps,
    useConnection,
    useConnect,
    TESTNET,
} from '@concordium/react-components';

import { AdminCreateItem } from './components/AdminCreateItem';
import { AdminChangeRoles } from './components/AdminChangeRoles';
import { ChangeItemStatus } from './components/ChangeItemStatus';
import { Button } from 'react-bootstrap';
import { BROWSER_WALLET } from '../constants';

const App = (props: WalletConnectionProps) => {
    const { setActiveConnectorType, activeConnector, connectedAccounts, genesisHashes } = props;

    const { connection, setConnection, account } = useConnection(connectedAccounts, genesisHashes);
    const { connect } = useConnect(activeConnector, setConnection);

    useEffect(() => {
        setActiveConnectorType(BROWSER_WALLET);
    }, [setActiveConnectorType]);

    return (
        <Router>
            <div className="navbar">
                <div>
                    Track And Trace{' '}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://testnet.ccdscan.io/?dcount=1&dentity=contract&dcontractAddressIndex=${Number(process.env.TRACK_AND_TRACE_CONTRACT_INDEX)}&dcontractAddressSubIndex=0`}
                    >
                        &lt;{Number(process.env.TRACK_AND_TRACE_CONTRACT_INDEX)},0&gt;
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
                <Button variant="primary" id="account" onClick={connect}>
                    {account ? account.slice(0, 5) + '...' + account.slice(-5) : 'Connect Wallet'}
                </Button>
            </div>

            <Routes>
                <Route path="/explorer" element={<Explorer />} />
                <Route
                    path="/adminCreateItem"
                    element={<AdminCreateItem connection={connection} accountAddress={account} />}
                />
                <Route
                    path="/adminChangeRoles"
                    element={<AdminChangeRoles connection={connection} accountAddress={account} />}
                />
                <Route
                    path="/changeItemStatus"
                    element={<ChangeItemStatus connection={connection} accountAddress={account} />}
                />
                <Route path="/" element={<div></div>} />
            </Routes>
        </Router>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <WithWalletConnector network={TESTNET}>{(props) => <App {...props} />}</WithWalletConnector>
    </React.StrictMode>
);
