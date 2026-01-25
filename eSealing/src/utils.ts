import { createContext } from 'react';
import {
    AccountAddress,
    AccountTransactionType,
    CcdAmount,
    ConcordiumGRPCClient,
    ContractAddress,
    ContractName,
    EntrypointName,
    ReceiveName,
    Energy,
    serializeUpdateContractParameters,
    RejectedReceive,
} from '@concordium/web-sdk';
import { WalletConnection, moduleSchemaFromBase64 } from '@concordium/react-components';
import { EPSILON_ENERGY, E_SEALING_CONTRACT_NAME, E_SEALING_RAW_SCHEMA } from './constants';

/**
 * Action for registering a new file has in the eSealing smart contract instance
 */
export async function register(
    connection: WalletConnection,
    grpcClient: ConcordiumGRPCClient,
    account: string,
    fileHashHex: string,
    index: bigint,
    subindex = 0n,
) {
    const contractAddress = ContractAddress.create(index, subindex);
    const receiveName = ReceiveName.fromString(`${E_SEALING_CONTRACT_NAME}.registerFile`);

    const schema = moduleSchemaFromBase64(E_SEALING_RAW_SCHEMA);
    const serializedParameters = serializeUpdateContractParameters(
        ContractName.fromString(E_SEALING_CONTRACT_NAME),
        EntrypointName.fromString('registerFile'),
        fileHashHex,
        new Uint8Array(schema.value).buffer,
    );

    const invokeResult = await grpcClient.invokeContract({
        contract: contractAddress,
        method: receiveName,
        invoker: AccountAddress.fromBase58(account),
        parameter: serializedParameters,
    });

    if (!invokeResult || invokeResult.tag === 'failure') {
        const rejectReason = JSON.stringify((invokeResult?.reason as RejectedReceive)?.rejectReason);

        throw new Error(
            `RPC call 'invokeContract' on method '${receiveName.toString()}' of contract '${index}' failed.
            ${rejectReason !== undefined ? `Reject reason: ${rejectReason}` : ''}`,
        );
    }

    return connection.signAndSendTransaction(
        account,
        AccountTransactionType.Update,
        {
            amount: CcdAmount.fromMicroCcd(0),
            address: contractAddress,
            receiveName,
            maxContractExecutionEnergy: Energy.create(invokeResult.usedEnergy.value + EPSILON_ENERGY),
        },
        {
            parameters: fileHashHex,
            schema,
        },
    );
}

/**
 * Global application state.
 */
export interface State {
    isConnected: boolean;
    account: string | undefined;
}

export const state = createContext<State>({ isConnected: false, account: undefined });
