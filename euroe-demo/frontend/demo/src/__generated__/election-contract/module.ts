// @ts-nocheck
import * as SDK from "@concordium/web-sdk";

/** The reference of the smart contract module supported by the provided client. */
export const moduleReference: SDK.ModuleReference.Type = /*#__PURE__*/ SDK.ModuleReference.fromHexString('571e81543a24293da395eaa356bdd713114aab09a75926a6fad60a1e38b08db7');

/** Client for an on-chain smart contract module with module reference '571e81543a24293da395eaa356bdd713114aab09a75926a6fad60a1e38b08db7', can be used for instantiating new smart contract instances. */
class ModuleModule {
    /** Having a private field prevents similar structured objects to be considered the same type (similar to nominal typing). */
    private __nominal = true;
    /** Generic module client used internally. */
    public readonly internalModuleClient: SDK.ModuleClient.Type;

    /** Constructor is only ment to be used internally in this module. Use functions such as `create` or `createUnchecked` for construction. */
    constructor(internalModuleClient: SDK.ModuleClient.Type) {
        this.internalModuleClient = internalModuleClient;
    }
}

/** Client for an on-chain smart contract module with module reference '571e81543a24293da395eaa356bdd713114aab09a75926a6fad60a1e38b08db7', can be used for instantiating new smart contract instances. */
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
 * @param {ModuleModule} moduleClient - The client of the on-chain smart contract module with referecence '571e81543a24293da395eaa356bdd713114aab09a75926a6fad60a1e38b08db7'.
 * @throws If failing to communicate with the concordium node or if the module reference is not present on chain.
 * @returns {ModuleModule} A module client ensured to be deployed on chain.
 */
export function checkOnChain(moduleClient: ModuleModule): Promise<void> {
    return SDK.ModuleClient.checkOnChain(moduleClient.internalModuleClient);
}

/**
 * Get the module source of the deployed smart contract module.
 * @param {ModuleModule} moduleClient - The client of the on-chain smart contract module with referecence '571e81543a24293da395eaa356bdd713114aab09a75926a6fad60a1e38b08db7'.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or module not found.
 * @returns {SDK.VersionedModuleSource} Module source of the deployed smart contract module.
 */
export function getModuleSource(moduleClient: ModuleModule): Promise<SDK.VersionedModuleSource> {
    return SDK.ModuleClient.getModuleSource(moduleClient.internalModuleClient);
}

/** Parameter type transaction for instantiating a new 'election' smart contract instance */
export type ElectionParameter = {
    admin_account: SDK.AccountAddress.Type,
    candidates: Array<{
    url: string,
    hash: SDK.HexString,
    }>,
    guardians: Array<SDK.AccountAddress.Type>,
    eligible_voters: {
    url: string,
    hash: SDK.HexString,
    },
    election_description: string,
    election_start: SDK.Timestamp.Type,
    election_end: SDK.Timestamp.Type,
    };

/**
 * Construct Parameter type transaction for instantiating a new 'election' smart contract instance.
 * @param {ElectionParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createElectionParameter(parameter: ElectionParameter): SDK.Parameter.Type {
    const field1 = parameter.admin_account;
    const accountAddress2 = SDK.AccountAddress.toSchemaValue(field1);
    const field3 = parameter.candidates;
    const list4 = field3.map((item5) => {
    const field7 = item5.url;
    const field8 = item5.hash;
    const named6 = {
    url: field7,
    hash: field8,
    };
    return named6;
    });
    const field9 = parameter.guardians;
    const list10 = field9.map((item11) => {
    const accountAddress12 = SDK.AccountAddress.toSchemaValue(item11);
    return accountAddress12;
    });
    const field13 = parameter.eligible_voters;
    const field15 = field13.url;
    const field16 = field13.hash;
    const named14 = {
    url: field15,
    hash: field16,
    };
    const field17 = parameter.election_description;
    const field18 = parameter.election_start;
    const timestamp19 = SDK.Timestamp.toSchemaValue(field18);
    const field20 = parameter.election_end;
    const timestamp21 = SDK.Timestamp.toSchemaValue(field20);
    const named0 = {
    admin_account: accountAddress2,
    candidates: list4,
    guardians: list10,
    eligible_voters: named14,
    election_description: field17,
    election_start: timestamp19,
    election_end: timestamp21,
    };
    const out = SDK.Parameter.fromBase64SchemaType('FAAHAAAADQAAAGFkbWluX2FjY291bnQLCgAAAGNhbmRpZGF0ZXMQAhQAAgAAAAMAAAB1cmwWAgQAAABoYXNoHiAAAAAJAAAAZ3VhcmRpYW5zEAILDwAAAGVsaWdpYmxlX3ZvdGVycxQAAgAAAAMAAAB1cmwWAgQAAABoYXNoHiAAAAAUAAAAZWxlY3Rpb25fZGVzY3JpcHRpb24WAg4AAABlbGVjdGlvbl9zdGFydA0MAAAAZWxlY3Rpb25fZW5kDQ==', named0);
    return out
}

/**
 * Send transaction for instantiating a new 'election' smart contract instance.
 * @param {ModuleModule} moduleClient - The client of the on-chain smart contract module with referecence '571e81543a24293da395eaa356bdd713114aab09a75926a6fad60a1e38b08db7'.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract module.
 * @param {ElectionParameter} parameter - Parameter to provide as part of the transaction for the instantiation of a new smart contract contract.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If failing to communicate with the concordium node.
 * @returns {SDK.TransactionHash.Type}
 */
export function instantiateElection(moduleClient: ModuleModule, transactionMetadata: SDK.ContractTransactionMetadata, parameter: ElectionParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return SDK.ModuleClient.createAndSendInitTransaction(
        moduleClient.internalModuleClient,
        SDK.ContractName.fromStringUnchecked('election'),
        transactionMetadata,
        createElectionParameter(parameter),
        signer
    );
}
