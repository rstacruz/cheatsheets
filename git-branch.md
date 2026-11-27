---
title: Git branches
subtitle: Branch management workflow
logo: { src: /assets/logos/git.svg }
category: Git
updated: 2026-11-23
tier: t3
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

See: [git checkout](https://git-scm.com/docs/git-checkout#Documentation/git-checkout.txt--bnew-branch)

### Getting from remote

```bash
git fetch origin
git checkout --track origin/$branchname
```

Gets a branch in a remote.

See: [git checkout --track](https://git-scm.com/docs/git-checkout#Documentation/git-checkout.txt---trackdirectinherit)

### Delete local remote-tracking branches

```bash
git remote prune origin
```

Deletes `origin/*` branches in your local copy. Doesn't affect the remote.

See: [git remote prune](https://git-scm.com/docs/git-remote#Documentation/git-remote.txt-prune)

### List existing branches

```bash
git branch --list
```

Existing branches are listed. Current branch will be highlighted with an asterisk.

See: [git branch --list](https://git-scm.com/docs/git-branch#Documentation/git-branch.txt---list)

### List merged branches

```bash
git branch -a --merged
```

List outdated branches that have been merged into the current one.

See: [git branch --merged](https://git-scm.com/docs/git-branch#Documentation/git-branch.txt---mergedcommit)

### Delete a local branch

```bash
git branch -d $branchname
```

Deletes the branch only if its changes are merged into the current branch.

See: [git branch --delete](https://git-scm.com/docs/git-branch#Documentation/git-branch.txt--d)

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

See: [git branch --delete --force](https://git-scm.com/docs/git-branch#Documentation/git-branch.txt--D)

### Delete remote branch

```bash
git push origin --delete $branchname
```

Works for tags, too!

See: [git push --delete](https://git-scm.com/docs/git-push#Documentation/git-push.txt---delete)

### Get current commit ID

```bash
git rev-parse HEAD
```

See: [git rev-parse](https://git-scm.com/docs/git-rev-parse)

### Reset branch and remove all changes

```bash
git reset --hard
```

See: [git reset --hard](https://git-scm.com/docs/git-reset#Documentation/git-reset.txt---hard)

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

See: [git reset](https://git-scm.com/docs/git-reset)

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
