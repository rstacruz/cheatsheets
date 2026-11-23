---
title: fd vs find
h1_title: When to use fd vs find
subtitle: Find files from the CLI
category: Command line recipes
layout: snippet
last_verified_with: "fd 10.4.2."
updated: 2026-11-23
links:
  - title: fd repository
    url: https://github.com/sharkdp/fd
  - title: GNU find manual
    url: https://www.gnu.org/software/findutils/manual/html_node/find_html/
---

## Choosing a tool
<!-- {: .-snippets} -->

### fd for a quick match
<!-- {: .-snippet} -->

```bash
fd '\.ts$' src
```
<!-- {: data-highlight="fd"} -->

`fd` uses regex, respects gitignore, and skips hidden files by default; see [fd](https://github.com/sharkdp/fd).

### fd with a command
<!-- {: .-snippet} -->

```bash
fd -e ts -x wc -l
```
<!-- {: data-highlight="-x"} -->

`-x` runs a command once per match, with `{}` available as the path; see [fd](https://github.com/sharkdp/fd).

### find by name
<!-- {: .-snippet} -->

```bash
find . -name '*.ts' -not -path '*/node_modules/*'
```
<!-- {: data-highlight="-not -path"} -->

`find` is portable and scriptable but needs explicit pruning and ignores; see [find](https://www.gnu.org/software/findutils/manual/html_node/find_html/).

### find with exec
<!-- {: .-snippet} -->

```bash
find . -name '*.ts' -exec wc -l {} +
```
<!-- {: data-highlight="-exec"} -->

`-exec ... +` batches matches into a single command instead of one call per file. See [find](https://www.gnu.org/software/findutils/manual/html_node/find_html/).
