
## Reference
{: .-one-column}

### applicationCache checking

```js
if (window.applicationCache) {
  // "Naturally" reload when an update is available
  var reload = false

  window.applicationCache.addEventListener('updateready', () => {
    if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
      window.applicationCache.swapCache()
      reload = true
    }
  }, false)

  setInterval(() => {
    try {
      // There's nothing to update for first-time load, browser freaks out :/
      window.applicationCache.update()
    } catch (e) { }
  }, 1000 * 60 * 60) // Every hour
}
```

This is a deprecated HTML feature. See: [Using the application cache](https://developer.mozilla.org/en-US/docs/HTML/Using_the_application_cache) _(developer.mozilla.org)_

---

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

#### Mutative

```bash
list.push(X)            // list == [_,_,_,_,_,X]
list.unshift(X)         // list == [X,_,_,_,_,_]
list.splice(2, 0, X)    // list == [_,_,X,_,_,_]
```

#### Immutable

```bash
list.concat([X,Y])      // → [_,_,_,_,_,X,Y]
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
---

---
title: JavaScript Date
category: JavaScript
layout: 2017/sheet
weight: -3
---

## Date
{: .-left-reference}

### Constructor

```js
// Now
new Date()
```

```js
// ms since epoch
new Date(1419785527580)
```

```js
// Date format
new Date("May 17, 1995 03:24:00")
```

```js
// ISO date format
new Date("2013-03-01T01:10:00")
```

```js
new Date(2014, 2, 1, 13, 0, 59, 0)
```

### Constructor

| `new Date(` | `2014,` | `2,`  | `1,` | `13,` | `0,` | `59,` | `0)`  |
| Date        | Year    | Month | Day  | Hour  | Min  | Sec   | Milli |
{: .-css-breakdown}

Months are zero-indexed (eg, January is `0`).

### Conversion

| Method                   | Result                                      |
| ---                      | ---                                         |
| `d.toString()`           | `"Mon Dec 29 2014 00:58:28 GMT+0800 (PHT)"` |
| `d.toTimeString()`       | `"00:58:46 GMT+0800 (PHT)"`                 |
| `d.toUTCString()`        | `"Sun, 28 Dec 2014 16:58:59 GMT"`           |
| ---                      | ---                                         |
| `d.toDateString()`       | `"Thu Jan 10 2013"`                         |
| `d.toISOString()`        | `"2013-01-09T16:00:00.000Z"`                |
| `d.toLocaleString()`     | `"12/29/2014, 12:57:31 AM"`                 |
| `d.toLocaleTimeString()` | `"12:57:31 AM"`                             |
| ---                      | ---                                         |
| `d.getTime()`            | `1419785527580`                             |

Accessing
---------

### Getters

| Method                 | Result            |
| ---                    | ---               |
| `.getDate()`           | `1..31`           |
| `.getDay()`            | `0..6` (sun..sat) |
| `.getFullYear()`       | `2014`            |
| `.getMonth()`          | `0..11`           |
| ---                    | ---               |
| `.getHours()`          |                   |
| `.getMinutes()`        |                   |
| `.getSeconds()`        |                   |
| `.getMilliseconds()`   |                   |
| ---                    | ---               |
| `.getTime()`           | ms since epoch    |
| `.getTimezoneOffset()` |                   |

UTC versions are also available (eg, `.getUTCDate()`, `.getUTCDay()`, etc).

### Setters

| Method                       | Result |
| ---                          | ---    |
| `.setDate` _(val)_           |        |
| `.setDay` _(val)_            |        |
| `.setFullYear` _(val)_       |        |
| `.setMonth` _(val)_          |        |
| ---                          | ---    |
| `.setHours` _(val)_          |        |
| `.setMinutes` _(val)_        |        |
| `.setSeconds` _(val)_        |        |
| `.setMilliseconds` _(val)_   |        |
| ---                          | ---    |
| `.setTime` _(val)_           |        |
| `.setTimezoneOffset` _(val)_ |        |

See the getters list.


---

---
title: JavaScript Date
category: JavaScript
layout: 2017/sheet
weight: -3
---

## Date
{: .-left-reference}

### Constructor

```js
// Now
new Date()
```

```js
// ms since epoch
new Date(1419785527580)
```

```js
// Date format
new Date("May 17, 1995 03:24:00")
```

```js
// ISO date format
new Date("2013-03-01T01:10:00")
```

```js
new Date(2014, 2, 1, 13, 0, 59, 0)
```

### Constructor

| `new Date(` | `2014,` | `2,`  | `1,` | `13,` | `0,` | `59,` | `0)`  |
| Date        | Year    | Month | Day  | Hour  | Min  | Sec   | Milli |
{: .-css-breakdown}

Months are zero-indexed (eg, January is `0`).

### Conversion

| Method                   | Result                                      |
| ---                      | ---                                         |
| `d.toString()`           | `"Mon Dec 29 2014 00:58:28 GMT+0800 (PHT)"` |
| `d.toTimeString()`       | `"00:58:46 GMT+0800 (PHT)"`                 |
| `d.toUTCString()`        | `"Sun, 28 Dec 2014 16:58:59 GMT"`           |
| ---                      | ---                                         |
| `d.toDateString()`       | `"Thu Jan 10 2013"`                         |
| `d.toISOString()`        | `"2013-01-09T16:00:00.000Z"`                |
| `d.toLocaleString()`     | `"12/29/2014, 12:57:31 AM"`                 |
| `d.toLocaleTimeString()` | `"12:57:31 AM"`                             |
| ---                      | ---                                         |
| `d.getTime()`            | `1419785527580`                             |

Accessing
---------

### Getters

| Method                 | Result            |
| ---                    | ---               |
| `.getDate()`           | `1..31`           |
| `.getDay()`            | `0..6` (sun..sat) |
| `.getFullYear()`       | `2014`            |
| `.getMonth()`          | `0..11`           |
| ---                    | ---               |
| `.getHours()`          |                   |
| `.getMinutes()`        |                   |
| `.getSeconds()`        |                   |
| `.getMilliseconds()`   |                   |
| ---                    | ---               |
| `.getTime()`           | ms since epoch    |
| `.getTimezoneOffset()` |                   |

UTC versions are also available (eg, `.getUTCDate()`, `.getUTCDay()`, etc).

### Setters

| Method                       | Result |
| ---                          | ---    |
| `.setDate` _(val)_           |        |
| `.setDay` _(val)_            |        |
| `.setFullYear` _(val)_       |        |
| `.setMonth` _(val)_          |        |
| ---                          | ---    |
| `.setHours` _(val)_          |        |
| `.setMinutes` _(val)_        |        |
| `.setSeconds` _(val)_        |        |
| `.setMilliseconds` _(val)_   |        |
| ---                          | ---    |
| `.setTime` _(val)_           |        |
| `.setTimezoneOffset` _(val)_ |        |

See the getters list.

---

---
title: fetch()
category: JavaScript
layout: 2017/sheet
weight: -3
---

### Fetch
{: .-prime}

```js
fetch('/data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch(err => ...)
```
{: data-line="4"}

### Response

```js
fetch('/data.json')
.then(res => {
  res.text()       // response body (=> Promise)
  res.json()       // parse via JSON (=> Promise)
  res.status       //=> 200
  res.statusText   //=> 'OK'
  res.redirected   //=> false
  res.ok           //=> true
  res.url          //=> 'http://site.com/data.json'
  res.type         //=> 'basic'
                   //   ('cors' 'default' 'error'
                   //    'opaque' 'opaqueredirect')

  res.headers.get('Content-Type')
})
```

### Request options

```js
fetch('/data.json', {
  method: 'post',
  body: new FormData(form), // post body
  body: JSON.stringify(...),

  headers: {
    'Accept': 'application/json'
  },

  credentials: 'same-origin', // send cookies
  credentials: 'include',     // send cookies, even in CORS

})
```

### Catching errors

```js
fetch('/data.json')
  .then(checkStatus)
```

```js
function checkStatus (res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  } else {
    let err = new Error(res.statusText)
    err.response = res
    throw err
  }
}
```

Non-2xx responses are still successful requests. Use another function to turn them to errors.

### Using with node.js

```js
const fetch = require('isomorphic-fetch')
```

See: [isomorphic-fetch](https://npmjs.com/package/isomorphic-fetch) _(npmjs.com)_

## References
{: .-one-column}

- <https://fetch.spec.whatwg.org/>
- <https://www.npmjs.com/package/whatwg-fetch>

---

---
title: JavaScript lazy shortcuts
category: JavaScript
layout: 2017/sheet
---

## Shortcuts
{: .-left-reference}

### Examples

```js
n = +'4096'    // n === 4096
s = '' + 200   // s === '200'
```

```js
now = +new Date()
isPublished = !!post.publishedAt
```

### Shortcuts

| What | Lazy mode | "The right way" |
| --- | --- | --- |
| String to number | `+str` | `parseInt(str, 10)` _or_ `parseFloat()` |
| Math floor | `num | 0` | `Math.floor(num)` |
| Number to string | `'' + num` | `num.toString()` |
| Date to UNIX timestamp | `+new Date()` | `new Date().getTime()` |
| Any to boolean | `!!value` | `Boolean(value)` |
| Check array contents | `if (~arr.indexOf(v))` | `if (arr.includes(v))` |
{: .-left-align.-headers}

`.includes` is ES6-only, otherwise use `.indexOf(val) !== -1` if you don't polyfill.

----

# Javascript Model:

### Example

```bash
Project = Model "project", ->
  @extend
    findByTitle: (title) -> ...

  @include
    markAsDone: -> ...

  # ActiveRecord::Base.include_root_in_json = false
```

```bash
project = Project.find(1)
project = Project.findByTitle("hello")

project.markAsDone()
```

### Persistence

```bash
Project "hi", ->
  @persistence Model.REST, "/projects"
  @persistence Model.localStorage
```

```bash
Project.load ->
  # loaded
```

### Attrs

```bash
project = new Project(name: "Hello")

project.attr('name', "Hey")
project.attr('name')

project.save()
project.destroy()
```

### Collection

```bash
Food.add(egg)
Food.all()
Food.select (food) -> ...
Food.first()
```

```bash
Food.find(id)
```

### Events

```bash
# Classes
Project.bind "add", (obj) ->
Project.bind "remove", (obj) ->
```

```bash
# Instances
project.bind "update", ->
project.bind "destroy", ->
```

```bash
project.trigger "turn_blue"
```

## References
{: .-one-column}

- <http://benpickles.github.io/js-model/>

---

---
title: jscoverage
category: JavaScript libraries
layout: 2017/sheet
intro: |
  A small guide into installing [jscoverage](https://npmjs.com/package./jscoverage). Also see [mocha-blanket](./mocha-blanket).
---

### Install

#### Install via npm

```bash
npm install --save-dev jscoverage
```

#### Ignore output

```bash
echo coverage.html >> .gitignore
```

### package.json

The `coverage` task injects your source files (`lib`) with jscoverage hooks, runs `mocha -R html-cov`, then restores later.
{: .-setup}

```bash
/* directory */
"coverage": "mv lib lib~; (jscoverage lib~ lib; mocha -R html-cov > coverage.html); rm -rf lib; mv lib~ lib"
```
{: .-hard-wrap}

```bash
/* single file */
"coverage": "(cp index.js index.js~; jscoverage index.js; mv index-cov.js index.js; mocha -R html-cov > coverage.html); mv index.js~ index.js"
```
{: .-hard-wrap}

### Run

```bash
npm run coverage
```

```bash
open coverage.html
```

### Caveats

If you're using jsdom, be sure to expose the `window._$jscoverage` variable into 
the `global` scope.


---
title: Jsdoc
category: JavaScript
layout: 2017/sheet
updated: 2019-01-10
weight: -1
---

### Functions

```js
/**
 * This is a function.
 *
 * @param {string} n - A string param
 * @return {string} A good string
 *
 * @example
 *
 *     foo('hello')
 */

function foo(n) { return n }
```

See: <http://usejsdoc.org/index.html>

### Types

| Type                         | Description           |
| ---                          | ---                   |
| `@param {string=} n`         | Optional              |
| `@param {string} [n]`        | Optional              |
| `@param {(string\|number)} n`| Multiple types        |
| `@param {*} n`               | Any type              |
| `@param {...string} n`       | Repeatable arguments  |
| `@param {string} [n="hi"]`   | Optional with default |
| `@param {string[]} n`        | Array of strings      |
| `@return {Promise<string[]>} n` | Promise fulfilled by array of strings |

See: <http://usejsdoc.org/tags-type.html>

### Variables

```js
/**
 * @type {number}
 */
var FOO = 1
```

```js
/**
 * @const {number}
 */
const FOO = 1
```

### Typedef

```js
/**
 * A song
 * @typedef {Object} Song
 * @property {string} title - The title
 * @property {string} artist - The artist
 * @property {number} year - The year
 */
```

```js
/**
 * Plays a song
 * @param {Song} song - The {@link Song} to be played
 */

function play (song) {
}
```

See: <http://usejsdoc.org/tags-typedef.html>

### Typedef Shorthand

```js
/**
 * A song
 * @typedef {{title: string, artist: string, year: number}} Song
 */
```

```js
/**
 * Plays a song
 * @param {Song} song - The {@link Song} to be played
 */

function play (song) {
}
```

See: <http://usejsdoc.org/tags-typedef.html>

### Importing types

```js
/**
 * @typedef {import('./Foo').default} Bar
 */

/**
 * @param {Bar} x
 */

function test(x) { }
```

This syntax is [TypeScript-specific](https://github.com/Microsoft/TypeScript/wiki/JsDoc-support-in-JavaScript#import-types).

### Other keywords

```js
/**
 * @throws {FooException}
 * @private
 * @deprecated
 * @see
 *
 * @function
 * @class
 */
```

### Renaming

```js
/*
 * @alias Foo.bar
 * @name Foo.bar
 */
```

Prefer `alias` over `name`. See: <http://usejsdoc.org/tags-alias.html>

----

---
title: Jshint
category: JavaScript libraries
layout: 2017/sheet
updated: 2017-09-12
---

### Relaxing

Enable these options to *not* throw errors in these conditions.
See: [Relaxing](http://www.jshint.com/docs/options/#relaxing-options)
{: .-setup}

```js
/* jshint asi: true */
allow()
missing_semicolons()
```

```js
/* jshint boss: true */
if (m = str.match(/.../))
```

```js
/* jshint debug: true */
debugger;
```

```js
/* jshint eqnull: true */
if (x == null)
```

```js
/* jshint evil: true */
eval('...')
```

```js
/* jshint expr: true */
production && minify = true;
div.innerWidth;
expect(x).be.true;
```

```js
/* jshint laxcomma: true */
var one = 1
  , two = 2;
```

```js
/* jshint loopfunc: true */
for (i=0; i<10; x++) {
  (function(i) { ... })(i);
}
```

```js
/* jshint sub: true */
process.env['name_here']
```

```js
/* jshint strict: "global" */
"use strict";
```

### Enforcing

Enable these options to catch more errors.
See: [Enforcing](http://www.jshint.com/docs/options/#enforcing-options)
{: .-setup}

```js
/* jshint curly: true */
while (day)                     // err: use { }'s
  shuffle();
```

```js
/* jshint eqeqeq: true */
if (a == null)                  // err: use ===
```

```js
/* jshint es3: true */
// ...for legacy IE compatibility
a.default = function() { ... }; // err: reserved word
array = [ 1, 2, 3, ];           // err: extra comma
```

```js
/* jshint forin: true */
for (key in obj) { ... }        // err: check obj.hasOwnProperty(key)
```

```js
/* jshint freeze: true */
Array.prototype.count = ...;    // err: don't modify native prototypes
```

```js
/* jshint indent: 4 */
if (x) {                        // err: expected indent of 4, found 2
  ...;
}
```

```js
/* jshint quotmark: single */
/* jshint quotmark: double */
alert("hi");                    // err: only single allowed
```

```js
/* jshint strict: true */
function() { ... }              // err: need "use strict"
```

```js
/* jshint white: true, indent: 4 */
/* jshint maxdepth: 2 */
/* jshint maxparams: 3 */
/* jshint maxstatements: 4 */
/* jshint maxcomplexity: 5 */
/* jshint maxlen: 80 */
```

### Ignore

```js
/* jshint ignore:start */
/* jshint ignore:end */
```

### Globals and Environments

```js
/* jshint undef: true */
/* global jQuery */
/* global -BAD_LIB */
```

```js
/* jshint devel: true */   console, alert, ...
/* jshint browser: true */ window, document, location, ...
/* jshint node: true */    module, exports, console, process, ...
/* jshint jquery: true */  jQuery, $
```

See: [Environments](http://www.jshint.com/docs/options/#environments)

### Also see

* <http://www.jshint.com/docs/options/>
* <https://gist.github.com/haschek/2595796>


---


---
title: ES2015+
category: JavaScript
layout: 2017/sheet
tags: [Featured]
updated: 2017-10-21
weight: -10
intro: |
  A quick overview of new JavaScript features in ES2015, ES2016, ES2017, ES2018 and beyond.
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
{: data-line="2,4"}

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
{: data-line="1"}

#### Methods

```js
  getArea () {
    return Math.PI * 2 * this.radius
  }
```
{: data-line="1"}

#### Calling superclass methods

```js
  expand (n) {
    return super.expand(n) * Math.PI
  }
```
{: data-line="2"}

#### Static methods

```js
  static createFromDiameter(diameter) {
    return new Circle(diameter / 2)
  }
}
```
{: data-line="1"}

Syntactic sugar for prototypes.
See: [Classes](https://babeljs.io/learn-es2015/#classes)

### Exponent operator

```js
const byte = 2 ** 8
// Same as: Math.pow(2, 8)
```
{: data-line="1"}

Promises
--------
{: .-three-column}

### Making promises

```js
new Promise((resolve, reject) => {
  if (ok) { resolve(result) }
  else { reject(error) }
})
```
{: data-line="1"}

For asynchronous programming.
See: [Promises](https://babeljs.io/learn-es2015/#promises)

### Using promises

```js
promise
  .then((result) => { ··· })
  .catch((error) => { ··· })
