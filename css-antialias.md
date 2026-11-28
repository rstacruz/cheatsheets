---
title: How to antialias text in CSS
link_title: CSS antialiasing
subtitle: Font smoothing on macOS
logo: { src: /assets/logos/css.svg, mono: true }
category: CSS
layout: snippet
last_verified_with: "WebKit CSS extensions (non-standard), MDN font-smooth."
created_at: 2014-06-04
updated: 2026-11-28
tier: t3
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

**Smooths macOS text.** It switches text to grayscale antialiasing. Both properties are non-standard, inherited, and ignored outside macOS; see [font-smooth](https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth).

### Restore the default
<!-- {: .-snippet} -->

```css
body {
  -webkit-font-smoothing: auto;
  -moz-osx-font-smoothing: auto;
}
```
<!-- {: data-highlight="auto"} -->

**Reverts to the browser default.** `auto` hands smoothing back to the engine, undoing the rule above; see [font-smooth](https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth).
