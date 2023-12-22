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
import {
    ADD_ITEM_PARAMETER_SCHEMA,
    AUCTION_CONTRACT_NAME,
    AUCTION_END,
    AUCTION_START,
    CONTRACT_SUB_INDEX,
    EPSILON_ENERGY,
    NODE,
    PORT,
} from './constants';
import { TypedSmartContractParameters, WalletConnection } from '@concordium/wallet-connectors';

import JSONbig from 'json-bigint';

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
    const result = await AcutionContract.dryRunAddItem(contract, addItemParameter);

    if (!result || result.tag === 'failure' || !result.returnValue) {
        throw new Error(
            `RPC call 'invokeContract' on method '${AUCTION_CONTRACT_NAME.value}.addItem' of contract '${
                process.env.AUCTION_CONTRACT_INDEX
            }' failed. Response: ${JSONbig.stringify(result)}`,
        );
    }

    const maxContractExecutionEnergy = Energy.create(result.usedEnergy.value + EPSILON_ENERGY); // + EPSILON_ENERGY needs to be here, as there seems to be an issue with running out of energy 1 energy prior to reaching the execution limit

    const payload: Omit<UpdateContractPayload, 'message'> = {
        amount: CcdAmount.zero(),
        address: ContractAddress.create(Number(process.env.AUCTION_CONTRACT_INDEX), CONTRACT_SUB_INDEX),
        receiveName: ReceiveName.create(AcutionContract.contractName, EntrypointName.fromString('addItem')),
        maxContractExecutionEnergy,
    };

    // The `ccd-js-gen` tool is not fully integrated with the browser wallet yet and we need
    // to manually convert from Cis2MultiContract.AddItemParameter to TypedSmartContractParameters.
    const params: TypedSmartContractParameters = {
        parameters: {
            end: AUCTION_END, // Hardcoded value for simplicity for this demo dApp.
            start: AUCTION_START, // Hardcoded value for simplicity for this demo dApp.
            minimum_bid: addItemParameter.minimum_bid.toString(),
            name: addItemParameter.name,
            token_id: addItemParameter.token_id,
        },
        schema: {
            type: 'TypeSchema',
            value: toBuffer(ADD_ITEM_PARAMETER_SCHEMA, 'base64'),
        },
    };

    return connection
        .signAndSendTransaction(AccountAddress.toBase58(accountAddress), AccountTransactionType.Update, payload, params)
        .then(TransactionHash.fromHexString);
}
