import { TokenOperationType } from '@concordium/web-sdk';

import { TokenAdminRolesOperationForm } from './tokenOperationForms/TokenAdminRolesOperationForm.tsx';

import type { TokenOperationFormProps } from './tokenOperationForms/TokenOperationFormProps.ts';

export function TokenRevokeAdminRolesForm({ context }: TokenOperationFormProps) {
    return <TokenAdminRolesOperationForm operation={TokenOperationType.RevokeAdminRoles} context={context} />;
}
