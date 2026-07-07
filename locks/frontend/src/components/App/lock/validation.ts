import { parseError } from '../utils';

import type { ControllerGrantForm, LookupContext } from '../types';

const ASYNC_LOOKUP_VALIDATION_DEBOUNCE_MS = 300;

type ValidationResult = true | string;

const debounceAsyncValidation = <TValue>(
    validate: (value: TValue) => Promise<ValidationResult>,
    delay = ASYNC_LOOKUP_VALIDATION_DEBOUNCE_MS,
) => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let pendingResolve: ((result: ValidationResult) => void) | undefined;
    let validationId = 0;

    return (value: TValue) => {
        validationId += 1;
        const currentValidationId = validationId;

        if (timeout) {
            clearTimeout(timeout);
            timeout = undefined;
        }

        pendingResolve?.(true);

        return new Promise<ValidationResult>((resolve) => {
            pendingResolve = resolve;
            timeout = setTimeout(() => {
                pendingResolve = undefined;
                timeout = undefined;

                void validate(value)
                    .then((result) => {
                        resolve(currentValidationId === validationId ? result : true);
                    })
                    .catch((caughtError) => {
                        resolve(currentValidationId === validationId ? parseError(caughtError) : true);
                    });
            }, delay);
        });
    };
};

export const lockIdValidation = (context: Pick<LookupContext, 'validateLockId'>) => ({
    required: 'Lock ID is required',
    validate: debounceAsyncValidation(async (value: string) => {
        try {
            await context.validateLockId(value);
            return true;
        } catch (caughtError) {
            return parseError(caughtError);
        }
    }),
});

export const tokenIdExistsValidation = (context: Pick<LookupContext, 'getTokenInfo'>) => ({
    required: 'Token ID is required',
    validate: debounceAsyncValidation(async (value: string) => {
        try {
            await context.getTokenInfo(value);
            return true;
        } catch (caughtError) {
            return parseError(caughtError);
        }
    }),
});

export const lockTokenIdValidation = (
    context: Pick<LookupContext, 'getLockId' | 'validateLockTokenId'>,
    getLockIdValue: () => string,
) => ({
    required: 'Token ID is required',
    validate: debounceAsyncValidation(async (value: string) => {
        const lockId = getLockIdValue();

        try {
            if (!lockId.trim()) {
                return true;
            }

            context.getLockId(lockId);
            await context.validateLockTokenId(lockId, value);
            return true;
        } catch (caughtError) {
            return parseError(caughtError);
        }
    }),
});

export const supportedTokenIdsExistValidation = (context: Pick<LookupContext, 'getTokenInfo'>) => ({
    validate: debounceAsyncValidation(async (values: string[]) => {
        const tokenIds = values.map((value) => value.trim()).filter(Boolean);
        if (!tokenIds.length) {
            return 'At least one supported token is required';
        }

        try {
            await Promise.all(tokenIds.map((tokenId) => context.getTokenInfo(tokenId)));
            return true;
        } catch (caughtError) {
            return parseError(caughtError);
        }
    }),
});

export const accountExistsValidation = (context: Pick<LookupContext, 'getAccountInfo'>, label: string) => ({
    required: `${label} is required`,
    validate: async (value: string) => {
        try {
            await context.getAccountInfo(value);
            return true;
        } catch (caughtError) {
            return parseError(caughtError);
        }
    },
});

export const accountListExistsValidation = (
    context: Pick<LookupContext, 'getAccountInfo'>,
    requiredMessage: string,
    shouldValidate = () => true,
) => ({
    validate: debounceAsyncValidation(async (values: string[]) => {
        if (!shouldValidate()) {
            return true;
        }

        const accounts = values.map((value) => value.trim()).filter(Boolean);
        if (!accounts.length) {
            return requiredMessage;
        }

        try {
            await Promise.all(accounts.map((account) => context.getAccountInfo(account)));
            return true;
        } catch (caughtError) {
            return parseError(caughtError);
        }
    }),
});

export const controllerGrantAccountsExistValidation = (context: Pick<LookupContext, 'getAccountInfo'>) => ({
    validate: debounceAsyncValidation(async (grants: ControllerGrantForm[]) => {
        const accountValues = grants.map((grant) => grant.account.trim());
        const accounts = accountValues.filter(Boolean);
        if (!accounts.length) {
            return 'At least one controller account is required';
        }

        if (accountValues.some((account) => !account)) {
            return 'Controller account is required';
        }

        try {
            await Promise.all(accounts.map((account) => context.getAccountInfo(account)));
            return true;
        } catch (caughtError) {
            return parseError(caughtError);
        }
    }),
});
