---
title: Sass
category: CSS
---

### Color functions

    rgb(r,g,b)
    rgba(r,g,b,a)
    rgba($color, a)

    darken($color, 5%)
    lighten($color, 5%)
    saturate($color, 5%)
    desaturate($color, 5%)
    grayscale($color)

    compliment($color)
    $invert(color)

    mix($a, $b, 50%)

    hue($color)
    saturation($color)
    lightness($color)
    alpha($color) /* aka opacity() */

    fade-in($color, 0.5)
    fade-out($color, 0.5)

    adjust-color($color, $blue: 5)
    adjust-color($color, $lightness: -30%)
    adjust-color($color, $alpha: -0.4)
    adjust-color($color, $hue: 30deg)
    adjust-hue($color, 15deg)

http://sass-lang.com/documentation/Sass/Script/Functions.html

### Loops

    $i: 6;
    @while $i > 0 {
      .item-#{$i} { width: 2em * $i; }
      $i: $i - 2;
    }

## Interpolation

   .#{$lol} { ... }

## Lists

    $list: (a b c);

    nth($list, 1)  // starts with 1
    length($list)

    @each $item in $list { ... }
