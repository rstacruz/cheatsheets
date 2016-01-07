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
String.length(str)
String.codepoints(string)
String.slice(str, 0..-1)
String.split(str, " ")
String.capitalize(str)
String.match(string, regex)
```

### Enum

```elixir
Enum.reduce(list, acc, fn)
Enum.map(list, fn)
# consider streams instead
```

There's really way too many things, just see <https://learnxinyminutes.com/docs/elixir/>.
