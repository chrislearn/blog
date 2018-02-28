---
title: Silverlight中遮罩及其动画制作（Clip Path）
author: chrislearn young
type: post
date: 2010-05-30T09:14:50+00:00
categories:
  - Silverlight
tags:
  - Blend
  - Silverlight

---
Silverlight里的遮罩动画不是很好做的，这篇文章有介绍如何制作遮罩及动画，不过还是比不上Flash里的好用，而且个人认为还是有很大的距离呢。

<!--more-->
原文网址：<a href="http://blogs.msdn.com/b/expression/archive/2008/01/21/clip-path-editing-and-animating-in-blend-2.aspx" target="_blank">http://blogs.msdn.com/b/expression/archive/2008/01/21/clip-path-editing-and-animating-in-blend-2.aspx</a>

<div>
  <p>
    Due to popular demand we have added the clip path editing/animating feature to Blend 2. Clip path editing works for both WPF and Silverlight 1.0 projects. You can download the <a href="http://www.microsoft.com/expression/products/download.aspx?key=blend2preview">December Preview</a> to test out the new features! In this post, I will go through some of the interesting things you can do with this feature!
  </p>
  
  <p>
    <span><strong>What is a Clipping Path?</strong></span><br /> A clipping path is a path or shape that is applied to another object, hiding the portions of the masked object that fall outside of the clipping path. For example, the following image shows you a separate individual image and text object on the left, but thanks to clipping paths, on the right you have just the image object with everything outside of the Seattle text hidden:
  </p>
  
  <p>
    <img src="http://blogs.msdn.com/blogfiles/expression/WindowsLiveWriter/ClipPathEditingandAnimatinginBlend2_9676/seattle_3.jpg" border="0" alt="seattle" width="499" height="187" />
  </p>
  
  <p>
    <span><strong>Using a Path Object to Apply a Clipping Path</strong></span><br /> Let&#8217;s take a quick look at how to use clipping paths in Blend:
  </p>
  
  <ol>
    <li>
      With the <strong>selection tool</strong> select the path or shape that you want to turn into a clipping path, hold CTRL, and then select the object that you want to clip. (Make sure that the clipping path object is in front of (in Z order) the object that you intend to clip.)
    </li>
    <li>
      On the <strong>Object</strong> menu, point to <strong>Path</strong>, and click <strong>Make Clipping Path</strong>. You can also right click on the two selected objects and select <strong>Make Clipping Path</strong> under the <strong>Path</strong> options.
    </li>
  </ol>
  
  <p>
    The left image below shows the path overlaid on our image, and on the right, you see the image visible through the region created by our path:
  </p>
  
  <p>
    <img src="http://blogs.msdn.com/blogfiles/expression/WindowsLiveWriter/ClipPathEditingandAnimatinginBlend2_9676/clipPathImage_95268f65-bcf6-448f-ae94-1d9b6c3e84bb.jpg" border="0" alt="clipPathImage" width="467" height="190" />
  </p>
  
  <p>
    <span><strong>Editing a Clipping Path</strong></span><br /> You just saw how to apply a clipping path, so let&#8217;s next look at how you would edit a clipping path. In Blend 2 you now have all path editing capabilities used to edit regular paths applicable to editing clipping paths as well.
  </p>
  
  <ol>
    <li>
      Select the object with the clipping path applied. In this case you select the Image object.
    </li>
    <li>
      Select the <strong>direct selection</strong> tool. Note that the clipping path is displayed as the purple outline. The clipping path consists of points and segments just like a regular path.
    </li>
    <li>
      Click and drag a segment on the clipping path to edit as you would a path object. You will be able to edit the clipping path by using the same artboard gestures and keyboard shortcuts associated with path editing.
    </li>
  </ol>
  
  <p>
    The following image shows you how manipulating the path preserves the overall masking efffect that we expect:
  </p>
  
  <p>
    <img src="http://blogs.msdn.com/blogfiles/expression/WindowsLiveWriter/ClipPathEditingandAnimatinginBlend2_9676/editingClippingPath_a12440bd-ea85-4ef5-91d3-afd13f113f1a.jpg" border="0" alt="editingClippingPath" width="498" height="200" />
  </p>
  
  <p>
    <span><strong>Releasing a Clipping Path</strong></span><br /> You saw how to create a clipping path, and you also saw how to edit a clipping path. Let&#8217;s look at how to actually release a clipping path. It&#8217;s pretty straightforward:
  </p>
  
  <ol>
    <li>
      Select the object that is being clipped.
    </li>
    <li>
      On the Object menu, point to Path, and then click Release Clipping Path.
    </li>
  </ol>
  
  <p>
    Note: In Blend 1 you only had the option of removing the clipping path, and that would remove the original clipping object from the artboard. This behavior has been improved in Blend 2 by allowing you to release the clipping path without removing the clipping object!
  </p>
  
  <p>
    <span><strong>Animating a Clipping Path</strong></span><br /> In Blend 2, along with being able to edit clipping paths you can also use the full animation capabilities used to animate regular paths to animate clipping paths as well. You can also take advantage of the structure changes supported by vertex animation.
  </p>
  
  <p>
    Let&#8217;s look at that in greater detail:
  </p>
  
  <ol>
    <li>
      Select the object with the clipping path applied. In this case you select the Image object.
    </li>
    <li>
      Add a storyboard in the <strong>Objects and Timeline</strong> panel.
    </li>
    <li>
      Select the direct selection tool. Note that you can single click any point or segment to select or you can double click the clipping path to select all of the points and segments to move them all at once.
    </li>
    <li>
      You can then use the vertex animation features to create interactive animations with the clipping path.
    </li>
  </ol>
  
  <p>
    As seen in the following image, you can apply vertex animations to clipping paths. This can be used to easily create interactivity such as the “spotlight effect”:
  </p>
  
  <p>
    <img src="http://blogs.msdn.com/blogfiles/expression/WindowsLiveWriter/ClipPathEditingandAnimatinginBlend2_9676/animatingClippingPath_d79547f9-8fdf-4fd8-b2a4-d78456b8ca41.jpg" border="0" alt="animatingClippingPath" width="483" height="231" />
  </p>
  
  <p>
    <span><strong>Interop with Design</strong></span><br /> You currently have the ability to import files into Blend created with Expression Design with clipping paths or copy/pasting objects with clipping paths applied from Design->Blend.
  </p>
  
  <p>
    In Blend 2 we also support editing/animating of these clipping paths. Below is an example of me creating a clipping path in Expression Design:
  </p>
  
  <p>
    <img src="http://blogs.msdn.com/blogfiles/expression/WindowsLiveWriter/ClipPathEditingandAnimatinginBlend2_9676/texas_fb51d2b6-1d47-4d26-9d3f-4a09ff9be554.jpg" border="0" alt="texas" width="472" height="190" />
  </p>
  
  <p>
    To import an object with a clipping path from Expression Design to Blend 2 you can simply copy the element from Design and paste it into a Blend project. Below is an example of an image object from Design pasted into a Blend 2 Silverlight 1.0 project.
  </p>
  
  <p>
    <img src="http://blogs.msdn.com/blogfiles/expression/WindowsLiveWriter/ClipPathEditingandAnimatinginBlend2_9676/blend2DecPreview_CP_f9feb0c9-a223-4e0f-8695-bdae78555b73.jpg" border="0" alt="blend2DecPreview_CP" width="460" height="228" />
  </p>
  
  <p>
    <span><strong>Conclusion</strong></span><br /> As you can see you can create a variety of visual and interactive effects by creating, editing, and animating clipping paths in Blend 2. Give the features a try and let us know if you have any feedback!
  </p>
  
  <p>
    Happy Blending!<br /> Janete Perez
  </p>
</div>