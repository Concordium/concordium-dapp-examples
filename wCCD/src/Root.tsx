// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Network, WithWalletConnector, MAINNET, TESTNET } from '@concordium/react-components';
import { version } from '../package.json';

import WCCD from './wCCD';
import { WCCD_CONTRACT_INDEX_MAINNET, WCCD_CONTRACT_INDEX_TESTNET } from './constants';

/**
 * Connect to wallet, setup application state context, and render children when the wallet API is ready for use.
 */
export default function Root() {
    const testnet = 'testnet';
    const mainnet = 'mainnet';

    let NETWORK: Network;
    let wCCDContractIndex: bigint;

    if (process.env.NETWORK === mainnet) {
        NETWORK = MAINNET;
        wCCDContractIndex = WCCD_CONTRACT_INDEX_MAINNET;
    } else if (process.env.NETWORK === testnet) {
        NETWORK = TESTNET;
        wCCDContractIndex = WCCD_CONTRACT_INDEX_TESTNET;
    } else {
        throw Error('Environmental variable NETWORK needs to be defined and set to either "mainnet" or "testnet"');
    }

    return (
        <div>
            <main className="wccd">
                <WithWalletConnector network={NETWORK}>
                    {(props) => <WCCD walletConnectionProps={props} wCCDContractIndex={wCCDContractIndex} />}
                </WithWalletConnector>
                <div>
                    Version: {version} |{' '}
                    <a
                        style={{ color: 'white' }}
                        href="https://developer.concordium.software/en/mainnet/smart-contracts/tutorials/wCCD/index.html"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Learn how to make a wrapper like this
                    </a>
                </div>
            </main>
        </div>
    );
}
