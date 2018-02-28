---
title: '[转][翻译]Flash现实增强技术入门指南'
author: chrislearn young
type: post
date: 2010-07-02T06:45:47+00:00
categories:
  - ActionScript
  - Flash
tags:
  - ActionScript
  - FlarToolkit
  - Flash

---
转自：<a href="http://www.asbinbin.com/?p=8" target="_blank">http://www.asbinbin.com/?p=8</a>

由于最近在研究Flash的3D及AR（Argument Reality）技术。因此这段时间集中读了一些相关方面的资料。谈不上分享经验，先翻译一篇**Mikko Haapoja**的文章作为开始吧。这篇博文是他在Saqoosha的**《FlarToolkit入门指南》**的 基础上进一步对Spark类库中的FlarToolkit（一个实现Flash AR技术的开源类库）做了比较详细的入门指导。（注：本人首次尝试翻译，欢迎大家指正。转载请注明出处）
  
ok.开始吧—————————————————

**《FlarToolkit/Flash 现实增强技术入门指南》**
  
翻译：<a href="http://www.asbinbin.com/" target="_blank">盐酸酸</a> 原文地址：<a href="http://www.mikkoh.com/blog/?p=182" target="_blank">http://www.mikkoh.com/blog/?p=182</a>

最近我正在尝试着研究一下**FlarToolkit**。什么是FlarToolkit？FlarToolkit是一 个实现**Flash 现实增强技术**的开源类。我在<a href="http://www.mikkoh.com/blog/?p=129" target="_blank">另一篇帖子</a>里介绍了有关 它的更多细节。
  
我打算先讲解一下如何基于FlarToolkit开发。FlarToolkit开发时比较困难的 一点是代码内几乎所有的注释都是日文，所以如果你打算查看代码（而且你不会日语），你就不得不耗费更多的精力去研究。
  
开始之前，先下载这个例子（<a href="http://www.mikkoh.com/blog/wp-content/uploads/2008/12/learningflartoolkit.zip" target="_blank">点我下载</a>）。这个例子基于Saqoosha的简易方块的例子，但是更加简单易读。
  
OK，我们现在就开始学习FlarToolkit啦！

**第一步：下载**
  
在一开始，我访问了Saqoosha的博客，正打算用Google Translater把页面翻译一下时，却发现了我最熟悉的三个字母“SVN”。HAH…有了它就好办了，我们先利用SVN工具把FlarToolkit项目全部下载吧。
  
**FlarToolkit项目的SVN url:**
  
<a href="http://www.libspark.org/svn/as3/FLARToolKit/trunk" target="_blank">http://www.libspark.org/svn/as3/FLARToolKit/trunk</a>
  
（译者注：SVN工具大家应该都很熟悉了吧，如果你不知道什么是SVN，建议你先看看<a href="http://www.subversion.org.cn/" target="_blank">SVN中文站</a> 。原文作者也提供了一个<a href="http://code.google.com/p/papervision3d/wiki/Download_from_SVN" target="_blank">参考链接</a>，是PV3D的SVN下载帮助）

**第二步：查看例子和源码**
  
在我想了解怎样使用某个类库之前，都会先去查看一下它提供的例子及源码。现在我来总结一下我在学习FlarToolkit过程中的一些收获。
  
首先开始于Saqoosha的SimpleCube例子。我个人并不太喜欢他这个应用的写法（当 然从对象可复用的角度上说它是非常不错的）。
  
在那个例子中有三个类：**ARAppBase，PV3DARApp，和 SimpleCube
  
** 
  
三个类分别控制着AR应用的一个部分。但是这样的代码读起来比较困难，因为**PV3DARApp**继承自**ARAppBase**， 而**SimpleCube**继承自**PV3DARApp**。为了便于阅读学习，我把上面的 三个类合并到了一起。（当然这样并不符合可复用的原则）
  
**FlarApp一共包含5个部分：**
  
**1.摄像头参数文件**
  
**2.标记文件**
  
**3.标记检测器**
  
**4.Flar Base Node**（译者注：其实这个FLARBaseNode的实例就是我们装载3D物体的容器，下 面会有详细的解释）
  
