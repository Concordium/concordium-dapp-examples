import { URL } from 'url';
import { InvalidArgumentError, program, Option } from 'commander';
import { AppConfig } from './types.js';
import { runServer } from './server.js';
import { Network } from '@concordium/web-sdk/types';

/**
 * Parse a network value. The value must be either 'mainnet' or 'testnet'.
 *
 * @param value The value to parse.
 * @throws {InvalidArgumentError} If the value is not a valid network.
 * @returns The parsed network.
 */
function parseNetwork(value: string): Network {
    if (['Mainnet', 'Testnet'].includes(value)) {
        return value as Network;
    }
    throw new InvalidArgumentError(`Invalid network value. Expected 'Mainnet' or 'Testnet'.`);
}

/**
 * Parse a URL value.
 *
 * @param url The URL to parse. Must have 'http' or 'https' protocol.
 * @throws {InvalidArgumentError} If the URL is invalid.
 * @returns The parsed URL.
 */
function parseUrl(url: string): URL {
    let parsed: URL;
    try {
        parsed = new URL(url);
    } catch (error) {
        throw new InvalidArgumentError(`Invalid URL.`);
    }
    if (!['http:', 'https:'].includes(parsed.protocol)) {
        throw new InvalidArgumentError(`Invalid URL. Expected 'http' or 'https' protocol.`);
    }
    return parsed;
}

/**
 * Parse a number value.
 *
 * @param value The value to parse.
 * @throws {InvalidArgumentError} If the value is not a number.
 * @returns The parsed number.
 */
function parseNumber(value: string): number {
    const parsed = Number(value);
    if (isNaN(parsed)) {
        throw new InvalidArgumentError(`Invalid number value.`);
    }
    return parsed;
}

program
    .name('web3id-verifier')
    .description('A verifier for Web3ID.')
    .version('0.0.1')
    .addOption(
        new Option('--endpoint <URL>', 'gRPC V2 interface of the node.')
            .default(new URL('http://localhost:20001'))
            .env('CONCORDIUM_WEB3ID_VERIFIER_NODE')
            .argParser(parseUrl),
    )
    .addOption(
        new Option('--listen-address <URL>', 'Listen address for the server.')
            .default(new URL('http://0.0.0.0:8080'))
            .env('CONCORDIUM_WEB3ID_VERIFIER_API_LISTEN_ADDRESS')
            .argParser(parseUrl),
    )
    .addOption(
        new Option('--request-timeout <value>', 'Request timeout in milliseconds.')
            .default(5000)
            .env('CONCORDIUM_WEB3ID_VERIFIER_REQUEST_TIMEOUT')
            .argParser(parseNumber),
    )
    .addOption(
        new Option('--network <value>', 'Network to which the verifier is connected.')
            .default('Testnet')
            .env('CONCORDIUM_WEB3ID_VERIFIER_NETWORK')
            .argParser(parseNetwork),
    );

// Parse the command line arguments.
program.parse();
const appConfig: AppConfig = program.opts();

// Run the server with the runtime configuration
runServer(appConfig);
