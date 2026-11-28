---
title: How to add import aliases in Vite
link_title: Vite import aliases
subtitle: Shorten import paths
logo: { src: /assets/logos/vite.svg }
category: Build tools
layout: snippet
last_verified_with: "Vite 8.3.8, Node 26.13.1."
created_at: 2026-11-26
updated: 2026-11-28
links:
  - title: resolve.alias
    url: https://vite.dev/config/shared-options#resolve-alias
  - title: TypeScript paths
    url: https://www.typescriptlang.org/tsconfig/#paths
  - title: Vite config
    url: https://vite.dev/config/
---

## Aliasing imports
<!-- {: .-snippets} -->

### Alias @ to src
<!-- {: .-snippet} -->

```ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

const src = fileURLToPath(
  new URL('./src', import.meta.url),
)

export default defineConfig({
  resolve: {
    alias: { '@': src },
  },
})
```
<!-- {: data-highlight="alias"} -->

**Points `@` at `src`.** `fileURLToPath` turns the module URL into the absolute path Vite expects in dev and builds. See [resolve.alias](https://vite.dev/config/shared-options#resolve-alias).

### Import through the alias
<!-- {: .-snippet} -->

```js
import { formatDate } from '@/lib/date.js'

formatDate(new Date())
```
<!-- {: data-highlight="@/lib/date.js"} -->

**Imports from `src` through `@`.** Vite rewrites `@/…` imports to `src`, so `@/lib/date.js` stands in for `../../lib/date.js`; see [resolve.alias](https://vite.dev/config/shared-options#resolve-alias).

### Teach TypeScript the paths
<!-- {: .-snippet} -->

#### tsconfig.json

```json
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
<!-- {: data-highlight="paths"} -->

**Mirrors the alias.** Editors and `tsc` read `paths`, not Vite's `alias`, so keep both maps in step. See [`paths`](https://www.typescriptlang.org/tsconfig/#paths).

### Relative vs absolute targets
<!-- {: .-snippet} -->

#### Relative

```ts
resolve: {
  alias: { '@': './src' },
}
```
<!-- {: data-highlight="'./src'"} -->

#### Absolute

```ts
const src = fileURLToPath(
  new URL('./src', import.meta.url),
)

resolve: {
  alias: { '@': src },
}
```
<!-- {: data-highlight="new URL('./src', import.meta.url)"} -->

**Uses an absolute target.** A relative value is used as-is, so dev fails with `Failed to resolve import …` and build warns or fails with `Could not load ./src/…`. See [resolve.alias](https://vite.dev/config/shared-options#resolve-alias).

### Add a second alias
<!-- {: .-snippet} -->

```ts
const src = fileURLToPath(
  new URL('./src', import.meta.url),
)
const assets = fileURLToPath(
  new URL('./src/assets', import.meta.url),
)

export default defineConfig({
  resolve: {
    alias: { '@': src, '@assets': assets },
  },
})
```
<!-- {: data-highlight="'@assets'"} -->

**Maps several folders.** Put them in one object; a string key matches only at a path boundary, so `@` does not catch `@assets`. See [resolve.alias](https://vite.dev/config/shared-options#resolve-alias).
