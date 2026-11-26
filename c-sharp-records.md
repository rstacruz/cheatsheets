---
title: How to use records in C#
link_title: C# records
subtitle: Immutable data types
category: C-like
layout: snippet
last_verified_with: "C# 15, .NET 11.0.100."
updated: 2026-11-26
tier: t3
links:
  - title: Records
    url: https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/record
  - title: with expression
    url: https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/with-expression
---

## Records
<!-- {: .-snippets} -->

### Declare a record
<!-- {: .-snippet} -->

#### Person.cs

```csharp
public record Person(string Name, int Age);
```
<!-- {: data-highlight="record Person"} -->

#### Program.cs

```csharp
var ada = new Person("Ada", 36);
Console.WriteLine(ada.Name);   // Ada
```

**Declares a type in one line.** The positional parameters become properties; see [Records](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/record).

### Copy with changes
<!-- {: .-snippet} -->

#### Person.cs

```csharp
public record Person(string Name, int Age);
```

#### Program.cs

```csharp
var ada = new Person("Ada", 36);
var older = ada with { Age = 37 };

Console.WriteLine(older);
// Person { Name = Ada, Age = 37 }
```
<!-- {: data-highlight="with { Age = 37 }"} -->

**Copies a record with one property changed.** The original stays untouched; see [with expression](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/with-expression).

### Compare by value
<!-- {: .-snippet} -->

#### Person.cs

```csharp
public record Person(string Name, int Age);
```

#### Program.cs

```csharp
var a = new Person("Ada", 36);
var b = new Person("Ada", 36);

var changed = a with { Age = 37 };

Console.WriteLine(a == b);         // True
Console.WriteLine(a == changed);   // False
```
<!-- {: data-highlight="a == b"} -->

**Compares values, not references.** Two records match when every property matches. See [Value equality](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/record#value-equality).

### Use a record struct
<!-- {: .-snippet} -->

#### Point.cs

```csharp
public readonly record struct Point(
    int X, int Y);
```
<!-- {: data-highlight="record struct"} -->

#### Program.cs

```csharp
var p = new Point(1, 2);
var q = p with { X = 3 };

Console.WriteLine(q);   // Point { X = 3, Y = 2 }
```

**Adds value equality to a struct.** `record struct` stays a value type; see [Record structs](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/struct#record-struct).
