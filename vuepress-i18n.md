---
title: How to add a second language to VuePress
link_title: VuePress i18n
subtitle: Locales and language menus
logo: { src: /assets/logos/vue.svg }
category: JavaScript libraries
layout: snippet
last_verified_with: "VuePress 2.0.0-rc.33, @vuepress/theme-default 2.0.0-rc.142."
created_at: 2026-11-27
updated: 2026-11-28
links:
  - title: VuePress i18n
    url: https://v2.vuepress.vuejs.org/guide/i18n.html
  - title: Theme locale config
    url: https://ecosystem.vuejs.press/themes/default/locale.html
---

## Adding a locale
<!-- {: .-snippets} -->

### Add the locale folder
<!-- {: .-snippet} -->

```text
docs/
├─ README.md
└─ zh/
   └─ README.md
```
<!-- {: data-highlight="zh/"} -->

**Mirrors pages under `zh/`.** The default pages are copied there; the folder name becomes the route prefix, so `docs/zh/README.md` serves at `/zh/`. See [site i18n](https://v2.vuepress.vuejs.org/guide/i18n.html#site-i18n-config).

### Configure the locales
<!-- {: .-snippet} -->

```ts
export default defineUserConfig({
  locales: {
    '/': { lang: 'en-US', title: 'Docs' },
    '/zh/': { lang: 'zh-CN', title: '文档' },
  },
})
```
<!-- {: data-highlight="'/zh/'"} -->

**Declares each locale's language.** The title is declared too; entries fall back to the root values, so `head` only needs to be set once. See [site i18n config](https://v2.vuepress.vuejs.org/guide/i18n.html#site-i18n-config).

### Label the language menu
<!-- {: .-snippet} -->

```ts
theme: defaultTheme({
  locales: {
    '/': { label: 'English' },
    '/zh/': { label: '简体中文' },
  },
})
```
<!-- {: data-highlight="label"} -->

**Shows a language dropdown.** It sits in the navbar; the `label` is the name shown in the menu, and each entry can also override `nav`, `sidebar`, and the other theme options. See [theme i18n](https://ecosystem.vuejs.press/themes/default/locale.html).
