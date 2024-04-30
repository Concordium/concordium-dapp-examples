// @ts-nocheck
import * as SDK from "@concordium/web-sdk";
/** The reference of the smart contract module supported by the provided client. */
export const moduleReference: SDK.ModuleReference.Type = /*#__PURE__*/ SDK.ModuleReference.fromHexString('7f24e586bb7dcac318ca0c2876d3e4b5c07f36d48d0c7b20f8d82dad0552f1e3');
/** Name of the smart contract supported by this client. */
export const contractName: SDK.ContractName.Type = /*#__PURE__*/ SDK.ContractName.fromStringUnchecked('track_and_trace');

/** Smart contract client for a contract instance on chain. */
class TrackAndTraceContract {
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
export type Type = TrackAndTraceContract;

/**
 * Construct an instance of `TrackAndTraceContract` for interacting with a 'track_and_trace' contract on chain.
 * Checking the information instance on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @param {SDK.BlockHash.Type} [blockHash] - Hash of the block to check the information at. When not provided the last finalized block is used.
 * @throws If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {TrackAndTraceContract}
 */
export async function create(grpcClient: SDK.ConcordiumGRPCClient, contractAddress: SDK.ContractAddress.Type, blockHash?: SDK.BlockHash.Type): Promise<TrackAndTraceContract> {
    const genericContract = new SDK.Contract(grpcClient, contractAddress, contractName);
    await genericContract.checkOnChain({ moduleReference: moduleReference, blockHash: blockHash });
    return new TrackAndTraceContract(
        grpcClient,
        contractAddress,
        genericContract
    );
}

/**
 * Construct the `TrackAndTraceContract` for interacting with a 'track_and_trace' contract on chain.
 * Without checking the instance information on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @returns {TrackAndTraceContract}
 */
export function createUnchecked(grpcClient: SDK.ConcordiumGRPCClient, contractAddress: SDK.ContractAddress.Type): TrackAndTraceContract {
    const genericContract = new SDK.Contract(grpcClient, contractAddress, contractName);
    return new TrackAndTraceContract(
        grpcClient,
        contractAddress,
        genericContract,
    );
}

/**
 * Check if the smart contract instance exists on the blockchain and whether it uses a matching contract name and module reference.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.BlockHash.Type} [blockHash] A optional block hash to use for checking information on chain, if not provided the last finalized will be used.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 */
export function checkOnChain(contractClient: TrackAndTraceContract, blockHash?: SDK.BlockHash.Type): Promise<void> {
    return contractClient.genericContract.checkOnChain({moduleReference: moduleReference, blockHash: blockHash });
}

/** Contract event type for the 'track_and_trace' contract. */
export type Event = { type: 'GrantRole', content: {
    address: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    role: { type: 'Admin'},
    } } | { type: 'RevokeRole', content: {
    address: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    role: { type: 'Admin'},
    } } | { type: 'ItemStatusChanged', content: {
    item_id: SDK.HexString,
    new_status: { type: 'Produced'} | { type: 'InTransit'} | { type: 'InStore'} | { type: 'Sold'},
    additional_data: {
    bytes: Array<number>,
    },
    } } | { type: 'ItemCreated', content: {
    item_id: SDK.HexString,
    metadata_url: { type: 'None'} | { type: 'Some', content: {
    url: string,
    hash: { type: 'None'} | { type: 'Some', content: SDK.HexString },
    } },
    initial_status: { type: 'Produced'} | { type: 'InTransit'} | { type: 'InStore'} | { type: 'Sold'},
    } } | { type: 'Nonce', content: {
    account: SDK.AccountAddress.Type,
    nonce: number | bigint,
    } };

/**
 * Parse the contract events logged by the 'track_and_trace' contract.
 * @param {SDK.ContractEvent.Type} event The unparsed contract event.
 * @returns {Event} The structured contract event.
 */
export function parseEvent(event: SDK.ContractEvent.Type): Event {
    const schemaJson = <{'GrantRole' : [{
    address: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    role: {'Admin' : [] },
    }] } | {'RevokeRole' : [{
    address: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    role: {'Admin' : [] },
    }] } | {'ItemStatusChanged' : [{
    item_id: string,
    new_status: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] },
    additional_data: {
    bytes: Array<number>,
    },
    }] } | {'ItemCreated' : [{
    item_id: string,
    metadata_url: {'None' : [] } | {'Some' : [{
    url: string,
    hash: {'None' : [] } | {'Some' : [string] },
    }] },
    initial_status: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] },
    }] } | {'Nonce' : [{
    account: SDK.AccountAddress.SchemaValue,
    nonce: bigint,
    }] }>SDK.ContractEvent.parseWithSchemaTypeBase64(event, 'HwUAAAACCQAAAEdyYW50Um9sZQEBAAAAFAACAAAABwAAAGFkZHJlc3MVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMBAAAAHJvbGUVAQAAAAUAAABBZG1pbgIDCgAAAFJldm9rZVJvbGUBAQAAABQAAgAAAAcAAABhZGRyZXNzFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAQAAAByb2xlFQEAAAAFAAAAQWRtaW4C7BEAAABJdGVtU3RhdHVzQ2hhbmdlZAEBAAAAFAADAAAABwAAAGl0ZW1faWQdAAoAAABuZXdfc3RhdHVzFQQAAAAIAAAAUHJvZHVjZWQCCQAAAEluVHJhbnNpdAIHAAAASW5TdG9yZQIEAAAAU29sZAIPAAAAYWRkaXRpb25hbF9kYXRhFAABAAAABQAAAGJ5dGVzEAIC7QsAAABJdGVtQ3JlYXRlZAEBAAAAFAADAAAABwAAAGl0ZW1faWQdAAwAAABtZXRhZGF0YV91cmwVAgAAAAQAAABOb25lAgQAAABTb21lAQEAAAAUAAIAAAADAAAAdXJsFgEEAAAAaGFzaBUCAAAABAAAAE5vbmUCBAAAAFNvbWUBAQAAAB4gAAAADgAAAGluaXRpYWxfc3RhdHVzFQQAAAAIAAAAUHJvZHVjZWQCCQAAAEluVHJhbnNpdAIHAAAASW5TdG9yZQIEAAAAU29sZAL6BQAAAE5vbmNlAQEAAAAUAAIAAAAHAAAAYWNjb3VudAsFAAAAbm9uY2UF');
    let match11: { type: 'GrantRole', content: {
    address: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    role: { type: 'Admin'},
    } } | { type: 'RevokeRole', content: {
    address: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    role: { type: 'Admin'},
    } } | { type: 'ItemStatusChanged', content: {
    item_id: SDK.HexString,
    new_status: { type: 'Produced'} | { type: 'InTransit'} | { type: 'InStore'} | { type: 'Sold'},
    additional_data: {
    bytes: Array<number>,
    },
    } } | { type: 'ItemCreated', content: {
    item_id: SDK.HexString,
    metadata_url: { type: 'None'} | { type: 'Some', content: {
    url: string,
    hash: { type: 'None'} | { type: 'Some', content: SDK.HexString },
    } },
    initial_status: { type: 'Produced'} | { type: 'InTransit'} | { type: 'InStore'} | { type: 'Sold'},
    } } | { type: 'Nonce', content: {
    account: SDK.AccountAddress.Type,
    nonce: number | bigint,
    } };
    if ('GrantRole' in schemaJson) {
       const variant12 = schemaJson.GrantRole;
    const field13 = variant12[0].address;
    let match14: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in field13) {
       const variant15 = field13.Account;
    const accountAddress16 = SDK.AccountAddress.fromSchemaValue(variant15[0]);
       match14 = {
           type: 'Account',
           content: accountAddress16,
       };
    } else if ('Contract' in field13) {
       const variant17 = field13.Contract;
    const contractAddress18 = SDK.ContractAddress.fromSchemaValue(variant17[0]);
       match14 = {
           type: 'Contract',
           content: contractAddress18,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field19 = variant12[0].role;
    let match20: { type: 'Admin'};
    if ('Admin' in field19) {
       match20 = {
           type: 'Admin',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named22 = {
    address: match14,
    role: match20,
    };
       match11 = {
           type: 'GrantRole',
           content: named22,
       };
    } else if ('RevokeRole' in schemaJson) {
       const variant23 = schemaJson.RevokeRole;
    const field24 = variant23[0].address;
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
    const field30 = variant23[0].role;
    let match31: { type: 'Admin'};
    if ('Admin' in field30) {
       match31 = {
           type: 'Admin',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named33 = {
    address: match25,
    role: match31,
    };
       match11 = {
           type: 'RevokeRole',
           content: named33,
       };
    } else if ('ItemStatusChanged' in schemaJson) {
       const variant34 = schemaJson.ItemStatusChanged;
    const field35 = variant34[0].item_id;
    const field36 = variant34[0].new_status;
    let match37: { type: 'Produced'} | { type: 'InTransit'} | { type: 'InStore'} | { type: 'Sold'};
    if ('Produced' in field36) {
       match37 = {
           type: 'Produced',
       };
    } else if ('InTransit' in field36) {
       match37 = {
           type: 'InTransit',
       };
    } else if ('InStore' in field36) {
       match37 = {
           type: 'InStore',
       };
    } else if ('Sold' in field36) {
       match37 = {
           type: 'Sold',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field42 = variant34[0].additional_data;
    const field43 = field42.bytes;
    const named46 = {
    bytes: field43,
    };
    const named47 = {
    item_id: field35,
    new_status: match37,
    additional_data: named46,
    };
       match11 = {
           type: 'ItemStatusChanged',
           content: named47,
       };
    } else if ('ItemCreated' in schemaJson) {
       const variant48 = schemaJson.ItemCreated;
    const field49 = variant48[0].item_id;
    const field50 = variant48[0].metadata_url;
    let match51: { type: 'None'} | { type: 'Some', content: {
    url: string,
    hash: { type: 'None'} | { type: 'Some', content: SDK.HexString },
    } };
    if ('None' in field50) {
       match51 = {
           type: 'None',
       };
    } else if ('Some' in field50) {
       const variant53 = field50.Some;
    const field54 = variant53[0].url;
    const field55 = variant53[0].hash;
    let match56: { type: 'None'} | { type: 'Some', content: SDK.HexString };
    if ('None' in field55) {
       match56 = {
           type: 'None',
       };
    } else if ('Some' in field55) {
       const variant58 = field55.Some;
       match56 = {
           type: 'Some',
           content: variant58[0],
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named59 = {
    url: field54,
    hash: match56,
    };
       match51 = {
           type: 'Some',
           content: named59,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field60 = variant48[0].initial_status;
    let match61: { type: 'Produced'} | { type: 'InTransit'} | { type: 'InStore'} | { type: 'Sold'};
    if ('Produced' in field60) {
       match61 = {
           type: 'Produced',
       };
    } else if ('InTransit' in field60) {
       match61 = {
           type: 'InTransit',
       };
    } else if ('InStore' in field60) {
       match61 = {
           type: 'InStore',
       };
    } else if ('Sold' in field60) {
       match61 = {
           type: 'Sold',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named66 = {
    item_id: field49,
    metadata_url: match51,
    initial_status: match61,
    };
       match11 = {
           type: 'ItemCreated',
           content: named66,
       };
    } else if ('Nonce' in schemaJson) {
       const variant67 = schemaJson.Nonce;
    const field68 = variant67[0].account;
    const accountAddress69 = SDK.AccountAddress.fromSchemaValue(field68);
    const field70 = variant67[0].nonce;
    const named71 = {
    account: accountAddress69,
    nonce: field70,
    };
       match11 = {
           type: 'Nonce',
           content: named71,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match11;
}
/** Parameter type  used in update transaction for 'getNextItemId' entrypoint of the 'track_and_trace' contract. */
export type GetNextItemIdParameter = SDK.Parameter.Type;

/**
 * Send an update-contract transaction to the 'getNextItemId' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {GetNextItemIdParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendGetNextItemId(contractClient: TrackAndTraceContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: GetNextItemIdParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('getNextItemId'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        parameter,
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'getNextItemId' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {GetNextItemIdParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunGetNextItemId(contractClient: TrackAndTraceContract, parameter: GetNextItemIdParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('getNextItemId'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        parameter,
        blockHash
    );
}

/** Return value for dry-running update transaction for 'getNextItemId' entrypoint of the 'track_and_trace' contract. */
export type ReturnValueGetNextItemId = number | bigint;

/**
 * Get and parse the return value from dry-running update transaction for 'getNextItemId' entrypoint of the 'track_and_trace' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueGetNextItemId | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueGetNextItemId(invokeResult: SDK.InvokeContractResult): ReturnValueGetNextItemId | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <bigint>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'BQ==');
    return schemaJson;
}
/** Base64 encoding of the parameter schema type for update transactions to 'getRoles' entrypoint of the 'track_and_trace' contract. */
const base64GetRolesParameterSchema = 'FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==';
/** Parameter JSON type needed by the schema for update transaction for 'getRoles' entrypoint of the 'track_and_trace' contract. */
type GetRolesParameterSchemaJson = {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
/** Parameter type for update transaction for 'getRoles' entrypoint of the 'track_and_trace' contract. */
export type GetRolesParameter = { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };

/**
 * Construct schema JSON representation used in update transaction for 'getRoles' entrypoint of the 'track_and_trace' contract.
 * @param {GetRolesParameter} parameter The structured parameter to construct from.
 * @returns {GetRolesParameterSchemaJson} The smart contract parameter JSON.
 */
function createGetRolesParameterSchemaJson(parameter: GetRolesParameter): GetRolesParameterSchemaJson {
    let match72: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (parameter.type) {
        case 'Account':
    const accountAddress73 = SDK.AccountAddress.toSchemaValue(parameter.content);
            match72 = { Account: [accountAddress73], };
        break;
        case 'Contract':
    const contractAddress74 = SDK.ContractAddress.toSchemaValue(parameter.content);
            match72 = { Contract: [contractAddress74], };
        break;
    }

    return match72;
}

/**
 * Construct Parameter type used in update transaction for 'getRoles' entrypoint of the 'track_and_trace' contract.
 * @param {GetRolesParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createGetRolesParameter(parameter: GetRolesParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64GetRolesParameterSchema, createGetRolesParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'getRoles' entrypoint of the 'track_and_trace' contract.
 * @param {GetRolesParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createGetRolesParameterWebWallet(parameter: GetRolesParameter) {
    return {
        parameters: createGetRolesParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64GetRolesParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'getRoles' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {GetRolesParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendGetRoles(contractClient: TrackAndTraceContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: GetRolesParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('getRoles'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createGetRolesParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'getRoles' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {GetRolesParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunGetRoles(contractClient: TrackAndTraceContract, parameter: GetRolesParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('getRoles'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createGetRolesParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'getRoles' entrypoint of the 'track_and_trace' contract. */
export type ReturnValueGetRoles = Array<{ type: 'Admin'}>;

/**
 * Get and parse the return value from dry-running update transaction for 'getRoles' entrypoint of the 'track_and_trace' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueGetRoles | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueGetRoles(invokeResult: SDK.InvokeContractResult): ReturnValueGetRoles | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <Array<{'Admin' : [] }>>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAIVAQAAAAUAAABBZG1pbgI=');
    const list75 = schemaJson.map((item76) => {
    let match77: { type: 'Admin'};
    if ('Admin' in item76) {
       match77 = {
           type: 'Admin',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match77;
    });
    return list75;
}
/** Base64 encoding of the parameter schema type for update transactions to 'getItemState' entrypoint of the 'track_and_trace' contract. */
const base64GetItemStateParameterSchema = 'HQA=';
/** Parameter JSON type needed by the schema for update transaction for 'getItemState' entrypoint of the 'track_and_trace' contract. */
type GetItemStateParameterSchemaJson = string;
/** Parameter type for update transaction for 'getItemState' entrypoint of the 'track_and_trace' contract. */
export type GetItemStateParameter = SDK.HexString;

/**
 * Construct schema JSON representation used in update transaction for 'getItemState' entrypoint of the 'track_and_trace' contract.
 * @param {GetItemStateParameter} parameter The structured parameter to construct from.
 * @returns {GetItemStateParameterSchemaJson} The smart contract parameter JSON.
 */
function createGetItemStateParameterSchemaJson(parameter: GetItemStateParameter): GetItemStateParameterSchemaJson {
    return parameter;
}

/**
 * Construct Parameter type used in update transaction for 'getItemState' entrypoint of the 'track_and_trace' contract.
 * @param {GetItemStateParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createGetItemStateParameter(parameter: GetItemStateParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64GetItemStateParameterSchema, createGetItemStateParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'getItemState' entrypoint of the 'track_and_trace' contract.
 * @param {GetItemStateParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createGetItemStateParameterWebWallet(parameter: GetItemStateParameter) {
    return {
        parameters: createGetItemStateParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64GetItemStateParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'getItemState' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {GetItemStateParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendGetItemState(contractClient: TrackAndTraceContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: GetItemStateParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('getItemState'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createGetItemStateParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'getItemState' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {GetItemStateParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunGetItemState(contractClient: TrackAndTraceContract, parameter: GetItemStateParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('getItemState'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createGetItemStateParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'getItemState' entrypoint of the 'track_and_trace' contract. */
export type ReturnValueGetItemState = {
    status: { type: 'Produced'} | { type: 'InTransit'} | { type: 'InStore'} | { type: 'Sold'},
    metadata_url: { type: 'None'} | { type: 'Some', content: {
    url: string,
    hash: { type: 'None'} | { type: 'Some', content: SDK.HexString },
    } },
    };

/**
 * Get and parse the return value from dry-running update transaction for 'getItemState' entrypoint of the 'track_and_trace' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueGetItemState | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueGetItemState(invokeResult: SDK.InvokeContractResult): ReturnValueGetItemState | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{
    status: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] },
    metadata_url: {'None' : [] } | {'Some' : [{
    url: string,
    hash: {'None' : [] } | {'Some' : [string] },
    }] },
    }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FAACAAAABgAAAHN0YXR1cxUEAAAACAAAAFByb2R1Y2VkAgkAAABJblRyYW5zaXQCBwAAAEluU3RvcmUCBAAAAFNvbGQCDAAAAG1ldGFkYXRhX3VybBUCAAAABAAAAE5vbmUCBAAAAFNvbWUBAQAAABQAAgAAAAMAAAB1cmwWAQQAAABoYXNoFQIAAAAEAAAATm9uZQIEAAAAU29tZQEBAAAAHiAAAAA=');
    const field79 = schemaJson.status;
    let match80: { type: 'Produced'} | { type: 'InTransit'} | { type: 'InStore'} | { type: 'Sold'};
    if ('Produced' in field79) {
       match80 = {
           type: 'Produced',
       };
    } else if ('InTransit' in field79) {
       match80 = {
           type: 'InTransit',
       };
    } else if ('InStore' in field79) {
       match80 = {
           type: 'InStore',
       };
    } else if ('Sold' in field79) {
       match80 = {
           type: 'Sold',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    const field85 = schemaJson.metadata_url;
    let match86: { type: 'None'} | { type: 'Some', content: {
    url: string,
    hash: { type: 'None'} | { type: 'Some', content: SDK.HexString },
    } };
    if ('None' in field85) {
       match86 = {
           type: 'None',
       };
    } else if ('Some' in field85) {
       const variant88 = field85.Some;
    const field89 = variant88[0].url;
    const field90 = variant88[0].hash;
    let match91: { type: 'None'} | { type: 'Some', content: SDK.HexString };
    if ('None' in field90) {
       match91 = {
           type: 'None',
       };
    } else if ('Some' in field90) {
       const variant93 = field90.Some;
       match91 = {
           type: 'Some',
           content: variant93[0],
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named94 = {
    url: field89,
    hash: match91,
    };
       match86 = {
           type: 'Some',
           content: named94,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    const named95 = {
    status: match80,
    metadata_url: match86,
    };
    return named95;
}
/** Base64 encoding of the parameter schema type for update transactions to 'createItem' entrypoint of the 'track_and_trace' contract. */
const base64CreateItemParameterSchema = 'FQIAAAAEAAAATm9uZQIEAAAAU29tZQEBAAAAFAACAAAAAwAAAHVybBYBBAAAAGhhc2gVAgAAAAQAAABOb25lAgQAAABTb21lAQEAAAAeIAAAAA==';
/** Parameter JSON type needed by the schema for update transaction for 'createItem' entrypoint of the 'track_and_trace' contract. */
type CreateItemParameterSchemaJson = {'None' : [] } | {'Some' : [{
    url: string,
    hash: {'None' : [] } | {'Some' : [string] },
    }] };
/** Parameter type for update transaction for 'createItem' entrypoint of the 'track_and_trace' contract. */
export type CreateItemParameter = { type: 'None'} | { type: 'Some', content: {
    url: string,
    hash: { type: 'None'} | { type: 'Some', content: SDK.HexString },
    } };

/**
 * Construct schema JSON representation used in update transaction for 'createItem' entrypoint of the 'track_and_trace' contract.
 * @param {CreateItemParameter} parameter The structured parameter to construct from.
 * @returns {CreateItemParameterSchemaJson} The smart contract parameter JSON.
 */
function createCreateItemParameterSchemaJson(parameter: CreateItemParameter): CreateItemParameterSchemaJson {
    let match96: {'None' : [] } | {'Some' : [{
    url: string,
    hash: {'None' : [] } | {'Some' : [string] },
    }] };
    switch (parameter.type) {
        case 'None':
            match96 = { None: [], };
        break;
        case 'Some':
    const field98 = parameter.content.url;
    const field99 = parameter.content.hash;
    let match100: {'None' : [] } | {'Some' : [string] };
    switch (field99.type) {
        case 'None':
            match100 = { None: [], };
        break;
        case 'Some':
            match100 = { Some: [field99.content], };
        break;
    }

    const named97 = {
    url: field98,
    hash: match100,
    };
            match96 = { Some: [named97], };
        break;
    }

    return match96;
}

/**
 * Construct Parameter type used in update transaction for 'createItem' entrypoint of the 'track_and_trace' contract.
 * @param {CreateItemParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createCreateItemParameter(parameter: CreateItemParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64CreateItemParameterSchema, createCreateItemParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'createItem' entrypoint of the 'track_and_trace' contract.
 * @param {CreateItemParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createCreateItemParameterWebWallet(parameter: CreateItemParameter) {
    return {
        parameters: createCreateItemParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64CreateItemParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'createItem' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {CreateItemParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendCreateItem(contractClient: TrackAndTraceContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: CreateItemParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('createItem'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createCreateItemParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'createItem' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {CreateItemParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunCreateItem(contractClient: TrackAndTraceContract, parameter: CreateItemParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('createItem'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createCreateItemParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'createItem' entrypoint of the 'track_and_trace' contract. */
export type ErrorMessageCreateItem = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};

/**
 * Get and parse the error message from dry-running update transaction for 'createItem' entrypoint of the 'track_and_trace' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageCreateItem | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageCreateItem(invokeResult: SDK.InvokeContractResult): ErrorMessageCreateItem | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] } | {'Unsuccessful' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRAAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCDAAAAFVuc3VjY2Vzc2Z1bAI=');
    let match101: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};
    if ('ParseParams' in schemaJson) {
       match101 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match101 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match101 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match101 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match101 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match101 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match101 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match101 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match101 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match101 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match101 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match101 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match101 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match101 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match101 = {
           type: 'Expired',
       };
    } else if ('Unsuccessful' in schemaJson) {
       match101 = {
           type: 'Unsuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match101
}
/** Base64 encoding of the parameter schema type for update transactions to 'changeItemStatus' entrypoint of the 'track_and_trace' contract. */
const base64ChangeItemStatusParameterSchema = 'FAADAAAABwAAAGl0ZW1faWQdAAoAAABuZXdfc3RhdHVzFQQAAAAIAAAAUHJvZHVjZWQCCQAAAEluVHJhbnNpdAIHAAAASW5TdG9yZQIEAAAAU29sZAIPAAAAYWRkaXRpb25hbF9kYXRhFAABAAAABQAAAGJ5dGVzEAIC';
/** Parameter JSON type needed by the schema for update transaction for 'changeItemStatus' entrypoint of the 'track_and_trace' contract. */
type ChangeItemStatusParameterSchemaJson = {
    item_id: string,
    new_status: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] },
    additional_data: {
    bytes: Array<number>,
    },
    };
/** Parameter type for update transaction for 'changeItemStatus' entrypoint of the 'track_and_trace' contract. */
export type ChangeItemStatusParameter = {
    item_id: SDK.HexString,
    new_status: { type: 'Produced'} | { type: 'InTransit'} | { type: 'InStore'} | { type: 'Sold'},
    additional_data: {
    bytes: Array<number>,
    },
    };

/**
 * Construct schema JSON representation used in update transaction for 'changeItemStatus' entrypoint of the 'track_and_trace' contract.
 * @param {ChangeItemStatusParameter} parameter The structured parameter to construct from.
 * @returns {ChangeItemStatusParameterSchemaJson} The smart contract parameter JSON.
 */
function createChangeItemStatusParameterSchemaJson(parameter: ChangeItemStatusParameter): ChangeItemStatusParameterSchemaJson {
    const field119 = parameter.item_id;
    const field120 = parameter.new_status;
    let match121: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] };
    switch (field120.type) {
        case 'Produced':
            match121 = { Produced: [], };
        break;
        case 'InTransit':
            match121 = { InTransit: [], };
        break;
        case 'InStore':
            match121 = { InStore: [], };
        break;
        case 'Sold':
            match121 = { Sold: [], };
        break;
    }

    const field122 = parameter.additional_data;
    const field124 = field122.bytes;
    const named123 = {
    bytes: field124,
    };
    const named118 = {
    item_id: field119,
    new_status: match121,
    additional_data: named123,
    };
    return named118;
}

/**
 * Construct Parameter type used in update transaction for 'changeItemStatus' entrypoint of the 'track_and_trace' contract.
 * @param {ChangeItemStatusParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createChangeItemStatusParameter(parameter: ChangeItemStatusParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64ChangeItemStatusParameterSchema, createChangeItemStatusParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'changeItemStatus' entrypoint of the 'track_and_trace' contract.
 * @param {ChangeItemStatusParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createChangeItemStatusParameterWebWallet(parameter: ChangeItemStatusParameter) {
    return {
        parameters: createChangeItemStatusParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64ChangeItemStatusParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'changeItemStatus' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {ChangeItemStatusParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendChangeItemStatus(contractClient: TrackAndTraceContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: ChangeItemStatusParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('changeItemStatus'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createChangeItemStatusParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'changeItemStatus' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {ChangeItemStatusParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunChangeItemStatus(contractClient: TrackAndTraceContract, parameter: ChangeItemStatusParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('changeItemStatus'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createChangeItemStatusParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'changeItemStatus' entrypoint of the 'track_and_trace' contract. */
export type ErrorMessageChangeItemStatus = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};

/**
 * Get and parse the error message from dry-running update transaction for 'changeItemStatus' entrypoint of the 'track_and_trace' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageChangeItemStatus | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageChangeItemStatus(invokeResult: SDK.InvokeContractResult): ErrorMessageChangeItemStatus | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] } | {'Unsuccessful' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRAAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCDAAAAFVuc3VjY2Vzc2Z1bAI=');
    let match127: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};
    if ('ParseParams' in schemaJson) {
       match127 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match127 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match127 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match127 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match127 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match127 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match127 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match127 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match127 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match127 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match127 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match127 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match127 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match127 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match127 = {
           type: 'Expired',
       };
    } else if ('Unsuccessful' in schemaJson) {
       match127 = {
           type: 'Unsuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match127
}
/** Base64 encoding of the parameter schema type for update transactions to 'updateStateMachine' entrypoint of the 'track_and_trace' contract. */
const base64UpdateStateMachineParameterSchema = 'FAAEAAAABwAAAGFkZHJlc3MLCwAAAGZyb21fc3RhdHVzFQQAAAAIAAAAUHJvZHVjZWQCCQAAAEluVHJhbnNpdAIHAAAASW5TdG9yZQIEAAAAU29sZAIJAAAAdG9fc3RhdHVzFQQAAAAIAAAAUHJvZHVjZWQCCQAAAEluVHJhbnNpdAIHAAAASW5TdG9yZQIEAAAAU29sZAIGAAAAdXBkYXRlFQIAAAAGAAAAUmVtb3ZlAgMAAABBZGQC';
/** Parameter JSON type needed by the schema for update transaction for 'updateStateMachine' entrypoint of the 'track_and_trace' contract. */
type UpdateStateMachineParameterSchemaJson = {
    address: SDK.AccountAddress.SchemaValue,
    from_status: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] },
    to_status: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] },
    update: {'Remove' : [] } | {'Add' : [] },
    };
/** Parameter type for update transaction for 'updateStateMachine' entrypoint of the 'track_and_trace' contract. */
export type UpdateStateMachineParameter = {
    address: SDK.AccountAddress.Type,
    from_status: { type: 'Produced'} | { type: 'InTransit'} | { type: 'InStore'} | { type: 'Sold'},
    to_status: { type: 'Produced'} | { type: 'InTransit'} | { type: 'InStore'} | { type: 'Sold'},
    update: { type: 'Remove'} | { type: 'Add'},
    };

/**
 * Construct schema JSON representation used in update transaction for 'updateStateMachine' entrypoint of the 'track_and_trace' contract.
 * @param {UpdateStateMachineParameter} parameter The structured parameter to construct from.
 * @returns {UpdateStateMachineParameterSchemaJson} The smart contract parameter JSON.
 */
function createUpdateStateMachineParameterSchemaJson(parameter: UpdateStateMachineParameter): UpdateStateMachineParameterSchemaJson {
    const field145 = parameter.address;
    const accountAddress146 = SDK.AccountAddress.toSchemaValue(field145);
    const field147 = parameter.from_status;
    let match148: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] };
    switch (field147.type) {
        case 'Produced':
            match148 = { Produced: [], };
        break;
        case 'InTransit':
            match148 = { InTransit: [], };
        break;
        case 'InStore':
            match148 = { InStore: [], };
        break;
        case 'Sold':
            match148 = { Sold: [], };
        break;
    }

    const field149 = parameter.to_status;
    let match150: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] };
    switch (field149.type) {
        case 'Produced':
            match150 = { Produced: [], };
        break;
        case 'InTransit':
            match150 = { InTransit: [], };
        break;
        case 'InStore':
            match150 = { InStore: [], };
        break;
        case 'Sold':
            match150 = { Sold: [], };
        break;
    }

    const field151 = parameter.update;
    let match152: {'Remove' : [] } | {'Add' : [] };
    switch (field151.type) {
        case 'Remove':
            match152 = { Remove: [], };
        break;
        case 'Add':
            match152 = { Add: [], };
        break;
    }

    const named144 = {
    address: accountAddress146,
    from_status: match148,
    to_status: match150,
    update: match152,
    };
    return named144;
}

/**
 * Construct Parameter type used in update transaction for 'updateStateMachine' entrypoint of the 'track_and_trace' contract.
 * @param {UpdateStateMachineParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createUpdateStateMachineParameter(parameter: UpdateStateMachineParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64UpdateStateMachineParameterSchema, createUpdateStateMachineParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'updateStateMachine' entrypoint of the 'track_and_trace' contract.
 * @param {UpdateStateMachineParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createUpdateStateMachineParameterWebWallet(parameter: UpdateStateMachineParameter) {
    return {
        parameters: createUpdateStateMachineParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64UpdateStateMachineParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'updateStateMachine' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {UpdateStateMachineParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendUpdateStateMachine(contractClient: TrackAndTraceContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: UpdateStateMachineParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('updateStateMachine'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createUpdateStateMachineParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'updateStateMachine' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {UpdateStateMachineParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunUpdateStateMachine(contractClient: TrackAndTraceContract, parameter: UpdateStateMachineParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('updateStateMachine'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createUpdateStateMachineParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'updateStateMachine' entrypoint of the 'track_and_trace' contract. */
export type ErrorMessageUpdateStateMachine = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};

