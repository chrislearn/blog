---
title: "Ubuntu-Server启动错误修复"
date: 2018-08-28
categories:
  - 程序开发
tags:
  - Ubuntu
  - 服务器维护
---
前两天服务器(Ubuntu 18.04.1)重启后出现了这个严重错误, 导致系统无法启动:

<!--more-->
<code>
error: file ‘/grub/i386-pc/normal.mod’ not found
</code>

操作系统用的文件系统使用了LVM, 具体修复过程如下;

- 从安装盘启动系统, 进入修复模式. 不知道为何, 我的选项中不存在 "Rescue a broken system". 直接按下 ALT+F4 进入命令行.
![rescue-grub.png](rescue-grub.png)

- 安装LVM, 貌似已经默认安装好了.
  {{<highlight bash>}}
  sudo apt-get install lvm2{{</highlight>}}

- 找到分卷组的名字:
  {{<highlight bash>}}
  sudo vgdisplay{{</highlight>}}

- 让分卷组可用:
  {{<highlight bash>}}
  sudo vgchange -ay name-of-vg{{</highlight>}}

- 挂载 root 和 boot 文件系统, name-of-vg 为上一步显示的名称, name-of-root-lv 一般为 root, name-of-boot-partition 我的服务器上是 sda1:
  {{<highlight bash>}}
  sudo mount /dev/name-of-vg/name-of-root-lv /mnt
  sudo mount /dev/name-of-boot-partition /mnt/boot
  {{</highlight>}}
  可以通过这些命令确定文件系统:
  {{<highlight bash>}}
  sudo fdisk -l
  sudo blkid
  df -Th
  {{</highlight>}}

- 加载关键虚拟文件系统:
  {{<highlight bash>}}
  for i in /dev /dev/pts /proc /sys /run; do sudo mount -B $i /mnt$i; done
  {{</highlight>}}

- 更改系统的 root 路径:
  {{<highlight bash>}}
  sudo chroot /mnt{{</highlight>}}

- 重新安装 GRUB2, 文件系统名不包含分区编号. 这里的 sdX 在我的服务器上是 sda.
  {{<highlight bash>}}
  grub-install /dev/sdX{{</highlight>}}

- 重新创建 GRUB2 的菜单:
  {{<highlight bash>}}
  update-grub{{</highlight>}}

- 按 CTRL-D 退出 chroot, 然后重启服务器:
  {{<highlight bash>}}
  sudo reboot{{</highlight>}}