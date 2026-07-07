import { FormEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { MetaUpdateOperation, TokenOperationType } from '@concordium/web-sdk';

import { ErrorMessage } from '../../../components/ErrorMessage.tsx';
import { FormCard } from '../../../components/FormCard.tsx';
import { SubmitButton } from '../../../components/SubmitButton.tsx';
import { TextInput } from '../../../components/TextInput.tsx';
import { defaultStatus, operationTitle, parseError, requireValue, toTokenId } from '../../../utils.ts';

import type { LookupContext, Status } from '../../../types.ts';

interface TokenToggleOperationFormProps {
    operation: TokenOperationType.Pause | TokenOperationType.Unpause;
    context: LookupContext;
}

export function TokenToggleOperationForm({ operation, context }: TokenToggleOperationFormProps) {
    const [tokenId, setTokenId] = useState('');
    const [status, setStatus] = useState<Status>(defaultStatus);

    const submit = (event: FormEvent) => {
        event.preventDefault();
        setStatus({ type: 'loading', message: 'Adding operation...' });

        try {
            const token = requireValue(tokenId, 'Token ID');

            context.addOperation({
                type: operationTitle(operation),
                preview: [{ label: 'Token ID', value: token }],
                build: () =>
                    ({
                        [operation]: {
                            token: toTokenId(token),
                        },
                    }) as MetaUpdateOperation,
            });

            setStatus(defaultStatus);
        } catch (caughtError) {
            setStatus({ type: 'error', message: parseError(caughtError) });
        }
    };

    return (
        <FormCard title={operationTitle(operation)} className="token-operation-card">
            <Form onSubmit={submit}>
                <TextInput label="Token ID" value={tokenId} onChange={setTokenId} />
                <ErrorMessage message={status.type === 'error' ? status.message : undefined} />
                <SubmitButton loading={status.type === 'loading'}>Add</SubmitButton>
            </Form>
        </FormCard>
    );
}
