import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// Uncomment commented code when @concordium/web-sdk is upgraded to v10
// import wasm from 'vite-plugin-wasm';
// import topLevelAwait from 'vite-plugin-top-level-await';

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
    },
    css: {
        preprocessorOptions: {
            scss: {
                quietDeps: true,
                // It is ok to silence these deprecations here; they come from Sass/Bootstrap internals, not app code.
                // They can matter during a major version update, but we are not planning such updates now.
                silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions', 'if-function'],
            },
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    concordium: ['@concordium/browser-wallet-api-helpers', '@concordium/web-sdk'],
                    react: ['react', 'react-dom', 'react-bootstrap'],
                },
            },
        },
    },
});
