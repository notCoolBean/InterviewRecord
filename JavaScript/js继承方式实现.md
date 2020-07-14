# JS 继承方式

继承实际是对共性的属性与方法的接受，并加入了个性特有的属性和方法；其中Js的继承实际是为了将没有‘类’概念的Js的所有对象串联起来的一种实现，所以在Js中引入了一个Prototype的属性来存放需要共享的属性与方法；

  以下面函数为例来讲述如何实现Js继承
  ```javascript
    function Parent(age, name) {
      this.age = age;
      this.name = name;
      this.childrenList = [];
    }

    Parent.prototype.say = function() {
      console.log('我有', this.childrenList);
    }

    function Child(sex) {
      this.sex = sex;
    }
  ```

## 接下来是Js实现继承的几种方式

### 原型链继承

  ```javascript
    Child.prototype = new Parent('28', 'papa');

    let child = new Child('male');
    let child1 = new Child('female');

    child.childrenList.push(1);

    console.log(child1.childrenList); // [1] 其中childrenList为引用类型所以导致两个之类实例化之后共享数据所以互相影响
  ```

> 这种是以原型链的方式来实现继承，但是这种实现方式存在的缺点是，在包含有引用类型的数据时，会被所有的实例对象所共享，容易造成修改的混乱。还有就是在创建子类型(实例化)的时候不能向超类型传递参数。

### 构造函数继承

  ```javascript
    function Child(sex, age, name) {
      this.sex = sex;
      Parent.call(this, age, name); // 通过修改this的指向来实现继承Parent父类的属性或方法
    }

    let child = new Child('male', 28, 'papa');
    let child1 = new Child('female', 28, 'papa');

    child.say(); // child.say is not a function 无法继承超类的原型方法
  ```

> 这种方式是使用借用构造函数的方式，这种方式是通过在子类型的函数中调用超类型的构造函数来实现的，这一种方法解决了不能向超类型传递参数的缺点，但是它存在的一个问题就是无法实现函数原型方法的复用，并且超类型原型定义的属性或方法子类型(实例)也没有办法访问到。

### 组合继承（原型+构造）

  ```javascript
    function Child(sex, age, name) {
      this.sex = sex;
      Parent.call(this, age, name);
    }

    Child.prototype = new Parent(); // 手动修改子类的原型指向，来实现子类以及实例的原型继承
    Child.prototype.constructor = Child; // 修改了prototype之后顺便修改原型中的构造函数指向否则会指向Parent

    let child = new Child('male', 28, 'papa');

    child // 输出的实例以及实例的__proto__中会包含相同的属性
  ```

> 这种方式是组合继承，组合继承是将原型链和借用构造函数组合起来使用的一种方式。通过借用构造函数的方式来实现类型的属性的继承，通过将子类型的原型设置为超类型的实例来实现方法的继承。这种方式解决了上面的两种模式单独使用时的问题，但是由于我们是以超类型的实例来作为子类型的原型，所以调用了两次超类的构造函数，造成了子类型的原型中多了很多不必要的属性(实例跟原型中会存在相同的属性)。

### 组合继承的优化

> 由于以上的方法导致两次调用父类的构造函数所以这里在手动修改原型指向的时候将子类的原型直接指向父类的原型上就可以避免两次调用了，另外还避免了子类（实例）的__proto__中包含重复属性

  ```javascript
    function Child(sex, age, name) {
      this.sex = sex;
      Parent.call(this, age, name);
    }

    Child.prototype = Parent.prototype;
    //或 Child.prototype = Object.create(Parent.prototype); // 涉及到Object.create()的相关知识点；
    Child.prototype.constructor = Child;

    let child = new Child('male', 28, 'papa');

    child // 输出的实例以及实例的__proto__不再包含相同的属性
  ```
#### 原型式继承

  ```javascript
    let Parent = {
      age: age,
      name: name,
      childrenList: []
    }

    function object(prototype) {
      function F() {}

      F.prototype = prototype; // 直接手动修改原型指向要继承的父类对象

      return new F(); // 实例化的是欧没法传递初始化参数
    }

    let child = object(Parent);
  ```

> 这种方式是原型式继承，原型式继承的主要思路就是基于已有的对象来创建新的对象，实现的原理是，向函数中传入一个对象，然后返回一个以这个对象为原型的对象。这种继承的思路主要不是为了实现创造一种新的类型，只是对某个对象实现一种简单继承，ES5 中定义的 Object.create() 方法就是原型式继承的实现。缺点:就是无法传递初始化参数，另外属性会出现共享的问题，修改一个实例属性会影响其他实例的属性改变。

### 寄生式继承

  ```javascript
    function object(prototype) {
      function F() {}
      F.prototype = prototype;
      return new F();
    }

    function tool (origin) {
      let tem = object(origin);
      tem.say = function () {
        console.log('aaaaa');
      }
      return tem;
    }

    let child = tool(Parent);
  ```

> 这种方式是寄生式继承，寄生式继承的思路是创建一个用于封装继承过程的函数，通过传入一个对象，然后复制一个对象的副本，然后对对象进行扩展，最后返回这个对象。这个扩展的过程就可以理解是一种继承。这种继承的优点就是对一个简单对象实现继承，如果这个对象不是我们的自定义类型时。缺点是在增强对象之后没有办法实现函数的复用，另外也是存在属性共享的问题。

### 寄生组合式继承

  ```javascript
    function Child(sex) {
      this.sex = sex;
      Parent.call(this);
    }

    function object(prototype) {
      function F () {}
      F.prototype = prototype;
      return new F(); // 实例化的是欧没法传递初始化参数
    }

    function extendsFn(supType, subType) {
      let prototype = object(supType.prototype);
      prototype.constructor = subType;
      subType.prototype = prototype;
    }

    extendsFn(Parent, Child);

    let child = new Child();
  ```

> 这种方式是寄生式组合继承，组合继承的缺点就是使用超类型的实例做为子类型的原型，导致添加了不必要的原型属性。寄生式组合继承的方式是使用超类型的原型的副本来作为子类型的原型，这样就避免了创建不必要的属性。
