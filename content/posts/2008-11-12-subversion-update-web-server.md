---
title: SVN配置自动更新WEB服务器
author: chrislearn young
type: post
date: 2008-11-12T08:48:21+00:00


categories:
  - 程序开发
tags:
  - Subversion
  - SVN

---
开发中经常要在更新SVN的同时要更新WEB服务器。可以用过Subversion的钩子(Hook)来实现。

<!--more-->
以下是Windows操作系统下的配置：

在SVN库的hooks目录下面新建post-commit.bat文件，用记事本打开，然后写入如下的代码：

```
@echo off

SET REPOS=%1
SET REV=%2

SET DIR=%REPOS%/hooks
SET PATH=%PATH%;

SET WORKING_COPY=D:\Websites\Latisse
svn update %WORKING_COPY% --username user --password pwd
```

此处的D:\Websites\Latisse即是WEB网站的目录（当然得先建好这个目录，并且从svn服务器上签出相应的项目）。

这样在用户提交完后，便会自动更新到WEB服务器上。

需要注意到问题是：

1.不要在WEB网站文件夹下作修改或其它操作，防止出现文件夹被锁。无法更新。

2.在这里我明确写明了用户名（user)，密码(pwd)。在我设置时发现，如果没有设置的话会出现错误，在直接运行这个bat文件时是能正常执行的，但是，在Subversion提交后却不能正常运行。并且可以看到服务器进程中会出现cmd,svn两个进程，并且不会自己结束，而用户在提交内容到服务器后，会出现客户端无法正常返回的问题。

3.如果运行不能正常，可以通过下面的方法看到出错信息：

将刚才的post-commit.bat改名为post-commit-run.bat，然后再建一个post-commit.bat的文件，里面写入如下的代码：

call %~dp0post-commit-run.bat %* > %1/hooks/post-commit.log 2>&1

这样运行结果就会被写入到post-commit.log文件中，如果出错，也可以找到出错的原因。