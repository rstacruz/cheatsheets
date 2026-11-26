---
title: How to add search to VuePress
link_title: Add VuePress search
subtitle: Local search for docs
category: JavaScript libraries
layout: snippet
last_verified_with: "VuePress 2.0.0-rc.33, @vuepress/plugin-search 2.0.0-rc.142."
updated: 2026-11-27
links:
  - title: Search plugin
    url: https://ecosystem.vuejs.press/plugins/search/search.html
---

## Adding search
<!-- {: .-snippets} -->

### Install the plugin
<!-- {: .-snippet} -->

```sh
pnpm add -D @vuepress/plugin-search@next
```
<!-- {: data-highlight="@vuepress/plugin-search"} -->

**Adds the local search package.** It builds a search index at build time, so the site needs no external search service. See [search](https://ecosystem.vuejs.press/plugins/search/search.html).

### Register it
<!-- {: .-snippet} -->

```ts
import { searchPlugin }
  from '@vuepress/plugin-search'

export default {
  plugins: [searchPlugin()],
}
```
<!-- {: data-highlight="searchPlugin()"} -->

**Turns on the search box in the navbar.** Hotkeys default to `s` and `/`; pass `hotKeys: []` to disable them. See [usage](https://ecosystem.vuejs.press/plugins/search/search.html#usage).

### Index more fields
<!-- {: .-snippet} -->

```ts
searchPlugin({
  getExtraFields: (page) =>
    page.frontmatter.tags ?? [],
})
```
<!-- {: data-highlight="getExtraFields"} -->

**Adds frontmatter tags to the index.** By default the index holds page titles and headings, not the body text. See [getExtraFields](https://ecosystem.vuejs.press/plugins/search/search.html#options).

### Skip a page
<!-- {: .-snippet} -->

```ts
searchPlugin({
  isSearchable: (page) =>
    page.path !== '/',
})
```
<!-- {: data-highlight="isSearchable"} -->

**Keeps the home page out of the results.** Return `false` for any page that should not appear in search. See [isSearchable](https://ecosystem.vuejs.press/plugins/search/search.html#options).
