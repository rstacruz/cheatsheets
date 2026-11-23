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
# stage hunks one at a time
git add -p
# record the staged changes
git commit -m "Add login form"
```
<!-- {: data-highlight="git add"} -->

`-p` stages hunks one at a time; `commit` records what is staged.

See: [git add](https://git-scm.com/docs/git-add), [git commit](https://git-scm.com/docs/git-commit)

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

#### Short status

```sh
$ git status --short
UU story.txt
```
<!-- {: data-highlight="UU story.txt"} -->

#### Full status

```text
On branch main
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
	both modified:   story.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

`UU` means both sides modified; other unmerged codes include `AA`, `DU`, `UD`, `AU`, `UA`, and `DD`.

See: [How to resolve conflicts](https://git-scm.com/docs/git-merge#_how_to_resolve_conflicts)

### Resolve a conflict

#### Check

```sh
# list the unmerged paths
git status --short
```
<!-- {: data-highlight="git status --short"} -->

#### Stage

```sh
# mark the resolved file as fixed
git add story.txt
```
<!-- {: data-highlight="git add story.txt"} -->

#### Commit

```sh
# record the merge
git commit
```

During a rebase or cherry-pick, use `git rebase --continue` or `git cherry-pick --continue` instead of `git commit`.

See: [How to resolve conflicts](https://git-scm.com/docs/git-merge#_how_to_resolve_conflicts)

## Undo
<!-- {: .-three-column} -->

### Discard edits

#### Restore a file

```sh
# throw away working changes
git restore file.txt
```
<!-- {: data-highlight="git restore"} -->

#### Restore all tracked files

```sh
# discard every tracked edit
git restore .
```

#### Clean untracked files

```sh
# preview what would go
git clean -nd
# delete untracked files and dirs
git clean -fd
```
<!-- {: data-highlight="git clean -fd"} -->

`clean -fd` permanently deletes untracked files.

See: [git restore](https://git-scm.com/docs/git-restore)

### Undo a commit

#### Keep changes staged

```sh
# soften the last commit
git reset --soft HEAD~1
```

#### Keep changes unstaged

```sh
# drop the commit, keep edits
git reset HEAD~1
```
<!-- {: data-highlight="git reset"} -->

#### Discard changes too

```sh
# drop commit and edits
git reset --hard HEAD~1
```

See: [git reset](https://git-scm.com/docs/git-reset)

### Revert a commit

#### Revert the tip

```sh
# make a commit that undoes HEAD
git revert HEAD
```
<!-- {: data-highlight="git revert"} -->

#### Revert an older commit

```sh
# undo a specific commit
git revert <sha>
```

#### Stage without committing

```sh
# leave the revert in the index
git revert --no-commit <sha>
```

Revert is safe on shared branches: it adds history rather than rewriting it.

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

`ORIG_HEAD` is the tip before the last rebase, merge, or reset. For other moves, pick an entry from `reflog` with `git reset --hard HEAD@{n}`.

See: [git reflog](https://git-scm.com/docs/git-reflog)

### Abort an operation

#### Abort a merge

```sh
# return to pre-merge state
git merge --abort
```
<!-- {: data-highlight="git merge --abort"} -->

#### Abort a rebase

```sh
# return to pre-rebase state
git rebase --abort
```

#### Abort a cherry-pick

```sh
# return to pre-pick state
git cherry-pick --abort
```

Each restores the state before the operation started.

See: [git merge](https://git-scm.com/docs/git-merge)

## Stash

### Save work

#### Stash tracked changes

```sh
# stash the working tree
git stash
```

#### Label a stash

```sh
# leave a message for later
git stash push -m "wip"
```
<!-- {: data-highlight="git stash push"} -->

#### Include untracked files

```sh
# stash tracked and untracked files
git stash -u
```

See: [git stash](https://git-scm.com/docs/git-stash)

### Restore work

#### List stashes

```sh
# show saved entries
git stash list
```

#### Apply and drop

```sh
# apply the latest, then remove it
git stash pop
```
<!-- {: data-highlight="git stash pop"} -->

#### Apply without dropping

```sh
# keep the entry in the list
git stash apply stash@{1}
```

#### Drop an entry

```sh
# delete a stash without applying
git stash drop
```

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

#### Add

```sh
# create a branch and a linked checkout
git worktree add -b hotfix ../hotfix
```
<!-- {: data-highlight="git worktree add"} -->

#### List

```sh
# show linked worktrees
git worktree list
```

#### Remove

```sh
# remove a linked checkout
git worktree remove ../hotfix
```

Each worktree has its own `HEAD`, index, and files; objects are shared.

[Git worktrees cheatsheet](./git-worktrees)
<!-- {: .-crosslink} -->

### Find a bad commit

#### Start

```sh
# mark this revision as bad
git bisect start
git bisect bad
# point at a known-good commit
git bisect good <sha>
```
<!-- {: data-highlight="git bisect"} -->

#### Automate the search

```sh
# let the test decide each step
git bisect run npm test
```

#### Reset

```sh
# restore the original checkout
git bisect reset
```

Bisect finds the first commit where the test fails.

[Git bisect cheatsheet](./git-bisect)
<!-- {: .-crosslink} -->

### Clean up branches

#### Find merged branches

```sh
# list branches merged into HEAD
git branch --merged
```
<!-- {: data-highlight="git branch --merged"} -->

#### Delete one

```sh
# remove a merged local branch
git branch -d old-feature
```

#### Prune remote refs

```sh
# drop gone remote-tracking branches
git remote prune origin
```

See also the Git tricks sheet for more cleanup recipes.

[Git tricks cheatsheet](./git-tricks)
<!-- {: .-crosslink} -->

### Extra commands

#### Inspect and ignore

```sh
# show a repo summary
git summary
# ignore a path
git ignore node_modules
```

#### Feature branches

```sh
# start and finish a feature
git feature login
git feature finish login
```
<!-- {: data-highlight="git feature"} -->

`git-extras` adds these commands on top of Git.

[Git extras cheatsheet](./git-extras)
<!-- {: .-crosslink} -->

