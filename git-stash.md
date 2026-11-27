---
title: Git stash
subtitle: Shelve work in progress
logo: { src: /assets/logos/git.svg }
category: Git
tier: t2
fragments:
  - "git stash"
  - "stash push -m"
  - "stash pop"
  - "stash apply"
  - "stash list"
  - "stash show -p"
  - "stash drop"
  - "stash branch"
  - "stash clear"
  - "-u"
  - "-p"
  - "--index"
  - "--keep-index"
  - "stash@{1}"
  - "git stash show"
  - "--unreachable"
updated: 2026-11-27
last_verified_with: "git 2.56.0."
intro: |
  `git stash` shelves uncommitted changes so you can switch tasks, then restores them later. This reference covers saving, inspecting, restoring, and recovering stashes.
links:
  - title: git-stash manual
    url: https://git-scm.com/docs/git-stash
  - title: "Pro Git: Stashing and cleaning"
    url: https://git-scm.com/book/en/v2/Git-Tools-Stashing-and-Cleaning
---

## Saving

### Save changes

```sh
# stash tracked changes
git stash
```

```sh
# stash with a label
git stash push -m "wip login"
```
<!-- {: data-highlight="git stash push"} -->

`stash` is shorthand for `stash push`. `-m` replaces the default `WIP on <branch>` message.

See: [git stash push](https://git-scm.com/docs/git-stash#_options)

### Include untracked or ignored files

```sh
# also stash untracked files
git stash push -u
```
<!-- {: data-highlight="-u"} -->

```sh
# also stash ignored files
git stash push -a
```
<!-- {: data-highlight="-a"} -->

A plain `git stash` saves tracked changes only; `-u` adds untracked files and `-a` adds ignored files too.

See: [--include-untracked](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt--u)

### Stash one file

```sh
git stash push -m "notes only" -- notes.txt
```
<!-- {: data-highlight="-- notes.txt"} -->

A pathspec limits the stash to matching files. An untracked path also needs `-u`.

See: [pathspec](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-pathspec)

### Stash part of a file

```sh
git stash push -p -m "first hunk"
```
<!-- {: data-highlight="git stash push -p"} -->

`-p` prompts per hunk, like `add -p`. It cannot combine with `-u` or `-a`.

See: [-p](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt--p)

### Keep staged changes

```sh
git stash push --keep-index -m "wip"
```
<!-- {: data-highlight="--keep-index"} -->

Stashes everything but leaves staged changes in place in the index and working tree, so you can test exactly what is staged.

See: [--keep-index](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt---keep-index)

## Inspecting

### List stashes

```sh
$ git stash list
stash@{0}: On main: wip login
stash@{1}: WIP on main: 74ead8a Add app
```
<!-- {: data-highlight="stash@{0}"} -->

The newest stash is `stash@{0}`. The default message records the branch and the base commit.

See: [git stash list](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-listlog-options)

### Show changes

```sh
# file summary
git stash show
```

```sh
# full patch
git stash show -p
```
<!-- {: data-highlight="git stash show -p"} -->

`show` prints a diffstat by default; `-p` prints the patch. `show -u` adds untracked files when the stash was made with `push -u` or `-a`.

See: [git stash show](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-show-u--include-untracked--only-untrackeddiff-optionsstash)

### Inspect an older stash

```sh
git stash show -p stash@{2}
```
<!-- {: data-highlight="stash@{2}"} -->

Pass `stash@{n}` to `show`, `apply`, `drop`, or `branch`.

See: [stash@{n}](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-stash)

## Restoring

### Pop or apply

```sh
# apply and delete the entry
git stash pop
```
<!-- {: data-highlight="git stash pop"} -->

```sh
# apply and keep the entry
git stash apply
```
<!-- {: data-highlight="git stash apply"} -->

`pop` drops the entry after a clean apply; `apply` always keeps it. A conflicted `pop` keeps it too.

See: [git stash pop](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-pop--index-q--quietstash)

### Restore the index

```sh
git stash apply --index
```
<!-- {: data-highlight="--index"} -->

Restores the staged and unstaged split. A plain `apply` puts everything back unstaged.

See: [--index](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt---index)

### Apply on another branch

#### Switch

```sh
git switch feat/login
```
<!-- {: data-highlight="git switch feat/login"} -->

#### Apply

```sh
git stash apply
```

Stashes belong to the repository, not a branch, so a stash made on `main` applies on `feat/login`.

See: [git stash apply](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-apply--index-q--quietstash)

### Continue on a new branch

```sh
git stash branch feat/login stash@{0}
```
<!-- {: data-highlight="git stash branch"} -->

Creates the branch at the stash's base commit, checks it out, applies the stash, and drops it on success. Use it when the stash no longer applies to the current branch.

See: [git stash branch](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-branchbranchnamestash)

### Resolve a conflict

```sh
# pop stops on a conflict and keeps the stash
git stash pop
```

```sh
# resolve, stage, then drop the kept entry
git add app.txt
git stash drop
```
<!-- {: data-highlight="git add app.txt"} -->

A conflicting `pop` or `apply` leaves unmerged paths in the tree and keeps the stash entry.

See: [git stash pop](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-pop--index-q--quietstash)

## Managing

### Drop a stash

```sh
# newest
git stash drop
```

```sh
# a specific entry
git stash drop stash@{1}
```
<!-- {: data-highlight="stash@{1}"} -->

Drops the entry from the stack. Its commits stay recoverable until `git gc` prunes them.

See: [git stash drop](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-drop-q--quietstash)

### Clear all stashes

```sh
git stash clear
```
<!-- {: data-highlight="git stash clear"} -->

Deletes every entry; the commits stay recoverable until `git gc` runs, as after a drop.

See: [git stash clear](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-clear)

## Recovery

### Find lost commits

```sh
$ git fsck --unreachable | grep commit
unreachable commit bc2e2d9819a396a80c2ee502fb6aadfb636e923c
```
<!-- {: data-highlight="git fsck --unreachable"} -->

A dropped or popped entry becomes unreachable, not deleted. Only the `WIP on`/`On` merge commit is stash-like; `index on` and `untracked files on` commits are rejected by `stash store`.

See: [Recovering stashed changes](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-Recoveringstashentriesthatwerecleareddroppederroneously)

### Inspect a candidate

```sh
git show --stat <sha>
```
<!-- {: data-highlight="git show --stat"} -->

The subject names the stash. `git stash show -p <sha>` prints its diff; add `-u` for untracked files.

See: [git stash show](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-show-u--include-untracked--only-untrackeddiff-optionsstash)

### Put it back

```sh
git stash store -m "recovered work" <sha>
```
<!-- {: data-highlight="git stash store"} -->

Re-adds the commit as `stash@{0}`; `git stash pop` then restores it. This also works for a stash popped earlier, if `git gc` has not run since.

See: [git stash store](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-store)

## Also see

- [Stash one file](./git-stash-one-file)
- [Stash untracked files](./git-stash-untracked-files)
- [Stash part of a file](./git-stash-part-of-a-file)
- [View a Git stash](./git-stash-show)
- [Apply a stash to a new branch](./git-stash-branch)
- [Resolve a stash conflict](./git-resolve-stash-conflict)
- [Recover a dropped stash](./git-recover-dropped-stash)
