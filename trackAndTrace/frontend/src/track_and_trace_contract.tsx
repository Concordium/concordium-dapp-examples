import * as TrackAndTraceContract from '../generated/module_track_and_trace'; // Code generated from a smart contract module. The naming convention of the generated file is `moduleName_smartContractName`.

import {
    AccountTransactionType,
    UpdateContractPayload,
    CcdAmount,
    ReceiveName,
    EntrypointName,
    Energy,
    AccountAddress,
    ContractAddress,
    ConcordiumGRPCWebClient,
    ContractInvokeMetadata,
} from '@concordium/web-sdk';
import { CONTRACT_SUB_INDEX, EPSILON_ENERGY, NODE, PORT } from '../constants';

import JSONbig from 'json-bigint';
import { WalletConnection } from '@concordium/wallet-connectors';

const grpc = new ConcordiumGRPCWebClient(NODE, PORT);

const contract = TrackAndTraceContract.createUnchecked(
    grpc,
    ContractAddress.create(Number(process.env.TRACK_AND_TRACE_CONTRACT_INDEX), CONTRACT_SUB_INDEX),
);

/**
 * This function submits a transaction to create an item in the track and trace contract.
 *
 * @param provider - The wallet provider to use for sending the transaction.
 * @param accountAddress - The account address to send from.
 * @param createItemParameter - The parameter for the createItem function.
 * @throws If simulating the contract update fails.
 * @returns A promise resolving with the corresponding {@linkcode string}
 */
export async function createItem(
    connection: WalletConnection,
    accountAddress: AccountAddress.Type,
    createItemParameter: TrackAndTraceContract.CreateItemParameter,
): Promise<string> {
    let contractInvokeMetadata: ContractInvokeMetadata = {
        invoker: accountAddress,
    };

    const dryRunResult = await TrackAndTraceContract.dryRunCreateItem(
        contract,
        createItemParameter,
        contractInvokeMetadata,
    );

    if (!dryRunResult || dryRunResult.tag === 'failure' || !dryRunResult.returnValue) {
        const parsedErrorCode = TrackAndTraceContract.parseErrorMessageCreateItem(dryRunResult)?.type;

        throw new Error(
            `RPC call 'invokeContract' on method '${TrackAndTraceContract.contractName.value}.createItem' of contract '${
                process.env.TRACK_AND_TRACE_CONTRACT_INDEX
            }' failed. Decoded error code: ${JSONbig.stringify(
                parsedErrorCode,
            )}. Original response: ${JSONbig.stringify(dryRunResult)}`,
        );
    }

    const maxContractExecutionEnergy = Energy.create(dryRunResult.usedEnergy.value + EPSILON_ENERGY);

    const payload: Omit<UpdateContractPayload, 'message'> = {
        amount: CcdAmount.zero(),
        address: contract.contractAddress,
        receiveName: ReceiveName.create(TrackAndTraceContract.contractName, EntrypointName.fromString('createItem')),
        maxContractExecutionEnergy,
    };

    let webWalletParameter = TrackAndTraceContract.createCreateItemParameterWebWallet(createItemParameter);

    return connection.signAndSendTransaction(
        accountAddress.address,
        AccountTransactionType.Update,
        payload,
        webWalletParameter,
    );
}

/**
 * This function submits a transaction to create an item in the track and trace contract.
 *
 * @param provider - The wallet provider to use for sending the transaction.
 * @param accountAddress - The account address to send from.
 * @param createItemParameter - The parameter for the createItem function.
 * @throws If simulating the contract update fails.
 * @returns A promise resolving with the corresponding {@linkcode string}
 */
export async function removeRole(
    connection: WalletConnection,
    accountAddress: AccountAddress.Type,
    revokeRoleParameter: TrackAndTraceContract.RevokeRoleParameter,
): Promise<string> {
    let contractInvokeMetadata: ContractInvokeMetadata = {
        invoker: accountAddress,
    };

    const dryRunResult = await TrackAndTraceContract.dryRunRevokeRole(
        contract,
        revokeRoleParameter,
        contractInvokeMetadata,
    );

    if (!dryRunResult || dryRunResult.tag === 'failure' || !dryRunResult.returnValue) {
        const parsedErrorCode = TrackAndTraceContract.parseErrorMessageCreateItem(dryRunResult)?.type;

        throw new Error(
            `RPC call 'invokeContract' on method '${TrackAndTraceContract.contractName.value}.revokeRole' of contract '${
                process.env.TRACK_AND_TRACE_CONTRACT_INDEX
            }' failed. Decoded error code: ${JSONbig.stringify(
                parsedErrorCode,
            )}. Original response: ${JSONbig.stringify(dryRunResult)}`,
        );
    }

    const maxContractExecutionEnergy = Energy.create(dryRunResult.usedEnergy.value + EPSILON_ENERGY);

    const payload: Omit<UpdateContractPayload, 'message'> = {
        amount: CcdAmount.zero(),
        address: contract.contractAddress,
        receiveName: ReceiveName.create(TrackAndTraceContract.contractName, EntrypointName.fromString('revokeRole')),
        maxContractExecutionEnergy,
    };

    let webWalletParameter = TrackAndTraceContract.createRevokeRoleParameterWebWallet(revokeRoleParameter);

    return connection.signAndSendTransaction(
        accountAddress.address,
        AccountTransactionType.Update,
        payload,
        webWalletParameter,
    );
}

