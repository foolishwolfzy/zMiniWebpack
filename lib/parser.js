const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser')
const {transformFromAst} = require('@babel/core')
const traverse = require('@babel/traverse').default
module.exports = {
	getAst: fileName=>{
		let content = fs.readFileSync(fileName, 'utf8')
		// console.log(content)
		//拿到抽象语法树
		const ast =parser.parse(content,{
			sourceType:'module'
		})
		return ast
	},
	getDependcies:(ast,fileName) =>{
		const dependcies = {}
		traverse(ast,{
			ImportDeclaration({node}){
				const dirname = path.dirname(fileName)
				const newPath = './' +path.join(dirname,node.source.value)//‘./’这种写法不符合windows下的
				// console.log(newPath)
				dependcies[node.source.value] = newPath
			}
		})
		return dependcies
	},
	getCode:ast=>{
		const {code} = transformFromAst(ast,null,{
			presets:["@babel/preset-env"]
		})
		return code
	}
}