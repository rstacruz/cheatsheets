---
title: Backbone.js
layout: 2017/sheet
updated: 2018-12-06
category: JavaScript libraries
---

### Binding events

```js
.on('event', callback)
.on('event', callback, context)
```

```js
.on({
  'event1': callback,
  'event2': callback
})
```

```js
.on('all', callback)
```

```js
.once('event', callback)   // Only happens once
```

### Unbinding events

```js
object.off('change', onChange)    // just the `onChange` callback
object.off('change')              // all 'change' callbacks
object.off(null, onChange)        // `onChange` callback for all events
object.off(null, null, context)   // all callbacks for `context` all events
object.off()                      // all
```

### Events

```js
object.trigger('event')
```

```js
view.listenTo(object, event, callback)
view.stopListening()
```

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

## Views

### Defining

```js
// All attributes are optional
var View = Backbone.View.extend({
  model: doc,
```

```js
  tagName: 'div',
  className: 'document-item',
  id: "document-" + doc.id,
  attributes: { href: '#' },
```

```js
  el: 'body',
```

```js
  events: {
    'click button.save': 'save',
    'click .cancel': function() { ··· },
    'click': 'onclick'
  },
```

```js
  constructor: function() { ··· },
  render: function() { ··· }
})
```
### Instantiating

```js
view = new View()
view = new View({ el: ··· })
```

### Methods

```js
view.$el.show()
view.$('input')
```

```js
view.remove()
```

```js
view.delegateEvents()
view.undelegateEvents()
```

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

### Instantiating

```js
var obj = new Model({ title: 'Lolita', author: 'Nabokov' })
```

```js
var obj = new Model({ collection: ··· })
```

### Methods

```js
obj.id
obj.cid   // → 'c38' (client-side ID)
```

```js
obj.clone()
```

```js
obj.hasChanged('title')
obj.changedAttributes()  // false, or hash
obj.previousAttributes() // false, or hash
obj.previous('title')
```

```js
obj.isNew()
```

```js
obj.set({ title: 'A Study in Pink' })
obj.set({ title: 'A Study in Pink' }, { validate: true, silent: true })
obj.unset('title')
```

```js
obj.get('title')
obj.has('title')
obj.escape('title')     /* Like .get() but HTML-escaped */
```

```js
obj.clear()
obj.clear({ silent: true })
```

```js
obj.save()
obj.save({ attributes })
obj.save(null, {
  silent: true, patch: true, wait: true,
  success: callback, error: callback
})
```

```js
obj.destroy()
obj.destroy({
  wait: true,
  success: callback, error: callback
})
```

```js
obj.toJSON()
```

```js
obj.fetch()
obj.fetch({ success: callback, error: callback })
```

### Validation

```js
var Model = Backbone.Model.extend({
  validate: function(attrs, options) {
    if (attrs.end < attrs.start) {
      return "Can't end before it starts"
    }
  }
})
```
{: data-line="2"}

```js
obj.validationError  //=> "Can't end before it starts"
obj.isValid()
obj.on('invalid', function (model, error) { ··· })
```

```js
// Triggered on:
obj.save()
obj.set({ ··· }, { validate: true })
```

### Custom URLs

```js
var Model = Backbone.Model.extend({
  // Single URL (string or function)
  url: '/account',
  url: function() { return '/account' },
```

```js
  // Both of these two work the same way
  url: function() { return '/books/' + this.id }),
  urlRoot: '/books'
})
```

```js
var obj = new Model({ url: ··· })
var obj = new Model({ urlRoot: ··· })
```

## References
{: .-one-column}

- [Backbone website](http://backbonejs.org/) _(backbonejs.org)_
- [Backbone patterns](http://ricostacruz.com/backbone-patterns/) _(ricostacruz.com)_
