---
title: Git
subtitle: Everyday version control
logo: { src: /assets/logos/git.svg }
category: Git
tags: [Featured]
weight: -10
tier: t2
fragments:
  - "git status"
  - "git add -p"
  - "git commit"
  - "git switch -c"
  - "git merge"
  - "pull --rebase"
  - "git push"
  - "git restore"
  - "git reset --hard"
  - "git revert"
  - "git stash"
  - "log --oneline"
  - "git rebase -i"
  - "git cherry-pick"
  - "git worktree add"
  - "git bisect"
created_at: 2013-01-08
updated: 2026-11-23
last_verified_at: 2026-11-23
last_verified_with: "git 2.56.0."
intro: |
  Git tracks source changes as commits on branches, synced through remotes. This reference covers the everyday commands, with links to the fuller Git sheets.
links:
  - title: Git reference
    url: https://git-scm.com/docs
  - title: Pro Git book
    url: https://git-scm.com/book/en/v2
  - title: gitglossary
    url: https://git-scm.com/docs/gitglossary
---

## Everyday changes
<!-- {: .-three-column} -->

### See what changed

```sh
git status
git status --short
git diff
git diff --staged
git diff --stat
```
<!-- {: data-highlight="git status"} -->

`--short` prints one line per path; `--staged` compares the index with HEAD.

