---
title: Windows右键添加”使用CMD打开”
author: chrislearn young
type: post
date: 2011-03-19T09:13:42+00:00
categories:
  - Windows

---
在一些工作场景中，总是会用到命令行。开始 → 运行 → cmd 再逐级的cd 目录实在是不方便，这里介绍一个小技巧可以在右键加入cmd的快捷方式。

<!--more-->
**方法一**
  
打开”我的电脑”，点击菜单中的”工具－文件夹选项”，选择”文件类型”，找到”(无)资料夹”，点”高级-新建”，在”操作”中填入”CMD here”（可随意命名），”用于执行操作的应用程序”中填入”cmd.exe /k cd %1″（这个是关键:注意cmd.exe命令后的参数设置：/k cd %1），确定即可。

完成设置后在任何一个文件夹、分区上打开右键菜单时，都会有”CMD here”菜单，点击它就可以打开CMD命令行了，并且命令行的当前目录也已切换到执行右键命令的文件夹或分区了。

**方法二**
  
其实所有的实现方法都是对注册表做了同样的修改：在HKEY\_CLASSES\_ROOT\Folder\shell下增加一个”CMD”子键，将该子键的 “(默认)”键值修改为”CMD here”，然后在该子键下再建立一个子键”command”，将”command”的”(默认)”键值修改为”cmd.exe /k cd %1″。用注册表文件表示就是：

<div>
  <div>
    <pre>Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\folder\shell\cmd]
@="CMD here"

[HKEY_CLASSES_ROOT\folder\shell\cmd\command]
@="cmd.exe /k cd %1"</pre>
  </div>
</div>

**其它**
  
右键添加cmd，从这里打开cmd.bat

<div>
  <div>
    <pre>REG ADD "HKCR\*\shell\Cmd\command" /ve /t REG_EXPAND_SZ /d %ComSpec%
REG ADD "HKCR\Directory\shell\Cmd\command" /ve /t REG_EXPAND_SZ /d "%ComSpec% /k cd %1"
REG ADD "HKCR\Drive\shell\Cmd\command" /ve /t REG_EXPAND_SZ /d "%ComSpec% /k cd %1"</pre>
  </div>
</div>

右键菜单注册表：
  
运行regedit到HKEY\_CLASSES\_ROOT\*\shell这个下面看看，一般都是在这里的。鼠标可能存在的其它地方

  1. 鼠标右键桌面空白处，新建菜单中的项目在注册表中的位置 <div>
      <div>
        <pre>[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\
Discardable\PostSetup\ShellNew]</pre>
      </div>
    </div>

  2. 鼠标右键文件，弹出的菜单明细在注册表中的位置 <div>
      <div>
        <pre>[HKEY_CLASSES_ROOT\*\shellex\ContextMenuHandlers]</pre>
      </div>
    </div>

  3. 鼠标右键文件夹，弹出的菜单明细在注册表中的位置 <div>
      <div>
        <pre>[HKEY_CLASSES_ROOT\Directory\shellex\ContextMenuHandlers]</pre>
      </div>
    </div>

  4. 鼠标右键在IE浏览器里，弹出的菜单明细在注册表中的位置 <div>
      <div>
        <pre>[HKEY_CURRENT_USER\Software\Microsoft\Internet Explorer\MenuExt]</pre>
      </div>
    </div>

注意：某些软件所添加的鼠标右键可能在

<div>
  <div>
    <pre>[HKEY_CLASSES_ROOT\Folder\shell]
[HKEY_CLASSES_ROOT\Folder\shellex\ContextMenuHandlers]</pre>
  </div>
</div>