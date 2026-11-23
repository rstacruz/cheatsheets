---
title: How to use system fonts in CSS
link_title: CSS system fonts
subtitle: Native font stacks
category: CSS
layout: snippet
last_verified_with: "CSS Fonts Module Level 4."
updated: 2026-11-24
links:
  - title: MDN font-family
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/font-family
  - title: CSS Fonts Module Level 4
    url: https://www.w3.org/TR/css-fonts-4/#generic-font-families
---

## Font stacks
<!-- {: .-snippets} -->

### System UI font
<!-- {: .-snippet} -->

```css
body {
  font-family: system-ui, sans-serif;
}
```
<!-- {: data-highlight="system-ui"} -->

**Uses the operating system's UI font.** `system-ui` maps to San Francisco on macOS, Segoe UI on Windows, and the desktop default on Linux; see [system-ui](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family#system-ui).

### Named system fonts
<!-- {: .-snippet} -->

```css
body {
  font-family: -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Ubuntu, Cantarell,
    "Helvetica Neue", Arial, sans-serif;
}
```
<!-- {: data-highlight="-apple-system"} -->

**Works without `system-ui` support.** The list falls through macOS, Windows, Android, and Linux fonts before reaching `sans-serif`; see [font-family](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family#values).

### Monospace stack
<!-- {: .-snippet} -->

```css
code, pre {
  font-family: ui-monospace, SFMono-Regular,
    Menlo, Consolas, monospace;
}
```
<!-- {: data-highlight="ui-monospace"} -->

**Picks the platform's monospace font.** Safari uses `ui-monospace`, while other browsers fall through to Menlo, Consolas, or Liberation Mono; see [ui-monospace](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family#ui-monospace).
