---
title: Git rebase
subtitle: Replay and rewrite commits
category: Git
tier: t2
fragments:
  - "git rebase"
  - "git rebase -i"
  - "rebase --onto"
  - "pick 877bace"
  - "reword"
  - "squash"
  - "fixup"
  - "edit"
  - "drop"
  - "fixup!"
  - "squash!"
  - "--autosquash"
  - "autoSquash"
  - "HEAD~3"
  - "--continue"
  - "--abort"
  - "--skip"
  - "UU story.txt"
  - "git reflog"
  - "ORIG_HEAD"
updated: 2026-11-21
last_verified_with: "git 2.56.0."
intro: |
  Interactive rebase replays local commits onto a new base to reorder, reword, squash, edit, or drop them; rewritten commits get new hashes.
links:
  - title: git-rebase manual
    url: https://git-scm.com/docs/git-rebase
  - title: "Pro Git: Rewriting History"
    url: https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History
  - title: git-reflog manual
    url: https://git-scm.com/docs/git-reflog
---

## Interactive rebase

<!-- {: .-three-column} -->

### Start an interactive rebase
<!-- {: .-prime} -->

```bash
$ git rebase -i HEAD~3
$ git rebase -i main
$ git rebase -i --root
```

`-i` opens the todo before replay. `HEAD~3` takes the last three commits, `main` those after `main`, and `--root` every commit.

