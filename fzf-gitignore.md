---
title: How to make fzf respect .gitignore
link_title: Respect gitignore in fzf
subtitle: Search only non-ignored files
logo: { set: icon-park-outline, name: search }
category: Terminal
layout: snippet
last_verified_with: "fzf 0.75.0."
created_at: 2026-11-28
updated: 2026-11-28
tier: t3
links:
  - title: Respecting .gitignore
    url: https://github.com/junegunn/fzf#respecting-gitignore
  - title: fd README
    url: https://github.com/sharkdp/fd
---

## Gitignore
<!-- {: .-snippets} -->

### Pipe fd into fzf
<!-- {: .-snippet} -->

```bash
fd --type f --strip-cwd-prefix | fzf
```
<!-- {: data-highlight="fd --type f"} -->

**Respects .gitignore.** `fd` skips ignored paths before handing fzf the file list. See [fd README](https://github.com/sharkdp/fd).

### Set the default source
<!-- {: .-snippet} -->

```bash
export FZF_DEFAULT_COMMAND=\
'fd --type f --strip-cwd-prefix'
```
<!-- {: data-highlight="FZF_DEFAULT_COMMAND"} -->

**Changes the default list.** Bare `fzf` then uses `fd` instead of walking the directory. See [respecting .gitignore](https://github.com/junegunn/fzf#respecting-gitignore).
