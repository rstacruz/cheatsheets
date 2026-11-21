---
title: PHP
subtitle: General-purpose scripting language
category: C-like
updated: 2026-11-21
tier: t1
prism_languages: [php]
fragments:
  - "<?php"
  - "echo $x"
  - "$a ?? $b"
  - "fn($x) => $x"
  - "->"
  - "array_map"
  - "isset($x)"
  - "new Person()"
  - "public function"
  - "foreach"
  - "$this->"
  - "var_dump($x)"
  - "#[Attr]"
  - "match ($x)"
intro: |
  [PHP](https://www.php.net/) is a general-purpose scripting language for web and CLI. This reference covers syntax, arrays, functions, objects, and common tasks.
links:
  - title: PHP manual
    url: https://www.php.net/manual/en/
  - title: Language reference
    url: https://www.php.net/manual/en/langref.php
---

## Getting started
<!-- {: .-three-column} -->

### PHP tags

```php
<?php
echo 'Hello, world!';
```

A block opens with `<?php`; `?>` closes it (optional at end of file). `<?=` is shorthand for `echo`.

See: [PHP tags](https://www.php.net/manual/en/language.basic-syntax.phptags.php)

### Hello world
<!-- {: .-prime} -->

#### hello.php
<!-- {: .-file} -->

```php
<?php
function greetMe(string $name): string
{
    return "Hello, " . $name . "!";
}

echo greetMe('world'); // Hello, world!
```

See: [User-defined functions](https://www.php.net/manual/en/functions.user-defined.php)

### Running PHP

```bash
$ php hello.php        # Hello, world!
$ php -a               # REPL
$ php -l hello.php     # lint syntax
```

See: [Command-line usage](https://www.php.net/manual/en/features.commandline.usage.php)

### Variables

```php
<?php
$x = 10;        // int
$name = 'Ada';  // string
echo $x;        // 10
echo $name;     // Ada
```

See: [Variables](https://www.php.net/manual/en/language.variables.basics.php)

### Constants

```php
<?php
const MAX = 100;
define('GREETING', 'Hello');

echo MAX;       // 100
echo GREETING;  // Hello
```

See: [Constants](https://www.php.net/manual/en/language.constants.php)

### Comments

```php
<?php
// single line
# hash comment
/* block */
/** docblock */
```

See: [Comments](https://www.php.net/manual/en/language.basic-syntax.comments.php)

## Basic types
<!-- {: .-three-column} -->

### Strings

```php
<?php
$s = 'single';
$t = 'double';
echo $s . $t; // singledouble
```

Single quotes are literal; double quotes interpolate variables.

See: [Strings](https://www.php.net/manual/en/language.types.string.php)

### Numbers

```php
<?php
$i = 42;     // int
$f = 3.14;   // float
$e = 1_000;  // int
echo $i + $f; // 45.14
```

See: [Integers](https://www.php.net/manual/en/language.types.integer.php)

### Booleans and null

```php
<?php
var_dump(true); // bool(true)
var_dump(null); // NULL
```

See: [Booleans](https://www.php.net/manual/en/language.types.boolean.php)

### Type declarations

```php
<?php
function id(int|string $x): int|string
{
    return $x;
}

echo id(7); // 7
```

Union types accept any listed type; `mixed` accepts anything.

See: [Type declarations](https://www.php.net/manual/en/language.types.declarations.php)

### Type juggling

```php
<?php
var_dump('5' + 2);   // int(7)
var_dump(5 == '5');  // bool(true)
var_dump(5 === '5'); // bool(false)
```

Loose comparisons coerce; `===` compares type and value.

See: [Type juggling](https://www.php.net/manual/en/language.types.type-juggling.php)

## Arrays

### Indexed arrays

```php
<?php
$fruits = ['apple', 'banana', 'pear'];
echo $fruits[1];     // banana
echo count($fruits); // 3
```

See: [Arrays](https://www.php.net/manual/en/language.types.array.php)

### Associative arrays

```php
<?php
$prices = [
    'apple' => 20,
    'banana' => 30,
];
echo $prices['banana']; // 30
```

#### Cast to object

```php
<?php
$prices = ['apple' => 20, 'banana' => 30];
$object = (object) $prices;
echo $object->banana; // 30
```

An `(object)` cast turns string keys into readable properties.

See: [Array syntax](https://www.php.net/manual/en/language.types.array.php#language.types.array.syntax)

### Array operations

```php
<?php
$items = ['a', 'b'];
$items[] = 'c';
array_push($items, 'd');
unset($items[0]);
echo implode(',', $items); // b,c,d
```

See: [Array functions](https://www.php.net/manual/en/ref.array.php)

### Sorting and mapping

#### Sort

```php
<?php
$nums = [3, 1, 2];
sort($nums);
echo implode(',', $nums); // 1,2,3
```

#### Map and filter

```php
<?php
$nums = [1, 2, 3];
$doubled = array_map(fn($n) => $n * 2, $nums);
echo implode(',', $doubled); // 2,4,6

$even = array_filter([1, 2, 3, 4], fn($n) => $n % 2 === 0);
echo implode(',', $even); // 2,4
```

See: [array_map](https://www.php.net/manual/en/function.array-map.php)

### Destructuring

```php
<?php
$user = ['Ada', 'admin'];
[$name, $role] = $user;
echo "$name: $role"; // Ada: admin
```

See: [Array destructuring](https://www.php.net/manual/en/language.types.array.php)

## Strings

### Interpolation

```php
<?php
$name = 'world';
echo "Hello, $name"; // Hello, world
echo 'Hello, $name'; // Hello, $name
```

#### Complex syntax

```php
<?php
$user = ['name' => 'Ada'];
echo "Hi, {$user['name']}!"; // Hi, Ada!
```

See: [String parsing](https://www.php.net/manual/en/language.types.string.php#language.types.string.parsing)

### Common operations

```php
<?php
echo strtoupper('hello');            // HELLO
echo strlen('hello');                // 5
echo str_replace('o', '0', 'hello'); // hell0
echo trim('  hi  ');                 // hi
echo implode(', ', ['a', 'b']);      // a, b
```

See: [String functions](https://www.php.net/manual/en/ref.strings.php)

### Multiline strings

#### Heredoc

```php
<?php
$name = 'Ada';
echo <<<TEXT
Hello, $name
TEXT;
```

A nowdoc uses `<<<'TEXT'` so variables stay literal.

See: [Heredoc](https://www.php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc)

### Formatting

```php
<?php
$name = 'Ada';
$age = 36;
echo sprintf('%s is %d', $name, $age); // Ada is 36
```

See: [sprintf](https://www.php.net/manual/en/function.sprintf.php)

## Control flow
<!-- {: .-three-column} -->

### if / elseif / else

```php
<?php
$x = 7;
if ($x > 10) {
    echo 'big';
} elseif ($x > 5) {
    echo 'medium';
} else {
    echo 'small';
}
```

See: [if](https://www.php.net/manual/en/control-structures.if.php)

### match

```php
<?php
$x = 'b';
echo match ($x) {
    'a' => 1,
    'b' => 2,
    default => 0,
}; // 2
```

`match` uses strict comparison and needs no `break`.

See: [match](https://www.php.net/manual/en/control-structures.match.php)

### switch

```php
<?php
$x = 2;
switch ($x) {
    case 1:
        echo 'one';
        break;
    default:
        echo 'other';
}
```

See: [switch](https://www.php.net/manual/en/control-structures.switch.php)

### Loops

```php
<?php
$fruits = ['apple', 'banana'];
foreach ($fruits as $i => $fruit) {
    echo "$i: $fruit\n";
}
```

#### Output

```text
0: apple
1: banana
```

See: [foreach](https://www.php.net/manual/en/control-structures.foreach.php)

### Ternary and null coalescing

```php
<?php
$a = null;
$b = 'fallback';
echo $a ?? $b; // fallback
echo $a ?: $b; // fallback
```

#### Nullsafe

```php
<?php
$user = null;
echo $user?->name ?? 'guest'; // guest
```

`??` tests for null; `?:` tests truthiness. `?->` short-circuits on null.

See: [Comparison operators](https://www.php.net/manual/en/language.operators.comparison.php#language.operators.comparison.coalesce)

## Functions

### Defining functions

```php
<?php
function add(int $a, int $b): int
{
    return $a + $b;
}

echo add(2, 3); // 5
```

See: [User-defined functions](https://www.php.net/manual/en/functions.user-defined.php)

### Default and named arguments

#### Default values

```php
<?php
function repeat(string $s, int $n = 2): string
{
    return str_repeat($s, $n);
}

echo repeat('ab'); // abab
```

#### Named arguments

```php
<?php
function greet(string $hi, string $name): string
{
    return "$hi, $name";
}

echo greet(name: 'Ada', hi: 'Hi'); // Hi, Ada
```

Named arguments can skip defaults and ignore order.

See: [Function arguments](https://www.php.net/manual/en/functions.arguments.php)

### Variadic and spread

```php
<?php
function sum(int ...$nums): int
{
    return array_sum($nums);
}

echo sum(1, 2, 3);          // 6
echo sum(...[1, 2, 3, 4]);  // 10
```

`...` collects extra arguments in a parameter and unpacks them in a call.

See: [Variadic functions](https://www.php.net/manual/en/functions.arguments.php#functions.variable-arg-list)

### Arrow functions

```php
<?php
$double = fn($x) => $x * 2;
echo $double(5); // 10
```

Arrow functions capture outer variables by value and are single expressions.

See: [Arrow functions](https://www.php.net/manual/en/functions.arrow.php)

### Closures

```php
<?php
$prefix = 'Hi';
$greet = function (string $name) use ($prefix): string {
    return "$prefix, $name";
};

echo $greet('Ada'); // Hi, Ada
```

See: [Anonymous functions](https://www.php.net/manual/en/functions.anonymous.php)

## Common tasks

### Checking variables

```php
<?php
$x = null;
var_dump(isset($x));     // bool(false)
var_dump(empty($x));     // bool(true)
var_dump(is_string($x)); // bool(false)
```

#### Options array

```php
<?php
$options = [
    'key' => 'value',
    'blank' => '',
    'nothing' => null,
];

var_dump(isset($options['key']), empty($options['key']));
var_dump(isset($options['blank']), empty($options['blank']));
var_dump(isset($options['nothing']), empty($options['nothing']));
```

#### Output

```text
bool(true)
bool(false)
bool(true)
bool(true)
bool(false)
bool(true)
```

`isset()` is false for null values; `empty()` also rejects `''`, `0`, and `[]`.

See: [isset](https://www.php.net/manual/en/function.isset.php)

### Inspecting values

```php
<?php
$x = ['a' => 1];
var_dump($x);
```

#### Output

```text
array(1) {
  ["a"]=>
  int(1)
}
```

`var_dump()` prints types and structure.

See: [var_dump](https://www.php.net/manual/en/function.var-dump.php)

### JSON

```php
<?php
$user = ['name' => 'Ada', 'roles' => ['admin', 'editor']];
$json = json_encode($user);
echo $json; // {"name":"Ada","roles":["admin","editor"]}
```

#### Decode

```php
<?php
$data = json_decode('{"name":"Ada"}', true);
echo $data['name']; // Ada
```

Pass `true` to `json_decode()` for arrays instead of objects.

See: [JSON functions](https://www.php.net/manual/en/ref.json.php)

### Dates and times

```php
<?php
echo date('Y-m-d', strtotime('2026-11-21')); // 2026-11-21
```

#### DateTime

```php
<?php
$date = new DateTime('2026-11-21');
echo $date->format('l, F j, Y'); // Saturday, November 21, 2026
```

`DateTime` handles time zones and date arithmetic per instance.

See: [DateTime](https://www.php.net/manual/en/class.datetime.php)

### Regular expressions

```php
<?php
$s = 'Call 555-1234 now';
preg_match('/(\d{3})-(\d{4})/', $s, $m);
echo $m[0]; // 555-1234
echo $m[1]; // 555
echo $m[2]; // 1234
```

#### Replace

```php
<?php
echo preg_replace('/\s+/', '-', 'a b  c'); // a-b-c
```

See: [PCRE functions](https://www.php.net/manual/en/ref.pcre.php)

### Files

```php
<?php
file_put_contents('note.txt', "hello\n");
echo file_get_contents('note.txt'); // hello
```

See: [Filesystem functions](https://www.php.net/manual/en/ref.filesystem.php)

## Errors and exceptions

### try / catch / finally

```php
<?php
try {
    throw new DivisionByZeroError('Division by zero');
} catch (DivisionByZeroError $e) {
    echo $e->getMessage(), "\n";
} finally {
    echo "done\n";
}
```

#### Output

```text
Division by zero
done
```

`finally` runs whether or not an exception was thrown.

See: [Exceptions](https://www.php.net/manual/en/language.exceptions.php)

### Throwing exceptions

```php
<?php
function divide(int $a, int $b): float
{
    if ($b === 0) {
        throw new InvalidArgumentException('zero divisor');
    }
    return $a / $b;
}

echo divide(6, 2); // 3
```

See: [throw](https://www.php.net/manual/en/language.exceptions.php#language.exceptions.throw)

### Throwable hierarchy

```php
<?php
try {
    str_split([]);
} catch (Throwable $e) {
    echo get_class($e); // TypeError
}
```

#### Hierarchy

| Base         | Examples                     |
| ------------ | ---------------------------- |
| `Throwable`  | `Error`, `Exception`         |
| `Error`      | `TypeError`, `ValueError`    |
| `Exception`  | `RuntimeException`, `LogicException` |

Catch `Throwable` to handle both errors and exceptions.

See: [Throwable](https://www.php.net/manual/en/class.throwable.php)

### Custom exceptions

```php
<?php
class ValidationError extends RuntimeException
{
    public function __construct(public string $field)
    {
        parent::__construct("Invalid: $field");
    }
}

try {
    throw new ValidationError('email');
} catch (ValidationError $e) {
    echo $e->getMessage(); // Invalid: email
    echo $e->field;        // email
}
```

See: [Extending exceptions](https://www.php.net/manual/en/language.exceptions.extending.php)

## Classes and objects

### Defining a class

```php
<?php
class Person
{
    public string $name = '';

    public function greet(): string
    {
        return "Hi, {$this->name}";
    }
}

$bob = new Person();
$bob->name = 'bob';
echo $bob->greet(); // Hi, bob
```

See: [Classes](https://www.php.net/manual/en/language.oop5.basic.php)

### Constructors and promotion

```php
<?php
class Point
{
    public function __construct(
        public int $x,
        public int $y,
    ) {}
}

$p = new Point(2, 3);
echo $p->x + $p->y; // 5
```

Promoted parameters declare and assign properties in one step.

See: [Constructors](https://www.php.net/manual/en/language.oop5.decon.php)

### Properties and methods

```php
<?php
class Counter
{
    private int $value = 0;

    public function inc(int $by = 1): void
    {
        $this->value += $by;
    }

    public function get(): int
    {
        return $this->value;
    }
}

$c = new Counter();
$c->inc();
$c->inc(2);
echo $c->get(); // 3
```

See: [Properties](https://www.php.net/manual/en/language.oop5.properties.php)

### Getters and setters

```php
<?php
class Person
{
    private string $name = '';

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }
}

$bob = (new Person())->setName('bob');
echo $bob->getName(); // bob
```

Returning `$this` enables fluent chains.

See: [Class properties](https://www.php.net/manual/en/language.oop5.properties.php)

### Inheritance and interfaces

```php
<?php
interface Speakable
{
    public function speak(): string;
}

class Animal implements Speakable
{
    public function __construct(protected string $name) {}

    public function speak(): string
    {
        return '...';
    }
}

class Dog extends Animal
{
    public function speak(): string
    {
        return "{$this->name} says woof";
    }
}

echo (new Dog('Rex'))->speak(); // Rex says woof
```

See: [Inheritance](https://www.php.net/manual/en/language.oop5.inheritance.php)

### Static members

```php
<?php
class Config
{
    public static array $items = [];

    public static function set(string $k, mixed $v): void
    {
        self::$items[$k] = $v;
    }
}

Config::set('debug', true);
var_dump(Config::$items['debug']); // bool(true)
```

See: [Static properties and methods](https://www.php.net/manual/en/language.oop5.static.php)

## Traits, enums and attributes

### Traits

```php
<?php
trait Loggable
{
    public function label(): string
    {
        return static::class;
    }
}

class Post
{
    use Loggable;
}

echo (new Post())->label(); // Post
```

See: [Traits](https://www.php.net/manual/en/language.oop5.traits.php)

### Enums

```php
<?php
enum Status: string
{
    case Draft = 'draft';
    case Live = 'live';
}

$status = Status::from('live');
echo $status->value; // live
```

Backed enums expose `->value` and `::from()`.

See: [Enumerations](https://www.php.net/manual/en/language.enumerations.php)

### Attributes

```php
<?php
#[Attribute]
class Attr
{
    public function __construct(public string $name = '') {}
}

#[Attr]
class Service
{
    #[Attr('run')]
    public function go(): void {}
}
```

Attributes are read through reflection; `#[Attribute]` marks an attribute class.

See: [Attributes](https://www.php.net/manual/en/language.attributes.php)

## References

### Official resources

- [PHP manual](https://www.php.net/manual/en/) _(php.net)_
- [Language reference](https://www.php.net/manual/en/langref.php) _(php.net)_
- [Getting started](https://www.php.net/manual/en/tutorial.php) _(php.net)_

See: [PHP manual](https://www.php.net/manual/en/)

### Language reference

- [Basic syntax](https://www.php.net/manual/en/language.basic-syntax.php) _(php.net)_
- [Functions](https://www.php.net/manual/en/functions.user-defined.php) _(php.net)_
- [Classes and objects](https://www.php.net/manual/en/language.oop5.php) _(php.net)_
- [Standard library](https://www.php.net/manual/en/ref.index.php) _(php.net)_

See: [Language reference](https://www.php.net/manual/en/langref.php)
