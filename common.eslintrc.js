const conf = {
	rules: {
		'curly': ['error', 'multi', 'consistent'],
		'import/no-extraneous-dependencies': [
			'error', {
				'devDependencies': [
					'**/*.spec.ts',
					'**/jest.config.js',
					'gulpfile.esm.js',
				]
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
			'tab', // airbnb set 2 spaces
			{
				SwitchCase: 1, // Only this from airbnb redefines default
				// Other Airbnb setting same as default, JSX no matter
			},
		],
		'@typescript-eslint/no-unused-vars': ['warn'],
	},
};

module.exports = conf;
