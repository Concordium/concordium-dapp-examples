import { OperationType } from '@concordium/web-sdk';

import { TokenTargetAccountOperationForm } from './tokenOperationForms/TokenTargetAccountOperationForm.tsx';

import { LookupContext } from '../../types.ts';

export function TokenRemoveDenyListForm({ context }: { context: LookupContext }) {
    return <TokenTargetAccountOperationForm operation={OperationType.TokenRemoveDenyList} context={context} />;
}
