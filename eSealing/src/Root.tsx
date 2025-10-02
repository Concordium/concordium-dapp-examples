// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

import { WithWalletConnector, TESTNET } from '@concordium/react-components';
import SEALING from './eSealing';

/**
 * Connect to wallet, setup application state context, and render children when the wallet API is ready for use.
 */
export default function Root() {
    return (
        <div>
            <main className="eSealing">
                <WithWalletConnector network={TESTNET}>{(props) => <SEALING {...props} />}</WithWalletConnector>
            </main>
        </div>
    );
}
