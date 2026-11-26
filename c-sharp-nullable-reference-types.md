---
title: How to enable nullable reference types in C#
link_title: C# nullable types
subtitle: Annotate nullable values
category: C-like
layout: snippet
last_verified_with: "C# 15, .NET 11.0.100."
updated: 2026-11-26
tier: t3
links:
  - title: Nullable reference types
    url: https://learn.microsoft.com/en-us/dotnet/csharp/nullable-references
  - title: Nullable contexts
    url: https://learn.microsoft.com/en-us/dotnet/csharp/nullable-references#nullable-contexts
---

## Nullability
<!-- {: .-snippets} -->

### Turn it on
<!-- {: .-snippet} -->

```xml
<PropertyGroup>
  <Nullable>enable</Nullable>
</PropertyGroup>
```
<!-- {: data-highlight="<Nullable>enable</Nullable>"} -->

**Checks nulls for the whole project.** New templates enable it already; see [Nullable contexts](https://learn.microsoft.com/en-us/dotnet/csharp/nullable-references#nullable-contexts).

### Annotate the type
<!-- {: .-snippet} -->

```csharp
string name = "Ada";
string? nickname = null;

Console.WriteLine(nickname?.Length);   // blank
Console.WriteLine(name.Length);        // 3
```
<!-- {: data-highlight="string? nickname"} -->

**Marks a value that may be null.** `string?` opts into the null check; see [Nullable reference types](https://learn.microsoft.com/en-us/dotnet/csharp/nullable-references).

### Handle the null
<!-- {: .-snippet} -->

```csharp
string? name = null;

var safe = name ?? "unknown";
name ??= "Ada";

Console.WriteLine(safe);   // unknown
Console.WriteLine(name);   // Ada
```
<!-- {: data-highlight="??= "} -->

**Falls back instead of dereferencing null.** `??` and `??=` keep the compiler quiet; see [Null-coalescing](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/null-coalescing-operator).
