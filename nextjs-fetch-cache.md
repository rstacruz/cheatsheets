---
title: How to cache data in Next.js
link_title: Next.js caching
subtitle: Fetch options and use cache
logo: { src: /assets/logos/nextjs.svg, mono: true }
category: JavaScript libraries
layout: snippet
last_verified_with: "Next.js 16.4.6."
updated: 2026-11-27
links:
  - title: fetch options
    url: https://nextjs.org/docs/app/api-reference/functions/fetch
---

## Caching
<!-- {: .-snippets} -->

### Cache a response
<!-- {: .-snippet} -->

```ts
const res = await fetch(url, {
  cache: 'force-cache',
})
```
<!-- {: data-highlight="'force-cache'"} -->

**Reuses a stored response.** Without Cache Components, a request with no cache option is not cached; a static route still fetches once during `next build`. See [cache options](https://nextjs.org/docs/app/api-reference/functions/fetch#optionscache).

### Revalidate on a timer
<!-- {: .-snippet} -->

```ts
const res = await fetch(url, {
  next: { revalidate: 60 },
})
```
<!-- {: data-highlight="revalidate: 60"} -->

**Sets a lifetime in seconds.** Without Cache Components, after 60 seconds the next request refetches in the background and caches the new response. See [revalidate](https://nextjs.org/docs/app/api-reference/functions/fetch#optionsnextrevalidate).

### Opt out of caching
<!-- {: .-snippet} -->

```ts
const res = await fetch(url, {
  cache: 'no-store',
})
```
<!-- {: data-highlight="'no-store'"} -->

**Fetches on every request.** Without Cache Components, use it for per-user or rapidly changing data; the route becomes dynamic. See [no-store](https://nextjs.org/docs/app/api-reference/functions/fetch#optionscache).

### Cache a database query
<!-- {: .-snippet} -->

```ts
import { cacheLife, cacheTag } from 'next/cache'

async function getPosts() {
  'use cache'
  cacheLife('hours')
  cacheTag('posts')
  return db.post.findMany()
}
```
<!-- {: data-highlight="'use cache'"} -->

**Caches a function result.** This card requires `cacheComponents`; the fetch options above do not. `cacheLife` sets the lifetime and `cacheTag` allows invalidation. See [use cache](https://nextjs.org/docs/app/api-reference/directives/use-cache).
