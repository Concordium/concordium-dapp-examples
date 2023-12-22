import * as Cis2MultiContract from '../generated/cis2_multi_cis2_multi'; // Code generated from a smart contract module.

import {
    AccountTransactionType,
    toBuffer,
    UpdateContractPayload,
    CcdAmount,
    ReceiveName,
    EntrypointName,
    Energy,
    AccountAddress,
    TransactionHash,
    ContractAddress,
    ConcordiumGRPCWebClient,
    deserializeTypeValue,
} from '@concordium/web-sdk';
import {
    CONTRACT_SUB_INDEX,
    MINT_PARAMETER_SCHEMA,
    NODE,
    NONCE_OF_RETURN_VALUE_SCHEMA,
    PORT,
    SPONSORED_TX_CONTRACT_NAME,
} from './constants';
import { TypedSmartContractParameters, WalletConnection } from '@concordium/wallet-connectors';

import JSONbig from 'json-bigint';

const grpc = new ConcordiumGRPCWebClient(NODE, PORT);

const contract = Cis2MultiContract.createUnchecked(
    grpc,
    ContractAddress.create(Number(process.env.CIS2_TOKEN_CONTRACT_INDEX), CONTRACT_SUB_INDEX),
);

/**
 * Mints new cis2 tokens to the account specified in the mintParameter.
 *
 * @param connection - The wallet connection to use for sending the transaction
 * @param accountAddress - The account address to send from
 * @param mintParameter - The parameter for the mint function
 * @throws If the contract could not be updated
 * @returns A promise resolving with the corresponding {@linkcode TransactionHash.Type}
 */
export async function mintTest(
    connection: WalletConnection,
    accountAddress: AccountAddress.Type,
    mintParameter: Cis2MultiContract.MintParameter,
): Promise<TransactionHash.Type> {
    const params: TypedSmartContractParameters = {
        parameters: mintParameter,
        schema: {
            type: 'TypeSchema',
            value: toBuffer(MINT_PARAMETER_SCHEMA, 'base64'),
        },
    };

    const result = await Cis2MultiContract.dryRunMint(contract, mintParameter);
    if (result.tag === 'failure' || result.returnValue === undefined) {
        throw new Error('Failed to invoke contract');
    }

    const maxContractExecutionEnergy = Energy.create(result.usedEnergy.value + 1n); // +1 needs to be here, as there seems to be an issue with running out of energy 1 energy prior to reaching the execution limit

    const payload: Omit<UpdateContractPayload, 'message'> = {
        amount: CcdAmount.zero(),
        address: ContractAddress.create(Number(process.env.CIS2_TOKEN_CONTRACT_INDEX), CONTRACT_SUB_INDEX),
        receiveName: ReceiveName.create(Cis2MultiContract.contractName, EntrypointName.fromString('mint')),
        maxContractExecutionEnergy,
    };

    return connection
        .signAndSendTransaction(AccountAddress.toBase58(accountAddress), AccountTransactionType.Update, payload, params)
        .then(TransactionHash.fromHexString);
}

/**
 * Mints new cis2 tokens to the account specified in the mintParameter.
 *
 * @param connection - The wallet connection to use for sending the transaction
 * @param accountAddress - The account address to send from
 * @param mintParameter - The parameter for the mint function
 * @throws If the contract could not be updated
 * @returns A promise resolving with the corresponding {@linkcode TransactionHash.Type}
 */
export async function nonceOf(nonceOfParameter: Cis2MultiContract.NonceOfParameter): Promise<number> {
    const result = await Cis2MultiContract.dryRunNonceOf(contract, nonceOfParameter);

    if (!result || result.tag === 'failure' || !result.returnValue) {
        throw new Error(
            `RPC call 'invokeContract' on method '${SPONSORED_TX_CONTRACT_NAME.value}.nonceOf' of contract '${
                process.env.CIS2_TOKEN_CONTRACT_INDEX
            }' failed. Response: ${JSONbig.stringify(result)}`,
        );
    }

    const returnValues = deserializeTypeValue(
        result.returnValue.buffer,
        toBuffer(NONCE_OF_RETURN_VALUE_SCHEMA, 'base64'),
    ) as number[][];

    if (returnValues === undefined) {
        throw new Error(
            `Deserializing the returnValue from the '${SPONSORED_TX_CONTRACT_NAME.value}.nonceOf' method of contract '${process.env.CIS2_TOKEN_CONTRACT_INDEX}' failed`,
        );
    } else {
        // Return next nonce of a user
        return returnValues[0][0];
    }
}

// /*
//  * This function submits a transaction to mint/airdrop tokens to an account.
//  */
// export async function mint(connection: WalletConnection, account: string, tokenId: string, to: string) {
//     return connection.signAndSendTransaction(
//         account,
//         AccountTransactionType.Update,
//         {
//             amount: CcdAmount.zero(),
//             address: {
//                 index: BigInt(Number(process.env.CIS2_TOKEN_CONTRACT_INDEX)),
//                 subindex: CONTRACT_SUB_INDEX,
//             },
//             receiveName: `${SPONSORED_TX_CONTRACT_NAME.value}.mint`,
//             maxContractExecutionEnergy: 30000n,
//         } as unknown as UpdateContractPayload,
//         {
//             parameters: {
//                 owner: { Account: [to] },
//                 metadata_url: {
//                     hash: {
//                         None: [],
//                     },
//                     url: 'https://s3.eu-central-1.amazonaws.com/tokens.testnet.concordium.com/ft/wccd', // Hardcoded value for simplicity for this demo dApp. In production, you should consider using a different metadata file for each token_id.
//                 },
//                 token_id: `0${Number(tokenId).toString(16)}`.slice(-2),
//             },
//             schema: typeSchemaFromBase64(MINT_PARAMETER_SCHEMA),
//         },
//     );
// }

// /**
//  * Gets the configuration of the election contract.
//  * @returns A promise resolving with the corresponding {@linkcode ElectionContract.ReturnValueViewConfig}
//  */
// export async function getElectionConfig() {
//     const result = await ElectionContract.dryRunViewConfig(contract, Parameter.empty());
//     return ElectionContract.parseReturnValueViewConfig(result);
// }
