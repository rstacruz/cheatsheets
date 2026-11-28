---
title: How to configure the VitePress sidebar
link_title: VitePress sidebar
subtitle: Sections, groups and per-page rules
logo: { src: /assets/logos/vitepress.svg }
category: JavaScript libraries
layout: snippet
tier: t3
last_verified_with: "VitePress 1.6.4, Node 26.13.1."
updated: 2026-11-28
links:
  - title: Sidebar reference
    url: https://vitepress.dev/reference/default-theme-sidebar
  - title: Default theme config
    url: https://vitepress.dev/reference/default-theme-config#sidebar
  - title: VitePress cheatsheet
    url: ./vitepress
---

## Sidebar
<!-- {: .-snippets} -->

### Add sections
<!-- {: .-snippet} -->

#### docs/.vitepress/config.mts

```ts
themeConfig: {
  sidebar: [
    {
      text: 'Guide',
      items: [
        { text: 'Install', link: '/install' },
        { text: 'Upgrade', link: '/upgrade' }
      ]
    }
  ]
}
```
<!-- {: data-highlight="sidebar:"} -->

**Lists links under a heading.** Each top-level section needs `text` and `items`; links start with `/` and map to a page. See [sidebar](https://vitepress.dev/reference/default-theme-sidebar).

### Show separate sidebars
<!-- {: .-snippet} -->

```ts
themeConfig: {
  sidebar: {
    '/guide/': [
      { text: 'Guide', items: [] }
    ],
    '/api/': [
      { text: 'API', items: [] }
    ]
  }
}
```
<!-- {: data-highlight="'/guide/': ["} -->

**Switches the sidebar by path.** Keys are path prefixes, so every page under `/guide/` gets the first array. See [multiple sidebars](https://vitepress.dev/reference/default-theme-sidebar#multiple-sidebars).

### Collapse groups
<!-- {: .-snippet} -->

```ts
sidebar: [
  {
    text: 'Advanced',
    collapsed: true,
    items: [
      { text: 'Caching', link: '/caching' }
    ]
  }
]
```
<!-- {: data-highlight="collapsed: true"} -->

**Starts a group closed.** Groups are expanded by default; `collapsed: false` makes a group toggleable but open. See [collapsible groups](https://vitepress.dev/reference/default-theme-sidebar#collapsible-sidebar-groups).

### Hide the sidebar
<!-- {: .-snippet} -->

```md
---
sidebar: false
---
```
<!-- {: data-highlight="sidebar: false"} -->

**Removes the sidebar.** It applies to one page; use it on landing pages, while `aside: false` hides the table of contents but keeps navigation. See [frontmatter sidebar](https://vitepress.dev/reference/frontmatter-config#sidebar).
