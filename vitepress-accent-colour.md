---
title: How to change the VitePress accent colour
link_title: VitePress accent colour
subtitle: Brand tokens in custom CSS
category: JavaScript libraries
layout: snippet
tier: t3
last_verified_with: "VitePress 1.6.4, Node 26.13.1."
updated: 2026-11-27
links:
  - title: Extending the default theme
    url: https://vitepress.dev/guide/extending-default-theme
  - title: Customizing CSS
    url: https://vitepress.dev/guide/extending-default-theme#customizing-css
---

## Colours
<!-- {: .-snippets} -->

### Override the brand tokens
<!-- {: .-snippet} -->

#### docs/.vitepress/theme/custom.css

```css
:root {
  --vp-c-brand-1: #0d9488;
  --vp-c-brand-2: #0f766e;
  --vp-c-brand-3: #115e59;
}
```
<!-- {: data-highlight="--vp-c-brand-1"} -->

**Recolours links and buttons.** VitePress derives hover states from `--vp-c-brand-1` through `--vp-c-brand-3`. See [customizing CSS](https://vitepress.dev/guide/extending-default-theme#customizing-css).

### Load the stylesheet
<!-- {: .-snippet} -->

#### docs/.vitepress/theme/index.ts

```ts
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme
}
```
<!-- {: data-highlight="extends: DefaultTheme"} -->

**Keeps the default theme and adds CSS.** A `theme/index.ts` file switches VitePress to your theme; `extends` layers it on the default one. See [extending the default theme](https://vitepress.dev/guide/extending-default-theme).

### Tint backgrounds
<!-- {: .-snippet} -->

```css
:root {
  --vp-c-bg: #fafaf9;
  --vp-c-bg-alt: #f5f5f4;
  --vp-c-brand-soft: rgb(13 148 136 / 14%);
}
```
<!-- {: data-highlight="--vp-c-bg"} -->

**Changes page and sidebar surfaces.** `--vp-c-bg` is the page, `--vp-c-bg-alt` the sidebar and code blocks. See [CSS variables](https://vitepress.dev/guide/extending-default-theme#customizing-css).

### Dark mode
<!-- {: .-snippet} -->

```css
.dark {
  --vp-c-brand-1: #2dd4bf;
  --vp-c-bg: #1c1917;
  --vp-c-bg-alt: #292524;
}
```
<!-- {: data-highlight=".dark"} -->

**Overrides tokens only in dark mode.** The theme toggles a `dark` class on `<html>`, so plain `.dark` selectors win. See [dark mode](https://vitepress.dev/guide/extending-default-theme#customizing-css).