/**
 * Get and parse the error message from dry-running update transaction for 'updateStateMachine' entrypoint of the 'track_and_trace' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageUpdateStateMachine | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageUpdateStateMachine(invokeResult: SDK.InvokeContractResult): ErrorMessageUpdateStateMachine | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] } | {'Unsuccessful' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRAAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCDAAAAFVuc3VjY2Vzc2Z1bAI=');
    let match153: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};
    if ('ParseParams' in schemaJson) {
       match153 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match153 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match153 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match153 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match153 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match153 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match153 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match153 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match153 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match153 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match153 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match153 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match153 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match153 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match153 = {
           type: 'Expired',
       };
    } else if ('Unsuccessful' in schemaJson) {
       match153 = {
           type: 'Unsuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match153
}
/** Base64 encoding of the parameter schema type for update transactions to 'grantRole' entrypoint of the 'track_and_trace' contract. */
const base64GrantRoleParameterSchema = 'FAACAAAABwAAAGFkZHJlc3MVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMBAAAAHJvbGUVAQAAAAUAAABBZG1pbgI=';
/** Parameter JSON type needed by the schema for update transaction for 'grantRole' entrypoint of the 'track_and_trace' contract. */
type GrantRoleParameterSchemaJson = {
    address: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    role: {'Admin' : [] },
    };
