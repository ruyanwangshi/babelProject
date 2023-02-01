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

1. @babel/cli是Babel命令行转码工具，如果我们使用命令行进行Babel转码就需要安装它 
2. @babel/core babel 核心 (@babel/cli依赖@babel/core，因此也需要安装@babel/core这个Babel核心npm包。)
3. @babel/preset-env 是一个智能预设，允许您使用最新的 JavaScript，而无需微观管理目标环境需要哪些语法转换（以及可选的浏览器 polyfill）。这既让你的生活更轻松，也使 JavaScript 捆绑包更小！
4. @babel/plugin-transform-runtime 一个插件，可以重用 Babel 注入的辅助代码以节省代码大小。

###  Babel的配置文件
Babel的配置文件是Babel执行时默认会在当前目录寻找的文件，主要有.babelrc，.babelrc.js，babel.config.js和package.json。它们的配置项都是相同，作用也是一样的，只需要选择其中一种。
plugins插件数组和presets预设数组是有顺序要求的。如果两个插件或预设都要处理同一个代码片段，那么会根据插件和预设的顺序来执行。规则如下：
1. 插件比预设先执行
2. 插件执行顺序是插件数组从前向后执行
3. 预设执行顺序是预设数组从后向前执行
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

### 预设 presets

我们经常使用的是这几个预设，其他预设自行去官方文档进行查阅

1. @babel/preset-env
2. @babel/preset-typescript
3. @babel/preset-flow
4. @babel/preset-react
#### target
  该参数项可以取值为字符串、字符串数组或对象，不设置的时候取默认值空对象{}。
  如果我们对@babel/preset-env的targets参数项进行了设置，那么就不使用browserslist的配置，而是使用targets的配置。如不设置targets，那么就使用browserslist的配置。如果targets不配置，browserslist也没有配置，那么@babel/preset-env就对所有ES6语法转换成ES5的。
````js
  presets: [["@babel/preset-env", {
    targets: {
      "chrome": "58",
      "ie": "11"
    }
  }]],
````
#### useBuiltIns
  useBuiltIns项取值可以是"usage" 、 "entry" 或 false。如果该项不进行设置，则取默认值false(会全部引入到最终的代码里)
  useBuiltIns这个参数项主要和polyfill的行为有关
  'entry'这种方式不会根据我们实际用到的API进行针对性引入polyfill，而'usage'可以做到。另外，在使用的时候，'entry'需要我们在项目入口处手动引入polyfill，而'usage'不需要
  需要注意的是，使用'entry'这种方式的时候，只能import polyfill一次，一般都是在入口文件。如果进行多次import，会发生错误。
#### corejs
  该参数项的取值可以是2或3，没有设置的时候取默认值为2
  这个参数项只有useBuiltIns设置为'usage'或'entry'时，才会生效。
  取默认值或2的时候，Babel转码的时候使用的是core-js@2版本（即core-js2.x.x）。因为某些新API只有core-js@3里才有，例如数组的flat方法，我们需要使用core-js@3的API模块进行补齐，这个时候我们就把该项设置为3。
  需要注意的是，corejs取值为2的时候，需要安装并引入core-js@2版本，或者直接安装并引入polyfill也可以。如果corejs取值为3，必须安装并引入core-js@3版本才可以，否则Babel会转换失败并提示：
  ````json
  `@babel/polyfill` is deprecated. Please, use required parts of `core-js` and `regenerator-runtime/runtime` separately
  ````
#### modules
  这个参数项的取值可以是"amd"、"umd" 、 "systemjs" 、 "commonjs" 、"cjs" 、"auto" 、false。在不设置的时候，取默认值"auto"。
  该项用来设置是否把ES6的模块化语法改成其它模块化语法。
  我们常见的模块化语法有两种：（1）ES6的模块法语法用的是import与export；（2）commonjs模块化语法是require与module.exports。
  在该参数项值是'auto'或不设置的时候，会发现我们转码前的代码里import都被转码成require了。
  如果我们将参数项改成false，那么就不会对ES6模块化进行更改，还是使用import引入模块。(使用ES6模块化语法有什么好处呢。在使用Webpack一类的打包工具，可以进行静态分析，从而可以做tree shaking 等优化措施。)
### @babel/preset-env

@babel/preset-env 主要作用是对我们所使用的并且目标浏览器中缺失的功能进行代码转换和加载 polyfill（垫片），在不进行任何配置的情况下，@babel/preset-env 所包含的插件将支持所有最新的 JS 特性(ES2015,ES2016 等，不包含 stage 阶段)，将其转换成 ES5 代码。

> 该预设会根据用户配置的兼容环境，生成对应的插件列表来进行编译。
> 例如：.browserslistrc 文件，或者是 babel 配置文件中 targets 属性，以及别的配置等等。兼容环境配置参考：https://github.com/browserslist/browserslist
> 自动根据配置进行使用：@babel/core @babel/plugin-transform-regenerator useBuiltIns: "usage" @babel/plugin-transform-runtime
> 
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

> 仅仅只是添加使用到的垫片，具体配置改为如下，建议使用 core-js@3,因为 core-js@2 内容不再更新；

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
'use strict'

