---
title: How to set cookies in SvelteKit
link_title: SvelteKit cookies
subtitle: Sessions and user state
logo: { src: /assets/logos/svelte.svg }
category: JavaScript frameworks
layout: snippet
last_verified_with: "SvelteKit 3.4.1."
created_at: 2026-11-26
updated: 2026-11-28
links:
  - title: Cookies
    url: https://svelte.dev/docs/kit/@sveltejs-kit#Cookies
---

## Cookies
<!-- {: .-snippets} -->

### Set a cookie
<!-- {: .-snippet} -->

```ts
cookies.set('session', token, {
  path: '/',
  httpOnly: true,
  sameSite: 'lax',
  maxAge: 60 * 60 * 24 * 7
})
```
<!-- {: data-highlight="cookies.set"} -->

**Writes a `Set-Cookie` header.** `httpOnly` defaults to true, `secure` to true outside development, and `path` to `/`; see [Cookies](https://svelte.dev/docs/kit/@sveltejs-kit#Cookies).

### Read a cookie
<!-- {: .-snippet} -->

```ts
import { error } from '@sveltejs/kit'

const token = cookies.get('session')

if (!token) error(401, 'Unauthorized')
```
<!-- {: data-highlight="cookies.get"} -->

**Reads the request cookie.** Use it in server loads, actions, endpoints, and hooks; see [Cookies](https://svelte.dev/docs/kit/@sveltejs-kit#Cookies).

### Delete a cookie
<!-- {: .-snippet} -->

```ts
cookies.delete('session', {
  path: '/'
})
```
<!-- {: data-highlight="cookies.delete"} -->

**Expires the cookie.** Pass the same `path` it was set with; see [Cookies](https://svelte.dev/docs/kit/@sveltejs-kit#Cookies).

### Sign a user in
<!-- {: .-snippet} -->

#### src/routes/login/+page.server.ts

```ts
import { redirect } from '@sveltejs/kit'

export const actions = {
  default: async ({ cookies }) => {
    cookies.set('session', 'token', {
      path: '/',
      httpOnly: true
    })
    redirect(303, '/dashboard')
  }
}
```
<!-- {: data-highlight="redirect(303,"} -->

**Sets the session, then redirects.** The cookie is sent with the redirect response; see [Form actions](https://svelte.dev/docs/kit/form-actions).

### Read the session in a hook
<!-- {: .-snippet} -->

```ts
const session = event.cookies.get('session')

event.locals.user = session
  ? await findUser(session)
  : null
```
<!-- {: data-highlight="findUser(session)"} -->

**Shares the user with loads.** Every server load can read it; the `Locals` type and `handle` wrapper live in the [auth guard snippet](./sveltekit-auth-guard). See [locals](https://svelte.dev/docs/kit/hooks#handle-locals).
