---
title: How to read route params in SvelteKit
link_title: SvelteKit route params
subtitle: Dynamic segments and matchers
logo: { src: /assets/logos/svelte.svg }
category: JavaScript frameworks
layout: snippet
last_verified_with: "SvelteKit 3.4.1."
updated: 2026-11-26
links:
  - title: Routing
    url: https://svelte.dev/docs/kit/routing
  - title: Advanced routing
    url: https://svelte.dev/docs/kit/advanced-routing
---

## Route params
<!-- {: .-snippets} -->

### Read a dynamic param
<!-- {: .-snippet} -->

#### src/routes/blog/[slug]/+page.server.ts

```ts
export function load({ params }) {
  return { slug: params.slug }
}
```
<!-- {: data-highlight="params.slug"} -->

**Maps the folder name to a param.** `/blog/hello` gives `slug: 'hello'`; see [params](https://svelte.dev/docs/kit/load#Using-URL-data-params).

### Make a param optional
<!-- {: .-snippet} -->

```text
src/routes/docs/[[lang]]/+page.svelte
```
<!-- {: data-highlight="[[lang]]"} -->

**Matches `/docs` and `/docs/fr`.** The double brackets make the segment optional; see [Optional parameters](https://svelte.dev/docs/kit/advanced-routing#Optional-parameters).

### Capture the rest of the path
<!-- {: .-snippet} -->

```text
src/routes/files/[...path]/+page.svelte
```
<!-- {: data-highlight="[...path]"} -->

**Matches every segment after `/files`.** A rest param can match zero or more segments; see [Rest parameters](https://svelte.dev/docs/kit/advanced-routing#Rest-parameters).

### Validate a param
<!-- {: .-snippet} -->

#### src/params.ts

```ts
import { defineParams } from
  '@sveltejs/kit/params'

export const params = defineParams({
  integer: (param) => {
    if (!/^\d+$/.test(param)) return
    return Number(param)
  }
})
```
<!-- {: data-highlight="defineParams"} -->

#### src/routes/number/[id=integer]/+page.ts

```ts
export function load({ params }) {
  return { id: params.id }
}
```

**Rejects URLs that do not match.** The matcher's return value becomes the param, so `id` is a number; see [Matching](https://svelte.dev/docs/kit/advanced-routing#Matching).

### Read search params
<!-- {: .-snippet} -->

```ts
export function load({ url }) {
  const q = url.searchParams.get('q') ?? ''
  return { q }
}
```
<!-- {: data-highlight="searchParams.get"} -->

**Reads `?q=` from the URL.** Query strings are not params; use `url.searchParams` in a load, or `page.url.searchParams` from `$app/state`; see [Using URL data](https://svelte.dev/docs/kit/load#Using-URL-data).
