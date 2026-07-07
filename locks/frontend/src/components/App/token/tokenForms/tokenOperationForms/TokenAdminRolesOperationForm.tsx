import { FormEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { MetaUpdateOperation, TokenAdminRole, TokenOperationType } from '@concordium/web-sdk';

import { ErrorMessage } from '../../../components/ErrorMessage.tsx';
import { FormCard } from '../../../components/FormCard.tsx';
import { RoleCheckboxes } from '../../../components/RoleCheckboxes.tsx';
import { SubmitButton } from '../../../components/SubmitButton.tsx';
import { TextInput } from '../../../components/TextInput.tsx';
import { TOKEN_ADMIN_ROLES } from '../../../constants.ts';
import { defaultStatus, operationTitle, parseError, requireValue, toCborAccount, toTokenId } from '../../../utils.ts';

import type { LookupContext, Status } from '../../../types.ts';

interface TokenAdminRolesOperationFormProps {
    operation: TokenOperationType.AssignAdminRoles | TokenOperationType.RevokeAdminRoles;
    context: LookupContext;
}

interface TokenAdminRolesOperationState {
    tokenId: string;
    account: string;
    roles: TokenAdminRole[];
}

const blankTokenAdminRolesOperationState: TokenAdminRolesOperationState = {
    tokenId: '',
    account: '',
    roles: [],
};

export function TokenAdminRolesOperationForm({ operation, context }: TokenAdminRolesOperationFormProps) {
    const [state, setState] = useState<TokenAdminRolesOperationState>(blankTokenAdminRolesOperationState);
    const [status, setStatus] = useState<Status>(defaultStatus);

    const setField = <Field extends keyof TokenAdminRolesOperationState>(
        field: Field,
        value: TokenAdminRolesOperationState[Field],
    ) => {
        setState((current) => ({ ...current, [field]: value }));
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();
        setStatus({ type: 'loading', message: 'Adding operation...' });

        try {
            const tokenId = requireValue(state.tokenId, 'Token ID');
            const account = requireValue(state.account, 'Account');

            if (!state.roles.length) {
                throw new Error('At least one role is required');
            }

            context.addOperation({
                type: operationTitle(operation),
                preview: [
                    { label: 'Token ID', value: tokenId },
                    { label: 'Account', value: account },
                    { label: 'Roles', value: state.roles.map(operationTitle).join(', ') },
                ],
                build: () =>
                    ({
                        [operation]: {
                            token: toTokenId(tokenId),
                            account: toCborAccount(account),
                            roles: state.roles,
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
                <TextInput label="Account" value={state.account} onChange={(value) => setField('account', value)} />
                <Form.Group className="mb-3">
                    <Form.Label>Roles</Form.Label>
                    <RoleCheckboxes
                        roles={TOKEN_ADMIN_ROLES}
                        selected={state.roles}
                        name={`token-role-${operation}`}
                        onChange={(roles) => setField('roles', roles)}
                    />
                </Form.Group>
                <ErrorMessage message={status.type === 'error' ? status.message : undefined} />
                <SubmitButton loading={status.type === 'loading'}>Add</SubmitButton>
            </Form>
        </FormCard>
    );
}
