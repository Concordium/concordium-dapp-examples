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
    amount: string,
    owner: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    } } | {'Mint' : {
    token_id: string,
    amount: string,
    owner: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    } } | {'Transfer' : {
    token_id: string,
    amount: string,
    from: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    to: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    } }>SDK.ContractEvent.parseWithSchemaTypeBase64(event, 'HwUAAAD7DQAAAFRva2VuTWV0YWRhdGEAAgAAAAgAAAB0b2tlbl9pZB0ADAAAAG1ldGFkYXRhX3VybBQAAgAAAAMAAAB1cmwWAQQAAABoYXNoFQIAAAAEAAAATm9uZQIEAAAAU29tZQEBAAAAHiAAAAD8DgAAAFVwZGF0ZU9wZXJhdG9yAAMAAAAGAAAAdXBkYXRlFQIAAAAGAAAAUmVtb3ZlAgMAAABBZGQCBQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAgAAABvcGVyYXRvchUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAz9BAAAAEJ1cm4AAwAAAAgAAAB0b2tlbl9pZB0ABgAAAGFtb3VudBslAAAABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADP4EAAAATWludAADAAAACAAAAHRva2VuX2lkHQAGAAAAYW1vdW50GyUAAAAFAAAAb3duZXIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM/wgAAABUcmFuc2ZlcgAEAAAACAAAAHRva2VuX2lkHQAGAAAAYW1vdW50GyUAAAAEAAAAZnJvbRUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwCAAAAdG8VAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM');
    let match4: { type: 'TokenMetadata', content: {
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
       const variant5 = schemaJson.TokenMetadata;
    const field6 = variant5.token_id;
    const field7 = variant5.metadata_url;
    const field8 = field7.url;
    const field9 = field7.hash;
    let match10: { type: 'None'} | { type: 'Some', content: SDK.HexString };
    if ('None' in field9) {
       match10 = {
           type: 'None',
       };
    } else if ('Some' in field9) {
       const variant12 = field9.Some;
       match10 = {
           type: 'Some',
           content: variant12[0],
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named13 = {
    url: field8,
    hash: match10,
    };
    const named14 = {
    token_id: field6,
    metadata_url: named13,
    };
       match4 = {
           type: 'TokenMetadata',
           content: named14,
       };
    } else if ('UpdateOperator' in schemaJson) {
       const variant15 = schemaJson.UpdateOperator;
    const field16 = variant15.update;
    let match17: { type: 'Remove'} | { type: 'Add'};
    if ('Remove' in field16) {
       match17 = {
           type: 'Remove',
       };
    } else if ('Add' in field16) {
       match17 = {
           type: 'Add',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field20 = variant15.owner;
    let match21: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in field20) {
       const variant22 = field20.Account;
    const accountAddress23 = SDK.AccountAddress.fromSchemaValue(variant22[0]);
       match21 = {
           type: 'Account',
           content: accountAddress23,
       };
    } else if ('Contract' in field20) {
       const variant24 = field20.Contract;
    const contractAddress25 = SDK.ContractAddress.fromSchemaValue(variant24[0]);
       match21 = {
           type: 'Contract',
           content: contractAddress25,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field26 = variant15.operator;
    let match27: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in field26) {
       const variant28 = field26.Account;
    const accountAddress29 = SDK.AccountAddress.fromSchemaValue(variant28[0]);
       match27 = {
           type: 'Account',
           content: accountAddress29,
       };
    } else if ('Contract' in field26) {
       const variant30 = field26.Contract;
    const contractAddress31 = SDK.ContractAddress.fromSchemaValue(variant30[0]);
       match27 = {
           type: 'Contract',
           content: contractAddress31,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named32 = {
    update: match17,
    owner: match21,
    operator: match27,
    };
       match4 = {
           type: 'UpdateOperator',
           content: named32,
       };
    } else if ('Burn' in schemaJson) {
       const variant33 = schemaJson.Burn;
    const field34 = variant33.token_id;
    const field35 = variant33.amount;
    const leb1 = BigInt(field35);
    const field36 = variant33.owner;
    let match37: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in field36) {
       const variant38 = field36.Account;
    const accountAddress39 = SDK.AccountAddress.fromSchemaValue(variant38[0]);
       match37 = {
           type: 'Account',
           content: accountAddress39,
       };
    } else if ('Contract' in field36) {
       const variant40 = field36.Contract;
    const contractAddress41 = SDK.ContractAddress.fromSchemaValue(variant40[0]);
       match37 = {
           type: 'Contract',
           content: contractAddress41,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named42 = {
    token_id: field34,
    amount: leb1,
    owner: match37,
    };
       match4 = {
           type: 'Burn',
           content: named42,
       };
    } else if ('Mint' in schemaJson) {
       const variant43 = schemaJson.Mint;
    const field44 = variant43.token_id;
    const field45 = variant43.amount;
    const leb2 = BigInt(field45);
    const field46 = variant43.owner;
    let match47: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in field46) {
       const variant48 = field46.Account;
    const accountAddress49 = SDK.AccountAddress.fromSchemaValue(variant48[0]);
       match47 = {
           type: 'Account',
           content: accountAddress49,
       };
    } else if ('Contract' in field46) {
       const variant50 = field46.Contract;
    const contractAddress51 = SDK.ContractAddress.fromSchemaValue(variant50[0]);
       match47 = {
           type: 'Contract',
           content: contractAddress51,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named52 = {
    token_id: field44,
    amount: leb2,
    owner: match47,
    };
       match4 = {
           type: 'Mint',
           content: named52,
       };
    } else if ('Transfer' in schemaJson) {
       const variant53 = schemaJson.Transfer;
    const field54 = variant53.token_id;
    const field55 = variant53.amount;
    const leb3 = BigInt(field55);
    const field56 = variant53.from;
    let match57: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in field56) {
       const variant58 = field56.Account;
    const accountAddress59 = SDK.AccountAddress.fromSchemaValue(variant58[0]);
       match57 = {
           type: 'Account',
           content: accountAddress59,
       };
    } else if ('Contract' in field56) {
       const variant60 = field56.Contract;
    const contractAddress61 = SDK.ContractAddress.fromSchemaValue(variant60[0]);
       match57 = {
           type: 'Contract',
           content: contractAddress61,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field62 = variant53.to;
    let match63: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in field62) {
       const variant64 = field62.Account;
    const accountAddress65 = SDK.AccountAddress.fromSchemaValue(variant64[0]);
       match63 = {
           type: 'Account',
           content: accountAddress65,
       };
    } else if ('Contract' in field62) {
       const variant66 = field62.Contract;
    const contractAddress67 = SDK.ContractAddress.fromSchemaValue(variant66[0]);
       match63 = {
           type: 'Contract',
           content: contractAddress67,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named68 = {
    token_id: field54,
    amount: leb3,
    from: match57,
    to: match63,
    };
       match4 = {
           type: 'Transfer',
           content: named68,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match4;
}
/** Parameter type  used in update transaction for 'view' entrypoint of the 'cis2_multi' contract. */
export type ViewParameter = SDK.Parameter.Type;

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
        parameter,
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
        parameter,
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
    balances: Array<[string, string]>,
    operators: Array<{'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] }>,
    }]>,
    tokens: Array<string>,
    }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FAACAAAABQAAAHN0YXRlEAIPFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADBQAAgAAAAgAAABiYWxhbmNlcxACDx0AGyUAAAAJAAAAb3BlcmF0b3JzEAIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMBgAAAHRva2VucxACHQA=');
    const field70 = schemaJson.state;
    const list71 = field70.map((item72) => {
    let match74: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in item72[0]) {
       const variant75 = item72[0].Account;
    const accountAddress76 = SDK.AccountAddress.fromSchemaValue(variant75[0]);
       match74 = {
           type: 'Account',
           content: accountAddress76,
       };
    } else if ('Contract' in item72[0]) {
       const variant77 = item72[0].Contract;
    const contractAddress78 = SDK.ContractAddress.fromSchemaValue(variant77[0]);
       match74 = {
           type: 'Contract',
           content: contractAddress78,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    const field79 = item72[1].balances;
    const list80 = field79.map((item81) => {
    const leb69 = BigInt(item81[1]);
    const pair82: [SDK.HexString, number | bigint] = [item81[0], leb69];
    return pair82;
    });
    const field83 = item72[1].operators;
    const list84 = field83.map((item85) => {
    let match86: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in item85) {
       const variant87 = item85.Account;
    const accountAddress88 = SDK.AccountAddress.fromSchemaValue(variant87[0]);
       match86 = {
           type: 'Account',
           content: accountAddress88,
       };
    } else if ('Contract' in item85) {
       const variant89 = item85.Contract;
    const contractAddress90 = SDK.ContractAddress.fromSchemaValue(variant89[0]);
       match86 = {
           type: 'Contract',
           content: contractAddress90,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match86;
    });
    const named91 = {
    balances: list80,
    operators: list84,
    };
    const pair73: [{ type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type }, {
    balances: Array<[SDK.HexString, number | bigint]>,
    operators: Array<{ type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type }>,
    }] = [match74, named91];
    return pair73;
    });
    const field92 = schemaJson.tokens;
    const named95 = {
    state: list71,
    tokens: field92,
    };
    return named95;
}
/** Base64 encoding of the parameter schema type for update transactions to 'mint' entrypoint of the 'cis2_multi' contract. */
const base64MintParameterSchema = 'FAADAAAABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAwAAABtZXRhZGF0YV91cmwUAAIAAAADAAAAdXJsFgEEAAAAaGFzaBUCAAAABAAAAE5vbmUCBAAAAFNvbWUBAQAAAB4gAAAACAAAAHRva2VuX2lkHQA=';
/** Parameter JSON type needed by the schema for update transaction for 'mint' entrypoint of the 'cis2_multi' contract. */
type MintParameterSchemaJson = {
    owner: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    metadata_url: {
    url: string,
    hash: {'None' : [] } | {'Some' : [string] },
    },
    token_id: string,
    };
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
 * Construct schema JSON representation used in update transaction for 'mint' entrypoint of the 'cis2_multi' contract.
 * @param {MintParameter} parameter The structured parameter to construct from.
 * @returns {MintParameterSchemaJson} The smart contract parameter JSON.
 */
function createMintParameterSchemaJson(parameter: MintParameter): MintParameterSchemaJson {
    const field97 = parameter.owner;
    let match98: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field97.type) {
        case 'Account':
    const accountAddress99 = SDK.AccountAddress.toSchemaValue(field97.content);
            match98 = { Account: [accountAddress99], };
        break;
        case 'Contract':
    const contractAddress100 = SDK.ContractAddress.toSchemaValue(field97.content);
            match98 = { Contract: [contractAddress100], };
        break;
    }

    const field101 = parameter.metadata_url;
    const field103 = field101.url;
    const field104 = field101.hash;
    let match105: {'None' : [] } | {'Some' : [string] };
    switch (field104.type) {
        case 'None':
            match105 = { None: [], };
        break;
        case 'Some':
            match105 = { Some: [field104.content], };
        break;
    }

    const named102 = {
    url: field103,
    hash: match105,
    };
    const field106 = parameter.token_id;
    const named96 = {
    owner: match98,
    metadata_url: named102,
    token_id: field106,
    };
    return named96;
}

/**
 * Construct Parameter type used in update transaction for 'mint' entrypoint of the 'cis2_multi' contract.
 * @param {MintParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createMintParameter(parameter: MintParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64MintParameterSchema, createMintParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'mint' entrypoint of the 'cis2_multi' contract.
 * @param {MintParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createMintParameterWebWallet(parameter: MintParameter) {
    return {
        parameters: createMintParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64MintParameterSchema, 'base64')
        },
    }
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
    let match107: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match107 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match107 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match107 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant111 = schemaJson.Custom;
    let match112: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant111[0]) {
       match112 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant111[0]) {
       match112 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant111[0]) {
       match112 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant111[0]) {
       match112 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant111[0]) {
       match112 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant111[0]) {
       match112 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant111[0]) {
       match112 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant111[0]) {
       match112 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant111[0]) {
       match112 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant111[0]) {
       match112 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant111[0]) {
       match112 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant111[0]) {
       match112 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant111[0]) {
       match112 = {
           type: 'Expired',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
       match107 = {
           type: 'Custom',
           content: match112,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match107
}
/** Base64 encoding of the parameter schema type for update transactions to 'transfer' entrypoint of the 'cis2_multi' contract. */
const base64TransferParameterSchema = 'EAEUAAUAAAAIAAAAdG9rZW5faWQdAAYAAABhbW91bnQbJQAAAAQAAABmcm9tFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAIAAAB0bxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAgAAAAwWAQQAAABkYXRhHQE=';
/** Parameter JSON type needed by the schema for update transaction for 'transfer' entrypoint of the 'cis2_multi' contract. */
type TransferParameterSchemaJson = Array<{
    token_id: string,
    amount: string,
    from: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    to: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue, string] },
    data: string,
    }>;
/** Parameter type for update transaction for 'transfer' entrypoint of the 'cis2_multi' contract. */
export type TransferParameter = Array<{
    token_id: SDK.HexString,
    amount: number | bigint,
    from: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    to: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: [SDK.ContractAddress.Type, string] },
    data: SDK.HexString,
    }>;

/**
 * Construct schema JSON representation used in update transaction for 'transfer' entrypoint of the 'cis2_multi' contract.
 * @param {TransferParameter} parameter The structured parameter to construct from.
 * @returns {TransferParameterSchemaJson} The smart contract parameter JSON.
 */
function createTransferParameterSchemaJson(parameter: TransferParameter): TransferParameterSchemaJson {
    const list127 = parameter.map((item128) => {
    const field130 = item128.token_id;
    const field131 = item128.amount;
    const leb126 = BigInt(field131).toString();
    const field132 = item128.from;
    let match133: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field132.type) {
        case 'Account':
    const accountAddress134 = SDK.AccountAddress.toSchemaValue(field132.content);
            match133 = { Account: [accountAddress134], };
        break;
        case 'Contract':
    const contractAddress135 = SDK.ContractAddress.toSchemaValue(field132.content);
            match133 = { Contract: [contractAddress135], };
        break;
    }

    const field136 = item128.to;
    let match137: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue, string] };
    switch (field136.type) {
        case 'Account':
    const accountAddress138 = SDK.AccountAddress.toSchemaValue(field136.content);
            match137 = { Account: [accountAddress138], };
        break;
        case 'Contract':
    const contractAddress140 = SDK.ContractAddress.toSchemaValue(field136.content[0]);
    const unnamed139: [SDK.ContractAddress.SchemaValue, string] = [contractAddress140, field136.content[1]];
            match137 = { Contract: unnamed139, };
        break;
    }

    const field141 = item128.data;
    const named129 = {
    token_id: field130,
    amount: leb126,
    from: match133,
    to: match137,
    data: field141,
    };
    return named129;
    });
    return list127;
}

/**
 * Construct Parameter type used in update transaction for 'transfer' entrypoint of the 'cis2_multi' contract.
 * @param {TransferParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createTransferParameter(parameter: TransferParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64TransferParameterSchema, createTransferParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'transfer' entrypoint of the 'cis2_multi' contract.
 * @param {TransferParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createTransferParameterWebWallet(parameter: TransferParameter) {
    return {
        parameters: createTransferParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64TransferParameterSchema, 'base64')
        },
    }
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
    let match142: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match142 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match142 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match142 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant146 = schemaJson.Custom;
    let match147: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant146[0]) {
       match147 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant146[0]) {
       match147 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant146[0]) {
       match147 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant146[0]) {
       match147 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant146[0]) {
       match147 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant146[0]) {
       match147 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant146[0]) {
       match147 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant146[0]) {
       match147 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant146[0]) {
       match147 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant146[0]) {
       match147 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant146[0]) {
       match147 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant146[0]) {
       match147 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant146[0]) {
       match147 = {
           type: 'Expired',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
       match142 = {
           type: 'Custom',
           content: match147,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match142
}
/** Base64 encoding of the parameter schema type for update transactions to 'serializationHelper' entrypoint of the 'cis2_multi' contract. */
const base64SerializationHelperParameterSchema = 'FAAFAAAAEAAAAGNvbnRyYWN0X2FkZHJlc3MMBQAAAG5vbmNlBQkAAAB0aW1lc3RhbXANCwAAAGVudHJ5X3BvaW50FgEHAAAAcGF5bG9hZBABAg==';
/** Parameter JSON type needed by the schema for update transaction for 'serializationHelper' entrypoint of the 'cis2_multi' contract. */
type SerializationHelperParameterSchemaJson = {
    contract_address: SDK.ContractAddress.SchemaValue,
    nonce: bigint,
    timestamp: SDK.Timestamp.SchemaValue,
    entry_point: string,
    payload: Array<number>,
    };
/** Parameter type for update transaction for 'serializationHelper' entrypoint of the 'cis2_multi' contract. */
export type SerializationHelperParameter = {
    contract_address: SDK.ContractAddress.Type,
    nonce: number | bigint,
    timestamp: SDK.Timestamp.Type,
    entry_point: string,
    payload: Array<number>,
    };

/**
 * Construct schema JSON representation used in update transaction for 'serializationHelper' entrypoint of the 'cis2_multi' contract.
 * @param {SerializationHelperParameter} parameter The structured parameter to construct from.
 * @returns {SerializationHelperParameterSchemaJson} The smart contract parameter JSON.
 */
function createSerializationHelperParameterSchemaJson(parameter: SerializationHelperParameter): SerializationHelperParameterSchemaJson {
    const field162 = parameter.contract_address;
    const contractAddress163 = SDK.ContractAddress.toSchemaValue(field162);
    const field164 = parameter.nonce;
    const number165 = BigInt(field164);
    const field166 = parameter.timestamp;
    const timestamp167 = SDK.Timestamp.toSchemaValue(field166);
    const field168 = parameter.entry_point;
    const field169 = parameter.payload;
    const named161 = {
    contract_address: contractAddress163,
    nonce: number165,
    timestamp: timestamp167,
    entry_point: field168,
    payload: field169,
    };
    return named161;
}

/**
 * Construct Parameter type used in update transaction for 'serializationHelper' entrypoint of the 'cis2_multi' contract.
 * @param {SerializationHelperParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createSerializationHelperParameter(parameter: SerializationHelperParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64SerializationHelperParameterSchema, createSerializationHelperParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'serializationHelper' entrypoint of the 'cis2_multi' contract.
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
/** Base64 encoding of the parameter schema type for update transactions to 'viewMessageHash' entrypoint of the 'cis2_multi' contract. */
const base64ViewMessageHashParameterSchema = 'FAADAAAACQAAAHNpZ25hdHVyZRIAAhIAAhUBAAAABwAAAEVkMjU1MTkBAQAAAB5AAAAABgAAAHNpZ25lcgsHAAAAbWVzc2FnZRQABQAAABAAAABjb250cmFjdF9hZGRyZXNzDAUAAABub25jZQUJAAAAdGltZXN0YW1wDQsAAABlbnRyeV9wb2ludBYBBwAAAHBheWxvYWQQAQI=';
/** Parameter JSON type needed by the schema for update transaction for 'viewMessageHash' entrypoint of the 'cis2_multi' contract. */
type ViewMessageHashParameterSchemaJson = {
    signature: [number, [number, {'Ed25519' : [string] }][]][],
    signer: SDK.AccountAddress.SchemaValue,
    message: {
    contract_address: SDK.ContractAddress.SchemaValue,
    nonce: bigint,
    timestamp: SDK.Timestamp.SchemaValue,
    entry_point: string,
    payload: Array<number>,
    },
    };
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
 * Construct schema JSON representation used in update transaction for 'viewMessageHash' entrypoint of the 'cis2_multi' contract.
 * @param {ViewMessageHashParameter} parameter The structured parameter to construct from.
 * @returns {ViewMessageHashParameterSchemaJson} The smart contract parameter JSON.
 */
function createViewMessageHashParameterSchemaJson(parameter: ViewMessageHashParameter): ViewMessageHashParameterSchemaJson {
    const field173 = parameter.signature;
    const map174: [number, [number, {'Ed25519' : [string] }][]][] = [...field173.entries()].map(([key175, value176]) => {
    const map177: [number, {'Ed25519' : [string] }][] = [...value176.entries()].map(([key178, value179]) => {
    let match180: {'Ed25519' : [string] };
    switch (value179.type) {
        case 'Ed25519':
            match180 = { Ed25519: [value179.content], };
        break;
    }

        return [key178, match180];
    });
        return [key175, map177];
    });
    const field181 = parameter.signer;
    const accountAddress182 = SDK.AccountAddress.toSchemaValue(field181);
    const field183 = parameter.message;
    const field185 = field183.contract_address;
    const contractAddress186 = SDK.ContractAddress.toSchemaValue(field185);
    const field187 = field183.nonce;
    const number188 = BigInt(field187);
    const field189 = field183.timestamp;
    const timestamp190 = SDK.Timestamp.toSchemaValue(field189);
    const field191 = field183.entry_point;
    const field192 = field183.payload;
    const named184 = {
    contract_address: contractAddress186,
    nonce: number188,
    timestamp: timestamp190,
    entry_point: field191,
    payload: field192,
    };
    const named172 = {
    signature: map174,
    signer: accountAddress182,
    message: named184,
    };
    return named172;
}

/**
 * Construct Parameter type used in update transaction for 'viewMessageHash' entrypoint of the 'cis2_multi' contract.
 * @param {ViewMessageHashParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createViewMessageHashParameter(parameter: ViewMessageHashParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64ViewMessageHashParameterSchema, createViewMessageHashParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'viewMessageHash' entrypoint of the 'cis2_multi' contract.
 * @param {ViewMessageHashParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createViewMessageHashParameterWebWallet(parameter: ViewMessageHashParameter) {
    return {
        parameters: createViewMessageHashParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64ViewMessageHashParameterSchema, 'base64')
        },
    }
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
    let match197: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match197 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match197 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match197 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant201 = schemaJson.Custom;
    let match202: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant201[0]) {
       match202 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant201[0]) {
       match202 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant201[0]) {
       match202 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant201[0]) {
       match202 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant201[0]) {
       match202 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant201[0]) {
       match202 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant201[0]) {
       match202 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant201[0]) {
       match202 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant201[0]) {
       match202 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant201[0]) {
       match202 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant201[0]) {
       match202 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant201[0]) {
       match202 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant201[0]) {
       match202 = {
           type: 'Expired',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
       match197 = {
           type: 'Custom',
           content: match202,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match197
}
/** Base64 encoding of the parameter schema type for update transactions to 'permit' entrypoint of the 'cis2_multi' contract. */
const base64PermitParameterSchema = 'FAADAAAACQAAAHNpZ25hdHVyZRIAAhIAAhUBAAAABwAAAEVkMjU1MTkBAQAAAB5AAAAABgAAAHNpZ25lcgsHAAAAbWVzc2FnZRQABQAAABAAAABjb250cmFjdF9hZGRyZXNzDAUAAABub25jZQUJAAAAdGltZXN0YW1wDQsAAABlbnRyeV9wb2ludBYBBwAAAHBheWxvYWQQAQI=';
/** Parameter JSON type needed by the schema for update transaction for 'permit' entrypoint of the 'cis2_multi' contract. */
type PermitParameterSchemaJson = {
    signature: [number, [number, {'Ed25519' : [string] }][]][],
    signer: SDK.AccountAddress.SchemaValue,
    message: {
    contract_address: SDK.ContractAddress.SchemaValue,
    nonce: bigint,
    timestamp: SDK.Timestamp.SchemaValue,
    entry_point: string,
    payload: Array<number>,
    },
    };
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
 * Construct schema JSON representation used in update transaction for 'permit' entrypoint of the 'cis2_multi' contract.
 * @param {PermitParameter} parameter The structured parameter to construct from.
 * @returns {PermitParameterSchemaJson} The smart contract parameter JSON.
 */
function createPermitParameterSchemaJson(parameter: PermitParameter): PermitParameterSchemaJson {
    const field217 = parameter.signature;
    const map218: [number, [number, {'Ed25519' : [string] }][]][] = [...field217.entries()].map(([key219, value220]) => {
    const map221: [number, {'Ed25519' : [string] }][] = [...value220.entries()].map(([key222, value223]) => {
    let match224: {'Ed25519' : [string] };
    switch (value223.type) {
        case 'Ed25519':
            match224 = { Ed25519: [value223.content], };
        break;
    }

        return [key222, match224];
    });
        return [key219, map221];
    });
    const field225 = parameter.signer;
    const accountAddress226 = SDK.AccountAddress.toSchemaValue(field225);
    const field227 = parameter.message;
    const field229 = field227.contract_address;
    const contractAddress230 = SDK.ContractAddress.toSchemaValue(field229);
    const field231 = field227.nonce;
    const number232 = BigInt(field231);
    const field233 = field227.timestamp;
    const timestamp234 = SDK.Timestamp.toSchemaValue(field233);
    const field235 = field227.entry_point;
    const field236 = field227.payload;
    const named228 = {
    contract_address: contractAddress230,
    nonce: number232,
    timestamp: timestamp234,
    entry_point: field235,
    payload: field236,
    };
    const named216 = {
    signature: map218,
    signer: accountAddress226,
    message: named228,
    };
    return named216;
}

/**
 * Construct Parameter type used in update transaction for 'permit' entrypoint of the 'cis2_multi' contract.
 * @param {PermitParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createPermitParameter(parameter: PermitParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64PermitParameterSchema, createPermitParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'permit' entrypoint of the 'cis2_multi' contract.
 * @param {PermitParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createPermitParameterWebWallet(parameter: PermitParameter) {
    return {
        parameters: createPermitParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64PermitParameterSchema, 'base64')
        },
    }
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
    let match239: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match239 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match239 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match239 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant243 = schemaJson.Custom;
    let match244: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant243[0]) {
       match244 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant243[0]) {
       match244 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant243[0]) {
       match244 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant243[0]) {
       match244 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant243[0]) {
       match244 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant243[0]) {
       match244 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant243[0]) {
       match244 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant243[0]) {
       match244 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant243[0]) {
       match244 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant243[0]) {
       match244 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant243[0]) {
       match244 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant243[0]) {
       match244 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant243[0]) {
       match244 = {
           type: 'Expired',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
       match239 = {
           type: 'Custom',
           content: match244,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match239
}
/** Base64 encoding of the parameter schema type for update transactions to 'updateOperator' entrypoint of the 'cis2_multi' contract. */
const base64UpdateOperatorParameterSchema = 'EAEUAAIAAAAGAAAAdXBkYXRlFQIAAAAGAAAAUmVtb3ZlAgMAAABBZGQCCAAAAG9wZXJhdG9yFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==';
/** Parameter JSON type needed by the schema for update transaction for 'updateOperator' entrypoint of the 'cis2_multi' contract. */
type UpdateOperatorParameterSchemaJson = Array<{
    update: {'Remove' : [] } | {'Add' : [] },
    operator: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    }>;
/** Parameter type for update transaction for 'updateOperator' entrypoint of the 'cis2_multi' contract. */
export type UpdateOperatorParameter = Array<{
    update: { type: 'Remove'} | { type: 'Add'},
    operator: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    }>;

/**
 * Construct schema JSON representation used in update transaction for 'updateOperator' entrypoint of the 'cis2_multi' contract.
 * @param {UpdateOperatorParameter} parameter The structured parameter to construct from.
 * @returns {UpdateOperatorParameterSchemaJson} The smart contract parameter JSON.
 */
function createUpdateOperatorParameterSchemaJson(parameter: UpdateOperatorParameter): UpdateOperatorParameterSchemaJson {
    const list258 = parameter.map((item259) => {
    const field261 = item259.update;
    let match262: {'Remove' : [] } | {'Add' : [] };
    switch (field261.type) {
        case 'Remove':
            match262 = { Remove: [], };
        break;
        case 'Add':
            match262 = { Add: [], };
        break;
    }

    const field263 = item259.operator;
    let match264: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field263.type) {
        case 'Account':
    const accountAddress265 = SDK.AccountAddress.toSchemaValue(field263.content);
            match264 = { Account: [accountAddress265], };
        break;
        case 'Contract':
    const contractAddress266 = SDK.ContractAddress.toSchemaValue(field263.content);
            match264 = { Contract: [contractAddress266], };
        break;
    }

    const named260 = {
    update: match262,
    operator: match264,
    };
    return named260;
    });
    return list258;
}

/**
 * Construct Parameter type used in update transaction for 'updateOperator' entrypoint of the 'cis2_multi' contract.
 * @param {UpdateOperatorParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createUpdateOperatorParameter(parameter: UpdateOperatorParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64UpdateOperatorParameterSchema, createUpdateOperatorParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'updateOperator' entrypoint of the 'cis2_multi' contract.
 * @param {UpdateOperatorParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createUpdateOperatorParameterWebWallet(parameter: UpdateOperatorParameter) {
    return {
        parameters: createUpdateOperatorParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64UpdateOperatorParameterSchema, 'base64')
        },
    }
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
    let match267: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match267 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match267 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match267 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant271 = schemaJson.Custom;
    let match272: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant271[0]) {
       match272 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant271[0]) {
       match272 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant271[0]) {
       match272 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant271[0]) {
       match272 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant271[0]) {
       match272 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant271[0]) {
       match272 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant271[0]) {
       match272 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant271[0]) {
       match272 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant271[0]) {
       match272 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant271[0]) {
       match272 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant271[0]) {
       match272 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant271[0]) {
       match272 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant271[0]) {
       match272 = {
           type: 'Expired',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
       match267 = {
           type: 'Custom',
           content: match272,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match267
}
/** Base64 encoding of the parameter schema type for update transactions to 'balanceOf' entrypoint of the 'cis2_multi' contract. */
const base64BalanceOfParameterSchema = 'EAEUAAIAAAAIAAAAdG9rZW5faWQdAAcAAABhZGRyZXNzFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==';
/** Parameter JSON type needed by the schema for update transaction for 'balanceOf' entrypoint of the 'cis2_multi' contract. */
type BalanceOfParameterSchemaJson = Array<{
    token_id: string,
    address: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    }>;
/** Parameter type for update transaction for 'balanceOf' entrypoint of the 'cis2_multi' contract. */
export type BalanceOfParameter = Array<{
    token_id: SDK.HexString,
    address: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    }>;

/**
 * Construct schema JSON representation used in update transaction for 'balanceOf' entrypoint of the 'cis2_multi' contract.
 * @param {BalanceOfParameter} parameter The structured parameter to construct from.
 * @returns {BalanceOfParameterSchemaJson} The smart contract parameter JSON.
 */
function createBalanceOfParameterSchemaJson(parameter: BalanceOfParameter): BalanceOfParameterSchemaJson {
    const list286 = parameter.map((item287) => {
    const field289 = item287.token_id;
    const field290 = item287.address;
    let match291: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field290.type) {
        case 'Account':
    const accountAddress292 = SDK.AccountAddress.toSchemaValue(field290.content);
            match291 = { Account: [accountAddress292], };
        break;
        case 'Contract':
    const contractAddress293 = SDK.ContractAddress.toSchemaValue(field290.content);
            match291 = { Contract: [contractAddress293], };
        break;
    }

    const named288 = {
    token_id: field289,
    address: match291,
    };
    return named288;
    });
    return list286;
}

/**
 * Construct Parameter type used in update transaction for 'balanceOf' entrypoint of the 'cis2_multi' contract.
 * @param {BalanceOfParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createBalanceOfParameter(parameter: BalanceOfParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64BalanceOfParameterSchema, createBalanceOfParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'balanceOf' entrypoint of the 'cis2_multi' contract.
 * @param {BalanceOfParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createBalanceOfParameterWebWallet(parameter: BalanceOfParameter) {
    return {
        parameters: createBalanceOfParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64BalanceOfParameterSchema, 'base64')
        },
    }
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

    const schemaJson = <Array<string>>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAEbJQAAAA==');
    const list295 = schemaJson.map((item296) => {
    const leb294 = BigInt(item296);
    return leb294;
    });
    return list295;
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
    let match297: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match297 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match297 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match297 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant301 = schemaJson.Custom;
    let match302: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant301[0]) {
       match302 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant301[0]) {
       match302 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant301[0]) {
       match302 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant301[0]) {
       match302 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant301[0]) {
       match302 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant301[0]) {
       match302 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant301[0]) {
       match302 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant301[0]) {
       match302 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant301[0]) {
       match302 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant301[0]) {
       match302 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant301[0]) {
       match302 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant301[0]) {
       match302 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant301[0]) {
       match302 = {
           type: 'Expired',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
       match297 = {
           type: 'Custom',
           content: match302,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match297
}
/** Base64 encoding of the parameter schema type for update transactions to 'operatorOf' entrypoint of the 'cis2_multi' contract. */
const base64OperatorOfParameterSchema = 'EAEUAAIAAAAFAAAAb3duZXIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMBwAAAGFkZHJlc3MVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM';
/** Parameter JSON type needed by the schema for update transaction for 'operatorOf' entrypoint of the 'cis2_multi' contract. */
type OperatorOfParameterSchemaJson = Array<{
    owner: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    address: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    }>;
/** Parameter type for update transaction for 'operatorOf' entrypoint of the 'cis2_multi' contract. */
export type OperatorOfParameter = Array<{
    owner: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    address: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    }>;

/**
 * Construct schema JSON representation used in update transaction for 'operatorOf' entrypoint of the 'cis2_multi' contract.
 * @param {OperatorOfParameter} parameter The structured parameter to construct from.
 * @returns {OperatorOfParameterSchemaJson} The smart contract parameter JSON.
 */
function createOperatorOfParameterSchemaJson(parameter: OperatorOfParameter): OperatorOfParameterSchemaJson {
    const list316 = parameter.map((item317) => {
    const field319 = item317.owner;
    let match320: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field319.type) {
        case 'Account':
    const accountAddress321 = SDK.AccountAddress.toSchemaValue(field319.content);
            match320 = { Account: [accountAddress321], };
        break;
        case 'Contract':
    const contractAddress322 = SDK.ContractAddress.toSchemaValue(field319.content);
            match320 = { Contract: [contractAddress322], };
        break;
    }

    const field323 = item317.address;
    let match324: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field323.type) {
        case 'Account':
    const accountAddress325 = SDK.AccountAddress.toSchemaValue(field323.content);
            match324 = { Account: [accountAddress325], };
        break;
        case 'Contract':
    const contractAddress326 = SDK.ContractAddress.toSchemaValue(field323.content);
            match324 = { Contract: [contractAddress326], };
        break;
    }

    const named318 = {
    owner: match320,
    address: match324,
    };
    return named318;
    });
    return list316;
}

