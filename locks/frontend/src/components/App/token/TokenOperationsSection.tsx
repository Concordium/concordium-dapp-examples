import { TokenOperationType } from '@concordium/web-sdk';
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
                <TokenTransferForm operation={TokenOperationType.Transfer} context={context} />
                <TokenUpdateMetadataForm operation={TokenOperationType.UpdateMetadata} context={context} />
                <TokenMintForm operation={TokenOperationType.Mint} context={context} />
                <TokenBurnForm operation={TokenOperationType.Burn} context={context} />
                <TokenAddAllowListForm operation={TokenOperationType.AddAllowList} context={context} />
                <TokenRemoveAllowListForm operation={TokenOperationType.RemoveAllowList} context={context} />
                <TokenAddDenyListForm operation={TokenOperationType.AddDenyList} context={context} />
                <TokenRemoveDenyListForm operation={TokenOperationType.RemoveDenyList} context={context} />
                <TokenPauseForm operation={TokenOperationType.Pause} context={context} />
                <TokenUnpauseForm operation={TokenOperationType.Unpause} context={context} />
            </div>
        </Section>
    );
}
