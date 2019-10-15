const tsConfig = './src/tsconfig.jest.json';

const conf = {
	// Базовую настройку jest под ts взять из рекомендованных
	preset: 'ts-jest',
	globals: {
		'ts-jest': {
			// Возможно использовать (исключены не сгенерённые ещё файлы *.html.js)
			tsConfig,
		},
		'vue-jest': {
			babelConfig: false,
			tsConfig,
		}
	},
	// Чтобы jest не смущали глобальные переменные браузера (console, window...)
	browser: true,
	// Каталоги создаваемые jest должны храниться в node_modules, а не засорять корневой каталог
	cacheDirectory: './.test/cache',
	// Смотрим на процент покрытия тестами
	collectCoverage: true,
	// Ограничиваемся тестами на модули для реиспользования.
	collectCoverageFrom: [
		'src/**/*.ts',
		'!src/**/*.d.ts',
		'!src/**/*.conf.ts',
		// Корневой index всего лишь прослойка, её не тестируем
		'!src/**/index.ts',
		// main.ts не несёт смысловой нагрузки, кроме как вывода в консоль
		'!src/main.*',
	],
	coverageDirectory: './.test/coverage',
	// Список для resolve импортов в spec-файлы, когда не указан тип файла
	moduleFileExtensions: [
		'ts',
		'js',
		'json',
		'html',
	],
	// Resolve ссылок на import в тестируемых модулях (подключённых через import в файл теста)
	// Почему не используется указанный выше tsConfig?
	moduleNameMapper: {
		'~/(.*)$': '<rootDir>/$1',
		'@common/(.*)$': '<rootDir>/src/common.blocks/$1',
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
		'.*?\\.vue$': 'vue-jest',
	},
	// Исключаем нетранспилированный код ??? наш ts тоже нетранспилированный
	transformIgnorePatterns: [
		'/node_modules/',
	],
	// Чтобы расписывал все тесты по шагам (иначе не показывает шаги, если тестов больше чем 1)
	verbose: true,
};

module.exports = conf;
