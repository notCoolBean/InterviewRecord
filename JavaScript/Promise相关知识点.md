# Promise相关知识点以及手写Promise

### Promise的基本用法

> Promise 是异步编程的一种解决方案，比传统的回调函数更加灵活，使用Promise编写的异步代码更加优雅，便于阅读，而且避免了以往的回调地狱；


特点：
  1. 对象的状态不受外界影响：
     - Pending（等待/进行中）
     - Fulfilled（已成功）
     - Rejected（已失败）
  2. 一旦状态改变不会继续再变：
     - Pending -> Fulfilled
     - Pending -> Rejected

用法以及常用API：
  ```javascript
    let a = new Promise((resolve, reject) => {
      if (/*满足条件修改Promise为Fulfilled状态*/) {
        resolve(res);
      } else { // 不满足条件修改状态为Rejected
        reject(err)
      }
    })

    // 其中then返回的也是一个Promise对象，所以Promise才可以实现链式调用
    a.then(res => {
      console.log(res); // promise状态变为Fulfilled时的成功回调
    }, err => {
      console.log(err); // promise状态变为Rejected时的失败回调
    })

    // Promise.all(); // 接收一个每一项为Promise的数组，所有的都完成之后会触发回调：
    let b = new Promise((resolve, reject) => {
      if (/*满足条件修改Promise为Fulfilled状态*/) {
        resolve(res);
      } else { // 不满足条件修改状态为Rejected
        reject(err)
      }
    })

    Promise.all([a, b]).then(res => {
      console.log(res); // 返回结果是一个数组，每一项按照输入的顺序返回处理结果
    }).catch(err => {
      console.log(err);
    })

    // Promise.race(); // 参数跟all一样，但是race只需要有一个执行完毕就可以，不会等待其他结果，返回率先执行完成的返回结果
  ```
### 手写Promise

以上了解了Promise的基本用法接下来我们自己来实现一下低配版本的promise；

1. 首先我们知道Promise有一个状态值，有成功以及失败的返回值，另外还接收一个参数，并且参数里有两个回调函数()，通过以上的信息我们可以得出来基本的promise结构：
    ```javascript
      class MyPromise {
        constructor(executor) {
          
          this.failRes = '';        // 失败之后存储失败的返回信息
          this.successRes = '';     // 成功之后存储成功的返回信息
          this.status = 'pending';  // 存储当前Promise实例的状态

          try {
            executor(this.resolve, this.reject); // 绑定实例的回调函数（成功/失败）
          } catch(err) {
            this.reject(err);
          }

        }

        // 成功的回调函数，修改当前实例状态以及成功返回信息
        resolve = (res) => {
          if (this.status === 'pending') {
            this.successRes = res;
            this.status = 'fulfilled';
          }
        }

        // 失败的回调函数，修改当前实例状态以及失败返回信息
        reject = (err) => {
          if (this.status === 'pending') {
            this.failRes = err;
            this.status = 'rejected';
          }
        }

      }
    ```
2. 接下来我们就来实现Promise的then操作，以及完善链式调用的实现：上面已经介绍了其实Promise的then返回的也是一个Promise对象，所以根据这个思路我们来写一下：
    ```javascript
      then(onFulfilled, onRejected) { // then 接收两个参数，一个是成功的回调一个是失败的回调
        let res = new MyPromise((resolve, reject) => { resolve(); }); // then的返回值，Promise对象，默认成功

        if (this.status === 'fulfilled') {
          onFulfilled.call(this, this.successRes); // 成功的处理回调，触发then的第一个回调参数
        } else if (this.status === 'rejected') {
          onRejected.call(this, this.failRes); // 失败的处理回调，触发then的第二个回调参数
        }
        
        return res; // 保证每次调用then之后可以继续链式添加then调用
      }
    ```
    以上基本模拟了promise的then的实现；
3. 还有一种特殊情况如果then中的函数执行返回值是一个Promise的话怎么办呢？如果then中的函数执行返回值是一个Promise的话，then的返回状态会跟执行函数中的返回值保持状态一致，稍作修改即可：
    ```javascript
      then(onFulfilled, onRejected) { // then 接收两个参数，一个是成功的回调一个是失败的回调
        let result;
        let res = new MyPromise((resolve, reject) => { resolve(); }); // then的返回值，Promise对象，默认成功

        if (this.status === 'fulfilled') {
          result = onFulfilled.call(this, this.successRes); // 成功的处理回调，触发then的第一个回调参数，返回一个MyPromise的实例
        } else if (this.status === 'rejected') {
          result = onRejected.call(this, this.failRes); // 失败的处理回调，触发then的第二个回调参数，返回一个MyPromise的实例
        }

        if (result && result instanceof MyPromise) { // 如果回调的返回值是MyPromise实例的话需要修改then的返回状态跟实例的状态一致
          res = result;
        }
        
        return res; // 保证每次调用then之后可以继续链式添加then调用
      }
    ```
    这样就可以了，需要判断以下当前的then回调是不是返回MyPromise实例来进行then的返回状态修改实现接下来的then链式调用即可；
  
