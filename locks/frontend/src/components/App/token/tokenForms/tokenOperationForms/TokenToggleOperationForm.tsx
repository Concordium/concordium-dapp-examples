import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { MetaUpdateOperation, TokenOperationType } from '@concordium/web-sdk';
import { useForm } from 'react-hook-form';

import { ErrorMessage } from '../../../components/ErrorMessage.tsx';
import { FormCard } from '../../../components/FormCard.tsx';
import { SubmitButton } from '../../../components/SubmitButton.tsx';
import { TextInput } from '../../../components/TextInput.tsx';
import { tokenIdExistsValidation } from '../../../lock/validation.ts';
import { defaultStatus, operationTitle, parseError, requireValue, toTokenId } from '../../../utils.ts';

import type { LookupContext, Status } from '../../../types.ts';

interface TokenToggleOperationFormProps {
    operation: TokenOperationType.Pause | TokenOperationType.Unpause;
    context: LookupContext;
}

interface TokenToggleOperationState {
    tokenId: string;
}

export function TokenToggleOperationForm({ operation, context }: TokenToggleOperationFormProps) {
    const [status, setStatus] = useState<Status>(defaultStatus);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TokenToggleOperationState>({ defaultValues: { tokenId: '' } });

    const submit = handleSubmit(({ tokenId }) => {
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
    });

    return (
        <FormCard title={operationTitle(operation)} className="token-operation-card">
            <Form onSubmit={submit}>
                <TextInput
                    label="Token ID"
                    registration={register('tokenId', tokenIdExistsValidation(context))}
                    error={errors.tokenId?.message}
                />
                <ErrorMessage message={status.type === 'error' ? status.message : undefined} />
                <SubmitButton loading={status.type === 'loading'}>Add</SubmitButton>
            </Form>
        </FormCard>
    );
}
