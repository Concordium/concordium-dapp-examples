// @ts-nocheck
import * as SDK from "@concordium/web-sdk";
/** The reference of the smart contract module supported by the provided client. */
export const moduleReference: SDK.ModuleReference.Type = /*#__PURE__*/ SDK.ModuleReference.fromHexString('757693d8e141665881e9dbc40be07da4cba32ef89d8824fb579cd66619443129');

/** Client for an on-chain smart contract module with module reference '757693d8e141665881e9dbc40be07da4cba32ef89d8824fb579cd66619443129', can be used for instantiating new smart contract instances. */
class ModuleModule {
    /** Having a private field prevents similar structured objects to be considered the same type (similar to nominal typing). */
    private __nominal = true;
    /** Generic module client used internally. */
    public readonly internalModuleClient: SDK.ModuleClient.Type;

    /** Constructor is only meant to be used internally in this module. Use functions such as `create` or `createUnchecked` for construction. */
    constructor(internalModuleClient: SDK.ModuleClient.Type) {
        this.internalModuleClient = internalModuleClient;
    }
}

/** Client for an on-chain smart contract module with module reference '757693d8e141665881e9dbc40be07da4cba32ef89d8824fb579cd66619443129', can be used for instantiating new smart contract instances. */
export type Type = ModuleModule;

/**
 * Construct a ModuleModule client for interacting with a smart contract module on chain.
 * This function ensures the smart contract module is deployed on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The concordium node client to use.
 * @throws If failing to communicate with the concordium node or if the module reference is not present on chain.
 * @returns {ModuleModule} A module client ensured to be deployed on chain.
 */
export async function create(grpcClient: SDK.ConcordiumGRPCClient): Promise<ModuleModule> {
    const moduleClient = await SDK.ModuleClient.create(grpcClient, moduleReference);
    return new ModuleModule(moduleClient);
}

/**
 * Construct a ModuleModule client for interacting with a smart contract module on chain.
 * It is up to the caller to ensure the module is deployed on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The concordium node client to use.
 * @returns {ModuleModule}
 */
export function createUnchecked(grpcClient: SDK.ConcordiumGRPCClient): ModuleModule {
    const moduleClient = SDK.ModuleClient.createUnchecked(grpcClient, moduleReference);
    return new ModuleModule(moduleClient);
}

/**
 * Construct a ModuleModule client for interacting with a smart contract module on chain.
 * This function ensures the smart contract module is deployed on chain.
 * @param {ModuleModule} moduleClient - The client of the on-chain smart contract module with referecence '757693d8e141665881e9dbc40be07da4cba32ef89d8824fb579cd66619443129'.
 * @throws If failing to communicate with the concordium node or if the module reference is not present on chain.
 * @returns {ModuleModule} A module client ensured to be deployed on chain.
 */
export function checkOnChain(moduleClient: ModuleModule): Promise<void> {
    return SDK.ModuleClient.checkOnChain(moduleClient.internalModuleClient);
}

/**
 * Get the module source of the deployed smart contract module.
 * @param {ModuleModule} moduleClient - The client of the on-chain smart contract module with referecence '757693d8e141665881e9dbc40be07da4cba32ef89d8824fb579cd66619443129'.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or module not found.
 * @returns {SDK.VersionedModuleSource} Module source of the deployed smart contract module.
 */
export function getModuleSource(moduleClient: ModuleModule): Promise<SDK.VersionedModuleSource> {
    return SDK.ModuleClient.getModuleSource(moduleClient.internalModuleClient);
}
/** Base64 encoding of the parameter schema type used when instantiating a new 'track_and_trace' smart contract instance. */
const base64TrackAndTraceParameterSchema = 'EAIUAAMAAAAEAAAAZnJvbRUEAAAACAAAAFByb2R1Y2VkAgkAAABJblRyYW5zaXQCBwAAAEluU3RvcmUCBAAAAFNvbGQCAgAAAHRvEAIVBAAAAAgAAABQcm9kdWNlZAIJAAAASW5UcmFuc2l0AgcAAABJblN0b3JlAgQAAABTb2xkAhIAAABhdXRob3JpemVkX2FjY291bnQL';
/** Parameter JSON type needed by the schema when instantiating a new 'track_and_trace' smart contract instance. */
type TrackAndTraceParameterSchemaJson = Array<{
    from: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] },
    to: Array<{'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] }>,
    authorized_account: SDK.AccountAddress.SchemaValue,
    }>;
