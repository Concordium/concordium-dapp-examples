import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { MetaUpdateOperation, TokenOperationType } from '@concordium/web-sdk';
import { useForm } from 'react-hook-form';

import { ErrorMessage } from '../../../components/ErrorMessage.tsx';
import { FormCard } from '../../../components/FormCard.tsx';
import { SubmitButton } from '../../../components/SubmitButton.tsx';
import { TextInput } from '../../../components/TextInput.tsx';
import { accountExistsValidation, tokenIdExistsValidation } from '../../../lock/validation.ts';
import { defaultStatus, operationTitle, parseError, requireValue, toCborAccount, toTokenId } from '../../../utils.ts';

import type { LookupContext, Status } from '../../../types.ts';

type TargetAccountOperation =
    | TokenOperationType.AddAllowList
    | TokenOperationType.RemoveAllowList
    | TokenOperationType.AddDenyList
    | TokenOperationType.RemoveDenyList;

interface TokenTargetAccountOperationFormProps {
    operation: TargetAccountOperation;
    context: LookupContext;
}

interface TokenTargetAccountOperationState {
    tokenId: string;
    target: string;
}

const blankTokenTargetAccountOperationState: TokenTargetAccountOperationState = {
    tokenId: '',
    target: '',
};

export function TokenTargetAccountOperationForm({ operation, context }: TokenTargetAccountOperationFormProps) {
    const [status, setStatus] = useState<Status>(defaultStatus);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TokenTargetAccountOperationState>({ defaultValues: blankTokenTargetAccountOperationState });

    const submit = handleSubmit((state) => {
        setStatus({ type: 'loading', message: 'Adding operation...' });

        try {
            const tokenId = requireValue(state.tokenId, 'Token ID');
            const target = requireValue(state.target, 'Target account');

            context.addOperation({
                type: operationTitle(operation),
                preview: [
                    { label: 'Token ID', value: tokenId },
                    { label: 'Target account', value: target },
                ],
                build: () =>
                    ({
                        [operation]: {
                            token: toTokenId(tokenId),
                            target: toCborAccount(target),
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
                <TextInput
                    label="Target account"
                    registration={register('target', accountExistsValidation(context, 'Target account'))}
                    error={errors.target?.message}
                />
                <ErrorMessage message={status.type === 'error' ? status.message : undefined} />
                <SubmitButton loading={status.type === 'loading'}>Add</SubmitButton>
            </Form>
        </FormCard>
    );
}
