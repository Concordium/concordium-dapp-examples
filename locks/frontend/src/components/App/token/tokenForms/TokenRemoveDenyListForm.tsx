import { TokenOperationType } from '@concordium/web-sdk';

import { TokenTargetAccountOperationForm } from './tokenOperationForms/TokenTargetAccountOperationForm.tsx';

import type { TokenOperationFormProps } from './tokenOperationForms/TokenOperationFormProps.ts';

export function TokenRemoveDenyListForm({ context }: TokenOperationFormProps) {
    return <TokenTargetAccountOperationForm operation={TokenOperationType.RemoveDenyList} context={context} />;
}
