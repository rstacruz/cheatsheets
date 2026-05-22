---
title: Dart
prism_languages: [dart, bash]
weight: -3
tags: [Featured]
category: Languages
updated: 2025-05-22
---

## Getting started
{: .-three-column}

### Introduction
{: .-intro}

- [Dart overview](https://dart.dev/overview) _(dart.dev)_
- [DartPad](https://dartpad.dev/) _(dartpad.dev)_
- [Effective Dart](https://dart.dev/effective-dart) _(dart.dev)_

### Hello world
{: .-prime}

#### main.dart
{: .-file}

```dart
void main() {
  print('Hello, world!');
}
```

```bash
$ dart run main.dart
```

```bash
$ dart compile exe main.dart && ./main.exe
```

Dart supports JIT compilation for development and AOT for production.

### Variables

```dart
var name = 'Dart';       // type inferred
String name = 'Dart';    // explicit type
final name = 'Dart';     // set once
const name = 'Dart';     // compile-time constant
```

```dart
var x = 1;
var x, y = 1, 2;        // multi-declaration
dynamic x = 'hello';    // dynamic type
```

`final` is evaluated at runtime, `const` must be known at compile time.

See: [Variables](https://dart.dev/language/variables)

### Constants

```dart
const pi = 3.14;
const pi = 3.14 as double;
final now = DateTime.now();  // runtime constant
```

```dart
const List<int> numbers = [1, 2, 3];
const Map<String, int> scores = {'alice': 90};
```

`const` creates a canonical instance shared across the program.

See: [Effective Dart: const](https://dart.dev/effective-dart/usage#dont-use-const-redundantly)

## Basic types
{: .-three-column}

### Strings

```dart
String s = 'Hello';
String s = "Hello";
String s = '''Multi
line''';
String s = 'Hello' 'World';  // adjacent = concatenated
```

```dart
var s = 'Dart';
'$s is fun'          // → 'Dart is fun'
'${s.toUpperCase()}' // → 'DART'
```

```dart
'hello'.length        // 5
'hello'[0]            // 'h'
'dart'.toUpperCase()  // 'DART'
'  hi  '.trim()       // 'hi'
'one,two'.split(',')  // ['one', 'two']
'Hi'.contains('i')     // true
```

See: [Strings](https://dart.dev/language/built-in-types#strings)

### Numbers

```dart
int x = 42;            // integer
double y = 3.14;       // double
num z = 42;            // int or double
```

```dart
int.parse('42')        // 42
double.parse('3.14')   // 3.14
42.toString()          // '42'
3.14.toStringAsFixed(1) // '3.1'
```

```dart
(3 + 2) * 4            // 20
3 ~/ 2                 // 1 (integer division)
3 % 2                  // 1 (modulo)
```

See: [Numbers](https://dart.dev/language/built-in-types#numbers)

### Booleans

```dart
bool done = true;
bool done = false;
```

```dart
!true                   // false
true && false           // false
true || false           // true
x == y                  // equality
x != y                  // inequality
x > y                   // greater
x >= y                  // greater or equal
```

### Type checks & casts

```dart
x is int                // true if x is int
x is! int               // true if x is NOT int
x as int                // cast to int (throws on mismatch)
(x as int).toRadixString(16)
```

```dart
42.runtimeType          // int
'hi'.runtimeType        // String
```

## Null safety
{: .-three-column}

### Nullable types

```dart
String? name;           // can be null
int? age = null;
List<String?>? items;   // nullable list of nullable strings
```

```dart
String name = null;     // compile error — non-nullable
```

### Null-aware operators

```dart
var x = nullable ?? 'default';
```

```dart
nullable ??= 'fallback';  // assign if null
```

```dart
user?.name                 // → null if user is null
user?.name?.toUpperCase()
```

```dart
String? name;
name!                      // asserts non-null, throws if null
```

### Late variables

```dart
late String description;    // initialized before first use

void main() {
  description = 'Dart!';
  print(description);
}
```

```dart
late final _cache = _heavyCompute();
```

`late` defers initialization — helpful for lazy loading or when the initializer throws.

See: [Null safety](https://dart.dev/null-safety)

## Flow control
{: .-three-column}

### If / else

```dart
if (score >= 90) {
  grade = 'A';
} else if (score >= 80) {
  grade = 'B';
} else {
  grade = 'C';
}
```

No truthiness — conditions must be `bool`.

### Switch expression

```dart
var grade = switch (score) {
  >= 90 => 'A',
  >= 80 => 'B',
  >= 70 => 'C',
  _     => 'D',       // wildcard = default
};
```

```dart
var result = switch (shape) {
  Circle(radius: final r) => pi * r * r,
  Rectangle(width: final w, height: final h) => w * h,
  Square(side: final s) => s * s,
};
```

Exhaustiveness is checked at compile time. No `break` needed.

### For loop

```dart
for (var i = 0; i < 5; i++) {
  print(i);
}

for (final item in items) {
  print(item);
}
```

```dart
items.forEach((item) => print(item));
```

### While loop

```dart
while (!done) {
  doWork();
}

do {
  line = readLine();
} while (line != null);
```

## Functions
{: .-three-column}

### Basic functions

```dart
int add(int a, int b) {
  return a + b;
}
```

```dart
String greet(String name) => 'Hello, $name!';
```

Top-level functions don't require a class.

### Parameters

```dart
// positional (required by default)
void log(String msg, int level) { ... }

// positional optional
void log(String msg, [int? level, bool? verbose]) { ... }

// named optional
void log(String msg, {int? level, bool? verbose}) { ... }

// named required
void log(String msg, {required int level, bool verbose = false}) { ... }
```

```dart
log('hello', level: 3);
log('hello', level: 3, verbose: true);
```

### Lambdas

```dart
var loudify = (String msg) => msg.toUpperCase();

final fn = () => print('hi');
final add = (int a, int b) => a + b;
```

### Functions as values

```dart
List<int> apply(List<int> items, int Function(int) fn) {
  return items.map(fn).toList();
}

apply([1, 2, 3], (n) => n * 2);  // → [2, 4, 6]
```

### Typedefs

```dart
typedef IntMapper = int Function(int);

List<int> apply(List<int> items, IntMapper fn) {
  return items.map(fn).toList();
}
```

## Collections
{: .-three-column}

### List

```dart
var list = [1, 2, 3];
var list = <int>[1, 2, 3];

list[0]           // 1
list.length       // 3
list.first        // 1
list.last         // 3
list.isEmpty      // false
```

```dart
list.add(4);
list.remove(2);
list.contains(3);          // true
list.indexOf(3);           // 2
list.sublist(1, 2);        // [2]
```

```dart
[1, 2, 3].map((n) => n * 2)       // (2, 4, 6)
[1, 2, 3].where((n) => n > 1)     // (2, 3)
[1, 2, 3].reduce((a, b) => a + b) // 6
[1, 2, 3].fold(0, (a, b) => a + b) // 6
[1, 2, 3].any((n) => n > 2)       // true
[1, 2, 3].every((n) => n > 0)     // true
```

### Set

```dart
var set = {1, 2, 3};
var set = <int>{1, 2, 3};

set.add(4);
set.contains(2);           // true
set.remove(1);
set.intersection({2, 3});  // {2, 3}
set.union({4, 5});         // {1, 2, 3, 4, 5}
```

### Map

```dart
var map = {'a': 1, 'b': 2};
var map = <String, int>{'a': 1};
```

```dart
map['a']           // 1
map['c'] = 3;
map.containsKey('a')    // true
map.keys             // ('a', 'b')
map.values            // (1, 2)
map.remove('a');
```

### Spread & collection operators

```dart
var combined = [1, 2, ...others];
var maybe = [1, 2, ...?nullableList];
```

```dart
var items = [
  'top',
  if (hasMore) 'load more',
  for (var item in list) item.toUpperCase(),
];
```

### Collection helpers

```dart
[3, 1, 2]..sort();       // [1, 2, 3]
list.shuffle();
list.reversed;           // Iterable
list.asMap();            // Map<int, T>
```

```dart
List.generate(3, (i) => i * i);  // [0, 1, 4]
List.filled(3, 0);               // [0, 0, 0]
List.empty();
```

## Records & Patterns
{: .-three-column}

### Records

```dart
var pair = (1, 'hello');         // positional fields
var named = (x: 1, y: 'hello');  // named fields
var mixed = (1, y: 'hello');     // mixed

pair.$1       // 1
pair.$2       // 'hello'
named.x       // 1
```

```dart
(int, String) swap((String, int) record) {
  var (a, b) = record;
  return (b, a);
}
```

### Destructuring

```dart
var (x, y) = (1, 2);

var (a, b, _) = (1, 2, 3);   // discard with _

var (:name, :age) = (name: 'Tom', age: 23);

// in switch
switch (point) {
  case (0, 0): print('Origin');
  case (0, final y): print('Y axis at $y');
}
```

### Pattern matching

```dart
switch (json) {
  case {'name': String name, 'age': int age}:
    return User(name, age);
  case [String first, ...]:
    // first is a String, rest ignored
  case (int x, int y) when x == y:
    // diagonal
}
```

### Sealed classes

```dart
sealed class Result<T> {}
class Success<T> extends Result<T> {
  final T value;
  Success(this.value);
}
class Error<T> extends Result<T> {
  final Object exception;
  Error(this.exception);
}
```

```dart
String handle(Result<int> result) => switch (result) {
  Success(value: final v) => 'Got $v',
  Error(exception: final e) => 'Error: $e',
};
// exhaustiveness enforced — no default needed
```

## Classes
{: .-three-column}

### Defining

```dart
class Point {
  double x;
  double y;

  Point(this.x, this.y);  // shorthand assignment

  double get distance => math.sqrt(x * x + y * y);

  @override
  String toString() => 'Point($x, $y)';
}
```

```dart
var p = Point(3, 4);
p.x        // 3
p.distance // 5.0
```

Private members: prefix with `_` (file-private).

### Constructors

```dart
class Point {
  final double x, y;

  // generative
  Point(this.x, this.y);

  // named
  Point.origin()
      : x = 0,
        y = 0;

  // redirecting
  Point.diagonal(double d) : this(d, d);

  // constant
  const Point.empty() : x = 0, y = 0;
}
```

### Factory constructors

```dart
class Logger {
  final String name;
  static final _cache = <String, Logger>{};

  factory Logger(String name) =>
      _cache.putIfAbsent(name, () => Logger._internal(name));

  Logger._internal(this.name);
}
```

Factory constructors may return a cached instance or a subtype.

### Getters & setters

```dart
class Rectangle {
  double left, top, width, height;

  double get right => left + width;
  set right(double value) => left = value - width;

  double get bottom => top + height;
  set bottom(double value) => top = value - height;
}
```

### Inheritance

```dart
class Animal {
  void speak() => print('...');
}

class Dog extends Animal {
  @override
  void speak() => print('woof');
}
```

```dart
class NamedPoint extends Point {
  final String label;

  NamedPoint(double x, double y, this.label) : super(x, y);
}
```

Use `super` to forward to base class constructor.

### Abstract classes

```dart
abstract class Shape {
  double area();
  double perimeter();
}

class Circle extends Shape {
  final double radius;
  Circle(this.radius);

  @override
  double area() => pi * radius * radius;

  @override
  double perimeter() => 2 * pi * radius;
}
```

### Mixins

```dart
mixin Logger {
  void log(String msg) => print('[${runtimeType}] $msg');
}

class Service with Logger {
  void fetch() {
    log('Fetching...');
  }
}
```

```dart
mixin class Walkable {
  void walk() => print('walking');
}

class Human with Walkable {}
// or: class Human extends Animal with Walkable {}
```

### Cascade notation

```dart
var button = Button()
  ..text = 'Click'
  ..color = Colors.blue
  ..onClick.listen(handleClick);
```

```dart
// without cascade
var button = Button();
button.text = 'Click';
button.color = Colors.blue;
button.onClick.listen(handleClick);
```

### Interfaces

```dart
class Flyable {
  void fly() {}
}

class Bird implements Flyable {
  @override
  void fly() => print('flapping');
}
```

Every class is implicitly an interface.

## Enums
{: .-three-column}

### Simple enums

```dart
enum Color { red, green, blue }

Color.red.index     // 0
Color.values        // [Color.red, Color.green, Color.blue]
Color.red.name      // 'red'
```

### Enhanced enums

```dart
enum Status {
  pending(0),
  active(1),
  done(2);

  final int code;
  const Status(this.code);
}
```

```dart
enum Operation {
  add((a, b) => a + b),
  sub((a, b) => a - b);

  final int Function(int, int) apply;
  const Operation(this.apply);
}
```

### Switching on enums

```dart
var label = switch (color) {
  Color.red   => 'Stop',
  Color.green => 'Go',
  Color.blue  => 'Info',
};
```

## Extensions
{: .-three-column}

### Extension methods

```dart
extension StringX on String {
  String get reversed => split('').reversed.join('');
  bool isBlank() => trim().isEmpty;
}
```

```dart
'hello'.reversed   // 'olleh'
'  '.isBlank()      // true
```

### Generics extension

```dart
extension IterableX<T> on Iterable<T> {
  T? firstWhereOrNull(bool Function(T) test) {
    for (final element in this) {
      if (test(element)) return element;
    }
    return null;
  }
}
```

### Extension types

```dart
extension type UserId(int id) {
  String toJson() => '{"id": $id}';
}
```

```dart
UserId uid = UserId(42);
uid.toJson();       // '{"id": 42}'
int id = uid.id;    // access representation
```

## Async
{: .-three-column}

### Future

```dart
Future<String> fetchData() {
  return Future.delayed(
    Duration(seconds: 1),
    () => 'data',
  );
}
```

```dart
Future.value(42);
Future.error('oops');
Future.wait([f1, f2]);        // wait for all
Future.any([f1, f2]);         // first to complete
```

### Async / await

```dart
Future<void> load() async {
  try {
    final data = await fetchData();
    print(data);
  } catch (e) {
    print('Error: $e');
  }
}
```

```dart
final results = await Future.wait([
  fetchUsers(),
  fetchPosts(),
]);
```

### Stream

```dart
Stream<int> countStream(int max) async* {
  for (var i = 1; i <= max; i++) {
    yield i;
  }
}
```

```dart
await for (final value in countStream(5)) {
  print(value);       // 1, 2, 3, 4, 5
}
```

### Stream methods

```dart
countStream(10)
  .where((n) => n.isEven)
  .map((n) => n * 2)
  .listen(print);
```

```dart
stream.listen(
  (data) => print(data),
  onError: (e) => print('Error: $e'),
  onDone: () => print('Done'),
  cancelOnError: true,
);
```

### StreamController

```dart
final controller = StreamController<int>();

controller.add(1);
controller.add(2);
controller.addError('oops');
controller.close();
```

```dart
controller.stream.listen(print);
```

## Error handling
{: .-three-column}

### Try / catch

```dart
try {
  risky();
} catch (e, stack) {
  print('Error: $e');
  print(stack);
}
```

### Catching specific

```dart
try {
  risky();
} on FormatException catch (e) {
  print('Format error: $e');
} on IOException {
  print('IO error');
} finally {
  cleanup();
}
```

### Throwing & rethrowing

```dart
throw FormatException('invalid input');
throw 'oops';             // any object
```

```dart
try {
  risky();
} on FormatException {
  rethrow;                // preserve stack trace
}
```

### Custom exceptions

```dart
class ValidationError implements Exception {
  final String message;
  ValidationError(this.message);

  @override
  String toString() => 'ValidationError: $message';
}
```

## Generics
{: .-three-column}

### Generic functions

```dart
T first<T>(List<T> items) => items.first;

first<int>([1, 2, 3]);       // 1
first<String>(['a', 'b']);   // 'a'
```

### Generic classes

```dart
class Box<T> {
  T value;
  Box(this.value);
}

var box = Box<int>(42);
var box = Box('hello');       // type inferred
```

### Type bounds

```dart
class NumberBox<T extends num> {
  T value;
  NumberBox(this.value);

  double half() => value.toDouble() / 2;
}
```

```dart
T max<T extends Comparable<T>>(T a, T b) =>
    a.compareTo(b) > 0 ? a : b;
```

## Common operators

| Operator | Description |
| --- | --- |
| `?.` | Null-aware access |
| `??` | If-null |
| `??=` | Null-aware assignment |
| `!` | Null assertion |
| `~` | Bitwise NOT |
| `~/` | Integer division |
| `%` | Modulo |
| `..` | Cascade |
| `...` | Spread |
| `...?` | Null-aware spread |
| `is` | Type check |
| `is!` | Not type check |
| `as` | Type cast |
{: .-headers}

## Flutter: Getting started
{: .-three-column}

### Create & run

```bash
$ flutter create my_app
$ cd my_app
$ flutter run
```

```bash
$ flutter run -d chrome   # run on Chrome
$ flutter devices          # list devices
$ flutter doctor           # check setup
```

### Project structure

```
my_app/
  lib/
    main.dart              # entry point
  pubspec.yaml             # dependencies
  test/
```

### StatelessWidget

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('My App')),
        body: Center(child: Text('Hello')),
      ),
    );
  }
}
```

### StatefulWidget

```dart
class Counter extends StatefulWidget {
  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _count = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('$_count'),
        ElevatedButton(
          onPressed: () => setState(() => _count++),
          child: Text('Increment'),
        ),
      ],
    );
  }
}
```

## Flutter: Common widgets
{: .-three-column}

### Text & display

| Widget | Purpose |
| --- | --- |
| `Text('hello')` | Display text |
| `Text('hello', style: TextStyle(fontSize: 20))` | Styled text |
| `Icon(Icons.star)` | Material icon |
| `Image.asset('path')` | Asset image |
| `Image.network('url')` | Network image |
| `CircleAvatar(radius: 20)` | Circular image/initials |
{: .-headers}

### Buttons

| Widget | Purpose |
| --- | --- |
| `ElevatedButton(onPressed: fn, child: Text('OK'))` | Raised button |
| `TextButton(onPressed: fn, child: Text('OK'))` | Flat text button |
| `OutlinedButton(onPressed: fn, child: Text('OK'))` | Outlined |
| `IconButton(onPressed: fn, icon: Icon(Icons.add))` | Icon-only button |
| `FloatingActionButton(onPressed: fn, child: Icon(Icons.add))` | FAB |
{: .-headers}

### Input

```dart
TextField(
  decoration: InputDecoration(
    labelText: 'Name',
    hintText: 'Enter your name',
    border: OutlineInputBorder(),
  ),
  onChanged: (value) => print(value),
)
```

```dart
Switch(value: on, onChanged: (v) => setState(() => on = v))
Checkbox(value: checked, onChanged: (v) => setState(() => checked = v!))
Slider(value: val, min: 0, max: 100, onChanged: (v) => setState(() => val = v))
```

## Flutter: Layout
{: .-three-column}

### Column / Row

```dart
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    Text('One'),
    Text('Two'),
  ],
)
```

```dart
Row(
  mainAxisAlignment: MainAxisAlignment.spaceBetween,
  children: [
    Icon(Icons.star),
    Text('Label'),
  ],
)
```

### Axis alignment

| `MainAxisAlignment` | |
| --- | --- |
| `start` | Align to start |
| `end` | Align to end |
| `center` | Center |
| `spaceBetween` | Space between children |
| `spaceAround` | Space around children |
| `spaceEvenly` | Even spacing |

| `CrossAxisAlignment` | |
| --- | --- |
| `start` | Align to start |
| `end` | Align to end |
| `center` | Center |
| `stretch` | Stretch to fill |
| `baseline` | Text baseline |

### Flexible & Expanded

```dart
Row(
  children: [
    Expanded(child: Container(color: Colors.red)),
    Expanded(flex: 3, child: Container(color: Colors.blue)),
  ],
)
```

`Expanded` fills available space. `flex` controls proportions.

### Common layout widgets

```dart
Container(
  width: 200,
  height: 100,
  padding: EdgeInsets.all(16),
  margin: EdgeInsets.symmetric(horizontal: 8),
  decoration: BoxDecoration(
    color: Colors.blue,
    borderRadius: BorderRadius.circular(8),
  ),
  child: Text('Hi'),
)
```

```dart
Padding(padding: EdgeInsets.all(8), child: ...)
Center(child: ...)
SizedBox(width: 8, height: 16)
Align(alignment: Alignment.topRight, child: ...)
Stack(children: [...])
Positioned(left: 10, top: 20, child: ...)
Wrap(spacing: 8, children: [...])
```

### Lists

```dart
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, i) => ListTile(
    title: Text(items[i].title),
    leading: Icon(Icons.person),
  ),
)
```

```dart
GridView.builder(
  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 2,
  ),
  itemBuilder: (context, i) => Card(child: Center(child: Text('$i'))),
)
```

## Flutter: Styling
{: .-three-column}

### TextStyle

```dart
Text(
  'Hello',
  style: TextStyle(
    fontSize: 20,
    fontWeight: FontWeight.bold,
    color: Colors.blue,
    letterSpacing: 1.5,
    decoration: TextDecoration.underline,
    fontStyle: FontStyle.italic,
  ),
)
```

### Box decoration

```dart
Container(
  decoration: BoxDecoration(
    color: Colors.blue[100],
    borderRadius: BorderRadius.circular(12),
    border: Border.all(color: Colors.blue, width: 2),
    boxShadow: [
      BoxShadow(
        color: Colors.black26,
        blurRadius: 8,
        offset: Offset(0, 4),
      ),
    ],
  ),
)
```

### EdgeInsets

```dart
EdgeInsets.all(16)
EdgeInsets.only(left: 8, top: 16)
EdgeInsets.symmetric(horizontal: 8, vertical: 4)
EdgeInsets.fromLTRB(8, 16, 8, 4)
EdgeInsets.zero
```

### Colors

```dart
Colors.blue
Colors.blue[200]              // shade
Colors.blue.withOpacity(0.5) // opacity
Color(0xFF42A5F5)            // from hex
Color.fromRGBO(66, 165, 245, 1)
```

### Theme

```dart
MaterialApp(
  theme: ThemeData(
    primarySwatch: Colors.blue,
    fontFamily: 'Roboto',
  ),
  home: MyPage(),
)
```

```dart
// access in build
final theme = Theme.of(context);
Color bg = theme.colorScheme.surface;
TextStyle style = theme.textTheme.headlineMedium!;
```

## Flutter: Navigation
{: .-three-column}

### Push / pop

```dart
// push
Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => DetailPage()),
);

