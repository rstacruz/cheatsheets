---
title: JSDoc
subtitle: Doc comment annotation syntax
category: JavaScript
updated: 2026-11-25
last_verified_with: "JSDoc 4.0.5, TypeScript 7.0.2."
tier: t3
weight: -1
intro: |
  JSDoc annotates JavaScript with `/** */` doc comments.

links:
  - title: JSDoc documentation
    url: https://jsdoc.app/
  - title: Block tags
    url: https://jsdoc.app/#block-tags
---

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
<!-- {: data-highlight="@param"} -->

`@param` and `@return` name the inputs and output; brackets mark optional parameters.

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

Types go in braces; `|` joins alternatives and `...` marks rest arguments.

See: [Type tags](https://jsdoc.app/tags-type) _(jsdoc.app)_

### Variables

#### @type

```js
/**
 * @type {number}
 */
var FOO = 1
```
<!-- {: data-highlight="@type {number}"} -->

#### @const

```js
/**
 * @const {number}
 */
const FOO = 1
```
<!-- {: data-highlight="@const {number}"} -->

`@type` documents a value's type; `@const` marks a constant binding.

See: [@type](https://jsdoc.app/tags-type), [@const](https://jsdoc.app/tags-const) _(jsdoc.app)_

### Typedef

#### Define the shape

```js
/**
 * A song
 * @typedef {Object} Song
 * @property {string} title - The title
 * @property {string} artist - The artist
 * @property {number} year - The year
 */
```
<!-- {: data-highlight="@typedef {Object}"} -->

#### Use the type

```js
/**
 * Plays a song
 * @param {Song} song - The {@link Song} to be played
 */

function play(song) {}
```
<!-- {: data-highlight="{@link Song}"} -->

`@typedef` names an object shape; `@property` describes each field.

See: [@typedef](https://jsdoc.app/tags-typedef) _(jsdoc.app)_

### Typedef shorthand

#### Inline shape

```js
/**
 * A song
 * @typedef {{title: string, artist: string, year: number}} Song
 */
```
<!-- {: data-highlight="@typedef {{title"} -->

#### Use the type

```js
/**
 * Plays a song
 * @param {Song} song - The {@link Song} to be played
 */

function play(song) {}
```
<!-- {: data-highlight="@param {Song} song"} -->

An inline object type avoids a separate `@property` list.

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
<!-- {: data-highlight="@import"} -->

`@import` is TypeScript 5.5+ syntax; JSDoc tooling also accepts `import()` types.

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
<!-- {: data-highlight="@throws"} -->

`@throws`, `@deprecated`, `@see`, and `@example` describe behavior in prose.

See: [Block tags](https://jsdoc.app/#block-tags) _(jsdoc.app)_

### Renaming

```js
/**
 * @alias Foo.bar
 * @name Foo.bar
 */
```
<!-- {: data-highlight="@alias"} -->

Prefer `alias` over `name`.

See: [@alias](https://jsdoc.app/tags-alias) _(jsdoc.app)_

## Also see

[JSDoc import types cheatsheet](./jsdoc-import-types)
<!-- {: .-crosslink} -->
