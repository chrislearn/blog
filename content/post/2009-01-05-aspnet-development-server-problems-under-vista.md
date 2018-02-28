---
title: ASP.NET Development Server Problems Under Vista
author: chrislearn young
type: post
date: 2009-01-05T13:29:06+00:00
categories:
  - Asp.net
tags:
  - Asp.net
  - Vista
  - VS

---
Today, when I use VS2008 to create a Demo WebSite and right click a page and click &#8220;View in Browser&#8221;, then firefox open, but pass a long time, it show nothing. when i use the same url in IE, it also said can not open the page.

<!--more-->

But, when i replace &#8220;localhost&#8221; in url to &#8220;127.0.0.1&#8221;, it worked. So I thinked mybe some problem happend when it resolve &#8220;localhost&#8221; to &#8220;127.0.0.1&#8221;. So I open a file named &#8220;host&#8221; under path &#8220;C:\Windows\System32\drivers\etc&#8221;, find this line &#8220;::1             localhost&#8221;, this should be &#8220;:::1             localhost&#8221;, change it.

now it worked.