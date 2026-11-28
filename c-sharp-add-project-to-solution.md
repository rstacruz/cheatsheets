---
title: How to add a project to a .NET solution
link_title: dotnet sln add
subtitle: Manage solution files
logo: { src: /assets/logos/csharp.svg }
category: C-like
layout: snippet
last_verified_with: ".NET 11.0.100."
updated: 2026-11-28
tier: t3
links:
  - title: dotnet sln
    url: https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-sln
---

## Solutions
<!-- {: .-snippets} -->

### Create a solution
<!-- {: .-snippet} -->

```sh
dotnet new sln -n shop
dotnet new console -o api
```
<!-- {: data-highlight="dotnet new sln"} -->

**Starts a solution.** It sits beside a project; `new sln` writes `shop.slnx` in .NET 11. See [dotnet sln](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-sln).

### Add projects
<!-- {: .-snippet} -->

```sh
dotnet new classlib -o lib
dotnet sln add api/api.csproj lib/lib.csproj
dotnet sln list
```
<!-- {: data-highlight="dotnet sln add"} -->

**Registers projects in the solution.** `sln add` takes several at once; `list` prints them. See [dotnet sln list](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-sln#list).
