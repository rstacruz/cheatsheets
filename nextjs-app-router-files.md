---
title: How to structure a Next.js App Router project
link_title: App Router files
subtitle: Route and layout files
logo: { src: /assets/logos/nextjs.svg, mono: true }
category: JavaScript libraries
layout: snippet
last_verified_with: "Next.js 16.4.6."
updated: 2026-11-28
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
<!-- {: data-highlight="page.tsx; route.ts"} -->

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

**Excludes folders from URLs.** These folders stay out of the URL. Route groups, `(name)`, share a layout without adding a segment; a leading underscore opts a folder out of routing. See [route groups](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups).
