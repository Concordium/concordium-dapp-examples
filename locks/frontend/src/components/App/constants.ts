import { LockController, TokenAdminRole, TokenOperationType } from '@concordium/web-sdk';

import type { BlockListedChain, LockOperation, LockCreateState } from './types';

export const BLOCK_LIST: BlockListedChain[] = [
    {
        genesisHash: '9dd9ca4d19e9393877d2c44b70f89acbfc0883c2243e5eeaecc0d1cd0503f478',
        name: 'Concordium Mainnet',
    },
];

export const LOCK_ROLES = [
    LockController.SimpleV0Capability.Fund,
    LockController.SimpleV0Capability.Send,
    LockController.SimpleV0Capability.Return,
    LockController.SimpleV0Capability.Cancel,
];

export const LOCK_OPERATIONS: LockOperation[] = ['LockCancel', 'LockFund', 'LockSend', 'LockReturn'];

export const TOKEN_ADMIN_ROLES = Object.values(TokenAdminRole);

export const TOKEN_OPERATIONS = [
    TokenOperationType.Transfer,
    TokenOperationType.UpdateMetadata,
    TokenOperationType.Mint,
    TokenOperationType.Burn,
    TokenOperationType.AddAllowList,
    TokenOperationType.RemoveAllowList,
    TokenOperationType.AddDenyList,
    TokenOperationType.RemoveDenyList,
    TokenOperationType.Pause,
    TokenOperationType.Unpause,
    TokenOperationType.AssignAdminRoles,
    TokenOperationType.RevokeAdminRoles,
];

export const blankLockCreateState = (account?: string | null): LockCreateState => ({
    anyRecipient: false,
    recipients: [''],
    expiryMinutes: '15',
    controllerGrants: [
        {
            account: account ?? '',
            roles: [...LOCK_ROLES],
        },
    ],
    supportedTokens: [''],
    keepAlive: false,
    memo: '',
});
