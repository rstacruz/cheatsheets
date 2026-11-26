---
title: How to type component props in Svelte
link_title: Type Svelte props
subtitle: Typed props with TypeScript
category: JavaScript frameworks
layout: snippet
last_verified_with: "Svelte 5.59.2."
updated: 2026-11-26
links:
  - title: TypeScript in Svelte
    url: https://svelte.dev/docs/svelte/typescript
  - title: $props
    url: https://svelte.dev/docs/svelte/$props
---

## Typing props
<!-- {: .-snippets} -->

### Annotate the props object
<!-- {: .-snippet} -->

```html
<script lang="ts">
  interface Props {
    name: string
    age?: number
  }

  let { name, age = 0 }: Props = $props()
</script>

<p>{name}, {age}</p>
```
<!-- {: data-highlight="}: Props = $props()"} -->

**Declares the prop shape once.** TypeScript then checks every caller and every use in the markup; see [TypeScript](https://svelte.dev/docs/svelte/typescript).

### Defaults for optional props
<!-- {: .-snippet} -->

```html
<script lang="ts">
  interface Props {
    size?: 'sm' | 'lg'
    label: string
  }

  let { size = 'sm', label }: Props = $props()
</script>

<button class={size}>{label}</button>
```
<!-- {: data-highlight="size = 'sm'"} -->

**Defaults belong in the destructuring pattern.** A prop with a default is still optional to callers, and `size` narrows to `'sm' | 'lg'`; see [`$props`](https://svelte.dev/docs/svelte/$props).

### Type children
<!-- {: .-snippet} -->

```html
<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    children: Snippet
  }

  let { children }: Props = $props()
</script>

<div class="card">{@render children()}</div>
```
<!-- {: data-highlight="children: Snippet"} -->

**Types slot content as a `Snippet`.** Mark it optional with `children?: Snippet` when the component works empty; see [Snippets](https://svelte.dev/docs/svelte/snippet).

### Type bindable props
<!-- {: .-snippet} -->

```html
<script lang="ts">
  interface Props {
    value?: string
  }

  let { value = $bindable('') }: Props = $props()
</script>

<input bind:value />
```
<!-- {: data-highlight="$bindable('')"} -->

**Keeps a prop two-way while staying typed.** Parents that omit `bind:value` still get a one-way prop; see [`$bindable`](https://svelte.dev/docs/svelte/$bindable).

### Forward a component's props
<!-- {: .-snippet} -->

```html
<script lang="ts">
  import Button from './Button.svelte'
  import type { ComponentProps } from 'svelte'

  type Props = ComponentProps<typeof Button>

  let props: Props = $props()
</script>

<Button {...props} />
```
<!-- {: data-highlight="ComponentProps<typeof Button>"} -->

**Reuses another component's prop type.** `ComponentProps` also covers `children`; see [`ComponentProps`](https://svelte.dev/docs/svelte/svelte#ComponentProps).
