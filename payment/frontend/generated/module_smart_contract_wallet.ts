// @ts-nocheck
import * as SDK from "@concordium/web-sdk";
/** The reference of the smart contract module supported by the provided client. */
export const moduleReference: SDK.ModuleReference.Type = /*#__PURE__*/ SDK.ModuleReference.fromHexString('781f1db0930341ec54ffe4caf293d90b3a87100add566da4ee1f2829c25e634d');
/** Name of the smart contract supported by this client. */
export const contractName: SDK.ContractName.Type = /*#__PURE__*/ SDK.ContractName.fromStringUnchecked('smart_contract_wallet');

/** Smart contract client for a contract instance on chain. */
class SmartContractWalletContract {
    /** Having a private field prevents similar structured objects to be considered the same type (similar to nominal typing). */
    private __nominal = true;
    /** The gRPC connection used by this client. */
    public readonly grpcClient: SDK.ConcordiumGRPCClient;
    /** The contract address used by this client. */
    public readonly contractAddress: SDK.ContractAddress.Type;
    /** Generic contract client used internally. */
    public readonly genericContract: SDK.Contract;

    constructor(grpcClient: SDK.ConcordiumGRPCClient, contractAddress: SDK.ContractAddress.Type, genericContract: SDK.Contract) {
        this.grpcClient = grpcClient;
        this.contractAddress = contractAddress;
        this.genericContract = genericContract;
    }
}

/** Smart contract client for a contract instance on chain. */
export type Type = SmartContractWalletContract;

/**
 * Construct an instance of `SmartContractWalletContract` for interacting with a 'smart_contract_wallet' contract on chain.
 * Checking the information instance on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @param {SDK.BlockHash.Type} [blockHash] - Hash of the block to check the information at. When not provided the last finalized block is used.
 * @throws If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SmartContractWalletContract}
 */
export async function create(grpcClient: SDK.ConcordiumGRPCClient, contractAddress: SDK.ContractAddress.Type, blockHash?: SDK.BlockHash.Type): Promise<SmartContractWalletContract> {
    const genericContract = new SDK.Contract(grpcClient, contractAddress, contractName);
    await genericContract.checkOnChain({ moduleReference: moduleReference, blockHash: blockHash });
    return new SmartContractWalletContract(
        grpcClient,
        contractAddress,
        genericContract
    );
}

/**
 * Construct the `SmartContractWalletContract` for interacting with a 'smart_contract_wallet' contract on chain.
 * Without checking the instance information on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @returns {SmartContractWalletContract}
 */
export function createUnchecked(grpcClient: SDK.ConcordiumGRPCClient, contractAddress: SDK.ContractAddress.Type): SmartContractWalletContract {
    const genericContract = new SDK.Contract(grpcClient, contractAddress, contractName);
    return new SmartContractWalletContract(
        grpcClient,
        contractAddress,
        genericContract,
    );
}

/**
 * Check if the smart contract instance exists on the blockchain and whether it uses a matching contract name and module reference.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.BlockHash.Type} [blockHash] A optional block hash to use for checking information on chain, if not provided the last finalized will be used.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 */
export function checkOnChain(contractClient: SmartContractWalletContract, blockHash?: SDK.BlockHash.Type): Promise<void> {
    return contractClient.genericContract.checkOnChain({moduleReference: moduleReference, blockHash: blockHash });
}

/** Contract event type for the 'smart_contract_wallet' contract. */
export type Event = { type: 'InternalCis2TokensTransfer', content: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    from: SDK.HexString,
    to: SDK.HexString,
    } } | { type: 'InternalNativeCurrencyTransfer', content: {
    ccd_amount: SDK.CcdAmount.Type,
    from: SDK.HexString,
    to: SDK.HexString,
    } } | { type: 'WithdrawCis2Tokens', content: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    from: SDK.HexString,
    to: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    } } | { type: 'WithdrawNativeCurrency', content: {
    ccd_amount: SDK.CcdAmount.Type,
    from: SDK.HexString,
    to: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    } } | { type: 'DepositCis2Tokens', content: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    from: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    to: SDK.HexString,
    } } | { type: 'DepositNativeCurrency', content: {
    ccd_amount: SDK.CcdAmount.Type,
    from: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    to: SDK.HexString,
    } } | { type: 'Nonce', content: {
    public_key: SDK.HexString,
    nonce: number | bigint,
    } };

/**
 * Parse the contract events logged by the 'smart_contract_wallet' contract.
 * @param {SDK.ContractEvent.Type} event The unparsed contract event.
 * @returns {Event} The structured contract event.
 */
