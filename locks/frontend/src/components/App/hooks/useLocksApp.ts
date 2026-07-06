import { useEffect, useState } from 'react';
import { detectConcordiumProvider, WalletApi } from '@concordium/browser-wallet-api-helpers';
import {
    AccountTransactionType,
    ConcordiumGRPCClient,
    createMetaUpdatePayload,
    Lock,
    LockId,
    Token,
    TokenId,
} from '@concordium/web-sdk';

import { BLOCK_LIST } from '../constants';
import { defaultStatus, parseError, requireValue } from '../utils';

import type { AddOperation, BlockListedChain, LookupContext, QueuedOperation, Status } from '../types';

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
    const [nextOperationId, setNextOperationId] = useState(1);
    const [tokenDecimalsCache, setTokenDecimalsCache] = useState<Record<string, number>>({});
    const [lockIdCache, setLockIdCache] = useState<Record<string, LockId.Type>>({});

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

    const getTokenDecimals = async (tokenId: string) => {
        const trimmedTokenId = requireValue(tokenId, 'Token ID');
        const cached = tokenDecimalsCache[trimmedTokenId];
        if (cached !== undefined) {
            return cached;
        }

        if (!grpcClient) {
            throw new Error('GRPC connection is not available');
        }

        const token = await Token.fromId(grpcClient, TokenId.fromString(trimmedTokenId));
        const decimals = token.info.state.decimals;
        setTokenDecimalsCache((current) => ({ ...current, [trimmedTokenId]: decimals }));
        return decimals;
    };

    const getLockId = async (lockId: string) => {
        const trimmedLockId = requireValue(lockId, 'Lock ID');
        const cached = lockIdCache[trimmedLockId];
        if (cached) {
            return cached;
        }

        if (!grpcClient) {
            throw new Error('GRPC connection is not available');
        }

        const lock = await Lock.fromId(grpcClient, LockId.fromString(trimmedLockId));
        setLockIdCache((current) => ({ ...current, [trimmedLockId]: lock.info.lock }));
        return lock.info.lock;
    };

    const context: LookupContext = {
        grpcClient,
        getTokenDecimals,
        getLockId,
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
            setSubmitStatus(defaultStatus);
        } catch (caughtError) {
            setSubmitStatus({ type: 'error', message: parseError(caughtError) });
        }
    };

    const removeOperation = (id: number) => {
        setOperations((current) => current.filter((operation) => operation.id !== id));
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
        context,
        connect,
        submit,
        removeOperation,
    };
}
