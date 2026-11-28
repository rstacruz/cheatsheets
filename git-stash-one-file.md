---
title: How to stash one file
link_title: Stash one file
subtitle: Shelve chosen paths
logo: { src: /assets/logos/git.svg }
category: Git
layout: snippet
last_verified_with: "git 2.56.0."
tier: t3
updated: 2026-11-28
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
git stash push -- app.txt
```
<!-- {: data-highlight="-- app.txt"} -->

**Stashes only `app.txt`.** Everything else stays in the working tree; see [pathspec](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-pathspec).

### Untracked file
<!-- {: .-snippet} -->

```bash
git stash push -u -- notes.txt
```
<!-- {: data-highlight="-u"} -->

**Stashes untracked paths.** Without `-u`, Git rejects the pathspec. See [--include-untracked](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt--u).

### Several paths
<!-- {: .-snippet} -->

```bash
git stash push -- src docs
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
