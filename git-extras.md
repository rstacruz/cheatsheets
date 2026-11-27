---
title: Git extras
subtitle: Collection of Git utilities
logo: { set: icon-park-outline, name: puzzle }
category: Git
intro: |
  Quick reference to some utilities in the [git-extras](https://github.com/tj/git-extras) utilities.
last_verified_with: "git-extras 7.5."
updated: 2026-11-25
tier: t3
links:
  - title: git-extras
    url: https://github.com/tj/git-extras
---

## References

### Git-flow

```sh
$ git feature myfeature
  switched to branch 'feature/rofl'

$ ...
$ git checkout develop
$ git feature finish myfeature
  merging 'feature/rofl' into develop
  deleted branch 'feature/rofl'
```

Also `git-bug` and `git-refactor`.

See: [git-feature](https://github.com/tj/git-extras/blob/master/man/git-feature.md)

### Branches

```sh
$ git delete-merged-branches
  # hint: do `git remote prune origin` after

$ git create-branch development
$ git delete-branch development

$ git fresh-branch gh-pages
```

See: [git-create-branch](https://github.com/tj/git-extras/blob/master/man/git-create-branch.md)

### Inspecting

```sh
$ git summary         # repo age, commits, active days, etc
$ git info            # shows information about the repo
$ git effort          # commits per file
$ git commits-since   # list commits since date
$ git changelog       # generate changelog since last tag
```

See: [git-summary](https://github.com/tj/git-extras/blob/master/man/git-summary.md)

### Github

```sh
$ git fork strongloop/express
# sync your fork with the original repository:
$ git remote add upstream \
  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
$ git fetch upstream; git merge upstream/master
```

See: [git-fork](https://github.com/tj/git-extras/blob/master/man/git-fork.md)

### Tags

```sh
$ git release v1.0.0           # commit, tag, push-tags
$ git delete-tag v1.0.0
```

See: [git-release](https://github.com/tj/git-extras/blob/master/man/git-release.md)

### Conveniences

```sh
$ git ignore "*.log"   # append *.log to .gitignore
$ git undo             # undo the last local commit
```

See: [git-ignore](https://github.com/tj/git-extras/blob/master/man/git-ignore.md)

### Locking

```sh
$ git lock config/database.yml   # no commits while locked
$ git unlock config/database.yml
```

See: [git-lock](https://github.com/tj/git-extras/blob/master/man/git-lock.md)

### Etc

```sh
$ git obliterate secret.yml   # remove all references to it
```

See: [git-obliterate](https://github.com/tj/git-extras/blob/master/man/git-obliterate.md)

### References

- [git-extras](https://github.com/tj/git-extras)

