---
title: ES6
layout: default
---

## Stable (io.js)

New features you can use on [io.js](http://iojs.org/).
{:.brief-intro.center.top-space-0}

### [Promises](http://babeljs.io/docs/learn-es6/#promises)
For asynchronous programming.

```js
new Promise(fn)
  .then(fn)
  .catch(fn)

Promise.all(/*...*/)
Promise.race(/*...*/)
Promise.reject(/*...*/)
Promise.resolve(/*...*/)
```

### [Block scoping](http://babeljs.io/docs/learn-es6/#let-const)
`let` is the new `var`.
 
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

### [Backtick strings](http://babeljs.io/docs/learn-es6/#template-strings)
Templates and multiline strings.

```js
// interpolation
var message = `Hello ${name}`;

// Multiline
var str = `
hello
world
`;
```

### Other improvements
New string [methods](http://babeljs.io/docs/learn-es6/#math-number-string-object-apis), [binary and octal](http://babeljs.io/docs/learn-es6/#binary-and-octal-literals) numbers.

```js
// New string methods
"hello".repeat(3)
"hello".contains("ll")
"\u1E9B\u0323".normalize("NFC")

// Binary/octal literals
var bin = 0b1010010;
var oct = 0755;
```

### [Object literal enhancements](http://babeljs.io/docs/learn-es6/#enhanced-object-literals)
Adds support for getters, setters, methods, shorthand.

```js
// Short object syntax
// aka: `exports = { hello:hello, bye:bye }`
module.exports = { hello, bye };

App = {
  // shorthand for `handler: handler`
  handler,

  // methods
  start() {
    this.go();
  },

  // getter/setter
  get closed() {
    return this.status === 'closed';
  },

  // custom prototypes
  __proto__: protoObj,

  // computed property names
  [ "prop_"+n ]: 42
};
```

## Stable in Babel

Available via the [Babel] transpiler.
{:.brief-intro.center.top-space-0}

### [Module imports](http://babeljs.io/docs/learn-es6/#modules)
`import` is the new `require()`.

```js
// aka: require('...')
import 'helpers';

// aka: Express = require('...')
import Express from 'express';

// aka: indent = require('...').indent
import { indent } from 'helpers';

// aka: indent = require('...').indentSpaces
import { indentSpaces as indent } from 'helpers';
```

### [Module exports](http://babeljs.io/docs/learn-es6/#modules)
`export` is the new `module.exports =`.

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

### [Destructuring](http://babeljs.io/docs/learn-es6/#destructuring)
Supports for matching arrays and objects.

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

### [Function arguments](http://babeljs.io/docs/learn-es6/#default-rest-spread)
Default, rest, spread.

```js
// Default arguments
function greet(name = "Jerry") {
  return `Hello ${name}`;
}

// Rest arguments
function fn(x, ...y) {
  // y is an Array
  return x * y.length;
}

// Spread
fn(...[1,2,3]) // same as fn(1,2,3)
```

### [Fat arrows](http://babeljs.io/docs/learn-es6/#arrows)
Like functions but with `this` preserved.

```js
// Fat arrows
setTimeout(() => {
  console.log('hi');
});

// Short syntax (no `return` without `{}`)
numbers.map(n => n * 2)
```

### [Classes](http://babeljs.io/docs/learn-es6/#classes)
Syntactic sugar for prototypes.

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

### [For..of iteration](http://babeljs.io/docs/learn-es6/#iterators-for-of)
For iterating through generators and arrays.

```
for (var i of iterable) {
  // ...
}
```

Works for Arrays and iterables (eg, generators).

## Experimental

Available via Babel's experimental mode.
{:.brief-intro.center.top-space-0}

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
