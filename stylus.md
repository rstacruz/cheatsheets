---
title: Stylus
layout: default
---

### Variables

    royal-blue = #36a
    support-for-ie ?= true

    div
      color: royal-blue

### Mixin without args

    red-border()
      border: solid 2px red

    div
      red-border()

### Mixin with arguments

    border-radius(n)
      -webkit-border-radius: n
      border-radius: n

    div
      border-radius: 2px

Or with defaults:

    border-radius(n=2px)
      -webkit-border-radius: n

Multiple args:

    xy(left, top)
      left: left
      top: top

    div
      xy: 2px 2px

### Functions

    add(a, b)
      a + b

    body
      padding: add(10px, 5)

### Interpolation

    -{prefix}-border-radius: 2px

### Color operators

    #888 + 50%    // => #c3c3c3
    #888 - 50%    // => #444
    #f00 + 50deg  // => #ffd500 (hue)

### Built-in functions

    alpha(#fff)   //=> 1
    alpha(rgba(0, 0, 0, 0.2))   //=> 0.2

    dark(black)  //=> true
    light(black) //=> false

    lighten(color, 10%)
    darken(color, 10%)
    saturate(color, 10%)
    invert(color)

    width:  image-size(img)[0]
    height: image-size(img)[1]

    unquote(string)

    s("rgba(0, 0, 0, %s)", 0.3)   // Works like eval?

Add Property:

    gradient(color)
      add-property('background-image', linear-gradient(top, color, darken(color, 20%)))
      color

    body
      background: gradient(red)
