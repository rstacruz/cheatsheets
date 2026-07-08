---
title: Jujutsu (jj)
category: Git
updated: 2026-06-21
---

### About
{: .-intro}

Jujutsu (`jj`) is a Git-compatible VCS. The working copy is itself a commit,
there's no staging area, and every operation is undoable.

- <https://github.com/jj-vcs/jj>
- [CLI reference](https://docs.jj-vcs.dev/latest/cli-reference/)

### Key concepts

| Term         | Meaning                                       |
| ------------ | --------------------------------------------- |
| Change       | A logical change; keeps a stable change ID    |
| Commit       | A snapshot; gets a new hash when rewritten    |
| Working copy | Itself a commit, auto-snapshotted on each cmd |
| `@`          | The working-copy commit                       |
| Bookmark     | A named pointer (like a Git branch)           |

### Setup

```bash
jj config set --user user.name "Your Name"
jj config set --user user.email "you@example.com"
jj config edit --user
```

## Getting started

### Creating a repo

```bash
jj git init                  # New jj repo
jj git init --colocate       # Also a usable Git repo (keeps .git)
jj git init --git-repo=PATH  # Wrap an existing Git repo
```

### Cloning

```bash
jj git clone <url>
jj git clone <url> --colocate
jj git clone <url> dir/      # Clone into a directory
```

### Status & history

```bash
jj st                        # Status: changed files + working copy
jj log                       # Graph of recent changes
jj log -r ::@                # Ancestors of the working copy
jj log -r 'all()'            # Every revision
jj show <rev>                # Description + diff for a revision
jj diff                      # Diff of the working copy
jj diff -r <rev>             # Diff of a revision
```

## Making changes

### Describe & commit

```bash
jj describe -m "message"     # Set the message of @
jj describe <rev> -m "msg"   # Set the message of another change
jj commit -m "message"       # Describe @ and start a new empty change
jj new                       # New change on top of @
jj new <rev>                 # New change on top of <rev>
jj new <a> <b>               # New merge change with parents a and b
```

No `git add`; the working copy is snapshotted automatically.

### Editing existing changes

```bash
jj edit <rev>                # Make <rev> the working copy
jj squash                    # Move @'s changes into its parent
jj squash -i                 # Interactively choose what to squash
jj squash --into <rev>       # Squash into a specific change
jj split                     # Split @ into two changes (interactive)
jj absorb                    # Auto-distribute @'s changes into ancestors
```

### Undo & discard

```bash
jj undo                      # Undo the last operation
jj op log                    # The operation log
jj op restore <op-id>        # Restore repo to a past operation
jj abandon <rev>             # Discard a change, rebasing descendants
jj restore                   # Discard working-copy changes
jj restore --from <rev>      # Restore files from a revision
```

## Bookmarks (branches)

### Managing bookmarks
{: .-three-column}

```bash
jj bookmark list             # alias: jj b l
jj bookmark create NAME      # Create at @
jj bookmark create NAME -r <rev>
```

```bash
jj bookmark set NAME -r <rev>
jj bookmark move NAME --to <rev>
jj bookmark delete NAME
```

```bash
jj bookmark rename OLD NEW
jj bookmark track NAME@origin
jj bookmark forget NAME
```

The working copy is not "on" a bookmark; move them explicitly.

## Working with Git

### Push & fetch

```bash
jj git fetch
jj git push                  # Push tracked bookmarks
jj git push --bookmark NAME
jj git push -c @             # Create a bookmark for @ and push it
jj git push --all
```

### Import & export

```bash
jj git import                # Import refs from the backing Git repo
jj git export                # Export jj state to the Git repo
jj git remote add origin <url>
jj git remote list
```

## Rewriting history

### Rebase

```bash
jj rebase -d <dest>          # Rebase @ and descendants onto <dest>
jj rebase -s <src> -d <dest> # Rebase <src> and its descendants
jj rebase -b <branch> -d <dest>
```

### Reorder & duplicate

```bash
jj duplicate <rev>           # Copy a change elsewhere
jj parallelize <a> <b>       # Make sequential changes siblings
jj next                      # Move @ to a child
jj prev                      # Move @ to the parent
```

### Resolving conflicts

```bash
jj resolve                   # Launch the merge tool
jj resolve --list            # List conflicted files
```

Conflicts are recorded in commits, so they don't block other work.

## Revsets

### Selectors

| Revset      | Meaning                          |
| ----------- | -------------------------------- |
| `@`         | Working-copy commit              |
| `@-`        | Parent of `@`                    |
| `x \| y`    | Union of `x` and `y`             |
| `x::y`      | `x`, `y`, and everything between |
| `::x`       | Ancestors of `x` (inclusive)     |
| `x::`       | Descendants of `x` (inclusive)   |
| `x..y`      | In ancestors of `y` but not `x`  |

### Functions

```bash
jj log -r 'mine()'           # Changes you authored
jj log -r 'trunk()'          # The trunk (e.g. main)
jj log -r 'heads(all())'     # Tips of the graph
jj log -r 'bookmarks()'      # Commits with bookmarks
jj log -r 'author(exact:"you@example.com")'
```

## Also see

- [Git comparison](https://docs.jj-vcs.dev/latest/git-comparison/)
- [Git command table](https://docs.jj-vcs.dev/latest/git-command-table/)
- [Git tricks](./git-tricks)
