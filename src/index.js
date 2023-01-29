import fs from 'fs'
import path from 'path'
import * as babel from '@babel/core'
import { parse } from '@babel/parser'
// import ast from './ast.js'
const basePath = process.cwd()
fs.readFile(path.resolve(basePath, './src/ast.js'), 'utf-8', (err, data) => {
    
  if (!err) {
    const ast = parse(data)
    const code = babel.transformFromAstSync(ast, data, {
      // 支持可选链
    //   plugins: ['@babel/plugin-proposal-optional-chaining', "@babel/plugin-transform-arrow-functions"],
      babelrc: true,
    })
    console.log(code)
  }
  
})

// console.log(ast);

// console.log('生成对应的code', code)

// const name = 123

// const pr = Promise.resolve().then(res => res)

// ;[1, 2, 3, 4, 5].copyWithin(0, 3)
