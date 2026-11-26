---
title: Sass
subtitle: Mature CSS preprocessor
category: CSS
updated: 2026-11-26
weight: -5
keywords:
  - Variables
  - mixins
  - darken()
  - adjust-color()
  - "@for @each @while @if @else"
  - "$list: (a b c)"
  - "$map: (a: b, c: d)"
intro: |
  This is a quick reference to [Sass stylesheets](https://sass-lang.com).
links:
  - title: Sass documentation
    url: https://sass-lang.com/documentation
tier: t3
last_verified_with: "Dart Sass 1.108.2."
---

## Basics

<!-- {: .-three-column} -->

### Variables

#### Define

```scss
$red: #833;
```
<!-- {: data-highlight="$red"} -->


#### Use

```scss
body {
  color: $red;
}
```
<!-- {: data-highlight="color: $red"} -->

See: [Variables](https://sass-lang.com/documentation/variables)


### Nesting

#### Selectors

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
<!-- {: data-highlight="&:hover"} -->


#### To properties

```scss
text: {
  align: center;        // text-align
  transform: uppercase; // text-transform
}
```
<!-- {: data-highlight="text: {"} -->

See: [Nesting](https://sass-lang.com/documentation/style-rules#nesting)


### Comments

```scss
/* Block comments */
// Line comments
```
<!-- {: data-highlight="// Line comments"} -->

See: [Comments](https://sass-lang.com/documentation/syntax/comments)


### Mixins

#### Basic mixin

```scss
@mixin heading-font {
  font-family: sans-serif;
  font-weight: bold;
}

h1 {
  @include heading-font;
}
```
<!-- {: data-highlight="@mixin heading-font"} -->

#### with parameters

```scss
@mixin font-size($n) {
  font-size: $n * 1.2em;
}

body {
  @include font-size(2);
}
```
<!-- {: data-highlight="@mixin font-size"} -->

#### with default values

```scss
@mixin pad($n: 10px) {
  padding: $n;
}

body {
  @include pad(15px);
}
```
<!-- {: data-highlight="@mixin pad($n: 10px)"} -->

#### with a default variable

```scss
// Set a default value
$default-padding: 10px;

@mixin pad($n: $default-padding) {
  padding: $n;
}

body {
  @include pad(15px);
}
```
<!-- {: data-highlight="$default-padding"} -->

See: [Mixins](https://sass-lang.com/documentation/at-rules/mixin)

### Extend

```scss
.button {
  ···
}

.push-button {
  @extend .button;
}
```
<!-- {: data-highlight="@extend .button"} -->

See: [@extend](https://sass-lang.com/documentation/at-rules/extend)


### Composing

```scss
@use './other_sass_file';
```
<!-- {: data-highlight="@use"} -->

The `.scss` or `.sass` extension is optional.

See: [@use](https://sass-lang.com/documentation/at-rules/use)


## Color functions

### rgba

```scss
rgb(100, 120, 140)
rgba(100, 120, 140, .5)
rgba($color, .5)
```
<!-- {: data-highlight="rgba($color, .5)"} -->

See: [Color functions](https://sass-lang.com/documentation/modules/color)


### Mixing

```scss
mix($a, $b, 10%)   // 10% a, 90% b
```
<!-- {: data-highlight="mix($a, $b, 10%)"} -->

See: [mix()](https://sass-lang.com/documentation/modules/color#mix)


### Modifying HSLA

#### Lightness

```scss
darken($color, 5%)
lighten($color, 5%)
```
<!-- {: data-highlight="darken"} -->


#### Saturation

```scss
saturate($color, 5%)
desaturate($color, 5%)
grayscale($color)
```
<!-- {: data-highlight="saturate"} -->


#### Hue

```scss
adjust-hue($color, 15deg)
complement($color)    // like adjust-hue(_, 180deg)
invert($color)
```
<!-- {: data-highlight="adjust-hue"} -->


#### Opacity

```scss
fade-in($color, .5)   // aka opacify()
fade-out($color, .5)  // aka transparentize() - halves the opacity
rgba($color, .5)      // sets alpha to .5
```
<!-- {: data-highlight="fade-in"} -->

See: [Color functions](https://sass-lang.com/documentation/modules/color)


### Getting individual values

#### HSLA

```scss
hue($color)         // → 0deg..360deg
saturation($color)  // → 0%..100%
lightness($color)   // → 0%..100%
alpha($color)       // → 0..1 (aka opacity())
```
<!-- {: data-highlight="hue($color)"} -->


#### RGB

```scss
red($color)         // → 0..255
green($color)
blue($color)
```
<!-- {: data-highlight="red($color)"} -->


See: [hue()](https://sass-lang.com/documentation/modules/color#hue), [red()](https://sass-lang.com/documentation/modules/color#red)

### Adjustments

#### Fixed amounts

```scss
// Changes by fixed amounts
adjust-color($color, $blue: 5)
adjust-color($color, $lightness: -30%)   // like darken(_, 30%)
adjust-color($color, $alpha: -0.4)       // like fade-out(_, .4)
adjust-color($color, $hue: 30deg)        // like adjust-hue(_, 15deg)
```
<!-- {: data-highlight="adjust-color($color, $blue: 5)"} -->


#### Scaled amounts

```scss
// Changes via percentage
scale-color($color, $lightness: 50%)
```
<!-- {: data-highlight="scale-color"} -->


#### Set values

```scss
// Changes one property completely
change-color($color, $hue: 180deg)
change-color($color, $blue: 250)
```
<!-- {: data-highlight="change-color"} -->


Supported: `$red` `$green` `$blue` `$hue` `$saturation` `$lightness` `$alpha`

See: [adjust-color()](https://sass-lang.com/documentation/modules/color#adjust-color)


## Other functions

### Strings

#### Quotes

```scss
unquote('hello')
quote(hello)
```
<!-- {: data-highlight="unquote('hello')"} -->


#### Case

```scss
to-upper-case(hello)
to-lower-case(hello)
```
<!-- {: data-highlight="to-upper-case"} -->


#### Substrings

```scss
str-length(hello world)
str-slice(hello, 2, 5)      // "ello" - it's 1-based, not 0-based
str-insert("abcd", "X", 1)  // "Xabcd"
```
<!-- {: data-highlight="str-length"} -->

See: [String functions](https://sass-lang.com/documentation/modules/string)


### Units

```scss
unit(3em)        // 'em'
unitless(100px)  // false
```
<!-- {: data-highlight="unit(3em)"} -->

See: [unit()](https://sass-lang.com/documentation/modules/math#unit)


### Numbers

#### Rounding

```scss
floor(3.5)
ceil(3.5)
round(3.5)
abs(3.5)
```
<!-- {: data-highlight="floor(3.5)"} -->


#### Bounds

```scss
min(1, 2, 3)
max(1, 2, 3)
```
<!-- {: data-highlight="min(1, 2, 3)"} -->


#### Percentages

```scss
percentage(.5)   // 50%
random(3)        // 0..3
```
<!-- {: data-highlight="percentage(.5)"} -->

See: [Number functions](https://sass-lang.com/documentation/modules/math)


### Misc

#### Existence checks

```scss
variable-exists(red)    // checks for $red
mixin-exists(red-text)  // checks for @mixin red-text
function-exists(redify)
```
<!-- {: data-highlight="variable-exists(red)"} -->


#### Global scope

```scss
global-variable-exists(red)
```
<!-- {: data-highlight="global-variable-exists(red)"} -->


#### Selectors

```scss
selector-append('.menu', 'li', 'a')   // .menu li a
selector-nest('.menu', '&:hover li')  // .menu:hover li
selector-extend(...)
selector-parse(...)
selector-replace(...)
selector-unify(...)
```
<!-- {: data-highlight="selector-append"} -->

See: [Meta functions](https://sass-lang.com/documentation/modules/meta)


## Loops

### For loops

```scss
@for $i from 1 through 4 {
  .item-#{$i} { left: 20px * $i; }
}
```
<!-- {: data-highlight="@for"} -->

See: [@for](https://sass-lang.com/documentation/at-rules/control/for)


### Each loops (simple)

```scss
$menu-items: home about services contact;

@each $item in $menu-items {
  .photo-#{$item} {
    background: url('images/#{$item}.jpg');
  }
}
```
<!-- {: data-highlight="$menu-items"} -->

See: [@each](https://sass-lang.com/documentation/at-rules/control/each)


### Each loops (nested)
```scss
$backgrounds: (home, 'home.jpg'), (about, 'about.jpg');

@each $id, $image in $backgrounds {
  .photo-#{$id} {
    background: url($image);
  }
}
```
<!-- {: data-highlight="$backgrounds"} -->

See: [@each](https://sass-lang.com/documentation/at-rules/control/each)


### While loops

```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
```
<!-- {: data-highlight="@while"} -->

See: [@while](https://sass-lang.com/documentation/at-rules/control/while)


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
<!-- {: data-highlight="@if"} -->

See: [@if](https://sass-lang.com/documentation/at-rules/control/if)


### Interpolation

```scss
.#{$klass} { ... }      // Class
call($function-name)    // Functions

@media #{$tablet}
font: #{$size}/#{$line-height}
url("#{$background}.jpg")
```
<!-- {: data-highlight="#{$klass}"} -->

See: [Interpolation](https://sass-lang.com/documentation/interpolation)


### Lists

```scss
$list: (a b c);

nth($list, 1)  // starts with 1
length($list)

@each $item in $list { ... }
```
<!-- {: data-highlight="nth($list, 1)"} -->

See: [Lists](https://sass-lang.com/documentation/values/lists)


### Maps

```scss
$map: (key1: value1, key2: value2, key3: value3);

map-get($map, key1)
```
<!-- {: data-highlight="map-get($map, key1)"} -->

See: [Maps](https://sass-lang.com/documentation/values/maps)


## See also


- [Sass functions](https://sass-lang.com/documentation/modules)
- [Sass documentation](https://sass-lang.com/documentation)
