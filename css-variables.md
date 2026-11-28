---
title: How to use CSS variables
link_title: CSS variables
subtitle: Custom properties and fallbacks
logo: { src: /assets/logos/css.svg, mono: true }
category: CSS
layout: snippet
last_verified_with: "CSS Custom Properties Module Level 1, CSS Properties and Values API Level 1."
updated: 2026-11-28
tier: t3
links:
  - title: MDN custom properties
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
  - title: CSS Custom Properties Module Level 1
    url: https://www.w3.org/TR/css-variables-1/
  - title: CSS Properties and Values API Level 1
    url: https://www.w3.org/TR/css-properties-values-api-1/
---

## Custom properties
<!-- {: .-snippets} -->

### Define and use
<!-- {: .-snippet} -->

```css
:root {
  --accent: tomato;
}

a {
  color: var(--accent);
}
```
<!-- {: data-highlight="var(--accent)"} -->

**Declares a custom property.** It lives on `:root` and inherits, so every element can read `--accent`. See [custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

### Fallback value
<!-- {: .-snippet} -->

```css
.button {
  color: var(--accent, tomato);
}
```
<!-- {: data-highlight="var(--accent, tomato)"} -->

**Provides a fallback value.** `var(--accent, tomato)` uses `tomato` when `--accent` is missing; a defined value that is invalid for the property does not fall back. See [var()](https://developer.mozilla.org/en-US/docs/Web/CSS/var).

### Theme override
<!-- {: .-snippet} -->

```css
.dark {
  --bg: #111;
  --fg: #eee;
}
```
<!-- {: data-highlight=".dark"} -->

#### Reading the tokens

```css
body {
  background: var(--bg, white);
  color: var(--fg, black);
}
```

**Scopes new values to `.dark`.** Descendants inherit them; the `var()` fallbacks apply where `.dark` is not an ancestor; see [custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

### Set from JavaScript
<!-- {: .-snippet} -->

```js
const root = document.documentElement
root.style.setProperty('--accent', 'tomato')
```
<!-- {: data-highlight="setProperty"} -->

**Updates a variable at runtime.** Elements re-resolve their styles immediately; see [setProperty()](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty).

### Typed property
<!-- {: .-snippet} -->

```css
@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
```
<!-- {: data-highlight="@property"} -->

**Registers a typed custom property.** Types unlock validation, defaults, and animation; see [@property](https://developer.mozilla.org/en-US/docs/Web/CSS/@property).
