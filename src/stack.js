function Stack(){
	var items = [];//使用数组存储数据
	//从栈顶添加元素，压栈
	this.push = function(item) {
		items.push(item)
	}
	// 弹出栈顶元素
	this.pop = function(){
		return items.pop();
	}
	// 返回栈顶元素
	this.top = function(){
		return items[items.length - 1]
	}
	// 判断栈是否为空
	this.isEmpty = function(){
		return items.length == 0
	}
	// 返回栈的大小
	this.size = function(){
		return items.length
	}
	// 清空栈
	this.clear = function(){
		items = []
	}

};
// 判断字符串里的括号是否合法
function is_leagl_brackets(string) {
	var stack = new Stack();
	for (let i = 0; i < string.length; i++) {
		const item = string[i];
		if(item == '('){
			stack.push(item)
		}else if(item == ')'){
			if(stack.isEmpty()){
				return false;
			}else{
				stack.pop();
			}
		}
	}
	return stack.isEmpty();
}

console.log('stack---test');
console.log(is_leagl_brackets('sdf(ds(ew(we)rw)rwqq)qwewe'))
console.log(is_leagl_brackets('()()sd()(sd()fw))('))

// 中缀表达式
// 1 + 2
// 2 - 4 - 6
// 后缀表达式
// 1 2 +
// 2 4 6 - -
// 计算机都是用后缀表达式来计算的

// ["4","13","5","/","+"]  => (4 + (13/5)) = 6
// ["4","2","+"] 
// ["6"]
// 算法
// 4 入栈
// 13 入栈
// 5 入栈
// 遇到了 / 连续两次弹出栈顶元素 a b b/a=c c入栈
// 遇到了 + 连续两次弹出栈顶元素 e f e + f = d d入栈
// 计算后缀表达式
function calc_exp(exp) {
	var stack = new Stack();
	for (let i = 0; i < exp.length; i++) {
		const item = exp[i];
		if(["+","-","*","/"].indexOf(item)>=0){
			console.log('item---',item);
			var value_1 = stack.pop();
			var value_2 = stack.pop();
			var exp_str = value_2 + item + value_1;
			console.log('value1--',value_1);
			console.log('value2--',value_2);
			console.log('exp_str---',exp_str);
			console.log('stack--',stack)
			// 计算并取整
			var res = parseInt(eval(exp_str))
			// 计算结果压入栈中
			stack.push(res.toString())
		}else{
			stack.push(item)
		}
	}
	return stack.pop()
}
console.log('res----',calc_exp(["4","13","5","/","+"]));

module.exports.Stack = Stack