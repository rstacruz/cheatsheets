---
title: VitePress
subtitle: Static site generator for docs
category: JavaScript libraries
tier: t2
updated: 2026-11-27
last_verified_with: "VitePress 1.6.4, Vite 5.4.14, Vue 3.5.13, Node 26.13.1."
fragments:
  - "vitepress init"
  - "vitepress dev"
  - "vitepress build"
  - "config.mts"
  - "defineConfig"
  - "themeConfig"
  - "base: '/docs/'"
  - "cleanUrls: true"
  - "lastUpdated"
  - "sidebar: {}"
  - "provider: local"
  - "layout: home"
  - "::: tip"
  - "::: code-group"
  - "<!--@include:"
  - "enhanceApp"
keywords:
  - vitepress
  - vitepress config
  - vitepress sidebar
  - vitepress search
  - vitepress deploy
intro: |
  [VitePress](https://vitepress.dev) builds a static documentation site from Markdown and Vue. This reference covers setup, config, Markdown extensions, theming, search, and deployment.
links:
  - title: VitePress documentation
    url: https://vitepress.dev/guide/
  - title: Site config reference
    url: https://vitepress.dev/reference/site-config
  - title: Vite cheatsheet
    url: ./vite
  - title: Vue cheatsheet
    url: ./vue
---

## Getting started

### Scaffold a site

```bash
pnpm add -D vitepress
pnpm vitepress init
```
<!-- {: data-highlight="vitepress init"} -->

`init` asks for a site directory, title, theme, and whether to use TypeScript. It writes `docs/.vitepress/config.mts` and adds the `docs:*` scripts to `package.json`.

See: [Getting started](https://vitepress.dev/guide/getting-started)

### Project layout

```text
docs/
├─ .vitepress/
│  ├─ config.mts      # site and theme config
│  └─ theme/          # custom theme, optional
├─ index.md           # home page
└─ guide/
   └─ install.md      # /guide/install
```
<!-- {: data-highlight=".vitepress/"} -->

Every Markdown file outside `.vitepress` becomes a page at the matching path. Add `.vitepress/cache` and `.vitepress/dist` to `.gitignore`.

See: [File structure](https://vitepress.dev/guide/getting-started#file-structure)

### Scripts

```json
{
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  }
}
```
<!-- {: data-highlight="vitepress build docs"} -->

`docs:dev` serves with hot reload, `docs:build` writes `.vitepress/dist`, and `docs:preview` serves that build locally.

See: [Up and running](https://vitepress.dev/guide/getting-started#up-and-running)

## Configuration

### Site options

| Option | Description |
| --- | --- |
| `title` | Nav bar title and page-title suffix |
| `description` | Default meta description |
| `lang` | `<html lang>` attribute |
| `base` | Public base path, eg `/docs/` |
| `cleanUrls` | Drop `.html` from URLs |
| `srcDir` | Source root inside the site dir |
| --- | --- |
| `outDir` | Build output, default `.vitepress/dist` |
| `lastUpdated` | Read page dates from Git |
| `ignoreDeadLinks` | Let dead links pass the build |

See: [Site config](https://vitepress.dev/reference/site-config)

### Config file

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Acme Docs',
  description: 'Product documentation',
  cleanUrls: true,
  lastUpdated: true
})
```
<!-- {: data-highlight="defineConfig({"} -->

`defineConfig` supplies types for the config object. Theme options go under `themeConfig` in the same file.

See: [Config resolution](https://vitepress.dev/reference/site-config#config-resolution)

### Theme config

```ts
export default defineConfig({
  themeConfig: {
    nav: [{ text: 'Guide', link: '/guide/install' }],
    sidebar: [{ text: 'Guide', items: [] }],
    search: { provider: 'local' },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/acme' }
    ]
  }
})
```
<!-- {: data-highlight="themeConfig"} -->

Add `logo`, `footer`, `editLink`, and `outline` here too.

See: [Default theme config](https://vitepress.dev/reference/default-theme-config)

### Sidebar

```ts
themeConfig: {
  sidebar: {
    '/guide/': [
      {
        text: 'Introduction',
        collapsed: false,
        items: [
          { text: 'Install', link: '/guide/install' },
          { text: 'Upgrade', link: '/guide/upgrade' }
        ]
      }
    ],
    '/api/': [{ text: 'API', items: [] }]
  }
}
```
<!-- {: data-highlight="sidebar:"} -->

An array gives one sidebar for the whole site. An object keyed by path gives each section its own, and `collapsed: true` folds a group.

See: [Sidebar](https://vitepress.dev/reference/default-theme-sidebar)

## Markdown

### Frontmatter

```md
---
title: Install
description: Install Acme on your machine
outline: deep
sidebar: false
---
```
<!-- {: data-highlight="outline: deep"} -->

Frontmatter overrides site config per page: `title`, `description`, `outline` level, `sidebar`, `aside`, and the home page's `layout: home`.

See: [Frontmatter config](https://vitepress.dev/reference/frontmatter-config)

### Custom containers

````md
::: tip
Node 20 or newer is required.
:::

::: warning
Run the command from the project root.
:::

::: details Show the command
```bash
pnpm docs:build
```
:::
````
<!-- {: data-highlight="::: tip; ::: warning; ::: details"} -->

A title after the type is optional, and `info`, `warning` and `danger` render the same box in different colours. `::: code-group` stacks labeled code blocks behind tabs.

See: [Custom containers](https://vitepress.dev/guide/markdown#custom-containers)

### Code blocks

````md
```ts
export default {
  title: 'Acme', // [!code highlight]
  themeConfig: {} // [!code focus]
}
```
````
<!-- {: data-highlight="[!code highlight]; [!code focus]"} -->

Also `// [!code --]` and `// [!code ++]` draw red and green diff lines, and `// [!code error]` or `// [!code warning]` tint a line. Add `:line-numbers` to the fence.

See: [Code blocks](https://vitepress.dev/guide/markdown#line-highlighting-in-code-blocks)

### Include content

````md
<!--@include: ./parts/shared.md-->

<<< @/snippets/config.ts{2-4}
````
<!-- {: data-highlight="<!--@include:; <<< @/snippets/config.ts{2-4}"} -->

`@` resolves from the source root (`srcDir`). `<<<` imports a code file and its `{2-4}` picks highlighted lines.

See: [Markdown file inclusion](https://vitepress.dev/guide/markdown#markdown-file-inclusion)

## Theming

### Extend the default theme

#### docs/.vitepress/theme/index.ts

```ts
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme
}
```
<!-- {: data-highlight="extends: DefaultTheme"} -->

A `theme/index.ts` file makes VitePress use your theme; `extends` keeps the default theme as its base and layers on CSS, slots, and components.

See: [Extending the default theme](https://vitepress.dev/guide/extending-default-theme)

### Brand colours

#### docs/.vitepress/theme/custom.css

```css
:root {
  --vp-c-brand-1: #0d9488;
  --vp-c-brand-2: #0f766e;
  --vp-c-brand-3: #115e59;
}
```
<!-- {: data-highlight="--vp-c-brand-1"} -->

Override the `--vp-c-brand-*` variables to re-colour links, buttons, and the sidebar. Other public variables follow the same `--vp-*` prefix.

See: [Customizing CSS](https://vitepress.dev/guide/extending-default-theme#customizing-css)

### Vue components

#### docs/guide/counter.md

```md
<Counter />

<script setup>
import Counter from '../ui/Counter.vue'
</script>
```
<!-- {: data-highlight="<Counter />"} -->

Any `.vue` file works in Markdown. Register widely used components in `enhanceApp` inside `theme/index.ts` instead of importing them per page.

See: [Using Vue in Markdown](https://vitepress.dev/guide/using-vue)

## Search

### Local search

```ts
themeConfig: {
  search: {
    provider: 'local',
    options: { detailedView: true }
  }
}
```
<!-- {: data-highlight="provider: 'local'"} -->

Local search builds a MiniSearch index at build time and needs no service. It covers headings and page text.

See: [Local search](https://vitepress.dev/reference/default-theme-search#local-search)

### Algolia DocSearch

```ts
themeConfig: {
  search: {
    provider: 'algolia',
    options: {
      appId: 'ABCDEF1234',
      apiKey: '0123456789abcdef',
      indexName: 'acme'
    }
  }
}
```
<!-- {: data-highlight="provider: 'algolia'"} -->

DocSearch is free for public documentation. Request credentials on the DocSearch site before wiring the options.

See: [Algolia DocSearch](https://vitepress.dev/reference/default-theme-search#algolia-search)

## Deploy

### Build

```bash
pnpm docs:build
pnpm docs:preview
```
<!-- {: data-highlight="docs:build"} -->

The build fails on dead links unless `ignoreDeadLinks` allows them. Upload `.vitepress/dist` to any static host.

See: [Build and test locally](https://vitepress.dev/guide/deploy#build-and-test-locally)

### Base path

```ts
export default defineConfig({
  base: '/acme-docs/'
})
```
<!-- {: data-highlight="base: '/acme-docs/'"} -->

Set `base` when the site serves from a subpath, such as `/acme-docs/`. Root sites and custom domains keep the default `/`.

See: [Public base path](https://vitepress.dev/guide/deploy#setting-a-public-base-path)

## Also see

- [How to configure the VitePress sidebar](./vitepress-sidebar)
- [How to enable search in VitePress](./vitepress-local-search)
- [How to change the VitePress accent colour](./vitepress-accent-colour)
- [How to use Vue components in VitePress Markdown](./vitepress-vue-components)
- [How to load data at build time in VitePress](./vitepress-data-loaders)
- [How to reuse Markdown in VitePress](./vitepress-include-markdown)
- [How to build a VitePress home page](./vitepress-home-page)
- [How to add translations to VitePress](./vitepress-i18n)
