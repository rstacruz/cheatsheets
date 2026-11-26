---
title: How to convert a string to an int in C#
link_title: C# string to int
subtitle: Parse numbers safely
category: C-like
layout: snippet
last_verified_with: "C# 15, .NET 11.0.100."
updated: 2026-11-26
tier: t3
links:
  - title: Parse numbers
    url: https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/types/how-to-convert-a-string-to-a-number
  - title: Int32.TryParse
    url: https://learn.microsoft.com/en-us/dotnet/api/system.int32.tryparse
---

## Parsing
<!-- {: .-snippets} -->

### Convert without throwing
<!-- {: .-snippet} -->

```csharp
bool ok = int.TryParse("42", out int n);
Console.WriteLine($"{ok} {n}");   // True 42

var bad = int.TryParse("4.2", out _);
Console.WriteLine(bad);           // False
```
<!-- {: data-highlight="int.TryParse"} -->

**Returns false for bad input.** `TryParse` leaves `n` at 0 instead of throwing; see [TryParse](https://learn.microsoft.com/en-us/dotnet/api/system.int32.tryparse).

### Convert and throw
<!-- {: .-snippet} -->

```csharp
using System.Globalization;

int n = int.Parse("42");
long big = long.Parse("9999999999");
double d = double.Parse(
    "3.14", CultureInfo.InvariantCulture);

Console.WriteLine($"{n} {big} {d}");
```
<!-- {: data-highlight="int.Parse"} -->

**Throws on bad input.** Pass a culture when the format is fixed; see [Parse](https://learn.microsoft.com/en-us/dotnet/api/system.int32.parse).

### Parse formatted numbers
<!-- {: .-snippet} -->

```csharp
using System.Globalization;

var n = int.Parse("-1,000",
    NumberStyles.Integer |
        NumberStyles.AllowThousands,
    CultureInfo.InvariantCulture);
Console.WriteLine(n);   // -1000
```
<!-- {: data-highlight="NumberStyles.AllowThousands"} -->

**Reads separators and signs.** Culture and styles decide how thousands separators are read. See [NumberStyles](https://learn.microsoft.com/en-us/dotnet/api/system.globalization.numberstyles).
