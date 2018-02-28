---
title: HTML版本引起的object标签显示问题
author: chrislearn young
type: post
date: 2009-04-06T13:31:29+00:00
categories:
  - CSS
  - HTML
tags:
  - CSS
  - Flash
  - HTML
  - SWF

---
CSS部分：

body
  
{
  
margin: 0px;
  
padding: 0px;
  
}
  
object
  
{
  
margin: 0px;
  
padding: 0px;
  
}
  
table, tr, td
  
{
  
padding: 0px;
  
margin: 0px;
  
border: 0px;
  
}
  
iframe
  
{
  
margin: 0px;
  
padding: 0px;
  
}
  
#body.day
  
{
  
background: #F0FF00;
  
}
  
#body.night
  
{
  
background: #000000 url(&#8220;images/night\_Scene\_body.jpg&#8221;) repeat;
  
}

BODY的内容：

<table style=&#8221;background-color: Black;&#8221; border=&#8221;0&#8243; cellpadding=&#8221;0&#8243; cellspacing=&#8221;0&#8243;
  
width=&#8221;100%&#8221;>
  
<tr>
  
<td>
  
<object style=&#8221;visibility: visible;&#8221; id=&#8221;bg\_left&#8221; data=&#8221;night\_WhoScene\_bg\_side.swf&#8221;
  
type=&#8221;application/x-shockwave-flash&#8221; height=&#8221;600&#8243; width=&#8221;100&#8243;>
  
<param value=&#8221;exactfit&#8221; name=&#8221;scale&#8221;/>
  
<param value=&#8221;window&#8221; name=&#8221;wmode&#8221;/>
  
<param value=&#8221;false&#8221; name=&#8221;allowfullscreen&#8221;/>
  
</object>
  
</td>
  
</tr>
  
</table><div>
  
<object style=&#8221;visibility: visible;&#8221; id=&#8221;bg\_bottom&#8221; data=&#8221;night\_WhoScene\_bg\_bottom.swf&#8221;
  
type=&#8221;application/x-shockwave-flash&#8221; height=&#8221;40&#8243; width=&#8221;1280&#8243;>
  
<param value=&#8221;exactfit&#8221; name=&#8221;scale&#8221;/>
  
<param value=&#8221;window&#8221; name=&#8221;wmode&#8221;/>
  
<param value=&#8221;false&#8221; name=&#8221;allowfullscreen&#8221;/>
  
</object></div>

对于IE7，显示时上面一个swf跟下面一个中间是没有间隙的，而对于ie8,firefox3,chrome1，显示时，两个flash中间都出现的间隙，整了一整天，也不知道为什么，最后发现在将html头部的

<!DOCTYPE HTML PUBLIC &#8220;-//W3C//DTD XHTML 1.0 Strict//EN&#8221; &#8220;http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd&#8221;>改成

<!DOCTYPE html PUBLIC &#8220;-//W3C//DTD XHTML 1.0 Transitional//EN&#8221; &#8220;http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd&#8221;>

问题竟然解决了，晕哦，但是要真想在 XHTML 1.0 Strict 下正常显示中间无缝隙该怎么做呢？