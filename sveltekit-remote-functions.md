---
title: How to use remote functions in SvelteKit
link_title: SvelteKit remote functions
subtitle: Type-safe server calls
category: SvelteKit
layout: snippet
last_verified_with: "SvelteKit 3.4.1, Svelte 5.59.2."
updated: 2026-11-26
links:
  - title: Remote functions
    url: https://svelte.dev/docs/kit/remote-functions
---

## Remote functions
<!-- {: .-snippets} -->

### Enable the feature
<!-- {: .-snippet} -->

#### vite.config.ts

```ts
sveltekit({
  experimental: { remoteFunctions: true },
  compilerOptions: {
    experimental: { async: true }
  }
})
```
<!-- {: data-highlight="remoteFunctions: true"} -->

**Opts into the experimental API.** Remote functions are still experimental in SvelteKit 3; see [Remote functions](https://svelte.dev/docs/kit/remote-functions).

### Query the server
<!-- {: .-snippet} -->

#### src/routes/todos/todos.remote.ts

```ts
import { query } from '$app/server'

export const getTodos = query(async () => {
  return await db.todo.findMany()
})
```
<!-- {: data-highlight="query(async"} -->

**Runs on the server and returns a fetch wrapper.** A `query()` in a `.remote.ts` file is safe to import in components; see [query](https://svelte.dev/docs/kit/remote-functions#query).

### Await in markup
<!-- {: .-snippet} -->

```html
<script lang="ts">
  import { getTodos } from './todos.remote'
</script>

{#each await getTodos() as todo (todo.id)}
  <li>{todo.title}</li>
{/each}
```
<!-- {: data-highlight="await getTodos()"} -->

**Renders when the query resolves.** The nearest `<svelte:boundary>` handles loading and errors; see [query](https://svelte.dev/docs/kit/remote-functions#query).

### Validate arguments
<!-- {: .-snippet} -->

```ts
import * as v from 'valibot'
import { query } from '$app/server'

export const getTodo = query(
  v.string(),
  async (id) => {
    return await db.todo.findFirstOrThrow({
      where: { id }
    })
  }
)
```
<!-- {: data-highlight="v.string()"} -->

**Checks the payload before the handler runs.** The first argument is a Standard Schema, so the HTTP endpoint cannot pass junk; see [Query arguments](https://svelte.dev/docs/kit/remote-functions#query-Query-arguments).

### Submit with a form
<!-- {: .-snippet} -->

#### todos.remote.ts

```ts
import * as v from 'valibot'
import { form } from '$app/server'

export const addTodo = form(
  v.object({
    title: v.pipe(v.string(), v.nonEmpty())
  }),
  async ({ title }) => {
    await db.todo.create({ data: { title } })
  }
)
```
<!-- {: data-highlight="form("} -->

#### +page.svelte

```html
<form {...addTodo}>
  <input {...addTodo.fields.title.as('text')} />
  <button>Add</button>
</form>
```

**Carries method, action, and field attributes.** The spread works without JavaScript and enhances itself; see [form](https://svelte.dev/docs/kit/remote-functions#form).
