---
title: '[转]Windows Plesk I cannot connect to the MySQL database as root/admin'
author: chrislearn young
type: post
date: 2013-03-06T10:58:22+00:00
categories:
  - 程序开发
tags:
  - MYSQL

---
Windows Plesk I cannot connect to the MySQL database as root/admin
  
Solution Regretfully, MySQL is pre-installed by Plesk without the old-passwords functionality set true.

But the Plesk installer populates the admin user with a password encrypted in the old style!

To fix this you will need to enter your server with Remote Desktop and edit the follwoing file:

C:\SWSoft\Plesk\Databases\MySQL\Data\my.ini

There is a section in that file [mysqld]

Under the line starting &#8220;[mysqld]&#8221; add the following line:

old_passwords=1

so it looks like this:

[mysqld]
  
old_passwords=1

Now restart the MySQL service in the services manager.

You should now be able to manage MySQL with the user &#8220;admin&#8221; and the password is the same as your Plesk login. In some cases the password may still be set to the original password which is &#8220;setup&#8221;.

If you still cannot log into the MySQL server then you will need to start the MySQL server with skip-grant-tables enabled.

Stop the MySQL service in the services manager.

Edit the my.ini file:

C:\SWSoft\Plesk\Databases\MySQL\Data\my.ini

Add &#8220;skip-grant-tables&#8221; to the [mysqld] section like so:

[mysqld]
  
old_passwords=1
  
skip-grant-tables

Now restart the MySQL service.

Now log into MySQL with the following command:

C:\SWSoft\Plesk\Databases\MySQL\bin\mysql &#8220;mysql&#8221;

At the MySQL prompt set the admin password:

mysql> select mysql
  
mysql> update user set password=password(&#8216;new_password&#8217;) where user=&#8217;admin&#8217;;

Where &#8220;new_password&#8221; is the password of the PLESK admin login.

type &#8220;exit&#8221; at the MySQL prompt and then edit the my.ini file again and remove the line: skip-grant-tables

Now restart the MySQL service.

Your MySQL admin password has now been re-set.