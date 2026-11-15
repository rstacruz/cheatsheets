---
title: Ractive.js
category: JavaScript libraries
updated: 2026-11-14
intro: |
  Ractive is a template-driven UI library for JavaScript.
links:
  - title: Ractive.js
    url: https://ractive.js.org/
  - title: GitHub repository
    url: https://github.com/ractivejs/ractive
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

### Nodes and components

```js
view.find('.klass')
view.findAll('.klass')

view.findComponent('photo')
view.findAllComponents('photo')
```

### Events

```js
view.on('event', function() { ... })
view.off('event', fn)
view.fire('event')
```

### Others

```js
view.update()
view.updateModel()

view.insert('#container')

view.observe({ 'name': function() { ... } })

view.toHTML()  //=> String
view.render()
```

## Components and templates

### Extend

```js
View = Ractive.extend({
  ...
})
new View()
```

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

See: [Components](https://ractive.js.org/api/#components)

### Partials

```js
// Global partials
Ractive.partials.x = "<..>"
```

## Events

### Lifecycle

```js
view.on('teardown', fn)
```

See: [Events](https://ractive.js.org/api/#ractiveon)

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

### Observing

```js
view.observe("name", function (name) {
  console.log("Changed name to", name);
}, { init: false });
```

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

### Computed sections

This transforms the `list` data via a helper function called `sort()`.

```html
{{#each sort(list, 'name') as item: num}}
  <li>{{num}} - {{item.name}}</li>
{{/each}}
```

```js
data: {
  sort: function (array, column) {
    return array.slice().sort(function (a, b) {
      return a[column] > b[column] ? 1 : -1
    })
  }
}
```

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

### [Adaptors](https://ractive.js.org/api/#adaptors)

```js
myAdaptor = {
  filter: function (object, keypath, ractive) {
    // return `true` if a particular object is of the type we want to adapt
  },
  wrap: function (ractive, object, keypath, prefixer) {
    // set up event bindings here
    object.on('change', function () { ractive.set(prefixer({...})); });
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

{% endraw %}
