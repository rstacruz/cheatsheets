---
title: Go
prism_languages: [go, bash]
weight: -3
category: C-like
updated: 2026-11-11
tier: t1
links:
  - title: A tour of Go
    url: https://go.dev/tour/welcome/1
  - title: Go playground
    url: https://go.dev/play/
  - title: Go wiki
    url: https://go.dev/wiki/
---

## Getting started

<!-- {: .-three-column} -->

### Hello world

<!-- {: .-prime} -->

#### hello.go

<!-- {: .-file} -->

```go
package main

import "fmt"

func main() {
  message := greetMe("world")
  fmt.Println(message)
}

func greetMe(name string) string {
  return "Hello, " + name + "!"
}
```

```bash
$ go mod init hello
$ go run .
```

Or try it in the [Go playground](https://go.dev/play/).

### Commands

| Command | Description |
| --- | --- |
| `go run .` | Build and run |
| `go build` | Compile package |
| `go test ./...` | Run tests |
| `go vet ./...` | Report likely bugs |
| `go fmt ./...` | Format packages |
| `go mod tidy` | Sync dependencies |
| `go doc fmt.Println` | Show documentation |

`go work init` starts a workspace; `go tool pprof` profiles a binary.

`GOTOOLCHAIN=auto` lets `go.mod` pick a newer toolchain; `go telemetry local` keeps counters local.

See: [go command](https://pkg.go.dev/cmd/go)

### Variables

#### Variable declaration

```go
var msg string
var msg = "Hello, world!"
var msg string = "Hello, world!"
var x, y int
var x, y int = 1, 2
var x, msg = 1, "Hello, world!"
```

#### Declaration list

```go
var (
  x int
  y = 20
  z int = 30
  d, e = 40, "Hello"
  f, g string
)
```

#### Shortcut of above (infers type)

```go
msg := "Hello"
x, msg := 1, "Hello"
```

Short declarations infer the type and only work inside functions.

See: [Variables](https://go.dev/tour/basics/8)

### Constants

```go
const Phi = 1.618
const Size int64 = 1024
const x, y = 1, 2
const (
  Pi = 3.14
  E  = 2.718
)
const (
  Sunday = iota
  Monday
  Tuesday
  Wednesday
  Thursday
  Friday
  Saturday
)
```

Constants can be character, string, boolean, or numeric values.

See: [Constants](https://go.dev/tour/basics/15)

## Basic types

<!-- {: .-three-column} -->

### Strings

```go
str := "Hello"
```

```go
str := `Multiline
string`
```

Strings are of type `string`.

See: [String types](https://go.dev/ref/spec#String_types)

### Numbers

#### Typical types

```go
num := 3          // int
num := 3.0        // float64
num := 3 + 4i     // complex128
num := byte('a')  // uint8 alias
num := 'a'        // rune (int32)
```

#### Other types

```go
var u uint = 7        // unsigned
var p float32 = 22.7  // 32-bit float
```

#### Built-ins

```go
lo := min(3, 9)   // 3
hi := max(3, 9)   // 9
```

`byte` and `rune` are aliases for `uint8` and `int32`.

See: [Numeric types](https://go.dev/ref/spec#Numeric_types)

### Arrays

```go
// var numbers [5]int
numbers := [...]int{0, 0, 0, 0, 0}
```

Arrays have a fixed size.

See: [Arrays](https://go.dev/tour/moretypes/6)

### Slices

```go
slice := []int{2, 3, 4}
```

```go
slice := []byte("Hello")
```

```go
s := make([]int, 3, 5)  // len 3, cap 5
s = append(s, 4)
```

Slices have a dynamic size, unlike arrays.

```go
s := []int{3, 1, 2}
slices.Sort(s)        // [1 2 3]
slices.Contains(s, 2) // true
```

The `slices` package has generic helpers for sorting and searching.

See: [Slices](https://go.dev/tour/moretypes/7), [slices package](https://pkg.go.dev/slices)

### Maps

```go
m := map[string]int{"a": 1}
m["b"] = 2
delete(m, "a")
v, ok := m["b"]  // comma-ok
clear(m)
```

A missing key returns the zero value; `ok` reports whether it exists.

See: [Maps](https://go.dev/tour/moretypes/19), [maps package](https://pkg.go.dev/maps)

### Pointers

```go
func main() {
  b := *getPointer()
  fmt.Println("Value is", b)
}
```

<!-- {: data-line="2"} -->

```go
func getPointer() (p *int) {
  a := 234
  return &a
}
```

<!-- {: data-line="3"} -->

```go
p := new(int)
*p = 234
```

<!-- {: data-line="2"} -->

Pointers point to a memory location of a variable. Go is fully garbage-collected and has no pointer arithmetic.

```go
q := new(42)  // pointer to 42
```

Since Go 1.26, `new` accepts an expression as the initial value.

See: [Pointers](https://go.dev/tour/moretypes/1)

### Type conversions

```go
i := 2
f := float64(i)
u := uint(i)
```

See: [Type conversions](https://go.dev/tour/basics/13)

## Flow control

<!-- {: .-three-column} -->

### Conditional

```go
if day == "sunday" || day == "saturday" {
  rest()
} else if day == "monday" && isTired() {
  groan()
} else {
  work()
}
```

<!-- {: data-line="1,3,5"} -->

See: [If](https://go.dev/tour/flowcontrol/5)

### Statements in if

```go
if _, err := doThing(); err != nil {
  fmt.Println("Uh oh")
}
```

<!-- {: data-line="1"} -->

An `if` can run a statement before the condition. Its variables are scoped to the `if`.

See: [If with a short statement](https://go.dev/tour/flowcontrol/6)

### Switch

```go
switch day {
case "sunday":
  // cases don't fall through by default
  fallthrough
case "saturday":
  rest()
default:
  work()
}
```

See: [Switch](https://go.dev/wiki/Switch)

### For loop

```go
for count := 0; count <= 10; count++ {
  fmt.Println("My counter is at", count)
}
```

```go
for i := range 3 {
  fmt.Println(i)  // 0 1 2
}
```

Since Go 1.22 the range clause also accepts an integer.

```go
nums := slices.Values([]int{1, 2, 3})
for n := range nums {
  fmt.Println(n)
}
```

Since Go 1.23 it also accepts an iterator function.

See: [For statements](https://go.dev/ref/spec#For_statements), [iter package](https://pkg.go.dev/iter)

### For-range loop

```go
entry := []string{"Jack", "John"}
for i, val := range entry {
  fmt.Printf("%d: %s\n", i, val)
}
```

Since Go 1.22 each iteration gets its own loop variables.

See: [For statements](https://go.dev/ref/spec#For_statements), [Range](https://go.dev/tour/moretypes/16)

### While loop

```go
n := 0
for n < 42 {
  n += guess()
}
```

That's Go's only loop: `for` with just a condition.

See: [Go's "while"](https://go.dev/tour/flowcontrol/3)

## Functions

<!-- {: .-three-column} -->

### Lambdas

```go
myfunc := func() bool {
  return x > 10000
}
```

<!-- {: data-line="1"} -->

Functions are first-class objects.

See: [Function literals](https://go.dev/ref/spec#Function_literals)

### Multiple return types

```go
a, b := getMessage()
```

```go
func getMessage() (a, b string) {
  return "Hello", "World"
}
```

<!-- {: data-line="2"} -->

See: [Multiple results](https://go.dev/tour/basics/6)

### Named return values

```go
func split(sum int) (x, y int) {
  x = sum * 4 / 9
  y = sum - x
  return
}
```

<!-- {: data-line="4"} -->

By defining the return value names in the signature, a `return` (no args) will return variables with those names.

See: [Named return values](https://go.dev/tour/basics/7)

### Variadic functions

```go
func sum(nums ...int) int {
  total := 0
  for _, n := range nums {
    total += n
  }
  return total
}
```

```go
sum(1, 2, 3)
```

See: [Variadic functions](https://go.dev/ref/spec#Passing_arguments_to_..._parameters)

## Generics

### Type parameters

```go
func Map[T, U any](xs []T, f func(T) U) []U {
  out := make([]U, 0, len(xs))
  for _, x := range xs {
    out = append(out, f(x))
  }
  return out
}
```

```go
type Stack[T any] struct {
  items []T
}
```

```go
func (s *Stack[T]) Map[U any](f func(T) U) []U {
  out := make([]U, 0, len(s.items))
  for _, v := range s.items {
    out = append(out, f(v))
  }
  return out
}
```

Go 1.27 allows methods to declare their own type parameters.

```go
type Set[T comparable] = map[T]struct{}
```

Since Go 1.24 a type alias may take type parameters.

See: [Type parameters](https://go.dev/tour/generics/1), [Generic methods](https://go.dev/doc/go1.27#language), [Alias declarations](https://go.dev/ref/spec#Alias_declarations)

### Constraints

```go
type Number interface {
  ~int | ~int64 | ~float64
}

func Sum[T Number](xs []T) T {
  var total T
  for _, x := range xs {
    total += x
  }
  return total
}
```

`~T` accepts any type whose underlying type is `T`.

See: [Type constraints](https://go.dev/ref/spec#Type_constraints)

## Packages

<!-- {: .-three-column} -->

### Importing

```go
import "fmt"
import "math/rand"
```

```go
import (
  "fmt"        // gives fmt.Println
  "math/rand"  // gives rand.Intn
)
```

Both are the same.

See: [Importing](https://go.dev/tour/basics/2)

### Aliases

```go
import r "math/rand"
import _ "embed"  // side effects
```

<!-- {: data-line="1"} -->

```go
r.Intn()
```

A `_` alias imports a package only for its side effects.

See: [Import declarations](https://go.dev/ref/spec#Import_declarations)

### Exporting names

```go
func Hello() {
  // ...
}
```

Exported names begin with capital letters.

See: [Exported names](https://go.dev/tour/basics/3)

### Packages

```go
package hello
```

Every package file has to start with `package`.

See: [Packages](https://go.dev/tour/basics/1)

## Concurrency

<!-- {: .-three-column} -->

### Goroutines

```go
func main() {
  // A "channel"
  ch := make(chan string)

  // Start concurrent routines
  go push("Moe", ch)
  go push("Larry", ch)
  go push("Curly", ch)

  // Read 3 results
  // (Since our goroutines are concurrent,
  // the order isn't guaranteed!)
  fmt.Println(<-ch, <-ch, <-ch)
}
```

<!-- {: data-line="3,6,7,8,13"} -->

```go
func push(name string, ch chan string) {
  msg := "Hey, " + name
  ch <- msg
}
```

<!-- {: data-line="3"} -->

Channels are concurrency-safe communication objects, used in goroutines.

Goroutines run on `GOMAXPROCS` threads; since Go 1.25 that follows the container's CPU limit on Linux.

See: [Goroutines](https://go.dev/tour/concurrency/1), [Channels](https://go.dev/tour/concurrency/2)

### Buffered channels

```go
ch := make(chan int, 2)
ch <- 1
ch <- 2
ch <- 3
// fatal error:
// all goroutines are asleep - deadlock!
```

<!-- {: data-line="1"} -->

Buffered channels limit the number of messages they can hold.

See: [Buffered channels](https://go.dev/tour/concurrency/3)

### Select

```go
select {
case msg := <-ch:
  fmt.Println(msg)
case <-time.After(time.Second):
  fmt.Println("timeout")
}
```

`select` waits on multiple channel operations and runs the first ready one.

See: [Select](https://go.dev/tour/concurrency/5)

### Closing channels

#### Closes a channel

```go
ch <- 1
ch <- 2
ch <- 3
close(ch)
```

<!-- {: data-line="4"} -->

#### Iterates across a channel until closed

```go
for i := range ch {
  // ...
}
```

<!-- {: data-line="1"} -->

#### Closed if `ok == false`

```go
v, ok := <-ch
```

See: [Range and close](https://go.dev/tour/concurrency/4)

### WaitGroup

```go
import "sync"

func main() {
  var wg sync.WaitGroup

  for _, item := range items {
    wg.Go(func() {
      doOperation(item)
    })
  }
  wg.Wait()
}
```

<!-- {: data-line="1,4,7,11"} -->

`wg.Go` (Go 1.25+) adds and runs a task; `Add` and `Done` still work.

See: [WaitGroup](https://pkg.go.dev/sync#WaitGroup)

### Mutex

```go
var mu sync.Mutex
var count int

func inc() {
  mu.Lock()
  defer mu.Unlock()
  count++
}
```

A `sync.Mutex` serialises access to shared state.

See: [Mutex](https://pkg.go.dev/sync#Mutex)

## Error control

### Errors

```go
err := errors.New("not found")
err = fmt.Errorf("load %q: %w", name, err)
```

```go
if errors.Is(err, os.ErrNotExist) {
  // ...
}
```

<!-- {: data-line="2"} -->

```go
var pathErr *fs.PathError
if errors.As(err, &pathErr) {
  fmt.Println(pathErr.Path)
}
```

```go
err = errors.Join(err1, err2)
```

`%w` wraps an error so `errors.Is` and `errors.As` can inspect it.

See: [errors package](https://pkg.go.dev/errors)

### Defer

```go
func main() {
  defer fmt.Println("Done")
  fmt.Println("Working...")
}
```

<!-- {: data-line="2"} -->

`defer` runs a function when the surrounding function returns.
Arguments are evaluated immediately, but the call runs later.

See: [Defer, panic and recover](https://go.dev/blog/defer-panic-and-recover)

### Deferring functions

```go
func main() {
  defer func() {
    fmt.Println("Done")
  }()
  fmt.Println("Working...")
}
```

<!-- {: data-line="2,3,4"} -->

Lambdas are better suited for defer blocks.

```go
func main() {
  var d = int64(0)
  defer func(d *int64) {
    fmt.Printf("& %v Unix Sec\n", *d)
  }(&d)
  fmt.Print("Done ")
  d = time.Now().Unix()
}
```

<!-- {: data-line="3,4,5"} -->

Arguments are evaluated when `defer` runs; a pointer argument still sees the final value.

See: [Defer, panic and recover](https://go.dev/blog/defer-panic-and-recover)

### Panic and recover

```go
defer func() {
  if r := recover(); r != nil {
    fmt.Println("recovered:", r)
  }
}()

panic("boom")
```

`recover` stops a panic and returns its value, but only inside a deferred function.

See: [Defer, panic and recover](https://go.dev/blog/defer-panic-and-recover)

## Structs

<!-- {: .-three-column} -->

### Defining

```go
type Vertex struct {
  X int
  Y int
}
```

<!-- {: data-line="1,2,3,4"} -->

```go
func main() {
  v := Vertex{1, 2}
  v.X = 4
  fmt.Println(v.X, v.Y)
}
```

See: [Structs](https://go.dev/tour/moretypes/2)

### Literals

```go
v := Vertex{X: 1, Y: 2}
```

```go
// Field names can be omitted
v := Vertex{1, 2}
```

```go
// Y is implicit
v := Vertex{X: 1}
```

You can also specify field names.

See: [Struct literals](https://go.dev/tour/moretypes/5)

### Pointers to structs

```go
v := &Vertex{1, 2}
v.X = 2
```

Doing `v.X` is the same as doing `(*v).X`, when `v` is a pointer.

See: [Pointers to structs](https://go.dev/tour/moretypes/4)

### Embedding

```go
type Base struct {
  ID int
}

type User struct {
  Base
  Name string
}

u := User{
  Base: Base{ID: 7},
  Name: "Ada",
}
fmt.Println(u.ID)  // promoted field
```

Embedding promotes the fields and methods of the embedded type.

See: [Embedding](https://go.dev/doc/effective_go#embedding)

## Methods

### Receivers

```go
type Vertex struct {
  X, Y float64
}
```

```go
func (v Vertex) Abs() float64 {
  return math.Sqrt(v.X * v.X + v.Y * v.Y)
}
```

<!-- {: data-line="1"} -->

```go
v := Vertex{1, 2}
v.Abs()
```

There are no classes, but you can define functions with _receivers_.

See: [Methods](https://go.dev/tour/methods/1)

### Mutation

```go
func (v *Vertex) Scale(f float64) {
  v.X = v.X * f
  v.Y = v.Y * f
}
```

<!-- {: data-line="1"} -->

```go
v := Vertex{6, 12}
v.Scale(0.5)
// `v` is updated
```

By defining your receiver as a pointer (`*Vertex`), you can do mutations.

See: [Pointer receivers](https://go.dev/tour/methods/4)

## Interfaces

### A basic interface

```go
type Shape interface {
  Area() float64
  Perimeter() float64
}
```

See: [Interfaces](https://go.dev/tour/methods/9)

### Implicit implementation

```go
type Rectangle struct {
  Length, Width float64
}
```

Struct `Rectangle` implicitly implements interface `Shape` by implementing all of its methods.

See: [Interfaces are implemented implicitly](https://go.dev/tour/methods/10)

### Methods

```go
func (r Rectangle) Area() float64 {
  return r.Length * r.Width
}

func (r Rectangle) Perimeter() float64 {
  return 2 * (r.Length + r.Width)
}
```

The methods defined in `Shape` are implemented in `Rectangle`.

See: [Method sets](https://go.dev/ref/spec#Method_sets)

### Interface example

```go
func main() {
  var r Shape = Rectangle{Length: 3, Width: 4}
  fmt.Printf("%T %v %v\n", r, r.Area(), r.Perimeter())
}
```

See: [Interface values](https://go.dev/tour/methods/11)

### Type assertions

```go
var v any = "hello"  // any = interface{}

s, ok := v.(string)  // comma-ok
fmt.Println(s, ok)
```

```go
switch x := v.(type) {
case string:
  fmt.Println("string", x)
case int:
  fmt.Println("int", x)
}
```

`any` is an alias for `interface{}`, added in Go 1.18.

See: [Type assertions](https://go.dev/ref/spec#Type_assertions), [Type switches](https://go.dev/ref/spec#Type_switches)

## References

### Official resources

<!-- {: .-intro} -->

- [A tour of Go](https://go.dev/tour/welcome/1) _(go.dev)_
- [Go wiki](https://go.dev/wiki/) _(go.dev)_
- [Effective Go](https://go.dev/doc/effective_go) _(go.dev)_

### Other links

<!-- {: .-intro} -->

- [Go by Example](https://gobyexample.com/) _(gobyexample.com)_
- [Awesome Go](https://awesome-go.com/) _(awesome-go.com)_
- [JustForFunc YouTube](https://www.youtube.com/channel/UC_BzFbxG2za3bp5NRRRXJSw) _(youtube.com)_
- [Style Guide](https://go.dev/wiki/CodeReviewComments) _(go.dev)_
