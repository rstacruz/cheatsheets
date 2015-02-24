---
title: ES6
layout: default
---

## Stable (io.js)

New features you can use on io.js.

```js
/*
 * Promises
 */

new Promise(fn)
  .then(fn)
  .catch(fn)

Promise.all(/*...*/)
Promise.race(/*...*/)
Promise.reject(/*...*/)
Promise.resolve(/*...*/)

/*
 * Block scoping
 */
 
// Block scoping (let)
function fn () {
  let x = 0;
  if (true) {
    let x = 1; // only inside this `if`
  }
}

// Constants
const a = 1;

/*
 * Syntax updates, etc
 */
 
// Short object syntax
module.exports = {
  sayHello,
  sayGoodbye
};

// Template strings
var message = `Hello ${name}`;

// New string methods
"hello".repeat(3)
"hello".contains("ll")
"\u1E9B\u0323".normalize("NFC")

// Binary/octal literals
var bin = 0b1010010;
var oct = 0755;
```

## Stable (6to5)

Available via 6to5

```js
/*
 * Imports
 */

// Import; aka: require('...')
import 'helpers';

// Import; aka: Express = require('...')
import Express from 'express';

// Import; aka: indent = require('...').indent
import { indent } from 'helpers';

/*
 * Exports
 */

// Export; aka: module.exports = ...
export default function () {
  // ...
};

// Export a method; aka: exports.mymethod = ...
export function mymethod () {
};

// Export a value; aka: exports.pi = ...
export var pi = 3.14159;

/*
 * Destructuring
 */

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

/*
 * Spread
 */
 
// Default arguments
function greet(name="Jerry") {
  return `Hello ${name}`;
}

// Spread arguments
function fn(x, ...y) {
  // y is an Array
  return x * y.length;
}

// Rest
fn(...[1,2,3]) // same as fn(1,2,3)

// Fat arrows
setTimeout(() => {
  console.log('hi');
});
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
