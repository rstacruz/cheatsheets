---
title: Kotlin
category: Java & JVM
updated: 2026-10-03
keywords:
  - Variables
  - Null safety
  - Collections
  - Functions
  - Classes
  - Lambdas
prism_languages: [kotlin]
intro: |
  [Kotlin](https://kotlinlang.org/) is a statically typed language
  targeting the JVM, Android, and multiplatform projects. This reference
  covers variables, null safety, collections, functions, and classes.
---

Variables
---------
{: .-three-column}

### Introduction
{: .-intro}

[Kotlin](https://kotlinlang.org/) is a statically typed language targeting the JVM, Android, and multiplatform projects. This reference covers the essentials.

- [Kotlin documentation](https://kotlinlang.org/docs/home.html) _(kotlinlang.org)_
- [Kotlin playground](https://play.kotlinlang.org/) _(play.kotlinlang.org)_

### Mutability

```kotlin
var mutableString: String = "Adam"
val immutableString: String = "Adam"
val inferredString = "Adam"
```

Use `var` for values that change, `val` for read-only ones. Types are inferred unless annotated.

See: [Variables](https://kotlinlang.org/docs/basic-syntax.html#variables)

### Strings

```kotlin
val name = "Adam"
val greeting = "Hello, " + name
val template = "Hello, $name"
val upper = "Hi, ${name.uppercase()}"
```

String templates interpolate values with `$name` or `${expression}`.

See: [String templates](https://kotlinlang.org/docs/strings.html#string-templates)

### Numbers

```kotlin
val intNum = 10
val doubleNum = 10.0
val longNum = 10L
val floatNum = 10.0F
```

See: [Numbers](https://kotlinlang.org/docs/numbers.html)

### Booleans

```kotlin
val isReady = true
val isBusy = false
val andCondition = isReady && isBusy
val orCondition = isReady || isBusy
```

See: [Booleans](https://kotlinlang.org/docs/booleans.html)

### Companion objects

```kotlin
class Person {
    companion object {
        const val NAME_KEY = "name_key"
    }
}

val key = Person.NAME_KEY
```
{: data-line="7"}

Members are accessed through the class name, like statics in Java. Use `const val` for compile-time constants.

See: [Companion objects](https://kotlinlang.org/docs/object-declarations.html#companion-objects)

Null safety
-----------
{: .-two-column}

### Nullable types

```kotlin
val cannotBeNull: String = null  // compile error
val canBeNull: String? = null    // ok
```

A `?` after the type marks it as nullable; non-nullable types reject `null`.

See: [Null safety](https://kotlinlang.org/docs/null-safety.html)

### Checking for null

```kotlin
val name: String? = "Adam"

if (name != null) {
    print("Length: ${name.length}")
} else {
    print("String is null")
}
```
{: data-line="4"}

After the null check, `name` is smart-cast to a non-nullable `String`.

See: [Checking for null](https://kotlinlang.org/docs/null-safety.html#check-for-null-with-the-if-conditional)

### Safe call operator

```kotlin
val length: Int? = name?.length
val head: String? = person?.department?.head?.name
```

`?.` returns `null` instead of throwing when the receiver is null.

See: [Safe calls](https://kotlinlang.org/docs/null-safety.html#safe-call-operator)

### Elvis operator

```kotlin
val length: Int = name?.length ?: 0
val head: String = person?.department?.head?.name ?: ""
val upper: String = name?.uppercase().orEmpty()  // "" if null
```

`?:` returns the left side when it isn't null, the right side otherwise. `orEmpty()` is shorthand for `?: ""`.

See: [Elvis operator](https://kotlinlang.org/docs/null-safety.html#elvis-operator)

### Not-null assertion

```kotlin
val length: Int = name!!.length
```

`!!` throws a `NullPointerException` when the value is null. Prefer `?.`, `?:`, or `requireNotNull()`.

See: [Not-null assertion](https://kotlinlang.org/docs/null-safety.html#not-null-assertion-operator)

### Safe casts

```kotlin
// Returns null instead of throwing ClassCastException
val car: Car? = input as? Car
```

See: [Safe casts](https://kotlinlang.org/docs/null-safety.html#safe-casts)

Collections
-----------
{: .-two-column}

### Creation

```kotlin
val numArray = arrayOf(1, 2, 3)
val numList = listOf(1, 2, 3)
val numSet = setOf(1, 2, 3)
val mutableNumList = mutableListOf(1, 2, 3)
```

See: [Constructing collections](https://kotlinlang.org/docs/constructing-collections.html)

### Accessing

```kotlin
val byIndex = numList[0]                 // throws if empty
val first = numList.first()              // throws if empty
val firstOrNull = numList.firstOrNull()  // null if empty
val last = numList.last()
```

See: [Retrieving elements](https://kotlinlang.org/docs/collection-elements.html)

### Maps

```kotlin
val faceCards = mutableMapOf("Jack" to 11, "Queen" to 12)
val jackValue = faceCards["Jack"]  // 11, or null if missing
faceCards["Ace"] = 1

val immutableMap = mapOf("Jack" to 11, "Queen" to 12)
```

Reads return `null` for missing keys; `getValue()` throws instead.

See: [Map operations](https://kotlinlang.org/docs/map-operations.html)

### Mutability

```kotlin
val immutableList = listOf(1, 2, 3)
val mutableList = immutableList.toMutableList()

val immutableMap = mapOf("Jack" to 11, "Queen" to 12)
val mutableMap = immutableMap.toMutableMap()
```

`listOf()` and `mapOf()` are read-only; use the `mutable*` builders to add, set, or remove.

See: [Collection types](https://kotlinlang.org/docs/collections-overview.html#collection-types)

### Iterating

```kotlin
for (item in myList) {
    print(item)
}

myList.forEach {
    print(it)
}

myList.forEachIndexed { index, item ->
    print("Item at $index is: $item")
}
```

See: [Iterators](https://kotlinlang.org/docs/iterators.html)

### Filtering & searching

```kotlin
val evens = numList.filter { it % 2 == 0 }
val hasEven = numList.any { it % 2 == 0 }
val allOdd = numList.all { it % 2 != 0 }
val noEvens = numList.none { it % 2 == 0 }
val firstEven = numList.first { it % 2 == 0 }  // throws if none
val firstEvenOrNull = numList.firstOrNull { it % 2 == 0 }
```

`it` is the implicit name of a lambda's single parameter.

See: [Filtering collections](https://kotlinlang.org/docs/collection-filtering.html)

### Transforming & grouping

```kotlin
data class Item(val name: String, val price: Int)

val items = listOf(Item("Coffee", 3), Item("Tea", 2))

val menu = items.map { "${it.name} - ${it.price}" }
val byName = items.groupBy { it.name }
val sorted = items.sortedByDescending { it.price }
val total = items.sumOf { it.price }
```

See: [Transformations](https://kotlinlang.org/docs/collection-transformations.html), [Grouping](https://kotlinlang.org/docs/collection-grouping.html), [Ordering](https://kotlinlang.org/docs/collection-ordering.html)

Functions
---------
{: .-two-column}

### Parameters & return types

```kotlin
fun printName(name: String) {
    print(name)
}

fun getGreeting(person: Person): String {
    return "Hello, ${person.name}"
}
```

```kotlin
// Equivalent expression-body form
fun getGreeting(person: Person) = "Hello, ${person.name}"
```

Block bodies only need a return type when they return a value; expression bodies infer it.

See: [Functions](https://kotlinlang.org/docs/functions.html)

### Higher-order functions

```kotlin
fun callbackIfTrue(condition: Boolean, callback: () -> Unit) {
    if (condition) {
        callback()
    }
}

callbackIfTrue(someBoolean) {
    print("Condition was true")
}
```

Functions are values: `() -> Unit` is a function type that callback parameters accept.

See: [Higher-order functions](https://kotlinlang.org/docs/lambdas.html#higher-order-functions)

### Extension functions

```kotlin
fun Int.timesTwo(): Int {
    return this * 2
}

val four = 2.timesTwo()
```

Extensions add method-like call syntax without modifying the type; calls are resolved statically.

See: [Extensions](https://kotlinlang.org/docs/extensions.html)

### Default parameters

```kotlin
fun getGreeting(person: Person, intro: String = "Hello,"): String {
    return "$intro ${person.name}"
}

// Returns "Hello, Adam"
val hello = getGreeting(Person("Adam"))

// Returns "Welcome, Adam"
val welcome = getGreeting(Person("Adam"), "Welcome,")
```

See: [Default arguments](https://kotlinlang.org/docs/functions.html#parameters-with-default-values)

### Named parameters

```kotlin
class Person(val name: String = "", val age: Int = 0)

// All valid
val a = Person()
val b = Person("Adam", 100)
val c = Person(name = "Adam", age = 100)
val d = Person(age = 100)
val e = Person(age = 100, name = "Adam")
```

See: [Named arguments](https://kotlinlang.org/docs/functions.html#named-arguments)

### Companion functions

```kotlin
class Logger(val tag: String) {
    companion object {
        fun create(tag: String): Logger {
            return Logger(tag)
        }
    }
}

val log = Logger.create("app")
```

`Logger.create()` is called on the class, like a static factory method in Java. Add `@JvmStatic` so Java can call it as `Logger.create()`.

See: [Companion objects](https://kotlinlang.org/docs/object-declarations.html#companion-objects)

Classes
-------
{: .-two-column}

### Primary constructor

```kotlin
class Person(val name: String, val age: Int)

val adam = Person("Adam", 100)
```

Constructor parameters marked `val` or `var` become properties.

See: [Primary constructor](https://kotlinlang.org/docs/classes.html#primary-constructor)

### Secondary constructors

```kotlin
class Person(val name: String) {
    private var age: Int? = null

    constructor(name: String, age: Int) : this(name) {
        this.age = age
    }
}
```
{: data-line="4"}

```kotlin
// Default parameters replace the secondary constructor
class Person(val name: String, val age: Int? = null)
```

Secondary constructors delegate to the primary one with `: this(...)`.

See: [Secondary constructors](https://kotlinlang.org/docs/classes.html#secondary-constructors)

### Inheritance & implementation

```kotlin
open class Vehicle
class Car : Vehicle()

interface Runner {
    fun run()
}

class Machine : Runner {
    override fun run() {
        print("Running")
    }
}
```
{: data-line="1,9"}

Classes are final by default; mark them `open` to allow subclassing. Interfaces are implemented with `:`.

See: [Inheritance](https://kotlinlang.org/docs/inheritance.html), [Interfaces](https://kotlinlang.org/docs/interfaces.html)

Control flow
------------
{: .-two-column}

### If statements

```kotlin
if (isDone) {
    print("Done")
} else {
    print("Pending")
}

val label = if (isDone) "Done" else "Pending"
```

`if` is an expression: it returns the value of the taken branch.

See: [If expression](https://kotlinlang.org/docs/control-flow.html#if-expression)

### For loops

```kotlin
for (i in 0..10) { }              // 0 to 10, inclusive
for (i in 0 until 10) { }         // 0 to 9
for (i in 0..<10) { }             // 0 to 9, same as until
for (i in 10 downTo 0 step 2) { }  // 10, 8, 6, ...
(0..10).forEach { }
```

See: [For loops](https://kotlinlang.org/docs/control-flow.html#for-loops)

### When statements

```kotlin
enum class Direction { NORTH, SOUTH, EAST, WEST }

when (direction) {
    Direction.NORTH -> print("North")
    Direction.SOUTH -> print("South")
    Direction.EAST, Direction.WEST -> print("East or West")
    else -> print("Invalid direction")
}
```

```kotlin
when {
    x > 0 -> print("Positive")
    x < 0 -> print("Negative")
    else -> print("Zero")
}
```

`when` matches by value, type, or condition. With no argument it acts like if/else-if.

See: [When expressions](https://kotlinlang.org/docs/control-flow.html#when-expressions-and-statements)

### While loops

```kotlin
while (x > 0) {
    x--
}

do {
    x--
} while (x > 0)
```

See: [While loops](https://kotlinlang.org/docs/control-flow.html#while-loops)

Destructuring declarations
--------------------------
{: .-two-column}

### Objects & lists

```kotlin
data class Person(val name: String, val age: Int)

val person = Person("Adam", 100)
val (name, age) = person

val pair = Pair(1, 2)
val (first, second) = pair

val coordinates = arrayOf(1, 2, 3)
val (x, y, z) = coordinates

val scores = mapOf("Adam" to 100)
for ((key, value) in scores) {
    print("$key = $value")
}
```

Destructuring reads `componentN()` functions, so it works with data classes, pairs, maps, and lists.

See: [Destructuring declarations](https://kotlinlang.org/docs/destructuring-declarations.html)

### ComponentN functions

```kotlin
class Person(val name: String, val age: Int) {
    operator fun component1(): String {
        return name
    }

    operator fun component2(): Int {
        return age
    }
}
```

Declare `operator fun componentN()` to make a class destructurable. `data class` generates them for you.

See: [Destructuring declarations](https://kotlinlang.org/docs/destructuring-declarations.html)

Also see
--------
{: .-one-column}

- [Kotlin documentation](https://kotlinlang.org/docs/home.html) _(kotlinlang.org)_
- [Kotlin API reference](https://kotlinlang.org/api/core/kotlin-stdlib/) _(kotlinlang.org)_
- [Idioms](https://kotlinlang.org/docs/idioms.html) _(kotlinlang.org)_
- [Kotlin playground](https://play.kotlinlang.org/) _(play.kotlinlang.org)_
- [Kotlin GitHub repository](https://github.com/JetBrains/kotlin) _(github.com)_
