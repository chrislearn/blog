---
title: Firefox下IFrame显示的BUG
author: chrislearn young
type: post
date: 2008-08-14T04:20:26+00:00


categories:
  - HTML
tags:
  - Firefox
  - HTML

---
发现了一些FlashPlayer 9 与FlashPlayer 10之间的不一样之处，很是怪异。 处理XML： 在Flash 10中将播放器设为Player 9后下面代码执行结果为

<!--more-->
{{<highlight xml>}}
<site>world</site>
{{</highlight>}}
  
而设为Player 10后执行结果为
  
```
world
```
  
以下为代码
  
{{<highlight actionscript>}}
var xml:XML = <config><site></site></config>;
xml = xml.site[0].appendChild("world");
trace(xml);
{{</highlight>}}
  
而下面这个代码的执行结果确又是一样的 //代码
  
{{<highlight actionscript>}}
var xml:XML = <config><site></site></config>;
xml = xml.site[0].appendChild("world");
trace(xml);
{{</highlight>}}
  
结果都是

```
<site>
world
</site>
```

有点晕，不知道是何原因。所以为了防止播放器的不一致，遇到这种appendChild()里面放置字符串的情况还是改用类似下面的写法，算Flash狠了。
  
{{<highlight actionscript>}}
var xml:XML = <config><site></site></config>;
xml = xml.site[0].appendChild(new XML("world"));
trace(xml);
{{</highlight>}}
  
这样，两个播放器也就一致了。 代码的执行顺序： 这个很有问题，如果两个代码执行顺序不一致，那可能运行的效果就完全不一致。不过两个版本确实在这方面存在差异。 如果我们只是简单地新建一个Flash文件，在里面新建一个MovieClip并且在其第一帧上增加下面的代码：
  
{{<highlight actionscript>}}
trace("onframe1 before call gotoandplay 10");
gotoAndStop(10);
trace("on frame 1 after call gotoandplay 10");
{{</highlight>}}
  
在其第10帧处插入下面的代码：
  
{{<highlight actionscript>}}
trace("now on frame 10");
{{</highlight>}}
  
把文件的设置中的播放器设成 Flash Player 9 或者 Flash Player 10 其执行结果是一致的，都是： onframe1 before call gotoandplay 10 on frame 1 after call gotoandplay 10 now on frame 10 也就是说是执行完第一帧上的所有代码后再执行第十帧上的代码，这一点应该是跟我们想像的一致的，也没什么异议。 但是我们改一种写法，删除刚才这个文件中的这个MovieClip中的第一帧的代码，将这个MoiveClip的Class设置成TestMC，并且新建一个TestMC.as的文件，内部代码为：
  
{{<highlight actionscript>}}
package
{
  import flash.display.MovieClip;
  public class TestMC extends MovieClip
  {
    public function TestMC()
    {
      stop();
      trace("[use class]before gotoAndStop 10");
      gotoAndStop(10);
      trace("[use class]after gotoAndStop 10");
    }   
  }
}
{{</highlight>}}
  
这样一来，在播放器设成 Flash Player 9时执行的结果是： [use class]before gotoAndStop 10 [use class]after gotoAndStop 10 now on frame 10 跟刚才的上面的顺序也是一致的，不过在将播放器设成 Flash Player 10时，执行结果却是： [use class]before gotoAndStop 10 now on frame 10 [use class]after gotoAndStop 10 也就是说这样一来，先执行被调用的帧上的代码，然后再继续现有的代码，等于是把“gotoAndStop”到的相应帧上的代码插入到现有的代码中执行，这个顺序跟之前的是完全不一样的。到底是哪一种执行的顺序是更合理的？不是很好说，不过作为一个专业级的程序员，一个好的习惯是尽量少在帧上写代码。 点击此处下载与此相关的测试文件。