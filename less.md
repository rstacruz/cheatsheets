---
title: Less.js
---

### Functions

    unit(30px / 5px)  #=> 6
    unit(5, px)       #=> 5px

    e("ms:stuff()")   #=> ms:stuff() (unquote)

    %("count: %d", 1+2) #=> "count: 3"

    iscolor(@x)
    isstring(@x)
    isnumber(@x)
    iskeyword(@x)
    isurl(url(...))
    ispixel()
    isem()
    ispercentage()
    isunit()

    hue(@color)
    saturation(@color)
    lightness(@color)
    luma(@color)
    luminance(@color)

    fade(@color, amount)
    fadein(@color, amount)
    fadeout(@color, amount)
    spin(@color, degrees)
    mix(@a, @b, amount)

### Conditionals

    .image when (luma(@color) > 50%) { }
    .image when (not(...)) { }
    .image when (default()) {}
    .image when (e(@shape) = 'circle') { }

