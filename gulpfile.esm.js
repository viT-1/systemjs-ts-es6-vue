import del from 'del';
import gMinifyCss from 'gulp-clean-css';
import gConcat from 'gulp-concat';
import gHtml2Js from 'gulp-html-to-js';
import gReplace from 'gulp-replace';
import path from 'path';
import typescript from 'gulp-typescript';
import ttypescript from 'ttypescript';
import {
	src,
	dest,
	task,
	parallel,
	series,
} from 'gulp';
import uglifyES from 'gulp-uglify-es';

import { conf as appConf } from './app.conf';

const root = appConf.rootFolderPath;
const absSrc = path.resolve(root, appConf.srcFolderName);
const absDest = path.resolve(root, appConf.destFolderName);

task('cssbundle',
	() => src([`${absSrc}/**/*.css`])
		.pipe(gMinifyCss())
		.pipe(gConcat('index.css'))
		.pipe(dest(absDest)));

task('tmpl2js',
	() => src([`${absSrc}/**/*.html`])
		.pipe(gHtml2Js())
		.pipe(gReplace('module.exports =', 'export default'))
		.pipe(dest(absDest)));

task('postdeploy.dev:copyNonTranspiledFiles',
	() => src([
		path.resolve(absSrc, appConf.entryDevFileName),
	])
		.pipe(dest(absDest)));

task('copyNModules',
	() => src([
		path.resolve('node_modules', 'vue-property-decorator', 'lib', 'vue-property-decorator.js'),
		path.resolve('node_modules', 'vue-class-component', 'dist', 'vue-class-component.esm.js'),
	])
		// usually solved by rollup-plugin-replace
		// https://github.com/vuejs/vue-class-component/issues/356
		.pipe(gReplace('process.env.NODE_ENV', "JSON.stringify('production')"))
		.pipe(gReplace("/// <reference types='reflect-metadata'/>", ""))

		// can't use map for es6-modules
		.pipe(dest(absSrc)));

// to src because of dist/dist incorrect folder structure with "outDir" & "files" options
task('predeploy.dev', series('copyNModules'));

task('deleteNModules',
	() => del([
		path.resolve(absSrc, 'vue-property-decorator.js'),
		path.resolve(absSrc, 'vue-class-component.esm.js')
	]));

task('pretranspileNModules',
	() => src([
		path.resolve('node_modules', 'vue-property-decorator', 'lib', 'vue-property-decorator.js'),
		path.resolve('node_modules', 'vue-class-component', 'dist', 'vue-class-component.esm.js'),
	])
		.pipe(gReplace('process.env.NODE_ENV', "JSON.stringify('production')"))
		.pipe(gReplace("/// <reference types='reflect-metadata'/>", ""))
		// changing 'from' as variant above not needed cause of including to bundle
		.pipe(dest(absDest)));

task('postdeploy.dev:fixImportsNotInIndex',
	() => src([
		`${absDest}/**/!(index).js`,
		`${absDest}/*.js`,
		// exclude file with separate fix-task
		`!${absDest}/vue-class-component.esm.js`,
		`!${absDest}/vue-property-decorator.js`,
	])
		// typescript-transform-paths replaced alias with doublequoted paths
		.pipe(gReplace(/(from "\.)((?:(?!\.js|\.conf|\.html).)*)(";)/g, '$1$2/index.js$3'))
		.pipe(gReplace('.conf";', '.conf.js";'))
		.pipe(gReplace('.html";', '.html.js";'))
		// vue path transformed to cdn (vue doesn'have another dependencies) but local paths not!
		// should be replaced by typescript-transform-paths not gulp-replace!
		// https://github.com/LeDDGroup/typescript-transform-paths/issues/34
		.pipe(gReplace("from 'vue-property-decorator'", "from '/vue-property-decorator.js'"))
		.pipe(dest(absDest)));

task('postdeploy.dev:fixImportsInIndex',
	() => src([
		`${absDest}/**/index.js`,
	])
		// my export with singlequoted paths
		.pipe(gReplace('";', '.js";'))
		.pipe(dest(absDest)));

task('postdeploy.dev',
	parallel(
		'cssbundle',
		'tmpl2js',
		'deleteNModules',
		series(
			'postdeploy.dev:copyNonTranspiledFiles',
			parallel(
				'postdeploy.dev:fixImportsInIndex',
				'postdeploy.dev:fixImportsNotInIndex',
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
			.pipe(dest(absDest));
	});

task('transpile.dev',
	() => {
		// Transpiling for browser tsconfig
		const tsApp = typescript.createProject(
			path.resolve(absSrc, 'tsconfig.dev.json'),
			{ typescript: ttypescript },
		);
		const tsResult = tsApp.src()
			.pipe(tsApp()).js;

		return tsResult
			.pipe(dest(absDest));
	});

// fix because of names of modules with src includes generated dist
task('fixBundle',
	() => src([
		path.resolve(absDest, 'bundle.system.js'),
	])
		// fix templates as string
		.pipe(gReplace(`register("${appConf.destFolderName}`, `register("${appConf.srcFolderName}`))
		// fix transpiled node_modules names to included SystemJS module
		// for module resolving instead of bugs with systemjs-importmap
		.pipe(gReplace(`${appConf.srcFolderName}/vue-class-component.esm`, 'vue-class-component'))
		.pipe(gReplace(`${appConf.srcFolderName}/vue-property-decorator`, 'vue-property-decorator'))
		.pipe(uglifyES())
		.pipe(dest(absDest)));

task('copySystemJs', // not in 'copyNonTranspiledFiles' because of dest
	() => src([
		path.resolve('node_modules', 'systemjs', 'dist', 'system.js'),
		path.resolve('node_modules', 'systemjs', 'dist', 'extras', 'named-register.js'),
	])
		.pipe(dest(path.resolve(absDest, 'systemjs'))));

task('copyNonTranspiledFiles',
	() => src([
		path.resolve(absSrc, appConf.entryFileName),
		path.resolve(absSrc, 'importmap.system.json'),
		path.resolve('node_modules', 'promise-polyfill', 'dist', 'polyfill.min.js'),
		path.resolve('node_modules', 'whatwg-fetch', 'dist', 'fetch.umd.js'),
	])
		.pipe(dest(absDest)));

task('deploy',
	parallel(
		'cssbundle',
		'copyNonTranspiledFiles',
		'copySystemJs', // not in 'copyNonTranspiledFiles' because of dest subfolding
		series(
			'tmpl2js', // html as ES modules
			'copyNModules', // copy & fix es6 node modules for transpiling to SystemJs
			'transpile', // es6/ts and es6 templates to SystemJs (es5) -> bundle.js
			parallel(
				'deleteNModules', // they are not need, because of bundle including
				'fixBundle', // in bundle.js fix SystemJs template names to be consistent with imports
			),
		),
	));
