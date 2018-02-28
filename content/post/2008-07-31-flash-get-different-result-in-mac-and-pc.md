---
title: 诡异，Flash在Mac和PC的不一样的执行结果
author: chrislearn young
type: post
date: 2008-07-31T06:59:10+00:00
categories:
  - ActionScript
  - Flash
tags:
  - ActionScript
  - Flash
  - 游戏

---
　　很怪异的一个现象，还是我当年做的第一个Flash的游戏（就帖子下面这个Flash)，发现他竟然在Mac上运行不好，没有报错，也没死掉，只是小动物怎么也跳不上去，但是在PC上运行都是正常的。搞得我很郁闷，怎么同一个程序在只是不同操作系统的同一个版本的Flash Player上还会出这种诡异的事。
  
　　今天早上拿来一个MacBook，开始调试，倒看看问题出在哪了，到处都加的“trace”，到最后发现是一个“if”语句那边出了问题，在看这个判断，里面的条件是一个比较大小的表达式，是底图的“y”坐标和一个“Number”型的值得比较，问题就是出在这了，PC上面认为两个值相差很小但是还是不等的，不过到了Mac上，两个值竟然完全一样，有点晕，程序是好久前的了，也没再细细看到底哪个算的是对的了。只是把这个也不知道是我程序的Bug（或许是Adobe Flash Player的Bug）改了过来。嘿嘿，下次再遇到这种情况，就不会再觉得太诡异了。一句话，Flash里什么样的错误都可能出现。

<p style="text-align: center;">
</p>