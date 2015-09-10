---
title: Git revisions
---

### Single commits

- commits:
  - `dae68e1` (sha1)

- refs:
  - `HEAD` (ref)
  - `master` (branch)
  - `v1.0.0` (tag)
  - `origin/master` (aka, *refs/remotes/origin/master*)
  - `heads/master`
  - `refs/heads/master`

- search back:
  - `master@{yesterday}`
  - `master@{2}` (2nd prior value)
  - `master@{push}` (where *master* would push to)
  - `master^` (parent)
  - `master^2` (2nd parent, eg, what it merged)
  - `master~5` (5 parents back)
  - `master^0` (this commit; disambiguates from tags)
  - `v0.99.8^{tag}` (can be *commit*, *tag*, *tree*, *object*)
  - `v0.99.8^{}` (defaults to *{tag}*)
  - `:/fix bug` (searches commit messages)
- other:
  - `HEAD:README`
  - `0:README` (0 to 3)

### Ranges

- `master` (reachable parents from master)
- `^master` (exclude reachable parents from master)
- `master..fix` (reachable from *fix* but not *master*)
- `master...fix` (reachable from *fix* and *master*, but not both)
- `HEAD^@` (parents of *HEAD*)
- `HEAD^!` (*HEAD*, then excluding parents's ancestors)

### Ranges illustration

```
 F   - master
 E C - fix
 D B
 |-'
 A

master..fix   = BC
master...fix  = BC and FED
```