/**
 * Construct Parameter type used in update transaction for 'operatorOf' entrypoint of the 'cis2_multi' contract.
 * @param {OperatorOfParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createOperatorOfParameter(parameter: OperatorOfParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64OperatorOfParameterSchema, createOperatorOfParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'operatorOf' entrypoint of the 'cis2_multi' contract.
 * @param {OperatorOfParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createOperatorOfParameterWebWallet(parameter: OperatorOfParameter) {
    return {
        parameters: createOperatorOfParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64OperatorOfParameterSchema, 'base64')
        },
    }
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
    let match329: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match329 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match329 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match329 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant333 = schemaJson.Custom;
    let match334: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant333[0]) {
       match334 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant333[0]) {
       match334 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant333[0]) {
       match334 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant333[0]) {
       match334 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant333[0]) {
       match334 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant333[0]) {
       match334 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant333[0]) {
       match334 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant333[0]) {
       match334 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant333[0]) {
       match334 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant333[0]) {
       match334 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant333[0]) {
       match334 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant333[0]) {
       match334 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant333[0]) {
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

    return match329
}
/** Base64 encoding of the parameter schema type for update transactions to 'publicKeyOf' entrypoint of the 'cis2_multi' contract. */
const base64PublicKeyOfParameterSchema = 'EAEL';
/** Parameter JSON type needed by the schema for update transaction for 'publicKeyOf' entrypoint of the 'cis2_multi' contract. */
type PublicKeyOfParameterSchemaJson = Array<SDK.AccountAddress.SchemaValue>;
/** Parameter type for update transaction for 'publicKeyOf' entrypoint of the 'cis2_multi' contract. */
export type PublicKeyOfParameter = Array<SDK.AccountAddress.Type>;