/**
 * This function submits a transaction to create an item in the track and trace contract.
 *
 * @param provider - The wallet provider to use for sending the transaction.
 * @param accountAddress - The account address to send from.
 * @param createItemParameter - The parameter for the createItem function.
 * @throws If simulating the contract update fails.
 * @returns A promise resolving with the corresponding {@linkcode string}
 */
export async function addRole(
    connection: WalletConnection,
    accountAddress: AccountAddress.Type,
    grantRoleParameter: TrackAndTraceContract.GrantRoleParameter,
): Promise<string> {
    let contractInvokeMetadata: ContractInvokeMetadata = {
        invoker: accountAddress,
    };

    const dryRunResult = await TrackAndTraceContract.dryRunGrantRole(
        contract,
        grantRoleParameter,
        contractInvokeMetadata,
    );

    if (!dryRunResult || dryRunResult.tag === 'failure' || !dryRunResult.returnValue) {
        const parsedErrorCode = TrackAndTraceContract.parseErrorMessageCreateItem(dryRunResult)?.type;

        throw new Error(
            `RPC call 'invokeContract' on method '${TrackAndTraceContract.contractName.value}.grantRole' of contract '${
                process.env.TRACK_AND_TRACE_CONTRACT_INDEX
            }' failed. Decoded error code: ${JSONbig.stringify(
                parsedErrorCode,
            )}. Original response: ${JSONbig.stringify(dryRunResult)}`,
        );
    }

    const maxContractExecutionEnergy = Energy.create(dryRunResult.usedEnergy.value + EPSILON_ENERGY);

    const payload: Omit<UpdateContractPayload, 'message'> = {
        amount: CcdAmount.zero(),
        address: contract.contractAddress,
        receiveName: ReceiveName.create(TrackAndTraceContract.contractName, EntrypointName.fromString('grantRole')),
        maxContractExecutionEnergy,
    };

    let webWalletParameter = TrackAndTraceContract.createGrantRoleParameterWebWallet(grantRoleParameter);

    return connection.signAndSendTransaction(
        accountAddress.address,
        AccountTransactionType.Update,
        payload,
        webWalletParameter,
    );
}

/**
 * This function views the nonce (CIS3 standard) of an acccount in the contract.
 *
 * @param nonceOfParameter - The parameter for the nonceOf function.
 * @throws If the communicate with the Concordium node fails, the smart contract reverts, or parsing the returnValue fails.
 * @returns A promise resolving with the corresponding {@linkcode TrackAndTrace.ReturnValueNonceOf}
 */
export async function nonceOf(
    nonceOfParameter: TrackAndTraceContract.NonceOfParameter,
): Promise<TrackAndTraceContract.ReturnValueNonceOf> {
    const dryRunResult = await TrackAndTraceContract.dryRunNonceOf(contract, nonceOfParameter);

    if (!dryRunResult || dryRunResult.tag === 'failure' || !dryRunResult.returnValue) {
        const parsedErrorCode = TrackAndTraceContract.parseErrorMessageNonceOf(dryRunResult)?.type;

        throw new Error(
            `RPC call 'invokeContract' on method '${TrackAndTraceContract.contractName.value}.nonceOf' of contract '${
                process.env.TRACK_AND_TRACE_CONTRACT_INDEX
            }' failed. Decoded error code: ${JSONbig.stringify(
                parsedErrorCode,
            )}. Original response: ${JSONbig.stringify(dryRunResult)}`,
        );
    }

    const parsedReturnValue = TrackAndTraceContract.parseReturnValueNonceOf(dryRunResult);

    if (parsedReturnValue === undefined) {
        throw new Error(
            `Deserializing the returnValue from the '${TrackAndTraceContract.contractName.value}.nonceOf' method of contract '${process.env.TRACK_AND_TRACE_CONTRACT_INDEX}' failed`,
        );
    } else {
        return parsedReturnValue;
    }
}
