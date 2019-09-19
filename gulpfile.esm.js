import gMinifyCss from 'gulp-clean-css';
import gConcat from 'gulp-concat';
import gHtml2Js from 'gulp-html-to-js';
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
// import uglifyES from 'gulp-uglify-es';

import appConf from './app.conf';

const root = appConf.rootFolderPath;
const absSrc = path.resolve(root, appConf.srcFolderName);
const absDest = path.resolve(root, appConf.destFolderName);

// instead of predeploy rimraf in package.json scripts
// task('clean',
// done => del([conf.dest], done));

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

task('predeploy.dev',
	() => src([
		path.resolve('node_modules', 'vue-class-component', 'dist', 'vue-class-component.esm.js'),
	])
		// ;)
		.pipe(gReplace('Evan', 'Ivan'))
		// usually solved by rollup-plugin-replace
		// https://github.com/vuejs/vue-class-component/issues/356
		.pipe(gReplace('process.env.NODE_ENV', "JSON.stringify('production')"))
		// fix to resolve modules without importmap (es-module-shims now not needed!)
		// can't transform by tsconfig > files outside rootDir
		// because of paths in dist becomes not the same as src =(((
		.pipe(gReplace("from 'vue'", "from 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js'"))
		.pipe(dest(absDest)));

task('postdeploy.dev:fixImportsNotInIndex',
	() => src([
		`${absDest}/**/!(index).js`,
		`${absDest}/*.js`,
		// exclude file with separate fix-task
		`!${absDest}/vue-class-component.esm.js`,
	])
		// typescript-transform-paths replaced alias with doublequoted paths
		.pipe(gReplace(/(from "\.)((?:(?!\.js|\.conf|\.html).)*)(";)/g, '$1$2/index.js$3'))
		.pipe(gReplace('.conf";', '.conf.js";'))
		.pipe(gReplace('.html";', '.html.js";'))
		// vue path transformed to cdn but local paths not!
		// should be replaced by typescript-transform-paths not gulp-replace!
		// https://github.com/LeDDGroup/typescript-transform-paths/issues/34
		// .pipe(gReplace("from 'vue-class-component'", "from '/vue-class-component.esm.js'"))
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
		series(
			'postdeploy.dev:copyNonTranspiledFiles',
			// 'postdeploy.dev:fixVueClassComponent',
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

// fix because of names of modules with src includes generated dist
task('fixTmplNames',
	() => src([
		path.resolve(absDest, 'bundle.js'),
	])
		// fix templates as string
		.pipe(gReplace(`register("${appConf.destFolderName}`, `register("${appConf.srcFolderName}`))
		// fix transpiled node_modules names
		.pipe(gReplace('node_modules/vue-class-component/dist/vue-class-component.esm', 'vue-class-component'))
		// .pipe(uglifyES())
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
		path.resolve(absSrc, 'importmap.json'),
		path.resolve('node_modules', 'bluebird', 'js', 'browser', 'bluebird.core.min.js'),
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
			'transpile', // es6/ts and es6 templates to SystemJs (es5) -> bundle.js
			'fixTmplNames', // in bundle.js fix SystemJs template names to be consistent with imports
		),
	));
