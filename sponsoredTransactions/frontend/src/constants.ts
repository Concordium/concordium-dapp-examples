import { BrowserWalletConnector, ephemeralConnectorType, WalletConnectConnector } from '@concordium/react-components';
import { SignClientTypes } from '@walletconnect/types';
import moment from 'moment';

export const VERIFIER_URL = '/api';

export const REFRESH_INTERVAL = moment.duration(5, 'seconds');

export const SPONSORED_TX_CONTRACT_NAME = 'cis3_nft';

export const CONTRACT_SUB_INDEX = 0n;

export const UPDATE_OPERATOR_SCHEMA =
    'EAEUAAIAAAAGAAAAdXBkYXRlFQIAAAAGAAAAUmVtb3ZlAgMAAABBZGQCCAAAAG9wZXJhdG9yFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA';
export const TRANSFER_SCHEMA =
    'EAEUAAUAAAAIAAAAdG9rZW5faWQdAAYAAABhbW91bnQbJQAAAAQAAABmcm9tFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAIAAAB0bxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAgAAAAwWAQQAAABkYXRhEAEC';

export const NONCE_OF_PARAMETER_SCHEMA = 'FAABAAAABwAAAHF1ZXJpZXMQARQAAQAAAAcAAABhY2NvdW50Cw==';

export const NONCE_OF_RETURN_VALUE_SCHEMA = 'FAEBAAAAEAEF';

export const MINT_PARAMETER_SCHEMA = 'FAABAAAABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==';

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

export const BROWSER_WALLET = ephemeralConnectorType(BrowserWalletConnector.create);
export const WALLET_CONNECT = ephemeralConnectorType(
    WalletConnectConnector.create.bind(undefined, WALLET_CONNECT_OPTS),
);
