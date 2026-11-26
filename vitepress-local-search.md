---
title: How to enable search in VitePress
link_title: VitePress search
subtitle: Local index without a service
category: JavaScript libraries
layout: snippet
tier: t3
last_verified_with: "VitePress 1.6.4, Node 26.13.1."
updated: 2026-11-27
links:
  - title: Search reference
    url: https://vitepress.dev/reference/default-theme-search
  - title: Local search
    url: https://vitepress.dev/reference/default-theme-search#local-search
---

## Search
<!-- {: .-snippets} -->

### Enable local search
<!-- {: .-snippet} -->

#### docs/.vitepress/config.mts

```ts
themeConfig: {
  search: {
    provider: 'local'
  }
}
```
<!-- {: data-highlight="provider: 'local'"} -->

**Builds a search index from the pages.** No account or build step beyond `docs:build`. See [local search](https://vitepress.dev/reference/default-theme-search#local-search).

### Show detail lines
<!-- {: .-snippet} -->

```ts
search: {
  provider: 'local',
  options: {
    detailedView: true
  }
}
```
<!-- {: data-highlight="detailedView: true"} -->

**Adds page context under each hit.** Results then show the surrounding heading and text, not just the title. See [local search options](https://vitepress.dev/reference/default-theme-search#local-search).

### Require every word
<!-- {: .-snippet} -->

```ts
search: {
  provider: 'local',
  options: {
    miniSearch: {
      searchOptions: {
        combineWith: 'AND'
      }
    }
  }
}
```
<!-- {: data-highlight="combineWith: 'AND'"} -->

**Narrows results to pages with all the terms.** The default `OR` matches any word; `AND` is stricter. See [miniSearch options](https://vitepress.dev/reference/default-theme-search#minisearch-options).

### Translate the UI
<!-- {: .-snippet} -->

```ts
search: {
  provider: 'local',
  options: {
    locales: {
      fr: {
        translations: {
          button: {
            buttonText: 'Rechercher'
          }
        }
      }
    }
  }
}
```
<!-- {: data-highlight="locales:"} -->

**Replaces the search labels per locale.** Keys match the `locales` keys in your site config. See [i18n](https://vitepress.dev/reference/default-theme-search#i18n).
