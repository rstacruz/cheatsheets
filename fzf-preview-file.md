---
title: How to preview files in fzf
link_title: Preview files in fzf
subtitle: Show file contents while selecting
logo: { set: icon-park-outline, name: search }
category: Terminal
layout: snippet
last_verified_with: "fzf 0.75.0."
created_at: 2026-11-28
updated: 2026-11-28
tier: t3
links:
  - title: fzf preview window
    url: https://github.com/junegunn/fzf#preview-window
---

## Preview
<!-- {: .-snippets} -->

### Show file contents
<!-- {: .-snippet} -->

```bash
fzf --preview 'cat {}'
```
<!-- {: data-highlight="--preview"} -->

**Previews the highlighted file.** `{}` expands to the highlighted line, quoted for the shell. See [fzf preview window](https://github.com/junegunn/fzf#preview-window).

### Use syntax colors
<!-- {: .-snippet} -->

```bash
fzf --preview 'bat --color=always {}'
```
<!-- {: data-highlight="--color=always"} -->

**Colors the preview.** `bat` adds syntax highlighting to source files. See [preview window](https://github.com/junegunn/fzf#preview-window).
