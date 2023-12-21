import * as SDK from "@concordium/web-sdk";
/** The reference of the smart contract module supported by the provided client. */
export declare const moduleReference: SDK.ModuleReference.Type;
/** Name of the smart contract supported by this client. */
export declare const contractName: SDK.ContractName.Type;
/** Smart contract client for a contract instance on chain. */
declare class Cis2MultiContract {
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
export type Type = Cis2MultiContract;
/**
 * Construct an instance of `Cis2MultiContract` for interacting with a 'cis2_multi' contract on chain.
 * Checking the information instance on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @param {SDK.BlockHash.Type} [blockHash] - Hash of the block to check the information at. When not provided the last finalized block is used.
 * @throws If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {Cis2MultiContract}
 */
export declare function create(grpcClient: SDK.ConcordiumGRPCClient, contractAddress: SDK.ContractAddress.Type, blockHash?: SDK.BlockHash.Type): Promise<Cis2MultiContract>;
/**
 * Construct the `Cis2MultiContract` for interacting with a 'cis2_multi' contract on chain.
 * Without checking the instance information on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @returns {Cis2MultiContract}
 */
export declare function createUnchecked(grpcClient: SDK.ConcordiumGRPCClient, contractAddress: SDK.ContractAddress.Type): Cis2MultiContract;
/**
 * Check if the smart contract instance exists on the blockchain and whether it uses a matching contract name and module reference.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.BlockHash.Type} [blockHash] A optional block hash to use for checking information on chain, if not provided the last finalized will be used.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 */
export declare function checkOnChain(contractClient: Cis2MultiContract, blockHash?: SDK.BlockHash.Type): Promise<void>;
/** Contract event type for the 'cis2_multi' contract. */
export type Event = {
    type: 'TokenMetadata';
    content: {
        token_id: SDK.HexString;
        metadata_url: {
            url: string;
            hash: {
                type: 'None';
            } | {
                type: 'Some';
                content: SDK.HexString;
            };
        };
    };
} | {
    type: 'UpdateOperator';
    content: {
        update: {
            type: 'Remove';
        } | {
            type: 'Add';
        };
        owner: {
            type: 'Account';
            content: SDK.AccountAddress.Type;
        } | {
            type: 'Contract';
            content: SDK.ContractAddress.Type;
        };
        operator: {
            type: 'Account';
            content: SDK.AccountAddress.Type;
        } | {
            type: 'Contract';
            content: SDK.ContractAddress.Type;
        };
    };
} | {
    type: 'Burn';
    content: {
        token_id: SDK.HexString;
        amount: number | bigint;
        owner: {
            type: 'Account';
            content: SDK.AccountAddress.Type;
        } | {
            type: 'Contract';
            content: SDK.ContractAddress.Type;
        };
    };
} | {
    type: 'Mint';
    content: {
        token_id: SDK.HexString;
        amount: number | bigint;
        owner: {
            type: 'Account';
            content: SDK.AccountAddress.Type;
        } | {
            type: 'Contract';
            content: SDK.ContractAddress.Type;
        };
    };
} | {
    type: 'Transfer';
    content: {
        token_id: SDK.HexString;
        amount: number | bigint;
        from: {
            type: 'Account';
            content: SDK.AccountAddress.Type;
        } | {
            type: 'Contract';
            content: SDK.ContractAddress.Type;
        };
        to: {
            type: 'Account';
            content: SDK.AccountAddress.Type;
        } | {
            type: 'Contract';
            content: SDK.ContractAddress.Type;
        };
    };
};
/**
 * Parse the contract events logged by the 'cis2_multi' contract.
 * @param {SDK.ContractEvent.Type} event The unparsed contract event.
 * @returns {Event} The structured contract event.
 */
export declare function parseEvent(event: SDK.ContractEvent.Type): Event;
/** Parameter type for update transaction for 'view' entrypoint of the 'cis2_multi' contract. */
export type ViewParameter = SDK.Parameter.Type;
/**
 * Construct Parameter for update transactions for 'view' entrypoint of the 'cis2_multi' contract.
 * @param {ViewParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createViewParameter(parameter: ViewParameter): SDK.Parameter.Type;
/**
 * Send an update-contract transaction to the 'view' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {ViewParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendView(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: ViewParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'view' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {ViewParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunView(contractClient: Cis2MultiContract, parameter: ViewParameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
/** Return value for dry-running update transaction for 'view' entrypoint of the 'cis2_multi' contract. */
export type ReturnValueView = {
    state: Array<[
        {
            type: 'Account';
            content: SDK.AccountAddress.Type;
        } | {
            type: 'Contract';
            content: SDK.ContractAddress.Type;
        },
        {
            balances: Array<[SDK.HexString, number | bigint]>;
            operators: Array<{
                type: 'Account';
                content: SDK.AccountAddress.Type;
            } | {
                type: 'Contract';
                content: SDK.ContractAddress.Type;
            }>;
        }
    ]>;
    tokens: Array<SDK.HexString>;
};
/**
 * Get and parse the return value from dry-running update transaction for 'view' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueView | undefined} The structured return value or undefined if result was not a success.
 */
export declare function parseReturnValueView(invokeResult: SDK.InvokeContractResult): ReturnValueView | undefined;
/** Parameter type for update transaction for 'mint' entrypoint of the 'cis2_multi' contract. */
export type MintParameter = {
    owner: {
        type: 'Account';
        content: SDK.AccountAddress.Type;
    } | {
        type: 'Contract';
        content: SDK.ContractAddress.Type;
    };
    metadata_url: {
        url: string;
        hash: {
            type: 'None';
        } | {
            type: 'Some';
            content: SDK.HexString;
        };
    };
    token_id: SDK.HexString;
};
/**
 * Construct Parameter for update transactions for 'mint' entrypoint of the 'cis2_multi' contract.
 * @param {MintParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createMintParameter(parameter: MintParameter): SDK.Parameter.Type;
/**
 * Send an update-contract transaction to the 'mint' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {MintParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendMint(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: MintParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'mint' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {MintParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunMint(contractClient: Cis2MultiContract, parameter: MintParameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
/** Error message for dry-running update transaction for 'mint' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessageMint = {
    type: 'InvalidTokenId';
} | {
    type: 'InsufficientFunds';
} | {
    type: 'Unauthorized';
} | {
    type: 'Custom';
    content: {
        type: 'ParseParams';
    } | {
        type: 'LogFull';
    } | {
        type: 'LogMalformed';
    } | {
        type: 'InvalidContractName';
    } | {
        type: 'ContractOnly';
    } | {
        type: 'InvokeContractError';
    } | {
        type: 'MissingAccount';
    } | {
        type: 'MalformedData';
    } | {
        type: 'WrongSignature';
    } | {
        type: 'NonceMismatch';
    } | {
        type: 'WrongContract';
    } | {
        type: 'WrongEntryPoint';
    } | {
        type: 'Expired';
    };
};
/**
 * Get and parse the error message from dry-running update transaction for 'mint' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageMint | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export declare function parseErrorMessageMint(invokeResult: SDK.InvokeContractResult): ErrorMessageMint | undefined;
/** Parameter type for update transaction for 'transfer' entrypoint of the 'cis2_multi' contract. */
export type TransferParameter = Array<{
    token_id: SDK.HexString;
    amount: number | bigint;
    from: {
        type: 'Account';
        content: SDK.AccountAddress.Type;
    } | {
        type: 'Contract';
        content: SDK.ContractAddress.Type;
    };
    to: {
        type: 'Account';
        content: SDK.AccountAddress.Type;
    } | {
        type: 'Contract';
        content: [SDK.ContractAddress.Type, string];
    };
    data: SDK.HexString;
}>;
/**
 * Construct Parameter for update transactions for 'transfer' entrypoint of the 'cis2_multi' contract.
 * @param {TransferParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createTransferParameter(parameter: TransferParameter): SDK.Parameter.Type;
/**
 * Send an update-contract transaction to the 'transfer' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {TransferParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendTransfer(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: TransferParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'transfer' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {TransferParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunTransfer(contractClient: Cis2MultiContract, parameter: TransferParameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
/** Error message for dry-running update transaction for 'transfer' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessageTransfer = {
    type: 'InvalidTokenId';
} | {
    type: 'InsufficientFunds';
} | {
    type: 'Unauthorized';
} | {
    type: 'Custom';
    content: {
        type: 'ParseParams';
    } | {
        type: 'LogFull';
    } | {
        type: 'LogMalformed';
    } | {
        type: 'InvalidContractName';
    } | {
        type: 'ContractOnly';
    } | {
        type: 'InvokeContractError';
    } | {
        type: 'MissingAccount';
    } | {
        type: 'MalformedData';
    } | {
        type: 'WrongSignature';
    } | {
        type: 'NonceMismatch';
    } | {
        type: 'WrongContract';
    } | {
        type: 'WrongEntryPoint';
    } | {
        type: 'Expired';
    };
};
/**
 * Get and parse the error message from dry-running update transaction for 'transfer' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageTransfer | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export declare function parseErrorMessageTransfer(invokeResult: SDK.InvokeContractResult): ErrorMessageTransfer | undefined;
/** Parameter type for update transaction for 'serializationHelper' entrypoint of the 'cis2_multi' contract. */
export type SerializationHelperParameter = {
    contract_address: SDK.ContractAddress.Type;
    nonce: number | bigint;
    timestamp: SDK.Timestamp.Type;
    entry_point: string;
    payload: Array<number>;
};
/**
 * Construct Parameter for update transactions for 'serializationHelper' entrypoint of the 'cis2_multi' contract.
 * @param {SerializationHelperParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createSerializationHelperParameter(parameter: SerializationHelperParameter): SDK.Parameter.Type;
/**
 * Send an update-contract transaction to the 'serializationHelper' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SerializationHelperParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendSerializationHelper(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: SerializationHelperParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'serializationHelper' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SerializationHelperParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunSerializationHelper(contractClient: Cis2MultiContract, parameter: SerializationHelperParameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
/** Parameter type for update transaction for 'viewMessageHash' entrypoint of the 'cis2_multi' contract. */
export type ViewMessageHashParameter = {
    signature: Map<number, Map<number, {
        type: 'Ed25519';
        content: SDK.HexString;
    }>>;
    signer: SDK.AccountAddress.Type;
    message: {
        contract_address: SDK.ContractAddress.Type;
        nonce: number | bigint;
        timestamp: SDK.Timestamp.Type;
        entry_point: string;
        payload: Array<number>;
    };
};
/**
 * Construct Parameter for update transactions for 'viewMessageHash' entrypoint of the 'cis2_multi' contract.
 * @param {ViewMessageHashParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createViewMessageHashParameter(parameter: ViewMessageHashParameter): SDK.Parameter.Type;
/**
 * Send an update-contract transaction to the 'viewMessageHash' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {ViewMessageHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendViewMessageHash(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: ViewMessageHashParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'viewMessageHash' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {ViewMessageHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunViewMessageHash(contractClient: Cis2MultiContract, parameter: ViewMessageHashParameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
/** Return value for dry-running update transaction for 'viewMessageHash' entrypoint of the 'cis2_multi' contract. */
export type ReturnValueViewMessageHash = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
/**
 * Get and parse the return value from dry-running update transaction for 'viewMessageHash' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueViewMessageHash | undefined} The structured return value or undefined if result was not a success.
 */
export declare function parseReturnValueViewMessageHash(invokeResult: SDK.InvokeContractResult): ReturnValueViewMessageHash | undefined;
/** Parameter type for update transaction for 'permit' entrypoint of the 'cis2_multi' contract. */
export type PermitParameter = {
    signature: Map<number, Map<number, {
        type: 'Ed25519';
        content: SDK.HexString;
    }>>;
    signer: SDK.AccountAddress.Type;
    message: {
        contract_address: SDK.ContractAddress.Type;
        nonce: number | bigint;
        timestamp: SDK.Timestamp.Type;
        entry_point: string;
        payload: Array<number>;
    };
};
/**
 * Construct Parameter for update transactions for 'permit' entrypoint of the 'cis2_multi' contract.
 * @param {PermitParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createPermitParameter(parameter: PermitParameter): SDK.Parameter.Type;
/**
 * Send an update-contract transaction to the 'permit' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {PermitParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendPermit(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: PermitParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'permit' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {PermitParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunPermit(contractClient: Cis2MultiContract, parameter: PermitParameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
/** Parameter type for update transaction for 'updateOperator' entrypoint of the 'cis2_multi' contract. */
export type UpdateOperatorParameter = Array<{
    update: {
        type: 'Remove';
    } | {
        type: 'Add';
    };
    operator: {
        type: 'Account';
        content: SDK.AccountAddress.Type;
    } | {
        type: 'Contract';
        content: SDK.ContractAddress.Type;
    };
}>;
/**
 * Construct Parameter for update transactions for 'updateOperator' entrypoint of the 'cis2_multi' contract.
 * @param {UpdateOperatorParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createUpdateOperatorParameter(parameter: UpdateOperatorParameter): SDK.Parameter.Type;
/**
 * Send an update-contract transaction to the 'updateOperator' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {UpdateOperatorParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendUpdateOperator(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: UpdateOperatorParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'updateOperator' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {UpdateOperatorParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunUpdateOperator(contractClient: Cis2MultiContract, parameter: UpdateOperatorParameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
/** Error message for dry-running update transaction for 'updateOperator' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessageUpdateOperator = {
    type: 'InvalidTokenId';
} | {
    type: 'InsufficientFunds';
} | {
    type: 'Unauthorized';
} | {
    type: 'Custom';
    content: {
        type: 'ParseParams';
    } | {
        type: 'LogFull';
    } | {
        type: 'LogMalformed';
    } | {
        type: 'InvalidContractName';
    } | {
        type: 'ContractOnly';
    } | {
        type: 'InvokeContractError';
    } | {
        type: 'MissingAccount';
    } | {
        type: 'MalformedData';
    } | {
        type: 'WrongSignature';
    } | {
        type: 'NonceMismatch';
    } | {
        type: 'WrongContract';
    } | {
        type: 'WrongEntryPoint';
    } | {
        type: 'Expired';
    };
};
/**
 * Get and parse the error message from dry-running update transaction for 'updateOperator' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageUpdateOperator | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export declare function parseErrorMessageUpdateOperator(invokeResult: SDK.InvokeContractResult): ErrorMessageUpdateOperator | undefined;
/** Parameter type for update transaction for 'balanceOf' entrypoint of the 'cis2_multi' contract. */
export type BalanceOfParameter = Array<{
    token_id: SDK.HexString;
    address: {
        type: 'Account';
        content: SDK.AccountAddress.Type;
    } | {
        type: 'Contract';
        content: SDK.ContractAddress.Type;
    };
}>;
/**
 * Construct Parameter for update transactions for 'balanceOf' entrypoint of the 'cis2_multi' contract.
 * @param {BalanceOfParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createBalanceOfParameter(parameter: BalanceOfParameter): SDK.Parameter.Type;
/**
 * Send an update-contract transaction to the 'balanceOf' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {BalanceOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendBalanceOf(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: BalanceOfParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'balanceOf' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {BalanceOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunBalanceOf(contractClient: Cis2MultiContract, parameter: BalanceOfParameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
/** Return value for dry-running update transaction for 'balanceOf' entrypoint of the 'cis2_multi' contract. */
export type ReturnValueBalanceOf = Array<number | bigint>;
/**
 * Get and parse the return value from dry-running update transaction for 'balanceOf' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueBalanceOf | undefined} The structured return value or undefined if result was not a success.
 */
export declare function parseReturnValueBalanceOf(invokeResult: SDK.InvokeContractResult): ReturnValueBalanceOf | undefined;
/** Error message for dry-running update transaction for 'balanceOf' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessageBalanceOf = {
    type: 'InvalidTokenId';
} | {
    type: 'InsufficientFunds';
} | {
    type: 'Unauthorized';
} | {
    type: 'Custom';
    content: {
        type: 'ParseParams';
    } | {
        type: 'LogFull';
    } | {
        type: 'LogMalformed';
    } | {
        type: 'InvalidContractName';
    } | {
        type: 'ContractOnly';
    } | {
        type: 'InvokeContractError';
    } | {
        type: 'MissingAccount';
    } | {
        type: 'MalformedData';
    } | {
        type: 'WrongSignature';
    } | {
        type: 'NonceMismatch';
    } | {
        type: 'WrongContract';
    } | {
        type: 'WrongEntryPoint';
    } | {
        type: 'Expired';
    };
};
/**
 * Get and parse the error message from dry-running update transaction for 'balanceOf' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageBalanceOf | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export declare function parseErrorMessageBalanceOf(invokeResult: SDK.InvokeContractResult): ErrorMessageBalanceOf | undefined;
/** Parameter type for update transaction for 'operatorOf' entrypoint of the 'cis2_multi' contract. */
export type OperatorOfParameter = Array<{
    owner: {
        type: 'Account';
        content: SDK.AccountAddress.Type;
    } | {
        type: 'Contract';
        content: SDK.ContractAddress.Type;
    };
    address: {
        type: 'Account';
        content: SDK.AccountAddress.Type;
    } | {
        type: 'Contract';
        content: SDK.ContractAddress.Type;
    };
}>;
/**
 * Construct Parameter for update transactions for 'operatorOf' entrypoint of the 'cis2_multi' contract.
 * @param {OperatorOfParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createOperatorOfParameter(parameter: OperatorOfParameter): SDK.Parameter.Type;
/**
 * Send an update-contract transaction to the 'operatorOf' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {OperatorOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendOperatorOf(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: OperatorOfParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'operatorOf' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {OperatorOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunOperatorOf(contractClient: Cis2MultiContract, parameter: OperatorOfParameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
/** Return value for dry-running update transaction for 'operatorOf' entrypoint of the 'cis2_multi' contract. */
export type ReturnValueOperatorOf = Array<boolean>;
/**
 * Get and parse the return value from dry-running update transaction for 'operatorOf' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueOperatorOf | undefined} The structured return value or undefined if result was not a success.
 */
export declare function parseReturnValueOperatorOf(invokeResult: SDK.InvokeContractResult): ReturnValueOperatorOf | undefined;
/** Error message for dry-running update transaction for 'operatorOf' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessageOperatorOf = {
    type: 'InvalidTokenId';
} | {
    type: 'InsufficientFunds';
} | {
    type: 'Unauthorized';
} | {
    type: 'Custom';
    content: {
        type: 'ParseParams';
    } | {
        type: 'LogFull';
    } | {
        type: 'LogMalformed';
    } | {
        type: 'InvalidContractName';
    } | {
        type: 'ContractOnly';
    } | {
        type: 'InvokeContractError';
    } | {
        type: 'MissingAccount';
    } | {
        type: 'MalformedData';
    } | {
        type: 'WrongSignature';
    } | {
        type: 'NonceMismatch';
    } | {
        type: 'WrongContract';
    } | {
        type: 'WrongEntryPoint';
    } | {
        type: 'Expired';
    };
};
/**
 * Get and parse the error message from dry-running update transaction for 'operatorOf' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageOperatorOf | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export declare function parseErrorMessageOperatorOf(invokeResult: SDK.InvokeContractResult): ErrorMessageOperatorOf | undefined;
/** Parameter type for update transaction for 'publicKeyOf' entrypoint of the 'cis2_multi' contract. */
export type PublicKeyOfParameter = Array<SDK.AccountAddress.Type>;
/**
 * Construct Parameter for update transactions for 'publicKeyOf' entrypoint of the 'cis2_multi' contract.
 * @param {PublicKeyOfParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createPublicKeyOfParameter(parameter: PublicKeyOfParameter): SDK.Parameter.Type;
/**
 * Send an update-contract transaction to the 'publicKeyOf' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {PublicKeyOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendPublicKeyOf(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: PublicKeyOfParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'publicKeyOf' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {PublicKeyOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunPublicKeyOf(contractClient: Cis2MultiContract, parameter: PublicKeyOfParameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
/** Return value for dry-running update transaction for 'publicKeyOf' entrypoint of the 'cis2_multi' contract. */
export type ReturnValuePublicKeyOf = Array<{
    type: 'None';
} | {
    type: 'Some';
    content: {
        keys: Map<number, {
            keys: Map<number, {
                type: 'Ed25519';
                content: SDK.HexString;
            }>;
            threshold: number;
        }>;
        threshold: number;
    };
}>;
/**
 * Get and parse the return value from dry-running update transaction for 'publicKeyOf' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValuePublicKeyOf | undefined} The structured return value or undefined if result was not a success.
 */
export declare function parseReturnValuePublicKeyOf(invokeResult: SDK.InvokeContractResult): ReturnValuePublicKeyOf | undefined;
/** Error message for dry-running update transaction for 'publicKeyOf' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessagePublicKeyOf = {
    type: 'InvalidTokenId';
} | {
    type: 'InsufficientFunds';
} | {
    type: 'Unauthorized';
} | {
    type: 'Custom';
    content: {
        type: 'ParseParams';
    } | {
        type: 'LogFull';
    } | {
        type: 'LogMalformed';
    } | {
        type: 'InvalidContractName';
    } | {
        type: 'ContractOnly';
    } | {
        type: 'InvokeContractError';
    } | {
        type: 'MissingAccount';
    } | {
        type: 'MalformedData';
    } | {
        type: 'WrongSignature';
    } | {
        type: 'NonceMismatch';
    } | {
        type: 'WrongContract';
    } | {
        type: 'WrongEntryPoint';
    } | {
        type: 'Expired';
    };
};
/**
 * Get and parse the error message from dry-running update transaction for 'publicKeyOf' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessagePublicKeyOf | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export declare function parseErrorMessagePublicKeyOf(invokeResult: SDK.InvokeContractResult): ErrorMessagePublicKeyOf | undefined;
/** Parameter type for update transaction for 'nonceOf' entrypoint of the 'cis2_multi' contract. */
export type NonceOfParameter = Array<SDK.AccountAddress.Type>;
/**
 * Construct Parameter for update transactions for 'nonceOf' entrypoint of the 'cis2_multi' contract.
 * @param {NonceOfParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createNonceOfParameter(parameter: NonceOfParameter): SDK.Parameter.Type;
/**
 * Send an update-contract transaction to the 'nonceOf' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {NonceOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendNonceOf(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: NonceOfParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'nonceOf' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {NonceOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunNonceOf(contractClient: Cis2MultiContract, parameter: NonceOfParameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
/** Return value for dry-running update transaction for 'nonceOf' entrypoint of the 'cis2_multi' contract. */
export type ReturnValueNonceOf = Array<number | bigint>;
/**
 * Get and parse the return value from dry-running update transaction for 'nonceOf' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueNonceOf | undefined} The structured return value or undefined if result was not a success.
 */
export declare function parseReturnValueNonceOf(invokeResult: SDK.InvokeContractResult): ReturnValueNonceOf | undefined;
/** Error message for dry-running update transaction for 'nonceOf' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessageNonceOf = {
    type: 'InvalidTokenId';
} | {
    type: 'InsufficientFunds';
} | {
    type: 'Unauthorized';
} | {
    type: 'Custom';
    content: {
        type: 'ParseParams';
    } | {
        type: 'LogFull';
    } | {
        type: 'LogMalformed';
    } | {
        type: 'InvalidContractName';
    } | {
        type: 'ContractOnly';
    } | {
        type: 'InvokeContractError';
    } | {
        type: 'MissingAccount';
    } | {
        type: 'MalformedData';
    } | {
        type: 'WrongSignature';
    } | {
        type: 'NonceMismatch';
    } | {
        type: 'WrongContract';
    } | {
        type: 'WrongEntryPoint';
    } | {
        type: 'Expired';
    };
};
/**
 * Get and parse the error message from dry-running update transaction for 'nonceOf' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageNonceOf | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export declare function parseErrorMessageNonceOf(invokeResult: SDK.InvokeContractResult): ErrorMessageNonceOf | undefined;
/** Parameter type for update transaction for 'tokenMetadata' entrypoint of the 'cis2_multi' contract. */
export type TokenMetadataParameter = Array<SDK.HexString>;
/**
 * Construct Parameter for update transactions for 'tokenMetadata' entrypoint of the 'cis2_multi' contract.
 * @param {TokenMetadataParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createTokenMetadataParameter(parameter: TokenMetadataParameter): SDK.Parameter.Type;
/**
 * Send an update-contract transaction to the 'tokenMetadata' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {TokenMetadataParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendTokenMetadata(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: TokenMetadataParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'tokenMetadata' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {TokenMetadataParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunTokenMetadata(contractClient: Cis2MultiContract, parameter: TokenMetadataParameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
/** Return value for dry-running update transaction for 'tokenMetadata' entrypoint of the 'cis2_multi' contract. */
export type ReturnValueTokenMetadata = Array<{
    url: string;
    hash: {
        type: 'None';
    } | {
        type: 'Some';
        content: SDK.HexString;
    };
}>;
/**
 * Get and parse the return value from dry-running update transaction for 'tokenMetadata' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueTokenMetadata | undefined} The structured return value or undefined if result was not a success.
 */
export declare function parseReturnValueTokenMetadata(invokeResult: SDK.InvokeContractResult): ReturnValueTokenMetadata | undefined;
/** Error message for dry-running update transaction for 'tokenMetadata' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessageTokenMetadata = {
    type: 'InvalidTokenId';
} | {
    type: 'InsufficientFunds';
} | {
    type: 'Unauthorized';
} | {
    type: 'Custom';
    content: {
        type: 'ParseParams';
    } | {
        type: 'LogFull';
    } | {
        type: 'LogMalformed';
    } | {
        type: 'InvalidContractName';
    } | {
        type: 'ContractOnly';
    } | {
        type: 'InvokeContractError';
    } | {
        type: 'MissingAccount';
    } | {
        type: 'MalformedData';
    } | {
        type: 'WrongSignature';
    } | {
        type: 'NonceMismatch';
    } | {
        type: 'WrongContract';
    } | {
        type: 'WrongEntryPoint';
    } | {
        type: 'Expired';
    };
};
/**
 * Get and parse the error message from dry-running update transaction for 'tokenMetadata' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageTokenMetadata | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export declare function parseErrorMessageTokenMetadata(invokeResult: SDK.InvokeContractResult): ErrorMessageTokenMetadata | undefined;
/** Parameter type for update transaction for 'onReceivingCIS2' entrypoint of the 'cis2_multi' contract. */
export type OnReceivingCIS2Parameter = SDK.Parameter.Type;
/**
 * Construct Parameter for update transactions for 'onReceivingCIS2' entrypoint of the 'cis2_multi' contract.
 * @param {OnReceivingCIS2Parameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createOnReceivingCIS2Parameter(parameter: OnReceivingCIS2Parameter): SDK.Parameter.Type;
/**
 * Send an update-contract transaction to the 'onReceivingCIS2' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {OnReceivingCIS2Parameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendOnReceivingCIS2(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: OnReceivingCIS2Parameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'onReceivingCIS2' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {OnReceivingCIS2Parameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunOnReceivingCIS2(contractClient: Cis2MultiContract, parameter: OnReceivingCIS2Parameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
/** Error message for dry-running update transaction for 'onReceivingCIS2' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessageOnReceivingCIS2 = {
    type: 'InvalidTokenId';
} | {
    type: 'InsufficientFunds';
} | {
    type: 'Unauthorized';
} | {
    type: 'Custom';
    content: {
        type: 'ParseParams';
    } | {
        type: 'LogFull';
    } | {
        type: 'LogMalformed';
    } | {
        type: 'InvalidContractName';
    } | {
        type: 'ContractOnly';
    } | {
        type: 'InvokeContractError';
    } | {
        type: 'MissingAccount';
    } | {
        type: 'MalformedData';
    } | {
        type: 'WrongSignature';
    } | {
        type: 'NonceMismatch';
    } | {
        type: 'WrongContract';
    } | {
        type: 'WrongEntryPoint';
    } | {
        type: 'Expired';
    };
};
/**
 * Get and parse the error message from dry-running update transaction for 'onReceivingCIS2' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageOnReceivingCIS2 | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export declare function parseErrorMessageOnReceivingCIS2(invokeResult: SDK.InvokeContractResult): ErrorMessageOnReceivingCIS2 | undefined;
/** Parameter type for update transaction for 'supports' entrypoint of the 'cis2_multi' contract. */
export type SupportsParameter = Array<string>;
/**
 * Construct Parameter for update transactions for 'supports' entrypoint of the 'cis2_multi' contract.
 * @param {SupportsParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createSupportsParameter(parameter: SupportsParameter): SDK.Parameter.Type;
/**
 * Send an update-contract transaction to the 'supports' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SupportsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendSupports(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: SupportsParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'supports' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SupportsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunSupports(contractClient: Cis2MultiContract, parameter: SupportsParameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
/** Return value for dry-running update transaction for 'supports' entrypoint of the 'cis2_multi' contract. */
export type ReturnValueSupports = Array<{
    type: 'NoSupport';
} | {
    type: 'Support';
} | {
    type: 'SupportBy';
    content: Array<SDK.ContractAddress.Type>;
}>;
/**
 * Get and parse the return value from dry-running update transaction for 'supports' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueSupports | undefined} The structured return value or undefined if result was not a success.
 */
export declare function parseReturnValueSupports(invokeResult: SDK.InvokeContractResult): ReturnValueSupports | undefined;
/** Error message for dry-running update transaction for 'supports' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessageSupports = {
    type: 'InvalidTokenId';
} | {
    type: 'InsufficientFunds';
} | {
    type: 'Unauthorized';
} | {
    type: 'Custom';
    content: {
        type: 'ParseParams';
    } | {
        type: 'LogFull';
    } | {
        type: 'LogMalformed';
    } | {
        type: 'InvalidContractName';
    } | {
        type: 'ContractOnly';
    } | {
        type: 'InvokeContractError';
    } | {
        type: 'MissingAccount';
    } | {
        type: 'MalformedData';
    } | {
        type: 'WrongSignature';
    } | {
        type: 'NonceMismatch';
    } | {
        type: 'WrongContract';
    } | {
        type: 'WrongEntryPoint';
    } | {
        type: 'Expired';
    };
};
/**
 * Get and parse the error message from dry-running update transaction for 'supports' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageSupports | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export declare function parseErrorMessageSupports(invokeResult: SDK.InvokeContractResult): ErrorMessageSupports | undefined;
/** Parameter type for update transaction for 'supportsPermit' entrypoint of the 'cis2_multi' contract. */
export type SupportsPermitParameter = {
    queries: Array<string>;
};
/**
 * Construct Parameter for update transactions for 'supportsPermit' entrypoint of the 'cis2_multi' contract.
 * @param {SupportsPermitParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createSupportsPermitParameter(parameter: SupportsPermitParameter): SDK.Parameter.Type;
/**
 * Send an update-contract transaction to the 'supportsPermit' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SupportsPermitParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendSupportsPermit(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: SupportsPermitParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'supportsPermit' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SupportsPermitParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunSupportsPermit(contractClient: Cis2MultiContract, parameter: SupportsPermitParameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
/** Return value for dry-running update transaction for 'supportsPermit' entrypoint of the 'cis2_multi' contract. */
export type ReturnValueSupportsPermit = Array<{
    type: 'NoSupport';
} | {
    type: 'Support';
} | {
    type: 'SupportBy';
    content: Array<SDK.ContractAddress.Type>;
}>;
/**
 * Get and parse the return value from dry-running update transaction for 'supportsPermit' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueSupportsPermit | undefined} The structured return value or undefined if result was not a success.
 */
export declare function parseReturnValueSupportsPermit(invokeResult: SDK.InvokeContractResult): ReturnValueSupportsPermit | undefined;
/** Error message for dry-running update transaction for 'supportsPermit' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessageSupportsPermit = {
    type: 'InvalidTokenId';
} | {
    type: 'InsufficientFunds';
} | {
    type: 'Unauthorized';
} | {
    type: 'Custom';
    content: {
        type: 'ParseParams';
    } | {
        type: 'LogFull';
    } | {
        type: 'LogMalformed';
    } | {
        type: 'InvalidContractName';
    } | {
        type: 'ContractOnly';
    } | {
        type: 'InvokeContractError';
    } | {
        type: 'MissingAccount';
    } | {
        type: 'MalformedData';
    } | {
        type: 'WrongSignature';
    } | {
        type: 'NonceMismatch';
    } | {
        type: 'WrongContract';
    } | {
        type: 'WrongEntryPoint';
    } | {
        type: 'Expired';
    };
};
/**
 * Get and parse the error message from dry-running update transaction for 'supportsPermit' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageSupportsPermit | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export declare function parseErrorMessageSupportsPermit(invokeResult: SDK.InvokeContractResult): ErrorMessageSupportsPermit | undefined;
/** Parameter type for update transaction for 'setImplementors' entrypoint of the 'cis2_multi' contract. */
export type SetImplementorsParameter = {
    id: string;
    implementors: Array<SDK.ContractAddress.Type>;
};
/**
 * Construct Parameter for update transactions for 'setImplementors' entrypoint of the 'cis2_multi' contract.
 * @param {SetImplementorsParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createSetImplementorsParameter(parameter: SetImplementorsParameter): SDK.Parameter.Type;
/**
 * Send an update-contract transaction to the 'setImplementors' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SetImplementorsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendSetImplementors(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: SetImplementorsParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'setImplementors' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SetImplementorsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunSetImplementors(contractClient: Cis2MultiContract, parameter: SetImplementorsParameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
/** Error message for dry-running update transaction for 'setImplementors' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessageSetImplementors = {
    type: 'InvalidTokenId';
} | {
    type: 'InsufficientFunds';
} | {
    type: 'Unauthorized';
} | {
    type: 'Custom';
    content: {
        type: 'ParseParams';
    } | {
        type: 'LogFull';
    } | {
        type: 'LogMalformed';
    } | {
        type: 'InvalidContractName';
    } | {
        type: 'ContractOnly';
    } | {
        type: 'InvokeContractError';
    } | {
        type: 'MissingAccount';
    } | {
        type: 'MalformedData';
    } | {
        type: 'WrongSignature';
    } | {
        type: 'NonceMismatch';
    } | {
        type: 'WrongContract';
    } | {
        type: 'WrongEntryPoint';
    } | {
        type: 'Expired';
    };
};
/**
 * Get and parse the error message from dry-running update transaction for 'setImplementors' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageSetImplementors | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export declare function parseErrorMessageSetImplementors(invokeResult: SDK.InvokeContractResult): ErrorMessageSetImplementors | undefined;
export {};
