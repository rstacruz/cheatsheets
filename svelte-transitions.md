---
title: How to add transitions in Svelte
link_title: Svelte transitions
subtitle: Enter, exit, and list motion
category: JavaScript frameworks
layout: snippet
last_verified_with: "Svelte 5.59.2."
updated: 2026-11-26
links:
  - title: Transitions
    url: https://svelte.dev/docs/svelte/transition
  - title: Animating lists
    url: https://svelte.dev/docs/svelte/animate
---

## Transitions
<!-- {: .-snippets} -->

### Fade a block in and out
<!-- {: .-snippet} -->

```html
<script>
  import { fade } from 'svelte/transition'

  let visible = $state(true)
</script>

{#if visible}
  <p transition:fade>Saved</p>
{/if}
```
<!-- {: data-highlight="transition:fade"} -->

**Runs the same transition on enter and exit.** Svelte waits for the out transition before removing the node; see [Transitions](https://svelte.dev/docs/svelte/transition).

### Pass transition options
<!-- {: .-snippet} -->

```html
<script>
  import { fly } from 'svelte/transition'

  let open = $state(true)
</script>

{#if open}
  <div in:fly={{ y: 20, duration: 200 }}>
    Panel
  </div>
{/if}
```
<!-- {: data-highlight="in:fly"} -->

**Takes the effect's parameters as an object.** `in:` runs only on arrival, and `duration` is in milliseconds; see [Transition parameters](https://svelte.dev/docs/svelte/transition#Transition-parameters).

### Mix in and out transitions
<!-- {: .-snippet} -->

```html
<script>
  import { fade, fly } from 'svelte/transition'

  let open = $state(true)
</script>

{#if open}
  <div in:fly={{ y: 8 }} out:fade>
    Toast
  </div>
{/if}
```
<!-- {: data-highlight="out:fade"} -->

**Uses different effects for each direction.** Pairing `in:` and `out:` is the usual way to get an asymmetric motion; see [Transition directives](https://svelte.dev/docs/svelte/transition#Transition-directives).

### Animate a reordered list
<!-- {: .-snippet} -->

```html
<script>
  import { flip } from 'svelte/animate'

  let items = $state([])
</script>

{#each items as item (item.id)}
  <li animate:flip={{ duration: 200 }}>
    {item.name}
  </li>
{/each}
```
<!-- {: data-highlight="animate:flip"} -->

**Moves items between their old and new positions.** `animate:flip` needs a keyed `{#each}` block; see [Animating lists](https://svelte.dev/docs/svelte/animate).

### Run a transition globally
<!-- {: .-snippet} -->

```html
<script>
  import { fade } from 'svelte/transition'

  let visible = $state(true)
</script>

{#if visible}
  <p transition:fade|global>Saved</p>
{/if}
```
<!-- {: data-highlight="transition:fade|global"} -->

**Plays even when the block's parent is not transitioning.** Transitions are local by default, and `|global` opts out; see [Local vs global](https://svelte.dev/docs/svelte/transition#Local-vs-global).
