---
title: Sass
subtitle: Mature CSS preprocessor
category: CSS
updated: 2026-11-26
weight: -5
keywords:
  - Variables
  - mixins
  - color.adjust()
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
@use 'sass:color';
@use 'sass:math';
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
@use 'sass:color';

color.mix($a, $b, 10%)  // 10% a, 90% b
```
<!-- {: data-highlight="color.mix($a, $b, 10%)"} -->

See: [color.mix()](https://sass-lang.com/documentation/modules/color#mix)


### Modifying colors

#### Lightness

```scss
@use 'sass:color';

color.adjust($color, $lightness: -5%)
color.adjust($color, $lightness: 5%)
```
<!-- {: data-highlight="color.adjust($color, $lightness: -5%)"} -->


#### Saturation

```scss
@use 'sass:color';

color.adjust($color, $saturation: 5%)
color.adjust($color, $saturation: -5%)
color.grayscale($color)  // saturation: 0%
```
<!-- {: data-highlight="color.grayscale($color)"} -->


#### Hue

```scss
@use 'sass:color';

color.adjust($color, $hue: 15deg)
color.complement($color)  // hue + 180deg
color.invert($color)
```
<!-- {: data-highlight="color.adjust($color, $hue: 15deg); color.complement($color); color.invert($color)"} -->


#### Opacity

```scss
@use 'sass:color';

color.adjust($color, $alpha: .5)
color.adjust($color, $alpha: -.5)
color.change($color, $alpha: .5)  // sets alpha
```
<!-- {: data-highlight="color.change($color, $alpha: .5)"} -->

See: [color.adjust()](https://sass-lang.com/documentation/modules/color#adjust), [color.change()](https://sass-lang.com/documentation/modules/color#change)


### Getting individual values

#### HSL channels

```scss
@use 'sass:color';

color.channel($color, 'hue')        // 0deg..360deg
color.channel($color, 'saturation') // 0%..100%
color.channel($color, 'lightness')  // 0%..100%
color.channel($color, 'alpha')      // 0..1
```
<!-- {: data-highlight="color.channel($color, 'hue')"} -->


#### RGB channels

```scss
@use 'sass:color';

color.channel($color, 'red')   // 0..255
color.channel($color, 'green')
color.channel($color, 'blue')
```
<!-- {: data-highlight="color.channel($color, 'red')"} -->

See: [color.channel()](https://sass-lang.com/documentation/modules/color#channel)


### Adjustments

#### Fixed amounts

```scss
@use 'sass:color';

color.adjust($color, $blue: 5)
color.adjust($color, $lightness: -30%)
color.adjust($color, $alpha: -0.4)
color.adjust($color, $hue: 30deg)
```
<!-- {: data-highlight="color.adjust($color, $blue: 5)"} -->


#### Scaled amounts

```scss
@use 'sass:color';

color.scale($color, $lightness: 50%)
```
<!-- {: data-highlight="color.scale($color, $lightness: 50%)"} -->


#### Set values

```scss
@use 'sass:color';

color.change($color, $hue: 180deg)
color.change($color, $blue: 250)
```
<!-- {: data-highlight="color.change($color, $blue: 250)"} -->

Supported channels: `$red`, `$green`, `$blue`, `$hue`, `$saturation`, `$lightness`, `$alpha`. Pass `$space:` for other color spaces.

See: [color.adjust()](https://sass-lang.com/documentation/modules/color#adjust), [color.scale()](https://sass-lang.com/documentation/modules/color#scale), [color.change()](https://sass-lang.com/documentation/modules/color#change)


## Other functions

### Strings

#### Quotes

```scss
@use 'sass:string';

string.unquote('hello')
string.quote(hello)
```
<!-- {: data-highlight="string.unquote('hello')"} -->


#### Case

```scss
@use 'sass:string';