```
{: data-line="2,3"}


### Using promises with finally

```js
promise
  .then((result) => { ··· })
  .catch((error) => { ··· })
  .finally(() => { // logic independent of success/error })
```
{: data-line="4"}

The handler is called when the promise is fulfilled or rejected.


### Promise functions

```js
Promise.all(···)
Promise.race(···)
Promise.reject(···)
Promise.resolve(···)
```

### Async-await

```js
async function run () {
  const user = await getUser()
  const tweets = await getTweets(user)
  return [user, tweets]
}
```
{: data-line="2,3"}

`async` functions are another way of using functions.

See: [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

Destructuring
-------------
{: .-three-column}

### Destructuring assignment

#### Arrays

```js
const [first, last] = ['Nikola', 'Tesla']
```
{: data-line="1"}

#### Objects

```js
let {title, author} = {
  title: 'The Silkworm',
  author: 'R. Galbraith'
}
```
{: data-line="1"}

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

### Function arguments

```js
function greet({ name, greeting }) {
  console.log(`${greeting}, ${name}!`)
}
```
{: data-line="1"}

```js
greet({ name: 'Larry', greeting: 'Ahoy' })
```

Destructuring of objects and arrays can also be done in function arguments.

### Default values

```js
function greet({ name = 'Rauno' } = {}) {
  console.log(`Hi ${name}!`);
}
```
{: data-line="1"}

```js
greet() // Hi Rauno!
greet({ name: 'Larry' }) // Hi Larry!
```

### Reassigning keys

```js
function printCoordinates({ left: x, top: y }) {
  console.log(`x: ${x}, y: ${y}`)
}
```
{: data-line="1"}

```js
printCoordinates({ left: 25, top: 90 })
```

This example assigns `x` to the value of the `left` key.

### Loops

```js
for (let {title, artist} of songs) {
  ···
}
```
{: data-line="1"}

The assignment expressions work in loops, too.


### Object destructuring

```js
const { id, ...detail } = song;
```
{: data-line="1"}

Extract some keys individually and remaining keys in the object using rest (...) operator


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
{: data-line="2"}

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
{: data-line="2,3"}

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
{: data-line="1"}

#### Rest arguments

```js
function fn(x, ...y) {
  // y is an Array
  return x * y.length
}
```
{: data-line="1"}

#### Spread

```js
fn(...[1, 2, 3])
// same as fn(1, 2, 3)
```
{: data-line="1"}

Default, rest, spread.
See: [Function arguments](https://babeljs.io/learn-es2015/#default--rest--spread)

### Fat arrows

#### Fat arrows

```js
setTimeout(() => {
  ···
})
```
{: data-line="1"}

#### With arguments

```js
readFile('text.txt', (err, data) => {
  ...
})
```
{: data-line="1"}

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
{: data-line="1,4,5,6"}

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
{: data-line="2"}

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
{: data-line="2,5"}

See: [Object literal enhancements](https://babeljs.io/learn-es2015/#enhanced-object-literals)

### Computed property names

```js
let event = 'click'
let handlers = {
  [`on${event}`]: true
}
// Same as: handlers = { 'onclick': true }
```
{: data-line="3"}

See: [Object literal enhancements](https://babeljs.io/learn-es2015/#enhanced-object-literals)


### Extract values

```js
const fatherJS = { age: 57, name: "Brendan Eich" }

Object.values(fatherJS)
// [57, "Brendan Eich"]
Object.entries(fatherJS)
// [["age", 57], ["name", "Brendan Eich"]]
```

{: data-line="3,5"}


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

---

