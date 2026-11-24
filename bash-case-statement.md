---
title: How to write a Bash case statement
link_title: Bash case statement
subtitle: Match values with glob patterns
category: Command line recipes
layout: snippet
last_verified_with: "Bash 5.3.0."
updated: 2026-11-24
links:
  - title: Bash conditional constructs
    url: https://www.gnu.org/software/bash/manual/html_node/Conditional-Constructs.html
---

## Matching
<!-- {: .-snippets} -->

### Basic form
<!-- {: .-snippet} -->

```bash
case "$1" in
  start) echo "starting" ;;
  stop) echo "stopping" ;;
esac
```
<!-- {: data-highlight='case "$1" in'} -->

**Runs the clause that matches the value.** Each clause ends with `;;`, and the whole statement ends with `esac`. See [case](https://www.gnu.org/software/bash/manual/html_node/Conditional-Constructs.html).

### Alternatives
<!-- {: .-snippet} -->

```bash
case "$file" in
  *.txt) echo "text" ;;
  *.jpg | *.png) echo "image" ;;
esac
```
<!-- {: data-highlight="*.txt; *.jpg | *.png"} -->

**Matches glob patterns, with `|` for alternatives.** Quote the subject, not the patterns; patterns stay unquoted. See [pattern matching](https://www.gnu.org/software/bash/manual/html_node/Pattern-Matching.html).

### Default branch
<!-- {: .-snippet} -->

```bash
case "$1" in
  start) echo "starting" ;;
  *) echo "usage: $0 start" ;;
esac
```
<!-- {: data-highlight="*)"} -->

**Handles anything unmatched.** Put the `*)` clause last so it acts as the fallback. See [case](https://www.gnu.org/software/bash/manual/html_node/Conditional-Constructs.html).

### Fall through
<!-- {: .-snippet} -->

```bash
case "$level" in
  low) echo "low" ;&
  high) echo "high" ;;
esac
```
<!-- {: data-highlight=";&"} -->

**Runs the next clause without matching it.** `;&` falls through like C's `switch`; `;;&` tests the next pattern instead. See [case](https://www.gnu.org/software/bash/manual/html_node/Conditional-Constructs.html).
