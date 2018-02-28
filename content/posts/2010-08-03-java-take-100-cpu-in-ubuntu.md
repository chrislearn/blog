---
title: Ubuntu中Java进程占CPU100%解决方法
author: chrislearn young
type: post
date: 2010-08-03T03:52:10+00:00
categories:
  - Linux
tags:
  - Java
  - Linux
  - OpenJDK
  - Ubuntu

---
Ubuntu中Java进程占CPU100%解决方法：

在命令行下运行这两个命令，用Sun的java代替默认的OpenJDK。

<!--more-->
```
sudo apt-get install sun-java6-bin
  
sudo update-java-alternatives &#8211;set java-6-sun
```