import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig({
  resolve: {
    alias: {
      '@concordium/rust-bindings': '@concordium/rust-bindings/bundler',
    }
  },
  plugins: [
    react(),
    wasm(),
    topLevelAwait(),
  ],
  define: {
    global: 'globalThis',
  },
});
