// @ts-nocheck
import * as SDK from "@concordium/web-sdk";

/** The reference of the smart contract module supported by the provided client. */
export const moduleReference: SDK.ModuleReference.Type = /*#__PURE__*/ SDK.ModuleReference.fromHexString('571e81543a24293da395eaa356bdd713114aab09a75926a6fad60a1e38b08db7');
/** Name of the smart contract supported by this client. */
export const contractName: SDK.ContractName.Type = /*#__PURE__*/ SDK.ContractName.fromStringUnchecked('election');

/** Smart contract client for a contract instance on chain. */
class ElectionContract {
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
export type Type = ElectionContract;

/**
 * Construct an instance of `ElectionContract` for interacting with a 'election' contract on chain.
 * Checking the information instance on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @param {SDK.BlockHash.Type} [blockHash] - Hash of the block to check the information at. When not provided the last finalized block is used.
 * @throws If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {ElectionContract}
 */
export async function create(grpcClient: SDK.ConcordiumGRPCClient, contractAddress: SDK.ContractAddress.Type, blockHash?: SDK.BlockHash.Type): Promise<ElectionContract> {
    const genericContract = new SDK.Contract(grpcClient, contractAddress, contractName);
    await genericContract.checkOnChain({ moduleReference: moduleReference, blockHash: blockHash });
    return new ElectionContract(
        grpcClient,
        contractAddress,
        genericContract
    );
}

/**
 * Construct the `ElectionContract` for interacting with a 'election' contract on chain.
 * Without checking the instance information on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @returns {ElectionContract}
 */
export function createUnchecked(grpcClient: SDK.ConcordiumGRPCClient, contractAddress: SDK.ContractAddress.Type): ElectionContract {
    const genericContract = new SDK.Contract(grpcClient, contractAddress, contractName);
    return new ElectionContract(
        grpcClient,
        contractAddress,
        genericContract,
    );
}

/**
 * Check if the smart contract instance exists on the blockchain and whether it uses a matching contract name and module reference.
 * @param {ElectionContract} contractClient The client for a 'election' smart contract instance on chain.
 * @param {SDK.BlockHash.Type} [blockHash] A optional block hash to use for checking information on chain, if not provided the last finalized will be used.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 */
export function checkOnChain(contractClient: ElectionContract, blockHash?: SDK.BlockHash.Type): Promise<void> {
    return contractClient.genericContract.checkOnChain({moduleReference: moduleReference, blockHash: blockHash });
}

/** Parameter type for update transaction for 'registerVotes' entrypoint of the 'election' contract. */
export type RegisterVotesParameter = Array<{
    candidate_index: number,
    has_vote: boolean,
    }>;

/**
 * Construct Parameter for update transactions for 'registerVotes' entrypoint of the 'election' contract.
 * @param {RegisterVotesParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createRegisterVotesParameter(parameter: RegisterVotesParameter): SDK.Parameter.Type {
    const list22 = parameter.map((item23) => {
    const field25 = item23.candidate_index;
    const field26 = item23.has_vote;
    const named24 = {
    candidate_index: field25,
    has_vote: field26,
    };
    return named24;
    });
    const out = SDK.Parameter.fromBase64SchemaType('EAIUAAIAAAAPAAAAY2FuZGlkYXRlX2luZGV4AggAAABoYXNfdm90ZQE=', list22);
    return out;
}

/**
 * Send an update-contract transaction to the 'registerVotes' entrypoint of the 'election' contract.
 * @param {ElectionContract} contractClient The client for a 'election' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {RegisterVotesParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendRegisterVotes(contractClient: ElectionContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: RegisterVotesParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('registerVotes'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createRegisterVotesParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'registerVotes' entrypoint of the 'election' contract.
 * @param {ElectionContract} contractClient The client for a 'election' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {RegisterVotesParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunRegisterVotes(contractClient: ElectionContract, parameter: RegisterVotesParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('registerVotes'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createRegisterVotesParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'registerVotes' entrypoint of the 'election' contract. */
export type ErrorMessageRegisterVotes = { type: 'ParseParams'} | { type: 'Unauthorized'} | { type: 'MalformedConfig'} | { type: 'MalformedElectionResult'} | { type: 'ElectionClosed'} | { type: 'Inconclusive'};

/**
 * Get and parse the error message from dry-running update transaction for 'registerVotes' entrypoint of the 'election' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageRegisterVotes | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageRegisterVotes(invokeResult: SDK.InvokeContractResult): ErrorMessageRegisterVotes | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <{'ParseParams' : [] } | {'Unauthorized' : [] } | {'MalformedConfig' : [] } | {'MalformedElectionResult' : [] } | {'ElectionClosed' : [] } | {'Inconclusive' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQYAAAALAAAAUGFyc2VQYXJhbXMCDAAAAFVuYXV0aG9yaXplZAIPAAAATWFsZm9ybWVkQ29uZmlnAhcAAABNYWxmb3JtZWRFbGVjdGlvblJlc3VsdAIOAAAARWxlY3Rpb25DbG9zZWQCDAAAAEluY29uY2x1c2l2ZQI=');
    let match27: { type: 'ParseParams'} | { type: 'Unauthorized'} | { type: 'MalformedConfig'} | { type: 'MalformedElectionResult'} | { type: 'ElectionClosed'} | { type: 'Inconclusive'};
    if ('ParseParams' in schemaJson) {
       match27 = {
           type: 'ParseParams',
       };
    } else if ('Unauthorized' in schemaJson) {
       match27 = {
           type: 'Unauthorized',
       };
    } else if ('MalformedConfig' in schemaJson) {
       match27 = {
           type: 'MalformedConfig',
       };
    } else if ('MalformedElectionResult' in schemaJson) {
       match27 = {
           type: 'MalformedElectionResult',
       };
    } else if ('ElectionClosed' in schemaJson) {
       match27 = {
           type: 'ElectionClosed',
       };
    } else if ('Inconclusive' in schemaJson) {
       match27 = {
           type: 'Inconclusive',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match27
}

/** Parameter type for update transaction for 'postElectionResult' entrypoint of the 'election' contract. */
export type PostElectionResultParameter = Array<number | bigint>;

/**
 * Construct Parameter for update transactions for 'postElectionResult' entrypoint of the 'election' contract.
 * @param {PostElectionResultParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createPostElectionResultParameter(parameter: PostElectionResultParameter): SDK.Parameter.Type {
    const list34 = parameter.map((item35) => {
    const number36 = BigInt(item35);
    return number36;
    });
    const out = SDK.Parameter.fromBase64SchemaType('EAIF', list34);
    return out;
}

/**
 * Send an update-contract transaction to the 'postElectionResult' entrypoint of the 'election' contract.
 * @param {ElectionContract} contractClient The client for a 'election' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {PostElectionResultParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendPostElectionResult(contractClient: ElectionContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: PostElectionResultParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('postElectionResult'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createPostElectionResultParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'postElectionResult' entrypoint of the 'election' contract.
 * @param {ElectionContract} contractClient The client for a 'election' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {PostElectionResultParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunPostElectionResult(contractClient: ElectionContract, parameter: PostElectionResultParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('postElectionResult'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createPostElectionResultParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'postElectionResult' entrypoint of the 'election' contract. */
export type ErrorMessagePostElectionResult = { type: 'ParseParams'} | { type: 'Unauthorized'} | { type: 'MalformedConfig'} | { type: 'MalformedElectionResult'} | { type: 'ElectionClosed'} | { type: 'Inconclusive'};

/**
 * Get and parse the error message from dry-running update transaction for 'postElectionResult' entrypoint of the 'election' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessagePostElectionResult | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessagePostElectionResult(invokeResult: SDK.InvokeContractResult): ErrorMessagePostElectionResult | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <{'ParseParams' : [] } | {'Unauthorized' : [] } | {'MalformedConfig' : [] } | {'MalformedElectionResult' : [] } | {'ElectionClosed' : [] } | {'Inconclusive' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQYAAAALAAAAUGFyc2VQYXJhbXMCDAAAAFVuYXV0aG9yaXplZAIPAAAATWFsZm9ybWVkQ29uZmlnAhcAAABNYWxmb3JtZWRFbGVjdGlvblJlc3VsdAIOAAAARWxlY3Rpb25DbG9zZWQCDAAAAEluY29uY2x1c2l2ZQI=');
    let match37: { type: 'ParseParams'} | { type: 'Unauthorized'} | { type: 'MalformedConfig'} | { type: 'MalformedElectionResult'} | { type: 'ElectionClosed'} | { type: 'Inconclusive'};
    if ('ParseParams' in schemaJson) {
       match37 = {
           type: 'ParseParams',
       };
    } else if ('Unauthorized' in schemaJson) {
       match37 = {
           type: 'Unauthorized',
       };
    } else if ('MalformedConfig' in schemaJson) {
       match37 = {
           type: 'MalformedConfig',
       };
    } else if ('MalformedElectionResult' in schemaJson) {
       match37 = {
           type: 'MalformedElectionResult',
       };
    } else if ('ElectionClosed' in schemaJson) {
       match37 = {
           type: 'ElectionClosed',
       };
    } else if ('Inconclusive' in schemaJson) {
       match37 = {
           type: 'Inconclusive',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match37
}

/** Parameter type for update transaction for 'viewConfig' entrypoint of the 'election' contract. */
export type ViewConfigParameter = SDK.Parameter.Type;

/**
 * Construct Parameter for update transactions for 'viewConfig' entrypoint of the 'election' contract.
 * @param {ViewConfigParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createViewConfigParameter(parameter: ViewConfigParameter): SDK.Parameter.Type {
    return parameter;
}

/**
 * Send an update-contract transaction to the 'viewConfig' entrypoint of the 'election' contract.
 * @param {ElectionContract} contractClient The client for a 'election' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {ViewConfigParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendViewConfig(contractClient: ElectionContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: ViewConfigParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('viewConfig'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createViewConfigParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'viewConfig' entrypoint of the 'election' contract.
 * @param {ElectionContract} contractClient The client for a 'election' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {ViewConfigParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunViewConfig(contractClient: ElectionContract, parameter: ViewConfigParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('viewConfig'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createViewConfigParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'viewConfig' entrypoint of the 'election' contract. */
export type ReturnValueViewConfig = {
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
 * Get and parse the return value from dry-running update transaction for 'viewConfig' entrypoint of the 'election' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueViewConfig | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueViewConfig(invokeResult: SDK.InvokeContractResult): ReturnValueViewConfig | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <{
    admin_account: SDK.AccountAddress.SchemaValue,
    candidates: Array<{
    url: string,
    hash: string,
    }>,
    guardians: Array<SDK.AccountAddress.SchemaValue>,
    eligible_voters: {
    url: string,
    hash: string,
    },
    election_description: string,
    election_start: SDK.Timestamp.SchemaValue,
    election_end: SDK.Timestamp.SchemaValue,
    }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FAAHAAAADQAAAGFkbWluX2FjY291bnQLCgAAAGNhbmRpZGF0ZXMQAhQAAgAAAAMAAAB1cmwWAgQAAABoYXNoHiAAAAAJAAAAZ3VhcmRpYW5zEAILDwAAAGVsaWdpYmxlX3ZvdGVycxQAAgAAAAMAAAB1cmwWAgQAAABoYXNoHiAAAAAUAAAAZWxlY3Rpb25fZGVzY3JpcHRpb24WAg4AAABlbGVjdGlvbl9zdGFydA0MAAAAZWxlY3Rpb25fZW5kDQ==');
    const field44 = schemaJson.admin_account;
    const accountAddress45 = SDK.AccountAddress.fromSchemaValue(field44);
    const field46 = schemaJson.candidates;
    const list47 = field46.map((item48) => {
    const field49 = item48.url;
    const field50 = item48.hash;
    const named51 = {
    url: field49,
    hash: field50,
    };
    return named51;
    });
    const field52 = schemaJson.guardians;
    const list53 = field52.map((item54) => {
    const accountAddress55 = SDK.AccountAddress.fromSchemaValue(item54);
    return accountAddress55;
    });
    const field56 = schemaJson.eligible_voters;
    const field57 = field56.url;
    const field58 = field56.hash;
    const named59 = {
    url: field57,
    hash: field58,
    };
    const field60 = schemaJson.election_description;
    const field61 = schemaJson.election_start;
    const timestamp62 = SDK.Timestamp.fromSchemaValue(field61);
    const field63 = schemaJson.election_end;
    const timestamp64 = SDK.Timestamp.fromSchemaValue(field63);
    const named65 = {
    admin_account: accountAddress45,
    candidates: list47,
    guardians: list53,
    eligible_voters: named59,
    election_description: field60,
    election_start: timestamp62,
    election_end: timestamp64,
    };
    return named65;
}

/** Parameter type for update transaction for 'viewElectionResult' entrypoint of the 'election' contract. */
export type ViewElectionResultParameter = SDK.Parameter.Type;

/**
 * Construct Parameter for update transactions for 'viewElectionResult' entrypoint of the 'election' contract.
 * @param {ViewElectionResultParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createViewElectionResultParameter(parameter: ViewElectionResultParameter): SDK.Parameter.Type {
    return parameter;
}

/**
 * Send an update-contract transaction to the 'viewElectionResult' entrypoint of the 'election' contract.
 * @param {ElectionContract} contractClient The client for a 'election' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {ViewElectionResultParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendViewElectionResult(contractClient: ElectionContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: ViewElectionResultParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('viewElectionResult'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createViewElectionResultParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'viewElectionResult' entrypoint of the 'election' contract.
 * @param {ElectionContract} contractClient The client for a 'election' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {ViewElectionResultParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunViewElectionResult(contractClient: ElectionContract, parameter: ViewElectionResultParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('viewElectionResult'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createViewElectionResultParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'viewElectionResult' entrypoint of the 'election' contract. */
export type ReturnValueViewElectionResult = { type: 'None'} | { type: 'Some', content: Array<{
    candidate: {
    url: string,
    hash: SDK.HexString,
    },
    cummulative_votes: number | bigint,
    }> };

/**
 * Get and parse the return value from dry-running update transaction for 'viewElectionResult' entrypoint of the 'election' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueViewElectionResult | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueViewElectionResult(invokeResult: SDK.InvokeContractResult): ReturnValueViewElectionResult | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <{'None' : [] } | {'Some' : [Array<{
    candidate: {
    url: string,
    hash: string,
    },
    cummulative_votes: bigint,
    }>] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQIAAAAEAAAATm9uZQIEAAAAU29tZQEBAAAAEAIUAAIAAAAJAAAAY2FuZGlkYXRlFAACAAAAAwAAAHVybBYCBAAAAGhhc2geIAAAABEAAABjdW1tdWxhdGl2ZV92b3RlcwU=');
    let match66: { type: 'None'} | { type: 'Some', content: Array<{
    candidate: {
    url: string,
    hash: SDK.HexString,
    },
    cummulative_votes: number | bigint,
    }> };
    if ('None' in schemaJson) {
       match66 = {
           type: 'None',
       };
    } else if ('Some' in schemaJson) {
       const variant68 = schemaJson.Some;
    const list69 = variant68[0].map((item70) => {
    const field71 = item70.candidate;
    const field72 = field71.url;
    const field73 = field71.hash;
    const named74 = {
    url: field72,
    hash: field73,
    };
    const field75 = item70.cummulative_votes;
    const named76 = {
    candidate: named74,
    cummulative_votes: field75,
    };
    return named76;
    });
       match66 = {
           type: 'Some',
           content: list69,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match66;
}

/** Error message for dry-running update transaction for 'viewElectionResult' entrypoint of the 'election' contract. */
export type ErrorMessageViewElectionResult = { type: 'ParseParams'} | { type: 'Unauthorized'} | { type: 'MalformedConfig'} | { type: 'MalformedElectionResult'} | { type: 'ElectionClosed'} | { type: 'Inconclusive'};

/**
 * Get and parse the error message from dry-running update transaction for 'viewElectionResult' entrypoint of the 'election' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageViewElectionResult | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageViewElectionResult(invokeResult: SDK.InvokeContractResult): ErrorMessageViewElectionResult | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <{'ParseParams' : [] } | {'Unauthorized' : [] } | {'MalformedConfig' : [] } | {'MalformedElectionResult' : [] } | {'ElectionClosed' : [] } | {'Inconclusive' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQYAAAALAAAAUGFyc2VQYXJhbXMCDAAAAFVuYXV0aG9yaXplZAIPAAAATWFsZm9ybWVkQ29uZmlnAhcAAABNYWxmb3JtZWRFbGVjdGlvblJlc3VsdAIOAAAARWxlY3Rpb25DbG9zZWQCDAAAAEluY29uY2x1c2l2ZQI=');
    let match77: { type: 'ParseParams'} | { type: 'Unauthorized'} | { type: 'MalformedConfig'} | { type: 'MalformedElectionResult'} | { type: 'ElectionClosed'} | { type: 'Inconclusive'};
    if ('ParseParams' in schemaJson) {
       match77 = {
           type: 'ParseParams',
       };
    } else if ('Unauthorized' in schemaJson) {
       match77 = {
           type: 'Unauthorized',
       };
    } else if ('MalformedConfig' in schemaJson) {
       match77 = {
           type: 'MalformedConfig',
       };
    } else if ('MalformedElectionResult' in schemaJson) {
       match77 = {
           type: 'MalformedElectionResult',
       };
    } else if ('ElectionClosed' in schemaJson) {
       match77 = {
           type: 'ElectionClosed',
       };
    } else if ('Inconclusive' in schemaJson) {
       match77 = {
           type: 'Inconclusive',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match77
}
