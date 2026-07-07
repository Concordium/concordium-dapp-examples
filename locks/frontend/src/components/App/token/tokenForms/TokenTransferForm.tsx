import { FormEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { TokenAmount, TokenOperationType } from '@concordium/web-sdk';

import { ErrorMessage } from '../../components/ErrorMessage.tsx';
import { FormCard } from '../../components/FormCard.tsx';
import { MemoInput } from '../../components/MemoInput.tsx';
import { SubmitButton } from '../../components/SubmitButton.tsx';
import { TextInput } from '../../components/TextInput.tsx';
import {
    defaultStatus,
    operationTitle,
    optionalMemo,
    parseError,
    requirePositiveAmount,
    requireValue,
    toCborAccount,
    toTokenId,
} from '../../utils.ts';

import type { Status } from '../../types.ts';
import type { TokenOperationFormProps } from './tokenOperationForms/TokenOperationFormProps.ts';

interface TokenTransferState {
    tokenId: string;
    amount: string;
    recipient: string;
    memo: string;
}

const blankTokenTransferState: TokenTransferState = {
    tokenId: '',
    amount: '',
    recipient: '',
    memo: '',
};

export function TokenTransferForm({ context }: TokenOperationFormProps) {
    const [state, setState] = useState<TokenTransferState>(blankTokenTransferState);
    const [status, setStatus] = useState<Status>(defaultStatus);

    const setField = (field: keyof TokenTransferState, value: string) => {
        setState((current) => ({ ...current, [field]: value }));
    };

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        setStatus({ type: 'loading', message: 'Adding operation...' });

        try {
            const tokenId = requireValue(state.tokenId, 'Token ID');
            const amount = requirePositiveAmount(state.amount);
            const recipient = requireValue(state.recipient, 'Recipient account');
            const decimals = await context.getTokenDecimals(tokenId);

            context.addOperation({
                type: operationTitle(TokenOperationType.Transfer),
                preview: [
                    { label: 'Token ID', value: tokenId },
                    { label: 'Amount', value: amount },
                    { label: 'Recipient', value: recipient },
                    { label: 'Memo', value: state.memo || '-' },
                ],
                build: () => ({
                    [TokenOperationType.Transfer]: {
                        token: toTokenId(tokenId),
                        amount: TokenAmount.fromDecimal(amount, decimals),
                        recipient: toCborAccount(recipient),
                        memo: optionalMemo(state.memo),
                    },
                }),
            });

            setStatus(defaultStatus);
        } catch (caughtError) {
            setStatus({ type: 'error', message: parseError(caughtError) });
        }
    };

    return (
        <FormCard title={operationTitle(TokenOperationType.Transfer)} className="token-operation-card">
            <Form onSubmit={submit}>
                <TextInput label="Token ID" value={state.tokenId} onChange={(value) => setField('tokenId', value)} />
                <TextInput label="Amount" value={state.amount} onChange={(value) => setField('amount', value)} />
                <TextInput
                    label="Recipient account"
                    value={state.recipient}
                    onChange={(value) => setField('recipient', value)}
                />
                <MemoInput value={state.memo} onChange={(value) => setField('memo', value)} />
                <ErrorMessage message={status.type === 'error' ? status.message : undefined} />
                <SubmitButton loading={status.type === 'loading'}>Add</SubmitButton>
            </Form>
        </FormCard>
    );
}
