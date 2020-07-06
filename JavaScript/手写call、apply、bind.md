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

分析 + 实现：
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

基于上面call的模拟实现apply的实现就显得轻而易举了

分析 + 实现：
  1. call跟apply的不同之处在哪？两者的传递参数的方式不同，apply采用的传参方式是数组，在这里针对call稍作修改即可：
      ```javascript
      Function.prototype.myApply = function (context， args) {
        context = context || window;
        context.fn = this;

        var result;
        if (args) {
          for (var i = 0; i < arguments.length; i++) {
            args.push(`arguments[${i}]`)
          }
          result = eval(`context.fn(${args})`);
        } else {
          result = context.fn();
        }

        delete context.fn;
        return result;
      }
      ```
    当然这里需要对args做一下容错处理；

#### myBind实现

分析 + 实现：
  1. 首先bind的传参方式跟call一样，所以这里可以借鉴call的实现来处理这里的传递参数；
  2. 另外bind返回的是一个Function来作为调用结果，所以这里需要修改返回值情况；
    结合1、2分析实现如下：
      ```javascript
      Function.prototype.myBind = function (context) {
        var self = this;
        context = context || window;

        var args = [];
        for (var i = 1; i < arguments.length; i++) {
          args.push(`arguments[${i}]`)
        }

        return function () {
          context.fn = self;

          var result = eval(`context.fn(${args})`);

          delete context.fn;
          return result;
        }
      }
      ```
  3. 以上版本基本完成了bind的基本要求，但是bind还有另外一个特点：
      > 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。
      bind的输出例子：
      ```javascript
      var obj = {
        val: 123
      }

      function fn(a, b, c) {
        this.name = 'fn';
        console.log(this.val);
        console.log(a);
        console.log(b);
        console.log(c);
        return this.val;
      }

      var a = fn.bind(obj, 1, 2);

      fn.prototype.age = 18;

      var newObj = new a(3);
      // undefined
      // 1
      // 2
      // 3
      newObj.name; // 'fn'
      newObj.age; // 18
      ```
      其中调用this的val时输出的时undefined说明这里已经忽略掉了bind中传入的this指向对象，另外newObj还继承了fn的原型属性，所以这里实现的话需要针对返回函数的原型进行调整才可以实现bind的new属性特点：
      ```javascript
      Function.prototype.myBind = function (context) {
        var self = this;
        context = context || window;

        var args = [];
        for (var i = 1; i < arguments.length; i++) {
          args.push(arguments[i])
        }

        var resFn = function () {
          context = this instanceof resFn ? this : context;
          // 这里是关键点：判断当前的调用是不是采用的new操作符进行的创建对象操作，然后如果是的话这里的this指向就不是myBind传入的this指向对象了需要修改this为调用new操作符的对象才可以；
          context.fn = self;
          // 合并两次传递的参数列表
          for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i])
          }
          
          var result = eval(`context.fn(${args})`);
          delete context.fn;
          return result;
        }

        function emptyFn () {}

        emptyFn.prototype = this.prototype;
        // 这里改变原型指向是为了实现返回函数的继承属性；
        resFn.prototype = new emptyFn;
        return resFn;
      }
      ```
以上为bind的模拟实现
      
