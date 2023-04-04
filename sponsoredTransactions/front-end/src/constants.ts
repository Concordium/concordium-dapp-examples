// The TESTNET_GENESIS_BLOCK_HASH is used to check that the user has its browser wallet connected to testnet and not to mainnet.
import {
    BrowserWalletConnector,
    ephemeralConnectorType,
    Network,
    WalletConnectConnector,
} from '@concordium/react-components';
import { SignClientTypes } from '@walletconnect/types';
import moment from 'moment';

export const REFRESH_INTERVAL = moment.duration(10, 'seconds');

export const TESTNET_GENESIS_BLOCK_HASH = '4221332d34e1694168c2a0c0b3fd0f273809612cb13d000d5c2e00e85f50f796';

export const SPONSORED_TX_CONTRACT_NAME = 'cis3_nft';

export const SPONSORED_TX_CONTRACT_INDEX = 4184n;

export const EXPIRY_TIME_SIGNATURE = '2030-08-08T05:15:00Z';

export const SERIALIZATION_HELPER_SCHEMA =
    'FAAFAAAAEAAAAGNvbnRyYWN0X2FkZHJlc3MMCwAAAGVudHJ5X3BvaW50FgEFAAAAbm9uY2UFCQAAAHRpbWVzdGFtcA0HAAAAcGF5bG9hZBUCAAAACAAAAFRyYW5zZmVyAQEAAAAQARQABQAAAAgAAAB0b2tlbl9pZB0ABgAAAGFtb3VudBslAAAABAAAAGZyb20VAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMAgAAAHRvFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAECAAAADBYBBAAAAGRhdGEdAQ4AAABVcGRhdGVPcGVyYXRvcgEBAAAAEAEUAAIAAAAGAAAAdXBkYXRlFQIAAAAGAAAAUmVtb3ZlAgMAAABBZGQCCAAAAG9wZXJhdG9yFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA';

export const PUBLIC_KEY_OF_PARAMETER_SCHEMA =
    'FAABAAAABwAAAHF1ZXJpZXMQARQAAQAAAAcAAABhY2NvdW50Cw';

export const PUBLIC_KEY_OF_RETURN_VALUE_SCHEMA =
    'FAEBAAAAEAEVAgAAAAQAAABOb25lAgQAAABTb21lAQEAAAAPHiAAAAAF';

export const REGISTER_PUBLIC_KEYS_PARAMETER_SCHEMA =
    'FAEBAAAAEAEUAAIAAAAHAAAAYWNjb3VudAsKAAAAcHVibGljX2tleR4gAAAA';

export const MINT_PARAMETER_SCHEMA =
    'FAABAAAABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA';

export const CONTRACT_SUB_INDEX = 0n;

const WALLET_CONNECT_PROJECT_ID = '76324905a70fe5c388bab46d3e0564dc';
const WALLET_CONNECT_OPTS: SignClientTypes.Options = {
    projectId: WALLET_CONNECT_PROJECT_ID,
    metadata: {
        name: 'sponsoredTxs',
        description: 'Example dApp for sponsored txs.',
        url: '#',
        icons: ['https://walletconnect.com/walletconnect-logo.png'],
    },
};
export const TESTNET: Network = {
    name: 'testnet',
    genesisHash: TESTNET_GENESIS_BLOCK_HASH,
    jsonRpcUrl: 'https://json-rpc.testnet.concordium.com',
    ccdScanBaseUrl: 'https://testnet.ccdscan.io',
};

export const BROWSER_WALLET = ephemeralConnectorType(BrowserWalletConnector.create);
export const WALLET_CONNECT = ephemeralConnectorType(
    WalletConnectConnector.create.bind(undefined, WALLET_CONNECT_OPTS)
);
