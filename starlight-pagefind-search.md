---
title: How to configure Starlight search
link_title: Starlight search
subtitle: Tune Pagefind
category: JavaScript libraries
layout: snippet
updated: 2026-11-27
last_verified_with: "Starlight 0.43.2, Astro 7.4.13."
links:
  - title: Site search
    url: https://starlight.astro.build/guides/site-search/
  - title: pagefind option
    url: https://starlight.astro.build/reference/configuration/#pagefind
---

## Search
<!-- {: .-snippets} -->

### Disable search
<!-- {: .-snippet} -->

```js
starlight({
  pagefind: false,
})
```
<!-- {: data-highlight="pagefind: false"} -->

**Removes the search box and the index.** Starlight indexes the site with Pagefind at build time, so nothing extra is needed to keep the default; see [site search](https://starlight.astro.build/guides/site-search/).

### Exclude a block from the index
<!-- {: .-snippet} -->

```js
starlight({
  pagefind: {
    index: {
      excludeSelectors: ['[data-no-search]'],
    },
  },
})
```
<!-- {: data-highlight="excludeSelectors"} -->

**Skips matching elements when indexing.** Pagefind also ignores anything marked `data-pagefind-ignore`; see [Pagefind options](https://starlight.astro.build/reference/configuration/#pagefind).

### Test search locally
<!-- {: .-snippet} -->

```bash
pnpm build
pnpm preview
```
<!-- {: data-highlight="pnpm preview"} -->

**Serves the built index.** The index only exists after a build, so `pnpm dev` shows a warning instead of results; see [site search](https://starlight.astro.build/guides/site-search/).
