import { Section } from '../components/Section';
import { LockCreateForm } from './LockCreateForm';

import type { LookupContext } from '../types';
import { LockCancelForm } from './LockCancelForm.tsx';
import { LockFundForm } from './LockFundForm.tsx';
import { LockSendForm } from './LockSendForm.tsx';
import { LockReturnForm } from './LockReturnForm.tsx';

export function LockConfigSection({ context }: { context: LookupContext }) {
    return (
        <Section title="Lock config" collapsible defaultExpanded>
            <LockCreateForm context={context} />
            <div className="form-grid">
                <LockCancelForm context={context} />
                <LockFundForm context={context} />
                <LockSendForm context={context} />
                <LockReturnForm context={context} />
            </div>
        </Section>
    );
}
