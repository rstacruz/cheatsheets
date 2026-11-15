---
title: TypeScript
category: JavaScript libraries
tier: t1
tags: [Featured]
updated: 2026-11-11
intro: |
  TypeScript adds static types to JavaScript; types are erased at build time.

  `tsc` 7 is the native compiler; defaults are `strict`, `module: esnext` and `target: es2025`.
links:
  - title: TypeScript Handbook
    url: https://www.typescriptlang.org/docs/handbook/intro.html
---

## Basics

### Basic types

#### Primitives

| Type | Example |
| --- | --- |
| `string` | `'Ada'` |
| `number` | `42` |
| `boolean` | `true` |
| `bigint` | `42n` |
| `symbol` | `Symbol('id')` |
| `null` / `undefined` | `null` |
| `object` | `{ id: 1 }` |

#### Special types

| Type | Meaning |
| --- | --- |
| `any` | opts out of checking |
| `unknown` | top type; safe `any`, narrow first |
| `void` | no return value |
| `never` | bottom type; unreachable |

```ts
let tags: string[] = ['a', 'b']
let pair: [string, number] = ['a', 1]

let id: string | number = 1
let input: unknown = JSON.parse(json)

function fail(msg: string): never {
  throw new Error(msg)
}
```

See: [Everyday types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

### Enums

```ts
enum Color {
  Red,
  Green = 4,
}

let c: Color = Color.Green
```

Numeric enums are union enums; enums are not erasable syntax.

See: [Enums](https://www.typescriptlang.org/docs/handbook/enums.html)

### Declarations

```ts
const pi = 3.14          // type 3.14, not number
let total: number = 0

function add(a: number, b: number): number {
  return a + b
}

const double = (n: number) => n * 2
```

See: [Variable declarations](https://www.typescriptlang.org/docs/handbook/variable-declarations.html)

### Type assertions

```ts
declare const value: unknown

const input = value as string
const len = (input as string).length
const upper = (<string>value).toUpperCase()  // not in .tsx
```

`as` is preferred; angle brackets do not work in `.tsx` files.

See: [Type assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)

## Interfaces

### Inline

```ts
function printLabel(options: { label: string }) {
  console.log(options.label)
}
```

See: [Object types](https://www.typescriptlang.org/docs/handbook/2/objects.html)

### Explicit

```ts
interface LabelOptions {
  label: string
}

function printLabel(options: LabelOptions) {
  console.log(options.label)
}
```

See: [Object types](https://www.typescriptlang.org/docs/handbook/2/objects.html)

### Optional properties

```ts
interface User {
  name: string
  age?: number
}
```

See: [Optional properties](https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties)

### Readonly properties

```ts
interface User {
  readonly id: number
}
```

See: [Readonly properties](https://www.typescriptlang.org/docs/handbook/2/objects.html#readonly-properties)

### Index signatures

```ts
interface Dict {
  [key: string]: unknown[]
}
```

Same shape as `Record<string, unknown[]>`.

See: [Index signatures](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures)

## Type aliases

### Aliases

```ts
type Name = string | string[]
type Point = { x: number; y: number }
```

See: [Type aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)

### Intersections

```ts
interface Colorful { color: string }
interface Circle { radius: number }

type ColorfulCircle = Colorful & Circle
```

See: [Intersection types](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types)

### Literal types

```ts
type Direction = 'north' | 'south'
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6

const point = { x: 4, y: 2 } as const
// point: { readonly x: 4; readonly y: 2 }
```

See: [Literal types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)

## Type operators

### Indexed access

```ts
interface Building {
  room: {
    door: string
    walls: string[]
  }
}

type Walls = Building['room']['walls']  // string[]
```

See: [Indexed access types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)

### keyof

```ts
type Point = { x: number; y: number }

type P = keyof Point  // 'x' | 'y'
```

See: [keyof type operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)

### typeof

```ts
const user = { name: 'Ada', age: 36 }

type User = typeof user
// { name: string; age: number }
```

See: [typeof type operator](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html)

### Conditional types

```ts
type ToArray<T> = T extends unknown ? T[] : never

type StrOrNum = ToArray<string | number>
// string[] | number[]
```

See: [Conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)

### infer

```ts
type GetReturn<T> = T extends (...args: unknown[]) => infer R
  ? R
  : never

type Num = GetReturn<() => number>  // number
```

```ts
type First<T extends unknown[]> =
  T extends [infer F, ...unknown[]] ? F : never

type Str = First<['hello', 1]>  // 'hello'
```

See: [Inferring within conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)

### Template literal types

```ts
type Space = ' ' | '\n' | '\t'

type TrimLeft<S extends string> =
  S extends `${Space}${infer Rest}` ? TrimLeft<Rest> : S

type Trimmed = TrimLeft<'  hello'>  // 'hello'
```

See: [Template literal types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)

## Functions

### Function types

```ts
interface User { name: string }

function getUser(cb: (user: User) => void) {
  cb({ name: 'Ada' })
}

getUser(user => console.log(user.name))
```

See: [Function types](https://www.typescriptlang.org/docs/handbook/2/functions.html)

### this parameters

```ts
function object(
  this: { a: number; b: number },
  a: number,
  b: number
) {
  this.a = a
  this.b = b
  return this
}

const result = object.call({ a: 0, b: 0 }, 1, 2)
// result: { a: number; b: number }
```

See: [Declaring `this`](https://www.typescriptlang.org/docs/handbook/2/functions.html#declaring-this-in-a-function)

### Type predicates

```ts
function isString(x: unknown): x is string {
  return typeof x === 'string'
}

if (isString(value)) {
  value.toUpperCase()
}
```

```ts
const mixed = [1, 'a', 2]
const nums = mixed.filter(x => typeof x === 'number')
// number[] (inferred predicate, 5.5)
```

See: [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

## Classes

### Fields

```ts
class Point {
  x: number
  y: number
  static instances = 0

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    Point.instances++
  }
}
```

See: [Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)

### Inheritance

```ts
class Point3D extends Point {
  z: number

  constructor(x: number, y: number, z: number) {
    super(x, y)
    this.z = z
  }
}

interface Colored { color: string }

class Pixel extends Point3D implements Colored {
  color = '#000'
}
```

See: [Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)

### Parameter properties

```ts
class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}
}
```

Not erasable syntax; see [erasable syntax](#erasable-syntax).

See: [Parameter properties](https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties)

### Definite assignment

```ts
class Point {
  // assigned outside the constructor, e.g. in init()
  value!: number
}
```

See: [Strict property initialization](https://www.typescriptlang.org/docs/handbook/2/classes.html#--strictpropertyinitialization)

### Decorators

```ts
function logged(
  value: unknown,
  context: ClassMethodDecoratorContext
) {
  console.log(`decorating ${String(context.name)}`)
}

class Greeter {
  @logged greet() {
    return 'hi'
  }
}
```

See: [Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)

## Generics

### Generic classes

```ts
class Greeter<T> {
  greeting: T

  constructor(message: T) {
    this.greeting = message
  }
}

const greeter = new Greeter<string>('Hello')
```

See: [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

### Constraints

```ts
function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const name = pluck({ name: 'Ada' }, 'name')  // string
```

See: [Generic constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)

### Const type parameters

```ts
declare function tuple<const T extends readonly unknown[]>(
  xs: T,
): T

const t = tuple([1, 'a'])
// readonly [1, 'a']
```

See: [const type parameters](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#const-type-parameters)

## Modules

### Exports

```ts
export const pi = 3.14
export default class Circle {}
export type { User } from './user'
export type * from './types'
```

See: [Modules](https://www.typescriptlang.org/docs/handbook/2/modules.html)

### Type-only imports

```ts
import type { User } from './user'
import { createUser, type NewUser } from './user'
```

`verbatimModuleSyntax` keeps these imports as written.

See: [Type-only imports](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export)

### Compiler options

| Option | Use |
| --- | --- |
| `module: "nodenext"` | Node ESM and CJS resolution |
| `module: "node20"` | Node 20 module rules |
| `moduleResolution: "bundler"` | Bundler-style resolution |
| `verbatimModuleSyntax` | Keep imports as written |
| --- | --- |
| `noUncheckedIndexedAccess` | Index access includes `undefined` |
| `erasableSyntaxOnly` | Ban enums, namespaces, parameter properties |
| `isolatedDeclarations` | Require explicit types on exports |
| `rewriteRelativeImportExtensions` | Rewrite `.ts` paths to `.js` |

`target: es2025` is the 7.0 default; ES5 support was removed.

See: [TSConfig reference](https://www.typescriptlang.org/tsconfig/)

## Recent additions

### satisfies

```ts
type Palette = Record<string, string | number[]>

const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
} satisfies Palette

palette.red    // number[]
palette.green  // string
```

See: [satisfies](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator)

### Resource management

```ts
class Resource {
  [Symbol.dispose]() {
    console.log('closed')
  }
}

{
  using file = new Resource()
}  // logs "closed" at block exit
```

`using` and `await using` dispose resources at scope exit; add `esnext.disposable` to `lib`.

See: [using declarations](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#using-declarations-and-explicit-resource-management)

### Erasable syntax

| Syntax | Erasable? |
| --- | --- |
| `interface`, `type`, `as` | yes |
| `enum`, `namespace` | no |
| Parameter properties | no |
| `import x = require('x')` | no |

`--erasableSyntaxOnly` rejects non-erasable syntax so Node can strip types without a transpiler.

See: [erasableSyntaxOnly](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-8.html#the---erasablesyntaxonly-option)

## Utility types

### Object types

| Utility | Meaning |
| --- | --- |
| `Partial<T>` | All properties optional |
| `Required<T>` | All properties required |
| `Readonly<T>` | All properties readonly |
| `Pick<T, K>` | Only keys `K` |
| `Omit<T, K>` | All keys except `K` |
| `Record<K, V>` | Object with keys `K` |

See: [Utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

### Union and function types

| Utility | Meaning |
| --- | --- |
| `Exclude<T, U>` | Union members not in `U` |
| `Extract<T, U>` | Union members in `U` |
| `NonNullable<T>` | Remove `null` and `undefined` |
| `ReturnType<F>` | Function return type |
| `Parameters<F>` | Function parameter tuple |
| `Awaited<T>` | Unwrap a promise |
| `Uppercase<S>` | Uppercase string literal |

See: [Utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

## Also see

- [TypeScript documentation](https://www.typescriptlang.org/docs/)
- [TypeScript 7.0 announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)
- [TSConfig reference](https://www.typescriptlang.org/tsconfig/)
