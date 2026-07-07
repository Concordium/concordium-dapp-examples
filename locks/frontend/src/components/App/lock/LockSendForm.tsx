import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { MetaUpdateOperationType, TokenAmount } from '@concordium/web-sdk';
import { useForm } from 'react-hook-form';

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
import { lockIdValidation } from './validation';

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
    const [status, setStatus] = useState<Status>(defaultStatus);
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<LockSendState>({ defaultValues: blankLockSendState });

    useEffect(() => {
        if (getValues('source') !== '' || !context.connectedAccount) {
            return;
        }

        setValue('source', context.connectedAccount);
    }, [context.connectedAccount, getValues, setValue]);

    const submit = handleSubmit(async (state) => {
        setStatus({ type: 'loading', message: 'Adding operation...' });

        try {
            const lock = context.getLockId(state.lockId);
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
    });

    return (
        <FormCard title="LockSend" className="lock-operation-card">
            <Form onSubmit={submit}>
                <TextInput
                    label="Lock ID"
                    registration={register('lockId', lockIdValidation(context))}
                    error={errors.lockId?.message}
                />
                <TextInput
                    label="Token ID"
                    registration={register('tokenId', { required: 'Token ID is required' })}
                    error={errors.tokenId?.message}
                />
                <TextInput
                    label="Source account"
                    registration={register('source', { required: 'Source account is required' })}
                    error={errors.source?.message}
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
                <TextInput
                    label="Recipient account"
                    registration={register('recipient', { required: 'Recipient account is required' })}
                    error={errors.recipient?.message}
                />
                <MemoInput registration={register('memo')} />
                <ErrorMessage message={status.type === 'error' ? status.message : undefined} />
                <SubmitButton loading={status.type === 'loading'}>Add</SubmitButton>
            </Form>
        </FormCard>
    );
}