// pop back
Navigator.pop(context);

// pop with result
Navigator.pop(context, 'result');
```

### Named routes

```dart
MaterialApp(
  routes: {
    '/': (context) => HomePage(),
    '/detail': (context) => DetailPage(),
  },
);
```

```dart
Navigator.pushNamed(context, '/detail');
Navigator.pushNamed(context, '/detail', arguments: {'id': 42});
```

### Receive route arguments

```dart
class DetailPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments as Map;
    return Text('ID: ${args['id']}');
  }
}
```

### Hero animation

```dart
// in first screen
Hero(tag: 'avatar', child: CircleAvatar(...))

// in second screen — same tag
Hero(tag: 'avatar', child: CircleAvatar(radius: 60, ...))
```

## Flutter: State management
{: .-three-column}

### setState

```dart
class _CounterState extends State<Counter> {
  int _count = 0;

  void _increment() => setState(() => _count++);
  // rebuilds the widget
}
```

### ChangeNotifier pattern

```dart
class Cart extends ChangeNotifier {
  final _items = <Item>[];

  List<Item> get items => List.unmodifiable(_items);

  void add(Item item) {
    _items.add(item);
    notifyListeners();
  }
}
```

```dart
// provide it at the top
runApp(
  ChangeNotifierProvider(
    create: (_) => Cart(),
    child: MyApp(),
  ),
);
```

```dart
// consume in build
@override
Widget build(BuildContext context) {
  final cart = context.watch<Cart>();
  return Text('${cart.items.length} items');
}
```

### FutureBuilder

```dart
FutureBuilder<List<User>>(
  future: fetchUsers(),
  builder: (context, snapshot) {
    if (snapshot.hasError) return Text('Error: ${snapshot.error}');
    if (!snapshot.hasData) return CircularProgressIndicator();
    return ListView(
      children: snapshot.data!.map((u) => Text(u.name)).toList(),
    );
  },
)
```

## References

### Official resources
{: .-intro}

- [Dart documentation](https://dart.dev/guides) _(dart.dev)_
- [Dart API reference](https://api.dart.dev/) _(api.dart.dev)_
- [Effective Dart](https://dart.dev/effective-dart) _(dart.dev)_
- [DartPad](https://dartpad.dev/) _(dartpad.dev)_
- [Flutter documentation](https://flutter.dev/docs) _(flutter.dev)_
- [Flutter API reference](https://api.flutter.dev/) _(api.flutter.dev)_
- [Flutter cookbook](https://flutter.dev/docs/cookbook) _(flutter.dev)_
- [Widget catalog](https://flutter.dev/docs/development/ui/widgets) _(flutter.dev)_

### Other links
{: .-intro}

- [Dart packages](https://pub.dev/) _(pub.dev)_
- [Claudio SDK](https://pub.dev/packages/claudio_sdk) _(pub.dev)_ — multi-provider AI SDK for Dart/Flutter
- [Claudio](https://github.com/faisalaffan/claudio) _(github.com)_ — one interface, many AI providers
- [Awesome Flutter](https://github.com/Solido/awesome-flutter) _(github.com)_
- [Riverpod](https://riverpod.dev/) _(riverpod.dev)_
- [BLoC](https://bloclibrary.dev/) _(bloclibrary.dev)_