See: [Interactive mode](https://git-scm.com/docs/git-rebase#_interactive_mode)

### The todo list

```text
pick 877bace # add feature
pick adc2cdb # add docs
pick 61763ac # fix typo
```

Git replays these lines top to bottom; deleting one drops that commit.

See: [Interactive mode](https://git-scm.com/docs/git-rebase#_interactive_mode)

### Todo commands

| Action | Effect |
| --- | --- |
| `p, pick` | Use the commit |
| `r, reword` | Edit its message |
| `e, edit` | Stop to amend |
| `s, squash` | Meld into previous |
| `f, fixup` | Meld, keep first message |
| `d, drop` | Remove the commit |

See: [Interactive mode](https://git-scm.com/docs/git-rebase#_interactive_mode)

### Choose an editor

```bash
$ export GIT_SEQUENCE_EDITOR=vim
$ export GIT_EDITOR=vim
```

`GIT_SEQUENCE_EDITOR` opens the todo; `GIT_EDITOR` opens commit messages.

See: [git rebase](https://git-scm.com/docs/git-rebase)

## Rewrite commits

### Reword a message

#### Command

```bash
$ git log --oneline
```

#### Output

```bash
efad3ce fix typo
ddc466d add user docs
877bace add feature
c6adc97 add base
```

Change `pick` to `reword` in the todo; Git opens the message editor, then replays later commits.

See: [Interactive mode](https://git-scm.com/docs/git-rebase#_interactive_mode)

### Squash commits

#### Command

```bash
$ git log --oneline
```

#### Output

```bash
4478bd3 fix typo
a0639e0 add feature and docs
c6adc97 add base
```

Mark the second commit `squash` to fold it into the previous one; Git opens a combined message editor.

See: [Interactive mode](https://git-scm.com/docs/git-rebase#_interactive_mode)

### Fixup commits

#### Command

```bash
$ git log --oneline
```

#### Output

```bash
126448a add docs
877bace add feature
c6adc97 add base
```

`fixup` folds the marked commit in without opening the editor, keeping the earlier message.

See: [git rebase](https://git-scm.com/docs/git-rebase)

### Edit a commit

#### Stop

```text
Stopped at 877bace...  # add feature
You can amend the commit now, with

  git commit --amend 

Once you are satisfied with your changes, run

  git rebase --continue
```

#### After continuing

```bash
$ git log --oneline
2c4edb7 fix typo
1b21bb2 add docs
48d3cc9 add feature
c6adc97 add base
```

`edit` stops after applying the marked commit; amend it, then continue. The amended commit gets a new hash.

See: [Interactive mode](https://git-scm.com/docs/git-rebase#_interactive_mode)

### Drop a commit

#### Command

```bash
$ git log --oneline
```

#### Output

```bash
fe338df fix typo
877bace add feature
c6adc97 add base
```

Delete the todo line, or mark it `drop`, to remove the commit.

See: [Interactive mode](https://git-scm.com/docs/git-rebase#_interactive_mode)

## Conflicts and control

### Control commands

| Command | Effect |
| --- | --- |
| `git rebase --continue` | Resume after a stop |
| `git rebase --skip` | Drop current patch |
| `git rebase --abort` | Restore pre-rebase state |
| `git rebase --quit` | Stop, keep HEAD as is |
| `git rebase --edit-todo` | Edit todo mid-rebase |
| `git rebase --show-current-patch` | Show applied patch |

See: [git rebase](https://git-scm.com/docs/git-rebase)

### Resolve a conflict

#### Stop and status

```bash
$ git rebase main
error: could not apply b0841e8... change line two on topic
$ git status --short
UU story.txt
```

#### Conflicted file

```text
one
<<<<<<< HEAD
MAIN two
=======
TOPIC two
>>>>>>> b0841e8 (change line two on topic)
three
```

#### Finish

```bash
$ git rebase --continue
Successfully rebased and updated refs/heads/topic.
```

Git marks conflicted paths `UU`; stage each with `git add`, then run `git rebase --continue` or use `--skip` to drop the patch.

See: [How to resolve conflicts](https://git-scm.com/docs/git-merge#_how_to_resolve_conflicts)

### Abort a rebase

#### Commands

```bash
$ git rebase --abort
$ git log --oneline
```

#### Output

```bash
61763ac fix typo
adc2cdb add docs
877bace add feature
c6adc97 add base
```

`--abort` restores the pre-rebase branch.

See: [git rebase](https://git-scm.com/docs/git-rebase)

### Recover with the reflog

```bash
$ git reflog
$ git reset --hard ORIG_HEAD
```

`ORIG_HEAD` holds the branch tip before rebase; the reflog records earlier positions for manual recovery.

See: [git reflog](https://git-scm.com/docs/git-reflog)

## Autosquash

### Mark commits

#### Command

```bash
$ git log --oneline
```

#### Output

```bash
157df43 squash! add docs
d7c42b4 fixup! add feature
```

Prefix with `fixup!` to keep the target's message, or `squash!` to edit the combined one.

See: [git commit](https://git-scm.com/docs/git-commit)

### Reorder automatically

#### Command

```bash
$ git rebase -i --autosquash HEAD~5
```

#### Resulting todo

```bash
pick 877bace # add feature
fixup d7c42b4 # fixup! add feature
pick adc2cdb # add docs
squash 157df43 # squash! add docs
pick 61763ac # fix typo
```

`--autosquash` moves marked commits under their targets and converts them before the editor opens.

See: [git rebase](https://git-scm.com/docs/git-rebase)

### Make it the default

```bash
$ git -c rebase.autoSquash=true rebase -i HEAD~5
$ git config rebase.autoSquash true
```

The config setting has the same effect as passing the flag.

See: [git rebase](https://git-scm.com/docs/git-rebase)

## Moving commits

### Rebase onto a new base

#### Command

```bash
$ git rebase --onto main 9def53e topic
```

#### Output

```bash
Rebasing (1/2)
Rebasing (2/2)
Successfully rebased and updated refs/heads/topic.
```

Replays only `9def53e..topic` onto `main`.

See: [Transplanting a topic branch with --onto](https://git-scm.com/docs/git-rebase#_transplanting_a_topic_branch_with_onto)

### See the graph change

#### Before

```text
# topic branched from oldbase=9def53e; main has advanced to a new base
$ git log --graph --oneline --all   # before
* dfb1391 update docs
* d8053f4 add docs
| * 114533a extend topic
| * c6851d6 add topic
|/  
* 9def53e add config
* 6fb0692 add base
```

#### After

```text
$ git log --graph --oneline --all   # after
* 4ff0016 extend topic
* 32d926a add topic
* dfb1391 update docs
* d8053f4 add docs
* 9def53e add config
* 6fb0692 add base
```

Only the two `topic` commits move; `main` stays where it is.

See: [Transplanting a topic branch with --onto](https://git-scm.com/docs/git-rebase#_transplanting_a_topic_branch_with_onto)
