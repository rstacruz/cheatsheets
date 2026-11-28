---
title: How to remove duplicates in C#
link_title: C# distinct values
subtitle: Drop duplicate items
logo: { src: /assets/logos/csharp.svg }
category: C-like
layout: snippet
last_verified_with: "C# 15, .NET 11.0.100."
updated: 2026-11-28
tier: t3
links:
  - title: Enumerable.Distinct
    url: https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.distinct
  - title: Enumerable.DistinctBy
    url: https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.distinctby
---

## Duplicates
<!-- {: .-snippets} -->

### Distinct values
<!-- {: .-snippet} -->

```csharp
var tags = new[] { "Api", "api", "CLI" };

foreach (var tag in tags.Distinct())
    Console.WriteLine(tag);
```
<!-- {: data-highlight="Distinct()"} -->

**Drops repeated values.** `Distinct` compares with ordinal equality by default; see [Distinct](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.distinct).

### Distinct by a property
<!-- {: .-snippet} -->

```csharp
var people = new[] {
    new Person("Ada", "Sydney"),
    new Person("Bob", "Perth"),
    new Person("Cy", "Sydney"),
};

foreach (var p in people.DistinctBy(p => p.City))
    Console.WriteLine(p.Name);

record Person(string Name, string City);
```
<!-- {: data-highlight="DistinctBy"} -->

**Keeps the first item.** It keeps one item per key; `DistinctBy` compares the projected value. See [DistinctBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.distinctby).

### Ignore case
<!-- {: .-snippet} -->

```csharp
var tags = new[] { "Api", "api", "CLI" };

var unique = tags.Distinct(
    StringComparer.OrdinalIgnoreCase);

Console.WriteLine(string.Join(", ", unique));
// Api, CLI
```
<!-- {: data-highlight="StringComparer.OrdinalIgnoreCase"} -->

**Compares values case-insensitively.** Pass any `IEqualityComparer`; see [StringComparer](https://learn.microsoft.com/en-us/dotnet/api/system.stringcomparer).
