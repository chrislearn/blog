---
title: Flash远程调试
author: chrislearn young
type: post
date: 2008-08-05T11:49:43+00:00
categories:
  - ActionScript
  - Flash
tags:
  - ActionScript
  - Flash

---
　　Flash里调试工具是可以实现远程调试的，这个有时也很有用，比如在某些时候，在Flash调用了外部的文件（XML等等），当你在本地DEBUG时，可能就会出现安全沙箱冲突的问题，这个时候，远程调试就派上用场了。
  
要使用远程调试，首先就是要下一个Debug版的Flash浏览器插件。具体下载网址是：<a href="http://www.adobe.com/support/flashplayer/downloads.html" target="_blank">http://www.adobe.com/support/flashplayer/downloads.html<br /> </a>。下载安装好后，下面就是要把你的要调试的Flash发一个Debug版本（SHIFT+CTRL+ENTER），接着使得Flash能够通过http://localhost/XX/XX.swf这样的路径访问，也就是配IIS或者Apache了，然后点击Flash编辑器里的调试->开始远程调试会话->ActionScript 3，最后通过在浏览器里输入http://localhost/XX/XX.swf这样的网址访问你的SWF,这时你发现Flash编辑器里的调试工具就会有响应了。