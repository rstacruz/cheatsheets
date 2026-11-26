---
title: How to delete a Git branch
link_title: Git delete branch
subtitle: Delete local and remote branches
category: Git workflows
layout: snippet
last_verified_with: "git 2.56.0."
updated: 2026-11-23
tier: t3
links:
  - title: git-branch manual
    url: https://git-scm.com/docs/git-branch
  - title: git-push manual
    url: https://git-scm.com/docs/git-push
---

## Deleting
<!-- {: .-snippets} -->

### Merged local branch
<!-- {: .-snippet} -->

```bash
git branch -d old-name
```
<!-- {: data-highlight="-d"} -->

**Safely deletes a merged branch.** Git refuses when the branch has unmerged commits; see the [git-branch manual](https://git-scm.com/docs/git-branch#Documentation/git-branch.txt--d).

### Unmerged local branch
<!-- {: .-snippet} -->

```bash
git branch -D old-name
```
<!-- {: data-highlight="-D"} -->

**Deletes unmerged work.** Forces deletion even with unmerged commits, so check them first; see the [git-branch manual](https://git-scm.com/docs/git-branch#Documentation/git-branch.txt--D).

### Remote branch
<!-- {: .-snippet} -->

```bash
git push origin --delete old-name
```
<!-- {: data-highlight="--delete"} -->

**Removes the branch on the remote.** Local branches and other clones are untouched. See the [git-push manual](https://git-scm.com/docs/git-push#Documentation/git-push.txt---delete).

### Stale tracking refs
<!-- {: .-snippet} -->

```bash
git fetch --prune
```
<!-- {: data-highlight="--prune"} -->

**Prunes stale remote-tracking refs.** Removes local `origin/*` refs whose remote branch is gone; see the [git-fetch manual](https://git-scm.com/docs/git-fetch#Documentation/git-fetch.txt---prune).
