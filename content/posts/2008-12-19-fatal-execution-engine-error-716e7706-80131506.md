---
title: Fatal Execution Engine Error (716E7706) (80131506)
author: chrislearn young
type: post
date: 2008-12-19T11:44:01+00:00

categories:
  - Asp.net
  - 'CSharp'
tags:
  - Asp.net
  - SVN
  - VS

---
今天在用VS做一个ASP.Net项目时，也不知道做了什么操作，只要对着WEB APP的项目点击右键，整个VS就崩溃了，什么出错提示也没有，到Windows日志->应用程序里看到了这个错误：

<!--more-->
.NET Runtime version 2.0.50727.3053 &#8211; Fatal Execution Engine Error (716E7706) (80131506)

网上找了一下，也没找到完全一样的错误解释。只能自己解决了，打开Open Visual Studio 2008 Command Prompt这个命令行窗口，输入&#8221;devenv /ResetSettings&#8221;，VS重新打开，嘿嘿，一切正常了，但是不能保证不旧病复发，果然只点了两下，又死了，而且后来更严重，打开项目就死。猜测有可能是最近安装的Svn的插件[AnkhSVN][1]引起的，卸掉再说。耶！这下完全正常了。

 [1]: http://ankhsvn.open.collab.net/