/** Parameter type for update transaction for 'grantRole' entrypoint of the 'track_and_trace' contract. */
export type GrantRoleParameter = {
    address: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    role: { type: 'Admin'},
    };

/**
 * Construct schema JSON representation used in update transaction for 'grantRole' entrypoint of the 'track_and_trace' contract.
 * @param {GrantRoleParameter} parameter The structured parameter to construct from.
 * @returns {GrantRoleParameterSchemaJson} The smart contract parameter JSON.
 */
function createGrantRoleParameterSchemaJson(parameter: GrantRoleParameter): GrantRoleParameterSchemaJson {
    const field171 = parameter.address;
    let match172: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field171.type) {
        case 'Account':
    const accountAddress173 = SDK.AccountAddress.toSchemaValue(field171.content);
            match172 = { Account: [accountAddress173], };
        break;
        case 'Contract':
    const contractAddress174 = SDK.ContractAddress.toSchemaValue(field171.content);
            match172 = { Contract: [contractAddress174], };
        break;
    }

    const field175 = parameter.role;
    let match176: {'Admin' : [] };
    switch (field175.type) {
        case 'Admin':
            match176 = { Admin: [], };
        break;
    }

    const named170 = {
    address: match172,
    role: match176,
    };
    return named170;
}

/**
 * Construct Parameter type used in update transaction for 'grantRole' entrypoint of the 'track_and_trace' contract.
 * @param {GrantRoleParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createGrantRoleParameter(parameter: GrantRoleParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64GrantRoleParameterSchema, createGrantRoleParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'grantRole' entrypoint of the 'track_and_trace' contract.
 * @param {GrantRoleParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createGrantRoleParameterWebWallet(parameter: GrantRoleParameter) {
    return {
        parameters: createGrantRoleParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64GrantRoleParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'grantRole' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {GrantRoleParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendGrantRole(contractClient: TrackAndTraceContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: GrantRoleParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('grantRole'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createGrantRoleParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'grantRole' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {GrantRoleParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunGrantRole(contractClient: TrackAndTraceContract, parameter: GrantRoleParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('grantRole'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createGrantRoleParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'grantRole' entrypoint of the 'track_and_trace' contract. */
