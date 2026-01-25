import * as AuctionContract from '../generated/sponsored_tx_enabled_auction_sponsored_tx_enabled_auction'; // Code generated from a smart contract module. The naming convention of the generated file is `moduleName_smartContractName`.

import {
    AccountTransactionType,
    UpdateContractPayload,
    CcdAmount,
    ReceiveName,
    EntrypointName,
    Energy,
    AccountAddress,
    TransactionHash,
} from '@concordium/web-sdk';
import { AUCTION_CONTRACT_NAME, EPSILON_ENERGY, AUCTION_CONTRACT } from './constants';
import { WalletConnection } from '@concordium/wallet-connectors';

import JSONbig from 'json-bigint';

/**
 * This function submits a transaction to add an item to the auction contract.
 *
 * @param connection - The wallet connection to use for sending the transaction.
 * @param accountAddress - The account address to send from.
 * @param addItemParameter - The parameter for the addItem function.
 * @throws If simulating the contract update fails.
 * @returns A promise resolving with the corresponding {@linkcode TransactionHash.Type}
 */
export async function addItem(
    connection: WalletConnection,
    accountAddress: AccountAddress.Type,
    addItemParameter: AuctionContract.AddItemParameter,
): Promise<TransactionHash.Type> {
    const dryRunResult = await AuctionContract.dryRunAddItem(AUCTION_CONTRACT, addItemParameter);

    if (!dryRunResult || dryRunResult.tag === 'failure' || !dryRunResult.returnValue) {
        const parsedErrorCode = AuctionContract.parseErrorMessageAddItem(dryRunResult)?.type;

        throw new Error(
            `RPC call 'invokeContract' on method '${AUCTION_CONTRACT_NAME.value}.addItem' of contract '${
                process.env.AUCTION_CONTRACT_INDEX
            }' failed. Decoded error code: ${JSONbig.stringify(
                parsedErrorCode,
            )}. Original response: ${JSONbig.stringify(dryRunResult)}`,
        );
    }

    const maxContractExecutionEnergy = Energy.create(dryRunResult.usedEnergy.value + EPSILON_ENERGY);

    const payload: Omit<UpdateContractPayload, 'message'> = {
        amount: CcdAmount.zero(),
        address: AUCTION_CONTRACT.contractAddress,
        receiveName: ReceiveName.create(AuctionContract.contractName, EntrypointName.fromString('addItem')),
        maxContractExecutionEnergy,
    };

    return connection
        .signAndSendTransaction(
            AccountAddress.toBase58(accountAddress),
            AccountTransactionType.Update,
            payload,
            AuctionContract.createAddItemParameterWebWallet(addItemParameter),
        )
        .then(TransactionHash.fromHexString);
}

/**
 * This function views the item state in the auction contract.
 *
 * @param viewItemState - The parameter for the viewItemState function.
 * @throws If the communicate with the Concordium node fails, the smart contract reverts, or parsing the returnValue fails.
 * @returns A promise resolving with the corresponding {@linkcode AuctionContract.ReturnValueViewItemState}
 */
export async function viewItemState(
    viewItemState: AuctionContract.ViewItemStateParameter,
): Promise<AuctionContract.ReturnValueViewItemState> {
    const dryRunResult = await AuctionContract.dryRunViewItemState(AUCTION_CONTRACT, viewItemState);

    if (!dryRunResult || dryRunResult.tag === 'failure' || !dryRunResult.returnValue) {
        const parsedErrorCode = AuctionContract.parseErrorMessageViewItemState(dryRunResult)?.type;

        throw new Error(
            `RPC call 'invokeContract' on method '${AUCTION_CONTRACT_NAME.value}.viewItemState' of contract '${
                process.env.AUCTION_CONTRACT_INDEX
            }' failed. Decoded error code: ${JSONbig.stringify(
                parsedErrorCode,
            )}. Original response: ${JSONbig.stringify(dryRunResult)}`,
        );
    }

    const parsedReturnValue = AuctionContract.parseReturnValueViewItemState(dryRunResult);

    if (parsedReturnValue === undefined) {
        throw new Error(
            `Deserializing the returnValue from the '${AUCTION_CONTRACT_NAME.value}.viewItemState' method of contract '${process.env.AUCTION_CONTRACT_INDEX}' failed`,
        );
    } else {
        return parsedReturnValue;
    }
}
