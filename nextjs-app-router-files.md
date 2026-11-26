---
title: How to structure a Next.js App Router project
link_title: App Router files
subtitle: Route and layout files
category: JavaScript libraries
layout: snippet
last_verified_with: "Next.js 16.4.6."
updated: 2026-11-27
links:
  - title: Project structure
    url: https://nextjs.org/docs/app/getting-started/project-structure
---

## File conventions
<!-- {: .-snippets} -->

### Route files
<!-- {: .-snippet} -->

```text
app/
  layout.tsx            # root layout
  page.tsx              # /
  loading.tsx           # fallback UI
  error.tsx             # error boundary
  not-found.tsx         # 404 UI
  blog/[slug]/page.tsx  # /blog/:slug
  api/hello/route.ts    # /api/hello
```
<!-- {: data-highlight="page.tsx"} -->

**Maps files to URLs.** A folder is routable only when it holds `page.tsx` or `route.ts`; `layout.tsx` wraps every child segment. See [project structure](https://nextjs.org/docs/app/getting-started/project-structure).

### Group routes without a URL
<!-- {: .-snippet} -->

```text
app/
  (marketing)/about/page.tsx   # /about
  (shop)/cart/page.tsx         # /cart
  blog/_components/Post.tsx    # not routable
```
<!-- {: data-highlight="(marketing)"} -->

**Drops the parentheses from the URL.** Route groups give a section its own layout; a leading underscore keeps a folder out of routing. See [route groups](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups).
