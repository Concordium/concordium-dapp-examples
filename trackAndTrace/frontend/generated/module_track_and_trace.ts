// @ts-nocheck
import * as SDK from "@concordium/web-sdk";
/** The reference of the smart contract module supported by the provided client. */
export const moduleReference: SDK.ModuleReference.Type = /*#__PURE__*/ SDK.ModuleReference.fromHexString('2826a0cf9516115386fd2c8587ab2a179fdc9b40203143044de13fdacf02733e');
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
    role: { type: 'Admin'} | { type: 'Producer'} | { type: 'Transporter'} | { type: 'Seller'},
    } } | { type: 'RevokeRole', content: {
    address: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    role: { type: 'Admin'} | { type: 'Producer'} | { type: 'Transporter'} | { type: 'Seller'},
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
    role: {'Admin' : [] } | {'Producer' : [] } | {'Transporter' : [] } | {'Seller' : [] },
    }] } | {'RevokeRole' : [{
    address: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    role: {'Admin' : [] } | {'Producer' : [] } | {'Transporter' : [] } | {'Seller' : [] },
    }] } | {'Nonce' : [{
    account: SDK.AccountAddress.SchemaValue,
    nonce: bigint,
    }] }>SDK.ContractEvent.parseWithSchemaTypeBase64(event, 'HwUAAAAACwAAAEl0ZW1DcmVhdGVkAQEAAAAUAAIAAAAHAAAAaXRlbV9pZAUMAAAAbWV0YWRhdGFfdXJsFQIAAAAEAAAATm9uZQIEAAAAU29tZQEBAAAAFAACAAAAAwAAAHVybBYBBAAAAGhhc2gVAgAAAAQAAABOb25lAgQAAABTb21lAQEAAAAeIAAAAAERAAAASXRlbVN0YXR1c0NoYW5nZWQBAQAAABQAAwAAAAcAAABpdGVtX2lkBQoAAABuZXdfc3RhdHVzFQQAAAAIAAAAUHJvZHVjZWQCCQAAAEluVHJhbnNpdAIHAAAASW5TdG9yZQIEAAAAU29sZAIPAAAAYWRkaXRpb25hbF9kYXRhFAABAAAABQAAAGJ5dGVzEAICAgkAAABHcmFudFJvbGUBAQAAABQAAgAAAAcAAABhZGRyZXNzFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAQAAAByb2xlFQQAAAAFAAAAQWRtaW4CCAAAAFByb2R1Y2VyAgsAAABUcmFuc3BvcnRlcgIGAAAAU2VsbGVyAgMKAAAAUmV2b2tlUm9sZQEBAAAAFAACAAAABwAAAGFkZHJlc3MVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMBAAAAHJvbGUVBAAAAAUAAABBZG1pbgIIAAAAUHJvZHVjZXICCwAAAFRyYW5zcG9ydGVyAgYAAABTZWxsZXIC+gUAAABOb25jZQEBAAAAFAACAAAABwAAAGFjY291bnQLBQAAAG5vbmNlBQ==');
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
    role: { type: 'Admin'} | { type: 'Producer'} | { type: 'Transporter'} | { type: 'Seller'},
    } } | { type: 'RevokeRole', content: {
    address: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    role: { type: 'Admin'} | { type: 'Producer'} | { type: 'Transporter'} | { type: 'Seller'},
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
    let match47: { type: 'Admin'} | { type: 'Producer'} | { type: 'Transporter'} | { type: 'Seller'};
    if ('Admin' in field46) {
       match47 = {
           type: 'Admin',
       };
    } else if ('Producer' in field46) {
       match47 = {
           type: 'Producer',
       };
    } else if ('Transporter' in field46) {
       match47 = {
           type: 'Transporter',
       };
    } else if ('Seller' in field46) {
       match47 = {
           type: 'Seller',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named52 = {
    address: match41,
    role: match47,
    };
       match11 = {
           type: 'GrantRole',
           content: named52,
       };
    } else if ('RevokeRole' in schemaJson) {
       const variant53 = schemaJson.RevokeRole;
    const field54 = variant53[0].address;
    let match55: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in field54) {
       const variant56 = field54.Account;
    const accountAddress57 = SDK.AccountAddress.fromSchemaValue(variant56[0]);
       match55 = {
           type: 'Account',
           content: accountAddress57,
       };
    } else if ('Contract' in field54) {
       const variant58 = field54.Contract;
    const contractAddress59 = SDK.ContractAddress.fromSchemaValue(variant58[0]);
       match55 = {
           type: 'Contract',
           content: contractAddress59,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field60 = variant53[0].role;
    let match61: { type: 'Admin'} | { type: 'Producer'} | { type: 'Transporter'} | { type: 'Seller'};
    if ('Admin' in field60) {
       match61 = {
           type: 'Admin',
       };
    } else if ('Producer' in field60) {
       match61 = {
           type: 'Producer',
       };
    } else if ('Transporter' in field60) {
       match61 = {
           type: 'Transporter',
       };
    } else if ('Seller' in field60) {
       match61 = {
           type: 'Seller',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named66 = {
    address: match55,
    role: match61,
    };
       match11 = {
           type: 'RevokeRole',
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
export type ReturnValueGetRoles = Array<{ type: 'Admin'} | { type: 'Producer'} | { type: 'Transporter'} | { type: 'Seller'}>;

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

    const schemaJson = <Array<{'Admin' : [] } | {'Producer' : [] } | {'Transporter' : [] } | {'Seller' : [] }>>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAIVBAAAAAUAAABBZG1pbgIIAAAAUHJvZHVjZXICCwAAAFRyYW5zcG9ydGVyAgYAAABTZWxsZXIC');
    const list75 = schemaJson.map((item76) => {
    let match77: { type: 'Admin'} | { type: 'Producer'} | { type: 'Transporter'} | { type: 'Seller'};
    if ('Admin' in item76) {
       match77 = {
           type: 'Admin',
       };
    } else if ('Producer' in item76) {
       match77 = {
           type: 'Producer',
       };
    } else if ('Transporter' in item76) {
       match77 = {
           type: 'Transporter',
       };
    } else if ('Seller' in item76) {
       match77 = {
           type: 'Seller',
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
    const number82 = BigInt(parameter);
    return number82;
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
    const field83 = schemaJson.status;
    let match84: { type: 'Produced'} | { type: 'InTransit'} | { type: 'InStore'} | { type: 'Sold'};
    if ('Produced' in field83) {
       match84 = {
           type: 'Produced',
       };
    } else if ('InTransit' in field83) {
       match84 = {
           type: 'InTransit',
       };
    } else if ('InStore' in field83) {
       match84 = {
           type: 'InStore',
       };
    } else if ('Sold' in field83) {
       match84 = {
           type: 'Sold',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    const field89 = schemaJson.metadata_url;
    let match90: { type: 'None'} | { type: 'Some', content: {
    url: string,
    hash: { type: 'None'} | { type: 'Some', content: SDK.HexString },
    } };
    if ('None' in field89) {
       match90 = {
           type: 'None',
       };
    } else if ('Some' in field89) {
       const variant92 = field89.Some;
    const field93 = variant92[0].url;
    const field94 = variant92[0].hash;
    let match95: { type: 'None'} | { type: 'Some', content: SDK.HexString };
    if ('None' in field94) {
       match95 = {
           type: 'None',
       };
    } else if ('Some' in field94) {
       const variant97 = field94.Some;
       match95 = {
           type: 'Some',
           content: variant97[0],
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named98 = {
    url: field93,
    hash: match95,
    };
       match90 = {
           type: 'Some',
           content: named98,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    const named99 = {
    status: match84,
    metadata_url: match90,
    };
    return named99;
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
    let match100: {'None' : [] } | {'Some' : [{
    url: string,
    hash: {'None' : [] } | {'Some' : [string] },
    }] };
    switch (parameter.type) {
        case 'None':
            match100 = { None: [], };
        break;
        case 'Some':
    const field102 = parameter.content.url;
    const field103 = parameter.content.hash;
    let match104: {'None' : [] } | {'Some' : [string] };
    switch (field103.type) {
        case 'None':
            match104 = { None: [], };
        break;
        case 'Some':
            match104 = { Some: [field103.content], };
        break;
    }

    const named101 = {
    url: field102,
    hash: match104,
    };
            match100 = { Some: [named101], };
        break;
    }

    return match100;
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
export type ErrorMessageCreateItem = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};

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

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQ8AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQC');
    let match105: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in schemaJson) {
       match105 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match105 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match105 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match105 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match105 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match105 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match105 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match105 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match105 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match105 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match105 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match105 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match105 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match105 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match105 = {
           type: 'Expired',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match105
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
    const field122 = parameter.item_id;
    const number123 = BigInt(field122);
    const field124 = parameter.new_status;
    let match125: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] };
    switch (field124.type) {
        case 'Produced':
            match125 = { Produced: [], };
        break;
        case 'InTransit':
            match125 = { InTransit: [], };
        break;
        case 'InStore':
            match125 = { InStore: [], };
        break;
        case 'Sold':
            match125 = { Sold: [], };
        break;
    }

    const field126 = parameter.additional_data;
    const field128 = field126.bytes;
    const named127 = {
    bytes: field128,
    };
    const named121 = {
    item_id: number123,
    new_status: match125,
    additional_data: named127,
    };
    return named121;
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
export type ErrorMessageChangeItemStatus = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};

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

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQ8AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQC');
    let match131: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
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
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match131
}
/** Base64 encoding of the parameter schema type for update transactions to 'grantRole' entrypoint of the 'track_and_trace' contract. */
const base64GrantRoleParameterSchema = 'FAACAAAABwAAAGFkZHJlc3MVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMBAAAAHJvbGUVBAAAAAUAAABBZG1pbgIIAAAAUHJvZHVjZXICCwAAAFRyYW5zcG9ydGVyAgYAAABTZWxsZXIC';
/** Parameter JSON type needed by the schema for update transaction for 'grantRole' entrypoint of the 'track_and_trace' contract. */
type GrantRoleParameterSchemaJson = {
    address: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    role: {'Admin' : [] } | {'Producer' : [] } | {'Transporter' : [] } | {'Seller' : [] },
    };
/** Parameter type for update transaction for 'grantRole' entrypoint of the 'track_and_trace' contract. */
export type GrantRoleParameter = {
    address: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    role: { type: 'Admin'} | { type: 'Producer'} | { type: 'Transporter'} | { type: 'Seller'},
    };

/**
 * Construct schema JSON representation used in update transaction for 'grantRole' entrypoint of the 'track_and_trace' contract.
 * @param {GrantRoleParameter} parameter The structured parameter to construct from.
 * @returns {GrantRoleParameterSchemaJson} The smart contract parameter JSON.
 */
function createGrantRoleParameterSchemaJson(parameter: GrantRoleParameter): GrantRoleParameterSchemaJson {
    const field148 = parameter.address;
    let match149: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field148.type) {
        case 'Account':
    const accountAddress150 = SDK.AccountAddress.toSchemaValue(field148.content);
            match149 = { Account: [accountAddress150], };
        break;
        case 'Contract':
    const contractAddress151 = SDK.ContractAddress.toSchemaValue(field148.content);
            match149 = { Contract: [contractAddress151], };
        break;
    }

    const field152 = parameter.role;
    let match153: {'Admin' : [] } | {'Producer' : [] } | {'Transporter' : [] } | {'Seller' : [] };
    switch (field152.type) {
        case 'Admin':
            match153 = { Admin: [], };
        break;
        case 'Producer':
            match153 = { Producer: [], };
        break;
        case 'Transporter':
            match153 = { Transporter: [], };
        break;
        case 'Seller':
            match153 = { Seller: [], };
        break;
    }

    const named147 = {
    address: match149,
    role: match153,
    };
    return named147;
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
export type ErrorMessageGrantRole = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};

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

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQ8AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQC');
    let match154: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in schemaJson) {
       match154 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match154 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match154 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match154 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match154 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match154 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match154 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match154 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match154 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match154 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match154 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match154 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match154 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match154 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match154 = {
           type: 'Expired',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match154
}
/** Base64 encoding of the parameter schema type for update transactions to 'revokeRole' entrypoint of the 'track_and_trace' contract. */
const base64RevokeRoleParameterSchema = 'FAACAAAABwAAAGFkZHJlc3MVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMBAAAAHJvbGUVBAAAAAUAAABBZG1pbgIIAAAAUHJvZHVjZXICCwAAAFRyYW5zcG9ydGVyAgYAAABTZWxsZXIC';
/** Parameter JSON type needed by the schema for update transaction for 'revokeRole' entrypoint of the 'track_and_trace' contract. */
type RevokeRoleParameterSchemaJson = {
    address: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    role: {'Admin' : [] } | {'Producer' : [] } | {'Transporter' : [] } | {'Seller' : [] },
    };
/** Parameter type for update transaction for 'revokeRole' entrypoint of the 'track_and_trace' contract. */
export type RevokeRoleParameter = {
    address: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    role: { type: 'Admin'} | { type: 'Producer'} | { type: 'Transporter'} | { type: 'Seller'},
    };

/**
 * Construct schema JSON representation used in update transaction for 'revokeRole' entrypoint of the 'track_and_trace' contract.
 * @param {RevokeRoleParameter} parameter The structured parameter to construct from.
 * @returns {RevokeRoleParameterSchemaJson} The smart contract parameter JSON.
 */
function createRevokeRoleParameterSchemaJson(parameter: RevokeRoleParameter): RevokeRoleParameterSchemaJson {
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
    let match176: {'Admin' : [] } | {'Producer' : [] } | {'Transporter' : [] } | {'Seller' : [] };
    switch (field175.type) {
        case 'Admin':
            match176 = { Admin: [], };
        break;
        case 'Producer':
            match176 = { Producer: [], };
        break;
        case 'Transporter':
            match176 = { Transporter: [], };
        break;
        case 'Seller':
            match176 = { Seller: [], };
        break;
    }

    const named170 = {
    address: match172,
    role: match176,
    };
    return named170;
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
export type ErrorMessageRevokeRole = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};

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

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQ8AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQC');
    let match177: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
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
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match177
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
    const field194 = parameter.signature;
    const map195: [number, [number, {'Ed25519' : [string] }][]][] = [...field194.entries()].map(([key196, value197]) => {
    const map198: [number, {'Ed25519' : [string] }][] = [...value197.entries()].map(([key199, value200]) => {
    let match201: {'Ed25519' : [string] };
    switch (value200.type) {
        case 'Ed25519':
            match201 = { Ed25519: [value200.content], };
        break;
    }

        return [key199, match201];
    });
        return [key196, map198];
    });
    const field202 = parameter.signer;
    const accountAddress203 = SDK.AccountAddress.toSchemaValue(field202);
    const field204 = parameter.message;
    const field206 = field204.contract_address;
    const contractAddress207 = SDK.ContractAddress.toSchemaValue(field206);
    const field208 = field204.nonce;
    const number209 = BigInt(field208);
    const field210 = field204.timestamp;
    const timestamp211 = SDK.Timestamp.toSchemaValue(field210);
    const field212 = field204.entry_point;
    const field213 = field204.payload;
    const named205 = {
    contract_address: contractAddress207,
    nonce: number209,
    timestamp: timestamp211,
    entry_point: field212,
    payload: field213,
    };
    const named193 = {
    signature: map195,
    signer: accountAddress203,
    message: named205,
    };
    return named193;
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
export type ErrorMessagePermit = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};

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

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQ8AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQC');
    let match216: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in schemaJson) {
       match216 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match216 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match216 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match216 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match216 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match216 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match216 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match216 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match216 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match216 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match216 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match216 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match216 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match216 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match216 = {
           type: 'Expired',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match216
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
    const field233 = parameter.signature;
    const map234: [number, [number, {'Ed25519' : [string] }][]][] = [...field233.entries()].map(([key235, value236]) => {
    const map237: [number, {'Ed25519' : [string] }][] = [...value236.entries()].map(([key238, value239]) => {
    let match240: {'Ed25519' : [string] };
    switch (value239.type) {
        case 'Ed25519':
            match240 = { Ed25519: [value239.content], };
        break;
    }

        return [key238, match240];
    });
        return [key235, map237];
    });
    const field241 = parameter.signer;
    const accountAddress242 = SDK.AccountAddress.toSchemaValue(field241);
    const field243 = parameter.message;
    const field245 = field243.contract_address;
    const contractAddress246 = SDK.ContractAddress.toSchemaValue(field245);
    const field247 = field243.nonce;
    const number248 = BigInt(field247);
    const field249 = field243.timestamp;
    const timestamp250 = SDK.Timestamp.toSchemaValue(field249);
    const field251 = field243.entry_point;
    const field252 = field243.payload;
    const named244 = {
    contract_address: contractAddress246,
    nonce: number248,
    timestamp: timestamp250,
    entry_point: field251,
    payload: field252,
    };
    const named232 = {
    signature: map234,
    signer: accountAddress242,
    message: named244,
    };
    return named232;
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
export type ErrorMessageViewMessageHash = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};

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

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQ8AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQC');
    let match257: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in schemaJson) {
       match257 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match257 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match257 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match257 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match257 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match257 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match257 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match257 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match257 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match257 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match257 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match257 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match257 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match257 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match257 = {
           type: 'Expired',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match257
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
    const field274 = parameter.queries;
    const named273 = {
    queries: field274,
    };
    return named273;
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
    const list277 = schemaJson.map((item278) => {
    let match279: { type: 'NoSupport'} | { type: 'Support'} | { type: 'SupportBy', content: Array<SDK.ContractAddress.Type> };
    if ('NoSupport' in item278) {
       match279 = {
           type: 'NoSupport',
       };
    } else if ('Support' in item278) {
       match279 = {
           type: 'Support',
       };
    } else if ('SupportBy' in item278) {
       const variant282 = item278.SupportBy;
    const list283 = variant282[0].map((item284) => {
    const contractAddress285 = SDK.ContractAddress.fromSchemaValue(item284);
    return contractAddress285;
    });
       match279 = {
           type: 'SupportBy',
           content: list283,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match279;
    });
    return list277;
}

/** Error message for dry-running update transaction for 'supportsPermit' entrypoint of the 'track_and_trace' contract. */
export type ErrorMessageSupportsPermit = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};

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

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQ8AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQC');
    let match286: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in schemaJson) {
       match286 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match286 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match286 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match286 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match286 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match286 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match286 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match286 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match286 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match286 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match286 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match286 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match286 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match286 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match286 = {
           type: 'Expired',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match286
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
    const field303 = parameter.contract_address;
    const contractAddress304 = SDK.ContractAddress.toSchemaValue(field303);
    const field305 = parameter.nonce;
    const number306 = BigInt(field305);
    const field307 = parameter.timestamp;
    const timestamp308 = SDK.Timestamp.toSchemaValue(field307);
    const field309 = parameter.entry_point;
    const field310 = parameter.payload;
    const named302 = {
    contract_address: contractAddress304,
    nonce: number306,
    timestamp: timestamp308,
    entry_point: field309,
    payload: field310,
    };
    return named302;
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
    const list313 = parameter.map((item314) => {
    const accountAddress315 = SDK.AccountAddress.toSchemaValue(item314);
    return accountAddress315;
    });
    return list313;
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
export type ErrorMessageNonceOf = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};

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

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'Unauthorized' : [] } | {'ItemAlreadyExists' : [] } | {'ItemDoesNotExist' : [] } | {'FinalState' : [] } | {'NoContract' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQ8AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAVW5hdXRob3JpemVkAhEAAABJdGVtQWxyZWFkeUV4aXN0cwIQAAAASXRlbURvZXNOb3RFeGlzdAIKAAAARmluYWxTdGF0ZQIKAAAATm9Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQC');
    let match318: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'Unauthorized'} | { type: 'ItemAlreadyExists'} | { type: 'ItemDoesNotExist'} | { type: 'FinalState'} | { type: 'NoContract'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in schemaJson) {
       match318 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match318 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match318 = {
           type: 'LogMalformed',
       };
    } else if ('Unauthorized' in schemaJson) {
       match318 = {
           type: 'Unauthorized',
       };
    } else if ('ItemAlreadyExists' in schemaJson) {
       match318 = {
           type: 'ItemAlreadyExists',
       };
    } else if ('ItemDoesNotExist' in schemaJson) {
       match318 = {
           type: 'ItemDoesNotExist',
       };
    } else if ('FinalState' in schemaJson) {
       match318 = {
           type: 'FinalState',
       };
    } else if ('NoContract' in schemaJson) {
       match318 = {
           type: 'NoContract',
       };
    } else if ('MissingAccount' in schemaJson) {
       match318 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in schemaJson) {
       match318 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in schemaJson) {
       match318 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match318 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in schemaJson) {
       match318 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match318 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in schemaJson) {
       match318 = {
           type: 'Expired',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match318
}
