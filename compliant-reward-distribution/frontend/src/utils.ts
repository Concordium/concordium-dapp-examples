import { AccountAddress } from '@concordium/web-sdk';

/**
 * This function validates if a string represents a valid accountAddress in base58 encoding.
 * The length, characters, and the checksum are validated.
 *
 * @param accountAddress - An account address represented as a base58 encoded string.
 * @returns An error message if validation fails.
 */
export function validateAccountAddress(accountAddress: string | undefined) {
    if (accountAddress) {
        try {
            AccountAddress.fromBase58(accountAddress);
        } catch (e) {
            return `Please enter a valid account address. It is a base58 string with a fixed length of 50 characters. Original error: ${
                (e as Error).message
            }.`;
        }
    }
}

/**
 * This function converts a `number` into its `TokenIdU64` representation. The `TokenIdU64` type is
 * represented as an 8-byte little-endian hex string. E.g. the `TokenIdU64` representation of `1` is
 * the hex string `0100000000000000`. First, the function converts the `number` into a hex string and pads it with enough
 * zeros and then reverses the order of the bytes to get the little-endian representation.
 *
 * @param number - A number to be converted.
 * @returns The equivalent `TokenIdU64` representation of the number.
 *
 * @throws If the number is too large to be converted into the `TokenIdU64` representation.
 */
export function ToTokenIdU64(number: number | bigint): string {
    const maxU64: bigint = 2n ** 64n - 1n;

    if (number > maxU64) {
        throw new Error('Number too large to be converted into `TokenIdU64`.');
    }

    return BigInt(number).toString(16).padStart(16, '0').match(/.{2}/g)!.reverse().join('');
}

/**
 * This function converts the `TokenIdU64` string representation into its equivalent bigint type.
 * The `TokenIdU64` type is represented as an 8-byte little-endian hex string. E.g. the `TokenIdU64`
 * representation of `1` is the hex string `0100000000000000`.
 * First, the function reverses the order of the bytes to get the big-endian-hex-string representation
 * and then converts it into the bigint type.
 *
 * @param tokenIdU64 - A `TokenIdU64` representation to be converted.
 * @returns The equivalent `bigint` type of the `tokenIdU64`.
 */
export function FromTokenIdU64(tokenIdU64: string): bigint {
    const bigEndianHexString = tokenIdU64.match(/.{2}/g)?.reverse().join('');
    return BigInt(`0x${bigEndianHexString} `);
}
