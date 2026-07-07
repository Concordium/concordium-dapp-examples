import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { MetaUpdateOperation, TokenAmount, TokenOperationType } from '@concordium/web-sdk';
import { useForm } from 'react-hook-form';

import { ErrorMessage } from '../../../components/ErrorMessage.tsx';
import { FormCard } from '../../../components/FormCard.tsx';
import { SubmitButton } from '../../../components/SubmitButton.tsx';
import { TextInput } from '../../../components/TextInput.tsx';
import { tokenIdExistsValidation } from '../../../lock/validation.ts';
import {
    defaultStatus,
    operationTitle,
    parseError,
    requirePositiveAmount,
    requireValue,
    toTokenId,
} from '../../../utils.ts';

import type { LookupContext, Status } from '../../../types.ts';

interface TokenAmountOperationFormProps {
    operation: TokenOperationType.Mint | TokenOperationType.Burn;
    context: LookupContext;
}

interface TokenAmountOperationState {
    tokenId: string;
    amount: string;
}

const blankTokenAmountOperationState: TokenAmountOperationState = {
    tokenId: '',
    amount: '',
};

export function TokenAmountOperationForm({ operation, context }: TokenAmountOperationFormProps) {
    const [status, setStatus] = useState<Status>(defaultStatus);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TokenAmountOperationState>({ defaultValues: blankTokenAmountOperationState });

    const submit = handleSubmit(async (state) => {
        setStatus({ type: 'loading', message: 'Adding operation...' });

        try {
            const tokenId = requireValue(state.tokenId, 'Token ID');
            const amount = requirePositiveAmount(state.amount);
            const decimals = await context.getTokenDecimals(tokenId);

            context.addOperation({
                type: operationTitle(operation),
                preview: [
                    { label: 'Token ID', value: tokenId },
                    { label: 'Amount', value: amount },
                ],
                build: () =>
                    ({
                        [operation]: {
                            token: toTokenId(tokenId),
                            amount: TokenAmount.fromDecimal(amount, decimals),
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
                    label="Amount"
                    registration={register('amount', {
                        required: 'Amount is required',
                        validate: (value) =>
                            (Number.isFinite(Number(value.trim())) && Number(value.trim()) > 0) ||
                            'Amount must be a positive decimal value',
                    })}
                    error={errors.amount?.message}
                />
                <ErrorMessage message={status.type === 'error' ? status.message : undefined} />
                <SubmitButton loading={status.type === 'loading'} isSubmitting={isSubmitting}>
                    Add
                </SubmitButton>
            </Form>
        </FormCard>
    );
}
