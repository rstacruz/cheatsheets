---
title: Next.js
subtitle: React framework for the web
logo: { src: /assets/logos/nextjs.svg, mono: true }
category: JavaScript libraries
tags: [Featured]
tier: t2
created_at: 2026-11-27
updated: 2026-11-27
last_verified_at: 2026-11-27
last_verified_with: "Next.js 16.4.6, React 19.3.1."
fragments:
  - "next dev"
  - "app/page.tsx"
  - "use client"
  - "'use server'"
  - "await params"
  - "force-cache"
  - "revalidate: 60"
  - "route.ts"
  - "Response.json"
  - "proxy.ts"
  - "matcher"
  - "next.config.js"
  - "NEXT_PUBLIC_"
  - "revalidatePath"
  - "notFound()"
  - "redirect()"
  - "layout.tsx"
  - "searchParams"
keywords:
  - next.js app router
  - next.js server components
  - next.js fetch cache
  - next.js route handlers
  - next.config.js
intro: |
  [Next.js](https://nextjs.org/) is a React framework for full-stack apps. This guide covers the App Router, Server and Client Components, caching, and routes in Next.js 16.
links:
  - title: Next.js documentation
    url: https://nextjs.org/docs
  - title: App Router
    url: https://nextjs.org/docs/app
  - title: next.config.js reference
    url: https://nextjs.org/docs/app/api-reference/config/next-config-js
  - title: Proxy reference
    url: https://nextjs.org/docs/app/api-reference/file-conventions/proxy
---

## Quick start
<!-- {: .-three-column} -->

### Create a project

```sh
npx create-next-app@latest my-app
cd my-app
npm run dev
```

The recommended defaults include TypeScript, Tailwind, and the App Router. The dev server listens on port 3000.

See: [create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app)

### Run scripts

| Command | Purpose |
| --- | --- |
| `next dev` | Start the dev server |
| `next build` | Build for production |
| `next start` | Serve the production build |
| `next typegen` | Generate route types |
<!-- {: .-headers} -->

`next build` runs type checks and produces the production bundle. Run `next start` after a build, not in development.

See: [Next.js CLI](https://nextjs.org/docs/app/api-reference/cli/next)

### Project files

```text
app/
  layout.tsx          # root layout
  page.tsx            # /
  posts/[slug]/page.tsx
  api/hello/route.ts
next.config.js
proxy.ts
```

Folders under `app/` define URL segments. A folder becomes a route only when it holds a `page` or `route` file.

See: [Project structure](https://nextjs.org/docs/app/getting-started/project-structure)

## App Router

### Pages and layouts

#### app/layout.tsx

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```
<!-- {: data-highlight="RootLayout"} -->

#### app/page.tsx

```tsx
export default function Page() {
  return <h1>Hello Next.js</h1>
}
```
<!-- {: data-highlight="Page"} -->

The root layout is required and must render `<html>` and `<body>`. Layouts wrap child routes and keep their state on navigation; pages render the route's own UI.

See: [Layouts and pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)

### Special files

| File | Renders |
| --- | --- |
| `page.tsx` | The route's UI |
| `layout.tsx` | Shared wrapper around children |
| `loading.tsx` | Suspense fallback for the segment |
| `error.tsx` | Client error boundary |
| `not-found.tsx` | UI for `notFound()` and 404s |
| `route.ts` | HTTP handler instead of a page |
<!-- {: .-headers} -->

`page.tsx` and `route.ts` cannot share a route segment. Folder names in parentheses, such as `(marketing)`, group routes without adding a URL segment.

See: [File conventions](https://nextjs.org/docs/app/api-reference/file-conventions)

### Route patterns

| Path | Matches |
| --- | --- |
| `app/blog/[slug]/page.tsx` | `/blog/hello` |
| `app/shop/[...slug]/page.tsx` | `/shop/a/b` |
| `app/docs/[[...slug]]/page.tsx` | `/docs` and `/docs/a` |
<!-- {: .-headers} -->

Single brackets match one segment, a triple-dot catch-all matches one or more, and a double-bracket optional catch-all also matches the bare parent path.

See: [Dynamic routes](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes)

### Read params

#### app/blog/[slug]/page.tsx

```tsx
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <h1>{slug}</h1>
}
```
<!-- {: data-highlight="await params"} -->

`params` and `searchParams` are Promises in Next.js 15 and later. Await `params` in an async page or layout, and `searchParams` in a page, before reading a value.

See: [Page props](https://nextjs.org/docs/app/api-reference/file-conventions/page#props)

### Loading and errors

#### app/blog/loading.tsx

```tsx
export default function Loading() {
  return <p>Loading posts...</p>
}
```
<!-- {: data-highlight="Loading"} -->

#### app/blog/error.tsx

```tsx
'use client'

export default function Error({ reset }: { reset: () => void }) {
  return <button onClick={reset}>Try again</button>
}
```
<!-- {: data-highlight="Error; reset"} -->

`loading.tsx` wraps the segment in Suspense. `error.tsx` must be a Client Component and receives the error plus a `reset` function. Call `notFound()` to render `not-found.tsx`.

See: [loading.js](https://nextjs.org/docs/app/api-reference/file-conventions/loading)

## Server and client components

### Server components

```tsx
export default async function Page() {
  const posts = await db.post.findMany()
  return <PostList posts={posts} />
}
```
<!-- {: data-highlight="await db.post.findMany()"} -->

Pages and layouts are Server Components by default. They can query a database, read secrets, and send only rendered output to the browser.

See: [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)

### Client components

```tsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  )
}
```
<!-- {: data-highlight="'use client'"} -->

Add `'use client'` above the imports when a component needs state, effects, event handlers, or browser APIs. Every module it imports joins the client bundle.

See: [use client](https://nextjs.org/docs/app/api-reference/directives/use-client)

### Pass data across the boundary

#### app/page.tsx

```tsx
import LikeButton from './like-button'

