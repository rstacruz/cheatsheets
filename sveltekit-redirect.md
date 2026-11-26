---
title: How to redirect in SvelteKit
link_title: SvelteKit redirects
subtitle: Load, actions, and hooks
category: SvelteKit
layout: snippet
last_verified_with: "SvelteKit 3.4.1."
updated: 2026-11-26
links:
  - title: redirect()
    url: https://svelte.dev/docs/kit/@sveltejs-kit#redirect
  - title: Redirects in loads
    url: https://svelte.dev/docs/kit/load#Redirects
---

## Redirecting
<!-- {: .-snippets} -->

### Redirect from a load
<!-- {: .-snippet} -->

```ts
import { redirect } from '@sveltejs/kit'

export function load() {
  redirect(308, '/new-page')
}
```
<!-- {: data-highlight="redirect(308"} -->

**Sends a permanent redirect before rendering.** Use `307` to keep the request method and `303` to switch to a GET; see [Redirects](https://svelte.dev/docs/kit/load#Redirects).

### Redirect after a form
<!-- {: .-snippet} -->

```ts
redirect(303, '/admin')
```
<!-- {: data-highlight="redirect(303"} -->

**Turns a POST into a GET navigation.** Call it at the end of a successful action; see [Redirects](https://svelte.dev/docs/kit/form-actions#Anatomy-of-an-action-Redirects).

### Redirect to another site
<!-- {: .-snippet} -->

```ts
redirect(303, 'https://svelte.dev', {
  external: true
})
```
<!-- {: data-highlight="external: true"} -->

**Requires explicit permission for external URLs.** Pass `true`, or an allowlist of origins; see [redirect()](https://svelte.dev/docs/kit/@sveltejs-kit#redirect).

### Guard a route in a hook
<!-- {: .-snippet} -->

```ts
if (!event.locals.user) {
  redirect(303, '/login')
}
```
<!-- {: data-highlight="event.locals.user"} -->

**Runs before dynamic pages load.** Redirect inside `handle`, not a layout load; prerendered pages bypass it; see [Auth](https://svelte.dev/docs/kit/auth).

### Redirect after login on the client
<!-- {: .-snippet} -->

```ts
import { goto } from '$app/navigation'

await goto('/dashboard')
```
<!-- {: data-highlight="goto('/dashboard')"} -->

**Navigates without a full page load.** Use `goto()` in the browser; a load or action should use `redirect()`; see [$app/navigation](https://svelte.dev/docs/kit/$app-navigation).
