import { TokenOperationType } from '@concordium/web-sdk';

import { TokenTargetAccountOperationForm } from './tokenOperationForms/TokenTargetAccountOperationForm.tsx';

import type { TokenOperationFormProps } from './tokenOperationForms/TokenOperationFormProps.ts';

export function TokenAddAllowListForm({ context }: TokenOperationFormProps) {
    return <TokenTargetAccountOperationForm operation={TokenOperationType.AddAllowList} context={context} />;
}
