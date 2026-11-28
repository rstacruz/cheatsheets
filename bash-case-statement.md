---
title: How to write a Bash case statement
link_title: Bash case statement
subtitle: Match values with glob patterns
logo: { src: /assets/logos/bash.svg }
category: CLI
layout: snippet
last_verified_with: "Bash 5.3.0."
updated: 2026-11-28
tier: t3
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

**Runs a matching clause.** The clause whose pattern matches the value runs; each ends with `;;`, and the whole statement ends with `esac`. See [case](https://www.gnu.org/software/bash/manual/html_node/Conditional-Constructs.html).

### Alternatives
<!-- {: .-snippet} -->

```bash
case "$file" in
  *.txt) echo "text" ;;
  *.jpg | *.png) echo "image" ;;
esac
```
<!-- {: data-highlight="*.txt; *.jpg | *.png"} -->

**Matches glob patterns.** Use `|` for alternatives; quote the subject, not the patterns, which stay unquoted. See [pattern matching](https://www.gnu.org/software/bash/manual/html_node/Pattern-Matching.html).

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

**Runs the next clause.** `;&` runs it without matching, like C's `switch`; `;;&` tests the next pattern instead. See [case](https://www.gnu.org/software/bash/manual/html_node/Conditional-Constructs.html).
