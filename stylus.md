---
title: Stylus
subtitle: Indentation-based CSS preprocessor
category: CSS
intro: |
  Stylus is an indentation-based CSS preprocessor with variables, mixins, functions, and built-ins. This reference covers syntax and the built-in API.
links:
  - title: Stylus documentation
    url: https://stylus-lang.com/
  - title: Mixins
    url: https://stylus-lang.com/docs/mixins
  - title: Built-in functions
    url: https://stylus-lang.com/docs/bifs
prism_languages: [stylus]
weight: -3
tier: t3
last_verified_with: "Stylus 0.64.0."
updated: 2026-11-26
---

## Getting started

<!-- {: .-three-column} -->

### CSS syntax

```stylus
.box {
  color: blue;

  .button {
    color: red;
  }
}
```

Stylus is a CSS pre-processor.

See: [Stylus documentation](https://stylus-lang.com/)

### Indent syntax

```stylus
.box
  color: blue

  .button
    color: red
```

Also works! The colon is optional, as well. This is typically the syntax used with Stylus documents.

See: [CSS style syntax](https://stylus-lang.com/docs/css-style)

### Mixins

#### Define

```stylus
caps-type()
  text-transform: uppercase
  letter-spacing: 0.05em
```

<!-- {: data-highlight="caps"} -->

#### Call

```stylus
h5
  caps-type()
```

<!-- {: data-highlight="type"} -->

See: [Mixins](https://stylus-lang.com/docs/mixins)

### Variables

#### Define

```stylus
royal-blue = #36a
```

<!-- {: data-highlight="royal"} -->

#### Use

```stylus
div
  color: royal-blue
```

See: [Variables](https://stylus-lang.com/docs/variables)

## Mixins

<!-- {: .-three-column} -->

### Without arguments

#### Define

```stylus
red-border()
  border: solid 2px red
```

<!-- {: data-highlight="border"} -->

#### Use

```stylus
div
  red-border()
```

<!-- {: data-highlight="red"} -->

See: [Mixins](https://stylus-lang.com/docs/mixins)

### With arguments

#### Define

```stylus
border-radius(n)
  -webkit-border-radius: n
  border-radius: n
```

<!-- {: data-highlight="radius"} -->

#### Call

```stylus
div
  border-radius: 2px
  border-radius(2px)
```

<!-- {: data-highlight="border-radius"} -->

Mixins can be applied in two different ways.

See: [Mixin arguments](https://stylus-lang.com/docs/mixins)

### Argument defaults

```stylus
border-radius(n = 2px)
  -webkit-border-radius: n
```

<!-- {: data-highlight="-radius"} -->

See: [Argument defaults](https://stylus-lang.com/docs/functions#argument-defaults)

### Block mixins

#### Define

```stylus
mobile()
  @media (max-width: 480px)
    {block}
```

<!-- {: data-highlight="block"} -->

#### Call

```stylus
+mobile()
  width: 10px
```

<!-- {: data-highlight="mobile"} -->

See: [Block mixins](https://stylus-lang.com/docs/mixins#block-mixins)

### Rest params

#### Define

```stylus
shadow(offset-x, args...)
  box-shadow: offset-x args
  margin-top: offset-x
```

<!-- {: data-highlight="..."} -->

#### Call

```stylus
#login
  shadow: 1px 2px 5px #eee
```

See: [Rest params](https://stylus-lang.com/docs/vargs#rest-params)

## Functions

<!-- {: .-three-column} -->

### Functions

#### Define

```stylus
add(a, b)
  a + b
```

<!-- {: data-highlight="add"} -->

#### Call

```stylus
body
  padding: add(10px, 5)
```

<!-- {: data-highlight="padding"} -->

See: [Functions](https://stylus-lang.com/docs/functions)

### Argument defaults

```stylus
add(a, b = 2)
  a + b
```

<!-- {: data-highlight="b = 2"} -->

See: [Argument defaults](https://stylus-lang.com/docs/functions#argument-defaults)

### Named parameters

#### Define

```stylus
shadow(x, y)
  x y (y * 1.5) #000
```

#### Call

```stylus
.button
  box-shadow: shadow(x: 2, y: 4)
```

<!-- {: data-highlight="shadow"} -->

See: [Named parameters](https://stylus-lang.com/docs/functions#named-parameters)

### Multiple return values

#### Define

```stylus
sizes()
  8px 16px
```

<!-- {: data-highlight="16px"} -->

#### Call

```stylus
sizes()[0]  // → 8px
sizes()[1]  // → 16px
```

See: [Multiple return values](https://stylus-lang.com/docs/functions#multiple-return-values)

## Values

<!-- {: .-three-column} -->

### Conditional assignment

#### Set

```stylus
royal-blue = #36a
royal-blue ?= #89f
```

<!-- {: data-highlight="blue"} -->

#### Use

```stylus
div
  color: royal-blue  // #36a
```

`?=` will only set a variable if it's previously unset.

See: [Conditional assignment](https://stylus-lang.com/docs/operators#conditional-assignment)

### Property lookup

```stylus
.logo
  width: w = 150
  margin-left: -(w / 2)
  // or
  height: 80px
  margin-top: -(@height / 2)
```

<!-- {: data-highlight="margin"} -->

See: [Property lookup](https://stylus-lang.com/docs/variables#property-lookup)

### Interpolation

```stylus
-{prefix}-border-radius: 2px
```

See: [Interpolation](https://stylus-lang.com/docs/interpolation)

### Color operators

```stylus
#888 + 50%    // → #c3c3c3 (lighten)
#888 - 50%    // → #444 (darken)
#f00 + 50deg  // → #ffd500 (hue)
```

See: [Color operations](https://stylus-lang.com/docs/operators#color-operations)

### Casting

#### Value

```stylus
n = 5px
```

#### Cast

```stylus
foo: (n)em
foo: (n * 5)%
```

<!-- {: data-highlight="em"} -->

See: [Casting](https://stylus-lang.com/docs/operators#casting)

### Lookup

```stylus
light-blue = #3bd
name = 'blue'
lookup('light-' + name)
```

<!-- {: data-highlight="lookup"} -->

See: [lookup](https://stylus-lang.com/docs/bifs#lookup-name)

## Advanced features

<!-- {: .-three-column} -->

### Conditional

```stylus
if color == blue
  display: block
else if true and true
  display: inline
else if 'hey' is not 'bye'
  display: flex
else
  display: none
```

#### Aliases


| Operator | Alias |
| --- | --- |
| `==` | `is` |
| `!=` | `is not` |
| `!=` | `isnt` |

See: [Conditionals](https://stylus-lang.com/docs/conditionals)

### For loops

```stylus
font-size-1 = 10px
font-size-2 = 20px
font-size-3 = 30px

for i in 1..3
  .text-{i}
    font-size: lookup('font-size-' + i)
```

<!-- {: data-highlight="for"} -->

See: [Iteration](https://stylus-lang.com/docs/iteration)

### Definition check

```stylus
if ohnoes is defined
  color: blue
```

<!-- {: data-highlight="defined"} -->

See: [is defined](https://stylus-lang.com/docs/operators#variable-definition-is-defined)

### False values

```stylus
0
null
false
''
```

See: [Truthfulness](https://stylus-lang.com/docs/operators#truthfulness)

### Type check

```stylus
if val is a 'string'
if val is a 'ident'
if #fff is a 'rgba'    // → true
```

See: [Instance check](https://stylus-lang.com/docs/operators#instance-check-is-a)

## Built-in functions

<!-- {: .-three-column} -->

### Color functions

#### Channels

```stylus
alpha(#fff)   //→ 1
alpha(rgba(0, 0, 0, 0.2))   //→ 0.2
```

#### Checks

```stylus
dark(black)  //→ true
light(black) //→ false
```

#### Components

```stylus
hue(#0a0)         //→ 50deg
saturation(#f00)  //→ 100%
lightness(#f00)   //→ 50%
luminosity(#f00)  //→ 0.2126
```

#### Setters

```stylus
hue(#0a0, 0deg)
saturation(#f00, 50%)
lightness(#f00)
```

See: [Color functions](https://stylus-lang.com/docs/bifs#color-functions)

### Color utilities

#### Adjustments

```stylus
lighten(color, 10%)
darken(color, 10%)
saturate(color, 10%)
desaturate(color, 10%)
invert(color)
```

#### Tint and shade

```stylus
tint(color, 50%)  // mix with white
shade(color, 50%) // mix with black
```

#### Strings

```stylus
unquote(string)
```

See: [Built-in functions](https://stylus-lang.com/docs/bifs)

### Image size

```stylus
width:  image-size('tux.png')[0]
height: image-size('tux.png')[1]
```

Returns the width and height of a given image.

See: [image-size](https://stylus-lang.com/docs/bifs#image-size-path)

### Caching

#### Mixin

```stylus
size($width)
  +cache('w' + $width)
    width: $width
.a { size: 10px }
.b { size: 10px }
```

#### Output

```stylus
// yields: .a, b { width: 10px }
```

Applies its contents to the given selector on the first call, but would @extend the first call’s selector at the second call with the same params.

See: [cache](https://stylus-lang.com/docs/bifs#cache-keys)

### Add Property

#### Define

```stylus
gradient(color)
  add-property('background-image',
    linear-gradient(top, color,
      darken(color, 20%)))
  color
```

#### Call

```stylus
body
  background: gradient(red)
```

See: [add-property](https://stylus-lang.com/docs/bifs#add-property-name-expr)

### sprintf

#### Format

```stylus
'-webkit-gradient(%s, %s, %s)' % (
  linear (0 0) (0 100%)
)
// → -webkit-gradient(linear, 0 0, 0 100%)
```

#### Interpolate

```stylus
s("rgba(0, 0, 0, %s)", 0.3)
```

See: [s](https://stylus-lang.com/docs/bifs#s-fmt)

### Embed URL

```
background: embedurl('logo.png')
// → url("data:image/png;base64,…")
```

See: [embedurl](https://stylus-lang.com/docs/bifs#embedurl-path-encoding)
