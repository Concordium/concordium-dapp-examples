"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instantiateSponsoredTxEnabledAuction = exports.createSponsoredTxEnabledAuctionParameter = exports.getModuleSource = exports.checkOnChain = exports.createUnchecked = exports.create = exports.moduleReference = void 0;
var SDK = require("@concordium/web-sdk");
/** The reference of the smart contract module supported by the provided client. */
exports.moduleReference = SDK.ModuleReference.fromHexString('782da60d4aaec2272dfb5a8e6d2c96f380b3722563ea4605912254103f5473bf');
/** Client for an on-chain smart contract module with module reference '782da60d4aaec2272dfb5a8e6d2c96f380b3722563ea4605912254103f5473bf', can be used for instantiating new smart contract instances. */
var SponsoredTxEnabledAuctionModule = /** @class */ (function () {
    /** Constructor is only ment to be used internally in this module. Use functions such as `create` or `createUnchecked` for construction. */
    function SponsoredTxEnabledAuctionModule(internalModuleClient) {
        /** Having a private field prevents similar structured objects to be considered the same type (similar to nominal typing). */
        this.__nominal = true;
        this.internalModuleClient = internalModuleClient;
    }
    return SponsoredTxEnabledAuctionModule;
}());
/**
 * Construct a SponsoredTxEnabledAuctionModule client for interacting with a smart contract module on chain.
 * This function ensures the smart contract module is deployed on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The concordium node client to use.
 * @throws If failing to communicate with the concordium node or if the module reference is not present on chain.
 * @returns {SponsoredTxEnabledAuctionModule} A module client ensured to be deployed on chain.
 */
function create(grpcClient) {
    return __awaiter(this, void 0, void 0, function () {
        var moduleClient;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, SDK.ModuleClient.create(grpcClient, exports.moduleReference)];
                case 1:
                    moduleClient = _a.sent();
                    return [2 /*return*/, new SponsoredTxEnabledAuctionModule(moduleClient)];
            }
        });
    });
}
exports.create = create;
/**
 * Construct a SponsoredTxEnabledAuctionModule client for interacting with a smart contract module on chain.
 * It is up to the caller to ensure the module is deployed on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The concordium node client to use.
 * @returns {SponsoredTxEnabledAuctionModule}
 */
function createUnchecked(grpcClient) {
    var moduleClient = SDK.ModuleClient.createUnchecked(grpcClient, exports.moduleReference);
    return new SponsoredTxEnabledAuctionModule(moduleClient);
}
exports.createUnchecked = createUnchecked;
/**
 * Construct a SponsoredTxEnabledAuctionModule client for interacting with a smart contract module on chain.
 * This function ensures the smart contract module is deployed on chain.
 * @param {SponsoredTxEnabledAuctionModule} moduleClient - The client of the on-chain smart contract module with referecence '782da60d4aaec2272dfb5a8e6d2c96f380b3722563ea4605912254103f5473bf'.
 * @throws If failing to communicate with the concordium node or if the module reference is not present on chain.
 * @returns {SponsoredTxEnabledAuctionModule} A module client ensured to be deployed on chain.
 */
function checkOnChain(moduleClient) {
    return SDK.ModuleClient.checkOnChain(moduleClient.internalModuleClient);
}
exports.checkOnChain = checkOnChain;
/**
 * Get the module source of the deployed smart contract module.
 * @param {SponsoredTxEnabledAuctionModule} moduleClient - The client of the on-chain smart contract module with referecence '782da60d4aaec2272dfb5a8e6d2c96f380b3722563ea4605912254103f5473bf'.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or module not found.
 * @returns {SDK.VersionedModuleSource} Module source of the deployed smart contract module.
 */
function getModuleSource(moduleClient) {
    return SDK.ModuleClient.getModuleSource(moduleClient.internalModuleClient);
}
exports.getModuleSource = getModuleSource;
/**
 * Construct Parameter type transaction for instantiating a new 'sponsored_tx_enabled_auction' smart contract instance.
 * @param {SponsoredTxEnabledAuctionParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createSponsoredTxEnabledAuctionParameter(parameter) {
    var contractAddress0 = SDK.ContractAddress.toSchemaValue(parameter);
    var out = SDK.Parameter.fromBase64SchemaType('DA==', contractAddress0);
    return out;
}
exports.createSponsoredTxEnabledAuctionParameter = createSponsoredTxEnabledAuctionParameter;
/**
 * Send transaction for instantiating a new 'sponsored_tx_enabled_auction' smart contract instance.
 * @param {SponsoredTxEnabledAuctionModule} moduleClient - The client of the on-chain smart contract module with referecence '782da60d4aaec2272dfb5a8e6d2c96f380b3722563ea4605912254103f5473bf'.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract module.
 * @param {SponsoredTxEnabledAuctionParameter} parameter - Parameter to provide as part of the transaction for the instantiation of a new smart contract contract.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If failing to communicate with the concordium node.
 * @returns {SDK.TransactionHash.Type}
 */
function instantiateSponsoredTxEnabledAuction(moduleClient, transactionMetadata, parameter, signer) {
    return SDK.ModuleClient.createAndSendInitTransaction(moduleClient.internalModuleClient, SDK.ContractName.fromStringUnchecked('sponsored_tx_enabled_auction'), transactionMetadata, createSponsoredTxEnabledAuctionParameter(parameter), signer);
}
exports.instantiateSponsoredTxEnabledAuction = instantiateSponsoredTxEnabledAuction;
