---
title: How to loop over a range of numbers in Bash
link_title: Bash loop range
subtitle: Count between two numbers
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
  - title: Brace expansion
    url: https://www.gnu.org/software/bash/manual/html_node/Brace-Expansion.html
---

## Ranges
<!-- {: .-snippets} -->

### Brace range
<!-- {: .-snippet} -->

```bash
for i in {1..10}; do
  echo "$i"
done
```
<!-- {: data-highlight="{1..10}"} -->

**Counts a range,** from the first number to the last. Brace expansion happens in the shell, so no command runs; See [brace expansion](https://www.gnu.org/software/bash/manual/html_node/Brace-Expansion.html).

### With a step
<!-- {: .-snippet} -->

```bash
for i in {0..10..2}; do
  echo "$i"
done
```
<!-- {: data-highlight="{0..10..2}"} -->

**Adds a step,** as a third value. This prints `0 2 4 6 8 10`; See [brace expansion](https://www.gnu.org/software/bash/manual/html_node/Brace-Expansion.html).

### Zero-padded
<!-- {: .-snippet} -->

```bash
for i in {01..10}; do
  echo "$i"
done
```
<!-- {: data-highlight="{01..10}"} -->

**Pads every number,** to the same width. A leading zero sets the width, which gives you `01`, `02`, and so on; See [brace expansion](https://www.gnu.org/software/bash/manual/html_node/Brace-Expansion.html).

### Seq
<!-- {: .-snippet} -->

```bash
for i in $(seq 1 10); do
  echo "$i"
done
```
<!-- {: data-highlight="seq"} -->

**Calls `seq` for the numbers,** producing them without brace expansion. Use it when a bound is a variable, since `{1..$n}` does not expand; See [seq](https://www.gnu.org/software/coreutils/manual/html_node/seq-invocation.html).
