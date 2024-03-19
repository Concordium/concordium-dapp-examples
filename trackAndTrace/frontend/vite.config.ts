import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

if (
    process.env.TRACK_AND_TRACE_CONTRACT_INDEX === undefined ||
    Number.isNaN(process.env.TRACK_AND_TRACE_CONTRACT_INDEX)
) {
    throw Error('Environmental variable TRACK_AND_TRACE_CONTRACT_INDEX needs to be defined and set to a number');
}

if (process.env.SPONSORED_TRANSACTION_BACKEND_BASE_URL === undefined) {
    throw Error('Environmental variable SPONSORED_TRANSACTION_BACKEND_BASE_URL needs to be set');
}

export default defineConfig({
    resolve: {
        alias: {
            '@concordium/rust-bindings': '@concordium/rust-bindings/bundler', // Resolve bundler-specific wasm entrypoints.
        },
    },
    plugins: [
        react(),
        wasm(),
        topLevelAwait(), // For legacy browser compatibility
    ],
    define: {
        global: 'globalThis',
        'process.env': {
            SPONSORED_TRANSACTION_BACKEND_BASE_URL: process.env.SPONSORED_TRANSACTION_BACKEND_BASE_URL,
            TRACK_AND_TRACE_CONTRACT_INDEX: process.env.TRACK_AND_TRACE_CONTRACT_INDEX,
        },
    },
});
