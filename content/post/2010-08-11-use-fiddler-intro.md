---
title: '[转]使用Fiddler提高前端工作效率 (介绍篇)'
author: chrislearn young
type: post
date: 2010-08-11T04:22:24+00:00
categories:
  - 其它
tags:
  - Fiddler

---
## <img src="http://www.aliued.cn/wp-content/uploads/2010/04/FiddlerLogo.png" alt="" width="277" height="84" />

## **1. Fiddler 是什么？**

## Fiddler是用C#编写的一个免费的HTTP/HTTPS网络调试器。英语中Fiddler是小提琴的意思，[Fiddler Web Debugger][1]就像小提琴一样，可以让前端开发变得更加优雅。

Fiddler是以代理服务器的方式，监听系统的网络数据流动。运行Fiddler后，就会在本地打开8888端口，网络数据流通过Fiddler进行中转时，我们可以监视HTTP/HTTPS数据流的记录，并加以分析，甚至还**可以修改**发送和接收的数据。Fiddler还提供了清除IE缓存、请求构造器、文本转换工具等等一系列工具，对前端开发工作很有价值。

## **2. 下载和安装Fiddler**

<div>
  <ol>
    <li>
      安装<a href="http://www.microsoft.com/downloads/details.aspx?displaylang=zh-cn&FamilyID=333325fd-ae52-4e35-b531-508d977d32a6">.net framework</a> 2.0以上版本
    </li>
    <li>
      从<a href="http://www.fiddler2.com/fiddler2/">官方网站</a>免费<a href="http://www.fiddler2.com/fiddler2/version.asp">下载</a>Fiddler。
    </li>
  </ol>
</div>

Firefox中用Fiddler，可以下载一个插件：[Fiddler开关][2]

## **3. Fiddler的界面和功能**

### 列表

<img src="http://www.aliued.cn/wp-content/uploads/2010/04/fiddler-333.png" alt="" width="555" height="555" />

<div>
  左侧是数据列表，以不同的图标区分数据类型和状态，以下是图标对应的含义：
</div>

<table border="0">
  <tr>
    <td>
      <img src="http://www.aliued.cn/wp-content/uploads/2010/04/fiddler-371.png" alt="" width="14" height="18" />
    </td>
    
    <td>
      正在将请求数据发往服务器
    </td>
  </tr>
  
  <tr>
    <td>
      <img src="http://www.aliued.cn/wp-content/uploads/2010/04/fiddler-387.png" alt="" width="14" height="18" />
    </td>
    
    <td>
      正在从服务器下载返回数据
    </td>
  </tr>
  
  <tr>
    <td>
      <img src="http://www.aliued.cn/wp-content/uploads/2010/04/%E4%BD%BF%E7%94%A8Fiddler%E6%8F%90%E9%AB%98%E5%89%8D%E7%AB%AF%E5%B7%A5%E4%BD%9C%E6%95%88%E7%8E%87-403.png" alt="" width="16" height="18" />
    </td>
    
    <td>
      请求过程中暂停
    </td>
  </tr>
  
  <tr>
    <td>
      <img src="http://www.aliued.cn/wp-content/uploads/2010/04/fiddler-414.png" alt="" width="16" height="18" />
    </td>
    
    <td>
      返回过程中暂停
    </td>
  </tr>
  
  <tr>
    <td>
      <img src="http://www.aliued.cn/wp-content/uploads/2010/04/fiddler-425.png" alt="" width="17" height="17" />
    </td>
    
    <td>
      请求中使用了HTTP HEAD方法; 返回中应该没有body内容
    </td>
  </tr>
  
  <tr>
    <td>
      <img src="http://www.aliued.cn/wp-content/uploads/2010/04/fiddler-461.png" alt="" width="15" height="16" />
    </td>
    
    <td>
      请求中使用了HTTP CONNECT方法，建立HTTPS连接通道
    </td>
  </tr>
  
  <tr>
    <td>
      <img src="http://www.aliued.cn/wp-content/uploads/2010/04/fiddler-497.png" alt="" width="16" height="18" />
    </td>
    
    <td>
      返回的内容类型是HTML
    </td>
  </tr>
  
  <tr>
    <td>
      <img src="http://www.aliued.cn/wp-content/uploads/2010/04/fiddler-513.png" alt="" width="16" height="18" />
    </td>
    
    <td>
      返回的内容类型是图片
    </td>
  </tr>
  
  <tr>
    <td>
      <img src="http://www.aliued.cn/wp-content/uploads/2010/04/fiddler-527.png" alt="" width="17" height="17" />
    </td>
    
    <td>
      返回的内容类型是Javascript
    </td>
  </tr>
  
  <tr>
    <td>
      <img src="http://www.aliued.cn/wp-content/uploads/2010/04/fiddler-550.png" alt="" width="18" height="18" />
    </td>
    
    <td>
      返回的内容类型是CSS
    </td>
  </tr>
  
  <tr>
    <td>
      <img src="http://www.aliued.cn/wp-content/uploads/2010/04/fiddler-574.png" alt="" width="15" height="16" />
    </td>
    
    <td>
      返回的内容类型是XML
    </td>
  </tr>
  
  <tr>
    <td>
      <img src="http://www.aliued.cn/wp-content/uploads/2010/04/fiddler-591.png" alt="" width="15" height="16" />
    </td>
    
    <td>
      普通的成功的返回
    </td>
  </tr>
  
  <tr>
    <td>
      <img src="http://www.aliued.cn/wp-content/uploads/2010/04/fiddler-605.png" alt="" width="15" height="16" />
    </td>
    
    <td>
      返回内容为 HTTP/300,301,302,303 or 307 跳转
    </td>
  </tr>
  
  <tr>
    <td>
      <img src="http://www.aliued.cn/wp-content/uploads/2010/04/fiddler-647.png" alt="" width="15" height="16" />
    </td>
    
    <td>
      返回内容为HTTP/304: 使用本地缓存
    </td>
  </tr>
  
  <tr>
    <td>
      <img src="http://www.aliued.cn/wp-content/uploads/2010/04/fiddler-674.png" alt="" width="15" height="16" />
    </td>
    
    <td>
      返回内容为一个证书请求
    </td>
  </tr>
  
  <tr>
    <td>
      <img src="http://www.aliued.cn/wp-content/uploads/2010/04/fiddler-691.png" alt="" width="15" height="16" />
    </td>
    
    <td>
      返回内容是服务器错误
    </td>
  </tr>
  
  <tr>
    <td>
      <img src="http://www.aliued.cn/wp-content/uploads/2010/04/fiddler-707.png" alt="" width="15" height="16" />
    </td>
    
    <td>
      请求被客户端、Fiddler或服务器中断
    </td>
  </tr>