export default async function Page() {
  const likes = await getLikes()
  return <LikeButton likes={likes} />
}
```
<!-- {: data-highlight="<LikeButton"} -->

#### app/like-button.tsx

```tsx
'use client'

export default function LikeButton({ likes }: { likes: number }) {
  return <button>{likes}</button>
}
```

Props cross from a Server Component to a Client Component as serializable data. Plain objects, arrays, Dates, and Maps work; class instances and ordinary functions do not. Server Actions are the exception.

See: [Passing data](https://nextjs.org/docs/app/getting-started/server-and-client-components#passing-data-from-server-to-client-components)

## Data fetching and caching

### Two caching models

| Cache with | Model | When |
| --- | --- | --- |
| `use cache` | Cache Components | New apps; enable `cacheComponents` |
| `cache: 'force-cache'` | Fetch options | Flag off |
| `next.revalidate` | Fetch options | Flag off |
<!-- {: .-headers} -->

Projects created with `create-next-app` in Next.js 16.4 enable `cacheComponents` and `partialPrefetching` by default. With `cacheComponents` on, exporting `dynamic` or `revalidate` fails the build; the fetch-option cards below apply only when the flag is off.

See: [Cache Components](https://nextjs.org/docs/app/getting-started/caching)

### Cache with `use cache`

```tsx
import { cacheLife, cacheTag } from 'next/cache'

