---
title: '[转] unexpected error creating debug information'
author: chrislearn young
type: post
date: 2011-05-28T09:39:39+00:00
categories:
  - 'CSharp'
tags:
  - VS

---
I keep running into this issue in my multi-project VS.NET solutions.  For some reason, something is locking the dll(s) in the /obj/ folder of library components.  The fix that I have at the moment is as follows:

  1. Shut down VS.NET
  2. Browse to the project in windows explorer
  3. Delete the /obj/ folder.
  4. Delete the project outputs (.dll and .pdb) from /bin (not sure this step is necessary)
  5. (can&#8217;t hurt, might help) &#8212; delete the project outputs from any other project /bin folders in the solution that is having issues.
  6. Restart VS.NET
  7. Rebuild
  8. Laugh the next time you hear that DLL Hell is no more in .NET&#8230;

Update: Just deleting /obj/ after closing VS.NET does it.  [Ambrose][1] pointed me to [prcview.exe][2]and that demonstrated that it is in fact devenv.exe locking the file, so it&#8217;s VS.NET&#8217;s own fault, not Index Server or anything else that is to blame.

&nbsp;

 [1]: http://aspalliance.com/ambrose/
 [2]: http://www.prcview.com/