---
title: Crystal
layout: 2017/sheet
category: Crystal
prism_languages: [crystal]
---

## Getting started
{: .-three-column}

### Hello world

{: .-prime}

```crystal
# greeter.cr
class Greeter
  def initialize(@name : String)
  end

  def greet
    puts "Hello, #{@name}!"
  end
end

g = Greeter.new("world")
g.greet
```

```bash
crystal greeter.cr
# Hello, world!
```

{: .-setup}

### Variables

{: .-prime}

```crystal
name = "Emilia"
age = 19
```

Built-in type inference makes most type annotations unneeded.
{: .-setup}

### Concurrency

{: .-prime}

```crystal
channel = Channel(Int32).new

spawn do
  sleep(1)
  channel.send(1)
end

spawn do
  channel.send(0)
end

channel.receive # => 0
channel.receive # => 1
```

Green threads, called fibers, are lightweight processes used to achieve concurrency.
{: .-setup}

### Unions

{: .-prime}

```crystal
x = 3
x = "3" if x > 5

typeof(x) # => (Int32 | String)
```

A union type represents the possibility of having more than one possible type at compile time.
{: .-setup}

## Types

### Primitives

{: .-prime}
| Type | Sample |
| --- | --- |
| Nil | `nil` |
| Bool | `true, false` |
| Integers | `18, -12, 19_i64, 14_u32, 64u8` |
| Floats | `1.0, 1.0_f32, 1e10, -0.5` |
| Char | `'a', '\n'` |
| String | `"foo\tbar"` |
| Symbol | `:symbol, :"foo bar"` |
| Array | `[1, 2, 3], [1, 2, 3] of Int32, %w(one two three)` |
| StaticArray | `StaticArray(Int32, 3).new(42)` |
| Hash | `{"foo" => 2}, Hash(String, Int32).new` |
| Range | `1..9, 6..var` |
| Regex | `/(foo)?bar/, /foo #{foo}/imx, %r(foo/)` |
| Tuple | `{"foo", :bar}` |
| NamedTuple | `{name: "Crystal", year: 2011}` |
| Proc | `->(x : Int32, y : Int32) { x + y }` |
| Command | `` `echo foo`, `%x(echo foo)` `` |

### Type checks

```crystal
# If the variable is not `Nil`
if var
end

# If the variable is `Nil`
if var.nil?
end

# If the variable is `Int32`
if var.is_a?(Int32)
end

# If the variable has a method named `abs`
if var.responds_to?(:abs)
end
```

### Truthy and falsey values

```crystal
# The only falsey values are `nil`, `false` and null pointers
if nil
  "Will never be executed"
elsif 42
  "Will be executed"
end
```

## References
{: .-one-column}

- [Official website](https://crystal-lang.org/)
- [Reference](https://crystal-lang.org/reference/)
- [API Documentation](https://crystal-lang.org/api/)
