---
title: How to enable nullable reference types in C#
link_title: C# nullable types
subtitle: Annotate nullable values
logo: { src: /assets/logos/csharp.svg }
category: C-like
layout: snippet
last_verified_with: "C# 15, .NET 11.0.100."
created_at: 2026-11-26
updated: 2026-11-28
tier: t3
links:
  - title: Nullable reference types
    url: https://learn.microsoft.com/en-us/dotnet/csharp/nullable-references
  - title: Nullable contexts
    url: https://learn.microsoft.com/en-us/dotnet/csharp/nullable-references#nullable-context
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

**Checks nulls project-wide.** Nulls are checked for the whole project. New templates enable it by default; see [Nullable contexts](https://learn.microsoft.com/en-us/dotnet/csharp/nullable-references#nullable-context).

### Annotate the type
<!-- {: .-snippet} -->

```csharp
string name = "Ada";
string? nickname = null;

Console.WriteLine(nickname?.Length);   // blank
Console.WriteLine(name.Length);        // 3
```
<!-- {: data-highlight="string? nickname"} -->

**Marks nullable types.** It flags a value that may be null. Without `?`, assigning `null` produces a warning; see [Nullable reference types](https://learn.microsoft.com/en-us/dotnet/csharp/nullable-references).

### Fall back when null
<!-- {: .-snippet} -->

```csharp
string? name = null;

var safe = name ?? "unknown";
name ??= "Ada";

Console.WriteLine(safe);   // unknown
Console.WriteLine(name);   // Ada
```
<!-- {: data-highlight="??="} -->

**Falls back when null.** It avoids dereferencing null. `??` and `??=` supply a default; see [Null-coalescing](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/null-coalescing-operator).
