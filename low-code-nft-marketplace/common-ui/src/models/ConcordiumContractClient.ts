import { Buffer } from 'buffer/';

import { SmartContractParameters, WalletApi } from '@concordium/browser-wallet-api-helpers';
import {
    AccountAddress,
    AccountTransactionType,
    BlockItemSummaryInBlock,
    CcdAmount,
    ConcordiumGRPCClient,
    ContractAddress,
    ModuleReference,
    serializeUpdateContractParameters,
    TransactionKindString,
    TransactionStatusEnum,
    TransactionSummaryType,
    UpdateContractPayload,
} from '@concordium/web-sdk';

export interface ContractInfo {
    schemaBuffer: Buffer;
    contractName: 'cis2_multi' | 'Market-NFT' | string;
    moduleRef?: ModuleReference;
}

export interface Cis2ContractInfo extends ContractInfo {
    tokenIdByteSize: number;
}

/**
 * Initializes a Smart Contract.
 * @param provider Wallet Provider.
 * @param moduleRef Contract Module Reference. Hash of the Deployed Contract Module.
 * @param schemaBuffer Buffer of Contract Schema.
 * @param contractName Name of the Contract.
 * @param account Account to Initialize the contract with.
 * @param maxContractExecutionEnergy Maximum energy allowed to execute.
 * @param ccdAmount CCD Amount to initialize the contract with.
 * @returns Contract Address.
 */
export async function initContract(
    provider: WalletApi,
    contractInfo: ContractInfo,
    account: string,
    params?: SmartContractParameters,
    maxContractExecutionEnergy = BigInt(9999),
    ccdAmount = BigInt(0)
): Promise<ContractAddress> {
    const { moduleRef, schemaBuffer, contractName } = contractInfo;
    if (!moduleRef) {
        throw new Error('Cannot instantiate a Module without Provided Module Ref');
    }

    const txnHash = await provider.sendTransaction(
        account,
        AccountTransactionType.InitContract,
        {
            amount: toCcd(ccdAmount),
            moduleRef,
            initName: contractName,
            maxContractExecutionEnergy,
        },
        params as SmartContractParameters,
        schemaBuffer.toString('base64')
    );

    let outcomes = await waitForTransaction(provider, txnHash);
    outcomes = ensureValidOutcome(outcomes);
    return parseContractAddress(outcomes);
}

/**
 * Invokes a Smart Contract.
 * @param provider Wallet Provider.
 * @param contractInfo Contract Constant Info.
 * @param contract Contract Address.
 * @param methodName Contract Method name to Call.
 * @param params Parameters to call the Contract Method with.
 * @param invoker Invoker Account.
 * @returns Buffer of the return value.
 */
export async function invokeContract<T>(
    grpcClient: ConcordiumGRPCClient,
    contractInfo: ContractInfo,
    contract: ContractAddress,
    methodName: string,
    params?: T,
    invoker?: ContractAddress | AccountAddress
): Promise<Buffer> {
    const { schemaBuffer, contractName } = contractInfo;
    const parameter = params ? serializeParams(contractName, schemaBuffer, methodName, params) : undefined;

    const res = await grpcClient.invokeContract({
        parameter,
        contract,
        invoker,
        method: `${contractName}.${methodName}`,
    });

    if (!res || res.tag === 'failure') {
        const msg =
            `failed invoking contract ` +
            `method:${methodName}, ` +
            `contract:(index: ${contract.index.toString()}, subindex: ${contract.subindex.toString()})`;
        return Promise.reject(new Error(msg, { cause: res }));
    }

    if (!res.returnValue) {
        const msg =
            `failed invoking contract, null return value` +
            `method:${methodName}, ` +
            `contract:(index: ${contract.index.toString()}, subindex: ${contract.subindex.toString()})`;
        return Promise.reject(new Error(msg, { cause: res }));
    }

    return Buffer.from(res.returnValue, 'hex');
}

/**
 * Updates a Smart Contract and waits for a Finalized Transaction. Throws an error if the transaction fails.
 * @param provider Wallet Provider.
 * @param contractName Name of the Contract.
 * @param schema Buffer of Contract Schema.
 * @param paramJson Parameters to call the Contract Method with.
 * @param account Account to Update the contract with.
 * @param contractAddress Contract Address.
 * @param methodName Contract Method name to Call.
 * @param maxContractExecutionEnergy Maximum energy allowed to execute.
 * @param amount CCD Amount to update the contract with.
 * @returns Update contract Outcomes.
 */
