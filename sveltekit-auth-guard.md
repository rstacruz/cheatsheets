---
title: How to protect routes in SvelteKit
link_title: SvelteKit auth guard
subtitle: Guard pages with hooks
category: SvelteKit
layout: snippet
last_verified_with: "SvelteKit 3.4.1."
updated: 2026-11-26
links:
  - title: Auth
    url: https://svelte.dev/docs/kit/auth
  - title: handle hook
    url: https://svelte.dev/docs/kit/hooks#handle
---

## Auth guards
<!-- {: .-snippets} -->

### Declare locals
<!-- {: .-snippet} -->

#### src/app.d.ts

```ts
declare global {
  namespace App {
    interface Locals {
      user: string | null
    }
  }
}
export {}
```
<!-- {: data-highlight="interface Locals"} -->

**Types `event.locals` across the app.** Server loads and actions can then read `locals.user`; see [locals](https://svelte.dev/docs/kit/hooks#handle-locals).

### Read the session cookie
<!-- {: .-snippet} -->

#### src/hooks.server.ts

```ts
import type { Handle } from '@sveltejs/kit/hooks'

export const handle: Handle = async (
  { event, resolve }
) => {
  event.locals.user =
    event.cookies.get('session') ?? null
  return resolve(event)
}
```
<!-- {: data-highlight="event.cookies.get"} -->

**Runs for every request.** The hook loads the user once, before loads and actions; see [handle](https://svelte.dev/docs/kit/hooks#handle).

### Guard a path
<!-- {: .-snippet} -->

```ts
const isAdmin = event.route.id
  ?.split('/').includes('admin')

if (isAdmin && !event.locals.user) {
  redirect(303, '/login')
}
```
<!-- {: data-highlight="includes('admin')"} -->

**Matches the routed page by segment.** Route groups prefix ids (`/(app)/admin`) and `/%61dmin` resolves to `/admin`; prerendered pages bypass `handle`; see [Auth](https://svelte.dev/docs/kit/auth).

### Read the user in a load
<!-- {: .-snippet} -->

#### src/routes/admin/+page.server.ts

```ts
export function load({ locals }) {
  return { user: locals.user }
}
```
<!-- {: data-highlight="locals.user"} -->

**Passes the user to the page.** The load receives the same `locals` the hook populated; see [locals](https://svelte.dev/docs/kit/hooks#handle-locals).
