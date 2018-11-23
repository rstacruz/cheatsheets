---
title: Jsdoc
category: JavaScript
layout: 2017/sheet
updated: 2017-10-29
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
| `@param {(string|number)} n` | Multiple types        |
| `@param {*} n`               | Any type              |
| `@param {...string} n`       | Repeatable arguments  |
| `@param {string} [n="hi"]`   | Optional with default |
| `@param {string[]} n`        | Array of strings      |

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
