// vite.config.ts
import { defineConfig } from 'vitest/config';
import wasm from 'vite-plugin-wasm';

export default defineConfig({
	plugins: [wasm()],
	test: {
		coverage: {
			provider: 'istanbul', //istanbul or 'c8'
		},
	},
});
