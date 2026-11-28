---
title: How to prerender pages and disable SSR in SvelteKit
link_title: SvelteKit prerender
subtitle: Static HTML at build time
logo: { src: /assets/logos/svelte.svg }
category: JavaScript frameworks
layout: snippet
last_verified_with: "SvelteKit 3.4.1."
updated: 2026-11-28
links:
  - title: Page options
    url: https://svelte.dev/docs/kit/page-options
  - title: adapter-static
    url: https://svelte.dev/docs/kit/adapter-static
---

## Prerendering
<!-- {: .-snippets} -->

### Prerender a page
<!-- {: .-snippet} -->

#### src/routes/about/+page.ts

```ts
export const prerender = true
```
<!-- {: data-highlight="prerender = true"} -->

**Writes the page as HTML,** at build time. The route must return the same content for every visitor; See [prerender](https://svelte.dev/docs/kit/page-options#prerender).

### Prerender dynamic routes
<!-- {: .-snippet} -->

```ts
export const prerender = true

export function entries() {
  return [
    { slug: 'alpha' },
    { slug: 'beta' }
  ]
}
```
<!-- {: data-highlight="entries()"} -->

**Lists the params to render.** The crawler cannot guess `[slug]` values, so `entries()` supplies them; see [entries](https://svelte.dev/docs/kit/page-options#entries).

### Turn off SSR
<!-- {: .-snippet} -->

#### src/routes/+layout.ts

```ts
export const ssr = false
```
<!-- {: data-highlight="ssr = false"} -->

**Renders in the browser,** with SSR off. Setting it on the root layout makes a single-page app; See [ssr](https://svelte.dev/docs/kit/page-options#ssr).

### Ship pages without JS
<!-- {: .-snippet} -->

```ts
export const csr = false
```
<!-- {: data-highlight="csr = false"} -->

**Skips hydration for static content.** Keep SSR on, or nothing renders; see [csr](https://svelte.dev/docs/kit/page-options#csr).

### Build a static site
<!-- {: .-snippet} -->

#### vite.config.ts

```ts
import adapter from '@sveltejs/adapter-static'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [sveltekit({ adapter: adapter() })]
})
```
<!-- {: data-highlight="adapter-static"} -->

#### src/routes/+layout.ts

```ts
export const prerender = true
```

**Emits static files,** for any static host. Every route must be prerendered or given a `fallback`; See [adapter-static](https://svelte.dev/docs/kit/adapter-static).
