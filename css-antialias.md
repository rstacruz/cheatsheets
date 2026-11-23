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

### Restore the default
<!-- {: .-snippet} -->

```css
body {
  -webkit-font-smoothing: auto;
  -moz-osx-font-smoothing: auto;
}
```
<!-- {: data-highlight="auto"} -->

**Restores the browser defaults.** `auto` lets each engine choose its smoothing; on current macOS that is grayscale, matching the rest of the system; see [font-smooth](https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth).
