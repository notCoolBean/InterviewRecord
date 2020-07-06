/*
 * @Author: Bean
 * @LastEditors: Bean
 * @Date: 2020-07-03 09:10:57
 * @LastEditTime: 2020-07-05 14:52:57
 * @Description: file content
 * @FilePath: /StudyNotes/Users/caoyong/Documents/github/InterviewRecord/JavaScript/手写call、apply、bind.js
 */
// myCall实现
var obj = {
  val: 123
}

function fn(a, b, c) {
  console.log(this.val, a, b , c);
  this.name = 'fn';
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

Function.prototype.myBind = function (context) {
  var self = this;
  context = context || window;
  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  var res = function () {
    context = this instanceof res ? this : context;
    
    context.fn = self;

    for (var j = 0; j < arguments.length; j++) {
      args.push(arguments[j]);
    }
    
    var result = eval(`context.fn(${args})`);

    delete context.fn;
    return result;
  }

  res.prototype = self.prototype;
  return res;
  
}

// let a = fn.call(obj, 1, 2, 3);
// let b = fn.myCall(obj, 1, 2, 3);
// let c = fn.apply(obj, [1, 2, 3]);
// let d = fn.myApply(obj, [1, 2, 3]);

let e = fn.bind(obj, 1, 2);
let f = fn.myBind(obj, 1, 2);
fn.prototype.age = 18;
// let g = new e(4);
// console.dir(g.age);

let h = new f(4);
console.dir(h.name);
// e(4);
// f(5);




