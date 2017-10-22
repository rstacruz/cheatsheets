---
title: Spine
category: JavaScript libraries
vim: ft=python
---

## Models

    class User extends Spine.Model
      @configure "User", "name", "address"

      fullName: ->
        [@first, @last].join ' '

### JavaScript

    // Subclassing
    User = Spine.Model.sub()

### Class methods

    .configure 'modelname', attributes...

    # Inheritance
    .include(Module)
    .extend(Module)

    .create(name: "John")

    .count()

    # Events
    .on 'refresh change', (user) -> ...
    .trigger 'event'

    .change (user) -> ...  # same as on('change')
    .fetch (user) -> ...   # same as on('fetch')

    # JSON
    .toJSON()         # all records
    .fromJSON(json)   # from json string
    .fromForm(el)

    # Data
    .records     # Hash of instances
    .attributes  # array of attributes (from .configure)

    # Convenience
    .toString()  #=> "User"

    # Find by ID
    .exists(1)
    .find(1)     # throws error

    # Find by something
    .select (u) u.name == 'bob'
    .findByAttribute 'name', 'bob'
    .findAllByAttribute 'name', 'bob'

    .all()
    .slice(6, 13)  # cloned copies of instances

    # Iterating
    .each (user) ->

    # Ends
    .first()
    .last()

    # Deleting
    .deleteAll()
    .destroyAll()
    .destroyAll({ ..options.. })
    .destroy(2)

### Instance methods

    user = new User();

    user
    .isNew()
    .exists()

    # Validation
    .isValid()
    .validate()    # validate = (-> "Name required" unless @name)

    .attributes()  # hash of attr values
    .eql(other)    # equality check

    # Update
    .load(attrs)
    .reload()
    .fromForm(form)
    .updateAttribute("name", "john")
    .updateAttributes(name: "John")

    # Event
    .on 'event', -> ...
    .trigger 'event'

    # Retrieve
    .toJSON()

    # Persistence
    .save()

    .destroy()
    .dup()         # clone as unsaved

### Mixins

    class User extends Spine.Model
      @include MyModule
      @extend MyModule

### Events

    .on 'create'
    .on 'update'
    .on 'destroy'

    .on 'save'    # create / update
    .on 'change'  # create / update / destroy

    .on 'refresh'
    .on 'error'    # validation error

## Ajax

    class User extends Spine.Model
      @extend Spine.Model.Ajax

      @url: '/users'
      @url: -> '/users'
      scope: '2013'

### Using

    User.fetch()
    user = new User()

    user.url()            #=> "/users"
    user.url('bands')     #=> "/users/bands"

    user.scope = 'admin'
    user.url()            #=> "/admin/users"

### Host

    Spine.Model.host = 'http://endpoint'

### Ajax mapping

    read    → GET    /collection
    create  → POST   /collection (201 created)
    update  → PUT    /collection/id
    destroy → DELETE /collection/id

### Associations

    class Photo extends Spine.Model
      @belongsTo 'album', 'Album'          # window['Album']
      @belongsTo 'album', 'models/album'   # via require.js

    class Album
      @hasMany 'photos', 'models/photo'

    album.photos().all()
    album.photos().create(name: "Vacation")
    album.photos().find(id)

    photo = Photo.create(album: album)
    photo.album()
    photo.album_id


### See

 * http://spinejs.com/api/index
 * http://spinejs.com/api/models
 * http://spinejs.com/docs/ajax
* http://spinejs.com/docs/relations
