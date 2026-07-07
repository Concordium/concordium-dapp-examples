import { FormEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { MetaUpdateOperationType } from '@concordium/web-sdk';

import { ErrorMessage } from '../components/ErrorMessage';
import { FormCard } from '../components/FormCard';
import { MemoInput } from '../components/MemoInput';
import { SubmitButton } from '../components/SubmitButton';
import { TextInput } from '../components/TextInput';
import { defaultStatus, optionalMemo, parseError } from '../utils';

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
    const [state, setState] = useState<LockCancelState>(blankLockCancelState);
    const [status, setStatus] = useState<Status>(defaultStatus);

    const setField = (field: keyof LockCancelState, value: string) => {
        setState((current) => ({ ...current, [field]: value }));
    };

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        setStatus({ type: 'loading', message: 'Adding operation...' });

        try {
            const lock = await context.getLockId(state.lockId);
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
    };

    return (
        <FormCard title="LockCancel" className="lock-operation-card">
            <Form onSubmit={submit}>
                <TextInput label="Lock ID" value={state.lockId} onChange={(value) => setField('lockId', value)} />
                <MemoInput className="lock-memo" value={state.memo} onChange={(value) => setField('memo', value)} />
                <ErrorMessage message={status.type === 'error' ? status.message : undefined} />
                <SubmitButton loading={status.type === 'loading'}>Add</SubmitButton>
            </Form>
        </FormCard>
    );
}
