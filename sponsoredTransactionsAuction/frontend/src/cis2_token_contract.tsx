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
} from '@concordium/web-sdk';
import {
    CONTRACT_SUB_INDEX,
    EPSILON_ENERGY,
    METADATA_URL,
    MINT_PARAMETER_SCHEMA,
    NODE,
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

// This function submits a transaction to mint/airdrop tokens to an account.
/**
 * Mints new cis2 tokens to the account specified in the mintParameter.
 *
 * @param connection - The wallet connection to use for sending the transaction
 * @param accountAddress - The account address to send from
 * @param mintParameter - The parameter for the mint function
 * @throws If the contract could not be updated
 * @returns A promise resolving with the corresponding {@linkcode TransactionHash.Type}
 */
export async function mint(
    connection: WalletConnection,
    accountAddress: AccountAddress.Type,
    mintParameter: Cis2MultiContract.MintParameter,
): Promise<TransactionHash.Type> {
    const dryRunResult = await Cis2MultiContract.dryRunMint(contract, mintParameter);

    if (!dryRunResult || dryRunResult.tag === 'failure' || !dryRunResult.returnValue) {
        throw new Error(
            `RPC call 'invokeContract' on method '${SPONSORED_TX_CONTRACT_NAME.value}.nonceOf' of contract '${
                process.env.CIS2_TOKEN_CONTRACT_INDEX
            }' failed. Response: ${JSONbig.stringify(dryRunResult)}`,
        );
    }

    const maxContractExecutionEnergy = Energy.create(dryRunResult.usedEnergy.value + EPSILON_ENERGY); // + EPSILON_ENERGY needs to be here, as there seems to be an issue with running out of energy 1 energy prior to reaching the execution limit

    const payload: Omit<UpdateContractPayload, 'message'> = {
        amount: CcdAmount.zero(),
        address: ContractAddress.create(Number(process.env.CIS2_TOKEN_CONTRACT_INDEX), CONTRACT_SUB_INDEX),
        receiveName: ReceiveName.create(Cis2MultiContract.contractName, EntrypointName.fromString('mint')),
        maxContractExecutionEnergy,
    };

    if (mintParameter.owner.type == 'Account') {
        // The `ccd-js-gen` tool is not fully integrated with the browser wallet yet and we need
        // to manually convert from Cis2MultiContract.MintParameter to TypedSmartContractParameters.
        const params: TypedSmartContractParameters = {
            parameters: {
                owner: { Account: [mintParameter.owner.content.address] },
                metadata_url: {
                    hash: {
                        None: [],
                    },
                    url: METADATA_URL, // In production, you should consider using a different metadata file for each token_id.
                },
                token_id: mintParameter.token_id,
            },
            schema: {
                type: 'TypeSchema',
                value: toBuffer(MINT_PARAMETER_SCHEMA, 'base64'),
            },
        };

        return connection
            .signAndSendTransaction(
                AccountAddress.toBase58(accountAddress),
                AccountTransactionType.Update,
                payload,
                params,
            )
            .then(TransactionHash.fromHexString);
    } else {
        throw new Error('MintParameter.owner.type should be an Account.');
    }
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
export async function nonceOf(
    nonceOfParameter: Cis2MultiContract.NonceOfParameter,
): Promise<Cis2MultiContract.ReturnValueNonceOf> {
    const dryRunResult = await Cis2MultiContract.dryRunNonceOf(contract, nonceOfParameter);

    if (!dryRunResult || dryRunResult.tag === 'failure' || !dryRunResult.returnValue) {
        throw new Error(
            `RPC call 'invokeContract' on method '${SPONSORED_TX_CONTRACT_NAME.value}.nonceOf' of contract '${
                process.env.CIS2_TOKEN_CONTRACT_INDEX
            }' failed. Response: ${JSONbig.stringify(dryRunResult)}`,
        );
    }

    const parsedReturnValue = Cis2MultiContract.parseReturnValueNonceOf(dryRunResult);

    if (parsedReturnValue === undefined) {
        throw new Error(
            `Deserializing the returnValue from the '${SPONSORED_TX_CONTRACT_NAME.value}.nonceOf' method of contract '${process.env.CIS2_TOKEN_CONTRACT_INDEX}' failed`,
        );
    } else {
        return parsedReturnValue;
    }
}
