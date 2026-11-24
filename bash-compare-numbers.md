---
title: How to compare numbers in Bash
link_title: Compare numbers
subtitle: Test integers in shell scripts
category: Command line recipes
layout: snippet
last_verified_with: "Bash 5.3.0."
updated: 2026-11-24
links:
  - title: Bash conditional expressions
    url: https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html
  - title: Bash arithmetic
    url: https://www.gnu.org/software/bash/manual/html_node/Shell-Arithmetic.html
---

## Comparing
<!-- {: .-snippets} -->

### Equal
<!-- {: .-snippet} -->

```bash
[[ "$a" -eq "$b" ]]
```
<!-- {: data-highlight="-eq"} -->

**Compares two integers for equality.** `-eq` compares values, so `010` equals `10`; use `==` for strings. See [conditional expressions](https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html).

### Not equal
<!-- {: .-snippet} -->

```bash
[[ "$a" -ne "$b" ]]
```
<!-- {: data-highlight="-ne"} -->

**Checks that two integers differ.** Both sides must be integers, or the test errors out. See [conditional expressions](https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html).

### Ordering
<!-- {: .-snippet} -->

```bash
[[ "$a" -lt "$b" ]]
[[ "$a" -le "$b" ]]
[[ "$a" -gt "$b" ]]
[[ "$a" -ge "$b" ]]
```
<!-- {: data-highlight="-lt; -le; -gt; -ge"} -->

**Compares integers by size.** `-lt` and `-le` test less than, `-gt` and `-ge` greater than. See [conditional expressions](https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html).

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
