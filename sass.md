---
title: Sass
layout: default
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

### Compass: Sprites

    @import compass/utilities/sprites

    $sprites: sprite-map('sprites/*.png')
    $sprites: sprite-map('sprites/*.png', $spacing: 20px)

    @mixin sprite($name)
      background-image: sprite-url($sprite)

      +sprite-dimensions($sprite, $name)
      width: image-width(sprite-file($sprite, $name)
      height: image-height(sprite-file($sprite, $name)

      +sprite-background-position($sprite, $name[, $offset-x, $offset-y])
      background-position: sprite-position($sprite, $name)
      nth(sprite-position($sprite, $name), 1)   # X position
      nth(sprite-position($sprite, $name), 2)   # Y position


### Compass: Sprites (the @import way)

    // Sprite sets (applies to icon/*.png)
    $icon-spacing: 0
    $icon-dimensions: true
    $icon-repeat: no-repeat
    $icon-position: 0

    // Individual (applies to icon/mail.png)
    $icon-mail-spacing: 0

    @import 'icon/*.png'
    @include all-icon-sprites

    // Usage
    .image1
      @extend .icon-mail

    .image2
      @extend .icon-refresh;

    // ### Advanced control
    // The sprite map is available as $icon-sprites. You can then use
    // `sprite()` on it.

    .image3
      background: sprite($icon-sprites, refresh)
      //background: url(...) 0 -16px;

    .image3-with-offset
      background: sprite($icon-sprites, refresh, -2px, -9px)
      //background: url(...) -2px -19px;


### Loopo

    $i: 6;
    @while $i > 0 {
      .item-#{$i} { width: 2em * $i; }
      $i: $i - 2;
    }