See: [git status](https://git-scm.com/docs/git-status)

### Stage changes

```sh
# stage one file
git add file.txt
```
<!-- {: data-highlight="git add"} -->

```sh
# stage all changes
git add .
```

```sh
# stage hunks one at a time
git add -p
```

`-p` stages hunks one at a time.

See: [git add](https://git-scm.com/docs/git-add)

### Commit

```sh
git commit -m "Add login form"
git commit -am "Update docs"
git commit --amend
git commit --amend --no-edit
```
<!-- {: data-highlight="git commit"} -->

`-a` commits tracked files without staging; `--amend` replaces the last commit and `--no-edit` keeps its message.

[Conventional Commits cheatsheet](./conventional-commits)
<!-- {: .-crosslink} -->

### Sync with remote

#### Pull

```sh
# download and merge remote commits
git pull
```
<!-- {: data-highlight="git pull"} -->

```sh
# replay local commits on top
git pull --rebase
```

#### Push

```sh
# publish the current branch
git push
```
<!-- {: data-highlight="git push"} -->

```sh
# publish a new branch with upstream
git push -u origin feat/login
```

`--rebase` replays local commits on top of the pulled branch; `-u` records the upstream branch.

See: [git pull](https://git-scm.com/docs/git-pull), [git push](https://git-scm.com/docs/git-push)

## Branches
<!-- {: .-three-column} -->

### Create a branch

```sh
# create and switch
git switch -c feat/login
```
<!-- {: data-highlight="git switch -c"} -->

`-c` creates the branch and moves onto it. The older form is `git checkout -b`.

See: [git switch](https://git-scm.com/docs/git-switch)

### Switch branches

```sh
# work on an existing branch
git switch feat/login
git switch main
```

```sh
# return to the previous branch
git switch -
```
<!-- {: data-highlight="git switch -"} -->

`-` returns to the previous branch; `switch` is the newer branch command.

See: [git switch](https://git-scm.com/docs/git-switch)

### List branches

```sh
git branch
git branch -vv
git branch -a
```
<!-- {: data-highlight="git branch"} -->

`-vv` adds upstream and ahead/behind counts; `-a` includes remotes.

See: [git branch](https://git-scm.com/docs/git-branch)

### Merge a branch

#### Merge

```sh
# switch to the target
git switch main
```

```sh
# merge the branch
git merge feat/login
```
<!-- {: data-highlight="git merge"} -->

#### No fast-forward

```sh
# always record a merge commit
git merge --no-ff feat/login
```

See: [git merge](https://git-scm.com/docs/git-merge)

### Delete a branch

#### Safe delete

```sh
# only if merged
git branch -d feat/login
```
<!-- {: data-highlight="git branch -d"} -->

#### Force delete

```sh
# discard unmerged work
git branch -D feat/login
```

#### Remote branch

```sh
# delete on the remote
git push origin --delete feat/login
```

[Git branches cheatsheet](./git-branch)
<!-- {: .-crosslink} -->

## Conflicts

### See unmerged paths

```sh
$ git status --short
UU story.txt
```
<!-- {: data-highlight="UU story.txt"} -->

`UU` means both sides modified; other unmerged codes include `AA`, `DU`, `UD`, `AU`, `UA`, and `DD`.

See: [How to resolve conflicts](https://git-scm.com/docs/git-merge#_how_to_resolve_conflicts)

### Resolve a conflict

#### Stage

```sh
git add story.txt
```
<!-- {: data-highlight="git add story.txt"} -->

#### Commit

```sh
git commit
```

During a rebase or cherry-pick, use `git rebase --continue` or `git cherry-pick --continue` instead of `git commit`.

See: [How to resolve conflicts](https://git-scm.com/docs/git-merge#_how_to_resolve_conflicts)

## Undo
<!-- {: .-three-column} -->

### Discard edits

#### Restore tracked files

```sh
# restore one file
git restore file.txt
```

```sh
# restore all tracked files
git restore .
```

#### Clean untracked files

```sh
# preview untracked deletions
git clean -nd
```

```sh
# delete untracked files
git clean -fd
```
<!-- {: data-highlight="git clean -fd"} -->

`clean -fd` permanently deletes untracked files.

See: [git restore](https://git-scm.com/docs/git-restore)

### Undo a commit

#### Keep changes staged

```sh
git reset --soft HEAD~1
```

#### Keep changes unstaged

```sh
git reset HEAD~1
```
<!-- {: data-highlight="git reset"} -->

#### Discard changes too

```sh
git reset --hard HEAD~1
```

See: [git reset](https://git-scm.com/docs/git-reset)

### Revert a commit

```sh
# revert the tip
git revert HEAD
```
<!-- {: data-highlight="git revert"} -->

```sh
# revert an older commit
git revert <sha>
```

```sh
# stage the revert without committing
git revert --no-commit <sha>
```

Revert adds history rather than rewriting it, so it is safe on shared branches.

See: [git revert](https://git-scm.com/docs/git-revert)

### Recover lost work

#### Inspect moves

```sh
# list recent HEAD moves
git reflog
```

#### Restore the tip

```sh
# undo the last rebase or merge
git reset --hard ORIG_HEAD
```
<!-- {: data-highlight="ORIG_HEAD"} -->

`ORIG_HEAD` is the tip before the last rebase, merge, or reset. For other moves, pick a reflog entry: `git reset --hard HEAD@{n}`.

See: [git reflog](https://git-scm.com/docs/git-reflog)

### Abort an operation

```sh
git merge --abort
git rebase --abort
git cherry-pick --abort
```
<!-- {: data-highlight="git merge --abort"} -->

Each restores the state before the operation started.

See: [git merge](https://git-scm.com/docs/git-merge)

## Stash

### Save work

```sh
# stash tracked changes
git stash
```

```sh
# label the stash
git stash push -m "wip"
```
<!-- {: data-highlight="git stash push"} -->

```sh
# include untracked files
git stash -u
```

See: [git stash](https://git-scm.com/docs/git-stash)

### Restore work

```sh
# list saved stashes
git stash list
```

```sh
# apply and drop the latest
git stash pop
```
<!-- {: data-highlight="git stash pop"} -->

```sh
# apply without dropping
git stash apply stash@{1}
```

```sh
# drop an entry
git stash drop
```

`pop` applies and deletes; `apply` keeps the entry.

See: [git stash](https://git-scm.com/docs/git-stash)

[Git stash cheatsheet](./git-stash)
<!-- {: .-crosslink} -->

## History
<!-- {: .-three-column} -->

### Recent commits

```sh
git log --oneline
git log --oneline --graph --all
git log --stat
git log -p
```
<!-- {: data-highlight="--oneline"} -->

`--graph --all` draws branches; `--stat` shows changed files.

[git log cheatsheet](./git-log)
<!-- {: .-crosslink} -->

### Inspect a commit

```sh
git show HEAD
git show <sha> --stat
git blame file.txt
```
<!-- {: data-highlight="git show"} -->

`show` prints a commit and its diff; `blame` finds the commit for each line.

See: [git show](https://git-scm.com/docs/git-show), [git blame](https://git-scm.com/docs/git-blame)

### Search history

```sh
git log --grep="fix"
git log -S"console.log"
git log --author="Rico"
```
<!-- {: data-highlight="-S"} -->

`-S` finds commits that add or remove a string; `--grep` matches messages.

See: [git log](https://git-scm.com/docs/git-log#_commit_limiting)

### Custom log format

```sh
git log --pretty="format:%h %s"
git log --pretty="format:%h %an %ar"
git shortlog -sn HEAD
```
<!-- {: data-highlight="--pretty"} -->

`%h` is the short hash, `%s` the subject, `%an` the author, `%ar` a relative date.

[Git log format string cheatsheet](./git-log-format)
<!-- {: .-crosslink} -->

### Reference a commit

```text
HEAD~2      # two commits back
HEAD^       # first parent
main@{1}    # previous main
v1.0.0      # tag
```
<!-- {: data-highlight="HEAD~2"} -->

These revisions work anywhere a commit is expected.

[Git revisions cheatsheet](./git-revisions)
<!-- {: .-crosslink} -->

### Browse with tig

```sh
tig
tig status
tig blame file.txt
```
<!-- {: data-highlight="tig"} -->

Tig opens the log, status, or blame in a terminal UI.

[Tig cheatsheet](./tig)
<!-- {: .-crosslink} -->

## Rewrite history
<!-- {: .-three-column} -->

### Interactive rebase

```sh
git rebase -i HEAD~3
git rebase -i main
git rebase --continue
git rebase --abort
```
<!-- {: data-highlight="git rebase -i"} -->

The todo list can reorder, squash, reword, or drop commits.

[Git rebase cheatsheet](./git-rebase)
<!-- {: .-crosslink} -->

### Cherry-pick

```sh
git cherry-pick <sha>
git cherry-pick A..B
git cherry-pick --continue
git cherry-pick --abort
```
<!-- {: data-highlight="git cherry-pick"} -->

A range copies commits after `A` up to `B`; `A` itself stays out.

See: [git cherry-pick](https://git-scm.com/docs/git-cherry-pick)

### Keep a clean branch

```sh
git fetch origin
git rebase origin/main
git push --force-with-lease
```
<!-- {: data-highlight="--force-with-lease"} -->

Rebase your branch, then force-push with lease so others' work is not overwritten.

See: [git push](https://git-scm.com/docs/git-push#OPTIONS)

## Remotes and tags
<!-- {: .-three-column} -->

### Manage remotes

#### Inspect and add

```sh
# show configured remotes
git remote -v
```
<!-- {: data-highlight="git remote"} -->

```sh
# register a remote
git remote add origin <url>
```

#### Change a remote

```sh
# change its URL
git remote set-url origin <url>
```

```sh
# rename it
git remote rename origin upstream
```

`origin` is the conventional name for the clone source.

See: [git remote](https://git-scm.com/docs/git-remote)

### Fetch and prune

#### Fetch

```sh
# update every remote
git fetch --all
```

#### Prune

```sh
# drop stale remote refs
```

```sh
# drop stale remote refs
git fetch --prune
```
<!-- {: data-highlight="--prune"} -->

```sh
# older form
git remote prune origin
```

Prune removes remote-tracking refs whose branch is gone.

See: [git fetch](https://git-scm.com/docs/git-fetch)

### Tag a release

#### Create

```sh
# list tags
git tag
```
<!-- {: data-highlight="git tag"} -->

```sh
# annotate a release
git tag -a v1.0.0 -m "Release"
```

#### Push

```sh
# push one tag
git push origin v1.0.0
```

```sh
# push all tags
git push --tags
```

#### Delete

```sh
# delete locally
git tag -d v1.0.0
```

```sh
# delete remotely
git push origin --delete v1.0.0
```

Tags are not pushed by default; `-d` deletes only the local tag.

See: [git tag](https://git-scm.com/docs/git-tag)

## Start a repository
<!-- {: .-three-column} -->

### Configure identity

#### Author

```sh
# set author details
```

```sh
# set author name
git config --global user.name "Rico"
```
<!-- {: data-highlight="git config"} -->

```sh
# set author email
git config --global user.email me@x.io
```

#### Editor and settings

```sh
# set the message editor
git config --global core.editor vim
```

```sh
# show all settings
git config --list
```

Commits record this name and email as the author.

See: [git config](https://git-scm.com/docs/git-config)

### Create a repository

#### Initialize

```sh
# start on main
git init -b main
```
<!-- {: data-highlight="git init"} -->

#### Clone

```sh
# clone a repository
git clone git@github.com:me/app.git
```

```sh
# skip history
git clone --depth 1 <url>
```

`clone` copies a repository; `init` starts an empty one.

See: [git init](https://git-scm.com/docs/git-init), [git clone](https://git-scm.com/docs/git-clone)

### Ignore files

```gitignore
node_modules/
*.log
!keep.log
```

`!` re-includes a path that an earlier pattern excluded.

See: [gitignore](https://git-scm.com/docs/gitignore)

## Workflows and tools
<!-- {: .-three-column} -->

### Parallel checkouts

#### Add

```sh
# create a branch and a checkout
git worktree add -b hotfix ../hotfix
```
<!-- {: data-highlight="git worktree add"} -->

#### List and remove

```sh
# show linked worktrees
git worktree list
```

```sh
# remove a checkout
git worktree remove ../hotfix
```

Each worktree has its own `HEAD`, index, and files; objects are shared.

[Git worktrees cheatsheet](./git-worktrees)
<!-- {: .-crosslink} -->

### Find a bad commit

#### Start

```sh
# mark the tip as bad
git bisect start
git bisect bad
```
<!-- {: data-highlight="git bisect"} -->

```sh
# point at a known-good commit
git bisect good <sha>
```

#### Run and reset

```sh
# let the test decide
git bisect run npm test
```

```sh
# restore the branch
git bisect reset
```

Bisect finds the first commit where the test fails.

[Git bisect cheatsheet](./git-bisect)
<!-- {: .-crosslink} -->

### Clean up branches

```sh
git branch --merged
git branch -d old-feature
```
<!-- {: data-highlight="git branch --merged"} -->

Delete local branches already merged into the current one.

[Git tricks cheatsheet](./git-tricks)
<!-- {: .-crosslink} -->

### Extra commands

#### Inspect and ignore

```sh
# show a repo summary
git summary
```

```sh
# ignore a path
git ignore node_modules
```

#### Feature branches

```sh
# start a feature
git feature login
```
<!-- {: data-highlight="git feature"} -->

```sh
# finish it
git feature finish login
```

`git-extras` adds summary, ignore, and feature commands.

[Git extras cheatsheet](./git-extras)
<!-- {: .-crosslink} -->

