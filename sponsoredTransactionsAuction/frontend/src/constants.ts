import { BrowserWalletConnector, ephemeralConnectorType } from '@concordium/react-components';
import { ContractName } from '@concordium/web-sdk';

import moment from 'moment';

export const VERIFIER_URL = '/api';

export const NODE = 'http://node.testnet.concordium.com';

export const PORT = 20000;

export const REFRESH_INTERVAL = moment.duration(5, 'seconds');

export const SPONSORED_TX_CONTRACT_NAME = ContractName.fromString('cis2_multi');
export const AUCTION_CONTRACT_NAME = ContractName.fromString('sponsored_tx_enabled_auction');

export const CONTRACT_SUB_INDEX = 0n;

export const EPSILON_ENERGY = 1000n;

export const AUCTION_START = '2000-01-01T12:00:00Z'; // Hardcoded value for simplicity for this demo dApp.
export const AUCTION_END = '2050-01-01T12:00:00Z'; // Hardcoded value for simplicity for this demo dApp.

export const METADATA_URL = 'https://s3.eu-central-1.amazonaws.com/tokens.testnet.concordium.com/ft/wccd'; // We use the same metadat URL for every token_id for simplicity for this demo dApp. In production, you should consider using a different metadata file for each token_id.

export const EVENT_SCHEMA = 'HwEAAAAADAAAAEFkZEl0ZW1FdmVudAABAAAACgAAAGl0ZW1faW5kZXgD';

export const TRANSFER_SCHEMA =
    'EAEUAAUAAAAIAAAAdG9rZW5faWQdAAYAAABhbW91bnQbJQAAAAQAAABmcm9tFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAIAAAB0bxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAgAAAAwWAQQAAABkYXRhHQE=';

export const SERIALIZATION_HELPER_SCHEMA_PERMIT_MESSAGE =
    'FAAFAAAAEAAAAGNvbnRyYWN0X2FkZHJlc3MMBQAAAG5vbmNlBQkAAAB0aW1lc3RhbXANCwAAAGVudHJ5X3BvaW50FgEHAAAAcGF5bG9hZBABAg==';

export const SERIALIZATION_HELPER_SCHEMA_ADDITIONAL_DATA = 'Aw==';

export const MINT_PARAMETER_SCHEMA =
    'FAADAAAABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAwAAABtZXRhZGF0YV91cmwUAAIAAAADAAAAdXJsFgEEAAAAaGFzaBUCAAAABAAAAE5vbmUCBAAAAFNvbWUBAQAAAB4gAAAACAAAAHRva2VuX2lkHQA=';

export const ADD_ITEM_PARAMETER_SCHEMA =
    'FAAFAAAABAAAAG5hbWUWAgMAAABlbmQNBQAAAHN0YXJ0DQsAAABtaW5pbXVtX2JpZBslAAAACAAAAHRva2VuX2lkHQA=';

export const BROWSER_WALLET = ephemeralConnectorType(BrowserWalletConnector.create);
