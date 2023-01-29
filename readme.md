# Babel是一个JS编译器
> babel是一套工具链，主要用于将ECMAScript 2015+ 版本的代码做向后兼容的JavaScript语法，以便在开发中不受运行环境的约束，减少开发人员心智负担。

### Babel主要做的事情是：转换和编译（源码到源码）

> 例如
```js
const square = n => n * n;

// 通过配置兼容浏览器
// 最终转译为：

const square = function square(n) {
  return n * n;
};

```
</br>

> 除此之外：bable还支持语法拓展，能够支持像React所用的Jsx语法，同时还支持用于静态类型检查的流式语法。

> 流式语法含义：
> 流式语法 (streaming syntax) 是一种语法解析技术，它能够在不将整个输入语句读入内存的情况下进行解析。这在处理大型文本文件或者实时输入时非常有用。流式语法通常使用词法分析和语法分析来解析输入语句，并且能够在遇到语法错误时立即停止解析。

### 主要使用这些babel的工具
1. @babel/core  babel核心
2. @babel/preset-env 是一个智能预设，允许您使用最新的 JavaScript，而无需微观管理目标环境需要哪些语法转换（以及可选的浏览器 polyfill）。这既让你的生活更轻松，也使 JavaScript 捆绑包更小！
3. @babel/plugin-transform-runtime 一个插件，可以重用 Babel 注入的辅助代码以节省代码大小。

### 这次主要阐述 @babel/runtime，@babel/polyfill，@babel/plugin-transform-runtime 这些插件它们的作用

### 插件 

babel 在插件的支持，能够做语法解析和转换，支持语法插件和转换插件

> 语法插件

主要是帮助babel解析特定类型的语法，可以在AST转换时使用，以支持解析新语法：

```js
import * as babel from "@babel/core";
const code = babel.transformFromAstSync(ast, {
    // 支持可选链
    plugins: ["@babel/plugin-proposal-optional-chaining"],
    babelrc: false
}).code;
```

> 转换插件

转换插件会启用响应的语法插件，不需要同时指定这俩种插件。

### 插件的使用

直接使用的时候配置插件名称即可
```js
{
    "plugins": ["@babel/plugin-transform-arrow-functions"]
}
```