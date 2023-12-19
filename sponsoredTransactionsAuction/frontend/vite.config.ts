import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// Uncomment commented code when @concordium/web-sdk is upgraded to v10
// import wasm from 'vite-plugin-wasm';
// import topLevelAwait from 'vite-plugin-top-level-await';

if (process.env.CIS2_TOKEN_CONTRACT_INDEX === undefined || Number.isNaN(process.env.CIS2_TOKEN_CONTRACT_INDEX)) {
    throw Error('Environmental variable CIS2_TOKEN_CONTRACT_INDEX needs to be defined and set to a number');
}
if (process.env.AUCTION_CONTRACT_INDEX === undefined || Number.isNaN(process.env.AUCTION_CONTRACT_INDEX)) {
    throw Error('Environmental variable AUCTION_CONTRACT_INDEX needs to be defined and set to a number');
}

// https://vitejs.dev/config/
export default defineConfig({
    // resolve: {
    //     alias: {
    //         '@concordium/rust-bindings': '@concordium/rust-bindings/bundler', // Resolve bundler-specific wasm entrypoints.
    //     }
    // },
    plugins: [
        react(),

        // wasm(),
        // topLevelAwait(), // For legacy browser compatibility
    ],
    define: {
        global: 'globalThis',
        'process.env': {
            CIS2_TOKEN_CONTRACT_INDEX: process.env.CIS2_TOKEN_CONTRACT_INDEX,
            AUCTION_CONTRACT_INDEX: process.env.AUCTION_CONTRACT_INDEX,
        },
    },
});
