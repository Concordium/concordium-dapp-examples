/* eslint-disable no-alert */
import React, { useEffect, useState, useCallback } from 'react';

import { detectConcordiumProvider } from '@concordium/browser-wallet-api-helpers';
import Connection from './Connection';
import { getNames } from './util';

const VERIFIER_URL = 'http://localhost:8100';

interface ItemProps extends ItemData {
    authToken?: string;
    onError(): void;
}

/**
 * Component to display an item of the gallery
 */
function Item({ name, location, authToken, onError }: ItemProps) {
    return (
        <div className="item">
            {authToken && (
                <img
                    className="restricted-image"
                    alt="restricted"
                    src={`${location}?auth=${authToken}`}
                    onError={onError}
                />
            )}
            {!authToken && <div className="placeholder">Unauthorized</div>}
            <p className="item-name">{name}</p>
        </div>
    );
}

interface ItemData {
    name: string;
    location: string;
}

/**
 * The main component for the Gallery
 */
export default function Gallery() {
    const [account, setAccount] = useState<string>();
    const [authToken, setAuthToken] = useState<string>();
    const [items, setItems] = useState<ItemData[]>([]);

    useEffect(() => {
        getNames(VERIFIER_URL).then((names) =>
            setItems(names.map((name) => ({ name, location: `${VERIFIER_URL}/image/` + name })))
        );
    }, []);

    useEffect(() => {
        detectConcordiumProvider()
            .then((provider) => {
                // Listen for relevant events from the wallet.
                provider.on('accountChanged', setAccount);
                provider.on('accountDisconnected', () => provider.getMostRecentlySelectedAccount().then(setAccount));
                // Check if you are already connected
                provider.getMostRecentlySelectedAccount().then(setAccount);
            })
            .catch(() => setAccount(undefined));
    }, []);

    const handleErrorOnLoad = useCallback(() => {
        setAuthToken(undefined);
        setTimeout(() => alert('Authorization is no longer valid'), 100);
    }, []);

    return (
        <main className="restricted-media">
            <h1 className="title">The Gallery</h1>
            <Connection
                verifier={VERIFIER_URL}
                account={account}
                authToken={authToken}
                setAccount={setAccount}
                setAuthToken={setAuthToken}
            />
            <div className="main-window">
                {items.map(({ location, name }) => (
                    <Item location={location} name={name} authToken={authToken} onError={handleErrorOnLoad} />
                ))}
            </div>
        </main>
    );
}