/**
 * Construct schema JSON representation used in update transaction for 'publicKeyOf' entrypoint of the 'cis2_multi' contract.
 * @param {PublicKeyOfParameter} parameter The structured parameter to construct from.
 * @returns {PublicKeyOfParameterSchemaJson} The smart contract parameter JSON.
 */
function createPublicKeyOfParameterSchemaJson(parameter: PublicKeyOfParameter): PublicKeyOfParameterSchemaJson {
    const list348 = parameter.map((item349) => {
    const accountAddress350 = SDK.AccountAddress.toSchemaValue(item349);
    return accountAddress350;
    });
    return list348;
}

/**
 * Construct Parameter type used in update transaction for 'publicKeyOf' entrypoint of the 'cis2_multi' contract.
 * @param {PublicKeyOfParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createPublicKeyOfParameter(parameter: PublicKeyOfParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64PublicKeyOfParameterSchema, createPublicKeyOfParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'publicKeyOf' entrypoint of the 'cis2_multi' contract.
 * @param {PublicKeyOfParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createPublicKeyOfParameterWebWallet(parameter: PublicKeyOfParameter) {
    return {
        parameters: createPublicKeyOfParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64PublicKeyOfParameterSchema, 'base64')
        },
    }
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
    const list351 = schemaJson.map((item352) => {
    let match353: { type: 'None'} | { type: 'Some', content: {
    keys: Map<number, {
    keys: Map<number, { type: 'Ed25519', content: SDK.HexString }>,
    threshold: number,
    }>,
    threshold: number,
    } };
    if ('None' in item352) {
       match353 = {
           type: 'None',
       };
    } else if ('Some' in item352) {
       const variant355 = item352.Some;
    const field356 = variant355[0].keys;
    const entries358 = field356.map(([key359, value360]) => {
    const field361 = value360.keys;
    const entries363 = field361.map(([key364, value365]) => {
    let match366: { type: 'Ed25519', content: SDK.HexString };
    if ('Ed25519' in value365) {
       const variant367 = value365.Ed25519;
       match366 = {
           type: 'Ed25519',
           content: variant367[0],
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return [key364, match366];
    });
    const map362: Map<number, { type: 'Ed25519', content: SDK.HexString }> = Map.fromEntries(entries363);
    const field368 = value360.threshold;
    const named369 = {
    keys: map362,
    threshold: field368,
    };
    return [key359, named369];
    });
    const map357: Map<number, {
    keys: Map<number, { type: 'Ed25519', content: SDK.HexString }>,
    threshold: number,
    }> = Map.fromEntries(entries358);
    const field370 = variant355[0].threshold;
    const named371 = {
    keys: map357,
    threshold: field370,
    };
       match353 = {
           type: 'Some',
           content: named371,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match353;
    });
    return list351;
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
    let match372: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match372 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match372 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match372 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant376 = schemaJson.Custom;
    let match377: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant376[0]) {
       match377 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant376[0]) {
       match377 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant376[0]) {
       match377 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant376[0]) {
       match377 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant376[0]) {
       match377 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant376[0]) {
       match377 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant376[0]) {
       match377 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant376[0]) {
       match377 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant376[0]) {
       match377 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant376[0]) {
       match377 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant376[0]) {
       match377 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant376[0]) {
       match377 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant376[0]) {
       match377 = {
           type: 'Expired',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
       match372 = {
           type: 'Custom',
           content: match377,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match372
}
/** Base64 encoding of the parameter schema type for update transactions to 'nonceOf' entrypoint of the 'cis2_multi' contract. */
const base64NonceOfParameterSchema = 'EAEL';
/** Parameter JSON type needed by the schema for update transaction for 'nonceOf' entrypoint of the 'cis2_multi' contract. */
type NonceOfParameterSchemaJson = Array<SDK.AccountAddress.SchemaValue>;
/** Parameter type for update transaction for 'nonceOf' entrypoint of the 'cis2_multi' contract. */
export type NonceOfParameter = Array<SDK.AccountAddress.Type>;

