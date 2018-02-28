---
title: '[转]让Windows 7变无线WiFi基站或无线热点'
author: chrislearn young
type: post
date: 2010-10-28T12:24:48+00:00
categories:
  - 其它
tags:
  - 3G无线

---
微软在Win7中引入一个新的概念：虚拟无线网络，就是目前很多笔记本电脑在Win7下都会多一个Microsoft Virtual WiFi Miniport Adapter的无线网络连接，利用它可以让你的笔记本电脑充当无线路由的功能，把本机任何一个可以使用的连接(包括无线网络)转换成无线信号共享给别人 使用，也就是说变成一个无线基站或无线热点。

因为微软尚未开发完成，所以目前该功能被隐藏，不过还是可以通过两种方式配置，一种是命令行方式，另一种是通过第三方的软件来实现。

首先介绍一下命令行方式：

用管理员模式启动命令行提示符，输入
  
```
  
netsh wlan set hostednetwork mode=allow ssid=Hotspot key=passwordhere
  
```
  
该命令行配置无线基站，设置ssid为Hotspot，密码为passwordhere

然后通过
  
```
  
netsh wlan start hostednetwork
  
```
  
此命令启动基站功能

之后把本机上可以使用的网络共享给该虚拟无线连接就可以了

如果是通过第三方软件来实现也很简单，下载一个名叫Connectify的小工具(官网http://www.connectify.me)，然后安装运行，配置相应的ssid和密码后启动它就可以了。