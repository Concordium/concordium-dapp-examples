import { ContractAddress, AccountAddress, TransactionExpiry, AccountSigner, AtomicStatementV2 } from '@concordium/web-sdk';

export interface Token {
    contractAddress: ContractAddress.Type;
    info: TokenInfo;
}

export type TopLevelStatement =
    | { type: 'account'; statement: AccountStatement }
    | { type: 'web3id'; statement: Web3IdStatement };

export type TopLevelStatements = TopLevelStatement[];

export interface TokenInfo {
    id: string;
    name?: string;
    symbol?: string;
    decimals?: number;
    totalSupply?: bigint;
}

export interface AddAllowListParams {
    token: Token;
    sender: AccountAddress.Type;
    targets: AccountAddress.Type | AccountAddress.Type[];
    signer: AccountSigner;
    expiry?: TransactionExpiry.Type;
}

export enum TokenOperationType {
    Mint = 0,
    Burn = 1,
    AddAllowList = 4,
    RemoveAllowList = 5,
    AddDenyList = 6,
    RemoveDenyList = 7,
}

export interface TokenGovernanceOperation {
    [key: number]: any;
}

export interface AccountStatement {
    idps: { name: string; id: number }[];
    statement: AtomicStatementV2[];
}

export interface Web3IdStatement {
    issuers: ContractAddress.Type[];
    statement: AtomicStatementV2[];
}