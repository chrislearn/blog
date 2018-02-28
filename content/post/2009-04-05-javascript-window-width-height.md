---
title: Javascript 获取窗口宽度和高度值
author: chrislearn young
type: post
date: 2009-04-05T14:39:59+00:00
categories:
  - JavaScript
tags:
  - JavaScript

---
#### 获取页面高度，窗口高度，滚动条高度等参数值：

<div class="code lCode lCode2">
  <ol>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      <span class="k1">function</span> getPageScroll(){
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      <span class="k1">var</span> yScroll;
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      <span class="k1">if</span> (self.pageYOffset) {
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      yScroll = self.pageYOffset;
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      } <span class="k1">else</span> <span class="k1">if</span> (<span class="k2">document</span>.documentElement && <span class="k2">document</span>.documentElement.scrollTop){   <span class="s2">// Explorer 6 Strict</span>
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      yScroll = <span class="k2">document</span>.documentElement.scrollTop;
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      } <span class="k1">else</span> <span class="k1">if</span> (<span class="k2">document</span>.body) {<span class="s2">// all other Explorers</span>
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      yScroll = <span class="k2">document</span>.body.scrollTop;
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      }
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      arrayPageScroll = <span class="k1">new</span> <span class="k2">Array</span>(&#8221;,yScroll)
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      <span class="k1">return</span> arrayPageScroll;
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      }
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      <span class="k1">function</span> getPageSize(){
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      <span class="k1">var</span> xScroll, yScroll;
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      <span class="k1">if</span> (<span class="k2">window</span>.innerHeight && <span class="k2">window</span>.scrollMaxY) {
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      xScroll = <span class="k2">document</span>.body.scrollWidth;
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      yScroll = <span class="k2">window</span>.innerHeight + <span class="k2">window</span>.scrollMaxY;
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      } <span class="k1">else</span> <span class="k1">if</span> (<span class="k2">document</span>.body.scrollHeight > <span class="k2">document</span>.body.offsetHeight){ <span class="s2">// all but Explorer Mac</span>
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      xScroll = <span class="k2">document</span>.body.scrollWidth;
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      yScroll = <span class="k2">document</span>.body.scrollHeight;
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      } <span class="k1">else</span> { <span class="s2">// Explorer Mac&#8230;would also work in Explorer 6 Strict, Mozilla and Safari</span>
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      xScroll = <span class="k2">document</span>.body.offsetWidth;
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      yScroll = <span class="k2">document</span>.body.offsetHeight;
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      }
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      <span class="k1">var</span> windowWidth, windowHeight;
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      <span class="k1">if</span> (self.innerHeight) {  <span class="s2">// all except Explorer</span>
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      windowWidth = self.innerWidth;
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      windowHeight = self.innerHeight;
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      } <span class="k1">else</span> <span class="k1">if</span> (<span class="k2">document</span>.documentElement && <span class="k2">document</span>.documentElement.clientHeight) { <span class="s2">// Explorer 6 Strict Mode</span>
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      windowWidth = <span class="k2">document</span>.documentElement.clientWidth;
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      windowHeight = <span class="k2">document</span>.documentElement.clientHeight;
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      } <span class="k1">else</span> <span class="k1">if</span> (<span class="k2">document</span>.body) { <span class="s2">// other Explorers</span>
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      windowWidth = <span class="k2">document</span>.body.clientWidth;
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      windowHeight = <span class="k2">document</span>.body.clientHeight;
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      }
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      <span class="s2">// for small pages with total height less then height of the viewport</span>
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      <span class="k1">if</span>(yScroll < windowHeight){
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      pageHeight = windowHeight;
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      } <span class="k1">else</span> {
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      pageHeight = yScroll;
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      }
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      <span class="k1">if</span>(xScroll < windowWidth){
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      pageWidth = windowWidth;
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      } <span class="k1">else</span> {
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      pageWidth = xScroll;
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      }
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      arrayPageSize = <span class="k1">new</span> <span class="k2">Array</span>(pageWidth,pageHeight,windowWidth,windowHeight)
    </li>
    <li class="hover" onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      <span class="k1">return</span> arrayPageSize;
    </li>
    <li onmouseover="lCC.mousehover(this);" onmouseout="lCC.mouseout(this);">
      }
    </li>
  </ol>
</div>