import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import 'dotenv/config';

const DEFAULT_NETWORK = 'testnet';
const DEFAULT_NODE = 'http://localhost:20001';
const DEFAULT_BACKEND_API = 'http://localhost:8080';

/**
 * Validates environment variable present at `envField` as a URL.
 *
 * @param envField - The name of the environment variable to validate
 * @throws If environment variable is deemed an invalid URL.
 */
function validateURL(envField: string): void {
    const urlCandidate = process.env[envField];
    try {
        if (urlCandidate && !new URL(urlCandidate).hostname) {
            throw new Error(`Could not parse URL from ${urlCandidate}`);
        }
    } catch (e) {
        const message = (e as Error)?.message ?? e;
        throw new Error(`Malformed URL for environment variable "${envField}": ${message}`);
    }
}

// Validate network
if (![undefined, 'mainnet', 'testnet'].includes(process.env.CCD_ELECTION_NETWORK)) {
    throw new Error(
        `Unexpected value for environment variable "CCD_ELECTION_NETWORK": ${process.env.CCD_ELECTION_NETWORK} (should be either "testnet" or "mainnet")`,
    );
}

// Validate contract address
if (!process.env.CCD_ELECTION_CONTRACT_ADDRESS?.match(/<\d*,\d*>/)) {
    throw new Error('Environment variable "CCD_ELECTION_CONTRACT_ADDRESS" must be specified in the format "<1234,0>"');
}

// Validate node URL
validateURL('CCD_ELECTION_NODE');

// Validate backend API URL
validateURL('CCD_ELECTION_BACKEND_API');

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({ plugins: [['@swc-jotai/react-refresh', {}]] }),
        tsconfigPaths(),
        wasm(),
        topLevelAwait(), // For legacy browser compatibility
    ],
    define: {
        'process.env': {
            CCD_ELECTION_NETWORK: process.env.CCD_ELECTION_NETWORK ?? DEFAULT_NETWORK,
            CCD_ELECTION_NODE: process.env.CCD_ELECTION_NODE ?? DEFAULT_NODE,
            CCD_ELECTION_CONTRACT_ADDRESS: process.env.CCD_ELECTION_CONTRACT_ADDRESS,
            CCD_ELECTION_BACKEND_API: process.env.CCD_ELECTION_BACKEND_API ?? DEFAULT_BACKEND_API,
        },
    },
    resolve: {
        alias: {
            '@concordium/rust-bindings': '@concordium/rust-bindings/bundler', // Resolve bundler-specific wasm entrypoints.
        },
    },
});
