---
title: Bash for loop
subtitle: Iterate lists, ranges, and files
logo: { src: /assets/logos/bash.svg }
category: Shell
updated: 2026-11-27
last_verified_at: 2026-11-27
last_verified_with: "Bash 5.3.0."
tier: t2
fragments:
  - "for i in {1..10}"
  - "for f in *.txt"
  - '"${files[@]}"'
  - "seq 1 10"
  - "-print0"
  - "read -r -d ''"
  - "{1..10..2}"
  - "globstar"
  - "nullglob"
  - "IFS= read -r"
  - "mapfile -d ''"
  - "break 2"
  - "continue"
  - '"New York"'
  - "$(seq 1 10)"
keywords:
  - Bash for loop
  - for i in {1..10}
  - Bash loop files
  - find -print0
  - seq
intro: |
  [Bash](https://www.gnu.org/software/bash/manual/bash.html) `for` loops repeat a command over a list, range, glob, or command output. This covers the common forms and their quoting rules.
links:
  - title: Looping constructs
    url: https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html
  - title: Bash reference manual
    url: https://www.gnu.org/software/bash/manual/bash.html
---

## Looping over values

<!-- {: .-three-column} -->

### Over a list

```bash
for fruit in apple banana cherry; do
  echo "$fruit"
done
```
<!-- {: data-highlight="apple banana cherry"} -->

Each word after `in` becomes one iteration.

See: [Looping constructs](https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html)

### Items with spaces

```bash
for city in "New York" "Los Angeles"; do
  echo "$city"
done
```
<!-- {: data-highlight='"New York"'} -->

Quote each entry so spaces stay inside one iteration.

See: [Quoting](https://www.gnu.org/software/bash/manual/html_node/Quoting.html)

### Over a variable

```bash
words="apple banana cherry"

for word in $words; do
  echo "$word"
done
```
<!-- {: data-highlight="$words"} -->

Unquoted `$words` splits on spaces, tabs, and newlines. Quoting it as `"$words"` loops once with the whole string.

See: [Word splitting](https://www.gnu.org/software/bash/manual/html_node/Word-Splitting.html)

## Ranges

<!-- {: .-three-column} -->

### Brace range

```bash
for i in {1..10}; do
  echo "$i"
done
```
<!-- {: data-highlight="{1..10}"} -->

Brace expansion runs before the loop, so this needs no external command.

See: [Brace expansion](https://www.gnu.org/software/bash/manual/html_node/Brace-Expansion.html)

### Step and padding

#### With a step

```bash
for i in {1..10..2}; do
  echo "$i"
done
```
<!-- {: data-highlight="{1..10..2}"} -->

#### Zero-padded

```bash
for i in {01..10}; do
  echo "$i"
done
```
<!-- {: data-highlight="{01..10}"} -->

The third value is the step; a leading zero pads every number to the same width.

See: [Brace expansion](https://www.gnu.org/software/bash/manual/html_node/Brace-Expansion.html)

### Seq

```bash
for i in $(seq 1 10); do
  echo "$i"
done
```
<!-- {: data-highlight="seq"} -->

`seq` prints the numbers from start to stop, one per line.

See: [seq invocation](https://www.gnu.org/software/coreutils/manual/html_node/seq-invocation.html)

### Variable count

```bash
n=5
for i in $(seq 1 "$n"); do
  echo "$i"
done
```
<!-- {: data-highlight='$(seq 1 "$n")'} -->

`{1..$n}` stays literal because brace expansion runs before variable expansion; use `seq` or a C-style loop instead.

See: [seq invocation](https://www.gnu.org/software/coreutils/manual/html_node/seq-invocation.html)

### C-style loop

```bash
for ((i = 0; i < 3; i++)); do
  echo "$i"
done
```
<!-- {: data-highlight="for ((i = 0; i < 3; i++))"} -->

The three arithmetic expressions are start, test, and step.

See: [Arithmetic evaluation](https://www.gnu.org/software/bash/manual/html_node/Shell-Arithmetic.html)

## Arrays

<!-- {: .-three-column} -->

### Over values

```bash
files=("a.txt" "b c.txt")

for f in "${files[@]}"; do
  echo "$f"
done
```
<!-- {: data-highlight='"${files[@]}"'} -->

Quoting `"${files[@]}"` gives one iteration per element.

See: [Arrays](https://www.gnu.org/software/bash/manual/html_node/Arrays.html)

### Over indices

```bash
for i in "${!files[@]}"; do
  echo "$i: ${files[$i]}"
done
```
<!-- {: data-highlight='"${!files[@]}"'} -->

`!` expands to the indices, for when the position matters.

See: [Arrays](https://www.gnu.org/software/bash/manual/html_node/Arrays.html)

### Unquoted values

```bash
for f in ${files[@]}; do
  echo "$f"
done
```
<!-- {: data-highlight="${files[@]}"} -->

Without quotes the array splits on whitespace, so `b c.txt` arrives as two iterations.

See: [Word splitting](https://www.gnu.org/software/bash/manual/html_node/Word-Splitting.html)

## Files and globs

<!-- {: .-three-column} -->

### Glob pattern

```bash
for f in *.txt; do
  echo "$f"
done
```
<!-- {: data-highlight="*.txt"} -->

The shell expands the glob before the loop starts, so each iteration gets one path.

See: [Filename expansion](https://www.gnu.org/software/bash/manual/html_node/Filename-Expansion.html)

### Recursive glob

```bash
shopt -s globstar
for f in **/*.md; do
  echo "$f"
done
```
<!-- {: data-highlight="globstar; **/*.md"} -->

`globstar` turns on `**`, which also matches files in the current directory.

See: [shopt](https://www.gnu.org/software/bash/manual/html_node/The-Shopt-Builtin.html)

### No matches

```bash
shopt -s nullglob
for f in *.txt; do
  echo "$f"
done
```
<!-- {: data-highlight="nullglob"} -->

Without `nullglob` an unmatched pattern loops once with the literal `*.txt`. `[ -e "$f" ] || continue` guards a loop instead.

See: [shopt](https://www.gnu.org/software/bash/manual/html_node/The-Shopt-Builtin.html)

## Command output

### Read lines

```bash
while IFS= read -r line; do
  echo "$line"
done < <(grep -rh TODO src)
```
<!-- {: data-highlight="IFS= read -r line"} -->

Reads one line per iteration and keeps spaces. `< <(…)` runs the producer in a process substitution, so the loop keeps its variables.

See: [Process substitution](https://www.gnu.org/software/bash/manual/html_node/Process-Substitution.html)

### Null-delimited find

```bash
find . -name '*.txt' -print0 |
  while IFS= read -r -d '' f; do
    echo "$f"
  done
```
<!-- {: data-highlight="-print0; read -r -d ''"} -->

Newlines and spaces survive: `-print0` ends each path with NUL, and `read -d ''` splits on NUL.

See: [find](https://www.gnu.org/software/findutils/manual/html_node/find_html/)

### Collect first

```bash
mapfile -d '' -t files < <(find . -name '*.txt' -print0)

for f in "${files[@]}"; do
  echo "$f"
done
```
<!-- {: data-highlight="mapfile -d ''"} -->

`-d ''` splits on NUL and `-t` drops the terminator, so the array stays usable after `find` exits.

See: [mapfile](https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html#index-mapfile)

### Piped loop

```bash
n=0
printf 'a\nb\n' | while read -r line; do
  n=$((n + 1))
done
echo "$n"    # 0
```
<!-- {: data-highlight="| while read"} -->

A pipe runs `while` in a subshell, so `n` stays `0`. Use `< <(…)` to count, or `shopt -s lastpipe` in a non-interactive shell.

See: [Pipelines](https://www.gnu.org/software/bash/manual/html_node/Pipelines.html)

## Loop control

<!-- {: .-three-column} -->

### Skip and stop

```bash
for i in {1..5}; do
  [ "$i" = 3 ] && continue
  [ "$i" = 5 ] && break
  echo "$i"
done
```
<!-- {: data-highlight="continue; break"} -->

`continue` skips one iteration and `break` leaves the loop.

See: [Looping constructs](https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html)

### Nested loops

```bash
for row in 1 2 3; do
  for col in a b c; do
    [ "$row$col" = 2b ] && break 2
    echo "$row$col"
  done
done
```
<!-- {: data-highlight="break 2"} -->

`break 2` leaves both loops; `continue 2` skips to the next outer iteration.

See: [Looping constructs](https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html)

## Also see

<!-- {: .-one-column} -->

- [Bash scripting cheatsheet](./bash)
- [Bash arrays cheatsheet](./bash-arrays)
- [Bash array loop cheatsheet](./bash-array-loop)
- [Bash strict mode cheatsheet](./bash-strict-mode)
- [GNU Bash manual](https://www.gnu.org/software/bash/manual/bash.html) _(gnu.org)_
- [BashFAQ](https://mywiki.wooledge.org/BashFAQ) _(wooledge.org)_
