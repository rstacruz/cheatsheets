---
title: React vs Vue
subtitle: Same patterns, different primitives
category: JavaScript libraries
updated: 2026-11-25
last_verified_with: "React 19.2, Vue 3.5."
layout: versus
intro: |
  React and Vue reach for different primitives. Each card shows the same pattern in both, then notes where they part ways.
links:
  - title: React documentation
    url: https://react.dev/learn
  - title: Vue documentation
    url: https://vuejs.org/guide/introduction.html
---

## Components

### Define a component

#### React

```jsx
function Greeting({ name }) {
  return <p>Hello, {name}!</p>
}
```
<!-- {: data-highlight="function Greeting"} -->

#### Vue

```html
<script setup>
defineProps({ name: String })
</script>

<template>
  <p>Hello, {{ name }}!</p>
</template>
```
<!-- {: data-highlight="defineProps"} -->

#### Comments

React components are functions returning JSX. A Vue SFC declares props in `script setup` and markup in `template`.

### Compose children

#### React

```jsx
function Layout({ children }) {
  return <main>{children}</main>
}
```
<!-- {: data-highlight="children"} -->

#### Vue

```html
<template>
  <main><slot /></main>
</template>
```
<!-- {: data-highlight="<slot />"} -->

#### Comments

React passes markup as the `children` prop. Vue reserves a `<slot />` outlet in the template.

## State

### Local state

#### React

```jsx
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(c => c + 1)}>
      {count}
    </button>
  )
}
```
<!-- {: data-highlight="useState"} -->

#### Vue

```html
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```
<!-- {: data-highlight="ref"} -->

#### Comments

React state is read-only and changes through its setter. A Vue `ref` is mutable and unwraps in templates.

### Derive a value

#### React

```jsx
function Total({ items }) {
  const total = items.reduce(
    (sum, item) => sum + item.price,
    0
  )

  return <p>Total: {total}</p>
}
```
<!-- {: data-highlight="reduce"} -->

#### Vue

```html
<script setup>
import { computed, ref } from 'vue'

const items = ref([])
const total = computed(() =>
  items.value.reduce(
    (sum, item) => sum + item.price,
    0
  )
)
</script>

<template>
  <p>Total: {{ total }}</p>
</template>
```
<!-- {: data-highlight="computed"} -->

#### Comments

React recomputes derived values on each render. `computed` caches until a dependency changes.

### Run a side effect

#### React

```jsx
function Title({ count }) {
  useEffect(() => {
    document.title = `Count: ${count}`
  }, [count])

  return <p>{count}</p>
}
```
<!-- {: data-highlight="useEffect"} -->

#### Vue

```html
<script setup>
import { ref, watchEffect } from 'vue'

const count = ref(0)
watchEffect(() => {
  document.title = `Count: ${count.value}`
})
</script>

<template>
  <p>{{ count }}</p>
</template>
```
<!-- {: data-highlight="watchEffect"} -->

#### Comments

`useEffect` re-runs from an explicit dependency list. `watchEffect` tracks the refs its callback reads.

## Markup

### Render a list

#### React

```jsx
function List({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}
```
<!-- {: data-highlight="key"} -->

#### Vue

```html
<script setup>
defineProps({ items: Array })
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
</template>
```
<!-- {: data-highlight="v-for"} -->

#### Comments

React maps to elements and takes a `key` prop. Vue's `v-for` is a directive and still needs `:key`.

### Bind an input

#### React

```jsx
function NameField() {
  const [name, setName] = useState('')

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  )
}
```
<!-- {: data-highlight="onChange"} -->

#### Vue

```html
<script setup>
import { ref } from 'vue'

const name = ref('')
</script>

<template>
  <input v-model="name" />
</template>
```
<!-- {: data-highlight="v-model"} -->

#### Comments

React controlled inputs wire the value and its handler by hand. `v-model` binds both directions.
