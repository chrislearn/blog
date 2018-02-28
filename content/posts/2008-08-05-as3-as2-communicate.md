---
title: 实现AS3（Flash9）与AS2（Flash8）的相互通信
author: chrislearn young
date: 2008-08-05T11:22:37+00:00
categories:
  - ActionScript
  - Flash
tags:
  - ActionScript
  - Flash

---
　　AS3与AS2使用了不同的ActionScript 虚拟机（ActionScript Virtual Machine （AVM）），两者相互通信还是比较困难的，要是你在一个现有的Flash 9版本的一个SWF里加载一个Flash 8版本的SWF是可以的，但是，你直接调用里面的方法是不被允许的，要是你trace一下加载进来的内容，你会发现它的类型是AVM1Movie，这个类型的文档里有详细解释：

<!--more-->
　　AVM1Movie 是表示使用 ActionScript 1.0 或 2.0 的 AVM1 影片剪辑的简单类。 （AVM1 是用于运行 ActionScript 1.0 和 2.0 的 ActionScript 虚拟机。AVM2 是用于运行 ActionScript 3.0 的 ActionScript 虚拟机。） 当 Loader 对象加载 Flash Player 8 或更低版本的 SWF 文件时，会创建 AVM1Movie 对象。 AVM1Movie 对象可以使用继承自 DisplayObject 类的方法和属性（如 `x`、`y`、`width` 等）。 但是，不允许 AVM1Movie 对象和 AVM2 对象之间进行互操作（如调用方法或使用参数）。

　　AVM2 SWF 文件加载 AVM1 SWF 文件具有几个限制：

  * 加载的 AVM1Movie 对象将作为 AVM1 SWF 文件和它加载的所有 AVM1 SWF 文件的 psuedo-root 对象操作（如同将 ActionScript 1.0 `lockroot` 属性设置为 `true`）。 AVM1 影片始终位于任何子级中任何 ActionScript 1.0 或 2.0 代码执行的顶部。 除非在加载的 AVM1 SWF 文件中设置 `lockroot` 属性，否则加载的子级的 `_root` 属性通常均为该 AVM1 SWF 文件。
  * AVM1 内容无法将文件加载到各级别。 例如，它无法通过调用 `loadMovieNum("url", levelNum)` 来加载文件。
  * 由 AVM2 SWF 文件加载的 AVM1 SWF 文件无法将其它 SWF 文件加载到 `this`。 也就是说，它无法向其自身加载其它 SWF 文件。 但是，由该 SWF 文件加载的子 Sprite 对象、MovieClip 对象或其它 AVM1 SWF 文件可以加载到 `this`。

　　不过最近在网上还是发现了两个东东可以实现两者的相互通信和方法调用，一个是
  
<a href="http://www.gskinner.com/blog/archives/2007/07/swfbridge_easie.html" target="_blank">SWFBridge: Easier AS3 to AS2 Communication</a>，另一个是<a href="http://www.flashextensions.com/products/flashinterface.php" target="_blank">FlashInterFace</a>。两个网站上都有不错的事例，要是确实有这个需求的倒是可以看一下，不过Flash 8毕竟要成历史了。