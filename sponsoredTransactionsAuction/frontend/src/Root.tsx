import React from 'react';

import { WithWalletConnector, TESTNET } from '@concordium/react-components';
import SponsoredTransactions from './SponsoredTransactions';

export default function Root() {
    return (
        <div>
            <main>
                <WithWalletConnector network={TESTNET}>
                    {(props) => <SponsoredTransactions {...props} />}
                </WithWalletConnector>
            </main>
        </div>
    );
}
