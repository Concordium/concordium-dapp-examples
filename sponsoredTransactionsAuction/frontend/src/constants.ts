import { BrowserWalletConnector, ephemeralConnectorType } from '@concordium/react-components';
import { ConcordiumGRPCWebClient, ContractAddress, ContractName } from '@concordium/web-sdk';
import * as Cis2MultiContract from '../generated/cis2_multi_cis2_multi'; // Code generated from a smart contract module. The naming convention of the generated file is `moduleName_smartContractName`.
import * as AuctionContract from '../generated/sponsored_tx_enabled_auction_sponsored_tx_enabled_auction'; // Code generated from a smart contract module. The naming convention of the generated file is `moduleName_smartContractName`.

import moment from 'moment';

export const VERIFIER_URL = '/api';

export const NODE = 'https://grpc.testnet.concordium.com';

export const PORT = 20000;

export const REFRESH_INTERVAL = moment.duration(2, 'seconds');

export const SPONSORED_TX_CONTRACT_NAME = ContractName.fromString('cis2_multi');
export const AUCTION_CONTRACT_NAME = ContractName.fromString('sponsored_tx_enabled_auction');

export const CONTRACT_SUB_INDEX = 0n;

// Before submitting a transaction we simulate/dry-run the transaction to get an
// estimate of the energy needed for executing the transaction. In addition, we
// allow an additional small amount of energy `EPSILON_ENERGY` to be consumed by
// the transaction to cover small variations (e.g. changes to the smart contract
// state) caused by transactions that have been executed meanwhile.
export const EPSILON_ENERGY = 200n;

export const AUCTION_START = '2000-01-01T12:00:00Z'; // Hardcoded value for simplicity for this demo dApp.
export const AUCTION_END = '2050-01-01T12:00:00Z'; // Hardcoded value for simplicity for this demo dApp.

export const METADATA_URL =
    'https://gist.githubusercontent.com/DOBEN/e035ef44705cdf8919f72c98a25d54eb/raw/8c6b375a2dff448e7bbd12a27fc420d41f268f12/gistfile1.txt'; // We use the same metadat URL for every token_id for simplicity for this demo dApp. In production, you should consider using a different metadata file for each token_id.

export const TRANSFER_SCHEMA =
    'EAEUAAUAAAAIAAAAdG9rZW5faWQdAAYAAABhbW91bnQbJQAAAAQAAABmcm9tFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAIAAAB0bxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAgAAAAwWAQQAAABkYXRhHQE=';

export const SERIALIZATION_HELPER_SCHEMA_ADDITIONAL_DATA = 'Aw==';

export const BROWSER_WALLET = ephemeralConnectorType(BrowserWalletConnector.create);

const grpc = new ConcordiumGRPCWebClient(NODE, PORT);

const cis2_token_contract = Cis2MultiContract.createUnchecked(
    grpc,
    ContractAddress.create(Number(process.env.CIS2_TOKEN_CONTRACT_INDEX), CONTRACT_SUB_INDEX),
);

const auction_contract = AuctionContract.createUnchecked(
    grpc,
    ContractAddress.create(Number(process.env.AUCTION_CONTRACT_INDEX), CONTRACT_SUB_INDEX),
);

export const AUCTION_CONTRACT = auction_contract;
export const CIS2_TOKEN_CONTRACT = cis2_token_contract;
