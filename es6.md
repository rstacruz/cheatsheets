---
title: ES2015
category: JavaScript
layout: 2017/sheet
ads: true
---

### Promises

```js
new Promise(fn)
  .then(fn)
  .catch(fn)
```

```js
Promise.all(/*...*/)
Promise.race(/*...*/)
Promise.reject(/*...*/)
Promise.resolve(/*...*/)
```

For asynchronous programming.
See: [Promises](http://babeljs.io/docs/learn-es2015/#promises)

### Block scoping
 
```js
function fn () {
  let x = 0
  if (true) {
    let x = 1 // only inside this `if`
  }
}
```
{: data-line="2,4"}

```js
// Constants
const a = 1
```

`let` is the new `var`.
See: [Let and const](http://babeljs.io/docs/learn-es2015/#let-const)

### Backtick strings

```js
// Interpolation
var message = `Hello ${name}`
```

```js
// Multiline strings
var str = `
hello
world
`
```

Templates and multiline strings.
See: [Template strings](http://babeljs.io/docs/learn-es2015/#template-strings)

### Binary and octal literals

```js
let bin = 0b1010010
let oct = 0755
```

See: [Binary and octal literals](http://babeljs.io/docs/learn-es2015/#binary-and-octal-literals)

### New methods

```js
// New string methods
"hello".repeat(3)
"hello".contains("ll")
"\u1E9B\u0323".normalize("NFC")
```

See: [New methods](http://babeljs.io/docs/learn-es2015/#math-number-string-object-apis)

### Classes

```js
class Circle extends Shape {
  // ctor
  constructor (radius) {
    this.radius = radius
  }

  // methods
  getArea () {
    return Math.PI * 2 * this.radius
  }

  // calling super methods
  expand (n) {
    return super.expand(n) * Math.PI
  }

  // static methods
  static createFromDiameter(diameter) {
    return new Circle(diameter / 2)
  }
}
```

Syntactic sugar for prototypes.
See: [Classes](http://babeljs.io/docs/learn-es2015/#classes)

### Destructuring

```js
// Destructuring assignment
var [first, last] = ['Nikola', 'Tesla']
let {title, author} = { title: 'The Silkworm', author: 'R. Galbraith' }
```

```js
// Available in loops too
for (let {title, artist} in songs) {
  // ...
}
```

```js
// Functions
function greet({ name, greeting }) {
  // ...
}

greet({ name: 'Larry', greeting: 'Ahoy' })
```

Supports for matching arrays and objects.
See: [Destructuring](http://babeljs.io/docs/learn-es2015/#destructuring)

Functions
---------

### Function arguments

```js
// Default arguments
function greet (name = "Jerry") {
  return `Hello ${name}`
}
```

```js
// Rest arguments
function fn(x, ...y) {
  // y is an Array
  return x * y.length
}
```

```js
// Spread
fn(...[1, 2, 3]) // same as fn(1, 2, 3)
```

Default, rest, spread.
See: [Function arguments](http://babeljs.io/docs/learn-es2015/#default-rest-spread)

### Fat arrows

```js
// Fat arrows
setTimeout(() => {
  ...
})
```

```js
// With arguments
readFile('text.txt', (err, data) => {
  ...
})
```

```js
// Short syntax (no `return` without `{}`)
numbers.map(n => n * 2)
// Same as: numbers.map(function (n) { return n * 2 })
```

Like functions but with `this` preserved.
See: [Fat arrows](http://babeljs.io/docs/learn-es2015/#arrows)

Objects
-------

### Shorthand syntax

```js
module.exports = { hello, bye }
// Same as: module.exports = { hello: hello, bye: bye }
```

See: [Object literal enhancements](http://babeljs.io/docs/learn-es2015/#enhanced-object-literals)

### Methods

```js
const App = {
  start () {
    console.log('running')
  }
}
// Same as: App = { start: function () {···} }
```
{: data-line="2"}

See: [Object literal enhancements](http://babeljs.io/docs/learn-es2015/#enhanced-object-literals)

### Getters and setters

```js
const App = {
  get closed () {
    return this.status === 'closed'
  },
  set closed (value) {
    this.status === value ? 'closed' : 'open'
  }
}
```
{: data-line="2,5"}

See: [Object literal enhancements](http://babeljs.io/docs/learn-es2015/#enhanced-object-literals)

### Computed property names

```js
let event = 'click'
let handlers = {
  ['on' + event]: true
}
// Same as: handlers = { 'onclick': true }
```
{: data-line="3"}

See: [Object literal enhancements](http://babeljs.io/docs/learn-es2015/#enhanced-object-literals)

Modules
-------

### Imports

```js
import 'helpers'
// aka: require('···')
```

```js
import Express from 'express'
// aka: Express = require('···').default || require('···')
```

```js
import { indent } from 'helpers'
// aka: indent = require('···').indent
```

```js
import * as Helpers from 'helpers'
// aka: Helpers = require('···')
```

```js
import { indentSpaces as indent } from 'helpers'
// aka: indent = require('···').indentSpaces
```

`import` is the new `require()`.
See: [Module imports](http://babeljs.io/docs/learn-es2015/#modules)

### Exports

```js
export default function () { ··· }
// aka: module.exports.default = ···
```

```js
export function mymethod () { ··· }
// aka: module.exports.mymethod = ···
```

```js
export const pi = 3.14159
// aka: module.exports.pi = ···
```

`export` is the new `module.exports`.
See: [Module exports](http://babeljs.io/docs/learn-es2015/#modules)

Generators
----------

### Generators

```js
function* idMaker () {
  var id = 0
  while (true) { yield id++ }
}
```

```js
var gen = idMaker()
gen.next().value  // 0
gen.next().value  // 1
gen.next().value  // 2
```

It's complicated.
See: [Generators](http://babeljs.io/docs/learn-es2015/#generators)

### For..of iteration

```js
for (let i of iterable) {
  // ...
}
```

For iterating through generators and arrays.
See: [For..of iteration](http://babeljs.io/docs/learn-es2015/#iterators-for-of)
