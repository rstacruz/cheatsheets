---
title: JavaScript Arrays
category: JavaScript
layout: 2017/sheet
---

### Arrays

```js
list = [a,b,c,d,e]
```
{: .-setup}

```js
list[1]                 // → b
list.indexOf(b)         // → 1
```

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

### Using Spread syntax

#### Copy an array

```js
let arr1 = ['foo','bar']
let arr2 = [...arr1]      // arr2 == ['foo','bar']
arr2.push('baz')
// Result: arr1 == ['foo','bar'], arr2 == ['foo','bar','baz']
arr1.push('qux')
// Result: arr1 == ['foo','bar','qux'], arr2 == ['foo','bar','baz']

```

#### Adding items to an array

```js
// Adding items to the end of an array
list = [...list, [X,Y]] // → [_,_,_,_,_,X,Y]
```

```js
// Adding items to the end of an array
list = [[X,Y], ...list] // → [X,Y,_,_,_,_,_]
```

#### Concatenating / merging multiple arrays

```js
// merging multiple arrays
let arr1 = ['X','Y','Z']
let arr2 = ['foo','bar','baz']
let arr3 = ['all','your','base']

let merged = [...arr2, ...arr1, ...arr3] // → result == ["foo","bar","baz","X","Y","Z","all","your","base"]
```
Note: Spread syntax is available after ES6

### Inserting

```js
// after -- [_,_,REF,NEW,_,_]
list.splice(list.indexOf(REF)+1, 0, NEW)
```

```js
// before -- [_,_,NEW,REF,_,_]
list.splice(list.indexOf(REF), 0, NEW)
```

### Replace items

```js
list.splice(2, 1, X)    // list == [a,b,X,d,e]
```

### Removing items

```js
list.pop()              // → e    list == [a,b,c,d]
list.shift()            // → a    list == [b,c,d,e]
list.splice(2, 1)       // → [c]  list == [a,b,d,e]
```

### Iterables

```js
.filter(n => ...) => array
```

```js
.find(n => ...)  // es6
.findIndex(...)  // es6
```

```js
.every(n => ...) => Boolean // ie9+
.some(n => ..) => Boolean   // ie9+
```

```js
.map(n => ...)   // ie9+
.reduce((total, n) => total) // ie9+
.reduceRight(...)
```
