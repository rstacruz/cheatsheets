---
title: How to loop N times in Bash
link_title: Bash loop N times
subtitle: Repeat a command N times
logo: { src: /assets/logos/bash.svg }
category: Shell
layout: snippet
last_verified_with: "Bash 5.3.0."
created_at: 2026-11-27
updated: 2026-11-28
tier: t3
links:
  - title: Bash for loop cheatsheet
    url: /bash-for-loop
  - title: Looping constructs
    url: https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html
---

## Fixed counts
<!-- {: .-snippets} -->

### A fixed count
<!-- {: .-snippet} -->

```bash
for _ in {1..5}; do
  echo "tick"
done
```
<!-- {: data-highlight="{1..5}"} -->

**Runs the body five times.** `_` is a conventional throwaway name when the number itself is not needed; see [looping constructs](https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html).

### A variable count
<!-- {: .-snippet} -->

```bash
n=5

for i in $(seq 1 "$n"); do
  echo "$i"
done
```
<!-- {: data-highlight='$(seq 1 "$n")'} -->

**Reads a variable count.** `{1..$n}` stays literal because brace expansion runs first, so call `seq`. See [seq](https://www.gnu.org/software/coreutils/manual/html_node/seq-invocation.html).

### C-style loop
<!-- {: .-snippet} -->

```bash
n=5

for ((i = 0; i < n; i++)); do
  echo "$i"
done
```
<!-- {: data-highlight="for ((i = 0; i < n; i++))"} -->

**Counts with arithmetic.** Start, test, and step are ordinary bash arithmetic, so `$n` needs no prefix. See [arithmetic evaluation](https://www.gnu.org/software/bash/manual/html_node/Shell-Arithmetic.html).
