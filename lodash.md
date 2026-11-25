---
title: Lodash
subtitle: JavaScript utility library
category: JavaScript libraries
weight: -3
description: |
  This is not a complete list.
last_verified_with: "Lodash 4.18.1."
updated: 2026-11-25
tier: t3
---

## Collections

### Finding

```js
_.filter(list, (n) => n % 2)    // → Array
_.find(list, (n) => n % 2)      // → item
_.findLast(list, ...)           // → item
```
<!-- {: data-highlight="_.filter; _.find; _.findLast"} -->

Works for both arrays and objects.

See: [filter](https://lodash.com/docs/4.18.1#filter)

### Accessing

```js
_.at([ abcd ], 0)               // → [ a ] - same as list[0]
_.at([ abcd ], [ 0, 1 ])        // → [ ab ]
```
<!-- {: data-highlight="_.at"} -->

See: [at](https://lodash.com/docs/4.18.1#at)

### Set/get

```js
_.set(object, 'users[0].name', value)
_.get(object, 'users[0].name')
_.get(object, ['users', 0, 'name'])
```
<!-- {: data-highlight="_.set; _.get"} -->

See: [get](https://lodash.com/docs/4.18.1#get)

### Iteration

```js
_.forEach(list, (item, i) => ...)
_.forEachRight(list, ...)

_.map(list, ...)
```
<!-- {: data-highlight="_.forEach; _.map"} -->

```js
_.every(users, (u) => u.active)  // → true|false (aka _.all)
_.any(users, ...)                // → true|false (aka _.some)
```
<!-- {: data-highlight="_.every; _.any"} -->

See: [forEach](https://lodash.com/docs/4.18.1#forEach)

## Array

### Arrays

```js
_.chunk([ abcd ], 2)           // → [ [ab], [cd] ]
_.compact(list)

_.fill(Array(4), 'x')          // → [ 'x', 'x', 'x', 'x' ]
_.flatten
_.flattenDeep
```
<!-- {: data-highlight="_.chunk; _.compact; _.fill; _.flatten"} -->

See: [chunk](https://lodash.com/docs/4.18.1#chunk)

### Filtering

```js
_.drop([ abcdef ], 2)          // → [   cdef ]
_.dropRight([ abcdef ], 2)     // → [ abcd   ]
_.take([ abcdef ], 2)          // → [ ab     ]
_.takeRight([ abcdef ], 2)     // → [     de ]
_.slice([ abcdef ], 2, 4)      // → [   cd   ]
```
<!-- {: data-highlight="_.drop; _.take; _.slice"} -->

```js
_.initial([ abcdef ])          // → [ abcde  ] - dropRight(list, 1)
_.rest([ abcdef ])             // → [  bcdef ] - takeRight(list, 1)
```
<!-- {: data-highlight="_.initial; _.rest"} -->

```js
_.dropWhile(list, 'active')            // works like filter
_.dropWhile(list, 'active', true)
_.dropWhile(list, { active: true })
_.dropWhile(list, (n) => ...)
_.dropRightWhile(list, ...)
```
<!-- {: data-highlight="_.dropWhile; _.dropRightWhile"} -->

```js
_.without([ abcde ], b)        // → [ acde ]
```
<!-- {: data-highlight="_.without"} -->

```js
_.remove(list, (n) => n % 2)
```
<!-- {: data-highlight="_.remove"} -->

See: [drop](https://lodash.com/docs/4.18.1#drop)

### Accessing

```js
_.first([ abcdef ])            // → a
_.last([ abcdef ])             // → f
```
<!-- {: data-highlight="_.first; _.last"} -->

See: [head](https://lodash.com/docs/4.18.1#head)

### Sets

```js
_.uniq()
_.difference([ abc ], [ bc ])       // → [ a    ]
_.intersection([ abc ], [ bcd ])    // → [  bc  ]
_.union([ abc ], [ bcd ])           // → [ abcd ] (unique)
```
<!-- {: data-highlight="_.uniq; _.difference; _.intersection; _.union"} -->

```js
Array#concat()
```
<!-- {: data-highlight="concat"} -->

See: [uniq](https://lodash.com/docs/4.18.1#uniq)

### Indexes

```js
_.findIndex(list, fn)
_.findLastIndex(list, fn)
```
<!-- {: data-highlight="_.findIndex; _.findLastIndex"} -->

```js
_.sortedIndex(list, val)
_.sortedLastIndex(list, val)
```
<!-- {: data-highlight="_.sortedIndex; _.sortedLastIndex"} -->

```js
_.indexOf(list, val)
```
<!-- {: data-highlight="_.indexOf"} -->

See: [findIndex](https://lodash.com/docs/4.18.1#findIndex)

## Functions

### Partial application

#### Define greet

```js
greet = (greeting, name) => `${greeting}, ${name}!`
```

#### Bind arguments

```js
fn = _.partial(fn, 'hi')
fn('joe')    // → 'hi, joe!'

fn = _.partial(fn, 'joe')
fn('yo')     // → 'yo, joe!'
```
<!-- {: data-highlight="_.partial"} -->

See: [partial](https://lodash.com/docs/4.18.1#partial)

### Currying

```js
_.curry(greet)('hi')         // → function(name)
_.curryRight(greet)('joe')   // → function(greet)
```
<!-- {: data-highlight="_.curry; _.curryRight"} -->

See: [curry](https://lodash.com/docs/4.18.1#curry)

## Decorating functions

### Throttling

```js
_.throttle(fn)
_.debounce(fn)
```
<!-- {: data-highlight="_.throttle; _.debounce"} -->

See: [throttle](https://lodash.com/docs/4.18.1#throttle)

### Limiting

```js
_.before(5, fn)         // only works 5 times
_.after(5, fn)          // works only after 5 times
_.once(fn)              // like _.before(fn, 1)
```
<!-- {: data-highlight="_.before; _.after; _.once"} -->

See: [before](https://lodash.com/docs/4.18.1#before)

### Etc

```js
_.wrap(_.escape, (name) => `hi ${name}`)
// same as doing `name = _.escape(name)`

_.delay(fn, 2000)

_.negate(fn)

_.memoize(fn)
_.memoize(fn, ...)
```
<!-- {: data-highlight="_.wrap; _.delay; _.negate; _.memoize"} -->

See: [wrap](https://lodash.com/docs/4.18.1#wrap)

## Strings

### Capitalization

```js
_.capitalize('hello world')   // → 'Hello world'
_.startCase('hello_world')    // → 'Hello World'
_.snakeCase('hello world')    // → 'hello_world'
_.kebabCase('hello world')    // → 'hello-world'
_.camelCase('hello world')    // → 'helloWorld'
```
<!-- {: data-highlight="_.capitalize; _.startCase; _.snakeCase; _.kebabCase"} -->

See: [capitalize](https://lodash.com/docs/4.18.1#capitalize)

### Padding

```js
_.pad('abc', 3)           // → 'abc'
_.pad('abc', 8)           // → '   abc  '
_.pad('abc', 8, '_-')     // → '_-abc_-_'
_.padStart('abc', 3)      // → 'abc'
_.padStart('abc', 6)      // → '   abc'
_.padStart('abc', 6, '_-')// → '_-_abc'
_.padEnd('abc', 3)        // → 'abc'
_.padEnd('abc', 6)        // → 'abc   '
_.padEnd('abc', 6, '_-')  // → 'abc_-_'
```
<!-- {: data-highlight="_.pad; _.padStart; _.padEnd"} -->

See: [pad](https://lodash.com/docs/4.18.1#pad)

### Trim

```js
_.trim('  str  ')         // → 'str'
_.trimLeft('  str  ')     // → 'str  '
_.trimRight('  str  ')    // → '  str'
```
<!-- {: data-highlight="_.trim; _.trimLeft; _.trimRight"} -->

See: [trim](https://lodash.com/docs/4.18.1#trim)

### Etc

```js
_.repeat('-', 2)              // → '--'
_.deburr('déjà vu')           // → 'deja vu'
_.trunc('hello world', 5)     // → 'hello...'
```
<!-- {: data-highlight="_.repeat; _.deburr; _.trunc"} -->

```js
_.startsWith('abc', 'a')   // → true
_.endsWith('abc', 'c')     // → true
```
<!-- {: data-highlight="_.startsWith; _.endsWith"} -->

See: [repeat](https://lodash.com/docs/4.18.1#repeat)

## Objects

### Keys and values

```js
_.keys(obj)
_.values(obj)
```
<!-- {: data-highlight="_.keys; _.values"} -->

See: [keys](https://lodash.com/docs/4.18.1#keys)

### Merging

```js
_.assign(obj, source)
_.merge(obj, source)
_.cloneDeep(obj)
```
<!-- {: data-highlight="_.assign; _.merge; _.cloneDeep"} -->

See: [assign](https://lodash.com/docs/4.18.1#assign)

## Chaining

### Chain and value

```js
_([1, 2, 3])
  .reduce((total, n) => total + n)
  .map((n) => n * n)
  .tap(console.log)
  .thru((n) => n.reverse())
  .value()
```
<!-- {: data-highlight=".value"} -->

See: [chain](https://lodash.com/docs/4.18.1#chain)

### Implicit chaining

```js
_(list).map(fn).filter(fn).value()
_.chain(list).map(fn).value()
```
<!-- {: data-highlight="_(list); _.chain"} -->

See: [chain](https://lodash.com/docs/4.18.1#chain)
