---
title: Bash array loop
h1_title: How to loop over a Bash array
subtitle: Iterate arrays safely
category: Command line recipes
layout: snippet
last_verified_with: "Bash 5.3.0."
updated: 2026-11-23
links:
  - title: Bash arrays
    url: https://www.gnu.org/software/bash/manual/html_node/Arrays.html
---

## Looping
<!-- {: .-snippets} -->

### Values
<!-- {: .-snippet} -->

```bash
fruits=("apple" "banana" "cherry")
for fruit in "${fruits[@]}"; do
  echo "$fruit"
done
```
<!-- {: data-highlight="${fruits[@]}"} -->

Quoting `"${fruits[@]}"` keeps one element per iteration, even when values contain spaces; see [arrays](https://www.gnu.org/software/bash/manual/html_node/Arrays.html).

### Indices
<!-- {: .-snippet} -->

```bash
for i in "${!fruits[@]}"; do
  echo "$i: ${fruits[$i]}"
done
```
<!-- {: data-highlight="${!fruits[@]}"} -->

`!` expands to the array indices, which is useful when the position matters; see [arrays](https://www.gnu.org/software/bash/manual/html_node/Arrays.html).

### C-style loop
<!-- {: .-snippet} -->

```bash
for ((i = 0; i < ${#fruits[@]}; i++)); do
  echo "${fruits[i]}"
done
```
<!-- {: data-highlight="${#fruits[@]}"} -->

`${#array[@]}` is the array length; this form is handy when you need the numeric index. See [arrays](https://www.gnu.org/software/bash/manual/html_node/Arrays.html).
