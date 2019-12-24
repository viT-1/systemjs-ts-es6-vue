const baseExtends = [
	'eslint:recommended',
	'./common.eslintrc.js',
];

const fullExtends = [
	'eslint:recommended',
	'plugin:@typescript-eslint/recommended',
	'airbnb-typescript/base',
	'./common.eslintrc.js',
];

const conf = {
	'env': {
		'es6': true,
	},
	'parser': '@typescript-eslint/parser',
	'plugins': [
		'@typescript-eslint',
		'import',
		"jest",
		"jest-formatting",
		'json',
		'markdown',
	],
	'settings': {
		'import/parsers': { '@typescript-eslint/parser': ['.ts'] },
		'import/resolver': {
			'node': { 'extensions': ['.js', '.ts'] },
			'typescript': { 'directory': './src' },
		},
	},
	'overrides': [
		{
			'files': ['**/*.json', '*.json'],
			extends: [...fullExtends, 'plugin:json/recommended-with-comments'],
		},
		{
			'files': ['**/*.json', '*.json'],
			extends: fullExtends,
		},
		{
			'files': [
				'jest.config.js',
				'**/*.jest.config.js',
				'*.eslintrc.js',
			],
			'env': { 'commonjs': true, },
			extends: baseExtends,
		},
		{
			'files': [
				'gulpfile.esm.js',
				'app.conf.js',
			],
			'parserOptions': { 'sourceType': 'module' },
			extends: baseExtends,
		},
		{
			'files': ['**/*.ts', '*.ts'],
			'env': { 'browser': true },
			'parserOptions': {
				'sourceType': 'module',
			},
			extends: fullExtends,
		},
		{
			'files': ['**/*.d.ts'],
			extends: fullExtends,
			'rules': {
				'import/no-default-export': 'off',
			},
		},
		{
			'files': ['**/*.spec.ts'],
			// что есть, что нет env jest, реакции eslint в этих файлах нет?!
			'env': { 'browser': true, 'jest': true },
			extends: [
				...fullExtends,
				'plugin:jest/all',
				'plugin:jest-formatting/strict',
			],
		},
	],
};

module.exports = conf;
