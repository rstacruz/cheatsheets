---
title: Bookshelf.js
subtitle: SQL ORM for Node.js
category: Hidden
# No release since 1.2.0 (2020); for new projects use Objection.js or Knex.
tags: [Archived]
archived: |
  Bookshelf has had no release since 1.2.0 in 2020 and no code changes since.
  For new projects use [Objection.js](https://vincit.github.io/objection.js/)
  or [Knex](https://knexjs.org/).
---

Model
-----

### Model
```js
Summary = bookshelf.Model.extend({
  tableName: 'summaries',
  hasTimestamps: true,
  hasTimestamps: ['created_at', 'updated_at'],
})
```

### Associations

```js
Summary = bookshelf.Model.extend({
  book () {
    return this.belongsTo(Book)
  },
  author () {
    return this.hasOne(Author)
  }
  // belongsToMany
  // hasMany
  // hasMany().through()
})
```

### CRUD

```js
Book.create({ title: '..' }).save()
new Book({ title: '..' }).save()

new Book({ id: 1 }).fetch()

Book.where({ id: 1 }).fetch()
Book.where('favorite_color', 'red').fetch()
Book.where('favorite_color', '<>', 'red').fetch()
Book
  .query((q) => q.orderBy('updated_at')
```
