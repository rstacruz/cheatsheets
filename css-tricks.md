---
title: CSS tricks
subtitle: Assorted CSS snippets
category: CSS
last_verified_with: "CSS Snapshot 2026."
updated: 2026-11-25
tier: t3
---

### Heading kerning pairs and ligature

```css
h1, h2, h3 {
  text-rendering: optimizeLegibility;
}
```

See: [text-rendering](https://developer.mozilla.org/en-US/docs/Web/CSS/text-rendering#values)

### Native-like iOS scrolling

```css
-webkit-overflow-scrolling: touch;
overflow-y: auto;
```

See: [overflow-y](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y)

### Gradient text

```css
background: -webkit-gradient(
  linear, left top, left bottom, from(#eee), to(#333)
);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

See: [background-clip](https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip#text)

### Text stroke

```css
-webkit-text-stroke: 3px black;
```

See: [Introducing text stroke](http://www.webkit.org/blog/85/introducing-text-stroke/)

### iOS Scrolling prevention

#### Touch handler

```css
document.ontouchstart = (e) ->
  $pane = $(e.target).closest('.scrollable>div')
  if $pane.length is 0 or $pane[0].scrollHeight <= $pane.innerHeight()
    e.preventDefault()
```

#### Scrollable styles

```scss
%ios-scrollable {
  &, >div {
    -webkit-overflow-scrolling: touch;
    overflow: auto;
  }

  >div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
```

Relevant in iOS6, but maybe not anymore.

<!-- see: none: legacy iOS WebKit scrolling workaround, no upstream doc -->

### UIWebView optimizations

```css
* {
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-user-select: none;                /* disable text select */
  -webkit-touch-callout: none;             /* disable callout */
  -webkit-tap-highlight-color: transparent; /* no highlight */
}

a:focus {
  outline: 0; // Firefox (remove border on link click)
}
```

See: [-webkit-tap-highlight-color](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-tap-highlight-color)


Browser hacks
-------------

<!-- {: .-three-column} -->

### Disclaimer

Not recommended, but here they are if you ever need them. Note that vendor
prefixes may go away eventually.

<!-- see: none: house caveat, no upstream doc -->

### Mozilla-only

```css
@-moz-document url-prefix() {
  .box { color: blue; }
}
```

See: [@document](https://developer.mozilla.org/en-US/docs/Web/CSS/@document)

### Webkit-only

```css
@media all and (-webkit-min-device-pixel-ratio: 1) {
}
```

See: [-webkit-device-pixel-ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/-webkit-device-pixel-ratio)
