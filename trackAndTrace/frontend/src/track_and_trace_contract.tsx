import * as TrackAndTraceContract from '../generated/module_track_and_trace'; // Code generated from a smart contract module. The naming convention of the generated file is `moduleName_smartContractName`.

import {
    AccountTransactionType,
    toBuffer,
    UpdateContractPayload,
    CcdAmount,
    ReceiveName,
    EntrypointName,
    Energy,
    AccountAddress,
    TransactionHash,
    ContractAddress,
    ConcordiumGRPCWebClient,
} from '@concordium/web-sdk';
import {
    // ADD_ITEM_PARAMETER_SCHEMA,
    // AUCTION_CONTRACT_NAME,
    // AUCTION_END,
    // AUCTION_START,
    CONTRACT_SUB_INDEX,
    EPSILON_ENERGY,
    NODE,
    PORT,
} from '../constants';
import { TypedSmartContractParameters, WalletConnection } from '@concordium/wallet-connectors';

import JSONbig from 'json-bigint';

const grpc = new ConcordiumGRPCWebClient(NODE, PORT);

const contract = TrackAndTraceContract.createUnchecked(
    grpc,
    ContractAddress.create(Number(process.env.CONTRACT_INDEX), CONTRACT_SUB_INDEX)
);

export const CONTRACT = contract;
