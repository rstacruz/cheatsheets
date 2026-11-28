---
title: How to search command history with fzf
link_title: Search history with fzf
subtitle: Find past commands interactively
logo: { set: icon-park-outline, name: search }
category: Terminal
layout: snippet
last_verified_with: "fzf 0.75.0."
updated: 2026-11-28
tier: t3
links:
  - title: Key bindings for command line
    url: https://github.com/junegunn/fzf#key-bindings-for-command-line
  - title: Shell integration
    url: https://github.com/junegunn/fzf#setting-up-shell-integration
---

## Search history
<!-- {: .-snippets} -->

### Pipe history into fzf
<!-- {: .-snippet} -->

```bash
history | fzf
```
<!-- {: data-highlight="history | fzf"} -->

**Filters remembered commands.** Each matching line goes to stdout, ready to copy or rerun. See [key bindings](https://github.com/junegunn/fzf#key-bindings-for-command-line).

### Use Ctrl-R
<!-- {: .-snippet} -->

```bash
eval "$(fzf --bash)"
```
<!-- {: data-highlight="--bash"} -->

**Pastes onto the prompt.** After setup, `Ctrl+R` searches history and inserts the selected command. See [shell integration](https://github.com/junegunn/fzf#setting-up-shell-integration).