export function parseEvent(event: SDK.ContractEvent.Type): Event {
    const schemaJson = <{'InternalCis2TokensTransfer' : [{
    token_amount: string,
    token_id: string,
    cis2_token_contract_address: SDK.ContractAddress.SchemaValue,
    from: string,
    to: string,
    }] } | {'InternalNativeCurrencyTransfer' : [{
    ccd_amount: SDK.CcdAmount.SchemaValue,
    from: string,
    to: string,
    }] } | {'WithdrawCis2Tokens' : [{
    token_amount: string,
    token_id: string,
    cis2_token_contract_address: SDK.ContractAddress.SchemaValue,
    from: string,
    to: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    }] } | {'WithdrawNativeCurrency' : [{
    ccd_amount: SDK.CcdAmount.SchemaValue,
    from: string,
    to: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    }] } | {'DepositCis2Tokens' : [{
    token_amount: string,
    token_id: string,
    cis2_token_contract_address: SDK.ContractAddress.SchemaValue,
    from: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    to: string,
    }] } | {'DepositNativeCurrency' : [{
    ccd_amount: SDK.CcdAmount.SchemaValue,
    from: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    to: string,
    }] } | {'Nonce' : [{
    public_key: string,
    nonce: bigint,
    }] }>SDK.ContractEvent.parseWithSchemaTypeBase64(event, 'HwcAAAD0GgAAAEludGVybmFsQ2lzMlRva2Vuc1RyYW5zZmVyAQEAAAAUAAUAAAAMAAAAdG9rZW5fYW1vdW50GyUAAAAIAAAAdG9rZW5faWQdABsAAABjaXMyX3Rva2VuX2NvbnRyYWN0X2FkZHJlc3MMBAAAAGZyb20eIAAAAAIAAAB0bx4gAAAA9R4AAABJbnRlcm5hbE5hdGl2ZUN1cnJlbmN5VHJhbnNmZXIBAQAAABQAAwAAAAoAAABjY2RfYW1vdW50CgQAAABmcm9tHiAAAAACAAAAdG8eIAAAAPYSAAAAV2l0aGRyYXdDaXMyVG9rZW5zAQEAAAAUAAUAAAAMAAAAdG9rZW5fYW1vdW50GyUAAAAIAAAAdG9rZW5faWQdABsAAABjaXMyX3Rva2VuX2NvbnRyYWN0X2FkZHJlc3MMBAAAAGZyb20eIAAAAAIAAAB0bxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAz3FgAAAFdpdGhkcmF3TmF0aXZlQ3VycmVuY3kBAQAAABQAAwAAAAoAAABjY2RfYW1vdW50CgQAAABmcm9tHiAAAAACAAAAdG8VAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM+BEAAABEZXBvc2l0Q2lzMlRva2VucwEBAAAAFAAFAAAADAAAAHRva2VuX2Ftb3VudBslAAAACAAAAHRva2VuX2lkHQAbAAAAY2lzMl90b2tlbl9jb250cmFjdF9hZGRyZXNzDAQAAABmcm9tFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAIAAAB0bx4gAAAA+RUAAABEZXBvc2l0TmF0aXZlQ3VycmVuY3kBAQAAABQAAwAAAAoAAABjY2RfYW1vdW50CgQAAABmcm9tFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAIAAAB0bx4gAAAA+gUAAABOb25jZQEBAAAAFAACAAAACgAAAHB1YmxpY19rZXkeIAAAAAUAAABub25jZQU=');
    let match3: { type: 'InternalCis2TokensTransfer', content: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    from: SDK.HexString,
    to: SDK.HexString,
    } } | { type: 'InternalNativeCurrencyTransfer', content: {
    ccd_amount: SDK.CcdAmount.Type,
    from: SDK.HexString,
    to: SDK.HexString,
    } } | { type: 'WithdrawCis2Tokens', content: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    from: SDK.HexString,
    to: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    } } | { type: 'WithdrawNativeCurrency', content: {
    ccd_amount: SDK.CcdAmount.Type,
    from: SDK.HexString,
    to: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    } } | { type: 'DepositCis2Tokens', content: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    from: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    to: SDK.HexString,
    } } | { type: 'DepositNativeCurrency', content: {
    ccd_amount: SDK.CcdAmount.Type,
    from: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    to: SDK.HexString,
    } } | { type: 'Nonce', content: {
    public_key: SDK.HexString,
    nonce: number | bigint,
    } };
    if ('InternalCis2TokensTransfer' in schemaJson) {
       const variant4 = schemaJson.InternalCis2TokensTransfer;
    const field5 = variant4[0].token_amount;
    const leb0 = BigInt(field5);
    const field6 = variant4[0].token_id;
    const field7 = variant4[0].cis2_token_contract_address;
    const contractAddress8 = SDK.ContractAddress.fromSchemaValue(field7);
    const field9 = variant4[0].from;
    const field10 = variant4[0].to;
    const named11 = {
    token_amount: leb0,
    token_id: field6,
    cis2_token_contract_address: contractAddress8,
    from: field9,
    to: field10,
    };
       match3 = {
           type: 'InternalCis2TokensTransfer',
           content: named11,
       };
    } else if ('InternalNativeCurrencyTransfer' in schemaJson) {
       const variant12 = schemaJson.InternalNativeCurrencyTransfer;
    const field13 = variant12[0].ccd_amount;
    const amount14 = SDK.CcdAmount.fromSchemaValue(field13);
    const field15 = variant12[0].from;
    const field16 = variant12[0].to;
    const named17 = {
    ccd_amount: amount14,
    from: field15,
    to: field16,
    };
       match3 = {
           type: 'InternalNativeCurrencyTransfer',
           content: named17,
       };
    } else if ('WithdrawCis2Tokens' in schemaJson) {
       const variant18 = schemaJson.WithdrawCis2Tokens;
    const field19 = variant18[0].token_amount;
    const leb1 = BigInt(field19);
    const field20 = variant18[0].token_id;
    const field21 = variant18[0].cis2_token_contract_address;
    const contractAddress22 = SDK.ContractAddress.fromSchemaValue(field21);
    const field23 = variant18[0].from;
    const field24 = variant18[0].to;
    let match25: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in field24) {
       const variant26 = field24.Account;
    const accountAddress27 = SDK.AccountAddress.fromSchemaValue(variant26[0]);
       match25 = {
           type: 'Account',
           content: accountAddress27,
       };
    } else if ('Contract' in field24) {
       const variant28 = field24.Contract;
    const contractAddress29 = SDK.ContractAddress.fromSchemaValue(variant28[0]);
       match25 = {
           type: 'Contract',
           content: contractAddress29,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named30 = {
    token_amount: leb1,
    token_id: field20,
    cis2_token_contract_address: contractAddress22,
    from: field23,
    to: match25,
    };
       match3 = {
           type: 'WithdrawCis2Tokens',
           content: named30,
       };
    } else if ('WithdrawNativeCurrency' in schemaJson) {
       const variant31 = schemaJson.WithdrawNativeCurrency;
    const field32 = variant31[0].ccd_amount;
    const amount33 = SDK.CcdAmount.fromSchemaValue(field32);
    const field34 = variant31[0].from;
    const field35 = variant31[0].to;
    let match36: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in field35) {
       const variant37 = field35.Account;
    const accountAddress38 = SDK.AccountAddress.fromSchemaValue(variant37[0]);
       match36 = {
           type: 'Account',
           content: accountAddress38,
       };
    } else if ('Contract' in field35) {
       const variant39 = field35.Contract;
    const contractAddress40 = SDK.ContractAddress.fromSchemaValue(variant39[0]);
       match36 = {
           type: 'Contract',
           content: contractAddress40,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named41 = {
    ccd_amount: amount33,
    from: field34,
    to: match36,
    };
       match3 = {
           type: 'WithdrawNativeCurrency',
           content: named41,
       };
    } else if ('DepositCis2Tokens' in schemaJson) {
       const variant42 = schemaJson.DepositCis2Tokens;
    const field43 = variant42[0].token_amount;
    const leb2 = BigInt(field43);
    const field44 = variant42[0].token_id;
    const field45 = variant42[0].cis2_token_contract_address;
    const contractAddress46 = SDK.ContractAddress.fromSchemaValue(field45);
    const field47 = variant42[0].from;
    let match48: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in field47) {
       const variant49 = field47.Account;
    const accountAddress50 = SDK.AccountAddress.fromSchemaValue(variant49[0]);
       match48 = {
           type: 'Account',
           content: accountAddress50,
       };
    } else if ('Contract' in field47) {
       const variant51 = field47.Contract;
    const contractAddress52 = SDK.ContractAddress.fromSchemaValue(variant51[0]);
       match48 = {
           type: 'Contract',
           content: contractAddress52,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field53 = variant42[0].to;
    const named54 = {
    token_amount: leb2,
    token_id: field44,
    cis2_token_contract_address: contractAddress46,
    from: match48,
    to: field53,
    };
       match3 = {
           type: 'DepositCis2Tokens',
           content: named54,
       };
    } else if ('DepositNativeCurrency' in schemaJson) {
       const variant55 = schemaJson.DepositNativeCurrency;
    const field56 = variant55[0].ccd_amount;
    const amount57 = SDK.CcdAmount.fromSchemaValue(field56);
    const field58 = variant55[0].from;
    let match59: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in field58) {
       const variant60 = field58.Account;
    const accountAddress61 = SDK.AccountAddress.fromSchemaValue(variant60[0]);
       match59 = {
           type: 'Account',
           content: accountAddress61,
       };
    } else if ('Contract' in field58) {
       const variant62 = field58.Contract;
    const contractAddress63 = SDK.ContractAddress.fromSchemaValue(variant62[0]);
       match59 = {
           type: 'Contract',
           content: contractAddress63,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field64 = variant55[0].to;
    const named65 = {
    ccd_amount: amount57,
    from: match59,
    to: field64,
    };
       match3 = {
           type: 'DepositNativeCurrency',
           content: named65,
       };
    } else if ('Nonce' in schemaJson) {
       const variant66 = schemaJson.Nonce;
    const field67 = variant66[0].public_key;
    const field68 = variant66[0].nonce;
    const named69 = {
    public_key: field67,
    nonce: field68,
    };
       match3 = {
           type: 'Nonce',
           content: named69,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match3;
}
/** Base64 encoding of the parameter schema type for update transactions to 'depositNativeCurrency' entrypoint of the 'smart_contract_wallet' contract. */
const base64DepositNativeCurrencyParameterSchema = 'HiAAAAA=';
/** Parameter JSON type needed by the schema for update transaction for 'depositNativeCurrency' entrypoint of the 'smart_contract_wallet' contract. */
type DepositNativeCurrencyParameterSchemaJson = string;
/** Parameter type for update transaction for 'depositNativeCurrency' entrypoint of the 'smart_contract_wallet' contract. */
export type DepositNativeCurrencyParameter = SDK.HexString;

/**
 * Construct schema JSON representation used in update transaction for 'depositNativeCurrency' entrypoint of the 'smart_contract_wallet' contract.
 * @param {DepositNativeCurrencyParameter} parameter The structured parameter to construct from.
 * @returns {DepositNativeCurrencyParameterSchemaJson} The smart contract parameter JSON.
 */
function createDepositNativeCurrencyParameterSchemaJson(parameter: DepositNativeCurrencyParameter): DepositNativeCurrencyParameterSchemaJson {
    return parameter;
}

/**
 * Construct Parameter type used in update transaction for 'depositNativeCurrency' entrypoint of the 'smart_contract_wallet' contract.
 * @param {DepositNativeCurrencyParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createDepositNativeCurrencyParameter(parameter: DepositNativeCurrencyParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64DepositNativeCurrencyParameterSchema, createDepositNativeCurrencyParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'depositNativeCurrency' entrypoint of the 'smart_contract_wallet' contract.
 * @param {DepositNativeCurrencyParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createDepositNativeCurrencyParameterWebWallet(parameter: DepositNativeCurrencyParameter) {
    return {
        parameters: createDepositNativeCurrencyParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64DepositNativeCurrencyParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'depositNativeCurrency' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {DepositNativeCurrencyParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendDepositNativeCurrency(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: DepositNativeCurrencyParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('depositNativeCurrency'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createDepositNativeCurrencyParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'depositNativeCurrency' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {DepositNativeCurrencyParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunDepositNativeCurrency(contractClient: SmartContractWalletContract, parameter: DepositNativeCurrencyParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('depositNativeCurrency'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createDepositNativeCurrencyParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'depositNativeCurrency' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageDepositNativeCurrency = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'depositNativeCurrency' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageDepositNativeCurrency | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageDepositNativeCurrency(invokeResult: SDK.InvokeContractResult): ErrorMessageDepositNativeCurrency | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match70: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match70 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match70 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match70 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match70 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match70 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match70 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match70 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match70 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match70 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match70 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match70 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match70
}
/** Base64 encoding of the parameter schema type for update transactions to 'depositCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
const base64DepositCis2TokensParameterSchema = 'FAAEAAAACAAAAHRva2VuX2lkHQAGAAAAYW1vdW50GyUAAAAEAAAAZnJvbRUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwEAAAAZGF0YR4gAAAA';
/** Parameter JSON type needed by the schema for update transaction for 'depositCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
type DepositCis2TokensParameterSchemaJson = {
    token_id: string,
    amount: string,
    from: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    data: string,
    };
/** Parameter type for update transaction for 'depositCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
export type DepositCis2TokensParameter = {
    token_id: SDK.HexString,
    amount: number | bigint,
    from: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    data: SDK.HexString,
    };

/**
 * Construct schema JSON representation used in update transaction for 'depositCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {DepositCis2TokensParameter} parameter The structured parameter to construct from.
 * @returns {DepositCis2TokensParameterSchemaJson} The smart contract parameter JSON.
 */
function createDepositCis2TokensParameterSchemaJson(parameter: DepositCis2TokensParameter): DepositCis2TokensParameterSchemaJson {
    const field84 = parameter.token_id;
    const field85 = parameter.amount;
    const leb82 = BigInt(field85).toString();
    const field86 = parameter.from;
    let match87: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field86.type) {
        case 'Account':
    const accountAddress88 = SDK.AccountAddress.toSchemaValue(field86.content);
            match87 = { Account: [accountAddress88], };
        break;
        case 'Contract':
    const contractAddress89 = SDK.ContractAddress.toSchemaValue(field86.content);
            match87 = { Contract: [contractAddress89], };
        break;
    }

    const field90 = parameter.data;
    const named83 = {
    token_id: field84,
    amount: leb82,
    from: match87,
    data: field90,
    };
    return named83;
}

/**
 * Construct Parameter type used in update transaction for 'depositCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {DepositCis2TokensParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createDepositCis2TokensParameter(parameter: DepositCis2TokensParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64DepositCis2TokensParameterSchema, createDepositCis2TokensParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'depositCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {DepositCis2TokensParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createDepositCis2TokensParameterWebWallet(parameter: DepositCis2TokensParameter) {
    return {
        parameters: createDepositCis2TokensParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64DepositCis2TokensParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'depositCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {DepositCis2TokensParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendDepositCis2Tokens(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: DepositCis2TokensParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('depositCis2Tokens'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createDepositCis2TokensParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'depositCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {DepositCis2TokensParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunDepositCis2Tokens(contractClient: SmartContractWalletContract, parameter: DepositCis2TokensParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('depositCis2Tokens'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createDepositCis2TokensParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'depositCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageDepositCis2Tokens = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'depositCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageDepositCis2Tokens | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageDepositCis2Tokens(invokeResult: SDK.InvokeContractResult): ErrorMessageDepositCis2Tokens | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match91: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match91 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match91 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match91 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match91 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match91 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match91 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match91 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match91 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match91 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match91 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match91 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match91
}
/** Base64 encoding of the parameter schema type for update transactions to 'viewWithdrawMessageHashCcdAmount' entrypoint of the 'smart_contract_wallet' contract. */
const base64ViewWithdrawMessageHashCcdAmountParameterSchema = 'FAAGAAAACwAAAGVudHJ5X3BvaW50FgELAAAAZXhwaXJ5X3RpbWUNBQAAAG5vbmNlBRUAAABzZXJ2aWNlX2ZlZV9yZWNpcGllbnQeIAAAABIAAABzZXJ2aWNlX2ZlZV9hbW91bnQKEAAAAHNpbXBsZV93aXRoZHJhd3MQARQAAwAAAAIAAAB0bxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAgAAAAwWAQ8AAAB3aXRoZHJhd19hbW91bnQKBAAAAGRhdGEdAQ==';
/** Parameter JSON type needed by the schema for update transaction for 'viewWithdrawMessageHashCcdAmount' entrypoint of the 'smart_contract_wallet' contract. */
type ViewWithdrawMessageHashCcdAmountParameterSchemaJson = {
    entry_point: string,
    expiry_time: SDK.Timestamp.SchemaValue,
    nonce: bigint,
    service_fee_recipient: string,
    service_fee_amount: SDK.CcdAmount.SchemaValue,
    simple_withdraws: Array<{
    to: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue, string] },
    withdraw_amount: SDK.CcdAmount.SchemaValue,
    data: string,
    }>,
    };
/** Parameter type for update transaction for 'viewWithdrawMessageHashCcdAmount' entrypoint of the 'smart_contract_wallet' contract. */
export type ViewWithdrawMessageHashCcdAmountParameter = {
    entry_point: string,
    expiry_time: SDK.Timestamp.Type,
    nonce: number | bigint,
    service_fee_recipient: SDK.HexString,
    service_fee_amount: SDK.CcdAmount.Type,
    simple_withdraws: Array<{
    to: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: [SDK.ContractAddress.Type, string] },
    withdraw_amount: SDK.CcdAmount.Type,
    data: SDK.HexString,
    }>,
    };

/**
 * Construct schema JSON representation used in update transaction for 'viewWithdrawMessageHashCcdAmount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {ViewWithdrawMessageHashCcdAmountParameter} parameter The structured parameter to construct from.
 * @returns {ViewWithdrawMessageHashCcdAmountParameterSchemaJson} The smart contract parameter JSON.
 */
function createViewWithdrawMessageHashCcdAmountParameterSchemaJson(parameter: ViewWithdrawMessageHashCcdAmountParameter): ViewWithdrawMessageHashCcdAmountParameterSchemaJson {
    const field104 = parameter.entry_point;
    const field105 = parameter.expiry_time;
    const timestamp106 = SDK.Timestamp.toSchemaValue(field105);
    const field107 = parameter.nonce;
    const number108 = BigInt(field107);
    const field109 = parameter.service_fee_recipient;
    const field110 = parameter.service_fee_amount;
    const amount111 = SDK.CcdAmount.toSchemaValue(field110);
    const field112 = parameter.simple_withdraws;
    const list113 = field112.map((item114) => {
    const field116 = item114.to;
    let match117: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue, string] };
    switch (field116.type) {
        case 'Account':
    const accountAddress118 = SDK.AccountAddress.toSchemaValue(field116.content);
            match117 = { Account: [accountAddress118], };
        break;
        case 'Contract':
    const contractAddress120 = SDK.ContractAddress.toSchemaValue(field116.content[0]);
    const unnamed119: [SDK.ContractAddress.SchemaValue, string] = [contractAddress120, field116.content[1]];
            match117 = { Contract: unnamed119, };
        break;
    }

    const field121 = item114.withdraw_amount;
    const amount122 = SDK.CcdAmount.toSchemaValue(field121);
    const field123 = item114.data;
    const named115 = {
    to: match117,
    withdraw_amount: amount122,
    data: field123,
    };
    return named115;
    });
    const named103 = {
    entry_point: field104,
    expiry_time: timestamp106,
    nonce: number108,
    service_fee_recipient: field109,
    service_fee_amount: amount111,
    simple_withdraws: list113,
    };
    return named103;
}

