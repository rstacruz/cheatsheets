---
title: Modella
category: JavaScript libraries
---

### Basic

    
    User = Modella('User')

      .attr('name')
      .attr('email', { required: true })
      .use(require('modella-validators')

      .validator (u) ->
        u.error('username', 'is required')  unless u.has('username')


    user
      .name()
      .name('John')
      .set(name: 'John')

      .has('name')   //=> true
      .isNew()
      .isValid()

      .save (err) ->
      .remove (err) ->
      .removed
      .model         // === User

### Events

    Model.emit('event', [data...])
    record.emit('event', [data...])

### List of events

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

### Plugins

    MyPlugin = ->
      return (Model) ->

        Model.method = ...
        Model.prototype.method = ...
        Model.attr(...)

        Model

### Memory

    User
      .all (err, users) ->
      .find id, (err, user) ->

      .remove ->
      .save ->
      .update ->

