---
title: TypeScript
category: JavaScript libraries
---

TypeScript is just like ES2015 with type-checking. All ES2015 (classes, etc) should work.

## Basic types

```ts
any
void

boolean
number
string

null
undefined

string[]          /* or Array<string> */
[string, number]  /* tuple */

string | null | undefined   /* union */

never  /* unreachable */
```

```ts
enum Color {Red, Green, Blue = 4}
let c: Color = Color.Green
```

## Declarations

```ts
let isDone: boolean
let isDone: boolean = false
```

```ts
function add (a: number, b: number): number {
  return a + b
}

// Return type is optional
function add (a: number, b: number) { ... }
```

## Type assertions

#### Variables
```ts
let len: number = (input as string).length
let len: number = (<string> input).length  /* not allowed in JSX */
```

#### Functions
```ts
function object(this: {a: number, b: number}, a: number, b: number) {
  this.a = a;
  this.b = b;
  return this;
}

// this is used only for type declaration
let a = object(1,2);
// a has type {a: number, b: number}
```


## Interfaces

### Inline

```ts
function printLabel (options: { label: string }) {
  console.log(options.label)
}

// Note the semicolon
function getUser (): { name: string; age?: number } {
}
```

### Explicit

```ts
interface LabelOptions {
  label: string
}

function printLabel(options: LabelOptions) { ... }
```

### Optional properties

```ts
interface User {
  name: string,
  age?: number
}
```

### Read only

```ts
interface User {
  readonly name: string
}
```

### Dynamic keys

```ts
{
  [key: string]: Object[]
}
```

## Type aliases

```ts
type Name = string | string[]
```

## Function types

```ts
interface User { ... }

function getUser(callback: (user: User) => any) { callback({...}) }

getUser(function (user: User) { ... })
```

## Classes

```ts
class Point {
  x: number
  y: number
  static instances = 0
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}
```

#### Inheritance

```ts
class Point {...}

class Point3D extends Point {...}

interface Colored {...}

class Pixel extends Point implements Colored {...}
```

#### Short fields initialisation

```ts
class Point {
  static instances = 0;
  constructor(
    public x: number,
    public y: number,
  ){}
}
```

#### Fields which do not require initialisation
```ts
class Point {
  public someUselessValue!: number;
  ...
}
```

## Generics

```ts
class Greeter<T> {
  greeting: T
  constructor(message: T) {
    this.greeting = message
  }
}

let greeter = new Greeter<string>('Hello, world')
```

## Modules

```ts
export interface User { ... }
```

## Type extraction

```ts
interface Building {
  room: {
    door: string,
    walls: string[],
  };
}

type Walls = Building['room']['walls']; // string[]
```
