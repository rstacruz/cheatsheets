---
title: Jsdoc
category: JavaScript
layout: 2017/sheet
updated: 2017-10-29
weight: -1
---

### Functions

```js
/*
 * @param {string} n - A string param
 * @return {string} A good string
 *
 * @throws {FooException}
 * @private
 * @deprecated
 * @see
 *
 * @function
 * @class
 */

function foo(n) { return n }
```

See: <http://usejsdoc.org/index.html>

### Types

```
/**
 * @param {string=} n - Optional param
 * @param {string} [n] - Optional param
 * @param {(string|number)} n - Multiple types
 * @param {*} n - Any type
 * @param {...string} n - Repeatable arguments
 * @param {string} [n="hi"] - Optional param with default
 * @param {string[]} n - An array of strings
 */
```

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

## Typedef

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

### Renaming

```js
/*
 * @alias Foo.bar
 * @name Foo.bar
 */
```

Prefer `alias` over `name`. See: <http://usejsdoc.org/tags-alias.html>
