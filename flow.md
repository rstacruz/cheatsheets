---
title: Flow
layout: 2017/sheet
category: JavaScript libraries
updated: 2017-08-26
---

### Simple failing example

```js
/* @flow */

function foo(x) { return x * 10 }
foo('Hello, world!')
```

### Annotations

```js
// Simple
function foo(x: string, y: number): string { ... }
```

```js
// Arrays
function total(numbers: Array<number>) { ... }
```

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

### Dynamic keys

```js
type Items = {
  [key: string]: Item
}
```

See: [Dynamic object keys](https://flow.org/docs/objects.html#objects-as-maps)

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
React$Element<any>
```

```js
class Foo extends React.Component {
  /*:: state: { open: boolean } */
  /*:: props: { open: boolean } */
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
var add: ((num1: number, num2: number) => number) = function (num1, num2) {
  return num1 + num2
}
```

You don't need to do this! It's inferred. This is better:

```js
var add = function (num1: number, num2: number) {
  return num1 + num2
}
```
