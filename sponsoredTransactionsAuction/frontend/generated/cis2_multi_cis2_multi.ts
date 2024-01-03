// @ts-nocheck
import * as SDK from "@concordium/web-sdk";

/** The reference of the smart contract module supported by the provided client. */
export const moduleReference: SDK.ModuleReference.Type = /*#__PURE__*/ SDK.ModuleReference.fromHexString('e95d15e62c8f9d80e08de180a3c0188d602a5f5ed58b8c34daa82131b9940c3a');
/** Name of the smart contract supported by this client. */
export const contractName: SDK.ContractName.Type = /*#__PURE__*/ SDK.ContractName.fromStringUnchecked('cis2_multi');

/** Smart contract client for a contract instance on chain. */
class Cis2MultiContract {
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
export async function create(grpcClient: SDK.ConcordiumGRPCClient, contractAddress: SDK.ContractAddress.Type, blockHash?: SDK.BlockHash.Type): Promise<Cis2MultiContract> {
    const genericContract = new SDK.Contract(grpcClient, contractAddress, contractName);
    await genericContract.checkOnChain({ moduleReference: moduleReference, blockHash: blockHash });
    return new Cis2MultiContract(
        grpcClient,
        contractAddress,
        genericContract
    );
}

/**
 * Construct the `Cis2MultiContract` for interacting with a 'cis2_multi' contract on chain.
 * Without checking the instance information on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @returns {Cis2MultiContract}
 */
export function createUnchecked(grpcClient: SDK.ConcordiumGRPCClient, contractAddress: SDK.ContractAddress.Type): Cis2MultiContract {
    const genericContract = new SDK.Contract(grpcClient, contractAddress, contractName);
    return new Cis2MultiContract(
        grpcClient,
        contractAddress,
        genericContract,
    );
}

/**
 * Check if the smart contract instance exists on the blockchain and whether it uses a matching contract name and module reference.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.BlockHash.Type} [blockHash] A optional block hash to use for checking information on chain, if not provided the last finalized will be used.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 */
export function checkOnChain(contractClient: Cis2MultiContract, blockHash?: SDK.BlockHash.Type): Promise<void> {
    return contractClient.genericContract.checkOnChain({moduleReference: moduleReference, blockHash: blockHash });
}

/** Contract event type for the 'cis2_multi' contract. */
export type Event = { type: 'TokenMetadata', content: {
    token_id: SDK.HexString,
    metadata_url: {
    url: string,
    hash: { type: 'None'} | { type: 'Some', content: SDK.HexString },
    },
    } } | { type: 'UpdateOperator', content: {
    update: { type: 'Remove'} | { type: 'Add'},
    owner: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    operator: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    } } | { type: 'Burn', content: {
    token_id: SDK.HexString,
    amount: number | bigint,
    owner: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    } } | { type: 'Mint', content: {
    token_id: SDK.HexString,
    amount: number | bigint,
    owner: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    } } | { type: 'Transfer', content: {
    token_id: SDK.HexString,
    amount: number | bigint,
    from: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    to: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    } };

/**
 * Parse the contract events logged by the 'cis2_multi' contract.
 * @param {SDK.ContractEvent.Type} event The unparsed contract event.
 * @returns {Event} The structured contract event.
 */
export function parseEvent(event: SDK.ContractEvent.Type): Event {
    const schemaJson = <{'TokenMetadata' : {
    token_id: string,
    metadata_url: {
    url: string,
    hash: {'None' : [] } | {'Some' : [string] },
    },
    } } | {'UpdateOperator' : {
    update: {'Remove' : [] } | {'Add' : [] },
    owner: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    operator: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    } } | {'Burn' : {
    token_id: string,
    amount: bigint,
    owner: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    } } | {'Mint' : {
    token_id: string,
    amount: bigint,
    owner: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    } } | {'Transfer' : {
    token_id: string,
    amount: bigint,
    from: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    to: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    } }>SDK.ContractEvent.parseWithSchemaTypeBase64(event, 'HwUAAAD7DQAAAFRva2VuTWV0YWRhdGEAAgAAAAgAAAB0b2tlbl9pZB0ADAAAAG1ldGFkYXRhX3VybBQAAgAAAAMAAAB1cmwWAQQAAABoYXNoFQIAAAAEAAAATm9uZQIEAAAAU29tZQEBAAAAHiAAAAD8DgAAAFVwZGF0ZU9wZXJhdG9yAAMAAAAGAAAAdXBkYXRlFQIAAAAGAAAAUmVtb3ZlAgMAAABBZGQCBQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAgAAABvcGVyYXRvchUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAz9BAAAAEJ1cm4AAwAAAAgAAAB0b2tlbl9pZB0ABgAAAGFtb3VudBslAAAABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADP4EAAAATWludAADAAAACAAAAHRva2VuX2lkHQAGAAAAYW1vdW50GyUAAAAFAAAAb3duZXIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM/wgAAABUcmFuc2ZlcgAEAAAACAAAAHRva2VuX2lkHQAGAAAAYW1vdW50GyUAAAAEAAAAZnJvbRUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwCAAAAdG8VAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM');
    let match1: { type: 'TokenMetadata', content: {
    token_id: SDK.HexString,
    metadata_url: {
    url: string,
    hash: { type: 'None'} | { type: 'Some', content: SDK.HexString },
    },
    } } | { type: 'UpdateOperator', content: {
    update: { type: 'Remove'} | { type: 'Add'},
    owner: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    operator: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    } } | { type: 'Burn', content: {
    token_id: SDK.HexString,
    amount: number | bigint,
    owner: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    } } | { type: 'Mint', content: {
    token_id: SDK.HexString,
    amount: number | bigint,
    owner: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    } } | { type: 'Transfer', content: {
    token_id: SDK.HexString,
    amount: number | bigint,
    from: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    to: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    } };
    if ('TokenMetadata' in schemaJson) {
       const variant2 = schemaJson.TokenMetadata;
    const field3 = variant2.token_id;
    const field4 = variant2.metadata_url;
    const field5 = field4.url;
    const field6 = field4.hash;
    let match7: { type: 'None'} | { type: 'Some', content: SDK.HexString };
    if ('None' in field6) {
       match7 = {
           type: 'None',
       };
    } else if ('Some' in field6) {
       const variant9 = field6.Some;
       match7 = {
           type: 'Some',
           content: variant9[0],
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named10 = {
    url: field5,
    hash: match7,
    };
    const named11 = {
    token_id: field3,
    metadata_url: named10,
    };
       match1 = {
           type: 'TokenMetadata',
           content: named11,
       };
    } else if ('UpdateOperator' in schemaJson) {
       const variant12 = schemaJson.UpdateOperator;
    const field13 = variant12.update;
    let match14: { type: 'Remove'} | { type: 'Add'};
    if ('Remove' in field13) {
       match14 = {
           type: 'Remove',
       };
    } else if ('Add' in field13) {
       match14 = {
           type: 'Add',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field17 = variant12.owner;
    let match18: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in field17) {
       const variant19 = field17.Account;
    const accountAddress20 = SDK.AccountAddress.fromSchemaValue(variant19[0]);
       match18 = {
           type: 'Account',
           content: accountAddress20,
       };
    } else if ('Contract' in field17) {
       const variant21 = field17.Contract;
    const contractAddress22 = SDK.ContractAddress.fromSchemaValue(variant21[0]);
       match18 = {
           type: 'Contract',
           content: contractAddress22,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field23 = variant12.operator;
    let match24: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in field23) {
       const variant25 = field23.Account;
    const accountAddress26 = SDK.AccountAddress.fromSchemaValue(variant25[0]);
       match24 = {
           type: 'Account',
           content: accountAddress26,
       };
    } else if ('Contract' in field23) {
       const variant27 = field23.Contract;
    const contractAddress28 = SDK.ContractAddress.fromSchemaValue(variant27[0]);
       match24 = {
           type: 'Contract',
           content: contractAddress28,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named29 = {
    update: match14,
    owner: match18,
    operator: match24,
    };
       match1 = {
           type: 'UpdateOperator',
           content: named29,
       };
    } else if ('Burn' in schemaJson) {
       const variant30 = schemaJson.Burn;
    const field31 = variant30.token_id;
    const field32 = variant30.amount;
    const field33 = variant30.owner;
    let match34: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in field33) {
       const variant35 = field33.Account;
    const accountAddress36 = SDK.AccountAddress.fromSchemaValue(variant35[0]);
       match34 = {
           type: 'Account',
           content: accountAddress36,
       };
    } else if ('Contract' in field33) {
       const variant37 = field33.Contract;
    const contractAddress38 = SDK.ContractAddress.fromSchemaValue(variant37[0]);
       match34 = {
           type: 'Contract',
           content: contractAddress38,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named39 = {
    token_id: field31,
    amount: BigInt(field32),
    owner: match34,
    };
       match1 = {
           type: 'Burn',
           content: named39,
       };
    } else if ('Mint' in schemaJson) {
       const variant40 = schemaJson.Mint;
    const field41 = variant40.token_id;
    const field42 = variant40.amount;
    const field43 = variant40.owner;
    let match44: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in field43) {
       const variant45 = field43.Account;
    const accountAddress46 = SDK.AccountAddress.fromSchemaValue(variant45[0]);
       match44 = {
           type: 'Account',
           content: accountAddress46,
       };
    } else if ('Contract' in field43) {
       const variant47 = field43.Contract;
    const contractAddress48 = SDK.ContractAddress.fromSchemaValue(variant47[0]);
       match44 = {
           type: 'Contract',
           content: contractAddress48,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named49 = {
    token_id: field41,
    amount: BigInt(field42),
    owner: match44,
    };
       match1 = {
           type: 'Mint',
           content: named49,
       };
    } else if ('Transfer' in schemaJson) {
       const variant50 = schemaJson.Transfer;
    const field51 = variant50.token_id;
    const field52 = variant50.amount;
    const field53 = variant50.from;
    let match54: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in field53) {
       const variant55 = field53.Account;
    const accountAddress56 = SDK.AccountAddress.fromSchemaValue(variant55[0]);
       match54 = {
           type: 'Account',
           content: accountAddress56,
       };
    } else if ('Contract' in field53) {
       const variant57 = field53.Contract;
    const contractAddress58 = SDK.ContractAddress.fromSchemaValue(variant57[0]);
       match54 = {
           type: 'Contract',
           content: contractAddress58,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field59 = variant50.to;
    let match60: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in field59) {
       const variant61 = field59.Account;
    const accountAddress62 = SDK.AccountAddress.fromSchemaValue(variant61[0]);
       match60 = {
           type: 'Account',
           content: accountAddress62,
       };
    } else if ('Contract' in field59) {
       const variant63 = field59.Contract;
    const contractAddress64 = SDK.ContractAddress.fromSchemaValue(variant63[0]);
       match60 = {
           type: 'Contract',
           content: contractAddress64,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named65 = {
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

/** Parameter type for update transaction for 'view' entrypoint of the 'cis2_multi' contract. */
export type ViewParameter = SDK.Parameter.Type;

/**
 * Construct Parameter for update transactions for 'view' entrypoint of the 'cis2_multi' contract.
 * @param {ViewParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createViewParameter(parameter: ViewParameter): SDK.Parameter.Type {
    return parameter;
}

/**
 * Send an update-contract transaction to the 'view' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {ViewParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendView(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: ViewParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('view'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createViewParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'view' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {ViewParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunView(contractClient: Cis2MultiContract, parameter: ViewParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('view'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createViewParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'view' entrypoint of the 'cis2_multi' contract. */
export type ReturnValueView = {
    state: Array<[{ type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type }, {
    balances: Array<[SDK.HexString, number | bigint]>,
    operators: Array<{ type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type }>,
    }]>,
    tokens: Array<SDK.HexString>,
    };

/**
 * Get and parse the return value from dry-running update transaction for 'view' entrypoint of the 'cis2_multi' contract.
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
    state: Array<[{'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] }, {
    balances: Array<[string, bigint]>,
    operators: Array<{'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] }>,
    }]>,
    tokens: Array<string>,
    }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FAACAAAABQAAAHN0YXRlEAIPFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADBQAAgAAAAgAAABiYWxhbmNlcxACDx0AGyUAAAAJAAAAb3BlcmF0b3JzEAIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMBgAAAHRva2VucxACHQA=');
    const field66 = schemaJson.state;
    const list67 = field66.map((item68) => {
    let match70: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in item68[0]) {
       const variant71 = item68[0].Account;
    const accountAddress72 = SDK.AccountAddress.fromSchemaValue(variant71[0]);
       match70 = {
           type: 'Account',
           content: accountAddress72,
       };
    } else if ('Contract' in item68[0]) {
       const variant73 = item68[0].Contract;
    const contractAddress74 = SDK.ContractAddress.fromSchemaValue(variant73[0]);
       match70 = {
           type: 'Contract',
           content: contractAddress74,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field75 = item68[1].balances;
    const list76 = field75.map((item77) => {
    const pair78: [SDK.HexString, number | bigint] = [item77[0], BigInt(item77[1])];
    return pair78;
    });
    const field79 = item68[1].operators;
    const list80 = field79.map((item81) => {
    let match82: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in item81) {
       const variant83 = item81.Account;
    const accountAddress84 = SDK.AccountAddress.fromSchemaValue(variant83[0]);
       match82 = {
           type: 'Account',
           content: accountAddress84,
       };
    } else if ('Contract' in item81) {
       const variant85 = item81.Contract;
    const contractAddress86 = SDK.ContractAddress.fromSchemaValue(variant85[0]);
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
    const named87 = {
    balances: list76,
    operators: list80,
    };
    const pair69: [{ type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type }, {
    balances: Array<[SDK.HexString, number | bigint]>,
    operators: Array<{ type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type }>,
    }] = [match70, named87];
    return pair69;
    });
    const field88 = schemaJson.tokens;
    const named91 = {
    state: list67,
    tokens: field88,
    };
    return named91;
}

/** Parameter type for update transaction for 'mint' entrypoint of the 'cis2_multi' contract. */
export type MintParameter = {
    owner: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    metadata_url: {
    url: string,
    hash: { type: 'None'} | { type: 'Some', content: SDK.HexString },
    },
    token_id: SDK.HexString,
    };

/**
 * Construct Parameter for update transactions for 'mint' entrypoint of the 'cis2_multi' contract.
 * @param {MintParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createMintParameter(parameter: MintParameter): SDK.Parameter.Type {
    const field93 = parameter.owner;
    let match94: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field93.type) {
        case 'Account':
    const accountAddress95 = SDK.AccountAddress.toSchemaValue(field93.content);
            match94 = { Account: [accountAddress95], };
        break;
        case 'Contract':
    const contractAddress96 = SDK.ContractAddress.toSchemaValue(field93.content);
            match94 = { Contract: [contractAddress96], };
        break;
    }
    const field97 = parameter.metadata_url;
    const field99 = field97.url;
    const field100 = field97.hash;
    let match101: {'None' : [] } | {'Some' : [string] };
    switch (field100.type) {
        case 'None':
            match101 = { None: [], };
        break;
        case 'Some':
            match101 = { Some: [field100.content], };
        break;
    }
    const named98 = {
    url: field99,
    hash: match101,
    };
    const field102 = parameter.token_id;
    const named92 = {
    owner: match94,
    metadata_url: named98,
    token_id: field102,
    };
    const out = SDK.Parameter.fromBase64SchemaType('FAADAAAABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAwAAABtZXRhZGF0YV91cmwUAAIAAAADAAAAdXJsFgEEAAAAaGFzaBUCAAAABAAAAE5vbmUCBAAAAFNvbWUBAQAAAB4gAAAACAAAAHRva2VuX2lkHQA=', named92);
    return out;
}

/**
 * Send an update-contract transaction to the 'mint' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {MintParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendMint(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: MintParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('mint'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createMintParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'mint' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {MintParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunMint(contractClient: Cis2MultiContract, parameter: MintParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('mint'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createMintParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'mint' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessageMint = { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };

/**
 * Get and parse the error message from dry-running update transaction for 'mint' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageMint | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageMint(invokeResult: SDK.InvokeContractResult): ErrorMessageMint | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <{'InvalidTokenId' : [] } | {'InsufficientFunds' : [] } | {'Unauthorized' : [] } | {'Custom' : [{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'InvalidContractName' : [] } | {'ContractOnly' : [] } | {'InvokeContractError' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] }] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    let match103: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match103 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match103 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match103 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant107 = schemaJson.Custom;
    let match108: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant107[0]) {
       match108 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant107[0]) {
       match108 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant107[0]) {
       match108 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant107[0]) {
       match108 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant107[0]) {
       match108 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant107[0]) {
       match108 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant107[0]) {
       match108 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant107[0]) {
       match108 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant107[0]) {
       match108 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant107[0]) {
       match108 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant107[0]) {
       match108 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant107[0]) {
       match108 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant107[0]) {
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
    return match103
}

/** Parameter type for update transaction for 'transfer' entrypoint of the 'cis2_multi' contract. */
export type TransferParameter = Array<{
    token_id: SDK.HexString,
    amount: number | bigint,
    from: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    to: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: [SDK.ContractAddress.Type, string] },
    data: SDK.HexString,
    }>;

/**
 * Construct Parameter for update transactions for 'transfer' entrypoint of the 'cis2_multi' contract.
 * @param {TransferParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createTransferParameter(parameter: TransferParameter): SDK.Parameter.Type {
    const list122 = parameter.map((item123) => {
    const field125 = item123.token_id;
    const field126 = item123.amount;
    const number127 = BigInt(field126).toString();
    const field128 = item123.from;
    let match129: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field128.type) {
        case 'Account':
    const accountAddress130 = SDK.AccountAddress.toSchemaValue(field128.content);
            match129 = { Account: [accountAddress130], };
        break;
        case 'Contract':
    const contractAddress131 = SDK.ContractAddress.toSchemaValue(field128.content);
            match129 = { Contract: [contractAddress131], };
        break;
    }
    const field132 = item123.to;
    let match133: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue, string] };
    switch (field132.type) {
        case 'Account':
    const accountAddress134 = SDK.AccountAddress.toSchemaValue(field132.content);
            match133 = { Account: [accountAddress134], };
        break;
        case 'Contract':
    const contractAddress136 = SDK.ContractAddress.toSchemaValue(field132.content[0]);
    const unnamed135: [SDK.ContractAddress.SchemaValue, string] = [contractAddress136, field132.content[1]];
            match133 = { Contract: unnamed135, };
        break;
    }
    const field137 = item123.data;
    const named124 = {
    token_id: field125,
    amount: number127,
    from: match129,
    to: match133,
    data: field137,
    };
    return named124;
    });
    const out = SDK.Parameter.fromBase64SchemaType('EAEUAAUAAAAIAAAAdG9rZW5faWQdAAYAAABhbW91bnQbJQAAAAQAAABmcm9tFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAIAAAB0bxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAgAAAAwWAQQAAABkYXRhHQE=', list122);
    return out;
}

/**
 * Send an update-contract transaction to the 'transfer' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {TransferParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendTransfer(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: TransferParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('transfer'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createTransferParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'transfer' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {TransferParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunTransfer(contractClient: Cis2MultiContract, parameter: TransferParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('transfer'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createTransferParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'transfer' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessageTransfer = { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };

/**
 * Get and parse the error message from dry-running update transaction for 'transfer' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageTransfer | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageTransfer(invokeResult: SDK.InvokeContractResult): ErrorMessageTransfer | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <{'InvalidTokenId' : [] } | {'InsufficientFunds' : [] } | {'Unauthorized' : [] } | {'Custom' : [{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'InvalidContractName' : [] } | {'ContractOnly' : [] } | {'InvokeContractError' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] }] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    let match138: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match138 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match138 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match138 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant142 = schemaJson.Custom;
    let match143: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant142[0]) {
       match143 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant142[0]) {
       match143 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant142[0]) {
       match143 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant142[0]) {
       match143 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant142[0]) {
       match143 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant142[0]) {
       match143 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant142[0]) {
       match143 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant142[0]) {
       match143 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant142[0]) {
       match143 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant142[0]) {
       match143 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant142[0]) {
       match143 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant142[0]) {
       match143 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant142[0]) {
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
    return match138
}

/** Parameter type for update transaction for 'serializationHelper' entrypoint of the 'cis2_multi' contract. */
export type SerializationHelperParameter = {
    contract_address: SDK.ContractAddress.Type,
    nonce: number | bigint,
    timestamp: SDK.Timestamp.Type,
    entry_point: string,
    payload: Array<number>,
    };

/**
 * Construct Parameter for update transactions for 'serializationHelper' entrypoint of the 'cis2_multi' contract.
 * @param {SerializationHelperParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createSerializationHelperParameter(parameter: SerializationHelperParameter): SDK.Parameter.Type {
    const field158 = parameter.contract_address;
    const contractAddress159 = SDK.ContractAddress.toSchemaValue(field158);
    const field160 = parameter.nonce;
    const number161 = BigInt(field160);
    const field162 = parameter.timestamp;
    const timestamp163 = SDK.Timestamp.toSchemaValue(field162);
    const field164 = parameter.entry_point;
    const field165 = parameter.payload;
    const named157 = {
    contract_address: contractAddress159,
    nonce: number161,
    timestamp: timestamp163,
    entry_point: field164,
    payload: field165,
    };
    const out = SDK.Parameter.fromBase64SchemaType('FAAFAAAAEAAAAGNvbnRyYWN0X2FkZHJlc3MMBQAAAG5vbmNlBQkAAAB0aW1lc3RhbXANCwAAAGVudHJ5X3BvaW50FgEHAAAAcGF5bG9hZBABAg==', named157);
    return out;
}

/**
 * Send an update-contract transaction to the 'serializationHelper' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SerializationHelperParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendSerializationHelper(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: SerializationHelperParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('serializationHelper'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createSerializationHelperParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'serializationHelper' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SerializationHelperParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunSerializationHelper(contractClient: Cis2MultiContract, parameter: SerializationHelperParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('serializationHelper'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createSerializationHelperParameter(parameter),
        blockHash
    );
}

/** Parameter type for update transaction for 'viewMessageHash' entrypoint of the 'cis2_multi' contract. */
export type ViewMessageHashParameter = {
    signature: Map<number, Map<number, { type: 'Ed25519', content: SDK.HexString }>>,
    signer: SDK.AccountAddress.Type,
    message: {
    contract_address: SDK.ContractAddress.Type,
    nonce: number | bigint,
    timestamp: SDK.Timestamp.Type,
    entry_point: string,
    payload: Array<number>,
    },
    };

/**
 * Construct Parameter for update transactions for 'viewMessageHash' entrypoint of the 'cis2_multi' contract.
 * @param {ViewMessageHashParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createViewMessageHashParameter(parameter: ViewMessageHashParameter): SDK.Parameter.Type {
    const field169 = parameter.signature;
    const map170: [number, [number, {'Ed25519' : [string] }][]][] = [...field169.entries()].map(([key171, value172]) => {
    const map173: [number, {'Ed25519' : [string] }][] = [...value172.entries()].map(([key174, value175]) => {
    let match176: {'Ed25519' : [string] };
    switch (value175.type) {
        case 'Ed25519':
            match176 = { Ed25519: [value175.content], };
        break;
    }
        return [key174, match176];
    });
        return [key171, map173];
    });
    const field177 = parameter.signer;
    const accountAddress178 = SDK.AccountAddress.toSchemaValue(field177);
    const field179 = parameter.message;
    const field181 = field179.contract_address;
    const contractAddress182 = SDK.ContractAddress.toSchemaValue(field181);
    const field183 = field179.nonce;
    const number184 = BigInt(field183);
    const field185 = field179.timestamp;
    const timestamp186 = SDK.Timestamp.toSchemaValue(field185);
    const field187 = field179.entry_point;
    const field188 = field179.payload;
    const named180 = {
    contract_address: contractAddress182,
    nonce: number184,
    timestamp: timestamp186,
    entry_point: field187,
    payload: field188,
    };
    const named168 = {
    signature: map170,
    signer: accountAddress178,
    message: named180,
    };
    const out = SDK.Parameter.fromBase64SchemaType('FAADAAAACQAAAHNpZ25hdHVyZRIAAhIAAhUBAAAABwAAAEVkMjU1MTkBAQAAAB5AAAAABgAAAHNpZ25lcgsHAAAAbWVzc2FnZRQABQAAABAAAABjb250cmFjdF9hZGRyZXNzDAUAAABub25jZQUJAAAAdGltZXN0YW1wDQsAAABlbnRyeV9wb2ludBYBBwAAAHBheWxvYWQQAQI=', named168);
    return out;
}

/**
 * Send an update-contract transaction to the 'viewMessageHash' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {ViewMessageHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendViewMessageHash(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: ViewMessageHashParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('viewMessageHash'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createViewMessageHashParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'viewMessageHash' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {ViewMessageHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunViewMessageHash(contractClient: Cis2MultiContract, parameter: ViewMessageHashParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('viewMessageHash'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createViewMessageHashParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'viewMessageHash' entrypoint of the 'cis2_multi' contract. */
export type ReturnValueViewMessageHash = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];

/**
 * Get and parse the return value from dry-running update transaction for 'viewMessageHash' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueViewMessageHash | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueViewMessageHash(invokeResult: SDK.InvokeContractResult): ReturnValueViewMessageHash | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <[number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EyAAAAAC');
    return schemaJson;
}

/** Error message for dry-running update transaction for 'viewMessageHash' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessageViewMessageHash = { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };

/**
 * Get and parse the error message from dry-running update transaction for 'viewMessageHash' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageViewMessageHash | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageViewMessageHash(invokeResult: SDK.InvokeContractResult): ErrorMessageViewMessageHash | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <{'InvalidTokenId' : [] } | {'InsufficientFunds' : [] } | {'Unauthorized' : [] } | {'Custom' : [{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'InvalidContractName' : [] } | {'ContractOnly' : [] } | {'InvokeContractError' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] }] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    let match193: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match193 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match193 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match193 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant197 = schemaJson.Custom;
    let match198: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant197[0]) {
       match198 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant197[0]) {
       match198 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant197[0]) {
       match198 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant197[0]) {
       match198 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant197[0]) {
       match198 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant197[0]) {
       match198 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant197[0]) {
       match198 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant197[0]) {
       match198 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant197[0]) {
       match198 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant197[0]) {
       match198 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant197[0]) {
       match198 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant197[0]) {
       match198 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant197[0]) {
       match198 = {
           type: 'Expired',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
       match193 = {
           type: 'Custom',
           content: match198,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match193
}

/** Parameter type for update transaction for 'permit' entrypoint of the 'cis2_multi' contract. */
export type PermitParameter = {
    signature: Map<number, Map<number, { type: 'Ed25519', content: SDK.HexString }>>,
    signer: SDK.AccountAddress.Type,
    message: {
    contract_address: SDK.ContractAddress.Type,
    nonce: number | bigint,
    timestamp: SDK.Timestamp.Type,
    entry_point: string,
    payload: Array<number>,
    },
    };

/**
 * Construct Parameter for update transactions for 'permit' entrypoint of the 'cis2_multi' contract.
 * @param {PermitParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createPermitParameter(parameter: PermitParameter): SDK.Parameter.Type {
    const field213 = parameter.signature;
    const map214: [number, [number, {'Ed25519' : [string] }][]][] = [...field213.entries()].map(([key215, value216]) => {
    const map217: [number, {'Ed25519' : [string] }][] = [...value216.entries()].map(([key218, value219]) => {
    let match220: {'Ed25519' : [string] };
    switch (value219.type) {
        case 'Ed25519':
            match220 = { Ed25519: [value219.content], };
        break;
    }
        return [key218, match220];
    });
        return [key215, map217];
    });
    const field221 = parameter.signer;
    const accountAddress222 = SDK.AccountAddress.toSchemaValue(field221);
    const field223 = parameter.message;
    const field225 = field223.contract_address;
    const contractAddress226 = SDK.ContractAddress.toSchemaValue(field225);
    const field227 = field223.nonce;
    const number228 = BigInt(field227);
    const field229 = field223.timestamp;
    const timestamp230 = SDK.Timestamp.toSchemaValue(field229);
    const field231 = field223.entry_point;
    const field232 = field223.payload;
    const named224 = {
    contract_address: contractAddress226,
    nonce: number228,
    timestamp: timestamp230,
    entry_point: field231,
    payload: field232,
    };
    const named212 = {
    signature: map214,
    signer: accountAddress222,
    message: named224,
    };
    const out = SDK.Parameter.fromBase64SchemaType('FAADAAAACQAAAHNpZ25hdHVyZRIAAhIAAhUBAAAABwAAAEVkMjU1MTkBAQAAAB5AAAAABgAAAHNpZ25lcgsHAAAAbWVzc2FnZRQABQAAABAAAABjb250cmFjdF9hZGRyZXNzDAUAAABub25jZQUJAAAAdGltZXN0YW1wDQsAAABlbnRyeV9wb2ludBYBBwAAAHBheWxvYWQQAQI=', named212);
    return out;
}

/**
 * Send an update-contract transaction to the 'permit' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {PermitParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendPermit(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: PermitParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('permit'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createPermitParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'permit' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {PermitParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunPermit(contractClient: Cis2MultiContract, parameter: PermitParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('permit'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createPermitParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'permit' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessagePermit = { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };

/**
 * Get and parse the error message from dry-running update transaction for 'permit' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessagePermit | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessagePermit(invokeResult: SDK.InvokeContractResult): ErrorMessagePermit | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <{'InvalidTokenId' : [] } | {'InsufficientFunds' : [] } | {'Unauthorized' : [] } | {'Custom' : [{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'InvalidContractName' : [] } | {'ContractOnly' : [] } | {'InvokeContractError' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] }] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    let match235: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match235 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match235 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match235 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant239 = schemaJson.Custom;
    let match240: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant239[0]) {
       match240 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant239[0]) {
       match240 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant239[0]) {
       match240 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant239[0]) {
       match240 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant239[0]) {
       match240 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant239[0]) {
       match240 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant239[0]) {
       match240 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant239[0]) {
       match240 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant239[0]) {
       match240 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant239[0]) {
       match240 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant239[0]) {
       match240 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant239[0]) {
       match240 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant239[0]) {
       match240 = {
           type: 'Expired',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
       match235 = {
           type: 'Custom',
           content: match240,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match235
}

/** Parameter type for update transaction for 'updateOperator' entrypoint of the 'cis2_multi' contract. */
export type UpdateOperatorParameter = Array<{
    update: { type: 'Remove'} | { type: 'Add'},
    operator: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    }>;

/**
 * Construct Parameter for update transactions for 'updateOperator' entrypoint of the 'cis2_multi' contract.
 * @param {UpdateOperatorParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createUpdateOperatorParameter(parameter: UpdateOperatorParameter): SDK.Parameter.Type {
    const list254 = parameter.map((item255) => {
    const field257 = item255.update;
    let match258: {'Remove' : [] } | {'Add' : [] };
    switch (field257.type) {
        case 'Remove':
            match258 = { Remove: [], };
        break;
        case 'Add':
            match258 = { Add: [], };
        break;
    }
    const field259 = item255.operator;
    let match260: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field259.type) {
        case 'Account':
    const accountAddress261 = SDK.AccountAddress.toSchemaValue(field259.content);
            match260 = { Account: [accountAddress261], };
        break;
        case 'Contract':
    const contractAddress262 = SDK.ContractAddress.toSchemaValue(field259.content);
            match260 = { Contract: [contractAddress262], };
        break;
    }
    const named256 = {
    update: match258,
    operator: match260,
    };
    return named256;
    });
    const out = SDK.Parameter.fromBase64SchemaType('EAEUAAIAAAAGAAAAdXBkYXRlFQIAAAAGAAAAUmVtb3ZlAgMAAABBZGQCCAAAAG9wZXJhdG9yFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==', list254);
    return out;
}

/**
 * Send an update-contract transaction to the 'updateOperator' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {UpdateOperatorParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendUpdateOperator(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: UpdateOperatorParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('updateOperator'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createUpdateOperatorParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'updateOperator' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {UpdateOperatorParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunUpdateOperator(contractClient: Cis2MultiContract, parameter: UpdateOperatorParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('updateOperator'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createUpdateOperatorParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'updateOperator' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessageUpdateOperator = { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };

/**
 * Get and parse the error message from dry-running update transaction for 'updateOperator' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageUpdateOperator | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageUpdateOperator(invokeResult: SDK.InvokeContractResult): ErrorMessageUpdateOperator | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <{'InvalidTokenId' : [] } | {'InsufficientFunds' : [] } | {'Unauthorized' : [] } | {'Custom' : [{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'InvalidContractName' : [] } | {'ContractOnly' : [] } | {'InvokeContractError' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] }] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    let match263: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match263 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match263 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match263 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant267 = schemaJson.Custom;
    let match268: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant267[0]) {
       match268 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant267[0]) {
       match268 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant267[0]) {
       match268 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant267[0]) {
       match268 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant267[0]) {
       match268 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant267[0]) {
       match268 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant267[0]) {
       match268 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant267[0]) {
       match268 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant267[0]) {
       match268 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant267[0]) {
       match268 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant267[0]) {
       match268 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant267[0]) {
       match268 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant267[0]) {
       match268 = {
           type: 'Expired',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
       match263 = {
           type: 'Custom',
           content: match268,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match263
}

/** Parameter type for update transaction for 'balanceOf' entrypoint of the 'cis2_multi' contract. */
export type BalanceOfParameter = Array<{
    token_id: SDK.HexString,
    address: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    }>;

/**
 * Construct Parameter for update transactions for 'balanceOf' entrypoint of the 'cis2_multi' contract.
 * @param {BalanceOfParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createBalanceOfParameter(parameter: BalanceOfParameter): SDK.Parameter.Type {
    const list282 = parameter.map((item283) => {
    const field285 = item283.token_id;
    const field286 = item283.address;
    let match287: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field286.type) {
        case 'Account':
    const accountAddress288 = SDK.AccountAddress.toSchemaValue(field286.content);
            match287 = { Account: [accountAddress288], };
        break;
        case 'Contract':
    const contractAddress289 = SDK.ContractAddress.toSchemaValue(field286.content);
            match287 = { Contract: [contractAddress289], };
        break;
    }
    const named284 = {
    token_id: field285,
    address: match287,
    };
    return named284;
    });
    const out = SDK.Parameter.fromBase64SchemaType('EAEUAAIAAAAIAAAAdG9rZW5faWQdAAcAAABhZGRyZXNzFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==', list282);
    return out;
}

/**
 * Send an update-contract transaction to the 'balanceOf' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {BalanceOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendBalanceOf(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: BalanceOfParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('balanceOf'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createBalanceOfParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'balanceOf' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {BalanceOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunBalanceOf(contractClient: Cis2MultiContract, parameter: BalanceOfParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('balanceOf'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createBalanceOfParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'balanceOf' entrypoint of the 'cis2_multi' contract. */
export type ReturnValueBalanceOf = Array<number | bigint>;

/**
 * Get and parse the return value from dry-running update transaction for 'balanceOf' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueBalanceOf | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueBalanceOf(invokeResult: SDK.InvokeContractResult): ReturnValueBalanceOf | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <Array<bigint>>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAEbJQAAAA==');
    const list290 = schemaJson.map((item291) => {
    return BigInt(item291);
    });
    return list290;
}

/** Error message for dry-running update transaction for 'balanceOf' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessageBalanceOf = { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };

/**
 * Get and parse the error message from dry-running update transaction for 'balanceOf' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageBalanceOf | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageBalanceOf(invokeResult: SDK.InvokeContractResult): ErrorMessageBalanceOf | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <{'InvalidTokenId' : [] } | {'InsufficientFunds' : [] } | {'Unauthorized' : [] } | {'Custom' : [{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'InvalidContractName' : [] } | {'ContractOnly' : [] } | {'InvokeContractError' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] }] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    let match292: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match292 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match292 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match292 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant296 = schemaJson.Custom;
    let match297: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant296[0]) {
       match297 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant296[0]) {
       match297 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant296[0]) {
       match297 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant296[0]) {
       match297 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant296[0]) {
       match297 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant296[0]) {
       match297 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant296[0]) {
       match297 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant296[0]) {
       match297 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant296[0]) {
       match297 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant296[0]) {
       match297 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant296[0]) {
       match297 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant296[0]) {
       match297 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant296[0]) {
       match297 = {
           type: 'Expired',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
       match292 = {
           type: 'Custom',
           content: match297,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match292
}

/** Parameter type for update transaction for 'operatorOf' entrypoint of the 'cis2_multi' contract. */
export type OperatorOfParameter = Array<{
    owner: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    address: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    }>;

/**
 * Construct Parameter for update transactions for 'operatorOf' entrypoint of the 'cis2_multi' contract.
 * @param {OperatorOfParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createOperatorOfParameter(parameter: OperatorOfParameter): SDK.Parameter.Type {
    const list311 = parameter.map((item312) => {
    const field314 = item312.owner;
    let match315: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field314.type) {
        case 'Account':
    const accountAddress316 = SDK.AccountAddress.toSchemaValue(field314.content);
            match315 = { Account: [accountAddress316], };
        break;
        case 'Contract':
    const contractAddress317 = SDK.ContractAddress.toSchemaValue(field314.content);
            match315 = { Contract: [contractAddress317], };
        break;
    }
    const field318 = item312.address;
    let match319: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field318.type) {
        case 'Account':
    const accountAddress320 = SDK.AccountAddress.toSchemaValue(field318.content);
            match319 = { Account: [accountAddress320], };
        break;
        case 'Contract':
    const contractAddress321 = SDK.ContractAddress.toSchemaValue(field318.content);
            match319 = { Contract: [contractAddress321], };
        break;
    }
    const named313 = {
    owner: match315,
    address: match319,
    };
    return named313;
    });
    const out = SDK.Parameter.fromBase64SchemaType('EAEUAAIAAAAFAAAAb3duZXIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMBwAAAGFkZHJlc3MVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM', list311);
    return out;
}

/**
 * Send an update-contract transaction to the 'operatorOf' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {OperatorOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendOperatorOf(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: OperatorOfParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('operatorOf'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createOperatorOfParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'operatorOf' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {OperatorOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunOperatorOf(contractClient: Cis2MultiContract, parameter: OperatorOfParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('operatorOf'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createOperatorOfParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'operatorOf' entrypoint of the 'cis2_multi' contract. */
export type ReturnValueOperatorOf = Array<boolean>;

/**
 * Get and parse the return value from dry-running update transaction for 'operatorOf' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueOperatorOf | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueOperatorOf(invokeResult: SDK.InvokeContractResult): ReturnValueOperatorOf | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <Array<boolean>>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAEB');
    return schemaJson;
}

/** Error message for dry-running update transaction for 'operatorOf' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessageOperatorOf = { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };

/**
 * Get and parse the error message from dry-running update transaction for 'operatorOf' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageOperatorOf | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageOperatorOf(invokeResult: SDK.InvokeContractResult): ErrorMessageOperatorOf | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <{'InvalidTokenId' : [] } | {'InsufficientFunds' : [] } | {'Unauthorized' : [] } | {'Custom' : [{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'InvalidContractName' : [] } | {'ContractOnly' : [] } | {'InvokeContractError' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] }] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    let match324: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match324 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match324 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match324 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant328 = schemaJson.Custom;
    let match329: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant328[0]) {
       match329 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant328[0]) {
       match329 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant328[0]) {
       match329 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant328[0]) {
       match329 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant328[0]) {
       match329 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant328[0]) {
       match329 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant328[0]) {
       match329 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant328[0]) {
       match329 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant328[0]) {
       match329 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant328[0]) {
       match329 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant328[0]) {
       match329 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant328[0]) {
       match329 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant328[0]) {
       match329 = {
           type: 'Expired',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
       match324 = {
           type: 'Custom',
           content: match329,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match324
}

/** Parameter type for update transaction for 'publicKeyOf' entrypoint of the 'cis2_multi' contract. */
export type PublicKeyOfParameter = Array<SDK.AccountAddress.Type>;

/**
 * Construct Parameter for update transactions for 'publicKeyOf' entrypoint of the 'cis2_multi' contract.
 * @param {PublicKeyOfParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createPublicKeyOfParameter(parameter: PublicKeyOfParameter): SDK.Parameter.Type {
    const list343 = parameter.map((item344) => {
    const accountAddress345 = SDK.AccountAddress.toSchemaValue(item344);
    return accountAddress345;
    });
    const out = SDK.Parameter.fromBase64SchemaType('EAEL', list343);
    return out;
}

/**
 * Send an update-contract transaction to the 'publicKeyOf' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {PublicKeyOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendPublicKeyOf(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: PublicKeyOfParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('publicKeyOf'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createPublicKeyOfParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'publicKeyOf' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {PublicKeyOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunPublicKeyOf(contractClient: Cis2MultiContract, parameter: PublicKeyOfParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('publicKeyOf'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createPublicKeyOfParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'publicKeyOf' entrypoint of the 'cis2_multi' contract. */
export type ReturnValuePublicKeyOf = Array<{ type: 'None'} | { type: 'Some', content: {
    keys: Map<number, {
    keys: Map<number, { type: 'Ed25519', content: SDK.HexString }>,
    threshold: number,
    }>,
    threshold: number,
    } }>;

/**
 * Get and parse the return value from dry-running update transaction for 'publicKeyOf' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValuePublicKeyOf | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValuePublicKeyOf(invokeResult: SDK.InvokeContractResult): ReturnValuePublicKeyOf | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <Array<{'None' : [] } | {'Some' : [{
    keys: [number, {
    keys: [number, {'Ed25519' : [string] }][],
    threshold: number,
    }][],
    threshold: number,
    }] }>>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAEVAgAAAAQAAABOb25lAgQAAABTb21lAQEAAAAUAAIAAAAEAAAAa2V5cxIAAhQAAgAAAAQAAABrZXlzEgACFQEAAAAHAAAARWQyNTUxOQEBAAAAHiAAAAAJAAAAdGhyZXNob2xkAgkAAAB0aHJlc2hvbGQC');
    const list346 = schemaJson.map((item347) => {
    let match348: { type: 'None'} | { type: 'Some', content: {
    keys: Map<number, {
    keys: Map<number, { type: 'Ed25519', content: SDK.HexString }>,
    threshold: number,
    }>,
    threshold: number,
    } };
    if ('None' in item347) {
       match348 = {
           type: 'None',
       };
    } else if ('Some' in item347) {
       const variant350 = item347.Some;
    const field351 = variant350[0].keys;
    const entries353 = field351.map(([key354, value355]) => {
    const field356 = value355.keys;
    const entries358 = field356.map(([key359, value360]) => {
    let match361: { type: 'Ed25519', content: SDK.HexString };
    if ('Ed25519' in value360) {
       const variant362 = value360.Ed25519;
       match361 = {
           type: 'Ed25519',
           content: variant362[0],
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return [key359, match361];
    });
    const map357: Map<number, { type: 'Ed25519', content: SDK.HexString }> = Map.fromEntries(entries358);
    const field363 = value355.threshold;
    const named364 = {
    keys: map357,
    threshold: field363,
    };
    return [key354, named364];
    });
    const map352: Map<number, {
    keys: Map<number, { type: 'Ed25519', content: SDK.HexString }>,
    threshold: number,
    }> = Map.fromEntries(entries353);
    const field365 = variant350[0].threshold;
    const named366 = {
    keys: map352,
    threshold: field365,
    };
       match348 = {
           type: 'Some',
           content: named366,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match348;
    });
    return list346;
}

/** Error message for dry-running update transaction for 'publicKeyOf' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessagePublicKeyOf = { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };

/**
 * Get and parse the error message from dry-running update transaction for 'publicKeyOf' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessagePublicKeyOf | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessagePublicKeyOf(invokeResult: SDK.InvokeContractResult): ErrorMessagePublicKeyOf | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <{'InvalidTokenId' : [] } | {'InsufficientFunds' : [] } | {'Unauthorized' : [] } | {'Custom' : [{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'InvalidContractName' : [] } | {'ContractOnly' : [] } | {'InvokeContractError' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] }] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    let match367: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match367 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match367 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match367 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant371 = schemaJson.Custom;
    let match372: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant371[0]) {
       match372 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant371[0]) {
       match372 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant371[0]) {
       match372 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant371[0]) {
       match372 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant371[0]) {
       match372 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant371[0]) {
       match372 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant371[0]) {
       match372 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant371[0]) {
       match372 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant371[0]) {
       match372 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant371[0]) {
       match372 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant371[0]) {
       match372 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant371[0]) {
       match372 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant371[0]) {
       match372 = {
           type: 'Expired',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
       match367 = {
           type: 'Custom',
           content: match372,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match367
}

/** Parameter type for update transaction for 'nonceOf' entrypoint of the 'cis2_multi' contract. */
export type NonceOfParameter = Array<SDK.AccountAddress.Type>;

/**
 * Construct Parameter for update transactions for 'nonceOf' entrypoint of the 'cis2_multi' contract.
 * @param {NonceOfParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createNonceOfParameter(parameter: NonceOfParameter): SDK.Parameter.Type {
    const list386 = parameter.map((item387) => {
    const accountAddress388 = SDK.AccountAddress.toSchemaValue(item387);
    return accountAddress388;
    });
    const out = SDK.Parameter.fromBase64SchemaType('EAEL', list386);
    return out;
}

/**
 * Send an update-contract transaction to the 'nonceOf' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {NonceOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendNonceOf(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: NonceOfParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('nonceOf'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createNonceOfParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'nonceOf' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {NonceOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunNonceOf(contractClient: Cis2MultiContract, parameter: NonceOfParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('nonceOf'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createNonceOfParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'nonceOf' entrypoint of the 'cis2_multi' contract. */
export type ReturnValueNonceOf = Array<number | bigint>;

/**
 * Get and parse the return value from dry-running update transaction for 'nonceOf' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueNonceOf | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueNonceOf(invokeResult: SDK.InvokeContractResult): ReturnValueNonceOf | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <Array<bigint>>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAEF');
    return schemaJson;
}

/** Error message for dry-running update transaction for 'nonceOf' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessageNonceOf = { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };

/**
 * Get and parse the error message from dry-running update transaction for 'nonceOf' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageNonceOf | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageNonceOf(invokeResult: SDK.InvokeContractResult): ErrorMessageNonceOf | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <{'InvalidTokenId' : [] } | {'InsufficientFunds' : [] } | {'Unauthorized' : [] } | {'Custom' : [{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'InvalidContractName' : [] } | {'ContractOnly' : [] } | {'InvokeContractError' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] }] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    let match391: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match391 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match391 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match391 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant395 = schemaJson.Custom;
    let match396: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant395[0]) {
       match396 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant395[0]) {
       match396 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant395[0]) {
       match396 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant395[0]) {
       match396 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant395[0]) {
       match396 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant395[0]) {
       match396 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant395[0]) {
       match396 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant395[0]) {
       match396 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant395[0]) {
       match396 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant395[0]) {
       match396 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant395[0]) {
       match396 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant395[0]) {
       match396 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant395[0]) {
       match396 = {
           type: 'Expired',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
       match391 = {
           type: 'Custom',
           content: match396,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match391
}

/** Parameter type for update transaction for 'tokenMetadata' entrypoint of the 'cis2_multi' contract. */
export type TokenMetadataParameter = Array<SDK.HexString>;

/**
 * Construct Parameter for update transactions for 'tokenMetadata' entrypoint of the 'cis2_multi' contract.
 * @param {TokenMetadataParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createTokenMetadataParameter(parameter: TokenMetadataParameter): SDK.Parameter.Type {
    const out = SDK.Parameter.fromBase64SchemaType('EAEdAA==', parameter);
    return out;
}

/**
 * Send an update-contract transaction to the 'tokenMetadata' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {TokenMetadataParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendTokenMetadata(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: TokenMetadataParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('tokenMetadata'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createTokenMetadataParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'tokenMetadata' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {TokenMetadataParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunTokenMetadata(contractClient: Cis2MultiContract, parameter: TokenMetadataParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('tokenMetadata'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createTokenMetadataParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'tokenMetadata' entrypoint of the 'cis2_multi' contract. */
export type ReturnValueTokenMetadata = Array<{
    url: string,
    hash: { type: 'None'} | { type: 'Some', content: SDK.HexString },
    }>;

/**
 * Get and parse the return value from dry-running update transaction for 'tokenMetadata' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueTokenMetadata | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueTokenMetadata(invokeResult: SDK.InvokeContractResult): ReturnValueTokenMetadata | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <Array<{
    url: string,
    hash: {'None' : [] } | {'Some' : [string] },
    }>>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAEUAAIAAAADAAAAdXJsFgEEAAAAaGFzaBUCAAAABAAAAE5vbmUCBAAAAFNvbWUBAQAAAB4gAAAA');
    const list412 = schemaJson.map((item413) => {
    const field414 = item413.url;
    const field415 = item413.hash;
    let match416: { type: 'None'} | { type: 'Some', content: SDK.HexString };
    if ('None' in field415) {
       match416 = {
           type: 'None',
       };
    } else if ('Some' in field415) {
       const variant418 = field415.Some;
       match416 = {
           type: 'Some',
           content: variant418[0],
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named419 = {
    url: field414,
    hash: match416,
    };
    return named419;
    });
    return list412;
}

/** Error message for dry-running update transaction for 'tokenMetadata' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessageTokenMetadata = { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };

/**
 * Get and parse the error message from dry-running update transaction for 'tokenMetadata' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageTokenMetadata | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageTokenMetadata(invokeResult: SDK.InvokeContractResult): ErrorMessageTokenMetadata | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <{'InvalidTokenId' : [] } | {'InsufficientFunds' : [] } | {'Unauthorized' : [] } | {'Custom' : [{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'InvalidContractName' : [] } | {'ContractOnly' : [] } | {'InvokeContractError' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] }] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    let match420: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match420 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match420 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match420 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant424 = schemaJson.Custom;
    let match425: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant424[0]) {
       match425 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant424[0]) {
       match425 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant424[0]) {
       match425 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant424[0]) {
       match425 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant424[0]) {
       match425 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant424[0]) {
       match425 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant424[0]) {
       match425 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant424[0]) {
       match425 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant424[0]) {
       match425 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant424[0]) {
       match425 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant424[0]) {
       match425 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant424[0]) {
       match425 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant424[0]) {
       match425 = {
           type: 'Expired',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
       match420 = {
           type: 'Custom',
           content: match425,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match420
}

/** Parameter type for update transaction for 'onReceivingCIS2' entrypoint of the 'cis2_multi' contract. */
export type OnReceivingCIS2Parameter = SDK.Parameter.Type;

/**
 * Construct Parameter for update transactions for 'onReceivingCIS2' entrypoint of the 'cis2_multi' contract.
 * @param {OnReceivingCIS2Parameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createOnReceivingCIS2Parameter(parameter: OnReceivingCIS2Parameter): SDK.Parameter.Type {
    return parameter;
}

/**
 * Send an update-contract transaction to the 'onReceivingCIS2' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {OnReceivingCIS2Parameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendOnReceivingCIS2(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: OnReceivingCIS2Parameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('onReceivingCIS2'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createOnReceivingCIS2Parameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'onReceivingCIS2' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {OnReceivingCIS2Parameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunOnReceivingCIS2(contractClient: Cis2MultiContract, parameter: OnReceivingCIS2Parameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('onReceivingCIS2'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createOnReceivingCIS2Parameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'onReceivingCIS2' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessageOnReceivingCIS2 = { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };

/**
 * Get and parse the error message from dry-running update transaction for 'onReceivingCIS2' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageOnReceivingCIS2 | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageOnReceivingCIS2(invokeResult: SDK.InvokeContractResult): ErrorMessageOnReceivingCIS2 | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <{'InvalidTokenId' : [] } | {'InsufficientFunds' : [] } | {'Unauthorized' : [] } | {'Custom' : [{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'InvalidContractName' : [] } | {'ContractOnly' : [] } | {'InvokeContractError' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] }] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    let match439: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match439 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match439 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match439 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant443 = schemaJson.Custom;
    let match444: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant443[0]) {
       match444 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant443[0]) {
       match444 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant443[0]) {
       match444 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant443[0]) {
       match444 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant443[0]) {
       match444 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant443[0]) {
       match444 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant443[0]) {
       match444 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant443[0]) {
       match444 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant443[0]) {
       match444 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant443[0]) {
       match444 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant443[0]) {
       match444 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant443[0]) {
       match444 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant443[0]) {
       match444 = {
           type: 'Expired',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
       match439 = {
           type: 'Custom',
           content: match444,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match439
}

/** Parameter type for update transaction for 'supports' entrypoint of the 'cis2_multi' contract. */
export type SupportsParameter = Array<string>;

/**
 * Construct Parameter for update transactions for 'supports' entrypoint of the 'cis2_multi' contract.
 * @param {SupportsParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createSupportsParameter(parameter: SupportsParameter): SDK.Parameter.Type {
    const out = SDK.Parameter.fromBase64SchemaType('EAEWAA==', parameter);
    return out;
}

/**
 * Send an update-contract transaction to the 'supports' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SupportsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendSupports(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: SupportsParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('supports'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createSupportsParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'supports' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SupportsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunSupports(contractClient: Cis2MultiContract, parameter: SupportsParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('supports'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createSupportsParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'supports' entrypoint of the 'cis2_multi' contract. */
export type ReturnValueSupports = Array<{ type: 'NoSupport'} | { type: 'Support'} | { type: 'SupportBy', content: Array<SDK.ContractAddress.Type> }>;

/**
 * Get and parse the return value from dry-running update transaction for 'supports' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueSupports | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueSupports(invokeResult: SDK.InvokeContractResult): ReturnValueSupports | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <Array<{'NoSupport' : [] } | {'Support' : [] } | {'SupportBy' : [Array<SDK.ContractAddress.SchemaValue>] }>>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAEVAwAAAAkAAABOb1N1cHBvcnQCBwAAAFN1cHBvcnQCCQAAAFN1cHBvcnRCeQEBAAAAEAAM');
    const list460 = schemaJson.map((item461) => {
    let match462: { type: 'NoSupport'} | { type: 'Support'} | { type: 'SupportBy', content: Array<SDK.ContractAddress.Type> };
    if ('NoSupport' in item461) {
       match462 = {
           type: 'NoSupport',
       };
    } else if ('Support' in item461) {
       match462 = {
           type: 'Support',
       };
    } else if ('SupportBy' in item461) {
       const variant465 = item461.SupportBy;
    const list466 = variant465[0].map((item467) => {
    const contractAddress468 = SDK.ContractAddress.fromSchemaValue(item467);
    return contractAddress468;
    });
       match462 = {
           type: 'SupportBy',
           content: list466,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match462;
    });
    return list460;
}

/** Error message for dry-running update transaction for 'supports' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessageSupports = { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };

/**
 * Get and parse the error message from dry-running update transaction for 'supports' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageSupports | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageSupports(invokeResult: SDK.InvokeContractResult): ErrorMessageSupports | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <{'InvalidTokenId' : [] } | {'InsufficientFunds' : [] } | {'Unauthorized' : [] } | {'Custom' : [{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'InvalidContractName' : [] } | {'ContractOnly' : [] } | {'InvokeContractError' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] }] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    let match469: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match469 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match469 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match469 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant473 = schemaJson.Custom;
    let match474: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant473[0]) {
       match474 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant473[0]) {
       match474 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant473[0]) {
       match474 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant473[0]) {
       match474 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant473[0]) {
       match474 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant473[0]) {
       match474 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant473[0]) {
       match474 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant473[0]) {
       match474 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant473[0]) {
       match474 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant473[0]) {
       match474 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant473[0]) {
       match474 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant473[0]) {
       match474 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant473[0]) {
       match474 = {
           type: 'Expired',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
       match469 = {
           type: 'Custom',
           content: match474,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match469
}

/** Parameter type for update transaction for 'supportsPermit' entrypoint of the 'cis2_multi' contract. */
export type SupportsPermitParameter = {
    queries: Array<string>,
    };

/**
 * Construct Parameter for update transactions for 'supportsPermit' entrypoint of the 'cis2_multi' contract.
 * @param {SupportsPermitParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createSupportsPermitParameter(parameter: SupportsPermitParameter): SDK.Parameter.Type {
    const field489 = parameter.queries;
    const named488 = {
    queries: field489,
    };
    const out = SDK.Parameter.fromBase64SchemaType('FAABAAAABwAAAHF1ZXJpZXMQARYB', named488);
    return out;
}

/**
 * Send an update-contract transaction to the 'supportsPermit' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SupportsPermitParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendSupportsPermit(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: SupportsPermitParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('supportsPermit'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createSupportsPermitParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'supportsPermit' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SupportsPermitParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunSupportsPermit(contractClient: Cis2MultiContract, parameter: SupportsPermitParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('supportsPermit'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createSupportsPermitParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'supportsPermit' entrypoint of the 'cis2_multi' contract. */
export type ReturnValueSupportsPermit = Array<{ type: 'NoSupport'} | { type: 'Support'} | { type: 'SupportBy', content: Array<SDK.ContractAddress.Type> }>;

/**
 * Get and parse the return value from dry-running update transaction for 'supportsPermit' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueSupportsPermit | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueSupportsPermit(invokeResult: SDK.InvokeContractResult): ReturnValueSupportsPermit | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <Array<{'NoSupport' : [] } | {'Support' : [] } | {'SupportBy' : [Array<SDK.ContractAddress.SchemaValue>] }>>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAEVAwAAAAkAAABOb1N1cHBvcnQCBwAAAFN1cHBvcnQCCQAAAFN1cHBvcnRCeQEBAAAAEAAM');
    const list492 = schemaJson.map((item493) => {
    let match494: { type: 'NoSupport'} | { type: 'Support'} | { type: 'SupportBy', content: Array<SDK.ContractAddress.Type> };
    if ('NoSupport' in item493) {
       match494 = {
           type: 'NoSupport',
       };
    } else if ('Support' in item493) {
       match494 = {
           type: 'Support',
       };
    } else if ('SupportBy' in item493) {
       const variant497 = item493.SupportBy;
    const list498 = variant497[0].map((item499) => {
    const contractAddress500 = SDK.ContractAddress.fromSchemaValue(item499);
    return contractAddress500;
    });
       match494 = {
           type: 'SupportBy',
           content: list498,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match494;
    });
    return list492;
}

/** Error message for dry-running update transaction for 'supportsPermit' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessageSupportsPermit = { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };

/**
 * Get and parse the error message from dry-running update transaction for 'supportsPermit' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageSupportsPermit | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageSupportsPermit(invokeResult: SDK.InvokeContractResult): ErrorMessageSupportsPermit | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <{'InvalidTokenId' : [] } | {'InsufficientFunds' : [] } | {'Unauthorized' : [] } | {'Custom' : [{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'InvalidContractName' : [] } | {'ContractOnly' : [] } | {'InvokeContractError' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] }] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    let match501: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match501 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match501 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match501 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant505 = schemaJson.Custom;
    let match506: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant505[0]) {
       match506 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant505[0]) {
       match506 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant505[0]) {
       match506 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant505[0]) {
       match506 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant505[0]) {
       match506 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant505[0]) {
       match506 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant505[0]) {
       match506 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant505[0]) {
       match506 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant505[0]) {
       match506 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant505[0]) {
       match506 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant505[0]) {
       match506 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant505[0]) {
       match506 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant505[0]) {
       match506 = {
           type: 'Expired',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
       match501 = {
           type: 'Custom',
           content: match506,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match501
}

/** Parameter type for update transaction for 'setImplementors' entrypoint of the 'cis2_multi' contract. */
export type SetImplementorsParameter = {
    id: string,
    implementors: Array<SDK.ContractAddress.Type>,
    };

/**
 * Construct Parameter for update transactions for 'setImplementors' entrypoint of the 'cis2_multi' contract.
 * @param {SetImplementorsParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createSetImplementorsParameter(parameter: SetImplementorsParameter): SDK.Parameter.Type {
    const field521 = parameter.id;
    const field522 = parameter.implementors;
    const list523 = field522.map((item524) => {
    const contractAddress525 = SDK.ContractAddress.toSchemaValue(item524);
    return contractAddress525;
    });
    const named520 = {
    id: field521,
    implementors: list523,
    };
    const out = SDK.Parameter.fromBase64SchemaType('FAACAAAAAgAAAGlkFgAMAAAAaW1wbGVtZW50b3JzEAIM', named520);
    return out;
}

/**
 * Send an update-contract transaction to the 'setImplementors' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SetImplementorsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendSetImplementors(contractClient: Cis2MultiContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: SetImplementorsParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('setImplementors'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createSetImplementorsParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'setImplementors' entrypoint of the 'cis2_multi' contract.
 * @param {Cis2MultiContract} contractClient The client for a 'cis2_multi' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SetImplementorsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunSetImplementors(contractClient: Cis2MultiContract, parameter: SetImplementorsParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('setImplementors'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createSetImplementorsParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'setImplementors' entrypoint of the 'cis2_multi' contract. */
export type ErrorMessageSetImplementors = { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };

/**
 * Get and parse the error message from dry-running update transaction for 'setImplementors' entrypoint of the 'cis2_multi' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageSetImplementors | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageSetImplementors(invokeResult: SDK.InvokeContractResult): ErrorMessageSetImplementors | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    const schemaJson = <{'InvalidTokenId' : [] } | {'InsufficientFunds' : [] } | {'Unauthorized' : [] } | {'Custom' : [{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'InvalidContractName' : [] } | {'ContractOnly' : [] } | {'InvokeContractError' : [] } | {'MissingAccount' : [] } | {'MalformedData' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'WrongContract' : [] } | {'WrongEntryPoint' : [] } | {'Expired' : [] }] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFQ0AAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAg4AAABNaXNzaW5nQWNjb3VudAINAAAATWFsZm9ybWVkRGF0YQIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCDQAAAFdyb25nQ29udHJhY3QCDwAAAFdyb25nRW50cnlQb2ludAIHAAAARXhwaXJlZAI=');
    let match526: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match526 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match526 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match526 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant530 = schemaJson.Custom;
    let match531: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant530[0]) {
       match531 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant530[0]) {
       match531 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant530[0]) {
       match531 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant530[0]) {
       match531 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant530[0]) {
       match531 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant530[0]) {
       match531 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant530[0]) {
       match531 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant530[0]) {
       match531 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant530[0]) {
       match531 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant530[0]) {
       match531 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant530[0]) {
       match531 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant530[0]) {
       match531 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant530[0]) {
       match531 = {
           type: 'Expired',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
       match526 = {
           type: 'Custom',
           content: match531,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match526
}
