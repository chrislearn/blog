---
title: '[转]Android APK反编译'
author: chrislearn young
type: post
date: 2010-09-19T00:14:38+00:00
categories:
  - Android
tags:
  - Android

---
dex2jar和JD-GUI这2个工具配合学习android太靠谱了,所以放上来给大家共享,开源的好处就是好东西大家一起分享。

dex2jar下载地址：http://laichao.googlecode.com/files/dex2jar-0.0.7-SNAPSHOT.zip
  
JD-GUI下载地址：
  
windows版JD-GUI：http://laichao.googlecode.com/files/jdgui.zip
       
Linux版JD-GUI：http://laichao.googlecode.com/files/jd-gui-0.3.2.linux.i686.tar.gz

1.首先找到Android软件安装包中的classes.dex

把apk文件改名为.zip，然后解压缩其中的classes.dex文件，它就是java文件编译再通过dx工具打包成的,所以现在我们就用上述提到的2个工具来逆方向导出java源文件

2.把classes.dex拷贝到dex2jar.bat所在目录。
  
windows系统下：
  
在命令行模式下定位到dex2jar.bat所在目录，运行 dex2jar.bat classes.dex ，生成classes.dex.dex2jar.jar

Ubuntu系统下：

在终端下定位到dex2jar.sh所在目录，运行
  
sh dex2jar.sh classes.dex

则可生成classes.dex.dex2jar.jar

3.运行JD-GUI工具（它是绿色无须安装的）

打开上面的jar文件，即可看到源代码