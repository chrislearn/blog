---
title: 更新Subversion时自动更新项目相关网站
author: chrislearn young
type: post
date: -001-11-30T00:00:00+00:00
draft: true
categories:
  - 程序开发

---
在做Asp.net项目时，使用Subversion进行版本管理，web application发布版本跟开发时是不是很一样的，要把里面的.cs等文件删除，总不能把正在开发的文件夹打包给客户，就算不要删除.cs文件，svn管理下的文件夹下也会有很多的.svn文件夹，而且个头不小，打进去可不好。另一个更实际的需求就是，在svn服务器下还有一个网站，需要实现了svn服务器下的版本跟web服务器下的版本同步。

web application发布可以通过robocopy命令来做，直接将命令写在一个.dat文件中，比如:build.bat。然后在里面也是类似下面的代码：

```
@echo off

echo &#8211; Copying Web Files &#8230;
  
robocopy WebSite Release /e /xd .svn App_Data obj /xf \*.cs \*.config \*.user \*.csproj \*.mdf \*.ldf \*.bak \*.cd
```