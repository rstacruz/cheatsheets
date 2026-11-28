---
title: When to use $derived and $effect in Svelte
link_title: Derived vs effect
subtitle: Values vs side effects
logo: { src: /assets/logos/svelte.svg }
category: JavaScript frameworks
layout: snippet
last_verified_with: "Svelte 5.59.2."
created_at: 2026-11-26
updated: 2026-11-28
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

**Uses `$derived`.** Use it for anything computable; it re-evaluates lazily and, unlike an effect, also runs during server rendering. See [`$derived`](https://svelte.dev/docs/svelte/$derived).

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

**Uses `$effect`.** It reaches outside the component: writing to the DOM, logging, or starting a browser API is effect work. See [`$effect`](https://svelte.dev/docs/svelte/$effect).

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

**Returns a cleanup.** The effect's cleanup runs before the next effect and on unmount, so the old socket never lingers. See [Effect cleanup](https://svelte.dev/docs/svelte/$effect#Understanding-lifecycle).

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

**Keeps a read untracked.** The read stays out of the dependency graph; `untrack` stops `other` from re-triggering the effect. See [`untrack`](https://svelte.dev/docs/svelte/svelte#untrack).

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

<div bind:this={log}>
  {#each messages as message}
    <p>{message}</p>
  {/each}
</div>
```
<!-- {: data-highlight="$effect.pre"} -->

**Reads the pre-update DOM.** `$effect.pre` runs before Svelte applies the update: `height` is the pre-update measurement, which a plain `$effect` reports only once the DOM has grown. See [`$effect.pre`](https://svelte.dev/docs/svelte/$effect#$effect.pre).
