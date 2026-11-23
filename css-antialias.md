---
title: How to antialias text in CSS
link_title: CSS antialiasing
subtitle: Font smoothing on macOS
category: CSS
layout: snippet
updated: 2026-11-24
links:
  - title: MDN font-smooth
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth
---

## Smoothing
<!-- {: .-snippets} -->

### Antialiased text
<!-- {: .-snippet} -->

```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```
<!-- {: data-highlight="antialiased"} -->

**Switches macOS text to grayscale antialiasing.** Both properties are non-standard, inherited, and ignored outside macOS; see [font-smooth](https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth).

### Sharper text
<!-- {: .-snippet} -->

```css
body {
  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: auto;
}
```
<!-- {: data-highlight="subpixel-antialiased"} -->

**Reverts to subpixel rendering.** Subpixel antialiasing is sharper on non-retina displays but looks heavier on dark backgrounds; see [font-smooth](https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth).
