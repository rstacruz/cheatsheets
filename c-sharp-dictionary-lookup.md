---
title: How to use a dictionary in C#
link_title: C# dictionary
subtitle: Read and write keys
logo: { src: /assets/logos/csharp.svg }
category: C-like
layout: snippet
last_verified_with: "C# 15, .NET 11.0.100."
created_at: 2026-11-26
updated: 2026-11-28
tier: t3
links:
  - title: Dictionary<TKey,TValue>
    url: https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2
  - title: TryGetValue
    url: https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2.trygetvalue
---

## Lookups
<!-- {: .-snippets} -->

### Check for a key
<!-- {: .-snippet} -->

```csharp
var ages = new Dictionary<string, int>
{
    ["Ada"] = 36,
};

if (ages.TryGetValue("Bob", out var age))
    Console.WriteLine(age);
else
    Console.WriteLine("missing");
```
<!-- {: data-highlight="TryGetValue"} -->

**Checks for a key.** `TryGetValue` returns false rather than throwing when the key is missing. See [TryGetValue](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2.trygetvalue).

### Fall back to a default
<!-- {: .-snippet} -->

```csharp
var ages = new Dictionary<string, int>
{
    ["Ada"] = 36,
};

var age = ages.GetValueOrDefault("Bob", -1);
var known = ages.ContainsKey("Ada");

Console.WriteLine($"{age} {known}");   // -1 True
```
<!-- {: data-highlight="GetValueOrDefault"} -->

**Returns a fallback.** Use it instead of the indexer, which throws `KeyNotFoundException`. See [GetValueOrDefault](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.collectionextensions.getvalueordefault).

### Add or update
<!-- {: .-snippet} -->

```csharp
var counts = new Dictionary<string, int>();

counts["ada"] = 1;          // add
counts["ada"] += 1;         // update
counts.TryAdd("bob", 1);    // only if missing

Console.WriteLine(counts["ada"]);   // 2
```
<!-- {: data-highlight='["ada"] = 1; += 1; TryAdd'} -->

**Writes a key.** The indexer adds or updates it, while `TryAdd` leaves an existing key alone. See [TryAdd](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2.tryadd).
