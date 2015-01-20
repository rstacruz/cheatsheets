---
title: ES6
layout: default
---

## Stable

New features you can use on io.js.

### Promises

    new Promise(fn)
      .then(fn)
      .catch(fn)

    Promise.all(...)
    Promise.race(...)
    Promise.reject(...)
    Promise.resolve(...)

### [Template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)

    var message = `Hello there ${name}`;

### [Block scoping](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

    if (true) {
      let x = 1;
    }

### [Constants](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

    const a = 1;

### Generators

    function*() {...}

### Binary/octal

    var bin = 0b1010010;
    var oct = 0755;

### String methods

    "hello".repeat(3)
    "hello".contains("ll")
    "\u1E9B\u0323".normalize("NFC")

### [Symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

    var sym = Symbol("foo")
    typeof sym === 'symbol'

### [Collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

    Map, WeakMap
    Set, WeakSet

