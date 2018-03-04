---
title: Goby
layout: 2017/sheet
prism_languages: [ruby]
weight: -3
tags: [Featured]
updated: 2018-03-04
---

## Getting started

## Introductoon

Goby's language design is based on Ruby language's, slim and shaped up. Differences in syntax between them is very small.

## Getting started

### Hello world
{: .-prime}

#### hello.gb
{: .-file}

```ruby
greeting = "Hello, world!"
puts greeting
```

Then run:

```bash
$ goby hello.gb
```

### REPL (igb)

```bash
$ goby -i
```

See [igb manual & test script](https://github.com/goby-lang/goby/blob/master/igb/manual_test.md). You can use `readline` features such as command history by arrow keys.

## Definition
{: .-three-column}

### Method definition and calling

```ruby
def foo_bar(baz)
  puts baz
end

foo_bar "Hi, Goby!" #=> Hi, Goby!
```

Method name should be "`[a-z][a-z0-9_]+\??`" (snake_case). You can omit `()` when calling, but cannot omit the one when defining.

------------

```ruby
def updated?
  true
end
```

You can add a trailing "`?`"" for indicating "predicate method". ("`!`" is **unsupported**)

### Module definition

```ruby
module Foo
  def foo   
    99
  end
end

module Bar
  def bar
    88
  end
end

class Baz
  include Foo    # `foo` will be an instance method
  extend Bar     # `bar` will be a class method
end

Baz.new.foo      #=> 99
Baz.bar          #=> 88
```

Module name should be "`[A-Z][A-Za-z0-9_]+`" (UpperCamelCase). Modules cannot be inherited.

Modules can be included into other modules or classed via "`include`", as well as can be used for extending other classes or modules via "`extend`".

```ruby
module Foo
  def foo   
    99
  end
end

Foo.new.foo  #=> 99
```

Actually, Goby's module can be **instantiated** via "`#new`" like "`Foo.new`".

### Class definition

```ruby
class Foo
  def bar
    99
  end
end

class Baz < Foo
end

Baz.new.bar  #=> 99
```

Class name should be "`[A-Z][A-Za-z0-9]+`" (UpperCamelCase). Inheritance with "`<`" is supported.

### Constants

```ruby
HTTP_ERROR_404 = 404
```

Constants should be "`[A-Z][A-Za-z0-9_]+`" (UPPER_SNAKECASE). Assignment *values* to constants is **not** reentrant.

### Namespaces

```ruby
class Foo
  module Bar
    MAGIC = 99
    def baz
      99
    end
  end
end

Foo::Bar.new.baz
Foo::Bar::MAGIC
```

Class/module/constants can be namespaced via `::`

### Private method (to be implemented)

```ruby
class Foo
  def bar
    42
  end
  
  def _baz  # private method
    99
  end
end
```

Methods that starts with "`_`", like "`_baz`", declares that they are "private". You cannot call them from outside the class/module.

## Parameters & arguments

### definition

* **Parameter** (param): to be used in *method definitions*
* **Argument** (arg): to be used in *method call*

### Parameter

```ruby
def foo(a, b="de", ary=[], hs={}, kwd:, mail:"ex@example.com", *sp)
```

The order of params in method definition should be:

1. normal params (like `a`) or params with default value (like `a=1`)
2. array or hash params (like `ary=[]` or `hs={}`)
3. keyword params (like `kwd:`) or the one with default value (like `kwd: 1`)
4. splat params (like `*sp`)

Or you will receive an error.

### Argument

```ruby
foo(a, b="de", ary=[], hs={}, kwd:, mail:"ex@example.com", *sp)
```

You can omit `()` around arguments, but using `()` is recommended.

```ruby
class Foo
  def self.bar(a:, b:)
    yield(a, b)
  end
end

Foo.bar(a: 7, b: 4) do |i, j|
  i*i + j*j
end
#=> 65
```

`do`-`end` block argument should be at the end of arguments.

## Variables
{: .-three-column}

### local variable

```ruby
zip101 = "233-7383"
magic_number = 42
```

Should be "`[a-z][a-z0-9_]+`"(snake_case).

### Instance variable

```ruby
class Foo
  @state = nil
  def initialize(state)
    @state = state
  end
end
```

Should be "`@[a-z][a-z0-9_]+`"(snake_case).

### Attributes

```ruby
class Foo
  attr_accessor :bar, :baz

  def initialize
    @bar = 42
    @baz = 99
  end
end

foo = Foo.new

foo.bar = 77
foo.baz = 88
```

You can use the following attribute declarations in classes/modules:

* `attr_accessor`
* `attr_reader`
* `attr_writer`

### Multiple assignment

```ruby
a, b, c = [1, 2, 3]
```

The right side of multiple assignment should be braced with array literal `[]`. Bare multipe assignment like `a, b = 1, 2` is unsupported.

```ruby
a = [1, 2, 3]
x, y, z = *a
```

Assigning array by `*` operator is also available.

```ruby
a, b, c = *[1, 2, 3]
```

Adding `*` to an array literal on multiple assignment is also possible. 

### Black hole variable

```ruby
a, _ = [1, 2]
```

Single "`_`" is a special "black hole" variable (write-only).

### Class variable

Unsupported.

### Global variable

Unsupported.

## Literal
{: .-three-column}

### Keyword

`def`, `true`, `false`, `nil`, `if`, `elsif`, `else`, `case`, `when`, `return`, `self`, `end`, `while`, `do`, `yield`, `next`, `class`, `module`, `break`

(`then` is **not** a keyword)

### String literal

```ruby
"double quote"
'single quote'
```

Double and single quotation can be used.

### Symbol literal

```ruby
:symbol           # equivalent to "symbol"
{ symbol: "value" }
```

Goby's symbol (using `:`) is just a short hand of string literal and is always `String` class (**no** `Symbol` class!).

Note that symbol literal should be "`[a-zA-Z][a-zA-Z0-9_]+`" and cannot include any other letters, signs or spaces.

### Numeric literal

```ruby
year   =  2018   # Integer
offset = -42     # Integer
PI     = 3.14    # Float
G      = -9.8    # Float
```

### Array literal

```ruby
[1, 2, 3, "hello", :goby, { key: "value"}]
[1, 2, [3, 4], 5, 6]
```

### Hash literal

```ruby
h = { key: "value", key2: "value2" }
h[:key2]   #=> value2
```

Hash literal's keys should always be symbol literals. 

### Range

```ruby
(1..10).each do |x|
  puts x*x
end
```

"`..`" within parentheses "`( )`" represents a range.

### Boolean and `nil`

```ruby
true
false
nil

!nil  #=> true
```

`true` and `false` belongs to `Boolean` class.

`nil` belongs to `Null` class and treated as `false` on conditionals.

Any objects except `nil` and `false` are `true` on conditionals.

### Operator

```ruby
+           # unary
**          # power
-           # unary
* / %       # multiplication, division, modulus
+ -         # addition, subtraction
!           # logical inversion
> >= < <=   # inequality comparison
== !=       # equality comparison, negative comparison
&&          # logical AND
||          # logical OR
+= -=       # shorthand of addition/subtraction
```

Arithmetic and logical operators (under way).

```ruby
()          # chaning priority of interpretation
[]          # array literal
*           # multiple assignment
..          # range
```

Other operators (under way)

## Flow control
{: .-three-column}

### Conditional

```ruby
def foo(str)
  if str.size > 10
    puts "too big!"
  else
    if str.size < 3
      puts "too short!"
    else
      puts "moderate"
    end
  end
end
```

### Case

### Exception

### Block

## Thread and channel

### Concurrent array

### Concurrent hash

### Concurrent rw rock

## Native class (fundamental)

### `Object` and `Class`

{: .-three-column}

### `String`

### `Integer`

### `Array`

### `Hash`

### `Array`

### `Range`

### `Method`

### `Block`

### `Boolean`

### `Null`

## Native class (secondary)

### `Float`

### `Decimal`

### `Regexp` and `MatchData`

### `File`

### `GoMap`

### `GoObject`

### `Channel`

### `URI`

## Non-class feature

### I/O

* `#puts`

`ARGV`, `STDIN`, `STDOUT`, `STDERR`, `ENV` constants

### Diggable

## Loadable library

### `Plugin`

### `DB`

### `JSON`

### `Net::HTTP`

### `Net::SimpleServer`

## Packages
{: .-three-column}

## References
