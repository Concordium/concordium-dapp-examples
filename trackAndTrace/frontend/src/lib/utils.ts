import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AccountAddress } from '@concordium/web-sdk';
import { LatLngExpression } from 'leaflet';
import { PinataSDK } from 'pinata';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

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

/**
 * Retrieves the user's current geographical location using the browser's Geolocation API.
 *
 * @function getLocation
 * @param {function} onSuccess - Callback function that executes when location retrieval is successful. Receives an object with `latitude` and `longitude`.
 * @param {function} onError - Callback function that executes when there is an error in retrieving the location. Receives an error message as a string.
 */
export function getLocation(
    onSuccess: (location: { latitude: number; longitude: number }) => void,
    onError: (error: string) => void,
) {
    // Check if Geolocation is supported in the user's browser
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                onSuccess({ latitude, longitude });
            },

            (error) => {
                let errorMessage;
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location access denied by the user.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information is unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'The request to retrieve location timed out.';
                        break;
                    default:
                        errorMessage = 'An unknown error occurred while retrieving location.';
                }

                onError(errorMessage);
            },
        );
    } else {
        onError('Geolocation is not supported by this browser.');
    }
}

/**
 * Converts a JavaScript object into a byte array (Uint8Array).
 * @param object - The object to be converted.
 * @returns A `Uint8Array` representing the serialized bytes of the object.
 */
export function objectToBytes(object: Record<string, unknown>): number[] {
    const jsonString: string = JSON.stringify(object);

    const encoder = new TextEncoder();
    const bytes: Uint8Array = encoder.encode(jsonString);

    return Array.from(bytes);
}

/**
 * Converts a byte array (Uint8Array) back into a JavaScript object.
 * @param bytes - The byte array to be converted.
 * @returns The original decoded object.
 */
export function bytesToObject<T>(bytes: number[]): T {
    const decoder = new TextDecoder();
    const jsonString: string = decoder.decode(Uint8Array.from(bytes));

    const object: T = JSON.parse(jsonString);

    return object;
}

/**
 * Fetches JSON data from a given URL and parses it into a JavaScript object.
 * @param url - The URL to fetch the JSON data from.
 * @returns A Promise resolving to the parsed JavaScript object.
 * @throws An error if the fetch fails or the response is not valid JSON.
 */
export async function fetchJson(url: string): Promise<Record<string, unknown>> {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Failed to fetch JSON from ${url}: ${(error as Error).message}`);
    }
}

/**
 * Parses a string of coordinates in the format "lat,lon" into an array of numbers [lat, lon].
 *
 * @param coordinates A string representing coordinates in the format "lat,lon".
 * @returns An array containing the latitude and longitude as numbers.
 * @throws If the input is not in the expected format or contains invalid numbers.
 */
export function parseCoordinates(coordinates: string): LatLngExpression {
    const parts = coordinates.split(','); // Split the string into an array
    if (parts.length !== 2) {
        throw new Error("Invalid format, expected 'lat,lon'");
    }
    const lat = parseFloat(parts[0].trim());
    const lon = parseFloat(parts[1].trim());

    if (isNaN(lat) || isNaN(lon)) {
        throw new Error('Coordinates must be valid numbers');
    }

    return [lat, lon];
}

/**
 * Fetches metadata from an IPFS gateway using a URL or CID.
 *
 * @param urlOrCid - The IPFS URL or CID. If the input starts with "ipfs://", the CID is extracted from it.
 * @param pinata - The Pinata client instance to interact with IPFS gateways.
 * @returns A Promise resolving to the metadata object fetched from the IPFS gateway.
 * @throws Will throw an error if the metadata retrieval fails.
 */
export async function fetchIPFSMetadata(urlOrCid: string, pinata: PinataSDK) {
    try {
        // Extract CID from URL or use the provided string if it doesn't start with "ipfs://"
        const cid = urlOrCid.startsWith('ipfs://') ? urlOrCid.split('//')[1] : urlOrCid;

        // Fetch metadata from the IPFS gateway
        const { data } = await pinata.gateways.get(cid);
        if (!data) {
            throw new Error('Invalid IPFS CID');
        }
        return data as unknown as { [key: string]: unknown; imageUrl: string | null };
    } catch (error) {
        console.error('Error fetching IPFS metadata:', error);
        throw new Error('Failed to retrieve IPFS metadata.');
    }
}

/**
 * Creates a signed URL for an file stored on IPFS using a URL or CID.
 *
 * @param urlOrCid - The IPFS URL or CID. If the input starts with "ipfs://", the CID is extracted from it.
 * @param pinata - The Pinata client instance to interact with IPFS gateways.
 * @returns A Promise resolving to the signed URL for the file.
 * @throws Will throw an error if the signed URL generation fails.
 */
export async function getPinataSignedUrl(urlOrCid: string, pinata: PinataSDK): Promise<string> {
    try {
        const cid = urlOrCid.startsWith('ipfs://') ? urlOrCid.split('//')[1] : urlOrCid;

        const signedUrl = await pinata.gateways.createSignedURL({
            cid,
            expires: 30,
        });

        return signedUrl;
    } catch (error) {
        console.error('Error creating signed URL:', error);
        throw new Error('Failed to create signed URL.');
    }
}
