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
void

Array<T>
Class<T>
Function
Object
```

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
