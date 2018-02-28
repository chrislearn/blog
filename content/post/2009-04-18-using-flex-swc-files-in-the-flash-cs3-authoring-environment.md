---
title: 使Flex编译的swc文件在Flash下可用
author: chrislearn young
type: post
date: 2009-04-18T04:51:22+00:00
categories:
  - ActionScript
  - Flash
  - Flex
tags:
  - ActionScript
  - Flash
  - Flex

---
一直不明白如何将很多的类编译成一个swc文件，并且在Flash里可用，就像Google Map Flash API一样，今天终于找到了。**http://vincent.the.tsao.googlepages.com/** 这篇文章有很详细的说明。现转于此：

<div id="header">
  <div class="wrapper">
    <h3 id="page-title">
      <div id="g_title">
        Using Flex SWC Files in the Flash CS3 Authoring Environment
      </div>
    </h3>
    
    <p class="description">
      <div id="g_description">
        <p>
          by Vincent Tsao
        </p>
      </div></div> </div> 
      
      <p>
        <!-- /editable -->
        
        <!-- /wrapper -->
        
        <!-- /header -->
      </p>
      
      <div id="main-content">
        <div class="wrapper">
          <div class="content-item">
            <div id="g_body">
              <strong>Last updated:</strong> 24-August-2008</p> 
              
              <p>
                <strong>Problem</strong>
              </p>
              
              <p>
                Many API’s or code libraries written in ActionScript 3 and compiled into SWC files are meant for use with Flex tools and are unable to be imported into the Flash CS3 Authoring Environment.  This tutorial will show you how you can (theoretically) take any SWC made for Flex and use it in Flash CS3.
              </p>
              
              <p>
                <strong>Resources</strong>
              </p>
              
              <p>
                You will need the following programs/tools:
              </p>
              
              <ul>
                <li>
                  Flash CS3
                </li>
                <li>
                  Flex SDK 2.0.1 with Hotfix 3
                </li>
              </ul>
              
              <p>
                (note that we are intentionally NOT using Flex SDK 3.0)
              </p>
              
              <p>
                You can get Flex SDK 2.0.1 with Hotfix 3 here:<br /> <a href="http://labs.adobe.com/technologies/flex/sdk/flex2sdk.html" target="_blank">http://labs.adobe.com/technologies/flex/sdk/flex2sdk.html</a>
              </p>
              
              <p>
                <strong>Explanation</strong>
              </p>
              
              <p>
                If you just want the steps, you can skip down to the next section, but this describes why the method works.  When we say “Flex SWC”, what we really mean is a code-only SWC file which contains no DisplayObject components.  Only SWC files with a DisplayObject component can be imported into the Flash CS3 Authoring Environment.  Thus in order to make a Flex SWC usable in Flash CS3, we use the Flex SDK’s <strong>compc</strong> tool to statically link it with a stub SWC file generated in Flash CS3 that is a DisplayObject.  We require the Flex SDK 2.0.1 Hotfix 3 version of <strong>compc</strong> because Flex SDK 3.0’s <strong>compc</strong> utility generates SWC files of version 1.2 and Flash CS3 can only use SWC files of version 1.0.  More over, earlier versions of the Flex SDK 2.0.1 <strong>compc</strong> utility could not read SWC files compiled by the Flash CS3 authoring environment, thus the need for Hotfix 3.  So the newly compiled SWC file is actually two SWC files put into one – a DisplayObject SWC and the original Flex SWC and can therefore be used within Flash CS3.
              </p>
              
              <p>
                <strong>Steps</strong>
              </p>
              
              <p>
                <span style="text-decoration: underline;">Part I: Creating a Stub DisplayObject SWC in Flash CS3</span>
              </p>
              
              <ol>
                <li>
                  Create a new ActionScript 3 FLA file in Flash CS3.
                </li>
                <li>
                  Create a new symbol in the library (you do not need to create an instance of it), name it whatever you want.
                </li>
                <li>
                  Go into your library and right click on the symbol you just created.  Select “Component Definition…”
                </li>
                <li>
                  Type in whatever you want your component to be called as the class name (no spaces).
                </li>
                <li>
                  Under the options part, check all the boxes and ensure the minimum Flash Player is 9 and the minimum ActionScript version is 3.
                </li>
                <li>
                  Leave everything else alone, press OK.
                </li>
                <li>
                  Right click the symbol again in your library and select and select “Linkage…”
                </li>
                <li>
                  Check the “Export for ActionScript” box and the “Export in first frame” box should be automatically checked as well.
                </li>
                <li>
                  The class name should be the same name you gave it earlier.
                </li>
                <li>
                  Ensure the base class is indeed MovieClip, click OK.
                </li>
                <li>
                  Right click the symbol again in your library and select “Export SWC File…”
                </li>
                <li>
                  Pick a place to save it.
                </li>
              </ol>
              
              <p>
                <span style="text-decoration: underline;">Part II: Putting the two SWC Files Together</span>
              </p>
              
              <ol>
                <li>
                  Use the compc program to wrap what you have just created with the Flex SWC you want to use in the Flash CS3 authoring environment.  Here is a simple example:<code>compc -source-path+=. -output=bin\map_flash_1_6.swc  -include-libraries=.\GoogleMapsFlashAPI.swc,.\map_flex_1_6.swc</code>Note the above command is all on one line (no line breaks). The file “map_flash_1_6.swc” is the name we choose for the component we output. “GoogleMapsFlashAPI.swc” is the name of the SWC we created in Flash CS3 in Step 1 and “map_flex_1_6.swc” is the SWC you want to be able to use in Flash CS3.
                </li>
                <li>
                  Place your newly generated SWC file in your Flash components folder. It should be something like “\Adobe Flash CS3\en\Configuration\Components\”. If you are unsure where this is located on your computer, Google it.
                </li>
                <li>
                  Open the FLA file you want to import the SWC into and open the Components panel (Ctrl+F7 in Windows).
                </li>
                <li>
                  Reload the Components panel if necessary.
                </li>
                <li>
                  Drag your SWC file into your library (note: that there does NOT need to be an instance of the SWC on your stage since it would be useless).
                </li>
              </ol>
              
              <p>
                Please let me know if this does not work.<br /> My contact is vincent.the.tsao [&#8211;at&#8211;] gmail [&#8211;dot&#8211;] com
              </p>
            </div>
          </div>
        </div>
      </div>