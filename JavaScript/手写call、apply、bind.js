/*
 * @Author: Bean
 * @LastEditors: Bean
 * @Date: 2020-07-03 09:10:57
 * @LastEditTime: 2020-07-04 19:35:01
 * @Description: file content
 * @FilePath: /StudyNotes/Users/caoyong/Documents/github/InterviewRecord/JavaScript/手写call、apply、bind.js
 */
// myCall实现
var obj = {
  val: 123
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

Function.prototype.myApply = function (context, args) {
  context = context || window;
  context.fn = this;
  
  for (var i = 0; i < args; i++) {
    args.push(`args[${i}]`)
  }

  var result = eval(`context.fn(${args})`);
  
  delete context.fn;
  return result;
}

let a = fn.call(obj, 1, 2, 3);
let b = fn.myCall(obj, 1, 2, 3);
let c = fn.apply(obj, [1, 2, 3]);
let d = fn.myApply(obj, [1, 2, 3]);

console.log(a, b, c, d);