/**
 * Construct schema JSON representation used in update transaction for 'nonceOf' entrypoint of the 'cis2_multi' contract.
 * @param {NonceOfParameter} parameter The structured parameter to construct from.
 * @returns {NonceOfParameterSchemaJson} The smart contract parameter JSON.
 */
function createNonceOfParameterSchemaJson(parameter: NonceOfParameter): NonceOfParameterSchemaJson {
    const list391 = parameter.map((item392) => {
    const accountAddress393 = SDK.AccountAddress.toSchemaValue(item392);
    return accountAddress393;
    });
    return list391;
}

/**
 * Construct Parameter type used in update transaction for 'nonceOf' entrypoint of the 'cis2_multi' contract.
 * @param {NonceOfParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createNonceOfParameter(parameter: NonceOfParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64NonceOfParameterSchema, createNonceOfParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'nonceOf' entrypoint of the 'cis2_multi' contract.
 * @param {NonceOfParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createNonceOfParameterWebWallet(parameter: NonceOfParameter) {
    return {
        parameters: createNonceOfParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64NonceOfParameterSchema, 'base64')
        },
    }
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
    let match396: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match396 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match396 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match396 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant400 = schemaJson.Custom;
    let match401: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant400[0]) {
       match401 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant400[0]) {
       match401 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant400[0]) {
       match401 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant400[0]) {
       match401 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant400[0]) {
       match401 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant400[0]) {
       match401 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant400[0]) {
       match401 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant400[0]) {
       match401 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant400[0]) {
       match401 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant400[0]) {
       match401 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant400[0]) {
       match401 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant400[0]) {
       match401 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant400[0]) {
       match401 = {
           type: 'Expired',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
       match396 = {
           type: 'Custom',
           content: match401,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match396
}
/** Base64 encoding of the parameter schema type for update transactions to 'tokenMetadata' entrypoint of the 'cis2_multi' contract. */
const base64TokenMetadataParameterSchema = 'EAEdAA==';
/** Parameter JSON type needed by the schema for update transaction for 'tokenMetadata' entrypoint of the 'cis2_multi' contract. */
type TokenMetadataParameterSchemaJson = Array<string>;
/** Parameter type for update transaction for 'tokenMetadata' entrypoint of the 'cis2_multi' contract. */
export type TokenMetadataParameter = Array<SDK.HexString>;

