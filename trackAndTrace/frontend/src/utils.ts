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
