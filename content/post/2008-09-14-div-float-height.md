---
title: div设置float后高度不自动增加
author: chrislearn young
type: post
date: 2008-09-14T09:01:45+00:00

categories:
  - CSS
tags:
  - CSS

---
如果您没有闭合(清除)浮动元素，它将造成的后果是&#8212;&#8211;div的高度不能自动增加。

目前用来清除“闭合(清除)浮动”的方法，主要是一下四种：

**1.额外标签法**

这种方法就是向父容器的末尾再插入一个额外的标签，并令其清除浮动（clear）以撑大父容器。这种方法浏览器兼容性好，没有什么问题，缺点就是需要额外的（而且通常是无语义的）标签。

我个人不喜欢这种方法，但是它确实是W3C推荐的方法

<table style="border: 1px dotted #cccccc; table-layout: fixed;" border="0" cellspacing="0" cellpadding="6" width="95%" align="center">
  <tr>
    <td bgcolor="#f3f3f3">
      <div style=&#8221;clear:both;&#8221;></div>
    </td>
  </tr>
</table>

或者使用

<table style="border: 1px dotted #cccccc; table-layout: fixed;" border="0" cellspacing="0" cellpadding="6" width="95%" align="center">
  <tr>
    <td bgcolor="#f3f3f3">
      <br style=&#8221;clear:both;&#8221; />
    </td>
  </tr>
</table>

**2.使用after伪类**

这种方法就是对父容器使用after伪类和内容声明在指定的现在内容末尾添加新的内容。经常的做法就是添加一个“点”，因为它比较小不太引人注意。然后我们再利用它来清除浮动（闭合浮动元素），并隐藏这个内容。

这种方法兼容性一般，但经过各种 hack 也可以应付不同浏览器了，同时又可以保证html 比较干净，所以用得还是比较多的。

<table style="border: 1px dotted #cccccc; table-layout: fixed;" border="0" cellspacing="0" cellpadding="6" width="95%" align="center">
  <tr>
    <td bgcolor="#f3f3f3">
      #outer:after{<br /> content:&#8221;.&#8221;;<br /> height:0;<br /> visibility:hidden;<br /> display:block;<br /> clear:both;<br /> }
    </td>
  </tr>
</table>

**3.设置overflow为hidden或者auto**

这种做法就是将父容器的overflow设为hidden或auto就可以在标准兼容浏览器中闭合浮动元素.

不过使用overflow的时候，可能会对页面表现带来影响，而且这种影响是不确定的，你最好是能在多个浏览器上测试你的页面。

**4.浮动外部元素，float-in-float**
  
这种做法就是让父容器也浮动，这利用到了浮动元素的一个特性——浮动元素会闭合浮动元素。这种方式在 IE/Win 和标准兼容浏览器中都有较好的效果，但缺点也很明显——父容器未必想浮动就浮动的了，毕竟浮动是一种比较特殊的行为，有时布局不允许其浮动也很正常。