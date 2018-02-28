---
title: Audition(Cool Edit)制作循环音乐的问题
author: chrislearn young
date: 2008-07-03T04:03:05+00:00
categories:
  - 程序开发
tags:
  - Audition
  - Cool Edit

---
　　今天在使用Audition(Cool Edit)制作循环音乐放入Flash里作为背景音乐时发现一个问题，我导出的音乐文件格式为mp3，每次制作完时听效果是正常的，不过重新打开这个mp3文件发现尾部总是有改动，不能循环起来。

<!--more-->
　　其实问题出在文件格式上，在将格式改为.wav格式后再做循环就正常了。另外，如果要将.wav格式放入Flash中，可能会出现导入错误的问题，这是因为WAV格式的文件是有多种压缩算法的，WINDOWS版本的FLASH其实只是支持标准的PCM WAV格式的WAV文件；不支持的WAV文件的格式有以下几种：CCITT A-Law, CCITT u-Law, DSP Group TrueSpeech(TM), elemediaTM AX2400P music codec, IMA ADPCM, Microsoft ADPCM, MSN Audio, and GSM 6.10. 所以只能选择保存成这种格式的wav文件。