import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import { About } from './components/About';
import { Explorer } from './components/Explorer';
import { Support } from './components/Support';
import './styles.scss';
import {} from '@concordium/web-sdk';
import * as concordiumHelpers from '@concordium/browser-wallet-api-helpers';
import { AdminCreateItem } from './components/AdminCreateItem';
import { AdminChangeRoles } from './components/AdminChangeRoles';
import { ChangeItemStatus } from './components/ChangeItemStatus';
import { Button } from 'react-bootstrap';

const App = () => {
    const [provider, setProvider] = useState<concordiumHelpers.WalletApi>();
    const [accountAddress, setAccountAddress] = useState<string | undefined>(undefined);

    async function connect() {
        if (provider) {
            provider.connect().then((address) => {
                console.log(address);
                setAccountAddress(address);
            });
        }
    }

    useEffect(() => {
        concordiumHelpers
            .detectConcordiumProvider()
            .then((c) => setProvider(c))
            .catch(alert);
    }, []);

    return (
        <Router>
            <div className="navbar">
                <div>Track And Trace</div>
                <Link to="/about">About</Link>
                <Link to="/explorer">Explorer</Link>
                <Link to="/support">Support</Link>
                <Link to="/adminCreateItem">AdminCreateItem</Link>
                <Link to="/adminChangeRoles">AdminChangeRoles</Link>
                <Link to="/changeItemStatus">ChangeItemStatus</Link>
                <Button variant="primary" id="account" onClick={connect}>
                    {accountAddress ? accountAddress : 'Connect Wallet'}
                </Button>
            </div>

            <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/explorer" element={<Explorer />} />
                <Route path="/support" element={<Support />} />
                <Route
                    path="/adminCreateItem"
                    element={<AdminCreateItem provider={provider} accountAddress={accountAddress} />}
                />
                <Route
                    path="/adminChangeRoles"
                    element={<AdminChangeRoles provider={provider} accountAddress={accountAddress} />}
                />
                <Route
                    path="/changeItemStatus"
                    element={<ChangeItemStatus provider={provider} accountAddress={accountAddress} />}
                />
                <Route path="/" element={<div></div>} />
            </Routes>
        </Router>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
