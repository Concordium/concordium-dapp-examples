import * as Cis2MultiContract from '../generated/cis2_multi_cis2_multi'; // Code generated from a smart contract module. The naming convention of the generated file is `moduleName_smartContractName`.

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

export const CIS2_TOKEN_CONTRACT = contract;

/**
 * This function submits a transaction to mint/airdrop cis2_multi tokens to an account.
 *
 * @param connection - The wallet connection to use for sending the transaction.
 * @param accountAddress - The account address to send from.
 * @param mintParameter - The parameter for the mint function.
 * @throws If simulating the contract update fails or the `mintParameter.owner` is not an account.
 * @returns A promise resolving with the corresponding {@linkcode TransactionHash.Type}
 */
export async function mint(
    connection: WalletConnection,
    accountAddress: AccountAddress.Type,
    mintParameter: Cis2MultiContract.MintParameter,
): Promise<TransactionHash.Type> {
    const dryRunResult = await Cis2MultiContract.dryRunMint(contract, mintParameter);

    if (!dryRunResult || dryRunResult.tag === 'failure' || !dryRunResult.returnValue) {
        const parsedErrorCode = Cis2MultiContract.parseErrorMessageMint(dryRunResult)?.type;

        throw new Error(
            `RPC call 'invokeContract' on method '${SPONSORED_TX_CONTRACT_NAME.value}.nonceOf' of contract '${
                process.env.CIS2_TOKEN_CONTRACT_INDEX
            }' failed. Decoded error code: ${JSONbig.stringify(
                parsedErrorCode,
            )}. Original response: ${JSONbig.stringify(dryRunResult)}`,
        );
    }

    const maxContractExecutionEnergy = Energy.create(dryRunResult.usedEnergy.value + EPSILON_ENERGY);

    const payload: Omit<UpdateContractPayload, 'message'> = {
        amount: CcdAmount.zero(),
        address: contract.contractAddress,
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
 * This function views the nonce (CIS3 standard) of an acccount in the cis2_multi contract.
 *
 * @param nonceOfParameter - The parameter for the nonceOf function.
 * @throws If the communicate with the Concordium node fails, the smart contract reverts, or parsing the returnValue fails.
 * @returns A promise resolving with the corresponding {@linkcode Cis2MultiContract.ReturnValueNonceOf}
 */
export async function nonceOf(
    nonceOfParameter: Cis2MultiContract.NonceOfParameter,
): Promise<Cis2MultiContract.ReturnValueNonceOf> {
    const dryRunResult = await Cis2MultiContract.dryRunNonceOf(contract, nonceOfParameter);

    if (!dryRunResult || dryRunResult.tag === 'failure' || !dryRunResult.returnValue) {
        const parsedErrorCode = Cis2MultiContract.parseErrorMessageNonceOf(dryRunResult)?.type;

        throw new Error(
            `RPC call 'invokeContract' on method '${SPONSORED_TX_CONTRACT_NAME.value}.nonceOf' of contract '${
                process.env.CIS2_TOKEN_CONTRACT_INDEX
            }' failed. Decoded error code: ${JSONbig.stringify(
                parsedErrorCode,
            )}. Original response: ${JSONbig.stringify(dryRunResult)}`,
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
