# Babel 是一个 JS 编译器

> babel 是一套工具链，主要用于将 ECMAScript 2015+ 版本的代码做向后兼容的 JavaScript 语法，以便在开发中不受运行环境的约束，减少开发人员心智负担。

### Babel 主要做的事情是：转换和编译（源码到源码）

> 例如

```js
const square = (n) => n * n

// 通过配置兼容浏览器
// 最终转译为：

const square = function square(n) {
  return n * n
}
```

</br>

> 除此之外：bable 还支持语法拓展，能够支持像 React 所用的 Jsx 语法，同时还支持用于静态类型检查的流式语法。

> 流式语法含义：
> 流式语法 (streaming syntax) 是一种语法解析技术，它能够在不将整个输入语句读入内存的情况下进行解析。这在处理大型文本文件或者实时输入时非常有用。流式语法通常使用词法分析和语法分析来解析输入语句，并且能够在遇到语法错误时立即停止解析。

### 主要使用这些 babel 的工具

1. @babel/core babel 核心
2. @babel/preset-env 是一个智能预设，允许您使用最新的 JavaScript，而无需微观管理目标环境需要哪些语法转换（以及可选的浏览器 polyfill）。这既让你的生活更轻松，也使 JavaScript 捆绑包更小！
3. @babel/plugin-transform-runtime 一个插件，可以重用 Babel 注入的辅助代码以节省代码大小。

### 这次主要阐述 @babel/runtime，@babel/polyfill，@babel/plugin-transform-runtime 这些插件它们的作用

### 插件

babel 在插件的支持，能够做语法解析和转换，支持语法插件和转换插件

> 语法插件

主要是帮助 babel 解析特定类型的语法，可以在 AST 转换时使用，以支持解析新语法：

```js
import * as babel from '@babel/core'
const code = babel.transformFromAstSync(ast, {
  // 支持可选链
  plugins: ['@babel/plugin-proposal-optional-chaining'],
  babelrc: false,
}).code
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

如果单一配置对语法进行转换是相当繁琐的

### 预设

我们经常使用的是这几个预设，其他预设自行去官方文档进行查阅

1. @babel/preset-env
2. @babel/preset-typescript

### @babel/preset-env

@babel/preset-env 主要作用是对我们所使用的并且目标浏览器中缺失的功能进行代码转换和加载 polyfill（垫片），在不进行任何配置的情况下，@babel/preset-env 所包含的插件将支持所有最新的 JS 特性(ES2015,ES2016 等，不包含 stage 阶段)，将其转换成 ES5 代码。

> 该预设会根据用户配置的兼容环境，生成对应的插件列表来进行编译。
> 例如：.browserslistrc 文件，或者是 babel 配置文件中 targets 属性，以及别的配置等等。兼容环境配置参考：https://github.com/browserslist/browserslist
> 自动根据配置进行使用：@babel/core @babel/plugin-transform-regenerator useBuiltIns: "usage" @babel/plugin-transform-runtime

如果仅仅只是使用该预设不进行配置

```json
{
  "presets": [["@babel/preset-env"]]
}
```

那么转换出来的代码是不包含垫片的；例如：

```js
const obj = {}

const test = () => {}

const res = obj?.type

Promise.resolve(1).then((res) => {
  console.log(res)
})
```

> 转换成


```js
'use strict'

var obj = {}
var test = function test() {}
var res = obj === null || obj === void 0 ? void 0 : obj.type
Promise.resolve(1).then(function (res) {
  console.log(res)
})
```
> 仅仅只是添加使用到的垫片，具体配置改为如下，建议使用core-js@3,因为core-js@2 内容不再更新；

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ]
}
```

> 对应编译出来代码
```js
"use strict";

require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
var obj = {};
var test = function test() {};
var res = obj === null || obj === void 0 ? void 0 : obj.type;
Promise.resolve(1).then(function (res) {
  console.log(res);
});
```

### @babel/plugin-transform-runtime

> Babel 会使用很小的辅助函数实现 类似 _createClass 公共方法。这个方法 会被注入到每个使用到它的文件中，如果有很多文件中使用class，那么这个方法也会被注入很多次。

> 例如：

```js
class Bar{
    constructor() {

    }
    get_value() {
        return '测试内容'
    }
}
```
> 被转换成

```js
"use strict";

require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.number.constructor.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Bar = /*#__PURE__*/function () {
  function Bar() {
    _classCallCheck(this, Bar);
  }
  _createClass(Bar, [{
    key: "get_value",
    value: function get_value() {
      return '测试内容';
    }
  }]);
  return Bar;
}();
```