---
title: How to comment in Svelte
link_title: Comment in Svelte
subtitle: Comments in components
category: JavaScript frameworks
layout: snippet
last_verified_with: "Svelte 5.59.2."
updated: 2026-11-26
links:
  - title: Template syntax
    url: https://svelte.dev/docs/svelte/basic-markup
  - title: Component format
    url: https://svelte.dev/docs/svelte/component
---

## Comments
<!-- {: .-snippets} -->

### Comment markup
<!-- {: .-snippet} -->

```html
<p>Total: {total}</p>
<!-- shown in the HTML source -->
```
<!-- {: data-highlight="shown in the HTML source"} -->

**Uses an HTML comment.** Markup comments survive into the rendered page, so keep anything private out of them; see [template syntax](https://svelte.dev/docs/svelte/basic-markup).

### Comment script code
<!-- {: .-snippet} -->

```html
<script>
  // a line comment
  /* a block comment */
  let count = $state(0)
</script>
```

**Uses JavaScript comments.** Both forms are stripped at compile time, unlike markup comments; see [Component format](https://svelte.dev/docs/svelte/component).

### Comment styles
<!-- {: .-snippet} -->

```html
<p class="card">Total</p>

<style>
  /* scoped to this component */
  .card { color: tomato; }
</style>
```
<!-- {: data-highlight="/* scoped to this component */"} -->

**Uses CSS comments inside `<style>`.** They disappear from the compiled CSS; see [Scoped styles](https://svelte.dev/docs/svelte/styling).

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
