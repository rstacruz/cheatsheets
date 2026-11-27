---
title: How to group items in C#
link_title: C# group by
subtitle: Group with LINQ
logo: { src: /assets/logos/csharp.svg }
category: C-like
layout: snippet
last_verified_with: "C# 15, .NET 11.0.100."
updated: 2026-11-26
tier: t3
links:
  - title: GroupBy
    url: https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.groupby
  - title: Grouping data
    url: https://learn.microsoft.com/en-us/dotnet/csharp/linq/standard-query-operators/grouping-data
---

## Grouping
<!-- {: .-snippets} -->

### Group by a key
<!-- {: .-snippet} -->

```csharp
var words = new[] { "ant", "bee", "ape", "cow" };

foreach (var g in words.GroupBy(w => w[0]))
{
    var items = string.Join(", ", g);
    Console.WriteLine($"{g.Key}: {items}");
}
```
<!-- {: data-highlight="GroupBy"} -->

**Groups items by a key.** Each group exposes `Key` and enumerates its items; see [GroupBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.groupby).

### Store groups in a dictionary
<!-- {: .-snippet} -->

```csharp
var words = new[] { "ant", "bee", "ape", "cow" };

var byLetter = words
    .GroupBy(w => w[0])
    .ToDictionary(g => g.Key, g => g.ToList());

Console.WriteLine(byLetter['a'].Count);   // 2
```
<!-- {: data-highlight="ToDictionary"} -->

**Maps each key to its list.** `ToDictionary` materialises groups; see [ToDictionary](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.todictionary).

### Count each group
<!-- {: .-snippet} -->

```csharp
var words = new[] {
    "ant", "bee", "ape", "cow", "duck",
};

var counts = words
    .GroupBy(w => w.Length)
    .Select(g => new {
        Length = g.Key, Count = g.Count(),
    });

foreach (var c in counts)
    Console.WriteLine($"{c.Length}: {c.Count}");
```
<!-- {: data-highlight="Count = g.Count()"} -->

**Counts items per group.** `g.Count()` counts the items of one group; see [Count](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.count).
