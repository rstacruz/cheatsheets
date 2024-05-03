---
title: Goby
prism_languages: [ruby]
weight: -3
updated: 2018-12-06
category: Ruby
intro: |
  Goby's language design is based on Ruby language's, slim and shaped up. Differences in syntax between them is very small.
---


## Getting started

### Hello world
{: .-prime}

#### hello.gb
{: .-file}

```ruby
class Greet
  attr_accessor :audience, :head, :tail
  
  def initialize
    @head = "Hello, "
    @tail = "!"
  end

  def name
    audience.name
  end

  def say
    puts head + name + tail
  end
end

module MyName
  attr_reader :name

  def initialize
    @name = self.class.to_s
  end
end

class World
  include MyName
end

greet = Greet.new
greet.audience = World.new
greet.say
```

Then run:

```bash
$ goby hello.gb
#=> Hello, World!
```

### REPL (igb)

```bash
$ goby -i
```

* `reset`: reset the VM
* `exit`: exit REPL
* `help`: show help
* ctrl-c: cancel the block entered, or exit (on top level)

See [igb manual & test script](https://github.com/goby-lang/goby/blob/master/igb/manual_test.md). You can use `readline` features such as command history by arrow keys.

## Variables
{: .-three-column}

### Local variable

```ruby
zip101 = "233-7383"
magic_number = 42
```

Should be "`[a-z][a-z0-9_]+`"(snake_case).

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

Should be "`@[a-z][a-z0-9_]+`"(snake_case).

### Multiple assignment

```ruby
# array literal
a, b, c = [1, 2, 3]

# array with '*'
a = [1, 2, 3]
x, y, z = *a

# array literal with '*'
a, b, c = *[1, 2, 3]

# bare assignment: unsupported
a, b, c = 1, 2, 3  #=> unexpected 3 Line: 0
```

### Black hole variable

```ruby
# '_' is write-only
a, _ = [1, 2]
```

### Class variable

Unsupported.

### Global variable

Unsupported.

## Method definition

### Method definition and calling

```ruby
def foo_bar?(baz)
  if baz == "Hi, Goby!"
    true
  else
    false
  end
end

foo_bar? "Hi, Goby!" #=> true
```

Method name should be "`[a-z][a-z0-9_]+\??`" (snake_case). You can omit the trailing "`()`" only if no parameters are taken. Trailing using "`!`" is **unsupported**.

### Order of method parameter

```ruby
def foo(normal, default="value", hash={}, ary=[], keyword:, keyword_default:"key", *sprat)
end
```

If a default value is provided to a parameter, the parameter can be omitted when calling. `()` can be omitted. The order of parameters in method definition is restricted as follows:

1. **normal parameters** (like `a`)
2. **normal parameters with default value** (like `a=1`)
3. **optional parameters** (array or hash, like `ary=[]` or `hs={}`)
4. **keyword parameters** (like `kwd:`) 
5. **keyword parameters with default value** (like `kwd: 1` or `ary: [1,2,3]` or `hsh: {key: "value"}`)
6. **splat parameters** (like `*sp`)

Or you will receive an error.

### Keyword parameter (WIP)

```ruby
def foo(process:, verb: :GET, opt:{ csp: :enabled }, ary: [1, 2, 3])
end
```

### Returning value

```ruby
PI = 3.14
def area(radius)
  radius * PI      # returns the result of evaluation
end

area 6             #=> 18.84
```

### Returning multiple value

```ruby
def my_array
  [1, 2, 3]
end

my_array   #=> [1, 2, 3]
```

### Instance method

```ruby
module Foo
  def bar       # defining instance method
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

### Singleton method #1

```ruby
str = "Goby"
def str.foo     #1 singleton method on the object
  self * 2
end

str.foo
#=> GobyGoby
```

### Singleton method #2

```ruby
module Foo
  def self.bar  #2 singleton method with `self.`
    92
  end
end
```

### Singleton method #3

```ruby
module Foo  
  def Foo.bar   #3 singleton method with a class name (unrecommended)
    88
  end
end
```

### Singleton method #4

```ruby
module Foo end

def Foo.bar     #4 singleton methods outside the Foo
  9999
end

Foo.bar #=> 9999
```

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

### Private method (to be implemented)

```ruby
class Foo
  def bar
    42
  end
  
  def _baz  # leading '_' means private method
    99
  end
end
```

## Module/Class definition
{: .-three-column}

### Module definition and `include`

```ruby
module Foo
  def foo
    "Foo's instance method"
  end
end

class Bar
  include Foo   # to include Foo
end

Bar.new.foo     #=> Foo's instance method
```

Module names should be "`[A-Z][A-Za-z0-9_]+`" (UpperCamelCase). Modules cannot be inherited.

### Module definition and `extend`

```ruby
module Foo
  def foo
    "Foo's instance method will be a singleton method"
  end
end

class Bar
  extend Foo   # to extend Foo  
end

Bar.foo        #=> Foo's instance method will be a singleton method
```

`extend` is to use the instance methods in the specified modules as **singleton methods** in your class or module. 

### Module instantiation

```ruby
module Foo   #module definition
  def foo   
    99
  end
end

Foo.new.foo  #=> 99
```

Actually, Goby's module can be even **instantiated** via "`new`" like "`Foo.new`".

### Class definition and inheritance

```ruby
class Foo       # class definition
  def bar
    99
  end
end

class Baz < Foo # inheritance
end

Baz.new.bar  #=> 99
```

Class names should be "`[A-Z][A-Za-z0-9]+`" (UpperCamelCase). Inheritance with "`<`" is supported.

### Constants

```ruby
HTTP_ERROR_404 = 404
HTTP_ERROR_404 = 500    # error
```

Constants should be "`[A-Z][A-Za-z0-9_]+`" (UPPER_SNAKECASE). Constants are **not reentrant** and the scope is **global**.

### Redefining class/modules

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

Foo::Bar.new.baz     # Use '::' for namespacing
Foo::Bar::MAGIC      # Use '::' for namespacing
```

## Load library

### `require`

```ruby
require("uri")   # to activate URL class

u = URI.parse("http://example.com")
u.scheme   #=> "http"
```	

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

## Literal
{: .-three-column}

### Keyword

`def`, `true`, `false`, `nil`, `if`, `elsif`, `else`, `case`, `when`, `return`, `self`, `end`, `while`, `do`, `yield`, `get_block`, `next`, `class`, `module`, `break`

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

Goby's symbol (using `:`) is always `String` class.

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

Hash literal's keys should always be **symbol literals**. 

### Range literal

```ruby
(1..10).each do |x|    # '..' represents a range
  puts x*x
end
```

### Boolean and `nil`

```ruby
true       # Boolean class
false      # Boolean class
nil        # Null class

!nil  #=> true
```

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
()          # changing priority of interpretation
[]          # array literal
*           # multiple assignment
..          # range
```

*Priority of operators are TBD

### Delimiter

```ruby
class Foo; end   # ';' to delimit

class Bar end    # recommended
```

### String interpolation (to be implemented)

```ruby
puts "Error: #{error_message}"  # double quotation is required
```

### Comment

```ruby
puts "Goby"    # comments
```

Use the annotations to keep the comments concise.

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

### `if`, `else`, `elsif`

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

`then` is **not** supported.

### Break

```ruby
def foo(tail)
  (5..tail).each do |t|
    if t % 2 == 0 && t % 5 == 0
      puts "ouch!"
      break       # finish the block
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

## Block
{: .-three-column}

### Block

```ruby
def foo(ary: [1, 2, 3])
  ary.each do |s|      # start of the block with |block variable|
    puts s
  end                  # end of the block
end
```

`{ }` cannot be used for forming a block.

### `yield`

```ruby
def foo
  yield(10)  # executes the block given
end

foo do |ten|
  ten + 20
end
```

### Block object and `call`

```ruby
b = Block.new do
  100
end

b.call  #=> 100
```

`Block.new` can take a block and then `call`.

### Passing a block

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

### Passing a block with block arguments

```ruby
b = Block.new do |arg, offset|
  arg + 1000 - offset
end

b.call(49, 500) #=> 549
```

### Special `get_block` keyword

```ruby
def bar(block)
  # runs the block object and the block arg simultaneously
  block.call + get_block.call
end

def foo
  bar(get_block) do # passes two blocks to `bar`
    20
  end
end

foo do
  10
end
```

`get_block` is not a method but a **keyword** to retrieve a given block argument as a block object. By this, you can pass around or `call` the given block arguments as block objects. 

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

## Native class (Primary)
{: .-three-column}

Goby's most "native" classes cannot instantiate with `new` in principle. 

### `Object`

```ruby
Bar.ancestors
#» [Bar, Foo, Object]
Bar.singleton_class.ancestors
#» [#<Class:Bar>, #<Class:Object>, Class, Object]
```

`Object` is actually just for creating singleton classes. See `Class`.

* **`Object.methods`**: `!`, `!=`, `==`, `block_given?`, `class`, `exit`, `instance_eval`, `instance_variable_get`, `instance_variable_set`, `is_a?`, `methods`, `nil?`, `object_id`, `puts`, `raise`, `require`, `require_relative`, `send`, `singleton_class`, `sleep`, `thread`, `to_s`, `<`, `<=`, `>`, `>=`, `ancestors`, `attr_accessor`, `attr_reader`, `attr_writer`, `extend`, `include`, `name`, `new`, `superclass`

* **`Object.new.methods`**: `!`, `!=`, `==`, `block_given?`, `class`, `exit`, `instance_eval`, `instance_variable_get`, `instance_variable_set`, `is_a?`, `methods`, `nil?`, `object_id`, `puts`, `raise`, `require`, `require_relative`, `send`, `singleton_class`, `sleep`, `thread`, `to_s`

### `Class`

```ruby
String.ancestors      #=> [String, Object]
```

`Class` and `Object`can actually be regarded as the same and you don't need to distinguish them in almost all the cases. 

* **`Class.methods`**: `<`, `<=`, `>`, `>=`, `ancestors`, `attr_accessor`, `attr_reader`, `attr_writer`, `extend`, `include`, `name`, `new`, `superclass`, `!`, `!=`, `==`, `block_given?`, `class`, `exit`, `instance_eval`, `instance_variable_get`, `instance_variable_set`, `is_a?`, `methods`, `nil?`, `object_id`, `puts`, `raise`, `require`, `require_relative`, `send`, `singleton_class`, `sleep`, `thread`, `to_s`

### `String`

```ruby
puts "Hello" + ' ' + 'world'  #=> Hello world
```

Fixed to **UTF-8** with mb4 support.

* **`String.methods`**: `fmt`,
    * the rest: `Class.methods`
* **`"a".methods`**:  `!=`, `*`, `+`, `<`, `<=>`, `==`, `=~`, `>`, `[]`, `[]=`, `capitalize`, `chop`, `concat`, `count`, `delete`, `downcase`, `each_byte`, `each_char`, `each_line`, `empty?`, `end_with?`, `eql?`, `fmt`, `include?`, `insert`, `length`, `ljust`, `match`, `new`, `replace`, `replace_once`, `reverse`, `rjust`, `size`, `slice`, `split`, `start_with`, `strip`, `to_a`, `to_bytes`, `to_d`, `to_f`, `to_i`, `to_s`, `upcase`,
    * the rest: `Object.new.methods`

### `Integer`

```ruby
37037 * 27      #=> 999999
```

* **`Integer.methods`**: the same as `Class.methods`
* **`1.methods`**: `!=`, `%`, `*`, `**`, `+`, `-`, `/`, `<`, `<=`, `<=>`, `==`, `>`, `>=`, `even?`, `new`, `next`, `odd?`, `pred`, `ptr`, `times`, `to_f`, `to_float32`, `to_float64`, `to_i`, `to_int`, `to_int16`, `to_int32`, `to_int64`, `to_int8`, `to_s`, `to_uint`, `to_uint16`, `to_uint32`, `to_uint64`, `to_uint8`
    * the rest: `Object.new.methods`

### `Array`

```ruby
[1, "2", :card, [4, 5], { john: "doe" }]
```

* **`Array.methods`**: the same as `Class.methods`
* **`[1].methods`**: `*`, `+`, `[]`, `[]=`, `any?`, `at`, `clear`, `concat`, `count`, `delete_at`, `dig`, `each`, `each_index`, `empty?`, `first`, `flatten`, `include?`, `join`, `last`, `lazy`, `length`, `map`, `new`, `pop`, `push`, `reduce`, `reverse`, `reverse_each`, `rotate`, `select`, `shift`, `to_enum`, `unshift`, `values_at`
    * the rest: `Object.new.methods`

### `Hash`

```ruby
h = { key: "value" }
h = { "key": "value" }  #=> error

h["key"]  #=> value
h[:key]   #=> value
```

Keys in hash literals should be **symbol literals**, while Hash index can be either string or symbol literals.

* **`Hash.methods`**: the same as `Class.methods`
* **`{ key: "value" }.methods`**: `[]`, `[]=`, `any?`, `clear`, `default`, `default=`, `delete`, `delete_if`, `dig`, `each`, `each_key`, `each_value`, `empty?`, `eql?`, `fetch`, `fetch_values`, `has_key?`, `has_value?`, `keys`, `length`, `map_values`, `merge`, `new`, `select`, `sorted_keys`, `to_a`, `to_json`, `to_s`, `transform_values`, `values`, `values_at`
    * the rest: `Object.new.methods`

### `Range`

```ruby
(1..10).each do |i|
  puts i ** 2
end
```

* **`Range.methods`**: the same as `Class.methods`
* **`(1..10).methods`**: `!=`, `==`, `bsearch`, `each`, `first`, `include?`, `last`, `lazy`, `map`, `new`, `size`, `step`, `to_a`, `to_enum`
    * the rest: `Object.new.methods`

### `Block`

```ruby
b = Block.new do
  100
end

b.call  #=> 100
```

* **`Block.methods`**: the same as `Class.methods`
* **`(Block.new do end).methods`**: `call`
    * the rest: `Object.new.methods`

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
    * the rest: `Object.new.methods`

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
    * the rest: `Object.new.methods`

### `Regexp`

```ruby
a = Regexp.new("orl")
a.match?("Hello World")   #=> true
a.match?("Hello Regexp")  #=> false

b = Regexp.new("😏")
b.match?("🤡 😏 😐")    #=> true
b.match?("😝 😍 😊")    #=> false

c = Regexp.new("居(ら(?=れ)|さ(?=せ)|る|ろ|れ(?=[ばる])|よ|(?=な[いかくけそ]|ま[しすせ]|そう|た|て))")
c.match?("居られればいいのに")  #=> true
c.match?("居ずまいを正す")      #=> false
```

Using `/ /` is to be implemented.

* **`Regexp.methods`**: the same as `Class.methods`
* **`Regexp.new("^aa$").methods`**: `==`, `match?`
    * the rest: `Object.new.methods`

### `MatchData`

```ruby
# numbered capture
'abcd'.match(Regexp.new('(b.)'))
#=> #<MatchData 0:"bc" 1:"bc">

# named capture
'abcd'.match(Regexp.new('a(?<first>b)(?<second>c)'))
#=> #<MatchData 0:"abc" first:"b" second:"c">

# converting to hash
» 'abcd'.match(Regexp.new('a(?<first>b)(?<second>c)')).to_h
#» { 0: "abc", first: "b", second: "c" }
```

The number keys in the captures are actually `String` class.The key `0` is the matched string.

* **`MatchData.methods`**: the same as `Class.methods`
* **`'abcd'.match(Regexp.new('(b.)')).methods`**: `captures`, `length`, `new`, `to_a`, `to_h`
    * the rest: `Object.new.methods`

### `File`

```ruby
f = File.new("../test_fixtures/file_test/size.gb")
f.name  #=> "../test_fixtures/file_test/size.gb"
```

* **`File.methods`**: `basename`, `chmod`, `delete`, `exist?`, `extname`, `join`
    * the rest: `Class.methods`
* **`File.new.methods`**: `basename`, `chmod`, `close`, `delete`, `exist?`, `extname`, `join`, `name`
    * the rest: `Object.new.methods`

## Native class (Golang-oriented)
{: .-three-column}

### `GoMap`

```ruby
h = { foo: "bar" }
m = GoMap.new(h)    # to pass values to Golang's code
h2 = m.to_hash
h2[:foo]   #=> "bar"
```

* **`GoMap.methods`**: the same as `Class.methods`
* **`GoMap.new.methods`**: `get`, `set`, `to_hash`
    * the rest: `Object.new.methods`

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
    * the rest: `Object.new.methods`

## Enumerator & lazy

Pretty new experimental library.

### `LazyEnumerator`

```ruby
# creating a lazy enumerator
enumerator = LazyEnumerator.new(ArrayEnumerator.new([1, 2, 3])) do |value|
	2 * value
end
result = []

enumerator.each do |value|
	result.push(value)
end

result   #=> [2, 4, 6]
```

A shorthand `#lazy` method is also provided in `Array` and `Range` by now. See "Tips & tricks" below. 

* **`LazyEnumerator.methods`**: the same as `Class.methods`
* **`[1, 2].lazy`**: `each`, `first`, `has_next?`, `initialize`, `map`, `next`
    * the rest: `Object.new.methods`

### `ArrayEnumerator`

```ruby
iterated_values = []

enumerator = ArrayEnumerator.new([1, 2, 4])

while enumerator.has_next? do
	iterated_values.push(enumerator.next)
end

iterated_values   #=> [1, 2, 4]
```

* **`ArrayEnumerator.methods`**: the same as `Class.methods`
* **`ArrayEnumerator.new([1, 2, 3]).methods`**: `has_next?`, `initialize`, `next`
    * the rest: `Object.new.methods`

### `RangeEnumerator`

```ruby
iterated_values = []

enumerator = RangeEnumerator.new((1..4))

while enumerator.has_next? do
	iterated_values.push(enumerator.next)
end

iterated_values   #=> [1, 2, 3, 4]
```

* **`RangeEnumerator.methods`**: the same as `Class.methods`
* **`RangeEnumerator.new(1..2).methods`**: `has_next?`, `initialize`, `next`
    * the rest: `Object.new.methods`

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

(A special dummy class that just holds methods defined by Goby code.)

### `Diggable`

Provides `#dig` method. Currently. `Array` and `Hash` classes' instance can be `Diggable`.

```ruby
[1, 2].dig(0, 1)  #=> TypeError: Expect target to be Diggable, got Integer
```

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

* **`Spec.methods`**: `describe`, `describes`, `instance`, `run`
    * the rest: `Object.methods`
* **`Spec.new.methods`**: `describes`, `initialize`, `run`, `session_successful`, `session_successful=`
    * the rest: `Hash.new.methods`

## Tips & tricks

### Showing methods

```ruby
» "string".methods
#» ["!=", "*", "+", "<", "<=>", "==", "=~", ">", "[]", "[]=", "capitalize", "chop", "concat", "count", "delete", "downcase", "each_byte", "each_char", "each_line", "empty?", "end_with?", "eql?", "fmt", "include?", "insert", "length", "ljust", "match", "new", "replace", "replace_once", "reverse", "rjust", "size", "slice", "split", "start_with", "strip", "to_a", "to_bytes", "to_d", "to_f", "to_i", "to_s", "upcase", "!", "block_given?", "class", "exit", "instance_eval", "instance_variable_get", "instance_variable_set", "is_a?", "methods", "nil?", "object_id", "puts", "raise", "require", "require_relative", "send", "singleton_class", "sleep", "thread"]
```

### Showing class

```ruby
» "string".class
#» String
```

### Showing singleton class

```ruby
» "moji".singleton_class
#» #<Class:#<String:842352325152>>

» "moji".class.singleton_class
#» #<Class:String>
```

### Showing ancestors

```ruby
» Integer.ancestors
#» [Integer, Object]

» "moji".class.ancestors
#» [String, Object]
```

### Showing singleton classes' ancestors

```ruby
» "moji".class.singleton_class.ancestors
#» [#<Class:String>, #<Class:Object>, Class, Object]
```

### Showing object's id

```ruby
» "moji".object_id
#» 842352977920
```

### `#to_json`

```ruby
h = { a: 1, b: [1, "2", [4, 5, nil]]}
h.to_json         # converts hash to JSON
#=> {"a":1, "b":[1, "2", [4, 5, null]]}
```

### Customize `#to_json`

Overwrite the `#to_json` in your class:

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

To avoid N + 1 query.

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

You can call `#lazy.map` on `Array`, `Range`, or `JSON` objects. 

## Styling

### Quick style guide

* UTF-8 should be used.
* Only two spaces `  ` should be used for one indentation.
    * Tab cannot be used for indentation.
* For more, follow [RuboCop's style guide](https://github.com/bbatsov/ruby-style-guide) in principle.

### Document notation

* `Class#instance_method` -- use `#` to represent instance methods in documents
* `Class.class_method`
* `Module.module_method`

### Syntax highlighting

Ready for Vim and Sublime text. You can also use Ruby's syntax highlighting so far.

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
