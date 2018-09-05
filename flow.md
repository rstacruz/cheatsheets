---
title: Flow
layout: 2017/sheet
category: JavaScript libraries
updated: 2017-09-20
weight: -3
tags: [Featurable]
---

## Getting started
{: .-three-column}

### Simple example
{: .-prime}

```js
/* @flow */
function square (n: number) {
  return n * n
}

const four = square(2)
```
{: data-line="1,2"}

Most of what you need to do is to simply add annotations to function arguments!

See: [flow.org docs](https://flow.org/en/docs/)

### Type inference

```js
function square (n: number) {
  const result = n * n
}
```
{: data-line="2"}

`result` is inferred to be a number because `number * number` will result in a number. There's no need to give it annotations.

### Type aliases

```js
type Person = {
  name: string,
  age: number,
  isAdmin: boolean,
  likes: Array<string>
}
```
{: data-line="1,2,3,4,5,6"}

```js
function greet(user: Person) {
  console.log('hello', user.name)
}
```
{: data-line="1"}

```js
greet({ name: 'Miles Davis', ··· })
```

This is the typical way to define the shape of complex objects.

### Variables

```js
const count: number = 200
```

You typically don't need to do this, function args are often enough.

See: [Variable types](https://flow.org/en/docs/types/variables/)

### Importing and exporting

```js
import type { Person } from './types'
```

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
{: data-line="2"}

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
{: data-line="2"}

```js
const a: Album = { } // ✓ OK
a.name = 'Blue'      // ✓ OK
a.name = null        // ✗ Error
a.name = undefined   // ✓ OK
```

This makes an `Album` valid even if `name` is not part of the keys. This is different from "maybe" types.

See: [Optional properties](https://flow.org/en/docs/types/primitives/#toc-optional-object-properties)

## Objects
{: .-three-column}

### Extra object fields

```js
type Artist = {
  name: string,
  label: string
}
```

```js
const a: Artist = {
  name: 'Miguel Migs',
  label: 'Naked Music'
}

a.genre = 'House' // ✓ OK
```
{: data-line="6"}

You can add more fields to an object.

See: [Width subtyping](https://flow.org/en/docs/lang/width-subtyping/)

### Exact object types

```js
type Artist = {|
  name: string,
  label: string
|}
```
{: data-line="1,4"}

```js
const a: Artist = { ··· }
a.genre = 'House' // ✗ Error
```
{: data-line="2"}

Exact object types prevent extra properties from being added to an object.

See: [Exact object types](https://flow.org/en/docs/types/objects/#toc-exact-object-types)

### Dynamic keys

```js
type Items = {
  [key: string]: Item
}
```
{: data-line="2"}

See: [Dynamic object keys](https://flow.org/docs/objects.html#objects-as-maps)

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

See: [Enums](https://flow.org/docs/utility-types.html#keyst)

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

See: [Type aliases](https://flow.org/docs/quick-reference.html#type-aliases)

### Generic classes

```js
class GenericClass<T> {
  x: T
  constructor (x: T) { ... }
}

var n: GenericClass<number> = new GenericClass(0)
```

See: [Generic classes](https://flow.org/docs/quick-reference.html#generics)

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

See: [Interfaces](https://flow.org/docs/quick-reference.html#interfaces)

### Functions

```js
const callback: () => void = function () {}
```

```js
function filter<T> (
  list: Array<T>,
  callback: (item: T) => boolean
): Array<T> {
  ···
}
```

See: [Functions](https://flow.org/docs/functions.html)

### Imports

```js
import type { Person } from '../person'
import typeof Config from '../config'
```

```js
export type Person = { id: string }
```

### Comment syntax

```js
/*::
  export type Foo = { ... }
*/

function add(n /*: number */) { ... }
```

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

### Function signature

```js
type Callback = (?Error, string) => any

function fetch (callback: Callback) {
  ···
}
```

## References

- [Flow website](https://www.saltycrane.com/flow-type-cheat-sheet/latest/) _(flow.org)_
- [Getting started with Flow](https://flow.org/en/docs/getting-started/) _(flow.org)_
- [Flow type cheatsheet](https://www.saltycrane.com/flow-type-cheat-sheet/latest/) _(saltycrane.com)_
