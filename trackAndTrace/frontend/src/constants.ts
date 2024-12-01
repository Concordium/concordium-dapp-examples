import moment from 'moment';
import { BrowserWalletConnector, ephemeralConnectorType } from '@concordium/react-components';
import { ContractAddress } from '@concordium/web-sdk';
import { TESTNET, MAINNET } from '@concordium/wallet-connectors';

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

// Before submitting a transaction we simulate/dry-run the transaction to get an
// estimate of the energy needed for executing the transaction. In addition, we
// allow an additional small amount of energy `EPSILON_ENERGY` to be consumed by
// the transaction to cover small variations (e.g. changes to the smart contract
// state) caused by transactions that have been executed meanwhile.
export const EPSILON_ENERGY = 200n;

export const BROWSER_WALLET = ephemeralConnectorType(BrowserWalletConnector.create);

export const SERIALIZATION_HELPER_SCHEMA_PERMIT_MESSAGE =
    'FAAFAAAAEAAAAGNvbnRyYWN0X2FkZHJlc3MMBQAAAG5vbmNlBQkAAAB0aW1lc3RhbXANCwAAAGVudHJ5X3BvaW50FgEHAAAAcGF5bG9hZBABAg==';

export const DAPP_NAME = 'Track & Trace';
