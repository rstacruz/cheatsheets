---
title: How to add a project to a .NET solution
link_title: dotnet sln add
subtitle: Manage solution files
category: C-like
layout: snippet
last_verified_with: ".NET 11.0.100."
updated: 2026-11-26
tier: t3
links:
  - title: dotnet sln
    url: https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-sln
  - title: dotnet add reference
    url: https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-add-reference
---

## Solutions
<!-- {: .-snippets} -->

### Create and add
<!-- {: .-snippet} -->

```sh
dotnet new sln -n shop
dotnet new console -o api
dotnet sln add api/api.csproj
```
<!-- {: data-highlight="dotnet sln add"} -->

**Registers a project in the solution.** A solution groups projects for one build; see [dotnet sln](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-sln).

### Add several projects
<!-- {: .-snippet} -->

```sh
dotnet new classlib -o lib
dotnet sln add api/api.csproj lib/lib.csproj
dotnet sln list
```
<!-- {: data-highlight="api/api.csproj lib/lib.csproj"} -->

**Adds many projects in one call.** `list` prints what the solution holds; see [dotnet sln list](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-sln#list).
