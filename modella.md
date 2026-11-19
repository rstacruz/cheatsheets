---
title: Modella
subtitle: JavaScript model library
category: Hidden
# Last release 0.2.14 (2014); unmaintained.
tags: [Archived]
archived: |
  Modella's last release was 0.2.14 in 2014 and it is unmaintained. Use a
  maintained model layer instead.
prism_languages: [coffeescript]
intro: |
  [Modella](https://www.npmjs.com/package/modella) allows you to create simple models in JavaScript. This is a guide on basic usage of Modella in CoffeeScript.
links:
  - title: Modella repository
    url: https://github.com/modella/modella
---

### Defining models

#### Model

```coffeescript
User = Modella('User')
```

#### Attributes

```coffeescript
  .attr('name')
  .attr('email', { required: true })
  .use(require('modella-validators'))
```

#### Validators

```coffeescript
  .validator (u) ->
    u.error('username', 'is required')  unless u.has('username')
```

### Instances

#### Accessors

```coffeescript
user
  .name()
  .name('John')
  .set(name: 'John')
```

#### Checks

```coffeescript
  .has('name')   # → true
  .isNew()
  .isValid()
```

#### Persistence

```coffeescript
  .save (err) ->
  .remove (err) ->
  .removed
  .model         # === User
```

## Events

### Emitting

#### Model

```coffeescript
Model.emit('event', [data...])
```

#### Record

```coffeescript
record.emit('event', [data...])
```

### List of events

```coffeescript
user
  .on 'save', ->
  .on 'create', ->
  .on 'saving', (data, done) -> done()

  .on 'remove', ->
  .on 'removing', (data, done) -> done()

  .on 'valid', ->
  .on 'invalid', ->

  .on 'change', ->
  .on 'change email', ->

  .on 'initializing', (instance, attrs) ->
  .on 'initialize', ->

  .on 'error', -> failed to save model

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