export type ErrorMessageGrantRole = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};

/**
 * Get and parse the error message from dry-running update transaction for 'grantRole' entrypoint of the 'track_and_trace' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageGrantRole | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageGrantRole(invokeResult: SDK.InvokeContractResult): ErrorMessageGrantRole | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] } | {'Unsuccessful' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRAAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCDAAAAFVuc3VjY2Vzc2Z1bAI=');
    let match177: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};
    if ('ParseParams' in schemaJson) {
       match177 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match177 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match177 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match177 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match177 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match177 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match177 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match177 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match177 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match177 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match177 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match177 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match177 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match177 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match177 = {
           type: 'Expired',
       };
    } else if ('Unsuccessful' in schemaJson) {
       match177 = {
           type: 'Unsuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match177
}
/** Base64 encoding of the parameter schema type for update transactions to 'revokeRole' entrypoint of the 'track_and_trace' contract. */
const base64RevokeRoleParameterSchema = 'FAACAAAABwAAAGFkZHJlc3MVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMBAAAAHJvbGUVAQAAAAUAAABBZG1pbgI=';
/** Parameter JSON type needed by the schema for update transaction for 'revokeRole' entrypoint of the 'track_and_trace' contract. */
type RevokeRoleParameterSchemaJson = {
    address: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    role: {'Admin' : [] },
    };
