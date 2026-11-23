---
title: git log
subtitle: Commit history viewer
category: Git
updated: 2026-11-23
last_verified_with: "Git 2.56.0."
---

### Revision ranges

```bash
git log master             # branch
git log origin/master      # branch, remote
git log v1.0.0             # tag

git log master develop

git log v2.0..master       # reachable from *master* but not *v2.0*
git log v2.0...master      # reachable from either, but not both
```

See [gitrevisions](./git-revisions).

### Basic filters

#### Count and skip

```bash
-n, --max-count=2
    --skip=2
```

#### By date

```bash
    --since="1 week ago"
    --until="yesterday"
```

#### By person

```bash
    --author="Rico"
    --committer="Rico"
```

### Search

#### By message or code

```bash
    --grep="Merge pull request"   # in commit messages
    -S"console.log"               # in code
    -G"foo.*"                     # in code (regex)
```

#### Refine matches

```bash
    --invert-grep
    --all-match                   # AND in multi --grep
```

### Limiting

#### Merge commits

```bash
    --merges
    --no-merges
```

#### First parent only

```bash
    --first-parent          # no stuff from merged branches
```

#### By ref

```bash
    --branches="feature/*"
    --tags="v*"
    --remotes="origin"
```

### Simplification

```bash
git log -- app/file.rb          # only file
    --simplify-by-decoration    # tags and branches
```

### Ordering

```bash
    --date-order
    --author-date-order
    --topo-order              # "smart" ordering
    --reverse
```

### Formatting

```bash
    --abbrev-commit
    --oneline
    --graph
```

### Custom formats

```bash
    --pretty="format:%H"
```

See: [Git log format cheatsheet](./git-log-format)

## Also see

- [Git log format cheatsheet](./git-log-format)