/**
 * Construct Parameter type used in update transaction for 'viewWithdrawMessageHashCcdAmount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {ViewWithdrawMessageHashCcdAmountParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createViewWithdrawMessageHashCcdAmountParameter(parameter: ViewWithdrawMessageHashCcdAmountParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64ViewWithdrawMessageHashCcdAmountParameterSchema, createViewWithdrawMessageHashCcdAmountParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'viewWithdrawMessageHashCcdAmount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {ViewWithdrawMessageHashCcdAmountParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createViewWithdrawMessageHashCcdAmountParameterWebWallet(parameter: ViewWithdrawMessageHashCcdAmountParameter) {
    return {
        parameters: createViewWithdrawMessageHashCcdAmountParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64ViewWithdrawMessageHashCcdAmountParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'viewWithdrawMessageHashCcdAmount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {ViewWithdrawMessageHashCcdAmountParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendViewWithdrawMessageHashCcdAmount(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: ViewWithdrawMessageHashCcdAmountParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('viewWithdrawMessageHashCcdAmount'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createViewWithdrawMessageHashCcdAmountParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'viewWithdrawMessageHashCcdAmount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {ViewWithdrawMessageHashCcdAmountParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunViewWithdrawMessageHashCcdAmount(contractClient: SmartContractWalletContract, parameter: ViewWithdrawMessageHashCcdAmountParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('viewWithdrawMessageHashCcdAmount'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createViewWithdrawMessageHashCcdAmountParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'viewWithdrawMessageHashCcdAmount' entrypoint of the 'smart_contract_wallet' contract. */
export type ReturnValueViewWithdrawMessageHashCcdAmount = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];

/**
 * Get and parse the return value from dry-running update transaction for 'viewWithdrawMessageHashCcdAmount' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueViewWithdrawMessageHashCcdAmount | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueViewWithdrawMessageHashCcdAmount(invokeResult: SDK.InvokeContractResult): ReturnValueViewWithdrawMessageHashCcdAmount | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <[number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EyAAAAAC');
    return schemaJson;
}

/** Error message for dry-running update transaction for 'viewWithdrawMessageHashCcdAmount' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageViewWithdrawMessageHashCcdAmount = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'viewWithdrawMessageHashCcdAmount' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageViewWithdrawMessageHashCcdAmount | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageViewWithdrawMessageHashCcdAmount(invokeResult: SDK.InvokeContractResult): ErrorMessageViewWithdrawMessageHashCcdAmount | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match126: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match126 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match126 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match126 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match126 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match126 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match126 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match126 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match126 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match126 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match126 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match126 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match126
}
/** Base64 encoding of the parameter schema type for update transactions to 'viewWithdrawMessageHashTokenAmount' entrypoint of the 'smart_contract_wallet' contract. */
const base64ViewWithdrawMessageHashTokenAmountParameterSchema = 'FAAGAAAACwAAAGVudHJ5X3BvaW50FgELAAAAZXhwaXJ5X3RpbWUNBQAAAG5vbmNlBRUAAABzZXJ2aWNlX2ZlZV9yZWNpcGllbnQeIAAAABIAAABzZXJ2aWNlX2ZlZV9hbW91bnQUAAMAAAAMAAAAdG9rZW5fYW1vdW50GyUAAAAIAAAAdG9rZW5faWQdABsAAABjaXMyX3Rva2VuX2NvbnRyYWN0X2FkZHJlc3MMEAAAAHNpbXBsZV93aXRoZHJhd3MQARQAAwAAAAIAAAB0bxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAgAAAAwWAQ8AAAB3aXRoZHJhd19hbW91bnQUAAMAAAAMAAAAdG9rZW5fYW1vdW50GyUAAAAIAAAAdG9rZW5faWQdABsAAABjaXMyX3Rva2VuX2NvbnRyYWN0X2FkZHJlc3MMBAAAAGRhdGEdAQ==';
/** Parameter JSON type needed by the schema for update transaction for 'viewWithdrawMessageHashTokenAmount' entrypoint of the 'smart_contract_wallet' contract. */
type ViewWithdrawMessageHashTokenAmountParameterSchemaJson = {
    entry_point: string,
    expiry_time: SDK.Timestamp.SchemaValue,
    nonce: bigint,
    service_fee_recipient: string,
    service_fee_amount: {
    token_amount: string,
    token_id: string,
    cis2_token_contract_address: SDK.ContractAddress.SchemaValue,
    },
    simple_withdraws: Array<{
    to: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue, string] },
    withdraw_amount: {
    token_amount: string,
    token_id: string,
    cis2_token_contract_address: SDK.ContractAddress.SchemaValue,
    },
    data: string,
    }>,
    };
/** Parameter type for update transaction for 'viewWithdrawMessageHashTokenAmount' entrypoint of the 'smart_contract_wallet' contract. */
export type ViewWithdrawMessageHashTokenAmountParameter = {
    entry_point: string,
    expiry_time: SDK.Timestamp.Type,
    nonce: number | bigint,
    service_fee_recipient: SDK.HexString,
    service_fee_amount: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    },
    simple_withdraws: Array<{
    to: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: [SDK.ContractAddress.Type, string] },
    withdraw_amount: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    },
    data: SDK.HexString,
    }>,
    };

/**
 * Construct schema JSON representation used in update transaction for 'viewWithdrawMessageHashTokenAmount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {ViewWithdrawMessageHashTokenAmountParameter} parameter The structured parameter to construct from.
 * @returns {ViewWithdrawMessageHashTokenAmountParameterSchemaJson} The smart contract parameter JSON.
 */
function createViewWithdrawMessageHashTokenAmountParameterSchemaJson(parameter: ViewWithdrawMessageHashTokenAmountParameter): ViewWithdrawMessageHashTokenAmountParameterSchemaJson {
    const field141 = parameter.entry_point;
    const field142 = parameter.expiry_time;
    const timestamp143 = SDK.Timestamp.toSchemaValue(field142);
    const field144 = parameter.nonce;
    const number145 = BigInt(field144);
    const field146 = parameter.service_fee_recipient;
    const field147 = parameter.service_fee_amount;
    const field149 = field147.token_amount;
    const leb138 = BigInt(field149).toString();
    const field150 = field147.token_id;
    const field151 = field147.cis2_token_contract_address;
    const contractAddress152 = SDK.ContractAddress.toSchemaValue(field151);
    const named148 = {
    token_amount: leb138,
    token_id: field150,
    cis2_token_contract_address: contractAddress152,
    };
    const field153 = parameter.simple_withdraws;
    const list154 = field153.map((item155) => {
    const field157 = item155.to;
    let match158: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue, string] };
    switch (field157.type) {
        case 'Account':
    const accountAddress159 = SDK.AccountAddress.toSchemaValue(field157.content);
            match158 = { Account: [accountAddress159], };
        break;
        case 'Contract':
    const contractAddress161 = SDK.ContractAddress.toSchemaValue(field157.content[0]);
    const unnamed160: [SDK.ContractAddress.SchemaValue, string] = [contractAddress161, field157.content[1]];
            match158 = { Contract: unnamed160, };
        break;
    }

    const field162 = item155.withdraw_amount;
    const field164 = field162.token_amount;
    const leb139 = BigInt(field164).toString();
    const field165 = field162.token_id;
    const field166 = field162.cis2_token_contract_address;
    const contractAddress167 = SDK.ContractAddress.toSchemaValue(field166);
    const named163 = {
    token_amount: leb139,
    token_id: field165,
    cis2_token_contract_address: contractAddress167,
    };
    const field168 = item155.data;
    const named156 = {
    to: match158,
    withdraw_amount: named163,
    data: field168,
    };
    return named156;
    });
    const named140 = {
    entry_point: field141,
    expiry_time: timestamp143,
    nonce: number145,
    service_fee_recipient: field146,
    service_fee_amount: named148,
    simple_withdraws: list154,
    };
    return named140;
}

/**
 * Construct Parameter type used in update transaction for 'viewWithdrawMessageHashTokenAmount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {ViewWithdrawMessageHashTokenAmountParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createViewWithdrawMessageHashTokenAmountParameter(parameter: ViewWithdrawMessageHashTokenAmountParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64ViewWithdrawMessageHashTokenAmountParameterSchema, createViewWithdrawMessageHashTokenAmountParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'viewWithdrawMessageHashTokenAmount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {ViewWithdrawMessageHashTokenAmountParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createViewWithdrawMessageHashTokenAmountParameterWebWallet(parameter: ViewWithdrawMessageHashTokenAmountParameter) {
    return {
        parameters: createViewWithdrawMessageHashTokenAmountParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64ViewWithdrawMessageHashTokenAmountParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'viewWithdrawMessageHashTokenAmount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {ViewWithdrawMessageHashTokenAmountParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendViewWithdrawMessageHashTokenAmount(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: ViewWithdrawMessageHashTokenAmountParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('viewWithdrawMessageHashTokenAmount'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createViewWithdrawMessageHashTokenAmountParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'viewWithdrawMessageHashTokenAmount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {ViewWithdrawMessageHashTokenAmountParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunViewWithdrawMessageHashTokenAmount(contractClient: SmartContractWalletContract, parameter: ViewWithdrawMessageHashTokenAmountParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('viewWithdrawMessageHashTokenAmount'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createViewWithdrawMessageHashTokenAmountParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'viewWithdrawMessageHashTokenAmount' entrypoint of the 'smart_contract_wallet' contract. */
