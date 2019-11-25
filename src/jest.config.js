const path = require('path');
const rootDir = require('app-root-path').path;

// TODO: back to tsconfig-paths-jest falling on json reading =(
// const tsconfigPaths = require('./tsconfig.paths.json');
// const moduleNameMapper = require('tsconfig-paths-jest')(tsconfigPaths);

const conf = {
	// base es-lint rules for tests
	preset: 'ts-jest',
	globals: {
		'ts-jest': {
			// Возможно использовать (исключены не сгенерённые ещё файлы *.html.js)
			tsConfig: path.resolve(rootDir, 'src', 'tsconfig.jest.json'),
		},
	},
	// For browser global variables (console, window...)
	browser: true,
	// Cache directory should be set for git ignoring
	cacheDirectory: path.resolve(rootDir, '.test', 'cache'),
	// Tests cover (percent & lines of logic)
	collectCoverage: true,
	// Ограничиваемся тестами на модули для реиспользования.
	collectCoverageFrom: [
		'**/*.ts',
		'!**/*.d.ts',
		'!**/*.conf.ts',
		// Корневой index всего лишь прослойка, её не тестируем
		'!**/index.ts',
		// main.ts не несёт смысловой нагрузки, кроме как вывода в консоль
		'!**/main.*',
	],
	coverageDirectory: path.resolve(rootDir, '.test', 'coverage'),
	// resolving file types with not full filename in spes.ts names
	moduleFileExtensions: [
		'ts',
		'js',
		'json',
		'html',
	],
	// Resolve imports in spes.ts files
	moduleNameMapper: {
		'~/(.*)$': `${rootDir}/$1`,
		'@common/(.*)$': `${rootDir}/src/common.blocks/$1`,
		// ...moduleNameMapper, // TODO: back to tsconfig-paths-jest falling on json reading =(
		// fix Vue warning about version of Vue
		'vue$': 'vue/dist/vue.common.dev.js'
	},
	// https://jestjs.io/docs/en/configuration#testenvironment-string
	// testEnvironment: 'node', // 'jsdom',
	// Ignore some tests from testMatch
	testPathIgnorePatterns: [
	],
	// Mapping which tests to run with jest
	testMatch: ['**/*.*(spec|test).*(ts|js)'],
	// File types reading
	transform: {
		'.*?\\.(ts|js)$': 'ts-jest',
		// using html-loader-jest not 'jest-transform-stub' for true template importing of non-.vue components
		'.*?\\.html$': 'html-loader-jest',
	},
	transformIgnorePatterns: [
		'/node_modules/',
	],
	// https://github.com/facebook/jest/issues/5164#issuecomment-408355554
	setupFiles: [
		'../jest.setup.hook.js',
		// TODO: change jest.setup.hook.js to ts script
		// https://github.com/kulshekhar/ts-jest/issues/411#issuecomment-461198583
		// https://medium.com/@mateuszsokola/configuring-react-16-jest-enzyme-typescript-7122e1a1e6e8
		// './jest.setup.ts',
	],
	// Displays all steps
	verbose: true,
};

module.exports = conf;