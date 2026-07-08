import type { TokenOperationType } from '@concordium/web-sdk';
import type { LookupContext } from '../../../types.ts';

export interface TokenOperationFormProps {
    operation: TokenOperationType;
    context: LookupContext;
}
