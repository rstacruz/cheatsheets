---
title: How to undo a Git commit
link_title: Git undo commit
subtitle: Reset or revert commits
logo: { src: /assets/logos/git.svg }
category: Git
layout: snippet
last_verified_with: "git 2.56.1."
tier: t3
created_at: 2026-11-23
updated: 2026-11-28
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

**Undoes the commit.** With `--soft`, HEAD moves back one commit and the changes stay staged. See [git-reset](https://git-scm.com/docs/git-reset#Documentation/git-reset.txt---soft).

### Keep changes unstaged
<!-- {: .-snippet} -->

```bash
git reset --mixed HEAD~1
```
<!-- {: data-highlight="--mixed"} -->

**Undoes and unstages.** With `--mixed`, HEAD moves back but the working files are kept. See [git-reset](https://git-scm.com/docs/git-reset#Documentation/git-reset.txt---mixed).

### Discard changes
<!-- {: .-snippet} -->

```bash
git reset --hard HEAD~1
```
<!-- {: data-highlight="--hard"} -->

**Discards the commit.** Its changes are deleted from the working tree, so use it only for unpublished work. See [git-reset](https://git-scm.com/docs/git-reset#Documentation/git-reset.txt---hard).

### Undo a pushed commit
<!-- {: .-snippet} -->

```bash
git revert HEAD
```
<!-- {: data-highlight="git revert"} -->

**Reverses a pushed commit safely.** Creates a new commit that reverses the last one, keeping shared history intact. See [git-revert](https://git-scm.com/docs/git-revert).
