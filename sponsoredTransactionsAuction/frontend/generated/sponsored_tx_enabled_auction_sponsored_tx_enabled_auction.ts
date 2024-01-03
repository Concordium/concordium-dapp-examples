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
    let match546: { type: 'AddItemEvent', content: {
    item_index: number,
    } };
    if ('AddItemEvent' in schemaJson) {
       const variant547 = schemaJson.AddItemEvent;
    const field548 = variant547.item_index;
    const named549 = {
    item_index: field548,
    };
       match546 = {
           type: 'AddItemEvent',
           content: named549,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match546;
}

/** Parameter type for update transaction for 'addItem' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type AddItemParameter = {
    name: string,
    end: SDK.Timestamp.Type,
    start: SDK.Timestamp.Type,
    minimum_bid: number | bigint,
    token_id: SDK.HexString,
    };

/**
 * Construct Parameter for update transactions for 'addItem' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {AddItemParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createAddItemParameter(parameter: AddItemParameter): SDK.Parameter.Type {
    const field551 = parameter.name;
    const field552 = parameter.end;
    const timestamp553 = SDK.Timestamp.toSchemaValue(field552);
    const field554 = parameter.start;
    const timestamp555 = SDK.Timestamp.toSchemaValue(field554);
    const field556 = parameter.minimum_bid;
    const number557 = BigInt(field556).toString();
    const field558 = parameter.token_id;
    const named550 = {
    name: field551,
    end: timestamp553,
    start: timestamp555,
    minimum_bid: number557,
    token_id: field558,
    };
    const out = SDK.Parameter.fromBase64SchemaType('FAAFAAAABAAAAG5hbWUWAgMAAABlbmQNBQAAAHN0YXJ0DQsAAABtaW5pbXVtX2JpZBslAAAACAAAAHRva2VuX2lkHQA=', named550);
    return out;
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
    let match559: { type: 'ParseParams'} | { type: 'StartEndTimeError'} | { type: 'EndTimeError'} | { type: 'OnlyAccount'} | { type: 'BidNotGreaterCurrentBid'} | { type: 'BidTooLate'} | { type: 'AuctionAlreadyFinalized'} | { type: 'NoItem'} | { type: 'AuctionStillActive'} | { type: 'NotTokenContract'} | { type: 'WrongTokenID'} | { type: 'InvokeContractError'} | { type: 'ParseResult'} | { type: 'InvalidResponse'} | { type: 'AmountTooLarge'} | { type: 'MissingAccount'} | { type: 'MissingContract'} | { type: 'MissingEntrypoint'} | { type: 'MessageFailed'} | { type: 'LogicReject'} | { type: 'Trap'} | { type: 'LogFull'} | { type: 'LogMalformed'};
    if ('ParseParams' in schemaJson) {
       match559 = {
           type: 'ParseParams',
       };
    } else if ('StartEndTimeError' in schemaJson) {
       match559 = {
           type: 'StartEndTimeError',
       };
    } else if ('EndTimeError' in schemaJson) {
       match559 = {
           type: 'EndTimeError',
       };
    } else if ('OnlyAccount' in schemaJson) {
       match559 = {
           type: 'OnlyAccount',
       };
    } else if ('BidNotGreaterCurrentBid' in schemaJson) {
       match559 = {
           type: 'BidNotGreaterCurrentBid',
       };
    } else if ('BidTooLate' in schemaJson) {
       match559 = {
           type: 'BidTooLate',
       };
    } else if ('AuctionAlreadyFinalized' in schemaJson) {
       match559 = {
           type: 'AuctionAlreadyFinalized',
       };
    } else if ('NoItem' in schemaJson) {
       match559 = {
           type: 'NoItem',
       };
    } else if ('AuctionStillActive' in schemaJson) {
       match559 = {
           type: 'AuctionStillActive',
       };
    } else if ('NotTokenContract' in schemaJson) {
       match559 = {
           type: 'NotTokenContract',
       };
    } else if ('WrongTokenID' in schemaJson) {
       match559 = {
           type: 'WrongTokenID',
       };
    } else if ('InvokeContractError' in schemaJson) {
       match559 = {
           type: 'InvokeContractError',
       };
    } else if ('ParseResult' in schemaJson) {
       match559 = {
           type: 'ParseResult',
       };
    } else if ('InvalidResponse' in schemaJson) {
       match559 = {
           type: 'InvalidResponse',
       };
    } else if ('AmountTooLarge' in schemaJson) {
       match559 = {
           type: 'AmountTooLarge',
       };
    } else if ('MissingAccount' in schemaJson) {
       match559 = {
           type: 'MissingAccount',
       };
    } else if ('MissingContract' in schemaJson) {
       match559 = {
           type: 'MissingContract',
       };
    } else if ('MissingEntrypoint' in schemaJson) {
       match559 = {
           type: 'MissingEntrypoint',
       };
    } else if ('MessageFailed' in schemaJson) {
       match559 = {
           type: 'MessageFailed',
       };
    } else if ('LogicReject' in schemaJson) {
       match559 = {
           type: 'LogicReject',
       };
    } else if ('Trap' in schemaJson) {
       match559 = {
           type: 'Trap',
       };
    } else if ('LogFull' in schemaJson) {
       match559 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match559 = {
           type: 'LogMalformed',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match559
}

/** Parameter type for update transaction for 'bid' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type BidParameter = {
    token_id: SDK.HexString,
    amount: number | bigint,
    from: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    data: number,
    };

/**
 * Construct Parameter for update transactions for 'bid' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {BidParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createBidParameter(parameter: BidParameter): SDK.Parameter.Type {
    const field584 = parameter.token_id;
    const field585 = parameter.amount;
    const number586 = BigInt(field585).toString();
    const field587 = parameter.from;
    let match588: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field587.type) {
        case 'Account':
    const accountAddress589 = SDK.AccountAddress.toSchemaValue(field587.content);
            match588 = { Account: [accountAddress589], };
        break;
        case 'Contract':
    const contractAddress590 = SDK.ContractAddress.toSchemaValue(field587.content);
            match588 = { Contract: [contractAddress590], };
        break;
    }
    const field591 = parameter.data;
    const named583 = {
    token_id: field584,
    amount: number586,
    from: match588,
    data: field591,
    };
    const out = SDK.Parameter.fromBase64SchemaType('FAAEAAAACAAAAHRva2VuX2lkHQAGAAAAYW1vdW50GyUAAAAEAAAAZnJvbRUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwEAAAAZGF0YQM=', named583);
    return out;
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
    let match592: { type: 'ParseParams'} | { type: 'StartEndTimeError'} | { type: 'EndTimeError'} | { type: 'OnlyAccount'} | { type: 'BidNotGreaterCurrentBid'} | { type: 'BidTooLate'} | { type: 'AuctionAlreadyFinalized'} | { type: 'NoItem'} | { type: 'AuctionStillActive'} | { type: 'NotTokenContract'} | { type: 'WrongTokenID'} | { type: 'InvokeContractError'} | { type: 'ParseResult'} | { type: 'InvalidResponse'} | { type: 'AmountTooLarge'} | { type: 'MissingAccount'} | { type: 'MissingContract'} | { type: 'MissingEntrypoint'} | { type: 'MessageFailed'} | { type: 'LogicReject'} | { type: 'Trap'} | { type: 'LogFull'} | { type: 'LogMalformed'};
    if ('ParseParams' in schemaJson) {
       match592 = {
           type: 'ParseParams',
       };
    } else if ('StartEndTimeError' in schemaJson) {
       match592 = {
           type: 'StartEndTimeError',
       };
    } else if ('EndTimeError' in schemaJson) {
       match592 = {
           type: 'EndTimeError',
       };
    } else if ('OnlyAccount' in schemaJson) {
       match592 = {
           type: 'OnlyAccount',
       };
    } else if ('BidNotGreaterCurrentBid' in schemaJson) {
       match592 = {
           type: 'BidNotGreaterCurrentBid',
       };
    } else if ('BidTooLate' in schemaJson) {
       match592 = {
           type: 'BidTooLate',
       };
    } else if ('AuctionAlreadyFinalized' in schemaJson) {
       match592 = {
           type: 'AuctionAlreadyFinalized',
       };
    } else if ('NoItem' in schemaJson) {
       match592 = {
           type: 'NoItem',
       };
    } else if ('AuctionStillActive' in schemaJson) {
       match592 = {
           type: 'AuctionStillActive',
       };
    } else if ('NotTokenContract' in schemaJson) {
       match592 = {
           type: 'NotTokenContract',
       };
    } else if ('WrongTokenID' in schemaJson) {
       match592 = {
           type: 'WrongTokenID',
       };
    } else if ('InvokeContractError' in schemaJson) {
       match592 = {
           type: 'InvokeContractError',
       };
    } else if ('ParseResult' in schemaJson) {
       match592 = {
           type: 'ParseResult',
       };
    } else if ('InvalidResponse' in schemaJson) {
       match592 = {
           type: 'InvalidResponse',
       };
    } else if ('AmountTooLarge' in schemaJson) {
       match592 = {
           type: 'AmountTooLarge',
       };
    } else if ('MissingAccount' in schemaJson) {
       match592 = {
           type: 'MissingAccount',
       };
    } else if ('MissingContract' in schemaJson) {
       match592 = {
           type: 'MissingContract',
       };
    } else if ('MissingEntrypoint' in schemaJson) {
       match592 = {
           type: 'MissingEntrypoint',
       };
    } else if ('MessageFailed' in schemaJson) {
       match592 = {
           type: 'MessageFailed',
       };
    } else if ('LogicReject' in schemaJson) {
       match592 = {
           type: 'LogicReject',
       };
    } else if ('Trap' in schemaJson) {
       match592 = {
           type: 'Trap',
       };
    } else if ('LogFull' in schemaJson) {
       match592 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match592 = {
           type: 'LogMalformed',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match592
}

/** Parameter type for update transaction for 'finalize' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type FinalizeParameter = number;

/**
 * Construct Parameter for update transactions for 'finalize' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {FinalizeParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createFinalizeParameter(parameter: FinalizeParameter): SDK.Parameter.Type {
    const out = SDK.Parameter.fromBase64SchemaType('Aw==', parameter);
    return out;
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
    let match616: { type: 'ParseParams'} | { type: 'StartEndTimeError'} | { type: 'EndTimeError'} | { type: 'OnlyAccount'} | { type: 'BidNotGreaterCurrentBid'} | { type: 'BidTooLate'} | { type: 'AuctionAlreadyFinalized'} | { type: 'NoItem'} | { type: 'AuctionStillActive'} | { type: 'NotTokenContract'} | { type: 'WrongTokenID'} | { type: 'InvokeContractError'} | { type: 'ParseResult'} | { type: 'InvalidResponse'} | { type: 'AmountTooLarge'} | { type: 'MissingAccount'} | { type: 'MissingContract'} | { type: 'MissingEntrypoint'} | { type: 'MessageFailed'} | { type: 'LogicReject'} | { type: 'Trap'} | { type: 'LogFull'} | { type: 'LogMalformed'};
    if ('ParseParams' in schemaJson) {
       match616 = {
           type: 'ParseParams',
       };
    } else if ('StartEndTimeError' in schemaJson) {
       match616 = {
           type: 'StartEndTimeError',
       };
    } else if ('EndTimeError' in schemaJson) {
       match616 = {
           type: 'EndTimeError',
       };
    } else if ('OnlyAccount' in schemaJson) {
       match616 = {
           type: 'OnlyAccount',
       };
    } else if ('BidNotGreaterCurrentBid' in schemaJson) {
       match616 = {
           type: 'BidNotGreaterCurrentBid',
       };
    } else if ('BidTooLate' in schemaJson) {
       match616 = {
           type: 'BidTooLate',
       };
    } else if ('AuctionAlreadyFinalized' in schemaJson) {
       match616 = {
           type: 'AuctionAlreadyFinalized',
       };
    } else if ('NoItem' in schemaJson) {
       match616 = {
           type: 'NoItem',
       };
    } else if ('AuctionStillActive' in schemaJson) {
       match616 = {
           type: 'AuctionStillActive',
       };
    } else if ('NotTokenContract' in schemaJson) {
       match616 = {
           type: 'NotTokenContract',
       };
    } else if ('WrongTokenID' in schemaJson) {
       match616 = {
           type: 'WrongTokenID',
       };
    } else if ('InvokeContractError' in schemaJson) {
       match616 = {
           type: 'InvokeContractError',
       };
    } else if ('ParseResult' in schemaJson) {
       match616 = {
           type: 'ParseResult',
       };
    } else if ('InvalidResponse' in schemaJson) {
       match616 = {
           type: 'InvalidResponse',
       };
    } else if ('AmountTooLarge' in schemaJson) {
       match616 = {
           type: 'AmountTooLarge',
       };
    } else if ('MissingAccount' in schemaJson) {
       match616 = {
           type: 'MissingAccount',
       };
    } else if ('MissingContract' in schemaJson) {
       match616 = {
           type: 'MissingContract',
       };
    } else if ('MissingEntrypoint' in schemaJson) {
       match616 = {
           type: 'MissingEntrypoint',
       };
    } else if ('MessageFailed' in schemaJson) {
       match616 = {
           type: 'MessageFailed',
       };
    } else if ('LogicReject' in schemaJson) {
       match616 = {
           type: 'LogicReject',
       };
    } else if ('Trap' in schemaJson) {
       match616 = {
           type: 'Trap',
       };
    } else if ('LogFull' in schemaJson) {
       match616 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match616 = {
           type: 'LogMalformed',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match616
}

/** Parameter type for update transaction for 'view' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type ViewParameter = SDK.Parameter.Type;

/**
 * Construct Parameter for update transactions for 'view' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {ViewParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createViewParameter(parameter: ViewParameter): SDK.Parameter.Type {
    return parameter;
}

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
        createViewParameter(parameter),
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
        createViewParameter(parameter),
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
    highest_bid: bigint,
    token_id: string,
    creator: SDK.AccountAddress.SchemaValue,
    }]>,
    cis2_contract: SDK.ContractAddress.SchemaValue,
    counter: number,
    }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FAADAAAACwAAAGl0ZW1fc3RhdGVzEAIPAxQACAAAAA0AAABhdWN0aW9uX3N0YXRlFQIAAAAKAAAATm90U29sZFlldAIEAAAAU29sZAEBAAAACw4AAABoaWdoZXN0X2JpZGRlchUCAAAABAAAAE5vbmUCBAAAAFNvbWUBAQAAAAsEAAAAbmFtZRYCAwAAAGVuZA0FAAAAc3RhcnQNCwAAAGhpZ2hlc3RfYmlkGyUAAAAIAAAAdG9rZW5faWQdAAcAAABjcmVhdG9yCw0AAABjaXMyX2NvbnRyYWN0DAcAAABjb3VudGVyAw==');
    const field640 = schemaJson.item_states;
    const list641 = field640.map((item642) => {
    const field644 = item642[1].auction_state;
    let match645: { type: 'NotSoldYet'} | { type: 'Sold', content: SDK.AccountAddress.Type };
    if ('NotSoldYet' in field644) {
       match645 = {
           type: 'NotSoldYet',
       };
    } else if ('Sold' in field644) {
       const variant647 = field644.Sold;
    const accountAddress648 = SDK.AccountAddress.fromSchemaValue(variant647[0]);
       match645 = {
           type: 'Sold',
           content: accountAddress648,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field649 = item642[1].highest_bidder;
    let match650: { type: 'None'} | { type: 'Some', content: SDK.AccountAddress.Type };
    if ('None' in field649) {
       match650 = {
           type: 'None',
       };
    } else if ('Some' in field649) {
       const variant652 = field649.Some;
    const accountAddress653 = SDK.AccountAddress.fromSchemaValue(variant652[0]);
       match650 = {
           type: 'Some',
           content: accountAddress653,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field654 = item642[1].name;
    const field655 = item642[1].end;
    const timestamp656 = SDK.Timestamp.fromSchemaValue(field655);
    const field657 = item642[1].start;
    const timestamp658 = SDK.Timestamp.fromSchemaValue(field657);
    const field659 = item642[1].highest_bid;
    const field660 = item642[1].token_id;
    const field661 = item642[1].creator;
    const accountAddress662 = SDK.AccountAddress.fromSchemaValue(field661);
    const named663 = {
    auction_state: match645,
    highest_bidder: match650,
    name: field654,
    end: timestamp656,
    start: timestamp658,
    highest_bid: BigInt(field659),
    token_id: field660,
    creator: accountAddress662,
    };
    const pair643: [number, {
    auction_state: { type: 'NotSoldYet'} | { type: 'Sold', content: SDK.AccountAddress.Type },
    highest_bidder: { type: 'None'} | { type: 'Some', content: SDK.AccountAddress.Type },
    name: string,
    end: SDK.Timestamp.Type,
    start: SDK.Timestamp.Type,
    highest_bid: number | bigint,
    token_id: SDK.HexString,
    creator: SDK.AccountAddress.Type,
    }] = [item642[0], named663];
    return pair643;
    });
    const field664 = schemaJson.cis2_contract;
    const contractAddress665 = SDK.ContractAddress.fromSchemaValue(field664);
    const field666 = schemaJson.counter;
    const named667 = {
    item_states: list641,
    cis2_contract: contractAddress665,
    counter: field666,
    };
    return named667;
}

/** Parameter type for update transaction for 'viewItemState' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type ViewItemStateParameter = number;

/**
 * Construct Parameter for update transactions for 'viewItemState' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {ViewItemStateParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createViewItemStateParameter(parameter: ViewItemStateParameter): SDK.Parameter.Type {
    const out = SDK.Parameter.fromBase64SchemaType('Aw==', parameter);
    return out;
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
    highest_bid: bigint,
    token_id: string,
    creator: SDK.AccountAddress.SchemaValue,
    }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FAAIAAAADQAAAGF1Y3Rpb25fc3RhdGUVAgAAAAoAAABOb3RTb2xkWWV0AgQAAABTb2xkAQEAAAALDgAAAGhpZ2hlc3RfYmlkZGVyFQIAAAAEAAAATm9uZQIEAAAAU29tZQEBAAAACwQAAABuYW1lFgIDAAAAZW5kDQUAAABzdGFydA0LAAAAaGlnaGVzdF9iaWQbJQAAAAgAAAB0b2tlbl9pZB0ABwAAAGNyZWF0b3IL');
    const field668 = schemaJson.auction_state;
    let match669: { type: 'NotSoldYet'} | { type: 'Sold', content: SDK.AccountAddress.Type };
    if ('NotSoldYet' in field668) {
       match669 = {
           type: 'NotSoldYet',
       };
    } else if ('Sold' in field668) {
       const variant671 = field668.Sold;
    const accountAddress672 = SDK.AccountAddress.fromSchemaValue(variant671[0]);
       match669 = {
           type: 'Sold',
           content: accountAddress672,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field673 = schemaJson.highest_bidder;
    let match674: { type: 'None'} | { type: 'Some', content: SDK.AccountAddress.Type };
    if ('None' in field673) {
       match674 = {
           type: 'None',
       };
    } else if ('Some' in field673) {
       const variant676 = field673.Some;
    const accountAddress677 = SDK.AccountAddress.fromSchemaValue(variant676[0]);
       match674 = {
           type: 'Some',
           content: accountAddress677,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field678 = schemaJson.name;
    const field679 = schemaJson.end;
    const timestamp680 = SDK.Timestamp.fromSchemaValue(field679);
    const field681 = schemaJson.start;
    const timestamp682 = SDK.Timestamp.fromSchemaValue(field681);
    const field683 = schemaJson.highest_bid;
    const field684 = schemaJson.token_id;
    const field685 = schemaJson.creator;
    const accountAddress686 = SDK.AccountAddress.fromSchemaValue(field685);
    const named687 = {
    auction_state: match669,
    highest_bidder: match674,
    name: field678,
    end: timestamp680,
    start: timestamp682,
    highest_bid: BigInt(field683),
    token_id: field684,
    creator: accountAddress686,
    };
    return named687;
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
    let match688: { type: 'ParseParams'} | { type: 'StartEndTimeError'} | { type: 'EndTimeError'} | { type: 'OnlyAccount'} | { type: 'BidNotGreaterCurrentBid'} | { type: 'BidTooLate'} | { type: 'AuctionAlreadyFinalized'} | { type: 'NoItem'} | { type: 'AuctionStillActive'} | { type: 'NotTokenContract'} | { type: 'WrongTokenID'} | { type: 'InvokeContractError'} | { type: 'ParseResult'} | { type: 'InvalidResponse'} | { type: 'AmountTooLarge'} | { type: 'MissingAccount'} | { type: 'MissingContract'} | { type: 'MissingEntrypoint'} | { type: 'MessageFailed'} | { type: 'LogicReject'} | { type: 'Trap'} | { type: 'LogFull'} | { type: 'LogMalformed'};
    if ('ParseParams' in schemaJson) {
       match688 = {
           type: 'ParseParams',
       };
    } else if ('StartEndTimeError' in schemaJson) {
       match688 = {
           type: 'StartEndTimeError',
       };
    } else if ('EndTimeError' in schemaJson) {
       match688 = {
           type: 'EndTimeError',
       };
    } else if ('OnlyAccount' in schemaJson) {
       match688 = {
           type: 'OnlyAccount',
       };
    } else if ('BidNotGreaterCurrentBid' in schemaJson) {
       match688 = {
           type: 'BidNotGreaterCurrentBid',
       };
    } else if ('BidTooLate' in schemaJson) {
       match688 = {
           type: 'BidTooLate',
       };
    } else if ('AuctionAlreadyFinalized' in schemaJson) {
       match688 = {
           type: 'AuctionAlreadyFinalized',
       };
    } else if ('NoItem' in schemaJson) {
       match688 = {
           type: 'NoItem',
       };
    } else if ('AuctionStillActive' in schemaJson) {
       match688 = {
           type: 'AuctionStillActive',
       };
    } else if ('NotTokenContract' in schemaJson) {
       match688 = {
           type: 'NotTokenContract',
       };
    } else if ('WrongTokenID' in schemaJson) {
       match688 = {
           type: 'WrongTokenID',
       };
    } else if ('InvokeContractError' in schemaJson) {
       match688 = {
           type: 'InvokeContractError',
       };
    } else if ('ParseResult' in schemaJson) {
       match688 = {
           type: 'ParseResult',
       };
    } else if ('InvalidResponse' in schemaJson) {
       match688 = {
           type: 'InvalidResponse',
       };
    } else if ('AmountTooLarge' in schemaJson) {
       match688 = {
           type: 'AmountTooLarge',
       };
    } else if ('MissingAccount' in schemaJson) {
       match688 = {
           type: 'MissingAccount',
       };
    } else if ('MissingContract' in schemaJson) {
       match688 = {
           type: 'MissingContract',
       };
    } else if ('MissingEntrypoint' in schemaJson) {
       match688 = {
           type: 'MissingEntrypoint',
       };
    } else if ('MessageFailed' in schemaJson) {
       match688 = {
           type: 'MessageFailed',
       };
    } else if ('LogicReject' in schemaJson) {
       match688 = {
           type: 'LogicReject',
       };
    } else if ('Trap' in schemaJson) {
       match688 = {
           type: 'Trap',
       };
    } else if ('LogFull' in schemaJson) {
       match688 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match688 = {
           type: 'LogMalformed',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match688
}

/** Parameter type for update transaction for 'serializationHelper' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type SerializationHelperParameter = number;

/**
 * Construct Parameter for update transactions for 'serializationHelper' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SerializationHelperParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createSerializationHelperParameter(parameter: SerializationHelperParameter): SDK.Parameter.Type {
    const out = SDK.Parameter.fromBase64SchemaType('Aw==', parameter);
    return out;
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
