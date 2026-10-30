import { OperationType } from '@concordium/web-sdk';

import { TokenToggleOperationForm } from './tokenOperationForms/TokenToggleOperationForm.tsx';

import { LookupContext } from '../../types.ts';

export function TokenPauseForm({ context }: { context: LookupContext }) {
    return <TokenToggleOperationForm operation={OperationType.TokenPause} context={context} />;
}
