import { TokenOperationType } from '@concordium/web-sdk';
import { Section } from '../components/Section';
import type { LookupContext } from '../types';
import { TokenAssignAdminRolesForm } from './tokenForms/TokenAssignAdminRolesForm.tsx';
import { TokenRevokeAdminRolesForm } from './tokenForms/TokenRevokeAdminRolesForm.tsx';

export function TokenOperationsAdminSection({ context }: { context: LookupContext }) {
    return (
        <Section title="Advanced (Admin Roles)" collapsible defaultExpanded={false}>
            <div className="form-grid">
                <TokenAssignAdminRolesForm operation={TokenOperationType.AssignAdminRoles} context={context} />
                <TokenRevokeAdminRolesForm operation={TokenOperationType.RevokeAdminRoles} context={context} />
            </div>
        </Section>
    );
}
