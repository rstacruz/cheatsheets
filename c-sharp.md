---
title: C#
seo_title: C# cheatsheet — syntax, LINQ, records
description: "C# reference: syntax, types, nullables, collections, LINQ, async, records, patterns and generics."
subtitle: Modern .NET language
category: C-like
updated: 2026-11-26
last_verified_with: "C# 15, .NET 11.0.100."
tier: t2
fragments:
  - "dotnet new"
  - "dotnet run"
  - "var count = 3"
  - "Console.Write"
  - "record Person("
  - "record struct"
  - "string? name"
  - "?.Length"
  - "??="
  - "List<string>"
  - "Dictionary<"
  - "Where(n =>"
  - "GroupBy("
  - "await Task"
  - "Task.WhenAll"
  - "is not string"
  - "switch {"
  - "where T :"
keywords:
  - C#
  - C# syntax
  - records
  - nullable reference types
  - LINQ
  - async await
  - pattern matching
  - generics
  - dotnet CLI
prism_languages: [csharp]
intro: |
  [C#](https://learn.microsoft.com/en-us/dotnet/csharp/) is a statically typed language for .NET. This reference covers syntax, types, nullables, collections, LINQ, async, records, patterns, generics and the CLI.
links:
  - title: C# documentation
    url: https://learn.microsoft.com/en-us/dotnet/csharp/
  - title: Language reference
    url: https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/
  - title: .NET CLI
    url: https://learn.microsoft.com/en-us/dotnet/core/tools/
---

## Quick start
<!-- {: .-three-column} -->

### Create a project

```sh
dotnet new console -o hello
cd hello
dotnet run
```
<!-- {: data-highlight="dotnet new console"} -->

`new` scaffolds a project, `run` compiles and runs it.

See: [dotnet new](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-new)

### Run one file

```sh
dotnet run hello.cs
```
<!-- {: data-highlight="dotnet run"} -->

A single `.cs` file runs without a project file.

See: [File-based apps](https://learn.microsoft.com/en-us/dotnet/core/sdk/file-based-apps)

### Build and publish

```sh
dotnet build -c Release
dotnet publish -c Release -o out
dotnet out/hello.dll
```
<!-- {: data-highlight="dotnet publish"} -->

`build` compiles, `publish` writes the runnable output to `out/`.

See: [dotnet publish](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-publish)

## Syntax
<!-- {: .-three-column} -->

### Program structure

```csharp
using System.Text;

Console.WriteLine("Hello");

var sb = new StringBuilder();
```

Statements at the top of the file become `Main`.

See: [Top-level statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Namespaces

```csharp
namespace Shop.Orders;

public class Order
{
    public int Id { get; set; }
}
```
<!-- {: data-highlight="namespace"} -->

A file-scoped namespace ends with `;` and covers the whole file.

See: [Namespaces](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/namespace)

### Variables

```csharp
int count = 3;
double ratio = 0.5;
decimal price = 9.99m;
string name = "Ada";
bool ready = true;
var label = $"{name}: {count}";
```
<!-- {: data-highlight="var; $"} -->

`var` infers the type; the `m` suffix makes a decimal.

See: [Declarations](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/declarations)

### Literals

```csharp
var million = 1_000_000;
var mask = 0b1010_0000;
var hex = 0xAB_CD;
var half = 0.5f;
```
<!-- {: data-highlight="1_000_000; 0b"} -->

`_` groups digits; `0b` and `0x` write binary and hex.

See: [Integer literals](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/integral-numeric-types#integer-literals)

### Strings

```csharp
var name = "Ada";
var greeting = $"Hi {name}";
var padded = $"{name,-6}|";
var upper = name.ToUpper();
var json = """
  { "id": 1 }
  """;
```
<!-- {: data-highlight='$"Hi {name}"'} -->

`{name,-6}` pads to six characters; `"""` keeps escapes literal.

See: [String interpolation](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/tokens/interpolated), [Raw strings](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/tokens/raw-string)

### Methods

```csharp
static int Add(int a, int b = 0) => a + b;

static string Join(params string[] xs) =>
    string.Join(" ", xs);

Console.WriteLine(Add(2, 3));    // 5
Console.WriteLine(Join("a", "b"));  // a b
```
<!-- {: data-highlight="=> a + b; params"} -->

`=>` is an expression body; `params` takes any number of arguments.

See: [Local functions](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/local-functions)

## Types
<!-- {: .-three-column} -->

### Built-in types

| Alias | .NET type | Example |
| --- | --- | --- |
| `int` | `Int32` | `42` |
| `long` | `Int64` | `42L` |
| `double` | `Double` | `3.14` |
| `decimal` | `Decimal` | `3.14m` |
| --- | --- | --- |
| `bool` | `Boolean` | `true` |
| `char` | `Char` | `'A'` |
| `string` | `String` | `"hi"` |
| `object` | `Object` | `new object()` |
<!-- {: .-headers} -->

`string` and `object` are reference types; the rest are value types.

See: [Built-in types](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types)

### Value and reference types

```csharp
var p1 = new Point { X = 1, Y = 2 };
var p2 = p1;        // copy
p2.X = 9;           // p1.X stays 1

var a = new User { Name = "Ada" };
var b = a;          // same instance
b.Name = "Bob";     // a.Name is Bob

struct Point { public int X, Y; }
class User { public string Name = ""; }
```
<!-- {: data-highlight="struct; class"} -->

Structs copy on assignment; classes share one instance.

See: [Structs](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/struct), [Classes](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/classes)

### Tuples

```csharp
var pair = ("Ada", 36);
Console.WriteLine(pair.Item1);   // Ada

(string Name, int Age) user = ("Ada", 36);
Console.WriteLine(user.Name);    // Ada

var (name, age) = user;
```
<!-- {: data-highlight="(string Name, int Age)"} -->

A tuple groups values positionally; names and deconstruction label them.

See: [Tuple types](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/value-tuples)

### Conversions

```csharp
int num = int.Parse("42");
bool ok = int.TryParse("abc", out int n);

double d = num;         // implicit
int back = (int)3.99;   // 3
string s = 42.ToString();
```
<!-- {: data-highlight="int.TryParse"} -->

`TryParse` returns `false` instead of throwing; a cast truncates.

See: [Convert a string to a number](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/types/how-to-convert-a-string-to-a-number)

## Nullables
<!-- {: .-three-column} -->

### Enable nullability

#### app.csproj

```xml
<Nullable>enable</Nullable>
```
<!-- {: data-highlight="<Nullable>enable</Nullable>"} -->

#### One file

```csharp
#nullable enable
```

The templates enable it; warnings like CS8602 flag unchecked nulls.

See: [Nullable settings](https://learn.microsoft.com/en-us/dotnet/csharp/nullable-references#nullable-context)

### Nullable value types

```csharp
int? maybe = null;
int count = maybe ?? 0;         // 0
var total = maybe.GetValueOrDefault(-1);

if (maybe is int value)
    Console.WriteLine(value);
```
<!-- {: data-highlight="int?; ??"} -->

`T?` lets a value type hold null; `is int value` matches only when there is a value.

See: [Nullable value types](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/nullable-value-types)

### Nullable references

```csharp
string? name = null;
var length = name?.Length;   // null
var shown = name ?? "anon";  // anon
name ??= "Ada";
```
<!-- {: data-highlight="?.Length; ??="} -->

`?.` short-circuits to null; `??=` assigns when the left side is null.

See: [Nullable reference types](https://learn.microsoft.com/en-us/dotnet/csharp/nullable-references)

### Throw on null

```csharp
string? name = null;

var safe = name ??
    throw new InvalidOperationException();

Console.WriteLine(safe);
```
<!-- {: data-highlight="throw"} -->

`throw` is an expression, so `??` can throw instead of falling back.

See: [throw expression](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/exception-handling-statements#the-throw-expression)

## Collections
<!-- {: .-three-column} -->

### Lists

```csharp
var items = new List<string> { "a", "b" };
items.Add("c");
items.Insert(0, "z");
items.Remove("b");

Console.WriteLine(items.Count);   // 3
Console.WriteLine(items[0]);      // z
```
<!-- {: data-highlight="List<string>; Add; Insert"} -->

Insert shifts later items; `Count` is the current length.

See: [List<T>](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1)

### Collection expressions

```csharp
int[] nums = [1, 2, 3];
List<string> names = ["Ada", "Bob"];
Span<char> chars = ['a', 'b'];
var rest = nums[1..];      // 2, 3
```
<!-- {: data-highlight="[1, 2, 3]"} -->

`[...]` builds arrays, lists and spans alike.

See: [Collection expressions](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/collection-expressions)

### Dictionaries

```csharp
var ages = new Dictionary<string, int>
{
    ["Ada"] = 36,
    ["Bob"] = 41,
};

ages["Cy"] = 25;

if (ages.TryGetValue("Ada", out var age))
    Console.WriteLine(age);     // 36

var zed = ages
    .GetValueOrDefault("Zed", -1);
Console.WriteLine(zed);      // -1
```
<!-- {: data-highlight="TryGetValue; GetValueOrDefault"} -->

`TryGetValue` avoids the missing-key exception; `GetValueOrDefault` returns a default instead.

See: [Dictionary<TKey,TValue>](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2)

### Iterate a dictionary

```csharp
var ages = new Dictionary<string, int>
{
    ["Ada"] = 36,
    ["Bob"] = 41,
};

foreach (var (name, age) in ages)
    Console.WriteLine($"{name} {age}");

foreach (var key in ages.Keys)
    Console.WriteLine(key);
```
<!-- {: data-highlight="var (name, age)"} -->

A dictionary yields key/value pairs that deconstruct in `foreach`.

See: [KeyValuePair](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.keyvaluepair-2)

## LINQ

### Filter and sort

```csharp
var scores = new[] { 42, 7, 88, 13 };

var high = scores
    .Where(n => n >= 40)
    .OrderByDescending(n => n)
    .ToList();

Console.WriteLine(string.Join(", ", high));
// 88, 42
```
<!-- {: data-highlight="Where; OrderByDescending"} -->

Chains are lazy; `ToList` runs the query.

See: [LINQ](https://learn.microsoft.com/en-us/dotnet/csharp/linq/)

### Select and aggregate

```csharp
var scores = new[] { 42, 7, 88, 13 };

Console.WriteLine(scores.Sum());        // 150
Console.WriteLine(scores.Max());        // 88
Console.WriteLine(scores.Average());    // 37.5
Console.WriteLine(
    string.Join(", ", scores.Select(n => n * 2)));
// 84, 14, 176, 26
```
<!-- {: data-highlight="Sum; Max; Average; Select"} -->

`Select` projects each item; `Sum`, `Max` and `Average` reduce a sequence.

See: [Enumerable methods](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable)

### Group items

```csharp
var words = new[] { "ant", "bee", "ape", "cow" };

foreach (var group in words.GroupBy(w => w[0]))
    Console.WriteLine($"{group.Key}: {string.Join(", ", group)}");

// a: ant, ape
// b: bee
// c: cow
```
<!-- {: data-highlight="GroupBy"} -->

`GroupBy` yields a key and its items; `group.Key` is what the key selector returned.

See: [GroupBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.groupby)

### Join lists

```csharp
var cities = new[] { ("Ada", "Sydney"), ("Bob", "Perth") };
var jobs = new[] { ("Ada", "engineer"), ("Cy", "designer") };

var rows =
    from c in cities
    join j in jobs on c.Item1 equals j.Item1
    select $"{c.Item1} is {j.Item2}";

foreach (var row in rows)
    Console.WriteLine(row);   // Ada is engineer
```
<!-- {: data-highlight="join"} -->

Unmatched keys drop out; add `into` and `DefaultIfEmpty` for a left join.

See: [Join operations](https://learn.microsoft.com/en-us/dotnet/csharp/linq/standard-query-operators/join-operations)

### Remove duplicates

```csharp
var tags = new[] { "a", "b", "a", "cc" };

Console.WriteLine(string.Join(", ", tags.Distinct()));
// a, b, cc

Console.WriteLine(
    string.Join(", ", tags.DistinctBy(t => t.Length)));
// a, cc
```
<!-- {: data-highlight="Distinct; DistinctBy"} -->

`Distinct` compares values; `DistinctBy` keeps the first item per key.

See: [DistinctBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.distinctby)

## Async

### Async methods

```csharp
Console.WriteLine(await FetchAsync());   // 42

static async Task<int> FetchAsync()
{
    await Task.Delay(100);
    return 42;
}
```
<!-- {: data-highlight="async Task<int>; await"} -->

`async Task<T>` returns a task; `await` unwraps its result.

See: [Asynchronous programming](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/)

### Parallel tasks

```csharp
var tasks = new[] { LoadAsync(1), LoadAsync(2) };
int[] results = await Task.WhenAll(tasks);

Console.WriteLine(string.Join(", ", results));
// 10, 20

static async Task<int> LoadAsync(int id)
{
    await Task.Delay(10);
    return id * 10;
}
```
<!-- {: data-highlight="Task.WhenAll"} -->

Start tasks before awaiting to run them concurrently; `WhenAll` gathers the results.

See: [Task.WhenAll](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.whenall)

### Async streams

```csharp
await foreach (var n in CountDown())
    Console.WriteLine(n);

static async IAsyncEnumerable<int> CountDown()
{
    for (int i = 3; i > 0; i--)
    {
        await Task.Delay(10);
        yield return i;
    }
}
```
<!-- {: data-highlight="IAsyncEnumerable; yield return"} -->

`await foreach` consumes items as they arrive, without buffering the sequence.

See: [Async streams](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/generate-consume-asynchronous-stream)

### Cancellation

```csharp
using var cts = new CancellationTokenSource(100);

try
{
    await Task.Delay(5000, cts.Token);
}
catch (OperationCanceledException)
{
    Console.WriteLine("cancelled");
}
```
<!-- {: data-highlight="CancellationTokenSource; cts.Token"} -->

Pass the token down; the timeout cancels the delay and throws.

See: [Cancellation](https://learn.microsoft.com/en-us/dotnet/standard/threading/cancellation-in-managed-threads)

## Records

### Declare a record

```csharp
var ada = new Person("Ada", 36);
Console.WriteLine(ada);   // Person { Name = Ada, Age = 36 }

var older = ada with { Age = 37 };

public record Person(string Name, int Age);
```
<!-- {: data-highlight="record Person; with"} -->

A positional record generates a constructor, properties, equality and `with`.

See: [Records](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/record)

### Record equality

```csharp
var a = new Person("Ada", 36);
var b = new Person("Ada", 36);

Console.WriteLine(a == b);   // True
Console.WriteLine(a == a with { Age = 40 });   // False

public record Person(string Name, int Age);
```
<!-- {: data-highlight="a == b"} -->

Records compare by value, property by property.

See: [Value equality](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/record#value-equality)

### Record structs

```csharp
var p = new Point(1, 2);
var q = p with { X = 3 };

Console.WriteLine(q);   // Point { X = 3, Y = 2 }

public readonly record struct Point(double X, double Y);
```
<!-- {: data-highlight="record struct"} -->

`record struct` adds value equality to a struct.

See: [Record structs](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/struct#record-struct)

### Required and init

```csharp
var user = new User { Name = "Ada", Age = 36 };

public class User
{
    public required string Name { get; init; }
    public int Age { get; init; }
}
```
<!-- {: data-highlight="required; init"} -->

`required` forces the initializer; `init` properties can only be set while constructing.

See: [required](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/required)

## Pattern matching

### Type and property patterns

```csharp
object value = 42;

if (value is int n && n > 10)
    Console.WriteLine($"{n} is big");   // 42 is big

if (value is not string { Length: > 0 })
    Console.WriteLine("not text");
```
<!-- {: data-highlight="is int n; { Length: > 0 }"} -->

`is` tests a type and binds it; property patterns match members.

See: [Patterns](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/patterns)

### Switch expressions

```csharp
static string Describe(int n) => n switch
{
    0 => "zero",
    < 0 => "negative",
    > 0 and < 10 => "small",
    _ => "large",
};

Console.WriteLine(Describe(7));   // small
```
<!-- {: data-highlight="switch; > 0 and < 10"} -->

`switch` returns a value; `_` is the catch-all arm.

See: [Switch expression](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/switch-expression)

### Guards

```csharp
Console.WriteLine(Classify(42));       // positive int
Console.WriteLine(Classify("hello"));  // long string
Console.WriteLine(Classify(null));     // null

static string Classify(object? o) => o switch
{
    int and > 0 => "positive int",
    string s when s.Length > 3 => "long string",
    null => "null",
    _ => "other",
};
```
<!-- {: data-highlight="when s.Length > 3"} -->

Combine patterns with `and`; `when` adds a condition to a type pattern.

See: [when](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/when), [Logical patterns](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/patterns#logical-patterns)

### List patterns

```csharp
int[] xs = [1, 2, 3];

if (xs is [1, .. var rest])
    Console.WriteLine(rest.Length);   // 2

if (xs is [_, .., 3])
    Console.WriteLine("ends with 3");
```
<!-- {: data-highlight=".. var rest"} -->

`..` matches any run of items; a trailing pattern matches the last item.

See: [List patterns](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/patterns#list-patterns)

## Generics

### Generic methods

```csharp
static T Max<T>(T a, T b)
    where T : IComparable<T> =>
    a.CompareTo(b) >= 0 ? a : b;

Console.WriteLine(Max(3, 9));       // 9
Console.WriteLine(Max("a", "b"));   // b
```
<!-- {: data-highlight="where T : IComparable<T>"} -->

Type arguments are inferred; the constraint supplies `CompareTo`.

See: [Generics](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/generics)

### Constraints

| Constraint | Accepts |
| --- | --- |
| `where T : class` | Reference types |
| `where T : struct` | Value types |
| `where T : notnull` | Non-nullable types |
| `where T : new()` | A public parameterless constructor |
| `where T : IComparable<T>` | Types implementing the interface |
| `where T : U` | `U` or a type derived from it |
<!-- {: .-headers} -->

Several constraints combine with commas, eg `where T : class, new()`.

See: [Constraints](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/generics/constraints-on-type-parameters)

### Generic types

```csharp
var box = new Box<int>(42);
Console.WriteLine(box.Value);   // 42

public class Box<T>(T value)
{
    public T Value { get; } = value;
}
```
<!-- {: data-highlight="Box<T>(T value)"} -->

A primary constructor declares class parameters on the type line.

See: [Generic classes](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/generics/generic-classes)

## .NET CLI

### Project file

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net11.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>
</Project>
```
<!-- {: data-highlight="<TargetFramework>net11.0</TargetFramework>"} -->

`Nullable` turns on null checks; `ImplicitUsings` adds common namespaces such as `System`.

See: [MSBuild properties](https://learn.microsoft.com/en-us/dotnet/core/project-sdk/msbuild-props)

### Solutions

```sh
dotnet new sln -n shop
dotnet new console -o api
dotnet sln add api/api.csproj
```
<!-- {: data-highlight="dotnet sln add"} -->

`sln add` records a project in the solution; building the solution builds every project.

See: [dotnet sln](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-sln)

### Packages

```sh
dotnet package add Humanizer \
  --project api/api.csproj
dotnet package list --project api/api.csproj
```
<!-- {: data-highlight="dotnet package add"} -->

`add package` resolves the latest version; `list package` prints what is installed.

See: [dotnet package add](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-package-add)

### Project references

```sh
dotnet new classlib -o lib
dotnet reference add lib/lib.csproj \
  --project api/api.csproj
```
<!-- {: data-highlight="reference add"} -->

A project reference links two projects without a package.

See: [dotnet reference add](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-reference-add)

### Tests

```sh
dotnet new xunit -o tests
dotnet test tests
```
<!-- {: data-highlight="dotnet test"} -->

`new xunit` scaffolds an xUnit project; `test` builds and runs it.

See: [dotnet test](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-test)

## Also see

<!-- {: .-one-column} -->

- [C# group by cheatsheet](./c-sharp-linq-group-by)
- [C# join lists cheatsheet](./c-sharp-linq-join)
- [C# distinct values cheatsheet](./c-sharp-distinct-by)
- [C# dictionary cheatsheet](./c-sharp-dictionary-lookup)
- [C# string to int cheatsheet](./c-sharp-string-to-int)
- [C# records cheatsheet](./c-sharp-records)
- [C# switch expression cheatsheet](./c-sharp-switch-expression)
- [C# nullable types cheatsheet](./c-sharp-nullable-reference-types)
- [dotnet sln add cheatsheet](./c-sharp-add-project-to-solution)
- [C# parallel tasks cheatsheet](./c-sharp-parallel-tasks)

[TypeScript cheatsheet](./typescript)
<!-- {: .-crosslink} -->

[Kotlin cheatsheet](./kotlin)
<!-- {: .-crosslink} -->
