---
title: Elixir
subtitle: Functional language on BEAM
logo: { src: /assets/logos/elixir.svg, mono: true }
category: Elixir
tags: [New]
last_verified_with: "Elixir 1.20."
updated: 2026-11-25
tier: t3
weight: -10
---

## Getting started

<!-- {: .-three-column} -->

### Hello world

<!-- {: .-prime} -->

#### hello.exs

```elixir
defmodule Greeter do
  def greet(name) do
    message = "Hello, " <> name <> "!"
    IO.puts message
  end
end

Greeter.greet("world")
```

#### Run

```bash
elixir hello.exs
# Hello, world!
```

<!-- {: data-highlight="elixir"} -->

See: [Introduction](https://hexdocs.pm/elixir/introduction.html)

### Variables

```elixir
age = 23
```

See: [Basic types](https://hexdocs.pm/elixir/basic-types.html)

### Maps

```elixir
user = %{
  name: "John",
  city: "Melbourne"
}
```

#### Read a field

```elixir
IO.puts "Hello, " <> user.name
```

<!-- {: data-highlight="user.name"} -->

See: [Map](https://hexdocs.pm/elixir/Map.html)

### Lists

```elixir
users = [ "Tom", "Dick", "Harry" ]
```

<!-- {: data-highlight='"Harry"'} -->

#### Iterate

```elixir
Enum.map(users, fn user ->
  IO.puts "Hello " <> user
end)
```

See: [List](https://hexdocs.pm/elixir/List.html)

### Piping

```elixir
source
|> transform(:hello)
|> print()
```

<!-- {: data-highlight="transform"} -->

```elixir
# Same as:
print(transform(source, :hello))
```

These two are equivalent.

See: [Pipe operator](https://hexdocs.pm/elixir/Kernel.html#%7C%3E/2)

### Pattern matching

```elixir
user = %{name: "Tom", age: 23}
%{name: username} = user
```

<!-- {: data-highlight="username"} -->

This sets `username` to `"Tom"`.

See: [Patterns and guards](https://hexdocs.pm/elixir/patterns-and-guards.html#patterns)

### Pattern matching in functions

```elixir
def greet(%{name: username}) do
  IO.puts "Hello, " <> username
end

user = %{name: "Tom", age: 23}
```

<!-- {: data-highlight="greet"} -->

Pattern matching works in function parameters too.

See: [Patterns and guards](https://hexdocs.pm/elixir/patterns-and-guards.html#where-patterns-and-guards-can-be-used)

Control flow
------------

<!-- {: .-three-column} -->

### If

```elixir
if false do
  "This will never be seen"
else
  "This will"
end
```

See: [if](https://hexdocs.pm/elixir/Kernel.html#if/2)

### Case

```elixir
case {1, 2, 3} do
  {4, 5, 6} ->
    "This clause won't match"
  {1, x, 3} ->
    "This will match and bind x to 2"
  _ ->
   "This will match any value"
end
```

See: [case](https://hexdocs.pm/elixir/Kernel.SpecialForms.html#case/2)

### Cond

```elixir
cond do
  1 + 1 == 3 ->
    "I will never be seen"
  2 * 5 == 12 ->
    "Me neither"
  true ->
    "But I will (else)"
end
```

See: [cond](https://hexdocs.pm/elixir/Kernel.SpecialForms.html#cond/1)

### With

```elixir
iso = "2021-10-27T12:00:00Z"
with {:ok, {int, _asdf}} <-
       Integer.parse("123asdf"),
     {:ok, datetime, _utc_offset} <-
       DateTime.from_iso8601(iso) do
  DateTime.add(datetime, int, :second)
  # optional else clause; without it,
  # errors are returned
else
  :error ->
    "couldn't parse integer string"
  {:error, :invalid_format} ->
    "couldn't parse date string"
  _ ->
    "never hit; all errors handled"
end
```

See: [with](https://hexdocs.pm/elixir/Kernel.SpecialForms.html#with/1)

### Errors

```elixir
try do
  throw(:hello)
catch
  message -> "Got #{message}."
after
  IO.puts("I'm the after clause.")
end
```

See: [try](https://hexdocs.pm/elixir/Kernel.SpecialForms.html#try/1)

## Types

### Primitives

| Sample                  | Type            |
| ---                     | ---             |
| `nil`                   | Nil/null        |
| `true` _/_ `false`      | Boolean         |
| ---                     | ---             |
| `?a`                    | Integer (ASCII) |
| `23`                    | Integer         |
| `3.14`                  | Float           |
| ---                     | ---             |
| `'hello'`               | Charlist        |
| `<<2, 3>>`              | Binary          |
| `"hello"`               | Binary string   |
| `:hello`                | Atom            |
| ---                     | ---             |
| `[a, b]`                | List            |
| `{a, b}`                | Tuple           |
| ---                     | ---             |
| `%{a: "hello"}`         | Map             |
| `%MyStruct{a: "hello"}` | Struct          |
| `fn -> ... end`         | Function        |

See: [Basic types](https://hexdocs.pm/elixir/basic-types.html)

### Type checks

#### Atoms and functions

```elixir
is_atom/1
is_bitstring/1
is_boolean/1
is_function/1
is_function/2
is_integer/1
is_float/1
```

#### Binaries and collections

```elixir
is_binary/1
is_list/1
is_map/1
is_tuple/1
```

#### Other types

```elixir
is_nil/1
is_number/1
is_pid/1
is_port/1
is_reference/1
```

See: [Type checks](https://hexdocs.pm/elixir/Kernel.html#is_atom/1)

### Operators

```elixir
left != right   # equal
left !== right  # match
left ++ right   # concat lists
left <> right   # concat string/binary
left =~ right   # regexp
```

See: [Operators](https://hexdocs.pm/elixir/operators.html)

Modules
-------

### Importing

```elixir
require Redux   # compiles a module
import Redux    # compiles; use without the `Redux.` prefix

use Redux       # compiles, and runs Redux.__using__/1
use Redux, async: true

import Redux, only: [duplicate: 2]
import Redux, only: :functions
import Redux, only: :macros

import Foo.{Bar, Baz}
```

See: [import](https://hexdocs.pm/elixir/Kernel.SpecialForms.html#import/2)

### Aliases

```elixir
alias Foo.Bar, as: Bar
alias Foo.Bar   # same as above

alias Foo.{Bar, Baz}
```

See: [alias](https://hexdocs.pm/elixir/Kernel.SpecialForms.html#alias/2)

## String

### Functions

```elixir
import String
```

<!-- {: data-highlight="String"} -->

#### Usage

```elixir
str = "hello"
str |> length()        # → 5
str |> codepoints()    # → ["h", "e", "l", "l", "o"]
str |> slice(2..-1)    # → "llo"
str |> split(" ")      # → ["hello"]
str |> capitalize()    # → "Hello"
str |> match(regex)
```

See: [String](https://hexdocs.pm/elixir/String.html)

### Inspecting objects

```elixir
inspect(object, opts \\ [])
```

#### Pipelined

```elixir
value |> IO.inspect()
```

#### With a label

```elixir
value |> IO.inspect(label: "value")
```

See: [inspect](https://hexdocs.pm/elixir/Kernel.html#inspect/2)

## Numbers

### Operations

```elixir
abs(n)
round(n)
rem(a, b)   # remainder (modulo)
div(a, b)   # integer division
```

See: [abs/1](https://hexdocs.pm/elixir/Kernel.html#abs/1)

### Float

```elixir
import Float
```

<!-- {: data-highlight="Float"} -->

#### Set a value

```elixir
n = 10.3
```

<!-- {: data-highlight="10.3"} -->

#### Round and print

```elixir
n |> ceil()            # → 11.0
n |> ceil(2)           # → 11.30
n |> to_string()       # → "1.030000+e01"
n |> to_string([decimals: 2, compact: true])
```

#### Parse

```elixir
Float.parse("34")  # → { 34.0, "" }
```

See: [Float](https://hexdocs.pm/elixir/Float.html)

### Integer

```elixir
import Integer
```

<!-- {: data-highlight="Integer"} -->

#### Set a value

```elixir
n = 12
```

<!-- {: data-highlight="12"} -->

#### Convert

```elixir
n |> digits()         # → [1, 2]
n |> to_charlist()    # → '12'
n |> to_string()      # → "12"
n |> is_even()
n |> is_odd()
```

```elixir
# Different base:
n |> digits(2)        # → [1, 1, 0, 0]
n |> to_charlist(2)   # → '1100'
n |> to_string(2)     # → "1100"
```

#### Parse and rebuild

```elixir
parse("12")           # → {12, ""}
undigits([1, 2])      # → 12
```

See: [Integer](https://hexdocs.pm/elixir/Integer.html)

### Type casting

```elixir
Float.parse("34.1")    # → {34.1, ""}
Integer.parse("34")    # → {34, ""}
```

#### To strings

```elixir
Float.to_string(34.1)  # → "3.4100e+01"
Float.to_string(34.1, [decimals: 2, compact: true])  # → "34.1"
```

See: [Float.parse](https://hexdocs.pm/elixir/Float.html#parse/1)

## Map

### Defining

```elixir
m = %{name: "hi"}       # atom keys (:name)
m = %{"name" => "hi"}   # string keys ("name")
```

See: [Map](https://hexdocs.pm/elixir/Map.html)

### Updating

```elixir
import Map
```

<!-- {: data-highlight="Map"} -->

#### Existing key

```elixir
m = %{m | name: "yo"}  # key must exist
```

#### New keys

```elixir
m |> put(:id, 2)      # → %{id: 2, name: "hi"}
m |> put_new(:id, 2)  # only if `id` doesn't exist (`||=`)
```

#### Merge and change

```elixir
m |> put(:b, "Banana")
m |> merge(%{b: "Banana"})
m |> update(:a, &(&1 + 1))
m |> update(:a, fun a -> a + 1 end)
```

#### Read and update

```elixir
m |> get_and_update(:a, &(&1 || "default"))
# → {old, new}
```

See: [Map.put](https://hexdocs.pm/elixir/Map.html#put/3)

### Deleting

```elixir
m |> delete(:name)  # → %{}
m |> pop(:name)     # → {"John", %{}}
```

See: [Map.delete](https://hexdocs.pm/elixir/Map.html#delete/2)

### Reading

```elixir
m |> get(:id)       # → 1
m |> keys()         # → [:id, :name]
m |> values()       # → [1, "hi"]
```

#### To a list

```elixir
m |> to_list()      # → [id: 1, name: "hi"]
                    # → [{:id, 1}, {:name, "hi"}]
```

See: [Map.get](https://hexdocs.pm/elixir/Map.html#get/3)

### Deep

```elixir
put_in(map, [:b, :c], "Banana")
put_in(map[:b][:c], "Banana")    # via macros
```

#### get_and_update_in

```elixir
get_and_update_in(users, ["john", :age], &{&1, &1 + 1})
```

See: [put_in](https://hexdocs.pm/elixir/Kernel.html#put_in/3)

### Constructing from lists

```elixir
Map.new([{:b, 1}, {:a, 2}])
Map.new([a: 1, b: 2])
Map.new([:a, :b], fn x -> {x, x} end)  # → %{a: :a, b: :b}
```

See: [Map.new](https://hexdocs.pm/elixir/Map.html#new/1)

### Working with structs

#### Struct to map

```elixir
Map.from_struct(%AnyStruct{a: "b"})  # → %{a: "b"}
```

#### Map to struct

```elixir
struct(AnyStruct, %{a: "b"})  # → %AnyStruct{a: "b"}
```

See: [Map.from_struct](https://hexdocs.pm/elixir/Map.html#from_struct/1)

## List

### Import

```elixir
import List
```

<!-- {: data-highlight="List"} -->

See: [import](https://hexdocs.pm/elixir/Kernel.SpecialForms.html#import/1)

### Create

```elixir
l = [ 1, 2, 3, 4 ]
```

<!-- {: data-highlight="[ 1, 2, 3, 4 ]"} -->

See: [List](https://hexdocs.pm/elixir/List.html)

### Add elements

```elixir
l = l ++ [5]         # push (append)
l = [ 0 | list ]     # unshift (prepend)
```

See: [List](https://hexdocs.pm/elixir/List.html)

### Read

```elixir
l |> first()
l |> last()
```

See: [List.first](https://hexdocs.pm/elixir/List.html#first/1)

### Flatten

```elixir
l |> flatten()
l |> flatten(tail)
```

Also see [Enum](#enum).


## Enum

### Usage

```elixir
import Enum
```

<!-- {: data-highlight="Enum"} -->

#### Set a list

```elixir
list = [:a, :b, :c]
```

<!-- {: data-highlight="[:a, :b, :c]"} -->

#### Read values

```elixir
list |> at(0)         # → :a
list |> count()       # → 3
list |> empty?()      # → false
list |> any?()        # → true
```

#### Concatenate

```elixir
list |> concat([:d])  # → [:a, :b, :c, :d]
```

Also, consider streams instead.

See: [Enum](https://hexdocs.pm/elixir/Enum.html)

### Map/reduce

```elixir
list |> reduce(fn)
list |> reduce(acc, fn)
list |> map(fn)
list |> reject(fn)
list |> any?(fn)
list |> empty?(fn)
```

#### Reduce example

```elixir
[1, 2, 3, 4]
|> Enum.reduce(0, fn(x, acc) -> x + acc end)
```

See: [Enum.map](https://hexdocs.pm/elixir/Enum.html#map/2)

## Tuple

### Tuples

```elixir
import Tuple
```

<!-- {: data-highlight="Tuple"} -->

#### Create

```elixir
t = { :a, :b }
```

#### Read and change

```elixir
t |> elem(1)    # like tuple[1]
t |> put_elem(index, value)
t |> tuple_size()
```

See: [Tuple](https://hexdocs.pm/elixir/Tuple.html)

### Keyword lists

```elixir
list = [{ :name, "John" }, { :age, 15 }]
list[:name]
```

```elixir
# For string-keyed keyword lists
list = [{"size", 2}, {"type", "shoe"}]
List.keyfind(list, "size", 0)  # → {"size", 2}
```

See: [Keyword](https://hexdocs.pm/elixir/Keyword.html)

## Functions

### Lambdas

```elixir
square = fn n -> n*n end
square.(20)
```

See: [fn](https://hexdocs.pm/elixir/Kernel.SpecialForms.html#fn/1)

### & syntax

```elixir
square = &(&1 * &1)
square.(20)

square = &Math.square/1
```

See: [Capture operator](https://hexdocs.pm/elixir/Kernel.SpecialForms.html#&/1)

### Running

```elixir
fun.(args)
apply(fun, args)
apply(module, fun, args)
```

See: [apply](https://hexdocs.pm/elixir/Kernel.html#apply/3)

### Function heads

```elixir
def join(a, b \\ nil)
def join(a, b) when is_nil(b) do: a
def join(a, b) do: a <> b
```

See: [def](https://hexdocs.pm/elixir/Kernel.html#def/2)

## Structs

### Define a struct

```elixir
defmodule User do
  defstruct name: "", age: nil
end
```

See: [defstruct](https://hexdocs.pm/elixir/Kernel.SpecialForms.html#defstruct/1)

### Use a struct

```elixir
%User{name: "John", age: 20}
%User{}.struct  # → User
```

See: [Structs](https://hexdocs.pm/elixir/structs.html)

## Protocols

### Defining protocols

```elixir
defprotocol Blank do
  @doc "Returns true if data is considered blank/empty"
  def blank?(data)
end
```

#### Implementation

```elixir
defimpl Blank, for: List do
  def blank?([]), do: true
  def blank?(_), do: false
end

Blank.blank?([])  # → true
```

See: [defprotocol](https://hexdocs.pm/elixir/Kernel.html#defprotocol/2)

### Any

```elixir
defimpl Blank, for: Any do ... end

defmodule User do
  @derive Blank     # Falls back to Any
  defstruct name: ""
end
```

See: [Protocol](https://hexdocs.pm/elixir/Protocol.html)

### Examples

- `Enumerable` and `Enum.map()`
- `Inspect` and `inspect()`

See: [Enumerable](https://hexdocs.pm/elixir/Enumerable.html)

## Comprehensions

### For

```elixir
for n <- [1, 2, 3, 4], do: n * n
for n <- 1..4, do: n * n
```

#### Map

```elixir
for {key, val} <- %{a: 10, b: 20}, do: val
# → [10, 20]
```

#### Into a map

```elixir
for {key, val} <- %{a: 10, b: 20}, into: %{}, do: {key, val*val}
```

See: [for](https://hexdocs.pm/elixir/Kernel.SpecialForms.html#for/1)

### Conditions

```elixir
for n <- 1..10, rem(n, 2) == 0, do: n
# → [2, 4, 6, 8, 10]
```

See: [for](https://hexdocs.pm/elixir/Kernel.SpecialForms.html#for/1)

### Complex

```elixir
for dir <- dirs,
    file <- File.ls!(dir),          # nested comprehension
    path = Path.join(dir, file),    # invoked
    File.regular?(path) do          # condition
  IO.puts(file)
end
```

See: [for](https://hexdocs.pm/elixir/Kernel.SpecialForms.html#for/1)

## Misc

### Metaprogramming

```elixir
__MODULE__
__MODULE__.__info__

@after_compile __MODULE__
def __before_compile__(env)
def __after_compile__(env, _bytecode)
def __using__(opts)    # invoked on `use`

@on_definition {__MODULE__, :on_def}
def on_def(_env, kind, name, args, guards, body)

@on_load :load_check
def load_check
```

See: [Module](https://hexdocs.pm/elixir/Module.html)

### Regexp

```elixir
exp = ~r/hello/
exp = ~r/hello/i
"hello world" =~ exp
```

See: [Regex](https://hexdocs.pm/elixir/Regex.html)

### Sigils

```elixir
~r/regexp/
~w(list of strings)
~s|strings with #{interpolation} and \x20 escape codes|
~S|no interpolation and no escapes|
~c(charlist)
```

Allowed chars: `/` `|` `"` `'` `(` `[` `{` `<` `"""`.
See: [Sigils](http://elixir-lang.org/getting-started/sigils.html)

### Type specs

```elixir
@spec round(number) :: integer

@type number_with_remark :: {number, String.t}
@spec add(number, number) :: number_with_remark
```

Useful for [dialyzer](http://www.erlang.org/doc/man/dialyzer.html).
See: [Typespecs](http://elixir-lang.org/getting-started/typespecs-and-behaviours.html)

### Behaviours

```elixir
defmodule Parser do
  @callback parse(String.t) :: any
  @callback extensions() :: [String.t]
end
```

#### Implementation

```elixir
defmodule JSONParser do
  @behaviour Parser

  def parse(str), do: # ... parse JSON
  def extensions, do: ["json"]
end
```

See: [Module](http://elixir-lang.org/docs/stable/elixir/Module.html)

## References

<!-- {: .-one-column} -->

- [Learn Elixir in Y minutes](https://learnxinyminutes.com/docs/elixir/)