</table>

### 查看器

<div>
  <img src="http://www.aliued.cn/wp-content/uploads/2010/04/fiddler-779.png" alt="" width="555" height="262" />
</div>

<div>
  利用查看器提供的很多形式，我们可以查看数据流的内容。
</div>

### 请求构建器（Request Builder）

<div>
  <img src="http://www.aliued.cn/wp-content/uploads/2010/04/fiddler-815.png" alt="" width="453" height="545" />
</div>

<div>
  可以创建任意数据的请求
</div>

### 过滤器

<div>
  <img src="http://www.aliued.cn/wp-content/uploads/2010/04/fiddler-834.png" alt="" width="555" height="251" />
</div>

<div>
  过滤器可以对左侧的数据流列表进行过滤，我们可以标记、修改或隐藏某些特征的数据流。
</div>

### AutoResponse功能

<div>
  <img src="http://www.aliued.cn/wp-content/uploads/2010/04/fiddler-894.png" alt="" width="555" height="367" />
</div>

<div>
  这个功能可以算的上是Fiddler最实用的功能，可以让我们修改服务器端返回的数据，例如让返回都是HTTP404或者读取本地文件作为返回内容。我们将在实例中介绍利用AutoResponse功能。
</div>

### 文本编码和解码

<div>
  <img src="http://www.aliued.cn/wp-content/uploads/2010/04/fiddler-1003.png" alt="" width="461" height="545" />
</div>

<div>
  提供了常用的一些文本编解码的转换。
</div>

### 此外，还可以对两个数据流进行比较

<div>
  <img src="http://www.aliued.cn/wp-content/uploads/2010/04/fiddler-1041.png" alt="" width="504" height="417" />
</div>

<div>
  Fiddler可以保存和打开“SAZ”格式的文件，这样就可以将监听到的数据流保存下来，下次再重新打开分析。可以利用FiddlerCap——一个专门用来录制保存SAZ的小工具——保存SAZ文件。SAZ文件可以设置密码保护，比较贴心。
</div>

 [1]: http://www.fiddler2.com/fiddler2/
 [2]: https://addons.mozilla.org/zh-CN/firefox/addon/9373V