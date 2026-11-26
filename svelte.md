---
title: Svelte
subtitle: Compiled UI framework
category: JavaScript frameworks
updated: 2026-11-26
last_verified_with: "Svelte 5.59.2, Node 26.13.1."
tier: t2
fragments:
  - "$state"
  - "$derived"
  - "$effect"
  - "$props"
  - "{#if}"
  - "{#each}"
  - "{#snippet}"
  - "{@render}"
  - "bind:value"
  - "class:active"
  - "transition:fade"
  - "onMount"
  - "createContext"
  - "writable()"
  - "$state.raw"
  - "svelte:window"
keywords:
  - svelte 5
  - svelte runes
  - svelte props
  - svelte each block
  - svelte snippets
intro: |
  [Svelte](https://svelte.dev) compiles components into small JavaScript at build time. This reference covers Svelte 5 runes, markup, bindings, components, and styling.
links:
  - title: Svelte documentation
    url: https://svelte.dev/docs/svelte/overview
  - title: Interactive tutorial
    url: https://svelte.dev/tutorial
  - title: GitHub repository
    url: https://github.com/sveltejs/svelte
---

## Quick start
<!-- {: .-three-column} -->

### Create a project

```bash
npx sv create my-app
```
<!-- {: data-highlight="sv create"} -->

The `sv` CLI scaffolds a Vite project; pick SvelteKit, TypeScript, and your package manager at the prompts.

See: [Creating a project](https://svelte.dev/docs/kit/creating-a-project)

### Scripts

```bash
# start a dev server with hot reloading
pnpm dev
```
<!-- {: data-highlight="pnpm dev"} -->

```bash
# build the production bundle
pnpm build
```
<!-- {: data-highlight="pnpm build"} -->

```bash
# serve the built bundle locally
pnpm preview
```
<!-- {: data-highlight="pnpm preview"} -->

These run Vite through the scripts `sv create` writes into `package.json`.

See: [Creating a project](https://svelte.dev/docs/kit/creating-a-project)

### Component anatomy

```html
<script>
  let { name } = $props()
  let count = $state(0)
</script>

<h1>Hello {name}</h1>

<button onclick={() => count++}>
  Clicked {count}
</button>

<style>
  h1 { color: rebeccapurple; }
</style>
```

A `.svelte` file holds script, markup, and styles; `<style>` applies only to this component.

See: [Svelte files](https://svelte.dev/docs/svelte/svelte-files)

### Mount an app

```js
import { mount } from 'svelte'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app'),
  props: { name: 'Ada' }
})

export default app
```
<!-- {: data-highlight="mount"} -->

`mount` replaces `new App({ target })`; `unmount(app)` tears it down.

See: [Imperative component API](https://svelte.dev/docs/svelte/imperative-component-api)

## Runes
<!-- {: .-three-column} -->

### State

```html
<script>
  let count = $state(0)
</script>

<button onclick={() => count++}>
  Clicked {count} times
</button>
```
<!-- {: data-highlight="$state(0)"} -->

`$state` marks a reactive variable. Objects and arrays become deep proxies, so mutating a property re-renders.

See: [`$state`](https://svelte.dev/docs/svelte/$state)

### Derived

#### Expression

```html
<script>
  let count = $state(2)
  let doubled = $derived(count * 2)
</script>

<p>{count} × 2 = {doubled}</p>
```
<!-- {: data-highlight="$derived(count * 2)"} -->

#### Block form

```html
<script>
  let numbers = $state([1, 2, 3])

  let total = $derived.by(() => {
    let sum = 0
    for (const n of numbers) sum += n
    return sum
  })
</script>

<p>Total: {total}</p>
```
<!-- {: data-highlight="$derived.by"} -->

`$derived` recomputes lazily whenever its dependencies change; `$derived.by` takes a function for calculations that need statements.

See: [`$derived`](https://svelte.dev/docs/svelte/$derived)

### Effects

```html
<script>
  let count = $state(0)

  $effect(() => {
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  })

  function tick() {
    count++
  }
</script>

<p>{count} seconds</p>
```
<!-- {: data-highlight="$effect"} -->

Effects run after mount and again when their dependencies change; a returned function cleans up. They never run during server rendering.

See: [`$effect`](https://svelte.dev/docs/svelte/$effect)

### Raw state

```html
<script>
  let items = $state.raw([])

  async function load() {
    const res = await fetch('/api/items')
    items = await res.json()
  }
</script>
```
<!-- {: data-highlight="$state.raw"} -->

`$state.raw` skips the proxy for large or immutable values; mutating it does nothing, so reassign instead.

See: [`$state.raw`](https://svelte.dev/docs/svelte/$state#$state.raw)

### Snapshots

#### settings.svelte.js

```js
export const settings = $state({
  theme: 'dark'
})

export async function save() {
  const body = JSON.stringify(
    $state.snapshot(settings)
  )
  await fetch('/api/settings', {
    method: 'POST',
    body
  })
}
```
<!-- {: data-highlight="$state.snapshot"} -->

`$state.snapshot` strips proxies, which `structuredClone` and `postMessage` reject.

See: [`$state.snapshot`](https://svelte.dev/docs/svelte/$state#$state.snapshot)

## Markup
<!-- {: .-three-column} -->

### Text and attributes

```html
<p>Hello {name.toUpperCase()}</p>
<img {src} alt={alt} />
<button disabled={!ready}>Send</button>
```
<!-- {: data-highlight="{src}"} -->

Curly braces interpolate any expression; `{src}` is shorthand for `src={src}`.

See: [Template syntax](https://svelte.dev/docs/svelte/basic-markup)

### Conditionals

```html
{#if user}
  <p>Hi {user.name}</p>
{:else if loading}
  <p>Loading…</p>
{:else}
  <button onclick={login}>Log in</button>
{/if}
```
<!-- {: data-highlight="{:else if loading}"} -->

`{:else if}` chains conditions and `{:else}` catches the rest.

See: [if blocks](https://svelte.dev/docs/svelte/if)

### Each blocks

```html
{#each items as item, i (item.id)}
  <li>{i + 1}. {item.name}</li>
{:else}
  <li>Nothing yet</li>
{/each}
```
<!-- {: data-highlight="(item.id)"} -->

The parenthesis marks a key, which keeps identity when the list reorders. `{:else}` renders when the array is empty.

See: [each blocks](https://svelte.dev/docs/svelte/each)

### Await blocks

```html
{#await loadUser(id)}
  <p>Loading…</p>
{:then user}
  <p>{user.name}</p>
{:catch error}
  <p>{error.message}</p>
{/await}
```
<!-- {: data-highlight="{:then user}"} -->

Shorthand `{#await promise then user}` skips the loading branch.

See: [await blocks](https://svelte.dev/docs/svelte/await)

### Key blocks

```html
{#key userId}
  <Profile {userId} />
{/key}
```
<!-- {: data-highlight="{#key userId}"} -->

`{#key}` destroys and recreates its children, and their state, when the value changes.

See: [key blocks](https://svelte.dev/docs/svelte/key)

### Special elements

```html
<svelte:window onresize={onResize} />
<svelte:head>
  <title>{title}</title>
</svelte:head>
<svelte:element this={tag}>
  {text}
</svelte:element>
```
<!-- {: data-highlight="svelte:window; svelte:head; svelte:element"} -->

`svelte:window`, `svelte:document`, and `svelte:body` bind listeners outside the component; `svelte:element` renders a dynamic tag.

See: [`svelte:window`](https://svelte.dev/docs/svelte/svelte-window), [`svelte:head`](https://svelte.dev/docs/svelte/svelte-head), [`svelte:element`](https://svelte.dev/docs/svelte/svelte-element)

## Components
<!-- {: .-three-column} -->

### Props

#### Greeting.svelte

```html
<script>
  let { name, role = 'user' } = $props()
</script>

<p>{name} ({role})</p>
```
<!-- {: data-highlight="$props()"} -->

#### App.svelte

```html
<script>
  import Greeting from './Greeting.svelte'
</script>

<Greeting name="Ada" role="admin" />
```

Defaults live in the destructuring pattern; add `...rest` to forward unknown props.

See: [Props](https://svelte.dev/docs/svelte/$props)

### Bindable props

```html
<script>
  let { value = $bindable('') } = $props()
</script>

<input bind:value />
```
<!-- {: data-highlight="$bindable"} -->

`$bindable` lets a parent opt into two-way updates with `bind:value`; without it the prop is one-way.

See: [Bindable props](https://svelte.dev/docs/svelte/$bindable)

### Event handlers

```html
<script>
  let count = $state(0)

  function handleClick(event) {
    count++
  }
</script>

<button onclick={handleClick}>
  Clicked {count}
</button>
```
<!-- {: data-highlight="onclick={handleClick}"} -->

Svelte 5 uses DOM properties: `onclick`, `oninput`, `onkeydown`. The `on:click` directive is legacy.

See: [Event handling](https://svelte.dev/docs/svelte/basic-markup#Events)

### Event modifiers

```html
<script>
  function submit(event) {
    event.preventDefault()
    save()
  }
</script>

<form onsubmit={submit}>…</form>
```
<!-- {: data-highlight="event.preventDefault()"} -->

Modifiers like `|preventDefault` are gone; call the method yourself, or use `onsubmitcapture` for the capture phase.

See: [Event modifiers](https://svelte.dev/docs/svelte/v5-migration-guide#Event-changes-Event-modifiers)

### Callback props

```html
<script>
  let { onselect } = $props()
</script>

<button onclick={() => onselect(id)}>
  Pick
</button>
```
<!-- {: data-highlight="onselect"} -->

Component events (`createEventDispatcher`) give way to plain function props, which are typed and spread like any other prop.

See: [Callback props](https://svelte.dev/docs/svelte/v5-migration-guide#Event-changes-Component-events)

## Snippets
<!-- {: .-three-column} -->

### Define and render

```html
{#snippet greet(name)}
  <p>Hello {name}</p>
{/snippet}

{@render greet('Ada')}
```
<!-- {: data-highlight="{#snippet greet(name)}"} -->

A snippet is a reusable block of markup; `{@render}` calls it with arguments.

See: [Snippets](https://svelte.dev/docs/svelte/snippet)

### Children

```html
<script>
  let { children } = $props()
</script>

<div class="card">
  {@render children()}
</div>
```
<!-- {: data-highlight="{@render children()}"} -->

`children` is an implicit prop holding the component's content, replacing `<slot />`.

See: [Default content](https://svelte.dev/docs/svelte/snippet#Passing-snippets-to-components)

### Pass a snippet as a prop

```html
<script>
  let { items, row } = $props()
</script>

<ul>
  {#each items as item}
    {@render row(item)}
  {/each}
</ul>
```
<!-- {: data-highlight="row(item)"} -->

Any snippet can be passed down as a prop; call it optionally with `row?.(item)`.

See: [Snippet props](https://svelte.dev/docs/svelte/snippet#Passing-snippets-to-components)

## Bindings
<!-- {: .-three-column} -->

### Text inputs

```html
<script>
  let name = $state('')
</script>

<input bind:value={name} />
<p>Hello {name}</p>
```
<!-- {: data-highlight="bind:value={name}"} -->

`bind:value` keeps the input and the variable in sync in both directions.

See: [Text bindings](https://svelte.dev/docs/svelte/bind#input-bind:value)

### Checkboxes and groups

```html
<script>
  let agreed = $state(false)
  let picked = $state([])
  const colors = ['red', 'green', 'blue']
</script>

<input
  type="checkbox"
  bind:checked={agreed}
/>

{#each colors as color}
  <label>
    <input
      type="checkbox"
      bind:group={picked}
      value={color}
    />
    {color}
  </label>
{/each}
```
<!-- {: data-highlight="bind:group"} -->

`bind:group` collects the checked values into an array; `bind:checked` holds a boolean.

See: [Group bindings](https://svelte.dev/docs/svelte/bind#input-bind:group)

### Selects

```html
<script>
  let choice = $state('two')
  const options = ['one', 'two', 'three']
</script>

<select bind:value={choice}>
  {#each options as option}
    <option value={option}>
      {option}
    </option>
  {/each}
</select>
```
<!-- {: data-highlight="bind:value={choice}"} -->

`<select>` binds the chosen option's `value`, not its text.

See: [Select bindings](https://svelte.dev/docs/svelte/bind#select-bind:value)

### Element refs

```html
<script>
  let canvas = $state()
</script>

<canvas bind:this={canvas}></canvas>
```
<!-- {: data-highlight="bind:this={canvas}"} -->

`bind:this` holds the DOM node. `bind:clientWidth`, `bind:offsetHeight` and friends report measurements.

See: [`bind:this`](https://svelte.dev/docs/svelte/bind#bind:this)

### Function bindings

```html
<script>
  let text = $state('')

  const get = () => text
  const set = (value) =>
    (text = value.toUpperCase())
</script>

<input bind:value={get, set} />
```
<!-- {: data-highlight="bind:value={get, set}"} -->

Pass a `get, set` pair to transform values on the way in and out.

See: [Function bindings](https://svelte.dev/docs/svelte/bind#Function-bindings)

## Lifecycle
<!-- {: .-three-column} -->

### onMount

```html
<script>
  import { onMount } from 'svelte'

  let now = $state(new Date())

  onMount(() => {
    const id = setInterval(() => {
      now = new Date()
    }, 1000)
    return () => clearInterval(id)
  })
</script>
```
<!-- {: data-highlight="onMount"} -->

`onMount` runs once in the browser; the returned function runs on unmount.

See: [`onMount`](https://svelte.dev/docs/svelte/lifecycle-hooks#onMount)

### onDestroy

```html
<script>
  import { onDestroy } from 'svelte'

  const socket = new WebSocket(url)
  onDestroy(() => socket.close())
</script>
```
<!-- {: data-highlight="onDestroy"} -->

`onDestroy` is for cleanup set up outside an effect; `$effect` cleanup covers most cases.

See: [`onDestroy`](https://svelte.dev/docs/svelte/lifecycle-hooks#onDestroy)

### After DOM updates

```js
import { tick } from 'svelte'

async function open() {
  dialog.showModal()
  await tick()
  dialog.querySelector('input')?.focus()
}
```
<!-- {: data-highlight="await tick()"} -->

`await tick()` waits for pending state changes to reach the DOM before you measure or focus.

See: [`tick`](https://svelte.dev/docs/svelte/svelte#tick)

## Styling
<!-- {: .-three-column} -->

### Scoped styles

```html
<p class="note">Careful</p>

<style>
  .note { color: tomato; }
</style>
```
<!-- {: data-highlight=".note { color: tomato; }"} -->

Styling is scoped by default: Svelte adds a hash class and drops selectors that match nothing.

See: [Scoped styles](https://svelte.dev/docs/svelte/scoped-styles)

### Global styles

```html
<style>
  :global(body) { margin: 0; }
  :global(.prose a) {
    text-decoration: underline;
  }
</style>
```
<!-- {: data-highlight=":global(body)"} -->

`:global(...)` opts a selector out of scoping, for resets and content you do not own.

See: [Global styles](https://svelte.dev/docs/svelte/global-styles)

### CSS custom properties

#### Card.svelte

```html
<script>
  let { children } = $props()
</script>

<div class="card">
  {@render children()}
</div>

<style>
  .card { padding: var(--pad, 1rem); }
</style>
```
<!-- {: data-highlight="var(--pad, 1rem)"} -->

#### App.svelte

```html
<script>
  import Card from './Card.svelte'
</script>

<Card --pad="2rem">Hi</Card>
```

Custom properties cross the component boundary: setting `--pad` on the component reaches the child's CSS.

See: [Custom properties](https://svelte.dev/docs/svelte/custom-properties)

### Class and style directives

```html
<button
  class="tab"
  class:active={selected}
  style:color={color}
  onclick={select}
>
  {label}
</button>
```
<!-- {: data-highlight="class:active={selected}; style:color={color}"} -->

`class:name` toggles a class and `style:prop` sets one property without string concatenation.

See: [Class directive](https://svelte.dev/docs/svelte/class)

## Shared state

### Module state

#### counter.svelte.js

```js
export const counter = $state({ count: 0 })

export function increment() {
  counter.count++
}
```
<!-- {: data-highlight="$state({ count: 0 })"} -->

#### Counter.svelte

```html
<script>
  import { counter, increment } from './counter.svelte.js'
</script>

<button onclick={increment}>{counter.count}</button>
```

Only `.svelte.js` and `.svelte.ts` files may use runes, and a module cannot export a `let` that gets reassigned; export an object instead.

See: [Universal reactivity](https://svelte.dev/docs/svelte/$state#Passing-state-across-modules)

### Classes

#### cart.svelte.js

```js
class Cart {
  items = $state([])

  get total() {
    return this.items.reduce((sum, i) => sum + i.price, 0)
  }
}

export const cart = new Cart()
```
<!-- {: data-highlight="items = $state([])"} -->

Class fields with `$state` stay reactive, and getters recompute on read.

See: [Classes](https://svelte.dev/docs/svelte/$state#Classes)

### Context

#### user-context.svelte.js

```js
import { createContext } from 'svelte'

export const [getUser, setUser] = createContext()
```
<!-- {: data-highlight="createContext()"} -->

#### UserMenu.svelte

```html
<script>
  import { getUser } from './user-context.svelte.js'

  const user = getUser()
</script>

<p>{user.name}</p>
```

#### App.svelte

```html
<script>
  import { setUser } from './user-context.svelte.js'
  import UserMenu from './UserMenu.svelte'

  setUser(userFromServer)
</script>

<UserMenu />
```

`setUser(value)` in a parent exposes state to every descendant without prop drilling.

See: [`createContext`](https://svelte.dev/docs/svelte/svelte#createContext)

### Stores

#### stores.js

```js
import { writable } from 'svelte/store'

export const count = writable(0)
```
<!-- {: data-highlight="writable(0)"} -->

#### Counter.svelte

```html
<script>
  import { count } from './stores.js'
</script>

<button onclick={() => count.update((n) => n + 1)}>
  {$count}
</button>
```

Runes are the default; stores still suit libraries, and `$count` auto-subscribes.

See: [Stores](https://svelte.dev/docs/svelte/stores)

## Animation
<!-- {: .-three-column} -->

### Transitions

```html
<script>
  import { fade } from 'svelte/transition'

  let visible = $state(true)
</script>

{#if visible}
  <p transition:fade>Saved</p>
{/if}
```
<!-- {: data-highlight="transition:fade"} -->

`transition:fade` plays on both in and out; it only runs when the block is added or removed.

See: [Transitions](https://svelte.dev/docs/svelte/transition)

### In and out

```html
<script>
  import { fly } from 'svelte/transition'
</script>

<div in:fly={{ y: 20, duration: 200 }}>
  Loaded
</div>
```
<!-- {: data-highlight="in:fly"} -->

Options are passed as an object; `out:` runs only on removal, `in:` only on arrival.

See: [Transition parameters](https://svelte.dev/docs/svelte/transition#Transition-parameters)

### List animation

```html
<script>
  import { flip } from 'svelte/animate'

  let items = $state([])
</script>

{#each items as item (item.id)}
  <li animate:flip>{item.name}</li>
{/each}
```
<!-- {: data-highlight="animate:flip"} -->

`animate:flip` moves items between positions; it needs a keyed `{#each}` block.

See: [Animating lists](https://svelte.dev/docs/svelte/animate)

### Motion values

```html
<script>
  import { Tween } from 'svelte/motion'

  let target = $state(100)
  const width = Tween.of(() => target)
</script>

<div style:width="{width.current}px">
  …
</div>
```
<!-- {: data-highlight="Tween.of"} -->

`Tween` and `Spring` smooth a changing number; read `.current` in markup and set the state it follows.

See: [`Tween`](https://svelte.dev/docs/svelte/svelte-motion#Tween)

## TypeScript

### Typed props

```html
<script lang="ts">
  interface Props {
    name: string
    age?: number
  }

  let { name, age = 0 }: Props = $props()
</script>

<p>{name}, {age}</p>
```
<!-- {: data-highlight="}: Props = $props()"} -->

Annotate the destructured object; optional fields need `?` or a default.

See: [TypeScript in Svelte](https://svelte.dev/docs/svelte/typescript)

### Generic components

```html
<script lang="ts" generics="T">
  let { items }: { items: T[] } = $props()
</script>

{#each items as item}
  <p>{item}</p>
{/each}
```
<!-- {: data-highlight='generics="T"'} -->

`generics` declares type parameters once and infers them at each usage site.

See: [Generic components](https://svelte.dev/docs/svelte/typescript#Generic-$props)

### Component props type

```ts
import type { ComponentProps } from 'svelte'
import Button from './Button.svelte'

type ButtonProps = ComponentProps<typeof Button>

const props: ButtonProps = { label: 'Save' }
```
<!-- {: data-highlight="ComponentProps"} -->

`ComponentProps` extracts a component's prop type, for wrappers and prop tables.

See: [`ComponentProps`](https://svelte.dev/docs/svelte/svelte#ComponentProps)

### Type checking

```bash
npx sv check
```
<!-- {: data-highlight="sv check"} -->

`svelte-check` reports template errors; `sv check` runs it with the project's config.

See: [svelte-check](https://svelte.dev/docs/cli/sv-check)

## Migrating from Svelte 4

### Automated migration

```bash
npx sv migrate svelte-5
```
<!-- {: data-highlight="svelte-5"} -->

The codemod rewrites props, reactivity, events, and slots; review its diff, since `$:` blocks with side effects stay as `run(...)` shims.

See: [Migration guide](https://svelte.dev/docs/svelte/v5-migration-guide)

### What changes

| Svelte 4 | Svelte 5 |
| --- | --- |
| `export let name` | `let { name } = $props()` |
| `$: doubled = n * 2` | `let doubled = $derived(n * 2)` |
| `on:click={go}` | `onclick={go}` |
| `<slot />` | `{@render children()}` |
| `new App({ target })` | `mount(App, { target })` |
| `writable(0)` | `$state(0)` in a `.svelte.js` file |
<!-- {: .-headers} -->

Runes mode is opt-in per component; a component using `$state` or `$props` is already in it.

See: [Runes migration](https://svelte.dev/docs/svelte/v5-migration-guide#Breaking-changes-in-runes-mode)

## Beyond the basics
<!-- {: .-three-column} -->

### Error boundaries

```html
<script>
  const report = (e) => console.error(e)
</script>

<svelte:boundary onerror={report}>
  {#snippet failed(error, reset)}
    <p>{error.message}</p>
    <button onclick={reset}>Retry</button>
  {/snippet}

  <RiskyWidget />
</svelte:boundary>
```
<!-- {: data-highlight="svelte:boundary"} -->

A boundary catches render and effect errors below it and shows the `failed` snippet.

See: [`svelte:boundary`](https://svelte.dev/docs/svelte/svelte-boundary)

### Attachments

```html
<script>
  const focus = (node) => {
    node.focus()
    return () => node.blur()
  }
</script>

<input {@attach focus} />
```
<!-- {: data-highlight="{@attach focus}"} -->

An attachment runs when an element mounts and returns its cleanup, replacing most actions.

See: [`{@attach}`](https://svelte.dev/docs/svelte/@attach)

### Inspect

```html
<script>
  let count = $state(0)

  $inspect(count)
  $inspect(count).with(console.trace)
</script>

<button onclick={() => count++}>
  {count}
</button>
```
<!-- {: data-highlight="$inspect(count)"} -->

`$inspect` logs a value whenever it changes, in development only, and is stripped from builds.

See: [`$inspect`](https://svelte.dev/docs/svelte/$inspect)

## Also see

<!-- {: .-one-column} -->

- [Type Svelte props cheatsheet](./svelte-type-props)
- [Comment in Svelte cheatsheet](./svelte-comments)
- [Key an each block cheatsheet](./svelte-keyed-each)
- [Derived vs effect cheatsheet](./svelte-derived-vs-effect)
- [Snippets vs slots cheatsheet](./svelte-snippets-vs-slots)
- [Share Svelte state cheatsheet](./svelte-shared-state)
- [Bind Svelte inputs cheatsheet](./svelte-bind-input)
- [Migrate to Svelte 5 cheatsheet](./svelte-migrate-v5)
- [Svelte transitions cheatsheet](./svelte-transitions)
- [Fetch data in Svelte cheatsheet](./svelte-fetch-data)
