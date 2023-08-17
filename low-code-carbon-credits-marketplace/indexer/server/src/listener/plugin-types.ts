import {
    TransactionSummaryType,
    TransactionKindString,
    ContractAddress,
    TransactionEventTag,
} from '@concordium/node-sdk';

export type PluginBlockItem = {
    transactionIndex: bigint;
    hash: string;
    type: TransactionSummaryType;
    transactionType: TransactionKindString;
    contractAddress: ContractAddress;
    methodName: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    events: any[];
    transactionEventType: TransactionEventTag;
    sender: string;
};
