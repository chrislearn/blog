---
title: MovieClip.addFrameScript又一个文档里面没写方法
author: chrislearn young
date: 2008-07-26T02:28:47+00:00
categories:
  - ActionScript
  - Flash
tags:
  - ActionScript
  - Flash

---
找了一下flash的帮助文档，就是没找到这个方法，不过你确实是可以调用这个方法的。比如：
  
<!--more-->
{{<highlight actionscript>}}
var mc = new MovieClip();
mc.addFrameScript(1, function(){});
{{</highlight>}}
  
在一个fla的时间轴上增加这个代码测试，嘿嘿，竟然没错，说明确实是有这个方法的，那他的作用是做什么的呢？其实从他的名字一眼就可以看出，就是在MovieClip的相应的帧上添加代码，这个你直接在时间轴上添加代码是一个样的，举个例子来说。mc.addFrameScript(0, fun); 这样的代码的意思就是在mc这个MovieClip的第一帧上添加fun这个名字的方法。这里的0就是指我们在mc时间轴上的第一帧，这个下标是从0开始的。

有了这个方法就可以动态往时间轴上添加代码了。<http://www.gskinner.com/blog/archives/2007/11/replace_actions.html> 这里有一个开源的类库，可以用来实现向某一帧上添加代码，其实就是调用了addFrameScript方法。