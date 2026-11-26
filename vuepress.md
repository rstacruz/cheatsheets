---
title: VuePress
subtitle: Markdown documentation site generator
category: JavaScript libraries
tier: t2
updated: 2026-11-27
last_verified_with: "VuePress 2.0.0-rc.33, @vuepress/theme-default 2.0.0-rc.142."
fragments:
  - "vuepress dev"
  - "vuepress build"
  - "defineUserConfig"
  - "viteBundler()"
  - "defaultTheme"
  - "nav: ["
  - "'structure'"
  - "config.ts"
  - "themePlugins"
  - "::: tip"
  - "title="
  - "{2,4}"
  - ":no-line-numbers"
  - "@[code{"
  - "base:"
  - "hostname"
  - "searchPlugin"
  - "type: home"
keywords:
  - VuePress 2
  - VuePress config.ts
  - VuePress theme
  - VuePress plugin
  - VuePress GitHub Pages
intro: |
  [VuePress](https://v2.vuepress.vuejs.org/) builds static documentation sites from Markdown with Vue components. This guide targets VuePress 2 and its default theme.
links:
  - title: VuePress guide
    url: https://v2.vuepress.vuejs.org/guide/getting-started.html
  - title: Default theme config
    url: https://ecosystem.vuejs.press/themes/default/config.html
  - title: Vue.js cheatsheet
    url: ./vue
  - title: Vite cheatsheet
    url: ./vite
---

## Quick start

### Create a project

```sh
pnpm create vuepress my-docs
cd my-docs
pnpm docs:dev
```
<!-- {: data-highlight="pnpm create vuepress"} -->

Scaffolds `docs/`, installs dependencies, and can add a GitHub Pages workflow. The dev server runs at `localhost:8080`.

See: [Getting started](https://v2.vuepress.vuejs.org/guide/getting-started.html)

### Install manually

```sh
pnpm add -D vuepress@next vue
pnpm add -D @vuepress/bundler-vite@next @vuepress/theme-default@next
```
<!-- {: data-highlight="vuepress@next"} -->

VuePress 2 is pre-release, so install `@next`. With pnpm, install `vue` as a peer dependency too.

See: [Installation](https://v2.vuepress.vuejs.org/guide/getting-started.html#installation)

### Dev and build

#### package.json

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```
<!-- {: data-highlight="vuepress dev docs; vuepress build docs"} -->

#### Run

```sh
pnpm docs:dev
pnpm docs:build
```

`docs:dev` serves with hot reload; `docs:build` writes static files to `docs/.vuepress/dist`.

See: [CLI reference](https://v2.vuepress.vuejs.org/reference/cli.html)

## Configuration

### File layout

```text
my-docs/
├─ docs/
│  ├─ .vuepress/
│  │  ├─ config.ts
│  │  └─ public/
│  └─ README.md
└─ package.json
```

Markdown files under `docs/` become pages. `.vuepress/` holds config, public assets, and generated `.temp`, `.cache`, and `dist` directories; add those to `.gitignore`.

See: [Directory structure](https://v2.vuepress.vuejs.org/guide/getting-started.html#directory-structure)

### Config file

```ts
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme(),
})
```
<!-- {: data-highlight="defineUserConfig({"} -->

Put it at `docs/.vuepress/config.ts`. A `vuepress.config.ts` in the working directory takes precedence. The default theme exports `defaultTheme` in 2.0.0-rc.142; earlier 2.0.0-rc releases exported `themeDefault`.

See: [Configuration](https://v2.vuepress.vuejs.org/guide/configuration.html)

### Site metadata

```ts
export default defineUserConfig({
  bundler: viteBundler(),
  lang: 'en-US',
  title: 'My Docs',
  description: 'Product documentation',
  head: [['link', { rel: 'icon', href: '/logo.svg' }]],
})
```
<!-- {: data-highlight="title; description; head"} -->

`title` suffixes every page title and labels the navbar. `description` sets the meta description, and `head` injects extra tags.

See: [Config reference](https://v2.vuepress.vuejs.org/reference/config.html)

## Default theme

### Navigation

```ts
export default defineUserConfig({
  theme: defaultTheme({
    logo: '/logo.svg',
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'More', items: [
        { text: 'GitHub', link: 'https://github.com/vuepress' },
      ] },
    ],
  }),
})
```
<!-- {: data-highlight="nav:"} -->

`nav` holds links or dropdowns (`items`). Add `activeMatch: '^/guide/'` to keep a section highlighted on child pages.

See: [Navbar](https://ecosystem.vuejs.press/themes/default/config.html#basic-config)

### Sidebar

```ts
export default defineUserConfig({
  theme: defaultTheme({
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Overview', link: '/guide/' },
            { text: 'API', link: '/guide/api.md' },
          ],
        },
      ],
    },
  }),
})
```
<!-- {: data-highlight="sidebar:"} -->

The object key matches a path prefix. Use `'heading'` (the default) to build from headings, `'structure'` from the file tree, or `false` to hide it. Group items under `items`, not `children`.

See: [Sidebar](https://ecosystem.vuejs.press/themes/default/config.html#sidebar)

### Theme plugins

```ts
export default defineUserConfig({
  theme: defaultTheme({
    themePlugins: {
      copyCode: false,
      markdownHint: false,
    },
  }),
})
```
<!-- {: data-highlight="themePlugins"} -->

Every non-layout feature is a plugin. Set one to `false` to drop it, or pass its options object to customize it.

See: [Theme plugins](https://ecosystem.vuejs.press/themes/default/plugin.html)

### Home page

```md
---
type: home
hero:
  name: My Docs
  text: Documentation for the product
  actions:
    - text: Get started
      link: /guide/
