---
title: Modella
category: JavaScript libraries
layout: 2017/sheet
prism_languages: [coffeescript]
intro: |
  [Modella](https://www.npmjs.com/package/modella) allows you to create simple models in JavaScript. This is a guide on basic usage of Modella in CoffeeScript.
---

### Defining models

```coffeescript
User = Modella('User')
```

```coffeescript
  .attr('name')
  .attr('email', { required: true })
  .use(require('modella-validators'))
```

```coffeescript
  .validator (u) ->
    u.error('username', 'is required')  unless u.has('username')
```

### Instances

```coffeescript
user
  .name()
  .name('John')
  .set(name: 'John')
```

```coffeescript
  .has('name')   # → true
  .isNew()
  .isValid()
```

```coffeescript
  .save (err) ->
  .remove (err) ->
  .removed
  .model         # === User
```

## Events

### Emitting

```coffeescript
Model.emit('event', [data...])
```

```coffeescript
record.emit('event', [data...])
```

### List of events

```coffeescript
user
  .on 'save', ->
  .on 'create', ->
  .on 'saving', (data, done) -> done()
```

```coffeescript
  .on 'remove', ->
  .on 'removing', (data, done) -> done()
```

```coffeescript
  .on 'valid', ->
  .on 'invalid', ->
```

```coffeescript
  .on 'change', ->
  .on 'change email', ->
```

```coffeescript
  .on 'initializing', (instance, attrs) ->
  .on 'initialize', ->
```

```coffeescript
  .on 'error', -> failed to save model
```

```coffeescript
  .on 'setting', (instance, attrs) ->  # on Model#set()
  .on 'attr', -> # new attr via Model.attr()
```

## Misc

### Plugins

```coffeescript
MyPlugin = ->
  return (Model) ->

    Model.method = ...
    Model.prototype.method = ...
    Model.attr(...)

    Model
```

A plugin is a function that returns a model decorator (ie, a function that takes in a model and returns a model).

### Memory

```coffeescript
User
  .all (err, users) ->
  .find id, (err, user) ->
```

```coffeescript
  .remove ->
  .save ->
  .update ->
```
