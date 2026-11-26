---
title: When to use $derived and $effect in Svelte
link_title: Derived vs effect
subtitle: Values vs side effects
category: JavaScript frameworks
layout: snippet
last_verified_with: "Svelte 5.59.2."
updated: 2026-11-26
links:
  - title: $derived
    url: https://svelte.dev/docs/svelte/$derived
  - title: $effect
    url: https://svelte.dev/docs/svelte/$effect
---

## Derived and effects
<!-- {: .-snippets} -->

### Compute a value with $derived
<!-- {: .-snippet} -->

```html
<script>
  let first = $state('Ada')
  let last = $state('Lovelace')
  let full = $derived(`${first} ${last}`)
</script>

<p>{full}</p>
```
<!-- {: data-highlight="$derived(`${first} ${last}`)"} -->

**Uses `$derived` for anything that can be computed.** It re-evaluates lazily, and unlike an effect it also runs during server rendering; see [`$derived`](https://svelte.dev/docs/svelte/$derived).

### Run a side effect with $effect
<!-- {: .-snippet} -->

```html
<script>
  let unread = $state(0)

  $effect(() => {
    document.title = unread
      ? `(${unread}) Inbox`
      : 'Inbox'
  })
</script>
```
<!-- {: data-highlight="document.title"} -->

**Uses `$effect` to reach outside the component.** Writing to the DOM, logging, or starting a browser API is effect work; see [`$effect`](https://svelte.dev/docs/svelte/$effect).

### Watch a value and clean up
<!-- {: .-snippet} -->

```html
<script>
  let room = $state('general')

  $effect(() => {
    const ws = new WebSocket(`/ws/${room}`)
    return () => ws.close()
  })
</script>
```
<!-- {: data-highlight="return () => ws.close()"} -->

**Returns a cleanup from the effect.** It runs before the next effect and on unmount, so the old socket never lingers; see [Effect cleanup](https://svelte.dev/docs/svelte/$effect#Understanding-lifecycle).

### Read without tracking
<!-- {: .-snippet} -->

```html
<script>
  import { untrack } from 'svelte'

  let count = $state(0)
  let other = $state(0)

  $effect(() => {
    console.log(count)
    untrack(() => console.log(other))
  })
</script>
```
<!-- {: data-highlight="untrack("} -->

**Keeps a read out of the dependency graph.** `untrack` stops `other` from re-triggering the effect; see [`untrack`](https://svelte.dev/docs/svelte/svelte#untrack).

### Run before the DOM updates
<!-- {: .-snippet} -->

```html
<script>
  let theme = $state('dark')

  $effect.pre(() => {
    document.body.dataset.theme = theme
  })
</script>
```
<!-- {: data-highlight="$effect.pre"} -->

**Runs before Svelte applies the DOM update.** Reach for it when the attribute must be set ahead of the markup that reads it; see [`$effect.pre`](https://svelte.dev/docs/svelte/$effect#$effect.pre).
