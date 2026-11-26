---
title: How to add callouts in VuePress
link_title: VuePress callouts
subtitle: Tips, warnings, and details
category: JavaScript libraries
layout: snippet
last_verified_with: "VuePress 2.0.0-rc.33, @vuepress/theme-default 2.0.0-rc.142."
updated: 2026-11-27
links:
  - title: Hint containers
    url: https://ecosystem.vuejs.press/themes/default/markdown.html#hint-containers
---

## Adding callouts
<!-- {: .-snippets} -->

### Add a tip
<!-- {: .-snippet} -->

```md
::: tip
Run the dev server before editing.
:::
```
<!-- {: data-highlight="::: tip"} -->

**Renders a green tip box.** The default title is `TIP`; the theme option `tip` renames it for the whole site. See [hint containers](https://ecosystem.vuejs.press/themes/default/markdown.html#hint-containers).

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
::: details
The output is in `docs/.vuepress/dist`.
:::
```
<!-- {: data-highlight="::: details"} -->

**Starts collapsed and expands on click.** `::: details` uses its first line as the summary; `{no-title}` works on the other containers. See [details](https://ecosystem.vuejs.press/themes/default/markdown.html#hint-containers).
