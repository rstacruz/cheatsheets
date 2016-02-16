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

saturate($color, 5%)
desaturate($color, 5%)
grayscale($color)

adjust-hue($color, 15deg)
compliment($color)    /* like adjust-hue(_, 180deg) */
invert($color)

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

## Conditionals

```scss
@if $position == 'left' {
   left: 0;
}
@else $position == 'top' {
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

## Maps

```scss
$map: (key1: value1, key2: value2, key3: value3);

map-get($map, key1)
```

## Reference

- <http://sass-lang.com/documentation/Sass/Script/Functions.html>
- <http://sass-lang.com/documentation/file.SASS_REFERENCE.html#sassscript>
