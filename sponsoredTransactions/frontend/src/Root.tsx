import React from 'react';

import { WithWalletConnector } from '@concordium/react-components';
import SponsoredTransactions from './SponsoredTransactions';
import { TESTNET } from './constants';

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
