---
title: '[转]前端人员如何模拟慢网速环境'
author: chrislearn young
type: post
date: 2010-08-11T04:31:39+00:00
categories:
  - 其它

---
出于工作需要，有时候需要模拟用户的慢网速对产品做进一步测试&优化，目前有三个软件可以模拟慢网速：Fiddler,NetLimiter,Network Delay Simulator。应该还有更多好用的软件尚待发掘。

<!--more-->
Fiddler 免费软件。模拟网速功能比较单一（Rules &#8211;> Performance &#8211;> Simulate Modem speed），选项较少，Fiddler仅是减缓带宽并未引入包丢失（后面的Network Delay Simulator加入了包丢失模拟）。且因为<a href="http://kanrss.com/v/156071#http://www.chencheng.org/blog/2009/12/31/fiddler-problem/" target="_blank">浏览器并发连接数</a>问题，会造成(Http watch 或Firebug)测试结果的瀑布图不准。所以虽然有这个功能，咱们一般不用它。<a href="http://www.chrislearn.im/index.php/2010/08/11/use-fiddler-case/" target="_blank">fiddler的亮点在另一方面</a>

NetLimiter 共享软件，需要自己注册。准确的说是一款网络流量控制软件，通过它，你可以直接来控制每个程序对Internet的访问以及流量分配情况。这里有前人制作的图。

<img src="http://www.softbunny.net/upload/2009/2/NetLimiter_Pro.png" alt="" width="480" height="814" />

Network Delay Simulator  免费软件，<a href="http://www.akmalabs.com/netsim.php" target="_blank">下载地址</a> 。我正在使用的，三种之中功能最强大，监听Network Interface Card (NIC)和TCP/IP stack之间的网络流量，可以模拟延时、带宽甚至丢包率，更精确地模拟慢网速环境。设置也很简单方便：输入带宽，点击Save Flow即可，如果你要模拟丢包，填下丢包率便行。见图。
  
<img src="http://images.cnblogs.com/cnblogs_com/kaima/network_delay_simulator.jpg" border="0" alt="" width="593" height="476" />