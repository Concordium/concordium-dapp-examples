import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
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
      'process.env': {
        TOKEN_ID: `${env.TOKEN_ID}`,
        BACKEND_URL: `${env.BACKEND_URL}`
      }
    },
  };
});