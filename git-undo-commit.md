---
title: Git undo commit
h1_title: How to undo a Git commit
subtitle: Reset or revert commits
category: Git
layout: snippet
last_verified_with: "git 2.56.0."
updated: 2026-11-23
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

Moves HEAD back one commit and leaves its changes staged; see [git-reset](https://git-scm.com/docs/git-reset#Documentation/git-reset.txt---soft).

### Keep changes unstaged
<!-- {: .-snippet} -->

```bash
git reset --mixed HEAD~1
```
<!-- {: data-highlight="--mixed"} -->

Moves HEAD back and unstages the changes but keeps the working files; see [git-reset](https://git-scm.com/docs/git-reset#Documentation/git-reset.txt---mixed).

### Discard changes
<!-- {: .-snippet} -->

```bash
git reset --hard HEAD~1
```
<!-- {: data-highlight="--hard"} -->

Deletes the commit and its changes from the working tree; only use it for unpublished work. See [git-reset](https://git-scm.com/docs/git-reset#Documentation/git-reset.txt---hard).

### Undo a pushed commit
<!-- {: .-snippet} -->

```bash
git revert HEAD
```
<!-- {: data-highlight="revert"} -->

Creates a new commit that reverses the last one, keeping shared history intact. See [git-revert](https://git-scm.com/docs/git-revert).
