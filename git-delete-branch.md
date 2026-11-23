---
title: Git delete branch
subtitle: Delete local and remote branches
category: Git
layout: snippet
last_verified_with: "git 2.56.0."
updated: 2026-11-23
intro: |
  Delete a local branch with `git branch -d`, or remove a remote branch with `git push --delete`.
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

Deletes a local branch only when Git can prove it is merged; see the [git-branch manual](https://git-scm.com/docs/git-branch#Documentation/git-branch.txt--d).

### Unmerged local branch
<!-- {: .-snippet} -->

```bash
git branch -D old-name
```

Forces deletion even with unmerged commits, so check the commits first; see the [git-branch manual](https://git-scm.com/docs/git-branch#Documentation/git-branch.txt--D).

### Remote branch
<!-- {: .-snippet} -->

```bash
git push origin --delete old-name
```

Deletes the branch on `origin`; local branches and other clones are untouched. See the [git-push manual](https://git-scm.com/docs/git-push#Documentation/git-push.txt---delete).

### Stale tracking refs
<!-- {: .-snippet} -->

```bash
git fetch --prune
```

Removes local `origin/*` refs whose remote branch is gone; see the [git-fetch manual](https://git-scm.com/docs/git-fetch#Documentation/git-fetch.txt---prune).
