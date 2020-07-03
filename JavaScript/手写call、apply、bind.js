/*
 * @Author: Bean
 * @LastEditors: Please set LastEditors
 * @Date: 2020-07-03 09:10:57
 * @LastEditTime: 2020-07-03 10:10:43
 * @Description: call、apply、bind的模拟实现
 * @FilePath: /StudyNotes/Users/caoyong/Documents/github/InterviewRecord/JavaScript/手写call、apply、bind.js
 */ 

// myCall实现
var obj = {
  val: 0
}

function fn(a, b, c) {
  console.log(this.val, a, b , c);
  return this.val;
}

Function.prototype.myCall = function (context) {
  context = context || window;
  context.fn = this;
  
  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args.push(`arguments[${i}]`)
  }

  var result = eval(`context.fn(${args})`);
  
  delete context.fn;
  return result;
}

let a = fn.call(obj, 1, 2, 3);
let b = fn.myCall(obj, 1, 2, 3);

console.log(a, b);




