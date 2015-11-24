---
title: Git revisions
category: Git
---

### Commits

| `dae68e1` | sha1 |
{:.shortcuts}

### References

| `HEAD` | reference |
| `master` | branch |
| `v1.0.0` | tag |
| `origin/master` | aka, *refs/remotes/origin/master* |
| `heads/master` | aka, *refs/heads/master* |
{:.shortcuts}

### Searching back

| `master@{yesterday}` | also *1 day ago*, etc |
| `master@{2}` | 2nd prior value |
| `master@{push}` | where *master* would push to |
| `master^` | parent commit |
| `master^2` | 2nd parent, eg, what it merged |
| `master~5` | 5 parents back |
| `master^0` | this commit; disambiguates from tags |
| `v0.99.8^{tag}` | can be *commit*, *tag*, *tree*, *object* |
| `v0.99.8^{}` | defaults to *{tag}* |
| `:/fix bug` | searches commit messages |
{:.shortcuts}

### Other

| `HEAD:README` | ... |
| `0:README` | (0 to 3) ... |
{:.shortcuts}

## Ranges

| `master` | reachable parents from master |
| `^master` | exclude reachable parents from master |
| `master..fix` | reachable from *fix* but not *master* |
| `master...fix` | reachable from *fix* and *master*, but not both |
| `HEAD^@` | parents of *HEAD* |
| `HEAD^!` | *HEAD*, then excluding parents's ancestors |
| `HEAD^{:/fix}` | search previous *HEAD*s matching criteria |
{:.shortcuts}

### Ranges illustration

```nohighlight
A -+- E - F - G   master
   '- B - C - D   fix

master..fix   = BCD
master...fix  = BCD and EFG
```

## Example usages

```sh
git log master...develop    # inspect differences in branches
git rebase -i HEAD~3        # rebase last 3 commits
git reset --hard HEAD@{2}   # undo last operation that changed HEAD
git show ":/fix bug"        # search commit with regex
git checkout v2^{}          # checkout the `v2` tag (not `v2` branch)
```