string.to-upper-case(hello)
string.to-lower-case(hello)
```
<!-- {: data-highlight="string.to-upper-case"} -->


#### Substrings

```scss
@use 'sass:string';

string.str-length(hello world)
string.str-slice(hello, 2, 5)      // "ello" - 1-based, not 0-based
string.str-insert("abcd", "X", 1)  // "Xabcd"
```
<!-- {: data-highlight="string.str-length"} -->

See: [sass:string](https://sass-lang.com/documentation/modules/string)


### Units

```scss
@use 'sass:math';

math.unit(3em)        // 'em'
math.unitless(100px)  // false
```
<!-- {: data-highlight="math.unit(3em)"} -->

See: [math.unit()](https://sass-lang.com/documentation/modules/math#unit)


### Numbers

#### Rounding

```scss
@use 'sass:math';

math.floor(3.5)
math.ceil(3.5)
math.round(3.5)
math.abs(3.5)
```
<!-- {: data-highlight="math.floor(3.5)"} -->


#### Bounds

```scss
@use 'sass:math';

math.min(1, 2, 3)
math.max(1, 2, 3)
```
<!-- {: data-highlight="math.min(1, 2, 3); math.max(1, 2, 3)"} -->


#### Percentages

```scss
@use 'sass:math';

math.percentage(.5)  // 50%
math.random(3)       // 1..3
```
<!-- {: data-highlight="math.percentage(.5)"} -->

See: [sass:math](https://sass-lang.com/documentation/modules/math)


### Misc

#### Existence checks

```scss
@use 'sass:meta';

$red: #f00;
meta.variable-exists('red')   // true, current scope
meta.mixin-exists('red-text')
meta.function-exists('redify')
```
<!-- {: data-highlight="meta.variable-exists('red')"} -->


#### Global scope

```scss
@use 'sass:meta';

$red: #f00;
meta.global-variable-exists('red')  // true, ignores local scope
```
<!-- {: data-highlight="meta.global-variable-exists('red')"} -->

See: [sass:meta](https://sass-lang.com/documentation/modules/meta)


#### Combine selectors

```scss
@use 'sass:selector';

selector.append('.menu', ':hover')        // .menu:hover
selector.nest('.menu', '&:hover li')      // .menu:hover li
selector.extend('a.disabled', 'a', '.link')
selector.unify('a', '.disabled')          // a.disabled
```
<!-- {: data-highlight="selector.append('.menu', ':hover'); selector.nest('.menu', '&:hover li'); selector.extend('a.disabled', 'a', '.link'); selector.unify('a', '.disabled')"} -->


#### Inspect selectors

```scss
@use 'sass:selector';

selector.parse('.menu li')
selector.replace('.menu li', 'li', 'a')  // .menu a
```
<!-- {: data-highlight="selector.replace('.menu li', 'li', 'a')"} -->

See: [sass:selector](https://sass-lang.com/documentation/modules/selector)


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
@use 'sass:meta';

.#{$klass} { ... }      // Class
meta.call(meta.get-function($function-name))  // Functions

@media #{$tablet}
font: #{$size}/#{$line-height}
url("#{$background}.jpg")
```
<!-- {: data-highlight="#{$klass}"} -->

See: [Interpolation](https://sass-lang.com/documentation/interpolation)


### Lists

```scss
@use 'sass:list';

$list: (a b c);

list.nth($list, 1)  // starts with 1
list.length($list)

@each $item in $list { ... }
```
<!-- {: data-highlight="list.nth($list, 1)"} -->

See: [Lists](https://sass-lang.com/documentation/values/lists)


### Maps

```scss
@use 'sass:map';

$map: (key1: value1, key2: value2, key3: value3);

map.get($map, key1)
```
<!-- {: data-highlight="map.get($map, key1)"} -->

See: [Maps](https://sass-lang.com/documentation/values/maps)


## See also


- [Sass functions](https://sass-lang.com/documentation/modules)
- [Sass documentation](https://sass-lang.com/documentation)
