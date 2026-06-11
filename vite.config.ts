/// <reference types="vitest/config" />
import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';

function getPlugins() {
	if (process.env.VITEST) {
		return [];
	}

	return [reactRouter()];
}

export default defineConfig({
	plugins: getPlugins(),
	resolve: {
		tsconfigPaths: true,
	},
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./testing/setup.ts'],
		include: ['**/*.test.{ts,tsx}'],
	},
});
