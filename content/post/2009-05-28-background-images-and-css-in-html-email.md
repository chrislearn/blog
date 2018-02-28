---
title: Background Images and CSS in HTML Email
author: chrislearn young
type: post
date: 2009-05-28T04:33:56+00:00
categories:
  - CSS
  - HTML
tags:
  - CSS
  - HTML

---
http://www.mailchimp.com/blog/background-images-and-css-in-html-email/

We’ve noticed a few people having issues with background images in their HTML email designs, so we thought we’d post some quick tips here.

Lots of email applications (especially the browser-based ones, like Yahoo!Mail, Hotmail and Gmail) strip out your , 

<head>
  and  tags. It kinda makes sense, if you think about it. They’re displaying your email inside their web page. They don’t want your page settings (like background colors, files, CSS, etc) to interfere with their overall interface. So they strip it all out.</p> 
  
  <p>
    That means you’ll kinda have to rig your HTML email to make certain things work…
  </p>
  
  <p>
    Background Images and colors in HTML Email
  </p>
  
  <p>
    If you want to set a background image or color in your HTML email, you can set it in your BODY tag, where it usually goes. That’ll work ok for some desktop email applications, like Microsoft Outlook.
  </p>
  
  <p>
    But to make it work across more email applications, you need to “rig” your code so that your entire email is set inside a big TABLE WRAP. Just set a big table that’s 100% wide, then specify your background color and image there. We recommend doing it the old-fashioned “bgcolor” or “background=”&#8221; way. If you prefer doing it with CSS, be sure to read the “CSS” tips below. As with all images in HTML email, they need to be hosted on your server, and you need to point to them with absolute (not relative) paths.
  </p>
  
  <p>
    Once you’ve created the big TABLE WRAP with your background color or image, place your actual newsletter code inside, and you’re good to go.
  </p>
  
  <p>
    If you’re a very experienced web designer, this will no doubt make you feel dirty, and make you want to take a shower immediately afterwards. But HTML email isn’t as reliable as web pages are (yet) and there are way too many email apps out there that display HTML differently. Until all the various email apps get a little more consistent, you’re going to have to get used to “rigs” like this.<br /> CSS in HTML Email
  </p>
  
  <p>
    There are all sorts of “CSS tips and tricks for HTML email.” But the main thing to remember is that the 
    
    <head>
      and  tags get stripped when HTML email is displayed in browser based applications. So that means you can’t link to an external CSS file from the 
      
      <head>
        portion of your email. You’ll need to use embedded or inline CSS in HTML email instead. And, if you take the embedded approach, be sure to place all your code BELOW the  tag. Place it just above your content. Feels dirty, I know. But it’s the only way to get CSS to work (reliably) in email.</p> 
        
        <p>
          Periods = “Stop Email!”<br /> If you start any line in your email with a “period,” some email servers interpret that as “end of message” and they’ll stop it right there. D’oh! So this affects how you need to code your CSS. When you embed your CSS, be careful with the little “dots” or “periods” that are used to define styles. If you start your line of CSS with “.header” for instance, that’s exactly where some email servers will cut your message off. So in your CSS, add a space before every single line that starts with a period.
        </p>
        
        <p>
          It’s not just a CSS thing. It’s any line that starts with a period (see our previous post). But the CSS portion of your email is more likely to have lines that start with periods, so it’s good to mention it here.
        </p>