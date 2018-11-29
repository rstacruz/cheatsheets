---
title: Vuex
category: Vue
layout: 2017/sheet
ads: true
tags: [Featured]
updated: 2018-11-28
weight: -10
keywords:
  - Vuex State.
  - Vuex Getters.
  - Vuex Mutations.
  - Vuex Actions.
  - Vuex Modules.
intro: |
  [Vuex](https://vuex.vuejs.org/)  is a state management pattern + library for Vue.js applications.
---


### Creating Store

```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
```
{: .-setup}

```js
// state
const state = { count : 0};

// types 

const types = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET', 
}

// Mutations
const mutations = {
  [types.INCREMENT](state) {
    state.count += 1;
  },
  [types.DECREMENT](state) {
    state.count += -1;
  }
  [types.RESET](state){
    state.count = 0;
  }
}

// Actions
const actions = {
  increment (context){
    context.commit(types.INCREMENT);
  },
  decrement (context){
    context.commit(types.DECREMENT);
  }
  reset (context){
    context.commit(types.RESET);
  }
}

// Getters

const getters = {
  isEven(state){
    return state.count % 2 === 0;
  }
}
```

```js
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});

```

### Include store into the App

```js
import Vue from 'vue';
import store from './store';
import App from './App.vue';
```

{: .-setup}

```js
new Vuew({
  el: '#app',
  store,
  render: h => h(App)
});
```


### Using in .Vue Templates

```html
<template>
  <div id="app">
    <section class="hero">
        <h1 class="title">{{ "{{ count " }}}}</h1>
        <h2 v-if="isEven">Is even!!</h1>
    </section>
    <section>
      <button class="button" @click="increment">+</button>
      <button class="button" @click="decrement">-</button>
      <button class="button" @click="reset">Reset</button>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import store from './store';
export default {
  name: 'app',
  computed: {
    ...mapState(['count']),
    ...mapGetters(['isEven']),
  },
  methods: {
    ...mapActions([
      'increment', 'decrement', 'reset'
    ])
  }
}
</script>

```