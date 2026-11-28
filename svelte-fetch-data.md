---
title: How to fetch data in Svelte
link_title: Fetch data in Svelte
subtitle: Loading remote data
logo: { src: /assets/logos/svelte.svg }
category: JavaScript frameworks
layout: snippet
last_verified_with: "Svelte 5.59.2."
created_at: 2026-11-26
updated: 2026-11-28
links:
  - title: $effect
    url: https://svelte.dev/docs/svelte/$effect
  - title: await blocks
    url: https://svelte.dev/docs/svelte/await
---

## Fetching data
<!-- {: .-snippets} -->

### Fetch in an effect
<!-- {: .-snippet} -->

```html
<script>
  let user = $state(null)

  $effect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then((data) => (user = data))
  })
</script>

<p>{user?.name}</p>
```
<!-- {: data-highlight="$effect"} -->

**Loads once on mount.** The effect tracks no state, so it runs on mount only; SvelteKit projects use [`load`](https://svelte.dev/docs/kit/load) instead. See [`$effect`](https://svelte.dev/docs/svelte/$effect).

### Track loading and errors
<!-- {: .-snippet} -->

```html
<script>
  let loading = $state(true)
  let error = $state(null)
  let user = $state(null)

  $effect(() => {
    load()
  })

  async function load() {
    try {
      const res = await fetch('/api/user')
      user = await res.json()
    } catch (e) {
      error = e.message
    } finally {
      loading = false
    }
  }
</script>

{#if loading}
  <p>Loading…</p>
{:else if error}
  <p>{error}</p>
{:else}
  <p>{user.name}</p>
{/if}
```

**Keeps all three states explicit.** An async function keeps the flow readable and `finally` always clears the spinner; see [Await blocks](https://svelte.dev/docs/svelte/await) for the `{#await}` alternative to these three states.

### Cancel on cleanup
<!-- {: .-snippet} -->

```html
<script>
  let query = $state('')
  let results = $state([])

  $effect(() => {
    const search = query
    const ctrl = new AbortController()

    fetch(`/api/search?q=${search}`, {
      signal: ctrl.signal
    })
      .then((res) => res.json())
      .then((data) => (results = data))
      .catch(() => {})

    return () => ctrl.abort()
  })
</script>
```
<!-- {: data-highlight="ctrl.abort()"} -->

**Aborts the previous request.** It happens when `query` changes: each run creates its own controller, and the cleanup cancels stale loads. See [Effect cleanup](https://svelte.dev/docs/svelte/$effect#Understanding-lifecycle).

### Render a promise with an await block
<!-- {: .-snippet} -->

```html
<script>
  let userId = $state(1)
  let promise = $derived(load(userId))
</script>

{#await promise}
  <p>Loading…</p>
{:then user}
  <p>{user.name}</p>
{:catch error}
  <p>{error.message}</p>
{/await}
```
<!-- {: data-highlight="{#await promise}"} -->

**Branches on promise state.** It happens in markup; a new `userId` produces a new promise and restarts the block. See [await blocks](https://svelte.dev/docs/svelte/await).
