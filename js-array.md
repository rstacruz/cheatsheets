---
title: JavaScript arrays
category: JavaScript
---

## JavaScript arrays

    array = [a,b,c,d,e]

    array[1]                 //=> b
    array.indexOf(b)         //=> 1

### Subsets

    array.slice(0,1)         //=> [a]
    array.slice(1)           //=> [b,c,d,e]
    array.slice(1,2)         //=> [b] 

    // Destructive
    re = array.splice(1)     // re = [b,c,d,e]     array == [a]
    re = array.splice(1,2)   // re = [b,c]         array == [a,d,e]

### Adding items

    array.push(X)            // array == [_,_,_,_,_,X]
    array.unshift(X)         // array == [X,_,_,_,_,_]
    array.splice(2, 0, X)    // array == [_,_,X,_,_,_]

    array.concat([X,Y])      //=> [_,_,_,_,_,X,Y]

### Inserting

    // after -- [_,_,REF,NEW,_,_]
    array.splice(array.indexOf(REF)+1, 0, NEW))

    // before -- [_,_,NEW,REF,_,_]
    array.splice(array.indexOf(REF), 0, NEW))

### Replace items

    array.splice(2, 1, X)    // array == [a,b,X,d,e]

### Removing items

    array.pop()              //=> e      array == [a,b,c,d]
    array.shift()            //=> a      array == [b,c,d,e]
    array.splice(2, 1)       //=> [c]    array == [a,b,d,e]

### Iterables

    .filter(n => ...) => Array

    .find(n => ...)  // es6
    .findIndex(...)  // es6

    .every(n => ...) => Boolean // ie9+
    .some(n => ..) => Boolean   // ie9+

    .map(n => ...)   // ie9+
    .reduce((total, n) => total) // ie9+
    .reduceRight(...)