require('core-js/modules/es.object.to-string.js')
require('core-js/modules/es.promise.js')
var obj = {}
var test = function test() {}
var res = obj === null || obj === void 0 ? void 0 : obj.type
Promise.resolve(1).then(function (res) {
  console.log(res)
})
```

### @babel/plugin-transform-runtime

> @babel/plugin-transform-runtime 是一个可以重复使用 Babel 注入的帮助程序，以节省代码大小的插件。 此插件为开发时使用，但运行时需要 @babel/runtime 插件进行结合使用。(@babel/runtime包提供辅助函数模块)
@babel/plugin-transform-runtime有三大作用：
1. 自动移除语法转换后内联的辅助函数（inline Babel helpers），使用@babel/runtime/helpers里的辅助函数来替代；
2. 当代码里使用了core-js的API，自动引入@babel/runtime-corejs3/core-js-stable/，以此来替代全局引入的core-js/stable;
3. 当代码里使用了Generator/async函数，自动引入@babel/runtime/regenerator，以此来替代全局引入的regenerator-runtime/runtime
#### 配置项
##### helpers
该项是用来设置是否要自动引入辅助函数包，这个我们当然要引入了，这是@babel/plugin-transform-runtime的核心用途。该项取值是布尔值，我们设置为true，其默认值也是true，所以也可以省略不填。
##### corejs和regenerator
这两项是用来设置是否做API转换以避免污染全局环境，regenerator取值是布尔值，corejs取值是false、2和3。在前端业务项目里，我们一般对corejs取false，即不对Promise这一类的API进行转换。而在开发JS库的时候设置为2或3。regenerator取默认的true就可以
##### useESModules
该项用来设置是否使用ES6的模块化用法，取值是布尔值。默认是fasle，在用webpack一类的打包工具的时候，我们可以设置为true，以便做静态分析。
##### absoluteRuntime
该项用来自定义@babel/plugin-transform-runtime引入@babel/runtime/模块的路径规则，取值是布尔值或字符串。没有特殊需求，我们不需要修改，保持默认false即可。
##### version
该项主要是和@babel/runtime及其进化版@babel/runtime-corejs2、@babel/runtime-corejs3的版本号有关系，这三个包我们只需要根据需要安装一个。我们把安装的npm包的版本号设置给version即可。其实该项不填取默认值就行，目前填写版本号主要是可以减少打包体积。
#### 小结
要使用@babel/plugin-transform-runtime插件，其实只有一个npm包是必须要装的，那就是它自己@babel/plugin-transform-runtime。
对于@babel/runtime及其进化版@babel/runtime-corejs2、@babel/runtime-corejs3，我们只需要根据自己的需要安装一个。
如果你不需要对core-js做API转换，那就安装@babel/runtime并把corejs配置项设置为false即可。
如果你需要用core-js2做API转换，那就安装@babel/runtime-corejs2并把corejs配置项设置为2即可。
如果你需要用core-js3做API转换，那就安装@babel/runtime-corejs3并把corejs配置项设置为3即可。
> #### Babel 会使用很小的辅助函数实现 类似 \_createClass 公共方法。这个方法 会被注入到每个使用到它的文件中，如果有很多文件中使用 class，那么这个方法也会被注入很多次。

> 例如：

```js
class Bar {
  constructor() {}
  get_value() {
    return '测试内容'
  }
}
```

> 被转换成

```js
'use strict'

require('core-js/modules/es.object.define-property.js')
require('core-js/modules/es.symbol.iterator.js')
require('core-js/modules/es.array.iterator.js')
require('core-js/modules/es.string.iterator.js')
require('core-js/modules/web.dom-collections.iterator.js')
require('core-js/modules/es.symbol.to-primitive.js')
require('core-js/modules/es.date.to-primitive.js')
require('core-js/modules/es.symbol.js')
require('core-js/modules/es.symbol.description.js')
require('core-js/modules/es.object.to-string.js')
require('core-js/modules/es.number.constructor.js')
function _typeof(obj) {
  '@babel/helpers - typeof'
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (obj) {
            return typeof obj
          }
        : function (obj) {
            return obj && 'function' == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj
          }),
    _typeof(obj)
  )
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor)
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  Object.defineProperty(Constructor, 'prototype', { writable: false })
  return Constructor
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, 'string')
  return _typeof(key) === 'symbol' ? key : String(key)
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== 'object' || input === null) return input
  var prim = input[Symbol.toPrimitive]
  if (prim !== undefined) {
    var res = prim.call(input, hint || 'default')
    if (_typeof(res) !== 'object') return res
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (hint === 'string' ? String : Number)(input)
}
var Bar = /*#__PURE__*/ (function () {
  function Bar() {
    _classCallCheck(this, Bar)
  }
  _createClass(Bar, [
    {
      key: 'get_value',
      value: function get_value() {
        return '测试内容'
      },
    },
  ])
  return Bar
})()
```

> 具体配置为：

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
  ],
  "plugins": [["@babel/plugin-transform-runtime"]]
}
```

请执行 npm run build

> <strong>但是此方式还是有缺点的，比如说 Promise,是引入的实现垫片包会污染到全局的使用，如果不想使垫片污染到全局，请使用如下配置</strong>

```json
{
  "presets": [["@babel/preset-env"]],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```

请执行 npm run build

> 为什么要这么细致去配置呢，直接使用 @babel/preset-env 配置响应配置就好了，它们之间的区别又是什么？

| .babelrc 配置                                                               | webpack 打包后的产物大小 |
| --------------------------------------------------------------------------- | ------------------------ |
| 不使用 @babel/plugin-transform-runtime                                      | 36KB                     |
| 使用@babel/plugin-transform-runtime，并配置参数 corejs: 3。不会污染全局环境 | 37KB                     |
| 使用@babel/plugin-transform-runtime，不配置 corejs                          | 22KB                     |
