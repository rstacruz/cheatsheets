---
title: Git worktrees
subtitle: Parallel checkouts from one repository
category: Git
tier: t1
fragments:
  - "worktree add"
  - "worktree list"
  - "worktree remove"
  - "-b hotfix"
  - "--detach"
  - "--no-checkout"
  - "--orphan"
  - "--track"
  - "--porcelain"
  - "worktree prune"
  - "worktree lock"
  - "worktree move"
  - "worktree repair"
  - ".git/worktrees"
  - "../hotfix"
  - "prunable"
updated: 2026-11-18
last_verified_with: "Commands verified on git 2.56.0; last edited 2026-11 (PR #2358)."
intro: |
  A linked worktree shares objects, refs, and config but keeps its own
  HEAD, index, and files. It suits parallel branches, hotfixes, and agent
  checkouts.
links:
  - title: git-worktree manual
    url: https://git-scm.com/docs/git-worktree
  - title: "Pro Git: Worktrees"
    url: https://progit3.com/book/worktrees/
  - title: gitrepository-layout
    url: https://git-scm.com/docs/gitrepository-layout
---

## Creating

### Add a worktree

```bash
git worktree add ../hotfix hotfix
git worktree add ../next
git worktree add ../fix -b fix main
```

The first form checks out an existing branch. Without a branch, `add` checks
out or creates the branch named after the path. `-b` creates a branch from a
start point, `HEAD` by default. The path must be empty or missing.

