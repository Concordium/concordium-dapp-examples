import { SignClientTypes } from "@walletconnect/types";
import { BrowserWalletConnector, WalletConnectConnector } from '@concordium/wallet-connectors';
import { ephemeralConnectorType, CONCORDIUM_WALLET_CONNECT_PROJECT_ID } from '@concordium/react-components';

export const REGISTRY_CONTRACT_REGISTRY_METADATA_RETURN_VALUE_SCHEMA =
    'FAADAAAADwAAAGlzc3Vlcl9tZXRhZGF0YRQAAgAAAAMAAAB1cmwWAQQAAABoYXNoFQIAAAAEAAAATm9uZQIEAAAAU29tZQEBAAAAHiAAAAAPAAAAY3JlZGVudGlhbF90eXBlFAABAAAADwAAAGNyZWRlbnRpYWxfdHlwZRYAEQAAAGNyZWRlbnRpYWxfc2NoZW1hFAABAAAACgAAAHNjaGVtYV9yZWYUAAIAAAADAAAAdXJsFgEEAAAAaGFzaBUCAAAABAAAAE5vbmUCBAAAAFNvbWUBAQAAAB4gAAAA';

const WALLET_CONNECT_OPTS: SignClientTypes.Options = {
    projectId: CONCORDIUM_WALLET_CONNECT_PROJECT_ID,
    metadata: {
        name: 'Token Distribution dApp',
        description: 'Compliance token distribution using Concordium ID',
        url: '#',
        icons: ['https://walletconnect.com/walletconnect-logo.png'],
    },
};

export const BROWSER_WALLET = ephemeralConnectorType(BrowserWalletConnector.create);

export const WALLET_CONNECT = ephemeralConnectorType(
    WalletConnectConnector.create.bind(undefined, WALLET_CONNECT_OPTS)
);