---
title: TypeScript
category: JavaScript libraries
tier: t1
tags: [Featured]
---

### About

TypeScript is just like ES2015 with type-checking. All ES2015 (classes, etc) should work.

See: [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

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

See: [Everyday types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html), [Enums](https://www.typescriptlang.org/docs/handbook/enums.html)

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

See: [Variable declarations](https://www.typescriptlang.org/docs/handbook/variable-declarations.html)

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

See: [Object types](https://www.typescriptlang.org/docs/handbook/2/objects.html)

### Explicit

```ts
interface LabelOptions {
  label: string
}

function printLabel(options: LabelOptions) { ... }
```

See: [Object types](https://www.typescriptlang.org/docs/handbook/2/objects.html)

### Optional properties

```ts
interface User {
  name: string;
  age?: number;
}
```

See: [Optional properties](https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties)

### Read only

```ts
interface User {
  readonly name: string
}
```

See: [readonly properties](https://www.typescriptlang.org/docs/handbook/2/objects.html#readonly-properties)

### Dynamic keys

```ts
{
  [key: string]: Object[]
}
```

See: [Index signatures](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures)

## Type aliases

### Type aliases

```ts
type Name = string | string[]
```

See: [Type aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)

### Intersection

```ts
interface Colorful { ... }

interface Circle { ... }
 
type ColorfulCircle = Colorful & Circle;
```

See: [Intersection types](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types)

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

See: [Inferring within conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)

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
