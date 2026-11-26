---
title: How to undo a Git commit
link_title: Git undo commit
subtitle: Reset or revert commits
category: Git workflows
layout: snippet
last_verified_with: "git 2.56.1."
tier: t3
updated: 2026-11-23
intro: |
  [git reset](https://git-scm.com/docs/git-reset) and [git revert](https://git-scm.com/docs/git-revert) undo commits. This sheet covers staged, unstaged, discarded, and already pushed commits.
links:
  - title: git-reset manual
    url: https://git-scm.com/docs/git-reset
  - title: git-revert manual
    url: https://git-scm.com/docs/git-revert
---

## Undoing
<!-- {: .-snippets} -->

### Keep changes staged
<!-- {: .-snippet} -->

```bash
git reset --soft HEAD~1
```
<!-- {: data-highlight="--soft"} -->

**Undoes the commit but keeps changes staged.** Moves HEAD back one commit and stages the changes; see [git-reset](https://git-scm.com/docs/git-reset#Documentation/git-reset.txt---soft).

### Keep changes unstaged
<!-- {: .-snippet} -->

```bash
git reset --mixed HEAD~1
```
<!-- {: data-highlight="--mixed"} -->

**Undoes the commit and unstages changes.** Moves HEAD back but keeps the working files; see [git-reset](https://git-scm.com/docs/git-reset#Documentation/git-reset.txt---mixed).

### Discard changes
<!-- {: .-snippet} -->

```bash
git reset --hard HEAD~1
```
<!-- {: data-highlight="--hard"} -->

**Discards the commit and its changes.** Deletes them from the working tree; only use it for unpublished work. See [git-reset](https://git-scm.com/docs/git-reset#Documentation/git-reset.txt---hard).

### Undo a pushed commit
<!-- {: .-snippet} -->

```bash
git revert HEAD
```
<!-- {: data-highlight="git revert"} -->

**Reverses a pushed commit safely.** Creates a new commit that reverses the last one, keeping shared history intact. See [git-revert](https://git-scm.com/docs/git-revert).
