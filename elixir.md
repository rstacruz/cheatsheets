---
title: Elixir
category: Development
---

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

### Numbers

```
abs(n)
rem(a, b)   # remainder (modulo)
div(a, b)   # integer division
round(n)
```

### Functions

```
apply(fn, args)
apply(module, fn, args)
```

### Inspecting

```elixir
inspect(arg, opts \\ [])
```

### Tuples

```elixir
elem(tuple, 1)    # like tuple[1]
put_elem(tuple, index, value)
tuple_size(tuple)
```

### Maps

```elixir
put_in(data, keys, value)
Map.get(map, key)
Map.put(map, key, value)
```

### String

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

### Map

```js
import Map
map = %{id: 1, name: "hi"}

delete(map, :name)    #=> "hi"
pop(map, :name)       #=> %{id: 1}

put(map, :id, 2)      #=> %{id: 2, name: "hi"}
put_new(map, :id, 2)  # only if `id` doesn't exist

get(map, :id)         #=> 1
keys(map)             #=> [:id, :name]
values(map)           #=> [1, "hi"]

to_list(map)          #=> [id: 1, name: "hi"]
                      #=> [{:id, 1}, {:name, "hi"}]

merge(map, %{name: "hello"})

Map.new([{:b, 1}, {:a, 2}])
Map.new([a: 1, b: 2])
Map.new([:a, :b], fn x -> {x, x} end)  #=> %{a: :a, b: :b}
```

### List

Also see [Enum](#enum).

```js
import List
list = [ 1, 2, 3, 4 ]

first(list)
last(list)

flatten(list)
flatten(list, tail)
```

### Enum

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

There's really way too many things, just see <https://learnxinyminutes.com/docs/elixir/>.

## Syntax

### [Structs](http://elixir-lang.org/getting-started/structs.html)

```elixir
defmodule User do
  defstruct name: "", age: nil
end

%User{name: "John", age: 20}
```

### Functions

### Function heads

```elixir
def join(a, b \\ nil)
def join(a, b) when is_nil(b) do: a end
def join(a, b) do: a <> b; end
```
