---
title: Git extras
category: Git
intro: |
  Quick reference to some utilities in the [git-extras](https://github.com/tj/git-extras) utilities.
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

### Branches

```sh
$ git delete-merged-branches
  # hint: do `git remote prune origin` after

$ git create-branch development
$ git delete-branch development

$ git fresh-branch gh-pages
```

### Inspecting

```sh
$ git summary   # repo age, commits, active days, etc
$ git impact    # impact graph
$ git effort    # commits per file
```

### Github

```sh
$ git fork strongloop/express
# sync your fork with the original repository:
$ git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
$ git fetch upstream; git merge upstream/master
```

### Tags

```sh
$ git release v1.0.0           # commit, tag, push-tags
$ git delete-tag v1.0.0
```

### Conveniences

```sh
$ git ignore "*.log"
```

### Locking

Assumes that changes will not be committed.

```sh
$ git lock config/database.yml
$ git unlock config/database.yml
```

### Etc

```sh
$ git obliterate secret.yml   # remove all references to it
```

### References

- https://github.com/visionmedia/git-extras
