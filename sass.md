---
title: Sass
category: CSS
---

## Color functions

```scss
rgb(100, 120, 140)
rgba(100, 120, 140, .5)
rgba($color, .5)
```

### Mixing

```scss
mix($a, $b, 10%)   /* 10% a, 90% b */
```

### Modifying HSLA

```scss
darken($color, 5%)
lighten($color, 5%)
```

```
saturate($color, 5%)
desaturate($color, 5%)
grayscale($color)
```

```scss
adjust-hue($color, 15deg)
compliment($color)    /* like adjust-hue(_, 180deg) */
invert($color)
```

```scss
fade-in($color, .5)
fade-out($color, .5)  /* halves the opacity */
rgba($color, .5)      /* sets alpha to .5 */
```

### Getting HSL values

```scss
hue($color)
saturation($color)
lightness($color)
alpha($color)         /* aka opacity() */
```

### Full adjustments

```scss
adjust-color($color, $blue: 5)
adjust-color($color, $lightness: -30%)   /* like darken(_, 30%) */
adjust-color($color, $alpha: -0.4)       /* like fade-out(_, .4) */
adjust-color($color, $hue: 30deg)        /* like adjust-hue(_, 15deg) */
```

## Other functions

### Strings and units

```scss
unquote('hello')
quote(hello)
unit(3em)        /* 'em' */
unitless(100px)  /* false */
```

## Loops

```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
```

## Interpolation

```scss
$klass: 'button'

.#{$klass} { ... } /* same as `.button` */
```

## Lists

```scss
$list: (a b c);

nth($list, 1)  /* starts with 1 */
length($list)

@each $item in $list { ... }
```

## Reference

- <http://sass-lang.com/documentation/Sass/Script/Functions.html>
