---
title: JavaScript Arrays
category: JavaScript
layout: 2017/sheet
---

### Arrays

```bash
list = [a,b,c,d,e]
```
{: .-setup}

```bash
list[1]                 // → b
list.indexOf(b)         // → 1
```

### Subsets

#### Immutable

```bash
list.slice(0,1)         // → [a        ]
list.slice(1)           // → [  b,c,d,e]
list.slice(1,2)         // → [  b      ]
```

#### Mutative

```bash
re = list.splice(1)     // re = [b,c,d,e]  list == [a]
re = list.splice(1,2)   // re = [b,c]      list == [a,d,e]
```

### Adding items

#### Immutable

```bash
list.concat([X,Y])      // → [_,_,_,_,_,X,Y]
```

#### Mutative

```bash
list.push(X)            // list == [_,_,_,_,_,X]
list.unshift(X)         // list == [X,_,_,_,_,_]
list.splice(2, 0, X)    // list == [_,_,X,_,_,_]
```

### Inserting

```bash
// after -- [_,_,REF,NEW,_,_]
list.splice(list.indexOf(REF)+1, 0, NEW))
```

```bash
// before -- [_,_,NEW,REF,_,_]
list.splice(list.indexOf(REF), 0, NEW))
```

### Replace items

```bash
list.splice(2, 1, X)    // list == [a,b,X,d,e]
```

### Removing items

```bash
list.pop()              // → e    list == [a,b,c,d]
list.shift()            // → a    list == [b,c,d,e]
list.splice(2, 1)       // → [c]  list == [a,b,d,e]
```

### Iterables

```bash
.filter(n => ...) => array
```

```bash
.find(n => ...)  // es6
.findIndex(...)  // es6
```

```bash
.every(n => ...) => Boolean // ie9+
.some(n => ..) => Boolean   // ie9+
```

```bash
.map(n => ...)   // ie9+
.reduce((total, n) => total) // ie9+
.reduceRight(...)
```
