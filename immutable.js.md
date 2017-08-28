---
title: Immutable.js
category: JavaScript libraries
layout: default-ad
---

```js
var Immutable = require('immutable')
```

## Maps

```js
var map = Immutable.Map({ a: 1, b: 2, c: 3 })

map
  .set('b', 50)
  .get('b') // 50
```

## Lists

```js
var list = Immutable.List.of(1, 2)

list
  .push(3, 4, 5)
  .unshift(0)
  .concat(list2, list3)
  .get(0)
  .size
```

## Nested maps

```js
var nested = Immutable.fromJS({ user: { profile: { name: 'John' } } })

nested
  .mergeDeep({ user: { profile: { age: 90 } } })
  .setIn([ 'user', 'profile', 'name' ], 'Jack')
  .updateIn([ 'user', 'profile', 'name' ], (s) => s.toUpperCase())
  .getIn(['user', 'profile', 'name']) // 'JACK'
```

