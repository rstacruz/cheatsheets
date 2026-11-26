---
title: How to key an each block in Svelte
link_title: Key an each block
subtitle: Identity in list rendering
category: JavaScript frameworks
layout: snippet
last_verified_with: "Svelte 5.59.2."
updated: 2026-11-26
links:
  - title: each blocks
    url: https://svelte.dev/docs/svelte/each
  - title: key blocks
    url: https://svelte.dev/docs/svelte/key
---

## Keys
<!-- {: .-snippets} -->

### Key by id
<!-- {: .-snippet} -->

```html
{#each users as user (user.id)}
  <UserCard {user} />
{/each}
```
<!-- {: data-highlight="(user.id)"} -->

**Gives every item a stable identity.** When the array reorders, Svelte moves the existing nodes instead of patching them in place; see [each blocks](https://svelte.dev/docs/svelte/each).

### Keep typed input in place
<!-- {: .-snippet} -->

```html
<script>
  let rows = $state([
    { id: 1, name: 'Ada' },
    { id: 2, name: 'Grace' }
  ])
</script>

{#each rows as row (row.id)}
  <input placeholder={row.name} />
{/each}
```

**Keeps DOM state with the item it belongs to.** Without a key, a reorder reuses each `<input>` for a different row and the text you typed stays behind; see [each blocks](https://svelte.dev/docs/svelte/each).

### Avoid the index as a key
<!-- {: .-snippet} -->

```html
<!-- wrong: identity follows position -->
{#each rows as row, i (i)}
  <RowEditor {row} />
{/each}
```
<!-- {: data-highlight="(i)"} -->

**Pins identity to position.** Sorting or deleting an item then reuses the wrong component state; key by a stable field instead, as [each blocks](https://svelte.dev/docs/svelte/each#Keyed-each-blocks) shows.

### Reset a component with a key block
<!-- {: .-snippet} -->

```html
{#key selectedId}
  <Editor {selectedId} />
{/key}
```
<!-- {: data-highlight="{#key selectedId}"} -->

**Destroys and recreates the block.** Use it when a change should reset state or replay a transition; see [key blocks](https://svelte.dev/docs/svelte/key).

### Key nested lists
<!-- {: .-snippet} -->

```html
{#each groups as group (group.id)}
  <h2>{group.name}</h2>
  {#each group.items as item (item.id)}
    <p>{item.name}</p>
  {/each}
{/each}
```
<!-- {: data-highlight="(group.id); (item.id)"} -->

**Keys each level separately.** Give both loops a key so moving an item between groups keeps its identity; see [each blocks](https://svelte.dev/docs/svelte/each).
