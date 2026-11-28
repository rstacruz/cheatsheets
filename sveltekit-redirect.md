---
title: How to redirect in SvelteKit
link_title: SvelteKit redirects
subtitle: Load, actions, and hooks
logo: { src: /assets/logos/svelte.svg }
category: JavaScript frameworks
layout: snippet
last_verified_with: "SvelteKit 3.4.1."
updated: 2026-11-28
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

**Redirects before rendering.** Throw a permanent redirect from a load; use `307` to keep the request method and `303` to switch to a GET. See [Redirects](https://svelte.dev/docs/kit/load#Redirects).

### Redirect after a form
<!-- {: .-snippet} -->

```ts
redirect(303, '/admin')
```
<!-- {: data-highlight="redirect(303"} -->

**Turns POST into GET.** The redirect changes a form's POST into a GET navigation; call it at the end of a successful action. See [Redirects](https://svelte.dev/docs/kit/form-actions#Anatomy-of-an-action-Redirects).

### Redirect to another site
<!-- {: .-snippet} -->

```ts
redirect(303, 'https://svelte.dev', {
  external: true
})
```
<!-- {: data-highlight="external: true"} -->

**Allows external URLs explicitly.** Redirecting to another site needs permission: pass `true`, or an allowlist of origins. See [redirect()](https://svelte.dev/docs/kit/@sveltejs-kit#redirect).

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

**Navigates client-side.** There is no full page load: use `goto()` in the browser, while a load or action should use `redirect()`. See [$app/navigation](https://svelte.dev/docs/kit/$app-navigation).
