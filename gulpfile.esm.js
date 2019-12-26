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
import typescript from 'gulp-typescript';
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

task('copyEsmAssets',
	() => {
		// TODO: only if not exists on dest folder
		const vueClass = src([
			path.resolve('node_modules', 'vue-class-component', 'dist', 'vue-class-component.esm.js'),
		])
			.pipe(gReplace('process.env.NODE_ENV', "JSON.stringify('production')"))
			.pipe(dest(absDest));

		// TODO: only if not exists on dest folder
		const vueProp = src([
			path.resolve('node_modules', 'vue-property-decorator', 'lib', 'vue-property-decorator.js'),
		])
			.pipe(gReplace("/// <reference types='reflect-metadata'/>", ""))
			.pipe(gRename({ extname: '.esm.js' }))
			.pipe(dest(absDest));

		return gMerge(
			vueClass,
			vueProp,
		);
	});

task('deleteEsmAssets',
	() => del([
		path.resolve(absDest, 'vue-property-decorator.esm.js'),
		path.resolve(absDest, 'vue-class-component.esm.js')
	]));

task('postdeploy.dev:fixImportsInIndex',
	() => src([
		`${absDest}/**/index.js`,
	])
		// my export with singlequoted paths
		.pipe(gReplace(/^(?!.*(\.js|=))(.*)(";)/gm, '$2.js$3'))
		.pipe(dest(absDest)));

task('postdeploy.dev:fixImportsNotInIndex',
	() => src([
		`${absDest}/**/!(index).js`,
		`${absDest}/*.js`,
		// exclude file with separate fix-task
		`!${absDest}/*.esm*.js`, // including .esm.min.js
	])
		.pipe(gReplace('.conf";', '.conf.js";'))
		.pipe(gReplace('.html";', '.html.js";'))
		// vue path transformed to cdn (vue doesn'have another dependencies) but local paths not!
		// should be replaced by typescript-transform-paths not gulp-replace!
		// https://github.com/LeDDGroup/typescript-transform-paths/issues/34
		// TODO: need loop on importmap.
		.pipe(gReplace("from 'vue'", `from '${esmImportmapPaths['vue']}'`))
		.pipe(gReplace("from 'vue-property-decorator'", `from '${esmImportmapPaths['vue-property-decorator']}'`))
		// typescript-transform-paths replaced alias with doublequoted paths
		.pipe(gReplace(/(from "\.)((?:(?!\.js|\.conf|\.html).)*)(";)/g, '$1$2/index.js$3'))
		.pipe(dest(absDest)));

// these replacing are not needed in SystemJS bundle, that's why not in copyEsmAssets task
task('postdeploy.dev:fixImportsEsm',
	() => src([
		`${absDest}/*.esm*.js`,
	], { base: './' })
		// TODO: need loop on importmap.
		// TODO: regexp, all quote types
		// minimized versions: from'vue' (without space)
		.pipe(gReplace("'vue'", `'${esmImportmapPaths['vue']}'`))
		.pipe(gReplace("'vue-class-component'", `'${esmImportmapPaths['vue-class-component']}'`))
		.pipe(dest('.')));

// fix because of names of modules with src includes generated dist
task('fixBundle',
	() => src([
		// TODO: hJson from tsconfig outFile name
		path.resolve(absDest, 'bundle.system.js'),
	])
		// fix templates as string
		.pipe(gReplace(`register("${appConf.destFolderName}`, `register("${appConf.srcFolderName}`))
		// fix transpiled node_modules names to included SystemJS module
		// for module resolving instead of bugs with systemjs-importmap
		.pipe(gReplace(/("src\/)([a-z|-]*)(\.esm)?(")/g, '"$2"'))
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

task('predeploy',
	parallel(
		'cssbundle',
		'copyNonTranspiledFiles',
		'copySystemJs', // not in 'copyNonTranspiledFiles' because of dest subfolding
		series(
			'tmpl2js', // before fixing, html as ES modules
			'copyEsmAssets', // copy & fix es6 node modules for transpiling to SystemJs
		),
	));

task('postdeploy',
	parallel(
		'deleteEsmAssets', // they are not need, because of bundle including
		'fixBundle', // in bundle.js fix SystemJs template names to be consistent with imports
	),
);

task('predeploy',
	parallel(
		'cssbundle',
		'copyNonTranspiledFiles',
		'copySystemJs', // not in 'copyNonTranspiledFiles' because of dest subfolding
		series(
			'tmpl2js', // before fixing, html as ES modules
			'copyEsmAssets', // copy & fix es6 node modules for transpiling to SystemJs
		),
	));

// TODO: to npm run
// needs predeploy with 'tmpl2js'
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

// strange, but package.json > scripts: npm run tsc --project ./src/tsconfig.json is not working
task('deploy', series('transpile'));

task('postdeploy.dev',
	parallel(
		'cssbundle',
		'postdeploy.dev:copyNonTranspiledFiles',
		'tmpl2js', // will not fixed in bundle, that's why in parallel
		series(
			'copyEsmAssets', // before fixing
			parallel(
				'postdeploy.dev:fixImportsInIndex',
				'postdeploy.dev:fixImportsNotInIndex',
				'postdeploy.dev:fixImportsEsm'
			),
		),
	));
