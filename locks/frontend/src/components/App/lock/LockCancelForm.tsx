import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { MetaUpdateOperationType } from '@concordium/web-sdk';
import { useForm } from 'react-hook-form';

import { ErrorMessage } from '../components/ErrorMessage';
import { FormCard } from '../components/FormCard';
import { MemoInput } from '../components/MemoInput';
import { SubmitButton } from '../components/SubmitButton';
import { TextInput } from '../components/TextInput';
import { defaultStatus, optionalMemo, parseError } from '../utils';
import { lockIdValidation } from './validation';

import type { LookupContext, Status } from '../types';

interface LockCancelState {
    lockId: string;
    memo: string;
}

const blankLockCancelState: LockCancelState = {
    lockId: '',
    memo: '',
};

export function LockCancelForm({ context }: { context: LookupContext }) {
    const [status, setStatus] = useState<Status>(defaultStatus);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LockCancelState>({ defaultValues: blankLockCancelState });

    const submit = handleSubmit((state) => {
        setStatus({ type: 'loading', message: 'Adding operation...' });

        try {
            const lock = context.getLockId(state.lockId);
            const memo = optionalMemo(state.memo);

            context.addOperation({
                type: 'LockCancel',
                preview: [
                    { label: 'Lock ID', value: state.lockId },
                    { label: 'Memo', value: state.memo || '-' },
                ],
                build: () => ({
                    [MetaUpdateOperationType.LockCancel]: {
                        lock,
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
        <FormCard title="LockCancel" className="lock-operation-card">
            <Form onSubmit={submit}>
                <TextInput
                    label="Lock ID"
                    registration={register('lockId', lockIdValidation(context))}
                    error={errors.lockId?.message}
                />
                <MemoInput className="lock-memo" registration={register('memo')} />
                <ErrorMessage message={status.type === 'error' ? status.message : undefined} />
                <SubmitButton loading={status.type === 'loading'} isSubmitting={isSubmitting}>
                    Add
                </SubmitButton>
            </Form>
        </FormCard>
    );
}