export type ReturnValueViewWithdrawMessageHashTokenAmount = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];

/**
 * Get and parse the return value from dry-running update transaction for 'viewWithdrawMessageHashTokenAmount' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueViewWithdrawMessageHashTokenAmount | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueViewWithdrawMessageHashTokenAmount(invokeResult: SDK.InvokeContractResult): ReturnValueViewWithdrawMessageHashTokenAmount | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <[number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EyAAAAAC');
    return schemaJson;
}

/** Error message for dry-running update transaction for 'viewWithdrawMessageHashTokenAmount' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageViewWithdrawMessageHashTokenAmount = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'viewWithdrawMessageHashTokenAmount' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageViewWithdrawMessageHashTokenAmount | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageViewWithdrawMessageHashTokenAmount(invokeResult: SDK.InvokeContractResult): ErrorMessageViewWithdrawMessageHashTokenAmount | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match171: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match171 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match171 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match171 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match171 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match171 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match171 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match171 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match171 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match171 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match171 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match171 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match171
}
/** Base64 encoding of the parameter schema type for update transactions to 'withdrawNativeCurrency' entrypoint of the 'smart_contract_wallet' contract. */
const base64WithdrawNativeCurrencyParameterSchema = 'EAEUAAMAAAAGAAAAc2lnbmVyHiAAAAAJAAAAc2lnbmF0dXJlHkAAAAAHAAAAbWVzc2FnZRQABgAAAAsAAABlbnRyeV9wb2ludBYBCwAAAGV4cGlyeV90aW1lDQUAAABub25jZQUVAAAAc2VydmljZV9mZWVfcmVjaXBpZW50HiAAAAASAAAAc2VydmljZV9mZWVfYW1vdW50ChAAAABzaW1wbGVfd2l0aGRyYXdzEAEUAAMAAAACAAAAdG8VAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQIAAAAMFgEPAAAAd2l0aGRyYXdfYW1vdW50CgQAAABkYXRhHQE=';
/** Parameter JSON type needed by the schema for update transaction for 'withdrawNativeCurrency' entrypoint of the 'smart_contract_wallet' contract. */
type WithdrawNativeCurrencyParameterSchemaJson = Array<{
    signer: string,
    signature: string,
    message: {
    entry_point: string,
    expiry_time: SDK.Timestamp.SchemaValue,
    nonce: bigint,
    service_fee_recipient: string,
    service_fee_amount: SDK.CcdAmount.SchemaValue,
    simple_withdraws: Array<{
    to: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue, string] },
    withdraw_amount: SDK.CcdAmount.SchemaValue,
    data: string,
    }>,
    },
    }>;
/** Parameter type for update transaction for 'withdrawNativeCurrency' entrypoint of the 'smart_contract_wallet' contract. */
export type WithdrawNativeCurrencyParameter = Array<{
    signer: SDK.HexString,
    signature: SDK.HexString,
    message: {
    entry_point: string,
    expiry_time: SDK.Timestamp.Type,
    nonce: number | bigint,
    service_fee_recipient: SDK.HexString,
    service_fee_amount: SDK.CcdAmount.Type,
    simple_withdraws: Array<{
    to: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: [SDK.ContractAddress.Type, string] },
    withdraw_amount: SDK.CcdAmount.Type,
    data: SDK.HexString,
    }>,
    },
    }>;

/**
 * Construct schema JSON representation used in update transaction for 'withdrawNativeCurrency' entrypoint of the 'smart_contract_wallet' contract.
 * @param {WithdrawNativeCurrencyParameter} parameter The structured parameter to construct from.
 * @returns {WithdrawNativeCurrencyParameterSchemaJson} The smart contract parameter JSON.
 */
function createWithdrawNativeCurrencyParameterSchemaJson(parameter: WithdrawNativeCurrencyParameter): WithdrawNativeCurrencyParameterSchemaJson {
    const list183 = parameter.map((item184) => {
    const field186 = item184.signer;
    const field187 = item184.signature;
    const field188 = item184.message;
    const field190 = field188.entry_point;
    const field191 = field188.expiry_time;
    const timestamp192 = SDK.Timestamp.toSchemaValue(field191);
    const field193 = field188.nonce;
    const number194 = BigInt(field193);
    const field195 = field188.service_fee_recipient;
    const field196 = field188.service_fee_amount;
    const amount197 = SDK.CcdAmount.toSchemaValue(field196);
    const field198 = field188.simple_withdraws;
    const list199 = field198.map((item200) => {
    const field202 = item200.to;
    let match203: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue, string] };
    switch (field202.type) {
        case 'Account':
    const accountAddress204 = SDK.AccountAddress.toSchemaValue(field202.content);
            match203 = { Account: [accountAddress204], };
        break;
        case 'Contract':
    const contractAddress206 = SDK.ContractAddress.toSchemaValue(field202.content[0]);
    const unnamed205: [SDK.ContractAddress.SchemaValue, string] = [contractAddress206, field202.content[1]];
            match203 = { Contract: unnamed205, };
        break;
    }

    const field207 = item200.withdraw_amount;
    const amount208 = SDK.CcdAmount.toSchemaValue(field207);
    const field209 = item200.data;
    const named201 = {
    to: match203,
    withdraw_amount: amount208,
    data: field209,
    };
    return named201;
    });
    const named189 = {
    entry_point: field190,
    expiry_time: timestamp192,
    nonce: number194,
    service_fee_recipient: field195,
    service_fee_amount: amount197,
    simple_withdraws: list199,
    };
    const named185 = {
    signer: field186,
    signature: field187,
    message: named189,
    };
    return named185;
    });
    return list183;
}

/**
 * Construct Parameter type used in update transaction for 'withdrawNativeCurrency' entrypoint of the 'smart_contract_wallet' contract.
 * @param {WithdrawNativeCurrencyParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createWithdrawNativeCurrencyParameter(parameter: WithdrawNativeCurrencyParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64WithdrawNativeCurrencyParameterSchema, createWithdrawNativeCurrencyParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'withdrawNativeCurrency' entrypoint of the 'smart_contract_wallet' contract.
 * @param {WithdrawNativeCurrencyParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createWithdrawNativeCurrencyParameterWebWallet(parameter: WithdrawNativeCurrencyParameter) {
    return {
        parameters: createWithdrawNativeCurrencyParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64WithdrawNativeCurrencyParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'withdrawNativeCurrency' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {WithdrawNativeCurrencyParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendWithdrawNativeCurrency(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: WithdrawNativeCurrencyParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('withdrawNativeCurrency'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createWithdrawNativeCurrencyParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'withdrawNativeCurrency' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {WithdrawNativeCurrencyParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunWithdrawNativeCurrency(contractClient: SmartContractWalletContract, parameter: WithdrawNativeCurrencyParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('withdrawNativeCurrency'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createWithdrawNativeCurrencyParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'withdrawNativeCurrency' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageWithdrawNativeCurrency = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'withdrawNativeCurrency' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageWithdrawNativeCurrency | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageWithdrawNativeCurrency(invokeResult: SDK.InvokeContractResult): ErrorMessageWithdrawNativeCurrency | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match210: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match210 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match210 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match210 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match210 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match210 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match210 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match210 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match210 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match210 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match210 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match210 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match210
}
/** Base64 encoding of the parameter schema type for update transactions to 'withdrawCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
const base64WithdrawCis2TokensParameterSchema = 'EAEUAAMAAAAGAAAAc2lnbmVyHiAAAAAJAAAAc2lnbmF0dXJlHkAAAAAHAAAAbWVzc2FnZRQABgAAAAsAAABlbnRyeV9wb2ludBYBCwAAAGV4cGlyeV90aW1lDQUAAABub25jZQUVAAAAc2VydmljZV9mZWVfcmVjaXBpZW50HiAAAAASAAAAc2VydmljZV9mZWVfYW1vdW50FAADAAAADAAAAHRva2VuX2Ftb3VudBslAAAACAAAAHRva2VuX2lkHQAbAAAAY2lzMl90b2tlbl9jb250cmFjdF9hZGRyZXNzDBAAAABzaW1wbGVfd2l0aGRyYXdzEAEUAAMAAAACAAAAdG8VAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQIAAAAMFgEPAAAAd2l0aGRyYXdfYW1vdW50FAADAAAADAAAAHRva2VuX2Ftb3VudBslAAAACAAAAHRva2VuX2lkHQAbAAAAY2lzMl90b2tlbl9jb250cmFjdF9hZGRyZXNzDAQAAABkYXRhHQE=';
/** Parameter JSON type needed by the schema for update transaction for 'withdrawCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
type WithdrawCis2TokensParameterSchemaJson = Array<{
    signer: string,
    signature: string,
    message: {
    entry_point: string,
    expiry_time: SDK.Timestamp.SchemaValue,
    nonce: bigint,
    service_fee_recipient: string,
    service_fee_amount: {
    token_amount: string,
    token_id: string,
    cis2_token_contract_address: SDK.ContractAddress.SchemaValue,
    },
    simple_withdraws: Array<{
    to: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue, string] },
    withdraw_amount: {
    token_amount: string,
    token_id: string,
    cis2_token_contract_address: SDK.ContractAddress.SchemaValue,
    },
    data: string,
    }>,
    },
    }>;
/** Parameter type for update transaction for 'withdrawCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
export type WithdrawCis2TokensParameter = Array<{
    signer: SDK.HexString,
    signature: SDK.HexString,
    message: {
    entry_point: string,
    expiry_time: SDK.Timestamp.Type,
    nonce: number | bigint,
    service_fee_recipient: SDK.HexString,
    service_fee_amount: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    },
    simple_withdraws: Array<{
    to: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: [SDK.ContractAddress.Type, string] },
    withdraw_amount: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    },
    data: SDK.HexString,
    }>,
    },
    }>;

/**
 * Construct schema JSON representation used in update transaction for 'withdrawCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {WithdrawCis2TokensParameter} parameter The structured parameter to construct from.
 * @returns {WithdrawCis2TokensParameterSchemaJson} The smart contract parameter JSON.
 */
