import * as AcutionContract from '../generated/sponsored_tx_enabled_auction_sponsored_tx_enabled_auction'; // Code generated from a smart contract module.

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
import { ADD_ITEM_PARAMETER_SCHEMA, CONTRACT_SUB_INDEX, NODE, PORT } from './constants';
import { TypedSmartContractParameters, WalletConnection } from '@concordium/wallet-connectors';

const grpc = new ConcordiumGRPCWebClient(NODE, PORT);

const contract = AcutionContract.createUnchecked(
    grpc,
    ContractAddress.create(Number(process.env.AUCTION_CONTRACT_INDEX), CONTRACT_SUB_INDEX),
);

/**
 * Add new item to the auction contract.
 *
 * @param connection - The wallet connection to use for sending the transaction
 * @param accountAddress - The account address to send from
 * @param addItemParameter - The parameter for the add item function
 * @throws If the contract could not be updated
 * @returns A promise resolving with the corresponding {@linkcode TransactionHash.Type}
 */
export async function addItemTest(
    connection: WalletConnection,
    accountAddress: AccountAddress.Type,
    addItemParameter: AcutionContract.AddItemParameter,
): Promise<TransactionHash.Type> {

    const params: TypedSmartContractParameters = {
        parameters: addItemParameter,
        schema: {
            type: 'TypeSchema',
            value: toBuffer(ADD_ITEM_PARAMETER_SCHEMA, 'base64'),
        },
    };

    const result = await AcutionContract.dryRunAddItem(contract, addItemParameter);
    if (result.tag === 'failure' || result.returnValue === undefined) {
        throw new Error('Failed to invoke contract');
    }

    const maxContractExecutionEnergy = Energy.create(result.usedEnergy.value + 1n); // +1 needs to be here, as there seems to be an issue with running out of energy 1 energy prior to reaching the execution limit

    const payload: Omit<UpdateContractPayload, 'message'> = {
        amount: CcdAmount.zero(),
        address: ContractAddress.create(Number(process.env.AUCTION_CONTRACT_INDEX), CONTRACT_SUB_INDEX),
        receiveName: ReceiveName.create(AcutionContract.contractName, EntrypointName.fromString('addItem')),
        maxContractExecutionEnergy,
    };

    return connection
        .signAndSendTransaction(AccountAddress.toBase58(accountAddress), AccountTransactionType.Update, payload, params)
        .then(TransactionHash.fromHexString);
}
