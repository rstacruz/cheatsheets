---
title: How to recover a dropped Git stash
link_title: Recover a dropped stash
subtitle: Restore unreachable stash commits
category: Git workflows
layout: snippet
last_verified_with: "git 2.56.0."
tier: t3
updated: 2026-11-27
links:
  - title: git-stash manual
    url: https://git-scm.com/docs/git-stash
---

## Recovering a stash
<!-- {: .-snippets} -->

### Find lost commits
<!-- {: .-snippet} -->

```bash
git fsck --unreachable | grep commit
```

**Lists unreachable commits.** A dropped or popped stash is unreachable, not gone, until `git gc` runs; see [Recovering stashed changes](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-Recoveringstashentriesthatwerecleareddroppederroneously).

### Identify the stash
<!-- {: .-snippet} -->

```bash
git show --stat <sha>
```

**Prints the stash message and files.** Look for an `On <branch>: <message>` subject; see [git show](https://git-scm.com/docs/git-show).

### Put it back
<!-- {: .-snippet} -->

```bash
git stash store -m "recovered work" <sha>
```

**Re-adds it as `stash@{0}`.** Then `git stash pop` restores the changes; see [git stash store](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-store).

### After a pop
<!-- {: .-snippet} -->

```bash
git fsck --lost-found
```

**Writes dangling commits to `.git/lost-found/commit/`.** Use it when you want files instead of hashes; see [git fsck](https://git-scm.com/docs/git-fsck).
