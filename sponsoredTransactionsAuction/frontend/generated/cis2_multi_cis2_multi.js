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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dryRunNonceOf = exports.sendNonceOf = exports.createNonceOfParameter = exports.parseErrorMessagePublicKeyOf = exports.parseReturnValuePublicKeyOf = exports.dryRunPublicKeyOf = exports.sendPublicKeyOf = exports.createPublicKeyOfParameter = exports.parseErrorMessageOperatorOf = exports.parseReturnValueOperatorOf = exports.dryRunOperatorOf = exports.sendOperatorOf = exports.createOperatorOfParameter = exports.parseErrorMessageBalanceOf = exports.parseReturnValueBalanceOf = exports.dryRunBalanceOf = exports.sendBalanceOf = exports.createBalanceOfParameter = exports.parseErrorMessageUpdateOperator = exports.dryRunUpdateOperator = exports.sendUpdateOperator = exports.createUpdateOperatorParameter = exports.dryRunPermit = exports.sendPermit = exports.createPermitParameter = exports.parseReturnValueViewMessageHash = exports.dryRunViewMessageHash = exports.sendViewMessageHash = exports.createViewMessageHashParameter = exports.dryRunSerializationHelper = exports.sendSerializationHelper = exports.createSerializationHelperParameter = exports.parseErrorMessageTransfer = exports.dryRunTransfer = exports.sendTransfer = exports.createTransferParameter = exports.parseErrorMessageMint = exports.dryRunMint = exports.sendMint = exports.createMintParameter = exports.parseReturnValueView = exports.dryRunView = exports.sendView = exports.createViewParameter = exports.parseEvent = exports.checkOnChain = exports.createUnchecked = exports.create = exports.contractName = exports.moduleReference = void 0;
exports.parseErrorMessageSetImplementors = exports.dryRunSetImplementors = exports.sendSetImplementors = exports.createSetImplementorsParameter = exports.parseErrorMessageSupportsPermit = exports.parseReturnValueSupportsPermit = exports.dryRunSupportsPermit = exports.sendSupportsPermit = exports.createSupportsPermitParameter = exports.parseErrorMessageSupports = exports.parseReturnValueSupports = exports.dryRunSupports = exports.sendSupports = exports.createSupportsParameter = exports.parseErrorMessageOnReceivingCIS2 = exports.dryRunOnReceivingCIS2 = exports.sendOnReceivingCIS2 = exports.createOnReceivingCIS2Parameter = exports.parseErrorMessageTokenMetadata = exports.parseReturnValueTokenMetadata = exports.dryRunTokenMetadata = exports.sendTokenMetadata = exports.createTokenMetadataParameter = exports.parseErrorMessageNonceOf = exports.parseReturnValueNonceOf = void 0;
var SDK = require("@concordium/web-sdk");
/** The reference of the smart contract module supported by the provided client. */
exports.moduleReference = SDK.ModuleReference.fromHexString('cd1e280d4bcae5c37aa0bcd391a7c516e9f9d8217b233599b8a97890a9275419');
/** Name of the smart contract supported by this client. */
exports.contractName = SDK.ContractName.fromStringUnchecked('cis2_multi');
/** Smart contract client for a contract instance on chain. */
var Cis2MultiContract = /** @class */ (function () {
    function Cis2MultiContract(grpcClient, contractAddress, genericContract) {
        /** Having a private field prevents similar structured objects to be considered the same type (similar to nominal typing). */
        this.__nominal = true;
        this.grpcClient = grpcClient;
        this.contractAddress = contractAddress;
        this.genericContract = genericContract;
    }
    return Cis2MultiContract;
}());
/**
 * Construct an instance of `Cis2MultiContract` for interacting with a 'cis2_multi' contract on chain.
 * Checking the information instance on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @param {SDK.BlockHash.Type} [blockHash] - Hash of the block to check the information at. When not provided the last finalized block is used.
 * @throws If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {Cis2MultiContract}
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
                    return [2 /*return*/, new Cis2MultiContract(grpcClient, contractAddress, genericContract)];
            }
        });
    });
}
exports.create = create;
/**
 * Construct the `Cis2MultiContract` for interacting with a 'cis2_multi' contract on chain.
 * Without checking the instance information on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @returns {Cis2MultiContract}
 */
function createUnchecked(grpcClient, contractAddress) {
    var genericContract = new SDK.Contract(grpcClient, contractAddress, exports.contractName);
    return new Cis2MultiContract(grpcClient, contractAddress, genericContract);
}
exports.createUnchecked = createUnchecked;
/**
 * Check if the smart contract instance exists on the blockchain and whether it uses a matching contract name and module reference.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.BlockHash.Type} [blockHash] A optional block hash to use for checking information on chain, if not provided the last finalized will be used.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 */
function checkOnChain(contractClient, blockHash) {
    return contractClient.genericContract.checkOnChain({ moduleReference: exports.moduleReference, blockHash: blockHash });
}
exports.checkOnChain = checkOnChain;
/**
 * Parse the contract events logged by the 'cis2_multi' contract.
 * @param {SDK.ContractEvent.Type} event The unparsed contract event.
 * @returns {Event} The structured contract event.
 */
