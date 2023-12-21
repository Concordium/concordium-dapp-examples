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
exports.dryRunSerializationHelper = exports.sendSerializationHelper = exports.createSerializationHelperParameter = exports.parseReturnValueViewItemState = exports.dryRunViewItemState = exports.sendViewItemState = exports.createViewItemStateParameter = exports.parseReturnValueView = exports.dryRunView = exports.sendView = exports.createViewParameter = exports.parseErrorMessageFinalize = exports.dryRunFinalize = exports.sendFinalize = exports.createFinalizeParameter = exports.parseErrorMessageBid = exports.dryRunBid = exports.sendBid = exports.createBidParameter = exports.dryRunAddItem = exports.sendAddItem = exports.createAddItemParameter = exports.parseEvent = exports.checkOnChain = exports.createUnchecked = exports.create = exports.contractName = exports.moduleReference = void 0;
var SDK = require("@concordium/web-sdk");
/** The reference of the smart contract module supported by the provided client. */
exports.moduleReference = SDK.ModuleReference.fromHexString('782da60d4aaec2272dfb5a8e6d2c96f380b3722563ea4605912254103f5473bf');
/** Name of the smart contract supported by this client. */
exports.contractName = SDK.ContractName.fromStringUnchecked('sponsored_tx_enabled_auction');
/** Smart contract client for a contract instance on chain. */
var SponsoredTxEnabledAuctionContract = /** @class */ (function () {
    function SponsoredTxEnabledAuctionContract(grpcClient, contractAddress, genericContract) {
        /** Having a private field prevents similar structured objects to be considered the same type (similar to nominal typing). */
        this.__nominal = true;
        this.grpcClient = grpcClient;
        this.contractAddress = contractAddress;
        this.genericContract = genericContract;
    }
    return SponsoredTxEnabledAuctionContract;
}());
/**
 * Construct an instance of `SponsoredTxEnabledAuctionContract` for interacting with a 'sponsored_tx_enabled_auction' contract on chain.
 * Checking the information instance on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @param {SDK.BlockHash.Type} [blockHash] - Hash of the block to check the information at. When not provided the last finalized block is used.
 * @throws If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SponsoredTxEnabledAuctionContract}
 */
function create(grpcClient, contractAddress, blockHash) {
    return __awaiter(this, void 0, void 0, function () {
        var genericContract;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    genericContract = new SDK.Contract(grpcClient, contractAddress, exports.contractName);
                    return [4 /*yield*/, genericContract.checkOnChain({ moduleReference: exports.moduleReference, blockHash: blockHash })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, new SponsoredTxEnabledAuctionContract(grpcClient, contractAddress, genericContract)];
            }
        });
    });
}
exports.create = create;
/**
 * Construct the `SponsoredTxEnabledAuctionContract` for interacting with a 'sponsored_tx_enabled_auction' contract on chain.
 * Without checking the instance information on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @returns {SponsoredTxEnabledAuctionContract}
 */
function createUnchecked(grpcClient, contractAddress) {
    var genericContract = new SDK.Contract(grpcClient, contractAddress, exports.contractName);
    return new SponsoredTxEnabledAuctionContract(grpcClient, contractAddress, genericContract);
}
exports.createUnchecked = createUnchecked;
/**
 * Check if the smart contract instance exists on the blockchain and whether it uses a matching contract name and module reference.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.BlockHash.Type} [blockHash] A optional block hash to use for checking information on chain, if not provided the last finalized will be used.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 */
function checkOnChain(contractClient, blockHash) {
    return contractClient.genericContract.checkOnChain({ moduleReference: exports.moduleReference, blockHash: blockHash });
}
exports.checkOnChain = checkOnChain;
/**
 * Parse the contract events logged by the 'sponsored_tx_enabled_auction' contract.
 * @param {SDK.ContractEvent.Type} event The unparsed contract event.
 * @returns {Event} The structured contract event.
 */
