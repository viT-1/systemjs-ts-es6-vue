# Vue Class Component starter (Typescript)
Pet project for bundling es-modules for modern browsers and SystemJs-modules for IE10 (and other).
No Webpack or Rollup using, but warm tube Gulp ;)

## Without bundlers
"Without bundlers" idea came from native "outFile" option of tsconfig.json
But "outFile" option can be used only for SystemJs and  AMD "module".

## Gulp?!
It is very simple tool and it's used in our legacy project, which isn't hurry for bells & whistles ;)

## SystemJs actual documentation & code examples
ES-modules reduced SystemJS popularity, therefore web is full of articles about SystemJS 0.xx configuration
and almost nothing about actual 5.0 version! If you want to use older one, just use 0.19 because of [typescript issue](https://github.com/systemjs/systemjs/issues/1587#issuecomment-287013920).

SystemJS 6.x have upgrade blocked [error](https://github.com/systemjs/systemjs/issues/2016), so 5.0

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