function createWithdrawCis2TokensParameterSchemaJson(parameter: WithdrawCis2TokensParameter): WithdrawCis2TokensParameterSchemaJson {
    const list224 = parameter.map((item225) => {
    const field227 = item225.signer;
    const field228 = item225.signature;
    const field229 = item225.message;
    const field231 = field229.entry_point;
    const field232 = field229.expiry_time;
    const timestamp233 = SDK.Timestamp.toSchemaValue(field232);
    const field234 = field229.nonce;
    const number235 = BigInt(field234);
    const field236 = field229.service_fee_recipient;
    const field237 = field229.service_fee_amount;
    const field239 = field237.token_amount;
    const leb222 = BigInt(field239).toString();
    const field240 = field237.token_id;
    const field241 = field237.cis2_token_contract_address;
    const contractAddress242 = SDK.ContractAddress.toSchemaValue(field241);
    const named238 = {
    token_amount: leb222,
    token_id: field240,
    cis2_token_contract_address: contractAddress242,
    };
    const field243 = field229.simple_withdraws;
    const list244 = field243.map((item245) => {
    const field247 = item245.to;
    let match248: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue, string] };
    switch (field247.type) {
        case 'Account':
    const accountAddress249 = SDK.AccountAddress.toSchemaValue(field247.content);
            match248 = { Account: [accountAddress249], };
        break;
        case 'Contract':
    const contractAddress251 = SDK.ContractAddress.toSchemaValue(field247.content[0]);
    const unnamed250: [SDK.ContractAddress.SchemaValue, string] = [contractAddress251, field247.content[1]];
            match248 = { Contract: unnamed250, };
        break;
    }

    const field252 = item245.withdraw_amount;
    const field254 = field252.token_amount;
    const leb223 = BigInt(field254).toString();
    const field255 = field252.token_id;
    const field256 = field252.cis2_token_contract_address;
    const contractAddress257 = SDK.ContractAddress.toSchemaValue(field256);
    const named253 = {
    token_amount: leb223,
    token_id: field255,
    cis2_token_contract_address: contractAddress257,
    };
    const field258 = item245.data;
    const named246 = {
    to: match248,
    withdraw_amount: named253,
    data: field258,
    };
    return named246;
    });
    const named230 = {
    entry_point: field231,
    expiry_time: timestamp233,
    nonce: number235,
    service_fee_recipient: field236,
    service_fee_amount: named238,
    simple_withdraws: list244,
    };
    const named226 = {
    signer: field227,
    signature: field228,
    message: named230,
    };
    return named226;
    });
    return list224;
}

/**
 * Construct Parameter type used in update transaction for 'withdrawCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {WithdrawCis2TokensParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createWithdrawCis2TokensParameter(parameter: WithdrawCis2TokensParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64WithdrawCis2TokensParameterSchema, createWithdrawCis2TokensParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'withdrawCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {WithdrawCis2TokensParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createWithdrawCis2TokensParameterWebWallet(parameter: WithdrawCis2TokensParameter) {
    return {
        parameters: createWithdrawCis2TokensParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64WithdrawCis2TokensParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'withdrawCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {WithdrawCis2TokensParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendWithdrawCis2Tokens(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: WithdrawCis2TokensParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('withdrawCis2Tokens'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createWithdrawCis2TokensParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'withdrawCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {WithdrawCis2TokensParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunWithdrawCis2Tokens(contractClient: SmartContractWalletContract, parameter: WithdrawCis2TokensParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('withdrawCis2Tokens'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createWithdrawCis2TokensParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'withdrawCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageWithdrawCis2Tokens = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'withdrawCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageWithdrawCis2Tokens | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageWithdrawCis2Tokens(invokeResult: SDK.InvokeContractResult): ErrorMessageWithdrawCis2Tokens | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match259: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match259 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match259 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match259 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match259 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match259 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match259 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match259 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match259 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match259 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match259 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match259 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match259
}
/** Base64 encoding of the parameter schema type for update transactions to 'viewInternalTransferMessageHashCcdAmount' entrypoint of the 'smart_contract_wallet' contract. */
const base64ViewInternalTransferMessageHashCcdAmountParameterSchema = 'FAAGAAAACwAAAGVudHJ5X3BvaW50FgELAAAAZXhwaXJ5X3RpbWUNBQAAAG5vbmNlBRUAAABzZXJ2aWNlX2ZlZV9yZWNpcGllbnQeIAAAABIAAABzZXJ2aWNlX2ZlZV9hbW91bnQKEAAAAHNpbXBsZV90cmFuc2ZlcnMQARQAAgAAAAIAAAB0bx4gAAAADwAAAHRyYW5zZmVyX2Ftb3VudAo=';
/** Parameter JSON type needed by the schema for update transaction for 'viewInternalTransferMessageHashCcdAmount' entrypoint of the 'smart_contract_wallet' contract. */
type ViewInternalTransferMessageHashCcdAmountParameterSchemaJson = {
    entry_point: string,
    expiry_time: SDK.Timestamp.SchemaValue,
    nonce: bigint,
    service_fee_recipient: string,
    service_fee_amount: SDK.CcdAmount.SchemaValue,
    simple_transfers: Array<{
    to: string,
    transfer_amount: SDK.CcdAmount.SchemaValue,
    }>,
    };
/** Parameter type for update transaction for 'viewInternalTransferMessageHashCcdAmount' entrypoint of the 'smart_contract_wallet' contract. */
export type ViewInternalTransferMessageHashCcdAmountParameter = {
    entry_point: string,
    expiry_time: SDK.Timestamp.Type,
    nonce: number | bigint,
    service_fee_recipient: SDK.HexString,
    service_fee_amount: SDK.CcdAmount.Type,
    simple_transfers: Array<{
    to: SDK.HexString,
    transfer_amount: SDK.CcdAmount.Type,
    }>,
    };

/**
 * Construct schema JSON representation used in update transaction for 'viewInternalTransferMessageHashCcdAmount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {ViewInternalTransferMessageHashCcdAmountParameter} parameter The structured parameter to construct from.
 * @returns {ViewInternalTransferMessageHashCcdAmountParameterSchemaJson} The smart contract parameter JSON.
 */
function createViewInternalTransferMessageHashCcdAmountParameterSchemaJson(parameter: ViewInternalTransferMessageHashCcdAmountParameter): ViewInternalTransferMessageHashCcdAmountParameterSchemaJson {
    const field272 = parameter.entry_point;
    const field273 = parameter.expiry_time;
    const timestamp274 = SDK.Timestamp.toSchemaValue(field273);
    const field275 = parameter.nonce;
    const number276 = BigInt(field275);
    const field277 = parameter.service_fee_recipient;
    const field278 = parameter.service_fee_amount;
    const amount279 = SDK.CcdAmount.toSchemaValue(field278);
    const field280 = parameter.simple_transfers;
    const list281 = field280.map((item282) => {
    const field284 = item282.to;
    const field285 = item282.transfer_amount;
    const amount286 = SDK.CcdAmount.toSchemaValue(field285);
    const named283 = {
    to: field284,
    transfer_amount: amount286,
    };
    return named283;
    });
    const named271 = {
    entry_point: field272,
    expiry_time: timestamp274,
    nonce: number276,
    service_fee_recipient: field277,
    service_fee_amount: amount279,
    simple_transfers: list281,
    };
    return named271;
}

/**
 * Construct Parameter type used in update transaction for 'viewInternalTransferMessageHashCcdAmount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {ViewInternalTransferMessageHashCcdAmountParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createViewInternalTransferMessageHashCcdAmountParameter(parameter: ViewInternalTransferMessageHashCcdAmountParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64ViewInternalTransferMessageHashCcdAmountParameterSchema, createViewInternalTransferMessageHashCcdAmountParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'viewInternalTransferMessageHashCcdAmount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {ViewInternalTransferMessageHashCcdAmountParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createViewInternalTransferMessageHashCcdAmountParameterWebWallet(parameter: ViewInternalTransferMessageHashCcdAmountParameter) {
    return {
        parameters: createViewInternalTransferMessageHashCcdAmountParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64ViewInternalTransferMessageHashCcdAmountParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'viewInternalTransferMessageHashCcdAmount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {ViewInternalTransferMessageHashCcdAmountParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendViewInternalTransferMessageHashCcdAmount(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: ViewInternalTransferMessageHashCcdAmountParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('viewInternalTransferMessageHashCcdAmount'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createViewInternalTransferMessageHashCcdAmountParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'viewInternalTransferMessageHashCcdAmount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {ViewInternalTransferMessageHashCcdAmountParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunViewInternalTransferMessageHashCcdAmount(contractClient: SmartContractWalletContract, parameter: ViewInternalTransferMessageHashCcdAmountParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('viewInternalTransferMessageHashCcdAmount'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createViewInternalTransferMessageHashCcdAmountParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'viewInternalTransferMessageHashCcdAmount' entrypoint of the 'smart_contract_wallet' contract. */
export type ReturnValueViewInternalTransferMessageHashCcdAmount = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];

/**
 * Get and parse the return value from dry-running update transaction for 'viewInternalTransferMessageHashCcdAmount' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueViewInternalTransferMessageHashCcdAmount | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueViewInternalTransferMessageHashCcdAmount(invokeResult: SDK.InvokeContractResult): ReturnValueViewInternalTransferMessageHashCcdAmount | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <[number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EyAAAAAC');
    return schemaJson;
}

/** Error message for dry-running update transaction for 'viewInternalTransferMessageHashCcdAmount' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageViewInternalTransferMessageHashCcdAmount = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'viewInternalTransferMessageHashCcdAmount' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageViewInternalTransferMessageHashCcdAmount | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageViewInternalTransferMessageHashCcdAmount(invokeResult: SDK.InvokeContractResult): ErrorMessageViewInternalTransferMessageHashCcdAmount | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match289: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match289 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match289 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match289 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match289 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match289 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match289 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match289 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match289 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match289 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match289 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match289 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match289
}
/** Base64 encoding of the parameter schema type for update transactions to 'viewInternalTransferMessageHashTokenAmount' entrypoint of the 'smart_contract_wallet' contract. */
const base64ViewInternalTransferMessageHashTokenAmountParameterSchema = 'FAAGAAAACwAAAGVudHJ5X3BvaW50FgELAAAAZXhwaXJ5X3RpbWUNBQAAAG5vbmNlBRUAAABzZXJ2aWNlX2ZlZV9yZWNpcGllbnQeIAAAABIAAABzZXJ2aWNlX2ZlZV9hbW91bnQUAAMAAAAMAAAAdG9rZW5fYW1vdW50GyUAAAAIAAAAdG9rZW5faWQdABsAAABjaXMyX3Rva2VuX2NvbnRyYWN0X2FkZHJlc3MMEAAAAHNpbXBsZV90cmFuc2ZlcnMQARQAAgAAAAIAAAB0bx4gAAAADwAAAHRyYW5zZmVyX2Ftb3VudBQAAwAAAAwAAAB0b2tlbl9hbW91bnQbJQAAAAgAAAB0b2tlbl9pZB0AGwAAAGNpczJfdG9rZW5fY29udHJhY3RfYWRkcmVzcww=';
/** Parameter JSON type needed by the schema for update transaction for 'viewInternalTransferMessageHashTokenAmount' entrypoint of the 'smart_contract_wallet' contract. */
type ViewInternalTransferMessageHashTokenAmountParameterSchemaJson = {
    entry_point: string,
    expiry_time: SDK.Timestamp.SchemaValue,
    nonce: bigint,
    service_fee_recipient: string,
    service_fee_amount: {
    token_amount: string,
    token_id: string,
    cis2_token_contract_address: SDK.ContractAddress.SchemaValue,
    },
    simple_transfers: Array<{
    to: string,
    transfer_amount: {
    token_amount: string,
    token_id: string,
    cis2_token_contract_address: SDK.ContractAddress.SchemaValue,
    },
    }>,
    };
