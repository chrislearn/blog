---
title: '[转]Gappproxy 构建个人代理服务器(Linux)'
author: chrislearn young
type: post
date: 2010-07-01T03:33:30+00:00
categories:
  - 其它

---
使用的过程主要分为两个部分。第一部分是上传一个文件到google appengine（GAE）,第二部分是建立本地和GAE的连接。

1：上传
  
1.1 创建一个google appengine帐号
  
点击链接 （http://appengine.google.com/）申请注册一个google appengine帐号，注册需要一个gmail邮箱，另外在注册的过程中需要填入手机号码进行验证。

1.2 安装python
  
我的系统是Ubuntu8.04，所以只要apt-get install python就可以了

1.3 下载并安装google appengine软件包
  
点击链接（http://code.google.com/appengine/downloads.html），下载Linux平台的Google App Engine SDK，并进行解压。我的解压路径是桌面上的GAE目录。

1.4 下载并解压fetchserver源码包。
  
点击链接 （http://code.google.com/p/gappproxy/downloads/list），下载里面的fetchserver-1.0.0beta.tar.gz。这个是GAppProxy服务端源码包，用于架设自己的fetchServer。要将这个包进行解压。然后将解压后的文件（fetchServer）夹放入Google App Engine SDK的安装目录。

[
  
][1] 

1.5 编辑fetchServer目录下的app.yaml文件。
  
用nano或者其他方式编辑这个文件，主要编辑的参数是第一行application.
  
～～～～～～～～～～～～～～～～～～～～
  
application: aaaaaa(比如我的比如你的AppEngine地址是aaaaaaaaa.appspot.com，那就是application帐号就是aaaaaa）)
  
～～～～～～～～～～～～～～～～～～～～
  
编辑结束后，保存并关闭这个文件。

1.6 上传
  
进入Google App Engine SDK目录。然后运行命令：appcfg.py update fetchserver。程序会要求你填入你的gmail和gmail的密码。
  
～～～～～～
  
hoffmann@ubuntu:~/Desktop/GAE$ python appcfg.py update fetchServer/
  
Scanning files on local disk.
  
Initiating update.
  
Email: aaaaaa@gmail.com
  
Password for aaaaaa@gmail.com:
  
Cloning 1 application file.
  
Deploying new version.
  
Checking if new version is ready to serve.
  
Closing update: new version is ready to start serving.
  
～～～～～～
  
OK ，上传部分完毕。

2：连接
  
2.1：下载客户端
  
点击链接（http://code.google.com/p/gappproxy/downloads/list），下载gappproxy-1.0.0beta.tar.gz ，这个是GAppProxy源码包，内含客户端所有源码，并将这个文件进行解压。我还是解压在桌面上，文件夹的名字是gappproxy。

2.2 更改配置文件
  
进入gappproxy目录，用nano或者其他的文件编辑器编辑proxy.conf文件。在fetchserver一栏里面填写自己的apengine地址。并去掉一行开头的井号（这个是注释用的）
  
～～～～～～～～～～～～～～～～～
  
GAppProxy configuration

\# local_proxy
  
#local_proxy = host:port
  
#
  
\# If local proxy needs authentication:
  
#local_proxy = user:passwd@host:port

fetch server
  
#fetch_server = http://127.0.0.1:8080/fetch.py
  
fetch_server = http://aaaaaa.appspot.com/fetch.py ###填写自己注册的appengine地址。
  
#fetch_server = http://fetchserver-nolog.appspot.com/fetch.py
  
～～～～～～～～～～～～～～～～～～～～
  
然后保存并关闭。

2.3 运行代理服务
  
直接在终端里面运行 python proxy.py.如果看到HTTP Enabled : YES的字样，恭喜你，代理已经成功开启了。你所要做的就是将这个终端一直开着，就可以上网了。代理的地址是127.0.0.1:8000.这个可以在浏览器里面设置的。
  
～～～～～～～～～～～～～～～
  
hoffmann@ubuntu:~/Desktop/gappproxy$ python proxy.py
  
——————————————–
  
HTTP Enabled : YES
  
HTTPS Enabled: NO
  
Local Proxy :
  
Fetch Server : http://aaaaaa.appspot.com/fetch.py
  
——————————————–
  
~~~~~~~~~~~~~~~~~~

 [1]: http://hiphotos.baidu.com/bdhoffmann/pic/item/9f5cdbd5411f7ee450da4b5f.jpg