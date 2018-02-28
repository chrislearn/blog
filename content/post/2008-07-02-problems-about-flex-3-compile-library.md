---
title: Flex 3 编译Library的问题及解决方法
author: chrislearn young
date: 2008-07-02T00:06:18+00:00
categories:
  - ActionScript
  - Flash
  - Flex
tags:
  - ActionScript
  - Flash
  - Flex

---
这两个搞了一个flash，因为项目比较大，所以我想将一些较为基础的类的代码打到一个包里，本以为很简单的事情，搞了半天也没搞出来。我是用的flex 3做的开发。 

问题是，如果将所有的类放到一个 actionscript project 中，Flex 在编译时，事实上并不会将本项目文件夹下的所有类代码都包进来，它似乎只关心它要用到的一些代码。这一点跟VS是完全不一样的。我想或许哪边有这一个选项的设置，可惜找了半天也没找到，试着用flash编译项目，也是一个样的。晕死… 

actionscript project 搞不定就重搞了一个 flex library project， 不过发现也是有问题的，我是想让它生成.swf的文件，不过flex library project默认是在bin文件夹下生成一个.swc的文件。得解压了才会出现一个library.swf，这还是不能满足我的要求。后来发现可以通过设置一些编译的参数来达到目的，不过，文件名还是叫library.swf，只是不是将它跟另一个文件打包成一个.swc文件，而是放到一个目录里。唉，也算是基本达到目的了吧。至于设置编译参数的参考，可以到 http://livedocs.adobe.com/flex/3/html/help.html?content=compilers_04.html 上看看，而事实上我倒是没有用这个方法，太烦，这就是我最讨厌的非微软阵营的一大特点，很多简单的事确复杂化了。我用了ant来编译的。具体方法参考 http://www.jakehilton.com/?q=node/27 ，只是这篇文章里的相应的编译参数要更改。下面代码是我的大致的设置：
  
[xml]
  
<?xml version="1.0" encoding="UTF-8"?> <project name="RpgGame ClientApp Build" default="Compile ClientApp Swf" basedir="."> <property name="compc" location="C:\Program Files\Adobe\Flex Builder 3 Plug-in\sdks\3.0.0\bin\compc.exe"/> <target name="Compile ClientApp Swf">


      
<exec executable="${compc}" dir="." failonerror="false">
        
<arg line="-source-path ."/>
        
<arg line="-directory=true"/>
        
<arg line="-output ../WebSite/libraries/app"/>
        
<arg line="-include-sources ."/>
      
</exec>
    
</target> </project> [/xml]