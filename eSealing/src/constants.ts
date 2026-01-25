// The TESTNET_GENESIS_BLOCK_HASH is used to check that the user has its browser wallet connected to testnet and not to mainnet.
import { BrowserWalletConnector, ephemeralConnectorType, WalletConnectConnector } from '@concordium/react-components';
import { SignClientTypes } from '@walletconnect/types';

export const E_SEALING_CONTRACT_NAME = 'eSealing';

export const E_SEALING_CONTRACT_INDEX = 2481n;

export const E_SEALING_RAW_SCHEMA =
    '//8DAQAAAAgAAABlU2VhbGluZwACAAAABwAAAGdldEZpbGUGHiAAAAAVAgAAAAQAAABOb25lAgQAAABTb21lAQEAAAAUAAIAAAAJAAAAdGltZXN0YW1wDQcAAAB3aXRuZXNzCxUFAAAACwAAAFBhcnNlUGFyYW1zAgcAAABMb2dGdWxsAgwAAABMb2dNYWxmb3JtZWQCCwAAAE9ubHlBY2NvdW50AhEAAABBbHJlYWR5UmVnaXN0ZXJlZAIMAAAAcmVnaXN0ZXJGaWxlBB4gAAAAFQUAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAILAAAAT25seUFjY291bnQCEQAAAEFscmVhZHlSZWdpc3RlcmVkAgEVAQAAAAwAAABSZWdpc3RyYXRpb24BAQAAABQAAwAAAAkAAABmaWxlX2hhc2geIAAAAAcAAAB3aXRuZXNzCwkAAAB0aW1lc3RhbXAN';

export const CONTRACT_SUB_INDEX = 0n;

const WALLET_CONNECT_PROJECT_ID = '76324905a70fe5c388bab46d3e0564dc';
const WALLET_CONNECT_OPTS: SignClientTypes.Options = {
    projectId: WALLET_CONNECT_PROJECT_ID,
    metadata: {
        name: 'eSealing',
        description: 'Example dApp for the eSealing a file.',
        url: '#',
        icons: ['https://walletconnect.com/walletconnect-logo.png'],
    },
};

export const BROWSER_WALLET = ephemeralConnectorType(BrowserWalletConnector.create);
export const WALLET_CONNECT = ephemeralConnectorType(
    WalletConnectConnector.create.bind(undefined, WALLET_CONNECT_OPTS),
);

// Before submitting a transaction we simulate/dry-run the transaction to get an
// estimate of the energy needed for executing the transaction. In addition, we
// allow an additional small amount of energy `EPSILON_ENERGY` to be consumed by
// the transaction to cover small variations (e.g. changes to the smart contract
// state) caused by transactions that have been executed meanwhile.
export const EPSILON_ENERGY = 200n;
