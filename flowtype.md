---
title: Flow
---

### Simple failing example

```js
/* @flow */

function foo(x) { return x * 10; }
foo('Hello, world!');
```

### Annotations

```js
// Simple
function foo(x: string, y: number): string { ... }

// Arrays
function total(numbers: Array<number>) { ... }
```

### Primitives

```
any
boolean
mixed
number
string
void           // undefined
null           // null (but not undefined)

?number        // maybe (number | void | null)

{a: Number}    // object with a shape
[any, number]  // tuples (fixed-length arrays)

Array<T>
Class<T>
Function
Object
```

## [Type aliases](https://flowtype.org/docs/quick-reference.html#type-aliases)

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

## [Generic classes](https://flowtype.org/docs/quick-reference.html#generics)

```js
class GenericClass<T> {
  x: T;
  constructor (x: T) { ... }
}

var n: GenericClass<number> = new GenericClass(0)
```

## [Interfaces](https://flowtype.org/docs/quick-reference.html#interfaces)

```js
interface Jsonable {
  toJSON(): string
}

class Foo {
  toJSON() { return '{}' }
}

(new Foo: Jsonable)
```

## [Functions](https://flowtype.org/docs/functions.html)

```js
function createRenderer (): () => void {
  return function () { }
}
```


## Examples

```js
var myNumbers: Array<number> = [42]
function foo(): any { return 42 }
var b: boolean = false
var b: ?boolean = false  /* maybe */
var b: string | boolean = false  /* maybe */

var a: Class<MyClass> = MyClass
var b: MyClass = new a()

// Function signature
var add: ((num1: number, num2: number) => number) = function(num1, num2) {
  return num1 + num2;
};
```
