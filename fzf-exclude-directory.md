---
title: How to exclude directories from fzf
link_title: Exclude dirs in fzf
subtitle: Skip paths while searching
logo: { set: icon-park-outline, name: search }
category: Terminal
layout: snippet
last_verified_with: "fzf 0.75.0."
created_at: 2026-11-28
updated: 2026-11-28
tier: t3
links:
  - title: fzf usage
    url: https://github.com/junegunn/fzf#usage
  - title: fd README
    url: https://github.com/sharkdp/fd
---

## Exclude paths
<!-- {: .-snippets} -->

### Skip named directories
<!-- {: .-snippet} -->

```bash
fzf --walker-skip dist,coverage
```
<!-- {: data-highlight="--walker-skip"} -->

**Skips directories by name.** The built-in walker takes a comma-separated list of directory names. See [fzf usage](https://github.com/junegunn/fzf#usage).

### Filter with fd
<!-- {: .-snippet} -->

```bash
fd --type f --exclude dist | fzf
```
<!-- {: data-highlight="--exclude dist"} -->

**Filters paths before fzf.** `fd` drops matching directories and respects `.gitignore`. See [fd README](https://github.com/sharkdp/fd).