/**
 * Construct schema JSON representation used in update transaction for 'tokenMetadata' entrypoint of the 'cis2_multi' contract.
 * @param {TokenMetadataParameter} parameter The structured parameter to construct from.
 * @returns {TokenMetadataParameterSchemaJson} The smart contract parameter JSON.
 */
function createTokenMetadataParameterSchemaJson(parameter: TokenMetadataParameter): TokenMetadataParameterSchemaJson {
    return parameter;
}

/**
 * Construct Parameter type used in update transaction for 'tokenMetadata' entrypoint of the 'cis2_multi' contract.
 * @param {TokenMetadataParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createTokenMetadataParameter(parameter: TokenMetadataParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64TokenMetadataParameterSchema, createTokenMetadataParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'tokenMetadata' entrypoint of the 'cis2_multi' contract.
 * @param {TokenMetadataParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createTokenMetadataParameterWebWallet(parameter: TokenMetadataParameter) {
    return {
        parameters: createTokenMetadataParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64TokenMetadataParameterSchema, 'base64')
        },
    }
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
    const list417 = schemaJson.map((item418) => {
    const field419 = item418.url;
    const field420 = item418.hash;
    let match421: { type: 'None'} | { type: 'Some', content: SDK.HexString };
    if ('None' in field420) {
       match421 = {
           type: 'None',
       };
    } else if ('Some' in field420) {
       const variant423 = field420.Some;
       match421 = {
           type: 'Some',
           content: variant423[0],
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    const named424 = {
    url: field419,
    hash: match421,
    };
    return named424;
    });
    return list417;
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
    let match425: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match425 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match425 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match425 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant429 = schemaJson.Custom;
    let match430: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant429[0]) {
       match430 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant429[0]) {
       match430 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant429[0]) {
       match430 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant429[0]) {
       match430 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant429[0]) {
       match430 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant429[0]) {
       match430 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant429[0]) {
       match430 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant429[0]) {
       match430 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant429[0]) {
       match430 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant429[0]) {
       match430 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant429[0]) {
       match430 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant429[0]) {
       match430 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant429[0]) {
       match430 = {
           type: 'Expired',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
       match425 = {
           type: 'Custom',
           content: match430,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match425
}
/** Parameter type  used in update transaction for 'onReceivingCIS2' entrypoint of the 'cis2_multi' contract. */
export type OnReceivingCIS2Parameter = SDK.Parameter.Type;

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
        parameter,
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
        parameter,
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
    let match444: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match444 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match444 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match444 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant448 = schemaJson.Custom;
    let match449: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant448[0]) {
       match449 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant448[0]) {
       match449 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant448[0]) {
       match449 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant448[0]) {
       match449 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant448[0]) {
       match449 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant448[0]) {
       match449 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant448[0]) {
       match449 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant448[0]) {
       match449 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant448[0]) {
       match449 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant448[0]) {
       match449 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant448[0]) {
       match449 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant448[0]) {
       match449 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant448[0]) {
       match449 = {
           type: 'Expired',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
       match444 = {
           type: 'Custom',
           content: match449,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match444
}
/** Base64 encoding of the parameter schema type for update transactions to 'supports' entrypoint of the 'cis2_multi' contract. */
const base64SupportsParameterSchema = 'EAEWAA==';
/** Parameter JSON type needed by the schema for update transaction for 'supports' entrypoint of the 'cis2_multi' contract. */
type SupportsParameterSchemaJson = Array<string>;
/** Parameter type for update transaction for 'supports' entrypoint of the 'cis2_multi' contract. */
export type SupportsParameter = Array<string>;

/**
 * Construct schema JSON representation used in update transaction for 'supports' entrypoint of the 'cis2_multi' contract.
 * @param {SupportsParameter} parameter The structured parameter to construct from.
 * @returns {SupportsParameterSchemaJson} The smart contract parameter JSON.
 */
function createSupportsParameterSchemaJson(parameter: SupportsParameter): SupportsParameterSchemaJson {
    return parameter;
}

/**
 * Construct Parameter type used in update transaction for 'supports' entrypoint of the 'cis2_multi' contract.
 * @param {SupportsParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createSupportsParameter(parameter: SupportsParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64SupportsParameterSchema, createSupportsParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'supports' entrypoint of the 'cis2_multi' contract.
 * @param {SupportsParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createSupportsParameterWebWallet(parameter: SupportsParameter) {
    return {
        parameters: createSupportsParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64SupportsParameterSchema, 'base64')
        },
    }
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
    const list465 = schemaJson.map((item466) => {
    let match467: { type: 'NoSupport'} | { type: 'Support'} | { type: 'SupportBy', content: Array<SDK.ContractAddress.Type> };
    if ('NoSupport' in item466) {
       match467 = {
           type: 'NoSupport',
       };
    } else if ('Support' in item466) {
       match467 = {
           type: 'Support',
       };
    } else if ('SupportBy' in item466) {
       const variant470 = item466.SupportBy;
    const list471 = variant470[0].map((item472) => {
    const contractAddress473 = SDK.ContractAddress.fromSchemaValue(item472);
    return contractAddress473;
    });
       match467 = {
           type: 'SupportBy',
           content: list471,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match467;
    });
    return list465;
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
    let match474: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match474 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match474 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match474 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant478 = schemaJson.Custom;
    let match479: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant478[0]) {
       match479 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant478[0]) {
       match479 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant478[0]) {
       match479 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant478[0]) {
       match479 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant478[0]) {
       match479 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant478[0]) {
       match479 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant478[0]) {
       match479 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant478[0]) {
       match479 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant478[0]) {
       match479 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant478[0]) {
       match479 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant478[0]) {
       match479 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant478[0]) {
       match479 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant478[0]) {
       match479 = {
           type: 'Expired',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
       match474 = {
           type: 'Custom',
           content: match479,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match474
}
/** Base64 encoding of the parameter schema type for update transactions to 'supportsPermit' entrypoint of the 'cis2_multi' contract. */
const base64SupportsPermitParameterSchema = 'FAABAAAABwAAAHF1ZXJpZXMQARYB';
/** Parameter JSON type needed by the schema for update transaction for 'supportsPermit' entrypoint of the 'cis2_multi' contract. */
type SupportsPermitParameterSchemaJson = {
    queries: Array<string>,
    };
/** Parameter type for update transaction for 'supportsPermit' entrypoint of the 'cis2_multi' contract. */
export type SupportsPermitParameter = {
    queries: Array<string>,
    };

/**
 * Construct schema JSON representation used in update transaction for 'supportsPermit' entrypoint of the 'cis2_multi' contract.
 * @param {SupportsPermitParameter} parameter The structured parameter to construct from.
 * @returns {SupportsPermitParameterSchemaJson} The smart contract parameter JSON.
 */
function createSupportsPermitParameterSchemaJson(parameter: SupportsPermitParameter): SupportsPermitParameterSchemaJson {
    const field494 = parameter.queries;
    const named493 = {
    queries: field494,
    };
    return named493;
}

/**
 * Construct Parameter type used in update transaction for 'supportsPermit' entrypoint of the 'cis2_multi' contract.
 * @param {SupportsPermitParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createSupportsPermitParameter(parameter: SupportsPermitParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64SupportsPermitParameterSchema, createSupportsPermitParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'supportsPermit' entrypoint of the 'cis2_multi' contract.
 * @param {SupportsPermitParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createSupportsPermitParameterWebWallet(parameter: SupportsPermitParameter) {
    return {
        parameters: createSupportsPermitParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64SupportsPermitParameterSchema, 'base64')
        },
    }
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
    const list497 = schemaJson.map((item498) => {
    let match499: { type: 'NoSupport'} | { type: 'Support'} | { type: 'SupportBy', content: Array<SDK.ContractAddress.Type> };
    if ('NoSupport' in item498) {
       match499 = {
           type: 'NoSupport',
       };
    } else if ('Support' in item498) {
       match499 = {
           type: 'Support',
       };
    } else if ('SupportBy' in item498) {
       const variant502 = item498.SupportBy;
    const list503 = variant502[0].map((item504) => {
    const contractAddress505 = SDK.ContractAddress.fromSchemaValue(item504);
    return contractAddress505;
    });
       match499 = {
           type: 'SupportBy',
           content: list503,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match499;
    });
    return list497;
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
    let match506: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match506 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match506 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match506 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant510 = schemaJson.Custom;
    let match511: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant510[0]) {
       match511 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant510[0]) {
       match511 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant510[0]) {
       match511 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant510[0]) {
       match511 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant510[0]) {
       match511 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant510[0]) {
       match511 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant510[0]) {
       match511 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant510[0]) {
       match511 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant510[0]) {
       match511 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant510[0]) {
       match511 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant510[0]) {
       match511 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant510[0]) {
       match511 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant510[0]) {
       match511 = {
           type: 'Expired',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
       match506 = {
           type: 'Custom',
           content: match511,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match506
}
/** Base64 encoding of the parameter schema type for update transactions to 'setImplementors' entrypoint of the 'cis2_multi' contract. */
const base64SetImplementorsParameterSchema = 'FAACAAAAAgAAAGlkFgAMAAAAaW1wbGVtZW50b3JzEAIM';
/** Parameter JSON type needed by the schema for update transaction for 'setImplementors' entrypoint of the 'cis2_multi' contract. */
type SetImplementorsParameterSchemaJson = {
    id: string,
    implementors: Array<SDK.ContractAddress.SchemaValue>,
    };
/** Parameter type for update transaction for 'setImplementors' entrypoint of the 'cis2_multi' contract. */
export type SetImplementorsParameter = {
    id: string,
    implementors: Array<SDK.ContractAddress.Type>,
    };

/**
 * Construct schema JSON representation used in update transaction for 'setImplementors' entrypoint of the 'cis2_multi' contract.
 * @param {SetImplementorsParameter} parameter The structured parameter to construct from.
 * @returns {SetImplementorsParameterSchemaJson} The smart contract parameter JSON.
 */
function createSetImplementorsParameterSchemaJson(parameter: SetImplementorsParameter): SetImplementorsParameterSchemaJson {
    const field526 = parameter.id;
    const field527 = parameter.implementors;
    const list528 = field527.map((item529) => {
    const contractAddress530 = SDK.ContractAddress.toSchemaValue(item529);
    return contractAddress530;
    });
    const named525 = {
    id: field526,
    implementors: list528,
    };
    return named525;
}

/**
 * Construct Parameter type used in update transaction for 'setImplementors' entrypoint of the 'cis2_multi' contract.
 * @param {SetImplementorsParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createSetImplementorsParameter(parameter: SetImplementorsParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64SetImplementorsParameterSchema, createSetImplementorsParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'setImplementors' entrypoint of the 'cis2_multi' contract.
 * @param {SetImplementorsParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createSetImplementorsParameterWebWallet(parameter: SetImplementorsParameter) {
    return {
        parameters: createSetImplementorsParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64SetImplementorsParameterSchema, 'base64')
        },
    }
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
    let match531: { type: 'InvalidTokenId'} | { type: 'InsufficientFunds'} | { type: 'Unauthorized'} | { type: 'Custom', content: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'} };
    if ('InvalidTokenId' in schemaJson) {
       match531 = {
           type: 'InvalidTokenId',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match531 = {
           type: 'InsufficientFunds',
       };
    } else if ('Unauthorized' in schemaJson) {
       match531 = {
           type: 'Unauthorized',
       };
    } else if ('Custom' in schemaJson) {
       const variant535 = schemaJson.Custom;
    let match536: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'InvalidContractName'} | { type: 'ContractOnly'} | { type: 'InvokeContractError'} | { type: 'MissingAccount'} | { type: 'MalformedData'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'WrongContract'} | { type: 'WrongEntryPoint'} | { type: 'Expired'};
    if ('ParseParams' in variant535[0]) {
       match536 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in variant535[0]) {
       match536 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in variant535[0]) {
       match536 = {
           type: 'LogMalformed',
       };
    } else if ('InvalidContractName' in variant535[0]) {
       match536 = {
           type: 'InvalidContractName',
       };
    } else if ('ContractOnly' in variant535[0]) {
       match536 = {
           type: 'ContractOnly',
       };
    } else if ('InvokeContractError' in variant535[0]) {
       match536 = {
           type: 'InvokeContractError',
       };
    } else if ('MissingAccount' in variant535[0]) {
       match536 = {
           type: 'MissingAccount',
       };
    } else if ('MalformedData' in variant535[0]) {
       match536 = {
           type: 'MalformedData',
       };
    } else if ('WrongSignature' in variant535[0]) {
       match536 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in variant535[0]) {
       match536 = {
           type: 'NonceMismatch',
       };
    } else if ('WrongContract' in variant535[0]) {
       match536 = {
           type: 'WrongContract',
       };
    } else if ('WrongEntryPoint' in variant535[0]) {
       match536 = {
           type: 'WrongEntryPoint',
       };
    } else if ('Expired' in variant535[0]) {
       match536 = {
           type: 'Expired',
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
       match531 = {
           type: 'Custom',
           content: match536,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match531
}
