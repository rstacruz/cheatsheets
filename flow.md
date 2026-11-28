---
title: Flow
subtitle: JavaScript type checker
logo: { src: /assets/logos/flow.svg }
category: Build tools
last_verified_with: "Flow 0.342."
created_at: 2017-08-29
updated: 2026-11-25
tier: t3
weight: -3
---

## Getting started

<!-- {: .-three-column} -->

### Simple example

<!-- {: .-prime} -->

```js
/* @flow */
function square (n: number) {
  return n * n
}

const four = square(2)
```

<!-- {: data-highlight="square"} -->

Most of what you need to do is to simply add annotations to function arguments!

See: [flow.org docs](https://flow.org/en/docs/)

### Type inference

```js
function square (n: number) {
  const result = n * n
}
```

<!-- {: data-highlight="const"} -->

`result` is inferred to be a number because `number * number` will result in a number. There's no need to give it annotations.

See: [Types and expressions](https://flow.org/en/docs/lang/types-and-expressions/)

### Type aliases

```js
type Person = {
  name: string,
  age: number,
  isAdmin: boolean,
  likes: Array<string>
}
```

<!-- {: data-highlight="type"} -->

#### Use the alias

```js
function greet(user: Person) {
  console.log('hello', user.name)
}
```

<!-- {: data-highlight="Person"} -->

#### Pass an object

```js
greet({ name: 'Miles Davis', ··· })
```

This is the typical way to define the shape of complex objects.

See: [Type aliases](https://flow.org/en/docs/types/aliases/)

### Variables

```js
const count: number = 200
```

You typically don't need to do this, function args are often enough.

See: [Variable types](https://flow.org/en/docs/lang/variables/)

### Importing and exporting

```js
import type { Person } from './types'
```

#### Export the type

```js
export type Person = {
  ···
}
```

See: [Module types](https://flow.org/en/docs/types/modules)

### Union types

```js
type Action = number | string
```

#### Literal unions

```js
type Direction = 'left' | 'right'
```

See: [Unions](https://flow.org/en/docs/types/unions/)

## Optionals

### Maybe types

```js
type Album = {
  name: ?string
}
```

<!-- {: data-highlight="name"} -->

#### Nullable values

```js
const a: Album = { }                 // ✗ Error
const a: Album = { name: 'Blue' }    // ✓ OK
const a: Album = { name: null }      // ✓ OK
const a: Album = { name: undefined } // ✓ OK
```

This makes `name` either a string or null.

See: [Maybe types](https://flow.org/en/docs/types/primitives/#toc-maybe-types)

### Optional properties

```js
type Album = {
  name?: string
}
```

<!-- {: data-highlight="string"} -->

#### Optional values

```js
const a: Album = { } // ✓ OK
a.name = 'Blue'      // ✓ OK
a.name = null        // ✗ Error
a.name = undefined   // ✓ OK
```

This makes an `Album` valid even if `name` is not part of the keys. This is different from "maybe" types.

See: [Optional properties](https://flow.org/en/docs/types/primitives/#toc-optional-object-properties)

## Objects

<!-- {: .-three-column} -->

### Width subtyping

```js
type Artist = {
  name: string,
  label: string
}
```

#### Extra properties

```js
const a: Artist = {
  name: 'Miguel Migs',
  label: 'Naked Music',
  genre: 'House' // ✓ OK
}
```

<!-- {: data-highlight="'House'"} -->

A type with more properties is "wider" and is a subtype of a "narrower" type.

See: [Subtypes](https://flow.org/en/docs/lang/subtypes/#toc-subtypes-of-objects)

### Exact object types

```js
type Artist = {|
  name: string,
  label: string
|}
```

<!-- {: data-highlight="Artist"} -->

#### Reject extras

```js
const a: Artist = {
  name: 'Miguel Migs',
  label: 'Naked Music',
  genre: 'House' // ✗ Error
}
```

<!-- {: data-highlight="genre"} -->

Exact object types prevent extra properties from being added to an object.

See: [Exact object types](https://flow.org/en/docs/types/objects/#exact-and-inexact-object-types)

### Dynamic keys

```js
type Items = {
  [key: string]: Item
}
```

<!-- {: data-highlight="key"} -->

See: [Dynamic object keys](https://flow.org/en/docs/types/objects/#toc-objects-as-maps)

## Advanced features

### Primitives

| Type            | Description                  |
| ---             | ---                          |
| `any`           |                              |
| `boolean`       |                              |
| `mixed`         |                              |
| `number`        |                              |
| `string`        |                              |
| `void`          | undefined                    |
| `null`          | null (but not undefined)     |
| ---             | ---                          |
| `{a: Number}`   | Object with a shape          |
| `[any, number]` | Tuples (fixed-length arrays) |
| ---             | ---                          |
| `Array<T>`      |                              |
| `Class<T>`      |                              |
| `Function`      |                              |
| `Object`        |                              |
| ---             | ---                          |
| `?number`       | Maybe (number, void, null)   |
| `a | b`         | Union types                  |

See: [Primitive types](https://flow.org/en/docs/types/primitives/)

### Enums

```js
type Suit = "Diamonds" | "Clubs" | "Hearts" | "Spades"

const countries = {
  US: "United States",
  IT: "Italy",
  FR: "France"
}

type Country = $Keys<typeof countries>
```

See: [Utility types ($Keys)](https://flow.org/en/docs/types/utilities/#toc-keys)

### Type aliases

```js
type Tree = {
  foo: string,
  bar: number,
  qux: (foo: string, bar: number) => boolean
}

type Generic<T> = {
  foo: T
}
```

See: [Type aliases](https://flow.org/en/docs/types/aliases/)

### Generic classes

```js
class GenericClass<T> {
  x: T
  constructor (x: T) { ... }
}

var n: GenericClass<number> = new GenericClass(0)
```

See: [Generic classes](https://flow.org/en/docs/types/generics/#toc-classes-with-generics)

### Interfaces

```js
interface Jsonable {
  toJSON(): string
}

class Foo {
  toJSON() { return '{}' }
}

(new Foo: Jsonable)
```

See: [Interfaces](https://flow.org/en/docs/types/interfaces/)

### Functions

```js
const callback: () => void = function () {}
```

#### Generic functions

```js
function filter<T> (
  list: Array<T>,
  callback: (item: T) => boolean
): Array<T> {
  ···
}
```

See: [Functions](https://flow.org/en/docs/types/functions/)

### Imports

```js
import type { Person } from '../person'
import typeof Config from '../config'
```

#### Export a type

```js
export type Person = { id: string }
```

See: [Module types](https://flow.org/en/docs/types/modules/)

### Comment syntax

```js
/*::
  export type Foo = { ... }
*/

function add(n /*: number */) { ... }
```

See: [Comment types](https://flow.org/en/docs/types/comments/)

### React

```js
type Props = {
  bar: number,
}

type State = {
  open: boolean,
}

class Foo extends React.Component<Props, State> {
  // Component code
}
```

See: [React types](https://flow.org/en/docs/react/)

## Examples

### Examples

```js
var myNumbers: Array<number> = [42]
function foo(): any { return 42 }
var b: boolean = false
var b: ?boolean = false  /* maybe */
var b: string | boolean = false

var a: Class<MyClass> = MyClass
var b: MyClass = new a()
```

See: [Class types](https://flow.org/en/docs/types/classes/)

### Function signature

```js
type Callback = (?Error, string) => any

function fetch (callback: Callback) {
  ···
}
```

See: [Function types](https://flow.org/en/docs/types/functions/)

## References

- [Flow website](https://www.saltycrane.com/flow-type-cheat-sheet/latest/) _(flow.org)_
- [Getting started with Flow](https://flow.org/en/docs/getting-started/) _(flow.org)_
- [Flow type cheatsheet](https://www.saltycrane.com/flow-type-cheat-sheet/latest/) _(saltycrane.com)_
