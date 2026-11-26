---
title: How to change Starlight theme colors
link_title: Starlight theme colors
subtitle: Restyle the accent
category: JavaScript libraries
layout: snippet
updated: 2026-11-27
last_verified_with: "Starlight 0.43.2, Astro 7.4.13."
links:
  - title: CSS and styling
    url: https://starlight.astro.build/guides/css-and-tailwind/
  - title: props.css
    url: https://github.com/withastro/starlight/blob/main/packages/starlight/style/props.css
---

## Theming
<!-- {: .-snippets} -->

### Register a stylesheet
<!-- {: .-snippet} -->

```js
starlight({
  customCss: ['./src/styles/custom.css'],
})
```
<!-- {: data-highlight="customCss:"} -->

**Loads your CSS on every page.** Starlight uses cascade layers, so unlayered rules win without `!important`; see [custom CSS](https://starlight.astro.build/guides/css-and-tailwind/#custom-css-styles).

### Change the accent color
<!-- {: .-snippet} -->

```css
:root {
  --sl-color-accent-low: #131e4f;
  --sl-color-accent: #3447ff;
  --sl-color-accent-high: #b3c7ff;
}
```
<!-- {: data-highlight="--sl-color-accent"} -->

**Sets the dark-mode accent.** `-low` fills backgrounds, `-accent` colors links, and `-high` covers hover and emphasis; see [theming](https://starlight.astro.build/guides/css-and-tailwind/#theming).

### Add the light-mode colors
<!-- {: .-snippet} -->

```css
:root[data-theme='light'] {
  --sl-color-accent-low: #d8ddff;
  --sl-color-accent: #2337ff;
  --sl-color-accent-high: #0d1d66;
}
```
<!-- {: data-highlight="[data-theme='light']"} -->

**Overrides the light theme separately.** Dark mode lives on the base `:root`, so a single block leaves light mode untouched; see [theming](https://starlight.astro.build/guides/css-and-tailwind/#theming).
