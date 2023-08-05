import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import wasm from 'vite-plugin-wasm';

export default defineConfig({
	build: {
		target: 'esnext',
	},
	plugins: [
		wasm(),
		react(),
		tsconfigPaths(),
	],
});
