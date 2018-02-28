---
title: go语言中string、int、int64互相转换
author: chrislearn young
type: post
date: 2015-09-19T11:32:55+00:00
categories:
  - GOLANG
  - 程序开发
tags:
  - GOLANG

---

GO语言里面的函数名称的命名都挺。。。那个。。。让人难以理解。。。以至于很简单的事情却不知道如何下手。。。

<!--more-->
转载自： http://www.marswj.com/post/53/Go-language-string-int-Int64-conversion

    #string到int
    int,err:=strconv.Atoi(string)
    #string到int64
    int64, err := strconv.ParseInt(string, 10, 64)
    #int到string
    string:=strconv.Itoa(int)
    #int64到string
    string:=strconv.FormatInt(int64,10)