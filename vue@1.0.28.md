---
title: Vue.js v1.0.28
category: JavaScript
deprecated: true
weight: -10
intro: |
  **Deprecated:** this guide targets an old version of Vuej.js (v1.0.28). See the [updated Vue.js cheatsheet](vue) for new versions.
---

{% raw %}

### Lists

```html
<li v-for="todo in todos">
  {{ todo.text }}
  {{ $index }}
</li>
```

### Events

```html
<button v-on:click='submit'>Go</button>
```

### Components

```js
new Vue({
  components: { app: App }
})
```

## API

```js
Vue.extend({ ... })        // creating components
Vue.nextTick(() => {...})

Vue.set(object, key, val)  // reactive
Vue.delete(object, key)

Vue.directive('my-dir', { bind, update, unbind })
// <div v-my-dir='...'></div>

Vue.elementDirective('my-dir', { bind, update, unbind })
// <my-dir>...</my-dir>

Vue.component('my-component', Vue.extend({ .. }))

Vue.partial('my-partial', '<div>hi {{msg}}</div>')
// <partial name='my-partial'></partial>
```

```js
new Vue({
  data: { ... }
  props: ['size'],
  props: { size: Number },
  computed: { fullname() { return this.name + ' ' + this.lastName } },
  methods: { go() { ... } },
  watch: { a (val, oldVal) { ... } },
  el: '#foo',
  template: '...',
  replace: true, // replace element (default true)

  // lifecycle
  created () {},
  beforeCompile () {},
  compiled () {},
  ready () {}, // $el is inserted for the first time
  attached () {},
  detached () {},
  beforeDestroy () {},
  destroyed () {},

  // options
  directives: {},
  elementDirectives: {},
  filters: {},
  components: {},
  transitions: {},
  partials: {}
})
```

## Vue templates
Via [vueify](https://www.npmjs.com/package/vueify)

```js
// app.vue
<template>
  <h1 class="red">{{msg}}</h1>
</template>
 
<script>
  module.exports = {
    data () {
      return {
        msg: 'Hello world!'
      }
    }
  }
</script> 
```

Also

```html
<template lang='jade'>
h1(class='red') {{msg}}
</template>
```

{% endraw %}
