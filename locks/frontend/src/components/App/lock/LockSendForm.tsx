import { FormEvent, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { MetaUpdateOperationType, TokenAmount } from '@concordium/web-sdk';

import { ErrorMessage } from '../components/ErrorMessage';
import { FormCard } from '../components/FormCard';
import { MemoInput } from '../components/MemoInput';
import { SubmitButton } from '../components/SubmitButton';
import { TextInput } from '../components/TextInput';
import {
    defaultStatus,
    optionalMemo,
    parseError,
    requirePositiveAmount,
    requireValue,
    toCborAccount,
    toTokenId,
} from '../utils';

import type { LookupContext, Status } from '../types';

interface LockSendState {
    lockId: string;
    tokenId: string;
    source: string;
    amount: string;
    recipient: string;
    memo: string;
}

const blankLockSendState: LockSendState = {
    lockId: '',
    tokenId: '',
    source: '',
    amount: '',
    recipient: '',
    memo: '',
};

export function LockSendForm({ context }: { context: LookupContext }) {
    const [state, setState] = useState<LockSendState>(blankLockSendState);
    const [status, setStatus] = useState<Status>(defaultStatus);

    useEffect(() => {
        setState((current) =>
            current.source !== '' || !context.connectedAccount
                ? current
                : { ...current, source: context.connectedAccount },
        );
    }, [context.connectedAccount]);

    const setField = (field: keyof LockSendState, value: string) => {
        setState((current) => ({ ...current, [field]: value }));
    };

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        setStatus({ type: 'loading', message: 'Adding operation...' });

        try {
            const lock = await context.getLockId(state.lockId);
            const tokenId = requireValue(state.tokenId, 'Token ID');
            const amount = requirePositiveAmount(state.amount);
            const source = requireValue(state.source, 'Source account');
            const recipient = requireValue(state.recipient, 'Recipient account');
            const memo = optionalMemo(state.memo);
            const decimals = await context.getTokenDecimals(tokenId);

            context.addOperation({
                type: 'LockSend',
                preview: [
                    { label: 'Lock ID', value: state.lockId },
                    { label: 'Token ID', value: tokenId },
                    { label: 'Source account', value: source },
                    { label: 'Amount', value: amount },
                    { label: 'Recipient account', value: recipient },
                    { label: 'Memo', value: state.memo || '-' },
                ],
                build: () => ({
                    [MetaUpdateOperationType.LockSend]: {
                        token: toTokenId(tokenId),
                        lock,
                        source: toCborAccount(source),
                        amount: TokenAmount.fromDecimal(amount, decimals),
                        recipient: toCborAccount(recipient),
                        memo,
                    },
                }),
            });

            setStatus(defaultStatus);
        } catch (caughtError) {
            setStatus({ type: 'error', message: parseError(caughtError) });
        }
    };

    return (
        <FormCard title="LockSend" className="lock-operation-card">
            <Form onSubmit={submit}>
                <TextInput label="Lock ID" value={state.lockId} onChange={(value) => setField('lockId', value)} />
                <TextInput label="Token ID" value={state.tokenId} onChange={(value) => setField('tokenId', value)} />
                <TextInput
                    label="Source account"
                    value={state.source}
                    onChange={(value) => setField('source', value)}
                />
                <TextInput label="Amount" value={state.amount} onChange={(value) => setField('amount', value)} />
                <TextInput
                    label="Recipient account"
                    value={state.recipient}
                    onChange={(value) => setField('recipient', value)}
                />
                <MemoInput value={state.memo} onChange={(value) => setField('memo', value)} />
                <ErrorMessage message={status.type === 'error' ? status.message : undefined} />
                <SubmitButton loading={status.type === 'loading'}>Add</SubmitButton>
            </Form>
        </FormCard>
    );
}