export async function updateContract(
    provider: WalletApi,
    contractInfo: ContractInfo,
    paramJson: SmartContractParameters,
    account: string,
    contractAddress: ContractAddress,
    methodName: string,
    maxContractExecutionEnergy = BigInt(9999),
    amount = BigInt(0)
): Promise<BlockItemSummaryInBlock> {
    const { schemaBuffer, contractName } = contractInfo;
    const txnHash = await provider.sendTransaction(
        account,
        AccountTransactionType.Update,
        {
            maxContractExecutionEnergy,
            address: contractAddress,
            amount: toCcd(amount),
            receiveName: `${contractName}.${methodName}`,
        } as UpdateContractPayload,
        paramJson as any,
        schemaBuffer.toString('base64')
    );

    return await waitAndThrowError(provider, txnHash);
}

export async function waitAndThrowError(provider: WalletApi, txnHash: string) {
    const outcomes = await waitForTransaction(provider, txnHash);
    return ensureValidOutcome(outcomes);
}

/**
 * Waits for the input transaction to Finalize.
 * @param provider Wallet Provider.
 * @param txnHash Hash of Transaction.
 * @returns Transaction outcomes.
 */
function waitForTransaction(provider: WalletApi, txnHash: string): Promise<BlockItemSummaryInBlock> {
    return new Promise((res, rej) => {
        _wait(provider, txnHash, res, rej);
    });
}

function ensureValidOutcome(outcomes?: BlockItemSummaryInBlock): BlockItemSummaryInBlock {
    if (!outcomes) {
        throw Error('Null Outcome');
    }

    switch (outcomes.summary.type) {
        case TransactionSummaryType.UpdateTransaction:
        case TransactionSummaryType.AccountCreation:
            throw Error(`Invalid Transaction Type: ${outcomes.summary.type}`);
        case TransactionSummaryType.AccountTransaction:
            switch (outcomes.summary.transactionType) {
                case TransactionKindString.Failed:
                    throw Error(`Transaction failed, reason: ${outcomes.summary.rejectReason.tag}`);
                default:
                    return outcomes;
            }
    }
}

/**
 * Uses Contract Schema to serialize the contract parameters.
 * @param contractName Name of the Contract.
 * @param schema  Buffer of Contract Schema.
 * @param methodName Contract method name.
 * @param params Contract Method params in JSON.
 * @returns Serialize buffer of the input params.
 */
function serializeParams<T>(contractName: string, schema: Buffer, methodName: string, params: T): Buffer {
    return serializeUpdateContractParameters(contractName, methodName, params, schema);
}

function _wait(
    provider: WalletApi,
    txnHash: string,
    res: (p: BlockItemSummaryInBlock) => void,
    rej: (reason: any) => void
) {
    setTimeout(() => {
        provider
            .getGrpcClient()
            .getBlockItemStatus(txnHash)
            .then((status) => {
                switch (status.status) {
                    case TransactionStatusEnum.Received:
                    case TransactionStatusEnum.Committed:
                        _wait(provider, txnHash, res, rej);
                        break;
                    case TransactionStatusEnum.Finalized:
                        return res(status.outcome);
                }
            })
            .catch((err) => rej(err));
    }, 1000);
}

function parseContractAddress(outcomes: BlockItemSummaryInBlock): ContractAddress {
    switch (outcomes.summary.type) {
        case TransactionSummaryType.AccountTransaction:
            switch (outcomes.summary.transactionType) {
                case TransactionKindString.InitContract:
                    return outcomes.summary.contractInitialized.address;
                default:
                    throw Error(`Invalid Account Transaction Type: ${outcomes.summary.type}`);
            }
            break;
        default:
            throw Error(`Invalid Transaction Type: ${outcomes.summary.type}`);
    }
}

const MICRO_CCD_IN_CCD = 1000000;
function toCcd(ccdAmount: bigint): CcdAmount {
    return new CcdAmount(ccdAmount * BigInt(MICRO_CCD_IN_CCD));
}

export function toParamContractAddress(marketAddress: ContractAddress): ParamContractAddress {
    return {
        index: parseInt(marketAddress.index.toString()),
        subindex: parseInt(marketAddress.subindex.toString()),
    };
}

export type ParamContractAddress = { index: number; subindex: number };
