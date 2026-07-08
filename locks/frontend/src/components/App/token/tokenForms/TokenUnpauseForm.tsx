import { TokenOperationType } from '@concordium/web-sdk';

import { TokenToggleOperationForm } from './tokenOperationForms/TokenToggleOperationForm.tsx';

import type { TokenOperationFormProps } from './tokenOperationForms/TokenOperationFormProps.ts';

export function TokenUnpauseForm({ context }: TokenOperationFormProps) {
    return <TokenToggleOperationForm operation={TokenOperationType.Unpause} context={context} />;
}
