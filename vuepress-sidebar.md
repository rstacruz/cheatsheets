---
title: How to configure the VuePress sidebar
link_title: Configure VuePress sidebar
subtitle: Per-page navigation menus
logo: { src: /assets/logos/vue.svg }
category: JavaScript libraries
layout: snippet
last_verified_with: "VuePress 2.0.0-rc.33, @vuepress/theme-default 2.0.0-rc.142."
created_at: 2026-11-27
updated: 2026-11-28
links:
  - title: Sidebar config
    url: https://ecosystem.vuejs.press/themes/default/config.html#sidebar
---

## Configuring the sidebar
<!-- {: .-snippets} -->

### One sidebar for a folder
<!-- {: .-snippet} -->

```ts
theme: defaultTheme({
  sidebar: {
    '/guide/': [
      {
        text: 'Guide',
        items: [
          {
            text: 'Overview',
            link: '/guide/',
          },
          {
            text: 'API',
            link: '/guide/api',
          },
        ],
      },
    ],
  },
})
```
<!-- {: data-highlight="'/guide/'"} -->

**Shows a folder menu.** It appears under every `/guide/` page; the key is matched as a path prefix, so nested pages share the sidebar. Group items under `items`, not `children`. See [sidebar items](https://ecosystem.vuejs.press/themes/default/config.html#sidebar-items).

### Generate it from files
<!-- {: .-snippet} -->

#### config.ts

```ts
theme: defaultTheme({
  sidebar: 'structure',
})
```
<!-- {: data-highlight="'structure'"} -->

#### docs/guide/api.md

```md
---
title: API
order: 2
---
```
<!-- {: data-highlight="order"} -->

**Builds the menu.** It comes from the folder tree; `order` sorts siblings and page titles label the links. See [generate from structure](https://ecosystem.vuejs.press/themes/default/config.html#generate-from-the-file-structure).

### Hide the sidebar
<!-- {: .-snippet} -->

```ts
theme: defaultTheme({
  sidebar: false,
})
```
<!-- {: data-highlight="sidebar: false"} -->

**Hides the sidebar.** It disappears from every page; use `sidebar: false` in a page's frontmatter to hide it on just one page. See [sidebar](https://ecosystem.vuejs.press/themes/default/config.html#sidebar).
