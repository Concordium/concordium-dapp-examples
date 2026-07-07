import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { MetaUpdateOperationType, TokenAmount } from '@concordium/web-sdk';
import { useForm } from 'react-hook-form';

import { ErrorMessage } from '../components/ErrorMessage';
import { FormCard } from '../components/FormCard';
import { MemoInput } from '../components/MemoInput';
import { SubmitButton } from '../components/SubmitButton';
import { TextInput } from '../components/TextInput';
import { defaultStatus, optionalMemo, parseError, requirePositiveAmount, requireValue, toTokenId } from '../utils';
import { lockIdValidation, lockTokenIdValidation } from './validation';

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
    const [status, setStatus] = useState<Status>(defaultStatus);
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<LockFundState>({ defaultValues: blankLockFundState });

    const submit = handleSubmit(async (state) => {
        setStatus({ type: 'loading', message: 'Adding operation...' });

        try {
            const lock = context.getLockId(state.lockId);
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
    });

    return (
        <FormCard title="LockFund" className="lock-operation-card">
            <Form onSubmit={submit}>
                <TextInput
                    label="Lock ID"
                    registration={register('lockId', lockIdValidation(context))}
                    error={errors.lockId?.message}
                />
                <TextInput
                    label="Token ID"
                    registration={register('tokenId', lockTokenIdValidation(context, () => getValues('lockId')))}
                    error={errors.tokenId?.message}
                />
                <TextInput
                    label="Amount"
                    registration={register('amount', {
                        required: 'Amount is required',
                        validate: (value) =>
                            (Number.isFinite(Number(value.trim())) && Number(value.trim()) > 0) ||
                            'Amount must be a positive decimal value',
                    })}
                    error={errors.amount?.message}
                />
                <MemoInput registration={register('memo')} />
                <ErrorMessage message={status.type === 'error' ? status.message : undefined} />
                <SubmitButton loading={status.type === 'loading'}>Add</SubmitButton>
            </Form>
        </FormCard>
    );
}
