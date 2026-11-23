---
title: When to use cut vs awk
link_title: cut vs awk
subtitle: Pick fields from text
category: Command line recipes
layout: snippet
updated: 2026-11-23
links:
  - title: GNU cut manual
    url: https://www.gnu.org/software/coreutils/manual/html_node/cut-invocation.html
  - title: GNU awk manual
    url: https://www.gnu.org/software/gawk/manual/html_node/index.html
---

## Choosing a tool
<!-- {: .-snippets} -->

### cut by delimiter
<!-- {: .-snippet} -->

```bash
cut -d: -f1 /etc/passwd
```
<!-- {: data-highlight="-d: -f1"} -->

`cut` is the smallest choice for fixed delimiters and field numbers; see [cut](https://www.gnu.org/software/coreutils/manual/html_node/cut-invocation.html).

### awk by whitespace
<!-- {: .-snippet} -->

```bash
awk '{print $1}' file.txt
```
<!-- {: data-highlight="$1"} -->

`awk` collapses runs of whitespace and handles conditions, arithmetic, and formatting; see [awk](https://www.gnu.org/software/gawk/manual/html_node/index.html).

### awk by delimiter
<!-- {: .-snippet} -->

```bash
awk -F: '{print $1}' /etc/passwd
```
<!-- {: data-highlight="-F:"} -->

`-F` sets the field separator, so awk is the better fit once splitting needs logic; see [awk](https://www.gnu.org/software/gawk/manual/html_node/index.html).