function parseEvent(event) {
    var schemaJson = SDK.ContractEvent.parseWithSchemaTypeBase64(event, 'HwUAAAD7DQAAAFRva2VuTWV0YWRhdGEAAgAAAAgAAAB0b2tlbl9pZB0ADAAAAG1ldGFkYXRhX3VybBQAAgAAAAMAAAB1cmwWAQQAAABoYXNoFQIAAAAEAAAATm9uZQIEAAAAU29tZQEBAAAAHiAAAAD8DgAAAFVwZGF0ZU9wZXJhdG9yAAMAAAAGAAAAdXBkYXRlFQIAAAAGAAAAUmVtb3ZlAgMAAABBZGQCBQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAgAAABvcGVyYXRvchUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAz9BAAAAEJ1cm4AAwAAAAgAAAB0b2tlbl9pZB0ABgAAAGFtb3VudBslAAAABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADP4EAAAATWludAADAAAACAAAAHRva2VuX2lkHQAGAAAAYW1vdW50GyUAAAAFAAAAb3duZXIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM/wgAAABUcmFuc2ZlcgAEAAAACAAAAHRva2VuX2lkHQAGAAAAYW1vdW50GyUAAAAEAAAAZnJvbRUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwCAAAAdG8VAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM');
    var match1;
    if ('TokenMetadata' in schemaJson) {
        var variant2 = schemaJson.TokenMetadata;
        var field3 = variant2.token_id;
        var field4 = variant2.metadata_url;
        var field5 = field4.url;
        var field6 = field4.hash;
        var match7 = void 0;
        if ('None' in field6) {
            match7 = {
                type: 'None',
            };
        }
        else if ('Some' in field6) {
            var variant9 = field6.Some;
            match7 = {
                type: 'Some',
                content: variant9[0],
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        var named10 = {
            url: field5,
            hash: match7,
        };
        var named11 = {
            token_id: field3,
            metadata_url: named10,
        };
        match1 = {
            type: 'TokenMetadata',
            content: named11,
        };
    }
    else if ('UpdateOperator' in schemaJson) {
        var variant12 = schemaJson.UpdateOperator;
        var field13 = variant12.update;
        var match14 = void 0;
        if ('Remove' in field13) {
            match14 = {
                type: 'Remove',
            };
        }
        else if ('Add' in field13) {
            match14 = {
                type: 'Add',
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        var field17 = variant12.owner;
        var match18 = void 0;
        if ('Account' in field17) {
            var variant19 = field17.Account;
            var accountAddress20 = SDK.AccountAddress.fromSchemaValue(variant19[0]);
            match18 = {
                type: 'Account',
                content: accountAddress20,
            };
        }
        else if ('Contract' in field17) {
            var variant21 = field17.Contract;
            var contractAddress22 = SDK.ContractAddress.fromSchemaValue(variant21[0]);
            match18 = {
                type: 'Contract',
                content: contractAddress22,
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        var field23 = variant12.operator;
        var match24 = void 0;
        if ('Account' in field23) {
            var variant25 = field23.Account;
            var accountAddress26 = SDK.AccountAddress.fromSchemaValue(variant25[0]);
            match24 = {
                type: 'Account',
                content: accountAddress26,
            };
        }
        else if ('Contract' in field23) {
            var variant27 = field23.Contract;
            var contractAddress28 = SDK.ContractAddress.fromSchemaValue(variant27[0]);
            match24 = {
                type: 'Contract',
                content: contractAddress28,
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        var named29 = {
            update: match14,
            owner: match18,
            operator: match24,
        };
        match1 = {
            type: 'UpdateOperator',
            content: named29,
        };
    }
    else if ('Burn' in schemaJson) {
        var variant30 = schemaJson.Burn;
        var field31 = variant30.token_id;
        var field32 = variant30.amount;
        var field33 = variant30.owner;
        var match34 = void 0;
        if ('Account' in field33) {
            var variant35 = field33.Account;
            var accountAddress36 = SDK.AccountAddress.fromSchemaValue(variant35[0]);
            match34 = {
                type: 'Account',
                content: accountAddress36,
            };
        }
        else if ('Contract' in field33) {
            var variant37 = field33.Contract;
            var contractAddress38 = SDK.ContractAddress.fromSchemaValue(variant37[0]);
            match34 = {
                type: 'Contract',
                content: contractAddress38,
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        var named39 = {
            token_id: field31,
            amount: BigInt(field32),
            owner: match34,
        };
        match1 = {
            type: 'Burn',
            content: named39,
        };
    }
    else if ('Mint' in schemaJson) {
        var variant40 = schemaJson.Mint;
        var field41 = variant40.token_id;
        var field42 = variant40.amount;
        var field43 = variant40.owner;
        var match44 = void 0;
        if ('Account' in field43) {
            var variant45 = field43.Account;
            var accountAddress46 = SDK.AccountAddress.fromSchemaValue(variant45[0]);
            match44 = {
                type: 'Account',
                content: accountAddress46,
            };
        }
        else if ('Contract' in field43) {
            var variant47 = field43.Contract;
            var contractAddress48 = SDK.ContractAddress.fromSchemaValue(variant47[0]);
            match44 = {
                type: 'Contract',
                content: contractAddress48,
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        var named49 = {
            token_id: field41,
            amount: BigInt(field42),
            owner: match44,
        };
        match1 = {
            type: 'Mint',
            content: named49,
        };
    }
    else if ('Transfer' in schemaJson) {
        var variant50 = schemaJson.Transfer;
        var field51 = variant50.token_id;
        var field52 = variant50.amount;
        var field53 = variant50.from;
        var match54 = void 0;
        if ('Account' in field53) {
            var variant55 = field53.Account;
            var accountAddress56 = SDK.AccountAddress.fromSchemaValue(variant55[0]);
            match54 = {
                type: 'Account',
                content: accountAddress56,
            };
        }
        else if ('Contract' in field53) {
            var variant57 = field53.Contract;
            var contractAddress58 = SDK.ContractAddress.fromSchemaValue(variant57[0]);
            match54 = {
                type: 'Contract',
                content: contractAddress58,
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        var field59 = variant50.to;
        var match60 = void 0;
        if ('Account' in field59) {
            var variant61 = field59.Account;
            var accountAddress62 = SDK.AccountAddress.fromSchemaValue(variant61[0]);
            match60 = {
                type: 'Account',
                content: accountAddress62,
            };
        }
        else if ('Contract' in field59) {
            var variant63 = field59.Contract;
            var contractAddress64 = SDK.ContractAddress.fromSchemaValue(variant63[0]);
            match60 = {
                type: 'Contract',
                content: contractAddress64,
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        var named65 = {
            token_id: field51,
            amount: BigInt(field52),
            from: match54,
            to: match60,
        };
        match1 = {
            type: 'Transfer',
            content: named65,
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    return match1;
}
exports.parseEvent = parseEvent;
/**
 * Construct Parameter for update transactions for 'view' entrypoint of the 'cis2_multi' contract.
 * @param {ViewParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createViewParameter(parameter) {
    return parameter;
}
exports.createViewParameter = createViewParameter;
/**
 * Send an update-contract transaction to the 'view' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
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
 * Dry-run an update-contract transaction to the 'view' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
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
 * Get and parse the return value from dry-running update transaction for 'view' entrypoint of the 'cis2_multi' contract.
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
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FAACAAAABQAAAHN0YXRlEAIPFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADBQAAgAAAAgAAABiYWxhbmNlcxACDx0AGyUAAAAJAAAAb3BlcmF0b3JzEAIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMBgAAAHRva2VucxACHQA=');
    var field66 = schemaJson.state;
    var list67 = field66.map(function (item68) {
        var match70;
        if ('Account' in item68[0]) {
            var variant71 = item68[0].Account;
            var accountAddress72 = SDK.AccountAddress.fromSchemaValue(variant71[0]);
            match70 = {
                type: 'Account',
                content: accountAddress72,
            };
        }
        else if ('Contract' in item68[0]) {
            var variant73 = item68[0].Contract;
            var contractAddress74 = SDK.ContractAddress.fromSchemaValue(variant73[0]);
            match70 = {
                type: 'Contract',
                content: contractAddress74,
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        var field75 = item68[1].balances;
        var list76 = field75.map(function (item77) {
            var pair78 = [item77[0], BigInt(item77[1])];
            return pair78;
        });
        var field79 = item68[1].operators;
        var list80 = field79.map(function (item81) {
            var match82;
            if ('Account' in item81) {
                var variant83 = item81.Account;
                var accountAddress84 = SDK.AccountAddress.fromSchemaValue(variant83[0]);
                match82 = {
                    type: 'Account',
                    content: accountAddress84,
                };
            }
            else if ('Contract' in item81) {
                var variant85 = item81.Contract;
                var contractAddress86 = SDK.ContractAddress.fromSchemaValue(variant85[0]);
                match82 = {
                    type: 'Contract',
                    content: contractAddress86,
                };
            }
            else {
                throw new Error("Unexpected enum variant");
            }
            return match82;
        });
        var named87 = {
            balances: list76,
            operators: list80,
        };
        var pair69 = [match70, named87];
        return pair69;
    });
    var field88 = schemaJson.tokens;
    var named91 = {
        state: list67,
        tokens: field88,
    };
    return named91;
}
exports.parseReturnValueView = parseReturnValueView;
/**
 * Construct Parameter for update transactions for 'mint' entrypoint of the 'cis2_multi' contract.
 * @param {MintParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createMintParameter(parameter) {
    var field93 = parameter.owner;
    var match94;
    switch (field93.type) {
        case 'Account':
            var accountAddress95 = SDK.AccountAddress.toSchemaValue(field93.content);
            match94 = { Account: [accountAddress95], };
            break;
        case 'Contract':
            var contractAddress96 = SDK.ContractAddress.toSchemaValue(field93.content);
            match94 = { Contract: [contractAddress96], };
            break;
    }
    var field97 = parameter.metadata_url;
    var field99 = field97.url;
    var field100 = field97.hash;
    var match101;
    switch (field100.type) {
        case 'None':
            match101 = { None: [], };
            break;
        case 'Some':
            match101 = { Some: [field100.content], };
            break;
    }
    var named98 = {
        url: field99,
        hash: match101,
    };
    var field102 = parameter.token_id;
    var named92 = {
        owner: match94,
        metadata_url: named98,
        token_id: field102,
    };
    var out = SDK.Parameter.fromBase64SchemaType('FAADAAAABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAwAAABtZXRhZGF0YV91cmwUAAIAAAADAAAAdXJsFgEEAAAAaGFzaBUCAAAABAAAAE5vbmUCBAAAAFNvbWUBAQAAAB4gAAAACAAAAHRva2VuX2lkHQA=', named92);
    return out;
}
exports.createMintParameter = createMintParameter;
/**
 * Send an update-contract transaction to the 'mint' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {MintParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendMint(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('mint'), SDK.Parameter.toBuffer, transactionMetadata, createMintParameter(parameter), signer);
}
exports.sendMint = sendMint;
/**
 * Dry-run an update-contract transaction to the 'mint' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {MintParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunMint(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('mint'), invokeMetadata, SDK.Parameter.toBuffer, createMintParameter(parameter), blockHash);
}
exports.dryRunMint = dryRunMint;
/**
 * Get and parse the error message from dry-running update transaction for 'mint' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageMint | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
function parseErrorMessageMint(invokeResult) {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    var match103;
    if ('InvalidTokenId' in schemaJson) {
        match103 = {
            type: 'InvalidTokenId',
        };
    }
    else if ('InsufficientFunds' in schemaJson) {
        match103 = {
            type: 'InsufficientFunds',
        };
    }
    else if ('Unauthorized' in schemaJson) {
        match103 = {
            type: 'Unauthorized',
        };
    }
    else if ('Custom' in schemaJson) {
        var variant107 = schemaJson.Custom;
        var match108 = void 0;
        if ('ParseParams' in variant107[0]) {
            match108 = {
                type: 'ParseParams',
            };
        }
        else if ('LogFull' in variant107[0]) {
            match108 = {
                type: 'LogFull',
            };
        }
        else if ('LogMalformed' in variant107[0]) {
            match108 = {
                type: 'LogMalformed',
            };
        }
        else if ('InvalidContractName' in variant107[0]) {
            match108 = {
                type: 'InvalidContractName',
            };
        }
        else if ('ContractOnly' in variant107[0]) {
            match108 = {
                type: 'ContractOnly',
            };
        }
        else if ('InvokeContractError' in variant107[0]) {
            match108 = {
                type: 'InvokeContractError',
            };
        }
        else if ('MissingAccount' in variant107[0]) {
            match108 = {
                type: 'MissingAccount',
            };
        }
        else if ('MalformedData' in variant107[0]) {
            match108 = {
                type: 'MalformedData',
            };
        }
        else if ('WrongSignature' in variant107[0]) {
            match108 = {
                type: 'WrongSignature',
            };
        }
        else if ('NonceMismatch' in variant107[0]) {
            match108 = {
                type: 'NonceMismatch',
            };
        }
        else if ('WrongContract' in variant107[0]) {
            match108 = {
                type: 'WrongContract',
            };
        }
        else if ('WrongEntryPoint' in variant107[0]) {
            match108 = {
                type: 'WrongEntryPoint',
            };
        }
        else if ('Expired' in variant107[0]) {
            match108 = {
                type: 'Expired',
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        match103 = {
            type: 'Custom',
            content: match108,
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    return match103;
}
exports.parseErrorMessageMint = parseErrorMessageMint;
/**
 * Construct Parameter for update transactions for 'transfer' entrypoint of the 'cis2_multi' contract.
 * @param {TransferParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createTransferParameter(parameter) {
    var list122 = parameter.map(function (item123) {
        var field125 = item123.token_id;
        var field126 = item123.amount;
        var number127 = BigInt(field126).toString();
        var field128 = item123.from;
        var match129;
        switch (field128.type) {
            case 'Account':
                var accountAddress130 = SDK.AccountAddress.toSchemaValue(field128.content);
                match129 = { Account: [accountAddress130], };
                break;
            case 'Contract':
                var contractAddress131 = SDK.ContractAddress.toSchemaValue(field128.content);
                match129 = { Contract: [contractAddress131], };
                break;
        }
        var field132 = item123.to;
        var match133;
        switch (field132.type) {
            case 'Account':
                var accountAddress134 = SDK.AccountAddress.toSchemaValue(field132.content);
                match133 = { Account: [accountAddress134], };
                break;
            case 'Contract':
                var contractAddress136 = SDK.ContractAddress.toSchemaValue(field132.content[0]);
                var unnamed135 = [contractAddress136, field132.content[1]];
                match133 = { Contract: unnamed135, };
                break;
        }
        var field137 = item123.data;
        var named124 = {
            token_id: field125,
            amount: number127,
            from: match129,
            to: match133,
            data: field137,
        };
        return named124;
    });
    var out = SDK.Parameter.fromBase64SchemaType('EAEUAAUAAAAIAAAAdG9rZW5faWQdAAYAAABhbW91bnQbJQAAAAQAAABmcm9tFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAIAAAB0bxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAgAAAAwWAQQAAABkYXRhHQE=', list122);
    return out;
}
exports.createTransferParameter = createTransferParameter;
/**
 * Send an update-contract transaction to the 'transfer' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {TransferParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendTransfer(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('transfer'), SDK.Parameter.toBuffer, transactionMetadata, createTransferParameter(parameter), signer);
}
exports.sendTransfer = sendTransfer;
/**
 * Dry-run an update-contract transaction to the 'transfer' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {TransferParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunTransfer(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('transfer'), invokeMetadata, SDK.Parameter.toBuffer, createTransferParameter(parameter), blockHash);
}
exports.dryRunTransfer = dryRunTransfer;
/**
 * Get and parse the error message from dry-running update transaction for 'transfer' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageTransfer | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
function parseErrorMessageTransfer(invokeResult) {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    var match138;
    if ('InvalidTokenId' in schemaJson) {
        match138 = {
            type: 'InvalidTokenId',
        };
    }
    else if ('InsufficientFunds' in schemaJson) {
        match138 = {
            type: 'InsufficientFunds',
        };
    }
    else if ('Unauthorized' in schemaJson) {
        match138 = {
            type: 'Unauthorized',
        };
    }
    else if ('Custom' in schemaJson) {
        var variant142 = schemaJson.Custom;
        var match143 = void 0;
        if ('ParseParams' in variant142[0]) {
            match143 = {
                type: 'ParseParams',
            };
        }
        else if ('LogFull' in variant142[0]) {
            match143 = {
                type: 'LogFull',
            };
        }
        else if ('LogMalformed' in variant142[0]) {
            match143 = {
                type: 'LogMalformed',
            };
        }
        else if ('InvalidContractName' in variant142[0]) {
            match143 = {
                type: 'InvalidContractName',
            };
        }
        else if ('ContractOnly' in variant142[0]) {
            match143 = {
                type: 'ContractOnly',
            };
        }
        else if ('InvokeContractError' in variant142[0]) {
            match143 = {
                type: 'InvokeContractError',
            };
        }
        else if ('MissingAccount' in variant142[0]) {
            match143 = {
                type: 'MissingAccount',
            };
        }
        else if ('MalformedData' in variant142[0]) {
            match143 = {
                type: 'MalformedData',
            };
        }
        else if ('WrongSignature' in variant142[0]) {
            match143 = {
                type: 'WrongSignature',
            };
        }
        else if ('NonceMismatch' in variant142[0]) {
            match143 = {
                type: 'NonceMismatch',
            };
        }
        else if ('WrongContract' in variant142[0]) {
            match143 = {
                type: 'WrongContract',
            };
        }
        else if ('WrongEntryPoint' in variant142[0]) {
            match143 = {
                type: 'WrongEntryPoint',
            };
        }
        else if ('Expired' in variant142[0]) {
            match143 = {
                type: 'Expired',
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        match138 = {
            type: 'Custom',
            content: match143,
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    return match138;
}
exports.parseErrorMessageTransfer = parseErrorMessageTransfer;
/**
 * Construct Parameter for update transactions for 'serializationHelper' entrypoint of the 'cis2_multi' contract.
 * @param {SerializationHelperParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createSerializationHelperParameter(parameter) {
    var field158 = parameter.contract_address;
    var contractAddress159 = SDK.ContractAddress.toSchemaValue(field158);
    var field160 = parameter.nonce;
    var number161 = BigInt(field160);
    var field162 = parameter.timestamp;
    var timestamp163 = SDK.Timestamp.toSchemaValue(field162);
    var field164 = parameter.entry_point;
    var field165 = parameter.payload;
    var named157 = {
        contract_address: contractAddress159,
        nonce: number161,
        timestamp: timestamp163,
        entry_point: field164,
        payload: field165,
    };
    var out = SDK.Parameter.fromBase64SchemaType('FAAFAAAAEAAAAGNvbnRyYWN0X2FkZHJlc3MMBQAAAG5vbmNlBQkAAAB0aW1lc3RhbXANCwAAAGVudHJ5X3BvaW50FgEHAAAAcGF5bG9hZBABAg==', named157);
    return out;
}
exports.createSerializationHelperParameter = createSerializationHelperParameter;
/**
 * Send an update-contract transaction to the 'serializationHelper' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
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
 * Dry-run an update-contract transaction to the 'serializationHelper' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
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
/**
 * Construct Parameter for update transactions for 'viewMessageHash' entrypoint of the 'cis2_multi' contract.
 * @param {ViewMessageHashParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createViewMessageHashParameter(parameter) {
    var field169 = parameter.signature;
    var map170 = __spreadArray([], field169.entries(), true).map(function (_a) {
        var key171 = _a[0], value172 = _a[1];
        var map173 = __spreadArray([], value172.entries(), true).map(function (_a) {
            var key174 = _a[0], value175 = _a[1];
            var match176;
            switch (value175.type) {
                case 'Ed25519':
                    match176 = { Ed25519: [value175.content], };
                    break;
            }
            return [key174, match176];
        });
        return [key171, map173];
    });
    var field177 = parameter.signer;
    var accountAddress178 = SDK.AccountAddress.toSchemaValue(field177);
    var field179 = parameter.message;
    var field181 = field179.contract_address;
    var contractAddress182 = SDK.ContractAddress.toSchemaValue(field181);
    var field183 = field179.nonce;
    var number184 = BigInt(field183);
    var field185 = field179.timestamp;
    var timestamp186 = SDK.Timestamp.toSchemaValue(field185);
    var field187 = field179.entry_point;
    var field188 = field179.payload;
    var named180 = {
        contract_address: contractAddress182,
        nonce: number184,
        timestamp: timestamp186,
        entry_point: field187,
        payload: field188,
    };
    var named168 = {
        signature: map170,
        signer: accountAddress178,
        message: named180,
    };
    var out = SDK.Parameter.fromBase64SchemaType('FAADAAAACQAAAHNpZ25hdHVyZRIAAhIAAhUBAAAABwAAAEVkMjU1MTkBAQAAAB5AAAAABgAAAHNpZ25lcgsHAAAAbWVzc2FnZRQABQAAABAAAABjb250cmFjdF9hZGRyZXNzDAUAAABub25jZQUJAAAAdGltZXN0YW1wDQsAAABlbnRyeV9wb2ludBYBBwAAAHBheWxvYWQQAQI=', named168);
    return out;
}
exports.createViewMessageHashParameter = createViewMessageHashParameter;
/**
 * Send an update-contract transaction to the 'viewMessageHash' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {ViewMessageHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendViewMessageHash(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('viewMessageHash'), SDK.Parameter.toBuffer, transactionMetadata, createViewMessageHashParameter(parameter), signer);
}
exports.sendViewMessageHash = sendViewMessageHash;
/**
 * Dry-run an update-contract transaction to the 'viewMessageHash' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {ViewMessageHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunViewMessageHash(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('viewMessageHash'), invokeMetadata, SDK.Parameter.toBuffer, createViewMessageHashParameter(parameter), blockHash);
}
exports.dryRunViewMessageHash = dryRunViewMessageHash;
/**
 * Get and parse the return value from dry-running update transaction for 'viewMessageHash' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueViewMessageHash | undefined} The structured return value or undefined if result was not a success.
 */
function parseReturnValueViewMessageHash(invokeResult) {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EyAAAAAC');
    return schemaJson;
}
exports.parseReturnValueViewMessageHash = parseReturnValueViewMessageHash;
/**
 * Construct Parameter for update transactions for 'permit' entrypoint of the 'cis2_multi' contract.
 * @param {PermitParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createPermitParameter(parameter) {
    var field194 = parameter.signature;
    var map195 = __spreadArray([], field194.entries(), true).map(function (_a) {
        var key196 = _a[0], value197 = _a[1];
        var map198 = __spreadArray([], value197.entries(), true).map(function (_a) {
            var key199 = _a[0], value200 = _a[1];
            var match201;
            switch (value200.type) {
                case 'Ed25519':
                    match201 = { Ed25519: [value200.content], };
                    break;
            }
            return [key199, match201];
        });
        return [key196, map198];
    });
    var field202 = parameter.signer;
    var accountAddress203 = SDK.AccountAddress.toSchemaValue(field202);
    var field204 = parameter.message;
    var field206 = field204.contract_address;
    var contractAddress207 = SDK.ContractAddress.toSchemaValue(field206);
    var field208 = field204.nonce;
    var number209 = BigInt(field208);
    var field210 = field204.timestamp;
    var timestamp211 = SDK.Timestamp.toSchemaValue(field210);
    var field212 = field204.entry_point;
    var field213 = field204.payload;
    var named205 = {
        contract_address: contractAddress207,
        nonce: number209,
        timestamp: timestamp211,
        entry_point: field212,
        payload: field213,
    };
    var named193 = {
        signature: map195,
        signer: accountAddress203,
        message: named205,
    };
    var out = SDK.Parameter.fromBase64SchemaType('FAADAAAACQAAAHNpZ25hdHVyZRIAAhIAAhUBAAAABwAAAEVkMjU1MTkBAQAAAB5AAAAABgAAAHNpZ25lcgsHAAAAbWVzc2FnZRQABQAAABAAAABjb250cmFjdF9hZGRyZXNzDAUAAABub25jZQUJAAAAdGltZXN0YW1wDQsAAABlbnRyeV9wb2ludBYBBwAAAHBheWxvYWQQAQI=', named193);
    return out;
}
exports.createPermitParameter = createPermitParameter;
/**
 * Send an update-contract transaction to the 'permit' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {PermitParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendPermit(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('permit'), SDK.Parameter.toBuffer, transactionMetadata, createPermitParameter(parameter), signer);
}
exports.sendPermit = sendPermit;
/**
 * Dry-run an update-contract transaction to the 'permit' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {PermitParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunPermit(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('permit'), invokeMetadata, SDK.Parameter.toBuffer, createPermitParameter(parameter), blockHash);
}
exports.dryRunPermit = dryRunPermit;
/**
 * Construct Parameter for update transactions for 'updateOperator' entrypoint of the 'cis2_multi' contract.
 * @param {UpdateOperatorParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createUpdateOperatorParameter(parameter) {
    var list216 = parameter.map(function (item217) {
        var field219 = item217.update;
        var match220;
        switch (field219.type) {
            case 'Remove':
                match220 = { Remove: [], };
                break;
            case 'Add':
                match220 = { Add: [], };
                break;
        }
        var field221 = item217.operator;
        var match222;
        switch (field221.type) {
            case 'Account':
                var accountAddress223 = SDK.AccountAddress.toSchemaValue(field221.content);
                match222 = { Account: [accountAddress223], };
                break;
            case 'Contract':
                var contractAddress224 = SDK.ContractAddress.toSchemaValue(field221.content);
                match222 = { Contract: [contractAddress224], };
                break;
        }
        var named218 = {
            update: match220,
            operator: match222,
        };
        return named218;
    });
    var out = SDK.Parameter.fromBase64SchemaType('EAEUAAIAAAAGAAAAdXBkYXRlFQIAAAAGAAAAUmVtb3ZlAgMAAABBZGQCCAAAAG9wZXJhdG9yFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==', list216);
    return out;
}
exports.createUpdateOperatorParameter = createUpdateOperatorParameter;
/**
 * Send an update-contract transaction to the 'updateOperator' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {UpdateOperatorParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendUpdateOperator(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('updateOperator'), SDK.Parameter.toBuffer, transactionMetadata, createUpdateOperatorParameter(parameter), signer);
}
exports.sendUpdateOperator = sendUpdateOperator;
/**
 * Dry-run an update-contract transaction to the 'updateOperator' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {UpdateOperatorParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunUpdateOperator(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('updateOperator'), invokeMetadata, SDK.Parameter.toBuffer, createUpdateOperatorParameter(parameter), blockHash);
}
exports.dryRunUpdateOperator = dryRunUpdateOperator;
/**
 * Get and parse the error message from dry-running update transaction for 'updateOperator' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageUpdateOperator | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
function parseErrorMessageUpdateOperator(invokeResult) {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    var match225;
    if ('InvalidTokenId' in schemaJson) {
        match225 = {
            type: 'InvalidTokenId',
        };
    }
    else if ('InsufficientFunds' in schemaJson) {
        match225 = {
            type: 'InsufficientFunds',
        };
    }
    else if ('Unauthorized' in schemaJson) {
        match225 = {
            type: 'Unauthorized',
        };
    }
    else if ('Custom' in schemaJson) {
        var variant229 = schemaJson.Custom;
        var match230 = void 0;
        if ('ParseParams' in variant229[0]) {
            match230 = {
                type: 'ParseParams',
            };
        }
        else if ('LogFull' in variant229[0]) {
            match230 = {
                type: 'LogFull',
            };
        }
        else if ('LogMalformed' in variant229[0]) {
            match230 = {
                type: 'LogMalformed',
            };
        }
        else if ('InvalidContractName' in variant229[0]) {
            match230 = {
                type: 'InvalidContractName',
            };
        }
        else if ('ContractOnly' in variant229[0]) {
            match230 = {
                type: 'ContractOnly',
            };
        }
        else if ('InvokeContractError' in variant229[0]) {
            match230 = {
                type: 'InvokeContractError',
            };
        }
        else if ('MissingAccount' in variant229[0]) {
            match230 = {
                type: 'MissingAccount',
            };
        }
        else if ('MalformedData' in variant229[0]) {
            match230 = {
                type: 'MalformedData',
            };
        }
        else if ('WrongSignature' in variant229[0]) {
            match230 = {
                type: 'WrongSignature',
            };
        }
        else if ('NonceMismatch' in variant229[0]) {
            match230 = {
                type: 'NonceMismatch',
            };
        }
        else if ('WrongContract' in variant229[0]) {
            match230 = {
                type: 'WrongContract',
            };
        }
        else if ('WrongEntryPoint' in variant229[0]) {
            match230 = {
                type: 'WrongEntryPoint',
            };
        }
        else if ('Expired' in variant229[0]) {
            match230 = {
                type: 'Expired',
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        match225 = {
            type: 'Custom',
            content: match230,
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    return match225;
}
exports.parseErrorMessageUpdateOperator = parseErrorMessageUpdateOperator;
/**
 * Construct Parameter for update transactions for 'balanceOf' entrypoint of the 'cis2_multi' contract.
 * @param {BalanceOfParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createBalanceOfParameter(parameter) {
    var list244 = parameter.map(function (item245) {
        var field247 = item245.token_id;
        var field248 = item245.address;
        var match249;
        switch (field248.type) {
            case 'Account':
                var accountAddress250 = SDK.AccountAddress.toSchemaValue(field248.content);
                match249 = { Account: [accountAddress250], };
                break;
            case 'Contract':
                var contractAddress251 = SDK.ContractAddress.toSchemaValue(field248.content);
                match249 = { Contract: [contractAddress251], };
                break;
        }
        var named246 = {
            token_id: field247,
            address: match249,
        };
        return named246;
    });
    var out = SDK.Parameter.fromBase64SchemaType('EAEUAAIAAAAIAAAAdG9rZW5faWQdAAcAAABhZGRyZXNzFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==', list244);
    return out;
}
exports.createBalanceOfParameter = createBalanceOfParameter;
/**
 * Send an update-contract transaction to the 'balanceOf' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {BalanceOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendBalanceOf(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('balanceOf'), SDK.Parameter.toBuffer, transactionMetadata, createBalanceOfParameter(parameter), signer);
}
exports.sendBalanceOf = sendBalanceOf;
/**
 * Dry-run an update-contract transaction to the 'balanceOf' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {BalanceOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunBalanceOf(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('balanceOf'), invokeMetadata, SDK.Parameter.toBuffer, createBalanceOfParameter(parameter), blockHash);
}
exports.dryRunBalanceOf = dryRunBalanceOf;
/**
 * Get and parse the return value from dry-running update transaction for 'balanceOf' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueBalanceOf | undefined} The structured return value or undefined if result was not a success.
 */
function parseReturnValueBalanceOf(invokeResult) {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAEbJQAAAA==');
    var list252 = schemaJson.map(function (item253) {
        return BigInt(item253);
    });
    return list252;
}
exports.parseReturnValueBalanceOf = parseReturnValueBalanceOf;
/**
 * Get and parse the error message from dry-running update transaction for 'balanceOf' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageBalanceOf | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
function parseErrorMessageBalanceOf(invokeResult) {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    var match254;
    if ('InvalidTokenId' in schemaJson) {
        match254 = {
            type: 'InvalidTokenId',
        };
    }
    else if ('InsufficientFunds' in schemaJson) {
        match254 = {
            type: 'InsufficientFunds',
        };
    }
    else if ('Unauthorized' in schemaJson) {
        match254 = {
            type: 'Unauthorized',
        };
    }
    else if ('Custom' in schemaJson) {
        var variant258 = schemaJson.Custom;
        var match259 = void 0;
        if ('ParseParams' in variant258[0]) {
            match259 = {
                type: 'ParseParams',
            };
        }
        else if ('LogFull' in variant258[0]) {
            match259 = {
                type: 'LogFull',
            };
        }
        else if ('LogMalformed' in variant258[0]) {
            match259 = {
                type: 'LogMalformed',
            };
        }
        else if ('InvalidContractName' in variant258[0]) {
            match259 = {
                type: 'InvalidContractName',
            };
        }
        else if ('ContractOnly' in variant258[0]) {
            match259 = {
                type: 'ContractOnly',
            };
        }
        else if ('InvokeContractError' in variant258[0]) {
            match259 = {
                type: 'InvokeContractError',
            };
        }
        else if ('MissingAccount' in variant258[0]) {
            match259 = {
                type: 'MissingAccount',
            };
        }
        else if ('MalformedData' in variant258[0]) {
            match259 = {
                type: 'MalformedData',
            };
        }
        else if ('WrongSignature' in variant258[0]) {
            match259 = {
                type: 'WrongSignature',
            };
        }
        else if ('NonceMismatch' in variant258[0]) {
            match259 = {
                type: 'NonceMismatch',
            };
        }
        else if ('WrongContract' in variant258[0]) {
            match259 = {
                type: 'WrongContract',
            };
        }
        else if ('WrongEntryPoint' in variant258[0]) {
            match259 = {
                type: 'WrongEntryPoint',
            };
        }
        else if ('Expired' in variant258[0]) {
            match259 = {
                type: 'Expired',
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        match254 = {
            type: 'Custom',
            content: match259,
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    return match254;
}
exports.parseErrorMessageBalanceOf = parseErrorMessageBalanceOf;
/**
 * Construct Parameter for update transactions for 'operatorOf' entrypoint of the 'cis2_multi' contract.
 * @param {OperatorOfParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createOperatorOfParameter(parameter) {
    var list273 = parameter.map(function (item274) {
        var field276 = item274.owner;
        var match277;
        switch (field276.type) {
            case 'Account':
                var accountAddress278 = SDK.AccountAddress.toSchemaValue(field276.content);
                match277 = { Account: [accountAddress278], };
                break;
            case 'Contract':
                var contractAddress279 = SDK.ContractAddress.toSchemaValue(field276.content);
                match277 = { Contract: [contractAddress279], };
                break;
        }
        var field280 = item274.address;
        var match281;
        switch (field280.type) {
            case 'Account':
                var accountAddress282 = SDK.AccountAddress.toSchemaValue(field280.content);
                match281 = { Account: [accountAddress282], };
                break;
            case 'Contract':
                var contractAddress283 = SDK.ContractAddress.toSchemaValue(field280.content);
                match281 = { Contract: [contractAddress283], };
                break;
        }
        var named275 = {
            owner: match277,
            address: match281,
        };
        return named275;
    });
    var out = SDK.Parameter.fromBase64SchemaType('EAEUAAIAAAAFAAAAb3duZXIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMBwAAAGFkZHJlc3MVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM', list273);
    return out;
}
exports.createOperatorOfParameter = createOperatorOfParameter;
/**
 * Send an update-contract transaction to the 'operatorOf' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {OperatorOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendOperatorOf(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('operatorOf'), SDK.Parameter.toBuffer, transactionMetadata, createOperatorOfParameter(parameter), signer);
}
exports.sendOperatorOf = sendOperatorOf;
/**
 * Dry-run an update-contract transaction to the 'operatorOf' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {OperatorOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunOperatorOf(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('operatorOf'), invokeMetadata, SDK.Parameter.toBuffer, createOperatorOfParameter(parameter), blockHash);
}
exports.dryRunOperatorOf = dryRunOperatorOf;
/**
 * Get and parse the return value from dry-running update transaction for 'operatorOf' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueOperatorOf | undefined} The structured return value or undefined if result was not a success.
 */
function parseReturnValueOperatorOf(invokeResult) {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAEB');
    return schemaJson;
}
exports.parseReturnValueOperatorOf = parseReturnValueOperatorOf;
/**
 * Get and parse the error message from dry-running update transaction for 'operatorOf' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageOperatorOf | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
function parseErrorMessageOperatorOf(invokeResult) {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    var match286;
    if ('InvalidTokenId' in schemaJson) {
        match286 = {
            type: 'InvalidTokenId',
        };
    }
    else if ('InsufficientFunds' in schemaJson) {
        match286 = {
            type: 'InsufficientFunds',
        };
    }
    else if ('Unauthorized' in schemaJson) {
        match286 = {
            type: 'Unauthorized',
        };
    }
    else if ('Custom' in schemaJson) {
        var variant290 = schemaJson.Custom;
        var match291 = void 0;
        if ('ParseParams' in variant290[0]) {
            match291 = {
                type: 'ParseParams',
            };
        }
        else if ('LogFull' in variant290[0]) {
            match291 = {
                type: 'LogFull',
            };
        }
        else if ('LogMalformed' in variant290[0]) {
            match291 = {
                type: 'LogMalformed',
            };
        }
        else if ('InvalidContractName' in variant290[0]) {
            match291 = {
                type: 'InvalidContractName',
            };
        }
        else if ('ContractOnly' in variant290[0]) {
            match291 = {
                type: 'ContractOnly',
            };
        }
        else if ('InvokeContractError' in variant290[0]) {
            match291 = {
                type: 'InvokeContractError',
            };
        }
        else if ('MissingAccount' in variant290[0]) {
            match291 = {
                type: 'MissingAccount',
            };
        }
        else if ('MalformedData' in variant290[0]) {
            match291 = {
                type: 'MalformedData',
            };
        }
        else if ('WrongSignature' in variant290[0]) {
            match291 = {
                type: 'WrongSignature',
            };
        }
        else if ('NonceMismatch' in variant290[0]) {
            match291 = {
                type: 'NonceMismatch',
            };
        }
        else if ('WrongContract' in variant290[0]) {
            match291 = {
                type: 'WrongContract',
            };
        }
        else if ('WrongEntryPoint' in variant290[0]) {
            match291 = {
                type: 'WrongEntryPoint',
            };
        }
        else if ('Expired' in variant290[0]) {
            match291 = {
                type: 'Expired',
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        match286 = {
            type: 'Custom',
            content: match291,
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    return match286;
}
exports.parseErrorMessageOperatorOf = parseErrorMessageOperatorOf;
/**
 * Construct Parameter for update transactions for 'publicKeyOf' entrypoint of the 'cis2_multi' contract.
 * @param {PublicKeyOfParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createPublicKeyOfParameter(parameter) {
    var list305 = parameter.map(function (item306) {
        var accountAddress307 = SDK.AccountAddress.toSchemaValue(item306);
        return accountAddress307;
    });
    var out = SDK.Parameter.fromBase64SchemaType('EAEL', list305);
    return out;
}
exports.createPublicKeyOfParameter = createPublicKeyOfParameter;
/**
 * Send an update-contract transaction to the 'publicKeyOf' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {PublicKeyOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendPublicKeyOf(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('publicKeyOf'), SDK.Parameter.toBuffer, transactionMetadata, createPublicKeyOfParameter(parameter), signer);
}
exports.sendPublicKeyOf = sendPublicKeyOf;
/**
 * Dry-run an update-contract transaction to the 'publicKeyOf' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {PublicKeyOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunPublicKeyOf(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('publicKeyOf'), invokeMetadata, SDK.Parameter.toBuffer, createPublicKeyOfParameter(parameter), blockHash);
}
exports.dryRunPublicKeyOf = dryRunPublicKeyOf;
/**
 * Get and parse the return value from dry-running update transaction for 'publicKeyOf' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValuePublicKeyOf | undefined} The structured return value or undefined if result was not a success.
 */
function parseReturnValuePublicKeyOf(invokeResult) {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAEVAgAAAAQAAABOb25lAgQAAABTb21lAQEAAAAUAAIAAAAEAAAAa2V5cxIAAhQAAgAAAAQAAABrZXlzEgACFQEAAAAHAAAARWQyNTUxOQEBAAAAHiAAAAAJAAAAdGhyZXNob2xkAgkAAAB0aHJlc2hvbGQC');
    var list308 = schemaJson.map(function (item309) {
        var match310;
        if ('None' in item309) {
            match310 = {
                type: 'None',
            };
        }
        else if ('Some' in item309) {
            var variant312 = item309.Some;
            var field313 = variant312[0].keys;
            var entries315 = field313.map(function (_a) {
                var key316 = _a[0], value317 = _a[1];
                var field318 = value317.keys;
                var entries320 = field318.map(function (_a) {
                    var key321 = _a[0], value322 = _a[1];
                    var match323;
                    if ('Ed25519' in value322) {
                        var variant324 = value322.Ed25519;
                        match323 = {
                            type: 'Ed25519',
                            content: variant324[0],
                        };
                    }
                    else {
                        throw new Error("Unexpected enum variant");
                    }
                    return [key321, match323];
                });
                var map319 = Map.fromEntries(entries320);
                var field325 = value317.threshold;
                var named326 = {
                    keys: map319,
                    threshold: field325,
                };
                return [key316, named326];
            });
            var map314 = Map.fromEntries(entries315);
            var field327 = variant312[0].threshold;
            var named328 = {
                keys: map314,
                threshold: field327,
            };
            match310 = {
                type: 'Some',
                content: named328,
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        return match310;
    });
    return list308;
}
exports.parseReturnValuePublicKeyOf = parseReturnValuePublicKeyOf;
/**
 * Get and parse the error message from dry-running update transaction for 'publicKeyOf' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessagePublicKeyOf | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
function parseErrorMessagePublicKeyOf(invokeResult) {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    var match329;
    if ('InvalidTokenId' in schemaJson) {
        match329 = {
            type: 'InvalidTokenId',
        };
    }
    else if ('InsufficientFunds' in schemaJson) {
        match329 = {
            type: 'InsufficientFunds',
        };
    }
    else if ('Unauthorized' in schemaJson) {
        match329 = {
            type: 'Unauthorized',
        };
    }
    else if ('Custom' in schemaJson) {
        var variant333 = schemaJson.Custom;
        var match334 = void 0;
        if ('ParseParams' in variant333[0]) {
            match334 = {
                type: 'ParseParams',
            };
        }
        else if ('LogFull' in variant333[0]) {
            match334 = {
                type: 'LogFull',
            };
        }
        else if ('LogMalformed' in variant333[0]) {
            match334 = {
                type: 'LogMalformed',
            };
        }
        else if ('InvalidContractName' in variant333[0]) {
            match334 = {
                type: 'InvalidContractName',
            };
        }
        else if ('ContractOnly' in variant333[0]) {
            match334 = {
                type: 'ContractOnly',
            };
        }
        else if ('InvokeContractError' in variant333[0]) {
            match334 = {
                type: 'InvokeContractError',
            };
        }
        else if ('MissingAccount' in variant333[0]) {
            match334 = {
                type: 'MissingAccount',
            };
        }
        else if ('MalformedData' in variant333[0]) {
            match334 = {
                type: 'MalformedData',
            };
        }
        else if ('WrongSignature' in variant333[0]) {
            match334 = {
                type: 'WrongSignature',
            };
        }
        else if ('NonceMismatch' in variant333[0]) {
            match334 = {
                type: 'NonceMismatch',
            };
        }
        else if ('WrongContract' in variant333[0]) {
            match334 = {
                type: 'WrongContract',
            };
        }
        else if ('WrongEntryPoint' in variant333[0]) {
            match334 = {
                type: 'WrongEntryPoint',
            };
        }
        else if ('Expired' in variant333[0]) {
            match334 = {
                type: 'Expired',
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        match329 = {
            type: 'Custom',
            content: match334,
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    return match329;
}
exports.parseErrorMessagePublicKeyOf = parseErrorMessagePublicKeyOf;
/**
 * Construct Parameter for update transactions for 'nonceOf' entrypoint of the 'cis2_multi' contract.
 * @param {NonceOfParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createNonceOfParameter(parameter) {
    var list348 = parameter.map(function (item349) {
        var accountAddress350 = SDK.AccountAddress.toSchemaValue(item349);
        return accountAddress350;
    });
    var out = SDK.Parameter.fromBase64SchemaType('EAEL', list348);
    return out;
}
exports.createNonceOfParameter = createNonceOfParameter;
/**
 * Send an update-contract transaction to the 'nonceOf' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {NonceOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendNonceOf(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('nonceOf'), SDK.Parameter.toBuffer, transactionMetadata, createNonceOfParameter(parameter), signer);
}
exports.sendNonceOf = sendNonceOf;
/**
 * Dry-run an update-contract transaction to the 'nonceOf' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {NonceOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunNonceOf(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('nonceOf'), invokeMetadata, SDK.Parameter.toBuffer, createNonceOfParameter(parameter), blockHash);
}
exports.dryRunNonceOf = dryRunNonceOf;
/**
 * Get and parse the return value from dry-running update transaction for 'nonceOf' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueNonceOf | undefined} The structured return value or undefined if result was not a success.
 */
function parseReturnValueNonceOf(invokeResult) {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAEF');
    return schemaJson;
}
exports.parseReturnValueNonceOf = parseReturnValueNonceOf;
/**
 * Get and parse the error message from dry-running update transaction for 'nonceOf' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageNonceOf | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
function parseErrorMessageNonceOf(invokeResult) {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    var match353;
    if ('InvalidTokenId' in schemaJson) {
        match353 = {
            type: 'InvalidTokenId',
        };
    }
    else if ('InsufficientFunds' in schemaJson) {
        match353 = {
            type: 'InsufficientFunds',
        };
    }
    else if ('Unauthorized' in schemaJson) {
        match353 = {
            type: 'Unauthorized',
        };
    }
    else if ('Custom' in schemaJson) {
        var variant357 = schemaJson.Custom;
        var match358 = void 0;
        if ('ParseParams' in variant357[0]) {
            match358 = {
                type: 'ParseParams',
            };
        }
        else if ('LogFull' in variant357[0]) {
            match358 = {
                type: 'LogFull',
            };
        }
        else if ('LogMalformed' in variant357[0]) {
            match358 = {
                type: 'LogMalformed',
            };
        }
        else if ('InvalidContractName' in variant357[0]) {
            match358 = {
                type: 'InvalidContractName',
            };
        }
        else if ('ContractOnly' in variant357[0]) {
            match358 = {
                type: 'ContractOnly',
            };
        }
        else if ('InvokeContractError' in variant357[0]) {
            match358 = {
                type: 'InvokeContractError',
            };
        }
        else if ('MissingAccount' in variant357[0]) {
            match358 = {
                type: 'MissingAccount',
            };
        }
        else if ('MalformedData' in variant357[0]) {
            match358 = {
                type: 'MalformedData',
            };
        }
        else if ('WrongSignature' in variant357[0]) {
            match358 = {
                type: 'WrongSignature',
            };
        }
        else if ('NonceMismatch' in variant357[0]) {
            match358 = {
                type: 'NonceMismatch',
            };
        }
        else if ('WrongContract' in variant357[0]) {
            match358 = {
                type: 'WrongContract',
            };
        }
        else if ('WrongEntryPoint' in variant357[0]) {
            match358 = {
                type: 'WrongEntryPoint',
            };
        }
        else if ('Expired' in variant357[0]) {
            match358 = {
                type: 'Expired',
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        match353 = {
            type: 'Custom',
            content: match358,
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    return match353;
}
exports.parseErrorMessageNonceOf = parseErrorMessageNonceOf;
/**
 * Construct Parameter for update transactions for 'tokenMetadata' entrypoint of the 'cis2_multi' contract.
 * @param {TokenMetadataParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createTokenMetadataParameter(parameter) {
    var out = SDK.Parameter.fromBase64SchemaType('EAEdAA==', parameter);
    return out;
}
exports.createTokenMetadataParameter = createTokenMetadataParameter;
/**
 * Send an update-contract transaction to the 'tokenMetadata' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {TokenMetadataParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendTokenMetadata(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('tokenMetadata'), SDK.Parameter.toBuffer, transactionMetadata, createTokenMetadataParameter(parameter), signer);
}
exports.sendTokenMetadata = sendTokenMetadata;
/**
 * Dry-run an update-contract transaction to the 'tokenMetadata' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {TokenMetadataParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunTokenMetadata(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('tokenMetadata'), invokeMetadata, SDK.Parameter.toBuffer, createTokenMetadataParameter(parameter), blockHash);
}
exports.dryRunTokenMetadata = dryRunTokenMetadata;
/**
 * Get and parse the return value from dry-running update transaction for 'tokenMetadata' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueTokenMetadata | undefined} The structured return value or undefined if result was not a success.
 */
function parseReturnValueTokenMetadata(invokeResult) {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAEUAAIAAAADAAAAdXJsFgEEAAAAaGFzaBUCAAAABAAAAE5vbmUCBAAAAFNvbWUBAQAAAB4gAAAA');
    var list374 = schemaJson.map(function (item375) {
        var field376 = item375.url;
        var field377 = item375.hash;
        var match378;
        if ('None' in field377) {
            match378 = {
                type: 'None',
            };
        }
        else if ('Some' in field377) {
            var variant380 = field377.Some;
            match378 = {
                type: 'Some',
                content: variant380[0],
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        var named381 = {
            url: field376,
            hash: match378,
        };
        return named381;
    });
    return list374;
}
exports.parseReturnValueTokenMetadata = parseReturnValueTokenMetadata;
/**
 * Get and parse the error message from dry-running update transaction for 'tokenMetadata' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageTokenMetadata | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
function parseErrorMessageTokenMetadata(invokeResult) {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    var match382;
    if ('InvalidTokenId' in schemaJson) {
        match382 = {
            type: 'InvalidTokenId',
        };
    }
    else if ('InsufficientFunds' in schemaJson) {
        match382 = {
            type: 'InsufficientFunds',
        };
    }
    else if ('Unauthorized' in schemaJson) {
        match382 = {
            type: 'Unauthorized',
        };
    }
    else if ('Custom' in schemaJson) {
        var variant386 = schemaJson.Custom;
        var match387 = void 0;
        if ('ParseParams' in variant386[0]) {
            match387 = {
                type: 'ParseParams',
            };
        }
        else if ('LogFull' in variant386[0]) {
            match387 = {
                type: 'LogFull',
            };
        }
        else if ('LogMalformed' in variant386[0]) {
            match387 = {
                type: 'LogMalformed',
            };
        }
        else if ('InvalidContractName' in variant386[0]) {
            match387 = {
                type: 'InvalidContractName',
            };
        }
        else if ('ContractOnly' in variant386[0]) {
            match387 = {
                type: 'ContractOnly',
            };
        }
        else if ('InvokeContractError' in variant386[0]) {
            match387 = {
                type: 'InvokeContractError',
            };
        }
        else if ('MissingAccount' in variant386[0]) {
            match387 = {
                type: 'MissingAccount',
            };
        }
        else if ('MalformedData' in variant386[0]) {
            match387 = {
                type: 'MalformedData',
            };
        }
        else if ('WrongSignature' in variant386[0]) {
            match387 = {
                type: 'WrongSignature',
            };
        }
        else if ('NonceMismatch' in variant386[0]) {
            match387 = {
                type: 'NonceMismatch',
            };
        }
        else if ('WrongContract' in variant386[0]) {
            match387 = {
                type: 'WrongContract',
            };
        }
        else if ('WrongEntryPoint' in variant386[0]) {
            match387 = {
                type: 'WrongEntryPoint',
            };
        }
        else if ('Expired' in variant386[0]) {
            match387 = {
                type: 'Expired',
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        match382 = {
            type: 'Custom',
            content: match387,
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    return match382;
}
exports.parseErrorMessageTokenMetadata = parseErrorMessageTokenMetadata;
/**
 * Construct Parameter for update transactions for 'onReceivingCIS2' entrypoint of the 'cis2_multi' contract.
 * @param {OnReceivingCIS2Parameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createOnReceivingCIS2Parameter(parameter) {
    return parameter;
}
exports.createOnReceivingCIS2Parameter = createOnReceivingCIS2Parameter;
/**
 * Send an update-contract transaction to the 'onReceivingCIS2' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {OnReceivingCIS2Parameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendOnReceivingCIS2(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('onReceivingCIS2'), SDK.Parameter.toBuffer, transactionMetadata, createOnReceivingCIS2Parameter(parameter), signer);
}
exports.sendOnReceivingCIS2 = sendOnReceivingCIS2;
/**
 * Dry-run an update-contract transaction to the 'onReceivingCIS2' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {OnReceivingCIS2Parameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunOnReceivingCIS2(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('onReceivingCIS2'), invokeMetadata, SDK.Parameter.toBuffer, createOnReceivingCIS2Parameter(parameter), blockHash);
}
exports.dryRunOnReceivingCIS2 = dryRunOnReceivingCIS2;
/**
 * Get and parse the error message from dry-running update transaction for 'onReceivingCIS2' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageOnReceivingCIS2 | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
function parseErrorMessageOnReceivingCIS2(invokeResult) {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    var match401;
    if ('InvalidTokenId' in schemaJson) {
        match401 = {
            type: 'InvalidTokenId',
        };
    }
    else if ('InsufficientFunds' in schemaJson) {
        match401 = {
            type: 'InsufficientFunds',
        };
    }
    else if ('Unauthorized' in schemaJson) {
        match401 = {
            type: 'Unauthorized',
        };
    }
    else if ('Custom' in schemaJson) {
        var variant405 = schemaJson.Custom;
        var match406 = void 0;
        if ('ParseParams' in variant405[0]) {
            match406 = {
                type: 'ParseParams',
            };
        }
        else if ('LogFull' in variant405[0]) {
            match406 = {
                type: 'LogFull',
            };
        }
        else if ('LogMalformed' in variant405[0]) {
            match406 = {
                type: 'LogMalformed',
            };
        }
        else if ('InvalidContractName' in variant405[0]) {
            match406 = {
                type: 'InvalidContractName',
            };
        }
        else if ('ContractOnly' in variant405[0]) {
            match406 = {
                type: 'ContractOnly',
            };
        }
        else if ('InvokeContractError' in variant405[0]) {
            match406 = {
                type: 'InvokeContractError',
            };
        }
        else if ('MissingAccount' in variant405[0]) {
            match406 = {
                type: 'MissingAccount',
            };
        }
        else if ('MalformedData' in variant405[0]) {
            match406 = {
                type: 'MalformedData',
            };
        }
        else if ('WrongSignature' in variant405[0]) {
            match406 = {
                type: 'WrongSignature',
            };
        }
        else if ('NonceMismatch' in variant405[0]) {
            match406 = {
                type: 'NonceMismatch',
            };
        }
        else if ('WrongContract' in variant405[0]) {
            match406 = {
                type: 'WrongContract',
            };
        }
        else if ('WrongEntryPoint' in variant405[0]) {
            match406 = {
                type: 'WrongEntryPoint',
            };
        }
        else if ('Expired' in variant405[0]) {
            match406 = {
                type: 'Expired',
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        match401 = {
            type: 'Custom',
            content: match406,
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    return match401;
}
exports.parseErrorMessageOnReceivingCIS2 = parseErrorMessageOnReceivingCIS2;
/**
 * Construct Parameter for update transactions for 'supports' entrypoint of the 'cis2_multi' contract.
 * @param {SupportsParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createSupportsParameter(parameter) {
    var out = SDK.Parameter.fromBase64SchemaType('EAEWAA==', parameter);
    return out;
}
exports.createSupportsParameter = createSupportsParameter;
/**
 * Send an update-contract transaction to the 'supports' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SupportsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendSupports(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('supports'), SDK.Parameter.toBuffer, transactionMetadata, createSupportsParameter(parameter), signer);
}
exports.sendSupports = sendSupports;
/**
 * Dry-run an update-contract transaction to the 'supports' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SupportsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunSupports(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('supports'), invokeMetadata, SDK.Parameter.toBuffer, createSupportsParameter(parameter), blockHash);
}
exports.dryRunSupports = dryRunSupports;
/**
 * Get and parse the return value from dry-running update transaction for 'supports' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueSupports | undefined} The structured return value or undefined if result was not a success.
 */
function parseReturnValueSupports(invokeResult) {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAEVAwAAAAkAAABOb1N1cHBvcnQCBwAAAFN1cHBvcnQCCQAAAFN1cHBvcnRCeQEBAAAAEAAM');
    var list422 = schemaJson.map(function (item423) {
        var match424;
        if ('NoSupport' in item423) {
            match424 = {
                type: 'NoSupport',
            };
        }
        else if ('Support' in item423) {
            match424 = {
                type: 'Support',
            };
        }
        else if ('SupportBy' in item423) {
            var variant427 = item423.SupportBy;
            var list428 = variant427[0].map(function (item429) {
                var contractAddress430 = SDK.ContractAddress.fromSchemaValue(item429);
                return contractAddress430;
            });
            match424 = {
                type: 'SupportBy',
                content: list428,
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        return match424;
    });
    return list422;
}
exports.parseReturnValueSupports = parseReturnValueSupports;
/**
 * Get and parse the error message from dry-running update transaction for 'supports' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageSupports | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
function parseErrorMessageSupports(invokeResult) {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    var match431;
    if ('InvalidTokenId' in schemaJson) {
        match431 = {
            type: 'InvalidTokenId',
        };
    }
    else if ('InsufficientFunds' in schemaJson) {
        match431 = {
            type: 'InsufficientFunds',
        };
    }
    else if ('Unauthorized' in schemaJson) {
        match431 = {
            type: 'Unauthorized',
        };
    }
    else if ('Custom' in schemaJson) {
        var variant435 = schemaJson.Custom;
        var match436 = void 0;
        if ('ParseParams' in variant435[0]) {
            match436 = {
                type: 'ParseParams',
            };
        }
        else if ('LogFull' in variant435[0]) {
            match436 = {
                type: 'LogFull',
            };
        }
        else if ('LogMalformed' in variant435[0]) {
            match436 = {
                type: 'LogMalformed',
            };
        }
        else if ('InvalidContractName' in variant435[0]) {
            match436 = {
                type: 'InvalidContractName',
            };
        }
        else if ('ContractOnly' in variant435[0]) {
            match436 = {
                type: 'ContractOnly',
            };
        }
        else if ('InvokeContractError' in variant435[0]) {
            match436 = {
                type: 'InvokeContractError',
            };
        }
        else if ('MissingAccount' in variant435[0]) {
            match436 = {
                type: 'MissingAccount',
            };
        }
        else if ('MalformedData' in variant435[0]) {
            match436 = {
                type: 'MalformedData',
            };
        }
        else if ('WrongSignature' in variant435[0]) {
            match436 = {
                type: 'WrongSignature',
            };
        }
        else if ('NonceMismatch' in variant435[0]) {
            match436 = {
                type: 'NonceMismatch',
            };
        }
        else if ('WrongContract' in variant435[0]) {
            match436 = {
                type: 'WrongContract',
            };
        }
        else if ('WrongEntryPoint' in variant435[0]) {
            match436 = {
                type: 'WrongEntryPoint',
            };
        }
        else if ('Expired' in variant435[0]) {
            match436 = {
                type: 'Expired',
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        match431 = {
            type: 'Custom',
            content: match436,
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    return match431;
}
exports.parseErrorMessageSupports = parseErrorMessageSupports;
/**
 * Construct Parameter for update transactions for 'supportsPermit' entrypoint of the 'cis2_multi' contract.
 * @param {SupportsPermitParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createSupportsPermitParameter(parameter) {
    var field451 = parameter.queries;
    var named450 = {
        queries: field451,
    };
    var out = SDK.Parameter.fromBase64SchemaType('FAABAAAABwAAAHF1ZXJpZXMQARYB', named450);
    return out;
}
exports.createSupportsPermitParameter = createSupportsPermitParameter;
/**
 * Send an update-contract transaction to the 'supportsPermit' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SupportsPermitParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendSupportsPermit(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('supportsPermit'), SDK.Parameter.toBuffer, transactionMetadata, createSupportsPermitParameter(parameter), signer);
}
exports.sendSupportsPermit = sendSupportsPermit;
/**
 * Dry-run an update-contract transaction to the 'supportsPermit' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SupportsPermitParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunSupportsPermit(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('supportsPermit'), invokeMetadata, SDK.Parameter.toBuffer, createSupportsPermitParameter(parameter), blockHash);
}
exports.dryRunSupportsPermit = dryRunSupportsPermit;
/**
 * Get and parse the return value from dry-running update transaction for 'supportsPermit' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueSupportsPermit | undefined} The structured return value or undefined if result was not a success.
 */
function parseReturnValueSupportsPermit(invokeResult) {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAEVAwAAAAkAAABOb1N1cHBvcnQCBwAAAFN1cHBvcnQCCQAAAFN1cHBvcnRCeQEBAAAAEAAM');
    var list454 = schemaJson.map(function (item455) {
        var match456;
        if ('NoSupport' in item455) {
            match456 = {
                type: 'NoSupport',
            };
        }
        else if ('Support' in item455) {
            match456 = {
                type: 'Support',
            };
        }
        else if ('SupportBy' in item455) {
            var variant459 = item455.SupportBy;
            var list460 = variant459[0].map(function (item461) {
                var contractAddress462 = SDK.ContractAddress.fromSchemaValue(item461);
                return contractAddress462;
            });
            match456 = {
                type: 'SupportBy',
                content: list460,
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        return match456;
    });
    return list454;
}
exports.parseReturnValueSupportsPermit = parseReturnValueSupportsPermit;
/**
 * Get and parse the error message from dry-running update transaction for 'supportsPermit' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageSupportsPermit | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
function parseErrorMessageSupportsPermit(invokeResult) {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    var match463;
    if ('InvalidTokenId' in schemaJson) {
        match463 = {
            type: 'InvalidTokenId',
        };
    }
    else if ('InsufficientFunds' in schemaJson) {
        match463 = {
            type: 'InsufficientFunds',
        };
    }
    else if ('Unauthorized' in schemaJson) {
        match463 = {
            type: 'Unauthorized',
        };
    }
    else if ('Custom' in schemaJson) {
        var variant467 = schemaJson.Custom;
        var match468 = void 0;
        if ('ParseParams' in variant467[0]) {
            match468 = {
                type: 'ParseParams',
            };
        }
        else if ('LogFull' in variant467[0]) {
            match468 = {
                type: 'LogFull',
            };
        }
        else if ('LogMalformed' in variant467[0]) {
            match468 = {
                type: 'LogMalformed',
            };
        }
        else if ('InvalidContractName' in variant467[0]) {
            match468 = {
                type: 'InvalidContractName',
            };
        }
        else if ('ContractOnly' in variant467[0]) {
            match468 = {
                type: 'ContractOnly',
            };
        }
        else if ('InvokeContractError' in variant467[0]) {
            match468 = {
                type: 'InvokeContractError',
            };
        }
        else if ('MissingAccount' in variant467[0]) {
            match468 = {
                type: 'MissingAccount',
            };
        }
        else if ('MalformedData' in variant467[0]) {
            match468 = {
                type: 'MalformedData',
            };
        }
        else if ('WrongSignature' in variant467[0]) {
            match468 = {
                type: 'WrongSignature',
            };
        }
        else if ('NonceMismatch' in variant467[0]) {
            match468 = {
                type: 'NonceMismatch',
            };
        }
        else if ('WrongContract' in variant467[0]) {
            match468 = {
                type: 'WrongContract',
            };
        }
        else if ('WrongEntryPoint' in variant467[0]) {
            match468 = {
                type: 'WrongEntryPoint',
            };
        }
        else if ('Expired' in variant467[0]) {
            match468 = {
                type: 'Expired',
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        match463 = {
            type: 'Custom',
            content: match468,
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    return match463;
}
exports.parseErrorMessageSupportsPermit = parseErrorMessageSupportsPermit;
/**
 * Construct Parameter for update transactions for 'setImplementors' entrypoint of the 'cis2_multi' contract.
 * @param {SetImplementorsParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createSetImplementorsParameter(parameter) {
    var field483 = parameter.id;
    var field484 = parameter.implementors;
    var list485 = field484.map(function (item486) {
        var contractAddress487 = SDK.ContractAddress.toSchemaValue(item486);
        return contractAddress487;
    });
    var named482 = {
        id: field483,
        implementors: list485,
    };
    var out = SDK.Parameter.fromBase64SchemaType('FAACAAAAAgAAAGlkFgAMAAAAaW1wbGVtZW50b3JzEAIM', named482);
    return out;
}
exports.createSetImplementorsParameter = createSetImplementorsParameter;
/**
 * Send an update-contract transaction to the 'setImplementors' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SetImplementorsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendSetImplementors(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('setImplementors'), SDK.Parameter.toBuffer, transactionMetadata, createSetImplementorsParameter(parameter), signer);
}
exports.sendSetImplementors = sendSetImplementors;
/**
 * Dry-run an update-contract transaction to the 'setImplementors' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SetImplementorsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunSetImplementors(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('setImplementors'), invokeMetadata, SDK.Parameter.toBuffer, createSetImplementorsParameter(parameter), blockHash);
}
exports.dryRunSetImplementors = dryRunSetImplementors;
/**
 * Get and parse the error message from dry-running update transaction for 'setImplementors' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageSetImplementors | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
function parseErrorMessageSetImplementors(invokeResult) {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    var match488;
    if ('InvalidTokenId' in schemaJson) {
        match488 = {
            type: 'InvalidTokenId',
        };
    }
    else if ('InsufficientFunds' in schemaJson) {
        match488 = {
            type: 'InsufficientFunds',
        };
    }
    else if ('Unauthorized' in schemaJson) {
        match488 = {
            type: 'Unauthorized',
        };
    }
    else if ('Custom' in schemaJson) {
        var variant492 = schemaJson.Custom;
        var match493 = void 0;
        if ('ParseParams' in variant492[0]) {
            match493 = {
                type: 'ParseParams',
            };
        }
        else if ('LogFull' in variant492[0]) {
            match493 = {
                type: 'LogFull',
            };
        }
        else if ('LogMalformed' in variant492[0]) {
            match493 = {
                type: 'LogMalformed',
            };
        }
        else if ('InvalidContractName' in variant492[0]) {
            match493 = {
                type: 'InvalidContractName',
            };
        }
        else if ('ContractOnly' in variant492[0]) {
            match493 = {
                type: 'ContractOnly',
            };
        }
        else if ('InvokeContractError' in variant492[0]) {
            match493 = {
                type: 'InvokeContractError',
            };
        }
        else if ('MissingAccount' in variant492[0]) {
            match493 = {
                type: 'MissingAccount',
            };
        }
        else if ('MalformedData' in variant492[0]) {
            match493 = {
                type: 'MalformedData',
            };
        }
        else if ('WrongSignature' in variant492[0]) {
            match493 = {
                type: 'WrongSignature',
            };
        }
        else if ('NonceMismatch' in variant492[0]) {
            match493 = {
                type: 'NonceMismatch',
            };
        }
        else if ('WrongContract' in variant492[0]) {
            match493 = {
                type: 'WrongContract',
            };
        }
        else if ('WrongEntryPoint' in variant492[0]) {
            match493 = {
                type: 'WrongEntryPoint',
            };
        }
        else if ('Expired' in variant492[0]) {
            match493 = {
                type: 'Expired',
            };
        }
        else {
            throw new Error("Unexpected enum variant");
        }
        match488 = {
            type: 'Custom',
            content: match493,
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    return match488;
}
exports.parseErrorMessageSetImplementors = parseErrorMessageSetImplementors;
