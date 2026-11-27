---
title: git log
subtitle: Commit history viewer
logo: { src: /assets/logos/git.svg }
category: Git
updated: 2026-11-23
tier: t3
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

See: [Commit limiting](https://git-scm.com/docs/git-log#_commit_limiting)

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

See: [Commit limiting](https://git-scm.com/docs/git-log#_commit_limiting)

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

See: [Commit limiting](https://git-scm.com/docs/git-log#_commit_limiting)

### Simplification

```bash
git log -- app/file.rb          # only file
    --simplify-by-decoration    # tags and branches
```

See: [History simplification](https://git-scm.com/docs/git-log#_history_simplification)

### Ordering

```bash
    --date-order
    --author-date-order
    --topo-order              # "smart" ordering
    --reverse
```

See: [Commit ordering](https://git-scm.com/docs/git-log#_commit_ordering)

### Formatting

```bash
    --abbrev-commit
    --oneline
    --graph
```

See: [Commit formatting](https://git-scm.com/docs/git-log#_commit_formatting)

### Custom formats

```bash
    --pretty="format:%H"
```

See: [Git log format cheatsheet](./git-log-format)

## Also see

- [Git log format cheatsheet](./git-log-format)
