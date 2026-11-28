---
title: How to break out of a loop in Bash
link_title: Bash break loop
subtitle: Stop or skip iterations early
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

## Loop control
<!-- {: .-snippets} -->

### Stop the loop
<!-- {: .-snippet} -->

```bash
for i in {1..9}; do
  [ "$i" = 3 ] && break
  echo "$i"
done
```
<!-- {: data-highlight="break"} -->

**Leaves the loop early.** It exits as soon as the test passes: nothing after `break` in the body runs, and the loop does not resume. See [looping constructs](https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html).

### Skip an iteration
<!-- {: .-snippet} -->

```bash
for f in *.txt; do
  [ -s "$f" ] || continue
  echo "$f"
done
```
<!-- {: data-highlight="continue"} -->

**Jumps to the next iteration.** `-s` is true for a non-empty file, so empty files never reach `echo`; see [looping constructs](https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html).

### Leave nested loops
<!-- {: .-snippet} -->

```bash
for row in 1 2 3; do
  for col in a b c; do
    [ "$row$col" = 2b ] && break 2
    echo "$row$col"
  done
done
```
<!-- {: data-highlight="break 2"} -->

**Breaks out of both loops.** The number counts loop levels, and `continue 2` skips to the next outer iteration instead; see [looping constructs](https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html).
