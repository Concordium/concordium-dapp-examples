/* eslint-disable no-console */
import React, { useEffect, useState, useMemo, useCallback } from 'react';

import { detectConcordiumProvider } from '@concordium/browser-wallet-api-helpers';
import PiggyBankV0 from './Version0';
import PiggyBankV1 from './Version1';
import { state, State } from './utils';

/**
 * Connect to wallet, setup application state context, and render children when the wallet API is ready for use.
 */
export default function Root() {
    const [account, setAccount] = useState<string>();
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [isVersion0, setIsVersion0] = useState<boolean>(false);

    const handleGetAccount = useCallback((accountAddress: string | undefined) => {
        setAccount(accountAddress);
        setIsConnected(Boolean(accountAddress));
    }, []);

    const handleOnClick = useCallback(
        () =>
            detectConcordiumProvider()
                .then((provider) => provider.connect())
                .then(handleGetAccount),
        []
    );

    useEffect(() => {
        detectConcordiumProvider()
            .then((provider) => {
                // Listen for relevant events from the wallet.
                provider.on('accountChanged', setAccount);
                provider.on('accountDisconnected', () =>
                    provider.getMostRecentlySelectedAccount().then(handleGetAccount)
                );
                provider.on('chainChanged', (chain) => console.log(chain));
                // Check if you are already connected
                provider.getMostRecentlySelectedAccount().then(handleGetAccount);
            })
            .catch(() => setIsConnected(false));
    }, []);

    const stateValue: State = useMemo(() => ({ isConnected, account }), [isConnected, account]);

    return (
        // Setup a globally accessible state with data from the wallet.
        <state.Provider value={stateValue}>
            <button type="button" onClick={() => setIsVersion0((v) => !v)}>
                Switch to {isVersion0 ? 'V1' : 'V0'}
            </button>
            <main className="piggybank">
                <div className={`connection-banner ${isConnected ? 'connected' : ''}`}>
                    {isConnected && `Connected: ${account}`}
                    {!isConnected && (
                        <>
                            <p>No wallet connection</p>
                            <button type="button" onClick={handleOnClick}>
                                Connect
                            </button>
                        </>
                    )}
                </div>
                <br />
                {isVersion0 && <PiggyBankV0 />}
                {!isVersion0 && <PiggyBankV1 />}
            </main>
        </state.Provider>
    );
}
