---
title: Jsdoc
category: JavaScript
layout: 2017/sheet
updated: 2020-06-23
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

function foo(n) {
  return n
}
```

See: <https://jsdoc.app/index.html>

### Types

| Type                            | Description                           |
| ------------------------------- | ------------------------------------- |
| `@param {string=} n`            | Optional                              |
| `@param {string} [n]`           | Optional                              |
| `@param {(string|number)} n`    | Multiple types                        |
| `@param {*} n`                  | Any type                              |
| `@param {...string} n`          | Repeatable arguments                  |
| `@param {string} [n="hi"]`      | Optional with default                 |
| `@param {string[]} n`           | Array of strings                      |
| `@return {Promise<string[]>} n` | Promise fulfilled by array of strings |

See: <https://jsdoc.app/tags-type.html>

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

function play(song) {}
```

See: <https://jsdoc.app/tags-typedef.html>

### Typedef Shorthand

{% raw %}

```js
/**
 * A song
 * @typedef {{title: string, artist: string, year: number}} Song
 */
```

{% endraw %}

```js
/**
 * Plays a song
 * @param {Song} song - The {@link Song} to be played
 */

function play(song) {}
```

See: <https://jsdoc.app/tags-typedef.html>

### Importing types

```js
/**
 * @typedef {import('./Foo').default} Bar
 */

/**
 * @param {Bar} x
 */

function test(x) {}
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

See the full list: <https://jsdoc.app/index.html#block-tags>

### Renaming

```js
/*
 * @alias Foo.bar
 * @name Foo.bar
 */
```

Prefer `alias` over `name`. See: <https://jsdoc.app/tags-alias.html>
