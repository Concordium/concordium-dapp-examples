// @ts-nocheck
import * as SDK from "@concordium/web-sdk";
/** The reference of the smart contract module supported by the provided client. */
export const moduleReference: SDK.ModuleReference.Type = /*#__PURE__*/ SDK.ModuleReference.fromHexString('757693d8e141665881e9dbc40be07da4cba32ef89d8824fb579cd66619443129');
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
    new_metadata_url: { type: 'None'} | { type: 'Some', content: {
    url: string,
    hash: { type: 'None'} | { type: 'Some', content: SDK.HexString },
    } },
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
    additional_data: {
    bytes: Array<number>,
    },
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
    new_metadata_url: {'None' : [] } | {'Some' : [{
    url: string,
    hash: {'None' : [] } | {'Some' : [string] },
    }] },
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
    additional_data: {
    bytes: Array<number>,
    },
    }] } | {'Nonce' : [{
    account: SDK.AccountAddress.SchemaValue,
    nonce: bigint,
    }] }>SDK.ContractEvent.parseWithSchemaTypeBase64(event, 'HwUAAAACCQAAAEdyYW50Um9sZQEBAAAAFAACAAAABwAAAGFkZHJlc3MVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMBAAAAHJvbGUVAQAAAAUAAABBZG1pbgIDCgAAAFJldm9rZVJvbGUBAQAAABQAAgAAAAcAAABhZGRyZXNzFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAQAAAByb2xlFQEAAAAFAAAAQWRtaW4C7BEAAABJdGVtU3RhdHVzQ2hhbmdlZAEBAAAAFAAEAAAABwAAAGl0ZW1faWQdABAAAABuZXdfbWV0YWRhdGFfdXJsFQIAAAAEAAAATm9uZQIEAAAAU29tZQEBAAAAFAACAAAAAwAAAHVybBYBBAAAAGhhc2gVAgAAAAQAAABOb25lAgQAAABTb21lAQEAAAAeIAAAAAoAAABuZXdfc3RhdHVzFQQAAAAIAAAAUHJvZHVjZWQCCQAAAEluVHJhbnNpdAIHAAAASW5TdG9yZQIEAAAAU29sZAIPAAAAYWRkaXRpb25hbF9kYXRhFAABAAAABQAAAGJ5dGVzEAIC7QsAAABJdGVtQ3JlYXRlZAEBAAAAFAAEAAAABwAAAGl0ZW1faWQdAAwAAABtZXRhZGF0YV91cmwVAgAAAAQAAABOb25lAgQAAABTb21lAQEAAAAUAAIAAAADAAAAdXJsFgEEAAAAaGFzaBUCAAAABAAAAE5vbmUCBAAAAFNvbWUBAQAAAB4gAAAADgAAAGluaXRpYWxfc3RhdHVzFQQAAAAIAAAAUHJvZHVjZWQCCQAAAEluVHJhbnNpdAIHAAAASW5TdG9yZQIEAAAAU29sZAIPAAAAYWRkaXRpb25hbF9kYXRhFAABAAAABQAAAGJ5dGVzEAIC+gUAAABOb25jZQEBAAAAFAACAAAABwAAAGFjY291bnQLBQAAAG5vbmNlBQ==');
    let match11: { type: 'GrantRole', content: {
    address: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    role: { type: 'Admin'},
    } } | { type: 'RevokeRole', content: {
    address: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    role: { type: 'Admin'},
    } } | { type: 'ItemStatusChanged', content: {
    item_id: SDK.HexString,
    new_metadata_url: { type: 'None'} | { type: 'Some', content: {
    url: string,
    hash: { type: 'None'} | { type: 'Some', content: SDK.HexString },
    } },
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
    additional_data: {
    bytes: Array<number>,
    },
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
    const field36 = variant34[0].new_metadata_url;
    let match37: { type: 'None'} | { type: 'Some', content: {
    url: string,
    hash: { type: 'None'} | { type: 'Some', content: SDK.HexString },
    } };
    if ('None' in field36) {
       match37 = {
           type: 'None',
       };
    } else if ('Some' in field36) {
       const variant39 = field36.Some;
    const field40 = variant39[0].url;
    const field41 = variant39[0].hash;
    let match42: { type: 'None'} | { type: 'Some', content: SDK.HexString };
    if ('None' in field41) {
       match42 = {
           type: 'None',
       };
    } else if ('Some' in field41) {
       const variant44 = field41.Some;
       match42 = {
           type: 'Some',
           content: variant44[0],
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named45 = {
    url: field40,
    hash: match42,
    };
       match37 = {
           type: 'Some',
           content: named45,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field46 = variant34[0].new_status;
    let match47: { type: 'Produced'} | { type: 'InTransit'} | { type: 'InStore'} | { type: 'Sold'};
    if ('Produced' in field46) {
       match47 = {
           type: 'Produced',
       };
    } else if ('InTransit' in field46) {
       match47 = {
           type: 'InTransit',
       };
    } else if ('InStore' in field46) {
       match47 = {
           type: 'InStore',
       };
    } else if ('Sold' in field46) {
       match47 = {
           type: 'Sold',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field52 = variant34[0].additional_data;
    const field53 = field52.bytes;
    const named56 = {
    bytes: field53,
    };
    const named57 = {
    item_id: field35,
    new_metadata_url: match37,
    new_status: match47,
    additional_data: named56,
    };
       match11 = {
           type: 'ItemStatusChanged',
           content: named57,
       };
    } else if ('ItemCreated' in schemaJson) {
       const variant58 = schemaJson.ItemCreated;
    const field59 = variant58[0].item_id;
    const field60 = variant58[0].metadata_url;
    let match61: { type: 'None'} | { type: 'Some', content: {
    url: string,
    hash: { type: 'None'} | { type: 'Some', content: SDK.HexString },
    } };
    if ('None' in field60) {
       match61 = {
           type: 'None',
       };
    } else if ('Some' in field60) {
       const variant63 = field60.Some;
    const field64 = variant63[0].url;
    const field65 = variant63[0].hash;
    let match66: { type: 'None'} | { type: 'Some', content: SDK.HexString };
    if ('None' in field65) {
       match66 = {
           type: 'None',
       };
    } else if ('Some' in field65) {
       const variant68 = field65.Some;
       match66 = {
           type: 'Some',
           content: variant68[0],
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named69 = {
    url: field64,
    hash: match66,
    };
       match61 = {
           type: 'Some',
           content: named69,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field70 = variant58[0].initial_status;
    let match71: { type: 'Produced'} | { type: 'InTransit'} | { type: 'InStore'} | { type: 'Sold'};
    if ('Produced' in field70) {
       match71 = {
           type: 'Produced',
       };
    } else if ('InTransit' in field70) {
       match71 = {
           type: 'InTransit',
       };
    } else if ('InStore' in field70) {
       match71 = {
           type: 'InStore',
       };
    } else if ('Sold' in field70) {
       match71 = {
           type: 'Sold',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field76 = variant58[0].additional_data;
    const field77 = field76.bytes;
    const named80 = {
    bytes: field77,
    };
    const named81 = {
    item_id: field59,
    metadata_url: match61,
    initial_status: match71,
    additional_data: named80,
    };
       match11 = {
           type: 'ItemCreated',
           content: named81,
       };
    } else if ('Nonce' in schemaJson) {
       const variant82 = schemaJson.Nonce;
    const field83 = variant82[0].account;
    const accountAddress84 = SDK.AccountAddress.fromSchemaValue(field83);
    const field85 = variant82[0].nonce;
    const named86 = {
    account: accountAddress84,
    nonce: field85,
    };
       match11 = {
           type: 'Nonce',
           content: named86,
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
    let match87: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (parameter.type) {
        case 'Account':
    const accountAddress88 = SDK.AccountAddress.toSchemaValue(parameter.content);
            match87 = { Account: [accountAddress88], };
        break;
        case 'Contract':
    const contractAddress89 = SDK.ContractAddress.toSchemaValue(parameter.content);
            match87 = { Contract: [contractAddress89], };
        break;
    }

    return match87;
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
    const list90 = schemaJson.map((item91) => {
    let match92: { type: 'Admin'};
    if ('Admin' in item91) {
       match92 = {
           type: 'Admin',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match92;
    });
    return list90;
}
/** Base64 encoding of the parameter schema type for update transactions to 'getAddressesByRole' entrypoint of the 'track_and_trace' contract. */
const base64GetAddressesByRoleParameterSchema = 'FQEAAAAFAAAAQWRtaW4C';
/** Parameter JSON type needed by the schema for update transaction for 'getAddressesByRole' entrypoint of the 'track_and_trace' contract. */
type GetAddressesByRoleParameterSchemaJson = {'Admin' : [] };
/** Parameter type for update transaction for 'getAddressesByRole' entrypoint of the 'track_and_trace' contract. */
export type GetAddressesByRoleParameter = { type: 'Admin'};

/**
 * Construct schema JSON representation used in update transaction for 'getAddressesByRole' entrypoint of the 'track_and_trace' contract.
 * @param {GetAddressesByRoleParameter} parameter The structured parameter to construct from.
 * @returns {GetAddressesByRoleParameterSchemaJson} The smart contract parameter JSON.
 */
function createGetAddressesByRoleParameterSchemaJson(parameter: GetAddressesByRoleParameter): GetAddressesByRoleParameterSchemaJson {
    let match94: {'Admin' : [] };
    switch (parameter.type) {
        case 'Admin':
            match94 = { Admin: [], };
        break;
    }

    return match94;
}

/**
 * Construct Parameter type used in update transaction for 'getAddressesByRole' entrypoint of the 'track_and_trace' contract.
 * @param {GetAddressesByRoleParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createGetAddressesByRoleParameter(parameter: GetAddressesByRoleParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64GetAddressesByRoleParameterSchema, createGetAddressesByRoleParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'getAddressesByRole' entrypoint of the 'track_and_trace' contract.
 * @param {GetAddressesByRoleParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createGetAddressesByRoleParameterWebWallet(parameter: GetAddressesByRoleParameter) {
    return {
        parameters: createGetAddressesByRoleParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64GetAddressesByRoleParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'getAddressesByRole' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {GetAddressesByRoleParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendGetAddressesByRole(contractClient: TrackAndTraceContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: GetAddressesByRoleParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('getAddressesByRole'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createGetAddressesByRoleParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'getAddressesByRole' entrypoint of the 'track_and_trace' contract.
 * @param {TrackAndTraceContract} contractClient The client for a 'track_and_trace' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {GetAddressesByRoleParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunGetAddressesByRole(contractClient: TrackAndTraceContract, parameter: GetAddressesByRoleParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('getAddressesByRole'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createGetAddressesByRoleParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'getAddressesByRole' entrypoint of the 'track_and_trace' contract. */
export type ReturnValueGetAddressesByRole = Array<{ type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type }>;

/**
 * Get and parse the return value from dry-running update transaction for 'getAddressesByRole' entrypoint of the 'track_and_trace' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueGetAddressesByRole | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueGetAddressesByRole(invokeResult: SDK.InvokeContractResult): ReturnValueGetAddressesByRole | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <Array<{'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] }>>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM');
    const list95 = schemaJson.map((item96) => {
    let match97: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in item96) {
       const variant98 = item96.Account;
    const accountAddress99 = SDK.AccountAddress.fromSchemaValue(variant98[0]);
       match97 = {
           type: 'Account',
           content: accountAddress99,
       };
    } else if ('Contract' in item96) {
       const variant100 = item96.Contract;
    const contractAddress101 = SDK.ContractAddress.fromSchemaValue(variant100[0]);
       match97 = {
           type: 'Contract',
           content: contractAddress101,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match97;
    });
    return list95;
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
    const field102 = schemaJson.status;
    let match103: { type: 'Produced'} | { type: 'InTransit'} | { type: 'InStore'} | { type: 'Sold'};
    if ('Produced' in field102) {
       match103 = {
           type: 'Produced',
       };
    } else if ('InTransit' in field102) {
       match103 = {
           type: 'InTransit',
       };
    } else if ('InStore' in field102) {
       match103 = {
           type: 'InStore',
       };
    } else if ('Sold' in field102) {
       match103 = {
           type: 'Sold',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    const field108 = schemaJson.metadata_url;
    let match109: { type: 'None'} | { type: 'Some', content: {
    url: string,
    hash: { type: 'None'} | { type: 'Some', content: SDK.HexString },
    } };
    if ('None' in field108) {
       match109 = {
           type: 'None',
       };
    } else if ('Some' in field108) {
       const variant111 = field108.Some;
    const field112 = variant111[0].url;
    const field113 = variant111[0].hash;
    let match114: { type: 'None'} | { type: 'Some', content: SDK.HexString };
    if ('None' in field113) {
       match114 = {
           type: 'None',
       };
    } else if ('Some' in field113) {
       const variant116 = field113.Some;
       match114 = {
           type: 'Some',
           content: variant116[0],
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named117 = {
    url: field112,
    hash: match114,
    };
       match109 = {
           type: 'Some',
           content: named117,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    const named118 = {
    status: match103,
    metadata_url: match109,
    };
    return named118;
}
/** Base64 encoding of the parameter schema type for update transactions to 'createItem' entrypoint of the 'track_and_trace' contract. */
const base64CreateItemParameterSchema = 'FAACAAAADAAAAG1ldGFkYXRhX3VybBUCAAAABAAAAE5vbmUCBAAAAFNvbWUBAQAAABQAAgAAAAMAAAB1cmwWAQQAAABoYXNoFQIAAAAEAAAATm9uZQIEAAAAU29tZQEBAAAAHiAAAAAPAAAAYWRkaXRpb25hbF9kYXRhFAABAAAABQAAAGJ5dGVzEAIC';
/** Parameter JSON type needed by the schema for update transaction for 'createItem' entrypoint of the 'track_and_trace' contract. */
type CreateItemParameterSchemaJson = {
    metadata_url: {'None' : [] } | {'Some' : [{
    url: string,
    hash: {'None' : [] } | {'Some' : [string] },
    }] },
    additional_data: {
    bytes: Array<number>,
    },
    };
/** Parameter type for update transaction for 'createItem' entrypoint of the 'track_and_trace' contract. */
export type CreateItemParameter = {
    metadata_url: { type: 'None'} | { type: 'Some', content: {
    url: string,
    hash: { type: 'None'} | { type: 'Some', content: SDK.HexString },
    } },
    additional_data: {
    bytes: Array<number>,
    },
    };

/**
 * Construct schema JSON representation used in update transaction for 'createItem' entrypoint of the 'track_and_trace' contract.
 * @param {CreateItemParameter} parameter The structured parameter to construct from.
 * @returns {CreateItemParameterSchemaJson} The smart contract parameter JSON.
 */
function createCreateItemParameterSchemaJson(parameter: CreateItemParameter): CreateItemParameterSchemaJson {
    const field120 = parameter.metadata_url;
    let match121: {'None' : [] } | {'Some' : [{
    url: string,
    hash: {'None' : [] } | {'Some' : [string] },
    }] };
    switch (field120.type) {
        case 'None':
            match121 = { None: [], };
        break;
        case 'Some':
    const field123 = field120.content.url;
    const field124 = field120.content.hash;
    let match125: {'None' : [] } | {'Some' : [string] };
    switch (field124.type) {
        case 'None':
            match125 = { None: [], };
        break;
        case 'Some':
            match125 = { Some: [field124.content], };
        break;
    }

    const named122 = {
    url: field123,
    hash: match125,
    };
            match121 = { Some: [named122], };
        break;
    }

    const field126 = parameter.additional_data;
    const field128 = field126.bytes;
    const named127 = {
    bytes: field128,
    };
    const named119 = {
    metadata_url: match121,
    additional_data: named127,
    };
    return named119;
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
    let match131: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};
    if ('ParseParams' in schemaJson) {
       match131 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match131 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match131 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match131 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match131 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match131 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match131 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match131 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match131 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match131 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match131 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match131 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match131 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match131 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match131 = {
           type: 'Expired',
       };
    } else if ('Unsuccessful' in schemaJson) {
       match131 = {
           type: 'Unsuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match131
}
/** Base64 encoding of the parameter schema type for update transactions to 'changeItemStatus' entrypoint of the 'track_and_trace' contract. */
const base64ChangeItemStatusParameterSchema = 'FAAEAAAABwAAAGl0ZW1faWQdABAAAABuZXdfbWV0YWRhdGFfdXJsFQIAAAAEAAAATm9uZQIEAAAAU29tZQEBAAAAFAACAAAAAwAAAHVybBYBBAAAAGhhc2gVAgAAAAQAAABOb25lAgQAAABTb21lAQEAAAAeIAAAAAoAAABuZXdfc3RhdHVzFQQAAAAIAAAAUHJvZHVjZWQCCQAAAEluVHJhbnNpdAIHAAAASW5TdG9yZQIEAAAAU29sZAIPAAAAYWRkaXRpb25hbF9kYXRhFAABAAAABQAAAGJ5dGVzEAIC';
/** Parameter JSON type needed by the schema for update transaction for 'changeItemStatus' entrypoint of the 'track_and_trace' contract. */
type ChangeItemStatusParameterSchemaJson = {
    item_id: string,
    new_metadata_url: {'None' : [] } | {'Some' : [{
    url: string,
    hash: {'None' : [] } | {'Some' : [string] },
    }] },
    new_status: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] },
    additional_data: {
    bytes: Array<number>,
    },
    };
/** Parameter type for update transaction for 'changeItemStatus' entrypoint of the 'track_and_trace' contract. */
export type ChangeItemStatusParameter = {
    item_id: SDK.HexString,
    new_metadata_url: { type: 'None'} | { type: 'Some', content: {
    url: string,
    hash: { type: 'None'} | { type: 'Some', content: SDK.HexString },
    } },
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
    const field149 = parameter.item_id;
    const field150 = parameter.new_metadata_url;
    let match151: {'None' : [] } | {'Some' : [{
    url: string,
    hash: {'None' : [] } | {'Some' : [string] },
    }] };
    switch (field150.type) {
        case 'None':
            match151 = { None: [], };
        break;
        case 'Some':
    const field153 = field150.content.url;
    const field154 = field150.content.hash;
    let match155: {'None' : [] } | {'Some' : [string] };
    switch (field154.type) {
        case 'None':
            match155 = { None: [], };
        break;
        case 'Some':
            match155 = { Some: [field154.content], };
        break;
    }

    const named152 = {
    url: field153,
    hash: match155,
    };
            match151 = { Some: [named152], };
        break;
    }

    const field156 = parameter.new_status;
    let match157: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] };
    switch (field156.type) {
        case 'Produced':
            match157 = { Produced: [], };
        break;
        case 'InTransit':
            match157 = { InTransit: [], };
        break;
        case 'InStore':
            match157 = { InStore: [], };
        break;
        case 'Sold':
            match157 = { Sold: [], };
        break;
    }

    const field158 = parameter.additional_data;
    const field160 = field158.bytes;
    const named159 = {
    bytes: field160,
    };
    const named148 = {
    item_id: field149,
    new_metadata_url: match151,
    new_status: match157,
    additional_data: named159,
    };
    return named148;
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
    let match163: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};
    if ('ParseParams' in schemaJson) {
       match163 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match163 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match163 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match163 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match163 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match163 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match163 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match163 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match163 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match163 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match163 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match163 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match163 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match163 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match163 = {
           type: 'Expired',
       };
    } else if ('Unsuccessful' in schemaJson) {
       match163 = {
           type: 'Unsuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match163
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
    const field181 = parameter.address;
    const accountAddress182 = SDK.AccountAddress.toSchemaValue(field181);
    const field183 = parameter.from_status;
    let match184: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] };
    switch (field183.type) {
        case 'Produced':
            match184 = { Produced: [], };
        break;
        case 'InTransit':
            match184 = { InTransit: [], };
        break;
        case 'InStore':
            match184 = { InStore: [], };
        break;
        case 'Sold':
            match184 = { Sold: [], };
        break;
    }

    const field185 = parameter.to_status;
    let match186: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] };
    switch (field185.type) {
        case 'Produced':
            match186 = { Produced: [], };
        break;
        case 'InTransit':
            match186 = { InTransit: [], };
        break;
        case 'InStore':
            match186 = { InStore: [], };
        break;
        case 'Sold':
            match186 = { Sold: [], };
        break;
    }

    const field187 = parameter.update;
    let match188: {'Remove' : [] } | {'Add' : [] };
    switch (field187.type) {
        case 'Remove':
            match188 = { Remove: [], };
        break;
        case 'Add':
            match188 = { Add: [], };
        break;
    }

    const named180 = {
    address: accountAddress182,
    from_status: match184,
    to_status: match186,
    update: match188,
    };
    return named180;
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
    let match189: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};
    if ('ParseParams' in schemaJson) {
       match189 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match189 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match189 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match189 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match189 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match189 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match189 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match189 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match189 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match189 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match189 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match189 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match189 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match189 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match189 = {
           type: 'Expired',
       };
    } else if ('Unsuccessful' in schemaJson) {
       match189 = {
           type: 'Unsuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match189
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
    const field207 = parameter.address;
    let match208: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field207.type) {
        case 'Account':
    const accountAddress209 = SDK.AccountAddress.toSchemaValue(field207.content);
            match208 = { Account: [accountAddress209], };
        break;
        case 'Contract':
    const contractAddress210 = SDK.ContractAddress.toSchemaValue(field207.content);
            match208 = { Contract: [contractAddress210], };
        break;
    }

    const field211 = parameter.role;
    let match212: {'Admin' : [] };
    switch (field211.type) {
        case 'Admin':
            match212 = { Admin: [], };
        break;
    }

    const named206 = {
    address: match208,
    role: match212,
    };
    return named206;
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
    let match213: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};
    if ('ParseParams' in schemaJson) {
       match213 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match213 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match213 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match213 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match213 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match213 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match213 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match213 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match213 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match213 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match213 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match213 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match213 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match213 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match213 = {
           type: 'Expired',
       };
    } else if ('Unsuccessful' in schemaJson) {
       match213 = {
           type: 'Unsuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match213
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
    const field231 = parameter.address;
    let match232: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field231.type) {
        case 'Account':
    const accountAddress233 = SDK.AccountAddress.toSchemaValue(field231.content);
            match232 = { Account: [accountAddress233], };
        break;
        case 'Contract':
    const contractAddress234 = SDK.ContractAddress.toSchemaValue(field231.content);
            match232 = { Contract: [contractAddress234], };
        break;
    }

    const field235 = parameter.role;
    let match236: {'Admin' : [] };
    switch (field235.type) {
        case 'Admin':
            match236 = { Admin: [], };
        break;
    }

    const named230 = {
    address: match232,
    role: match236,
    };
    return named230;
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
    let match237: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};
    if ('ParseParams' in schemaJson) {
       match237 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match237 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match237 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match237 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match237 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match237 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match237 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match237 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match237 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match237 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match237 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match237 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match237 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match237 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match237 = {
           type: 'Expired',
       };
    } else if ('Unsuccessful' in schemaJson) {
       match237 = {
           type: 'Unsuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match237
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
    const field255 = parameter.signature;
    const map256: [number, [number, {'Ed25519' : [string] }][]][] = [...field255.entries()].map(([key257, value258]) => {
    const map259: [number, {'Ed25519' : [string] }][] = [...value258.entries()].map(([key260, value261]) => {
    let match262: {'Ed25519' : [string] };
    switch (value261.type) {
        case 'Ed25519':
            match262 = { Ed25519: [value261.content], };
        break;
    }

        return [key260, match262];
    });
        return [key257, map259];
    });
    const field263 = parameter.signer;
    const accountAddress264 = SDK.AccountAddress.toSchemaValue(field263);
    const field265 = parameter.message;
    const field267 = field265.contract_address;
    const contractAddress268 = SDK.ContractAddress.toSchemaValue(field267);
    const field269 = field265.nonce;
    const number270 = BigInt(field269);
    const field271 = field265.timestamp;
    const timestamp272 = SDK.Timestamp.toSchemaValue(field271);
    const field273 = field265.entry_point;
    const field274 = field265.payload;
    const named266 = {
    contract_address: contractAddress268,
    nonce: number270,
    timestamp: timestamp272,
    entry_point: field273,
    payload: field274,
    };
    const named254 = {
    signature: map256,
    signer: accountAddress264,
    message: named266,
    };
    return named254;
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
    let match277: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};
    if ('ParseParams' in schemaJson) {
       match277 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match277 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match277 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match277 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match277 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match277 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match277 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match277 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match277 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match277 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match277 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match277 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match277 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match277 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match277 = {
           type: 'Expired',
       };
    } else if ('Unsuccessful' in schemaJson) {
       match277 = {
           type: 'Unsuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match277
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
    const field295 = parameter.signature;
    const map296: [number, [number, {'Ed25519' : [string] }][]][] = [...field295.entries()].map(([key297, value298]) => {
    const map299: [number, {'Ed25519' : [string] }][] = [...value298.entries()].map(([key300, value301]) => {
    let match302: {'Ed25519' : [string] };
    switch (value301.type) {
        case 'Ed25519':
            match302 = { Ed25519: [value301.content], };
        break;
    }

        return [key300, match302];
    });
        return [key297, map299];
    });
    const field303 = parameter.signer;
    const accountAddress304 = SDK.AccountAddress.toSchemaValue(field303);
    const field305 = parameter.message;
    const field307 = field305.contract_address;
    const contractAddress308 = SDK.ContractAddress.toSchemaValue(field307);
    const field309 = field305.nonce;
    const number310 = BigInt(field309);
    const field311 = field305.timestamp;
    const timestamp312 = SDK.Timestamp.toSchemaValue(field311);
    const field313 = field305.entry_point;
    const field314 = field305.payload;
    const named306 = {
    contract_address: contractAddress308,
    nonce: number310,
    timestamp: timestamp312,
    entry_point: field313,
    payload: field314,
    };
    const named294 = {
    signature: map296,
    signer: accountAddress304,
    message: named306,
    };
    return named294;
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
    let match319: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};
    if ('ParseParams' in schemaJson) {
       match319 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match319 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match319 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match319 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match319 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match319 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match319 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match319 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match319 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match319 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match319 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match319 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match319 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match319 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match319 = {
           type: 'Expired',
       };
    } else if ('Unsuccessful' in schemaJson) {
       match319 = {
           type: 'Unsuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match319
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
    const list338 = schemaJson.map((item339) => {
    let match340: { type: 'NoSupport'} | { type: 'Support'} | { type: 'SupportBy', content: Array<SDK.ContractAddress.Type> };
    if ('NoSupport' in item339) {
       match340 = {
           type: 'NoSupport',
       };
    } else if ('Support' in item339) {
       match340 = {
           type: 'Support',
       };
    } else if ('SupportBy' in item339) {
       const variant343 = item339.SupportBy;
    const list344 = variant343[0].map((item345) => {
    const contractAddress346 = SDK.ContractAddress.fromSchemaValue(item345);
    return contractAddress346;
    });
       match340 = {
           type: 'SupportBy',
           content: list344,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match340;
    });
    return list338;
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
    let match347: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};
    if ('ParseParams' in schemaJson) {
       match347 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match347 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match347 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match347 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match347 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match347 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match347 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match347 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match347 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match347 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match347 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match347 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match347 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match347 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match347 = {
           type: 'Expired',
       };
    } else if ('Unsuccessful' in schemaJson) {
       match347 = {
           type: 'Unsuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match347
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
    const field365 = parameter.queries;
    const named364 = {
    queries: field365,
    };
    return named364;
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
    const list368 = schemaJson.map((item369) => {
    let match370: { type: 'NoSupport'} | { type: 'Support'} | { type: 'SupportBy', content: Array<SDK.ContractAddress.Type> };
    if ('NoSupport' in item369) {
       match370 = {
           type: 'NoSupport',
       };
    } else if ('Support' in item369) {
       match370 = {
           type: 'Support',
       };
    } else if ('SupportBy' in item369) {
       const variant373 = item369.SupportBy;
    const list374 = variant373[0].map((item375) => {
    const contractAddress376 = SDK.ContractAddress.fromSchemaValue(item375);
    return contractAddress376;
    });
       match370 = {
           type: 'SupportBy',
           content: list374,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match370;
    });
    return list368;
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
    let match377: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};
    if ('ParseParams' in schemaJson) {
       match377 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match377 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match377 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match377 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match377 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match377 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match377 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match377 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match377 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match377 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match377 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match377 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match377 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match377 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match377 = {
           type: 'Expired',
       };
    } else if ('Unsuccessful' in schemaJson) {
       match377 = {
           type: 'Unsuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match377
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
    const field395 = parameter.contract_address;
    const contractAddress396 = SDK.ContractAddress.toSchemaValue(field395);
    const field397 = parameter.nonce;
    const number398 = BigInt(field397);
    const field399 = parameter.timestamp;
    const timestamp400 = SDK.Timestamp.toSchemaValue(field399);
    const field401 = parameter.entry_point;
    const field402 = parameter.payload;
    const named394 = {
    contract_address: contractAddress396,
    nonce: number398,
    timestamp: timestamp400,
    entry_point: field401,
    payload: field402,
    };
    return named394;
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
    const list405 = parameter.map((item406) => {
    const accountAddress407 = SDK.AccountAddress.toSchemaValue(item406);
    return accountAddress407;
    });
    return list405;
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
    let match410: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};
    if ('ParseParams' in schemaJson) {
       match410 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match410 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match410 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match410 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match410 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match410 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match410 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match410 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match410 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match410 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match410 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match410 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match410 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match410 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match410 = {
           type: 'Expired',
       };
    } else if ('Unsuccessful' in schemaJson) {
       match410 = {
           type: 'Unsuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match410
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
    const field428 = parameter.address;
    let match429: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field428.type) {
        case 'Account':
    const accountAddress430 = SDK.AccountAddress.toSchemaValue(field428.content);
            match429 = { Account: [accountAddress430], };
        break;
        case 'Contract':
    const contractAddress431 = SDK.ContractAddress.toSchemaValue(field428.content);
            match429 = { Contract: [contractAddress431], };
        break;
    }

    const field432 = parameter.role;
    let match433: {'Admin' : [] };
    switch (field432.type) {
        case 'Admin':
            match433 = { Admin: [], };
        break;
    }

    const named427 = {
    address: match429,
    role: match433,
    };
    return named427;
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
    let match434: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};
    if ('ParseParams' in schemaJson) {
       match434 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match434 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match434 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match434 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match434 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match434 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match434 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match434 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match434 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match434 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match434 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match434 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match434 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match434 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match434 = {
           type: 'Expired',
       };
    } else if ('Unsuccessful' in schemaJson) {
       match434 = {
           type: 'Unsuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match434
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
    const field452 = parameter.account;
    const accountAddress453 = SDK.AccountAddress.toSchemaValue(field452);
    const field454 = parameter.from_status;
    let match455: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] };
    switch (field454.type) {
        case 'Produced':
            match455 = { Produced: [], };
        break;
        case 'InTransit':
            match455 = { InTransit: [], };
        break;
        case 'InStore':
            match455 = { InStore: [], };
        break;
        case 'Sold':
            match455 = { Sold: [], };
        break;
    }

    const field456 = parameter.to_status;
    let match457: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] };
    switch (field456.type) {
        case 'Produced':
            match457 = { Produced: [], };
        break;
        case 'InTransit':
            match457 = { InTransit: [], };
        break;
        case 'InStore':
            match457 = { InStore: [], };
        break;
        case 'Sold':
            match457 = { Sold: [], };
        break;
    }

    const named451 = {
    account: accountAddress453,
    from_status: match455,
    to_status: match457,
    };
    return named451;
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
    let match458: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'Unsuccessful'};
    if ('ParseParams' in schemaJson) {
       match458 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match458 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match458 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match458 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match458 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match458 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match458 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match458 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match458 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match458 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match458 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match458 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match458 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match458 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match458 = {
           type: 'Expired',
       };
    } else if ('Unsuccessful' in schemaJson) {
       match458 = {
           type: 'Unsuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match458
}
