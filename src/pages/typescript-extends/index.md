---
title: TypeScript实现继承的方式
date: "2018-03-16T07:12:11.034Z"
---

## 先来明确几个问题

Q1: 什么是继承  
A1: 继承（英语：inheritance）是面向对象软件技术当中的一个概念。如果一个类别A“继承自”另一个类别B，就把这个A称为“B的子类别”，而把B称为“A的父类别”也可以称“B是A的超类”。继承可以使得子类别具有父类别的各种属性和方法，而不需要再次编写相同的代码。在令子类别继承父类别的同时，可以重新定义某些属性，并重写某些方法，即覆盖父类别的原有属性和方法，使其获得与父类别不同的功能。另外，为子类别追加新的属性和方法也是常见的做法。[form wiki](https://zh.wikipedia.org/wiki/%E7%BB%A7%E6%89%BF_(%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6))

Q2: TypeScript是怎么来实现的类继承呢?  
A2: 寄生组合继承

## 分析

- 子类要有父类的属性方法(静态，实例，原型链)，还可以重写父类的属性和方法
- 寄生组合继承

## TypeScript的实现

源文件 extend.ts

```typescript
class Animal {
  static type = "An";
  constructor(protected name = "Animal") {}
}
class Cat extends Animal {
  constructor(name?: string) {
    super(name);
  }
  sleep() {
    console.log("sleep");
  }
}
```

 编译出的文件 extend.js

```typescript
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = /** @class */ (function () {
    function Animal(name) {
        if (name === void 0) { name = "Animal"; }
        this.name = name;
    }
    Animal.type = "An";
    return Animal;
}());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(name) {
        return _super.call(this, name) || this;
    }
    Cat.prototype.sleep = function () {
        console.log("sleep");
    };
    return Cat;
}(Animal));
```

## 参考文章

- [Javascript面向对象编程（二）：构造函数的继承 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html)
- [JS实现继承的几种方式 - 幻天芒](https://www.cnblogs.com/humin/p/4556820.html)