# Vue Class Component starter (Typescript)
Pet project for bundling es-modules for modern browsers and SystemJs-modules for IE10 (and other).
No Webpack or Rollup using, but warm tube Gulp ;)

Run project: `npm run deploy` && `npm run www` or `npm run deploy.dev` && `npm run www.dev`
Run jest tests: `npm run test`

## Without bundlers
"Without bundlers" idea came from native "outFile" option of tsconfig.json
But "outFile" option can be used only for SystemJs and  AMD "module".

## Gulp?!
It is very simple tool and it's used in our legacy project, which isn't hurry for bells & whistles ;)

## SystemJs actual documentation & code examples
ES-modules reduced SystemJS popularity, therefore web is full of articles about SystemJS 0.xx configuration
and almost nothing about actual 5.0 version! If you want to use older one, just use 0.19 because of [typescript issue](https://github.com/systemjs/systemjs/issues/1587#issuecomment-287013920).

SystemJS 6.x have upgrade blocked [error](https://github.com/systemjs/systemjs/issues/2016) and [related](https://github.com/systemjs/systemjs/issues/2185#issuecomment-626889523), so 5.0

## Why Typescript & vue-class-component?
Because I want to write code which will be easy to migrate to Vue 3.0

## Aliases problem solved
Relative paths are like a hell!

## Questions

### Why such a different setup?
Because of we have legacy .Net project on typescript, and need to start migrate to Vue, and if we already have native transpiler tsc from Microsoft which supports outFile bundling feature from tsconfig. Why we need another bundler such as webpack or rollup?! outFile feature supported only for SystemJS or AMD modules, that's why this project based on SystemJS and not need in .vue overengineering (even with @vue/test-utils).

## Why SystemJs and not RequireJs (AMD)?
Because I have SystemJs bundle from the box (but needs to fix it in my project).

### You use JSX inside the components?
No.

## Articles
- 2016/03/19 [You may not need Webpack](https://medium.com/@vivainio/with-latest-typescript-you-may-not-need-webpack-417d2ef0e773) by [Ville M. Vainio](https://medium.com/@vivainio)
- 2017/06/06 [Vue + TypeScript Without a Module Bundler](https://wildermuth.com/2017/06/06/Vue-TypeScript-Without-a-Module-Bundler) by [Shawn Wildermuth](https://wildermuth.com/about)
- 2018/09/10 [Building VueJS Applications with TypeScript](https://dev.to/georgehanson/building-vuejs-applications-with-typescript-1j2n) by [George Hanson](https://dev.to/georgehanson)
- 2018/11/01 [Modern Javascript Without a Bundler](https://mattallan.me/posts/modern-javascript-without-a-bundler/) by [Matt Allan](https://mattallan.me/about/)
- 2018/03/28 [ES modules: A cartoon deep-dive](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/) by [Lin Clark](https://twitter.com/linclark)
- [Importmaps](https://github.com/wicg/import-maps) supported by [es-module-shims](https://github.com/guybedford/es-module-shims/blob/main/README.md)

## Tsc esm resolving
- [Using](https://github.com/viT-1/systemjs-ts-es6-vue/blob/e90f5a2a410a7980b2d48ed18d5e3c571660fcba/src/tsconfig.dev.json#L7) ttypescript-[transformers](https://github.com/cevek/ttypescript#transformers)
ttypescript last [updated](https://github.com/viT-1/systemjs-ts-es6-vue/commit/e90f5a2a410a7980b2d48ed18d5e3c571660fcba#diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519R96) to [1.5.12](https://www.npmjs.com/package/ttypescript/v/1.5.12): 2021/04/30

### Microsoft Typescript on Github
- [Way to add](https://github.com/microsoft/TypeScript/issues/16577#issuecomment-578729954) the '.js' file extension
- [.js removed](https://github.com/microsoft/TypeScript/issues/13422#issuecomment-275845062) since SystemJS v0.20 & TSC is outputting invalid ES module code (that's why I need to [fix imports manually](https://github.com/viT-1/systemjs-ts-es6-vue/blob/5a6904ae20a99b684e2540a5a99872c5cd43608a/gulpfile.esm.js#L122))

# Outdated packages
- systemjs since 6.0 has various errors:
    - [#2016](https://github.com/systemjs/systemjs/issues/2016) and single bundle by tsc
is [not supported](https://github.com/systemjs/systemjs/issues/2185#issuecomment-626889523) (error System is not defined).
    - since (?) >= v6.2.6 has [named modules errors](https://github.com/systemjs/systemjs/issues/2192#issuecomment-630276107) in case of using `outfile` (single bundle) instead of `outdir` option in `tsconfig.json`.