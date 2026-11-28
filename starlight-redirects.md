---
title: How to add redirects in Starlight
link_title: Starlight redirects
subtitle: Move pages safely
logo: { src: /assets/logos/astro.svg }
category: JavaScript libraries
layout: snippet
created_at: 2026-11-27
updated: 2026-11-28
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

**Writes a redirect page.** A meta-refresh at the old URL works on static hosts without server rules. See [Astro redirects](https://docs.astro.build/en/guides/routing/#redirects).

### Redirect several pages
<!-- {: .-snippet} -->

```js
redirects: {
  '/setup/': '/guides/install/',
  '/cli/': '/reference/cli/',
}
```
<!-- {: data-highlight="'/setup/'"} -->

**Maps old paths.** Put every redirect in one object: keys are site-root paths and values are paths or absolute URLs. See [Astro redirects](https://docs.astro.build/en/guides/routing/#redirects).
