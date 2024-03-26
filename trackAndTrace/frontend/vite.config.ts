import { PluginOption, UserConfig, defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import handlebars from 'vite-plugin-handlebars';
import 'dotenv/config';

const DEFAULT_NETWORK = 'testnet';
const DEFAULT_NODE = 'https://grpc.testnet.concordium.com:20000';
const DEFAULT_SPONSORED_API = 'http://localhost:8000';

/**
 * Validates environment variable present at `envField` as a URL.
 *
 * @param envField - The name of the environment variable to validate
 * @throws If environment variable is deemed an invalid URL.
 */
function validateURL(envField: string, allowUnset = true): void {
    const urlCandidate = process.env[envField];
    if (!allowUnset && !urlCandidate) {
        throw new Error(`Value required for environment variable ${envField}`);
    }

    try {
        if (urlCandidate && !new URL(urlCandidate).hostname) {
            throw new Error(`Could not parse URL from ${urlCandidate}`);
        }
    } catch (e) {
        const message = (e as Error)?.message ?? e;
        throw new Error(`Malformed URL for environment variable "${envField}": ${message}`);
    }
}

function getConfig(): Config {
    // Validate network
    if (![undefined, 'mainnet', 'testnet'].includes(process.env.TRACK_AND_TRACE_NETWORK)) {
        throw new Error(
            `Unexpected value for environment variable "TRACK_AND_TRACE_NETWORK": ${process.env.TRACK_AND_TRACE_NETWORK} (should be either "testnet" or "mainnet")`,
        );
    }

    const [, index, subindex] =
        process.env.TRACK_AND_TRACE_CONTRACT_ADDRESS?.match(/<(\d*),(\d*)>/) ??
        (() => {
            throw new Error(
                'Environment variable "TRACK_AND_TRACE_CONTRACT_ADDRESS" must be specified in the format "<1234,0>"',
            );
        })();

    // Validate node URL.
    validateURL('TRACK_AND_TRACE_NODE');

    // Validate the sponsored transaction backend URL.
    validateURL('TRACK_AND_TRACE_SPONSORED_BACKEND_API');

    return {
        node: process.env.TRACK_AND_TRACE_NODE ?? DEFAULT_NODE,
        contractAddress: { index, subindex },
        network: process.env.TRACK_AND_TRACE_NETWORK ?? DEFAULT_NETWORK,
        sponsoredTransactionBackend: process.env.TRACK_AND_TRACE_SPONSORED_BACKEND_API ?? DEFAULT_SPONSORED_API
    };
}

const viteConfig: UserConfig = {
    plugins: [
        react(),
        tsconfigPaths(),
        wasm() as PluginOption,
        topLevelAwait(), // For legacy browser compatibility
    ],
    worker: {
        plugins: () => [topLevelAwait(), wasm() as PluginOption],
    },
    resolve: {
        alias: {
            '@concordium/rust-bindings': '@concordium/rust-bindings/bundler', // Resolve bundler-specific wasm entrypoints.
        },
    },
};

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    if (command === 'serve') {
        // Mimic the configuration injection from the backend
        const config = getConfig();
        viteConfig.plugins!.push(
            handlebars({
                context: { config: JSON.stringify(config) },
                compileOptions: { noEscape: true },
            }) as PluginOption,
        );
    }

    return viteConfig;
});
