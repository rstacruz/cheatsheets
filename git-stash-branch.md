---
title: How to apply a stash to a new branch
link_title: Apply stash to branch
subtitle: Move stash to a branch
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

## Moving a stash to a branch
<!-- {: .-snippets} -->

### New branch
<!-- {: .-snippet} -->

```bash
git stash branch feat/login
```
<!-- {: data-highlight="git stash branch"} -->

**Moves the stash onto a new branch.** Branches from the stash's base commit, applies the stash, and drops it on success; see [git stash branch](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-branchbranchnamestash).

### Choose the stash
<!-- {: .-snippet} -->

```bash
git stash branch feat/login stash@{1}
```
<!-- {: data-highlight="stash@{1}"} -->

**Uses an older entry.** The branch name must not exist yet; see [stash@{n}](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-stashindex).

### Existing branch
<!-- {: .-snippet} -->

```bash
# switch first
git switch feat/login
```

```bash
# then apply and keep the entry
git stash apply
```
<!-- {: data-highlight="git stash apply"} -->

**Use `apply` when the branch already exists.** `stash branch` is for creating a new one; see [git stash apply](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-apply--index-q--quietstash).

### After unmerged paths
<!-- {: .-snippet} -->

```bash
# unmerged paths: resolve, stage, then drop
git add app.txt
git stash drop
```
<!-- {: data-highlight="git stash drop"} -->

**Finishes an apply that stopped on conflicts.** Stage the resolution, then drop. An abort with `Your local changes ... would be overwritten` applies nothing, so keep the stash and retry. See [git stash branch](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-branchbranchnamestash).
