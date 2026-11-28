---
title: How to load data in SvelteKit
link_title: SvelteKit load data
subtitle: Fetch data before rendering
logo: { src: /assets/logos/svelte.svg }
category: JavaScript frameworks
layout: snippet
last_verified_with: "SvelteKit 3.4.1, Svelte 5.59.2."
created_at: 2026-11-26
updated: 2026-11-28
links:
  - title: Loading data
    url: https://svelte.dev/docs/kit/load
  - title: Page data
    url: https://svelte.dev/docs/kit/load#Page-data
---

## Loading data
<!-- {: .-snippets} -->

### Load on the server
<!-- {: .-snippet} -->

#### src/routes/posts/[slug]/+page.server.ts

```ts
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({
  params
}) => {
  const post = await db.post.findUnique({
    where: { slug: params.slug }
  })
  return { post }
}
```
<!-- {: data-highlight="PageServerLoad"} -->

**Runs only on the server.** Use a `+page.server.ts` load when the page touches a database or private environment variables; see [server load](https://svelte.dev/docs/kit/load#Universal-vs-server).

### Render the data
<!-- {: .-snippet} -->

```html
<script lang="ts">
  import type { PageProps } from './$types'

  let { data }: PageProps = $props()
</script>

<h1>{data.post.title}</h1>
```
<!-- {: data-highlight="PageProps"} -->

**Receives data as a prop.** The `load` return value arrives in the page as `data`. See [Page data](https://svelte.dev/docs/kit/load#Page-data).

### Load on both sides
<!-- {: .-snippet} -->

#### src/routes/stars/+page.ts

```ts
export async function load({ fetch }) {
  const url = 'https://api.github.com'
  const res = await fetch(
    `${url}/repos/sveltejs/kit`
  )
  const repo = await res.json()
  return { stars: repo.stargazers_count }
}
```
<!-- {: data-highlight="await fetch("} -->

**Runs on the server first.** A `+page.ts` load is universal and then runs in the browser; its `fetch` handles cookies and relative URLs. See [Universal vs server](https://svelte.dev/docs/kit/load#Universal-vs-server).

### Read the query string
<!-- {: .-snippet} -->

```ts
export function load({ url }) {
  const q = url.searchParams.get('q') ?? ''
  const page = Number(
    url.searchParams.get('page') ?? 1
  )
  return { q, page }
}
```
<!-- {: data-highlight="searchParams.get"} -->

**Reads query parameters.** Both load flavours receive the page `url`, including `?q=` and `?page=`. See [Using URL data](https://svelte.dev/docs/kit/load#Using-URL-data).

### Fail with a 404
<!-- {: .-snippet} -->

```ts
import { error } from '@sveltejs/kit'

if (!post) error(404, 'Not found')
```
<!-- {: data-highlight="error(404"} -->

**Throws a 404.** The page can render the error; `error()` throws, so do not catch it in the load. See [Errors](https://svelte.dev/docs/kit/errors).

### Share data with a layout
<!-- {: .-snippet} -->

#### src/routes/posts/+layout.server.ts

```ts
export function load() {
  return { section: 'blog' }
}
```
<!-- {: data-highlight="section"} -->

**Adds data from a layout.** Layout returns merge into the page `data` prop, adding `section` to every child page. See [Layout data](https://svelte.dev/docs/kit/load#Layout-data).
