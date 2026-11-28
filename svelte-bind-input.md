---
title: How to bind an input in Svelte
link_title: Bind Svelte inputs
subtitle: Two-way form bindings
logo: { src: /assets/logos/svelte.svg }
category: JavaScript frameworks
layout: snippet
last_verified_with: "Svelte 5.59.2."
updated: 2026-11-28
links:
  - title: Bindings
    url: https://svelte.dev/docs/svelte/bind
  - title: Function bindings
    url: https://svelte.dev/docs/svelte/bind#Function-bindings
---

## Input bindings
<!-- {: .-snippets} -->

### Bind text
<!-- {: .-snippet} -->

```html
<script>
  let name = $state('')
</script>

<input bind:value={name} />
<p>{name}</p>
```
<!-- {: data-highlight="bind:value={name}"} -->

**Syncs both ways.** The input and the variable stay in sync without a change handler. See [Text bindings](https://svelte.dev/docs/svelte/bind#input-bind:value).

### Bind numbers
<!-- {: .-snippet} -->

```html
<script>
  let age = $state(0)
</script>

<input type="number" bind:value={age} />
<p>Age: {age}</p>
```
<!-- {: data-highlight='type="number"'} -->

**Coerces to a number.** Number and range inputs bind numbers, and an empty field binds `null`. See [Numeric inputs](https://svelte.dev/docs/svelte/bind#input-bind:value).

### Bind a checkbox and a group
<!-- {: .-snippet} -->

```html
<script>
  let agreed = $state(false)
  let picked = $state([])
</script>

<input type="checkbox" bind:checked={agreed} />

{#each ['red', 'green'] as color}
  <input
    type="checkbox"
    bind:group={picked}
    value={color}
  />
{/each}
```
<!-- {: data-highlight="bind:group={picked}"} -->

**Collects checked values.** Group bindings fill an array; a single checkbox uses `bind:checked` and holds a boolean. See [Group bindings](https://svelte.dev/docs/svelte/bind#input-bind:group).

### Bind a select
<!-- {: .-snippet} -->

```html
<script>
  let choice = $state('a')
</script>

<select bind:value={choice}>
  <option value="a">A</option>
  <option value="b">B</option>
</select>
```
<!-- {: data-highlight="bind:value={choice}"} -->

**Binds the chosen option's value.** For `<select multiple>` the value is an array; see [Select bindings](https://svelte.dev/docs/svelte/bind#select-bind:value).

### Transform with a get/set pair
<!-- {: .-snippet} -->

```html
<script>
  let code = $state('')

  const get = () => code
  const set = (value) =>
    (code = value.toUpperCase())
</script>

<input bind:value={get, set} />
```
<!-- {: data-highlight="bind:value={get, set}"} -->

**Transforms each write.** A function binding uses a getter to feed the input and a setter to normalise what is stored. See [Function bindings](https://svelte.dev/docs/svelte/bind#Function-bindings).

### Get the DOM node
<!-- {: .-snippet} -->

```html
<script>
  let field = $state()
</script>

<input bind:this={field} />
<button onclick={() => field.focus()}>
  Focus
</button>
```
<!-- {: data-highlight="bind:this={field}"} -->

**Holds the element itself.** `bind:this` is set after mount, so guard with `field?.focus()` if the node may be gone; see [`bind:this`](https://svelte.dev/docs/svelte/bind#bind:this).
