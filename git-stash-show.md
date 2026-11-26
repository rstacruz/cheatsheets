---
title: How to view a Git stash
link_title: View a Git stash
subtitle: Inspect stashed changes
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

## Viewing a stash
<!-- {: .-snippets} -->

### File summary
<!-- {: .-snippet} -->

```bash
git stash show
```
<!-- {: data-highlight="git stash show"} -->

**Prints a diffstat for the newest stash.** No patch content is shown; see [git stash show](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-show-u--include-untracked--only-untrackeddiff-optionsstash).

### Full patch
<!-- {: .-snippet} -->

```bash
git stash show -p
```
<!-- {: data-highlight="-p"} -->

**Prints the complete diff.** Shows the stashed changes without applying them; see [git stash show](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-show-u--include-untracked--only-untrackeddiff-optionsstash).

### Specific stash
<!-- {: .-snippet} -->

```bash
git stash show -p stash@{1}
```
<!-- {: data-highlight="stash@{1}"} -->

**Reads an older entry.** `stash@{0}` is the newest; see [stash@{n}](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-stash).

### Untracked files
<!-- {: .-snippet} -->

```bash
git stash show -p -u
```
<!-- {: data-highlight="-u"} -->

**Includes untracked files saved with `-u`.** Plain `show` leaves them out; see [--include-untracked](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt---include-untracked).
