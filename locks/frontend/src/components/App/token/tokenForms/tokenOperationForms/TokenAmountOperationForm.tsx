import { FormEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { MetaUpdateOperation, TokenAmount, TokenOperationType } from '@concordium/web-sdk';

import { ErrorMessage } from '../../../components/ErrorMessage.tsx';
import { FormCard } from '../../../components/FormCard.tsx';
import { SubmitButton } from '../../../components/SubmitButton.tsx';
import { TextInput } from '../../../components/TextInput.tsx';
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
    const [state, setState] = useState<TokenAmountOperationState>(blankTokenAmountOperationState);
    const [status, setStatus] = useState<Status>(defaultStatus);

    const setField = (field: keyof TokenAmountOperationState, value: string) => {
        setState((current) => ({ ...current, [field]: value }));
    };

    const submit = async (event: FormEvent) => {
        event.preventDefault();
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
    };

    return (
        <FormCard title={operationTitle(operation)} className="token-operation-card">
            <Form onSubmit={submit}>
                <TextInput label="Token ID" value={state.tokenId} onChange={(value) => setField('tokenId', value)} />
                <TextInput label="Amount" value={state.amount} onChange={(value) => setField('amount', value)} />
                <ErrorMessage message={status.type === 'error' ? status.message : undefined} />
                <SubmitButton loading={status.type === 'loading'}>Add</SubmitButton>
            </Form>
        </FormCard>
    );
}