/** Parameter type for update transaction for 'viewInternalTransferMessageHashTokenAmount' entrypoint of the 'smart_contract_wallet' contract. */
export type ViewInternalTransferMessageHashTokenAmountParameter = {
    entry_point: string,
    expiry_time: SDK.Timestamp.Type,
    nonce: number | bigint,
    service_fee_recipient: SDK.HexString,
    service_fee_amount: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    },
    simple_transfers: Array<{
    to: SDK.HexString,
    transfer_amount: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    },
    }>,
    };

/**
 * Construct schema JSON representation used in update transaction for 'viewInternalTransferMessageHashTokenAmount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {ViewInternalTransferMessageHashTokenAmountParameter} parameter The structured parameter to construct from.
 * @returns {ViewInternalTransferMessageHashTokenAmountParameterSchemaJson} The smart contract parameter JSON.
 */
function createViewInternalTransferMessageHashTokenAmountParameterSchemaJson(parameter: ViewInternalTransferMessageHashTokenAmountParameter): ViewInternalTransferMessageHashTokenAmountParameterSchemaJson {
    const field304 = parameter.entry_point;
    const field305 = parameter.expiry_time;
    const timestamp306 = SDK.Timestamp.toSchemaValue(field305);
    const field307 = parameter.nonce;
    const number308 = BigInt(field307);
    const field309 = parameter.service_fee_recipient;
    const field310 = parameter.service_fee_amount;
    const field312 = field310.token_amount;
    const leb301 = BigInt(field312).toString();
    const field313 = field310.token_id;
    const field314 = field310.cis2_token_contract_address;
    const contractAddress315 = SDK.ContractAddress.toSchemaValue(field314);
    const named311 = {
    token_amount: leb301,
    token_id: field313,
    cis2_token_contract_address: contractAddress315,
    };
    const field316 = parameter.simple_transfers;
    const list317 = field316.map((item318) => {
    const field320 = item318.to;
    const field321 = item318.transfer_amount;
    const field323 = field321.token_amount;
    const leb302 = BigInt(field323).toString();
    const field324 = field321.token_id;
    const field325 = field321.cis2_token_contract_address;
    const contractAddress326 = SDK.ContractAddress.toSchemaValue(field325);
    const named322 = {
    token_amount: leb302,
    token_id: field324,
    cis2_token_contract_address: contractAddress326,
    };
    const named319 = {
    to: field320,
    transfer_amount: named322,
    };
    return named319;
    });
    const named303 = {
    entry_point: field304,
    expiry_time: timestamp306,
    nonce: number308,
    service_fee_recipient: field309,
    service_fee_amount: named311,
    simple_transfers: list317,
    };
    return named303;
}

/**
 * Construct Parameter type used in update transaction for 'viewInternalTransferMessageHashTokenAmount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {ViewInternalTransferMessageHashTokenAmountParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createViewInternalTransferMessageHashTokenAmountParameter(parameter: ViewInternalTransferMessageHashTokenAmountParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64ViewInternalTransferMessageHashTokenAmountParameterSchema, createViewInternalTransferMessageHashTokenAmountParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'viewInternalTransferMessageHashTokenAmount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {ViewInternalTransferMessageHashTokenAmountParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createViewInternalTransferMessageHashTokenAmountParameterWebWallet(parameter: ViewInternalTransferMessageHashTokenAmountParameter) {
    return {
        parameters: createViewInternalTransferMessageHashTokenAmountParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64ViewInternalTransferMessageHashTokenAmountParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'viewInternalTransferMessageHashTokenAmount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {ViewInternalTransferMessageHashTokenAmountParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendViewInternalTransferMessageHashTokenAmount(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: ViewInternalTransferMessageHashTokenAmountParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('viewInternalTransferMessageHashTokenAmount'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createViewInternalTransferMessageHashTokenAmountParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'viewInternalTransferMessageHashTokenAmount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {ViewInternalTransferMessageHashTokenAmountParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunViewInternalTransferMessageHashTokenAmount(contractClient: SmartContractWalletContract, parameter: ViewInternalTransferMessageHashTokenAmountParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('viewInternalTransferMessageHashTokenAmount'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createViewInternalTransferMessageHashTokenAmountParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'viewInternalTransferMessageHashTokenAmount' entrypoint of the 'smart_contract_wallet' contract. */
export type ReturnValueViewInternalTransferMessageHashTokenAmount = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];

/**
 * Get and parse the return value from dry-running update transaction for 'viewInternalTransferMessageHashTokenAmount' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueViewInternalTransferMessageHashTokenAmount | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueViewInternalTransferMessageHashTokenAmount(invokeResult: SDK.InvokeContractResult): ReturnValueViewInternalTransferMessageHashTokenAmount | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <[number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EyAAAAAC');
    return schemaJson;
}

/** Error message for dry-running update transaction for 'viewInternalTransferMessageHashTokenAmount' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageViewInternalTransferMessageHashTokenAmount = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'viewInternalTransferMessageHashTokenAmount' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageViewInternalTransferMessageHashTokenAmount | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageViewInternalTransferMessageHashTokenAmount(invokeResult: SDK.InvokeContractResult): ErrorMessageViewInternalTransferMessageHashTokenAmount | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match329: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match329 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match329 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match329 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match329 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match329 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match329 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match329 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match329 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match329 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match329 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match329 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match329
}
/** Base64 encoding of the parameter schema type for update transactions to 'internalTransferNativeCurrency' entrypoint of the 'smart_contract_wallet' contract. */
const base64InternalTransferNativeCurrencyParameterSchema = 'EAEUAAMAAAAGAAAAc2lnbmVyHiAAAAAJAAAAc2lnbmF0dXJlHkAAAAAHAAAAbWVzc2FnZRQABgAAAAsAAABlbnRyeV9wb2ludBYBCwAAAGV4cGlyeV90aW1lDQUAAABub25jZQUVAAAAc2VydmljZV9mZWVfcmVjaXBpZW50HiAAAAASAAAAc2VydmljZV9mZWVfYW1vdW50ChAAAABzaW1wbGVfdHJhbnNmZXJzEAEUAAIAAAACAAAAdG8eIAAAAA8AAAB0cmFuc2Zlcl9hbW91bnQK';
/** Parameter JSON type needed by the schema for update transaction for 'internalTransferNativeCurrency' entrypoint of the 'smart_contract_wallet' contract. */
type InternalTransferNativeCurrencyParameterSchemaJson = Array<{
    signer: string,
    signature: string,
    message: {
    entry_point: string,
    expiry_time: SDK.Timestamp.SchemaValue,
    nonce: bigint,
    service_fee_recipient: string,
    service_fee_amount: SDK.CcdAmount.SchemaValue,
    simple_transfers: Array<{
    to: string,
    transfer_amount: SDK.CcdAmount.SchemaValue,
    }>,
    },
    }>;
/** Parameter type for update transaction for 'internalTransferNativeCurrency' entrypoint of the 'smart_contract_wallet' contract. */
export type InternalTransferNativeCurrencyParameter = Array<{
    signer: SDK.HexString,
    signature: SDK.HexString,
    message: {
    entry_point: string,
    expiry_time: SDK.Timestamp.Type,
    nonce: number | bigint,
    service_fee_recipient: SDK.HexString,
    service_fee_amount: SDK.CcdAmount.Type,
    simple_transfers: Array<{
    to: SDK.HexString,
    transfer_amount: SDK.CcdAmount.Type,
    }>,
    },
    }>;

/**
 * Construct schema JSON representation used in update transaction for 'internalTransferNativeCurrency' entrypoint of the 'smart_contract_wallet' contract.
 * @param {InternalTransferNativeCurrencyParameter} parameter The structured parameter to construct from.
 * @returns {InternalTransferNativeCurrencyParameterSchemaJson} The smart contract parameter JSON.
 */
function createInternalTransferNativeCurrencyParameterSchemaJson(parameter: InternalTransferNativeCurrencyParameter): InternalTransferNativeCurrencyParameterSchemaJson {
    const list341 = parameter.map((item342) => {
    const field344 = item342.signer;
    const field345 = item342.signature;
    const field346 = item342.message;
    const field348 = field346.entry_point;
    const field349 = field346.expiry_time;
    const timestamp350 = SDK.Timestamp.toSchemaValue(field349);
    const field351 = field346.nonce;
    const number352 = BigInt(field351);
    const field353 = field346.service_fee_recipient;
    const field354 = field346.service_fee_amount;
    const amount355 = SDK.CcdAmount.toSchemaValue(field354);
    const field356 = field346.simple_transfers;
    const list357 = field356.map((item358) => {
    const field360 = item358.to;
    const field361 = item358.transfer_amount;
    const amount362 = SDK.CcdAmount.toSchemaValue(field361);
    const named359 = {
    to: field360,
    transfer_amount: amount362,
    };
    return named359;
    });
    const named347 = {
    entry_point: field348,
    expiry_time: timestamp350,
    nonce: number352,
    service_fee_recipient: field353,
    service_fee_amount: amount355,
    simple_transfers: list357,
    };
    const named343 = {
    signer: field344,
    signature: field345,
    message: named347,
    };
    return named343;
    });
    return list341;
}

