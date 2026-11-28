---
title: How to protect routes in SvelteKit
link_title: SvelteKit auth guard
subtitle: Guard pages with hooks
logo: { src: /assets/logos/svelte.svg }
category: JavaScript frameworks
layout: snippet
last_verified_with: "SvelteKit 3.4.1."
updated: 2026-11-28
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
      user: { id: string } | null
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
import { findUser } from
  '#lib/server/auth.js'

export const handle: Handle = async (
  { event, resolve }
) => {
  const session = event.cookies.get('session')
  event.locals.user = session
    ? await findUser(session)
    : null
  return resolve(event)
}
```
<!-- {: data-highlight="findUser(session)"} -->

**Looks up the session.** The hook does this before every request and fills `locals` once, before loads and actions. See [handle](https://svelte.dev/docs/kit/hooks#handle).

### Guard a path
<!-- {: .-snippet} -->

```ts
import { redirect } from '@sveltejs/kit'

const isAdmin = (event.route.id ?? '')
  .split('/').includes('admin')

if (isAdmin && !event.locals.user) {
  redirect(303, '/login')
}
```
<!-- {: data-highlight="includes('admin')"} -->

**Matches by segment.** It guards the routed page: route groups prefix ids (`/(app)/admin`), `/%61dmin` resolves to `/admin`, and prerendered pages bypass `handle`. See [Auth](https://svelte.dev/docs/kit/auth).

### Read the user in a load
<!-- {: .-snippet} -->

#### src/routes/admin/+page.server.ts

```ts
export function load({ locals }) {
  return { user: locals.user }
}
```
<!-- {: data-highlight="locals.user"} -->

**Passes the user along.** The load passes the user to the page and receives the same `locals` the hook populated. See [locals](https://svelte.dev/docs/kit/hooks#handle-locals).
