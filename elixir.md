---
title: Elixir
category: Development
---

## Importing

```elixir
require Redux   # compiles a module
import Redux    # compiles, and you can use without the `Redux.` prefix

use Redux       # compiles, and runs Redux.__using__/1
use Redux, async: true

import Redux, only: [duplicate: 2]
import Redux, only: :functions
import Redux, only: :macros

alias Foo.Bar, as: Bar
alias Foo.Bar   # same as above

alias Foo.{Bar, Baz}
import Foo.{Bar, Baz}
```

## Type checks

```elixir
is_atom/1
is_bitstring/1
is_boolean/1
is_function/1
is_function/2
is_integer/1
is_float/1

is_binary/1
is_list/1
is_map/1
is_tuple/1

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

### Inspecting

```elixir
inspect(arg, opts \\ [])
```

## String

```elixir
import String
str = "hello"
str |> length()      #=> 5
str |> codepoints()  #=> ["h", "e", "l", "l", "o"]
str |> slice(2..-1)  #=> "llo"
str |> split(" ")    #=> ["hello"]
str |> capitalize()  #=> "Hello"
str |> match(regex)
```

## Numbers

```elixir
abs(n)
rem(a, b)   # remainder (modulo)
div(a, b)   # integer division
round(n)
```

### Float

```elixir
import Float
n = 10.3
n |> ceil()            #=> 11.0
n |> ceil(2)           #=> 11.30
n |> to_string()       #=> "1.030000+e01"
n |> to_string([decimals: 2, compact: true])

Float.parse("34")  #=> { 34.0, "" }
```

### Integer

```elixir
import Integer
n = 12
digits(n)        #=> [1, 2]
to_char_list(n)  #=> '12'
to_string(n)
is_even(n)
is_odd(n)

# Different base:
digits(n, 2)       #=> [1, 1, 0, 0]
to_char_list(n, 2) #=> '1100'
to_string(n, 2)

parse("12")       #=> 12
undigits([1, 2])  #=> 12
```

### Type casting

```elixir
Float.parse("34.1")    #=> {34.1, ""}
Integer.parse("34")    #=> {34, ""}

Float.to_string(34.1)  #=> "3.4100e+01"
Float.to_string(34.1, [decimals: 2, compact: true])  #=> "34.1"
```

## Map

```elixir
map = %{name: "hi"}       # atom keys (:name)
map = %{"name" => "hi"}   # string keys ("name")
```

### Updating
```elixir
import Map

map = %{map | name: "yo"}  # key must exist

put(map, :id, 2)      #=> %{id: 2, name: "hi"}
put_new(map, :id, 2)  # only if `id` doesn't exist (`||=`)

put(map, :b, "Banana")
merge(map, %{b: "Banana"})
update(map, :a, &(&1 + 1))
update(map, :a, fun a -> a + 1 end)

{old, new} = get_and_update(map, :a, &(&1 || "default"))
```

### Deleting
```elixir
delete(map, :name)    #=> "hi"
pop(map, :name)       #=> %{id: 1}
```

### Reading

```elixir
get(map, :id)         #=> 1
keys(map)             #=> [:id, :name]
values(map)           #=> [1, "hi"]

to_list(map)          #=> [id: 1, name: "hi"]
                      #=> [{:id, 1}, {:name, "hi"}]
```

### Deep

```elixir
put_in(map, [:b, :c], "Banana")
put_in(map[:b][:c], "Banana")    # via macros
get_and_update_in(users, ["john", :age], &{&1, &1 + 1})
```

### Constructing

```elixir
Map.new([{:b, 1}, {:a, 2}])
Map.new([a: 1, b: 2])
Map.new([:a, :b], fn x -> {x, x} end)  #=> %{a: :a, b: :b}
```

## List

Also see [Enum](#enum).

```js
import List
list = [ 1, 2, 3, 4 ]
list = [ 1 | list ]     # unshift (prepend)

first(list)
last(list)

flatten(list)
flatten(list, tail)
```

## Enum

```elixir
# consider streams instead
import Enum

# High-order
reduce(list, acc, fn)
map(list, fn)
reject(list, fn)
any?(list, fn)
empty?(list, fn)

list = [:a, :b, :c]
at(list, 0)         #=> :a
count(list)         #=> 3
empty?(list)        #=> false
any?(list)          #=> true

concat(list, [:d])  #=> [:d]
```

## Tuples

```elixir
tuple = { :a, :b }

elem(tuple, 1)    # like tuple[1]
put_elem(tuple, index, value)
tuple_size(tuple)
```

### Keyword lists

```elixir
list = [{ :name, "John" }, { :age, 15 }]
list.name
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

## Syntax

### [Structs](http://elixir-lang.org/getting-started/structs.html)

```elixir
defmodule User do
  defstruct name: "", age: nil
end

%User{name: "John", age: 20}

%User{}.struct  #=> User
```

## Functions

### Function heads

```elixir
def join(a, b \\ nil)
def join(a, b) when is_nil(b) do: a
def join(a, b) do: a <> b
```

## Protocols

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

Blank.blank?([])  #=> true
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

```elixir
for n <- [1, 2, 3, 4], do: n * n
for n <- 1..4, do: n * n

for {key, val} <- %{a: 10, b: 20}, do: val  #=> [10, 20]
for {key, val} <- %{a: 10, b: 20}, into: %{}, do: {key, val*val}
```

### Conditions

```elixir
for n <- 1..10, rem(n, 2) == 0, do: n
#=> [2, 4, 6, 8, 10]
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

## Modules

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

## Regexp

```elixir
exp = ~r/hello/
exp = ~r/hello/i
"hello world" =~ exp
```

## [Sigils](http://elixir-lang.org/getting-started/sigils.html)

```elixir
~r/regexp/
~w(list of strings)
~s[strings with #{interpolation} and \x20 escape codes]
~S[no interpolation and no escapes]
~c(char list)
```

Allowed chars: `/` `|` `"` `'` `(` `[` `{` `<` `"""`

## [Typespecs](http://elixir-lang.org/getting-started/typespecs-and-behaviours.html)

Useful for [dialyzer](http://www.erlang.org/doc/man/dialyzer.html)

```elixir
@spec round(number) :: integer

@type number_with_remark :: {number, String.t}
@spec add(number, number) :: number_with_remark
```

## Behaviours

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

[Reference](http://elixir-lang.org/docs/stable/elixir/Module.html)

## References

- [Learn Elixir in Y minutes](https://learnxinyminutes.com/docs/elixir/)

