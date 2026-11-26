---
title: How to stash untracked files
link_title: Stash untracked files
subtitle: Include new files
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

## Untracked files
<!-- {: .-snippets} -->

### Include untracked
<!-- {: .-snippet} -->

```bash
git stash push -u
```
<!-- {: data-highlight="-u"} -->

**Adds untracked files to the stash.** Tracked changes are always included; see [--include-untracked](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt--u).

### Include ignored
<!-- {: .-snippet} -->

```bash
git stash push -a
```
<!-- {: data-highlight="-a"} -->

**Adds ignored files too.** `-a` means `-u` plus ignored paths such as build output; see [--all](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt--a).

### Restore it
<!-- {: .-snippet} -->

```bash
git stash pop
```
<!-- {: data-highlight="git stash pop"} -->

**Brings untracked files back as untracked.** `apply` restores the same way but keeps the entry; see [git stash pop](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-pop--index-q--quietstash).

### See what is inside
<!-- {: .-snippet} -->

```bash
git stash show -p -u
```
<!-- {: data-highlight="git stash show -p -u"} -->

**Prints untracked content in the stash.** Plain `show` leaves it out; see [git stash show](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-show-u--include-untracked--only-untrackeddiff-optionsstash).
