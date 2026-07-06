import { FormEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import {
    MetaUpdateOperation,
    TokenAdminRole,
    TokenAmount,
    TokenMetadataUrl,
    TokenOperationType,
} from '@concordium/web-sdk';

import { ErrorMessage } from '../components/ErrorMessage';
import { FormCard } from '../components/FormCard';
import { MemoInput } from '../components/MemoInput';
import { RoleCheckboxes } from '../components/RoleCheckboxes';
import { SubmitButton } from '../components/SubmitButton';
import { TextInput } from '../components/TextInput';
import { TOKEN_ADMIN_ROLES } from '../constants';
import {
    defaultStatus,
    operationTitle,
    optionalMemo,
    parseError,
    requirePositiveAmount,
    requireValue,
    toCborAccount,
    toHexBytes,
    toTokenId,
} from '../utils';

import type { LookupContext, PreviewField, Status } from '../types';

interface TokenFormState {
    tokenId: string;
    amount: string;
    recipient: string;
    target: string;
    account: string;
    metadataUrl: string;
    metadataChecksum: string;
    memo: string;
    roles: TokenAdminRole[];
}

const blankTokenFormState: TokenFormState = {
    tokenId: '',
    amount: '',
    recipient: '',
    target: '',
    account: '',
    metadataUrl: '',
    metadataChecksum: '',
    memo: '',
    roles: [],
};

export function TokenOperationForm({ operation, context }: { operation: TokenOperationType; context: LookupContext }) {
    const [state, setState] = useState<TokenFormState>(blankTokenFormState);
    const [status, setStatus] = useState<Status>(defaultStatus);

    const setField = <Field extends keyof TokenFormState>(field: Field, value: TokenFormState[Field]) => {
        setState((current) => ({ ...current, [field]: value }));
    };

    const needsAmount =
        operation === TokenOperationType.Transfer ||
        operation === TokenOperationType.Mint ||
        operation === TokenOperationType.Burn;
    const needsTarget =
        operation === TokenOperationType.AddAllowList ||
        operation === TokenOperationType.RemoveAllowList ||
        operation === TokenOperationType.AddDenyList ||
        operation === TokenOperationType.RemoveDenyList;
    const needsRoles =
        operation === TokenOperationType.AssignAdminRoles || operation === TokenOperationType.RevokeAdminRoles;

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        setStatus({ type: 'loading', message: 'Adding operation...' });

        try {
            const tokenId = requireValue(state.tokenId, 'Token ID');
            const preview: PreviewField[] = [{ label: 'Token ID', value: tokenId }];
            let amountDecimals: number | undefined;

            if (needsAmount) {
                amountDecimals = await context.getTokenDecimals(tokenId);
                preview.push({ label: 'Amount', value: requirePositiveAmount(state.amount) });
            }

            if (operation === TokenOperationType.Transfer) {
                preview.push(
                    { label: 'Recipient account', value: requireValue(state.recipient, 'Recipient account') },
                    { label: 'Memo', value: state.memo || '-' },
                );
            }

            if (operation === TokenOperationType.UpdateMetadata) {
                preview.push(
                    { label: 'Metadata URL', value: requireValue(state.metadataUrl, 'Metadata URL') },
                    { label: 'Metadata checksum', value: state.metadataChecksum || '-' },
                );
                toHexBytes(state.metadataChecksum);
            }

            if (needsTarget) {
                preview.push({ label: 'Target account', value: requireValue(state.target, 'Target account') });
            }

            if (needsRoles) {
                if (!state.roles.length) {
                    throw new Error('At least one role is required');
                }
                preview.push(
                    { label: 'Account', value: requireValue(state.account, 'Account') },
                    { label: 'Roles', value: state.roles.map(operationTitle).join(', ') },
                );
            }

            context.addOperation({
                type: operationTitle(operation),
                preview,
                build: () => {
                    const token = toTokenId(tokenId);
                    const amount =
                        amountDecimals === undefined
                            ? undefined
                            : TokenAmount.fromDecimal(requirePositiveAmount(state.amount), amountDecimals);

                    switch (operation) {
                        case TokenOperationType.Transfer:
                            return {
                                [TokenOperationType.Transfer]: {
                                    token,
                                    amount: amount!,
                                    recipient: toCborAccount(state.recipient),
                                    memo: optionalMemo(state.memo),
                                },
                            };
                        case TokenOperationType.Mint:
                            return {
                                [TokenOperationType.Mint]: {
                                    token,
                                    amount: amount!,
                                },
                            };
                        case TokenOperationType.Burn:
                            return {
                                [TokenOperationType.Burn]: {
                                    token,
                                    amount: amount!,
                                },
                            };
                        case TokenOperationType.AddAllowList:
                        case TokenOperationType.RemoveAllowList:
                        case TokenOperationType.AddDenyList:
                        case TokenOperationType.RemoveDenyList:
                            return {
                                [operation]: {
                                    token,
                                    target: toCborAccount(state.target),
                                },
                            } as MetaUpdateOperation;
                        case TokenOperationType.Pause:
                        case TokenOperationType.Unpause:
                            return {
                                [operation]: {
                                    token,
                                },
                            } as MetaUpdateOperation;
                        case TokenOperationType.UpdateMetadata: {
                            const metadataUrl = TokenMetadataUrl.create(
                                requireValue(state.metadataUrl, 'Metadata URL'),
                                toHexBytes(state.metadataChecksum),
                            );
                            return {
                                [TokenOperationType.UpdateMetadata]: Object.assign(metadataUrl, { token }),
                            };
                        }
                        case TokenOperationType.AssignAdminRoles:
                        case TokenOperationType.RevokeAdminRoles:
                            return {
                                [operation]: {
                                    token,
                                    account: toCborAccount(state.account),
                                    roles: state.roles,
                                },
                            } as MetaUpdateOperation;
                        default:
                            throw new Error('Unsupported token operation');
                    }
                },
            });

            setStatus(defaultStatus);
        } catch (caughtError) {
            setStatus({ type: 'error', message: parseError(caughtError) });
        }
    };

    return (
        <FormCard title={operationTitle(operation)}>
            <Form onSubmit={submit}>
                <TextInput label="Token ID" value={state.tokenId} onChange={(value) => setField('tokenId', value)} />
                {needsAmount && (
                    <TextInput label="Amount" value={state.amount} onChange={(value) => setField('amount', value)} />
                )}
                {operation === TokenOperationType.Transfer && (
                    <>
                        <TextInput
                            label="Recipient account"
                            value={state.recipient}
                            onChange={(value) => setField('recipient', value)}
                        />
                        <MemoInput value={state.memo} onChange={(value) => setField('memo', value)} />
                    </>
                )}
                {operation === TokenOperationType.UpdateMetadata && (
                    <>
                        <TextInput
                            label="Metadata URL"
                            value={state.metadataUrl}
                            onChange={(value) => setField('metadataUrl', value)}
                        />
                        <TextInput
                            label="Metadata checksum"
                            value={state.metadataChecksum}
                            placeholder="Optional 32-byte hex"
                            onChange={(value) => setField('metadataChecksum', value)}
                        />
                    </>
                )}
                {needsTarget && (
                    <TextInput
                        label="Target account"
                        value={state.target}
                        onChange={(value) => setField('target', value)}
                    />
                )}
                {needsRoles && (
                    <>
                        <TextInput
                            label="Account"
                            value={state.account}
                            onChange={(value) => setField('account', value)}
                        />
                        <Form.Group className="mb-3">
                            <Form.Label>Roles</Form.Label>
                            <RoleCheckboxes
                                roles={TOKEN_ADMIN_ROLES}
                                selected={state.roles}
                                name={`token-role-${operation}`}
                                onChange={(roles) => setField('roles', roles)}
                            />
                        </Form.Group>
                    </>
                )}
                <ErrorMessage message={status.type === 'error' ? status.message : undefined} />
                <SubmitButton loading={status.type === 'loading'}>Add</SubmitButton>
            </Form>
        </FormCard>
    );
}
