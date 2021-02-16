---
title: CSS tricks
category: CSS
layout: 2017/sheet
---

### Heading kerning pairs and ligature

```css
h1, h2, h3 {
  text-rendering: optimizeLegibility;
}
```

### Native-like iOS scrolling

```css
-webkit-overflow-scrolling: touch;
overflow-y: auto;
```

### Gradient text

```css
background: -webkit-gradient(linear, left top, left bottom, from(#eee), to(#333));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Text stroke

```css
-webkit-text-stroke: 3px black;
```

See: [Introducing text stroke](http://www.webkit.org/blog/85/introducing-text-stroke/)

### iOS Scrolling prevention

```css
document.ontouchstart = (e) ->
  $pane = $(e.target).closest('.scrollable>div')
  if $pane.length is 0 or $pane[0].scrollHeight <= $pane.innerHeight()
    e.preventDefault()
```

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

### UIWebView optimizations

```css
* {
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-user-select: none;                /* disable text select */
  -webkit-touch-callout: none;              /* disable callout, image save panel (popup) */
  -webkit-tap-highlight-color: transparent; /* "turn off" link highlight */
}

a:focus {
  outline: 0; // Firefox (remove border on link click)
}
```

See: <http://www.bitsandpix.com/entry/ios-webkit-uiwebview-remove-tapclick-highlightborder-with-css/>

See: <http://www.yuiblog.com/blog/2010/10/01/quick-tip-customizing-the-mobile-safari-tap-highlight-color/>

Browser hacks
-------------
{: .-three-column}

### Disclaimer

Not recommended, but here they are if you ever need them. Note that vendor
prefixes may go away eventually.

### Mozilla-only

```css
@-moz-document url-prefix() {
  .box { color: blue; }
}
```

### Webkit-only

```css
@media all and (-webkit-min-device-pixel-ratio: 1) {
}
```