features:
  - title: Fast
    details: Static HTML from Markdown.
---
```
<!-- {: data-highlight="type: home"} -->

`type: home` renders the hero and feature cards above the page content. The default `doc` type adds the outline and document footer.

See: [Home page](https://ecosystem.vuejs.press/themes/default/frontmatter.html#home-page)

### Footer and edit links

```ts
export default defineUserConfig({
  theme: defaultTheme({
    editLink: {
      pattern: 'https://github.com/me/repo/edit/main/docs/:path',
      text: 'Edit this page',
    },
    lastUpdated: true,
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026',
    },
  }),
})
```
<!-- {: data-highlight="footer"} -->

`:path` is replaced with the page path. `lastUpdated` reads git history; set it to `false` in a page's frontmatter to hide it there.

See: [Theme config](https://ecosystem.vuejs.press/themes/default/config.html)

## Markdown

### Frontmatter

```md
---
title: Install
description: Set up the CLI
outline: [2, 3]
editLink: false
---
```
<!-- {: data-highlight="outline"} -->

`title` falls back to the first H1. `description` overrides the site description for that page, and `outline` picks the heading levels for the aside.

See: [Frontmatter](https://v2.vuepress.vuejs.org/reference/frontmatter.html)

### Code blocks

````md
```ts title="config.ts" {2,4}
export default {
  title: 'Docs',
  theme: defaultTheme(),
}
```
````
<!-- {: data-highlight='title="config.ts"; {2,4}'} -->

`title` adds a filename bar and `{2,4}` tints lines. Add `:line-numbers=10` to start numbering at 10, or `:no-line-numbers` to hide numbers.

See: [Code blocks](https://v2.vuepress.vuejs.org/guide/markdown.html#code-blocks)

### Import code

```md
@[code{3-10} ts{3}](../snippets/config.ts)
```
<!-- {: data-highlight="@[code"} -->

Imports lines 3-10 of a file relative to the page. `ts{3}` sets the language and highlights line 3 of the imported block.

See: [Import code](https://v2.vuepress.vuejs.org/guide/markdown.html#import-code-blocks)

### Hint containers

#### Tip

```md
::: tip
Run the dev server before editing.
:::
```
<!-- {: data-highlight="::: tip"} -->

#### Collapsible

```md
::: details
The build output lives in `docs/.vuepress/dist`.
:::
```
<!-- {: data-highlight="::: details"} -->

Also available: `warning`, `danger`, `important`, `note`, `info`, and `caution`. Add a title after the name; `{no-title}` hides it.

See: [Hint containers](https://ecosystem.vuejs.press/themes/default/markdown.html#hint-containers)

### Vue in Markdown

```md
One plus one is {{ 1 + 1 }}.

