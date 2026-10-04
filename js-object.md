---
title: JavaScript Objects
category: JavaScript
weight: -3
updated: 2026-10-04
intro: |
  Creating, reading, and transforming plain JavaScript objects.
---

## Basics

### Introduction
{: .-intro}

Objects are collections of key-value pairs; keys are strings or symbols.

- [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) _(developer.mozilla.org)_
- [Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring) _(developer.mozilla.org)_

### Literals

```js
const defaults = { color: 'red', size: 'md' }
const name = 'Ada'

const user = {
  name,                      // → name: 'Ada'
  ['role' + 'Id']: 7,        // computed → roleId: 7
  greet() { return 'hi' },   // method shorthand
}
```
{: data-line="5-7"}

```js
const opts = { ...defaults, visible: true }
// → { color: 'red', size: 'md', visible: true }
```

Shorthand uses the variable name as the key; spread copies own enumerable properties.

See: [Object initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer), [Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) _(developer.mozilla.org)_

### Accessing

```js
user.name                // → 'Ada'  (dot)
user['name']             // → 'Ada'  (bracket)
user[key]                // dynamic key from a variable
user.address?.city       // → undefined if no address
user.nickname ?? 'anon'  // → 'anon' when null/undefined
```
{: data-line="4-5"}

```js
const { a, b = 1, ...rest } = obj
const { name: who = 'anon' } = user
```

Bracket access takes any expression; `?.` short-circuits on `null` or `undefined`.

See: [Property accessors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors), [Optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining), [Nullish coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing) _(developer.mozilla.org)_

### Checking keys

```js
'name' in user                   // → true (own or inherited)
Object.hasOwn(user, 'name')      // → true (own only, ES2022)
Object.hasOwn(user, 'toString')  // → false
```

`in` walks the prototype chain; `Object.hasOwn()` checks own properties only. Older code uses `Object.prototype.hasOwnProperty.call()`.

See: [in operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in), [Object.hasOwn()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn) _(developer.mozilla.org)_

### Setting and deleting

```js
user.age = 36            // set with dot
user[key] = value        // computed key
user.age += 1            // update in place
delete user.age          // → true
'age' in user            // → false
```
{: data-line="4"}

Assigning a computed key adds or overwrites a property; `delete` removes one.

See: [delete operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete) _(developer.mozilla.org)_

## Operations

### Static methods

| Call                    | Returns                    |
| ---                     | ---                        |
| `Object.keys(obj)`      | own enumerable keys        |
| `Object.values(obj)`    | own enumerable values      |
| `Object.entries(obj)`   | `[key, value]` pairs       |
| `Object.fromEntries(e)` | object from pairs          |
| ---                     | ---                        |
| `Object.assign(t, s)`   | target with sources merged |
| `Object.freeze(obj)`    | obj, then immutable        |
| `Object.seal(obj)`      | obj, no add or remove      |
| `Object.create(proto)`  | object with given proto    |

`fromEntries()` reverses `entries()`; `freeze()` and `seal()` are shallow.

See: [Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys), [Object.fromEntries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries), [Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) _(developer.mozilla.org)_

### Iterating

```js
for (const [key, value] of Object.entries(user)) {
  console.log(key, value)
}

Object.entries(user).forEach(([key, value]) => {
  console.log(key, value)
})
```

`Object.entries()` with `for...of` visits own enumerable keys only. Prefer it over `for...in`, which also walks inherited keys.

See: [Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries), [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) _(developer.mozilla.org)_

### Copying

```js
const shallow = { ...user }                       // own props
const merged = Object.assign({}, user, extra)
const deep = structuredClone(user)                // nested objects
const viaJson = JSON.parse(JSON.stringify(user))  // loses dates
```

Spread and `Object.assign()` are shallow; `structuredClone()` (Node 17+) copies nested objects. JSON round-trips lose dates, functions, and `undefined`.

See: [Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax), [Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign), [structuredClone()](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone) _(developer.mozilla.org)_

### Comparing

```js
const a = { x: 1 }
const b = { x: 1 }
a === b               // → false, different references
Object.is(NaN, NaN)   // → true
Object.is(0, -0)      // → false
```
{: data-line="3"}

`===` compares object identity, not contents; `Object.is()` treats `NaN` as equal to itself.

See: [Strict equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality), [Object.is()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) _(developer.mozilla.org)_
