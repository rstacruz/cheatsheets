---
title: Git branches
category: Git
layout: 2017/sheet
updated: 2017-09-20
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

### Delete branch forcefully

```bash
git branch -D $branchname
```

Delete a branch irrespective of its merged status.

### Delete remote branch

```bash
git push origin :$branchname
```

Works for tags, too!

### Get current sha1

```bash
git show-ref HEAD -s
```
