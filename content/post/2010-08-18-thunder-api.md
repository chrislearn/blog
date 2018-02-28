---
title: '[转]迅雷API接口'
author: chrislearn young
type: post
date: 2010-08-18T10:31:59+00:00
categories:
  - 程序开发
tags:
  - 迅雷

---
首先确保电脑已经安装讯雷,打开VS.NET 点击菜单:项目->添加引用->COM->添加对ThunderAgent 1.0

Type Library的引用
  
　　1.创建讯雷调用对象

Private ThunderEng As New THUNDERAGENTLib.Agent&#8217;创建讯雷调用对象

ThunderEng.AddTask(&#8220;下载地址&#8221;, &#8220;另存文件名&#8221;, &#8220;保存目录&#8221;,&#8221;任务注释&#8221;,&#8221;引用地址&#8221;,&#8221;开始模式&#8221;, &#8221;

只从原始地址下载&#8221;,&#8221;从原始地址下载线程数&#8221;) &#8216;添加下载任务

ThunderEng.CommitTasks()&#8217;提交下载任务

　　2.使用讯雷调用对象查询下载任务信息

sFileSize = ThunderEng.GetTaskInfo(txtURL.Text, &#8220;FileSize&#8221;)&#8217;获取下载文件大小
  
sDownedSize = ThunderEng.GetTaskInfo(txtURL.Text, &#8220;CompletedSize&#8221;)&#8217;获取已完成大小
  
sFileName = ThunderEng.GetTaskInfo(txtURL.Text, &#8220;FileName&#8221;)&#8217;获取文件名

　　二、迅雷平台接口函数定义

　　获得信息

　　1. BSTR GetInfo(BSTR pInfoName)

　　功能：获得迅雷或平台相关信息

　　参数：

参数名 含义
  
pInfoName 信息名称，有如下4种
  
。“ThunderExists”：迅雷是否存在
  
。“ThunderRunning”：迅雷是否运行
  
。“ThunderVersion”：迅雷版本号
  
。“PlatformVersion”：平台版本号

　　返回值：返回值是字符串与参数pInfoName有对应关系

参数 返回值
  
“ThunderExists” “true”存在，“false”不存在
  
“ThunderRunning” “true” 运行中， “false”未运行
  
“ThunderVersion” 迅雷版本号 “x.x.x.x”
  
“PlatformVersion” 平台版本号 “x.x.x.x”

　　2. HRESULT GetInfoStruct(INT pInfo)

　　功能：获取迅雷或平台相关全部信息

　　参数：

参数名 含义
  
pInfo 其实是THUNDER_INFO类型的结构指针，调用前把它转换为INT类型；调用后结构中将填充平台信息

，定义如下：
  
typedef struct \_THUNDER\_INFO
  
{
  
BOOL bThunderExists;
  
BOOL bThunderRunning;
  
CHAR szThunderVersion[32];
  
CHAR szPlatformVersion[32];
  
} THUNDER_INFO;

函数调用后，结构中将填充相应的信息。

　　返回值：

0 获取成功
  
非0 获取失败

任务操作

　　3. 加入任务

HRESULT AddTask
  
(BSTR pURL,
  
BSTR pFileName = &#8220;&#8221;,
  
BSTR pPath = &#8220;&#8221;,
  
BSTR pComments = &#8220;&#8221;,
  
BSTR pReferURL = &#8220;&#8221;,
  
INT nStartMode = -1,
  
INT nOnlyFromOrigin = 0,
  
INT nOriginThreadCount = -1);

　　功能：

　　往平台加入下载任务信息，此时尚未体现到迅雷中

　　参数：

参数名 含义
  
pURL 目标URL，必须参数
  
pFileName 另存名称，默认为空，表示由迅雷处理，可选参数
  
pPath 存储目录，默认为空，表示由迅雷处理，可选参数
  
pComments 下载注释，默认为空，可选参数
  
pReferURL 引用页URL，默认为空，可选参数
  
nStartMode 开始模式，0手工开始，1立即开始，默认为-1，表示由迅雷处理，可选参数
  
nOnlyFromOrigin 是否只从原始URL下载，1只从原始URL下载，0多资源下载，默认为0，可选参数
  
nOriginThreadCount 原始地址下载线程数，范围1-10，默认为-1，表示由迅雷处理，可选参数

　　4. 开始任务

　　HRESULT CommitTaskss()

　　功能：

　　把AddTask所加入的下载任务信息真正提交到迅雷中进行下载，并从平台中删除

　　注意：如果AddTask添加的任务没有被提交没有被取消（调用CancelTasks），则Agent对象析构时会

阻塞，所以调用者不应该残留一些没有被提交或者取消的任务，以避免脚本执行者停止响应。

　　5. 取消任务

　　HRESULT CancelTasks()

　　功能：

　　取消平台中所有由AddTask所加入的下载任务信息

　　6. 查询任务信息

　　BSTR GetTaskInfo(BSTR pURL,BSTR pInfoName);

　　参数：

参数名 含义
  
pURL 所要查询的下载URL信息
  
pInfoName 状态名称，有如下几种

。“Exists”：pURL是否在迅雷的任务列表
  
。“Path”：存储目录
  
。“FileName”：文件名称
  
。“FileSize”：文件大小
  
。“CompletedSize”：已下载大小
  
。“Percent”：下载进度
  
。“Status”：任务状态

　　返回值： 返回值是字符串与参数pInfoName有对应关系

参数 返回值
  
“Exists” ”true”存在，”false”不存在
  
“Path” 存储目录，最后带反斜线\，例：C:\TDDownload\
  
“FileName” 文件名称
  
“FileSize” 文件大小，以字节为单位，0表示大小未知
  
“CompletedSize” 已下载大小，以字节为单位
  
“Percent” 下载进度，带1位小数，例：70.0
  
“Status” 任务状态，有以下6种状态

。“running”： 运行状态
  
。“stopped”： 停止状态
  
。“failed”： 失败状态
  
。“success”： 成功状态
  
。“creatingfile”：正在创建数据文件
  
。“connecting”： 正在连接

　　7. GetTaskInfoStruct(INT pTaskInfo)

　　功能：查询一个任务的所有信息

参数名 含义
  
pTaskInfo 其实是THUNDER_TASKINFO类型的结构指针，调用前把它转换为INT类型；调用后结构中将填充

平台信息，定义如下：

typedef struct \_THUNDER\_TASKINFO
  
{
  
CHAR szURL[1024]; // 任务URL，预先填充
  
BOOL bTaskExists; // 任务是否存在，TRUE为存在
  
CHAR szPath[256]; // 下载的本地保存路径
  
CHAR szFileName[256]; // 本地文件名
  
ULONGLONG nFileSize; // 文件大小
  
ULONGLONG nCompletedSize; // 已完成的大小
  
CHAR szPercent[16]; // 完成的百分数，用 “56.8”的格式
  
CHAR szStatus[16]; // 当前状态，定义同GetTaskInfo函数
  
} THUNDER_TASKINFO;

调用者先填充结构中的szURL成员，来指定需要查询的任务的URL，然后等函数返回后就可以从其他成员中

取得该任务的信息。
  
本例所有代码

Imports System
  
Imports System.Text
  
Public Class frmThunderClass frmThunder
  
Private _iStartMode As Integer &#8216;讯雷任务下载开始模式
  
Private ThunderEng As New THUNDERAGENTLib.Agent &#8216;创建讯雷调用对象
  
Private Sub frmThunder\_Load()Sub frmThunder\_Load(ByVal sender As System.Object, ByVal e As

System.EventArgs) Handles MyBase.Load
  
End Sub
  
Private Sub btnCancel\_Click()Sub btnCancel\_Click(ByVal sender As System.Object, ByVal e As

System.EventArgs) Handles btnCancel.Click
  
Close()
  
End Sub
  
&#8216;开始下载任务
  
Private Sub btnStartDown\_Click()Sub btnStartDown\_Click(ByVal sender As System.Object, ByVal

e As System.EventArgs) Handles btnStartDown.Click
  
Dim iOnlyFromOrigin, iOriginThreadCount As Integer
  
iOnlyFromOrigin = IIf(chkOnlyFromOrigin.Checked = True, 1, 0)
  
iOriginThreadCount = CInt(txtOriginThreadCounts.Text)
  
If chkDefault.Checked Then
  
iOriginThreadCount = -1
  
End If
  
ThunderEng.AddTask(txtURL.Text, txtSaveAsFileName.Text, txtSaveDir.Text, txtComment.Text, _
  
txtReferencePage.Text, _iStartMode, iOnlyFromOrigin, iOriginThreadCount)
  
ThunderEng.CommitTasks()
  
Timer1.Enabled = True
  
End Sub

Private Sub radMaual\_Click()Sub radMaual\_Click(ByVal sender As System.Object, ByVal e As

System.EventArgs) Handles radMaual.Click, radImmediate.Click, radDefault.Click
  
Dim rad As RadioButton = CType(sender, RadioButton)
  
_iStartMode = CInt(rad.Tag)
  
End Sub
  
&#8216;当任务开始时定时查询任务下载信息
  
Private Sub Timer1\_Tick()Sub Timer1\_Tick(ByVal sender As System.Object, ByVal e As

System.EventArgs) Handles Timer1.Tick
  
Dim sFileSize, sDownedSize, sStatus, sFileName, sPercent As String
  
Try
  
sStatus = ThunderEng.GetTaskInfo(txtURL.Text, &#8220;Status&#8221;)
  
sFileSize = ThunderEng.GetTaskInfo(txtURL.Text, &#8220;FileSize&#8221;)
  
sDownedSize = ThunderEng.GetTaskInfo(txtURL.Text, &#8220;CompletedSize&#8221;)
  
sFileName = ThunderEng.GetTaskInfo(txtURL.Text, &#8220;FileName&#8221;)
  
lblDownedSize.Text = String.Format(lblDownedSize.Tag, sDownedSize)
  
lblFileSize.Text = String.Format(lblFileSize.Tag, sFileSize)
  
lblTaskStatus.Text = String.Format(lblTaskStatus.Tag, sStatus)
  
lblFilename.Text = String.Format(lblFilename.Tag, sFileName)
  
sPercent = ThunderEng.GetTaskInfo(txtURL.Text, &#8220;Percent&#8221;) &#8216;获取下载百分比
  
lblProgress.Text = String.Format(lblProgress.Tag, sPercent.Remove(3, Len(sPercent) &#8211; 3))
  
Catch ex As Exception
  
End Try
  
End Sub
  
Private Sub chkOnlyFromOrigin\_CheckedChanged\_1()Sub chkOnlyFromOrigin\_CheckedChanged\_1(ByVal

sender As System.Object, ByVal e As System.EventArgs) Handles

chkOnlyFromOrigin.CheckedChanged
  
Panel1.Enabled = chkOnlyFromOrigin.Checked
  
End Sub
  
Private Sub GroupBox1\_Enter()Sub GroupBox1\_Enter(ByVal sender As System.Object, ByVal e As

System.EventArgs) Handles GroupBox1.Enter
  
End Sub
  
End Class

进入工具&#8211;配置&#8211;高级，把 通过IE右键菜单 “使用迅雷下载”添加任务 这个选项前面的勾去掉。
  
保持迅雷开启状态，这时候执行上面的脚本，就不会出现那个确认添加任务的对话框了。