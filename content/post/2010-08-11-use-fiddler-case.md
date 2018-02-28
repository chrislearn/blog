---
title: '[转]使用Fiddler提高前端工作效率 (实例篇)'
author: chrislearn young
type: post
date: 2010-08-11T04:25:33+00:00
categories:
  - 其它
tags:
  - Fiddler

---
<img src="http://www.aliued.cn/wp-content/uploads/2010/04/fiddler-title.jpg" alt="fiddler-title" width="680" height="240" />

在[上一篇（介绍篇）][1]中，我们对[Fiddler Web Debugger][2]有了简单的接触，也许你已经开始在用Fiddler进行HTTP相关的调试，在这一篇，我们将通过一个实例了解Fiddler的神奇魔法。

在我们前端开发的日常工作中，发现服务器上某个css/javascript文件有问题，需要修改，那真是家常便饭。通常，我们需要将文件进行修 改，然后重新发布再验证，这样就很容易影响到生产环境的稳定性。更普遍的做法是，我们在开发环境中修改文件并验证，然后发布到生产环境。虽然安全，却比较 繁琐。而利用Fiddler的可以修改HTTP数据的特性，我们就非常敏捷地**基于生产环境**修改并验证，确认后再发布。

假设我们发现<a href="http://www.aliued.cn/?p=2335" target="_blank">这个页面</a>有问题，需要修改所引用的js文件（<http://www.aliued.cn/wp-includes/js/comment-reply.js?ver=20090102>）。

### 第一步：用Fiddler查看页面的数据流列表，找到这个js文件的session

<img src="http://www.aliued.cn/wp-content/uploads/2010/04/image_thumb2.png" alt="image_thumb" width="502" height="122" />

> tip: 最好是没有缓存的返回内容（Result Code是200），这样可以进行下一步的保存。不是200也没关系，你只要本地硬盘上有这个文件就好了。

### 第二步：将js文件保存到本地（如果本地已经有这个文件，可以跳过这步）

<img src="http://www.aliued.cn/wp-content/uploads/2010/04/image11.png" alt="image1" width="573" height="345" />

在这个js session上右键点击，选择“Save – Response –Response Body…”，将js文件的内容保存到本地。记住存的位置，下面我们会用到这个保存下来的文件。

### 第三步：开启Fiddler的请求自动重定向功能

<img src="http://www.aliued.cn/wp-content/uploads/2010/04/image21.png" alt="image2" width="473" height="382" />

打开AutoResponder标签设置。有没有看到界面上有两个复选框？第一个的作用是开启或禁用自动重定向功能，我们就可以在下面添加重定向规则了。第二个复选框框勾上时，不影响那些没满足我们处理条件的请求。

### 第四步：创建重定向规则，将目标是这个js的HTTP请求重定向到本地文件

我们可以通过“Add…”按钮手动添加规则，不过这个URL已经出现在我们的session列表中，可以直接拖动过来。在左侧的Session列表中选择第一步找到的session，拖动到AutoResponse标签中。这样就创建了一个针对这个URL的规则。

<img src="http://www.aliued.cn/wp-content/uploads/2010/04/image31.png" alt="image3" width="463" height="44" />

Fiddler帮我们生成的规则是：

  * 当URL为：[http://www.aliued.cn/wp-includes/js/comment-reply.js?ver=20090102][3]
  * 返回200，使用和Session 4一模一样的内容返回

我们需要修改这个规则，

<img src="http://www.aliued.cn/wp-content/uploads/2010/04/image_thumb11.png" alt="image_thumb1" width="467" height="337" />

选择“Find a file…”，就可以选择本地的文件作为返回的body内容。

<img src="http://www.aliued.cn/wp-content/uploads/2010/04/image51.png" alt="image5" width="563" height="420" />

选择我们刚刚保存下来的文件。

刷新一下浏览器页面，看一下session列表，如果像下面这样，这个session的底色是灰色的，那么恭喜你，你已经成功将这个请求重定向到本地文件了！

<img src="http://www.aliued.cn/wp-content/uploads/2010/04/image61.png" alt="image6" width="503" height="172" />

> tip: 如果浏览器用的是Firefox，记得先清一下临时文件缓存，因为Firefox是真正的缓存，当判断文件的缓存还未过期时，就不会再发请求出来，Fiddler就获取不到了。

### 第五步：修改本地文件，进行测试

我们在本地的js文件中加一句alert(‘hello’)

<img src="http://www.aliued.cn/wp-content/uploads/2010/04/image71.png" alt="image7" width="511" height="386" />

刷新浏览器，看看效果，如果alert出来，那就成功了。

继续修改这个文件并测试，成功修复问题后，我们就可以发布修改后的文件了。

小结：自动重定向功能是Fiddler最实用的功能，这里的Rule可以自由地设定，可以使用搜索（默认）、精确匹配（EXACT）、正则表达式匹 配（REGEX）。处理方式可以选择使用文件，也可以选择合适的时间暂停数据流（\*bpu、\*bpafter），人工干预。通过以上几个步骤，我们演示了 怎样将HTTP请求重定向到本地的文件，进行web调试。这种调试方式不需要发布到线上再验证，避免了修改不成功、对用户造成影响的风险，而且不需要搭建 复杂的开发服务器等开发环境，非常适合快速web调试。

 [1]: http://www.aliued.cn/?p=2567
 [2]: http://www.fiddler2.com/fiddler2/
 [3]: http://www.aliued.cn/wp-includes/js/comment-reply.js?ver=20090102 "http://www.aliued.cn/wp-includes/js/comment-reply.js?ver=20090102"