/** Parameter type for update transaction for 'revokeRole' entrypoint of the 'track_and_trace' contract. */
export type RevokeRoleParameter = {
    address: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    role: { type: 'Admin'},
    };

/**
 * Construct schema JSON representation used in update transaction for 'revokeRole' entrypoint of the 'track_and_trace' contract.
 * @param {RevokeRoleParameter} parameter The structured parameter to construct from.
 * @returns {RevokeRoleParameterSchemaJson} The smart contract parameter JSON.
 */
function createRevokeRoleParameterSchemaJson(parameter: RevokeRoleParameter): RevokeRoleParameterSchemaJson {
    const field195 = parameter.address;
    let match196: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field195.type) {
        case 'Account':
    const accountAddress197 = SDK.AccountAddress.toSchemaValue(field195.content);
            match196 = { Account: [accountAddress197], };
        break;
        case 'Contract':
    const contractAddress198 = SDK.ContractAddress.toSchemaValue(field195.content);
            match196 = { Contract: [contractAddress198], };
        break;
    }

    const field199 = parameter.role;
    let match200: {'Admin' : [] };
    switch (field199.type) {
        case 'Admin':
            match200 = { Admin: [], };
        break;
    }

    const named194 = {
    address: match196,
    role: match200,
    };
    return named194;
}

/**
 * Construct Parameter type used in update transaction for 'revokeRole' entrypoint of the 'track_and_trace' contract.
 * @param {RevokeRoleParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createRevokeRoleParameter(parameter: RevokeRoleParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64RevokeRoleParameterSchema, createRevokeRoleParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'revokeRole' entrypoint of the 'track_and_trace' contract.
 * @param {RevokeRoleParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createRevokeRoleParameterWebWallet(parameter: RevokeRoleParameter) {
    return {
        parameters: createRevokeRoleParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64RevokeRoleParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'revokeRole' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {RevokeRoleParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendRevokeRole(contractClient: TrackAndTraceContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: RevokeRoleParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('revokeRole'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createRevokeRoleParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'revokeRole' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {RevokeRoleParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunRevokeRole(contractClient: TrackAndTraceContract, parameter: RevokeRoleParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('revokeRole'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createRevokeRoleParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'revokeRole' entrypoint of the 'track_and_trace' contract. */
export type ErrorMessageRevokeRole = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};

/**
 * Get and parse the error message from dry-running update transaction for 'revokeRole' entrypoint of the 'track_and_trace' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageRevokeRole | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageRevokeRole(invokeResult: SDK.InvokeContractResult): ErrorMessageRevokeRole | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] } | {'Unsuccessful' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRAAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCDAAAAFVuc3VjY2Vzc2Z1bAI=');
    let match201: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};
    if ('ParseParams' in schemaJson) {
       match201 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match201 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match201 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match201 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match201 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match201 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match201 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match201 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match201 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match201 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match201 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match201 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match201 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match201 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match201 = {
           type: 'Expired',
       };
    } else if ('Unsuccessful' in schemaJson) {
       match201 = {
           type: 'Unsuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match201
}
/** Base64 encoding of the parameter schema type for update transactions to 'permit' entrypoint of the 'track_and_trace' contract. */
const base64PermitParameterSchema = 'FAADAAAACQAAAHNpZ25hdHVyZRIAAhIAAhUBAAAABwAAAEVkMjU1MTkBAQAAAB5AAAAABgAAAHNpZ25lcgsHAAAAbWVzc2FnZRQABQAAABAAAABjb250cmFjdF9hZGRyZXNzDAUAAABub25jZQUJAAAAdGltZXN0YW1wDQsAAABlbnRyeV9wb2ludBYBBwAAAHBheWxvYWQQAQI=';
/** Parameter JSON type needed by the schema for update transaction for 'permit' entrypoint of the 'track_and_trace' contract. */
type PermitParameterSchemaJson = {
    signature: [number, [number, {'Ed25519' : [string] }][]][],
    signer: SDK.AccountAddress.SchemaValue,
    message: {
    contract_address: SDK.ContractAddress.SchemaValue,
    nonce: bigint,
    timestamp: SDK.Timestamp.SchemaValue,
    entry_point: string,
    payload: Array<number>,
    },
    };
/** Parameter type for update transaction for 'permit' entrypoint of the 'track_and_trace' contract. */
export type PermitParameter = {
    signature: Map<number, Map<number, { type: 'Ed25519', content: SDK.HexString }>>,
    signer: SDK.AccountAddress.Type,
    message: {
    contract_address: SDK.ContractAddress.Type,
    nonce: number | bigint,
    timestamp: SDK.Timestamp.Type,
    entry_point: string,
    payload: Array<number>,
    },
    };

/**
 * Construct schema JSON representation used in update transaction for 'permit' entrypoint of the 'track_and_trace' contract.
 * @param {PermitParameter} parameter The structured parameter to construct from.
 * @returns {PermitParameterSchemaJson} The smart contract parameter JSON.
 */
function createPermitParameterSchemaJson(parameter: PermitParameter): PermitParameterSchemaJson {
    const field219 = parameter.signature;
    const map220: [number, [number, {'Ed25519' : [string] }][]][] = [...field219.entries()].map(([key221, value222]) => {
    const map223: [number, {'Ed25519' : [string] }][] = [...value222.entries()].map(([key224, value225]) => {
    let match226: {'Ed25519' : [string] };
    switch (value225.type) {
        case 'Ed25519':
            match226 = { Ed25519: [value225.content], };
        break;
    }

        return [key224, match226];
    });
        return [key221, map223];
    });
    const field227 = parameter.signer;
    const accountAddress228 = SDK.AccountAddress.toSchemaValue(field227);
    const field229 = parameter.message;
    const field231 = field229.contract_address;
    const contractAddress232 = SDK.ContractAddress.toSchemaValue(field231);
    const field233 = field229.nonce;
    const number234 = BigInt(field233);
    const field235 = field229.timestamp;
    const timestamp236 = SDK.Timestamp.toSchemaValue(field235);
    const field237 = field229.entry_point;
    const field238 = field229.payload;
    const named230 = {
    contract_address: contractAddress232,
    nonce: number234,
    timestamp: timestamp236,
    entry_point: field237,
    payload: field238,
    };
    const named218 = {
    signature: map220,
    signer: accountAddress228,
    message: named230,
    };
    return named218;
}

/**
 * Construct Parameter type used in update transaction for 'permit' entrypoint of the 'track_and_trace' contract.
 * @param {PermitParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createPermitParameter(parameter: PermitParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64PermitParameterSchema, createPermitParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'permit' entrypoint of the 'track_and_trace' contract.
 * @param {PermitParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createPermitParameterWebWallet(parameter: PermitParameter) {
    return {
        parameters: createPermitParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64PermitParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'permit' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {PermitParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendPermit(contractClient: TrackAndTraceContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: PermitParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('permit'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createPermitParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'permit' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {PermitParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunPermit(contractClient: TrackAndTraceContract, parameter: PermitParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('permit'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createPermitParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'permit' entrypoint of the 'track_and_trace' contract. */
export type ErrorMessagePermit = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};

/**
 * Get and parse the error message from dry-running update transaction for 'permit' entrypoint of the 'track_and_trace' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessagePermit | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessagePermit(invokeResult: SDK.InvokeContractResult): ErrorMessagePermit | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] } | {'Unsuccessful' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRAAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCDAAAAFVuc3VjY2Vzc2Z1bAI=');
    let match241: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};
    if ('ParseParams' in schemaJson) {
       match241 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match241 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match241 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match241 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match241 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match241 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match241 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match241 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match241 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match241 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match241 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match241 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match241 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match241 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match241 = {
           type: 'Expired',
       };
    } else if ('Unsuccessful' in schemaJson) {
       match241 = {
           type: 'Unsuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match241
}
/** Base64 encoding of the parameter schema type for update transactions to 'viewMessageHash' entrypoint of the 'track_and_trace' contract. */
const base64ViewMessageHashParameterSchema = 'FAADAAAACQAAAHNpZ25hdHVyZRIAAhIAAhUBAAAABwAAAEVkMjU1MTkBAQAAAB5AAAAABgAAAHNpZ25lcgsHAAAAbWVzc2FnZRQABQAAABAAAABjb250cmFjdF9hZGRyZXNzDAUAAABub25jZQUJAAAAdGltZXN0YW1wDQsAAABlbnRyeV9wb2ludBYBBwAAAHBheWxvYWQQAQI=';
/** Parameter JSON type needed by the schema for update transaction for 'viewMessageHash' entrypoint of the 'track_and_trace' contract. */
type ViewMessageHashParameterSchemaJson = {
    signature: [number, [number, {'Ed25519' : [string] }][]][],
    signer: SDK.AccountAddress.SchemaValue,
    message: {
    contract_address: SDK.ContractAddress.SchemaValue,
    nonce: bigint,
    timestamp: SDK.Timestamp.SchemaValue,
    entry_point: string,
    payload: Array<number>,
    },
    };
