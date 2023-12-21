import * as SDK from "@concordium/web-sdk";
/** The reference of the smart contract module supported by the provided client. */
export declare const moduleReference: SDK.ModuleReference.Type;
/** Client for an on-chain smart contract module with module reference 'cd1e280d4bcae5c37aa0bcd391a7c516e9f9d8217b233599b8a97890a9275419', can be used for instantiating new smart contract instances. */
declare class Cis2MultiModule {
    /** Having a private field prevents similar structured objects to be considered the same type (similar to nominal typing). */
    private __nominal;
    /** Generic module client used internally. */
    readonly internalModuleClient: SDK.ModuleClient.Type;
    /** Constructor is only ment to be used internally in this module. Use functions such as `create` or `createUnchecked` for construction. */
    constructor(internalModuleClient: SDK.ModuleClient.Type);
}
/** Client for an on-chain smart contract module with module reference 'cd1e280d4bcae5c37aa0bcd391a7c516e9f9d8217b233599b8a97890a9275419', can be used for instantiating new smart contract instances. */
export type Type = Cis2MultiModule;
/**
 * Construct a Cis2MultiModule client for interacting with a smart contract module on chain.
 * This function ensures the smart contract module is deployed on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The concordium node client to use.
 * @throws If failing to communicate with the concordium node or if the module reference is not present on chain.
 * @returns {Cis2MultiModule} A module client ensured to be deployed on chain.
 */
export declare function create(grpcClient: SDK.ConcordiumGRPCClient): Promise<Cis2MultiModule>;
/**
 * Construct a Cis2MultiModule client for interacting with a smart contract module on chain.
 * It is up to the caller to ensure the module is deployed on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The concordium node client to use.
 * @returns {Cis2MultiModule}
 */
export declare function createUnchecked(grpcClient: SDK.ConcordiumGRPCClient): Cis2MultiModule;
/**
 * Construct a Cis2MultiModule client for interacting with a smart contract module on chain.
 * This function ensures the smart contract module is deployed on chain.
 * @param {Cis2MultiModule} moduleClient - The client of the on-chain smart contract module with referecence 'cd1e280d4bcae5c37aa0bcd391a7c516e9f9d8217b233599b8a97890a9275419'.
 * @throws If failing to communicate with the concordium node or if the module reference is not present on chain.
 * @returns {Cis2MultiModule} A module client ensured to be deployed on chain.
 */
export declare function checkOnChain(moduleClient: Cis2MultiModule): Promise<void>;
/**
 * Get the module source of the deployed smart contract module.
 * @param {Cis2MultiModule} moduleClient - The client of the on-chain smart contract module with referecence 'cd1e280d4bcae5c37aa0bcd391a7c516e9f9d8217b233599b8a97890a9275419'.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or module not found.
 * @returns {SDK.VersionedModuleSource} Module source of the deployed smart contract module.
 */
export declare function getModuleSource(moduleClient: Cis2MultiModule): Promise<SDK.VersionedModuleSource>;
/** Parameter type transaction for instantiating a new 'cis2_multi' smart contract instance */
export type Cis2MultiParameter = number | bigint;
/**
 * Construct Parameter type transaction for instantiating a new 'cis2_multi' smart contract instance.
 * @param {Cis2MultiParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createCis2MultiParameter(parameter: Cis2MultiParameter): SDK.Parameter.Type;
/**
 * Send transaction for instantiating a new 'cis2_multi' smart contract instance.
 * @param {Cis2MultiModule} moduleClient - The client of the on-chain smart contract module with referecence 'cd1e280d4bcae5c37aa0bcd391a7c516e9f9d8217b233599b8a97890a9275419'.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract module.
 * @param {Cis2MultiParameter} parameter - Parameter to provide as part of the transaction for the instantiation of a new smart contract contract.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If failing to communicate with the concordium node.
 * @returns {SDK.TransactionHash.Type}
 */
export declare function instantiateCis2Multi(moduleClient: Cis2MultiModule, transactionMetadata: SDK.ContractTransactionMetadata, parameter: Cis2MultiParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
export {};
