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

    #888 + 50%    // => #c3c3c3 (darken)
    #888 - 50%    // => #444 (lighten)
    #f00 + 50deg  // => #ffd500 (hue)

### Casting

    n = 5px
    foo: (n)em
    foo: (n * 5)%

### Lookup

    light-blue = #3bd
    name = 'blue'
    lookup('light-' + name)

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

Add Property:

    gradient(color)
      add-property('background-image', linear-gradient(top, color, darken(color, 20%)))
      color

    body
      background: gradient(red)

### Conditional

    if color == blue
    else if true and true
    else if 'hey' is not 'bye'

    // Aliases:
    == is
    != is not
    != isnt

### Definition

    if ohnoes is defined
      color: blue

### False values

    0
    null
    false
    ''

### Type check

    if val is a 'string'
    if val is a 'ident'

### sprintf

    '-webkit-gradient(%s, %s, %s)' % (linear (0 0) (0 100%))
    // => -webkit-gradient(linear, 0 0, 0 100%)

    s("rgba(0, 0, 0, %s)", 0.3)