/** Parameter type for update transaction for 'viewMessageHash' entrypoint of the 'track_and_trace' contract. */
export type ViewMessageHashParameter = {
    signature: Map<number, Map<number, { type: 'Ed25519', content: SDK.HexString }>>,
    signer: SDK.AccountAddress.Type,
    message: {
    contract_address: SDK.ContractAddress.Type,
    nonce: number | bigint,
    timestamp: SDK.Timestamp.Type,
    entry_point: string,
    payload: Array<number>,
    },
    };

/**
 * Construct schema JSON representation used in update transaction for 'viewMessageHash' entrypoint of the 'track_and_trace' contract.
 * @param {ViewMessageHashParameter} parameter The structured parameter to construct from.
 * @returns {ViewMessageHashParameterSchemaJson} The smart contract parameter JSON.
 */
function createViewMessageHashParameterSchemaJson(parameter: ViewMessageHashParameter): ViewMessageHashParameterSchemaJson {
    const field259 = parameter.signature;
    const map260: [number, [number, {'Ed25519' : [string] }][]][] = [...field259.entries()].map(([key261, value262]) => {
    const map263: [number, {'Ed25519' : [string] }][] = [...value262.entries()].map(([key264, value265]) => {
    let match266: {'Ed25519' : [string] };
    switch (value265.type) {
        case 'Ed25519':
            match266 = { Ed25519: [value265.content], };
        break;
    }

        return [key264, match266];
    });
        return [key261, map263];
    });
    const field267 = parameter.signer;
    const accountAddress268 = SDK.AccountAddress.toSchemaValue(field267);
    const field269 = parameter.message;
    const field271 = field269.contract_address;
    const contractAddress272 = SDK.ContractAddress.toSchemaValue(field271);
    const field273 = field269.nonce;
    const number274 = BigInt(field273);
    const field275 = field269.timestamp;
    const timestamp276 = SDK.Timestamp.toSchemaValue(field275);
    const field277 = field269.entry_point;
    const field278 = field269.payload;
    const named270 = {
    contract_address: contractAddress272,
    nonce: number274,
    timestamp: timestamp276,
    entry_point: field277,
    payload: field278,
    };
    const named258 = {
    signature: map260,
    signer: accountAddress268,
    message: named270,
    };
    return named258;
}

/**
 * Construct Parameter type used in update transaction for 'viewMessageHash' entrypoint of the 'track_and_trace' contract.
 * @param {ViewMessageHashParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createViewMessageHashParameter(parameter: ViewMessageHashParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64ViewMessageHashParameterSchema, createViewMessageHashParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'viewMessageHash' entrypoint of the 'track_and_trace' contract.
 * @param {ViewMessageHashParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createViewMessageHashParameterWebWallet(parameter: ViewMessageHashParameter) {
    return {
        parameters: createViewMessageHashParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64ViewMessageHashParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'viewMessageHash' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {ViewMessageHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendViewMessageHash(contractClient: TrackAndTraceContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: ViewMessageHashParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('viewMessageHash'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createViewMessageHashParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'viewMessageHash' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {ViewMessageHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunViewMessageHash(contractClient: TrackAndTraceContract, parameter: ViewMessageHashParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('viewMessageHash'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createViewMessageHashParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'viewMessageHash' entrypoint of the 'track_and_trace' contract. */
export type ReturnValueViewMessageHash = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];

/**
 * Get and parse the return value from dry-running update transaction for 'viewMessageHash' entrypoint of the 'track_and_trace' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueViewMessageHash | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueViewMessageHash(invokeResult: SDK.InvokeContractResult): ReturnValueViewMessageHash | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <[number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EyAAAAAC');
    return schemaJson;
}

/** Error message for dry-running update transaction for 'viewMessageHash' entrypoint of the 'track_and_trace' contract. */
export type ErrorMessageViewMessageHash = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};

/**
 * Get and parse the error message from dry-running update transaction for 'viewMessageHash' entrypoint of the 'track_and_trace' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageViewMessageHash | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageViewMessageHash(invokeResult: SDK.InvokeContractResult): ErrorMessageViewMessageHash | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] } | {'Unsuccessful' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRAAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCDAAAAFVuc3VjY2Vzc2Z1bAI=');
    let match283: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};
    if ('ParseParams' in schemaJson) {
       match283 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match283 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match283 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match283 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match283 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match283 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match283 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match283 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match283 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match283 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match283 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match283 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match283 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match283 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match283 = {
           type: 'Expired',
       };
    } else if ('Unsuccessful' in schemaJson) {
       match283 = {
           type: 'Unsuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match283
}
/** Base64 encoding of the parameter schema type for update transactions to 'supports' entrypoint of the 'track_and_trace' contract. */
const base64SupportsParameterSchema = 'EAEWAA==';
/** Parameter JSON type needed by the schema for update transaction for 'supports' entrypoint of the 'track_and_trace' contract. */
type SupportsParameterSchemaJson = Array<string>;
/** Parameter type for update transaction for 'supports' entrypoint of the 'track_and_trace' contract. */
export type SupportsParameter = Array<string>;

/**
 * Construct schema JSON representation used in update transaction for 'supports' entrypoint of the 'track_and_trace' contract.
 * @param {SupportsParameter} parameter The structured parameter to construct from.
 * @returns {SupportsParameterSchemaJson} The smart contract parameter JSON.
 */
function createSupportsParameterSchemaJson(parameter: SupportsParameter): SupportsParameterSchemaJson {
    return parameter;
}

/**
 * Construct Parameter type used in update transaction for 'supports' entrypoint of the 'track_and_trace' contract.
 * @param {SupportsParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createSupportsParameter(parameter: SupportsParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64SupportsParameterSchema, createSupportsParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'supports' entrypoint of the 'track_and_trace' contract.
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
 * Send an update-contract transaction to the 'supports' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SupportsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendSupports(contractClient: TrackAndTraceContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: SupportsParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('supports'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createSupportsParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'supports' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SupportsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunSupports(contractClient: TrackAndTraceContract, parameter: SupportsParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('supports'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createSupportsParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'supports' entrypoint of the 'track_and_trace' contract. */
export type ReturnValueSupports = Array<{ type: 'NoSupport'} | { type: 'Support'} | { type: 'SupportBy', content: Array<SDK.ContractAddress.Type> }>;

/**
 * Get and parse the return value from dry-running update transaction for 'supports' entrypoint of the 'track_and_trace' contract.
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
    const list302 = schemaJson.map((item303) => {
    let match304: { type: 'NoSupport'} | { type: 'Support'} | { type: 'SupportBy', content: Array<SDK.ContractAddress.Type> };
    if ('NoSupport' in item303) {
       match304 = {
           type: 'NoSupport',
       };
    } else if ('Support' in item303) {
       match304 = {
           type: 'Support',
       };
    } else if ('SupportBy' in item303) {
       const variant307 = item303.SupportBy;
    const list308 = variant307[0].map((item309) => {
    const contractAddress310 = SDK.ContractAddress.fromSchemaValue(item309);
    return contractAddress310;
    });
       match304 = {
           type: 'SupportBy',
           content: list308,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match304;
    });
    return list302;
}

/** Error message for dry-running update transaction for 'supports' entrypoint of the 'track_and_trace' contract. */
export type ErrorMessageSupports = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};

/**
 * Get and parse the error message from dry-running update transaction for 'supports' entrypoint of the 'track_and_trace' contract.
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

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] } | {'Unsuccessful' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRAAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCDAAAAFVuc3VjY2Vzc2Z1bAI=');
    let match311: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};
    if ('ParseParams' in schemaJson) {
       match311 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match311 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match311 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match311 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match311 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match311 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match311 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match311 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match311 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match311 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match311 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match311 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match311 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match311 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match311 = {
           type: 'Expired',
       };
    } else if ('Unsuccessful' in schemaJson) {
       match311 = {
           type: 'Unsuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match311
}
/** Base64 encoding of the parameter schema type for update transactions to 'supportsPermit' entrypoint of the 'track_and_trace' contract. */
const base64SupportsPermitParameterSchema = 'FAABAAAABwAAAHF1ZXJpZXMQARYB';
/** Parameter JSON type needed by the schema for update transaction for 'supportsPermit' entrypoint of the 'track_and_trace' contract. */
type SupportsPermitParameterSchemaJson = {
    queries: Array<string>,
    };
/** Parameter type for update transaction for 'supportsPermit' entrypoint of the 'track_and_trace' contract. */
export type SupportsPermitParameter = {
    queries: Array<string>,
    };

/**
 * Construct schema JSON representation used in update transaction for 'supportsPermit' entrypoint of the 'track_and_trace' contract.
 * @param {SupportsPermitParameter} parameter The structured parameter to construct from.
 * @returns {SupportsPermitParameterSchemaJson} The smart contract parameter JSON.
 */
function createSupportsPermitParameterSchemaJson(parameter: SupportsPermitParameter): SupportsPermitParameterSchemaJson {
    const field329 = parameter.queries;
    const named328 = {
    queries: field329,
    };
    return named328;
}

