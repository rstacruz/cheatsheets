---
title: How to redirect stderr in Bash
link_title: Redirect stderr
subtitle: Send errors to files
logo: { src: /assets/logos/bash.svg }
category: CLI
layout: snippet
last_verified_with: "Bash 5.3.0."
updated: 2026-11-24
tier: t3
links:
  - title: Bash redirections
    url: https://www.gnu.org/software/bash/manual/html_node/Redirections.html
---

## Redirecting
<!-- {: .-snippets} -->

### Both streams to one file
<!-- {: .-snippet} -->

```bash
ls /missing > all.log 2>&1
```
<!-- {: data-highlight="2>&1"} -->

**Captures both streams in one file.** Order matters: `2>&1` copies the current stdout, so redirect stdout first. See [redirections](https://www.gnu.org/software/bash/manual/html_node/Redirections.html).

### Errors to a file
<!-- {: .-snippet} -->

```bash
ls /missing 2> errors.log
```
<!-- {: data-highlight="2>"} -->

**Sends only stderr to a file.** `2` is the stderr descriptor, so stdout still prints to the terminal. See [redirections](https://www.gnu.org/software/bash/manual/html_node/Redirections.html).

### Bash shorthand
<!-- {: .-snippet} -->

```bash
ls /missing &> all.log
ls /missing &>> all.log
```
<!-- {: data-highlight="&>; &>>"} -->

**Redirects both streams in one step.** `&>` truncates and `&>>` appends; both are Bash extensions. See [redirections](https://www.gnu.org/software/bash/manual/html_node/Redirections.html).

### Whole script
<!-- {: .-snippet} -->

```bash
exec 2> errors.log
```
<!-- {: data-highlight="exec 2>"} -->

**Redirects stderr for everything that follows.** A redirection-only `exec` changes the shell's own descriptors. See [exec](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html).
