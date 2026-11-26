---
title: How to migrate a component to Svelte 5
link_title: Migrate to Svelte 5
subtitle: Svelte 4 to runes
category: JavaScript frameworks
layout: snippet
last_verified_with: "Svelte 5.59.2."
updated: 2026-11-26
links:
  - title: Migration guide
    url: https://svelte.dev/docs/svelte/v5-migration-guide
  - title: sv migrate
    url: https://svelte.dev/docs/cli/sv-migrate
---

## Migrating
<!-- {: .-snippets} -->

### Run the codemod
<!-- {: .-snippet} -->

```bash
npx sv migrate svelte-5
```
<!-- {: data-highlight="svelte-5"} -->

**Rewrites most of the syntax for you.** It converts props, reactivity, events, and slots, so review its diff instead of editing by hand; see [Migration guide](https://svelte.dev/docs/svelte/v5-migration-guide).

### Convert props
<!-- {: .-snippet} -->

#### Before

```html
<script>
  export let name = 'world'
  export let items = []
</script>
```
<!-- {: data-highlight="export let"} -->

#### After

```html
<script>
  let {
    name = 'world',
    items = []
  } = $props()
</script>
```
<!-- {: data-highlight="$props()"} -->

**Replaces `export let` with a destructured `$props()`.** Defaults move into the pattern; see [`$props`](https://svelte.dev/docs/svelte/$props).

### Convert reactive statements
<!-- {: .-snippet} -->

#### Before

```html
<script>
  let count = 0
  $: doubled = count * 2
</script>
```
<!-- {: data-highlight="$:"} -->

#### After

```html
<script>
  let count = $state(0)
  let doubled = $derived(count * 2)
</script>
```
<!-- {: data-highlight="$derived(count * 2)"} -->

**Turns `$:` into `$derived`.** Statements with side effects become `run(...)` from `svelte/legacy`; replace those with `$effect` by hand; see [`$derived`](https://svelte.dev/docs/svelte/$derived).

### Convert event handlers
<!-- {: .-snippet} -->

#### Before

```html
<button on:click={save}>Save</button>
```

#### After

```html
<button onclick={save}>Save</button>
```
<!-- {: data-highlight="onclick={save}"} -->

**Drops the `on:` prefix.** Modifiers such as `|preventDefault` go too: call the method in the handler; see [Event changes](https://svelte.dev/docs/svelte/v5-migration-guide#Event-changes-Event-modifiers).

### Convert slots
<!-- {: .-snippet} -->

#### Before

```html
<slot />
```

#### After

```html
<script>
  let { children } = $props()
</script>

{@render children()}
```
<!-- {: data-highlight="{@render children()}"} -->

**Replaces `<slot>` with snippet props.** `<slot name="header" />` becomes a `header` prop rendered with `{@render header?.()}`; see [Snippets instead of slots](https://svelte.dev/docs/svelte/v5-migration-guide#Snippets-instead-of-slots).
