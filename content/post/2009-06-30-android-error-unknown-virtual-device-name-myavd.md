---
title: "Android ERROR: unknown virtual device name: 'myavd'"
author: chrislearn young
type: post
date: 2009-06-30T01:28:22+00:00
categories:
  - Android
tags:
  - Android
  - Eclipse

---
只是想在Eclipse中写一个Hello World程序，没想按照Google Android Dev Guide的说明做，最后出现了

ERROR: unknown virtual device name: &#8216;myavd&#8217;

这样的错误，整了半天终于找到解决方法。我用的是Vista，而我又喜欢将所有可以设置的用户文件的位置改至D盘下。这样在用Eclipse或者从命令行创建Android Emulator时，相应的文件是被放置到 “D:\Users\<username>\.android“ 下面了，而程序运行时仍然从 “C:\Users\<username>\.android“ 下查找相应的配置文件，从而导致上面的错误，把 “D:\Users\<username>\.android“ 下的文件复制到 “C:\Users\<username>\.android“ 下面即可解决这个问题。