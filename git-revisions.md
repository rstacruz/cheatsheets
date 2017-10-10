---
title: Git revisions
category: Git
layout: 2017/sheet
updated: 2017-10-11
description: ""
intro: |
  A list of revision specifications you can use with `git log` and many other Git commands. Summarized from `man gitrevisions`.
---

### Example usages

```bash
git log master...develop    # inspect differences in branches
git rebase -i HEAD~3        # rebase last 3 commits
git reset --hard HEAD@{2}   # undo last operation that changed HEAD
git show ":/fix bug"        # search commit with regex
git checkout v2^{}          # checkout the `v2` tag (not `v2` branch)
```
The 3rd argument in each of these commands is a `gitrevision`.

### Common git revisions

| Reference       | Description                                     |
| ---             | ---                                             |
| `dae68e1`       | sha1                                            |
| `HEAD`          | reference                                       |
| `v1.0.0`        | tag                                             |
| ---             | ---                                             |
| `master`        | local branch                                    |
| `origin/master` | remote branch                                   |
| ---             | ---                                             |
| `master~2`      | 2 commits back from master                      |
| ---             | ---                                             |
| `master..fix`   | reachable from *fix* but not *master*           |
| `master...fix`  | reachable from *fix* and *master*, but not both |

These are just the common ones, there's a lot more below!

## Reference

### Commits

| `dae68e1` | sha1 |

### References

| `HEAD`          | reference                         |
| `master`        | branch                            |
| `v1.0.0`        | tag                               |
| `origin/master` | aka, *refs/remotes/origin/master* |
| `heads/master`  | aka, *refs/heads/master*          |

### Searching back

| `master@{yesterday}` | also *1 day ago*, etc                    |
| `master@{2}`         | 2nd prior value                          |
| `master@{push}`      | where *master* would push to             |
| `master^`            | parent commit                            |
| `master^2`           | 2nd parent, eg, what it merged           |
| `master~5`           | 5 parents back                           |
| `master^0`           | this commit; disambiguates from tags     |
| `v0.99.8^{tag}`      | can be *commit*, *tag*, *tree*, *object* |
| `v0.99.8^{}`         | defaults to *{tag}*                      |
| `:/fix bug`          | searches commit messages                 |

### Other

| `HEAD:README` | ...          |
| `0:README`    | (0 to 3) ... |

## Ranges

### Ranges

| `master`       | reachable parents from master                   |
| `^master`      | exclude reachable parents from master           |
| `master..fix`  | reachable from *fix* but not *master*           |
| `master...fix` | reachable from *fix* and *master*, but not both |
| `HEAD^@`       | parents of *HEAD*                               |
| `HEAD^!`       | *HEAD*, then excluding parents's ancestors      |
| `HEAD^{:/fix}` | search previous *HEAD*s matching criteria       |

### Ranges illustration

```nohighlight
A ─┬─ E ── F ── G   master
   │
   └─ B ── C ── D   fix
```
{: .-box-chars.-setup}

| `master..fix`  | BCD         |
| `master...fix` | BCD and EFG |
