import React from 'react';

import { version } from '../../package.json';

/*
 * A component that displays a link to the developer documentation and the version of the app.
 */
export default function Footer() {
    return (
        <div>
            <br />
            Version: {version} |{' '}
            <a
                className="link"
                href="https://developer.concordium.software/en/mainnet/smart-contracts/tutorials/sponsoredTransactions/index.html"
                target="_blank"
                rel="noreferrer"
            >
                Learn more about sponsored tx here
            </a>
            <br />
        </div>
    );
}
