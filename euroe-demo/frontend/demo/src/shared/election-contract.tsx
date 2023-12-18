import * as ElectionContract from '../__generated__/election-contract/module_election';
import {
    AccountTransactionType,
    ConcordiumGRPCWebClient,
    Parameter,
    toBuffer,
    UpdateContractPayload,
    CcdAmount,
    ReceiveName,
    HexString,
    EntrypointName,
    Energy,
    AccountAddress,
    TransactionHash,
} from '@concordium/web-sdk';
import { CONTRACT_ADDRESS, GRPC_ADDRESS, GRPC_PORT } from './constants';
import { TypedSmartContractParameters, WalletConnection } from '@concordium/wallet-connectors';

export * as ElectionContract from '../__generated__/election-contract/module_election';

/**
 * Representation of a url with associated checksum from the election contract.
 */
export interface ChecksumUrl {
    url: string;
    hash: HexString;
}

const grpc = new ConcordiumGRPCWebClient(GRPC_ADDRESS, GRPC_PORT);
const contract = ElectionContract.createUnchecked(grpc, CONTRACT_ADDRESS);

const REGISTER_VOTES_SCHEMA = toBuffer('EAIUAAIAAAAPAAAAY2FuZGlkYXRlX2luZGV4AggAAABoYXNfdm90ZQE=', 'base64');

/**
 * Register a ballot in the election contract.
 *
 * @param ballot - The ballot to register the votes for
 * @param connection - The wallet connection to use for sending the transaction
 * @param accountAddress - The account address to send from
 *
 * @throws If the contract could not be updated
 * @returns A promise resolving with the corresponding {@linkcode TransactionHash.Type}
 */
export async function registerVotes(
    ballot: ElectionContract.RegisterVotesParameter,
    connection: WalletConnection,
    accountAddress: AccountAddress.Type,
): Promise<TransactionHash.Type> {
    const params: TypedSmartContractParameters = {
        parameters: ballot,
        schema: { type: 'TypeSchema', value: REGISTER_VOTES_SCHEMA },
    };

    const result = await ElectionContract.dryRunRegisterVotes(contract, ballot);
    if (result.tag === 'failure' || result.returnValue === undefined) {
        throw new Error('Failed to invoke contract');
    }

    const maxContractExecutionEnergy = Energy.create(result.usedEnergy.value + 1n); // +1 needs to be here, as there seems to be an issue with running out of energy 1 energy prior to reaching the execution limit
    const payload: Omit<UpdateContractPayload, 'message'> = {
        amount: CcdAmount.zero(),
        address: CONTRACT_ADDRESS,
        receiveName: ReceiveName.create(ElectionContract.contractName, EntrypointName.fromString('registerVotes')),
        maxContractExecutionEnergy,
    };
    return connection
        .signAndSendTransaction(AccountAddress.toBase58(accountAddress), AccountTransactionType.Update, payload, params)
        .then(TransactionHash.fromHexString);
}

/**
 * Gets the configuration of the election contract.
 * @returns A promise resolving with the corresponding {@linkcode ElectionContract.ReturnValueViewConfig}
 */
export async function getElectionConfig() {
    const result = await ElectionContract.dryRunViewConfig(contract, Parameter.empty());
    return ElectionContract.parseReturnValueViewConfig(result);
}