/**
 * Construct Parameter type used in update transaction for 'internalTransferNativeCurrency' entrypoint of the 'smart_contract_wallet' contract.
 * @param {InternalTransferNativeCurrencyParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createInternalTransferNativeCurrencyParameter(parameter: InternalTransferNativeCurrencyParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64InternalTransferNativeCurrencyParameterSchema, createInternalTransferNativeCurrencyParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'internalTransferNativeCurrency' entrypoint of the 'smart_contract_wallet' contract.
 * @param {InternalTransferNativeCurrencyParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createInternalTransferNativeCurrencyParameterWebWallet(parameter: InternalTransferNativeCurrencyParameter) {
    return {
        parameters: createInternalTransferNativeCurrencyParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64InternalTransferNativeCurrencyParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'internalTransferNativeCurrency' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {InternalTransferNativeCurrencyParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendInternalTransferNativeCurrency(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: InternalTransferNativeCurrencyParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('internalTransferNativeCurrency'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createInternalTransferNativeCurrencyParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'internalTransferNativeCurrency' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {InternalTransferNativeCurrencyParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunInternalTransferNativeCurrency(contractClient: SmartContractWalletContract, parameter: InternalTransferNativeCurrencyParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('internalTransferNativeCurrency'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createInternalTransferNativeCurrencyParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'internalTransferNativeCurrency' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageInternalTransferNativeCurrency = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'internalTransferNativeCurrency' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageInternalTransferNativeCurrency | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageInternalTransferNativeCurrency(invokeResult: SDK.InvokeContractResult): ErrorMessageInternalTransferNativeCurrency | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match363: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match363 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match363 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match363 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match363 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match363 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match363 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match363 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match363 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match363 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match363 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match363 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match363
}
/** Base64 encoding of the parameter schema type for update transactions to 'internalTransferCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
const base64InternalTransferCis2TokensParameterSchema = 'EAEUAAMAAAAGAAAAc2lnbmVyHiAAAAAJAAAAc2lnbmF0dXJlHkAAAAAHAAAAbWVzc2FnZRQABgAAAAsAAABlbnRyeV9wb2ludBYBCwAAAGV4cGlyeV90aW1lDQUAAABub25jZQUVAAAAc2VydmljZV9mZWVfcmVjaXBpZW50HiAAAAASAAAAc2VydmljZV9mZWVfYW1vdW50FAADAAAADAAAAHRva2VuX2Ftb3VudBslAAAACAAAAHRva2VuX2lkHQAbAAAAY2lzMl90b2tlbl9jb250cmFjdF9hZGRyZXNzDBAAAABzaW1wbGVfdHJhbnNmZXJzEAEUAAIAAAACAAAAdG8eIAAAAA8AAAB0cmFuc2Zlcl9hbW91bnQUAAMAAAAMAAAAdG9rZW5fYW1vdW50GyUAAAAIAAAAdG9rZW5faWQdABsAAABjaXMyX3Rva2VuX2NvbnRyYWN0X2FkZHJlc3MM';
/** Parameter JSON type needed by the schema for update transaction for 'internalTransferCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
type InternalTransferCis2TokensParameterSchemaJson = Array<{
    signer: string,
    signature: string,
    message: {
    entry_point: string,
    expiry_time: SDK.Timestamp.SchemaValue,
    nonce: bigint,
    service_fee_recipient: string,
    service_fee_amount: {
    token_amount: string,
    token_id: string,
    cis2_token_contract_address: SDK.ContractAddress.SchemaValue,
    },
    simple_transfers: Array<{
    to: string,
    transfer_amount: {
    token_amount: string,
    token_id: string,
    cis2_token_contract_address: SDK.ContractAddress.SchemaValue,
    },
    }>,
    },
    }>;
/** Parameter type for update transaction for 'internalTransferCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
export type InternalTransferCis2TokensParameter = Array<{
    signer: SDK.HexString,
    signature: SDK.HexString,
    message: {
    entry_point: string,
    expiry_time: SDK.Timestamp.Type,
    nonce: number | bigint,
    service_fee_recipient: SDK.HexString,
    service_fee_amount: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    },
    simple_transfers: Array<{
    to: SDK.HexString,
    transfer_amount: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    },
    }>,
    },
    }>;

/**
 * Construct schema JSON representation used in update transaction for 'internalTransferCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {InternalTransferCis2TokensParameter} parameter The structured parameter to construct from.
 * @returns {InternalTransferCis2TokensParameterSchemaJson} The smart contract parameter JSON.
 */
function createInternalTransferCis2TokensParameterSchemaJson(parameter: InternalTransferCis2TokensParameter): InternalTransferCis2TokensParameterSchemaJson {
    const list377 = parameter.map((item378) => {
    const field380 = item378.signer;
    const field381 = item378.signature;
    const field382 = item378.message;
    const field384 = field382.entry_point;
    const field385 = field382.expiry_time;
    const timestamp386 = SDK.Timestamp.toSchemaValue(field385);
    const field387 = field382.nonce;
    const number388 = BigInt(field387);
    const field389 = field382.service_fee_recipient;
    const field390 = field382.service_fee_amount;
    const field392 = field390.token_amount;
    const leb375 = BigInt(field392).toString();
    const field393 = field390.token_id;
    const field394 = field390.cis2_token_contract_address;
    const contractAddress395 = SDK.ContractAddress.toSchemaValue(field394);
    const named391 = {
    token_amount: leb375,
    token_id: field393,
    cis2_token_contract_address: contractAddress395,
    };
    const field396 = field382.simple_transfers;
    const list397 = field396.map((item398) => {
    const field400 = item398.to;
    const field401 = item398.transfer_amount;
    const field403 = field401.token_amount;
    const leb376 = BigInt(field403).toString();
    const field404 = field401.token_id;
    const field405 = field401.cis2_token_contract_address;
    const contractAddress406 = SDK.ContractAddress.toSchemaValue(field405);
    const named402 = {
    token_amount: leb376,
    token_id: field404,
    cis2_token_contract_address: contractAddress406,
    };
    const named399 = {
    to: field400,
    transfer_amount: named402,
    };
    return named399;
    });
    const named383 = {
    entry_point: field384,
    expiry_time: timestamp386,
    nonce: number388,
    service_fee_recipient: field389,
    service_fee_amount: named391,
    simple_transfers: list397,
    };
    const named379 = {
    signer: field380,
    signature: field381,
    message: named383,
    };
    return named379;
    });
    return list377;
}

/**
 * Construct Parameter type used in update transaction for 'internalTransferCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {InternalTransferCis2TokensParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createInternalTransferCis2TokensParameter(parameter: InternalTransferCis2TokensParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64InternalTransferCis2TokensParameterSchema, createInternalTransferCis2TokensParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'internalTransferCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {InternalTransferCis2TokensParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createInternalTransferCis2TokensParameterWebWallet(parameter: InternalTransferCis2TokensParameter) {
    return {
        parameters: createInternalTransferCis2TokensParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64InternalTransferCis2TokensParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'internalTransferCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {InternalTransferCis2TokensParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendInternalTransferCis2Tokens(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: InternalTransferCis2TokensParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('internalTransferCis2Tokens'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createInternalTransferCis2TokensParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'internalTransferCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {InternalTransferCis2TokensParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunInternalTransferCis2Tokens(contractClient: SmartContractWalletContract, parameter: InternalTransferCis2TokensParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('internalTransferCis2Tokens'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createInternalTransferCis2TokensParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'internalTransferCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageInternalTransferCis2Tokens = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'internalTransferCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageInternalTransferCis2Tokens | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageInternalTransferCis2Tokens(invokeResult: SDK.InvokeContractResult): ErrorMessageInternalTransferCis2Tokens | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match407: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match407 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match407 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match407 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match407 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match407 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match407 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match407 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match407 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match407 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match407 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match407 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match407
}
/** Base64 encoding of the parameter schema type for update transactions to 'setImplementors' entrypoint of the 'smart_contract_wallet' contract. */
const base64SetImplementorsParameterSchema = 'FAACAAAAAgAAAGlkFgAMAAAAaW1wbGVtZW50b3JzEAIM';
/** Parameter JSON type needed by the schema for update transaction for 'setImplementors' entrypoint of the 'smart_contract_wallet' contract. */
type SetImplementorsParameterSchemaJson = {
    id: string,
    implementors: Array<SDK.ContractAddress.SchemaValue>,
    };
/** Parameter type for update transaction for 'setImplementors' entrypoint of the 'smart_contract_wallet' contract. */
export type SetImplementorsParameter = {
    id: string,
    implementors: Array<SDK.ContractAddress.Type>,
    };

/**
 * Construct schema JSON representation used in update transaction for 'setImplementors' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SetImplementorsParameter} parameter The structured parameter to construct from.
 * @returns {SetImplementorsParameterSchemaJson} The smart contract parameter JSON.
 */
function createSetImplementorsParameterSchemaJson(parameter: SetImplementorsParameter): SetImplementorsParameterSchemaJson {
    const field420 = parameter.id;
    const field421 = parameter.implementors;
    const list422 = field421.map((item423) => {
    const contractAddress424 = SDK.ContractAddress.toSchemaValue(item423);
    return contractAddress424;
    });
    const named419 = {
    id: field420,
    implementors: list422,
    };
    return named419;
}

/**
 * Construct Parameter type used in update transaction for 'setImplementors' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SetImplementorsParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createSetImplementorsParameter(parameter: SetImplementorsParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64SetImplementorsParameterSchema, createSetImplementorsParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'setImplementors' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SetImplementorsParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createSetImplementorsParameterWebWallet(parameter: SetImplementorsParameter) {
    return {
        parameters: createSetImplementorsParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64SetImplementorsParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'setImplementors' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SetImplementorsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendSetImplementors(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: SetImplementorsParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('setImplementors'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createSetImplementorsParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'setImplementors' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SetImplementorsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunSetImplementors(contractClient: SmartContractWalletContract, parameter: SetImplementorsParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('setImplementors'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createSetImplementorsParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'setImplementors' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageSetImplementors = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'setImplementors' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageSetImplementors | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageSetImplementors(invokeResult: SDK.InvokeContractResult): ErrorMessageSetImplementors | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match425: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match425 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match425 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match425 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match425 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match425 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match425 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match425 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match425 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match425 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match425 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match425 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match425
}
/** Base64 encoding of the parameter schema type for update transactions to 'supports' entrypoint of the 'smart_contract_wallet' contract. */
const base64SupportsParameterSchema = 'EAEWAA==';
/** Parameter JSON type needed by the schema for update transaction for 'supports' entrypoint of the 'smart_contract_wallet' contract. */
type SupportsParameterSchemaJson = Array<string>;
/** Parameter type for update transaction for 'supports' entrypoint of the 'smart_contract_wallet' contract. */
export type SupportsParameter = Array<string>;

/**
 * Construct schema JSON representation used in update transaction for 'supports' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SupportsParameter} parameter The structured parameter to construct from.
 * @returns {SupportsParameterSchemaJson} The smart contract parameter JSON.
 */
function createSupportsParameterSchemaJson(parameter: SupportsParameter): SupportsParameterSchemaJson {
    return parameter;
}

/**
 * Construct Parameter type used in update transaction for 'supports' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SupportsParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createSupportsParameter(parameter: SupportsParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64SupportsParameterSchema, createSupportsParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'supports' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SupportsParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createSupportsParameterWebWallet(parameter: SupportsParameter) {
    return {
        parameters: createSupportsParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64SupportsParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'supports' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SupportsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendSupports(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: SupportsParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('supports'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createSupportsParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'supports' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SupportsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunSupports(contractClient: SmartContractWalletContract, parameter: SupportsParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('supports'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createSupportsParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'supports' entrypoint of the 'smart_contract_wallet' contract. */
export type ReturnValueSupports = Array<{ type: 'NoSupport'} | { type: 'Support'} | { type: 'SupportBy', content: Array<SDK.ContractAddress.Type> }>;

