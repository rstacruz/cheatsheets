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

### Showing methods and classes

```ruby
String.methods
#» ["fmt", "new", "<", "<=", ">", ">=", "ancestors", "attr_accessor", "attr_reader", "attr_writer", "extend", "include", "name", "superclass", "!", "!=", "==", "block_given?", "class", "exit", "instance_eval", "instance_variable_get", "instance_variable_set", "is_a?", "methods", "nil?", "object_id", "puts", "raise", "require", "require_relative", "send", "singleton_class", "sleep", "thread", "to_s"]

» "string".methods
#» ["!=", "*", "+", "<", "<=>", "==", "=~", ">", "[]", "[]=", "capitalize", "chop", "concat", "count", "delete", "downcase", "each_byte", "each_char", "each_line", "empty?", "end_with?", "eql?", "fmt", "include?", "insert", "length", "ljust", "match", "new", "replace", "replace_once", "reverse", "rjust", "size", "slice", "split", "start_with", "strip", "to_a", "to_bytes", "to_d", "to_f", "to_i", "to_s", "upcase", "!", "block_given?", "class", "exit", "instance_eval", "instance_variable_get", "instance_variable_set", "is_a?", "methods", "nil?", "object_id", "puts", "raise", "require", "require_relative", "send", "singleton_class", "sleep", "thread"]
```

You can perform `methods` against any objects (classes and instances) to show methods.

### Showing ancestors

```ruby
module Foo
  def bar
    99
  end
end

class Bar
  include Foo
end

Bar.ancestors
#» [Bar, Foo, Object]
Bar.singleton_class.ancestors
#» [#<Class:Bar>, #<Class:Object>, Class, Object]
```

You can perform `ancestors` to show the inheritance path, as well as `singleton_class.ancestors` to show singleton classes.

## Styling

### Quick style guide

