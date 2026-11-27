---
title: How to make a Next.js component client-side
link_title: Client components
subtitle: Interactive components with state
logo: { src: /assets/logos/nextjs.svg, mono: true }
category: JavaScript libraries
layout: snippet
last_verified_with: "Next.js 16.4.6, React 19.3.1."
updated: 2026-11-27
links:
  - title: Server and Client Components
    url: https://nextjs.org/docs/app/getting-started/server-and-client-components
---

## Client components
<!-- {: .-snippets} -->

### Add the directive
<!-- {: .-snippet} -->

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

**Marks a client entry point.** State, event handlers, effects, and browser APIs need this directive above the imports. Every module the file imports joins the client bundle. See [use client](https://nextjs.org/docs/app/api-reference/directives/use-client).

### Import it from a page
<!-- {: .-snippet} -->

#### app/page.tsx

```tsx
import Counter from './counter'

export default function Page() {
  return (
    <main>
      <h1>Home</h1>
      <Counter />
    </main>
  )
}
```
<!-- {: data-highlight="<Counter"} -->

**Keeps the page on the server.** The page stays a Server Component; only `Counter` and its imports are sent to the browser. See [composition](https://nextjs.org/docs/app/getting-started/server-and-client-components#interleaving-server-and-client-components).
