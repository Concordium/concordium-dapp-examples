import { TokenOperationType } from '@concordium/web-sdk';

import { TokenAdminRolesOperationForm } from './tokenOperationForms/TokenAdminRolesOperationForm.tsx';

import type { TokenOperationFormProps } from './tokenOperationForms/TokenOperationFormProps.ts';

export function TokenAssignAdminRolesForm({ context }: TokenOperationFormProps) {
    return <TokenAdminRolesOperationForm operation={TokenOperationType.AssignAdminRoles} context={context} />;
}