async function getPosts() {
  'use cache'
  cacheLife('hours')
  cacheTag('posts')
  return db.post.findMany()
}
```
<!-- {: data-highlight="'use cache'"} -->

With Cache Components, `use cache` caches the result of an async function. Enable it with `cacheComponents: true` in `next.config.js`; 16.4 scaffolds also enable `partialPrefetching`. `cacheLife` sets the lifetime; without it, the default profile applies.

See: [use cache](https://nextjs.org/docs/app/api-reference/directives/use-cache)

### Fetch in a page

```tsx
export default async function Page() {
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()
  return <PostList posts={posts} />
}
```
<!-- {: data-highlight="await fetch"} -->

`fetch` works in Server Components. Without Cache Components, requests are uncached but a static route still fetches once during `next build`. With `cacheComponents` on, data is dynamic by default.

See: [fetch](https://nextjs.org/docs/app/api-reference/functions/fetch)

### Cache a response

```tsx
const res = await fetch(url, {
  cache: 'force-cache',
})
```
<!-- {: data-highlight="'force-cache'"} -->

Without Cache Components, `force-cache` stores the response across requests. Only 200 responses are cached, and the URL, method, headers, and body form the cache key.

See: [cache options](https://nextjs.org/docs/app/api-reference/functions/fetch#optionscache)

### Revalidate on a timer

#### Fetch

```tsx
const res = await fetch(url, {
  next: { revalidate: 60 },
})
```
<!-- {: data-highlight="revalidate: 60"} -->

#### app/posts/page.tsx

```tsx
export const revalidate = 60
```
<!-- {: data-highlight="export const revalidate"} -->

Without Cache Components, `next.revalidate` sets a per-request lifetime in seconds. The route segment `revalidate` export sets a default for the page or layout; the lowest value in the route wins. With `cacheComponents` on, use `cacheLife` instead.

See: [revalidate](https://nextjs.org/docs/app/api-reference/functions/fetch#optionsnextrevalidate)

### Invalidate by tag

#### Fetch without Cache Components

```tsx
const res = await fetch(url, {
  next: { tags: ['posts'] },
})
```
<!-- {: data-highlight="tags: ['posts']"} -->

#### Server action

```ts
import { revalidateTag } from 'next/cache'

export async function savePost(title: string) {
  'use server'
  await db.post.create({ data: { title } })
  revalidateTag('posts', 'max')
}
```
<!-- {: data-highlight="revalidateTag('posts', 'max')"} -->

Tags mark cached data for on-demand invalidation. The second `revalidateTag` argument is part of the Next.js 16 signature; `'max'` serves stale content while the refresh runs. Under Cache Components, tag `use cache` with `cacheTag`.

See: [revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)

## Route handlers

### GET and POST

#### app/api/hello/route.ts

```ts
export async function GET() {
  return Response.json({ ok: true })
}

export async function POST(request: Request) {
  const body = await request.json()
  return Response.json(body, { status: 201 })
}
```
<!-- {: data-highlight="GET; POST; Response.json"} -->

A `route.ts` file handles HTTP methods directly. Unsupported methods return 405; a route file cannot sit beside a `page.tsx` in the same segment.

See: [Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers)

### Read query params

#### app/api/search/route.ts

```ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')
  return Response.json({ q })
}
```
<!-- {: data-highlight="searchParams.get"} -->

Parse the request URL for query values. Use `request.nextUrl.searchParams` when the handler takes a `NextRequest`.

See: [route.js](https://nextjs.org/docs/app/api-reference/file-conventions/route)

### Dynamic params

#### app/api/posts/[slug]/route.ts

```ts
export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params
  return Response.json({ slug })
}
```
<!-- {: data-highlight="await context.params"} -->

Route handler `params` is a Promise too. Await it before using the segment value; body reads are async as well.

See: [Route context](https://nextjs.org/docs/app/api-reference/file-conventions/route#context-optional)

### Cache a GET handler

#### app/api/items/route.ts

```ts
export const dynamic = 'force-static'

export async function GET() {
  return Response.json({ items: [] })
}
```
<!-- {: data-highlight="'force-static'"} -->

Without Cache Components, route handlers are not cached by default. Opt a `GET` handler into static rendering with `dynamic = 'force-static'`; other methods are never cached. Exporting `dynamic` errors when `cacheComponents` is on.

See: [Caching](https://nextjs.org/docs/app/getting-started/route-handlers#caching)

## Mutations

### Define a server action

#### app/lib/actions.ts

```ts
'use server'

export async function createTodo(formData: FormData) {
  const title = formData.get('title')
  await db.todo.create({ data: { title } })
}
```
<!-- {: data-highlight="'use server'"} -->

A `'use server'` file exports async functions that the client can call. Server Actions are reachable by direct POST, so check authentication inside every action.

See: [Server Functions](https://nextjs.org/docs/app/getting-started/mutating-data)

### Call it from a form

#### app/todos/page.tsx

```tsx
import { createTodo } from '../lib/actions'

