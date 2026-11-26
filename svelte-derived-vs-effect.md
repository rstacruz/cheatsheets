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
  let messages = $state([])
  let log = $state()

  $effect.pre(() => {
    const height = log?.scrollHeight
    console.log(messages.length, height)
  })
</script>

<div bind:this={log}>…</div>
```
<!-- {: data-highlight="$effect.pre"} -->

**Reads the DOM before Svelte applies the update.** `height` is the pre-update measurement, which a plain `$effect` reports only once the DOM has grown; see [`$effect.pre`](https://svelte.dev/docs/svelte/$effect#$effect.pre).
