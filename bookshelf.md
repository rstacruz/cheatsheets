---
title: Bookshelf.js
category: JavaScript libraries
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
