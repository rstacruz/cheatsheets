---
title: Git log format string
subtitle: Log format placeholder reference
logo: { src: /assets/logos/git.svg }
category: Git
updated: 2026-11-23
tier: t3
last_verified_with: "Git 2.56.0."
weight: -1
keywords:
  - "git log --pretty=format:%H"
  - "%H - Commit hash"
  - "%an - Author"
  - "%aD - Author date"
---

## Log format

<!-- {: .-three-column} -->

### Pretty format

<!-- {: .-prime} -->

```bash
git log --pretty="format:%H"
```

See the next tables on format variables.

See: [Pretty formats](https://git-scm.com/docs/git-log#_pretty_formats)

### Hash

#### Commit

| Variable | Description |
| --- | --- |
| `%H` | commit hash |
| `%h` | (abbrev) commit hash |

#### Tree

| Variable | Description |
| --- | --- |
| `%T` | tree hash |
| `%t` | (abbrev) tree hash |

#### Parent

| Variable | Description |
| --- | --- |
| `%P` | parent hash |
| `%p` | (abbrev) parent hash |

See: [Pretty formats](https://git-scm.com/docs/git-log#_pretty_formats)

### Commit

| Variable | Description |
| --- | --- |
| `%s` | commit subject |
| `%f` | sanitized subject (filename-safe) |
| `%b` | commit body |
| `%B` | raw body (subject + body) |
| `%d` | ref names, like `--decorate` |
| `%D` | ref names without wrapping |
| `%e` | commit encoding |

See: [Pretty formats](https://git-scm.com/docs/git-log#_pretty_formats)

## Author and committer

### Author

#### Name

| Variable | Description |
| --- | --- |
| `%an` | author |
| `%aN` | author, respecting mailmap |

#### Email

| Variable | Description |
| --- | --- |
| `%ae` | author email |
| `%aE` | author email, respecting mailmap |

#### Date

| Variable | Description |
| --- | --- |
| `%aD` | author date (rfc2822) |
| `%ar` | author date (relative) |
| `%at` | author date (unix timestamp) |
| `%ai` | author date (iso8601-like) |
| `%aI` | author date (strict iso8601) |

See: [Pretty formats](https://git-scm.com/docs/git-log#_pretty_formats)

### Committer

#### Name

| Variable | Description |
| --- | --- |
| `%cn` | committer name |
| `%cN` | committer name, respecting mailmap |

#### Email

| Variable | Description |
| --- | --- |
| `%ce` | committer email |
| `%cE` | committer email, respecting mailmap |

#### Date

| Variable | Description |
| --- | --- |
| `%cD` | committer date (rfc2822) |
| `%cr` | committer date (relative) |
| `%ct` | committer date (unix timestamp) |
| `%ci` | committer date (iso8601-like) |
| `%cI` | committer date (strict iso8601) |

See: [Pretty formats](https://git-scm.com/docs/git-log#_pretty_formats)

## Also see

- [Git log cheatsheet](./git-log)
