---
title: Reset Identity Column Value in SQL Server (转)
author: chrislearn young
type: post
date: 2009-07-21T14:28:41+00:00
categories:
  - SQL

---
If you are using an identity column on your SQL Server tables, you can set the next insert value to whatever value you want. An example is if you wanted to start numbering your ID column at 1000 instead of 1.

It would be wise to first check what the current identify value is. We can use this command to do so:

<!--more-->
```
DBCC CHECKIDENT (’tablename’, NORESEED)
```

For instance, if I wanted to check the next ID value of my orders table, I could use this command:

```
DBCC CHECKIDENT (orders, NORESEED)
```

To set the value of the next ID to be 1000, I can use this command:

```
DBCC CHECKIDENT (orders, RESEED, 999)
```

Note that the next value will be whatever you reseed with + 1, so in this case I set it to 999 so that the next value will be 1000.

Another thing to note is that you may need to enclose the table name in single quotes or square brackets if you are referencing by a full path, or if your table name has spaces in it. (which it really shouldn’t)

```
DBCC CHECKIDENT ( ‘databasename.dbo.orders’,RESEED, 999)
```