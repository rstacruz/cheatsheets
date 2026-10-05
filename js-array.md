---
title: JavaScript Arrays
category: JavaScript
updated: 2026-10-04
intro: |
  Common operations on JavaScript arrays: indexing, slicing, adding and removing
  items, and iterating.
---

### Introduction
{: .-intro}

- [MDN Array reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) _(developer.mozilla.org)_

### Accessing

```js
list[1]                 // → b
list.indexOf(b)         // → 1
list.lastIndexOf(b)     // → 1
list.includes(b)        // → true
```

See: [indexOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf), [includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) _(developer.mozilla.org)_

### Subsets

#### Immutable

```js
list.slice(0,1)         // → [a        ]
list.slice(1)           // → [  b,c,d,e]
list.slice(1,2)         // → [  b      ]
```

#### Mutative

```js
re = list.splice(1)     // re = [b,c,d,e]  list == [a]
re = list.splice(1,2)   // re = [b,c]      list == [a,d,e]
```

See: [slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice), [splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) _(developer.mozilla.org)_

### Adding items

#### Immutable

```js
list.concat([X,Y])      // → [_,_,_,_,_,X,Y]
```

#### Mutative

```js
list.push(X)            // list == [_,_,_,_,_,X]
list.unshift(X)         // list == [X,_,_,_,_,_]
list.splice(2, 0, X)    // list == [_,_,X,_,_,_]
```

See: [concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat), [push()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push), [unshift()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) _(developer.mozilla.org)_

### Inserting

```js
// after -- [_,_,REF,NEW,_,_]
list.splice(list.indexOf(REF) + 1, 0, NEW)
```

```js
// before -- [_,_,NEW,REF,_,_]
list.splice(list.indexOf(REF), 0, NEW)
```

See: [splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) _(developer.mozilla.org)_

### Replace items

```js
list.splice(2, 1, X)    // list == [a,b,X,d,e]
```

See: [splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) _(developer.mozilla.org)_

### Removing items

```js
list.pop()              // → e    list == [a,b,c,d]
list.shift()            // → a    list == [b,c,d,e]
list.splice(2, 1)       // → [c]  list == [a,b,d,e]
```

See: [pop()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop), [shift()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift), [splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) _(developer.mozilla.org)_

### Iterating

```js
list.forEach(n => ...)           // run fn for each item
list.filter(n => ...)            // → matching items
list.map(n => ...)               // → mapped items
list.find(n => ...)              // → first match (ES6)
list.findIndex(n => ...)         // → index of first match (ES6)
list.every(n => ...)             // → Boolean (ES5)
list.some(n => ...)              // → Boolean (ES5)
list.reduce((total, n) => ...)   // → single value
```

See: [forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach), [map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) _(developer.mozilla.org)_