* Goby's syntax and styles are the subset (but not proper a bit) of Ruby's ones, and you can use Ruby's syntax highlighting so far.
    * You can refer to the [RuboCop's style guide](https://github.com/bbatsov/ruby-style-guide) for Goby, too. 
* UTF-8 should be used, both in methods and literails.
* Only two spaces `  ` should be used for one indentation.
    * Tab cannot be used for indentation.

### Document notation

* `Class#instance_method` -- use `#` to represent instance methods in documents
* `Class.class_method`
* `Module.module_method`

## Variables
{: .-three-column}

### Local variable

```ruby
zip101 = "233-7383"
magic_number = 42
```

Should be "`[a-z][a-z0-9_]+`"(snake_case).

```ruby
class Foo
  outside = 42
  def bar
    outside * 2
  end
end

Foo.bar #=> UndefinedMethodError: Undefined Method 'outside' for <Instance of: Foo>
```

The scope of local variables is:
  - from the line the variable is declared
  - to the end of the current **block** or the current **method**/**module**/**class** definition
You cannot access the local variables from outside of the scope.

### Instance variable

```ruby
module State
  def initialize(state)
    @state = state      # declaring an instance variable by assignment
  end
  def show
    @state              # accessible from other instance methods
  end
end

state = State.new "success"
state.show
#=> success
```

You can declare instance variables in method definitions by adding a leading `@` sign. The scope of instance variable is within the instance of the module/class.

Should be "`@[a-z][a-z0-9_]+`"(snake_case).

```ruby
class Foo
  @state = "success"    # watch out! the scope is only the class itself
  def initialize(state)
    @state = state
  end
end
```

**Note**: declaring instance variables **outside** the method definition, it will become a kind of **singleton class variable**(in Ruby, this is called a confusing "class instance variable") with a very narrow scope (the class itself), thus only accessible from its class methods. 

This is a sort of side effects and is **not** recommended. Keep your declaration of instance variables within the method definitions.

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

### Closure

```ruby
count = 0          # the declaration is used
b = Block.new do
  count += 1       # the block looks preserving the `count`
end

class Foo
  def bar(blk)
    count = 9      # (does not affect)
    puts blk.call  # local variable is resolved to the one above
  end
end

Foo.new.bar b  #=> 1
Foo.new.bar b  #=> 2
Foo.new.bar b  #=> 3
```

When local variables are declared and then forms a block (such as `Block.new`), the  local variables within the block behaves as if they are "preserved" within the block when executed like instance variables of the block object. 

Actually, when the block is executed, the local variables are simply resolved to the ones in the original environment that the block was formed. In other words, such pre-declared local variables within the block has a **lexical scope** (performs static resolutions), and the behavior is called a **closure**.

### Class variable

Unsupported.

### Global variable

Unsupported.

## Module/Class definition
{: .-three-column}

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
```

Module names should be "`[A-Z][A-Za-z0-9_]+`" (UpperCamelCase). Modules cannot be inherited.

```ruby
class Baz
  include Foo    # `foo` will be an instance method
  extend Bar     # `bar` will be a class method
end

Baz.new.foo      #=> 99
Baz.bar          #=> 88
```

Modules can be included into other modules or classed via "`include`", as well as can be used for extending other classes or modules via "`extend`".

In Goby, "**composition over inheritance**" concept is recommended. 

```ruby
module Foo
  def foo   
    99
  end
end

Foo.new.foo  #=> 99
```

Actually, Goby's module can be even **instantiated** via "`new`" like "`Foo.new`".

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

Class names should be "`[A-Z][A-Za-z0-9]+`" (UpperCamelCase). Inheritance with "`<`" is supported.

### Constants

```ruby
HTTP_ERROR_404 = 404
```

Constants should be "`[A-Z][A-Za-z0-9_]+`" (UPPER_SNAKECASE). Assigning *values* to constants is **not reentrant**.

```ruby
class Foo
  def bar
    99
  end
end

class Foo
  def bar  # redefining is possible
    77
  end
end
```

Note that classes/modules can be redefined as "open class" and are bit different from Constants. (But redefining native classes such as `Class` is not recommended.)

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

## Method definition

### Method definition and calling

```ruby
def foo_bar(baz)
  puts baz
end

foo_bar "Hi, Goby!" #=> Hi, Goby!
```

Method name should be "`[a-z][a-z0-9_]+\??`" (snake_case). You can omit the trailing "`()`" only if no parameters are taken.

```ruby
def updated?
  true
end
```

You can add a trailing "`?`"" for indicating a "predicate method". (using "`!`" is **unsupported**)

You should always use the trailing "`?`" for predicate methods.

### Return value

```ruby
PI = 3.14
def area(radius)
  radius * PI      # returns the result of evaluation
end

area 6             #=> 18.84
```

A method returns an object from the last-evaluated expression.

```ruby
def area(radius)
  return radius * PI  # not recommended
end
```

`return` keyword is supported, but **not** recommended.

```ruby
def my_array
  [1, 2, 3]
end

my_array   #=> [1, 2, 3]
```

If you want to return multiple values, you should explicitly use an array literal `[ ]`. Returning unbracketed values like `1, 2, 3` is unsupported.

### Instance method

```ruby
module Foo
  def bar
    puts "bar"
  end
  
  def baz(count, email: "goby@example.com")
    count.times do
      puts email
    end
  end
end

foo = Foo.new
foo.bar     #=> bar
foo.baz(3)  #↓
goby@example.com
goby@example.com
goby@example.com
```

You can define "public" instance methods by using `def` keyword within the definition of modules or classes.

You can create an instance the defined modules or classes by using `new` method, like `Foo.new`.

You can declare one or more parameters on the method definition by using a trailing `()`. You should always omit `()` if the method definition does not have any parameters.

### Singleton method (class method/module method)

```ruby
str = "Goby"
def str.foo     #1 singleton method on the object
  self * 2
end

str.foo
#=> GobyGoby
```

You can define **singleton methods** by using `def` keyword and `object.methodname` notation. `self` is to refer to the object itself within the object.

A singleton method is specific for the object that it is defined on.

```ruby
module Foo
  def self.bar  #2 singleton method with `self.`
    92
  end
  
  def Foo.bar   #3 singleton method with a class name (not recommended)
end
```

By using the notation above, you can define singleton methods on modules or classes. A singleton methods on a module is a **module method**, and a singleton methods on a class is a **class method**, but they are essentially a **singleton method**.

Both `self.` and `Classname.` can be used, but you should use `self.` notation within the module/class definitions.

```ruby
module Foo end

def Foo.bar      #4 singleton methods outside the Foo
  9999
end

Foo.bar #=> 9999
```

You can define singleton methods by using `def ClassName.method_name` or `def ModuleName.method_name`, outside the module/class definition.

### Attribute accessor method

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

You can use the following shorthands to declare attribute accessor methods in classes/modules:

* `attr_accessor`
* `attr_reader`
* `attr_writer`

**Note**: `attr_accessor` and `attr_writer` implicitly declares instance variables with the same name when assignment is occurred, but `attr_reader` is not.

```ruby
class Foo
  attr_accessor :foo   # creates `@foo` when assigning to `Foo.foo`
  attr_writer :bar     # creates `@bar` when assinging to `Foo.bar`
  attr_reader :baz     # does not automatically create any instance variables
end
```

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

### FYI: Private attribute methods (to be implemented)

```ruby
class Foo
  attr_accessor :_bar, :_baz

  def initialize
    @bar = 42
    @baz = 99
  end
  
  def boo
    _bar = _bar * 2
    _baz = _baz + 2
    puts _bar
    puts _baz
  end
end

foo = Foo.new

foo.boo
#=> 84
#=> 101

foo.bar # Error
foo.baz # Error
```

You can also make the attribute accessor methods private with `_` for private use.

## `include`/`extend`, inheritance, 

### `include`

```ruby
module Foo
  def foo
    "Foo's instance method"
  end
end

class Bar
  include Foo
end

Bar.new.foo  #=> Foo's instance method
```

`include` is to include modules into your class or module. The included instance methods will be the **instance methods** of the including class/modules. 

```ruby
class Bar
end

Bar.include Foo
Bar.new.foo             #=> Foo's instance method
```

You can also `include` modules into your class/modules outside the class/module definition as above.

```ruby
module Foo
  def self.bar  # singleton method cannot be `included`
    "Foo's singleton method (module method)"
  end
end

class Bar
  include Foo
end

Bar.bar      #=> UndefinedMethodError: Undefined Method 'bar' for Bar
Bar::Foo.bar #=> Foo's singleton method (module method)`
```

As shown above, singleton methods (or module methods) within the included module **cannot** be the singleton methods of the including class/modules. 

```ruby
class Foo
  def foo
    "Foo's instance method"
  end
end

class Bar
  include Foo
end

Bar.new.foo  #=> Foo's instance method
```

**Note**: currently, Goby's `include` can include **classes** as well. Treating the behavior is TBD. 

### `extend`

```ruby
module Foo
  def foo
    "Foo's instance method will be a singleton method"
  end
end

class Bar
  extend Foo
end

Bar.foo  #=> Foo's instance method will be a singleton method
```

`extend` is to use the instance methods in the specified modules as **singleton methods** in your class or module. 

```ruby
class Bar
end

Bar.extend Foo
Bar.foo                 #=> Foo's instance method will be a singleton method
```

You can also perform `extend` outside the class/module definition as above.

```ruby
module Foo
  def self.bar  # singleton method cannot be used for `extended`
    "Foo's singleton method (module method)"
  end
end

class Bar
  extend Foo
end

Bar.bar      #=> UndefinedMethodError: Undefined Method 'bar' for Bar
Bar::Foo.bar
```

As shown above, singleton methods (or module methods) within the module for `extend` **cannot** be the singleton methods of the extended class/modules. 

```ruby
class Foo
  def foo
    "Foo's instance method"
  end
end

class Bar
  extend Foo
end

Bar.new.foo  #=> Foo's instance method
```

**Note**: currently, Goby's **classes** can also be used for `extend`. Treating the behavior is TBD. 

### Inheritance

In Goby, "composition over inheritance" is recommended. 

```ruby
class Foo            # parent class (super class)
  def foo
    "Foo's instance method"
  end
  
  def self.bar
    "Foo's singleton method"
  end
end

class Bar < Foo      # Bar becomes the child class of Foo
end

Bar.new.foo  #=> Foo's instance method
Bar.bar      #=> Foo's singleton method
```

Inheritance by `<` is for Goby's classes to reuse other classes' functionality. 

- Inherited instance methods will be the **instance methods** of the decendant classes.
- Inherited singleton methods will be treated as **singleton methods** of the decendant classes.

```ruby
module Foo end
class Bar < Foo
end
#=> InternalError: Module inheritance is not supported: Foo
```

Inheriting modules into a class is prohibited. 

### Inheriting values

Goby supports only **instance variables**, and class variables are **unsupported**: this means `include`/`extend`/inheritance do not automatically share any values among classes or insntances. Instead, you should explicitly share values among classes or instances in other ways such as Value Object pattern.

```ruby
module Foo
  CONST = 2018
  def foo
    CONST    # `Foo::CONST` should be used to make it work
  end
end

class Bar
  include Foo
end

Foo.new.foo   #=> 2018
Bar.new.foo   #=> NameError: uninitialized constant CONST
```

Constants that are outside the method definition is **not** inherited/`include`d/`extend`ed. 

## Load library

### `require`

```ruby
require("uri")

u = URI.parse("http://example.com")
u.scheme   #=> "http"
```	

You can `require` to load Goby's standard libraries.

### `require_relative`

```ruby
require_relative("bar")  # loading the local bar.gb

class Foo
  def self.bar(x)
    Bar.foo do |ten|
      x * ten
    end
  end

  def self.baz
    yield(100)
  end
end
```

`require_relative` is to load your libraries that are relative to the current directory.

## Parameter & argument

### Parameter

```ruby
def foo(normal, default="value", hash={}, ary=[], keyword:, keyword_default:"key", *sprat)
end
```

Keep parameters **at most around 2** as far as possible to keep interfaces simple. The order of parameters in method definition is restricted as follows:

1. normal parameters (like `a`)
2. normal parameters with default value (like `a=1`)
3. optional parameters (array or hash, like `ary=[]` or `hs={}`)
4. **keyword parameters** (like `kwd:`) 
5. **keyword parameters with default value** (like `kwd: 1` or `ary: [1,2,3]` or `hsh: {key: "value"}`)
6. splat parameters (like `*sp`)
7. **block parameters** -- trailing after `()`

Or you will receive an error.

### Keyword parameter

```ruby
def foo(process:, verb: :GET, opt:{ csp: :enabled }, ary: [1, 2, 3])
end
```

Using **keyword parameters** is recommended. 

Keyword parameters can take default values, option hash or array.

### Default value

```ruby
def foo(verb: :GET)
  puts verb
end
foo      #=> GET

def foo(verb:)
  puts verb
end
foo      #=> ArgumentError: Method foo requires key argument verb
```

If a default value is provided to a keyword parameter, the keyword and parameter can be omitted when calling. If not, the perameter cannot be omitted.

```ruby
def foo(verb)
  puts verb
end

foo :GET    #=> (ok)
foo         #=> ArgumentError: Method foo requires key argument verb
```

If a default value is provided to a non-keyword parameter, the parameter can be omitted when calling. If not, the parameter cannot be omitted.

### Argument

```ruby
Foo.bar(key: 1)    # recommended
Foo.bar key: 1
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

You can `yield` the received block. 

## Literal
{: .-three-column}

### Keyword

`def`, `true`, `false`, `nil`, `if`, `elsif`, `else`, `case`, `when`, `return`, `self`, `end`, `while`, `do`, `yield`, `next`, `class`, `module`, `break`

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

Note that symbol literal should be "`[a-zA-Z][a-zA-Z0-9_]+`" and cannot include any other letters, signs or spaces. In other words, the character set of symbol is a proper subset of string literal. 

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

Any objects except `nil` and `false` will be treated as `true` on conditionals.

## Operator

### Arithmetic/logical/assignment operators

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
=           # assignment
```

*Priority of operators are TBD

### Other operators

```ruby
()          # chaning priority of interpretation
[]          # array literal
*           # multiple assignment
..          # range
```

*Priority of operators are TBD

### Delimiter

```ruby
r = 3; r.times do puts "Goby" end
```

You can use `;` as a sentence delimiter the same as a linefeed. But using `;` is **not** recommended for clean coding. 

```ruby
class Foo; end

class Bar end    # recommended
```

In most cases `;` can be omitted as above. 

### String interpolation (to be implemented)

```ruby
puts "Error: #{error_message}" 
```

TBD: String interpolation `#{}` can be used within double-quotation `" "`.

### Comment

```ruby
puts "Goby"    # comments
```

You can use `#` as a beginning of a comment.

---------------

Good convention:

- Keep one space just after the `#` for good styling.

```ruby
puts "Goby"    #bad style
```

- Use the annotations to keep the comments concise.
    - `TODO`
    - `FIXME`
    - `OPTIMIZE`
    - `HACK`
    - `REVIEW`

### I/O

* `#puts`

* special constants: `ARGV`, `STDIN`, `STDOUT`, `STDERR`, `ENV` 

## Flow control
{: .-three-column}

### Block

```ruby
def foo(ary: [1, 2, 3])
  ary.each do |s|      # start of the block
    puts s
  end                  # end of the block
end
```

Sentences that are surrounded by `do` and `end` forms a block. Block can take one or more "block variables" surrounded by `| |`.
(`{ }` cannot be used for forming a block.)

### Conditional

```ruby
def foo(str)
  if str.size > 10
    puts "too big!"
  elsif str.size < 3
    puts "too short!"
  else
    puts "moderate"
  end
end
```

`if`, `else`, `elsif` can be used. `then` is **not** supported.

### Break

```ruby
def foo(tail)
  (5..tail).each do |t|
    if t % 2 == 0 && t % 5 == 0
      puts "ouch!"
      break
    else
      puts t
    end
  end
  puts "out of the block"
end

foo 20
#=> 5 6 7 8 9
#=> ouch!
#=> out of the block
```

You can escape the current block via `break`.

### Case

```ruby
def foo(str)
  case str
  when "Elf"
    puts "You might be Aragorn II!"
  when "Aragorn"
    puts "Long time no see, Aragorn!"
  when "Frodo", "Sam", "Gandalf"
    puts "One of us!"
  else
    puts "You're not yourself"
  end
end
```

`case`, `when`, `else` can be used.

### While

```ruby
decr = 10
while decr do
  if decr < 1
    break
  end
  puts decr
  decr -= 1
end
```

`while`, conditional and a `do`/`end` block can be used for a loop.

### Rescue

Under construction. Join [#605](https://github.com/goby-lang/goby/issues/605).

## Native class (Primary)
{: .-three-column}

Goby's "native" classes are written in Golang. Most of the can be implicitly used via literals, and cannot instantiate with `new` in principle.

### `Object`

```ruby
Bar.ancestors
#» [Bar, Foo, Object]
Bar.singleton_class.ancestors
#» [#<Class:Bar>, #<Class:Object>, Class, Object]
```

Goby's fundamental classes. `Object` is internally almost empty and just for creating singleton classes. See `Class`.

* **`Object.methods`**: `!`, `!=`, `==`, `block_given?`, `class`, `exit`, `instance_eval`, `instance_variable_get`, `instance_variable_set`, `is_a?`, `methods`, `nil?`, `object_id`, `puts`, `raise`, `require`, `require_relative`, `send`, `singleton_class`, `sleep`, `thread`, `to_s`, `<`, `<=`, `>`, `>=`, `ancestors`, `attr_accessor`, `attr_reader`, `attr_writer`, `extend`, `include`, `name`, `new`, `superclass`

* **`Object.new.methods`**: `!`, `!=`, `==`, `block_given?`, `class`, `exit`, `instance_eval`, `instance_variable_get`, `instance_variable_set`, `is_a?`, `methods`, `nil?`, `object_id`, `puts`, `raise`, `require`, `require_relative`, `send`, `singleton_class`, `sleep`, `thread`, `to_s`

### `Class`

```ruby
String.ancestors      #=> [String, Object]
```

Provides fundamental methods. `Object` and `Class` can actually be regarded as the same and you don't need to distinguish them in almost all the cases. 

Actually, the methods shown in `Object` class are implemented in this `Class` class (class.go file). 

* **`Class.methods`**: `<`, `<=`, `>`, `>=`, `ancestors`, `attr_accessor`, `attr_reader`, `attr_writer`, `extend`, `include`, `name`, `new`, `superclass`, `!`, `!=`, `==`, `block_given?`, `class`, `exit`, `instance_eval`, `instance_variable_get`, `instance_variable_set`, `is_a?`, `methods`, `nil?`, `object_id`, `puts`, `raise`, `require`, `require_relative`, `send`, `singleton_class`, `sleep`, `thread`, `to_s`

### `String`

```ruby
puts "Hello" + ' ' + 'world'  #=> Hello world
```

String literals (quoted by `" "` or `' '`) or symbol (like `:s`). Fixed to **UTF-8**, and mb4 is supported.

* **`String.methods`**: `fmt`,
    * the rest are the same as `Class.methods`
* **`"a".methods`**:  `!=`, `*`, `+`, `<`, `<=>`, `==`, `=~`, `>`, `[]`, `[]=`, `capitalize`, `chop`, `concat`, `count`, `delete`, `downcase`, `each_byte`, `each_char`, `each_line`, `empty?`, `end_with?`, `eql?`, `fmt`, `include?`, `insert`, `length`, `ljust`, `match`, `new`, `replace`, `replace_once`, `reverse`, `rjust`, `size`, `slice`, `split`, `start_with`, `strip`, `to_a`, `to_bytes`, `to_d`, `to_f`, `to_i`, `to_s`, `upcase`,
    * the rest are the same as `Object.new.methods`

### `Integer`

```ruby
37037 * 27      #=> 999999
```

Integer literal like `42` or `-99`.

* **`Integer.methods`**: the same as `Class.methods`
* **`1.methods`**: `!=`, `%`, `*`, `**`, `+`, `-`, `/`, `<`, `<=`, `<=>`, `==`, `>`, `>=`, `even?`, `new`, `next`, `odd?`, `pred`, `ptr`, `times`, `to_f`, `to_float32`, `to_float64`, `to_i`, `to_int`, `to_int16`, `to_int32`, `to_int64`, `to_int8`, `to_s`, `to_uint`, `to_uint16`, `to_uint32`, `to_uint64`, `to_uint8`
    * the rest are the same as `Object.new.methods`

### `Array`

```ruby
[1, "2", :card, [4, 5], { john: "doe" }]
```

Array literals sorrounded by `[ ]`, which can include any types of literals and objects. Some parts are written in Goby code.

* **`Array.methods`**: the same as `Class.methods`
* **`[1].methods`**: `*`, `+`, `[]`, `[]=`, `any?`, `at`, `clear`, `concat`, `count`, `delete_at`, `dig`, `each`, `each_index`, `empty?`, `first`, `flatten`, `include?`, `join`, `last`, `lazy`, `length`, `map`, `new`, `pop`, `push`, `reduce`, `reverse`, `reverse_each`, `rotate`, `select`, `shift`, `to_enum`, `unshift`, `values_at`
    * the rest are the same as `Object.new.methods`

### `Hash`

```ruby
h = { key: "value" }
h = { "key": "value" }  #=> error

h["key"]  #=> value
h[:key]   #=> value
```

Hash literals that has keys (symbols) and values (objects), surrounded by `{ }`. 

Keys in hash literals should be **symbol literals**, while Hash index can be either string or symbol literals.

* **`Hash.methods`**: the same as `Class.methods`
* **`{ key: "value" }.methods`**: `[]`, `[]=`, `any?`, `clear`, `default`, `default=`, `delete`, `delete_if`, `dig`, `each`, `each_key`, `each_value`, `empty?`, `eql?`, `fetch`, `fetch_values`, `has_key?`, `has_value?`, `keys`, `length`, `map_values`, `merge`, `new`, `select`, `sorted_keys`, `to_a`, `to_json`, `to_s`, `transform_values`, `values`, `values_at`
    * the rest are the same as `Object.new.methods`

### `Range`

```ruby
(1..10).each do |i|
  puts i ** 2
end
```

Range literals like `(1..10)`. `( )` is required for interpretation. Some parts are written in Goby code.

* **`Range.methods`**: the same as `Class.methods`
* **`(1..10).methods`**: `!=`, `==`, `bsearch`, `each`, `first`, `include?`, `last`, `lazy`, `map`, `new`, `size`, `step`, `to_a`, `to_enum`
    * the rest are the same as `Object.new.methods`

### `Block`

A special class to create a block object (anonymous function). You can perform `Block.new`.

```ruby
b = Block.new do
  100
end

b.call  #=> 100
```

Then you can perform `#call` to execute the block in the block object.

```ruby
def baz
  1000
end

class Foo
  def exec_block(block)
	block.call
  end

  def baz
    100
  end
end

b = Block.new do
  baz
end

f = Foo.new
f.exec_block(b)
```

With `Block` class, you can explicitly pass a block (or more blocks) to methods.

```ruby
b = Block.new do |arg|
  arg + 1000
end

b.call(49) #=> 1049
```

`#call` can take arguments that corresponds to the block parameters (`|arg|` above).

* **`Block.methods`**: the same as `Class.methods`
* **`(Block.new do end).methods`**: `call`
    * the rest are the same as `Object.new.methods`

## Native class (secondary)
{: .-three-column}

### `Float`

```ruby
1.1 + 1.1   # => -2.2
2.1 * -2.1  # => -4.41
```

Float literals like `3.14` or `-273.15`. `Float` class is based on Golang's `float64` type.

* **`Float.methods`**: the same as `Class.methods`
* **`3.14.methods`**: `!=`, `%`, `*`, `**`, `+`, `-`, `/`, `<`, `<=`, `<=>`, `==`, `>`, `>=`, `new`, `ptr`, `to_d`, `to_i`
    * the rest are the same as `Object.new.methods`

### `Decimal`

```ruby
"3.14".to_d            # => 3.14
"-0.7238943".to_d      # => -0.7238943
"355/113".to_d         
# => 3.1415929203539823008849557522123893805309734513274336283185840

a = "16.1".to_d
b = "1.1".to_d
e = "17.2".to_d
a + b # => 0.1
a + b == e # => true

('16.1'.to_d  + "1.1".to_d).to_s #=> 17.2
('16.1'.to_f  + "1.1".to_f).to_s #=> 17.200000000000003
```

Experimental: the size is arbitrary and internally a fraction from Golang's `big.Rat` type. Decimal literal is TBD for now and you can get `Decimal` number via `to_d` method from `Integer`/`Float`/`String`.

* **`Decimal.methods`**: the same as `Class.methods`
* **`(1.1).to_d.methods`**: `!=`, `*`, `**`, `+`, `-`, `/`, `<`, `<=`, `<=>`, `==`, `>`, `>=`, `denominator`, `fraction`, `inverse`
    * the rest are the same as `Object.new.methods`

### `Regexp`

```ruby
a = Regexp.new("orl")
a.match?("Hello World")   #=> true
a.match?("Hello Regexp")  #=> false

b = Regexp.new("😏")
b.match?("🤡 😏 😐")   #=> true
b.match?("😝 😍 😊")   #=> false

c = Regexp.new("居(ら(?=れ)|さ(?=せ)|る|ろ|れ(?=[ばる])|よ|(?=な[いかくけそ]|ま[しすせ]|そう|た|て))")
c.match?("居られればいいのに")  #=> true
c.match?("居ずまいを正す")      #=> false
```

`Regexp` is to hold a regular expression (regexp). Currently Goby has no regular expression literal (`/ /` would be adopted in future) and you can perform `Regexp.new` to get the regexp instance from string-style regexp.

`String#match` is to perform regexp match.

The class is powered by Golang's full-featured [`dlclark/regexp2`](https://github.com/dlclark/regexp2) package.

* **`Regexp.methods`**: the same as `Class.methods`
* **`Regexp.new("^aa$").methods`**: `==`, `match?`
    * the rest are the same as `Object.new.methods`

### `MatchData`

```ruby
'abcd'.match(Regexp.new('(b.)'))
#=> #<MatchData 0:"bc" 1:"bc">

'abcd'.match(Regexp.new('a(?<first>b)(?<second>c)'))
#=> #<MatchData 0:"abc" first:"b" second:"c">

» 'abcd'.match(Regexp.new('a(?<first>b)(?<second>c)')).to_h
#» { 0: "abc", first: "b", second: "c" }
```

`MatchData` is to hold matched strings after performing `String#match` or so. Thus Goby has no special global variables like `$&` in Ruby.

You can use **numbered**-captures as well as **named**-captures via `(?<name>)`. Note that the number keys in the captures are actually `String` class.

You can also use `to_h` to get the matched strings as a hash. The key `0` is the mached string.

* **`MatchData.methods`**: the same as `Class.methods`
* **`'abcd'.match(Regexp.new('(b.)')).methods`**: `captures`, `length`, `new`, `to_a`, `to_h`
    * the rest are the same as `Object.new.methods`

### `File`

```ruby
f = File.new("../test_fixtures/file_test/size.gb")
f.name  #=> "../test_fixtures/file_test/size.gb"
```

File operations. Some parts are written in Goby code.

* **`File.methods`**: `basename`, `chmod`, `delete`, `exist?`, `extname`, `join`
    * the rest are the same as `Class.methods`
* **`File.new.methods`**: `basename`, `chmod`, `close`, `delete`, `exist?`, `extname`, `join`, `name`
    * the rest are the same as `Object.new.methods`

## Native class (Golang-like)
{: .-three-column}

### `GoMap`

```ruby
h = { foo: "bar" }
m = GoMap.new(h)
h2 = m.to_hash
h2[:foo]   #=> "bar"
```

Creates a Golang's special **map** for passing values to Golang codes (map corresponds to "hash" in Goby and Ruby).

* **`GoMap.methods`**: the same as `Class.methods`
* **`GoMap.new.methods`**: `get`, `set`, `to_hash`
    * the rest are the same as `Object.new.methods`

### `Channel`

```ruby
c = Channel.new

1001.times do |i| # i start from 0 to 1000
  thread do
  	c.deliver(i)
  end
end

r = 0
1001.times do
  r = r + c.receive
end

r #=> 500500
```

`Channel` class is to hold channels to work with `#thread`. See `thread`.

* **`Channel.methods`**: the same as `Class.methods`
* **`Channel.new.methods`**: `close`, `deliver`, `new`, `receive`
    * the rest are the same as `Object.new.methods`

## Enumerator & lazy

Pretty new experimental library. Some parts are written in Goby code.

### `LazyEnumerator`

```ruby
enumerator = LazyEnumerator.new(ArrayEnumerator.new([1, 2, 3])) do |value|
	2 * value
end
result = []

enumerator.each do |value|
	result.push(value)
end

result   #=> [2, 4, 6]
```

`LazyEnumerator` is a simple wrapper to create a lazy enumrator, and should work with special enumerator classes below. 

A shorthand `#lazy` method is also provided in `Array` and `Range` by now. See "Tips & tricks" below. 

* **`LazyEnumerator.methods`**: the same as `Class.methods`
* **`[1, 2].lazy`**: `each`, `first`, `has_next?`, `initialize`, `map`, `next`
    * the rest are the same as `Object.new.methods`

### `ArrayEnumerator`

```ruby
iterated_values = []

enumerator = ArrayEnumerator.new([1, 2, 4])

while enumerator.has_next? do
	iterated_values.push(enumerator.next)
end

iterated_values   #=> [1, 2, 4]
```

A minimum enumerator for array, to provide `#has_next?` and `#next`.

* **`ArrayEnumerator.methods`**: the same as `Class.methods`
* **`ArrayEnumerator.new([1, 2, 3]).methods`**: `has_next?`, `initialize`, `next`
    * the rest are the same as `Object.new.methods`

### `RangeEnumerator`

```ruby
iterated_values = []

enumerator = RangeEnumerator.new((1..4))

while enumerator.has_next? do
	iterated_values.push(enumerator.next)
end

iterated_values   #=> [1, 2, 3, 4]
```

A minimum enumerator for range, to provide `#has_next?` and `#next`.

* **`RangeEnumerator.methods`**: the same as `Class.methods`
* **`RangeEnumerator.new(1..2).methods`**: `has_next?`, `initialize`, `next`
    * the rest are the same as `Object.new.methods`

## Special class

### `Boolean`

```ruby
true.class  #=> Boolean
false.class #=> Boolean
```

A special class that just to hold `true` and `false`. Cannot be instantiate.

### `Null`

```ruby
nil.class   #=> Null
```

A special class that just to hold `nil`. Cannot be instantiate.

### `Method`

A special dummy class that just holds methods defined by Goby code.

### `Diggable`

A special dummy class that just represents the classes that supports `#dig` method. Currently. `Array` and `Hash` classes' instance can be `Diggable`.

```ruby
[1, 2].dig(0, 1)  #=> TypeError: Expect target to be Diggable, got Integer
```

## Loadable library
{: .-three-column}

### `URI`

```ruby
require "uri"

u = URI.parse("http://example.com")
u.scheme "http"
```

* **`URI.methods`**: `parse`
    * the same as `Class.methods`
* **`URI.parse("http://example.com").methods`**: `host`, `host=`, `password`, `password=`, `path`, `path=`, `port`, `port=`, `query`, `query=`, `scheme`, `scheme=`, `user`, `user=`
    * the rest are the same as `Object.new.methods`

### `Plugin`

```ruby
require "plugin"

p = Plugin.config("db") do |c|
  c.import_pkg("", "database/sql")
  c.link_function("sql", "Open")
end

c = p.context
c.functions.first[:name] #=> "Open"
```

An experimental library to load Golang's packages, and works only on Linux by now. Some parts are written in Goby code.

### `GoObject`

```ruby
require "plugin"

p = Plugin.use "../test_fixtures/import_test/struct/struct.go"
bar, err = p.go_func("NewBar", "xyz") # multiple result, so result is an array
p.go_func("GetBarName", bar) # GetBarName is func(*Bar) string
```

An internal dummy class for Goby's plugin system. See `Plugin`.

* **`GoObject.methods`**: the same as `Class.methods`
* **`GoMap.new.methods`**: `go_func`
    * the rest are the same as `Object.new.methods`

### `DB`

```ruby
require "db"

db = DB.open("postgres", "user=postgres dbname=goby_test sslmode=disable")
db.run("create table if not exists test_items (
  id   serial primary key,
  title varchar(40)
)")

id = db.exec("INSERT INTO test_items (title) VALUES ('Stan')")
results = db.query("SELECT EXISTS(SELECT * FROM test_items WHERE id = $1)", id)

db.run("drop table test_items")

results.first[:exists]
```

Only PostgreSQL is supported for now. Some parts are written in Goby code.

* **`DB.methods`**: `get_connection`
    * the rest are the same as `Class.methods`
* **`DB.new.methods`**: `close`, `conn_obj`, `connection`, `exec`, `get_connection`, `initialize`, `ping`, `query`, `run`
    * the rest are the same as `Object.new.methods`

### `JSON`

```ruby
require "json"
a = JSON.parse('[{"Name": "Stan"}]')
h = a.first
h["Name"]   #=> "Stan"
```

JSON parser.See also the "Tips & Trick" below.

* **`JSON.methods`**: `parse`, `validate`
    * the rest are the same as `Class.methods`
* **`JSON.new.methods`**: `parse`, `validate`
    * the rest are the same as `Object.new.methods`

### `Net::HTTP`

```ruby
require "net/http"

Net::HTTP.get("http://127.0.0.1:3000/index")
```

* **`Net::HTTP.methods`**: `get`, `head`, `post`, `start`
    * the rest are the same as `Class.methods`
* **`Net::HTTP.new.methods`**: `get`, `head`, `post`, `start`
    * the rest are the same as `Object.new.methods`

### `Net::HTTP::Request`

```ruby
require "net/http"

req = Net::HTTP::Request.new
req.method = "GET"

req.method
```

* **`Net::HTTP::Request.methods`**: the same as `Class.methods`
* **`Net::HTTP::Request.new.methods`**: `body`, `body=`, `content_length`, `content_length=`, `get_header`, `headers`, `host`, `host=`, `initialize`, `method`, `method=`, `params`, `params=`, `path`, `path=`, `protocol`, `protocol=`, `remove_header`, `set_header`, `transfer_encoding`, `transfer_encoding=`, `url`, `url=`
    * the rest are the same as `Object.new.methods`

### `Net::HTTP::Response`

```ruby
require "net/http"

res = Net::HTTP::Response.new

res.body = "test"
res.status = 200

res.body
```

* **`Net::HTTP::Response.methods`**: the same as `Class.methods`
* **`Net::HTTP::Response.new.methods`**: `body`, `body=`, `get_header`, `headers`, `http_version`, `http_version=`, `initialize`, `protocol`, `protocol=`, `remove_header`, `request`, `request=`, `request_http_version`, `request_http_version=`, `set_header`, `status`, `status=`, `status_code`, `status_code=`, `transfer_encoding`, `transfer_encoding=`
    * the rest are the same as `Object.new.methods`

### `Net::HTTP::Client`

```ruby
require "net/http"

c = Net::HTTP::Client.new

res = c.send do |req|
  req.url = "https://google.com"
  req.method = "GET"
end

puts res.body
```

* **`Net::HTTP::Client.methods`**: the same as `Class.methods`
* **`Net::HTTP::Client.new.methods`**: `exec`, `get`, `head`, `post`, `request`
    * the rest are the same as `Object.new.methods`

### `Net::SimpleServer`

```ruby
require "net/simple_server"

server = Net::SimpleServer.new("3000")

i = 0

server.get("/") do |req, res|
  puts(i)
  i = i+1
  res.body = req.method + " Hello World"
  res.status = 200
end

server.get("/not_found") do |req, res|
  res.body = "Not Found"
  res.status = 404
end

server.start
```

* **`Net::SimpleServer.methods`**: the same as `Class.methods`
* **`Net::SimpleServer.new("80").methods`**: `delete`, `file_root`, `file_root=`, `get`, `head`, `initialize`, `mount`, `port`, `post`, `put`, `start`, `static`
    * the rest are the same as `Object.new.methods`

## Threading/concurrency
{: .-three-column}

### Thread

```ruby
def f(from)
  i = 0
  while i < 3 do
    puts(from + ": " + i.to_s)
    i += 1
  end
end

f("direct")

thread do
  f("thread")
end

thread do
  puts("going")
end

sleep(2) # This is to prevent main program finished before goroutine.
```

Goby's `thread` is a method (`Class#method`), not a keyword. `thread` directly takes advantage of Golang's goroutine.

### Thread and channel

```ruby
c = Channel.new

i = 0
thread do
  i += 1
  c.deliver(i)
end

# Used to block main process until thread is finished
c.receive
i #=> 1

c = Channel.new
```

```ruby
i = 0
thread do
  i += 1
  c.deliver(i)
end

# if we put i += 1 here than it will execute along with other thread,
# which will cause raise condition
# Used to block main process until thread is finished
c.receive
i += 1
i #=> 2
```

You can use `Channel` class for communication between threads. The class also takes advantage of Golang's `Channel`.

### Concurrent array

```ruby
require 'concurrent/array'
a = Concurrent::Array.new([1, 2 ,3 ,5 , 10])
a[0] = a[1] + a[2] + a[3] * a[4]
```

`Concurrent::Array` is a thread-safe Array class, implemented as a wrapper of an ArrayObject, coupled with an R/W mutex.

We don't implement `dig` to the class, as it has no concurrency guarantees.

* **`Concurrent::Array.methods`**: the same as `Object.methods`
* **`Concurrent::Array.new.methods`**: `[]`, `*`, `+`, `[]=`, `any?`, `at`, `clear`, `concat`, `count`, `delete_at`, `each`, `each_index`, `empty?`, `first`, `flatten`, `join`, `last`, `length`, `map`, `pop`, `push`, `reduce`, `reverse`, `reverse_each`, `rotate`, `select`, `shift`, `unshift`, `values_at`
    * the rest are the same as `Array.new.methods`

### Concurrent hash

```ruby
require 'concurrent/hash'
hash = Concurrent::Hash.new({ "a": 1, "b": 2 })
hash["a"]  # => 1
```

`Concurrent::Hash` is an implementation of thread-safe associative arrays (Hash).

The implementation internally uses Go's `sync.Map` type, with some advantages and disadvantages:

- It is highly performant and predictable for a certain pattern of usage:
  - *concurrent loops with keys that are stable over time, and either few steady-state stores, or stores localized to one goroutine per key*
- Performance and predictability in other conditions are unspecified
- Iterations are non-deterministic; during iterations, keys may not be included
- Size can't be retrieved
- For the reasons above, the Hash APIs implemented are minimal

For details, see https://golang.org/pkg/sync/#Map.

* **`Concurrent::Hash.methods`**: the same as `Object.methods`
* **`Concurrent::Hash.new.methods`**: `[]`, `delete_`, `each`, `has_key?`, `to_json`, `to_s`
    * the rest are the same as `Hash.new.methods`

### Concurrent rw rock

```ruby
require 'concurrent/rw_lock'
lock = Concurrent::RWLock.new
lock.with_read_lock do
  # critical section
end
lock.with_write_lock do
  # critical section
end
```

`Concurrent::RWLock` is a Readers-Writer Lock (readers can concurrently put a lock, while a writer requires exclusive access). The implementation internally uses Go's `sync.RWLock` type.

* **`Concurrent::Hash.methods`**: the same as `Object.methods`
* **`Concurrent::Hash.new.methods`**: `acquire_read_lock`, `acquire_write_lock`, `release_read_lock`, `release_write_lock`, `with_read_lock`, `with_write_lock`
    * the rest are the same as `Hash.new.methods`

## Testing framework

### `Spec`

```ruby
require "spec"

Spec.describe Spec do
  it "fails and exit with code 1" do
	expect(1).to eq(2)
  end
end

Spec.run
```

`Spec` is a loadable library to test Goby's codes, and is very new. Written in pure Goby.

* **`Spec.methods`**: `describe`, `describes`, `instance`, `run`
    * the rest are the same as `Object.methods`
* **`Spec.new.methods`**: `describes`, `initialize`, `run`, `session_successful`, `session_successful=`
    * the rest are the same as `Hash.new.methods`

## Tips & tricks

### JSON and `#to_json`

In Goby, you don't need jbuilder or other json template library. All you need is `Hash#to_json`:

```ruby
h = { a: 1, b: [1, "2", [4, 5, nil]]}
h.to_json #=> {"a":1, "b":[1, "2", [4, 5, null]]}
```

Furthermore, you can customize the serialization rule by overwriting `#to_json` in your class:

```ruby
class JobTitle
  def initialize(name)
    @name = name
  end

  def to_json
    { title: @name }.to_json
  end
end

class Person
  def initialize(name, age)
    @name = name
    @age = age
    @job = JobTitle.new("software engineer")
  end

  def to_json
    { name: @name, age: @age, job: @job }.to_json
  end
end

stan = Person.new("Stan", 23)
h = { person: stan }
h.to_json #=> {"person":{"name":"Stan","job":{"title":"software engineer"},"age":23}}
```

### Lazy enumeration

```ruby
enumerator = [1, 2, 3].lazy.map do |value|
	2 * value
end
result = []

enumerator.each do |value|
	result.push(value)
end

result  #=> [2, 4, 6]
```	

You can call `#lazy.map` on `Array`, `Range`, or `JSON` objects. This would help you to avoid N + 1 query.

## Goby terminology

### A

* **Argument** (arg): to be used in *method call*.

### B

* **Block**: `do`-`end`, `if`-`end`, `case`-`end`. 

### C

* **Constant**: Constants and class/module names are not the same. The latter can be redefined while the former is not reentrant.
* **Composition**: 
* **Composition over inheritance**: A principle of OOPs. One of Goby's motto.

### D

* **Duck-typing**: a preferable coding in Goby, as same as in Ruby.

### G

* **Go language** (golang): Goby's father and a mentor.

### M

* **Metaprogramming**: basically eliminated in Goby.
* **Module method**: actually a singleton method on a module.
* **Monkey patch**: still possible in Goby.

### P

* **Parameter** (param): to be used in *method definitions*.
* **Polymorphism**: Preferable coding in Goby, achieved by **duck-typing**.

### R

* **Ruby**: Goby's mother.

### S

* **Singleton method**: a method only for a specific object. Module methods and class methods are singleton methods.
* **st0012**: Creator of Goby. [https://github.com/st0012](https://github.com/st0012)
* **`super`**: eliminated in Goby.

## References

### Official

* Official site: [https://goby-lang.org/](https://goby-lang.org/)
* Repository: [https://github.com/goby-lang/goby/](https://github.com/goby-lang/goby/)
* DevHints: [https://devhints.io/goby](https://devhints.io/goby) (this page)

### Readings for Goby developers

* [Write an Interpreter in Go](https://interpreterbook.com/)
* [Nand2Tetris II](https://www.coursera.org/learn/nand2tetris2/home/welcome)
* [Ruby under a microscope](http://patshaughnessy.net/ruby-under-a-microscope)
* [YARV's instruction table](http://www.atdot.net/yarv/insnstbl.html)

### JP resource

* [Goby: Rubyライクな言語（1）Gobyを動かしてみる](https://techracho.bpsinc.jp/hachi8833/2017_11_10/47787)
* [Gobyの組み込みクラスにメソッドを追加する方法](https://qiita.com/hanachin_/items/efc1c976a4f5749514ef)