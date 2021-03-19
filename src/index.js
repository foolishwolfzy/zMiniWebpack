import { say } from "./hello.js";

document.write('hello' + say('webpack'))

// import test from "./stack.js";

// import zy from "./zy.js";
Stack = require('./stack.js')
//最小值
function MinStack(){
	let data_stack = new Stack.Stack()
	let min_stack = new Stack.Stack()

	this.push = function(){
		data_stack.push(item)
		if(min_stack.isEmpty() || item < min_stack.top()){
			min_stack.push(item);
		}else{
			min_stack.push(min_stack.top())
		}
	}
	this.pop = function(){
		data_stack.pop();
		min_stack.pop();
	}
	this.min = function(){
		return min_stack.top();
	}
}