/**
 * Get and parse the return value from dry-running update transaction for 'supports' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueSupports | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueSupports(invokeResult: SDK.InvokeContractResult): ReturnValueSupports | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <Array<{'NoSupport' : [] } | {'Support' : [] } | {'SupportBy' : [Array<SDK.ContractAddress.SchemaValue>] }>>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAEVAwAAAAkAAABOb1N1cHBvcnQCBwAAAFN1cHBvcnQCCQAAAFN1cHBvcnRCeQEBAAAAEAAM');
    const list439 = schemaJson.map((item440) => {
    let match441: { type: 'NoSupport'} | { type: 'Support'} | { type: 'SupportBy', content: Array<SDK.ContractAddress.Type> };
    if ('NoSupport' in item440) {
       match441 = {
           type: 'NoSupport',
       };
    } else if ('Support' in item440) {
       match441 = {
           type: 'Support',
       };
    } else if ('SupportBy' in item440) {
       const variant444 = item440.SupportBy;
    const list445 = variant444[0].map((item446) => {
    const contractAddress447 = SDK.ContractAddress.fromSchemaValue(item446);
    return contractAddress447;
    });
       match441 = {
           type: 'SupportBy',
           content: list445,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match441;
    });
    return list439;
}

/** Error message for dry-running update transaction for 'supports' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageSupports = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'supports' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageSupports | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageSupports(invokeResult: SDK.InvokeContractResult): ErrorMessageSupports | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match448: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match448 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match448 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match448 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match448 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match448 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match448 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match448 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match448 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match448 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match448 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match448 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match448
}
/** Base64 encoding of the parameter schema type for update transactions to 'balanceOfNativeCurrency' entrypoint of the 'smart_contract_wallet' contract. */
const base64BalanceOfNativeCurrencyParameterSchema = 'EAEeIAAAAA==';
/** Parameter JSON type needed by the schema for update transaction for 'balanceOfNativeCurrency' entrypoint of the 'smart_contract_wallet' contract. */
type BalanceOfNativeCurrencyParameterSchemaJson = Array<string>;
/** Parameter type for update transaction for 'balanceOfNativeCurrency' entrypoint of the 'smart_contract_wallet' contract. */
export type BalanceOfNativeCurrencyParameter = Array<SDK.HexString>;

/**
 * Construct schema JSON representation used in update transaction for 'balanceOfNativeCurrency' entrypoint of the 'smart_contract_wallet' contract.
 * @param {BalanceOfNativeCurrencyParameter} parameter The structured parameter to construct from.
 * @returns {BalanceOfNativeCurrencyParameterSchemaJson} The smart contract parameter JSON.
 */
function createBalanceOfNativeCurrencyParameterSchemaJson(parameter: BalanceOfNativeCurrencyParameter): BalanceOfNativeCurrencyParameterSchemaJson {
    return parameter;
}

/**
 * Construct Parameter type used in update transaction for 'balanceOfNativeCurrency' entrypoint of the 'smart_contract_wallet' contract.
 * @param {BalanceOfNativeCurrencyParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createBalanceOfNativeCurrencyParameter(parameter: BalanceOfNativeCurrencyParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64BalanceOfNativeCurrencyParameterSchema, createBalanceOfNativeCurrencyParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'balanceOfNativeCurrency' entrypoint of the 'smart_contract_wallet' contract.
 * @param {BalanceOfNativeCurrencyParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createBalanceOfNativeCurrencyParameterWebWallet(parameter: BalanceOfNativeCurrencyParameter) {
    return {
        parameters: createBalanceOfNativeCurrencyParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64BalanceOfNativeCurrencyParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'balanceOfNativeCurrency' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {BalanceOfNativeCurrencyParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendBalanceOfNativeCurrency(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: BalanceOfNativeCurrencyParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('balanceOfNativeCurrency'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createBalanceOfNativeCurrencyParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'balanceOfNativeCurrency' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {BalanceOfNativeCurrencyParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunBalanceOfNativeCurrency(contractClient: SmartContractWalletContract, parameter: BalanceOfNativeCurrencyParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('balanceOfNativeCurrency'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createBalanceOfNativeCurrencyParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'balanceOfNativeCurrency' entrypoint of the 'smart_contract_wallet' contract. */
export type ReturnValueBalanceOfNativeCurrency = Array<SDK.CcdAmount.Type>;

/**
 * Get and parse the return value from dry-running update transaction for 'balanceOfNativeCurrency' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueBalanceOfNativeCurrency | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueBalanceOfNativeCurrency(invokeResult: SDK.InvokeContractResult): ReturnValueBalanceOfNativeCurrency | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <Array<SDK.CcdAmount.SchemaValue>>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAEK');
    const list462 = schemaJson.map((item463) => {
    const amount464 = SDK.CcdAmount.fromSchemaValue(item463);
    return amount464;
    });
    return list462;
}

/** Error message for dry-running update transaction for 'balanceOfNativeCurrency' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageBalanceOfNativeCurrency = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'balanceOfNativeCurrency' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageBalanceOfNativeCurrency | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageBalanceOfNativeCurrency(invokeResult: SDK.InvokeContractResult): ErrorMessageBalanceOfNativeCurrency | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match465: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match465 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match465 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match465 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match465 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match465 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match465 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match465 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match465 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match465 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match465 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match465 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match465
}
/** Base64 encoding of the parameter schema type for update transactions to 'balanceOfCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
const base64BalanceOfCis2TokensParameterSchema = 'EAEUAAMAAAAIAAAAdG9rZW5faWQdABsAAABjaXMyX3Rva2VuX2NvbnRyYWN0X2FkZHJlc3MMCgAAAHB1YmxpY19rZXkeIAAAAA==';
/** Parameter JSON type needed by the schema for update transaction for 'balanceOfCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
type BalanceOfCis2TokensParameterSchemaJson = Array<{
    token_id: string,
    cis2_token_contract_address: SDK.ContractAddress.SchemaValue,
    public_key: string,
    }>;
/** Parameter type for update transaction for 'balanceOfCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
export type BalanceOfCis2TokensParameter = Array<{
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    public_key: SDK.HexString,
    }>;

/**
 * Construct schema JSON representation used in update transaction for 'balanceOfCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {BalanceOfCis2TokensParameter} parameter The structured parameter to construct from.
 * @returns {BalanceOfCis2TokensParameterSchemaJson} The smart contract parameter JSON.
 */
function createBalanceOfCis2TokensParameterSchemaJson(parameter: BalanceOfCis2TokensParameter): BalanceOfCis2TokensParameterSchemaJson {
    const list477 = parameter.map((item478) => {
    const field480 = item478.token_id;
    const field481 = item478.cis2_token_contract_address;
    const contractAddress482 = SDK.ContractAddress.toSchemaValue(field481);
    const field483 = item478.public_key;
    const named479 = {
    token_id: field480,
    cis2_token_contract_address: contractAddress482,
    public_key: field483,
    };
    return named479;
    });
    return list477;
}

/**
 * Construct Parameter type used in update transaction for 'balanceOfCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {BalanceOfCis2TokensParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createBalanceOfCis2TokensParameter(parameter: BalanceOfCis2TokensParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64BalanceOfCis2TokensParameterSchema, createBalanceOfCis2TokensParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'balanceOfCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {BalanceOfCis2TokensParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createBalanceOfCis2TokensParameterWebWallet(parameter: BalanceOfCis2TokensParameter) {
    return {
        parameters: createBalanceOfCis2TokensParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64BalanceOfCis2TokensParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'balanceOfCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {BalanceOfCis2TokensParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendBalanceOfCis2Tokens(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: BalanceOfCis2TokensParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('balanceOfCis2Tokens'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createBalanceOfCis2TokensParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'balanceOfCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {BalanceOfCis2TokensParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunBalanceOfCis2Tokens(contractClient: SmartContractWalletContract, parameter: BalanceOfCis2TokensParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('balanceOfCis2Tokens'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createBalanceOfCis2TokensParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'balanceOfCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
export type ReturnValueBalanceOfCis2Tokens = Array<number | bigint>;

/**
 * Get and parse the return value from dry-running update transaction for 'balanceOfCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueBalanceOfCis2Tokens | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueBalanceOfCis2Tokens(invokeResult: SDK.InvokeContractResult): ReturnValueBalanceOfCis2Tokens | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <Array<string>>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAEbJQAAAA==');
    const list485 = schemaJson.map((item486) => {
    const leb484 = BigInt(item486);
    return leb484;
    });
    return list485;
}

/** Error message for dry-running update transaction for 'balanceOfCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageBalanceOfCis2Tokens = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'balanceOfCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageBalanceOfCis2Tokens | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageBalanceOfCis2Tokens(invokeResult: SDK.InvokeContractResult): ErrorMessageBalanceOfCis2Tokens | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match487: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match487 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match487 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match487 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match487 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match487 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match487 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match487 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match487 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match487 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match487 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match487 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match487
}
/** Base64 encoding of the parameter schema type for update transactions to 'nonceOf' entrypoint of the 'smart_contract_wallet' contract. */
const base64NonceOfParameterSchema = 'EAEeIAAAAA==';
/** Parameter JSON type needed by the schema for update transaction for 'nonceOf' entrypoint of the 'smart_contract_wallet' contract. */
type NonceOfParameterSchemaJson = Array<string>;
/** Parameter type for update transaction for 'nonceOf' entrypoint of the 'smart_contract_wallet' contract. */
export type NonceOfParameter = Array<SDK.HexString>;

/**
 * Construct schema JSON representation used in update transaction for 'nonceOf' entrypoint of the 'smart_contract_wallet' contract.
 * @param {NonceOfParameter} parameter The structured parameter to construct from.
 * @returns {NonceOfParameterSchemaJson} The smart contract parameter JSON.
 */
function createNonceOfParameterSchemaJson(parameter: NonceOfParameter): NonceOfParameterSchemaJson {
    return parameter;
}

/**
 * Construct Parameter type used in update transaction for 'nonceOf' entrypoint of the 'smart_contract_wallet' contract.
 * @param {NonceOfParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createNonceOfParameter(parameter: NonceOfParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64NonceOfParameterSchema, createNonceOfParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'nonceOf' entrypoint of the 'smart_contract_wallet' contract.
 * @param {NonceOfParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createNonceOfParameterWebWallet(parameter: NonceOfParameter) {
    return {
        parameters: createNonceOfParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64NonceOfParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'nonceOf' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {NonceOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendNonceOf(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: NonceOfParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('nonceOf'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createNonceOfParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'nonceOf' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {NonceOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunNonceOf(contractClient: SmartContractWalletContract, parameter: NonceOfParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('nonceOf'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createNonceOfParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'nonceOf' entrypoint of the 'smart_contract_wallet' contract. */
export type ReturnValueNonceOf = Array<number | bigint>;

/**
 * Get and parse the return value from dry-running update transaction for 'nonceOf' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueNonceOf | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueNonceOf(invokeResult: SDK.InvokeContractResult): ReturnValueNonceOf | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <Array<bigint>>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAEF');
    return schemaJson;
}

/** Error message for dry-running update transaction for 'nonceOf' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageNonceOf = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'nonceOf' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageNonceOf | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageNonceOf(invokeResult: SDK.InvokeContractResult): ErrorMessageNonceOf | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match503: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match503 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match503 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match503 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match503 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match503 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match503 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match503 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match503 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match503 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match503 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match503 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match503
}
