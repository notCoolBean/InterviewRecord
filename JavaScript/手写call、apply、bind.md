# 手写call、apply、bind

#### myCall实现

> 以下代码就是我们常见的call实现的改变this指向的常规用法

```javascript
var obj = {
  val: 0
}

function fn(a, b, c) {
  console.log(this.val, a, b , c);
}

fn.call(obj, 1, 2, 3); // 0 1 2 3
```
**注意：**
- call的调用改变了调用函数fn的this的指向（this -> obj）;
- fn函数的参数通过call传递过来并且执行了输出；

分析+解决：
  1. 函数在访问this.val的时候怎么调用到obj的val：
      - 首先函数必须跟val的this指向是一致的才可以：
        ```javascript
        var obj = {
          val: 0,
          fn: function() {
            console.log(this.val);
          }
        }
        ```
      - 基于以上思路实现第一步(也就是说需要调用myCall的时候将obj改造成以上形式就可以了，当调用完函数之后还需要将obj恢复到原来的样子)：
        ```javascript
        Function.prototype.myCall = function (context) {
          context.fn = this;
          context.fn();
          delete context.fn;
        }
        ```
  2. 第一步改造目标对象完成，那么结下来怎么实现参数传递呢？
      - 这里因为不确定参数的个数，所以这里采用函数的arguments来解决就可以了；
      - 获取到arguments的值之后进行处理,因为参数的个数不确定所以这里需要使用到参数的拼接；
        ```javascript
        Function.prototype.myCall = function (context) {
          context.fn = this;
          var args = [];
          for (var i = 1; i < arguments.length; i++) {
            args.push(`arguments[${i}]`)
          }
          
          eval(`context.fn(${args})`);
        }
        ```
  3. 当call的第一个参数传null或者是不传的时候其中context的指向是window，另外如果真对有返回值的函数的时候需要将函数执行的结果返回出来：
      - 针对null或者不传采取容错处理；
      - 返回值的情况直接采用return函数结果就可以了；
      ```javascript
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
      ```
以上为call的模拟实现；

#### myApply实现