**5.Papervision**（译者注：这是一个flash的 3D引擎）

**摄像头参数**
  
该摄像头参数文件是从外部加载的二进制文件。一开始我不知道它到底是如何而来，我到 Saqoosha的博客上去询问，他回复说这是由一个ARToolkit的一个附属程序生成的 （注：FlarToolkit是由ARToolkit演化而来，ARToolkit是现实增强技术在C++及Java等 开发语言上的实现）。这个程序名为**“****calib_camera2”**。
  
Calib_camera2创建这个二进制的摄像头参数文件，这个文件是用来纠正从摄像头获取图像的扭曲及变形的。你可以从<a href="http://www.hitl.washington.edu/artoolkit/download/" target="_blank">这里</a>下载这个程序。但我想还是使用FlarToolkit中提供的这个原始的**“camera_para.dat”**文 件会更好。（我想大多数人都会这么做的）

**标记文件**
  
标记文件中保存的是一个图案，Flar会在你的摄像头获取的影像中寻找这个图案。在我的制作的项目中它在这个路径下**“lib/mikko.pat”**。 如果你打开这个文件，你会发现有4个16 × 48矩阵。它们分别代表着标志4个不同的方向。Flar会将你的标记图案看作一个16×16的二维码。文件中的每一个矩阵是16 × 48，是因为要包含三种颜色（红，绿，蓝）
  
Saqoosha已经建立了一个Air应用来制作这些标记文件。你可以下载该Air程序从<a href="http://saqoosha.net/lab/FLARToolKit/MarkerGenerator/MakerGenerator.air" target="_blank">这里</a> 。
  
可以按照下列步骤创建一个标记文件：
  
1.标志设计使用以下规格,你可以在方框中放置各种你想用的图形。但是我想一些棱角分明的图案会更适合些。

2.打印出你设计好的图案，启动刚才下载的Air程序，并将你打印好的图案放到摄像头前。当程序中有一个红色的框出现在你的图案周围后，点击**“save pattern”**。生成工作就完成啦。
  
这是整个应用中比较关键的步骤。

**标记检测器**
  
标记检测器的作用就是从你摄像头中获取的bitmapdata中获取标记文件中定义的图案。一旦它找到定义的图案就会告知程序，程序就会从检测器中获得一 个变换矩阵来摆布FlarBaseNode了。

**FlarBaseNode**
  
这个FlarBaseNode其实就是用来显示Papervision 3D物体的容器。利用从标记检测器中得到的变换矩阵来控制我们的3D物体的3维空间坐标。

**Papervision**
  
它是Flar App的最后一块拼图了。我真的不想对它讲太多的细节了。如果你对这个3D引擎感兴趣可以直接到Google Code中找到它（<a href="http://code.google.com/p/papervision3d/" target="_blank">点这里到PV3D的 页面</a>）

**一些注意事项：**
  
1.编译时遇到错误：
  
**Error: Attempted access of inaccessible property _projectionthrough a reference with static typeorg.libspark.flartoolkit.pv3d:FLARCamera3D.**

可以这样解决这个问题

到这个类中**org.papervision3d.cameras.Camera3D**
  
修改这个变量的命名空间
  
**private var _projection:Matrix3D;**
  
改为
  
**protected var _projection:Matrix3D;**
  
这并不会破坏PV3D的功能，只是用来让FlarToolkit中的FlarCamera3D可以调用Camera3d 类。

2.这个问题我也不知道为什么是这样。因为某些原因，你不得不设置Papervision的viewport为两倍。如果你不这样，你的3D物体不 会出现在你的视频显示范围内。但即使这样做了，有时候显示也并不太完美。在Saqoosha的例子中，他将viewport又平移了-4像素。我一直不喜 欢这样把摄像头中的东西都放大了两倍显示在那里。
  
好，现在该轮到你了。有什么问题，欢迎大家交流。我不知道所有的答案，但我会尽我所能回答这些问题。
  
–End–
  
翻译完了，其中大部分是意译。如果有错误，欢迎大家留言指正。——盐酸酸