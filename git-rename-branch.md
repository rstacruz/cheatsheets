---
title: How to rename a Git branch
link_title: Git rename branch
subtitle: Rename local and remote branches
category: Git
layout: snippet
last_verified_with: "git 2.56.0."
updated: 2026-11-23
links:
  - title: git-branch manual
    url: https://git-scm.com/docs/git-branch
  - title: git-push manual
    url: https://git-scm.com/docs/git-push
---

## Renaming
<!-- {: .-snippets} -->

### Current branch
<!-- {: .-snippet} -->

```bash
git branch -m new-name
```
<!-- {: data-highlight="-m"} -->

**Renames the current branch.** `-m` is short for `--move`; see the [git-branch manual](https://git-scm.com/docs/git-branch#Documentation/git-branch.txt--m).

### Another branch
<!-- {: .-snippet} -->

```bash
git branch -m old-name new-name
```
<!-- {: data-highlight="old-name new-name"} -->

**Renames a branch without checking it out.** See the [git-branch manual](https://git-scm.com/docs/git-branch#Documentation/git-branch.txt--m).

### Push the new name
<!-- {: .-snippet} -->

```bash
git push -u origin new-name
```
<!-- {: data-highlight="-u"} -->

**Publishes the new branch name.** Creates the remote branch and sets its upstream; `-u` is short for `--set-upstream`. See the [git-push manual](https://git-scm.com/docs/git-push#Documentation/git-push.txt--u).

### Delete the old name
<!-- {: .-snippet} -->

```bash
git push origin --delete old-name
```
<!-- {: data-highlight="--delete"} -->

**Deletes the old remote branch.** Other clones keep their own local `old-name`; see the [git-push manual](https://git-scm.com/docs/git-push#Documentation/git-push.txt---delete).
