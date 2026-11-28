---
title: How to configure the VuePress navbar
link_title: Configure VuePress navbar
subtitle: Links and dropdowns
logo: { src: /assets/logos/vue.svg }
category: JavaScript libraries
layout: snippet
last_verified_with: "VuePress 2.0.0-rc.33, @vuepress/theme-default 2.0.0-rc.142."
created_at: 2026-11-27
updated: 2026-11-28
links:
  - title: Default theme config
    url: https://ecosystem.vuejs.press/themes/default/config.html#basic-config
---

## Configuring the navbar
<!-- {: .-snippets} -->

### Add links
<!-- {: .-snippet} -->

```ts
import { defaultTheme }
  from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  theme: defaultTheme({
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'GitHub',
        link: 'https://github.com/vuepress' },
    ],
  }),
})
```
<!-- {: data-highlight="nav:"} -->

**Adds navbar links.** External links open in a new tab; add `noIcon: true` to hide the external-link icon. See [nav](https://ecosystem.vuejs.press/themes/default/config.html#basic-config).

### Add a dropdown
<!-- {: .-snippet} -->

```ts
theme: defaultTheme({
  nav: [
    { text: 'More', items: [
      { text: 'GitHub',
        link: 'https://github.com/vuepress' },
      { text: 'Guide', link: '/guide/' },
    ] },
  ],
})
```
<!-- {: data-highlight="items:"} -->

**Groups links under a menu.** An item with `items` renders a dropdown; nest another `items` array to add a labelled column. See [nav items](https://ecosystem.vuejs.press/themes/default/config.html#basic-config).

### Highlight a section
<!-- {: .-snippet} -->

```ts
nav: [
  { text: 'Guide', link: '/guide/',
    activeMatch: '^/guide/' },
]
```
<!-- {: data-highlight="activeMatch"} -->

**Keeps the item active.** Use `activeMatch` so child pages count too; by default only an exact link match is active, and the value is a regular expression string. See [activeMatch](https://ecosystem.vuejs.press/themes/default/config.html#basic-config).
