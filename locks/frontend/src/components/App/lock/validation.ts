import { parseError } from '../utils';

import type { LookupContext } from '../types';

export const lockIdValidation = (context: Pick<LookupContext, 'getLockId'>) => ({
    required: 'Lock ID is required',
    validate: (value: string) => {
        try {
            context.getLockId(value);
            return true;
        } catch (caughtError) {
            return parseError(caughtError);
        }
    },
});
