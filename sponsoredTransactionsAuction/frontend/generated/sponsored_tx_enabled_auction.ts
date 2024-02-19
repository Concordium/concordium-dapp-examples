// @ts-nocheck
import * as SDK from "@concordium/web-sdk";
/** The reference of the smart contract module supported by the provided client. */
export const moduleReference: SDK.ModuleReference.Type = /*#__PURE__*/ SDK.ModuleReference.fromHexString('59166ebadaf1e4f13b4fc06727a3719b38482f57d5fbc64799eed97fd58debc5');

/** Client for an on-chain smart contract module with module reference '59166ebadaf1e4f13b4fc06727a3719b38482f57d5fbc64799eed97fd58debc5', can be used for instantiating new smart contract instances. */
class SponsoredTxEnabledAuctionModule {
    /** Having a private field prevents similar structured objects to be considered the same type (similar to nominal typing). */
    private __nominal = true;
    /** Generic module client used internally. */
    public readonly internalModuleClient: SDK.ModuleClient.Type;

    /** Constructor is only meant to be used internally in this module. Use functions such as `create` or `createUnchecked` for construction. */
    constructor(internalModuleClient: SDK.ModuleClient.Type) {
        this.internalModuleClient = internalModuleClient;
    }
}

/** Client for an on-chain smart contract module with module reference '59166ebadaf1e4f13b4fc06727a3719b38482f57d5fbc64799eed97fd58debc5', can be used for instantiating new smart contract instances. */
export type Type = SponsoredTxEnabledAuctionModule;

/**
 * Construct a SponsoredTxEnabledAuctionModule client for interacting with a smart contract module on chain.
 * This function ensures the smart contract module is deployed on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The concordium node client to use.
 * @throws If failing to communicate with the concordium node or if the module reference is not present on chain.
 * @returns {SponsoredTxEnabledAuctionModule} A module client ensured to be deployed on chain.
 */
export async function create(grpcClient: SDK.ConcordiumGRPCClient): Promise<SponsoredTxEnabledAuctionModule> {
    const moduleClient = await SDK.ModuleClient.create(grpcClient, moduleReference);
    return new SponsoredTxEnabledAuctionModule(moduleClient);
}

/**
 * Construct a SponsoredTxEnabledAuctionModule client for interacting with a smart contract module on chain.
 * It is up to the caller to ensure the module is deployed on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The concordium node client to use.
 * @returns {SponsoredTxEnabledAuctionModule}
 */
export function createUnchecked(grpcClient: SDK.ConcordiumGRPCClient): SponsoredTxEnabledAuctionModule {
    const moduleClient = SDK.ModuleClient.createUnchecked(grpcClient, moduleReference);
    return new SponsoredTxEnabledAuctionModule(moduleClient);
}

/**
 * Construct a SponsoredTxEnabledAuctionModule client for interacting with a smart contract module on chain.
 * This function ensures the smart contract module is deployed on chain.
 * @param {SponsoredTxEnabledAuctionModule} moduleClient - The client of the on-chain smart contract module with referecence '59166ebadaf1e4f13b4fc06727a3719b38482f57d5fbc64799eed97fd58debc5'.
 * @throws If failing to communicate with the concordium node or if the module reference is not present on chain.
 * @returns {SponsoredTxEnabledAuctionModule} A module client ensured to be deployed on chain.
 */
export function checkOnChain(moduleClient: SponsoredTxEnabledAuctionModule): Promise<void> {
    return SDK.ModuleClient.checkOnChain(moduleClient.internalModuleClient);
}

/**
 * Get the module source of the deployed smart contract module.
 * @param {SponsoredTxEnabledAuctionModule} moduleClient - The client of the on-chain smart contract module with referecence '59166ebadaf1e4f13b4fc06727a3719b38482f57d5fbc64799eed97fd58debc5'.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or module not found.
 * @returns {SDK.VersionedModuleSource} Module source of the deployed smart contract module.
 */
export function getModuleSource(moduleClient: SponsoredTxEnabledAuctionModule): Promise<SDK.VersionedModuleSource> {
    return SDK.ModuleClient.getModuleSource(moduleClient.internalModuleClient);
}
/** Base64 encoding of the parameter schema type used when instantiating a new 'sponsored_tx_enabled_auction' smart contract instance. */
const base64SponsoredTxEnabledAuctionParameterSchema = 'DA==';
/** Parameter JSON type needed by the schema when instantiating a new 'sponsored_tx_enabled_auction' smart contract instance. */
type SponsoredTxEnabledAuctionParameterSchemaJson = SDK.ContractAddress.SchemaValue;
/** Parameter type transaction for instantiating a new 'sponsored_tx_enabled_auction' smart contract instance. */
export type SponsoredTxEnabledAuctionParameter = SDK.ContractAddress.Type;

/**
 * Construct schema JSON representation used in transactions for instantiating a new 'sponsored_tx_enabled_auction' smart contract instance.
 * @param {SponsoredTxEnabledAuctionParameter} parameter The structured parameter to construct from.
 * @returns {SponsoredTxEnabledAuctionParameterSchemaJson} The smart contract parameter JSON.
 */
function createSponsoredTxEnabledAuctionParameterSchemaJson(parameter: SponsoredTxEnabledAuctionParameter): SponsoredTxEnabledAuctionParameterSchemaJson {
    const contractAddress0 = SDK.ContractAddress.toSchemaValue(parameter);
    return contractAddress0;
}

/**
 * Construct Parameter type used in transactions for instantiating a new 'sponsored_tx_enabled_auction' smart contract instance.
 * @param {SponsoredTxEnabledAuctionParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createSponsoredTxEnabledAuctionParameter(parameter: SponsoredTxEnabledAuctionParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64SponsoredTxEnabledAuctionParameterSchema, createSponsoredTxEnabledAuctionParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in transactions for instantiating a new 'sponsored_tx_enabled_auction' smart contract instance.
 * @param {SponsoredTxEnabledAuctionParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createSponsoredTxEnabledAuctionParameterWebWallet(parameter: SponsoredTxEnabledAuctionParameter) {
    return {
        parameters: createSponsoredTxEnabledAuctionParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64SponsoredTxEnabledAuctionParameterSchema, 'base64')
        },
    }
}

/**
 * Send transaction for instantiating a new 'sponsored_tx_enabled_auction' smart contract instance.
 * @param {SponsoredTxEnabledAuctionModule} moduleClient - The client of the on-chain smart contract module with referecence '59166ebadaf1e4f13b4fc06727a3719b38482f57d5fbc64799eed97fd58debc5'.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract module.
 * @param {SponsoredTxEnabledAuctionParameter} parameter - Parameter to provide as part of the transaction for the instantiation of a new smart contract contract.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If failing to communicate with the concordium node.
 * @returns {SDK.TransactionHash.Type}
 */
export function instantiateSponsoredTxEnabledAuction(moduleClient: SponsoredTxEnabledAuctionModule, transactionMetadata: SDK.ContractTransactionMetadata, parameter: SponsoredTxEnabledAuctionParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return SDK.ModuleClient.createAndSendInitTransaction(
        moduleClient.internalModuleClient,
        SDK.ContractName.fromStringUnchecked('sponsored_tx_enabled_auction'),
        transactionMetadata,
        createSponsoredTxEnabledAuctionParameter(parameter),
        signer
    );
}
