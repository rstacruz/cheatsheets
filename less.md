---
title: Less.js
category: CSS
subtitle: CSS preprocessor
logo: { src: /assets/logos/less.svg, mono: true }
last_verified_with: "Less 4.9.1."
updated: 2026-11-25
tier: t3
intro: |
  [Less](https://lesscss.org/) is a CSS preprocessor that extends CSS with
  variables, mixins, and functions. This sheet covers built-in functions and
  conditional rules.
links:
  - title: Less documentation
    url: https://lesscss.org/
  - title: Functions reference
    url: https://lesscss.org/functions/
---

### Functions

```
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
```

See: [Less functions](https://lesscss.org/functions/)

### Conditionals

```
.image when (luma(@color) > 50%) { }
.image when (not(...)) { }
.image when (default()) {}
.image when (e(@shape) = 'circle') { }
```
<!-- {: data-highlight="when"} -->

See: [CSS guards](https://lesscss.org/features/#css-guards-feature)
