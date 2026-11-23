---
title: Git tricks
subtitle: Assorted Git recipes
# Recipes rejected by Git 2.56 and invented output, verified 2026-11-23.
category: Hidden
tags: [Archived]
archived: |
  This grab bag of recipes included commands rejected by Git 2.56, such as `git rev-parse --show-top-level`, and invented example output. Use the [Git cheatsheet](./git) and [Git's documentation](https://git-scm.com/docs) instead.
updated: 2026-11-23
last_verified_with: "Git 2.56.0."
---

### Refs

```
HEAD^       # 1 commit before head
HEAD^^      # 2 commits before head
HEAD~5      # 5 commits before head
```

### Branches

```
# create a new branch
  git checkout -b $branchname
  git push origin $branchname --set-upstream
```

```
# get a remote branch
  git fetch origin
  git checkout --track origin/$branchname
```

```
# delete local remote-tracking branches (lol)
  git remote prune origin
```

```
# list merged branches
  git branch -a --merged
```

```
# delete remote branch
  git push origin :$branchname
```

```
# go back to previous branch
  git checkout -
```
      
### Collaboration

```
# Rebase your changes on top of the remote master
  git pull --rebase upstream master
```

```
# Squash multiple commits into one for a cleaner git log
# (on the following screen change the word pick to either 'f' or 's')
  git rebase -i $commit_ref
```

Submodules
----------

### Submodules

```
# Import .gitmodules
  git submodule init
```

```
# Clone missing submodules, and checkout commits
  git submodule update --init --recursive
```

```
# Update remote URLs in .gitmodules
# (Use when you changed remotes in submodules)
  git submodule sync
```

Diff
----

### Diff with stats

```
git diff --stat
 a.txt | 3 ++-
 b.txt | 3 ++-
 2 files changed, 4 insertions(+), 2 deletions(-)
```

### Just filenames

```
git diff --name-only
```

Log options
-----------

### Options

```
--oneline
  e11e9f9 Commit message here

--decorate
  shows "(origin/master)"

--graph
  shows graph lines

--date=relative
  "2 hours ago"
```

Misc
----

### Cherry pick

```
  git cherry-pick $commit
```

### Misc

```
# get current commit ID
  git rev-parse HEAD
```

```
# show single commit info
  git log -1 $commit
```

```
# Go back up to root directory
  cd "$(git rev-parse --show-toplevel)"
```

## Short log

### Grouped by author

```
git shortlog HEAD
Ada Lovelace (1):
      Initial files

Grace Hopper (3):
      Add more lines
      Follow-up 1
      Follow-up 2
```

### Count contributions

```
git shortlog -sne HEAD
     3	Grace Hopper <grace@example.com>
     1	Ada Lovelace <ada@example.com>
```

Use a range such as `HEAD~20..HEAD` to count a release.

## Bisect

```
git bisect start HEAD HEAD~6
git bisect run npm test
git checkout refs/bisect/bad   # this is where it screwed up
git bisect reset
```

### Manual bisection

```
git bisect start
git bisect good   # current version is good

git checkout HEAD~8
npm test          # see if it's good
git bisect bad    # current version is bad

git bisect reset  # abort
```

### Searching

```
git log --grep="fixes things"  # search in commit messages
git log -S"window.alert"       # search in code
git log -G"foo.*"              # search in code (regex)
```

### GPG signing

```
git config set user.signingkey "$KEY_ID"  # key to sign with
git commit -m "Implement feature Y" -S     # sign this commit
git config set commit.gpgsign true         # sign by default
git commit -m "Implement feature Y" --no-gpg-sign
```
    
