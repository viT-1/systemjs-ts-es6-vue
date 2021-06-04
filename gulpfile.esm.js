import del from 'del';
import gMinifyCss from 'gulp-clean-css';
import gConcat from 'gulp-concat';
import gHtml2Js from 'gulp-html-to-js';
import gRename from 'gulp-rename';
import gReplace from 'gulp-replace';
import gReplacePatterns from 'gulp-replace-task';
import gMerge from 'merge-stream';
import path from 'path';
import {
	src,
	dest,
	task,
	parallel,
} from 'gulp';
import uglifyES from 'gulp-uglify-es';

import { conf as appConf } from './app.conf';
import { dependencies } from './package.json';
import { compilerOptions as tsOptionsSystemJs } from './src/tsconfig.json';
import { compilerOptions as tsOptionsHtmlEsm } from './src/tsconfig.html-esm.json';

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

task('copyRenameFetchResp',
	() => src([
		path.resolve(absSrc, 'importmap.dev.json'),
	])
		.pipe(gRename('fetch-resp.json'))
		.pipe(dest(absDest)));

// only vue-class-component doesn't have separate umd bundle from distributor
// thats why manual tsconfig bundling with dist/**/html.js templates to outFile
// instead of using importmap.system.json. Also dependency in vue-property-decorator not resolved
// Can't use SystemJS v6 cause of named modules html.js errors
// esm deploy has vue-class-component as distributed esm-bundle and not need this copying to dist
task('copyEsmAssets',
	() => {

		// TODO: only if not exists in my absDest folder
		const vueClass = src([
			path.resolve('node_modules', 'vue-class-component', 'dist', 'vue-class-component.esm.js'),
		])
			.pipe(gReplace('process.env.NODE_ENV', 'JSON.stringify(\'production\')'))
			// renaming to avoid replacing '.esm' suffixes in named modules bundling by SystemJs
			.pipe(gRename({ basename: 'vue-class-component', extname: '.js' }))
			.pipe(dest(absDest));

		// TODO: only if not exists in my absDest folder
		const vueProp = src([
			path.resolve('node_modules', 'vue-property-decorator', 'lib', 'vue-property-decorator.js'),
		])
			.pipe(gReplace('/// <reference types=\'reflect-metadata\'/>', ''))
			.pipe(dest(absDest));

		return gMerge(
			vueClass,
			vueProp,
		);
	});

task('copyFixNmVersions',
	() => src([
		`${absSrc}/importmap.*.json`,
		path.resolve(absSrc, appConf.entryDevFileName),
		path.resolve(absSrc, appConf.entryFileName),
	])
		.pipe(gReplacePatterns({
			patterns: [{
				json: dependencies,
			}],
		}))
		.pipe(dest(absDest)));

task('systemjs:deleteAssets',
	() => del([
		`${absDest}/**/*.html.js`,
		path.resolve(absDest, 'tsconfig.html-esm.json'),
		path.resolve(absDest, 'direct-vuex.esm.min.js'),
		path.resolve(absDest, 'vue-property-decorator.js'),
		path.resolve(absDest, 'vue-class-component.js'),
	]));

// native typescript rejected idea https://github.com/microsoft/TypeScript/pull/35148
// for importing local paths without dots used @zoltu/typescript-transformer-append-js-extension
// this replace still needs only for templates importing in conf files
task('esm:fixImportsAddJsSuffix',
	() => src([
		`${absDest}/**/*-conf.js`,
	])
		// my export with singlequoted paths
		// TODO: create common regexp for resolving modules
		// typescript-transform-paths uses doublequotes
		// but node module names such as vue-class-component still use singlequotes import
		// singlequotes resolving by html <script type="importmap">
		// deprecated by using @zoltu/typescript-transformer-append-js-extension
		// .pipe(gReplace(/^(.* from )(")(?!.*(\.js))(.*)(")/gm, '$1$2$4.js$2'))
		// import *.html not transpled to doublequotes - second replace
		.pipe(gReplace(/(.* from ')(.*)(\.html)(')/gm, '$1$2$3.js$4'))
		.pipe(dest(absDest)));

task('systemjs:uglifyBundles',
	() => src([
		path.resolve(absDest, path.basename(tsOptionsSystemJs.outFile)),
		path.resolve(absDest, path.basename(tsOptionsHtmlEsm.outFile)),
	])
		.pipe(uglifyES())
		.pipe(dest(absDest)));

task('copySystemJs', // not in 'copyNonTranspiledFiles' because of dest
	() => src([
		path.resolve('node_modules', 'systemjs', 'dist', 'system.min.js'),
		path.resolve('node_modules', 'systemjs', 'dist', 'extras', 'named-exports.min.js'),
		path.resolve('node_modules', 'systemjs', 'dist', 'extras', 'named-register.min.js'),
	])
		.pipe(dest(path.resolve(absDest, 'systemjs'))));

task('systemjs:copyNonTranspiledFiles',
	() => src([
		path.resolve(absSrc, 'tsconfig.html-esm.json'),
		path.resolve('node_modules', 'promise-polyfill', 'dist', 'polyfill.min.js'),
		path.resolve('node_modules', 'whatwg-fetch', 'dist', 'fetch.umd.js'),
	])
		.pipe(dest(absDest)));

task('predeploy',
	parallel(
		'cssbundle',
		'tmpl2js',
		'copyRenameFetchResp',
		'copySystemJs', // not in 'copyNonTranspiledFiles' because of dest subfolding
		'copyEsmAssets', // copy & fix es6 node modules for transpiling to SystemJs
		'systemjs:copyNonTranspiledFiles',
		'copyFixNmVersions', // separate from 'copyNonTranspiledFiles' task because of version replacing
	));

task('postdeploy',
	parallel(
		'systemjs:deleteAssets', // they are not need, because of bundles including
		'systemjs:uglifyBundles',
	),
);

task('predeploy.dev',
	parallel(
		'cssbundle',
		'tmpl2js', // will not fixed in bundle, that's why in parallel
		'copyRenameFetchResp',
		// importmap now! no need fixing paths! no need series!
		// no need copying 2 vue decorators cause of importmap
		// 'copyEsmAssets',
		'copyFixNmVersions', // before fixing imports in my modules - importmap should be fixed
	));

task('postdeploy.dev',
	parallel(
		'esm:fixImportsAddJsSuffix', // @zoltu ttsc plugin don't transform paths with dots (*.html.js)
	));
