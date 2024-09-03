import moment from 'moment';
import { ContractAddress } from '@concordium/web-sdk';
import { TESTNET, MAINNET } from '@concordium/wallet-connectors';
import { SignClientTypes } from '@walletconnect/types';

const { protocol, hostname, port } = new URL(CONFIG.node);
export const NODE_HOST = `${protocol}//${hostname}`;
export const NODE_PORT = Number(port);

export const SPONSORED_TRANSACTION_BACKEND = CONFIG.sponsoredTransactionBackend;

export const REFRESH_INTERVAL = moment.duration(2, 'seconds');

/** The contract address of the track and trace contract.  */
export const CONTRACT_ADDRESS = ContractAddress.fromSerializable(CONFIG.contractAddress);

/** The Concordium network used for the application. */
export const NETWORK = CONFIG.network === 'mainnet' ? MAINNET : TESTNET;

export const CCD_SCAN_URL = NETWORK === MAINNET ? 'https://ccdscan.io' : 'https://testnet.ccdscan.io';
export const BACKEDN_BASE_URL = 'http://localhost:8080/';

// The string "CONCORDIUM_COMPLIANT_REWARD_DISTRIBUTION_DAPP" in bytes is used
// as context for signing messages and generating ZK proofs. The same account
// can be used in different Concordium services without the risk of re-playing
// signatures/zk-proofs across the different services due to this context string.
export const CONTEXT_STRING = new Uint8Array([
    67, 79, 78, 67, 79, 82, 68, 73, 85, 77, 95, 67, 79, 77, 80, 76, 73, 65, 78, 84, 95, 82, 69, 87, 65, 82, 68, 95, 68,
    73, 83, 84, 82, 73, 66, 85, 84, 73, 79, 78, 95, 68, 65, 80, 80,
]);

// Before submitting a transaction we simulate/dry-run the transaction to get an
// estimate of the energy needed for executing the transaction. In addition, we
// allow an additional small amount of energy `EPSILON_ENERGY` to be consumed by
// the transaction to cover small variations (e.g. changes to the smart contract
// state) caused by transactions that have been executed meanwhile.
export const EPSILON_ENERGY = 200n;

export const WALLET_CONNECT_PROJECT_ID = '76324905a70fe5c388bab46d3e0564dc';
export const WALLET_CONNECT_SESSION_NAMESPACE = 'ccd';
export const CHAIN_ID = `${WALLET_CONNECT_SESSION_NAMESPACE}:testnet`;
export const ID_METHOD = 'request_verifiable_presentation';

export const walletConnectOpts: SignClientTypes.Options = {
    projectId: WALLET_CONNECT_PROJECT_ID,
    metadata: {
        name: 'Compliance Reward Distribution',
        description: 'Application for distributing CCD rewards',
        url: '#',
        icons: ['https://walletconnect.com/walletconnect-logo.png'],
    },
};

export const SERIALIZATION_HELPER_SCHEMA_PERMIT_MESSAGE =
    'FAAFAAAAEAAAAGNvbnRyYWN0X2FkZHJlc3MMBQAAAG5vbmNlBQkAAAB0aW1lc3RhbXANCwAAAGVudHJ5X3BvaW50FgEHAAAAcGF5bG9hZBABAg==';
