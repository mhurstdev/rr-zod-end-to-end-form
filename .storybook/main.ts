import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
	stories: ['../app/lib/**/*.stories.@(ts|tsx)'],
	framework: {
		name: '@storybook/react-vite',
		options: {
			builder: {
				viteConfigPath: path.join(__dirname, 'vite.config.ts'),
			},
		},
	},
};

export default config;
