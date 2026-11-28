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

**Finds a past command.** `history | fzf` narrows the list as you type; press Enter to print the chosen line with its history number. See [key bindings](https://github.com/junegunn/fzf#key-bindings-for-command-line).

### Enable Ctrl-R in Bash
<!-- {: .-snippet} -->

```bash
eval "$(fzf --bash)"
```
<!-- {: data-highlight="--bash"} -->

**Pastes onto the prompt.** After setup, `Ctrl+R` searches history and inserts a command. Zsh uses `source <(fzf --zsh)`; fish uses `fzf --fish | source`. See [shell integration](https://github.com/junegunn/fzf#setting-up-shell-integration).
