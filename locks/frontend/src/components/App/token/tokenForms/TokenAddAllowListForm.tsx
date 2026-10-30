import { OperationType } from '@concordium/web-sdk';

import { TokenTargetAccountOperationForm } from './tokenOperationForms/TokenTargetAccountOperationForm.tsx';

import { LookupContext } from '../../types.ts';

export function TokenAddAllowListForm({ context }: { context: LookupContext }) {
    return <TokenTargetAccountOperationForm operation={OperationType.TokenAddAllowList} context={context} />;
}
