---
title: How to compare strings in Bash
link_title: Compare strings
subtitle: Test strings in shell scripts
category: Command line recipes
layout: snippet
last_verified_with: "Bash 5.3.0."
updated: 2026-11-24
links:
  - title: Bash conditional expressions
    url: https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html
  - title: test builtin
    url: https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html
---

## Comparing
<!-- {: .-snippets} -->

### Equality
<!-- {: .-snippet} -->

```bash
[[ "$a" == "$b" ]] && echo "match"
```
<!-- {: data-highlight="=="} -->

**Checks two strings for equality.** Quote both sides: word splitting does not happen inside `[[ ]]`, but an unquoted right side is read as a glob pattern. See [conditional expressions](https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html).

### Inequality
<!-- {: .-snippet} -->

```bash
[[ "$a" != "$b" ]] && echo "different"
```
<!-- {: data-highlight="!="} -->

**Checks that two strings differ.** It succeeds when the values are unequal, including when one is empty. See [conditional expressions](https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html).

### Lexical order
<!-- {: .-snippet} -->

```bash
[[ "$a" < "$b" ]]
[ "$a" \< "$b" ]
```
<!-- {: data-highlight="<; \<"} -->

**Compares strings lexically.** `[[ ]]` uses the current locale; `[ ]` uses ASCII ordering and needs `\<` to avoid a redirection. See [conditional expressions](https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html).

### Pattern match
<!-- {: .-snippet} -->

```bash
[[ "$file" == *.txt ]]
```
<!-- {: data-highlight="*.txt"} -->

**Matches a glob pattern.** Leave the pattern unquoted; quoting the right side turns it into a literal comparison. See [pattern matching](https://www.gnu.org/software/bash/manual/html_node/Pattern-Matching.html).

### Empty strings
<!-- {: .-snippet} -->

```bash
[[ -z "$a" ]]
[[ -n "$a" ]]
```
<!-- {: data-highlight="-z; -n"} -->

**Tests for empty or non-empty strings.** `-z` is true for an empty string and `-n` for a non-empty one. See [test](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html).
