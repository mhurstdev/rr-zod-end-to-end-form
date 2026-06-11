import type { Config } from 'prettier';

const config: Config = {
	semi: true,
	singleQuote: true,
	useTabs: true,
	tabWidth: 4,
	plugins: ['@ianvs/prettier-plugin-sort-imports'],
	importOrder: [
		'^node(.*)$',
		'^react(.*)$',
		'<THIRD_PARTY_MODULES>',
		'^@/(.*)$',
		'^[.]',
		'<TYPES>^node(.*)$',
		'<TYPES>^react(.*)$',
		'<TYPES>',
		'<TYPES>^@/(.*)$',
		'<TYPES>^[.]',
	],
	importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
	importOrderTypeScriptVersion: '5.0.0',
	importOrderCaseSensitive: false,
};

export default config;
