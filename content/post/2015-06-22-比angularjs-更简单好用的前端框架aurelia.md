---
title: 比AngularJS 更简单好用的前端框架Aurelia
author: chrislearn young
type: post
date: 2015-06-22T01:18:25+00:00
categories:
  - JavaScript
tags:
  - angular
  - aurelia

---
AugularJS我用得并不多，但是，我的感觉是学习曲线挺陡峭的，需要理解他的那一堆的概念。在试图解决一个问题时引入了太多更复杂的东西，有点让人怀疑这样做是否值得。另外，Angular自己不包含模块加载的功能，需要依赖其他的库，比如requirejs。不过这样一来，angular的代码就更不清晰了，一层套一层，到处都是花括号，哪边要写错了，就头大了。

<!--more-->
相比AngularJS，这个由前AngularJS开发团队成员开发的新的前端框架[Aurelia][1]就显示出很多优势：
  
1. 使用Typescript或者ES6/ES7的语法，这样让代码的可读性简洁度都有明显的提高；
  
2. 通过[SystemJS][2]等库提供默认的模块加载支持，比起requirejs等，这种加载模式更简单；
  
3. 省去了AngularJS的很多概念，很容易上手，一切代码都显得那么得优雅；
  
4. 对其他JS库的支持非常好， 尤其是很多nodejs下的库也可以拿过来用。

当然也有一些劣势：
  
1. 社区还没有AngularJS的大；
  
2. 由于使用了很多html5新的特性，导致对浏览器的兼容性支持较差。

Aurelia官网：<http://aurelia.io/>

 [1]: http://aurelia.io/
 [2]: https://github.com/systemjs/systemjs