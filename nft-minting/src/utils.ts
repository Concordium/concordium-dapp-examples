/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';
import { detectConcordiumProvider } from '@concordium/browser-wallet-api-helpers';
import {
    AccountTransactionType,
    CcdAmount,
    ContractAddress,
    ContractName,
    Energy,
    ModuleReference,
    ReceiveName,
    UpdateContractPayload,
    ConcordiumGRPCClient,
    TransactionHash,
    TransactionSummaryType,
    TransactionKindString,
    AccountAddress,
    toBuffer,
    EntrypointName,
    serializeUpdateContractParameters,
    InvokeContractFailedResult,
    RejectedReceive,
} from '@concordium/web-sdk';
import { EPSILON_ENERGY, RAW_SCHEMA } from './constant';

/**
 * Action for initializing a smart contract for keeping a collections of tokens.
 */
export const createCollection = async (address: string): Promise<bigint> => {
    const provider = await detectConcordiumProvider();
    const txHash = await provider.sendTransaction(address, AccountTransactionType.InitContract, {
        amount: CcdAmount.fromMicroCcd(0),
        moduleRef: ModuleReference.fromHexString('69d48cea644389f65be2cd807df746abc8b97d888dc98ae531030c2a3bffeee0'),
        initName: ContractName.fromString('CIS2-NFT'),
        maxContractExecutionEnergy: Energy.create(30000),
    });

    const grpc = new ConcordiumGRPCClient(provider.grpcTransport);
    const status = await grpc.waitForTransactionFinalization(TransactionHash.fromHexString(txHash));

    if (
        status.summary.type === TransactionSummaryType.AccountTransaction &&
        status.summary.transactionType === TransactionKindString.InitContract
    ) {
        return status.summary.contractInitialized.address.index;
    }

    throw new Error('failed');
};

/**
 * Action for minting NFT's in a collection. This is only possible to do, if the account sending the transaction is the owner of the collection:
 */
export const mint = async (account: string, id: string, url: string, index: bigint, subindex = 0n): Promise<string> => {
    const provider = await detectConcordiumProvider();
    const address = ContractAddress.create(index, subindex);
    const receiveName = ReceiveName.fromString(`CIS2-NFT.mint`);
    const parameter = {
        owner: { Account: [account] },
        token_id: id,
        metadata: { url, hash: { None: [] } },
    };
    const serializedParameters = serializeUpdateContractParameters(
        ContractName.fromString('CIS2-NFT'),
        EntrypointName.fromString('mint'),
        parameter,
        toBuffer(RAW_SCHEMA, 'base64')
    );
    const invokeResult = await new ConcordiumGRPCClient(provider.grpcTransport).invokeContract({
        contract: address,
        method: receiveName,
        invoker: AccountAddress.fromBase58(account),
        parameter: serializedParameters,
    });

    if (!invokeResult || invokeResult.tag === 'failure') {
        const rejectReason = JSON.stringify(
            ((invokeResult as InvokeContractFailedResult)?.reason as RejectedReceive)?.rejectReason
        );

        throw new Error(
            `RPC call 'invokeContract' on method '${receiveName}' of contract '${index}' failed.
            ${rejectReason !== undefined ? `Reject reason: ${rejectReason}` : ''}`
        );
    }

    const maxContractExecutionEnergy = Energy.create(invokeResult.usedEnergy.value + EPSILON_ENERGY);
    const txHash = await provider.sendTransaction(
        account,
        AccountTransactionType.Update,
        {
            amount: CcdAmount.fromMicroCcd(0n),
            address,
            receiveName,
            maxContractExecutionEnergy,
        } as UpdateContractPayload,
        parameter,
        RAW_SCHEMA
    );

    const grpc = new ConcordiumGRPCClient(provider.grpcTransport);
    const status = await grpc.waitForTransactionFinalization(TransactionHash.fromHexString(txHash));

    if (
        status.summary.type === TransactionSummaryType.AccountTransaction &&
        status.summary.transactionType === TransactionKindString.Update
    ) {
        return txHash;
    }

    throw new Error('failed');
};

export const isOwner = async (account: string, index: bigint, subindex = 0n): Promise<boolean> => {
    const provider = await detectConcordiumProvider();
    const grpc = new ConcordiumGRPCClient(provider.grpcTransport);

    try {
        const info = await grpc.getInstanceInfo(ContractAddress.create(index, subindex));
        return info.owner.address === account;
    } catch (e) {
        alert((e as Error).message);
    }

    return false;
};

/**
 * Global application state.
 */
export type State = {
    isConnected: boolean;
    account: string | undefined;
};

export const state = createContext<State>({ isConnected: false, account: undefined });
