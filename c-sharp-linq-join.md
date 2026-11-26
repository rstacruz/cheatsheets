---
title: How to join two lists in C#
link_title: C# join lists
subtitle: Join lists with LINQ
category: C-like
layout: snippet
last_verified_with: "C# 15, .NET 11.0.100."
updated: 2026-11-26
tier: t3
links:
  - title: Join operations
    url: https://learn.microsoft.com/en-us/dotnet/csharp/linq/standard-query-operators/join-operations
  - title: Enumerable.Join
    url: https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.join
---

## Joins
<!-- {: .-snippets} -->

### Inner join
<!-- {: .-snippet} -->

```csharp
var people = new[] { ("Ada", 1), ("Bob", 2) };
var cities = new[] {
    (1, "Sydney"), (2, "Perth"),
};

var rows =
    from p in people
    join c in cities on p.Item2 equals c.Item1
    select $"{p.Item1} lives in {c.Item2}";

foreach (var row in rows)
    Console.WriteLine(row);
```
<!-- {: data-highlight="join c in cities"} -->

**Matches rows with equal keys.** Unmatched rows drop out; see [Join operations](https://learn.microsoft.com/en-us/dotnet/csharp/linq/standard-query-operators/join-operations).

### Left join
<!-- {: .-snippet} -->

```csharp
var people = new[] {
    new Person("Ada", 1),
    new Person("Bob", 2),
};
var cities = new[] { new City(1, "Sydney") };

var rows =
    from p in people
    join c in cities on p.CityId equals c.Id
        into matches
    from c in matches.DefaultIfEmpty()
    select $"{p.Name}: {c?.Name ?? "unknown"}";

foreach (var row in rows)
    Console.WriteLine(row);

record Person(string Name, int CityId);
record City(int Id, string Name);
```
<!-- {: data-highlight="DefaultIfEmpty"} -->

**Keeps rows without a match.** `into` groups the matches and `DefaultIfEmpty` yields null; see [Left outer join](https://learn.microsoft.com/en-us/dotnet/csharp/linq/standard-query-operators/join-operations#perform-left-outer-joins).
