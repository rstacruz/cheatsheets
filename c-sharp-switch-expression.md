---
title: How to write a switch expression in C#
link_title: C# switch expression
subtitle: Pattern-based branching
category: C-like
layout: snippet
last_verified_with: "C# 15, .NET 11.0.100."
updated: 2026-11-26
tier: t3
links:
  - title: Switch expression
    url: https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/switch-expression
  - title: Patterns
    url: https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/patterns
---

## Switching
<!-- {: .-snippets} -->

### Match values
<!-- {: .-snippet} -->

```csharp
static string Label(int n) => n switch
{
    0 => "zero",
    1 or 2 => "small",
    _ => "other",
};

Console.WriteLine(Label(2));   // small
```
<!-- {: data-highlight="1 or 2"} -->

**Returns the value of the matching arm.** `_` catches everything else; see [Switch expression](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/switch-expression).

### Match ranges
<!-- {: .-snippet} -->

```csharp
static string Size(int n) => n switch
{
    < 0 => "negative",
    < 10 => "small",
    < 100 => "medium",
    _ => "large",
};

Console.WriteLine(Size(7));    // small
Console.WriteLine(Size(42));   // medium
```
<!-- {: data-highlight="< 10"} -->

**Tests with relational patterns.** Arms are checked top to bottom; see [Relational patterns](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/patterns#relational-patterns).

### Match types with guards
<!-- {: .-snippet} -->

```csharp
static string Kind(object? o) => o switch
{
    int and > 0 => "positive",
    string s when s.Length > 3 => "long",
    null => "null",
    _ => "other",
};

Console.WriteLine(Kind(3));        // positive
Console.WriteLine(Kind("hey"));    // other
Console.WriteLine(Kind("hello"));  // long
```
<!-- {: data-highlight="when s.Length > 3"} -->

**Adds a condition to a type pattern.** `when` runs only after the type matches; see [when guard](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/patterns#when-guard).
