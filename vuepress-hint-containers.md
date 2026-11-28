---
title: How to add hint containers in VuePress
link_title: VuePress hint containers
subtitle: Tips, warnings, and details
logo: { src: /assets/logos/vue.svg }
category: JavaScript libraries
layout: snippet
last_verified_with: "VuePress 2.0.0-rc.33, @vuepress/theme-default 2.0.0-rc.142."
updated: 2026-11-28
links:
  - title: Hint containers
    url: https://ecosystem.vuejs.press/themes/default/markdown.html#hint-containers
---

## Adding hint containers
<!-- {: .-snippets} -->

### Add a tip
<!-- {: .-snippet} -->

```md
::: tip
Run the dev server before editing.
:::
```
<!-- {: data-highlight="::: tip"} -->

**Renders a green tip box.** The default title is `Tips`; add a title after `tip` to override it, or set the theme's `tip` option for every tip box. See [hint containers](https://ecosystem.vuejs.press/themes/default/markdown.html#hint-containers).

### Add a warning
<!-- {: .-snippet} -->

```md
::: warning
Set `base` before deploying.
:::
```
<!-- {: data-highlight="::: warning"} -->

**Renders a yellow warning box.** Also available: `danger`, `important`, `note`, `info`, and `caution`. See [hint containers](https://ecosystem.vuejs.press/themes/default/markdown.html#hint-containers).

### Make it collapsible
<!-- {: .-snippet} -->

```md
::: details Output
The output is in `docs/.vuepress/dist`.
:::
```
<!-- {: data-highlight="::: details"} -->

**Starts collapsed.** It expands on click; add a title after `details` to label the toggle, which defaults to `Details`, and `{no-title}` is ignored for this container. See [details](https://ecosystem.vuejs.press/themes/default/markdown.html#hint-containers).
