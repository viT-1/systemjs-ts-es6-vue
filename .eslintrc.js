const rules = {
	'curly': ['error', 'multi', 'consistent'],
	'import/no-extraneous-dependencies': [
		'error', {
			'devDependencies': ['**/*.spec.ts', '**/*.jest.config.js', 'gulpfile.esm.js']
		},
	],
	'import/no-unresolved': 'error',
	'import/prefer-default-export': 'off',
	'import/no-default-export': 'error',
	'linebreak-style': 'off',
	'no-console': 'off',
	'no-trailing-spaces': 'error',
	'no-tabs': ['warn', { 'allowIndentationTabs': true }],
	'@typescript-eslint/brace-style': ['error', 'stroustrup'],
	'@typescript-eslint/indent': [
		'error',
		'tab', // В airbnb исходно 2
		{
			SwitchCase: 1, // Настройка airbnb переопределяющая default
			// Остальные настройки Airbnb соответствуют default, JSX не волнует
		},
	],
	'@typescript-eslint/no-unused-vars': ['warn'],
};

const conf = {
	'env': {
		'es6': true,
	},
	// Набор правил для всех расширений файлов указанных в package.json > scripts > lint:appvue
	'extends': [
		'eslint:recommended',
	],
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
			'files': [
				'jest.config.js',
				'**/*.jest.config.js',
				'.eslintrc.js',
			],
			'env': { 'commonjs': true },
			rules
		},
		{
			'files': [
				'gulpfile.esm.js',
				'app.conf.js',
			],
			'parserOptions': { 'sourceType': 'module' },
			rules
		},
		{
			'files': ['**/*.ts'],
			'env': { 'browser': true },
			'parserOptions': {
				'sourceType': 'module',
			},
			'extends': [
				'plugin:@typescript-eslint/recommended',
				'airbnb-typescript/base',
			],
			rules
		},
		{
			'files': ['**/*.d.ts'],
			'extends': [
				'plugin:@typescript-eslint/recommended',
				'airbnb-typescript/base',
			],
			'rules': {
				...rules,
				'import/no-default-export': 'off',
			}
		},
		{
			'files': ['**/*.spec.ts'],
			// что есть, что нет env jest, реакции eslint в этих файлах нет?!
			'env': { 'browser': true, 'jest': true },
			'extends': [
				'plugin:@typescript-eslint/recommended',
				'airbnb-typescript/base',
				'plugin:jest/all',
				'plugin:jest-formatting/strict',
			],
			rules
		},
	],
};

module.exports = conf;
