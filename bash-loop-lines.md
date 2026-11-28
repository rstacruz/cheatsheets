---
title: How to loop over lines in a file in Bash
link_title: Bash loop lines
subtitle: Loop through a text file
logo: { src: /assets/logos/bash.svg }
category: Shell
layout: snippet
last_verified_with: "Bash 5.3.0."
updated: 2026-11-28
tier: t3
links:
  - title: Bash for loop cheatsheet
    url: /bash-for-loop
  - title: read builtin
    url: https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html#index-read
---

## Reading lines
<!-- {: .-snippets} -->

### Read a file
<!-- {: .-snippet} -->

```bash
while IFS= read -r line; do
  echo "$line"
done < file.txt
```
<!-- {: data-highlight="IFS= read -r line"} -->

**Reads one line per iteration.** `IFS=` keeps leading spaces and `-r` keeps backslashes; see [read](https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html#index-read).

### Lines from a variable
<!-- {: .-snippet} -->

```bash
while IFS= read -r line; do
  echo "$line"
done <<< "$text"
```
<!-- {: data-highlight='<<< "$text"'} -->

**Feeds a string.** It goes into the loop. The here-string adds a final newline, so the last line is not lost; see [here strings](https://www.gnu.org/software/bash/manual/html_node/Here-Strings.html).

### Skip blank lines
<!-- {: .-snippet} -->

```bash
while IFS= read -r line; do
  [ -n "$line" ] || continue
  echo "$line"
done < file.txt
```
<!-- {: data-highlight='[ -n "$line" ] || continue'} -->

**Ignores empty lines.** `-n` is true for a non-empty string, so `continue` skips the rest of the body; see [test](https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html).
