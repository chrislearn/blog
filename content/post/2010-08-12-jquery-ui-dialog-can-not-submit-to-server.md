---
title: Jquery UI Dialog 无法提交服务器解决方法
author: chrislearn young
type: post
date: 2010-08-12T11:01:12+00:00
categories:
  - JavaScript
  - 程序开发
tags:
  - Dialog
  - JavaScript
  - jQuery

---
Jquery UI 库中的 Dialog 控件里如果存在表单，是无法直接提交到服务器的，因为在jquery.ui.dialog.js文件中（1.8.2版本中大概是在59行的位置）有这样的代码：
  
[javascript]
  
uiDialog = (self.uiDialog = $(&#8221;))
  
.appendTo(document.body)
  
.hide()
  
.addClass(uiDialogClasses + options.dialogClass)
  
.css({
  
zIndex: options.zIndex
  
})
  
// setting tabIndex makes the div focusable
  
// setting outline to 0 prevents a border on focus in Mozilla
  
.attr(&#8216;tabIndex&#8217;, -1).css(&#8216;outline&#8217;, 0).keydown(function(event) {
  
if (options.closeOnEscape && event.keyCode &&
  
event.keyCode === $.ui.keyCode.ESCAPE) {

self.close(event);
  
event.preventDefault();
  
}
  
})
  
[/javascript]
  
也就是说被创建的dialog元素是被添加到body元素中了，你想dialog的内容被作为子元素添加在了它所创建的这个dialog元素里，自然也会被从原始的form元素中拿出来了，这样它里面的表单元素也就无法知道自己提交到哪去了。

解决方法：
  
有人可能想直接修改上面这段代码，把.appendTo(document.body)改为类似.appendTo(document.forms[0])这样的代码。不过不管怎么说修改jquery这么成熟的库总不是明智的作法。我个人是在调用了dialog()方法后再将生成的元素放入到form中。
  
例如：
  
[javascript]
  
$(&#8216;#control\_panel\_dialog&#8217;).dialog();
  
$(&#8220;body>div[role=dialog]&#8221;).appendTo(&#8216;form:first&#8217;);
  
[/javascript]
  
或者：
  
[javascript]
  
$(&#8216;#control\_panel\_dialog&#8217;).dialog().parent().appendTo(&#8216;form:first&#8217;);
  
[/javascript]
  
或者：
  
[javascript]
  
$(&#8216;#control\_panel\_dialog&#8217;).dialog();
  
$(&#8216;.ui-dialog&#8217;).appendTo(&#8216;form:first&#8217;);
  
[/javascript]
  
由于我正常是使用asp.net，正常只有一个 form 元素，这样的话直接加入到 &#8216;form:first&#8217; 就好了。