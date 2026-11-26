---
title: SvelteKit
subtitle: Full-stack framework for Svelte
category: SvelteKit
updated: 2026-11-26
last_verified_with: "SvelteKit 3.4.1, Svelte 5.59.2, Vite 8.3.8, Node 22.23.5, 26.13.1."
tier: t2
fragments:
  - "+page.svelte"
  - "+page.server.ts"
  - "+layout.svelte"
  - "export const"
  - "error(404)"
  - "redirect(303)"
  - "use:enhance"
  - "fail(400)"
  - "cookies.set"
  - "handle"
  - "event.locals"
  - "prerender"
  - "remoteFunctions"
  - "query(async"
  - "adapter-node"
  - "node build"
keywords:
  - SvelteKit 3
  - load function
  - form actions
  - hooks.server.ts
  - remote functions
  - cookies
intro: |
  [SvelteKit](https://svelte.dev/docs/kit) is the full-stack framework for Svelte, built on Vite. This reference covers SvelteKit 3: routing, loads, actions, hooks, remote functions, and deployment.
links:
  - title: SvelteKit documentation
    url: https://svelte.dev/docs/kit
  - title: Migrating to SvelteKit 3
    url: https://svelte.dev/docs/kit/migrating-to-sveltekit-3
  - title: Adapters
    url: https://svelte.dev/docs/kit/adapters
---

## Quick start

### Create an app

```sh
npx sv create my-app
cd my-app
npm run dev
```
<!-- {: data-highlight="sv create"} -->

The CLI scaffolds a Vite project and offers TypeScript, ESLint, and testing. See: [Creating a project](https://svelte.dev/docs/kit/creating-a-project)

### Project structure

```text
src/
├ routes/          # pages and endpoints
├ lib/             # shared code, imported as #lib
├ app.html         # page template
├ hooks.server.ts  # server hooks
├ params.ts        # param matchers
└ env.ts           # environment variables
```

`src/routes` and `src/app.html` are required; every other file and folder is optional. See: [Project structure](https://svelte.dev/docs/kit/project-structure)

### Dev and build

```sh
npm run dev       # dev server on :5173
npm run build     # production build
npm run preview   # preview the build
```
<!-- {: data-highlight="npm run build"} -->

`preview` serves the built app locally; the adapter decides the production output. See: [Building your app](https://svelte.dev/docs/kit/building-your-app)

## Routing

### File routes

```text
src/routes/+page.svelte              → /
src/routes/about/+page.svelte        → /about
src/routes/blog/[slug]/+page.svelte  → /blog/hello
```
<!-- {: data-highlight="+page.svelte"} -->

`+page.svelte` renders a page; a `+layout.svelte` in the same folder wraps it. See: [Routing](https://svelte.dev/docs/kit/routing)

### Dynamic params

#### src/routes/blog/[slug]/+page.server.ts

```ts
export function load({ params }) {
  return { slug: params.slug }
}
```
<!-- {: data-highlight="params.slug"} -->

The folder name declares the param, so `/blog/hello` gives `slug: 'hello'`. See: [Params](https://svelte.dev/docs/kit/load#Using-URL-data-params)

### Optional and rest params

```text
src/routes/docs/[[lang]]/+page.svelte
src/routes/files/[...path]/+page.svelte
```
<!-- {: data-highlight="[[lang]]; [...path]"} -->

`[[lang]]` matches `/docs` and `/docs/fr`; `[...path]` matches `/files/a/b`. See: [Optional parameters](https://svelte.dev/docs/kit/advanced-routing#Optional-parameters)

### Layouts

#### src/routes/+layout.svelte

```html
<script lang="ts">
  let { children } = $props()
</script>

<nav><a href="/">Home</a></nav>
{@render children()}
```
<!-- {: data-highlight="{@render children()}"} -->

Layouts wrap child pages and stay mounted across navigation. See: [Layouts](https://svelte.dev/docs/kit/routing#layout)

### Route groups

```text
src/routes/(app)/admin/+page.svelte  → /admin
src/routes/(marketing)/about/+page.svelte  → /about
```
<!-- {: data-highlight="(app); (marketing)"} -->

Parentheses group routes and layouts without adding a URL segment. See: [Route groups](https://svelte.dev/docs/kit/advanced-routing#Advanced-layouts-(group))

### Param matchers

#### src/params.ts

```ts
import { defineParams } from '@sveltejs/kit/params'

export const params = defineParams({
  integer: (param) => {
    if (!/^\d+$/.test(param)) return
    return Number(param)
  }
})
```
<!-- {: data-highlight="defineParams"} -->

#### src/routes/number/[id=integer]/+page.ts

```ts
export function load({ params }) {
  return { id: params.id }
}
```

A matcher rejects a route before it loads; the returned value becomes the param (`42` is a number). See: [Matching](https://svelte.dev/docs/kit/advanced-routing#Matching)

## Loading data

### Server load

#### src/routes/posts/[slug]/+page.server.ts

```ts
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
  const post = await db.post.findUnique({
    where: { slug: params.slug }
  })
  if (!post) error(404, 'Not found')
  return { post }
}
```
<!-- {: data-highlight="PageServerLoad"} -->

A `+page.server.ts` load runs only on the server, so it can use the database and secrets. See: [Loading data](https://svelte.dev/docs/kit/load)

### Render page data

```html
<script lang="ts">
  import type { PageProps } from './$types'
  let { data }: PageProps = $props()
</script>

<h1>{data.post.title}</h1>
```
<!-- {: data-highlight="PageProps"} -->

The `load` return value arrives as the `data` prop. See: [Page data](https://svelte.dev/docs/kit/load#Page-data)

### Universal load

#### src/routes/stars/+page.ts

```ts
import { error } from '@sveltejs/kit'

export async function load({ fetch }) {
  const url = 'https://api.github.com/repos/sveltejs/kit'
  const res = await fetch(url)
  if (!res.ok) error(500, 'GitHub failed')
  return { stars: (await res.json()).stargazers_count }
}
```
<!-- {: data-highlight="await fetch(url)"} -->

A `+page.ts` load runs on the server and in the browser; `fetch` handles cookies and relative URLs. See: [Universal vs server](https://svelte.dev/docs/kit/load#Universal-vs-server)

### Read the URL

```ts
export function load({ url }) {
  const q = url.searchParams.get('q') ?? ''
  const page = Number(url.searchParams.get('page') ?? 1)
  return { q, page }
}
```
<!-- {: data-highlight="searchParams.get"} -->

Both load flavours receive `url` and `params`. See: [Using URL data](https://svelte.dev/docs/kit/load#Using-URL-data)

### Throw errors

```ts
import { error } from '@sveltejs/kit'

if (!post) error(404, 'Not found')
if (!user) error(403, 'Forbidden')
```
<!-- {: data-highlight="error(404"} -->

`error()` throws an `HttpError`; catching it stops SvelteKit from rendering the error page. See: [Errors](https://svelte.dev/docs/kit/errors)

### Layout data

#### src/routes/posts/+layout.server.ts

```ts
export function load() {
  return { section: 'blog' }
}
```
<!-- {: data-highlight="section"} -->

Layout data merges into the child page's `data` prop. See: [Layout data](https://svelte.dev/docs/kit/load#Layout-data)

### Reload data

```ts
import { refreshAll } from '$app/navigation'

await refreshAll()
```
<!-- {: data-highlight="refreshAll"} -->

Re-runs the load functions after a mutation; it replaces the deprecated `invalidateAll`. See: [$app/navigation](https://svelte.dev/docs/kit/$app-navigation)

## Forms

### Default action

#### src/routes/login/+page.server.ts

```ts
import type { Actions } from './$types'

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData()
    const email = String(data.get('email'))
  }
} satisfies Actions
```
<!-- {: data-highlight="default"} -->

Actions handle `POST`; the default one answers a plain form post. See: [Form actions](https://svelte.dev/docs/kit/form-actions)

### Submit the form

```html
<form method="POST">
  <input name="email" type="email" />
  <button>Log in</button>
</form>
```
<!-- {: data-highlight="POST"} -->

A `POST` form needs no JavaScript; SvelteKit runs the page's default action. See: [Default actions](https://svelte.dev/docs/kit/form-actions#Default-actions)

### Named actions

#### +page.svelte

```html
<form method="POST" action="?/register">
  <input name="email" type="email" />
  <button>Register</button>
</form>
```
<!-- {: data-highlight="?/register"} -->

#### +page.server.ts

```ts
export const actions = {
  register: async ({ request }) => {
    // ...
  }
}
```

The `?/register` query selects the `register` action; `action="/login?/register"` works from other pages. See: [Named actions](https://svelte.dev/docs/kit/form-actions#Named-actions)

### Validate with fail

```ts
import { fail } from '@sveltejs/kit'

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData()
    const email = String(form.get('email'))
    if (!email.includes('@')) {
      return fail(400, {
        email,
        message: 'Enter a valid email'
      })
    }
  }
}
```
<!-- {: data-highlight="fail(400"} -->

`fail()` returns data to the page as `form` instead of throwing. See: [Validation errors](https://svelte.dev/docs/kit/form-actions#Anatomy-of-an-action-Validation-errors)

### Enhance and show errors

```html
<script lang="ts">
  import { enhance } from '$app/forms'
  let { form } = $props()
</script>

<form method="POST" use:enhance>
  <input name="email" value={form?.email ?? ''} />
  {#if form?.message}<p>{form.message}</p>{/if}
  <button>Log in</button>
</form>
```
<!-- {: data-highlight="use:enhance"} -->

`enhance` submits in place and keeps `form` data after a failure. See: [use:enhance](https://svelte.dev/docs/kit/form-actions#Progressive-enhancement-use:enhance)

### Redirect after submit

```ts
import { redirect } from '@sveltejs/kit'

redirect(303, '/admin')
```
<!-- {: data-highlight="redirect(303"} -->

`303` turns the `POST` into a `GET`; `redirect()` throws, so don't wrap it in `try`. See: [Redirects](https://svelte.dev/docs/kit/@sveltejs-kit#redirect)

## Remote functions

### Enable remote functions

#### vite.config.ts

```ts
sveltekit({
  experimental: { remoteFunctions: true },
  compilerOptions: { experimental: { async: true } }
})
```
<!-- {: data-highlight="remoteFunctions: true"} -->

Remote functions are experimental in SvelteKit 3 and need both flags. See: [Remote functions](https://svelte.dev/docs/kit/remote-functions)

### Query data

#### src/routes/todos/todos.remote.ts

```ts
import { query } from '$app/server'

export const getTodos = query(async () => {
  return await db.todo.findMany()
})
```
<!-- {: data-highlight="query(async"} -->

`query()` runs on the server and exposes a fetch wrapper to the client. See: [query](https://svelte.dev/docs/kit/remote-functions#query)

### Await a query

```html
<script lang="ts">
  import { getTodos } from './todos.remote'
</script>

{#each await getTodos() as todo (todo.id)}
  <li>{todo.title}</li>
{/each}
```
<!-- {: data-highlight="await getTodos()"} -->

Queries are awaitable in markup; the nearest `<svelte:boundary>` handles loading and errors. See: [query](https://svelte.dev/docs/kit/remote-functions#query)

### Validate query arguments

```ts
import * as v from 'valibot'
import { query } from '$app/server'

export const getTodo = query(v.string(), async (id) => {
  return await db.todo.findFirstOrThrow({ where: { id } })
})
```
<!-- {: data-highlight="v.string()"} -->

The first argument validates the HTTP payload with a Standard Schema. See: [Query arguments](https://svelte.dev/docs/kit/remote-functions#query-Query-arguments)

### Write with a form

#### todos.remote.ts

```ts
import * as v from 'valibot'
import { form } from '$app/server'

export const addTodo = form(
  v.object({ title: v.pipe(v.string(), v.nonEmpty()) }),
  async ({ title }) => {
    await db.todo.create({ data: { title } })
  }
)
```

#### +page.svelte

```html
<form {...addTodo}>
  <input {...addTodo.fields.title.as('text')} />
  <button>Add</button>
</form>
```
<!-- {: data-highlight="{...addTodo}"} -->

The form object carries the method, action, typed fields, and enhancement. See: [form](https://svelte.dev/docs/kit/remote-functions#form)

## Hooks

### Handle requests

#### src/hooks.server.ts

```ts
import type { Handle } from '@sveltejs/kit/hooks'

export const handle: Handle = async ({ event, resolve }) => {
  const start = Date.now()
  const response = await resolve(event)
  console.log(event.url.pathname, Date.now() - start)
  return response
}
```
<!-- {: data-highlight="resolve(event)"} -->

`handle` runs for every request and can rewrite the response. See: [handle](https://svelte.dev/docs/kit/hooks#handle)

### Populate locals

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

#### src/hooks.server.ts

```ts
import type { Handle } from '@sveltejs/kit/hooks'
import { findUser } from '#lib/server/auth.js'

export const handle: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get('session')
  event.locals.user = session ? await findUser(session) : null
  return resolve(event)
}
```

`locals` flows from `handle` to server loads, actions, and endpoints. See: [locals](https://svelte.dev/docs/kit/hooks#handle-locals)

### Protect routes

```ts
import { redirect } from '@sveltejs/kit'
import type { Handle } from '@sveltejs/kit/hooks'

export const handle: Handle = async ({ event, resolve }) => {
  const isAdmin = (event.route.id ?? '')
    .split('/').includes('admin')
  if (isAdmin && !event.locals.user) {
    redirect(303, '/login')
  }
  return resolve(event)
}
```
<!-- {: data-highlight="includes('admin')"} -->

Match route ids by segment: route groups prefix them (`/(app)/admin`), and `/%61dmin` still resolves to `/admin`. Prerendered pages bypass `handle`. See: [Auth](https://svelte.dev/docs/kit/auth)

### Log errors

#### src/hooks.server.ts

```ts
import type { HandleServerError } from '@sveltejs/kit/hooks'

export const handleError: HandleServerError = ({ kind, error }) => {
  if (kind === 'unknown') console.error(error)
  return { message: 'Something went wrong' }
}
```
<!-- {: data-highlight="kind === 'unknown'"} -->

`handleError` sees every error in SvelteKit 3; return only fields that are safe to show. See: [handleError](https://svelte.dev/docs/kit/hooks#handleError)

## Cookies
<!-- {: .-three-column} -->

### Set a cookie

```ts
cookies.set('session', token, {
  path: '/',
  httpOnly: true,
  sameSite: 'lax',
  maxAge: 60 * 60 * 24 * 7
})
```
<!-- {: data-highlight="cookies.set"} -->

`httpOnly` defaults to true and `secure` to true outside development; `path` defaults to `/`. See: [Cookies](https://svelte.dev/docs/kit/@sveltejs-kit#Cookies)

### Read a cookie

```ts
import { error } from '@sveltejs/kit'

const token = cookies.get('session')

if (!token) error(401, 'Unauthorized')
```
<!-- {: data-highlight="cookies.get"} -->

Read cookies inside server loads, actions, endpoints, or hooks. See: [Cookies](https://svelte.dev/docs/kit/@sveltejs-kit#Cookies)

### Delete a cookie

```ts
cookies.delete('session', {
  path: '/'
})
```
<!-- {: data-highlight="cookies.delete"} -->

Deletion writes an expired cookie; match the `path` it was set with. See: [Cookies](https://svelte.dev/docs/kit/@sveltejs-kit#Cookies)

## Environment variables

### Declare variables

#### src/env.ts

```ts
import { defineEnvVars } from '@sveltejs/kit/env'

export const variables = defineEnvVars({
  DATABASE_URL: {},
  PUBLIC_APP_NAME: { public: true }
})
```
<!-- {: data-highlight="defineEnvVars"} -->

`defineEnvVars` declares typed variables and takes a `schema` to validate them; variables stay private unless `public: true`. See: [Environment variables](https://svelte.dev/docs/kit/environment-variables)

### Receive private values

```ts
import { DATABASE_URL } from '$app/env/private'
```
<!-- {: data-highlight="$app/env/private"} -->

Private imports are server-only and never reach the browser bundle. See: [Private variables](https://svelte.dev/docs/kit/environment-variables#Private-variables)

### Receive public values

```ts
import { PUBLIC_APP_NAME } from '$app/env/public'
```
<!-- {: data-highlight="$app/env/public"} -->

Public values are serializable and available on both sides. See: [Public variables](https://svelte.dev/docs/kit/environment-variables#Public-variables)

### Inline at build time

```ts
export const variables = defineEnvVars({
  PUBLIC_VERSION: { public: true, static: true }
})
```
<!-- {: data-highlight="static: true"} -->

`static: true` inlines the build value, enabling dead-code elimination. See: [Static variables](https://svelte.dev/docs/kit/environment-variables#Static-variables)

## Page options
<!-- {: .-three-column} -->

### Prerender a page

#### src/routes/about/+page.ts

```ts
export const prerender = true
```
<!-- {: data-highlight="prerender = true"} -->

Prerendered pages become static HTML at build time. See: [prerender](https://svelte.dev/docs/kit/page-options#prerender)

### Prerender dynamic routes

```ts
export const prerender = true

export function entries() {
  return [
    { slug: 'alpha' },
    { slug: 'beta' }
  ]
}
```
<!-- {: data-highlight="entries()"} -->

`entries()` lists the params to render for a `[slug]` route. See: [entries](https://svelte.dev/docs/kit/page-options#entries)

### Turn off SSR

#### src/routes/+layout.ts

```ts
export const ssr = false
```
<!-- {: data-highlight="ssr = false"} -->

Disables server rendering for the layout and its children, making a single-page app. See: [ssr](https://svelte.dev/docs/kit/page-options#ssr)

### Ship no client JS

```ts
export const csr = false
```
<!-- {: data-highlight="csr = false"} -->

Disables hydration; pair it with SSR for static content pages. See: [csr](https://svelte.dev/docs/kit/page-options#csr)

## Building and deploying

### Choose an adapter

#### vite.config.ts

```ts
import adapter from '@sveltejs/adapter-node'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [sveltekit({ adapter: adapter() })]
})
```
<!-- {: data-highlight="adapter-node"} -->

`adapter-node` builds a standalone Node server; other adapters target other hosts. See: [Adapters](https://svelte.dev/docs/kit/adapters)

### Build and run

```sh
npm run build
node build
```
<!-- {: data-highlight="node build"} -->

The server lands in `build/` and listens on port 3000 by default. See: [adapter-node](https://svelte.dev/docs/kit/adapter-node)

### Pass runtime settings

```sh
PORT=8080 ORIGIN=https://example.com node build
```
<!-- {: data-highlight="ORIGIN="} -->

`ORIGIN` sets the trusted origin for CSRF checks behind a proxy; required runtime variables from `src/env.ts` must be set, or startup fails. See: [Environment variables](https://svelte.dev/docs/kit/adapter-node#Environment-variables-PROTOCOL_HEADER-HOST_HEADER-and-PORT_HEADER)

### Dockerfile

```dockerfile
FROM node:22-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit dev
COPY --from=build /app/build ./build
ENV PORT=3000
CMD ["node", "build"]
```
<!-- {: data-highlight="npm ci --omit dev"} -->

The runtime image needs `package.json`, production dependencies, and `build/`. See: [Deploying](https://svelte.dev/docs/kit/adapter-node#Deploying)

### Static site

#### vite.config.ts

```ts
import adapter from '@sveltejs/adapter-static'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [sveltekit({ adapter: adapter() })]
})
```
<!-- {: data-highlight="adapter-static"} -->

#### src/routes/+layout.ts

```ts
export const prerender = true
```

`adapter-static` writes HTML files for hosts without a server. Every route must be prerendered or given a `fallback`. See: [adapter-static](https://svelte.dev/docs/kit/adapter-static)

## SvelteKit 3 changes

### Config moved to Vite

#### svelte.config.js

```ts
export default {
  kit: { adapter: adapter() }
}
```

#### vite.config.ts

```ts
sveltekit({ adapter: adapter() })
```
<!-- {: data-highlight="sveltekit({ adapter: adapter() })"} -->

SvelteKit 3 no longer reads `svelte.config.js`. See: [Migrating to SvelteKit 3](https://svelte.dev/docs/kit/migrating-to-sveltekit-3)

### `$lib` became `#lib`

#### package.json

```json
{
  "imports": {
    "#lib": "./src/lib/index.js",
    "#lib/*": "./src/lib/*"
  }
}
```
<!-- {: data-highlight="#lib/*"} -->

#### Import

```ts
import { format } from '#lib/format.js'
```

The alias uses Node subpath imports and needs file extensions. See: [$lib is now #lib](https://svelte.dev/docs/kit/migrating-to-sveltekit-3#$lib-is-now-lib)

### Stores became state

#### SvelteKit 2

```ts
import { page } from '$app/stores'

$page.url.pathname
```

#### SvelteKit 3

```ts
import { page } from '$app/state'

page.url.pathname
```
<!-- {: data-highlight="$app/state"} -->

`$app/stores` is removed; `$app/state` exposes Svelte 5 state. See: [$app/stores](https://svelte.dev/docs/kit/migrating-to-sveltekit-3#$app-stores-(removed))

### Env modules moved

#### SvelteKit 2

```ts
import { API_KEY } from '$env/static/private'
```

#### SvelteKit 3

```ts
import { API_KEY } from '$app/env/private'
```

`$env/*` is deprecated; declare variables in `src/env.ts` instead. See: [Environment variables](https://svelte.dev/docs/kit/environment-variables)

## Also see

- [SvelteKit load data](./sveltekit-load-data)
- [SvelteKit form actions](./sveltekit-form-actions)
- [SvelteKit remote functions](./sveltekit-remote-functions)
- [SvelteKit route params](./sveltekit-route-params)
- [SvelteKit cookies](./sveltekit-cookies)
- [SvelteKit redirects](./sveltekit-redirect)
- [SvelteKit auth guard](./sveltekit-auth-guard)
- [SvelteKit env variables](./sveltekit-environment-variables)
- [SvelteKit prerender](./sveltekit-prerender)
- [SvelteKit Node deploy](./sveltekit-deploy-node)
<!-- {: .-also-see} -->
