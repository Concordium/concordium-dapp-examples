import { createContext } from 'react';
import {
    AccountAddress,
    AccountTransactionType,
    CcdAmount,
    ConcordiumGRPCClient,
    ContractAddress,
    ContractContext,
    ContractName,
    Energy,
    EntrypointName,
    ReceiveName,
    RejectedReceive,
    serializeUpdateContractParameters,
} from '@concordium/web-sdk';
import { WalletConnection, moduleSchemaFromBase64 } from '@concordium/react-components';
import { CONTRACT_NAME, WRAP_FUNCTION_RAW_SCHEMA, UNWRAP_FUNCTION_RAW_SCHEMA, EPSILON_ENERGY } from './constants';

async function getExecutionEnergy(client: ConcordiumGRPCClient, invokeInput: ContractContext) {
    const invokeResult = await client.invokeContract(invokeInput);
    if (!invokeResult || invokeResult.tag === 'failure') {
        const rejectReason = JSON.stringify((invokeResult?.reason as RejectedReceive)?.rejectReason);

        throw new Error(
            `RPC call 'invokeContract' on method '${invokeInput.method.value}' of contract '${
                invokeInput.contract.index
            }' failed.
            ${rejectReason !== undefined ? `Reject reason: ${rejectReason}` : ''}`,
        );
    }
    return Energy.create(invokeResult.usedEnergy.value + EPSILON_ENERGY);
}

/**
 * Shared method for wrap and unwrap
 */
async function send(
    connection: WalletConnection,
    grpcClient: ConcordiumGRPCClient,
    methodName: string,
    base64Schema: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parameter: any,
    account: string,
    index: bigint,
    subindex = 0n,
    amount = 0,
) {
    const address = ContractAddress.create(index, subindex);
    const receiveName = ReceiveName.fromString(`${CONTRACT_NAME}.${methodName}`);
    const ccdAmount = CcdAmount.fromMicroCcd(BigInt(amount));
    const schema = moduleSchemaFromBase64(base64Schema);
    const serializedParameters = serializeUpdateContractParameters(
        ContractName.fromString(CONTRACT_NAME),
        EntrypointName.fromString(methodName),
        parameter,
        new Uint8Array(schema.value).buffer,
    );
    const maxContractExecutionEnergy = await getExecutionEnergy(grpcClient, {
        contract: address,
        method: receiveName,
        invoker: AccountAddress.fromBase58(account),
        amount: ccdAmount,
        parameter: serializedParameters,
    });

    return connection.signAndSendTransaction(
        account,
        AccountTransactionType.Update,
        {
            amount: ccdAmount,
            address,
            receiveName,
            maxContractExecutionEnergy,
        },
        {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            parameters: parameter,
            schema,
        },
    );
}

/**
 * Action for wrapping some CCD to WCCD in the WCCD smart contract instance
 */
export async function wrap(
    connection: WalletConnection,
    grpcClient: ConcordiumGRPCClient,
    account: string,
    index: bigint,
    subindex = 0n,
    amount = 0,
    receiver = account,
) {
    if (!Number.isInteger(amount) || amount <= 0) {
        throw new Error('invalid amount');
    }

    const parameter = {
        data: '',
        to: {
            Account: [receiver],
        },
    };
    return send(connection, grpcClient, 'wrap', WRAP_FUNCTION_RAW_SCHEMA, parameter, account, index, subindex, amount);
}

/**
 * Action for unwrapping some WCCD to CCD in the WCCD smart contract instance
 */
export async function unwrap(
    connection: WalletConnection,
    grpcClient: ConcordiumGRPCClient,
    account: string,
    index: bigint,
    subindex = 0n,
    amount = 0,
    receiver = account,
) {
    if (!Number.isInteger(amount) || amount <= 0) {
        throw new Error('invalid amount');
    }

    const parameter = {
        amount: amount.toString(),
        data: '',
        owner: {
            Account: [account],
        },
        receiver: {
            Account: [receiver],
        },
    };

    return send(connection, grpcClient, 'unwrap', UNWRAP_FUNCTION_RAW_SCHEMA, parameter, account, index, subindex, 0);
}

/**
 * Global application state.
 */
export interface State {
    isConnected: boolean;
    account: string | undefined;
}

export const state = createContext<State>({ isConnected: false, account: undefined });
