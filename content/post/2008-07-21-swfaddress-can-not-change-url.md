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
  
[as3]
  
private static function _check():void {
      
if ((typeof SWFAddress[&#8216;onInit&#8217;] == &#8216;function&#8217; || \_dispatcher.hasEventListener(&#8216;init&#8217;)) && !\_init) {
          
SWFAddress.\_setValueInit(\_getValue());
          
SWFAddress._init = true;
      
}
      
if (typeof SWFAddress[&#8216;onChange&#8217;] == &#8216;function&#8217; || _dispatcher.hasEventListener(&#8216;change&#8217;)) {
          
clearInterval(_interval);
          
SWFAddress._init = true;
          
SWFAddress.\_setValueInit(\_getValue());
      
}
  
}
  
[/as3]
  
看来是在没有增加“onChange”事件侦听的话是不能正常工作的了。
  
[as3]
  
private static function _initialize():Boolean {
      
if (_availability) {
          
ExternalInterface.addCallback(&#8216;getSWFAddressValue&#8217;,
          
function():String {return _value});
          
ExternalInterface.addCallback(&#8216;setSWFAddressValue&#8217;,
          
_setValue);
      
}
      
\_interval = setInterval(\_check, 10);
      
return true;
  
}
  
[/as3]
  
这里”setInterval(\_check, 10)“调用了\_check()方法，如果没有“onChange”事件侦听就会被认为没初始化。