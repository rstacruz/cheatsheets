---
title: ES6
layout: default
---

## Stable (io.js)

New features you can use on io.js.

### Promises

```js
new Promise(fn)
  .then(fn)
  .catch(fn)

Promise.all(/*...*/)
Promise.race(/*...*/)
Promise.reject(/*...*/)
Promise.resolve(/*...*/)
```

### Block scoping
 
```js
// Block scoping (let)
function fn () {
  let x = 0;
  if (true) {
    let x = 1; // only inside this `if`
  }
}

// Constants
const a = 1;
```

### Backtick strings

```js
// interpolation
var message = `Hello ${name}`;

// Multiline
var str = `
hello
world
`;
```

### Syntax improvements

```js
// Short object syntax
// aka: `exports = { hello:hello, bye:bye }`
module.exports = { hello, bye };

// New string methods
"hello".repeat(3)
"hello".contains("ll")
"\u1E9B\u0323".normalize("NFC")

// Binary/octal literals
var bin = 0b1010010;
var oct = 0755;
```

## Stable ([Babel])

Available via [Babel]

### Module imports

```js
// aka: require('...')
import 'helpers';

// aka: Express = require('...')
import Express from 'express';

// aka: indent = require('...').indent
import { indent } from 'helpers';
```

### Module exports

```js
// aka: module.exports = ...
export default function () {
  // ...
};

// aka: exports.mymethod = ...
export function mymethod () {
};

// aka: exports.pi = ...
export var pi = 3.14159;
```

### Destructuring

```js
// Destructuring assignment
var [first, last] = ["Nikola", "Tesla"];
let {title, author} = { title: "The Silkworm", author: "R. Galbraith" };

// Available in loops too
for (let {title, artist} in songs) {
  // ...
}

// Functions
function greet({ name, greeting }) {
  // ...
}

greet({ name: "Larry", greeting: "Ahoy" });
```

### Function arguments

```js
// Default arguments
function greet(name = "Jerry") {
  return `Hello ${name}`;
}

// Spread arguments
function fn(x, ...y) {
  // y is an Array
  return x * y.length;
}

// Rest
fn(...[1,2,3]) // same as fn(1,2,3)
```

### Fat arrows

```js
// Fat arrows
setTimeout(() => {
  console.log('hi');
});

// Short syntax (no `return` without `{}`)
numbers.map(n => n * 2)
```

### Classes

```js
class Circle extends Shape {
  // ctor
  constructor(radius) {
    this.radius = radius;
  }

  // methods
  getArea() {
    return Math.PI * 2 * this.radius;
  }

  // calling super methods
  expand(n) {
    return super.expand(n) * Math.PI;
  }

  // static methods
  static createFromDiameter(diameter) {
    return new Circle(diameter / 2);
  }
}
```

## Experimental

Available via 6to5's experimental mode

```js
/*
 * Comprehensions
 */
 
// Basic comprehension
var names = [for (c of customers) c.name];

// Comprehension with IDs
var names = [for (c of customers) if (c.admin) c.name];
```

[Babel]: http://babeljs.io
