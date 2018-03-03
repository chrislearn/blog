---
title: SWFAddress使用中URL无法改变的问题
author: chrislearn young
date: 2008-07-21T02:23:16+00:00
categories:
  - ActionScript
  - Flash
tags:
  - Flash
  - SWFAddress

---
刚使用SWFAddress就出现了一个怪异的问题，SWFAddress.setValue(&#8220;XXX&#8221;);调用后，URL怎么也不改变，不知道什么原因，后来发现如果把这句放在SWFAddress.onChange的事件侦听中就是正常的。想不明白，查看他的代码发现了这么一段：

<!--more-->

{{<highlight actionscript>}}
private static function _check():void {
  if ((typeof SWFAddress["onInit"] == "function" || \_dispatcher.hasEventListener("init")) && !_init) {
    SWFAddress._setValueInit(_getValue());
    SWFAddress._init = true;
  }
  if (typeof SWFAddress["onChange"] == "function" || _dispatcher.hasEventListener("change")) {
    clearInterval(_interval);
    SWFAddress._init = true;
    SWFAddress._setValueInit(_getValue());
  }
}
{{</highlight>}}
  
看来是在没有增加“onChange”事件侦听的话是不能正常工作的了。
  
{{<highlight actionscript>}}
private static function _initialize():Boolean {
  if (_availability) {
    ExternalInterface.addCallback("getSWFAddressValue", function():String {return _value}); 
    ExternalInterface.addCallback("setSWFAddressValue", _setValue);
  }
  _interval = setInterval(_check, 10);
  return true;
}
{{</highlight>}}
  
这里”setInterval(\_check, 10)“调用了\_check()方法，如果没有“onChange”事件侦听就会被认为没初始化。