---
title: How to recover a dropped Git stash
link_title: Recover a dropped stash
subtitle: Restore unreachable stash commits
logo: { src: /assets/logos/git.svg }
category: Git
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

## Recovering a stash
<!-- {: .-snippets} -->

### Find lost commits
<!-- {: .-snippet} -->

```bash
git fsck --unreachable | grep commit
```
<!-- {: data-highlight="git fsck --unreachable"} -->

**Lists unreachable commits.** A popped or dropped stash is unreachable until `git gc`. Only the `WIP on`/`On` merge commit is stash-like; `git stash store` rejects `index on` and `untracked files on` commits. See [Recovering stashed changes](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-Recoveringstashentriesthatwerecleareddroppederroneously).

### Write lost commits to files
<!-- {: .-snippet} -->

```bash
git fsck --lost-found
```
<!-- {: data-highlight="git fsck --lost-found"} -->

**Writes dangling object names to `.git/lost-found/`.** Commit names land under `.git/lost-found/commit/<sha>`, but `git gc` can still prune the object; run `git stash store <sha>` to keep it. See [git fsck](https://git-scm.com/docs/git-fsck).

### Identify the stash
<!-- {: .-snippet} -->

```bash
git show --stat <sha>
```
<!-- {: data-highlight="git show --stat"} -->

**Prints the stash message.** Look for a `WIP on` or `On <branch>` subject; `git stash show -p <sha>` prints the diff. See [git stash show](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-show-u--include-untracked--only-untrackeddiff-optionsstash).

### Put it back
<!-- {: .-snippet} -->

```bash
git stash store -m "recovered work" <sha>
```
<!-- {: data-highlight="git stash store"} -->

**Re-adds it as `stash@{0}`.** Then `git stash pop` restores the changes; see [git stash store](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-store).