/**
 * Construct Parameter type used in update transaction for 'supportsPermit' entrypoint of the 'track_and_trace' contract.
 * @param {SupportsPermitParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createSupportsPermitParameter(parameter: SupportsPermitParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64SupportsPermitParameterSchema, createSupportsPermitParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'supportsPermit' entrypoint of the 'track_and_trace' contract.
 * @param {SupportsPermitParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createSupportsPermitParameterWebWallet(parameter: SupportsPermitParameter) {
    return {
        parameters: createSupportsPermitParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64SupportsPermitParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'supportsPermit' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SupportsPermitParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendSupportsPermit(contractClient: TrackAndTraceContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: SupportsPermitParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('supportsPermit'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createSupportsPermitParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'supportsPermit' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SupportsPermitParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunSupportsPermit(contractClient: TrackAndTraceContract, parameter: SupportsPermitParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('supportsPermit'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createSupportsPermitParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'supportsPermit' entrypoint of the 'track_and_trace' contract. */
export type ReturnValueSupportsPermit = Array<{ type: 'NoSupport'} | { type: 'Support'} | { type: 'SupportBy', content: Array<SDK.ContractAddress.Type> }>;

/**
 * Get and parse the return value from dry-running update transaction for 'supportsPermit' entrypoint of the 'track_and_trace' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueSupportsPermit | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueSupportsPermit(invokeResult: SDK.InvokeContractResult): ReturnValueSupportsPermit | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <Array<{'NoSupport' : [] } | {'Support' : [] } | {'SupportBy' : [Array<SDK.ContractAddress.SchemaValue>] }>>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAEVAwAAAAkAAABOb1N1cHBvcnQCBwAAAFN1cHBvcnQCCQAAAFN1cHBvcnRCeQEBAAAAEAAM');
    const list332 = schemaJson.map((item333) => {
    let match334: { type: 'NoSupport'} | { type: 'Support'} | { type: 'SupportBy', content: Array<SDK.ContractAddress.Type> };
    if ('NoSupport' in item333) {
       match334 = {
           type: 'NoSupport',
       };
    } else if ('Support' in item333) {
       match334 = {
           type: 'Support',
       };
    } else if ('SupportBy' in item333) {
       const variant337 = item333.SupportBy;
    const list338 = variant337[0].map((item339) => {
    const contractAddress340 = SDK.ContractAddress.fromSchemaValue(item339);
    return contractAddress340;
    });
       match334 = {
           type: 'SupportBy',
           content: list338,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match334;
    });
    return list332;
}

/** Error message for dry-running update transaction for 'supportsPermit' entrypoint of the 'track_and_trace' contract. */
export type ErrorMessageSupportsPermit = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};

/**
 * Get and parse the error message from dry-running update transaction for 'supportsPermit' entrypoint of the 'track_and_trace' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageSupportsPermit | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageSupportsPermit(invokeResult: SDK.InvokeContractResult): ErrorMessageSupportsPermit | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] } | {'Unsuccessful' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRAAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCDAAAAFVuc3VjY2Vzc2Z1bAI=');
    let match341: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};
    if ('ParseParams' in schemaJson) {
       match341 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match341 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match341 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match341 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match341 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match341 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match341 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match341 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match341 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match341 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match341 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match341 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match341 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match341 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match341 = {
           type: 'Expired',
       };
    } else if ('Unsuccessful' in schemaJson) {
       match341 = {
           type: 'Unsuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match341
}
/** Base64 encoding of the parameter schema type for update transactions to 'serializationHelper' entrypoint of the 'track_and_trace' contract. */
const base64SerializationHelperParameterSchema = 'FAAFAAAAEAAAAGNvbnRyYWN0X2FkZHJlc3MMBQAAAG5vbmNlBQkAAAB0aW1lc3RhbXANCwAAAGVudHJ5X3BvaW50FgEHAAAAcGF5bG9hZBABAg==';
/** Parameter JSON type needed by the schema for update transaction for 'serializationHelper' entrypoint of the 'track_and_trace' contract. */
type SerializationHelperParameterSchemaJson = {
    contract_address: SDK.ContractAddress.SchemaValue,
    nonce: bigint,
    timestamp: SDK.Timestamp.SchemaValue,
    entry_point: string,
    payload: Array<number>,
    };
/** Parameter type for update transaction for 'serializationHelper' entrypoint of the 'track_and_trace' contract. */
export type SerializationHelperParameter = {
    contract_address: SDK.ContractAddress.Type,
    nonce: number | bigint,
    timestamp: SDK.Timestamp.Type,
    entry_point: string,
    payload: Array<number>,
    };

/**
 * Construct schema JSON representation used in update transaction for 'serializationHelper' entrypoint of the 'track_and_trace' contract.
 * @param {SerializationHelperParameter} parameter The structured parameter to construct from.
 * @returns {SerializationHelperParameterSchemaJson} The smart contract parameter JSON.
 */
function createSerializationHelperParameterSchemaJson(parameter: SerializationHelperParameter): SerializationHelperParameterSchemaJson {
    const field359 = parameter.contract_address;
    const contractAddress360 = SDK.ContractAddress.toSchemaValue(field359);
    const field361 = parameter.nonce;
    const number362 = BigInt(field361);
    const field363 = parameter.timestamp;
    const timestamp364 = SDK.Timestamp.toSchemaValue(field363);
    const field365 = parameter.entry_point;
    const field366 = parameter.payload;
    const named358 = {
    contract_address: contractAddress360,
    nonce: number362,
    timestamp: timestamp364,
    entry_point: field365,
    payload: field366,
    };
    return named358;
}

/**
 * Construct Parameter type used in update transaction for 'serializationHelper' entrypoint of the 'track_and_trace' contract.
 * @param {SerializationHelperParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createSerializationHelperParameter(parameter: SerializationHelperParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64SerializationHelperParameterSchema, createSerializationHelperParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'serializationHelper' entrypoint of the 'track_and_trace' contract.
 * @param {SerializationHelperParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createSerializationHelperParameterWebWallet(parameter: SerializationHelperParameter) {
    return {
        parameters: createSerializationHelperParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64SerializationHelperParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'serializationHelper' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SerializationHelperParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendSerializationHelper(contractClient: TrackAndTraceContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: SerializationHelperParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('serializationHelper'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createSerializationHelperParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'serializationHelper' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SerializationHelperParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunSerializationHelper(contractClient: TrackAndTraceContract, parameter: SerializationHelperParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('serializationHelper'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createSerializationHelperParameter(parameter),
        blockHash
    );
}
/** Base64 encoding of the parameter schema type for update transactions to 'nonceOf' entrypoint of the 'track_and_trace' contract. */
const base64NonceOfParameterSchema = 'EAAL';
/** Parameter JSON type needed by the schema for update transaction for 'nonceOf' entrypoint of the 'track_and_trace' contract. */
type NonceOfParameterSchemaJson = Array<SDK.AccountAddress.SchemaValue>;
/** Parameter type for update transaction for 'nonceOf' entrypoint of the 'track_and_trace' contract. */
export type NonceOfParameter = Array<SDK.AccountAddress.Type>;

/**
 * Construct schema JSON representation used in update transaction for 'nonceOf' entrypoint of the 'track_and_trace' contract.
 * @param {NonceOfParameter} parameter The structured parameter to construct from.
 * @returns {NonceOfParameterSchemaJson} The smart contract parameter JSON.
 */
function createNonceOfParameterSchemaJson(parameter: NonceOfParameter): NonceOfParameterSchemaJson {
    const list369 = parameter.map((item370) => {
    const accountAddress371 = SDK.AccountAddress.toSchemaValue(item370);
    return accountAddress371;
    });
    return list369;
}

/**
 * Construct Parameter type used in update transaction for 'nonceOf' entrypoint of the 'track_and_trace' contract.
 * @param {NonceOfParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createNonceOfParameter(parameter: NonceOfParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64NonceOfParameterSchema, createNonceOfParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'nonceOf' entrypoint of the 'track_and_trace' contract.
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
 * Send an update-contract transaction to the 'nonceOf' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {NonceOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendNonceOf(contractClient: TrackAndTraceContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: NonceOfParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('nonceOf'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createNonceOfParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'nonceOf' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {NonceOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunNonceOf(contractClient: TrackAndTraceContract, parameter: NonceOfParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('nonceOf'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createNonceOfParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'nonceOf' entrypoint of the 'track_and_trace' contract. */
export type ReturnValueNonceOf = Array<number | bigint>;

/**
 * Get and parse the return value from dry-running update transaction for 'nonceOf' entrypoint of the 'track_and_trace' contract.
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

    const schemaJson = <Array<bigint>>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAAF');
    return schemaJson;
}

/** Error message for dry-running update transaction for 'nonceOf' entrypoint of the 'track_and_trace' contract. */
export type ErrorMessageNonceOf = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};

