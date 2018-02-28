---
title: Photoshop 中的生成器
author: chrislearn young
type: post
date: 2015-06-21T10:39:48+00:00
categories:
  - Photoshop
  - 软件使用
tags:
  - Photoshop

---
现在的Photoshop中多了一个生成器的功能，自带的Image Assets可以让图片自动导成，只要PS文件里的图层按一定的规则命名即可，导出的速度也是出奇的快，这一点还挺怪异，按道理，最终它还是以jsx的方式来执行，但是用jsx来导成图片，那是出奇的慢，哪怕只是遍历一下所有的图层，如果PS文件大，图层比较多的话，也能导致软件卡着好半天。

<!--more-->
不过有了这玩意，以前老师教的什么切图的方法就再也不需要了，做网页切图变得超级简单。不过自带的Image Assets是没有办法生成图片位置等信息，其实如果能把图片位置信息导出成CSS文件，那么，PS文件做好的时候，网页也就基本OK了。好在Image Assets这玩意是开源的，你可以依据它修改一个能导成CSS文件或者JSON文件的生成器。现在的Adobe系的插件开发基本上都改成基于Nodejs的技术了，比起之前的使用SWF做插件，确实是好了很多。