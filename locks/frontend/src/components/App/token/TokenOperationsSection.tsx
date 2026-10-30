import { Section } from '../components/Section';
import type { LookupContext } from '../types';
import { TokenTransferForm } from './tokenForms/TokenTransferForm.tsx';
import { TokenUpdateMetadataForm } from './tokenForms/TokenUpdateMetadataForm.tsx';
import { TokenMintForm } from './tokenForms/TokenMintForm.tsx';
import { TokenBurnForm } from './tokenForms/TokenBurnForm.tsx';
import { TokenAddAllowListForm } from './tokenForms/TokenAddAllowListForm.tsx';
import { TokenRemoveAllowListForm } from './tokenForms/TokenRemoveAllowListForm.tsx';
import { TokenAddDenyListForm } from './tokenForms/TokenAddDenyListForm.tsx';
import { TokenRemoveDenyListForm } from './tokenForms/TokenRemoveDenyListForm.tsx';
import { TokenPauseForm } from './tokenForms/TokenPauseForm.tsx';
import { TokenUnpauseForm } from './tokenForms/TokenUnpauseForm.tsx';

export function TokenOperationsSection({ context }: { context: LookupContext }) {
    return (
        <Section title="Token Operations" collapsible defaultExpanded={false}>
            <div className="form-grid">
                <TokenTransferForm context={context} />
                <TokenUpdateMetadataForm context={context} />
                <TokenMintForm context={context} />
                <TokenBurnForm context={context} />
                <TokenAddAllowListForm context={context} />
                <TokenRemoveAllowListForm context={context} />
                <TokenAddDenyListForm context={context} />
                <TokenRemoveDenyListForm context={context} />
                <TokenPauseForm context={context} />
                <TokenUnpauseForm context={context} />
            </div>
        </Section>
    );
}
