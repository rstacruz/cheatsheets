---
title: Immutable.js
subtitle: Persistent data structure library
category: JavaScript libraries
updated: 2026-11-24
last_verified_with: "Immutable 5.2.1, verified on Node 26.13.1."
tier: t3
intro: |
  Persistent Map, List, and nested collection operations for immutable JavaScript data.
links:
  - title: Immutable.js documentation
    url: https://immutable-js.com/docs/v5/
  - title: Immutable.js repository
    url: https://github.com/immutable-js/immutable-js
---

## Collections
<!-- {: .-three-column} -->

### Maps

#### Create

```js
import { Map } from 'immutable'

const map = Map({ a: 1, b: 2, c: 3 })
```

#### Update

```js
const next = map.set('b', 50)

map.get('b')   // 2
next.get('b')  // 50
```

`set` returns a new map; the original keeps its values.

See: [Map](https://immutable-js.com/docs/v5/Map/)

### Lists

#### Create

```js
import { List } from 'immutable'

const list = List.of(1, 2)
```

#### Update

```js
const next = list
  .push(3, 4, 5)
  .unshift(0)

list.size  // 2
next.size  // 6
```

`push`, `unshift` and `concat` return a new list and leave the original alone.

See: [List](https://immutable-js.com/docs/v5/List/)

### Comparing

```js
import { Map, is } from 'immutable'

const a = Map({ x: 1 })
const b = Map({ x: 1 })

a.equals(b)  // true
a === b      // false
is(a, b)     // true
```

Compare collections with `equals` or `is`; `===` only checks identity.

See: [is()](https://immutable-js.com/docs/v5/is()/)

## Nested data

### From JS

```js
import { fromJS } from 'immutable'

const state = fromJS({ user: { tags: ['a'] } })
// Map { "user": Map { "tags": List [ "a" ] } }
```

`fromJS` converts objects to Maps and arrays to Lists, all the way down.

See: [fromJS()](https://immutable-js.com/docs/v5/fromJS()/)

### To JS

```js
import { Map, List } from 'immutable'

const state = Map({ a: 1, tags: List(['x', 'y']) })

state.toJS()           // { a: 1, tags: [ 'x', 'y' ] }
JSON.stringify(state)  // '{"a":1,"tags":["x","y"]}'
```

`toJS` deep-copies to plain objects and arrays; `toObject` and `toArray` stay shallow.

See: [toJS()](https://immutable-js.com/docs/v5/Collection/#toJS())

### Deep updates

```js
import { fromJS } from 'immutable'

const state = fromJS({ user: { profile: { name: 'john' } } })
const next = state
  .mergeDeep({ user: { profile: { age: 90 } } })
  .setIn(['user', 'profile', 'name'], 'Jack')
  .updateIn(['user', 'profile', 'age'], (age) => age + 1)

next.getIn(['user', 'profile', 'name'])  // 'Jack'
next.getIn(['user', 'profile', 'age'])   // 91
```

`mergeDeep` works on `Map` and `OrderedMap`; `getIn`, `setIn` and `updateIn` also work on `List`.

See: [mergeDeep()](https://immutable-js.com/docs/v5/mergeDeep()/)

## References

- <https://immutable-js.com/docs/>
- <https://github.com/immutable-js/immutable-js>
