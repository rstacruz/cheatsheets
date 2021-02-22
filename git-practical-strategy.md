---
title: Git branches
category: Git
layout: 2017/sheet
---

A practical git branch management strategy suggested by [Vincent Driessen](https://nvie.com)

## Reference 
- [A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/) 
- [Git分支管理策略](http://www.ruanyifeng.com/blog/2012/07/git.html)

## Working with branches
{: .-three-column}


## Branch Master 
automatically created by Git

## Branch Develop - Create
```bash
git checkout -b develop master
```

## Branch Develop - Merge to Branch Master
```bash
git checkout master
git merge --no-ff develop
```

Option 'no-ff' means without default fast-farward merging.

## Branch Feature - Create
```bash
git checkout -b $feature-F develop
```

## Branch Feature - Merge to Branch Develop
```bash
git checkout develop
git merge --no-ff $feature-F
```

# Branch Feature - Delete
```bash
git branch -d $feature-F
```

# Branch Pre-release - Create
```bash
git checkout -b $pre-release-x.y develop
```

# Branch Pre-release - Merge to Branch Master
```bash
git checkout master
git merge --no-ff $pre-release-x.y
git tag -a x.y
```

# Branch Pre-release - Merge to Branch Develop
```bash
git checkout develop
git merge --no-ff $pre-release-x.y
```

# Branch Pre-release - Delete
```bash
git branch -d $pre-release-x.y
```

# Branch Fix-bug - Create
```bash
git checkout -b $fixbug-x.y master
```

# Branch Fix-bug - Merge to Branch Master
```bash
git checkout master
git merge --no-ff $fixbug-x.y
git tag -a x.y.z
```

# Branch Fix-bug - Merge to Branch Develop
```bash
git checkout develop
git merge --no-ff $fixbug-x.y
```

# Branch Fix-bug - Delete
```bash
git branch -d $fixbug-x.y
```
