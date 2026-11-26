---
title: How to stash part of a file
link_title: Stash part of a file
subtitle: Shelve selected hunks
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

## Partial stashes
<!-- {: .-snippets} -->

### Pick hunks
<!-- {: .-snippet} -->

```bash
git stash push -p
```
<!-- {: data-highlight="git stash push -p"} -->

**Prompts for each hunk.** Answer `y` to stash a hunk and `n` to leave it; see [-p](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt--p).

### Add a message
<!-- {: .-snippet} -->

```bash
git stash push -p -m "first hunk"
```
<!-- {: data-highlight="first hunk"} -->

**Labels the partial stash.** The message appears in `git stash list`; see [git stash push](https://git-scm.com/docs/git-stash#_options).

### Review it
<!-- {: .-snippet} -->

```bash
git stash show -p
```
<!-- {: data-highlight="git stash show -p"} -->

**Prints only the hunks you picked.** Check the patch before restoring; see [git stash show](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-show-u--include-untracked--only-untrackeddiff-optionsstash).

### Restore it
<!-- {: .-snippet} -->

```bash
git stash pop
```
<!-- {: data-highlight="git stash pop"} -->

**Applies the partial stash.** Later edits to the same file can conflict; see [git stash pop](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-pop--index-q--quietstash).
