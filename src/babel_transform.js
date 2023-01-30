import fs from 'fs'
import path from 'path'
import * as babel from '@babel/core'
// import { parse } from '@babel/parser'
// import ast from './ast.js'

const basePath = process.cwd()
fs.readFile(path.resolve(basePath, './src/index.js'), 'utf-8', (err, data) => {
  if (!err) {
    // const ast = parse(data)
    babel.transformAsync(data, {
        // 转换可选链和箭头函数
        plugins: ['@babel/plugin-proposal-optional-chaining', "@babel/plugin-transform-arrow-functions"],
      })
      .then((res) => {
        console.log('最终转换结果', res)
      }).catch(err => {
        console.log('对应的异常结果=>', err)
      })
  }
})
