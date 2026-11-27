---
title: How to enable Bash strict mode
link_title: Bash strict mode
subtitle: Fail fast in shell scripts
logo: { src: /assets/logos/bash.svg }
category: CLI
layout: snippet
last_verified_with: "Bash 5.3.0."
updated: 2026-11-23
tier: t3
links:
  - title: Bash set builtin
    url: https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
---

## Strict mode
<!-- {: .-snippets} -->

### Enable checks
<!-- {: .-snippet} -->

```bash
set -euo pipefail
```
<!-- {: data-highlight="-euo pipefail"} -->

**Enables strict error and variable checks.** `-e` exits on errors, `-u` rejects unset variables, and `-o pipefail` catches pipeline failures; see [set](https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html).

### Catch errors
<!-- {: .-snippet} -->

```bash
set -Eeuo pipefail
trap 'echo "error on line $LINENO" >&2' ERR
```
<!-- {: data-highlight="ERR"} -->

**Adds an error trap with line numbers.** `-E` makes the `ERR` trap fire inside functions and subshells; see [trap](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-trap).

### Safer word splitting
<!-- {: .-snippet} -->

```bash
IFS=$'\n\t'
```
<!-- {: data-highlight="IFS"} -->

**Restricts word splitting.** `IFS` is set to newlines and tabs instead of every space; see [IFS](https://www.gnu.org/software/bash/manual/html_node/Bash-Variables.html#index-IFS).
