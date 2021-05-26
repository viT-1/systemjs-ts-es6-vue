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
	env: {
		es6: true,
	},
	// ignorePatterns: ['**/tsconfig.*.json'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		createDefaultProgram: true,
		extraFileExtensions: ['.json'],
		project: 'tsconfig.lint.json',
	},
	plugins: [
		'@typescript-eslint',
		'import',
		'jest',
		'jest-formatting',
		'json',
	],
	root: true,
	settings: {
		'import/parsers': { '@typescript-eslint/parser': ['.ts'] },
		'import/resolver': {
			'node': { 'extensions': ['.js', '.ts'] },
			'typescript': { 'project': './src' },
		},
	},
	overrides: [
		{
			files: ['**/*.json', '*.json'],
			extends: [...fullExtends, 'plugin:json/recommended-with-comments'],
		},
		{
			files: [
				'jest.config.js',
				'**/*.jest.config.js',
				'*.eslintrc.js',
			],
			env: { 'commonjs': true },
			extends: baseExtends,
		},
		{
			files: [
				'gulpfile.esm.js',
				'app.conf.js',
			],
			parserOptions: { 'sourceType': 'module' },
			extends: baseExtends,
		},
		{
			files: ['**/*.ts', '*.ts'],
			env: { 'browser': true },
			parserOptions: {
				'sourceType': 'module',
			},
			extends: fullExtends,
		},
		{
			files: ['**/index.ts', '**/*mutations.ts'], // vuex mutations
			extends: fullExtends,
			rules: {
				// https://stackoverflow.com/questions/44657142/vuex-mutations-and-airbnb-eslint
				'no-param-reassign': ['error', {
					props: true,
					ignorePropertyModificationsFor: ['state'],
				}],
			},
		},
		{
			files: ['**/*.d.ts'],
			extends: fullExtends,
			rules: {
				'import/no-default-export': 'off',
			},
		},
		{
			files: ['**/*.spec.ts'],
			// что есть, что нет env jest, реакции eslint в этих файлах нет?!
			env: { 'browser': true, 'jest': true },
			extends: [
				...fullExtends,
				'plugin:jest/all',
				'plugin:jest-formatting/strict',
			],
		},
	],
};

module.exports = conf;
