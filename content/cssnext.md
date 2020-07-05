---
title: cssnext
category: CSS
layout: 2017/sheet
updated: 2017-10-30
tags: [Featurable]
weight: -3
---

### Variables

```scss
:root {
  --text-color: #30333a;
}
```

```scss
body {
  background: var(--text-color);
  background: color(var(--text-color) shade(30%));
}
```

### Colors

```scss
a {
  /* Adjustments */
  color: color(red alpha(-10%));
  color: color(red tint(-10%));    /* lighten */
  color: color(red shade(-10%));   /* darken */

  /* Absolute */
  color: color(red alpha(50%));
  color: color(red hue(225));
  color: color(red saturation(100%));
  color: color(red lightness(50%));

  color: gray(33);       /* rgb(33, 33, 33) */
  color: gray(33%);      /* rgb(84, 84, 84) */
  color: gray(33%, 50%); /* rgba(84, 84, 84, 0.5) */
  color: #0000ff80;      /* rgba(0, 0, 255, 0.5) */

  color: hwb(90, 0%, 0%, 0.5);     /* like hsl() but easier for humans */
  color: hsl(90deg 90% 70%);       /* hsl(180, 90%, 70%) -- supports deg */
  color: hsl(90deg 90% 70% / 30%); /* hsla(180, 90%, 70%, 0.3) */
  color: rgb(30 60 90 / 30%);      /* rgba(30, 60, 90, 0.3) */
}
```

Also see [colorme.io](http://colorme.io/).

### Mixins

```scss
:root {
  --centered: {
    display: flex;
    align-items: center;
    justify-content: center;
  };
}

.centered {
  @apply --centered;
}
```

Selectors
---------

### Nesting

```scss
.class-name {
  & .nesting { ··· }      /* direct nesting starts with & */
  @nest span & { ··· }    /* complex nesting */
  @media (min-width: 30em) { ··· }
}
```

### Custom selectors

```scss
@custom-selector :--button input[type='submit'], input[type='button'];
@custom-selector :--enter :hover, :focus;
```

```scss
:--button { ··· }
:--button:--enter { ··· }
```
{: .-setup}

### Future selectors

```scss
:any-link { ··· }         /* :link, :visited */
p:matches(.a, .b) { ··· } /* p.a, p.b */
p:not(.a, .b) { ··· }     /* p:not(.a), p:not(.b) */
a::before { ··· }         /* a:before -- for IE compatibility */
[frame=hsides i] { ··· }  /* [frame=hsides] -- but case insensitive */
```

Media queries
-------------

### Custom media queries

```scss
@custom-media --viewport-medium (width <= 50rem);
```

```scss
@media (--viewport-medium) { ··· }
```

### Media query ranges

```scss
@media (width >= 500px) { ··· }    /* (min-width: 500px) */
```

Properties
----------

### Property fallbacks

```scss
/* font-feature-settings fallback */
h2 { font-variant-caps: small-caps; }
table { font-variant-numeric: lining-nums; }
```

```scss
div { filter: blur(4px); }          /* svg filter fallback */
div { overflow-wrap: break-word; }  /* word-wrap fallback */
```

### Autoprefixing

```scss
div {
  display: flex;
}
```

```scss
/*
 * display: -webkit-box;
 * display: -ms-flexbox;
 * display: flex;
 */
```

### Reset

```scss
div {
  all: initial;
}
```

Sets animation, background, margin, padding, and so on.

## References
{: .-one-column}

- Based on cssnext 2.9.0.
- <http://cssnext.io/features/>
