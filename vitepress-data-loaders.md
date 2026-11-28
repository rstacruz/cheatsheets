---
title: How to load data at build time in VitePress
link_title: VitePress data loaders
subtitle: Fetch once, render statically
logo: { src: /assets/logos/vitepress.svg }
category: JavaScript libraries
layout: snippet
tier: t3
last_verified_with: "VitePress 1.6.4, Node 26.13.1."
updated: 2026-11-28
links:
  - title: Build-time data loading
    url: https://vitepress.dev/guide/data-loading
  - title: VitePress cheatsheet
    url: ./vitepress
---

## Data
<!-- {: .-snippets} -->

### Write a loader
<!-- {: .-snippet} -->

#### docs/posts.data.mts

```ts
import { defineLoader } from 'vitepress'

export default defineLoader({
  async load() {
    const url = 'https://api.example.com/posts'
    const res = await fetch(url)
    return await res.json()
  }
})
```
<!-- {: data-highlight="defineLoader({"} -->

**Runs only at build time.** The result is serialized into the page bundle, so visitors never call the API. See [data loading](https://vitepress.dev/guide/data-loading).

### Read it on a page
<!-- {: .-snippet} -->

```md
<script setup>
import { data as posts } from './posts.data.mts'
</script>

<ul>
  <li v-for="post in posts" :key="post.id">
    {{ post.title }}
  </li>
</ul>
```
<!-- {: data-highlight="data as posts"} -->

**Imports the resolved data.** The `.data.mts` file sits beside the page and the `data` export holds the loader's return value. See [using data](https://vitepress.dev/guide/data-loading#basic-usage).

### Type the result
<!-- {: .-snippet} -->

```ts
import { defineLoader } from 'vitepress'

interface Post {
  id: number
  title: string
}

declare const data: Post[]
export { data }

export default defineLoader({
  async load(): Promise<Post[]> {
    return []
  }
})
```
<!-- {: data-highlight="declare const data: Post[]"} -->

**Types both sides.** `defineLoader` checks the return type and the `data` declaration types the page import. See [typed data loaders](https://vitepress.dev/guide/data-loading#typed-data-loaders).
