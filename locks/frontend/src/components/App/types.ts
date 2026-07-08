import type {
    AccountInfo,
    ConcordiumGRPCClient,
    LockController,
    LockId,
    MetaUpdateOperation,
    TokenId,
    TokenInfo,
} from '@concordium/web-sdk';

export interface Status {
    type: 'idle' | 'loading' | 'error' | 'success';
    message: string;
}

export interface PreviewField {
    label: string;
    value: string;
}

export interface QueuedOperation {
    id: number;
    type: string;
    preview: PreviewField[];
    build: () => MetaUpdateOperation;
    lockConfig?: {
        lockId: string;
        supportedTokenIds: string[];
    };
}

export type AddOperation = (operation: Omit<QueuedOperation, 'id'>) => void;

export interface LookupContext {
    grpcClient?: ConcordiumGRPCClient;
    getAccountInfo: (account: string) => Promise<AccountInfo>;
    getTokenInfo: (tokenId: string) => Promise<TokenInfo>;
    getTokenDecimals: (tokenId: string) => Promise<number>;
    getLockId: (lockId: string) => LockId.Type;
    validateLockId: (lockId: string) => Promise<LockId.Type>;
    validateLockTokenId: (lockId: string, tokenId: string) => Promise<TokenId.Type>;
    getEstimatedLockId: () => Promise<string>;
    addOperation: AddOperation;
    connectedAccount?: string | null;
}

export interface BlockListedChain {
    genesisHash: string;
    name: string;
}

export interface ControllerGrantForm {
    account: string;
    roles: LockController.SimpleV0Capability[];
}

export interface LockCreateState {
    anyRecipient: boolean;
    recipients: string[];
    expiryDate: string;
    controllerGrants: ControllerGrantForm[];
    supportedTokens: string[];
    keepAlive: boolean;
    memo: string;
}

export type LockOperation = 'LockCancel' | 'LockFund' | 'LockSend' | 'LockReturn';
