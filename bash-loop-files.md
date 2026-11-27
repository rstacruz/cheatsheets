---
title: How to loop over files in a directory in Bash
link_title: Bash loop files
subtitle: Walk paths that contain spaces
logo: { src: /assets/logos/bash.svg }
category: Shell
layout: snippet
last_verified_with: "Bash 5.3.0."
updated: 2026-11-27
tier: t3
links:
  - title: Bash for loop cheatsheet
    url: /bash-for-loop
  - title: Filename expansion
    url: https://www.gnu.org/software/bash/manual/html_node/Filename-Expansion.html
---

## Directory loops
<!-- {: .-snippets} -->

### Match a pattern
<!-- {: .-snippet} -->

```bash
for f in *.txt; do
  echo "$f"
done
```
<!-- {: data-highlight="*.txt"} -->

**Loops over every matching path.** Quote `"$f"` so names with spaces survive the body; see [filename expansion](https://www.gnu.org/software/bash/manual/html_node/Filename-Expansion.html).

### Subdirectories too
<!-- {: .-snippet} -->

```bash
shopt -s globstar
for f in **/*.txt; do
  echo "$f"
done
```
<!-- {: data-highlight="globstar"} -->

**Enables `**` to match across directories.** `globstar` makes `**/*.txt` include nested files; see [shopt](https://www.gnu.org/software/bash/manual/html_node/The-Shopt-Builtin.html).

### Skip an empty match
<!-- {: .-snippet} -->

```bash
shopt -s nullglob
for f in *.txt; do
  echo "$f"
done
```
<!-- {: data-highlight="nullglob"} -->

**Prevents one bogus iteration.** Without `nullglob` an unmatched pattern loops once with the literal `*.txt`; see [shopt](https://www.gnu.org/software/bash/manual/html_node/The-Shopt-Builtin.html).

### Any filename
<!-- {: .-snippet} -->

```bash
find . -name '*.txt' -print0 |
  while IFS= read -r -d '' f; do
    echo "$f"
  done
```
<!-- {: data-highlight="-print0"} -->

**Handles names with newlines.** `-print0` ends each path with NUL and `read -d ''` splits on it; see [find](https://www.gnu.org/software/findutils/manual/html_node/find_html/).
