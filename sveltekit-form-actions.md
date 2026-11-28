---
title: How to handle forms in SvelteKit
link_title: SvelteKit form actions
subtitle: Validate and submit forms
logo: { src: /assets/logos/svelte.svg }
category: JavaScript frameworks
layout: snippet
last_verified_with: "SvelteKit 3.4.1, Svelte 5.59.2."
updated: 2026-11-28
links:
  - title: Form actions
    url: https://svelte.dev/docs/kit/form-actions
---

## Form actions
<!-- {: .-snippets} -->

### Handle a form post
<!-- {: .-snippet} -->

#### src/routes/login/+page.server.ts

```ts
import type { Actions } from './$types'

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData()
    const email = String(form.get('email'))
  }
} satisfies Actions
```
<!-- {: data-highlight="request.formData()"} -->

**Reads the submitted fields.** Every action receives the request, and its `formData()` holds the field values; see [Form actions](https://svelte.dev/docs/kit/form-actions).

### Submit without JavaScript
<!-- {: .-snippet} -->

```html
<form method="POST">
  <input name="email" type="email" />
  <button>Log in</button>
</form>
```
<!-- {: data-highlight="POST"} -->

**Posts to the default action.** The page's action handles a plain form, which works with JavaScript disabled; see [Default actions](https://svelte.dev/docs/kit/form-actions#Default-actions).

### Add named actions
<!-- {: .-snippet} -->

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

**Selects the action with `?/register`.** Named actions let one page handle several operations; see [Named actions](https://svelte.dev/docs/kit/form-actions#Named-actions).

### Return validation errors
<!-- {: .-snippet} -->

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

**Sends errors back.** They return to the page. `fail()` returns data as `form` and keeps the request from redirecting; see [Validation errors](https://svelte.dev/docs/kit/form-actions#Anatomy-of-an-action-Validation-errors).

### Enhance the form
<!-- {: .-snippet} -->

```html
<script lang="ts">
  import { enhance } from '$app/forms'
  let { form } = $props()
</script>

<form method="POST" use:enhance>
  <input
    name="email"
    value={form?.email ?? ''}
  />
  {#if form?.message}<p>{form.message}</p>{/if}
  <button>Log in</button>
</form>
```
<!-- {: data-highlight="use:enhance"} -->

**Submits in place.** Field values are kept. `form` holds the failed action's return data until the next submit; see [use:enhance](https://svelte.dev/docs/kit/form-actions#Progressive-enhancement-use:enhance).
