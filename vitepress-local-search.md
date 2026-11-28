---
title: How to enable search in VitePress
link_title: VitePress search
subtitle: Local index without a service
logo: { src: /assets/logos/vitepress.svg }
category: JavaScript libraries
layout: snippet
tier: t3
last_verified_with: "VitePress 1.6.4, Node 26.13.1."
created_at: 2026-11-27
updated: 2026-11-28
links:
  - title: Search reference
    url: https://vitepress.dev/reference/default-theme-search
  - title: Local search
    url: https://vitepress.dev/reference/default-theme-search#local-search
  - title: VitePress cheatsheet
    url: ./vitepress
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

**Builds a search index.** It indexes the pages locally, with no account and no build step beyond `docs:build`. See [local search](https://vitepress.dev/reference/default-theme-search#local-search).

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

**Adds page context.** Each result shows the surrounding heading and text, not just the title. See [local search options](https://vitepress.dev/reference/default-theme-search#local-search).

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

**Requires all search terms.** The default `OR` matches any word, while `AND` narrows results to pages containing every term. See [miniSearch options](https://vitepress.dev/reference/default-theme-search#minisearch-options).

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

**Translates search labels.** The translation keys match the `locales` keys in your site config. See [i18n](https://vitepress.dev/reference/default-theme-search#local-search-i18n).
