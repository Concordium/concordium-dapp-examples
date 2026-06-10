import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig(({ mode }) => {
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
      {
        name: 'inject-runtime-config',
        transformIndexHtml(html) {
          return html
            .replace('__BACKEND_URL__', env.BACKEND_URL || 'http://localhost:3001')
            .replace('__VERIFIER_URL__', env.VERIFIER_URL || 'http://localhost:7017');
        },
      },
    ],
    define: {
      global: 'globalThis',
    },
  };
});
