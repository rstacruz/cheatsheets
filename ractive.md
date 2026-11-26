---
title: Ractive.js
subtitle: Template-driven UI library
category: JavaScript libraries
updated: 2026-11-26
intro: |
  Ractive is a template-driven UI library for JavaScript.
links:
  - title: Ractive.js
    url: https://ractive.js.org/
  - title: GitHub repository
    url: https://github.com/ractivejs/ractive
tier: t3
last_verified_with: "Ractive 1.4.4."
---

{% raw %}

### [Initialization](https://ractive.js.org/api/#initialization-options)

```js
new Ractive({
  el: '#box',
  template: '...', // required

  // data
  data: { ... },
  partials: { ... },    // global: Ractive.partials
  transitions: { ... }, // global: Ractive.transitions
  components: { ... },  // global: Ractive.components
  adaptors: [ ... ],

  // options
  twoway: true,
  noIntro: true, // true = disable transition on initial render
  lazy: false,   // false = use keyevents, true = use change/blur
  append: false, // false = overwrite element, true = append
  sanitize: false,

  // callbacks
  oninit () {},    // on instantiate
  oncomplete () {} // on finish animations
})
```
<!-- {: data-highlight="new Ractive; twoway"} -->

See: [Initialization options](https://ractive.js.org/api/#initialization-options)

## Instance methods

### Updating values

```js
view.add('count', 1)       //=> promise
view.subtract('count', 1)  //=> promise
view.toggle('shown')       //=> promise

view.set('a', true)
view.set({ a: true })
view.reset({ a: true })
view.merge('list', [a,b,c])

view.get('a')
```
<!-- {: data-highlight="view.add; view.set; view.get"} -->

See: [ractive.add](https://ractive.js.org/api/#ractiveadd), [ractive.set](https://ractive.js.org/api/#ractiveset)

### Nodes and components

```js
view.find('.klass')
view.findAll('.klass')

view.findComponent('photo')
view.findAllComponents('photo')
```
<!-- {: data-highlight="view.find; view.findComponent"} -->

See: [ractive.find](https://ractive.js.org/api/#ractivefind), [ractive.findComponent](https://ractive.js.org/api/#ractivefindcomponent)

### Events

```js
view.on('event', function() { ... })
view.off('event', fn)
view.fire('event')
```
<!-- {: data-highlight="view.on; view.fire"} -->

See: [ractive.on](https://ractive.js.org/api/#ractiveon), [ractive.fire](https://ractive.js.org/api/#ractivefire)

### Others

```js
view.update()
view.updateModel()

view.insert('#container')

view.observe({ 'name': function() { ... } })

view.toHTML()  //=> String
view.render()
```
<!-- {: data-highlight="view.updateModel; view.toHTML"} -->

See: [ractive.update](https://ractive.js.org/api/#ractiveupdate), [ractive.toHTML](https://ractive.js.org/api/#ractivetohtml)

## Components and templates

### Extend

```js
View = Ractive.extend({
  ...
})
new View()
```
<!-- {: data-highlight="Ractive.extend"} -->

See: [Ractive.extend](https://ractive.js.org/api/#ractiveextend)

### Components

```js
Widget = Ractive.extend({ ... })

ractive = new Ractive({
  el: 'main',
  template: '<widget foo="bar"/>',
  components: {
    widget: Widget
  }
});
```
<!-- {: data-highlight="components"} -->

See: [Components](https://ractive.js.org/api/#components)

### Partials

```js
// Global partials
Ractive.partials.x = "<..>"
```
<!-- {: data-highlight="Ractive.partials"} -->

See: [Partials](https://ractive.js.org/api/#partials)

## Events

### Lifecycle

```js
view.on('teardown', fn)
```
<!-- {: data-highlight="teardown"} -->

See: [ractive.on](https://ractive.js.org/api/#ractiveon)

### DOM Events

```html
<button on-click='activate'>Activate!</button>

view.on({
  activate: function () { ... }
});

<button on-click='sort:name'>Sort by name</button>
view.on('sort', function (e, column) {
  console.log('sorting by', column);
});
```
<!-- {: data-highlight="on-click"} -->

See: [Events](https://ractive.js.org/api/#events)

### Observing

```js
view.observe("name", function (name) {
  console.log("Changed name to", name);
}, { init: false });
```
<!-- {: data-highlight="view.observe"} -->

See: [ractive.observe](https://ractive.js.org/api/#ractiveobserve)

## Extensions

### Markup

```html
Hello, {{name}}
Body: {{{unescaped}}}

<!-- each -->
{{#mylist:i}}
  <li>{{this.name}}</li>
  <li>{{name}}</li>
  <li>{{.}}</li> <!-- same as 'this' -->
{{/mylist}}

{{^user}}Not logged in{{/user}} <!-- if false -->
{{#user}}Welcome, sire{{/user}} <!-- if true -->

{{>partialName}}
<Widget foo="bar"/>

{{#statusDogs[selected]}}
```
<!-- {: data-highlight="{{#mylist:i}}"} -->

See: [Mustaches](https://ractive.js.org/api/#mustaches)

### Computed sections

#### Template

```html
{{#each sort(list, 'name') as item: num}}
  <li>{{num}} - {{item.name}}</li>
{{/each}}
```
<!-- {: data-highlight="{{#each sort(list, 'name') as item: num}}"} -->

#### Helper

```js
data: {
  sort: function (array, column) {
    return array.slice().sort(function (a, b) {
      return a[column] > b[column] ? 1 : -1
    })
  }
}
```
<!-- {: data-highlight="sort: function"} -->

This transforms `list` via the `sort()` helper.

See: [Each sections](https://ractive.js.org/api/#each-sections)

### Transitions

```js
<div intro="fade">
<div intro="bump">
<div intro="bump:{duration:400}">

Ractive.transitions.bump = function(t, params) {
   params = t.processParams( params, {
     duration: 400,
     color: t.isIntro ? 'rgb(0,255,0)' : 'rgb(255,0,0)'
   });

  if (t.isIntro) {
    /* enter */
  } else {
    /* exit */
  }

  t.complete();
};
```
<!-- {: data-highlight="Ractive.transitions.bump"} -->

See: [Transitions](https://ractive.js.org/api/#transitions)

### [Decorators](https://ractive.js.org/api/#decorators)

```js
<span decorator="tooltip:hello there">Hover me</span>

decorators: {
  tooltip: function (node, content) {
    // setup code here
    return {
      teardown: function () {
        // cleanup code here
      }
    }
  }
}

<span decorator="tooltip:'a','b',2,'c'">Hover me</span>

tooltip: function (node, a, b, two, c) { ... }
```
<!-- {: data-highlight="tooltip: function"} -->

See: [Decorators](https://ractive.js.org/api/#decorators)

### [Adaptors](https://ractive.js.org/api/#adaptors)

```js
myAdaptor = {
  filter: function (object, keypath, ractive) {
    // return `true` if the object is of the type
    // we want to adapt
  },
  wrap: function (ractive, object, keypath, prefixer) {
    // set up event bindings here
    object.on('change', function () {
      ractive.set(prefixer({...}))
    })
    // then return a wrapper:
    return {
      teardown: function () { .. },
      // json representation
      get: function () { return { a:2, b:3, c:4, ... }; },
      // called on ractive.set
      set: function (key, val) { },
      // called on ractive.set on root (return false = die)
      reset: function (data) { return false; }
    };
  }
};
```
<!-- {: data-highlight="filter: function; wrap: function"} -->

See: [Adaptors](https://ractive.js.org/api/#adaptors)

### [Computed properties](https://ractive.js.org/api/#computed)

```js
new Ractive({
  template: '{{area}}',
  computed: {
    area: function () {
      return this.get('width') * this.get('height')
    },
    perimeter: '2 * (width + height)',
    fullname: {
      get: function () {
        return this.get('first') + ' ' + this.get('last')
      },
      set: function (name) { ... }
    }
  }
});
```
<!-- {: data-highlight="computed; perimeter"} -->

See: [Computed properties](https://ractive.js.org/api/#computed)

{% endraw %}
