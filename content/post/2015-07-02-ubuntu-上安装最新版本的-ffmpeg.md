---
title: Ubuntu 上安装最新版本的 ffmpeg
author: chrislearn young
type: post
date: 2015-07-02T02:29:01+00:00
categories:
  - Linux
  - 软件使用
tags:
  - ffmpeg
  - Ubuntu

---
Install FFmpeg 2.7 Multimedia Framework and convert multimedia files on Linux Ubuntu Systems. Install FFmpeg 2.7 on Ubuntu 15.04, Ubuntu 14.04 and Derivatives. Below are the Terminal commands to upgrade to FFmpeg 2.7 on Linux.

FFmpeg 2.7 is a popular cross-platform solution to record, convert and stream audio and video. It includes libavcodec – the leading audio/video codec library.

#### FFmpeg 2.7 on Ubuntu 15.04

Run the following commands in Terminal to install FFmpeg 2.7 on Ubuntu 15.04, Ubuntu 14.04, Linux Mint 17.2, Linux Mint 17.1, Linux Mint 17 and Derivatives:
  
`<br />
$ sudo apt-add-repository ppa:samrog131/ppa<br />
$ sudo apt-get update<br />
$ sudo apt-get install ffmpeg-real<br />
$ sudo ln -sf /opt/ffmpeg/bin/ffmpeg /usr/bin/ffmpeg<br />
` 

If you wish to uninstall and remove the FFmpeg 2.7 from Linux Ubuntu Systems, run the following command in Terminal:
  
`<br />
$ sudo apt-get remove ffmpeg<br />
$ sudo rm /opt/ffmpeg/bin/ffmpeg /usr/bin/ffmpeg<br />
` 

#### Install FFmpeg on Debian 8.0 Jessie

Run the following commands in Terminal to install FFmpeg 2.7 on Debian 8.0 Jessie:
  
`<br />
$ sudo sh -c 'echo "deb http://www.deb-multimedia.org jessie main" >> /etc/apt/sources.list'<br />
$ sudo apt-get update<br />
$ sudo apt-get install deb-multimedia-keyring<br />
$ sudo apt-get install ffmpeg<br />
` 

If you wish to uninstall and remove the FFmpeg 2.7 from Debian 8.0 Jessie, run the following command:
  
`<br />
$ sudo apt-get remove ffmpeg<br />
$ sudo rm /opt/ffmpeg/bin/ffmpeg /usr/bin/ffmpeg<br />
` 

#### Install FFmpeg on Fedora 22

Run the following command to install the latest FFmpeg version (FFmpeg 2.7 “Nash”) on Fedora 22:

`<br />
$ sudo yum install http://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-22.noarch.rpm<br />
$ sudo yum update<br />
$ sudo yum install ffmpeg<br />
` 

#### Install FFmpeg on Fedora 21

Run the following command to install the latest FFmpeg version (FFmpeg 2.7 “Nash”) on Fedora 21:
  
`<br />
$ sudo yum install http://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-21.noarch.rpm<br />
$ sudo yum update<br />
$ sudo yum install ffmpeg<br />
` 

If you wish to uninstall and remove the FFmpeg 2.7 from Fedora Systems, run the following command:
  
`<br />
$ sudo yum remove ffmpeg<br />
`