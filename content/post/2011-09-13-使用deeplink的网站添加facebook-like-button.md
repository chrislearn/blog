---
title: 使用DeepLink的网站添加Facebook Like Button
author: chrislearn young
type: post
date: 2011-09-13T09:34:20+00:00
categories:
  - 程序开发
tags:
  - Asp.net
  - Facebook
  - HTML
  - IFrame
  - JavaScript
  - Like Button

---
这年头使用DeepLink的网站越来越多了，像Flash整的网站，本身在一个页面里，DeepLink是必须的，国外的Flash基本都有这个功能，不过。。。国内这样的网站就差多了，基本不加，无法根据URL导航到特定的内容页，相当得不好用呢。

而现在Ajax之后，Html5也进入实际的使用了，这样的网站很多也不再没事就刷新页面，白一下屏，多不爽，也都是使用DeepLink了。但是这样的网站想使用Facebook Like Button这样的按钮时，有些个麻烦了。

Facebook Like Button 的代码是这样子的：

<pre class="brush:xml">&lt;div id="fb-root"&gt;&lt;/div&gt;
&lt;script&gt;(function(d){
  var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = "//connect.facebook.net/en_US/all.js#appId=272021599483200&xfbml=1";
  d.getElementsByTagName('head')[0].appendChild(js);
}(document));&lt;/script&gt;
&lt;div class="fb-like" data-href="http://www.chrislearn.im" data-send="true" data-width="450" data-show-faces="true"&gt;&lt;/div&gt;</pre>

这里的data-href就是Like的网站地址，Facebook会到这个页面去查找相应的og:title, og:description等等的值，然后将这个显示出来。但是，用DeepLink的网站因为页面没有刷新，因此，og:title这样的值是不会改变的，即使是用js改变它，也是没用的，Facebook不认识js.
  
我想到的一个解决办法是：
  
1. 修改这个script代码，原因是我想用js修改data-href的值。如果不改这个js,似乎这个js代码不会重复执行，即使改了data-href的值也不会有什么变化。大致上是移除这里的 script代码，用类似下面的代码代替， 并且在修改完data-href值后执行这个函数。

<pre class="brush:js">function createFacebookSdk() {
    var js, id = 'facebook-jssdk'; $('#'+id).remove();
    js = document.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js#appId=219934971396743&xfbml=1";
    $('head')[0].appendChild(js);
}</pre>

2. 在每次地址的锚点部分改变后，改变data-href的值。比如http://www.chrislearn.im/#/level0/这个地址时，把data-href的值改成:http://www.chrislearn.im/?path=level0&title=demo&description=des.并且重新调用createFacebookSdk方法，重新生成like button按钮。
  
3. 下面就是服务器端了，服务器端页面可以根据查询字符串来修改og:title这样的值。因为服务器端修改的，因此Facebook可以取到这些个值。但是我们的网页其实是根据#/level0/部分来显示内容的，我并不想再整一个解析查询字符串的js函数，所以，可以在服务器端可以向页面写入一个location=&#8221;http://www.chrislearn.im/#/level0/“的javascript的脚本块，让页面转向。下面是我一个项目里的一小段服务器端代码：

<pre class="brush:csharp">public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            string year = Request.QueryString["year"];
            string index = Request.QueryString["index"];
            if (!String.IsNullOrEmpty(year) && !String.IsNullOrEmpty(index))
            {
                string redirect = String.Format("window.location=\"Default.aspx#/{0}/{1}/\";", year, index);
                Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "RedirectByQueryString", redirect, true);

                OGTitle.Attributes["content"] = Request.QueryString["title"];
                OGDescription.Attributes["content"] = Request.QueryString["description"];
            }
        }
    }
}</pre>

OK了，大功告成。还有一点，Facebook的like button最后是以iframe来呈现，这样一个额外的好处是，容易浮到flash,silverlight上面。