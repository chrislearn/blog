---
title: Problem Opening .pbk file in windows 7
author: chrislearn young
type: post
date: 2011-08-19T03:03:50+00:00
categories:
  - Windows
  - 其它
  - 软件使用

---
Some users have problem opening .pbk (vpn) file in windows 7!
  
if you have Adobe Pixel Bender then the .pbk files will open using the Adobe Pixel Bender!
  
if you still want to open pbk files as VPN connection (with Windows Remote Access Phonebook)
  
Please follow the steps below:

1. Launch Notepad.
  
2. Copy the following content into Notepad.

Windows Registry Editor Version 5.00

[HKEY\_CLASSES\_ROOT\.pbk]
  
@=&#8221;pbkfile&#8221;

3. Save to Desktop with the name .pkb.reg.
  
4. Launch the saved file from Desktop to modify the registry to change the file association.

If the issue still occurs, please follow the steps below.

1. Launch Notepad.
  
2. Copy the following content into Notepad.

Windows Registry Editor Version 5.00

[HKEY\_CLASSES\_ROOT\pbkfile]
  
@=&#8221;Dial-Up Phonebook&#8221;
  
&#8220;FriendlyTypeName&#8221;=hex(2):40,00,25,00,53,00,79,00,73,00,74,00,65,00,6d,00,52,\
  
00,6f,00,6f,00,74,00,25,00,5c,00,73,00,79,00,73,00,74,00,65,00,6d,00,33,00,\
  
32,00,5c,00,72,00,61,00,73,00,64,00,6c,00,67,00,2e,00,64,00,6c,00,6c,00,2c,\
  
00,2d,00,33,00,35,00,33,00,00,00

[HKEY\_CLASSES\_ROOT\pbkfile\DefaultIcon]
  
@=hex(2):25,00,53,00,79,00,73,00,74,00,65,00,6d,00,52,00,6f,00,6f,00,74,00,25,\
  
00,5c,00,73,00,79,00,73,00,74,00,65,00,6d,00,33,00,32,00,5c,00,72,00,61,00,\
  
73,00,64,00,6c,00,67,00,2e,00,64,00,6c,00,6c,00,2c,00,2d,00,35,00,36,00,32,\
  
00,00,00

[HKEY\_CLASSES\_ROOT\pbkfile\Shell]

[HKEY\_CLASSES\_ROOT\pbkfile\Shell\open]

[HKEY\_CLASSES\_ROOT\pbkfile\Shell\open\command]
  
@=hex(2):25,00,53,00,79,00,73,00,74,00,65,00,6d,00,52,00,6f,00,6f,00,74,00,25,\
  
00,5c,00,73,00,79,00,73,00,74,00,65,00,6d,00,33,00,32,00,5c,00,72,00,61,00,\
  
73,00,70,00,68,00,6f,00,6e,00,65,00,2e,00,65,00,78,00,65,00,20,00,2d,00,66,\
  
00,20,00,22,00,25,00,31,00,22,00,00,00

3. Save to Desktop with the name .pkb.reg.
  
4. Launch the saved file from Desktop to modify the registry to change the file association.