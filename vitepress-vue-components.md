---
title: How to use Vue components in VitePress Markdown
link_title: VitePress Vue components
subtitle: Interactive widgets inside pages
category: JavaScript libraries
layout: snippet
tier: t3
last_verified_with: "VitePress 1.6.4, Vue 3.5.13, Node 26.13.1."
updated: 2026-11-27
links:
  - title: Using Vue in Markdown
    url: https://vitepress.dev/guide/using-vue
  - title: Global components
    url: https://vitepress.dev/guide/extending-default-theme#registering-global-components
  - title: VitePress cheatsheet
    url: ./vitepress
---

## Components
<!-- {: .-snippets} -->

### Use a component on a page
<!-- {: .-snippet} -->

#### docs/guide/counter.md

```md
<Counter />

<script setup>
import Counter from '../ui/Counter.vue'
</script>
```
<!-- {: data-highlight="<Counter />"} -->

**Renders the component above the prose.** The block's `script setup` runs per page, so the import only exists there. See [using components](https://vitepress.dev/guide/using-vue#using-components).

### Write the component
<!-- {: .-snippet} -->

#### docs/ui/Counter.vue

```html
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">
    Clicked {{ count }} times
  </button>
</template>
```
<!-- {: data-highlight='@click="count++"'} -->

**Adds a client-side counter.** Code in `<script setup>` runs in the browser after hydration, so state and events work. See [using Vue in Markdown](https://vitepress.dev/guide/using-vue).

### Register it globally
<!-- {: .-snippet} -->

#### docs/.vitepress/theme/index.ts

```ts
import DefaultTheme from 'vitepress/theme'
import Counter from '../../ui/Counter.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Counter', Counter)
  }
}
```
<!-- {: data-highlight="app.component('Counter', Counter)"} -->

**Skips the import on every page.** Global components are available in all Markdown files once registered. See [global components](https://vitepress.dev/guide/extending-default-theme#registering-global-components).
