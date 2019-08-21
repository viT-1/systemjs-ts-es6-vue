import gMinifyCss from 'gulp-clean-css';
import gConcat from 'gulp-concat';
import gReplace from 'gulp-replace';
import path from 'path';
import typescript from 'gulp-typescript';
// import del from 'del';
import {
	src,
	dest,
	task,
	parallel,
	series,
} from 'gulp';
import uglifyES from 'gulp-uglify-es';

import appConf from './app.conf';

const root = appConf.rootFolderPath;
const absSrc = path.resolve(root, appConf.srcFolderName);
const absDest = path.resolve(root, appConf.destFolderName);

// Вместо этого predeploy rimraf в командной строке (package.json)
// task('clean',
// done => del([conf.dest], done));

task('cssbundle',
	() => src([`${absSrc}/**/*.css`])
		.pipe(gMinifyCss())
		.pipe(gConcat('index.css'))
		.pipe(dest(absDest)));

task('postdeploy.dev:copyNonTranspiledFiles',
	() => src([
		path.resolve(absSrc, appConf.entryDevFileName),
	])
		.pipe(dest(absDest)));


task('postdeploy.dev:replace-paths-not-index',
	() => src([
		`${absDest}/**/!(index).js`,
		`${absDest}/*.js`,
	])
		// typescript-transform-paths replaced alias with doublequoted paths
		.pipe(gReplace(/(from "\.)((?:(?!\.js).)*)(";)/g, '$1$2/index.js$3'))
		.pipe(gReplace('.conf\';', '.conf.js\';'))
		.pipe(dest(absDest)));

task('postdeploy.dev:replace-paths-index',
	() => src([
		`${absDest}/**/index.js`,
	])
		// my export with singlequoted paths
		.pipe(gReplace('\';', '.js\';'))
		.pipe(dest(absDest)));

task('postdeploy.dev',
	parallel(
		'cssbundle',
		series(
			'postdeploy.dev:copyNonTranspiledFiles',
			parallel(
				'postdeploy.dev:replace-paths-index',
				'postdeploy.dev:replace-paths-not-index',
			),
		),
	));

task('transpile',
	() => {
		// Transpiling for browser tsconfig
		const tsApp = typescript.createProject(
			path.resolve(absSrc, 'tsconfig.json'),
		);
		const tsResult = tsApp.src()
			.pipe(tsApp()).js;

		return tsResult
			.pipe(uglifyES())
			.pipe(dest(absDest));
	});

task('copyEntry',
	() => src([path.resolve(absSrc, appConf.entryFileName)])
		.pipe(dest(absDest)));

task('copyImportMap',
	() => src([
		path.resolve(absSrc, 'importmap.json'),
	])
		.pipe(dest(absDest)));

task('copySystemJs',
	() => src([
		path.resolve('node_modules', 'systemjs', 'dist', 'system.min.js'),
		path.resolve('node_modules', 'systemjs', 'dist', 'extras', 'named-register.js'),
		// path.resolve('node_modules', 'systemjs-plugin-text', 'text.js'),
	])
		.pipe(dest(path.resolve(absDest, 'systemjs'))));

task('iePromisePolyfill',
	() => src([
		path.resolve('node_modules', 'bluebird', 'js', 'browser', 'bluebird.core.min.js'),
	])
		.pipe(dest(absDest)));

task('deploy', parallel(
	'cssbundle',
	'transpile',
	'copyEntry',
	'copyImportMap',
	'copySystemJs',
	'iePromisePolyfill',
));
