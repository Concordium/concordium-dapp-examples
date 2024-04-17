// @ts-nocheck
import * as SDK from "@concordium/web-sdk";
/** The reference of the smart contract module supported by the provided client. */
export const moduleReference: SDK.ModuleReference.Type = /*#__PURE__*/ SDK.ModuleReference.fromHexString('2c484449e32d435dcaa3921b7c04b395b3b4b8b25b1ccdc3d3002322dd04edcb');
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
export type Event = { type: 'ItemCreated', content: {
    item_id: number | bigint,
    metadata_url: { type: 'None'} | { type: 'Some', content: {
    url: string,
    hash: { type: 'None'} | { type: 'Some', content: SDK.HexString },
    } },
    } } | { type: 'ItemStatusChanged', content: {
    item_id: number | bigint,
    new_status: { type: 'Produced'} | { type: 'InTransit'} | { type: 'InStore'} | { type: 'Sold'},
    additional_data: {
    bytes: Array<number>,
    },
    } } | { type: 'GrantRole', content: {
    address: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    role: { type: 'Admin'},
    } } | { type: 'RevokeRole', content: {
    address: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    role: { type: 'Admin'},
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
    const schemaJson = <{'ItemCreated' : [{
    item_id: bigint,
    metadata_url: {'None' : [] } | {'Some' : [{
    url: string,
    hash: {'None' : [] } | {'Some' : [string] },
    }] },
    }] } | {'ItemStatusChanged' : [{
    item_id: bigint,
    new_status: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] },
    additional_data: {
    bytes: Array<number>,
    },
    }] } | {'GrantRole' : [{
    address: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    role: {'Admin' : [] },
    }] } | {'RevokeRole' : [{
    address: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    role: {'Admin' : [] },
    }] } | {'Nonce' : [{
    account: SDK.AccountAddress.SchemaValue,
    nonce: bigint,
    }] }>SDK.ContractEvent.parseWithSchemaTypeBase64(event, 'HwUAAAAACwAAAEl0ZW1DcmVhdGVkAQEAAAAUAAIAAAAHAAAAaXRlbV9pZAUMAAAAbWV0YWRhdGFfdXJsFQIAAAAEAAAATm9uZQIEAAAAU29tZQEBAAAAFAACAAAAAwAAAHVybBYBBAAAAGhhc2gVAgAAAAQAAABOb25lAgQAAABTb21lAQEAAAAeIAAAAAERAAAASXRlbVN0YXR1c0NoYW5nZWQBAQAAABQAAwAAAAcAAABpdGVtX2lkBQoAAABuZXdfc3RhdHVzFQQAAAAIAAAAUHJvZHVjZWQCCQAAAEluVHJhbnNpdAIHAAAASW5TdG9yZQIEAAAAU29sZAIPAAAAYWRkaXRpb25hbF9kYXRhFAABAAAABQAAAGJ5dGVzEAICAgkAAABHcmFudFJvbGUBAQAAABQAAgAAAAcAAABhZGRyZXNzFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAQAAAByb2xlFQEAAAAFAAAAQWRtaW4CAwoAAABSZXZva2VSb2xlAQEAAAAUAAIAAAAHAAAAYWRkcmVzcxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwEAAAAcm9sZRUBAAAABQAAAEFkbWluAvoFAAAATm9uY2UBAQAAABQAAgAAAAcAAABhY2NvdW50CwUAAABub25jZQU=');
    let match11: { type: 'ItemCreated', content: {
    item_id: number | bigint,
    metadata_url: { type: 'None'} | { type: 'Some', content: {
    url: string,
    hash: { type: 'None'} | { type: 'Some', content: SDK.HexString },
    } },
    } } | { type: 'ItemStatusChanged', content: {
    item_id: number | bigint,
    new_status: { type: 'Produced'} | { type: 'InTransit'} | { type: 'InStore'} | { type: 'Sold'},
    additional_data: {
    bytes: Array<number>,
    },
    } } | { type: 'GrantRole', content: {
    address: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    role: { type: 'Admin'},
    } } | { type: 'RevokeRole', content: {
    address: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    role: { type: 'Admin'},
    } } | { type: 'Nonce', content: {
    account: SDK.AccountAddress.Type,
    nonce: number | bigint,
    } };
    if ('ItemCreated' in schemaJson) {
       const variant12 = schemaJson.ItemCreated;
    const field13 = variant12[0].item_id;
    const field14 = variant12[0].metadata_url;
    let match15: { type: 'None'} | { type: 'Some', content: {
    url: string,
    hash: { type: 'None'} | { type: 'Some', content: SDK.HexString },
    } };
    if ('None' in field14) {
       match15 = {
           type: 'None',
       };
    } else if ('Some' in field14) {
       const variant17 = field14.Some;
    const field18 = variant17[0].url;
    const field19 = variant17[0].hash;
    let match20: { type: 'None'} | { type: 'Some', content: SDK.HexString };
    if ('None' in field19) {
       match20 = {
           type: 'None',
       };
    } else if ('Some' in field19) {
       const variant22 = field19.Some;
       match20 = {
           type: 'Some',
           content: variant22[0],
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named23 = {
    url: field18,
    hash: match20,
    };
       match15 = {
           type: 'Some',
           content: named23,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named24 = {
    item_id: field13,
    metadata_url: match15,
    };
       match11 = {
           type: 'ItemCreated',
           content: named24,
       };
    } else if ('ItemStatusChanged' in schemaJson) {
       const variant25 = schemaJson.ItemStatusChanged;
    const field26 = variant25[0].item_id;
    const field27 = variant25[0].new_status;
    let match28: { type: 'Produced'} | { type: 'InTransit'} | { type: 'InStore'} | { type: 'Sold'};
    if ('Produced' in field27) {
       match28 = {
           type: 'Produced',
       };
    } else if ('InTransit' in field27) {
       match28 = {
           type: 'InTransit',
       };
    } else if ('InStore' in field27) {
       match28 = {
           type: 'InStore',
       };
    } else if ('Sold' in field27) {
       match28 = {
           type: 'Sold',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field33 = variant25[0].additional_data;
    const field34 = field33.bytes;
    const named37 = {
    bytes: field34,
    };
    const named38 = {
    item_id: field26,
    new_status: match28,
    additional_data: named37,
    };
       match11 = {
           type: 'ItemStatusChanged',
           content: named38,
       };
    } else if ('GrantRole' in schemaJson) {
       const variant39 = schemaJson.GrantRole;
    const field40 = variant39[0].address;
    let match41: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in field40) {
       const variant42 = field40.Account;
    const accountAddress43 = SDK.AccountAddress.fromSchemaValue(variant42[0]);
       match41 = {
           type: 'Account',
           content: accountAddress43,
       };
    } else if ('Contract' in field40) {
       const variant44 = field40.Contract;
    const contractAddress45 = SDK.ContractAddress.fromSchemaValue(variant44[0]);
       match41 = {
           type: 'Contract',
           content: contractAddress45,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field46 = variant39[0].role;
    let match47: { type: 'Admin'};
    if ('Admin' in field46) {
       match47 = {
           type: 'Admin',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named49 = {
    address: match41,
    role: match47,
    };
       match11 = {
           type: 'GrantRole',
           content: named49,
       };
    } else if ('RevokeRole' in schemaJson) {
       const variant50 = schemaJson.RevokeRole;
    const field51 = variant50[0].address;
    let match52: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in field51) {
       const variant53 = field51.Account;
    const accountAddress54 = SDK.AccountAddress.fromSchemaValue(variant53[0]);
       match52 = {
           type: 'Account',
           content: accountAddress54,
       };
    } else if ('Contract' in field51) {
       const variant55 = field51.Contract;
    const contractAddress56 = SDK.ContractAddress.fromSchemaValue(variant55[0]);
       match52 = {
           type: 'Contract',
           content: contractAddress56,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field57 = variant50[0].role;
    let match58: { type: 'Admin'};
    if ('Admin' in field57) {
       match58 = {
           type: 'Admin',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named60 = {
    address: match52,
    role: match58,
    };
       match11 = {
           type: 'RevokeRole',
           content: named60,
       };
    } else if ('Nonce' in schemaJson) {
       const variant61 = schemaJson.Nonce;
    const field62 = variant61[0].account;
    const accountAddress63 = SDK.AccountAddress.fromSchemaValue(field62);
    const field64 = variant61[0].nonce;
    const named65 = {
    account: accountAddress63,
    nonce: field64,
    };
       match11 = {
           type: 'Nonce',
           content: named65,
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
    let match66: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (parameter.type) {
        case 'Account':
    const accountAddress67 = SDK.AccountAddress.toSchemaValue(parameter.content);
            match66 = { Account: [accountAddress67], };
        break;
        case 'Contract':
    const contractAddress68 = SDK.ContractAddress.toSchemaValue(parameter.content);
            match66 = { Contract: [contractAddress68], };
        break;
    }

    return match66;
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
    const list69 = schemaJson.map((item70) => {
    let match71: { type: 'Admin'};
    if ('Admin' in item70) {
       match71 = {
           type: 'Admin',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match71;
    });
    return list69;
}
/** Base64 encoding of the parameter schema type for update transactions to 'getItemState' entrypoint of the 'track_and_trace' contract. */
const base64GetItemStateParameterSchema = 'BQ==';
/** Parameter JSON type needed by the schema for update transaction for 'getItemState' entrypoint of the 'track_and_trace' contract. */
type GetItemStateParameterSchemaJson = bigint;
/** Parameter type for update transaction for 'getItemState' entrypoint of the 'track_and_trace' contract. */
export type GetItemStateParameter = number | bigint;

/**
 * Construct schema JSON representation used in update transaction for 'getItemState' entrypoint of the 'track_and_trace' contract.
 * @param {GetItemStateParameter} parameter The structured parameter to construct from.
 * @returns {GetItemStateParameterSchemaJson} The smart contract parameter JSON.
 */
function createGetItemStateParameterSchemaJson(parameter: GetItemStateParameter): GetItemStateParameterSchemaJson {
    const number73 = BigInt(parameter);
    return number73;
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
    const field74 = schemaJson.status;
    let match75: { type: 'Produced'} | { type: 'InTransit'} | { type: 'InStore'} | { type: 'Sold'};
    if ('Produced' in field74) {
       match75 = {
           type: 'Produced',
       };
    } else if ('InTransit' in field74) {
       match75 = {
           type: 'InTransit',
       };
    } else if ('InStore' in field74) {
       match75 = {
           type: 'InStore',
       };
    } else if ('Sold' in field74) {
       match75 = {
           type: 'Sold',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    const field80 = schemaJson.metadata_url;
    let match81: { type: 'None'} | { type: 'Some', content: {
    url: string,
    hash: { type: 'None'} | { type: 'Some', content: SDK.HexString },
    } };
    if ('None' in field80) {
       match81 = {
           type: 'None',
       };
    } else if ('Some' in field80) {
       const variant83 = field80.Some;
    const field84 = variant83[0].url;
    const field85 = variant83[0].hash;
    let match86: { type: 'None'} | { type: 'Some', content: SDK.HexString };
    if ('None' in field85) {
       match86 = {
           type: 'None',
       };
    } else if ('Some' in field85) {
       const variant88 = field85.Some;
       match86 = {
           type: 'Some',
           content: variant88[0],
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named89 = {
    url: field84,
    hash: match86,
    };
       match81 = {
           type: 'Some',
           content: named89,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    const named90 = {
    status: match75,
    metadata_url: match81,
    };
    return named90;
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
    let match91: {'None' : [] } | {'Some' : [{
    url: string,
    hash: {'None' : [] } | {'Some' : [string] },
    }] };
    switch (parameter.type) {
        case 'None':
            match91 = { None: [], };
        break;
        case 'Some':
    const field93 = parameter.content.url;
    const field94 = parameter.content.hash;
    let match95: {'None' : [] } | {'Some' : [string] };
    switch (field94.type) {
        case 'None':
            match95 = { None: [], };
        break;
        case 'Some':
            match95 = { Some: [field94.content], };
        break;
    }

    const named92 = {
    url: field93,
    hash: match95,
    };
            match91 = { Some: [named92], };
        break;
    }

    return match91;
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
export type ErrorMessageCreateItem = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'UnSuccessful'};

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

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] } | {'UnSuccessful' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRAAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCDAAAAFVuU3VjY2Vzc2Z1bAI=');
    let match96: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'UnSuccessful'};
    if ('ParseParams' in schemaJson) {
       match96 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match96 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match96 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match96 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match96 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match96 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match96 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match96 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match96 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match96 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match96 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match96 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match96 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match96 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match96 = {
           type: 'Expired',
       };
    } else if ('UnSuccessful' in schemaJson) {
       match96 = {
           type: 'UnSuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match96
}
/** Base64 encoding of the parameter schema type for update transactions to 'changeItemStatus' entrypoint of the 'track_and_trace' contract. */
const base64ChangeItemStatusParameterSchema = 'FAADAAAABwAAAGl0ZW1faWQFCgAAAG5ld19zdGF0dXMVBAAAAAgAAABQcm9kdWNlZAIJAAAASW5UcmFuc2l0AgcAAABJblN0b3JlAgQAAABTb2xkAg8AAABhZGRpdGlvbmFsX2RhdGEUAAEAAAAFAAAAYnl0ZXMQAgI=';
/** Parameter JSON type needed by the schema for update transaction for 'changeItemStatus' entrypoint of the 'track_and_trace' contract. */
type ChangeItemStatusParameterSchemaJson = {
    item_id: bigint,
    new_status: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] },
    additional_data: {
    bytes: Array<number>,
    },
    };
/** Parameter type for update transaction for 'changeItemStatus' entrypoint of the 'track_and_trace' contract. */
export type ChangeItemStatusParameter = {
    item_id: number | bigint,
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
    const field114 = parameter.item_id;
    const number115 = BigInt(field114);
    const field116 = parameter.new_status;
    let match117: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] };
    switch (field116.type) {
        case 'Produced':
            match117 = { Produced: [], };
        break;
        case 'InTransit':
            match117 = { InTransit: [], };
        break;
        case 'InStore':
            match117 = { InStore: [], };
        break;
        case 'Sold':
            match117 = { Sold: [], };
        break;
    }

    const field118 = parameter.additional_data;
    const field120 = field118.bytes;
    const named119 = {
    bytes: field120,
    };
    const named113 = {
    item_id: number115,
    new_status: match117,
    additional_data: named119,
    };
    return named113;
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
export type ErrorMessageChangeItemStatus = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'UnSuccessful'};

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

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] } | {'UnSuccessful' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRAAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCDAAAAFVuU3VjY2Vzc2Z1bAI=');
    let match123: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'UnSuccessful'};
    if ('ParseParams' in schemaJson) {
       match123 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match123 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match123 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match123 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match123 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match123 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match123 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match123 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match123 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match123 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match123 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match123 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match123 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match123 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match123 = {
           type: 'Expired',
       };
    } else if ('UnSuccessful' in schemaJson) {
       match123 = {
           type: 'UnSuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match123
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
    const field141 = parameter.address;
    const accountAddress142 = SDK.AccountAddress.toSchemaValue(field141);
    const field143 = parameter.from_status;
    let match144: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] };
    switch (field143.type) {
        case 'Produced':
            match144 = { Produced: [], };
        break;
        case 'InTransit':
            match144 = { InTransit: [], };
        break;
        case 'InStore':
            match144 = { InStore: [], };
        break;
        case 'Sold':
            match144 = { Sold: [], };
        break;
    }

    const field145 = parameter.to_status;
    let match146: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] };
    switch (field145.type) {
        case 'Produced':
            match146 = { Produced: [], };
        break;
        case 'InTransit':
            match146 = { InTransit: [], };
        break;
        case 'InStore':
            match146 = { InStore: [], };
        break;
        case 'Sold':
            match146 = { Sold: [], };
        break;
    }

    const field147 = parameter.update;
    let match148: {'Remove' : [] } | {'Add' : [] };
    switch (field147.type) {
        case 'Remove':
            match148 = { Remove: [], };
        break;
        case 'Add':
            match148 = { Add: [], };
        break;
    }

    const named140 = {
    address: accountAddress142,
    from_status: match144,
    to_status: match146,
    update: match148,
    };
    return named140;
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
export type ErrorMessageUpdateStateMachine = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'UnSuccessful'};

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

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] } | {'UnSuccessful' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRAAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCDAAAAFVuU3VjY2Vzc2Z1bAI=');
    let match149: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'UnSuccessful'};
    if ('ParseParams' in schemaJson) {
       match149 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match149 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match149 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match149 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match149 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match149 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match149 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match149 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match149 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match149 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match149 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match149 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match149 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match149 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match149 = {
           type: 'Expired',
       };
    } else if ('UnSuccessful' in schemaJson) {
       match149 = {
           type: 'UnSuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match149
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
    const field167 = parameter.address;
    let match168: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field167.type) {
        case 'Account':
    const accountAddress169 = SDK.AccountAddress.toSchemaValue(field167.content);
            match168 = { Account: [accountAddress169], };
        break;
        case 'Contract':
    const contractAddress170 = SDK.ContractAddress.toSchemaValue(field167.content);
            match168 = { Contract: [contractAddress170], };
        break;
    }

    const field171 = parameter.role;
    let match172: {'Admin' : [] };
    switch (field171.type) {
        case 'Admin':
            match172 = { Admin: [], };
        break;
    }

    const named166 = {
    address: match168,
    role: match172,
    };
    return named166;
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
export type ErrorMessageGrantRole = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'UnSuccessful'};

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

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] } | {'UnSuccessful' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRAAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCDAAAAFVuU3VjY2Vzc2Z1bAI=');
    let match173: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'UnSuccessful'};
    if ('ParseParams' in schemaJson) {
       match173 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match173 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match173 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match173 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match173 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match173 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match173 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match173 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match173 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match173 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match173 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match173 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match173 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match173 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match173 = {
           type: 'Expired',
       };
    } else if ('UnSuccessful' in schemaJson) {
       match173 = {
           type: 'UnSuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match173
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
    const field191 = parameter.address;
    let match192: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field191.type) {
        case 'Account':
    const accountAddress193 = SDK.AccountAddress.toSchemaValue(field191.content);
            match192 = { Account: [accountAddress193], };
        break;
        case 'Contract':
    const contractAddress194 = SDK.ContractAddress.toSchemaValue(field191.content);
            match192 = { Contract: [contractAddress194], };
        break;
    }

    const field195 = parameter.role;
    let match196: {'Admin' : [] };
    switch (field195.type) {
        case 'Admin':
            match196 = { Admin: [], };
        break;
    }

    const named190 = {
    address: match192,
    role: match196,
    };
    return named190;
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
export type ErrorMessageRevokeRole = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'UnSuccessful'};

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

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] } | {'UnSuccessful' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRAAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCDAAAAFVuU3VjY2Vzc2Z1bAI=');
    let match197: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'UnSuccessful'};
    if ('ParseParams' in schemaJson) {
       match197 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match197 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match197 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match197 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match197 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match197 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match197 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match197 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match197 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match197 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match197 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match197 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match197 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match197 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match197 = {
           type: 'Expired',
       };
    } else if ('UnSuccessful' in schemaJson) {
       match197 = {
           type: 'UnSuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match197
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
    const field215 = parameter.signature;
    const map216: [number, [number, {'Ed25519' : [string] }][]][] = [...field215.entries()].map(([key217, value218]) => {
    const map219: [number, {'Ed25519' : [string] }][] = [...value218.entries()].map(([key220, value221]) => {
    let match222: {'Ed25519' : [string] };
    switch (value221.type) {
        case 'Ed25519':
            match222 = { Ed25519: [value221.content], };
        break;
    }

        return [key220, match222];
    });
        return [key217, map219];
    });
    const field223 = parameter.signer;
    const accountAddress224 = SDK.AccountAddress.toSchemaValue(field223);
    const field225 = parameter.message;
    const field227 = field225.contract_address;
    const contractAddress228 = SDK.ContractAddress.toSchemaValue(field227);
    const field229 = field225.nonce;
    const number230 = BigInt(field229);
    const field231 = field225.timestamp;
    const timestamp232 = SDK.Timestamp.toSchemaValue(field231);
    const field233 = field225.entry_point;
    const field234 = field225.payload;
    const named226 = {
    contract_address: contractAddress228,
    nonce: number230,
    timestamp: timestamp232,
    entry_point: field233,
    payload: field234,
    };
    const named214 = {
    signature: map216,
    signer: accountAddress224,
    message: named226,
    };
    return named214;
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
export type ErrorMessagePermit = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'UnSuccessful'};

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

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] } | {'UnSuccessful' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRAAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCDAAAAFVuU3VjY2Vzc2Z1bAI=');
    let match237: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'UnSuccessful'};
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
    } else if ('UnSuccessful' in schemaJson) {
       match237 = {
           type: 'UnSuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match237
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
export type ErrorMessageViewMessageHash = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'UnSuccessful'};

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

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] } | {'UnSuccessful' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRAAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCDAAAAFVuU3VjY2Vzc2Z1bAI=');
    let match279: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'UnSuccessful'};
    if ('ParseParams' in schemaJson) {
       match279 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match279 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match279 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match279 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match279 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match279 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match279 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match279 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match279 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match279 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match279 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match279 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match279 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match279 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match279 = {
           type: 'Expired',
       };
    } else if ('UnSuccessful' in schemaJson) {
       match279 = {
           type: 'UnSuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match279
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
    const field297 = parameter.queries;
    const named296 = {
    queries: field297,
    };
    return named296;
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
    const list300 = schemaJson.map((item301) => {
    let match302: { type: 'NoSupport'} | { type: 'Support'} | { type: 'SupportBy', content: Array<SDK.ContractAddress.Type> };
    if ('NoSupport' in item301) {
       match302 = {
           type: 'NoSupport',
       };
    } else if ('Support' in item301) {
       match302 = {
           type: 'Support',
       };
    } else if ('SupportBy' in item301) {
       const variant305 = item301.SupportBy;
    const list306 = variant305[0].map((item307) => {
    const contractAddress308 = SDK.ContractAddress.fromSchemaValue(item307);
    return contractAddress308;
    });
       match302 = {
           type: 'SupportBy',
           content: list306,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match302;
    });
    return list300;
}

/** Error message for dry-running update transaction for 'supportsPermit' entrypoint of the 'track_and_trace' contract. */
export type ErrorMessageSupportsPermit = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'UnSuccessful'};

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

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] } | {'UnSuccessful' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRAAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCDAAAAFVuU3VjY2Vzc2Z1bAI=');
    let match309: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'UnSuccessful'};
    if ('ParseParams' in schemaJson) {
       match309 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match309 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match309 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match309 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match309 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match309 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match309 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match309 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match309 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match309 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match309 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match309 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match309 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match309 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match309 = {
           type: 'Expired',
       };
    } else if ('UnSuccessful' in schemaJson) {
       match309 = {
           type: 'UnSuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match309
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
    const field327 = parameter.contract_address;
    const contractAddress328 = SDK.ContractAddress.toSchemaValue(field327);
    const field329 = parameter.nonce;
    const number330 = BigInt(field329);
    const field331 = parameter.timestamp;
    const timestamp332 = SDK.Timestamp.toSchemaValue(field331);
    const field333 = parameter.entry_point;
    const field334 = parameter.payload;
    const named326 = {
    contract_address: contractAddress328,
    nonce: number330,
    timestamp: timestamp332,
    entry_point: field333,
    payload: field334,
    };
    return named326;
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
    const list337 = parameter.map((item338) => {
    const accountAddress339 = SDK.AccountAddress.toSchemaValue(item338);
    return accountAddress339;
    });
    return list337;
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
export type ErrorMessageNonceOf = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'UnSuccessful'};

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

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] } | {'UnSuccessful' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRAAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCDAAAAFVuU3VjY2Vzc2Z1bAI=');
    let match342: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'UnSuccessful'};
    if ('ParseParams' in schemaJson) {
       match342 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match342 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match342 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match342 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match342 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match342 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match342 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match342 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match342 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match342 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match342 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match342 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match342 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match342 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match342 = {
           type: 'Expired',
       };
    } else if ('UnSuccessful' in schemaJson) {
       match342 = {
           type: 'UnSuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match342
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
    const field360 = parameter.address;
    let match361: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field360.type) {
        case 'Account':
    const accountAddress362 = SDK.AccountAddress.toSchemaValue(field360.content);
            match361 = { Account: [accountAddress362], };
        break;
        case 'Contract':
    const contractAddress363 = SDK.ContractAddress.toSchemaValue(field360.content);
            match361 = { Contract: [contractAddress363], };
        break;
    }

    const field364 = parameter.role;
    let match365: {'Admin' : [] };
    switch (field364.type) {
        case 'Admin':
            match365 = { Admin: [], };
        break;
    }

    const named359 = {
    address: match361,
    role: match365,
    };
    return named359;
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
export type ErrorMessageHasRole = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'UnSuccessful'};

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

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] } | {'UnSuccessful' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRAAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCDAAAAFVuU3VjY2Vzc2Z1bAI=');
    let match366: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'UnSuccessful'};
    if ('ParseParams' in schemaJson) {
       match366 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match366 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match366 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match366 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match366 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match366 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match366 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match366 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match366 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match366 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match366 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match366 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match366 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match366 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match366 = {
           type: 'Expired',
       };
    } else if ('UnSuccessful' in schemaJson) {
       match366 = {
           type: 'UnSuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match366
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
    const field384 = parameter.account;
    const accountAddress385 = SDK.AccountAddress.toSchemaValue(field384);
    const field386 = parameter.from_status;
    let match387: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] };
    switch (field386.type) {
        case 'Produced':
            match387 = { Produced: [], };
        break;
        case 'InTransit':
            match387 = { InTransit: [], };
        break;
        case 'InStore':
            match387 = { InStore: [], };
        break;
        case 'Sold':
            match387 = { Sold: [], };
        break;
    }

    const field388 = parameter.to_status;
    let match389: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] };
    switch (field388.type) {
        case 'Produced':
            match389 = { Produced: [], };
        break;
        case 'InTransit':
            match389 = { InTransit: [], };
        break;
        case 'InStore':
            match389 = { InStore: [], };
        break;
        case 'Sold':
            match389 = { Sold: [], };
        break;
    }

    const named383 = {
    account: accountAddress385,
    from_status: match387,
    to_status: match389,
    };
    return named383;
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
export type ErrorMessageIsTransitionEdge = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'UnSuccessful'};

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

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] } | {'UnSuccessful' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRAAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCDAAAAFVuU3VjY2Vzc2Z1bAI=');
    let match390: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} | { type: 'UnSuccessful'};
    if ('ParseParams' in schemaJson) {
       match390 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match390 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match390 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match390 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match390 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match390 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match390 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match390 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match390 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match390 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match390 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match390 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match390 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match390 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match390 = {
           type: 'Expired',
       };
    } else if ('UnSuccessful' in schemaJson) {
       match390 = {
           type: 'UnSuccessful',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match390
}
