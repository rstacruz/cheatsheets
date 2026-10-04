---
title: JSDoc
category: JavaScript
updated: 2026-10-04
weight: -1
intro: |
  JSDoc annotates JavaScript with `/** */` doc comments.
---

### Introduction
{: .-intro}

JSDoc annotates JavaScript with `/** */` doc comments.

- [JSDoc documentation](https://jsdoc.app/) _(jsdoc.app)_
- [Block tags](https://jsdoc.app/#block-tags) _(jsdoc.app)_

### Functions

```js
/**
 * This is a function.
 *
 * @param {string} n - A string param
 * @param {string} [o] - An optional string param
 * @param {string} [d=DefaultValue] - An optional string param
 * @return {string} A good string
 *
 * @example
 *
 *     foo('hello')
 */

function foo(n, o, d) {
  return n
}
```

See: [JSDoc documentation](https://jsdoc.app/) _(jsdoc.app)_

### Types

| Type                            | Description                           |
| ------------------------------- | ------------------------------------- |
| `@param {string=} n`            | Optional                              |
| `@param {string} [n]`           | Optional                              |
| `@param {string} [n="hi"]`      | Optional with default                 |
| ---                             | ---                                   |
| `@param {(string|number)} n`    | Multiple types                        |
| `@param {*} n`                  | Any type                              |
| `@param {...string} n`          | Repeatable arguments                  |
| `@param {string[]} n`           | Array of strings                      |
| ---                             | ---                                   |
| `@return {Promise<string[]>} n` | Promise fulfilled by array of strings |

See: [Type tags](https://jsdoc.app/tags-type) _(jsdoc.app)_

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

See: [@type](https://jsdoc.app/tags-type) _(jsdoc.app)_

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

See: [@typedef](https://jsdoc.app/tags-typedef) _(jsdoc.app)_

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

function play(song) {}
```

See: [@typedef](https://jsdoc.app/tags-typedef) _(jsdoc.app)_

### Importing types

```js
/**
 * @typedef {import('./Foo').default} Bar
 */

// or

/** @import { Bar } from "./Foo.js" */

/**
 * @param {Bar} x
 */

function test(x) {}
```

This syntax is [TypeScript-specific](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#import-types).

See: [JSDoc-supported types](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#import-types) _(typescriptlang.org)_

### Other keywords

```js
/**
 * @throws {FooException}
 * @async
 * @private
 * @deprecated
 * @see
 * @example
 * @todo
 *
 * @function
 * @class
 */
```

See: [Block tags](https://jsdoc.app/#block-tags) _(jsdoc.app)_

### Renaming

```js
/**
 * @alias Foo.bar
 * @name Foo.bar
 */
```

Prefer `alias` over `name`.

See: [@alias](https://jsdoc.app/tags-alias) _(jsdoc.app)_
