---
title: How to comment in Svelte
link_title: Comment in Svelte
subtitle: Comments in components
logo: { src: /assets/logos/svelte.svg }
category: JavaScript frameworks
layout: snippet
last_verified_with: "Svelte 5.59.2."
updated: 2026-11-26
links:
  - title: Template syntax
    url: https://svelte.dev/docs/svelte/basic-markup
  - title: Svelte files
    url: https://svelte.dev/docs/svelte/svelte-files
---

## Comments
<!-- {: .-snippets} -->

### Comment markup
<!-- {: .-snippet} -->

```html
<script>
  let total = 3
</script>

<p>Total: {total}</p>
<!-- a note for the next editor -->
```
<!-- {: data-highlight="a note for the next editor"} -->

**Uses an HTML comment.** It compiles away unless `preserveComments` is on, so it never reaches the browser by default; see [Template syntax](https://svelte.dev/docs/svelte/basic-markup).

### Comment script
<!-- {: .-snippet} -->

```html
<script>
  // a line comment
  /* a block comment */
  let count = $state(0)
</script>
```
<!-- {: data-highlight="// a line comment; /* a block comment */"} -->

**Uses JavaScript comments.** Svelte keeps them in the compiled module, and a bundler's minifier drops them in production; see [Svelte files](https://svelte.dev/docs/svelte/svelte-files).

### Comment CSS
<!-- {: .-snippet} -->

```html
<p class="card">Total</p>

<style>
  /* scoped to this component */
  .card { color: tomato; }
</style>
```
<!-- {: data-highlight="/* scoped to this component */"} -->

**Uses CSS comments inside `<style>`.** They stay in the compiled CSS until a minifier removes them; see [Scoped styles](https://svelte.dev/docs/svelte/scoped-styles).

### Comment out a markup block
<!-- {: .-snippet} -->

```html
<!--
  {#if hidden}
    <p>Not rendered</p>
  {/if}
-->
```
<!-- {: data-highlight="{#if hidden}"} -->

**Wraps the block in an HTML comment.** Svelte does not parse inside it, so the block is not compiled or rendered; see [Template syntax](https://svelte.dev/docs/svelte/basic-markup).
