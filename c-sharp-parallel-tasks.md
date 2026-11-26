---
title: How to run tasks in parallel in C#
link_title: C# parallel tasks
subtitle: Await tasks concurrently
category: C-like
layout: snippet
last_verified_with: "C# 15, .NET 11.0.100."
updated: 2026-11-26
tier: t3
links:
  - title: Task.WhenAll
    url: https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.whenall
  - title: Asynchronous programming
    url: https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/
---

## Concurrency
<!-- {: .-snippets} -->

### Start, then await
<!-- {: .-snippet} -->

```csharp
var a = LoadAsync(1);
var b = LoadAsync(2);

int[] results = await Task.WhenAll(a, b);
var joined = string.Join(", ", results);
Console.WriteLine(joined);   // 10, 20

static async Task<int> LoadAsync(int id)
{
    await Task.Delay(10);
    return id * 10;
}
```
<!-- {: data-highlight="Task.WhenAll"} -->

**Runs tasks at the same time.** Starting them before awaiting overlaps the work; see [Task.WhenAll](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.whenall).

### Map a list to tasks
<!-- {: .-snippet} -->

```csharp
var ids = new[] { 1, 2, 3 };
var tasks = ids.Select(LoadAsync);
int[] results = await Task.WhenAll(tasks);
var joined = string.Join(", ", results);
Console.WriteLine(joined);   // 10, 20, 30

static async Task<int> LoadAsync(int id)
{
    await Task.Delay(10);
    return id * 10;
}
```
<!-- {: data-highlight="ids.Select(LoadAsync)"} -->

**Fans out one task per item.** `WhenAll` keeps the order of the input; see [Task.WhenAll](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.whenall).

### Stop waiting early
<!-- {: .-snippet} -->

```csharp
var tasks = new[] {
    LoadAsync(1), LoadAsync(2),
};
var all = Task.WhenAll(tasks);
var timeout = Task.Delay(1000);
var done = await Task.WhenAny(all, timeout);

Console.WriteLine(done == all);   // True
```
<!-- {: data-highlight="Task.WhenAny"} -->

**Races the work against a timer.** `WhenAny` returns the first task to finish; see [Task.WhenAny](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.whenany).
