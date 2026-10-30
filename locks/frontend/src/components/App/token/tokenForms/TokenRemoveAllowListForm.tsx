import { OperationType } from '@concordium/web-sdk';

import { TokenTargetAccountOperationForm } from './tokenOperationForms/TokenTargetAccountOperationForm.tsx';

import { LookupContext } from '../../types.ts';

export function TokenRemoveAllowListForm({ context }: { context: LookupContext }) {
    return <TokenTargetAccountOperationForm operation={OperationType.TokenRemoveAllowList} context={context} />;
}
