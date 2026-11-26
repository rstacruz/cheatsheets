---
title: How to resolve a Git stash conflict
link_title: Resolve a stash conflict
subtitle: Clear conflicts after a stash
category: Git workflows
layout: snippet
last_verified_with: "git 2.56.0."
tier: t3
updated: 2026-11-27
links:
  - title: git-stash manual
    url: https://git-scm.com/docs/git-stash
---

## Resolving a stash conflict
<!-- {: .-snippets} -->

### Trigger the conflict
<!-- {: .-snippet} -->

```bash
git stash pop
```

**Stops on a conflict and keeps the stash.** Git reports `CONFLICT (content)` and leaves unmerged paths; see [git stash pop](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-pop--index-q--quietstash).

### See the unmerged paths
<!-- {: .-snippet} -->

```bash
git status --short
```

**Lists conflicted files.** `UU` means both sides modified the file; see [git status](https://git-scm.com/docs/git-status).

### Mark it resolved
<!-- {: .-snippet} -->

```bash
git add app.txt
```

**Stages the resolution.** Edit the file and clear the `<<<<<<<`, `=======`, and `>>>>>>>` markers first; see [git add](https://git-scm.com/docs/git-add).

### Drop the kept stash
<!-- {: .-snippet} -->

```bash
git stash drop
```

**Removes the entry after the content is applied.** Check the file before dropping; see [git stash drop](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-drop-q--quietstash).
