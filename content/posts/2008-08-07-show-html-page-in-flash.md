---
title: Flash中显示HTML页面
author: chrislearn young
type: post
date: 2008-08-07T13:05:09+00:00


categories:
  - ActionScript
  - Flash
tags:
  - ActionScript
  - Flash

---
　　每次遇到要在Flash中显示HTML内容，都是噩梦，Flash里的TextField是可以显示HTML内容的，但是，功能确实很差劲，尤其是再遇上对排版要求比较高的时候，TextField是根本做不了的了。有一个开源项目<a href="http://code.google.com/p/htmlwrapper/" target="_blank">htmlwrapper</a>倒是可以利用一下，htmlwrapper可以让当前的HTML的页面以Flash的形式显示。<a href="http://motionandcolor.com/wrapper/" target="_blank">http://motionandcolor.com/wrapper/</a>这个是它的一个示例，它将一个WordPress的页面用Flash的方式显示出来，你要是查看它的源代码就会发现，所有的内容其实都是写在页面里，而不是Flash里的。但是，我个人觉得把一个本来在浏览器里正常显示的HTML页面放到Flash里显示没什么好处。
  
<!--more-->
　不过嘛，如果用这个项目来把我们要显示的某个HTML加载到我们的Flash里，倒是也不错。只是CSS样式只有部分支持，而且这个项目还有不少的Bug。但是在没有其他解决方法的情况下也只能用这个，总比使用TextField强。