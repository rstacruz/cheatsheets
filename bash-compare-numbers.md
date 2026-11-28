---
title: How to compare numbers in Bash
link_title: Compare numbers
subtitle: Test integers in shell scripts
logo: { src: /assets/logos/bash.svg }
category: CLI
layout: snippet
last_verified_with: "Bash 5.3.0."
created_at: 2026-11-24
updated: 2026-11-24
tier: t3
links:
  - title: Bash conditional expressions
    url: https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html
  - title: Bash arithmetic
    url: https://www.gnu.org/software/bash/manual/html_node/Shell-Arithmetic.html
---

## Comparing
<!-- {: .-snippets} -->

### Equality
<!-- {: .-snippet} -->

```bash
[[ "$a" -eq "$b" ]]
```
<!-- {: data-highlight="-eq"} -->

**Compares two integers for equality.** Inside `[[ ]]` both sides are arithmetic, so `010` is octal; use `==` for strings. See [conditional expressions](https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html).

### Inequality
<!-- {: .-snippet} -->

```bash
[[ "$a" -ne "$b" ]]
```
<!-- {: data-highlight="-ne"} -->

**Checks that two integers differ.** Both sides are arithmetic, and an empty value counts as `0`. See [conditional expressions](https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html).

### Ordering
<!-- {: .-snippet} -->

```bash
[[ "$a" -lt "$b" ]]
[[ "$a" -le "$b" ]]
[[ "$a" -gt "$b" ]]
[[ "$a" -ge "$b" ]]
```
<!-- {: data-highlight="-lt; -le; -gt; -ge"} -->

**Compares integers by size.** `-lt` and `-gt` are strict; `-le` and `-ge` include equality. See [conditional expressions](https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html).

### Arithmetic form
<!-- {: .-snippet} -->

```bash
(( a > b ))
(( a + 1 == b ))
```
<!-- {: data-highlight="(( a > b )); (( a + 1 == b ))"} -->

**Compares with C-style operators.** Inside `(( ))` variables need no `$`, and `>` compares numbers. See [arithmetic](https://www.gnu.org/software/bash/manual/html_node/Shell-Arithmetic.html).

### Decimals
<!-- {: .-snippet} -->

```bash
awk 'BEGIN { print (1.5 > 1.2) }'
```
<!-- {: data-highlight="awk"} -->

#### Output

```text
1
```

**Compares decimals with awk.** Bash arithmetic is integer-only, so use `awk` for floats. See [comparison operators](https://www.gnu.org/software/gawk/manual/html_node/Comparison-Operators.html).
