import { AccountAddress } from '@concordium/web-sdk';

/**
 * Type predicate for checking if a value is defined.
 *
 * @param value - The value to check
 */
export function isDefined<T>(value: T | undefined): value is T {
    return value !== undefined;
}

/**
 * Helper for updating a map entry in an immutable fashion.
 *
 * @param map - The map to update
 * @param key - The key to update the value at (if `undefined`, a copy of the `map` is returned)
 * @param value - The value to insert at `key` (if `undefined`, a copy of the `map` is returned)
 *
 * @returns A copy of the original `map` with updated value for `key`
 */
export function updateMapEntry<K, V>(map: Map<K, V>, key: K | undefined, value: V | undefined) {
    const res = new Map(map);
    if (key !== undefined) {
        if (value !== undefined) {
            res.set(key, value);
        } else {
            res.delete(key);
        }
    }
    return res;
}

/**
 * Helper for unwrapping values.
 *
 * @param value - The value to unwrap
 * @param error - The error message to construct the {@linkcode Error} with
 *
 * @throws {@linkcode Error} if value is not undefined
 *
 * @returns The unwrapped value.
 */
export function expectValue<T>(value: T | undefined, error: string): T {
    if (value === undefined) {
        throw new Error(error);
    }

    return value;
}

/**
 * Helper for displaying account addresses in a concise manner (i.e. first/last `numChars/2` characters)
 *
 * @param account - The {@linkcode AccountAddress.Type} to display
 * @param [numChars] - The number of character of the account address to display. Defaults to `8`.
 *
 * @returns The account address format.
 */
export function accountShowShort(account: AccountAddress.Type, numChars = 8): string {
    const half = numChars / 2;
    const start = Math.ceil(half);
    const end = Math.floor(half);
    const accountString = AccountAddress.toBase58(account);
    return `${accountString.substring(0, start)}...${accountString.substring(accountString.length - end)}`;
}

/**
 * DateTime format used to display date and time around the application
 */
export const commonDateTimeFormat: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
};

/**
 * Helper function for waiting a number of milliseconds.
 *
 * @param ms - The amount of time (in milliseconds) to wait.
 * @returns A promise which resolves with `void` after `ms`.
 */
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

/**
 * Options supplied to {@link pollUntil}
 */
export type PollUntilOptions = {
    /** The number of times to retry polls before failing defaults to `10` */
    numRetry: number;
    /** The amount of time between polls. Defaults to `2000` */
    intervalMS: number;
    /** Abort signal to stop polling. */
    abortSignal?: AbortSignal;
};
const poolUntilOptsDefault: PollUntilOptions = {
    numRetry: 10,
    intervalMS: 2000,
};

/**
 * Poll async function `fun` until predicate is met.
 *
 * @template T - The value returned by the supplied async function
 *
 * @param fun - The function recurringly poll
 * @param predicate - The predicate function to run, determining if a result is adequate
 * @param [opts.numRetry] - The number of retries to attempt before failing
 * @param [opts.intervalMS] - The time between invocations of `fun`
 * @param [opts.abortSignal] - An abort signal, which will stop ongoing polling.
 *
 * @throws if predicate is not met within specified number of retries attempted or if `fun` throws
 * @returns value of type T on invocation of `fun` which meets `predicate`.
 */
export async function pollUntil<T>(
    fun: () => Promise<T>,
    predicate: (value: T) => boolean,
    opts: Partial<PollUntilOptions> = {},
): Promise<T> {
    const { numRetry, intervalMS, abortSignal } = {
        ...poolUntilOptsDefault,
        ...opts,
    };

    const checkAborted = () => {
        if (abortSignal?.aborted) {
            throw new Error('Aborted through abort signal');
        }
    };

    let retries = 0;

    return new Promise((resolve, reject) => {
        const run = async () => {
            checkAborted();
            const v = await fun();

            if (predicate(v)) {
                resolve(v);
                return;
            }

            if (retries >= numRetry) {
                reject(`Predicate not met within ${numRetry} attempts`);
                return;
            }

            retries++;

            await sleep(intervalMS);
            await run();
        };

        void run();
    });
}
