---
title: How to create a Next.js route handler
link_title: Route handlers
subtitle: APIs in route.ts
category: JavaScript libraries
layout: snippet
last_verified_with: "Next.js 16.4.6."
updated: 2026-11-27
links:
  - title: Route Handlers
    url: https://nextjs.org/docs/app/getting-started/route-handlers
---

## Route handlers
<!-- {: .-snippets} -->

### GET a JSON response
<!-- {: .-snippet} -->

#### app/api/hello/route.ts

```ts
export async function GET() {
  return Response.json({ ok: true })
}
```
<!-- {: data-highlight="Response.json"} -->

**Returns JSON from a route file.** A `route.ts` handles HTTP methods directly and cannot sit beside a `page.tsx` in the same segment. See [Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers).

### Read query params
<!-- {: .-snippet} -->

#### app/api/search/route.ts

```ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')
  return Response.json({ q })
}
```
<!-- {: data-highlight="searchParams.get"} -->

**Parses the request URL.** Use `request.nextUrl.searchParams` instead when the handler takes a `NextRequest`. See [route.js](https://nextjs.org/docs/app/api-reference/file-conventions/route).

### Handle a POST body
<!-- {: .-snippet} -->

#### app/api/hello/route.ts

```ts
export async function POST(request: Request) {
  const body = await request.json()
  return Response.json(body, { status: 201 })
}
```
<!-- {: data-highlight="request.json()"} -->

**Reads JSON from the request body.** Return a status code in the second argument; unsupported methods answer with 405. See [HTTP methods](https://nextjs.org/docs/app/api-reference/file-conventions/route#http-methods).
