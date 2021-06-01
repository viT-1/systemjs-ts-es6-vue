import del from 'del';
import fs from 'fs';
import gMinifyCss from 'gulp-clean-css';
import gConcat from 'gulp-concat';
import gHtml2Js from 'gulp-html-to-js';
import gRename from 'gulp-rename';
import gReplace from 'gulp-replace';
import hJson from 'hjson';
import gMerge from 'merge-stream';
import path from 'path';
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

const esmImportmap = hJson.parse(
	fs.readFileSync(path.resolve(absSrc, 'importmap.dev.json'), 'utf8'));
const esmImportmapPaths = esmImportmap.imports;

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

task('copyRenameFetchResp',
	() => src([
		path.resolve(absSrc, 'importmap.dev.json'),
	])
		.pipe(gRename('fetch-resp.json'))
		.pipe(dest(absDest)));

task('copyEsmAssets',
	() => {
		// simple copying
		const directVuex = src([
			path.resolve('node_modules', 'direct-vuex', 'dist', 'direct-vuex.esm.min.js'),
		])
			.pipe(dest(absDest));

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
			directVuex,
			vueClass,
			vueProp,
		);
	});

task('deleteAssets',
	() => del([
		path.resolve(absDest, 'tsconfig.html-esm.json'),
		path.resolve(absDest, 'direct-vuex.esm.min.js'),
		path.resolve(absDest, 'vue-property-decorator.js'),
		path.resolve(absDest, 'vue-class-component.js'),
	]));

task('postdeploy.dev:fixImportsFromMap',
	() => src([
		`${absDest}/**/*.js`, // resolve node_modules in all files, esm too
	], {base: './'})
		// vue path transformed to cdn (vue doesn'have another dependencies) but local paths not!
		// should be replaced by typescript-transform-paths not gulp-replace!
		// https://github.com/LeDDGroup/typescript-transform-paths/issues/34
		// TODO: need loop on importmap.
		.pipe(gReplace(/from[\s]?['|"]debounce-decorator-ts['|"]/g,
			`from '${esmImportmapPaths['debounce-decorator-ts']}'`))
		.pipe(gReplace(/from[\s]?['|"]direct-vuex['|"]/g,
			`from '${esmImportmapPaths['direct-vuex']}'`))
		.pipe(gReplace(/from[\s]?['|"]vue['|"]/g,
			`from '${esmImportmapPaths['vue']}'`))
		.pipe(gReplace(/from[\s]?['|"]vuex['|"]/g,
			`from '${esmImportmapPaths['vuex']}'`))
		.pipe(gReplace(/from[\s]?['|"]vue-class-component['|"]/g,
			`from '${esmImportmapPaths['vue-class-component']}'`))
		.pipe(gReplace(/from[\s]?['|"]vue-property-decorator['|"]/g,
			`from '${esmImportmapPaths['vue-property-decorator']}'`))
		.pipe(dest('./')));

task('postdeploy.dev:fixImports',
	() => src([
		`${absDest}/**/*.js`,
	])
		// my export with singlequoted paths
		// TODO: create common regexp for resolving modules
		.pipe(gReplace(/^(.* from )("|')(?!.*(\.js))(.*)("|')/gm, '$1$2$4.js$2'))
		.pipe(dest(absDest)));

// fix because of names of modules with src includes generated dist
task('uglifyBundles',
	() => src([
		// TODO: hJson from tsconfig outFile name
		path.resolve(absDest, 'bundle.system.js'),
		path.resolve(absDest, 'html-esm.system.js'),
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

task('copyNonTranspiledFiles',
	() => src([
		path.resolve(absSrc, appConf.entryFileName),
		path.resolve(absSrc, 'importmap.system.json'),
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
		'copyNonTranspiledFiles',
		'copySystemJs', // not in 'copyNonTranspiledFiles' because of dest subfolding
		'copyEsmAssets', // copy & fix es6 node modules for transpiling to SystemJs
	));

task('postdeploy',
	parallel(
		'deleteAssets', // they are not need, because of bundles including
		'uglifyBundles',
	),
);

task('postdeploy.dev',
	parallel(
		'cssbundle',
		'tmpl2js', // will not fixed in bundle, that's why in parallel
		'copyRenameFetchResp',
		'postdeploy.dev:copyNonTranspiledFiles',
		series(
			'copyEsmAssets', // before fixing
			'postdeploy.dev:fixImportsFromMap', // can't modify same files in parallel
			'postdeploy.dev:fixImports',
		),
	));
