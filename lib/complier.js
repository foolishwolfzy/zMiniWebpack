const fs = require('fs');
const path = require('path');
// const parser = require('@babel/parser')
// const {transformFromAst} = require('@babel/core')
// const traverse = require('@babel/traverse').default
const { getAst,getCode,getDependcies } =require( "./parser.js");
module.exports = class Complier{
	constructor(options){
		// console.log(options)
		this.entry = options.entry
		this.output = options.output
		this.modules = []
	}
	run(){
		const info = this.build(this.entry)
		this.modules.push(info)
		// console.log('info--',info);
		// 递归获取依赖，得到依赖路径
		for (let i = 0; i < this.modules.length; i++) {
      const item = this.modules[i];
      const { dependencies } = item;
      if (dependencies) {
        for (let j in dependencies) {
          this.modules.push(this.build(dependencies[j]));
        }
      }
		}
		// console.log(this.modules)
		//转换数据结构
    const obj = {};
    this.modules.forEach(item => {
			// console.log(item)
      obj[item.fileName] = {
        dependencies: item.dependencies,
        code: item.code
      };
		});
		// console.log(obj);
		this.file(obj)
	}
	build(fileName){
		const ast = getAst(fileName);
		const dependencies = getDependcies(ast,fileName)
		const code = getCode(ast)
		return{
			fileName,
			dependencies,
			code
		}
	}
	// 创建自运行函数，处理require,module,exports
	// 生成main.js = > dist/main.js
	file(code){
		console.log(this.entry)
		console.log(this.output)
		const filePath = path.join(this.output.path,this.output.filename)
		const newCode = JSON.stringify(code)
		// console.log(`%c relativePath---${relativePath}`,'color:#409EFF')
		// console.log(`%c AbsolutePath---${graph[module].dependencies[relativePath]}`,'color:#409EFF')
		const bundle=`(function(graph){
			function require(module){
				function localRequire(relativePath){
					return require(graph[module].dependencies[relativePath])
				}
				var exports={};
				(function(require,exports,code){
					//这里的require（即localRequire）为文件中的require(xx.js)或require(xx/xx.js)等进行递归，得到绝对路径后执行外层的require
					eval(code);
				})(localRequire,exports,graph[module].code)
				return exports;
			}
			require('${this.entry}')
		})(${newCode})`;
		// console.log(`%c exports---${JSON.stringify(exports)}`,'color:#E6A23C')
		// console.log(`%c code---${code}`,'color:#67C23A')
		fs.writeFileSync(filePath,bundle,'utf-8')
	}
}