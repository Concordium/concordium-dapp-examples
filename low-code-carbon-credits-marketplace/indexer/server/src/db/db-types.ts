import {
    ContractAddress,
    TransactionEventTag,
    TransactionKindString,
    TransactionSummaryType,
} from '@concordium/node-sdk';
import { Model } from 'mongoose';

export type IBlock = {
    blockHeight: number;
    blockHash: string;
};

export type DbEvent<T> = {
    event: T;
    eventType: TransactionEventTag;
    address: { index: string; subindex: string };
    sender: string;
};

export type DbTransactionEvent<T> = DbEvent<T> & {
    transaction: {
        hash: string;
        transactionIndex: string;
        blockItemType: TransactionSummaryType;
        transactionType: TransactionKindString;
    };
};

export type DbBlockEvent<T> = DbTransactionEvent<T> & {
    block: {
        blockHash: string;
        blockHeight: number;
    };
};

export type IContractEvent = DbBlockEvent<unknown>;

export type IUser = {
    email: string;
    account: string;
}

export type IDb = {
    blocks: Model<IBlock>;
    contractEvents: Model<IContractEvent>;
    users: Model<IUser>;
};

export type InitializedContract = {
    moduleRef: string;
    contractAddress: ContractAddress;
};
