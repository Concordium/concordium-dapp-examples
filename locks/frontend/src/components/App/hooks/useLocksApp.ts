import { useEffect, useState } from 'react';
import { detectConcordiumProvider, WalletApi } from '@concordium/browser-wallet-api-helpers';
import {
    AccountAddress,
    type AccountInfo,
    AccountTransactionType,
    ConcordiumGRPCClient,
    createMetaUpdatePayload,
    Lock,
    LockController,
    LockId,
    TokenId,
    type TokenInfo,
} from '@concordium/web-sdk';

import { BLOCK_LIST, ESTIMATED_LOCK_ID_LABEL, LOCK_OPERATIONS } from '../constants';
import { defaultStatus, parseError, requireValue } from '../utils';

import type { AddOperation, BlockListedChain, LookupContext, QueuedOperation, Status } from '../types';

const hasRelatedLockOperations = (queuedOperations: QueuedOperation[]) =>
    queuedOperations.some((operation) => LOCK_OPERATIONS.some((lockOperation) => lockOperation === operation.type));

export function useLocksApp() {
    const [provider, setProvider] = useState<WalletApi>();
    const [providerDetected, setProviderDetected] = useState(false);
    const [blockListedChain, setBlockListedChain] = useState<BlockListedChain>();
    const [connectedAccount, setConnectedAccount] = useState<string | null>();
    const [grpcClient, setGrpcClient] = useState<ConcordiumGRPCClient>();
    const [status, setStatus] = useState<Status>(defaultStatus);
    const [submitStatus, setSubmitStatus] = useState<Status>(defaultStatus);
    const [transactionHash, setTransactionHash] = useState('');
    const [operations, setOperations] = useState<QueuedOperation[]>([]);
    const [showEstimatedLockIdWarning, setShowEstimatedLockIdWarning] = useState(false);
    const [nextOperationId, setNextOperationId] = useState(1);
    const [tokenDecimalsCache, setTokenDecimalsCache] = useState<Record<string, number>>({});

    useEffect(() => {
        detectConcordiumProvider(5000)
            .then((walletProvider) => {
                setProvider(walletProvider);
                setStatus(defaultStatus);
            })
            .catch(() => setStatus({ type: 'error', message: 'Concordium Wallet not found' }))
            .finally(() => setProviderDetected(true));
    }, []);

    useEffect(() => {
        if (!provider) {
            return;
        }

        const syncChain = async () => {
            const chain = await provider.getSelectedChain();
            setBlockListedChain(BLOCK_LIST.find(({ genesisHash }) => genesisHash === chain));
        };

        const accountChanged = (account: string) => setConnectedAccount(account);
        const accountDisconnected = () => setConnectedAccount(undefined);
        const chainChanged = () => void syncChain();

        void syncChain();
        provider.on('accountChanged', accountChanged);
        provider.on('accountDisconnected', accountDisconnected);
        provider.on('chainChanged', chainChanged);

        return () => {
            provider.removeListener('accountChanged', accountChanged);
            provider.removeListener('accountDisconnected', accountDisconnected);
            provider.removeListener('chainChanged', chainChanged);
        };
    }, [provider]);

    useEffect(() => {
        if (!provider || blockListedChain) {
            setGrpcClient(undefined);
            return;
        }

        try {
            setGrpcClient(new ConcordiumGRPCClient(provider.grpcTransport));
        } catch (caughtError) {
            setStatus({ type: 'error', message: parseError(caughtError) });
        }
    }, [blockListedChain, provider]);

    const connect = async () => {
        try {
            setStatus({ type: 'loading', message: 'Connecting wallet...' });
            await provider?.requestAccounts();
            const account = await provider?.connect();
            setConnectedAccount(account);
            setStatus(defaultStatus);
        } catch {
            setStatus({ type: 'error', message: 'Connection rejected' });
        }
    };

    const addOperation: AddOperation = (operation) => {
        setOperations((current) => [...current, { ...operation, id: nextOperationId }]);
        setNextOperationId((current) => current + 1);
        setTransactionHash('');
    };

    const getAccountInfo = async (account: string): Promise<AccountInfo> => {
        const trimmedAccount = requireValue(account, 'Account');

        let address: AccountAddress.Type;
        try {
            address = AccountAddress.fromBase58(trimmedAccount);
        } catch {
            throw new Error('Account address is invalid');
        }

        if (!grpcClient) {
            throw new Error('GRPC connection is not available');
        }

        return grpcClient.getAccountInfo(address);
    };

    const getTokenInfo = async (tokenId: string): Promise<TokenInfo> => {
        const trimmedTokenId = requireValue(tokenId, 'Token ID');

        if (!grpcClient) {
            throw new Error('GRPC connection is not available');
        }

        const tokenInfo = await grpcClient.getTokenInfo(TokenId.fromString(trimmedTokenId));
        if (!tokenInfo) {
            throw new Error(`Token ID "${trimmedTokenId}" does not exist`);
        }

        return tokenInfo;
    };

    const getTokenDecimals = async (tokenId: string) => {
        const trimmedTokenId = requireValue(tokenId, 'Token ID');
        const cached = tokenDecimalsCache[trimmedTokenId];
        if (cached !== undefined) {
            return cached;
        }

        const decimals = (await getTokenInfo(trimmedTokenId)).state.decimals;
        setTokenDecimalsCache((current) => ({ ...current, [trimmedTokenId]: decimals }));
        return decimals;
    };

    const getLockId = (lockId: string) => {
        const trimmedLockId = requireValue(lockId, 'Lock ID');

        try {
            return LockId.fromString(trimmedLockId);
        } catch {
            throw new Error('Lock ID is invalid');
        }
    };

    const getQueuedLockCreateConfig = (trimmedLockId: string) =>
        operations.find(
            (operation) => operation.type === 'LockCreate' && operation.lockConfig?.lockId === trimmedLockId,
        )?.lockConfig;

    const validateLockId = async (lockId: string) => {
        const trimmedLockId = requireValue(lockId, 'Lock ID');
        const parsedLockId = getLockId(trimmedLockId);

        if (getQueuedLockCreateConfig(trimmedLockId)) {
            return parsedLockId;
        }

        if (!grpcClient) {
            throw new Error('GRPC connection is not available');
        }

        try {
            await Lock.fromId(grpcClient, parsedLockId);
            return parsedLockId;
        } catch {
            throw new Error(`Lock ID "${trimmedLockId}" does not exist`);
        }
    };

    const validateLockTokenId = async (lockId: string, tokenId: string) => {
        const trimmedLockId = requireValue(lockId, 'Lock ID');
        const trimmedTokenId = requireValue(tokenId, 'Token ID');
        const tokenInfo = await getTokenInfo(trimmedTokenId);
        const queuedLockConfig = getQueuedLockCreateConfig(trimmedLockId);

        if (queuedLockConfig) {
            if (queuedLockConfig.supportedTokenIds.includes(trimmedTokenId)) {
                return tokenInfo.id;
            }

            throw new Error(`Token ID "${trimmedTokenId}" is not configured for lock ${trimmedLockId}`);
        }

        const parsedLockId = getLockId(trimmedLockId);
        if (!grpcClient) {
            throw new Error('GRPC connection is not available');
        }

        let lock: Lock.Type;
        try {
            lock = await Lock.fromId(grpcClient, parsedLockId);
        } catch {
            throw new Error(`Lock ID "${trimmedLockId}" does not exist`);
        }

        const configuredTokens = lock.info.controller[LockController.Variant.SimpleV0].tokens;
        if (configuredTokens.some((configuredToken) => configuredToken.value === tokenInfo.id.value)) {
            return tokenInfo.id;
        }

        throw new Error(`Token ID "${trimmedTokenId}" is not configured for lock ${trimmedLockId}`);
    };

    const estimateLockId = async (creationOrder: number) => {
        if (!connectedAccount) {
            throw new Error('Connect Browser Wallet before estimating lock ID');
        }

        if (!grpcClient) {
            throw new Error('GRPC connection is not available');
        }

        const lockId = await LockId.fromAccount(grpcClient, AccountAddress.fromBase58(connectedAccount), creationOrder);
        return lockId.toString();
    };

    const getEstimatedLockId = async () => {
        const creationOrder = operations.filter((operation) => operation.type === 'LockCreate').length;
        return estimateLockId(creationOrder);
    };

    const recalculateEstimatedLockIds = async (queuedOperations: QueuedOperation[]) => {
        let creationOrder = 0;
        const recalculatedOperations: QueuedOperation[] = [];

        for (const operation of queuedOperations) {
            if (operation.type !== 'LockCreate') {
                recalculatedOperations.push(operation);
                continue;
            }

            const lockId = await estimateLockId(creationOrder);
            creationOrder += 1;

            recalculatedOperations.push({
                ...operation,
                lockConfig: operation.lockConfig ? { ...operation.lockConfig, lockId } : operation.lockConfig,
                preview: operation.preview.map((field) =>
                    field.label === ESTIMATED_LOCK_ID_LABEL ? { ...field, value: lockId } : field,
                ),
            });
        }

        return recalculatedOperations;
    };

    const context: LookupContext = {
        grpcClient,
        getAccountInfo,
        getTokenInfo,
        getTokenDecimals,
        getLockId,
        validateLockId,
        validateLockTokenId,
        getEstimatedLockId,
        addOperation,
        connectedAccount,
    };

    const submit = async () => {
        if (!provider || !connectedAccount) {
            setSubmitStatus({ type: 'error', message: 'Connect Browser Wallet before submitting' });
            return;
        }

        if (!operations.length) {
            setSubmitStatus({ type: 'error', message: 'Add at least one operation before submitting' });
            return;
        }

        try {
            setSubmitStatus({ type: 'loading', message: 'Submitting transaction...' });
            const payload = createMetaUpdatePayload(operations.map((operation) => operation.build()));
            const hash = await provider.sendTransaction(connectedAccount, AccountTransactionType.MetaUpdate, payload);
            setTransactionHash(hash);
            setOperations([]);
            setShowEstimatedLockIdWarning(false);
            setSubmitStatus(defaultStatus);
        } catch (caughtError) {
            setSubmitStatus({ type: 'error', message: parseError(caughtError) });
        }
    };

    const removeOperation = async (id: number) => {
        const removedOperation = operations.find((operation) => operation.id === id);
        const remainingOperations = operations.filter((operation) => operation.id !== id);

        if (
            removedOperation?.type !== 'LockCreate' ||
            !remainingOperations.some((operation) => operation.type === 'LockCreate')
        ) {
            setOperations(remainingOperations);
            setShowEstimatedLockIdWarning(
                (current) => current && remainingOperations.length > 0 && hasRelatedLockOperations(remainingOperations),
            );
            return;
        }

        try {
            const recalculatedOperations = await recalculateEstimatedLockIds(remainingOperations);
            setOperations(recalculatedOperations);
            setShowEstimatedLockIdWarning(
                recalculatedOperations.length > 0 && hasRelatedLockOperations(recalculatedOperations),
            );
        } catch (caughtError) {
            setOperations(remainingOperations);
            setShowEstimatedLockIdWarning(false);
            setStatus({ type: 'error', message: parseError(caughtError) });
        }
    };

    return {
        provider,
        providerDetected,
        blockListedChain,
        connectedAccount,
        grpcClient,
        status,
        submitStatus,
        transactionHash,
        operations,
        showEstimatedLockIdWarning,
        context,
        connect,
        submit,
        removeOperation,
    };
}