function parseEvent(event) {
    var schemaJson = SDK.ContractEvent.parseWithSchemaTypeBase64(event, 'HwEAAAAADAAAAEFkZEl0ZW1FdmVudAABAAAACgAAAGl0ZW1faW5kZXgD');
    var match1;
    if ('AddItemEvent' in schemaJson) {
        var variant2 = schemaJson.AddItemEvent;
        var field3 = variant2.item_index;
        var named4 = {
            item_index: field3,
        };
        match1 = {
            type: 'AddItemEvent',
            content: named4,
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    return match1;
}
exports.parseEvent = parseEvent;
/**
 * Construct Parameter for update transactions for 'addItem' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {AddItemParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createAddItemParameter(parameter) {
    var field6 = parameter.name;
    var field7 = parameter.end;
    var timestamp8 = SDK.Timestamp.toSchemaValue(field7);
    var field9 = parameter.start;
    var timestamp10 = SDK.Timestamp.toSchemaValue(field9);
    var field11 = parameter.minimum_bid;
    var number12 = BigInt(field11).toString();
    var field13 = parameter.token_id;
    var named5 = {
        name: field6,
        end: timestamp8,
        start: timestamp10,
        minimum_bid: number12,
        token_id: field13,
    };
    var out = SDK.Parameter.fromBase64SchemaType('FAAFAAAABAAAAG5hbWUWAgMAAABlbmQNBQAAAHN0YXJ0DQsAAABtaW5pbXVtX2JpZBslAAAACAAAAHRva2VuX2lkHQA=', named5);
    return out;
}
exports.createAddItemParameter = createAddItemParameter;
/**
 * Send an update-contract transaction to the 'addItem' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {AddItemParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendAddItem(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('addItem'), SDK.Parameter.toBuffer, transactionMetadata, createAddItemParameter(parameter), signer);
}
exports.sendAddItem = sendAddItem;
/**
 * Dry-run an update-contract transaction to the 'addItem' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {AddItemParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunAddItem(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('addItem'), invokeMetadata, SDK.Parameter.toBuffer, createAddItemParameter(parameter), blockHash);
}
exports.dryRunAddItem = dryRunAddItem;
/**
 * Construct Parameter for update transactions for 'bid' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {BidParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createBidParameter(parameter) {
    var field15 = parameter.token_id;
    var field16 = parameter.amount;
    var number17 = BigInt(field16).toString();
    var field18 = parameter.from;
    var match19;
    switch (field18.type) {
        case 'Account':
            var accountAddress20 = SDK.AccountAddress.toSchemaValue(field18.content);
            match19 = { Account: [accountAddress20], };
            break;
        case 'Contract':
            var contractAddress21 = SDK.ContractAddress.toSchemaValue(field18.content);
            match19 = { Contract: [contractAddress21], };
            break;
    }
    var field22 = parameter.data;
    var named14 = {
        token_id: field15,
        amount: number17,
        from: match19,
        data: field22,
    };
    var out = SDK.Parameter.fromBase64SchemaType('FAAEAAAACAAAAHRva2VuX2lkHQAGAAAAYW1vdW50GyUAAAAEAAAAZnJvbRUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwEAAAAZGF0YQM=', named14);
    return out;
}
exports.createBidParameter = createBidParameter;
/**
 * Send an update-contract transaction to the 'bid' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {BidParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendBid(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('bid'), SDK.Parameter.toBuffer, transactionMetadata, createBidParameter(parameter), signer);
}
exports.sendBid = sendBid;
/**
 * Dry-run an update-contract transaction to the 'bid' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {BidParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunBid(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('bid'), invokeMetadata, SDK.Parameter.toBuffer, createBidParameter(parameter), blockHash);
}
exports.dryRunBid = dryRunBid;
/**
 * Get and parse the error message from dry-running update transaction for 'bid' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageBid | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
function parseErrorMessageBid(invokeResult) {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRcAAAALAAAAUGFyc2VQYXJhbXMCEQAAAFN0YXJ0RW5kVGltZUVycm9yAgwAAABFbmRUaW1lRXJyb3ICCwAAAE9ubHlBY2NvdW50AhcAAABCaWROb3RHcmVhdGVyQ3VycmVudEJpZAIKAAAAQmlkVG9vTGF0ZQIXAAAAQXVjdGlvbkFscmVhZHlGaW5hbGl6ZWQCBgAAAE5vSXRlbQISAAAAQXVjdGlvblN0aWxsQWN0aXZlAhAAAABOb3RUb2tlbkNvbnRyYWN0AgwAAABXcm9uZ1Rva2VuSUQCEwAAAEludm9rZUNvbnRyYWN0RXJyb3ICCwAAAFBhcnNlUmVzdWx0Ag8AAABJbnZhbGlkUmVzcG9uc2UCDgAAAEFtb3VudFRvb0xhcmdlAg4AAABNaXNzaW5nQWNjb3VudAIPAAAATWlzc2luZ0NvbnRyYWN0AhEAAABNaXNzaW5nRW50cnlwb2ludAINAAAATWVzc2FnZUZhaWxlZAILAAAATG9naWNSZWplY3QCBAAAAFRyYXACBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAI=');
    var match23;
    if ('ParseParams' in schemaJson) {
        match23 = {
            type: 'ParseParams',
        };
    }
    else if ('StartEndTimeError' in schemaJson) {
        match23 = {
            type: 'StartEndTimeError',
        };
    }
    else if ('EndTimeError' in schemaJson) {
        match23 = {
            type: 'EndTimeError',
        };
    }
    else if ('OnlyAccount' in schemaJson) {
        match23 = {
            type: 'OnlyAccount',
        };
    }
    else if ('BidNotGreaterCurrentBid' in schemaJson) {
        match23 = {
            type: 'BidNotGreaterCurrentBid',
        };
    }
    else if ('BidTooLate' in schemaJson) {
        match23 = {
            type: 'BidTooLate',
        };
    }
    else if ('AuctionAlreadyFinalized' in schemaJson) {
        match23 = {
            type: 'AuctionAlreadyFinalized',
        };
    }
    else if ('NoItem' in schemaJson) {
        match23 = {
            type: 'NoItem',
        };
    }
    else if ('AuctionStillActive' in schemaJson) {
        match23 = {
            type: 'AuctionStillActive',
        };
    }
    else if ('NotTokenContract' in schemaJson) {
        match23 = {
            type: 'NotTokenContract',
        };
    }
    else if ('WrongTokenID' in schemaJson) {
        match23 = {
            type: 'WrongTokenID',
        };
    }
    else if ('InvokeContractError' in schemaJson) {
        match23 = {
            type: 'InvokeContractError',
        };
    }
    else if ('ParseResult' in schemaJson) {
        match23 = {
            type: 'ParseResult',
        };
    }
    else if ('InvalidResponse' in schemaJson) {
        match23 = {
            type: 'InvalidResponse',
        };
    }
    else if ('AmountTooLarge' in schemaJson) {
        match23 = {
            type: 'AmountTooLarge',
        };
    }
    else if ('MissingAccount' in schemaJson) {
        match23 = {
            type: 'MissingAccount',
        };
    }
    else if ('MissingContract' in schemaJson) {
        match23 = {
            type: 'MissingContract',
        };
    }
    else if ('MissingEntrypoint' in schemaJson) {
        match23 = {
            type: 'MissingEntrypoint',
        };
    }
    else if ('MessageFailed' in schemaJson) {
        match23 = {
            type: 'MessageFailed',
        };
    }
    else if ('LogicReject' in schemaJson) {
        match23 = {
            type: 'LogicReject',
        };
    }
    else if ('Trap' in schemaJson) {
        match23 = {
            type: 'Trap',
        };
    }
    else if ('LogFull' in schemaJson) {
        match23 = {
            type: 'LogFull',
        };
    }
    else if ('LogMalformed' in schemaJson) {
        match23 = {
            type: 'LogMalformed',
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    return match23;
}
exports.parseErrorMessageBid = parseErrorMessageBid;
/**
 * Construct Parameter for update transactions for 'finalize' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {FinalizeParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createFinalizeParameter(parameter) {
    var out = SDK.Parameter.fromBase64SchemaType('Aw==', parameter);
    return out;
}
exports.createFinalizeParameter = createFinalizeParameter;
/**
 * Send an update-contract transaction to the 'finalize' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {FinalizeParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendFinalize(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('finalize'), SDK.Parameter.toBuffer, transactionMetadata, createFinalizeParameter(parameter), signer);
}
exports.sendFinalize = sendFinalize;
/**
 * Dry-run an update-contract transaction to the 'finalize' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {FinalizeParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunFinalize(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('finalize'), invokeMetadata, SDK.Parameter.toBuffer, createFinalizeParameter(parameter), blockHash);
}
exports.dryRunFinalize = dryRunFinalize;
/**
 * Get and parse the error message from dry-running update transaction for 'finalize' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageFinalize | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
function parseErrorMessageFinalize(invokeResult) {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRcAAAALAAAAUGFyc2VQYXJhbXMCEQAAAFN0YXJ0RW5kVGltZUVycm9yAgwAAABFbmRUaW1lRXJyb3ICCwAAAE9ubHlBY2NvdW50AhcAAABCaWROb3RHcmVhdGVyQ3VycmVudEJpZAIKAAAAQmlkVG9vTGF0ZQIXAAAAQXVjdGlvbkFscmVhZHlGaW5hbGl6ZWQCBgAAAE5vSXRlbQISAAAAQXVjdGlvblN0aWxsQWN0aXZlAhAAAABOb3RUb2tlbkNvbnRyYWN0AgwAAABXcm9uZ1Rva2VuSUQCEwAAAEludm9rZUNvbnRyYWN0RXJyb3ICCwAAAFBhcnNlUmVzdWx0Ag8AAABJbnZhbGlkUmVzcG9uc2UCDgAAAEFtb3VudFRvb0xhcmdlAg4AAABNaXNzaW5nQWNjb3VudAIPAAAATWlzc2luZ0NvbnRyYWN0AhEAAABNaXNzaW5nRW50cnlwb2ludAINAAAATWVzc2FnZUZhaWxlZAILAAAATG9naWNSZWplY3QCBAAAAFRyYXACBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAI=');
    var match47;
    if ('ParseParams' in schemaJson) {
        match47 = {
            type: 'ParseParams',
        };
    }
    else if ('StartEndTimeError' in schemaJson) {
        match47 = {
            type: 'StartEndTimeError',
        };
    }
    else if ('EndTimeError' in schemaJson) {
        match47 = {
            type: 'EndTimeError',
        };
    }
    else if ('OnlyAccount' in schemaJson) {
        match47 = {
            type: 'OnlyAccount',
        };
    }
    else if ('BidNotGreaterCurrentBid' in schemaJson) {
        match47 = {
            type: 'BidNotGreaterCurrentBid',
        };
    }
    else if ('BidTooLate' in schemaJson) {
        match47 = {
            type: 'BidTooLate',
        };
    }
    else if ('AuctionAlreadyFinalized' in schemaJson) {
        match47 = {
            type: 'AuctionAlreadyFinalized',
        };
    }
    else if ('NoItem' in schemaJson) {
        match47 = {
            type: 'NoItem',
        };
    }
    else if ('AuctionStillActive' in schemaJson) {
        match47 = {
            type: 'AuctionStillActive',
        };
    }
    else if ('NotTokenContract' in schemaJson) {
        match47 = {
            type: 'NotTokenContract',
        };
    }
    else if ('WrongTokenID' in schemaJson) {
        match47 = {
            type: 'WrongTokenID',
        };
    }
    else if ('InvokeContractError' in schemaJson) {
        match47 = {
            type: 'InvokeContractError',
        };
    }
    else if ('ParseResult' in schemaJson) {
        match47 = {
            type: 'ParseResult',
        };
    }
    else if ('InvalidResponse' in schemaJson) {
        match47 = {
            type: 'InvalidResponse',
        };
    }
    else if ('AmountTooLarge' in schemaJson) {
        match47 = {
            type: 'AmountTooLarge',
        };
    }
    else if ('MissingAccount' in schemaJson) {
        match47 = {
            type: 'MissingAccount',
        };
    }
    else if ('MissingContract' in schemaJson) {
        match47 = {
            type: 'MissingContract',
        };
    }
    else if ('MissingEntrypoint' in schemaJson) {
        match47 = {
            type: 'MissingEntrypoint',
        };
    }
    else if ('MessageFailed' in schemaJson) {
        match47 = {
            type: 'MessageFailed',
        };
    }
    else if ('LogicReject' in schemaJson) {
        match47 = {
            type: 'LogicReject',
        };
    }
    else if ('Trap' in schemaJson) {
        match47 = {
            type: 'Trap',
        };
    }
    else if ('LogFull' in schemaJson) {
        match47 = {
            type: 'LogFull',
        };
    }
    else if ('LogMalformed' in schemaJson) {
        match47 = {
            type: 'LogMalformed',
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    return match47;
}
exports.parseErrorMessageFinalize = parseErrorMessageFinalize;
/**
 * Construct Parameter for update transactions for 'view' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {ViewParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createViewParameter(parameter) {
    return parameter;
}
exports.createViewParameter = createViewParameter;
/**
 * Send an update-contract transaction to the 'view' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {ViewParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendView(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('view'), SDK.Parameter.toBuffer, transactionMetadata, createViewParameter(parameter), signer);
}
exports.sendView = sendView;
/**
 * Dry-run an update-contract transaction to the 'view' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {ViewParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunView(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('view'), invokeMetadata, SDK.Parameter.toBuffer, createViewParameter(parameter), blockHash);
}
exports.dryRunView = dryRunView;
/**
 * Get and parse the return value from dry-running update transaction for 'view' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueView | undefined} The structured return value or undefined if result was not a success.
 */
function parseReturnValueView(invokeResult) {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FAADAAAACwAAAGl0ZW1fc3RhdGVzEAIPAxQACAAAAA0AAABhdWN0aW9uX3N0YXRlFQIAAAAKAAAATm90U29sZFlldAIEAAAAU29sZAEBAAAACw4AAABoaWdoZXN0X2JpZGRlchUCAAAABAAAAE5vbmUCBAAAAFNvbWUBAQAAAAsEAAAAbmFtZRYCAwAAAGVuZA0FAAAAc3RhcnQNCwAAAGhpZ2hlc3RfYmlkGyUAAAAIAAAAdG9rZW5faWQdAAcAAABjcmVhdG9yCw0AAABjaXMyX2NvbnRyYWN0DAcAAABjb3VudGVyAw==');
    var field71 = schemaJson.item_states;
    var list72 = field71.map(function (item73) {
        var field75 = item73[1].auction_state;
        var match76;
        if ('NotSoldYet' in field75) {
            match76 = {
                type: 'NotSoldYet',
            };
        }
        else if ('Sold' in field75) {
            var variant78 = field75.Sold;
            var accountAddress79 = SDK.AccountAddress.fromSchemaValue(variant78[0]);
            match76 = {
                type: 'Sold',
                content: accountAddress79,
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        var field80 = item73[1].highest_bidder;
        var match81;
        if ('None' in field80) {
            match81 = {
                type: 'None',
            };
        }
        else if ('Some' in field80) {
            var variant83 = field80.Some;
            var accountAddress84 = SDK.AccountAddress.fromSchemaValue(variant83[0]);
            match81 = {
                type: 'Some',
                content: accountAddress84,
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        var field85 = item73[1].name;
        var field86 = item73[1].end;
        var timestamp87 = SDK.Timestamp.fromSchemaValue(field86);
        var field88 = item73[1].start;
        var timestamp89 = SDK.Timestamp.fromSchemaValue(field88);
        var field90 = item73[1].highest_bid;
        var field91 = item73[1].token_id;
        var field92 = item73[1].creator;
        var accountAddress93 = SDK.AccountAddress.fromSchemaValue(field92);
        var named94 = {
            auction_state: match76,
            highest_bidder: match81,
            name: field85,
            end: timestamp87,
            start: timestamp89,
            highest_bid: BigInt(field90),
            token_id: field91,
            creator: accountAddress93,
        };
        var pair74 = [item73[0], named94];
        return pair74;
    });
    var field95 = schemaJson.cis2_contract;
    var contractAddress96 = SDK.ContractAddress.fromSchemaValue(field95);
    var field97 = schemaJson.counter;
    var named98 = {
        item_states: list72,
        cis2_contract: contractAddress96,
        counter: field97,
    };
    return named98;
}
exports.parseReturnValueView = parseReturnValueView;
/**
 * Construct Parameter for update transactions for 'viewItemState' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {ViewItemStateParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createViewItemStateParameter(parameter) {
    var out = SDK.Parameter.fromBase64SchemaType('Aw==', parameter);
    return out;
}
exports.createViewItemStateParameter = createViewItemStateParameter;
/**
 * Send an update-contract transaction to the 'viewItemState' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {ViewItemStateParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendViewItemState(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('viewItemState'), SDK.Parameter.toBuffer, transactionMetadata, createViewItemStateParameter(parameter), signer);
}
exports.sendViewItemState = sendViewItemState;
/**
 * Dry-run an update-contract transaction to the 'viewItemState' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {ViewItemStateParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunViewItemState(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('viewItemState'), invokeMetadata, SDK.Parameter.toBuffer, createViewItemStateParameter(parameter), blockHash);
}
exports.dryRunViewItemState = dryRunViewItemState;
/**
 * Get and parse the return value from dry-running update transaction for 'viewItemState' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueViewItemState | undefined} The structured return value or undefined if result was not a success.
 */
function parseReturnValueViewItemState(invokeResult) {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FAAIAAAADQAAAGF1Y3Rpb25fc3RhdGUVAgAAAAoAAABOb3RTb2xkWWV0AgQAAABTb2xkAQEAAAALDgAAAGhpZ2hlc3RfYmlkZGVyFQIAAAAEAAAATm9uZQIEAAAAU29tZQEBAAAACwQAAABuYW1lFgIDAAAAZW5kDQUAAABzdGFydA0LAAAAaGlnaGVzdF9iaWQbJQAAAAgAAAB0b2tlbl9pZB0ABwAAAGNyZWF0b3IL');
    var field99 = schemaJson.auction_state;
    var match100;
    if ('NotSoldYet' in field99) {
        match100 = {
            type: 'NotSoldYet',
        };
    }
    else if ('Sold' in field99) {
        var variant102 = field99.Sold;
        var accountAddress103 = SDK.AccountAddress.fromSchemaValue(variant102[0]);
        match100 = {
            type: 'Sold',
            content: accountAddress103,
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    var field104 = schemaJson.highest_bidder;
    var match105;
    if ('None' in field104) {
        match105 = {
            type: 'None',
        };
    }
    else if ('Some' in field104) {
        var variant107 = field104.Some;
        var accountAddress108 = SDK.AccountAddress.fromSchemaValue(variant107[0]);
        match105 = {
            type: 'Some',
            content: accountAddress108,
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    var field109 = schemaJson.name;
    var field110 = schemaJson.end;
    var timestamp111 = SDK.Timestamp.fromSchemaValue(field110);
    var field112 = schemaJson.start;
    var timestamp113 = SDK.Timestamp.fromSchemaValue(field112);
    var field114 = schemaJson.highest_bid;
    var field115 = schemaJson.token_id;
    var field116 = schemaJson.creator;
    var accountAddress117 = SDK.AccountAddress.fromSchemaValue(field116);
    var named118 = {
        auction_state: match100,
        highest_bidder: match105,
        name: field109,
        end: timestamp111,
        start: timestamp113,
        highest_bid: BigInt(field114),
        token_id: field115,
        creator: accountAddress117,
    };
    return named118;
}
exports.parseReturnValueViewItemState = parseReturnValueViewItemState;
/**
 * Construct Parameter for update transactions for 'serializationHelper' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SerializationHelperParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createSerializationHelperParameter(parameter) {
    var out = SDK.Parameter.fromBase64SchemaType('Aw==', parameter);
    return out;
}
exports.createSerializationHelperParameter = createSerializationHelperParameter;
/**
 * Send an update-contract transaction to the 'serializationHelper' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SerializationHelperParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendSerializationHelper(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('serializationHelper'), SDK.Parameter.toBuffer, transactionMetadata, createSerializationHelperParameter(parameter), signer);
}
exports.sendSerializationHelper = sendSerializationHelper;
/**
 * Dry-run an update-contract transaction to the 'serializationHelper' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SerializationHelperParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunSerializationHelper(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('serializationHelper'), invokeMetadata, SDK.Parameter.toBuffer, createSerializationHelperParameter(parameter), blockHash);
}
exports.dryRunSerializationHelper = dryRunSerializationHelper;
