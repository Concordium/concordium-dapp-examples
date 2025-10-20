import { SignClientTypes } from "@walletconnect/types";
import { BrowserWalletConnector, WalletConnectConnector } from '@concordium/wallet-connectors';
import { ephemeralConnectorType } from '@concordium/react-components';

export const REGISTRY_CONTRACT_REGISTRY_METADATA_RETURN_VALUE_SCHEMA =
    'FAADAAAADwAAAGlzc3Vlcl9tZXRhZGF0YRQAAgAAAAMAAAB1cmwWAQQAAABoYXNoFQIAAAAEAAAATm9uZQIEAAAAU29tZQEBAAAAHiAAAAAPAAAAY3JlZGVudGlhbF90eXBlFAABAAAADwAAAGNyZWRlbnRpYWxfdHlwZRYAEQAAAGNyZWRlbnRpYWxfc2NoZW1hFAABAAAACgAAAHNjaGVtYV9yZWYUAAIAAAADAAAAdXJsFgEEAAAAaGFzaBUCAAAABAAAAE5vbmUCBAAAAFNvbWUBAQAAAB4gAAAA';

const WALLET_CONNECT_PROJECT_ID = '76324905a70fe5c388bab46d3e0564dc';

const WALLET_CONNECT_OPTS: SignClientTypes.Options = {
    projectId: WALLET_CONNECT_PROJECT_ID,
    relayUrl: 'wss://relay.walletconnect.com',
    metadata: {
        name: 'Token Distribution dApp',
        description: 'Compliance token distribution using Concordium ID',
        url: typeof window !== 'undefined' ? window.location.origin : 'https://localhost:5173',
        icons: ['https://walletconnect.com/walletconnect-logo.png'],
    },
};

export const BROWSER_WALLET = ephemeralConnectorType(BrowserWalletConnector.create);

export const WALLET_CONNECT = ephemeralConnectorType(
    WalletConnectConnector.create.bind(undefined, WALLET_CONNECT_OPTS)
);