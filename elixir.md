---
title: Elixir
category: Elixir
tags: [New]
updated: 2018-07-04
weight: -10
---

## Getting started
{: .-three-column}

### Hello world
{: .-prime}

```elixir
# hello.exs
defmodule Greeter do
  def greet(name) do
    message = "Hello, " <> name <> "!"
    IO.puts message
  end
end

Greeter.greet("world")
```

```bash
elixir hello.exs
# Hello, world!
```
{: .-setup}

### Variables

```elixir
age = 23
```

### Maps

```elixir
user = %{
  name: "John",
  city: "Melbourne"
}
```

```elixir
IO.puts "Hello, " <> user.name
```
{: .-setup}

### Lists

```elixir
users = [ "Tom", "Dick", "Harry" ]
```
{: data-line="1"}

```elixir
Enum.map(users, fn user ->
  IO.puts "Hello " <> user
end)
```

### Piping

```elixir
source
|> transform(:hello)
|> print()
```
{: data-line="2,3"}

```elixir
# Same as:
print(transform(source, :hello))
```

These two are equivalent.

### Pattern matching

```elixir
user = %{name: "Tom", age: 23}
%{name: username} = user
```
{: data-line="2"}

This sets `username` to `"Tom"`.

### Pattern matching in functions

```elixir
def greet(%{name: username}) do
  IO.puts "Hello, " <> username
end

user = %{name: "Tom", age: 23}
```
{: data-line="1"}

Pattern matching works in function parameters too.

Control flow
------------
{: .-three-column}

### If

```elixir
if false do
  "This will never be seen"
else
  "This will"
end
```
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

### Cond

```elixir
cond do
  1 + 1 == 3 ->
    "I will never be seen"
  2 * 5 == 12 ->
    "Me neither"
  true ->
    "But I will (this is essentially an else)"
end
```

### With

```elixir
with {:ok, {int, _asdf}} <- Integer.parse("123asdf"),
     {:ok, datetime, _utc_offset} <- DateTime.from_iso8601("2021-10-27T12:00:00Z") do
  DateTime.add(datetime, int, :second)
  # optional else clause. if not provided and an error occurs, the error is returned
else
  :error -> "couldn't parse integer string"
  {:error, :invalid_format} -> "couldn't parse date string"
  _ -> "this will never get hit because all errors are handled"
end
```

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

### Type checks

```elixir
is_atom/1
is_bitstring/1
is_boolean/1
is_function/1
is_function/2
is_integer/1
is_float/1
```

```elixir
is_binary/1
is_list/1
is_map/1
is_tuple/1
```

```elixir
is_nil/1
is_number/1
is_pid/1
is_port/1
is_reference/1
```

### Operators

```elixir
left != right   # equal
left !== right  # match
left ++ right   # concat lists
left <> right   # concat string/binary
left =~ right   # regexp
```

Modules
-------

### Importing

```elixir
require Redux   # compiles a module
import Redux    # compiles, and you can use without the `Redux.` prefix

use Redux       # compiles, and runs Redux.__using__/1
use Redux, async: true

import Redux, only: [duplicate: 2]
import Redux, only: :functions
import Redux, only: :macros

import Foo.{Bar, Baz}
```

### Aliases

```elixir
alias Foo.Bar, as: Bar
alias Foo.Bar   # same as above

alias Foo.{Bar, Baz}
```

## String

### Functions

```elixir
import String
```
{: .-setup}

```elixir
str = "hello"
str |> length()        # → 5
str |> codepoints()    # → ["h", "e", "l", "l", "o"]
str |> slice(2..-1)    # → "llo"
str |> split(" ")      # → ["hello"]
str |> capitalize()    # → "Hello"
str |> match(regex)
```

### Inspecting objects

```elixir
inspect(object, opts \\ [])
```
```elixir
value |> IO.inspect()
```
```elixir
value |> IO.inspect(label: "value")
```

## Numbers

### Operations

```elixir
abs(n)
round(n)
rem(a, b)   # remainder (modulo)
div(a, b)   # integer division
```

### Float

```elixir
import Float
```
{: .-setup}

```elixir
n = 10.3
```
{: .-setup}

```elixir
n |> ceil()            # → 11.0
n |> ceil(2)           # → 11.30
n |> to_string()       # → "1.030000+e01"
n |> to_string([decimals: 2, compact: true])
```

```elixir
Float.parse("34")  # → { 34.0, "" }
```

### Integer

```elixir
import Integer
```
{: .-setup}

```elixir
n = 12
```
{: .-setup}

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

```elixir
parse("12")           # → {12, ""}
undigits([1, 2])      # → 12
```

### Type casting

```elixir
Float.parse("34.1")    # → {34.1, ""}
Integer.parse("34")    # → {34, ""}
```

```elixir
Float.to_string(34.1)  # → "3.4100e+01"
Float.to_string(34.1, [decimals: 2, compact: true])  # → "34.1"
```

## Map

### Defining

```elixir
m = %{name: "hi"}       # atom keys (:name)
m = %{"name" => "hi"}   # string keys ("name")
```

### Updating

```elixir
import Map
```
{: .-setup}

```elixir
m = %{m | name: "yo"}  # key must exist
```

