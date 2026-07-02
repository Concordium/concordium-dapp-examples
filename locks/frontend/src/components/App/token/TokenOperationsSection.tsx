import { Section } from '../components/Section';
import { TOKEN_OPERATIONS } from '../constants';
import { TokenOperationForm } from './TokenOperationForm';

import type { LookupContext } from '../types';

export function TokenOperationsSection({ context }: { context: LookupContext }) {
    return (
        <Section title="Token Operations">
            <div className="form-grid">
                {TOKEN_OPERATIONS.map((operation) => (
                    <TokenOperationForm key={operation} operation={operation} context={context} />
                ))}
            </div>
        </Section>
    );
}
