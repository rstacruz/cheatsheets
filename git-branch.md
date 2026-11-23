---
title: Git branches
subtitle: Branch management workflow
category: Git
updated: 2026-11-23
last_verified_with: "Git 2.56.0."
---

## Working with branches

<!-- {: .-three-column} -->

### Creating

```bash
git checkout -b $branchname
git push origin $branchname --set-upstream
```

Creates a new branch locally then pushes it.

### Getting from remote

```bash
git fetch origin
git checkout --track origin/$branchname
```

Gets a branch in a remote.

### Delete local remote-tracking branches

```bash
git remote prune origin
```

Deletes `origin/*` branches in your local copy. Doesn't affect the remote.

### List existing branches

```bash
git branch --list
```

Existing branches are listed. Current branch will be highlighted with an asterisk.

### List merged branches

```bash
git branch -a --merged
```

List outdated branches that have been merged into the current one.

### Delete a local branch

```bash
git branch -d $branchname
```

Deletes the branch only if its changes are merged into the current branch.

### Delete branch forcefully

#### Force delete

```bash
git branch -D $branchname
```

#### Safe delete

```bash
git branch -d $branchname
```

`-D` is `--delete --force`: it removes unmerged branches too.

### Delete remote branch

```bash
git push origin --delete $branchname
```

Works for tags, too!

### Get current commit ID

```bash
git rev-parse HEAD
```
### Reset branch and remove all changes

```bash
git reset --hard
```

### Undo commits to a specific commit

```bash
git reset --hard $commit_id
```

```bash
# Now push safely to your branch
git push --force-with-lease
```

```bash
# Or push brutally to your branch
git push --force
```

### Worktrees

[Git worktrees cheatsheet](./git-worktrees)
<!-- {: .-crosslink} -->

### Rename, delete, or undo

[Git rename branch cheatsheet](./git-rename-branch)
<!-- {: .-crosslink} -->

[Git delete branch cheatsheet](./git-delete-branch)
<!-- {: .-crosslink} -->

[Git undo commit cheatsheet](./git-undo-commit)
<!-- {: .-crosslink} -->
