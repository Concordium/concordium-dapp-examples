import * as TrackAndTraceContract from '../generated/module_track_and_trace'; // Code generated from a smart contract module. The naming convention of the generated file is `moduleName_smartContractName`.

import {
    AccountTransactionType,
    UpdateContractPayload,
    CcdAmount,
    ReceiveName,
    EntrypointName,
    Energy,
    AccountAddress,
    ConcordiumGRPCWebClient,
    ContractInvokeMetadata,
} from '@concordium/web-sdk';
import JSONbig from 'json-bigint';
import { WalletConnection } from '@concordium/wallet-connectors';
import * as constants from './constants';

const grpc = new ConcordiumGRPCWebClient(constants.NODE_HOST, constants.NODE_PORT);

const contract = TrackAndTraceContract.createUnchecked(grpc, constants.CONTRACT_ADDRESS);

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
    const contractInvokeMetadata: ContractInvokeMetadata = {
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
                constants.CONTRACT_ADDRESS.index
            }' failed. Decoded error code: ${JSONbig.stringify(
                parsedErrorCode,
            )}. Original response: ${JSONbig.stringify(dryRunResult)}`,
        );
    }

    const maxContractExecutionEnergy = Energy.create(dryRunResult.usedEnergy.value + constants.EPSILON_ENERGY);

    const payload: Omit<UpdateContractPayload, 'message'> = {
        amount: CcdAmount.zero(),
        address: contract.contractAddress,
        receiveName: ReceiveName.create(TrackAndTraceContract.contractName, EntrypointName.fromString('createItem')),
        maxContractExecutionEnergy,
    };

    const webWalletParameter = TrackAndTraceContract.createCreateItemParameterWebWallet(createItemParameter);

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
    const contractInvokeMetadata: ContractInvokeMetadata = {
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
                constants.CONTRACT_ADDRESS.index
            }' failed. Decoded error code: ${JSONbig.stringify(
                parsedErrorCode,
            )}. Original response: ${JSONbig.stringify(dryRunResult)}`,
        );
    }

    const maxContractExecutionEnergy = Energy.create(dryRunResult.usedEnergy.value + constants.EPSILON_ENERGY);

    const payload: Omit<UpdateContractPayload, 'message'> = {
        amount: CcdAmount.zero(),
        address: contract.contractAddress,
        receiveName: ReceiveName.create(TrackAndTraceContract.contractName, EntrypointName.fromString('revokeRole')),
        maxContractExecutionEnergy,
    };

    const webWalletParameter = TrackAndTraceContract.createRevokeRoleParameterWebWallet(revokeRoleParameter);

    return connection.signAndSendTransaction(
        accountAddress.address,
        AccountTransactionType.Update,
        payload,
        webWalletParameter,
    );
}

/**
 * This function submits a transaction to update the state machine.
 *
 * @param provider - The wallet provider to use for sending the transaction.
 * @param accountAddress - The account address to send from.
 * @param updateStateMachineParameter - The parameter for the updateStateMachine function.
 * @throws If simulating the contract update fails.
 * @returns A promise resolving with the corresponding {@linkcode string}
 */
export async function updateStateMachine(
    connection: WalletConnection,
    accountAddress: AccountAddress.Type,
    updateStateMachineParameter: TrackAndTraceContract.UpdateStateMachineParameter,
): Promise<string> {
    const contractInvokeMetadata: ContractInvokeMetadata = {
        invoker: accountAddress,
    };

    const dryRunResult = await TrackAndTraceContract.dryRunUpdateStateMachine(
        contract,
        updateStateMachineParameter,
        contractInvokeMetadata,
    );

    if (!dryRunResult || dryRunResult.tag === 'failure' || !dryRunResult.returnValue) {
        const parsedErrorCode = TrackAndTraceContract.parseErrorMessageUpdateStateMachine(dryRunResult)?.type;

        throw new Error(
            `RPC call 'invokeContract' on method '${TrackAndTraceContract.contractName.value}.updateStateMachine' of contract '${
                constants.CONTRACT_ADDRESS.index
            }' failed. Decoded error code: ${JSONbig.stringify(
                parsedErrorCode,
            )}. Original response: ${JSONbig.stringify(dryRunResult)}`,
        );
    }

    const maxContractExecutionEnergy = Energy.create(dryRunResult.usedEnergy.value + constants.EPSILON_ENERGY);

    const payload: Omit<UpdateContractPayload, 'message'> = {
        amount: CcdAmount.zero(),
        address: contract.contractAddress,
        receiveName: ReceiveName.create(
            TrackAndTraceContract.contractName,
            EntrypointName.fromString('updateStateMachine'),
        ),
        maxContractExecutionEnergy,
    };

    const webWalletParameter =
        TrackAndTraceContract.createUpdateStateMachineParameterWebWallet(updateStateMachineParameter);

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
    const contractInvokeMetadata: ContractInvokeMetadata = {
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
                constants.CONTRACT_ADDRESS.index
            }' failed. Decoded error code: ${JSONbig.stringify(
                parsedErrorCode,
            )}. Original response: ${JSONbig.stringify(dryRunResult)}`,
        );
    }

    const maxContractExecutionEnergy = Energy.create(dryRunResult.usedEnergy.value + constants.EPSILON_ENERGY);

    const payload: Omit<UpdateContractPayload, 'message'> = {
        amount: CcdAmount.zero(),
        address: contract.contractAddress,
        receiveName: ReceiveName.create(TrackAndTraceContract.contractName, EntrypointName.fromString('grantRole')),
        maxContractExecutionEnergy,
    };

    const webWalletParameter = TrackAndTraceContract.createGrantRoleParameterWebWallet(grantRoleParameter);

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
                constants.CONTRACT_ADDRESS.index
            }' failed. Decoded error code: ${JSONbig.stringify(
                parsedErrorCode,
            )}. Original response: ${JSONbig.stringify(dryRunResult)}`,
        );
    }

    const parsedReturnValue = TrackAndTraceContract.parseReturnValueNonceOf(dryRunResult);

    if (parsedReturnValue === undefined) {
        throw new Error(
            `Deserializing the returnValue from the '${TrackAndTraceContract.contractName.value}.nonceOf' method of contract '${constants.CONTRACT_ADDRESS.index}' failed`,
        );
    } else {
        return parsedReturnValue;
    }
}

