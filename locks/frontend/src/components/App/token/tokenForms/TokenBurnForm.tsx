import { OperationType } from '@concordium/web-sdk';

import { TokenAmountOperationForm } from './tokenOperationForms/TokenAmountOperationForm.tsx';

import type { LookupContext } from '../../types.ts';

export function TokenBurnForm({ context }: { context: LookupContext }) {
    return <TokenAmountOperationForm operation={OperationType.TokenBurn} context={context} />;
}
