---
title: TypeScript
category: JavaScript libraries
---

### About

TypeScript is just like ES2015 with type-checking. All ES2015 (classes, etc) should work.

### Basic types

```ts
any
void

boolean
number
string

null
undefined

bigint
symbol

string[]          /* or Array<string> */
[string, number]  /* tuple */

string | null | undefined   /* union */

never  /* unreachable */
unknown
```

```ts
enum Color {
  Red,
  Green,
  Blue = 4
};

let c: Color = Color.Green
```

### Declarations

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
  name: string;
  age?: number;
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

### Type aliases

```ts
type Name = string | string[]
```

### Intersection

```ts
interface Colorful { ... }

interface Circle { ... }
 
type ColorfulCircle = Colorful & Circle;
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
    door: string;
    walls: string[];
  };
}

type Walls = Building['room']['walls']; // string[]
```

## Keyof Type Operator

```ts
type Point = { x: number; y: number };

type P = keyof Point; // x | y
```

## Conditional Types

```ts
// SomeType extends OtherType ? TrueType : FalseType;

type ToArray<T> = T extends any ? T[] : never;

type StrArrOrNumArr = ToArray<string | number>; // string[] | number[]
```

### Inferring

```ts
type GetReturnType<T> = T extends (...args: unknown[]) => infer R
  ? R
  : never;

type Num = GetReturnType<() => number>; // number
```

```ts
type First<T extends Array<any>> = T extends [infer F, ...infer Rest] ? F : never;

type Str = First<['hello', 1, false]>; // 'hello'
```

## Literal Type

```ts
const point = { x: 4, y: 2 }; // { x: number, y: number }

const literalPoint = { x: 4, y: 2 } as const; // { readonly x: 4, readonly y: 2 };
```

## Template Literal Types

```ts
type SpaceChar = ' ' | '\n' | '\t';

type TrimLeft<S extends string> = S extends `${SpaceChar}${infer Rest}` ? TrimLeft<Rest> : S;

type Str = TrimLeft<'    hello'>; // 'hello'
```
