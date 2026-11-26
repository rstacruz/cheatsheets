---
title: How to share state between Svelte components
link_title: Share Svelte state
subtitle: Modules, context, and stores
category: JavaScript frameworks
layout: snippet
last_verified_with: "Svelte 5.59.2."
updated: 2026-11-26
links:
  - title: Passing state across modules
    url: https://svelte.dev/docs/svelte/$state#Passing-state-across-modules
  - title: createContext
    url: https://svelte.dev/docs/svelte/svelte#createContext
---

## Shared state
<!-- {: .-snippets} -->

### Export an object from a module
<!-- {: .-snippet} -->

#### counter.svelte.js

```js
export const counter = $state({ count: 0 })

export function increment() {
  counter.count++
}
```
<!-- {: data-highlight="$state({ count: 0 })"} -->

**Keeps one reactive object for every importer.** Modules can't export a reassigned `let`, and during SSR the module is shared by every request; see [Universal reactivity](https://svelte.dev/docs/svelte/$state#Passing-state-across-modules).

### Wrap state in a class
<!-- {: .-snippet} -->

#### cart.svelte.js

```js
class Cart {
  items = $state([])

  get total() {
    return this.items.reduce(
      (sum, item) => sum + item.price,
      0
    )
  }
}

export const cart = new Cart()
```
<!-- {: data-highlight="items = $state([])"} -->

**Groups state with its methods.** Class fields hold `$state`, and getters recompute on read; see [Classes](https://svelte.dev/docs/svelte/$state#Classes).

### Scope state with context
<!-- {: .-snippet} -->

#### context.svelte.js

```js
import { createContext } from 'svelte'

export const [getUser, setUser] = createContext()
```
<!-- {: data-highlight="createContext()"} -->

#### Provider.svelte

```html
<script>
  import { setUser } from './context.svelte.js'

  setUser({ name: 'Ada' })
</script>
```

#### Consumer.svelte

```html
<script>
  import { getUser } from './context.svelte.js'

  const user = getUser()
</script>

<p>{user.name}</p>
```

**Shares state with descendants only.** `createContext` gives typed `get`/`set` helpers, and each subtree gets its own value; see [`createContext`](https://svelte.dev/docs/svelte/svelte#createContext).

### Fall back to a store
<!-- {: .-snippet} -->

#### stores.js

```js
import { writable } from 'svelte/store'

export const count = writable(0)
```
<!-- {: data-highlight="writable(0)"} -->

**Keeps the subscription API for libraries.** Components still read `$count`, and `get(count)` reads it imperatively; see [Stores](https://svelte.dev/docs/svelte/stores).
