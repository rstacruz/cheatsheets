---
title: JavaScript arrays
layout: default
---

## JavaScript arrays

    array = [a,b,c,d,e]

    array[1]                 //=> b
    array.indexOf(b)         //=> 1

### Subsets

    array.slice(1)           //=> [b,c,d,e]
    array.slice(1,2)         //=> [b] 

    // Destructive
    re = array.splice(1)     // re = [b,c,d,e]     array == [a]
    re = array.splice(1,2)   // re = [b,c]         array == [a,d,e]

### Adding items

    array.push(Z)            // array == [a,b,c,d,e,Z]
    array.unshift(Z)         // array == [Z,a,b,c,d,e]

    array.concat([F,G])      //=> [a,b,c,d,e,F,G]

### Taking items

    array.pop()              //=> e      array == [a,b,c,d]
    array.shift()            //=> a      array == [b,c,d,e]