This is a <Badge text="beta" /> feature.
```
<!-- {: data-highlight="{{ 1 + 1 }}; <Badge"} -->

Markdown is compiled as a Vue template, so expressions and registered components work. Wrap literal braces in `::: v-pre` when the page is about Vue syntax itself.

See: [Using Vue in Markdown](https://v2.vuepress.vuejs.org/guide/markdown.html#using-vue-in-markdown)

## Plugins

### Add a plugin

#### Install

```sh
pnpm add -D @vuepress/plugin-search@next
```

#### Register

```ts
import { searchPlugin } from '@vuepress/plugin-search'

export default defineUserConfig({
  plugins: [searchPlugin()],
})
```
<!-- {: data-highlight="searchPlugin()"} -->

Plugins are registered under `plugins`. The default theme already wires code highlighting, hints, and copy buttons; `hostname` adds SEO and sitemap.

See: [Plugin guide](https://v2.vuepress.vuejs.org/guide/plugin.html)

### Search options

```ts
searchPlugin({
  locales: { '/': { placeholder: 'Search docs' } },
  getExtraFields: (page) => page.frontmatter.tags ?? [],
})
```
<!-- {: data-highlight="getExtraFields"} -->

Builds a local index from titles and headings. `isSearchable` excludes pages; use DocSearch when a large site makes the index too big.

See: [Search plugin](https://ecosystem.vuejs.press/plugins/search/search.html)

### SEO and sitemap

```ts
export default defineUserConfig({
  theme: defaultTheme({
    hostname: 'https://docs.example.com',
  }),
})
```
<!-- {: data-highlight="hostname"} -->

A `hostname` enables the theme's SEO and sitemap plugins. The build writes `sitemap.xml` and `robots.txt` into the output directory.

See: [Default theme plugins](https://ecosystem.vuejs.press/themes/default/plugin.html)

## Deploy

### Build output

```sh
pnpm docs:build
pnpm docs:build --dest public
```
<!-- {: data-highlight="--dest"} -->

The build writes static HTML to `docs/.vuepress/dist`. Pass `--dest` to publish from another directory.

See: [Build](https://v2.vuepress.vuejs.org/guide/getting-started.html#build-your-site)

### GitHub Pages

#### Base

```ts
export default defineUserConfig({
  base: '/my-docs/',
})
```
<!-- {: data-highlight="base"} -->

#### Workflow

```yaml
name: docs
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v7
        with:
          fetch-depth: 0
      - uses: pnpm/action-setup@v6
        with:
          version: 12
      - uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm docs:build
      - uses: actions/configure-pages@v6
      - uses: actions/upload-pages-artifact@v5
        with:
          path: docs/.vuepress/dist
      - id: deployment
        uses: actions/deploy-pages@v5
```
<!-- {: data-highlight="actions/deploy-pages@v5"} -->

Set `base` to `/<repo>/` for a project site, or `/` for a user site or custom domain. Choose GitHub Actions as the Pages source.

See: [GitHub Pages](https://v2.vuepress.vuejs.org/guide/deployment.html#github-pages)

### Netlify and Vercel

#### Netlify

```toml
[build]
  command = "pnpm docs:build"
  publish = "docs/.vuepress/dist"
```
<!-- {: data-highlight="command"} -->

#### Vercel

```json
{
  "buildCommand": "pnpm docs:build",
  "outputDirectory": "docs/.vuepress/dist"
}
```
<!-- {: data-highlight="buildCommand"} -->

Both hosts serve from the domain root, so keep `base: '/'` (the default) unless the site lives under a subpath. Netlify reads `netlify.toml`; Vercel reads `vercel.json` and its "Other" framework preset.

See: [Deployment](https://v2.vuepress.vuejs.org/guide/deployment.html#netlify)
