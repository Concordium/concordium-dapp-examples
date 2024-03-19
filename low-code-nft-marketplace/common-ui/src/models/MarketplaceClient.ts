import { SmartContractParameters, WalletApi } from '@concordium/browser-wallet-api-helpers';
import {
    BlockItemSummaryInBlock,
    ConcordiumGRPCClient,
    ContractAddress,
    deserializeReceiveReturnValue,
} from '@concordium/web-sdk';

import {
    ContractInfo,
    invokeContract,
    ParamContractAddress,
    toParamContractAddress,
    updateContract,
} from './ConcordiumContractClient';

const enum MethodNames {
    add = 'add',
    transfer = 'transfer',
    list = 'list',
}

/**
 * Gets a list of Tokens available to buy.
 * @param provider Wallet Provider.
 * @param marketContractAddress Contract Address.
 * @returns List of buyable tokens.
 */
export async function list(
    grpcClient: ConcordiumGRPCClient,
    marketContractAddress: ContractAddress,
    contractInfo: ContractInfo,
): Promise<TokenList> {
    const retValue = await invokeContract(grpcClient, contractInfo, marketContractAddress, MethodNames.list);

    const retValueDe = deserializeReceiveReturnValue(
        retValue,
        contractInfo.schemaBuffer,
        contractInfo.contractName,
        MethodNames.list,
    ) as TokenListItemJSON[][];

    const tokens = retValueDe[0].map((t: TokenListItemJSON) => ({
        contract: t.contract,
        owner: t.owner,
        price: BigInt(t.price),
        primaryOwner: t.primary_owner,
        quantity: BigInt(t.quantity),
        royalty: t.royalty,
        tokenId: t.token_id,
    }));
    return tokens;
}

/**
 * Adds a token to buyable list of tokens in marketplace.
 * @param provider Wallet Provider.
 * @param account Account address.
 * @param marketContractAddress Market place contract Address.
 * @param paramJson Marketplace Add Method Params.
 * @param maxContractExecutionEnergy Max energy allowed for the transaction.
 * @returns Transaction outcomes.
 */
export async function add(
    provider: WalletApi,
    account: string,
    marketContractAddress: ContractAddress,
    paramJson: AddParams,
    contractInfo: ContractInfo,
    maxContractExecutionEnergy = BigInt(9999),
): Promise<BlockItemSummaryInBlock> {
    return updateContract(
        provider,
        contractInfo,
        paramJson as unknown as SmartContractParameters,
        account,
        marketContractAddress,
        MethodNames.add,
        maxContractExecutionEnergy,
    );
}

/**
 * Transfers token ownership from the current owner to {@link account}.
 * @param provider Wallet Provider.
 * @param account Account address buying the token.
 * @param marketContractAddress Market contract address.
 * @param nftContractAddress CIS-NFT contract address.
 * @param tokenId Hex encoded Token Id
 * @param priceCcd Price of the Token
 * @param maxContractExecutionEnergy Max Energy allowed for the transaction.
 * @returns Transaction outcomes.
 */
export async function transfer(
    provider: WalletApi,
    account: string,
    marketContractAddress: ContractAddress,
    nftContractAddress: ContractAddress,
    tokenId: string,
    priceCcd: bigint,
    owner: string,
    quantity: bigint,
    contractInfo: ContractInfo,
    maxContractExecutionEnergy = BigInt(9999),
): Promise<BlockItemSummaryInBlock> {
    const paramJson: TransferParams = {
        cis_contract_address: toParamContractAddress(nftContractAddress),
        token_id: tokenId,
        to: account,
        owner,
        quantity: quantity.toString(),
    };

    return updateContract(
        provider,
        contractInfo,
        paramJson as unknown as SmartContractParameters,
        account,
        marketContractAddress,
        MethodNames.transfer,
        maxContractExecutionEnergy,
        priceCcd * quantity,
    );
}

export type TokenList = TokenListItem[];

export interface TokenListItem {
    /**
     * Hex of token Id
     */
    tokenId: string;
    contract: ContractAddress;
    price: bigint;
    owner: string;
    royalty: number;
    primaryOwner: string;
    quantity: bigint;
}

interface TokenListItemJSON {
    token_id: string;
    contract: ContractAddress;
    price: number;
    owner: string;
    royalty: number;
    primary_owner: string;
    quantity: number;
}

export interface AddParams {
    cis_contract_address: ParamContractAddress;
    token_id: string;
    price: string;
    royalty: number;
    quantity: string;
}

export interface TransferParams {
    cis_contract_address: ParamContractAddress;
    token_id: string;
    to: string;
    owner: string;
    quantity: string;
}
