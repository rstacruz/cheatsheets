---
title: How to stash one file
link_title: Stash one file
subtitle: Shelve a single path
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

## Stashing one file
<!-- {: .-snippets} -->

### Tracked file
<!-- {: .-snippet} -->

```bash
git stash push -m "wip" -- app.txt
```
<!-- {: data-highlight="-- app.txt"} -->

**Stashes only `app.txt`.** Everything else stays in the working tree; see [pathspec](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-pathspec).

### Untracked file
<!-- {: .-snippet} -->

```bash
git stash push -u -m "wip" -- notes.txt
```
<!-- {: data-highlight="-u"} -->

**Adds an untracked path to the stash.** Without `-u`, Git rejects the pathspec; see [--include-untracked](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt--u).

### Several paths
<!-- {: .-snippet} -->

```bash
git stash push -m "wip" -- src docs
```
<!-- {: data-highlight="-- src docs"} -->

**Stashes matching paths only.** Directories work as pathspecs; see [pathspec](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-pathspec).

### Restore it
<!-- {: .-snippet} -->

```bash
git stash pop
```
<!-- {: data-highlight="git stash pop"} -->

**Restores and drops the entry.** Use `git stash apply` to keep it; see [git stash pop](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-pop--index-q--quietstash).
