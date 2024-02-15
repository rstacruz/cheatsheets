---
title: fb-rotate (Display Rotation for the Mac)
category: macOS
layout: 2017/sheet
weight: -1
authors:
  - github: CdLbB
updated: 2020-10-10
---

A Unix utility able to rotate the display on any Mac, including the internal display on Apple notebooks, and able to switch the primary display, the one with the menu bar, back and forth between displays.

### Rotate One Of Your Screens For A Specific Degrees
* `fb-rotate -d index_of_a_screen -r 0/90/180/270`
* `d`: display
* `r`: rotate

#### Examples
* Rotate screen whose index is 0 for 90 degrees: `fb-rotate -d 0 -r 90`

### Compiling fb-rotate

1. Download source file `fb-rotate.c` from [https://github.com/CdLbB/fb-rotate](https://github.com/CdLbB/fb-rotate)
2. Run `gcc -w -o fb-rotate fb-rotate.c -framework IOKit -framework ApplicationServices` to get a executable file 'fb-rotate'

### Also see for more infomation
* [https://github.com/CdLbB/fb-rotate](https://github.com/CdLbB/fb-rotate)
* [Screen rotation with Automator and a script](https://discussions.apple.com/thread/7588942)
