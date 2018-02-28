---
title: Flash中彩色图变黑白图
author: chrislearn young
type: post
date: 2010-07-06T03:31:06+00:00
categories:
  - ActionScript
  - Flash
tags:
  - ActionScript
  - Flash

---
这两天在看ARToolKit，发现了里面有一段代码，是将彩色的图片变成黑白的。

<!--more-->
做了一个简单的例子：

[as3]
  
package
  
{
	  
import flash.display.*;
	  
import flash.geom.*;
	  
import flash.events.*;
	  
import flash.net.*;
	  
import flash.utils.*;
	  
import flash.filters.*;

public class Test extends Sprite
	  
{
		  
private static const ZERO_POINT:Point = new Point();
		  
private static const MONO_FILTER:ColorMatrixFilter = new ColorMatrixFilter([
			  
0.2989, 0.5866, 0.1145, 0, 0,
			  
0.2989, 0.5866, 0.1145, 0, 0,
			  
0.2989, 0.5866, 0.1145, 0, 0,
			  
0, 0, 0, 1, 0
		  
]);

public function Test()
		  
{
			  
var char:Char = new Char();
			  
var inbmp:BitmapData = new BitmapData(char.width, char.height, true, 0x000000);
			  
inbmp.draw(char);

var outbmp:BitmapData = new BitmapData(inbmp.width, inbmp.height, false, 0x0);
			  
outbmp.applyFilter(inbmp, inbmp.rect, ZERO\_POINT, MONO\_FILTER);

addChild(new Bitmap(outbmp));
		  
}
	  
}
  
}
  
[/as3]

Test.as作为一个Fla文件的文档类，Char是Fla中的一个可显示的对象。看代码的意思是对原始的彩色图片中的RGB色作一个计算：
  
新R = 新G = 新B = 0.2989 \* R + 0.5866 \* G + 0.1145 * B;
  
整不明白0.2989，0.5866，0.1145这三个常数从何而来，不过图确实变成黑白的了。