import { TokenOperationType } from '@concordium/web-sdk';

import { TokenToggleOperationForm } from './tokenOperationForms/TokenToggleOperationForm.tsx';

import type { TokenOperationFormProps } from './tokenOperationForms/TokenOperationFormProps.ts';

export function TokenPauseForm({ context }: TokenOperationFormProps) {
    return <TokenToggleOperationForm operation={TokenOperationType.Pause} context={context} />;
}
