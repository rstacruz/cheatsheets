---
title: When to use cut vs awk
link_title: cut vs awk
subtitle: Pick fields from text
category: CLI
layout: snippet
last_verified_with: "GNU coreutils 9.12, GNU Awk 5.4."
updated: 2026-11-23
tier: t3
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

#### Input

```text
alice:1000
bob:1001
```

#### Output

```text
alice
bob
```

**Extracts fields by delimiter.** `cut` is the smallest choice for fixed delimiters and field numbers; see [cut](https://www.gnu.org/software/coreutils/manual/html_node/cut-invocation.html).

### awk by whitespace
<!-- {: .-snippet} -->

```bash
awk '{print $1}' file.txt
```
<!-- {: data-highlight="$1"} -->

#### Input

```text
alice 1000
bob   1001
```

#### Output

```text
alice
bob
```

**Extracts whitespace-separated fields.** `awk` collapses runs of whitespace and handles conditions, arithmetic, and formatting; see [Fields](https://www.gnu.org/software/gawk/manual/html_node/Fields.html).

### awk by delimiter
<!-- {: .-snippet} -->

```bash
awk -F: '{print $1}' /etc/passwd
```
<!-- {: data-highlight="-F:"} -->

#### Input

```text
alice:1000
bob:1001
```

#### Output

```text
alice
bob
```

**Extracts fields with a custom delimiter.** `-F` sets the separator, so awk fits once splitting needs logic; see [Field separators](https://www.gnu.org/software/gawk/manual/html_node/Field-Separators.html).
