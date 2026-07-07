import { TokenOperationType } from '@concordium/web-sdk';

import { TokenAmountOperationForm } from './tokenOperationForms/TokenAmountOperationForm.tsx';

import type { TokenOperationFormProps } from './tokenOperationForms/TokenOperationFormProps.ts';

export function TokenMintForm({ context }: TokenOperationFormProps) {
    return <TokenAmountOperationForm operation={TokenOperationType.Mint} context={context} />;
}