export default function Page() {
  return (
    <form action={createTodo}>
      <input name="title" />
      <button>Add</button>
    </form>
  )
}
```
<!-- {: data-highlight="action={createTodo}"} -->

Pass the action to `<form action>`. The form works without JavaScript, and React handles the submission after hydration.

See: [Forms](https://nextjs.org/docs/app/getting-started/mutating-data#forms)

### Revalidate and redirect

```ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createTodo(formData: FormData) {
  const title = formData.get('title')
  await db.todo.create({ data: { title } })
  revalidatePath('/todos')
  redirect('/todos')
}
```
<!-- {: data-highlight="revalidatePath(; redirect("} -->

Call `revalidatePath` after a write so the next render sees fresh data. `redirect` throws to stop rendering; call it outside a `try` block.

See: [revalidatePath](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)
See: [redirect](https://nextjs.org/docs/app/api-reference/functions/redirect)

## Proxy

### Redirect a path

#### proxy.ts

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/old') {
    return NextResponse.redirect(new URL('/new', request.url))
  }
}
```
<!-- {: data-highlight="NextResponse.redirect"} -->

`proxy.ts` runs before a request reaches a route. The file replaces `middleware.ts`, which is deprecated in Next.js 16, and exports a function named `proxy`.

See: [proxy.js](https://nextjs.org/docs/app/api-reference/file-conventions/proxy)

### Match only some paths

#### proxy.ts

```js
export const config = {
  matcher: ['/dashboard/:path*'],
}
```
<!-- {: data-highlight="matcher"} -->

Without a matcher, proxy runs on every request, including static assets and image requests. Keep matcher values static so Next.js can analyze them at build time.

See: [Matcher](https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher)

### Protect a route

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/login') return
  const session = request.cookies.get('session')
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
```
<!-- {: data-highlight="request.cookies.get('session')"} -->

Proxy can redirect unauthenticated users, but it is not a security boundary. Skip the login path so unauthenticated visitors can reach it, and check authorization again inside Server Actions and Route Handlers.

See: [Data security](https://nextjs.org/docs/app/guides/data-security)

## Configuration

### next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/blog/:slug',
        destination: '/posts/:slug',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
```
<!-- {: data-highlight="module.exports = nextConfig"} -->

`next.config.js` is loaded at build time; restart the dev server after editing it. A `next.config.ts` file works the same way.

See: [next.config.js](https://nextjs.org/docs/app/api-reference/config/next-config-js)

### Common options

| Option | Does |
| --- | --- |
| `images.remotePatterns` | Allow remote image hosts |
| `headers()` | Add response headers |
| `basePath` | Serve the app under a prefix |
| `output: 'standalone'` | Build a self-contained server |
<!-- {: .-headers} -->

Set only what the app needs. Redirects and headers can also live in Proxy when they depend on request data.

See: [Configuration options](https://nextjs.org/docs/app/api-reference/config/next-config-js)

### Environment variables

#### .env.local

```text
NEXT_PUBLIC_SITE_NAME=My site
API_SECRET=change-me
```
<!-- {: data-highlight="NEXT_PUBLIC_"} -->

#### app/lib/data.ts

```ts
export const siteName = process.env.NEXT_PUBLIC_SITE_NAME

export function authHeader() {
  const key = process.env.API_SECRET
  if (!key) throw new Error('API_SECRET is not set')
  return { Authorization: `Bearer ${key}` }
}
```
<!-- {: data-highlight="API_SECRET"} -->

Only `NEXT_PUBLIC_` variables are inlined into the browser bundle. Everything else stays on the server, so never put a secret behind the public prefix. Restart the dev server after changing `NEXT_PUBLIC_` variables; rebuild for production.

See: [Environment variables](https://nextjs.org/docs/app/guides/environment-variables)

## Also see

- [App Router files](./nextjs-app-router-files)
- [Caching](./nextjs-fetch-cache)
- [Route handlers](./nextjs-route-handler)
- [Client components](./nextjs-server-client-components)
- [React cheatsheet](./react)
- [Next.js examples](https://github.com/vercel/next.js/tree/canary/examples)
