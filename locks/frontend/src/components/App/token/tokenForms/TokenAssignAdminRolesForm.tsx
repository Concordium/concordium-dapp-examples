import { OperationType } from '@concordium/web-sdk';

import { TokenAdminRolesOperationForm } from './tokenOperationForms/TokenAdminRolesOperationForm.tsx';

import { LookupContext } from '../../types.ts';

export function TokenAssignAdminRolesForm({ context }: { context: LookupContext }) {
    return <TokenAdminRolesOperationForm operation={OperationType.TokenAssignAdminRoles} context={context} />;
}
