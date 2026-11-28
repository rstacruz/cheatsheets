---
title: How to loop over command output in Bash
link_title: Bash loop output
subtitle: Loop over a command's output
logo: { src: /assets/logos/bash.svg }
category: Shell
layout: snippet
last_verified_with: "Bash 5.3.0."
updated: 2026-11-28
tier: t3
links:
  - title: Bash for loop cheatsheet
    url: /bash-for-loop
  - title: Process substitution
    url: https://www.gnu.org/software/bash/manual/html_node/Process-Substitution.html
---

## Command output
<!-- {: .-snippets} -->

### Read line by line
<!-- {: .-snippet} -->

```bash
while IFS= read -r line; do
  echo "$line"
done < <(git ls-files)
```
<!-- {: data-highlight="< <("} -->

**Runs the command once,** and reads its stdout. Process substitution keeps spaces and avoids the subshell a pipe creates; See [process substitution](https://www.gnu.org/software/bash/manual/html_node/Process-Substitution.html).

### Keep a counter
<!-- {: .-snippet} -->

```bash
n=0
git ls-files | while read -r line; do
  n=$((n + 1))
done
echo "$n"    # 0
```
<!-- {: data-highlight="| while read"} -->

**Shows state loss,** caused by a pipe. The whole `while` runs in a subshell, so `n` stays `0`; See [pipelines](https://www.gnu.org/software/bash/manual/html_node/Pipelines.html).

### One word per iteration
<!-- {: .-snippet} -->

```bash
for file in $(git ls-files); do
  echo "$file"
done
```
<!-- {: data-highlight="$(git ls-files)"} -->

**Splits the output on whitespace.** A filename with a space becomes two iterations, so prefer `read` for paths; see [word splitting](https://www.gnu.org/software/bash/manual/html_node/Word-Splitting.html).