/**
 * This function views the addresses given a role in the contract.
 *
 * @param getAddressesByRoleParameter - The parameter for the getAddressesByRole function.
 * @throws If the communicate with the Concordium node fails, the smart contract reverts, or parsing the returnValue fails.
 * @returns A promise resolving with the corresponding {@linkcode TrackAndTrace.ReturnValueGetAddressesByRole}
 */
export async function getAddressesByRole(
    getAddressesByRoleParameter: TrackAndTraceContract.GetAddressesByRoleParameter,
): Promise<TrackAndTraceContract.ReturnValueGetAddressesByRole> {
    const dryRunResult = await TrackAndTraceContract.dryRunGetAddressesByRole(contract, getAddressesByRoleParameter);

    if (!dryRunResult || dryRunResult.tag === 'failure' || !dryRunResult.returnValue) {
        const parsedErrorCode = TrackAndTraceContract.parseReturnValueGetAddressesByRole(dryRunResult);

        throw new Error(
            `RPC call 'invokeContract' on method '${TrackAndTraceContract.contractName.value}.getAddressesByRole' of contract '${
                constants.CONTRACT_ADDRESS.index
            }' failed. Decoded error code: ${JSONbig.stringify(
                parsedErrorCode,
            )}. Original response: ${JSONbig.stringify(dryRunResult)}`,
        );
    }

    const parsedReturnValue = TrackAndTraceContract.parseReturnValueGetAddressesByRole(dryRunResult);

    if (parsedReturnValue === undefined) {
        throw new Error(
            `Deserializing the returnValue from the '${TrackAndTraceContract.contractName.value}.getAddressesByRole' method of contract '${constants.CONTRACT_ADDRESS.index}' failed`,
        );
    } else {
        return parsedReturnValue;
    }
}

/**
 * This function views the addresses given a role in the contract.
 *
 * @param getItemStateParameter - The parameter for the getItemState function.
 * @throws If the communicate with the Concordium node fails, the smart contract reverts, or parsing the returnValue fails.
 * @returns A promise resolving with the corresponding {@linkcode TrackAndTrace.ReturnValueGetItemState}
 */
export async function getItemState(
    getItemStateParameter: TrackAndTraceContract.GetItemStateParameter,
): Promise<TrackAndTraceContract.ReturnValueGetItemState> {
    const dryRunResult = await TrackAndTraceContract.dryRunGetItemState(contract, getItemStateParameter);

    if (!dryRunResult || dryRunResult.tag === 'failure' || !dryRunResult.returnValue) {
        const parsedErrorCode = TrackAndTraceContract.parseReturnValueGetItemState(dryRunResult);

        throw new Error(
            `RPC call 'invokeContract' on method '${TrackAndTraceContract.contractName.value}.getItemState' of contract '${
                constants.CONTRACT_ADDRESS.index
            }' failed. Decoded error code: ${JSONbig.stringify(
                parsedErrorCode,
            )}. Original response: ${JSONbig.stringify(dryRunResult)}`,
        );
    }

    const parsedReturnValue = TrackAndTraceContract.parseReturnValueGetItemState(dryRunResult);

    if (parsedReturnValue === undefined) {
        throw new Error(
            `Deserializing the returnValue from the '${TrackAndTraceContract.contractName.value}.getItemState' method of contract '${constants.CONTRACT_ADDRESS.index}' failed`,
        );
    } else {
        return parsedReturnValue;
    }
}
