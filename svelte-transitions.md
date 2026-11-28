---
title: How to add transitions in Svelte
link_title: Svelte transitions
subtitle: Enter, exit, and list motion
logo: { src: /assets/logos/svelte.svg }
category: JavaScript frameworks
layout: snippet
last_verified_with: "Svelte 5.59.2."
created_at: 2026-11-26
updated: 2026-11-28
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

**Runs one transition,** on both enter and exit. Svelte waits for the out transition before removing the node; See [Transitions](https://svelte.dev/docs/svelte/transition).

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
<!-- {: data-highlight="duration: 200"} -->

**Takes parameters as an object,** for the effect; `in:` runs only on arrival, and `duration` is in milliseconds; See [Transition parameters](https://svelte.dev/docs/svelte/transition#Transition-parameters).

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
<!-- {: data-highlight="in:fly; out:fade"} -->

**Uses different effects,** one for each direction. Pairing `in:` and `out:` is the usual way to get an asymmetric motion; See [in and out](https://svelte.dev/docs/svelte/in-and-out).

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

**Moves items between positions,** old and new. `animate:flip` needs a keyed `{#each}` block; See [Animating lists](https://svelte.dev/docs/svelte/animate).

### Run a transition globally
<!-- {: .-snippet} -->

```html
<script>
  import { fade } from 'svelte/transition'

  let visible = $state(true)
  let inner = $state(true)
</script>

{#if visible}
  {#if inner}
    <p transition:fade|global>Saved</p>
  {/if}
{/if}
```
<!-- {: data-highlight="transition:fade|global"} -->

**Plays globally,** even when the outer block is removed. Transitions are local by default, so without `|global` toggling `visible` would skip the fade; See [Local vs global](https://svelte.dev/docs/svelte/transition#Local-vs-global).
