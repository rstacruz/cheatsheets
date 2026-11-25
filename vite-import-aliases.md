---
title: How to add import aliases in Vite
link_title: Vite import aliases
subtitle: Shorten import paths
category: Build tools
layout: snippet
last_verified_with: "Vite 8.3.8, Node 26.13.1."
updated: 2026-11-26
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

### Alias `@` to `src`
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

**Points `@` at the `src` folder.** Vite applies the map in dev and in builds; `fileURLToPath` turns the module URL into the absolute path it expects. See [resolve.alias](https://vite.dev/config/shared-options#resolve-alias).

### Import through the alias
<!-- {: .-snippet} -->

```js
import { formatDate } from '@/lib/date.js'

formatDate(new Date())
```
<!-- {: data-highlight="@/lib/date.js"} -->

**Keeps deep imports short.** Any path starting with `@` is rewritten, so `../../lib/date.js` becomes `@/lib/date.js`; see [resolve.alias](https://vite.dev/config/shared-options#resolve-alias).

### Teach TypeScript the paths
<!-- {: .-snippet} -->

#### tsconfig.json

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
<!-- {: data-highlight="paths"} -->

**Mirrors the alias for editors and `tsc`.** Vite rewrites imports at build time but TypeScript reads only `paths`, so keep both maps in step; see [`paths`](https://www.typescriptlang.org/tsconfig/#paths).

### Keep targets absolute
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
<!-- {: data-highlight="'@': src"} -->

**Uses an absolute path, not a relative one.** A relative alias is substituted as-is and fails when Vite runs from another directory, with `Could not load ./src/…`; see [resolve.alias](https://vite.dev/config/shared-options#resolve-alias).

### Add a second prefix
<!-- {: .-snippet} -->

```ts
const src = fileURLToPath(
  new URL('./src', import.meta.url),
)
const assets = fileURLToPath(
  new URL('./public/assets', import.meta.url),
)

export default defineConfig({
  resolve: {
    alias: { '@': src, '@assets': assets },
  },
})
```
<!-- {: data-highlight="'@assets'"} -->

**Maps several folders in one object.** A string key matches only at a path boundary, so `@` does not catch `@assets`, and regex keys are allowed in the array form; see [resolve.alias](https://vite.dev/config/shared-options#resolve-alias).
