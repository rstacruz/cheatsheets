---
title: Backbone.js
subtitle: Frontend MVC library
logo: { src: /assets/logos/backbone.svg, mono: true }
last_verified_with: "Backbone.js 1.6."
created_at: 2013-03-26
updated: 2018-12-06
tier: t3
category: JavaScript libraries
---

### Binding events

#### Single event

```js
.on('event', callback)
.on('event', callback, context)
```

#### Multiple events

```js
.on({
  'event1': callback,
  'event2': callback
})
```

#### All events

```js
.on('all', callback)
```

#### Once

```js
.once('event', callback)   // Only happens once
```

See: [Events-on](https://backbonejs.org/#Events-on)

### Unbinding events

```js
object.off('change', onChange)    // just the `onChange` callback
object.off('change')              // all 'change' callbacks
object.off(null, onChange)        // onChange for all events
object.off(null, null, context)   // all callbacks for context
object.off()                      // all
```

See: [Events-off](https://backbonejs.org/#Events-off)

### Events

#### Trigger

```js
object.trigger('event')
```

#### Listening

```js
view.listenTo(object, event, callback)
view.stopListening()
```

See: [Events-trigger](https://backbonejs.org/#Events-trigger)

### List of events

  * Collection:
    * `add` (model, collection, options)
    * `remove` (model, collection, options)
    * `reset` (collection, options)
    * `sort` (collection, options)
  * Model:
    * `change` (model, options)
    * `change:[attr]` (model, value, options)
    * `destroy` (model, collection, options)
    * `error` (model, xhr, options)
  * Model and collection:
    * `request` (model, xhr, options)
    * `sync` (model, resp, options)
  * Router:
    * `route:[name]` (params)
    * `route` (router, route, params)

See: [Catalog of events](https://backbonejs.org/#Events-catalog)

## Views

### Defining

```js
// All attributes are optional
var View = Backbone.View.extend({
  model: doc,
  tagName: 'div',
  className: 'document-item',
  id: "document-" + doc.id,
  attributes: { href: '#' },
  el: 'body',
  events: {
    'click button.save': 'save',
    'click .cancel': function() { ··· },
    'click': 'onclick'
  },
  constructor: function() { ··· },
  render: function() { ··· }
})
```

See: [View-extend](https://backbonejs.org/#View-extend)

### Instantiating

```js
view = new View()
view = new View({ el: ··· })
```

See: [View-constructor](https://backbonejs.org/#View-constructor)

### Methods

```js
view.$el.show()
view.$('input')

view.remove()

view.delegateEvents()
view.undelegateEvents()
```

See: [View](https://backbonejs.org/#View)

## Models

### Defining

```js
// All attributes are optional
var Model = Backbone.Model.extend({
  defaults: {
    'author': 'unknown'
  },
  idAttribute: '_id',
  parse: function() { ··· }
})
```

See: [Model-extend](https://backbonejs.org/#Model-extend)

### Instantiating

```js
var obj = new Model({ title: 'Lolita', author: 'Nabokov' })
var obj = new Model({ collection: ··· })
```

See: [Model-constructor](https://backbonejs.org/#Model-constructor)

### Methods

```js
obj.id
obj.cid   // → 'c38' (client-side ID)

obj.clone()

obj.hasChanged('title')
obj.changedAttributes()  // false, or hash
obj.previousAttributes() // false, or hash
obj.previous('title')

obj.isNew()
```

See: [Model](https://backbonejs.org/#Model)

### Setting and getting

```js
obj.set({ title: 'A Study in Pink' })
obj.set({ title: 'A Study in Pink' },
  { validate: true, silent: true })
obj.unset('title')

obj.get('title')
obj.has('title')
obj.escape('title')     /* Like .get() but HTML-escaped */

obj.clear()
obj.clear({ silent: true })
```

See: [Model-set](https://backbonejs.org/#Model-set)

### Saving and fetching

```js
obj.save()
obj.save({ attributes })
obj.save(null, {
  silent: true, patch: true, wait: true,
  success: callback, error: callback
})

obj.destroy()
obj.destroy({
  wait: true,
  success: callback, error: callback
})

obj.toJSON()

obj.fetch()
obj.fetch({ success: callback, error: callback })
```

See: [Model-save](https://backbonejs.org/#Model-save)

### Validation

#### Define

```js
var Model = Backbone.Model.extend({
  validate: function(attrs, options) {
    if (attrs.end < attrs.start) {
      return "Can't end before it starts"
    }
  }
})
```

<!-- {: data-highlight="validate"} -->

#### Inspect

```js
obj.validationError  //=> "Can't end before it starts"
obj.isValid()
obj.on('invalid', function (model, error) { ··· })
```

#### Triggered on

```js
// Triggered on:
obj.save()
obj.set({ ··· }, { validate: true })
```

See: [Model-validate](https://backbonejs.org/#Model-validate)

### Custom URLs

```js
var Model = Backbone.Model.extend({
  // Single URL (string or function)
  url: '/account',
  url: function() { return '/account' },

  // Both of these two work the same way
  url: function() { return '/books/' + this.id }),
  urlRoot: '/books'
})
```

#### Instantiate

```js
var obj = new Model({ url: ··· })
var obj = new Model({ urlRoot: ··· })
```

See: [Model-url](https://backbonejs.org/#Model-url)

## References

<!-- {: .-one-column} -->

- [Backbone website](http://backbonejs.org/) _(backbonejs.org)_
- [Backbone patterns](http://ricostacruz.com/backbone-patterns/) _(ricostacruz.com)_
