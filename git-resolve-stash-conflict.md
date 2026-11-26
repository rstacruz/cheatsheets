---
title: How to resolve a Git stash conflict
link_title: Resolve a stash conflict
subtitle: Fix conflicts after applying
category: Git workflows
layout: snippet
last_verified_with: "git 2.56.0."
tier: t3
updated: 2026-11-27
links:
  - title: git-stash manual
    url: https://git-scm.com/docs/git-stash
  - title: Git stash cheatsheet
    url: /git-stash
---

## Resolving a stash conflict
<!-- {: .-snippets} -->

### See the conflict
<!-- {: .-snippet} -->

```bash
git status --short
```
<!-- {: data-highlight="git status --short"} -->

**Lists conflicted files.** A failed `git stash pop` or `apply` keeps the stash; `UU` means both sides modified the file. See [git status](https://git-scm.com/docs/git-status).

### Mark it resolved
<!-- {: .-snippet} -->

```bash
git add app.txt
```
<!-- {: data-highlight="git add app.txt"} -->

**Stages the resolution.** Edit the file and clear the `<<<<<<<`, `=======`, and `>>>>>>>` markers first; see [git add](https://git-scm.com/docs/git-add).

### Drop the kept stash
<!-- {: .-snippet} -->

```bash
git stash drop
```
<!-- {: data-highlight="git stash drop"} -->

**Removes the entry after the content is applied.** Check the file before dropping; see [git stash drop](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-drop-q--quietstash).
