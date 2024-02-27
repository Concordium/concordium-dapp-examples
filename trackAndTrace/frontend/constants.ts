import { BrowserWalletConnector, ephemeralConnectorType } from '@concordium/react-components';

import moment from 'moment';

export const VERIFIER_URL = '/api';

export const NODE = 'https://grpc.testnet.concordium.com';

export const PORT = 20000;

export const REFRESH_INTERVAL = moment.duration(2, 'seconds');

export const CONTRACT_SUB_INDEX = 0n;

// Before submitting a transaction we simulate/dry-run the transaction to get an
// estimate of the energy needed for executing the transaction. In addition, we
// allow an additional small amount of energy `EPSILON_ENERGY` to be consumed by
// the transaction to cover small variations (e.g. changes to the smart contract
// state) caused by transactions that have been executed meanwhile.
export const EPSILON_ENERGY = 200n;

export const BROWSER_WALLET = ephemeralConnectorType(BrowserWalletConnector.create);

export const SERIALIZATION_HELPER_SCHEMA_PERMIT_MESSAGE =
    'FAAFAAAAEAAAAGNvbnRyYWN0X2FkZHJlc3MMBQAAAG5vbmNlBQkAAAB0aW1lc3RhbXANCwAAAGVudHJ5X3BvaW50FgEHAAAAcGF5bG9hZBABAg==';

export const CHANGE_ITEM_STATUS_PARAMETER_SCHEMA =
    'FAADAAAABwAAAGl0ZW1faWQFCgAAAG5ld19zdGF0dXMVBAAAAAgAAABQcm9kdWNlZAIJAAAASW5UcmFuc2l0AgcAAABJblN0b3JlAgQAAABTb2xkAg8AAABhZGRpdGlvbmFsX2RhdGEUAAEAAAAFAAAAYnl0ZXMQAgI';