See: [git worktree add](https://git-scm.com/docs/git-worktree#_commands)

### Branch options

```bash
git worktree add --track -b topic ../topic origin/main
git worktree add -B reset ../reset main
git worktree add --orphan -b empty ../empty
git worktree add ../prev -
```

`--track` marks a start point as upstream; it is implied for a remote-tracking
branch. `-B` resets an existing branch. `--orphan` starts an unborn branch with
an empty index. A bare `-` means `@{-1}`, the previous branch.

See: [git worktree options](https://git-scm.com/docs/git-worktree#_options)

### Detached checkouts

```bash
git worktree add --detach ../review origin/main
git worktree add --no-checkout -b sparse ../sparse main
```

`--detach` leaves HEAD off any branch, so a review worktree cannot claim a
branch. `--no-checkout` skips the initial checkout for sparse or custom setups.

See: [git worktree options](https://git-scm.com/docs/git-worktree#_options)

## Inspecting

### List worktrees

```bash
git worktree list
git worktree list -v
git worktree list --porcelain
```

#### Output

| Annotation | Meaning |
| --- | --- |
| `bare` | a bare repository entry |
| `detached` | HEAD is not on a branch |
| `locked` | protected from prune, move, and remove |
| `prunable` | the worktree directory is missing |

The default output shows the path, current commit, and branch or `detached
HEAD`. `-v` adds lock reasons; `--porcelain` emits stable `key value` records
for scripts. `bare` and `detached` appear in the default output; `locked` and
`prunable` are appended.

See: [List output format](https://git-scm.com/docs/git-worktree#_list_output_format)

### Where worktrees live

```bash
cat ../hotfix/.git
# gitdir: /repo/.git/worktrees/hotfix
```

#### Shared state

| Shared | Per worktree |
| --- | --- |
| objects, refs, config, hooks | `HEAD`, index, sparse patterns |

Each linked worktree has a private directory under `.git/worktrees/<id>`
holding its `HEAD` and index; its `.git` file points there. Objects, refs,
config, and hooks stay shared.

See: [gitrepository-layout](https://git-scm.com/docs/gitrepository-layout#Documentation/gitrepository-layout.txt-worktrees)

## Managing

### Remove a worktree

```bash
git worktree remove ../hotfix
git worktree remove --force ../dirty
```

`remove` deletes the directory and its admin entry, but leaves the branch and
its commits. It refuses modified or untracked files; `--force` discards them.
A locked worktree needs `--force` twice. The main worktree cannot be removed.

See: [git worktree remove](https://git-scm.com/docs/git-worktree#_commands)

### Prune stale entries

```bash
git worktree prune -n -v
git worktree prune
```

`prune` removes admin entries whose worktree directory is gone, which happens
after a manual `rm -rf`. `-n` reports without removing; `-v` names each entry.
Automatic pruning runs from `git gc` after `gc.worktreePruneExpire`, three
months by default.

See: [gc.worktreePruneExpire](https://git-scm.com/docs/git-config#Documentation/git-config.txt-gcworktreePruneExpire)

### Lock a worktree

```bash
git worktree lock --reason "usb drive" ../hotfix
git worktree unlock ../hotfix
```

Locking prevents `prune`, `move`, and `remove` from touching the entry. Use it
for worktrees on removable or network paths. `add --lock` locks at creation
without a race window.

See: [git worktree lock](https://git-scm.com/docs/git-worktree#_commands)

### Move and repair

#### Move

```bash
git worktree move ../hotfix ../hotfix-2
```

#### After a manual move

```bash
git worktree repair ../hotfix-2
```

`move` updates the admin files. If you move a directory by hand, the entry
becomes `prunable`; run `repair` from the moved worktree, or in the main
worktree with its new path. Main and submodule worktrees cannot be moved.

See: [git worktree repair](https://git-scm.com/docs/git-worktree#_commands)

## Rules

### One branch, one worktree

```bash
git worktree add ../other main
# fatal: 'main' is already used by worktree at '/repo'
```

A branch can be checked out in only one worktree; `git checkout` enforces the
same rule. `--force` overrides it, but two checkouts invite lost commits. Use a
detached worktree when the same commit is enough.

See: [git worktree add](https://git-scm.com/docs/git-worktree#_commands)

### Config and hooks

```bash
git config extensions.worktreeConfig true
cd ../hotfix
git config --worktree core.sparseCheckout true
```

Config is shared by default: remotes, aliases, and hooks all come from the main
`.git`. With `extensions.worktreeConfig`, `git config --worktree` writes the
linked worktree's `config.worktree`, which is read after the shared config.

See: [Configuration file](https://git-scm.com/docs/git-worktree#_configuration_file)

### Sparse checkout

```bash
git worktree add --no-checkout -b sparse ../sparse main
cd ../sparse
git sparse-checkout set --cone src docs
git read-tree -mu HEAD
```

Patterns live in `.git/worktrees/<id>/info/sparse-checkout`, and `set` turns
on `extensions.worktreeConfig` so `core.sparseCheckout` stays per worktree.
`read-tree` fills the empty index.

See: [git-sparse-checkout](https://git-scm.com/docs/git-sparse-checkout)

### Submodules

| Operation | Submodule effect |
| --- | --- |
| `remove` | needs `--force` |
| `move` | refuses |
| multiple checkouts | experimental, incomplete |

Git still calls multiple checkouts experimental and warns that submodule
support is incomplete. Avoid multiple checkouts of a superproject, and
expect `--force` when removing one that carries submodules.

See: [git worktree bugs](https://git-scm.com/docs/git-worktree#_bugs)

## Workflows

### Parallel branches

```bash
git worktree add ../feat -b feat main
git worktree add ../fix -b fix main
```

Each checkout has its own index, working files, and build directory, so a
dirty feature tree never blocks a fix. Switch context by changing directory,
not by stashing.

See: [git worktree examples](https://git-scm.com/docs/git-worktree#_examples)

### Review a pull request

```bash
git fetch origin pull/123/head
git worktree add --detach ../review FETCH_HEAD
```

The fetch ref works on GitHub and other forges that expose `pull/<n>/head`. A
detached worktree keeps the review off your branch list; remove it when the
review lands.

See: [Checking out pull requests locally](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/checking-out-pull-requests-locally)

### Hotfix while mid-feature

```bash
git worktree add -b hotfix ../hotfix main
cd ../hotfix && npm test
```

The hotfix builds and tests in its own directory while the feature checkout
stays dirty. Commit on `hotfix`, then remove the worktree; the branch and
commit remain.

See: [git worktree examples](https://git-scm.com/docs/git-worktree#_examples)

### Bare repository hub

```bash
git clone --bare git@github.com:me/repo.git repo.git
git -C repo.git worktree add ../main main
```

A bare repository has no checkout of its own, so each checkout lives in a
sibling directory while sharing one object store. This layout suits dotfiles
and build hosts.

See: [git clone --bare](https://git-scm.com/docs/git-clone#Documentation/git-clone.txt---bare)

### One worktree per agent

```bash
git worktree add -b task-42 ../wt-42 origin/main
git worktree remove ../wt-42
```

Each agent gets an isolated index and working directory while objects and refs
stay shared, so creating one is cheap. Name worktrees after the task or agent,
and remove them when the run finishes. Avoid two agents on one branch.

See: [git-worktree](https://git-scm.com/docs/git-worktree)

## Also see

- [Git branches cheatsheet](./git-branch)
- [Git tricks cheatsheet](./git-tricks)
- [git log cheatsheet](./git-log)
