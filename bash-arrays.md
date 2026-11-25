---
title: How to use arrays in Bash
link_title: Bash arrays
subtitle: Declare, index, and slice lists
category: Command line recipes
layout: snippet
last_verified_with: "Bash 5.3.0."
updated: 2026-11-24
tier: t3
links:
  - title: Bash arrays
    url: https://www.gnu.org/software/bash/manual/html_node/Arrays.html
  - title: Bash array loop
    url: /bash-array-loop
---

## Arrays
<!-- {: .-snippets} -->

### Declare
<!-- {: .-snippet} -->

```bash
fruits=("apple" "banana" "cherry")
```
<!-- {: data-highlight="fruits=("} -->

**Creates an indexed array.** Separate values with spaces and quote entries that contain spaces. See [arrays](https://www.gnu.org/software/bash/manual/html_node/Arrays.html).

### Index and length
<!-- {: .-snippet} -->

```bash
echo "${fruits[0]}"
echo "${#fruits[@]}"
```
<!-- {: data-highlight='${fruits[0]}; ${#fruits[@]}'} -->

**Reads an element and the array size.** Indices start at `0`, and `${#fruits[@]}` is the number of elements. See [arrays](https://www.gnu.org/software/bash/manual/html_node/Arrays.html).

### Append
<!-- {: .-snippet} -->

```bash
fruits+=("date")
```
<!-- {: data-highlight="+="} -->

**Adds an element to the end.** `+=` in an array context appends rather than concatenating strings. See [arrays](https://www.gnu.org/software/bash/manual/html_node/Arrays.html).

### Slice
<!-- {: .-snippet} -->

```bash
echo "${fruits[@]:1:2}"
```
<!-- {: data-highlight="[@]:1:2"} -->

**Takes a range of elements.** The offset is `1` and the length is `2`, so this prints `banana cherry`. See [arrays](https://www.gnu.org/software/bash/manual/html_node/Arrays.html).

### Associative arrays
<!-- {: .-snippet} -->

```bash
declare -A colors
colors[red]="#f00"
echo "${colors[red]}"
```
<!-- {: data-highlight="declare -A"} -->

**Creates an array keyed by string.** `declare -A` enables string keys; without it, subscripts are arithmetic. See [arrays](https://www.gnu.org/software/bash/manual/html_node/Arrays.html).
