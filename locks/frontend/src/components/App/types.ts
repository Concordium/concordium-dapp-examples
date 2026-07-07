import type { ConcordiumGRPCClient, LockController, LockId, MetaUpdateOperation } from '@concordium/web-sdk';

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
}

export type AddOperation = (operation: Omit<QueuedOperation, 'id'>) => void;

export interface LookupContext {
    grpcClient?: ConcordiumGRPCClient;
    getTokenDecimals: (tokenId: string) => Promise<number>;
    getLockId: (lockId: string) => LockId.Type;
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
