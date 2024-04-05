// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

import { WithWalletConnector, TESTNET } from '@concordium/react-components';
import SponsoredTransactions from './SponsoredTransactions';

/**
 * Connect to wallet, setup application state context, and render children when the wallet API is ready for use.
 */
export default function Root() {
    return (
        <div>
            <main className="sponsoredTransactions">
                <WithWalletConnector network={TESTNET}>
                    {(props) => <SponsoredTransactions {...props} />}
                </WithWalletConnector>
            </main>
        </div>
    );
}
