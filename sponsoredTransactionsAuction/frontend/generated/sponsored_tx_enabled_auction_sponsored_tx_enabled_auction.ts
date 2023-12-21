import * as SDK from "@concordium/web-sdk";

/** The reference of the smart contract module supported by the provided client. */
export const moduleReference: SDK.ModuleReference.Type = /*#__PURE__*/ SDK.ModuleReference.fromHexString('782da60d4aaec2272dfb5a8e6d2c96f380b3722563ea4605912254103f5473bf');
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
    const field6 = parameter.name;
    const field7 = parameter.end;
    const timestamp8 = SDK.Timestamp.toSchemaValue(field7);
    const field9 = parameter.start;
    const timestamp10 = SDK.Timestamp.toSchemaValue(field9);
    const field11 = parameter.minimum_bid;
    const number12 = BigInt(field11).toString();
    const field13 = parameter.token_id;
    const named5 = {
    name: field6,
    end: timestamp8,
    start: timestamp10,
    minimum_bid: number12,
    token_id: field13,
    };
    const out = SDK.Parameter.fromBase64SchemaType('FAAFAAAABAAAAG5hbWUWAgMAAABlbmQNBQAAAHN0YXJ0DQsAAABtaW5pbXVtX2JpZBslAAAACAAAAHRva2VuX2lkHQA=', named5);
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
    const field15 = parameter.token_id;
    const field16 = parameter.amount;
    const number17 = BigInt(field16).toString();
    const field18 = parameter.from;
    let match19: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field18.type) {
        case 'Account':
    const accountAddress20 = SDK.AccountAddress.toSchemaValue(field18.content);
            match19 = { Account: [accountAddress20], };
        break;
        case 'Contract':
    const contractAddress21 = SDK.ContractAddress.toSchemaValue(field18.content);
            match19 = { Contract: [contractAddress21], };
        break;
    }
    const field22 = parameter.data;
    const named14 = {
    token_id: field15,
    amount: number17,
    from: match19,
    data: field22,
    };
    const out = SDK.Parameter.fromBase64SchemaType('FAAEAAAACAAAAHRva2VuX2lkHQAGAAAAYW1vdW50GyUAAAAEAAAAZnJvbRUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwEAAAAZGF0YQM=', named14);
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
    let match23: { type: 'ParseParams'} | { type: 'StartEndTimeError'} | { type: 'EndTimeError'} | { type: 'OnlyAccount'} | { type: 'BidNotGreaterCurrentBid'} | { type: 'BidTooLate'} | { type: 'AuctionAlreadyFinalized'} | { type: 'NoItem'} | { type: 'AuctionStillActive'} | { type: 'NotTokenContract'} | { type: 'WrongTokenID'} | { type: 'InvokeContractError'} | { type: 'ParseResult'} | { type: 'InvalidResponse'} | { type: 'AmountTooLarge'} | { type: 'MissingAccount'} | { type: 'MissingContract'} | { type: 'MissingEntrypoint'} | { type: 'MessageFailed'} | { type: 'LogicReject'} | { type: 'Trap'} | { type: 'LogFull'} | { type: 'LogMalformed'};
    if ('ParseParams' in schemaJson) {
       match23 = {
           type: 'ParseParams',
       };
    } else if ('StartEndTimeError' in schemaJson) {
       match23 = {
           type: 'StartEndTimeError',
       };
    } else if ('EndTimeError' in schemaJson) {
       match23 = {
           type: 'EndTimeError',
       };
    } else if ('OnlyAccount' in schemaJson) {
       match23 = {
           type: 'OnlyAccount',
       };
    } else if ('BidNotGreaterCurrentBid' in schemaJson) {
       match23 = {
           type: 'BidNotGreaterCurrentBid',
       };
    } else if ('BidTooLate' in schemaJson) {
       match23 = {
           type: 'BidTooLate',
       };
    } else if ('AuctionAlreadyFinalized' in schemaJson) {
       match23 = {
           type: 'AuctionAlreadyFinalized',
       };
    } else if ('NoItem' in schemaJson) {
       match23 = {
           type: 'NoItem',
       };
    } else if ('AuctionStillActive' in schemaJson) {
       match23 = {
           type: 'AuctionStillActive',
       };
    } else if ('NotTokenContract' in schemaJson) {
       match23 = {
           type: 'NotTokenContract',
       };
    } else if ('WrongTokenID' in schemaJson) {
       match23 = {
           type: 'WrongTokenID',
       };
    } else if ('InvokeContractError' in schemaJson) {
       match23 = {
           type: 'InvokeContractError',
       };
    } else if ('ParseResult' in schemaJson) {
       match23 = {
           type: 'ParseResult',
       };
    } else if ('InvalidResponse' in schemaJson) {
       match23 = {
           type: 'InvalidResponse',
       };
    } else if ('AmountTooLarge' in schemaJson) {
       match23 = {
           type: 'AmountTooLarge',
       };
    } else if ('MissingAccount' in schemaJson) {
       match23 = {
           type: 'MissingAccount',
       };
    } else if ('MissingContract' in schemaJson) {
       match23 = {
           type: 'MissingContract',
       };
    } else if ('MissingEntrypoint' in schemaJson) {
       match23 = {
           type: 'MissingEntrypoint',
       };
    } else if ('MessageFailed' in schemaJson) {
       match23 = {
           type: 'MessageFailed',
       };
    } else if ('LogicReject' in schemaJson) {
       match23 = {
           type: 'LogicReject',
       };
    } else if ('Trap' in schemaJson) {
       match23 = {
           type: 'Trap',
       };
    } else if ('LogFull' in schemaJson) {
       match23 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match23 = {
           type: 'LogMalformed',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match23
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
    const field71 = schemaJson.item_states;
    const list72 = field71.map((item73) => {
    const field75 = item73[1].auction_state;
    let match76: { type: 'NotSoldYet'} | { type: 'Sold', content: SDK.AccountAddress.Type };
    if ('NotSoldYet' in field75) {
       match76 = {
           type: 'NotSoldYet',
       };
    } else if ('Sold' in field75) {
       const variant78 = field75.Sold;
    const accountAddress79 = SDK.AccountAddress.fromSchemaValue(variant78[0]);
       match76 = {
           type: 'Sold',
           content: accountAddress79,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field80 = item73[1].highest_bidder;
    let match81: { type: 'None'} | { type: 'Some', content: SDK.AccountAddress.Type };
    if ('None' in field80) {
       match81 = {
           type: 'None',
       };
    } else if ('Some' in field80) {
       const variant83 = field80.Some;
    const accountAddress84 = SDK.AccountAddress.fromSchemaValue(variant83[0]);
       match81 = {
           type: 'Some',
           content: accountAddress84,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field85 = item73[1].name;
    const field86 = item73[1].end;
    const timestamp87 = SDK.Timestamp.fromSchemaValue(field86);
    const field88 = item73[1].start;
    const timestamp89 = SDK.Timestamp.fromSchemaValue(field88);
    const field90 = item73[1].highest_bid;
    const field91 = item73[1].token_id;
    const field92 = item73[1].creator;
    const accountAddress93 = SDK.AccountAddress.fromSchemaValue(field92);
    const named94 = {
    auction_state: match76,
    highest_bidder: match81,
    name: field85,
    end: timestamp87,
    start: timestamp89,
    highest_bid: BigInt(field90),
    token_id: field91,
    creator: accountAddress93,
    };
    const pair74: [number, {
    auction_state: { type: 'NotSoldYet'} | { type: 'Sold', content: SDK.AccountAddress.Type },
    highest_bidder: { type: 'None'} | { type: 'Some', content: SDK.AccountAddress.Type },
    name: string,
    end: SDK.Timestamp.Type,
    start: SDK.Timestamp.Type,
    highest_bid: number | bigint,
    token_id: SDK.HexString,
    creator: SDK.AccountAddress.Type,
    }] = [item73[0], named94];
    return pair74;
    });
    const field95 = schemaJson.cis2_contract;
    const contractAddress96 = SDK.ContractAddress.fromSchemaValue(field95);
    const field97 = schemaJson.counter;
    const named98 = {
    item_states: list72,
    cis2_contract: contractAddress96,
    counter: field97,
    };
    return named98;
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
    const field99 = schemaJson.auction_state;
    let match100: { type: 'NotSoldYet'} | { type: 'Sold', content: SDK.AccountAddress.Type };
    if ('NotSoldYet' in field99) {
       match100 = {
           type: 'NotSoldYet',
       };
    } else if ('Sold' in field99) {
       const variant102 = field99.Sold;
    const accountAddress103 = SDK.AccountAddress.fromSchemaValue(variant102[0]);
       match100 = {
           type: 'Sold',
           content: accountAddress103,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field104 = schemaJson.highest_bidder;
    let match105: { type: 'None'} | { type: 'Some', content: SDK.AccountAddress.Type };
    if ('None' in field104) {
       match105 = {
           type: 'None',
       };
    } else if ('Some' in field104) {
       const variant107 = field104.Some;
    const accountAddress108 = SDK.AccountAddress.fromSchemaValue(variant107[0]);
       match105 = {
           type: 'Some',
           content: accountAddress108,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field109 = schemaJson.name;
    const field110 = schemaJson.end;
    const timestamp111 = SDK.Timestamp.fromSchemaValue(field110);
    const field112 = schemaJson.start;
    const timestamp113 = SDK.Timestamp.fromSchemaValue(field112);
    const field114 = schemaJson.highest_bid;
    const field115 = schemaJson.token_id;
    const field116 = schemaJson.creator;
    const accountAddress117 = SDK.AccountAddress.fromSchemaValue(field116);
    const named118 = {
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
