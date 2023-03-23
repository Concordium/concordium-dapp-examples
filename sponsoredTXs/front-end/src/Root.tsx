import React from 'react';

import { WithWalletConnector } from '@concordium/react-components';
import SPONSOREDTXS from './sponsoredTx';
import { TESTNET } from './constants';

/**
 * Connect to wallet, setup application state context, and render children when the wallet API is ready for use.
 */
export default function Root() {
    return (
        <div>
            <main className="sponsoredTxs">
                <WithWalletConnector network={TESTNET}>{(props) => <SPONSOREDTXS {...props} />}</WithWalletConnector>
            </main>
        </div>
    );
}
