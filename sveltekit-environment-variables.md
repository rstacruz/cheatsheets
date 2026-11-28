---
title: How to use environment variables in SvelteKit
link_title: SvelteKit env variables
subtitle: Secrets and public values
logo: { src: /assets/logos/svelte.svg }
category: JavaScript frameworks
layout: snippet
last_verified_with: "SvelteKit 3.4.1."
updated: 2026-11-28
links:
  - title: Environment variables
    url: https://svelte.dev/docs/kit/environment-variables
---

## Environment variables
<!-- {: .-snippets} -->

### Declare variables
<!-- {: .-snippet} -->

#### src/env.ts

```ts
import { defineEnvVars } from '@sveltejs/kit/env'

export const variables = defineEnvVars({
  DATABASE_URL: {},
  PUBLIC_APP_NAME: { public: true }
})
```
<!-- {: data-highlight="defineEnvVars"} -->

**Declares app variables.** `{ public: true }` exposes one; add a `schema` to validate at startup. See [Environment variables](https://svelte.dev/docs/kit/environment-variables).

### Import a secret
<!-- {: .-snippet} -->

```ts
import { DATABASE_URL } from '$app/env/private'
```
<!-- {: data-highlight="$app/env/private"} -->

**Stays on the server.** Private imports cannot be pulled into a browser bundle; see [Private variables](https://svelte.dev/docs/kit/environment-variables#Private-variables).

### Expose a public value
<!-- {: .-snippet} -->

```ts
import { PUBLIC_APP_NAME } from '$app/env/public'
```
<!-- {: data-highlight="$app/env/public"} -->

**Works on both sides.** Public values must be serializable; see [Public variables](https://svelte.dev/docs/kit/environment-variables#Public-variables).

### Inline a value at build time
<!-- {: .-snippet} -->

```ts
export const variables = defineEnvVars({
  PUBLIC_VERSION: {
    public: true,
    static: true
  }
})
```
<!-- {: data-highlight="static: true"} -->

**Inlines at build time.** It replaces the value in the bundle, and static values allow dead-code elimination. See [Static variables](https://svelte.dev/docs/kit/environment-variables#Static-variables).

### Use a value in app.html
<!-- {: .-snippet} -->

#### src/app.html

```html
<meta
  name="app"
  content="%sveltekit.env.PUBLIC_APP_NAME%"
/>
```
<!-- {: data-highlight="%sveltekit.env.PUBLIC_APP_NAME%"} -->

**Injects into the template.** Only public variables work in `app.html`. See [Public variables](https://svelte.dev/docs/kit/environment-variables#Public-variables).
