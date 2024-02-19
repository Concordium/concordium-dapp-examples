import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import { Admin } from './components/Admin';
import { About } from './components/About';
import { Explorer } from './components/Explorer';
import { Support } from './components/Support';
import './styles.scss';
import {} from '@concordium/web-sdk';
import * as concordiumHelpers from '@concordium/browser-wallet-api-helpers';

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
                <Link to="/admin">Admin</Link>
                <Link to="/about">About</Link>
                <Link to="/explorer">Explorer</Link>
                <Link to="/support">Support</Link>
                <button id="account" onClick={connect}>
                    {accountAddress ? accountAddress : 'Connect Wallet'}
                </button>
            </div>

            <Routes>
                <Route path="/admin" element={<Admin provider={provider} />} />
                <Route path="/about" element={<About />} />
                <Route path="/explorer" element={<Explorer />} />
                <Route path="/support" element={<Support />} />
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
