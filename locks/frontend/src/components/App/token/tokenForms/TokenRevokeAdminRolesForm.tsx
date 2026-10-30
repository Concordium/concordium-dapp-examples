import { OperationType } from '@concordium/web-sdk';

import { TokenAdminRolesOperationForm } from './tokenOperationForms/TokenAdminRolesOperationForm.tsx';

import { LookupContext } from '../../types.ts';

export function TokenRevokeAdminRolesForm({ context }: { context: LookupContext }) {
    return <TokenAdminRolesOperationForm operation={OperationType.TokenRevokeAdminRoles} context={context} />;
}
