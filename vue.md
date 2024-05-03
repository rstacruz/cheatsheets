---
title: Vue.js
category: JavaScript
updated: 2019-12-26
weight: -10
intro: |
  [Vue.js](https://vuejs.org/) is an open-source Model–view–viewmodel JavaScript framework for building user interfaces and single-page applications.
---

{%raw%}

Expressions
----------
{: .-three-column}

### Expressions

```html
<div id="app">
  <p>I have a {{ product }}</p>
  <p>{{ product + 's' }}</p>
  <p>{{ isWorking ? 'YES' : 'NO' }}</p>
  <p>{{ product.getSalePrice() }}</p>
</div>
```

See: [Delimiters](https://vuejs.org/v2/api/#delimiters)

### Binding

```html
<a v-bind:href="url">...</a>
```

#### Shorthand syntax
```html
<a :href="url">...</a>
```
{: data-line="1"}

#### True or false will add or remove attribute
```html
<button :disabled="isButtonDisabled">...
```

#### If isActive is truthy, the class ‘active’ will appear
```html
<div :class="{ active: isActive }">...
```

#### Style color set to value of activeColor
```html
<div :style="{ color: activeColor }">
```

See: [v-bind](https://vuejs.org/v2/api/#v-bind)

### Directives

#### Element inserted/removed based on truthiness
```html
<p v-if="inStock">{{ product }}</p>
```
```html
<p v-else-if="onSale">...</p>
<p v-else>...</p>
```

#### Toggles the display: none CSS property
```html
<p v-show="showProductDetails">...</p>
```

#### Two-way data binding
```html
<input v-model="firstName" >
```

| Method | Description |
| --- | --- |
| `v-model.lazy="..."` | Syncs input after change event |
| `v-model.number="..."` | Always returns a number |
| `v-model.trim="..."` | Strips whitespace |

See: [Directives](https://vuejs.org/v2/api/#Directives)

### Actions/Events

#### Calls addToCart method on component
```html
<button v-on:click="addToCart">...
```

#### Shorthand syntax
```html
<button @click="addToCart">...
```
{: data-line="1"}

#### Arguments can be passed
```html
<button @click="addToCart(product)">...
```

#### To prevent default behavior (e.g. page reload)
```html
<form @submit.prevent="addProduct">...
```

#### Only trigger once
```html
<img @mouseover.once="showImage">...
```

| Method | Description |
| --- | --- |
| `.stop` | Stop all event propagation |
| `.self ` | Only trigger if event.target is element itself |

#### Keyboard entry example
```html
<input @keyup.enter="submit">
```

#### Call onCopy when control-c is pressed
```html
<input @keyup.ctrl.c="onCopy">
```

See: [Events](https://vuejs.org/v2/guide/events.html)

### List rendering

#### The `:key` is always recommended
```html
<li v-for="item in items"
    :key="item.id">
  {{ item }}
</li>
```
{: data-line="2"}

#### To access the position in the array
```html
<li v-for="(item, index) in items">...
```

#### To iterate through objects
```html
<li v-for="(value, key) in object">...
```

#### Using `v-for` with a component
```html
<cart-product v-for="item in products"
              :product="item"
              :key="item.id">
```

See: [List Rendering](https://vuejs.org/v2/guide/list.html)


Component
--------

### Component anatomy

```js
Vue.component('my-component', {
  components: {
    // Components that can be used in the template
    ProductComponent,
    ReviewComponent
  },
  props: {
    // The parameters the component accepts
    message: String,
    product: Object,
    email: {
      type: String,
      required: true,
      default: "none"
      validator: function (value) {
        // Should return true if value is valid
      }
    }
  },
  data: function() {
    // `data` must be a function
    return {
      firstName: 'Vue',
      lastName: 'Mastery'
    }
  },
  computed: {
    // Return cached values until dependencies change
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  },
  watch: {
    // Called when firstName changes value
    firstName: function (value, oldValue) { ... }
  },
  methods: { ... },
  template: '<span>{{ message }}</span>',
  // Can also use backticks in `template` for multi-line
})
```
{: data-line="3, 8, 16, 21, 28, 34, 39"}

See: [Components Basics](https://vuejs.org/v2/guide/components.html)

### Lifecycle hooks

| Method | Description |
| --- | --- |
| `beforeCreate` | After the instance has been initialized [#](https://vuejs.org/v2/api/#beforeCreate) |
| `created` | After the instance is created [#](https://vuejs.org/v2/api/#created) |
| `beforeMount` | Before the first render [#](https://vuejs.org/v2/api/#beforeMount) |
| `mounted` | After the instance has been mounted [#](https://vuejs.org/v2/api/#mounted) |
| `beforeUpdate` | When data changes, before the DOM is patched [#](https://vuejs.org/v2/api/#beforeUpdate) |
| `updated` | After a data change [#](https://vuejs.org/v2/api/#updated) |
| `beforeDestroy` | Before the instance is destroyed [#](https://vuejs.org/v2/api/#beforeDestroy) |
| `destroyed` | After a Vue instance has been destroyed [#](https://vuejs.org/v2/api/#destroyed) |

See: [Lifecycle Hooks](https://vuejs.org/v2/api/#Options-Lifecycle-Hooks)

### Custom events

#### Set listener on component, within its parent
```html
<button-counter v-on:incrementBy="incWithVal">
```

#### Inside parent component
```js
methods: {
  incWithVal: function (toAdd) { ... }
}
```

#### Inside button-counter template
```js
this.$emit(
    'incrementBy', // Custom event name
    5 // Data sent up to parent
  )
```

Use props to pass data into child components,
custom events to pass data to parent elements.

See: [Custom Events](https://vuejs.org/v2/guide/components-custom-events.html)

Single file components
--------

### Single file
```html
<template>
  <p>{{ greeting }} World!</p>
</template>

<script>
module.exports = {
  data: function () {
    return {
      greeting: 'Hello'
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
```

See: [Single File Components](https://vuejs.org/v2/guide/single-file-components.html)

### Separation
```html
<template>
  <div>This will be pre-compiled</div>
</template>
<script src="./my-component.js"></script>
<style src="./my-component.css"></style>
```

See: [What About Separation of Concerns?](https://vuejs.org/v2/guide/single-file-components.html#What-About-Separation-of-Concerns)

Slots
--------

### Using a single slot

#### Component template
```html
<div>
  <h2>I'm a title</h2>
  <slot>
    Only displayed if no slot content
  </slot>
</div>
```
{: data-line="3,4,5"}

#### Use of component with data for slot
```html
<my-component>
  <p>This will go in the slot</p>
</my-component>
```
{: data-line="2"}

See: [Slots](https://vuejs.org/v2/guide/components-slots.html)

### Multiple slots

#### Component template
```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot>Default content</slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```
{: data-line="3,6,9"}

#### Use of component with data for slots
```html
<app-layout>
  <h1 slot="header">Page title</h1>
  <p>the main content.</p>
  <p slot="footer">Contact info</p>
</app-layout>
```
{: data-line="2,3,4"}

See: [Slots](https://vuejs.org/v2/guide/components-slots.html)

Also see
--------

* [Vue CLI](https://cli.vuejs.org/) _(cli.vuejs.org)_
* [Vue Router](https://router.vuejs.org/) _(router.vuejs.org)_
* [Vue DevTools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en) _(chrome.google.com)_
* [Nuxt.js](https://nuxtjs.org/) _(nuxtjs.org)_
* [Vue.js v1.0.28 cheatsheet](vue@1.0.28/) _Legacy version_

{%endraw%}
