(function(graph){
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
			require('./src/index.js')
		})({"./src/index.js":{"dependencies":{"./hello.js":"./src/hello.js"},"code":"\"use strict\";\n\nvar _hello = require(\"./hello.js\");\n\ndocument.write('hello' + (0, _hello.say)('webpack')); // import test from \"./stack.js\";\n// import zy from \"./zy.js\";\n// Stack = require('./stack.js')\n//最小值\n// function MinStack(){\n// \tlet data_stack = new Stack.Stack()\n// \tlet min_stack = new Stack.Stack()\n// \tthis.push = function(){\n// \t\tdata_stack.push(item)\n// \t\tif(min_stack.isEmpty() || item < min_stack.top()){\n// \t\t\tmin_stack.push(item);\n// \t\t}else{\n// \t\t\tmin_stack.push(min_stack.top())\n// \t\t}\n// \t}\n// \tthis.pop = function(){\n// \t\tdata_stack.pop();\n// \t\tmin_stack.pop();\n// \t}\n// \tthis.min = function(){\n// \t\treturn min_stack.top();\n// \t}\n// }"},"./src/hello.js":{"dependencies":{"./zy.js":"./src/zy.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.say = say;\n\nvar _zy = require(\"./zy.js\");\n\nfunction say(name) {\n  return name + (0, _zy.add)(4, 6);\n}"},"./src/zy.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.add = add;\n\nfunction add(a, b) {\n  return a + b;\n}"}})