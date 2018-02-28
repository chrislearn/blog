---
title: 可以上网但是不可以QQ的解决办法
author: chrislearn young
type: post
date: 2010-10-29T02:29:56+00:00
categories:
  - 其它

---
今天早上一来, 就发现skype没办法登录了, 不过平时习惯于使用firefox, 发现网页还是能正常看的, 但是使用IE时发现IE也是上不了网的, QQ自然也是登录不了的, 总体的症状总结是:
  
firefox可以浏览网页, 但是不可以下载;
  
IE无法上网;
  
QQ, Skype等软件不可以上;
  
FTP无法登录;
  
网络连接正常;
  
ping可以ping通.

找了半天终于在国外一个网站上找到了解决方法, 命令行下输入:
  
[code]netsh winsock reset catalog
  
[/code]
  
然后重起电脑, 就一切正常了. 英文原文的解释是:

This issue may occur if the Winsock registry keys are damaged or corrupted. Try this: Open the command prompt and type &#8211;
  
[code]
  
netsh winsock reset catalog
  
[/code]
  
This command resets the Winsock catalog to the default configuration.
  
This can be useful if a malformed LSP is installed that results in loss of network connectivity.
  
While use of this command can restore network connectivity, it should be used with care because any previously-installed LSPs will need to be re-installed.

出现这个问题, 应该是昨天晚上使用一个软件让我的电脑变成无线基站的原因, 见我前一篇博客:<a href="http://www.chrislearn.im/index.php/2010/10/28/turn-your-windows-7-laptop-into-wifi-hostspot/" target="_self">让Windows 7变无线WiFi基站或无线热点</a>.