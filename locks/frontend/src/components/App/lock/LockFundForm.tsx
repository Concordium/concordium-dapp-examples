import { FormEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { MetaUpdateOperationType, TokenAmount } from '@concordium/web-sdk';

import { ErrorMessage } from '../components/ErrorMessage';
import { FormCard } from '../components/FormCard';
import { MemoInput } from '../components/MemoInput';
import { SubmitButton } from '../components/SubmitButton';
import { TextInput } from '../components/TextInput';
import { defaultStatus, optionalMemo, parseError, requirePositiveAmount, requireValue, toTokenId } from '../utils';

import type { LookupContext, Status } from '../types';

interface LockFundState {
    lockId: string;
    tokenId: string;
    amount: string;
    memo: string;
}

const blankLockFundState: LockFundState = {
    lockId: '',
    tokenId: '',
    amount: '',
    memo: '',
};

export function LockFundForm({ context }: { context: LookupContext }) {
    const [state, setState] = useState<LockFundState>(blankLockFundState);
    const [status, setStatus] = useState<Status>(defaultStatus);

    const setField = (field: keyof LockFundState, value: string) => {
        setState((current) => ({ ...current, [field]: value }));
    };

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        setStatus({ type: 'loading', message: 'Adding operation...' });

        try {
            const lock = await context.getLockId(state.lockId);
            const tokenId = requireValue(state.tokenId, 'Token ID');
            const amount = requirePositiveAmount(state.amount);
            const memo = optionalMemo(state.memo);
            const decimals = await context.getTokenDecimals(tokenId);

            context.addOperation({
                type: 'LockFund',
                preview: [
                    { label: 'Lock ID', value: state.lockId },
                    { label: 'Token ID', value: tokenId },
                    { label: 'Amount', value: amount },
                    { label: 'Memo', value: state.memo || '-' },
                ],
                build: () => ({
                    [MetaUpdateOperationType.LockFund]: {
                        token: toTokenId(tokenId),
                        lock,
                        amount: TokenAmount.fromDecimal(amount, decimals),
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
        <FormCard title="LockFund" className="lock-operation-card">
            <Form onSubmit={submit}>
                <TextInput label="Lock ID" value={state.lockId} onChange={(value) => setField('lockId', value)} />
                <TextInput label="Token ID" value={state.tokenId} onChange={(value) => setField('tokenId', value)} />
                <TextInput label="Amount" value={state.amount} onChange={(value) => setField('amount', value)} />
                <MemoInput value={state.memo} onChange={(value) => setField('memo', value)} />
                <ErrorMessage message={status.type === 'error' ? status.message : undefined} />
                <SubmitButton loading={status.type === 'loading'}>Add</SubmitButton>
            </Form>
        </FormCard>
    );
}
