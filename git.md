---
title: Git
subtitle: Everyday version control
category: Git
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
updated: 2026-11-23
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
# stage everything
git add .
# stage hunks
git add -p
```
<!-- {: data-highlight="git add"} -->

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
# replay local commits on top
git pull --rebase
```
<!-- {: data-highlight="git pull"} -->

#### Push

```sh
# push the current branch
git push
# publish a new branch with upstream
git push -u origin feat/login
```
<!-- {: data-highlight="git push"} -->

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
# switch to a branch
git switch feat/login
git switch main
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

```sh
git switch main
git merge feat/login
git merge --no-ff feat/login
```
<!-- {: data-highlight="git merge"} -->

`--no-ff` always records a merge commit, even when fast-forward is possible.

See: [git merge](https://git-scm.com/docs/git-merge)

### Delete a branch

```sh
git branch -d feat/login
git branch -D feat/login
git push origin --delete feat/login
```
<!-- {: data-highlight="git branch -d"} -->

`-d` refuses unmerged work; `-D` deletes it anyway.

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

```sh
git restore file.txt
git restore .
# preview untracked deletions
git clean -nd
git clean -fd
```
<!-- {: data-highlight="git clean -fd"} -->

`clean -fd` permanently deletes untracked files.

See: [git restore](https://git-scm.com/docs/git-restore)

### Undo a commit

```sh
git reset --soft HEAD~1
git reset HEAD~1
git reset --hard HEAD~1
```
<!-- {: data-highlight="git reset"} -->

`--soft` keeps changes staged, plain `reset` unstages them, `--hard` discards them.

See: [git reset](https://git-scm.com/docs/git-reset)

### Revert a commit

```sh
git revert HEAD
git revert <sha>
# stage the revert without committing
git revert --no-commit <sha>
```
<!-- {: data-highlight="git revert"} -->

Revert adds history rather than rewriting it, so it is safe on shared branches.

See: [git revert](https://git-scm.com/docs/git-revert)

### Recover lost work

```sh
git reflog
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
git stash
# label the stash
git stash push -m "wip"
# include untracked files
git stash -u
```
<!-- {: data-highlight="git stash push"} -->

See: [git stash](https://git-scm.com/docs/git-stash)

### Restore work

```sh
git stash list
git stash pop
git stash apply stash@{1}
git stash drop
```
<!-- {: data-highlight="git stash pop"} -->

`pop` applies and deletes; `apply` keeps the entry.

See: [git stash](https://git-scm.com/docs/git-stash)

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

```sh
git remote -v
git remote add origin <url>
git remote set-url origin <url>
git remote rename origin upstream
```
<!-- {: data-highlight="git remote"} -->

`origin` is the conventional name for the clone source.

See: [git remote](https://git-scm.com/docs/git-remote)

### Fetch and prune

```sh
git fetch --all
git fetch --prune
git remote prune origin
```
<!-- {: data-highlight="--prune"} -->

Prune removes remote-tracking refs whose branch is gone.

See: [git fetch](https://git-scm.com/docs/git-fetch)

### Tag a release

```sh
git tag
git tag -a v1.0.0 -m "Release"
git push origin v1.0.0
git push --tags
git tag -d v1.0.0
git push origin --delete v1.0.0
```
<!-- {: data-highlight="git tag"} -->

`-a` creates an annotated tag; tags are not pushed by default, and `-d` deletes only the local tag.

See: [git tag](https://git-scm.com/docs/git-tag)

## Start a repository
<!-- {: .-three-column} -->

### Configure identity

```sh
git config --global user.name "Rico"
git config --global user.email me@x.io
git config --global core.editor vim
git config --list
```
<!-- {: data-highlight="git config"} -->

Commits record this name and email; `core.editor` selects the message editor.

See: [git config](https://git-scm.com/docs/git-config)

### Create a repository

```sh
git init -b main
git clone git@github.com:me/app.git
git clone --depth 1 <url>
```
<!-- {: data-highlight="git init"} -->

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

```sh
git worktree add -b hotfix ../hotfix
git worktree list
git worktree remove ../hotfix
```
<!-- {: data-highlight="git worktree add"} -->

Each worktree has its own `HEAD`, index, and files; objects are shared.

[Git worktrees cheatsheet](./git-worktrees)
<!-- {: .-crosslink} -->

### Find a bad commit

```sh
git bisect start
git bisect bad
git bisect good <sha>
git bisect run npm test
git bisect reset
```
<!-- {: data-highlight="git bisect"} -->

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

```sh
git summary
git ignore node_modules
git feature login
git feature finish login
```
<!-- {: data-highlight="git feature"} -->

`git-extras` adds summary, ignore, and feature commands.

[Git extras cheatsheet](./git-extras)
<!-- {: .-crosslink} -->

