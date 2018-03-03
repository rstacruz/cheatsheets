---
title: Goby
layout: 2017/sheet
prism_languages: [ruby]
weight: -3
tags: [Featured]
updated: 2018-03-03
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

See [igb manual & test script](https://github.com/goby-lang/goby/blob/master/igb/manual_test.md).

## Definition
{: .-three-column}

### Method definition and calling

```ruby
def foo_bar(baz)
  puts baz
end

foo_bar "Hi, Goby!"
```

Method name should be "`[a-z][a-z0-9_]+\??`"" (snake_case). You can omit `()` when calling, but cannot omit the one when defining.

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
  def bar
    99
  end
end

class Baz
  include Foo
end

Baz.new.bar
Foo.new.bar
```

Module name should be "`[A-Z][A-Za-z0-9_]+`" (UpperCamelCase). Modules can be included into other modules or classed via "`include`", but cannot be inherited.

---------

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

Baz.new.bar
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

## Variables
{: .-three-column}

### local variable

```ruby
zip101 = "233-7383"
magic_number = 42
```

Should be "`[a-z][a-z0-9_]+`".

### Black hole variable

```ruby
a, _ = [1, 2]
```

Single "`_`" is a special "black hole" variable (write-only).

### Instance variable

```ruby
class Foo
  @state = nil
  def initialize(state)
    @state = state
  end
end
```

Should be "`@[a-z][a-z0-9_]+`"

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

### Private method (to be implemented)

```ruby
class Foo
  def bar
    42
  end
  def _baz
    99
  end
end
```

Methods that starts with "`_`", like "`_baz`", declares that they are "private". You cannot call them from outside the class/module.

### Class variables

Unsupported.

### Global variable

Unsupported.

## Literal

### Keyword

`def`, `true`, `false`, `nil`, `if`, `elsif`, `else`, `case`, `when`, `return`, `self`, `end`, `while`, `do`, `yield`, `next`, `class`, `module`, `break`

### String and symbol

### Numeric

### Array

### Hash

### Range

### Boolean and `nil`

### Operator

## Flow control
{: .-three-column}

### Conditional

### Case

### Exception

### Multiple assignment

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
