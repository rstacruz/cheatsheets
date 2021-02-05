---
title: Git branches
category: Git
layout: 2017/sheet
updated: 2020-02-13
---

## Working with branches
{: .-three-column}

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

Deletes the branch only if the changes have been pushed and merged with remote.

### Delete branch forcefully

```bash
git branch -D $branchname
```

```bash
git branch -d $branchname
```

> Note: You can also use the -D flag which is synonymous with --delete --force instead of -d. This will delete the branch regardless of its merge status.
> Delete a branch irrespective of its merged status.

### Delete remote branch

```bash
git push origin --delete :$branchname
```

Works for tags, too!

### Get current sha1

```bash
git show-ref HEAD -s
```
### Reset branch and remove all changes

```bash
git reset --hard
```

### Undo commits to a specific commit

```bash
git reset --hard $commit_id

# Now push safely to your branch
git push --force-with-lease

# Or push brutally to your branch
git push --force
```
