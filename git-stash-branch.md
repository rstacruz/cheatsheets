---
title: How to apply a stash to a new branch
link_title: Apply a stash to a branch
subtitle: Move stash to a branch
category: Git workflows
layout: snippet
last_verified_with: "git 2.56.0."
tier: t3
updated: 2026-11-27
links:
  - title: git-stash manual
    url: https://git-scm.com/docs/git-stash
---

## Moving a stash to a branch
<!-- {: .-snippets} -->

### New branch
<!-- {: .-snippet} -->

```bash
git stash branch feat/login
```

**Moves the stash onto a new branch.** Branches from the stash's base commit, applies the stash, and drops it on success; see [git stash branch](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-branchbranchnamestash).

### Choose the stash
<!-- {: .-snippet} -->

```bash
git stash branch feat/login stash@{1}
```

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

**Use `apply` when the branch already exists.** `stash branch` is for creating a new one; see [git stash apply](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-apply--index-q--quietstash).

### After a conflict
<!-- {: .-snippet} -->

```bash
git add app.txt
git stash drop
```

**Finishes a conflicted `stash branch`.** The branch is checked out with unmerged paths and the stash is kept; stage the resolution, then drop it. See [git stash pop](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-pop--index-q--quietstash).
