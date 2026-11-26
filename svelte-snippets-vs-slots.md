---
title: How to replace slots with snippets in Svelte
link_title: Snippets vs slots
subtitle: Passing content to components
category: JavaScript frameworks
layout: snippet
last_verified_with: "Svelte 5.59.2."
updated: 2026-11-26
links:
  - title: Snippets
    url: https://svelte.dev/docs/svelte/snippet
  - title: "Migration guide: slots"
    url: https://svelte.dev/docs/svelte/v5-migration-guide#Snippets-instead-of-slots
---

## Snippets and slots
<!-- {: .-snippets} -->

### Replace the default slot
<!-- {: .-snippet} -->

```html
<script>
  let { children } = $props()
</script>

<article class="card">
  {@render children()}
</article>
```
<!-- {: data-highlight="{@render children()}"} -->

**Uses the implicit `children` prop.** A parent writes `<Card>Hi</Card>` and `Hi` arrives as `children`; see [Default content](https://svelte.dev/docs/svelte/snippet#Passing-snippets-to-components).

### Replace named slots
<!-- {: .-snippet} -->

```html
<script>
  let { header, children } = $props()
</script>

<header>{@render header?.()}</header>
<article>{@render children()}</article>
```
<!-- {: data-highlight="header?.()"} -->

**Names a snippet prop instead of a slot name.** The optional call keeps the header out when the parent passes nothing; see [Snippet props](https://svelte.dev/docs/svelte/snippet#Passing-snippets-to-components).

### Pass slot props as arguments
<!-- {: .-snippet} -->

```html
<script>
  let { items, row } = $props()
</script>

<ul>
  {#each items as item (item.id)}
    {@render row(item)}
  {/each}
</ul>
```
<!-- {: data-highlight="row(item)"} -->

**Turns slot props into snippet arguments.** The parent decides how each item renders; see [Implicit props](https://svelte.dev/docs/svelte/snippet#Passing-snippets-to-components-Implicit-props).

### Provide fallback content
<!-- {: .-snippet} -->

```html
<script>
  let { footer } = $props()
</script>

{#if footer}
  {@render footer()}
{:else}
  <p>No footer</p>
{/if}
```
<!-- {: data-highlight="<p>No footer</p>"} -->

**Checks the prop before rendering it.** A snippet prop is `undefined` unless the parent passes one, so the fallback is ordinary markup; see [Snippets](https://svelte.dev/docs/svelte/snippet).

### Pass a snippet from the parent
<!-- {: .-snippet} -->

```html
<script>
  import List from './List.svelte'

  const items = [{ id: 1, name: 'Ada' }]
</script>

{#snippet row(item)}
  <li>{item.name}</li>
{/snippet}

<List {items} {row} />
```
<!-- {: data-highlight="{#snippet row(item)}"} -->

**Declares the snippet at the call site.** Snippets are values, so `{row}` passes like any other prop; see [Snippets](https://svelte.dev/docs/svelte/snippet).
