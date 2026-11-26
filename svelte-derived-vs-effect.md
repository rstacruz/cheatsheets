---
title: When to use $derived and $effect in Svelte
link_title: $derived vs $effect
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

**Uses `$derived` for anything that can be computed.** It re-evaluates lazily and never runs during server rendering; see [`$derived`](https://svelte.dev/docs/svelte/$derived).

### Run a side effect with $effect
<!-- {: .-snippet} -->

```html
<script>
  let theme = $state('dark')

  $effect(() => {
    document.body.dataset.theme = theme
  })
</script>
```
<!-- {: data-highlight="$effect"} -->

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

**Returns a cleanup from the effect.** It runs before the next effect and on unmount, so the old socket never lingers; see [Effect cleanup](https://svelte.dev/docs/svelte/$effect#When-effects-run-and-when-they-dont).

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
  let items = $state([])
  let height = $state(0)

  $effect.pre(() => {
    height = items.length * 24
  })
</script>
```
<!-- {: data-highlight="$effect.pre"} -->

**Uses `$effect.pre` for pre-paint work.** It runs before Svelte applies the pending DOM changes; see [`$effect.pre`](https://svelte.dev/docs/svelte/$effect#$effect.pre).
