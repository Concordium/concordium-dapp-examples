import * as SDK from "@concordium/web-sdk";
/** The reference of the smart contract module supported by the provided client. */
export declare const moduleReference: SDK.ModuleReference.Type;
/** Name of the smart contract supported by this client. */
export declare const contractName: SDK.ContractName.Type;
/** Smart contract client for a contract instance on chain. */
declare class SponsoredTxEnabledAuctionContract {
    /** Having a private field prevents similar structured objects to be considered the same type (similar to nominal typing). */
    private __nominal;
    /** The gRPC connection used by this client. */
    readonly grpcClient: SDK.ConcordiumGRPCClient;
    /** The contract address used by this client. */
    readonly contractAddress: SDK.ContractAddress.Type;
    /** Generic contract client used internally. */
    readonly genericContract: SDK.Contract;
    constructor(grpcClient: SDK.ConcordiumGRPCClient, contractAddress: SDK.ContractAddress.Type, genericContract: SDK.Contract);
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
export declare function create(grpcClient: SDK.ConcordiumGRPCClient, contractAddress: SDK.ContractAddress.Type, blockHash?: SDK.BlockHash.Type): Promise<SponsoredTxEnabledAuctionContract>;
/**
 * Construct the `SponsoredTxEnabledAuctionContract` for interacting with a 'sponsored_tx_enabled_auction' contract on chain.
 * Without checking the instance information on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @returns {SponsoredTxEnabledAuctionContract}
 */
export declare function createUnchecked(grpcClient: SDK.ConcordiumGRPCClient, contractAddress: SDK.ContractAddress.Type): SponsoredTxEnabledAuctionContract;
/**
 * Check if the smart contract instance exists on the blockchain and whether it uses a matching contract name and module reference.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.BlockHash.Type} [blockHash] A optional block hash to use for checking information on chain, if not provided the last finalized will be used.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 */
export declare function checkOnChain(contractClient: SponsoredTxEnabledAuctionContract, blockHash?: SDK.BlockHash.Type): Promise<void>;
/** Contract event type for the 'sponsored_tx_enabled_auction' contract. */
export type Event = {
    type: 'AddItemEvent';
    content: {
        item_index: number;
    };
};
/**
 * Parse the contract events logged by the 'sponsored_tx_enabled_auction' contract.
 * @param {SDK.ContractEvent.Type} event The unparsed contract event.
 * @returns {Event} The structured contract event.
 */
export declare function parseEvent(event: SDK.ContractEvent.Type): Event;
/** Parameter type for update transaction for 'addItem' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type AddItemParameter = {
    name: string;
    end: SDK.Timestamp.Type;
    start: SDK.Timestamp.Type;
    minimum_bid: number | bigint;
    token_id: SDK.HexString;
};
/**
 * Construct Parameter for update transactions for 'addItem' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {AddItemParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createAddItemParameter(parameter: AddItemParameter): SDK.Parameter.Type;
/**
 * Send an update-contract transaction to the 'addItem' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {AddItemParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendAddItem(contractClient: SponsoredTxEnabledAuctionContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: AddItemParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'addItem' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {AddItemParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunAddItem(contractClient: SponsoredTxEnabledAuctionContract, parameter: AddItemParameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
/** Parameter type for update transaction for 'bid' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type BidParameter = {
    token_id: SDK.HexString;
    amount: number | bigint;
    from: {
        type: 'Account';
        content: SDK.AccountAddress.Type;
    } | {
        type: 'Contract';
        content: SDK.ContractAddress.Type;
    };
    data: number;
};
/**
 * Construct Parameter for update transactions for 'bid' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {BidParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createBidParameter(parameter: BidParameter): SDK.Parameter.Type;
/**
 * Send an update-contract transaction to the 'bid' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {BidParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendBid(contractClient: SponsoredTxEnabledAuctionContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: BidParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'bid' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {BidParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunBid(contractClient: SponsoredTxEnabledAuctionContract, parameter: BidParameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
/** Error message for dry-running update transaction for 'bid' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type ErrorMessageBid = {
    type: 'ParseParams';
} | {
    type: 'StartEndTimeError';
} | {
    type: 'EndTimeError';
} | {
    type: 'OnlyAccount';
} | {
    type: 'BidNotGreaterCurrentBid';
} | {
    type: 'BidTooLate';
} | {
    type: 'AuctionAlreadyFinalized';
} | {
    type: 'NoItem';
} | {
    type: 'AuctionStillActive';
} | {
    type: 'NotTokenContract';
} | {
    type: 'WrongTokenID';
} | {
    type: 'InvokeContractError';
} | {
    type: 'ParseResult';
} | {
    type: 'InvalidResponse';
} | {
    type: 'AmountTooLarge';
} | {
    type: 'MissingAccount';
} | {
    type: 'MissingContract';
} | {
    type: 'MissingEntrypoint';
} | {
    type: 'MessageFailed';
} | {
    type: 'LogicReject';
} | {
    type: 'Trap';
} | {
    type: 'LogFull';
} | {
    type: 'LogMalformed';
};
/**
 * Get and parse the error message from dry-running update transaction for 'bid' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageBid | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export declare function parseErrorMessageBid(invokeResult: SDK.InvokeContractResult): ErrorMessageBid | undefined;
/** Parameter type for update transaction for 'finalize' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type FinalizeParameter = number;
/**
 * Construct Parameter for update transactions for 'finalize' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {FinalizeParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createFinalizeParameter(parameter: FinalizeParameter): SDK.Parameter.Type;
/**
 * Send an update-contract transaction to the 'finalize' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {FinalizeParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendFinalize(contractClient: SponsoredTxEnabledAuctionContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: FinalizeParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'finalize' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {FinalizeParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunFinalize(contractClient: SponsoredTxEnabledAuctionContract, parameter: FinalizeParameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
/** Error message for dry-running update transaction for 'finalize' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type ErrorMessageFinalize = {
    type: 'ParseParams';
} | {
    type: 'StartEndTimeError';
} | {
    type: 'EndTimeError';
} | {
    type: 'OnlyAccount';
} | {
    type: 'BidNotGreaterCurrentBid';
} | {
    type: 'BidTooLate';
} | {
    type: 'AuctionAlreadyFinalized';
} | {
    type: 'NoItem';
} | {
    type: 'AuctionStillActive';
} | {
    type: 'NotTokenContract';
} | {
    type: 'WrongTokenID';
} | {
    type: 'InvokeContractError';
} | {
    type: 'ParseResult';
} | {
    type: 'InvalidResponse';
} | {
    type: 'AmountTooLarge';
} | {
    type: 'MissingAccount';
} | {
    type: 'MissingContract';
} | {
    type: 'MissingEntrypoint';
} | {
    type: 'MessageFailed';
} | {
    type: 'LogicReject';
} | {
    type: 'Trap';
} | {
    type: 'LogFull';
} | {
    type: 'LogMalformed';
};
/**
 * Get and parse the error message from dry-running update transaction for 'finalize' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageFinalize | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export declare function parseErrorMessageFinalize(invokeResult: SDK.InvokeContractResult): ErrorMessageFinalize | undefined;
/** Parameter type for update transaction for 'view' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type ViewParameter = SDK.Parameter.Type;
/**
 * Construct Parameter for update transactions for 'view' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {ViewParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createViewParameter(parameter: ViewParameter): SDK.Parameter.Type;
/**
 * Send an update-contract transaction to the 'view' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {ViewParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendView(contractClient: SponsoredTxEnabledAuctionContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: ViewParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'view' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {ViewParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunView(contractClient: SponsoredTxEnabledAuctionContract, parameter: ViewParameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
/** Return value for dry-running update transaction for 'view' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type ReturnValueView = {
    item_states: Array<[
        number,
        {
            auction_state: {
                type: 'NotSoldYet';
            } | {
                type: 'Sold';
                content: SDK.AccountAddress.Type;
            };
            highest_bidder: {
                type: 'None';
            } | {
                type: 'Some';
                content: SDK.AccountAddress.Type;
            };
            name: string;
            end: SDK.Timestamp.Type;
            start: SDK.Timestamp.Type;
            highest_bid: number | bigint;
            token_id: SDK.HexString;
            creator: SDK.AccountAddress.Type;
        }
    ]>;
    cis2_contract: SDK.ContractAddress.Type;
    counter: number;
};
/**
 * Get and parse the return value from dry-running update transaction for 'view' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueView | undefined} The structured return value or undefined if result was not a success.
 */
export declare function parseReturnValueView(invokeResult: SDK.InvokeContractResult): ReturnValueView | undefined;
/** Parameter type for update transaction for 'viewItemState' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type ViewItemStateParameter = number;
/**
 * Construct Parameter for update transactions for 'viewItemState' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {ViewItemStateParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createViewItemStateParameter(parameter: ViewItemStateParameter): SDK.Parameter.Type;
/**
 * Send an update-contract transaction to the 'viewItemState' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {ViewItemStateParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendViewItemState(contractClient: SponsoredTxEnabledAuctionContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: ViewItemStateParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'viewItemState' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {ViewItemStateParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunViewItemState(contractClient: SponsoredTxEnabledAuctionContract, parameter: ViewItemStateParameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
/** Return value for dry-running update transaction for 'viewItemState' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type ReturnValueViewItemState = {
    auction_state: {
        type: 'NotSoldYet';
    } | {
        type: 'Sold';
        content: SDK.AccountAddress.Type;
    };
    highest_bidder: {
        type: 'None';
    } | {
        type: 'Some';
        content: SDK.AccountAddress.Type;
    };
    name: string;
    end: SDK.Timestamp.Type;
    start: SDK.Timestamp.Type;
    highest_bid: number | bigint;
    token_id: SDK.HexString;
    creator: SDK.AccountAddress.Type;
};
/**
 * Get and parse the return value from dry-running update transaction for 'viewItemState' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueViewItemState | undefined} The structured return value or undefined if result was not a success.
 */
export declare function parseReturnValueViewItemState(invokeResult: SDK.InvokeContractResult): ReturnValueViewItemState | undefined;
/** Parameter type for update transaction for 'serializationHelper' entrypoint of the 'sponsored_tx_enabled_auction' contract. */
export type SerializationHelperParameter = number;
/**
 * Construct Parameter for update transactions for 'serializationHelper' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SerializationHelperParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createSerializationHelperParameter(parameter: SerializationHelperParameter): SDK.Parameter.Type;
/**
 * Send an update-contract transaction to the 'serializationHelper' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SerializationHelperParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendSerializationHelper(contractClient: SponsoredTxEnabledAuctionContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: SerializationHelperParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'serializationHelper' entrypoint of the 'sponsored_tx_enabled_auction' contract.
 * @param {SponsoredTxEnabledAuctionContract} contractClient The client for a 'sponsored_tx_enabled_auction' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SerializationHelperParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunSerializationHelper(contractClient: SponsoredTxEnabledAuctionContract, parameter: SerializationHelperParameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
export {};
