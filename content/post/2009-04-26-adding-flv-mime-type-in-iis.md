---
title: Adding .FLV MIME Type in IIS
author: chrislearn young
type: post
date: 2009-04-26T02:09:54+00:00
categories:
  - Flash
tags:
  - IIS

---
.FLV files are already the best method for publishing video on the web, and are sure to become even better with the new enhancements in Flash 8. When serving .flv files off of a Windows Server 2003 (or any other Windows server I would imagine) requires setting up the MIME type on the server first (it isn&#8217;t one of the native MIME types on MS servers).

<!--more-->
You can figure out easily if your server is configured to support .flv files by posting a .flv file on a server and navigating to the URL of that .flv in a browser. If you see a LONG string of garbage on the screen, your server isn&#8217;t set up for .FLVs and needs to have the MIME type set up.

Adding .flv MIME type in IIS

1) Select the site to configure in IIS, right click and select &#8220;Properties&#8221;
  
2) Under HTTP Headers Tab, select &#8220;File Types&#8221; under the MIME Map section and select &#8220;New Type&#8221;
  
3) Type &#8220;.flv&#8221; as the associated extension and &#8220;video/x-flv&#8221; as the content type.
  
4) Select &#8220;OK&#8221; and you&#8217;re ready to fly!