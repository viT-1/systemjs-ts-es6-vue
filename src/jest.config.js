const path = require('path');
const rootDir = require('app-root-path').path;

const tsconfigPaths = require('./tsconfig.paths.json');
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfigPaths);

const conf = {
	// Базовую настройку jest под ts взять из рекомендованных
	preset: 'ts-jest',
	globals: {
		'ts-jest': {
			// Возможно использовать (исключены не сгенерённые ещё файлы *.html.js)
			tsConfig: path.resolve(rootDir, 'src', 'tsconfig.jest.json'),
		},
	},
	// Чтобы jest не смущали глобальные переменные браузера (console, window...)
	browser: true,
	// Каталоги создаваемые jest должны храниться в node_modules, а не засорять корневой каталог
	cacheDirectory: path.resolve(rootDir, '.test', 'cache'),
	// Смотрим на процент покрытия тестами
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
	// Список для resolve импортов в spec-файлы, когда не указан тип файла
	moduleFileExtensions: [
		'ts',
		'js',
		'json',
		'html',
	],
	// Resolve ссылок на import в тестируемых модулях (подключённых через import в файл теста)
	moduleNameMapper: {
		...moduleNameMapper,
		// fix Vue warning about version of Vue
		'vue$': 'vue/dist/vue.common.dev.js'
	},
	// https://jestjs.io/docs/en/configuration#testenvironment-string
	// testEnvironment: 'node', // 'jsdom',
	// Выборка тестов для игнора, удовлетворяющих путям testRegex
	testPathIgnorePatterns: [
	],
	// Мэппинг по структуре проекта - какие тесты запускать из под jest
	testMatch: ['**/*.*(spec|test).*(ts|js)'],
	// Через какой интерпретатор прогонять типы файлов
	transform: {
		'.*?\\.(ts|js)$': 'ts-jest',
		// using html-loader-jest not 'jest-transform-stub' for true template importing of non-.vue components
		'.*?\\.html$': 'html-loader-jest',
	},
	// Исключаем нетранспилированный код ??? наш ts тоже нетранспилированный
	transformIgnorePatterns: [
		'/node_modules/',
	],
	// Чтобы расписывал все тесты по шагам (иначе не показывает шаги, если тестов больше чем 1)
	verbose: true,
};

module.exports = conf;
