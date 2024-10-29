import { PluginOption, UserConfig, defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import handlebars from 'vite-plugin-handlebars';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import 'dotenv/config';

const DEFAULT_NETWORK = 'testnet';
const DEFAULT_NODE = 'https://grpc.testnet.concordium.com:20000';

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

function getConfig() {
    // Validate network
    if (![undefined, 'mainnet', 'testnet'].includes(process.env.NETWORK)) {
        throw new Error(
            `Unexpected value for environment variable "NETWORK": ${process.env.NETWORK} (should be either "testnet" or "mainnet")`,
        );
    }

    // Validate node URL.
    validateURL('CONCORDIUM_NODE');

    return {
        node: process.env.CONCORDIUM_NODE ?? DEFAULT_NODE,
        network: process.env.NETWORK ?? DEFAULT_NETWORK,
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
    build: {
        rollupOptions: {
            plugins: [nodePolyfills()],
        },
    },
    resolve: {
        alias: {
            '@concordium/rust-bindings': '@concordium/rust-bindings/bundler',
            stream: 'rollup-plugin-node-polyfills/polyfills/stream',
        },
    },
    define: {
        global: 'globalThis',
        'process.env': {
            NETWORK: process.env.NETWORK,
            CONCORDIUM_NODE: process.env.CONCORDIUM_NODE,
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
