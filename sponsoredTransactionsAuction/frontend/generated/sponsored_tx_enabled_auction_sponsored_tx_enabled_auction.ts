// @ts-nocheck
import * as SDK from "@concordium/web-sdk";
/** The reference of the smart contract module supported by the provided client. */
export const moduleReference: SDK.ModuleReference.Type = /*#__PURE__*/ SDK.ModuleReference.fromHexString('59166ebadaf1e4f13b4fc06727a3719b38482f57d5fbc64799eed97fd58debc5');
/** Name of the smart contract supported by this client. */
export const contractName: SDK.ContractName.Type = /*#__PURE__*/ SDK.ContractName.fromStringUnchecked('sponsored_tx_enabled_auction');

/** Smart contract client for a contract instance on chain. */
class SponsoredTxEnabledAuctionContract {
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
export type Type = SponsoredTxEnabledAuctionContract;

/**
 * Construct an instance of `SponsoredTxEnabledAuctionContract` for interacting with a 'sponsored_tx_enabled_auction' contract on chain.
 * Checking the information instance on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @param {SDK.BlockHash.Type} [blockHash] - Hash of the block to check the information at. When not provided the last finalized block is used.
 * @throws If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SponsoredTxEnabledAuctionContract}
 */
export async function create(grpcClient: SDK.ConcordiumGRPCClient, contractAddress: SDK.ContractAddress.Type, blockHash?: SDK.BlockHash.Type): Promise<SponsoredTxEnabledAuctionContract> {
    const genericContract = new SDK.Contract(grpcClient, contractAddress, contractName);
    await genericContract.checkOnChain({ moduleReference: moduleReference, blockHash: blockHash });
    return new SponsoredTxEnabledAuctionContract(
        grpcClient,
        contractAddress,
        genericContract
    );
}

/**
 * Construct the `SponsoredTxEnabledAuctionContract` for interacting with a 'sponsored_tx_enabled_auction' contract on chain.
 * Without checking the instance information on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @returns {SponsoredTxEnabledAuctionContract}
 */
export function createUnchecked(grpcClient: SDK.ConcordiumGRPCClient, contractAddress: SDK.ContractAddress.Type): SponsoredTxEnabledAuctionContract {
    const genericContract = new SDK.Contract(grpcClient, contractAddress, contractName);
    return new SponsoredTxEnabledAuctionContract(
        grpcClient,
        contractAddress,
        genericContract,
    );
}

/**
 * Check if the smart contract instance exists on the blockchain and whether it uses a matching contract name and module reference.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.BlockHash.Type} [blockHash] A optional block hash to use for checking information on chain, if not provided the last finalized will be used.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 */
export function checkOnChain(contractClient: SponsoredTxEnabledAuctionContract, blockHash?: SDK.BlockHash.Type): Promise<void> {
    return contractClient.genericContract.checkOnChain({moduleReference: moduleReference, blockHash: blockHash });
}

/** Contract event type for the 'sponsored_tx_enabled_auction' contract. */
export type Event = { type: 'AddItemEvent', content: {
    item_index: number,
    } };

/**
 * Parse the contract events logged by the 'sponsored_tx_enabled_auction' contract.
 * @param {SDK.ContractEvent.Type} event The unparsed contract event.
 * @returns {Event} The structured contract event.
 */
export function parseEvent(event: SDK.ContractEvent.Type): Event {
    const schemaJson = <{'AddItemEvent' : {
    item_index: number,
    } }>SDK.ContractEvent.parseWithSchemaTypeBase64(event, 'HwEAAAAADAAAAEFkZEl0ZW1FdmVudAABAAAACgAAAGl0ZW1faW5kZXgD');
    let match1: { type: 'AddItemEvent', content: {
    item_index: number,
    } };
    if ('AddItemEvent' in schemaJson) {
       const variant2 = schemaJson.AddItemEvent;
    const field3 = variant2.item_index;
    const named4 = {
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
/** Base64 encoding of the parameter schema type for update transactions to 'addItem' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
const base64AddItemParameterSchema = 'FAAFAAAABAAAAG5hbWUWAgMAAABlbmQNBQAAAHN0YXJ0DQsAAABtaW5pbXVtX2JpZBslAAAACAAAAHRva2VuX2lkHQA=';
/** Parameter JSON type needed by the schema for update transaction for 'addItem' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
type AddItemParameterSchemaJson = {
    name: string,
    end: SDK.Timestamp.SchemaValue,
    start: SDK.Timestamp.SchemaValue,
    minimum_bid: string,
    token_id: string,
    };
/** Parameter type for update transaction for 'addItem' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type AddItemParameter = {
    name: string,
    end: SDK.Timestamp.Type,
    start: SDK.Timestamp.Type,
    minimum_bid: number | bigint,
    token_id: SDK.HexString,
    };

/**
 * Construct schema JSON representation used in update transaction for 'addItem' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {AddItemParameter} parameter The structured parameter to construct from.
 * @returns {AddItemParameterSchemaJson} The smart contract parameter JSON.
 */
function createAddItemParameterSchemaJson(parameter: AddItemParameter): AddItemParameterSchemaJson {
    const field7 = parameter.name;
    const field8 = parameter.end;
    const timestamp9 = SDK.Timestamp.toSchemaValue(field8);
    const field10 = parameter.start;
    const timestamp11 = SDK.Timestamp.toSchemaValue(field10);
    const field12 = parameter.minimum_bid;
    const leb5 = BigInt(field12).toString();
    const field13 = parameter.token_id;
    const named6 = {
    name: field7,
    end: timestamp9,
    start: timestamp11,
    minimum_bid: leb5,
    token_id: field13,
    };
    return named6;
}

/**
 * Construct Parameter type used in update transaction for 'addItem' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {AddItemParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createAddItemParameter(parameter: AddItemParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64AddItemParameterSchema, createAddItemParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'addItem' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {AddItemParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createAddItemParameterWebWallet(parameter: AddItemParameter) {
    return {
        parameters: createAddItemParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64AddItemParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'addItem' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {AddItemParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendAddItem(contractClient: SponsoredTxEnabledAuctionContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: AddItemParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('addItem'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createAddItemParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'addItem' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {AddItemParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunAddItem(contractClient: SponsoredTxEnabledAuctionContract, parameter: AddItemParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('addItem'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createAddItemParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'addItem' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type ErrorMessageAddItem = { type: 'ParseParams'} | { type: 'StartEndTimeError'} | { type: 'EndTimeError'} | { type: 'OnlyAccount'} | { type: 'BidNotGreaterCurrentBid'} | { type: 'BidTooLate'} | { type: 'AuctionAlreadyFinalized'} | { type: 'NoItem'} | { type: 'AuctionStillActive'} | { type: 'NotTokenContract'} | { type: 'WrongTokenID'} | { type: 'InvokeContractError'} | { type: 'ParseResult'} | { type: 'InvalidResponse'} | { type: 'AmountTooLarge'} | { type: 'MissingAccount'} | { type: 'MissingContract'} | { type: 'MissingEntrypoint'} | { type: 'MessageFailed'} | { type: 'LogicReject'} | { type: 'Trap'} | { type: 'LogFull'} | { type: 'LogMalformed'};

/**
 * Get and parse the error message from dry-running update transaction for 'addItem' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageAddItem | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageAddItem(invokeResult: SDK.InvokeContractResult): ErrorMessageAddItem | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'StartEndTimeError' : [] } | {'EndTimeError' : [] } | {'OnlyAccount' : [] } | {'BidNotGreaterCurrentBid' : [] } | {'BidTooLate' : [] } | {'AuctionAlreadyFinalized' : [] } | {'NoItem' : [] } | {'AuctionStillActive' : [] } | {'NotTokenContract' : [] } | {'WrongTokenID' : [] } | {'InvokeContractError' : [] } | {'ParseResult' : [] } | {'InvalidResponse' : [] } | {'AmountTooLarge' : [] } | {'MissingAccount' : [] } | {'MissingContract' : [] } | {'MissingEntrypoint' : [] } | {'MessageFailed' : [] } | {'LogicReject' : [] } | {'Trap' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRcAAAALAAAAUGFyc2VQYXJhbXMCEQAAAFN0YXJ0RW5kVGltZUVycm9yAgwAAABFbmRUaW1lRXJyb3ICCwAAAE9ubHlBY2NvdW50AhcAAABCaWROb3RHcmVhdGVyQ3VycmVudEJpZAIKAAAAQmlkVG9vTGF0ZQIXAAAAQXVjdGlvbkFscmVhZHlGaW5hbGl6ZWQCBgAAAE5vSXRlbQISAAAAQXVjdGlvblN0aWxsQWN0aXZlAhAAAABOb3RUb2tlbkNvbnRyYWN0AgwAAABXcm9uZ1Rva2VuSUQCEwAAAEludm9rZUNvbnRyYWN0RXJyb3ICCwAAAFBhcnNlUmVzdWx0Ag8AAABJbnZhbGlkUmVzcG9uc2UCDgAAAEFtb3VudFRvb0xhcmdlAg4AAABNaXNzaW5nQWNjb3VudAIPAAAATWlzc2luZ0NvbnRyYWN0AhEAAABNaXNzaW5nRW50cnlwb2ludAINAAAATWVzc2FnZUZhaWxlZAILAAAATG9naWNSZWplY3QCBAAAAFRyYXACBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAI=');
    let match14: { type: 'ParseParams'} | { type: 'StartEndTimeError'} | { type: 'EndTimeError'} | { type: 'OnlyAccount'} | { type: 'BidNotGreaterCurrentBid'} | { type: 'BidTooLate'} | { type: 'AuctionAlreadyFinalized'} | { type: 'NoItem'} | { type: 'AuctionStillActive'} | { type: 'NotTokenContract'} | { type: 'WrongTokenID'} | { type: 'InvokeContractError'} | { type: 'ParseResult'} | { type: 'InvalidResponse'} | { type: 'AmountTooLarge'} | { type: 'MissingAccount'} | { type: 'MissingContract'} | { type: 'MissingEntrypoint'} | { type: 'MessageFailed'} | { type: 'LogicReject'} | { type: 'Trap'} | { type: 'LogFull'} | { type: 'LogMalformed'};
    if ('ParseParams' in schemaJson) {
       match14 = {
           type: 'ParseParams',
       };
    } else if ('StartEndTimeError' in schemaJson) {
       match14 = {
           type: 'StartEndTimeError',
       };
    } else if ('EndTimeError' in schemaJson) {
       match14 = {
           type: 'EndTimeError',
       };
    } else if ('OnlyAccount' in schemaJson) {
       match14 = {
           type: 'OnlyAccount',
       };
    } else if ('BidNotGreaterCurrentBid' in schemaJson) {
       match14 = {
           type: 'BidNotGreaterCurrentBid',
       };
    } else if ('BidTooLate' in schemaJson) {
       match14 = {
           type: 'BidTooLate',
       };
    } else if ('AuctionAlreadyFinalized' in schemaJson) {
       match14 = {
           type: 'AuctionAlreadyFinalized',
       };
    } else if ('NoItem' in schemaJson) {
       match14 = {
           type: 'NoItem',
       };
    } else if ('AuctionStillActive' in schemaJson) {
       match14 = {
           type: 'AuctionStillActive',
       };
    } else if ('NotTokenContract' in schemaJson) {
       match14 = {
           type: 'NotTokenContract',
       };
    } else if ('WrongTokenID' in schemaJson) {
       match14 = {
           type: 'WrongTokenID',
       };
    } else if ('InvokeContractError' in schemaJson) {
       match14 = {
           type: 'InvokeContractError',
       };
    } else if ('ParseResult' in schemaJson) {
       match14 = {
           type: 'ParseResult',
       };
    } else if ('InvalidResponse' in schemaJson) {
       match14 = {
           type: 'InvalidResponse',
       };
    } else if ('AmountTooLarge' in schemaJson) {
       match14 = {
           type: 'AmountTooLarge',
       };
    } else if ('MissingAccount' in schemaJson) {
       match14 = {
           type: 'MissingAccount',
       };
    } else if ('MissingContract' in schemaJson) {
       match14 = {
           type: 'MissingContract',
       };
    } else if ('MissingEntrypoint' in schemaJson) {
       match14 = {
           type: 'MissingEntrypoint',
       };
    } else if ('MessageFailed' in schemaJson) {
       match14 = {
           type: 'MessageFailed',
       };
    } else if ('LogicReject' in schemaJson) {
       match14 = {
           type: 'LogicReject',
       };
    } else if ('Trap' in schemaJson) {
       match14 = {
           type: 'Trap',
       };
    } else if ('LogFull' in schemaJson) {
       match14 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match14 = {
           type: 'LogMalformed',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match14
}
/** Base64 encoding of the parameter schema type for update transactions to 'bid' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
const base64BidParameterSchema = 'FAAEAAAACAAAAHRva2VuX2lkHQAGAAAAYW1vdW50GyUAAAAEAAAAZnJvbRUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwEAAAAZGF0YQM=';
/** Parameter JSON type needed by the schema for update transaction for 'bid' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
type BidParameterSchemaJson = {
    token_id: string,
    amount: string,
    from: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    data: number,
    };
/** Parameter type for update transaction for 'bid' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type BidParameter = {
    token_id: SDK.HexString,
    amount: number | bigint,
    from: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    data: number,
    };

/**
 * Construct schema JSON representation used in update transaction for 'bid' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {BidParameter} parameter The structured parameter to construct from.
 * @returns {BidParameterSchemaJson} The smart contract parameter JSON.
 */
function createBidParameterSchemaJson(parameter: BidParameter): BidParameterSchemaJson {
    const field40 = parameter.token_id;
    const field41 = parameter.amount;
    const leb38 = BigInt(field41).toString();
    const field42 = parameter.from;
    let match43: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field42.type) {
        case 'Account':
    const accountAddress44 = SDK.AccountAddress.toSchemaValue(field42.content);
            match43 = { Account: [accountAddress44], };
        break;
        case 'Contract':
    const contractAddress45 = SDK.ContractAddress.toSchemaValue(field42.content);
            match43 = { Contract: [contractAddress45], };
        break;
    }

    const field46 = parameter.data;
    const named39 = {
    token_id: field40,
    amount: leb38,
    from: match43,
    data: field46,
    };
    return named39;
}

/**
 * Construct Parameter type used in update transaction for 'bid' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {BidParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createBidParameter(parameter: BidParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64BidParameterSchema, createBidParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'bid' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {BidParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createBidParameterWebWallet(parameter: BidParameter) {
    return {
        parameters: createBidParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64BidParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'bid' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {BidParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendBid(contractClient: SponsoredTxEnabledAuctionContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: BidParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('bid'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createBidParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'bid' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {BidParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunBid(contractClient: SponsoredTxEnabledAuctionContract, parameter: BidParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('bid'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createBidParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'bid' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type ErrorMessageBid = { type: 'ParseParams'} | { type: 'StartEndTimeError'} | { type: 'EndTimeError'} | { type: 'OnlyAccount'} | { type: 'BidNotGreaterCurrentBid'} | { type: 'BidTooLate'} | { type: 'AuctionAlreadyFinalized'} | { type: 'NoItem'} | { type: 'AuctionStillActive'} | { type: 'NotTokenContract'} | { type: 'WrongTokenID'} | { type: 'InvokeContractError'} | { type: 'ParseResult'} | { type: 'InvalidResponse'} | { type: 'AmountTooLarge'} | { type: 'MissingAccount'} | { type: 'MissingContract'} | { type: 'MissingEntrypoint'} | { type: 'MessageFailed'} | { type: 'LogicReject'} | { type: 'Trap'} | { type: 'LogFull'} | { type: 'LogMalformed'};

/**
 * Get and parse the error message from dry-running update transaction for 'bid' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageBid | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageBid(invokeResult: SDK.InvokeContractResult): ErrorMessageBid | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'StartEndTimeError' : [] } | {'EndTimeError' : [] } | {'OnlyAccount' : [] } | {'BidNotGreaterCurrentBid' : [] } | {'BidTooLate' : [] } | {'AuctionAlreadyFinalized' : [] } | {'NoItem' : [] } | {'AuctionStillActive' : [] } | {'NotTokenContract' : [] } | {'WrongTokenID' : [] } | {'InvokeContractError' : [] } | {'ParseResult' : [] } | {'InvalidResponse' : [] } | {'AmountTooLarge' : [] } | {'MissingAccount' : [] } | {'MissingContract' : [] } | {'MissingEntrypoint' : [] } | {'MessageFailed' : [] } | {'LogicReject' : [] } | {'Trap' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRcAAAALAAAAUGFyc2VQYXJhbXMCEQAAAFN0YXJ0RW5kVGltZUVycm9yAgwAAABFbmRUaW1lRXJyb3ICCwAAAE9ubHlBY2NvdW50AhcAAABCaWROb3RHcmVhdGVyQ3VycmVudEJpZAIKAAAAQmlkVG9vTGF0ZQIXAAAAQXVjdGlvbkFscmVhZHlGaW5hbGl6ZWQCBgAAAE5vSXRlbQISAAAAQXVjdGlvblN0aWxsQWN0aXZlAhAAAABOb3RUb2tlbkNvbnRyYWN0AgwAAABXcm9uZ1Rva2VuSUQCEwAAAEludm9rZUNvbnRyYWN0RXJyb3ICCwAAAFBhcnNlUmVzdWx0Ag8AAABJbnZhbGlkUmVzcG9uc2UCDgAAAEFtb3VudFRvb0xhcmdlAg4AAABNaXNzaW5nQWNjb3VudAIPAAAATWlzc2luZ0NvbnRyYWN0AhEAAABNaXNzaW5nRW50cnlwb2ludAINAAAATWVzc2FnZUZhaWxlZAILAAAATG9naWNSZWplY3QCBAAAAFRyYXACBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAI=');
    let match47: { type: 'ParseParams'} | { type: 'StartEndTimeError'} | { type: 'EndTimeError'} | { type: 'OnlyAccount'} | { type: 'BidNotGreaterCurrentBid'} | { type: 'BidTooLate'} | { type: 'AuctionAlreadyFinalized'} | { type: 'NoItem'} | { type: 'AuctionStillActive'} | { type: 'NotTokenContract'} | { type: 'WrongTokenID'} | { type: 'InvokeContractError'} | { type: 'ParseResult'} | { type: 'InvalidResponse'} | { type: 'AmountTooLarge'} | { type: 'MissingAccount'} | { type: 'MissingContract'} | { type: 'MissingEntrypoint'} | { type: 'MessageFailed'} | { type: 'LogicReject'} | { type: 'Trap'} | { type: 'LogFull'} | { type: 'LogMalformed'};
    if ('ParseParams' in schemaJson) {
       match47 = {
           type: 'ParseParams',
       };
    } else if ('StartEndTimeError' in schemaJson) {
       match47 = {
           type: 'StartEndTimeError',
       };
    } else if ('EndTimeError' in schemaJson) {
       match47 = {
           type: 'EndTimeError',
       };
    } else if ('OnlyAccount' in schemaJson) {
       match47 = {
           type: 'OnlyAccount',
       };
    } else if ('BidNotGreaterCurrentBid' in schemaJson) {
       match47 = {
           type: 'BidNotGreaterCurrentBid',
       };
    } else if ('BidTooLate' in schemaJson) {
       match47 = {
           type: 'BidTooLate',
       };
    } else if ('AuctionAlreadyFinalized' in schemaJson) {
       match47 = {
           type: 'AuctionAlreadyFinalized',
       };
    } else if ('NoItem' in schemaJson) {
       match47 = {
           type: 'NoItem',
       };
    } else if ('AuctionStillActive' in schemaJson) {
       match47 = {
           type: 'AuctionStillActive',
       };
    } else if ('NotTokenContract' in schemaJson) {
       match47 = {
           type: 'NotTokenContract',
       };
    } else if ('WrongTokenID' in schemaJson) {
       match47 = {
           type: 'WrongTokenID',
       };
    } else if ('InvokeContractError' in schemaJson) {
       match47 = {
           type: 'InvokeContractError',
       };
    } else if ('ParseResult' in schemaJson) {
       match47 = {
           type: 'ParseResult',
       };
    } else if ('InvalidResponse' in schemaJson) {
       match47 = {
           type: 'InvalidResponse',
       };
    } else if ('AmountTooLarge' in schemaJson) {
       match47 = {
           type: 'AmountTooLarge',
       };
    } else if ('MissingAccount' in schemaJson) {
       match47 = {
           type: 'MissingAccount',
       };
    } else if ('MissingContract' in schemaJson) {
       match47 = {
           type: 'MissingContract',
       };
    } else if ('MissingEntrypoint' in schemaJson) {
       match47 = {
           type: 'MissingEntrypoint',
       };
    } else if ('MessageFailed' in schemaJson) {
       match47 = {
           type: 'MessageFailed',
       };
    } else if ('LogicReject' in schemaJson) {
       match47 = {
           type: 'LogicReject',
       };
    } else if ('Trap' in schemaJson) {
       match47 = {
           type: 'Trap',
       };
    } else if ('LogFull' in schemaJson) {
       match47 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match47 = {
           type: 'LogMalformed',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match47
}
/** Base64 encoding of the parameter schema type for update transactions to 'finalize' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
const base64FinalizeParameterSchema = 'Aw==';
/** Parameter JSON type needed by the schema for update transaction for 'finalize' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
type FinalizeParameterSchemaJson = number;
/** Parameter type for update transaction for 'finalize' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type FinalizeParameter = number;

/**
 * Construct schema JSON representation used in update transaction for 'finalize' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {FinalizeParameter} parameter The structured parameter to construct from.
 * @returns {FinalizeParameterSchemaJson} The smart contract parameter JSON.
 */
function createFinalizeParameterSchemaJson(parameter: FinalizeParameter): FinalizeParameterSchemaJson {
    return parameter;
}

/**
 * Construct Parameter type used in update transaction for 'finalize' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {FinalizeParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createFinalizeParameter(parameter: FinalizeParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64FinalizeParameterSchema, createFinalizeParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'finalize' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {FinalizeParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createFinalizeParameterWebWallet(parameter: FinalizeParameter) {
    return {
        parameters: createFinalizeParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64FinalizeParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'finalize' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {FinalizeParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendFinalize(contractClient: SponsoredTxEnabledAuctionContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: FinalizeParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('finalize'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createFinalizeParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'finalize' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {FinalizeParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunFinalize(contractClient: SponsoredTxEnabledAuctionContract, parameter: FinalizeParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('finalize'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createFinalizeParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'finalize' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type ErrorMessageFinalize = { type: 'ParseParams'} | { type: 'StartEndTimeError'} | { type: 'EndTimeError'} | { type: 'OnlyAccount'} | { type: 'BidNotGreaterCurrentBid'} | { type: 'BidTooLate'} | { type: 'AuctionAlreadyFinalized'} | { type: 'NoItem'} | { type: 'AuctionStillActive'} | { type: 'NotTokenContract'} | { type: 'WrongTokenID'} | { type: 'InvokeContractError'} | { type: 'ParseResult'} | { type: 'InvalidResponse'} | { type: 'AmountTooLarge'} | { type: 'MissingAccount'} | { type: 'MissingContract'} | { type: 'MissingEntrypoint'} | { type: 'MessageFailed'} | { type: 'LogicReject'} | { type: 'Trap'} | { type: 'LogFull'} | { type: 'LogMalformed'};

/**
 * Get and parse the error message from dry-running update transaction for 'finalize' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageFinalize | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageFinalize(invokeResult: SDK.InvokeContractResult): ErrorMessageFinalize | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'StartEndTimeError' : [] } | {'EndTimeError' : [] } | {'OnlyAccount' : [] } | {'BidNotGreaterCurrentBid' : [] } | {'BidTooLate' : [] } | {'AuctionAlreadyFinalized' : [] } | {'NoItem' : [] } | {'AuctionStillActive' : [] } | {'NotTokenContract' : [] } | {'WrongTokenID' : [] } | {'InvokeContractError' : [] } | {'ParseResult' : [] } | {'InvalidResponse' : [] } | {'AmountTooLarge' : [] } | {'MissingAccount' : [] } | {'MissingContract' : [] } | {'MissingEntrypoint' : [] } | {'MessageFailed' : [] } | {'LogicReject' : [] } | {'Trap' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRcAAAALAAAAUGFyc2VQYXJhbXMCEQAAAFN0YXJ0RW5kVGltZUVycm9yAgwAAABFbmRUaW1lRXJyb3ICCwAAAE9ubHlBY2NvdW50AhcAAABCaWROb3RHcmVhdGVyQ3VycmVudEJpZAIKAAAAQmlkVG9vTGF0ZQIXAAAAQXVjdGlvbkFscmVhZHlGaW5hbGl6ZWQCBgAAAE5vSXRlbQISAAAAQXVjdGlvblN0aWxsQWN0aXZlAhAAAABOb3RUb2tlbkNvbnRyYWN0AgwAAABXcm9uZ1Rva2VuSUQCEwAAAEludm9rZUNvbnRyYWN0RXJyb3ICCwAAAFBhcnNlUmVzdWx0Ag8AAABJbnZhbGlkUmVzcG9uc2UCDgAAAEFtb3VudFRvb0xhcmdlAg4AAABNaXNzaW5nQWNjb3VudAIPAAAATWlzc2luZ0NvbnRyYWN0AhEAAABNaXNzaW5nRW50cnlwb2ludAINAAAATWVzc2FnZUZhaWxlZAILAAAATG9naWNSZWplY3QCBAAAAFRyYXACBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAI=');
    let match71: { type: 'ParseParams'} | { type: 'StartEndTimeError'} | { type: 'EndTimeError'} | { type: 'OnlyAccount'} | { type: 'BidNotGreaterCurrentBid'} | { type: 'BidTooLate'} | { type: 'AuctionAlreadyFinalized'} | { type: 'NoItem'} | { type: 'AuctionStillActive'} | { type: 'NotTokenContract'} | { type: 'WrongTokenID'} | { type: 'InvokeContractError'} | { type: 'ParseResult'} | { type: 'InvalidResponse'} | { type: 'AmountTooLarge'} | { type: 'MissingAccount'} | { type: 'MissingContract'} | { type: 'MissingEntrypoint'} | { type: 'MessageFailed'} | { type: 'LogicReject'} | { type: 'Trap'} | { type: 'LogFull'} | { type: 'LogMalformed'};
    if ('ParseParams' in schemaJson) {
       match71 = {
           type: 'ParseParams',
       };
    } else if ('StartEndTimeError' in schemaJson) {
       match71 = {
           type: 'StartEndTimeError',
       };
    } else if ('EndTimeError' in schemaJson) {
       match71 = {
           type: 'EndTimeError',
       };
    } else if ('OnlyAccount' in schemaJson) {
       match71 = {
           type: 'OnlyAccount',
       };
    } else if ('BidNotGreaterCurrentBid' in schemaJson) {
       match71 = {
           type: 'BidNotGreaterCurrentBid',
       };
    } else if ('BidTooLate' in schemaJson) {
       match71 = {
           type: 'BidTooLate',
       };
    } else if ('AuctionAlreadyFinalized' in schemaJson) {
       match71 = {
           type: 'AuctionAlreadyFinalized',
       };
    } else if ('NoItem' in schemaJson) {
       match71 = {
           type: 'NoItem',
       };
    } else if ('AuctionStillActive' in schemaJson) {
       match71 = {
           type: 'AuctionStillActive',
       };
    } else if ('NotTokenContract' in schemaJson) {
       match71 = {
           type: 'NotTokenContract',
       };
    } else if ('WrongTokenID' in schemaJson) {
       match71 = {
           type: 'WrongTokenID',
       };
    } else if ('InvokeContractError' in schemaJson) {
       match71 = {
           type: 'InvokeContractError',
       };
    } else if ('ParseResult' in schemaJson) {
       match71 = {
           type: 'ParseResult',
       };
    } else if ('InvalidResponse' in schemaJson) {
       match71 = {
           type: 'InvalidResponse',
       };
    } else if ('AmountTooLarge' in schemaJson) {
       match71 = {
           type: 'AmountTooLarge',
       };
    } else if ('MissingAccount' in schemaJson) {
       match71 = {
           type: 'MissingAccount',
       };
    } else if ('MissingContract' in schemaJson) {
       match71 = {
           type: 'MissingContract',
       };
    } else if ('MissingEntrypoint' in schemaJson) {
       match71 = {
           type: 'MissingEntrypoint',
       };
    } else if ('MessageFailed' in schemaJson) {
       match71 = {
           type: 'MessageFailed',
       };
    } else if ('LogicReject' in schemaJson) {
       match71 = {
           type: 'LogicReject',
       };
    } else if ('Trap' in schemaJson) {
       match71 = {
           type: 'Trap',
       };
    } else if ('LogFull' in schemaJson) {
       match71 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match71 = {
           type: 'LogMalformed',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match71
}
/** Parameter type  used in update transaction for 'view' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type ViewParameter = SDK.Parameter.Type;

/**
 * Send an update-contract transaction to the 'view' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {ViewParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendView(contractClient: SponsoredTxEnabledAuctionContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: ViewParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('view'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        parameter,
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'view' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {ViewParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunView(contractClient: SponsoredTxEnabledAuctionContract, parameter: ViewParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('view'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        parameter,
        blockHash
    );
}

/** Return value for dry-running update transaction for 'view' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type ReturnValueView = {
    item_states: Array<[number, {
    auction_state: { type: 'NotSoldYet'} | { type: 'Sold', content: SDK.AccountAddress.Type },
    highest_bidder: { type: 'None'} | { type: 'Some', content: SDK.AccountAddress.Type },
    name: string,
    end: SDK.Timestamp.Type,
    start: SDK.Timestamp.Type,
    highest_bid: number | bigint,
    token_id: SDK.HexString,
    creator: SDK.AccountAddress.Type,
    }]>,
    cis2_contract: SDK.ContractAddress.Type,
    counter: number,
    };

/**
 * Get and parse the return value from dry-running update transaction for 'view' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueView | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueView(invokeResult: SDK.InvokeContractResult): ReturnValueView | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{
    item_states: Array<[number, {
    auction_state: {'NotSoldYet' : [] } | {'Sold' : [SDK.AccountAddress.SchemaValue] },
    highest_bidder: {'None' : [] } | {'Some' : [SDK.AccountAddress.SchemaValue] },
    name: string,
    end: SDK.Timestamp.SchemaValue,
    start: SDK.Timestamp.SchemaValue,
    highest_bid: string,
    token_id: string,
    creator: SDK.AccountAddress.SchemaValue,
    }]>,
    cis2_contract: SDK.ContractAddress.SchemaValue,
    counter: number,
    }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FAADAAAACwAAAGl0ZW1fc3RhdGVzEAIPAxQACAAAAA0AAABhdWN0aW9uX3N0YXRlFQIAAAAKAAAATm90U29sZFlldAIEAAAAU29sZAEBAAAACw4AAABoaWdoZXN0X2JpZGRlchUCAAAABAAAAE5vbmUCBAAAAFNvbWUBAQAAAAsEAAAAbmFtZRYCAwAAAGVuZA0FAAAAc3RhcnQNCwAAAGhpZ2hlc3RfYmlkGyUAAAAIAAAAdG9rZW5faWQdAAcAAABjcmVhdG9yCw0AAABjaXMyX2NvbnRyYWN0DAcAAABjb3VudGVyAw==');
    const field96 = schemaJson.item_states;
    const list97 = field96.map((item98) => {
    const field100 = item98[1].auction_state;
    let match101: { type: 'NotSoldYet'} | { type: 'Sold', content: SDK.AccountAddress.Type };
    if ('NotSoldYet' in field100) {
       match101 = {
           type: 'NotSoldYet',
       };
    } else if ('Sold' in field100) {
       const variant103 = field100.Sold;
    const accountAddress104 = SDK.AccountAddress.fromSchemaValue(variant103[0]);
       match101 = {
           type: 'Sold',
           content: accountAddress104,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    const field105 = item98[1].highest_bidder;
    let match106: { type: 'None'} | { type: 'Some', content: SDK.AccountAddress.Type };
    if ('None' in field105) {
       match106 = {
           type: 'None',
       };
    } else if ('Some' in field105) {
       const variant108 = field105.Some;
    const accountAddress109 = SDK.AccountAddress.fromSchemaValue(variant108[0]);
       match106 = {
           type: 'Some',
           content: accountAddress109,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    const field110 = item98[1].name;
    const field111 = item98[1].end;
    const timestamp112 = SDK.Timestamp.fromSchemaValue(field111);
    const field113 = item98[1].start;
    const timestamp114 = SDK.Timestamp.fromSchemaValue(field113);
    const field115 = item98[1].highest_bid;
    const leb95 = BigInt(field115);
    const field116 = item98[1].token_id;
    const field117 = item98[1].creator;
    const accountAddress118 = SDK.AccountAddress.fromSchemaValue(field117);
    const named119 = {
    auction_state: match101,
    highest_bidder: match106,
    name: field110,
    end: timestamp112,
    start: timestamp114,
    highest_bid: leb95,
    token_id: field116,
    creator: accountAddress118,
    };
    const pair99: [number, {
    auction_state: { type: 'NotSoldYet'} | { type: 'Sold', content: SDK.AccountAddress.Type },
    highest_bidder: { type: 'None'} | { type: 'Some', content: SDK.AccountAddress.Type },
    name: string,
    end: SDK.Timestamp.Type,
    start: SDK.Timestamp.Type,
    highest_bid: number | bigint,
    token_id: SDK.HexString,
    creator: SDK.AccountAddress.Type,
    }] = [item98[0], named119];
    return pair99;
    });
    const field120 = schemaJson.cis2_contract;
    const contractAddress121 = SDK.ContractAddress.fromSchemaValue(field120);
    const field122 = schemaJson.counter;
    const named123 = {
    item_states: list97,
    cis2_contract: contractAddress121,
    counter: field122,
    };
    return named123;
}
/** Base64 encoding of the parameter schema type for update transactions to 'viewItemState' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
const base64ViewItemStateParameterSchema = 'Aw==';
/** Parameter JSON type needed by the schema for update transaction for 'viewItemState' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
type ViewItemStateParameterSchemaJson = number;
/** Parameter type for update transaction for 'viewItemState' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type ViewItemStateParameter = number;

/**
 * Construct schema JSON representation used in update transaction for 'viewItemState' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {ViewItemStateParameter} parameter The structured parameter to construct from.
 * @returns {ViewItemStateParameterSchemaJson} The smart contract parameter JSON.
 */
function createViewItemStateParameterSchemaJson(parameter: ViewItemStateParameter): ViewItemStateParameterSchemaJson {
    return parameter;
}

/**
 * Construct Parameter type used in update transaction for 'viewItemState' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {ViewItemStateParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createViewItemStateParameter(parameter: ViewItemStateParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64ViewItemStateParameterSchema, createViewItemStateParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'viewItemState' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {ViewItemStateParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createViewItemStateParameterWebWallet(parameter: ViewItemStateParameter) {
    return {
        parameters: createViewItemStateParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64ViewItemStateParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'viewItemState' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {ViewItemStateParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendViewItemState(contractClient: SponsoredTxEnabledAuctionContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: ViewItemStateParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('viewItemState'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createViewItemStateParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'viewItemState' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {ViewItemStateParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunViewItemState(contractClient: SponsoredTxEnabledAuctionContract, parameter: ViewItemStateParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('viewItemState'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createViewItemStateParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'viewItemState' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type ReturnValueViewItemState = {
    auction_state: { type: 'NotSoldYet'} | { type: 'Sold', content: SDK.AccountAddress.Type },
    highest_bidder: { type: 'None'} | { type: 'Some', content: SDK.AccountAddress.Type },
    name: string,
    end: SDK.Timestamp.Type,
    start: SDK.Timestamp.Type,
    highest_bid: number | bigint,
    token_id: SDK.HexString,
    creator: SDK.AccountAddress.Type,
    };

/**
 * Get and parse the return value from dry-running update transaction for 'viewItemState' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueViewItemState | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueViewItemState(invokeResult: SDK.InvokeContractResult): ReturnValueViewItemState | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{
    auction_state: {'NotSoldYet' : [] } | {'Sold' : [SDK.AccountAddress.SchemaValue] },
    highest_bidder: {'None' : [] } | {'Some' : [SDK.AccountAddress.SchemaValue] },
    name: string,
    end: SDK.Timestamp.SchemaValue,
    start: SDK.Timestamp.SchemaValue,
    highest_bid: string,
    token_id: string,
    creator: SDK.AccountAddress.SchemaValue,
    }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FAAIAAAADQAAAGF1Y3Rpb25fc3RhdGUVAgAAAAoAAABOb3RTb2xkWWV0AgQAAABTb2xkAQEAAAALDgAAAGhpZ2hlc3RfYmlkZGVyFQIAAAAEAAAATm9uZQIEAAAAU29tZQEBAAAACwQAAABuYW1lFgIDAAAAZW5kDQUAAABzdGFydA0LAAAAaGlnaGVzdF9iaWQbJQAAAAgAAAB0b2tlbl9pZB0ABwAAAGNyZWF0b3IL');
    const field125 = schemaJson.auction_state;
    let match126: { type: 'NotSoldYet'} | { type: 'Sold', content: SDK.AccountAddress.Type };
    if ('NotSoldYet' in field125) {
       match126 = {
           type: 'NotSoldYet',
       };
    } else if ('Sold' in field125) {
       const variant128 = field125.Sold;
    const accountAddress129 = SDK.AccountAddress.fromSchemaValue(variant128[0]);
       match126 = {
           type: 'Sold',
           content: accountAddress129,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    const field130 = schemaJson.highest_bidder;
    let match131: { type: 'None'} | { type: 'Some', content: SDK.AccountAddress.Type };
    if ('None' in field130) {
       match131 = {
           type: 'None',
       };
    } else if ('Some' in field130) {
       const variant133 = field130.Some;
    const accountAddress134 = SDK.AccountAddress.fromSchemaValue(variant133[0]);
       match131 = {
           type: 'Some',
           content: accountAddress134,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    const field135 = schemaJson.name;
    const field136 = schemaJson.end;
    const timestamp137 = SDK.Timestamp.fromSchemaValue(field136);
    const field138 = schemaJson.start;
    const timestamp139 = SDK.Timestamp.fromSchemaValue(field138);
    const field140 = schemaJson.highest_bid;
    const leb124 = BigInt(field140);
    const field141 = schemaJson.token_id;
    const field142 = schemaJson.creator;
    const accountAddress143 = SDK.AccountAddress.fromSchemaValue(field142);
    const named144 = {
    auction_state: match126,
    highest_bidder: match131,
    name: field135,
    end: timestamp137,
    start: timestamp139,
    highest_bid: leb124,
    token_id: field141,
    creator: accountAddress143,
    };
    return named144;
}

/** Error message for dry-running update transaction for 'viewItemState' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type ErrorMessageViewItemState = { type: 'ParseParams'} | { type: 'StartEndTimeError'} | { type: 'EndTimeError'} | { type: 'OnlyAccount'} | { type: 'BidNotGreaterCurrentBid'} | { type: 'BidTooLate'} | { type: 'AuctionAlreadyFinalized'} | { type: 'NoItem'} | { type: 'AuctionStillActive'} | { type: 'NotTokenContract'} | { type: 'WrongTokenID'} | { type: 'InvokeContractError'} | { type: 'ParseResult'} | { type: 'InvalidResponse'} | { type: 'AmountTooLarge'} | { type: 'MissingAccount'} | { type: 'MissingContract'} | { type: 'MissingEntrypoint'} | { type: 'MessageFailed'} | { type: 'LogicReject'} | { type: 'Trap'} | { type: 'LogFull'} | { type: 'LogMalformed'};

/**
 * Get and parse the error message from dry-running update transaction for 'viewItemState' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageViewItemState | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageViewItemState(invokeResult: SDK.InvokeContractResult): ErrorMessageViewItemState | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'StartEndTimeError' : [] } | {'EndTimeError' : [] } | {'OnlyAccount' : [] } | {'BidNotGreaterCurrentBid' : [] } | {'BidTooLate' : [] } | {'AuctionAlreadyFinalized' : [] } | {'NoItem' : [] } | {'AuctionStillActive' : [] } | {'NotTokenContract' : [] } | {'WrongTokenID' : [] } | {'InvokeContractError' : [] } | {'ParseResult' : [] } | {'InvalidResponse' : [] } | {'AmountTooLarge' : [] } | {'MissingAccount' : [] } | {'MissingContract' : [] } | {'MissingEntrypoint' : [] } | {'MessageFailed' : [] } | {'LogicReject' : [] } | {'Trap' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FRcAAAALAAAAUGFyc2VQYXJhbXMCEQAAAFN0YXJ0RW5kVGltZUVycm9yAgwAAABFbmRUaW1lRXJyb3ICCwAAAE9ubHlBY2NvdW50AhcAAABCaWROb3RHcmVhdGVyQ3VycmVudEJpZAIKAAAAQmlkVG9vTGF0ZQIXAAAAQXVjdGlvbkFscmVhZHlGaW5hbGl6ZWQCBgAAAE5vSXRlbQISAAAAQXVjdGlvblN0aWxsQWN0aXZlAhAAAABOb3RUb2tlbkNvbnRyYWN0AgwAAABXcm9uZ1Rva2VuSUQCEwAAAEludm9rZUNvbnRyYWN0RXJyb3ICCwAAAFBhcnNlUmVzdWx0Ag8AAABJbnZhbGlkUmVzcG9uc2UCDgAAAEFtb3VudFRvb0xhcmdlAg4AAABNaXNzaW5nQWNjb3VudAIPAAAATWlzc2luZ0NvbnRyYWN0AhEAAABNaXNzaW5nRW50cnlwb2ludAINAAAATWVzc2FnZUZhaWxlZAILAAAATG9naWNSZWplY3QCBAAAAFRyYXACBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAI=');
    let match145: { type: 'ParseParams'} | { type: 'StartEndTimeError'} | { type: 'EndTimeError'} | { type: 'OnlyAccount'} | { type: 'BidNotGreaterCurrentBid'} | { type: 'BidTooLate'} | { type: 'AuctionAlreadyFinalized'} | { type: 'NoItem'} | { type: 'AuctionStillActive'} | { type: 'NotTokenContract'} | { type: 'WrongTokenID'} | { type: 'InvokeContractError'} | { type: 'ParseResult'} | { type: 'InvalidResponse'} | { type: 'AmountTooLarge'} | { type: 'MissingAccount'} | { type: 'MissingContract'} | { type: 'MissingEntrypoint'} | { type: 'MessageFailed'} | { type: 'LogicReject'} | { type: 'Trap'} | { type: 'LogFull'} | { type: 'LogMalformed'};
    if ('ParseParams' in schemaJson) {
       match145 = {
           type: 'ParseParams',
       };
    } else if ('StartEndTimeError' in schemaJson) {
       match145 = {
           type: 'StartEndTimeError',
       };
    } else if ('EndTimeError' in schemaJson) {
       match145 = {
           type: 'EndTimeError',
       };
    } else if ('OnlyAccount' in schemaJson) {
       match145 = {
           type: 'OnlyAccount',
       };
    } else if ('BidNotGreaterCurrentBid' in schemaJson) {
       match145 = {
           type: 'BidNotGreaterCurrentBid',
       };
    } else if ('BidTooLate' in schemaJson) {
       match145 = {
           type: 'BidTooLate',
       };
    } else if ('AuctionAlreadyFinalized' in schemaJson) {
       match145 = {
           type: 'AuctionAlreadyFinalized',
       };
    } else if ('NoItem' in schemaJson) {
       match145 = {
           type: 'NoItem',
       };
    } else if ('AuctionStillActive' in schemaJson) {
       match145 = {
           type: 'AuctionStillActive',
       };
    } else if ('NotTokenContract' in schemaJson) {
       match145 = {
           type: 'NotTokenContract',
       };
    } else if ('WrongTokenID' in schemaJson) {
       match145 = {
           type: 'WrongTokenID',
       };
    } else if ('InvokeContractError' in schemaJson) {
       match145 = {
           type: 'InvokeContractError',
       };
    } else if ('ParseResult' in schemaJson) {
       match145 = {
           type: 'ParseResult',
       };
    } else if ('InvalidResponse' in schemaJson) {
       match145 = {
           type: 'InvalidResponse',
       };
    } else if ('AmountTooLarge' in schemaJson) {
       match145 = {
           type: 'AmountTooLarge',
       };
    } else if ('MissingAccount' in schemaJson) {
       match145 = {
           type: 'MissingAccount',
       };
    } else if ('MissingContract' in schemaJson) {
       match145 = {
           type: 'MissingContract',
       };
    } else if ('MissingEntrypoint' in schemaJson) {
       match145 = {
           type: 'MissingEntrypoint',
       };
    } else if ('MessageFailed' in schemaJson) {
       match145 = {
           type: 'MessageFailed',
       };
    } else if ('LogicReject' in schemaJson) {
       match145 = {
           type: 'LogicReject',
       };
    } else if ('Trap' in schemaJson) {
       match145 = {
           type: 'Trap',
       };
    } else if ('LogFull' in schemaJson) {
       match145 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match145 = {
           type: 'LogMalformed',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match145
}
/** Base64 encoding of the parameter schema type for update transactions to 'serializationHelper' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
const base64SerializationHelperParameterSchema = 'Aw==';
/** Parameter JSON type needed by the schema for update transaction for 'serializationHelper' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
type SerializationHelperParameterSchemaJson = number;
/** Parameter type for update transaction for 'serializationHelper' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type SerializationHelperParameter = number;

/**
 * Construct schema JSON representation used in update transaction for 'serializationHelper' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SerializationHelperParameter} parameter The structured parameter to construct from.
 * @returns {SerializationHelperParameterSchemaJson} The smart contract parameter JSON.
 */
function createSerializationHelperParameterSchemaJson(parameter: SerializationHelperParameter): SerializationHelperParameterSchemaJson {
    return parameter;
}

/**
 * Construct Parameter type used in update transaction for 'serializationHelper' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SerializationHelperParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createSerializationHelperParameter(parameter: SerializationHelperParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64SerializationHelperParameterSchema, createSerializationHelperParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'serializationHelper' entrypoint of the 'sponsored_tx_enabled_auction' contract.
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
 * Send an update-contract transaction to the 'serializationHelper' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SerializationHelperParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendSerializationHelper(contractClient: SponsoredTxEnabledAuctionContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: SerializationHelperParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('serializationHelper'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createSerializationHelperParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'serializationHelper' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SerializationHelperParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunSerializationHelper(contractClient: SponsoredTxEnabledAuctionContract, parameter: SerializationHelperParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('serializationHelper'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createSerializationHelperParameter(parameter),
        blockHash
    );
}