/**
 * Get and parse the error message from dry-running update transaction for 'nonceOf' entrypoint of the 'track_and_trace' contract.
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

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] } | {'Unsuccessful' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRAAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCDAAAAFVuc3VjY2Vzc2Z1bAI=');
    let match374: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};
    if ('ParseParams' in schemaJson) {
       match374 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match374 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match374 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match374 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match374 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match374 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match374 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match374 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match374 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match374 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match374 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match374 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match374 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match374 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match374 = {
           type: 'Expired',
       };
    } else if ('Unsuccessful' in schemaJson) {
       match374 = {
           type: 'Unsuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match374
}
/** Base64 encoding of the parameter schema type for update transactions to 'hasRole' entrypoint of the 'track_and_trace' contract. */
const base64HasRoleParameterSchema = 'FAACAAAABwAAAGFkZHJlc3MVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMBAAAAHJvbGUVAQAAAAUAAABBZG1pbgI=';
/** Parameter JSON type needed by the schema for update transaction for 'hasRole' entrypoint of the 'track_and_trace' contract. */
type HasRoleParameterSchemaJson = {
    address: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    role: {'Admin' : [] },
    };
/** Parameter type for update transaction for 'hasRole' entrypoint of the 'track_and_trace' contract. */
export type HasRoleParameter = {
    address: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    role: { type: 'Admin'},
    };

/**
 * Construct schema JSON representation used in update transaction for 'hasRole' entrypoint of the 'track_and_trace' contract.
 * @param {HasRoleParameter} parameter The structured parameter to construct from.
 * @returns {HasRoleParameterSchemaJson} The smart contract parameter JSON.
 */
function createHasRoleParameterSchemaJson(parameter: HasRoleParameter): HasRoleParameterSchemaJson {
    const field392 = parameter.address;
    let match393: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field392.type) {
        case 'Account':
    const accountAddress394 = SDK.AccountAddress.toSchemaValue(field392.content);
            match393 = { Account: [accountAddress394], };
        break;
        case 'Contract':
    const contractAddress395 = SDK.ContractAddress.toSchemaValue(field392.content);
            match393 = { Contract: [contractAddress395], };
        break;
    }

    const field396 = parameter.role;
    let match397: {'Admin' : [] };
    switch (field396.type) {
        case 'Admin':
            match397 = { Admin: [], };
        break;
    }

    const named391 = {
    address: match393,
    role: match397,
    };
    return named391;
}

/**
 * Construct Parameter type used in update transaction for 'hasRole' entrypoint of the 'track_and_trace' contract.
 * @param {HasRoleParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createHasRoleParameter(parameter: HasRoleParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64HasRoleParameterSchema, createHasRoleParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'hasRole' entrypoint of the 'track_and_trace' contract.
 * @param {HasRoleParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createHasRoleParameterWebWallet(parameter: HasRoleParameter) {
    return {
        parameters: createHasRoleParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64HasRoleParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'hasRole' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {HasRoleParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendHasRole(contractClient: TrackAndTraceContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: HasRoleParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('hasRole'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createHasRoleParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'hasRole' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {HasRoleParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunHasRole(contractClient: TrackAndTraceContract, parameter: HasRoleParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('hasRole'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createHasRoleParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'hasRole' entrypoint of the 'track_and_trace' contract. */
export type ReturnValueHasRole = boolean;

/**
 * Get and parse the return value from dry-running update transaction for 'hasRole' entrypoint of the 'track_and_trace' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueHasRole | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueHasRole(invokeResult: SDK.InvokeContractResult): ReturnValueHasRole | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <boolean>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'AQ==');
    return schemaJson;
}

/** Error message for dry-running update transaction for 'hasRole' entrypoint of the 'track_and_trace' contract. */
export type ErrorMessageHasRole = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};

/**
 * Get and parse the error message from dry-running update transaction for 'hasRole' entrypoint of the 'track_and_trace' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageHasRole | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageHasRole(invokeResult: SDK.InvokeContractResult): ErrorMessageHasRole | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] } | {'Unsuccessful' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRAAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCDAAAAFVuc3VjY2Vzc2Z1bAI=');
    let match398: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};
    if ('ParseParams' in schemaJson) {
       match398 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match398 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match398 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match398 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match398 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match398 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match398 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match398 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match398 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match398 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match398 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match398 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match398 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match398 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match398 = {
           type: 'Expired',
       };
    } else if ('Unsuccessful' in schemaJson) {
       match398 = {
           type: 'Unsuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match398
}
/** Base64 encoding of the parameter schema type for update transactions to 'isTransitionEdge' entrypoint of the 'track_and_trace' contract. */
const base64IsTransitionEdgeParameterSchema = 'FAADAAAABwAAAGFjY291bnQLCwAAAGZyb21fc3RhdHVzFQQAAAAIAAAAUHJvZHVjZWQCCQAAAEluVHJhbnNpdAIHAAAASW5TdG9yZQIEAAAAU29sZAIJAAAAdG9fc3RhdHVzFQQAAAAIAAAAUHJvZHVjZWQCCQAAAEluVHJhbnNpdAIHAAAASW5TdG9yZQIEAAAAU29sZAI=';
/** Parameter JSON type needed by the schema for update transaction for 'isTransitionEdge' entrypoint of the 'track_and_trace' contract. */
type IsTransitionEdgeParameterSchemaJson = {
    account: SDK.AccountAddress.SchemaValue,
    from_status: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] },
    to_status: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] },
    };
/** Parameter type for update transaction for 'isTransitionEdge' entrypoint of the 'track_and_trace' contract. */
export type IsTransitionEdgeParameter = {
    account: SDK.AccountAddress.Type,
    from_status: { type: 'Produced'} | { type: 'InTransit'} | { type: 'InStore'} | { type: 'Sold'},
    to_status: { type: 'Produced'} | { type: 'InTransit'} | { type: 'InStore'} | { type: 'Sold'},
    };

/**
 * Construct schema JSON representation used in update transaction for 'isTransitionEdge' entrypoint of the 'track_and_trace' contract.
 * @param {IsTransitionEdgeParameter} parameter The structured parameter to construct from.
 * @returns {IsTransitionEdgeParameterSchemaJson} The smart contract parameter JSON.
 */
function createIsTransitionEdgeParameterSchemaJson(parameter: IsTransitionEdgeParameter): IsTransitionEdgeParameterSchemaJson {
    const field416 = parameter.account;
    const accountAddress417 = SDK.AccountAddress.toSchemaValue(field416);
    const field418 = parameter.from_status;
    let match419: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] };
    switch (field418.type) {
        case 'Produced':
            match419 = { Produced: [], };
        break;
        case 'InTransit':
            match419 = { InTransit: [], };
        break;
        case 'InStore':
            match419 = { InStore: [], };
        break;
        case 'Sold':
            match419 = { Sold: [], };
        break;
    }

    const field420 = parameter.to_status;
    let match421: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] };
    switch (field420.type) {
        case 'Produced':
            match421 = { Produced: [], };
        break;
        case 'InTransit':
            match421 = { InTransit: [], };
        break;
        case 'InStore':
            match421 = { InStore: [], };
        break;
        case 'Sold':
            match421 = { Sold: [], };
        break;
    }

    const named415 = {
    account: accountAddress417,
    from_status: match419,
    to_status: match421,
    };
    return named415;
}

/**
 * Construct Parameter type used in update transaction for 'isTransitionEdge' entrypoint of the 'track_and_trace' contract.
 * @param {IsTransitionEdgeParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createIsTransitionEdgeParameter(parameter: IsTransitionEdgeParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64IsTransitionEdgeParameterSchema, createIsTransitionEdgeParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'isTransitionEdge' entrypoint of the 'track_and_trace' contract.
 * @param {IsTransitionEdgeParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createIsTransitionEdgeParameterWebWallet(parameter: IsTransitionEdgeParameter) {
    return {
        parameters: createIsTransitionEdgeParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64IsTransitionEdgeParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'isTransitionEdge' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {IsTransitionEdgeParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendIsTransitionEdge(contractClient: TrackAndTraceContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: IsTransitionEdgeParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('isTransitionEdge'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createIsTransitionEdgeParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'isTransitionEdge' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {IsTransitionEdgeParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunIsTransitionEdge(contractClient: TrackAndTraceContract, parameter: IsTransitionEdgeParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('isTransitionEdge'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createIsTransitionEdgeParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'isTransitionEdge' entrypoint of the 'track_and_trace' contract. */
export type ReturnValueIsTransitionEdge = boolean;

/**
 * Get and parse the return value from dry-running update transaction for 'isTransitionEdge' entrypoint of the 'track_and_trace' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueIsTransitionEdge | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueIsTransitionEdge(invokeResult: SDK.InvokeContractResult): ReturnValueIsTransitionEdge | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <boolean>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'AQ==');
    return schemaJson;
}

/** Error message for dry-running update transaction for 'isTransitionEdge' entrypoint of the 'track_and_trace' contract. */
export type ErrorMessageIsTransitionEdge = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};

/**
 * Get and parse the error message from dry-running update transaction for 'isTransitionEdge' entrypoint of the 'track_and_trace' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageIsTransitionEdge | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageIsTransitionEdge(invokeResult: SDK.InvokeContractResult): ErrorMessageIsTransitionEdge | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] } | {'Unsuccessful' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRAAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCDAAAAFVuc3VjY2Vzc2Z1bAI=');
    let match422: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};
    if ('ParseParams' in schemaJson) {
       match422 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match422 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match422 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match422 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match422 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match422 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match422 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match422 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match422 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match422 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match422 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match422 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match422 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match422 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match422 = {
           type: 'Expired',
       };
    } else if ('Unsuccessful' in schemaJson) {
       match422 = {
           type: 'Unsuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match422
}
