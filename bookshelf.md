---
title: Bookshelf.js
category: JavaScript libraries
---

Model
-----

    # or Bookshelf.Mode.extend({..})
    class Book extends Bookshelf.Model
      tableName: 'books'

### Associations

    class Book extends Bookshelf.Model
      # Associations
      author:  -> @belongsTo(Author)
      summary: -> @hasOne(Summary)
      pages:   -> @hasMany(Pages)
      shelves: -> @belongsToMany(Shelves)

      @hasMany(Comment)
        .through(Chapter)

      @belongsToMany(Comment)
        .withPivot(['created_at'])

### Collections

    class Books extends Bookshelf.Collection
      model: Book

    books = new Books()
    books.query(where: { id: 2 })
    .fetch()
    .then ->

### Fetching associations

    new Book(id: 1).summary().fetch()
    .then (summary) ->
    
Manipulation
------------

### Reading (Fetch by ID)

    new Story(id: 2).fetch()
    .then (story) ->
      story.id       #=> 2
      story.title    #=> "Through the Looking Glass"

      story.summary = "Hello"
      story.save()

    .then -> ...

### References

 * http://bookshelfjs.org/
