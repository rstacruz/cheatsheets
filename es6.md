---
title: ES2015+
subtitle: Modern JavaScript features
category: JavaScript
last_verified_with: "ECMAScript 2015."
updated: 2019-11-14
tier: t3
weight: -10
intro: |
  A quick overview of new JavaScript features in ES2015, ES2016, ES2017, ES2018 and beyond.
links:
  - title: ECMAScript 2015 specification
    url: https://262.ecma-international.org/6.0/
---

### Block scoping

#### Let

```js
function fn () {
  let x = 0
  if (true) {
    let x = 1 // only inside this `if`
  }
}
```

<!-- {: data-highlight="let"} -->

#### Const

```js
const a = 1
```

`let` is the new `var`. Constants work just like `let`, but can't be reassigned.
See: [Let and const](https://babeljs.io/learn-es2015/#let--const)

### Backtick strings

#### Interpolation

```js
const message = `Hello ${name}`
```

#### Multiline strings

```js
const str = `
hello
world
`
```

Templates and multiline strings.
See: [Template strings](https://babeljs.io/learn-es2015/#template-strings)

### Binary and octal literals

```js
let bin = 0b1010010
let oct = 0o755
```

See: [Binary and octal literals](https://babeljs.io/learn-es2015/#binary-and-octal-literals)

### New methods

#### New string methods

```js
"hello".repeat(3)
"hello".includes("ll")
"hello".startsWith("he")
"hello".padStart(8) // "   hello"
"hello".padEnd(8) // "hello   " 
"hello".padEnd(8, '!') // hello!!!
"\u1E9B\u0323".normalize("NFC")
```

See: [New methods](https://babeljs.io/learn-es2015/#math--number--string--object-apis)

### Classes

```js
class Circle extends Shape {
```

#### Constructor

```js
  constructor (radius) {
    this.radius = radius
  }
```

<!-- {: data-highlight="constructor"} -->

#### Methods

```js
  getArea () {
    return Math.PI * 2 * this.radius
  }
```

<!-- {: data-highlight="getArea"} -->

#### Calling superclass methods

```js
  expand (n) {
    return super.expand(n) * Math.PI
  }
```

<!-- {: data-highlight="super.expand"} -->

#### Static methods

```js
  static createFromDiameter(diameter) {
    return new Circle(diameter / 2)
  }
}
```

<!-- {: data-highlight="createFromDiameter"} -->

Syntactic sugar for prototypes.
See: [Classes](https://babeljs.io/learn-es2015/#classes)

### Exponent operator

```js
const byte = 2 ** 8
// Same as: Math.pow(2, 8)
```

<!-- {: data-highlight="**"} -->

See: [Exponentiation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Exponentiation)

Promises
--------

<!-- {: .-three-column} -->

### Making promises

```js
new Promise((resolve, reject) => {
  if (ok) { resolve(result) }
  else { reject(error) }
})
```

<!-- {: data-highlight="Promise"} -->

For asynchronous programming.
See: [Promises](https://babeljs.io/learn-es2015/#promises)

### Using promises

```js
promise
  .then((result) => { ··· })
  .catch((error) => { ··· })
```

<!-- {: data-highlight="=>"} -->


See: [Promise.prototype.then](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)

### Using promises with finally

```js
promise
  .then((result) => { ··· })
  .catch((error) => { ··· })
  .finally(() => { // logic independent of success/error })
```

<!-- {: data-highlight="finally"} -->

The handler is called when the promise is fulfilled or rejected.


See: [Promise.prototype.finally](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)

### Promise functions

```js
Promise.all(···)
Promise.race(···)
Promise.reject(···)
Promise.resolve(···)
```

See: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

### Async-await

```js
async function run () {
  const user = await getUser()
  const tweets = await getTweets(user)
  return [user, tweets]
}
```

<!-- {: data-highlight="getTweets"} -->

`async` functions are another way of using functions.

See: [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

Destructuring
-------------

<!-- {: .-three-column} -->

### Destructuring assignment

#### Arrays

```js
const [first, last] = ['Nikola', 'Tesla']
```

<!-- {: data-highlight="'Nikola'"} -->

#### Objects

```js
let {title, author} = {
  title: 'The Silkworm',
  author: 'R. Galbraith'
}
```

<!-- {: data-highlight="author"} -->

Supports for matching arrays and objects.
See: [Destructuring](https://babeljs.io/learn-es2015/#destructuring)

### Default values

```js
const scores = [22, 33]
const [math = 50, sci = 50, arts = 50] = scores
```

```js
// Result:
// math === 22, sci === 33, arts === 50
```

Default values can be assigned while destructuring arrays or objects.

See: [Destructuring default values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#default_value)

### Function arguments

```js
function greet({ name, greeting }) {
  console.log(`${greeting}, ${name}!`)
}
```

<!-- {: data-highlight="greeting"} -->

```js
greet({ name: 'Larry', greeting: 'Ahoy' })
```

Destructuring of objects and arrays can also be done in function arguments.

See: [Destructuring function arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#unpacking_properties_from_objects_passed_as_a_function_parameter)

### Default values

```js
function greet({ name = 'Rauno' } = {}) {
  console.log(`Hi ${name}!`);
}
```

<!-- {: data-highlight="'Rauno'"} -->

```js
greet() // Hi Rauno!
greet({ name: 'Larry' }) // Hi Larry!
```

See: [Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)

### Reassigning keys

```js
function printCoordinates({ left: x, top: y }) {
  console.log(`x: ${x}, y: ${y}`)
}
```

<!-- {: data-highlight="printCoordinates"} -->

```js
printCoordinates({ left: 25, top: 90 })
```

This example assigns `x` to the value of the `left` key.

See: [Assigning to new variables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#assigning_to_new_variable_names)

### Loops

```js
for (let {title, artist} of songs) {
  ···
}
```

<!-- {: data-highlight="artist"} -->

The assignment expressions work in loops, too.


See: [Destructuring in for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#for_of_iteration_and_destructuring)

### Object destructuring

```js
const { id, ...detail } = song;
```

<!-- {: data-highlight="..."} -->

Extract some keys individually and remaining keys in the object using rest (...) operator


See: [Rest properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#rest_properties_and_rest_elements)

Spread
------

### Object spread

#### with Object spread

```js
const options = {
  ...defaults,
  visible: true
}
```

<!-- {: data-highlight="defaults"} -->

#### without Object spread

```js
const options = Object.assign(
  {}, defaults,
  { visible: true })
```

The Object spread operator lets you build new objects from other objects.

See: [Object spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)

### Array spread

#### with Array spread

```js
const users = [
  ...admins,
  ...editors,
  'rstacruz'
]
```

<!-- {: data-highlight="editors"} -->

#### without Array spread

```js
const users = admins
  .concat(editors)
  .concat([ 'rstacruz' ])
```

The spread operator lets you build new arrays in the same way.

See: [Spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)

Functions
---------

### Function arguments

#### Default arguments

```js
function greet (name = 'Jerry') {
  return `Hello ${name}`
}
```

<!-- {: data-highlight="'Jerry'"} -->

#### Rest arguments

```js
function fn(x, ...y) {
  // y is an Array
  return x * y.length
}
```

<!-- {: data-highlight="function"} -->

#### Spread

```js
fn(...[1, 2, 3])
// same as fn(1, 2, 3)
```

<!-- {: data-highlight="fn"} -->

Default, rest, spread.
See: [Function arguments](https://babeljs.io/learn-es2015/#default--rest--spread)

### Fat arrows

#### Fat arrows

```js
setTimeout(() => {
  ···
})
```

<!-- {: data-highlight="setTimeout"} -->

#### With arguments

```js
readFile('text.txt', (err, data) => {
  ...
})
```

<!-- {: data-highlight="'text.txt'"} -->

#### Implicit return
```js
numbers.map(n => n * 2)
// No curly braces = implicit return
// Same as: numbers.map(function (n) { return n * 2 })
numbers.map(n => ({
  result: n * 2
}))
// Implicitly returning objects requires parentheses around the object
```

<!-- {: data-highlight="numbers.map"} -->

Like functions but with `this` preserved.
See: [Fat arrows](https://babeljs.io/learn-es2015/#arrows-and-lexical-this)

Objects
-------

### Shorthand syntax

```js
module.exports = { hello, bye }
// Same as: module.exports = { hello: hello, bye: bye }
```

See: [Object literal enhancements](https://babeljs.io/learn-es2015/#enhanced-object-literals)

### Methods

```js
const App = {
  start () {
    console.log('running')
  }
}
// Same as: App = { start: function () {···} }
```

<!-- {: data-highlight="start"} -->

See: [Object literal enhancements](https://babeljs.io/learn-es2015/#enhanced-object-literals)

### Getters and setters

```js
const App = {
  get closed () {
    return this.status === 'closed'
  },
  set closed (value) {
    this.status = value ? 'closed' : 'open'
  }
}
```

<!-- {: data-highlight="get"} -->

See: [Object literal enhancements](https://babeljs.io/learn-es2015/#enhanced-object-literals)

### Computed property names

```js
let event = 'click'
let handlers = {
  [`on${event}`]: true
}
// Same as: handlers = { 'onclick': true }
```

<!-- {: data-highlight="event"} -->

See: [Object literal enhancements](https://babeljs.io/learn-es2015/#enhanced-object-literals)


### Extract values

```js
const fatherJS = { age: 57, name: "Brendan Eich" }

Object.values(fatherJS)
// [57, "Brendan Eich"]
Object.entries(fatherJS)
// [["age", 57], ["name", "Brendan Eich"]]
```

<!-- {: data-highlight="Object.entries"} -->


See: [Object.values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)

Modules
-------

### Imports

```js
import 'helpers'
// aka: require('···')
```

```js
import Express from 'express'
// aka: const Express = require('···').default || require('···')
```

```js
import { indent } from 'helpers'
// aka: const indent = require('···').indent
```

```js
import * as Helpers from 'helpers'
// aka: const Helpers = require('···')
```

```js
import { indentSpaces as indent } from 'helpers'
// aka: const indent = require('···').indentSpaces
```

`import` is the new `require()`.
See: [Module imports](https://babeljs.io/learn-es2015/#modules)

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
See: [Module exports](https://babeljs.io/learn-es2015/#modules)

Generators
----------

### Generators

```js
function* idMaker () {
  let id = 0
  while (true) { yield id++ }
}
```

```js
let gen = idMaker()
gen.next().value  // → 0
gen.next().value  // → 1
gen.next().value  // → 2
```

It's complicated.
See: [Generators](https://babeljs.io/learn-es2015/#generators)

### For..of iteration

```js
for (let i of iterable) {
  ···
}
```

For iterating through generators and arrays.
See: [For..of iteration](https://babeljs.io/learn-es2015/#iterators--forof)
