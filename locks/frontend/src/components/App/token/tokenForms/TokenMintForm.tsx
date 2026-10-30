import { OperationType } from '@concordium/web-sdk';

import { TokenAmountOperationForm } from './tokenOperationForms/TokenAmountOperationForm.tsx';

import { LookupContext } from '../../types.ts';

export function TokenMintForm({ context }: { context: LookupContext }) {
    return <TokenAmountOperationForm operation={OperationType.TokenMint} context={context} />;
}
