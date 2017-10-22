---
title: Ractive.js
category: JavaScript libraries
vim: ft=javascript
---

{% raw %}
### [Initialization](http://docs.ractivejs.org/latest/options)

    new Ractive({
      el: $('..'),
      el: '#box',
      template: '...', // required

      // callbacks
      init: function() {},    // on instantiate
      complete: function() {}, // on finish animations

      // objs
      data: { ... },
      partials: { ... },    // global: Ractive.partials
      transitions: { ... }, // global: Ractive.transitions
      components: { ... },
      adaptors: [ ... ],

      // options
      magic: false
      modifyArrays: true
      twoway: true
      noIntro: true // true = disable transition on initial render
      lazy: false   // false = use keyevents, true = use change/blur
      append: false // false = overwrite element, true = append
      debug: false
      sanitize: false
    })

## Instance methods

### Updating values

    view.add('count', 1)       //=> promise
    view.subtract('count', 1)  //=> promise
    view.toggle('shown')       //=> promise

    view.set('a', true)
    view.set({ a: true })
    view.reset({ a: true })
    view.merge('list', [a,b,c])

    view.get('a')
    view.data.a

### Nodes and components

    view.find('.klass')
    view.findAll('.klass')
    view.nodes
    view.nodes['hello']   // .find('#hello')

    view.findComponent('photo')
    view.findAllComponents('photo')

### Events

    view.on('event', function() { ... })
    view.off('event', fn)
    view.fire('event')

### Others

    view.update()
    view.updateModel()

    view.insert('.node .path')

    view.observe({ 'name': function() { ... } })

    view.toHTML()  //=> String
    view.render()

## Extend

    View = Ractive.extend({
      ...
    })
    new View()

## [Components](https://github.com/RactiveJS/Ractive/wiki/Components)

See: https://github.com/RactiveJS/Ractive/issues/74
{:.center}

    Widget = Ractive.extend({ ... })

    ractive = new Ractive({
      el: 'main',
      template: '<widget foo="bar"/>',
      components: {
        widget: Widget
      }
    });

## Partials

    // Global partials
    Ractive.partials.x = "<..>"

## Events

    view.on('teardown')

### DOM Events

    <button on-click='activate'>Activate!</button>

    view.on({
      activate: function () { ... }
    });

    <button on-click='sort:name'>Sort by name</button>
    view.on('sort', function (e, column) {
      console.log('sorting by #{column}');
    });

### Observing

     view.observe("name", function (name) {
       console.log("Changed name to", name);
     }, { init: false });

## Markup

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
    <component>

    {{#statusDogs[selected]}}

## Transformed attributes

This transforms the `list` attribute via a helper function called `sort()`.

    {{# sort(list, "name") :num }}
      <li>{{num}} - {{name}}</li>
    {{/ end. any text goes here }}

    data: {
      sort: function(array, column) { return array.whatever(); }
    }

## Transitions

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

## [Decorators](http://docs.ractivejs.org/latest/decorators)

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

## [Adaptors](http://docs.ractivejs.org/latest/adaptors)

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

## [Computed properties](http://docs.ractivejs.org/latest/computed-properties)

    new Ractive({
      template: '{{area}}',
      computed: {
        area: function () { return this.get('width') * this.get('height'); }
        area: '${width} * ${height}'
        fullname: {
          get: '${first} + " " + ${last}"
          set: function (name) { ... }
        }
      }
    });

{% endraw %}
