---
title: How to add redirects in Starlight
link_title: Starlight redirects
subtitle: Move pages safely
category: JavaScript libraries
layout: snippet
updated: 2026-11-27
last_verified_with: "Starlight 0.43.2, Astro 7.4.13."
links:
  - title: Astro redirects
    url: https://docs.astro.build/en/guides/routing/#redirects
  - title: Pages
    url: https://starlight.astro.build/guides/pages/
---

## Redirecting
<!-- {: .-snippets} -->

### Redirect a moved page
<!-- {: .-snippet} -->

```js
export default defineConfig({
  redirects: {
    '/install/': '/guides/install/',
  },
})
```
<!-- {: data-highlight="redirects:"} -->

**Writes a meta-refresh page at the old URL.** Static hosts serve it without server rules; see [Astro redirects](https://docs.astro.build/en/guides/routing/#redirects).

### Redirect several pages
<!-- {: .-snippet} -->

```js
redirects: {
  '/setup/': '/guides/install/',
  '/cli/': '/reference/cli/',
}
```
<!-- {: data-highlight="'/setup/'"} -->

**Maps every old path in one object.** Keys are site-root paths and values are paths or absolute URLs; see [Astro redirects](https://docs.astro.build/en/guides/routing/#redirects).
