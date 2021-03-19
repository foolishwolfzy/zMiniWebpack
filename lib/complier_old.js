const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser')
const {transformFromAst} = require('@babel/core')
const traverse = require('@babel/traverse').default
// import { getAst,getCode,getDependcies } from "./parser.js";
module.exports = class Complier{
	constructor(options){
		// console.log(options)
		this.entry = options.entry
		this.output = options.output
	}
	run(){
		const info = this.build(this.entry)
		console.log('info--',info);
	}
	build(entryFile){
		// console.log(entryFile)
		let content = fs.readFileSync(entryFile, 'utf8')
		// console.log(content)
		//拿到抽象语法树
		const ast =parser.parse(content,{
			sourceType:'module'
		})
		//获取依赖
		// const denpendcies = []
		const denpendcies = {}
		traverse(ast,{
			ImportDeclaration({node}){
				// console.log(node)
				// denpendcies.push(node.source.value)// 相对路径
				// console.log(denpendcies)
				const dirname = path.dirname(entryFile)
				// console.log(dirname)
				const newPath = './' +path.join(dirname,node.source.value)//‘./’这种写法不符合windows下的
				console.log(newPath)
				denpendcies[node.source.value] = newPath
			}
		})
		// console.log(ast)
		// console.log(ast.program)
		// console.log(denpendcies)
		const {code} = transformFromAst(ast,null,{
			presets:["@babel/preset-env"]
		})
		// console.log(code)
		
	}
}