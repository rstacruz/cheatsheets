---
title: Sass
category: CSS
layout: 2017/sheet
tags: [Featured]
updated: 2020-07-03
weight: -5
keywords:
  - Variables
  - mixins
  - darken()
  - adjust-color()
  - "@for @each @while @if @else"
  - "$list: (a b c)"
  - "$map: (a: b, c: d)"
---

## Basics
{: .-three-column}

### Introduction
{: .-intro}

This is a quick reference to [Sass stylesheets](https://sass-lang.com).

- [Sass documentation](https://sass-lang.com/documentation) _(sass-lang.com)_

### Variables

```scss
$red: #833;
```

```scss
body {
  color: $red;
}
```

### Nesting

```scss
.markdown-body {
  a {
    color: blue;
    &:hover {
      color: red;
    }
  }
}
```

#### to properties
```scss
text: {
  align: center;          // like text-align: center
  transform: uppercase;   // like text-transform: uppercase
}
```

### Comments

```scss
/* Block comments */
// Line comments
```

### Mixins

```scss
@mixin heading-font {
  font-family: sans-serif;
  font-weight: bold;
}
```

```scss
h1 {
  @include heading-font;
}
```

#### with parameters

```scss
@mixin font-size($n) {
  font-size: $n * 1.2em;
}
```

```scss
body {
  @include font-size(2);
}
```

#### with default values

```scss
@mixin pad($n: 10px) {
  padding: $n;
}
```

```scss
body {
  @include pad(15px);
}
```

#### with a default variable

```scss
// Set a default value
$default-padding: 10px;
```

```scss
@mixin pad($n: $default-padding) {
  padding: $n;
}
```

```scss
body {
  @include pad(15px);
}
```

### Extend

```scss
.button {
  ···
}
```

```scss
.push-button {
  @extend .button;
}
```

### Composing

```scss
@import './other_sass_file';
```

The `.scss` or `.sass` extension is optional.

## Color functions

### rgba

```scss
rgb(100, 120, 140)
rgba(100, 120, 140, .5)
rgba($color, .5)
```

### Mixing

```scss
mix($a, $b, 10%)   // 10% a, 90% b
```

### Modifying HSLA

```scss
darken($color, 5%)
lighten($color, 5%)
```

```scss
saturate($color, 5%)
desaturate($color, 5%)
grayscale($color)
```

```scss
adjust-hue($color, 15deg)
complement($color)    // like adjust-hue(_, 180deg)
invert($color)
```

```scss
fade-in($color, .5)   // aka opacify()
fade-out($color, .5)  // aka transparentize() - halves the opacity
rgba($color, .5)      // sets alpha to .5
```

### Getting individual values

#### HSLA

```scss
hue($color)         // → 0deg..360deg
saturation($color)  // → 0%..100%
lightness($color)   // → 0%..100%
alpha($color)       // → 0..1 (aka opacity())
```

#### RGB

```scss
red($color)         // → 0..255
green($color)
blue($color)
```

See: [hue()](http://sass-lang.com/documentation/Sass/Script/Functions.html#hue-instance_method), [red()](http://sass-lang.com/documentation/Sass/Script/Functions.html#red-instance_method)

### Adjustments

```scss
// Changes by fixed amounts
adjust-color($color, $blue: 5)
adjust-color($color, $lightness: -30%)   // like darken(_, 30%)
adjust-color($color, $alpha: -0.4)       // like fade-out(_, .4)
adjust-color($color, $hue: 30deg)        // like adjust-hue(_, 15deg)
```

```scss
// Changes via percentage
scale-color($color, $lightness: 50%)
```

```scss
// Changes one property completely
change-color($color, $hue: 180deg)
change-color($color, $blue: 250)
```

Supported: `$red` `$green` `$blue` `$hue` `$saturation` `$lightness` `$alpha`

## Other functions

### Strings

```scss
unquote('hello')
quote(hello)
```

```scss
to-upper-case(hello)
to-lower-case(hello)
```

```scss
str-length(hello world)
str-slice(hello, 2, 5)      // "ello" - it's 1-based, not 0-based
str-insert("abcd", "X", 1)  // "Xabcd"
```

### Units

```scss
unit(3em)        // 'em'
unitless(100px)  // false
```

### Numbers

```scss
floor(3.5)
ceil(3.5)
round(3.5)
abs(3.5)
```

```scss
min(1, 2, 3)
max(1, 2, 3)
```

```scss
percentage(.5)   // 50%
random(3)        // 0..3
```

### Misc

```scss
variable-exists(red)    // checks for $red
mixin-exists(red-text)  // checks for @mixin red-text
function-exists(redify)
```

```scss
global-variable-exists(red)
```

```scss
selector-append('.menu', 'li', 'a')   // .menu li a
selector-nest('.menu', '&:hover li')  // .menu:hover li
selector-extend(...)
selector-parse(...)
selector-replace(...)
selector-unify(...)
```

## Feature checks

### Feature check

```scss
feature-exists(global-variable-shadowing)
```

### Features

* global-variable-shadowing
* extend-selector-pseudoclass
* units-level-3
* at-error

## Loops

### For loops

```scss
@for $i from 1 through 4 {
  .item-#{$i} { left: 20px * $i; }
}
```

### Each loops (simple)

```scss
$menu-items: home about services contact;

@each $item in $menu-items {
  .photo-#{$item} {
    background: url('images/#{$item}.jpg');
  }
}
```

### Each loops (nested)
```scss
$backgrounds: (home, 'home.jpg'), (about, 'about.jpg');

@each $id, $image in $backgrounds {
  .photo-#{$id} {
    background: url($image);
  }
}
```

### While loops

```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
```

## Other features

### Conditionals

```scss
@if $position == 'left' {
   position: absolute;
   left: 0;
}
@else if $position == 'right' {
   position: absolute;
   right: 0;
}
@else {
   position: static;
}
```

### Interpolation

```scss
.#{$klass} { ... }      // Class
call($function-name)    // Functions

@media #{$tablet}
font: #{$size}/#{$line-height}
url("#{$background}.jpg")
```

### Lists

```scss
$list: (a b c);

nth($list, 1)  // starts with 1
length($list)

@each $item in $list { ... }
```

### Maps

```scss
$map: (key1: value1, key2: value2, key3: value3);

map-get($map, key1)
```

## See also
{: .-one-column}

- <http://sass-lang.com/documentation/Sass/Script/Functions.html>
- <http://sass-lang.com/documentation/file.SASS_REFERENCE.html#sassscript>
