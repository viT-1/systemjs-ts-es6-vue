const conf = {
	rules: {
		// 'curly': ['error', 'all', 'consistent'],
		'comma-dangle': ['error', 'always-multiline'],
		'import/no-extraneous-dependencies': [
			'error', {
				'devDependencies': [
					'**/*.d.ts',
					'**/*.spec.ts',
					'**/jest.*',
					'gulpfile.esm.js',
				],
			},
		],
		'import/no-unresolved': 'error',
		'import/prefer-default-export': 'off',
		'import/no-default-export': 'error',
		'linebreak-style': 'off',
		'no-console': 'off',
		'no-trailing-spaces': 'error',
		'no-tabs': ['warn', { 'allowIndentationTabs': true }],
		'quotes': ['error', 'single'],
		'@typescript-eslint/ban-types': ['error', {
			'types': { 'Function': false },
			'extendDefaults': true
		}],
		'@typescript-eslint/brace-style': ['error', 'stroustrup'],
		'@typescript-eslint/indent': ['error', 'tab', {
			SwitchCase: 1, // Only this from airbnb redefines default
			// Other Airbnb setting same as default, JSX no matter
		}],
		'@typescript-eslint/no-unused-vars': ['warn'],
		// Old school interface class naming
		'@typescript-eslint/naming-convention': ['error', {
			'selector': 'interface',
			'format': ['PascalCase'],
			'custom': {
				'regex': '^I[A-Z]',
				'match': true
			}
		}],
		'@typescript-eslint/ban-ts-comment': 'off',
	},
};

module.exports = conf;
