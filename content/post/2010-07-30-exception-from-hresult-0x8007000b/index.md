---
title: 'Exception from HRESULT: 0x8007000B 异常的解决方法'
author: chrislearn young
type: post
date: 2010-07-30T09:26:06+00:00
categories:
  - Asp.net
tags:
  - Asp.net
  - IIS

---
今天在Asp.net里调用非托管的.dll文件时，出现“
  
_An attempt was made to load a program with an incorrect format. (Exception from HRESULT: 0x8007000B)_”这样的错误。

![iis_error_0x8007000b.png](iis_error_0x8007000b.png)

解决方法：

这是由于我使用的操作系统是Windows 7 64位的，而.dll确是32位的，于是出现了这个错误。只需将网站的连接池的设置改成支持32位程序运行就可以解决问题。

![iis_pool_enable_32.png](iis_pool_enable_32.png)