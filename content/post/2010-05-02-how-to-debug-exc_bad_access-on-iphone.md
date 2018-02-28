---
title: how to debug EXC_BAD_ACCESS on iPhone
author: admin
type: post
date: 2010-05-02T07:32:45+00:00
categories:
  - iPhone
  - Objective-C
tags:
  - iPhone
  - Objective-C

---
<a href="http://www.codza.com/how-to-debug-exc_bad_access-on-iphone" target="_blank">http://www.codza.com/how-to-debug-exc_bad_access-on-iphone</a>

EXC\_BAD\_ACCESS. Debugging this one is on par with figuring out why the wife says “not tonight, honey.” And they are equally unfortunate situations.

Let’s see what we can do about EXC\_BAD\_ACCESS.

EXC\_BAD\_ACCESS happens when a message is sent to an object that has already been released. By the time the error is caught, the call stack is usually gone especially if dealing with multiple threads.

How nice would it be to keep a dummy around after the object is released that could stop execution, tell us what message was sent and show us the call stack… well, there’s a way to do just that.

If you set the NSZombieEnabled environment variable, the Objective C runtime will leave a dummy object behind for every deallocated object. When the zombie object is called, execution stops and you can see the message that was sent to the object and the call stack that tells you where the message came from (it doesn’t tell you where you over released the object, but knowing where the object is called from should get you pretty close to the problem.)

To set this variable, go to the info panel of the executable in xcode, and create a new **environment variable** in the **arguments** tab by clicking the plus sign in the lower left corner of the window. Name the variable **NSZombieEnabled**, type **YES** for the value and make sure that the checkbox is selected.

<div id="attachment_198">
  <a href="http://www.codza.com/wp-content/uploads/2009/03/exc_01_execinfo.png"><img title="exc_01_execinfo" src="http://www.codza.com/wp-content/uploads/2009/03/exc_01_execinfo-300x250.png" alt="set NSZombieEnabled variable" width="300" height="250" /></a></p>
</div>

Go ahead and run your program now (in debug mode, because you need the stack information.) When the over released object is accessed, you get an error message similar to this (xcode debug view):

<pre>2009-03-30 02:30:36.172 ninjaJumper[3997:20b] *** -[GameLayer retain]: message sent
to deallocated instance 0x59bf670</pre>

This shows the class of the object (GameLayer) and the message sent (retain).

Let’s take a look at the stack now:

<div id="attachment_199">
  <a href="http://www.codza.com/wp-content/uploads/2009/03/exc_03_stack.png"><img title="exc_03_stack" src="http://www.codza.com/wp-content/uploads/2009/03/exc_03_stack-300x123.png" alt="call stack" width="300" height="123" /></a>call stack</p>
</div>

The methods printed in **bold** are in your code, the others are in some other API. Here you can see that the object was accessed from [Director touchesBegan:withEvent], where an array was copied (most likely the over released object was in the array.)

This information should get you pretty close to the problem.

Once the problem is fixed, make sure that the NSZombieEnabled variable is disabled. You don’t need to delete it, but make sure that the checkbox is unchecked:

<div id="attachment_200">
  <a href="http://www.codza.com/wp-content/uploads/2009/03/exc_05_nonszombie.png"><img title="exc_05_nonszombie" src="http://www.codza.com/wp-content/uploads/2009/03/exc_05_nonszombie.png" alt="NSZombie disabled" width="259" height="131" /></a>NSZombie disabled</p>
</div>

Now about the wife. Good luck there. Try a box of chocolate or load the dishwasher for a couple days.