/** Parameter type transaction for instantiating a new 'track_and_trace' smart contract instance. */
export type TrackAndTraceParameter = Array<{
    from: { type: 'Produced'} | { type: 'InTransit'} | { type: 'InStore'} | { type: 'Sold'},
    to: Array<{ type: 'Produced'} | { type: 'InTransit'} | { type: 'InStore'} | { type: 'Sold'}>,
    authorized_account: SDK.AccountAddress.Type,
    }>;

/**
 * Construct schema JSON representation used in transactions for instantiating a new 'track_and_trace' smart contract instance.
 * @param {TrackAndTraceParameter} parameter The structured parameter to construct from.
 * @returns {TrackAndTraceParameterSchemaJson} The smart contract parameter JSON.
 */
function createTrackAndTraceParameterSchemaJson(parameter: TrackAndTraceParameter): TrackAndTraceParameterSchemaJson {
    const list0 = parameter.map((item1) => {
    const field3 = item1.from;
    let match4: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] };
    switch (field3.type) {
        case 'Produced':
            match4 = { Produced: [], };
        break;
        case 'InTransit':
            match4 = { InTransit: [], };
        break;
        case 'InStore':
            match4 = { InStore: [], };
        break;
        case 'Sold':
            match4 = { Sold: [], };
        break;
    }

    const field5 = item1.to;
    const list6 = field5.map((item7) => {
    let match8: {'Produced' : [] } | {'InTransit' : [] } | {'InStore' : [] } | {'Sold' : [] };
    switch (item7.type) {
        case 'Produced':
            match8 = { Produced: [], };
        break;
        case 'InTransit':
            match8 = { InTransit: [], };
        break;
        case 'InStore':
            match8 = { InStore: [], };
        break;
        case 'Sold':
            match8 = { Sold: [], };
        break;
    }

    return match8;
    });
    const field9 = item1.authorized_account;
    const accountAddress10 = SDK.AccountAddress.toSchemaValue(field9);
    const named2 = {
    from: match4,
    to: list6,
    authorized_account: accountAddress10,
    };
    return named2;
    });
    return list0;
}

/**
 * Construct Parameter type used in transactions for instantiating a new 'track_and_trace' smart contract instance.
 * @param {TrackAndTraceParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createTrackAndTraceParameter(parameter: TrackAndTraceParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64TrackAndTraceParameterSchema, createTrackAndTraceParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in transactions for instantiating a new 'track_and_trace' smart contract instance.
 * @param {TrackAndTraceParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createTrackAndTraceParameterWebWallet(parameter: TrackAndTraceParameter) {
    return {
        parameters: createTrackAndTraceParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64TrackAndTraceParameterSchema, 'base64')
        },
    }
}

/**
 * Send transaction for instantiating a new 'track_and_trace' smart contract instance.
 * @param {ModuleModule} moduleClient - The client of the on-chain smart contract module with referecence '757693d8e141665881e9dbc40be07da4cba32ef89d8824fb579cd66619443129'.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract module.
 * @param {TrackAndTraceParameter} parameter - Parameter to provide as part of the transaction for the instantiation of a new smart contract contract.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If failing to communicate with the concordium node.
 * @returns {SDK.TransactionHash.Type}
 */
export function instantiateTrackAndTrace(moduleClient: ModuleModule, transactionMetadata: SDK.ContractTransactionMetadata, parameter: TrackAndTraceParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return SDK.ModuleClient.createAndSendInitTransaction(
        moduleClient.internalModuleClient,
        SDK.ContractName.fromStringUnchecked('track_and_trace'),
        transactionMetadata,
        createTrackAndTraceParameter(parameter),
        signer
    );
}
