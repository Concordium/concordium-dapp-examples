import { Section } from '../components/Section';
import { LOCK_OPERATIONS } from '../constants';
import { LockCreateForm } from './LockCreateForm';
import { LockOperationForm } from './LockOperationForm';

import type { LookupContext } from '../types';

export function LockConfigSection({ context }: { context: LookupContext }) {
    return (
        <Section title="Lock config">
            <LockCreateForm connectedAccount={context.connectedAccount} addOperation={context.addOperation} />
            <div className="form-grid">
                {LOCK_OPERATIONS.map((operation) => (
                    <LockOperationForm key={operation} operation={operation} context={context} />
                ))}
            </div>
        </Section>
    );
}