```elixir
m |> put(:id, 2)      # → %{id: 2, name: "hi"}
m |> put_new(:id, 2)  # only if `id` doesn't exist (`||=`)
```

```elixir
m |> put(:b, "Banana")
m |> merge(%{b: "Banana"})
m |> update(:a, &(&1 + 1))
m |> update(:a, fun a -> a + 1 end)
```

```elixir
m |> get_and_update(:a, &(&1 || "default"))
# → {old, new}
```

### Deleting

```elixir
m |> delete(:name)  # → %{}
m |> pop(:name)     # → {"John", %{}}
```

### Reading

```elixir
m |> get(:id)       # → 1
m |> keys()         # → [:id, :name]
m |> values()       # → [1, "hi"]
```

```elixir
m |> to_list()      # → [id: 1, name: "hi"]
                    # → [{:id, 1}, {:name, "hi"}]
```

### Deep

```elixir
put_in(map, [:b, :c], "Banana")
put_in(map[:b][:c], "Banana")    # via macros
```

```elixir
get_and_update_in(users, ["john", :age], &{&1, &1 + 1})
```

### Constructing from lists

```elixir
Map.new([{:b, 1}, {:a, 2}])
Map.new([a: 1, b: 2])
Map.new([:a, :b], fn x -> {x, x} end)  # → %{a: :a, b: :b}
```

### Working with structs

#### Struct to map

```elixir
Map.from_struct(%AnyStruct{a: "b"})  # → %{a: "b"}
```

#### Map to struct

```elixir
struct(AnyStruct, %{a: "b"})  # → %AnyStruct{a: "b"}
```

## List

```elixir
import List
```
{: .-setup}

```elixir
l = [ 1, 2, 3, 4 ]
```
{: .-setup}

```elixir
l = l ++ [5]         # push (append)
l = [ 0 | list ]     # unshift (prepend)
```

```elixir
l |> first()
l |> last()
```

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
{: .-setup}

```elixir
list = [:a, :b, :c]
```
{: .-setup}

```elixir
list |> at(0)         # → :a
list |> count()       # → 3
list |> empty?()      # → false
list |> any?()        # → true
```

```elixir
list |> concat([:d])  # → [:a, :b, :c, :d]
```

Also, consider streams instead.

### Map/reduce

```elixir
list |> reduce(fn)
list |> reduce(acc, fn)
list |> map(fn)
list |> reject(fn)
list |> any?(fn)
list |> empty?(fn)
```

```elixir
[1, 2, 3, 4]
|> Enum.reduce(0, fn(x, acc) -> x + acc end)
```

## Tuple

### Tuples

```elixir
import Tuple
```
{: .-setup}

```elixir
t = { :a, :b }
```

```elixir
t |> elem(1)    # like tuple[1]
t |> put_elem(index, value)
t |> tuple_size()
```

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

## Functions

### Lambdas

```elixir
square = fn n -> n*n end
square.(20)
```

### & syntax

```elixir
square = &(&1 * &1)
square.(20)

square = &Math.square/1
```

### Running

```elixir
fun.(args)
apply(fun, args)
apply(module, fun, args)
```

### Function heads

```elixir
def join(a, b \\ nil)
def join(a, b) when is_nil(b) do: a
def join(a, b) do: a <> b
```

## Structs

### Structs

```elixir
defmodule User do
  defstruct name: "", age: nil
end

%User{name: "John", age: 20}

%User{}.struct  # → User
```

See: [Structs](http://elixir-lang.org/getting-started/structs.html)

## Protocols

### Defining protocols

```elixir
defprotocol Blank do
  @doc "Returns true if data is considered blank/empty"
  def blank?(data)
end
```

```elixir
defimpl Blank, for: List do
  def blank?([]), do: true
  def blank?(_), do: false
end

Blank.blank?([])  # → true
```

### Any

```elixir
defimpl Blank, for: Any do ... end

defmodule User do
  @derive Blank     # Falls back to Any
  defstruct name: ""
end
```

### Examples

- `Enumerable` and `Enum.map()`
- `Inspect` and `inspect()`

## Comprehensions

### For

```elixir
for n <- [1, 2, 3, 4], do: n * n
for n <- 1..4, do: n * n
```

```elixir
for {key, val} <- %{a: 10, b: 20}, do: val
# → [10, 20]
```

```elixir
for {key, val} <- %{a: 10, b: 20}, into: %{}, do: {key, val*val}
```

### Conditions

```elixir
for n <- 1..10, rem(n, 2) == 0, do: n
# → [2, 4, 6, 8, 10]
```

### Complex

```elixir
for dir <- dirs,
    file <- File.ls!(dir),          # nested comprehension
    path = Path.join(dir, file),    # invoked
    File.regular?(path) do          # condition
  IO.puts(file)
end
```

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

### Regexp

```elixir
exp = ~r/hello/
exp = ~r/hello/i
"hello world" =~ exp
```

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

```elixir
defmodule JSONParser do
  @behaviour Parser

  def parse(str), do: # ... parse JSON
  def extensions, do: ["json"]
end
```

See: [Module](http://elixir-lang.org/docs/stable/elixir/Module.html)

## References
{: .-one-column}

- [Learn Elixir in Y minutes](https://learnxinyminutes.com/docs/elixir/)
