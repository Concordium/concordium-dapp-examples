// @ts-nocheck
import * as SDK from "@concordium/web-sdk";

/** The reference of the smart contract module supported by the provided client. */
export const moduleReference: SDK.ModuleReference.Type = /*#__PURE__*/ SDK.ModuleReference.fromHexString('e95d15e62c8f9d80e08de180a3c0188d602a5f5ed58b8c34daa82131b9940c3a');

/** Client for an on-chain smart contract module with module reference 'e95d15e62c8f9d80e08de180a3c0188d602a5f5ed58b8c34daa82131b9940c3a', can be used for instantiating new smart contract instances. */
class Cis2MultiModule {
    /** Having a private field prevents similar structured objects to be considered the same type (similar to nominal typing). */
    private __nominal = true;
    /** Generic module client used internally. */
    public readonly internalModuleClient: SDK.ModuleClient.Type;

    /** Constructor is only ment to be used internally in this module. Use functions such as `create` or `createUnchecked` for construction. */
    constructor(internalModuleClient: SDK.ModuleClient.Type) {
        this.internalModuleClient = internalModuleClient;
    }
}

/** Client for an on-chain smart contract module with module reference 'e95d15e62c8f9d80e08de180a3c0188d602a5f5ed58b8c34daa82131b9940c3a', can be used for instantiating new smart contract instances. */
export type Type = Cis2MultiModule;

/**
 * Construct a Cis2MultiModule client for interacting with a smart contract module on chain.
 * This function ensures the smart contract module is deployed on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The concordium node client to use.
 * @throws If failing to communicate with the concordium node or if the module reference is not present on chain.
 * @returns {Cis2MultiModule} A module client ensured to be deployed on chain.
 */
export async function create(grpcClient: SDK.ConcordiumGRPCClient): Promise<Cis2MultiModule> {
    const moduleClient = await SDK.ModuleClient.create(grpcClient, moduleReference);
    return new Cis2MultiModule(moduleClient);
}

/**
 * Construct a Cis2MultiModule client for interacting with a smart contract module on chain.
 * It is up to the caller to ensure the module is deployed on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The concordium node client to use.
 * @returns {Cis2MultiModule}
 */
export function createUnchecked(grpcClient: SDK.ConcordiumGRPCClient): Cis2MultiModule {
    const moduleClient = SDK.ModuleClient.createUnchecked(grpcClient, moduleReference);
    return new Cis2MultiModule(moduleClient);
}

/**
 * Construct a Cis2MultiModule client for interacting with a smart contract module on chain.
 * This function ensures the smart contract module is deployed on chain.
 * @param {Cis2MultiModule} moduleClient - The client of the on-chain smart contract module with referecence 'e95d15e62c8f9d80e08de180a3c0188d602a5f5ed58b8c34daa82131b9940c3a'.
 * @throws If failing to communicate with the concordium node or if the module reference is not present on chain.
 * @returns {Cis2MultiModule} A module client ensured to be deployed on chain.
 */
export function checkOnChain(moduleClient: Cis2MultiModule): Promise<void> {
    return SDK.ModuleClient.checkOnChain(moduleClient.internalModuleClient);
}

/**
 * Get the module source of the deployed smart contract module.
 * @param {Cis2MultiModule} moduleClient - The client of the on-chain smart contract module with referecence 'e95d15e62c8f9d80e08de180a3c0188d602a5f5ed58b8c34daa82131b9940c3a'.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or module not found.
 * @returns {SDK.VersionedModuleSource} Module source of the deployed smart contract module.
 */
export function getModuleSource(moduleClient: Cis2MultiModule): Promise<SDK.VersionedModuleSource> {
    return SDK.ModuleClient.getModuleSource(moduleClient.internalModuleClient);
}

/** Parameter type transaction for instantiating a new 'cis2_multi' smart contract instance */
export type Cis2MultiParameter = number | bigint;

/**
 * Construct Parameter type transaction for instantiating a new 'cis2_multi' smart contract instance.
 * @param {Cis2MultiParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createCis2MultiParameter(parameter: Cis2MultiParameter): SDK.Parameter.Type {
    const number0 = BigInt(parameter).toString();
    const out = SDK.Parameter.fromBase64SchemaType('GyUAAAA=', number0);
    return out
}

/**
 * Send transaction for instantiating a new 'cis2_multi' smart contract instance.
 * @param {Cis2MultiModule} moduleClient - The client of the on-chain smart contract module with referecence 'e95d15e62c8f9d80e08de180a3c0188d602a5f5ed58b8c34daa82131b9940c3a'.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract module.
 * @param {Cis2MultiParameter} parameter - Parameter to provide as part of the transaction for the instantiation of a new smart contract contract.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If failing to communicate with the concordium node.
 * @returns {SDK.TransactionHash.Type}
 */
export function instantiateCis2Multi(moduleClient: Cis2MultiModule, transactionMetadata: SDK.ContractTransactionMetadata, parameter: Cis2MultiParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return SDK.ModuleClient.createAndSendInitTransaction(
        moduleClient.internalModuleClient,
        SDK.ContractName.fromStringUnchecked('cis2_multi'),
        transactionMetadata,
        createCis2MultiParameter(parameter),
        signer
    );
}
