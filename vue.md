---
title: Vue.js
subtitle: Progressive UI framework
category: JavaScript libraries
updated: 2026-11-24
last_verified_with: "Vue 3.5.46, Vue Router 5.5.1, Pinia 4.1.0."
tier: t2
fragments:
  - "createApp"
  - "<script setup>"
  - "ref()"
  - "reactive()"
  - "computed()"
  - "v-model"
  - "v-for"
  - ":key"
  - "@click"
  - "defineProps"
  - "defineEmits"
  - "defineModel"
  - "<slot>"
  - "onMounted"
  - "watch()"
  - "provide()"
  - "RouterView"
  - "defineStore"
weight: -10
keywords:
  - Vue 3
  - Composition API
  - script setup
  - ref
  - reactive
  - computed
  - watch
  - defineProps
  - defineEmits
  - defineModel
  - v-model
  - v-for
  - Vue Router
  - Pinia
intro: |
  [Vue.js](https://vuejs.org/) is a progressive framework for building user interfaces. This guide targets Vue 3.5, the Composition API, and script setup.
links:
  - title: Vue.js guide
    url: https://vuejs.org/guide/introduction.html
  - title: API reference
    url: https://vuejs.org/api/
---

{%raw%}

## Quick start
<!-- {: .-three-column} -->

### Create a project

```sh
npm create vue@latest
```
<!-- {: data-highlight="create vue"} -->

Scaffolds a Vite project and offers TypeScript, Vue Router, Pinia, and testing. See: [Quick start](https://vuejs.org/guide/quick-start.html)

### Mount the app

```js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```
<!-- {: data-highlight=".mount('#app')"} -->

`App.vue` is the root component; `.mount()` renders into the container and replaces its contents. See: [app.mount()](https://vuejs.org/api/application.html#app-mount)

### Template syntax

```html
<p>{{ product.name }}</p>
<p>{{ price * 1.2 }}</p>
<p>{{ inStock ? 'Yes' : 'No' }}</p>
<a :href="url">Link</a>
<div :class="{ active: isActive }">
</div>
```
<!-- {: data-highlight="{{ product.name }}; :href"} -->

`{{ }}` renders text; `:` binds an attribute to a JavaScript expression. See: [Template syntax](https://vuejs.org/guide/essentials/template-syntax.html)

### Reactivity

```js
import { reactive, ref } from 'vue'

const count = ref(0)
const state = reactive({ name: 'Vue' })

count.value++
state.name = 'Vite'
```
<!-- {: data-highlight="ref; reactive"} -->

Use `.value` in script; refs unwrap automatically in templates. See: [Reactivity fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)

## Directives
<!-- {: .-three-column} -->

### Conditionals

```html
<p v-if="inStock">{{ product }}</p>
<p v-else-if="onSale">On sale</p>
<p v-else>Sold out</p>

<p v-show="showDetails">Details</p>
```
<!-- {: data-highlight="v-if; v-show"} -->

`v-if` mounts and unmounts; `v-show` toggles `display: none`. See: [Conditional rendering](https://vuejs.org/guide/essentials/conditional.html)

### Lists

```html
<li
  v-for="item in items"
  :key="item.id"
>
  {{ item.name }}
</li>

<li
  v-for="(item, i) in items"
  :key="item.id"
>
  {{ i }}: {{ item.name }}
</li>

<li
  v-for="(value, key) in object"
  :key="key"
>
  {{ key }}: {{ value }}
</li>
```
<!-- {: data-highlight="v-for; :key"} -->

Always bind `:key`; prefer a stable id over the array index. See: [List rendering](https://vuejs.org/guide/essentials/list.html)

### Events

```html
<button @click="addToCart">Add</button>
<button @click="addToCart(product)">
  Add
</button>

<form @submit.prevent="save">…</form>
<input @keyup.enter="submit">

<img @mouseover.once="show">
```
<!-- {: data-highlight="@click; .prevent"} -->

`@click` is shorthand for `v-on:click`; modifiers include `.prevent`, `.stop`, `.once`, and key names. See: [Event handling](https://vuejs.org/guide/essentials/event-handling.html)

### Form binding

```html
<input v-model="firstName">
<input v-model.number="age">
<input v-model.trim="name">
<textarea v-model="bio"></textarea>
<select v-model="picked">
  <option>A</option>
  <option>B</option>
</select>
```
<!-- {: data-highlight="v-model; .number; .trim"} -->

Binds the value and its input or change events in one directive; modifiers include `.lazy`, `.number`, `.trim`. See: [Form input bindings](https://vuejs.org/guide/essentials/forms.html)

## Components

### Single-file component

```html
<script setup>
import { ref } from 'vue'

const greeting = ref('Hello')
</script>

<template>
  <p>{{ greeting }} World!</p>
</template>

<style scoped>
p { text-align: center; }
</style>
```
<!-- {: data-highlight="<script setup>"} -->

A `.vue` file holds template, logic, and styles; `scoped` limits CSS to the component. See: [Single-file components](https://vuejs.org/guide/scaling-up/sfc.html)

### Props

#### Greeting.vue

```html
<script setup>
defineProps({
  name: { type: String, default: 'World' }
})
</script>

<template>
  <p>Hello {{ name }}</p>
</template>
```
<!-- {: data-highlight="defineProps"} -->

#### Parent.vue

```html
<script setup>
import Greeting from './Greeting.vue'
</script>

<template>
  <Greeting name="Ada" />
</template>
```

`defineProps()` declares attributes passed in from the parent; use kebab-case in templates. See: [Props](https://vuejs.org/guide/components/props.html)

### Emits

#### MyButton.vue

```html
<script setup>
const emit = defineEmits(['increase'])

function click() {
  emit('increase', 5)
}
</script>

<template>
  <button @click="click">Add</button>
</template>
```
<!-- {: data-highlight="defineEmits"} -->

#### Parent.vue

```html
<script setup>
import { ref } from 'vue'
import MyButton from './MyButton.vue'
const count = ref(0)
</script>

<template>
  <MyButton @increase="count += $event" />
</template>
```

`defineEmits()` declares emitted events; `$event` holds the payload. See: [Component events](https://vuejs.org/guide/components/events.html)

### Component v-model

#### Child.vue

```html
<script setup>
const model = defineModel()
</script>

<template>
  <input v-model="model">
</template>
```
<!-- {: data-highlight="defineModel"} -->

#### Parent.vue

```html
<script setup>
import { ref } from 'vue'
import Child from './Child.vue'
const query = ref('')
</script>

<template>
  <Child v-model="query" />
</template>
```

`defineModel()` (3.4+) declares a `modelValue` prop and `update:modelValue` event. Named models use `defineModel('title')` and `v-model:title`. See: [Component v-model](https://vuejs.org/guide/components/v-model.html)

### Slots

#### Card.vue

```html
<template>
  <div class="card">
    <header><slot name="header" /></header>
    <slot>No content</slot>
  </div>
</template>
```
<!-- {: data-highlight='<slot name="header" />'} -->

#### Parent.vue

```html
<script setup>
import Card from './Card.vue'
</script>

<template>
  <Card>
    <template #header>Title</template>
    <p>Body</p>
  </Card>
</template>
```
<!-- {: data-highlight="#header"} -->

`<slot>` renders parent content; `#name` is shorthand for `v-slot:name`, and inner content is the fallback. See: [Slots](https://vuejs.org/guide/components/slots.html)

### Lifecycle hooks

| Hook | Runs |
| --- | --- |
| `onBeforeMount` | Before the first render |
| `onMounted` | After the component mounts |
| `onBeforeUpdate` | Before a DOM update |
| `onUpdated` | After a DOM update |
| `onBeforeUnmount` | Before teardown |
| `onUnmounted` | After teardown |

Hooks register synchronously during setup. See: [Lifecycle hooks](https://vuejs.org/guide/essentials/lifecycle.html)

### Provide and inject

#### Parent.vue

```js
import { provide, ref } from 'vue'
const theme = ref('dark')
provide('theme', theme)
```
<!-- {: data-highlight="provide"} -->

#### Child.vue

```js
import { inject } from 'vue'
const theme = inject('theme', 'light')
```
<!-- {: data-highlight="inject"} -->

Provide values from an ancestor and inject them in any descendant; refs stay reactive. See: [Provide/inject](https://vuejs.org/guide/components/provide-inject.html)

## Composition API
<!-- {: .-three-column} -->

### Computed

```js
import { computed, ref } from 'vue'

const firstName = ref('Ada')
const fullName = computed(() => (
  `${firstName.value} Lovelace`
))
```
<!-- {: data-highlight="computed"} -->

Caches the result until a dependency changes; read `.value` in script. See: [Computed properties](https://vuejs.org/guide/essentials/computed.html)

### Watchers

```js
import { ref, watch } from 'vue'

const query = ref('')
const results = ref([])

watch(query, async (value) => {
  results.value = await search(value)
})
```
<!-- {: data-highlight="watch"} -->

Lazy by default; pass `{ immediate: true }` to run once, and `{ deep: true }` for nested changes. See: [Watchers](https://vuejs.org/guide/essentials/watchers.html)

### watchEffect

```js
import { ref, watchEffect } from 'vue'

const query = ref('')
const results = ref([])

watchEffect(async () => {
  results.value = await load(query.value)
})
```
<!-- {: data-highlight="watchEffect"} -->

Tracks every reactive value read in the callback and reruns when they change. See: [watchEffect](https://vuejs.org/guide/essentials/watchers.html#watcheffect)

### Template refs

```html
<script setup>
import {
  onMounted,
  useTemplateRef
} from 'vue'

const input = useTemplateRef('input')
onMounted(() => input.value.focus())
</script>

<template>
  <input ref="input">
</template>
```
<!-- {: data-highlight="useTemplateRef"} -->

`useTemplateRef()` (3.5+) reads the matching `ref` attribute. See: [Template refs](https://vuejs.org/guide/essentials/template-refs.html)

### Composables

#### useCounter.js

```js
import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++
  return { count, increment }
}
```
<!-- {: data-highlight="useCounter"} -->

Extract reactive logic into a function that returns refs; call it in setup. See: [Composables](https://vuejs.org/guide/reusability/composables.html)

## Routing
<!-- {: .-three-column} -->

### Router setup

```js
import {
  createRouter,
  createWebHistory
} from 'vue-router'
import About from './views/About.vue'
import Home from './views/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})

export default router
```

Registers `RouterLink` and `RouterView` when passed to `app.use(router)`. See: [Vue Router](https://router.vuejs.org/guide/#Creating-the-router-instance)

### Links and views

```html
<RouterLink to="/">Home</RouterLink>
<RouterLink :to="{ name: 'about' }">
  About
</RouterLink>
<RouterView />
```
<!-- {: data-highlight="RouterLink; RouterView"} -->

`RouterLink` renders an `<a>` without a page reload; `RouterView` renders the matched component. See: [RouterLink](https://router.vuejs.org/api/interfaces/RouterLinkProps.html)

### Current route

```js
import { useRoute } from 'vue-router'

const route = useRoute()
route.params.id   // /users/:id
route.query.page  // ?page=2
```
<!-- {: data-highlight="useRoute"} -->

The route object is reactive; read it in templates, computed values, or watchers. See: [useRoute](https://router.vuejs.org/api/functions/useroute)

### Navigation

```js
import { useRouter } from 'vue-router'

const router = useRouter()
router.push('/about')
router.replace({ name: 'about' })
```
<!-- {: data-highlight="router.push"} -->

`push()` adds a history entry; `replace()` swaps the current one. See: [Programmatic navigation](https://router.vuejs.org/guide/essentials/navigation.html)

## State with Pinia

### Install

#### Shell

```sh
npm install pinia @vue/devtools-api
```

#### main.js

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

createApp(App).use(createPinia()).mount('#app')
```
<!-- {: data-highlight="createPinia"} -->

Pinia 4 needs `@vue/devtools-api` as a peer dependency. See: [Pinia installation](https://pinia.vuejs.org/getting-started.html)

### Create a store

#### stores/counter.js

```js
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const double = computed(() => count.value * 2)
  const increment = () => count.value++
  return { count, double, increment }
})
```
<!-- {: data-highlight="defineStore"} -->

Refs become state, computed values become getters, and functions become actions. See: [Defining a store](https://pinia.vuejs.org/core-concepts/)

### Use a store

```html
<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()
const { count } = storeToRefs(store)
const { increment } = store
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```
<!-- {: data-highlight="storeToRefs"} -->

Call the store in setup; `storeToRefs()` keeps destructured state reactive. See: [Using a store](https://pinia.vuejs.org/core-concepts/#Using-the-store)

## Also see

- [Vue.js documentation](https://vuejs.org/) _(vuejs.org)_
- [Vue Router](https://router.vuejs.org/) _(router.vuejs.org)_
- [Pinia](https://pinia.vuejs.org/) _(pinia.vuejs.org)_
- [Nuxt](https://nuxt.com/) _(nuxt.com)_
- [Vue DevTools](https://devtools.vuejs.org/) _(devtools.vuejs.org)_
- [Vue 2 cheatsheet](vue@2) — options API and `new Vue()`
- [Vue 1 cheatsheet](vue@1.0.28) — legacy version

{%endraw%}
