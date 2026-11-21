---
title: Git bisect
subtitle: Find the first bad commit
category: Git
tier: t1
updated: 2026-11-21
fragments:
  - "bisect start"
  - "bisect bad"
  - "bisect good"
  - "bisect skip"
  - "bisect run"
  - "bisect log"
  - "bisect replay"
  - "bisect reset"
  - "bisect view"
  - "HEAD~7"
  - "125"
  - "refs/bisect/bad"
  - "HEAD~2..HEAD~1"
  - "--term-old"
  - "--no-checkout"
  - "--first-parent"
intro: |
  `git bisect` binary-searches history for a commit that introduced a bug.

  Mark a good and bad endpoint, test each midpoint, then reset to return.
links:
  - title: git-bisect manual
    url: https://git-scm.com/docs/git-bisect
  - title: "Pro Git: Debugging with Git"
    url: https://git-scm.com/book/en/v2/Git-Tools-Debugging-with-Git
  - title: git-bisect examples
    url: https://git-scm.com/docs/git-bisect#_examples
---

## Starting a session

### Mark the endpoints

#### Interactively

```bash
git bisect start
git bisect bad             # HEAD fails
git bisect good v1.2.0     # last known good tag
```

#### In one command

```bash
git bisect start HEAD v1.2.0
```

#### Output

```
Bisecting: 3 revisions left to test after this (roughly 2 steps)
[54d3a03b8e30dbe3d6c45273ef21b6b9f8185918] step 4 (broken)
```

The bracketed commit is now checked out. Test it, then mark it.

See: [Basic bisect commands](https://git-scm.com/docs/git-bisect#_basic_bisect_commands_start_bad_good)

### Test and mark

```bash
git bisect good    # current commit works
git bisect bad     # current commit fails
```

#### Result

```
54d3a03b8e30dbe3d6c45273ef21b6b9f8185918 is the first 'bad' commit
```

`refs/bisect/bad` points at that commit until the session is reset.

See: [Basic bisect commands](https://git-scm.com/docs/git-bisect#_basic_bisect_commands_start_bad_good)

### Rename the outcomes

```bash
git bisect start --term-good=passing --term-bad=failing HEAD HEAD~7
git bisect terms
```

#### Output

```
Your current terms are 'passing' for the old state
and 'failing' for the new state.
```

Mark commits with `git bisect passing` and `git bisect failing` instead.

See: [Alternate terms](https://git-scm.com/docs/git-bisect#_alternate_terms)

## Narrowing the range

### Skip what you cannot test

```bash
git bisect skip                 # current commit cannot be tested
git bisect skip HEAD~2..HEAD~1  # range of commits
```

Reserve `skip` for commits that fail for unrelated reasons, such as a broken build. If every remaining commit is skipped, Git lists candidates.

See: [Bisect skip](https://git-scm.com/docs/git-bisect#_bisect_skip)

### Visualize remaining commits

#### Terminal

```bash
git bisect visualize --oneline
```

#### Output

```
241a3b4 step 8 (broken)
5dfe180 step 7 (broken)
a9ac61e step 6 (broken)
ab90fbb step 5 (broken)
54d3a03 step 4 (broken)
d0b04cc step 3 (ok)
f65a146 step 2 (ok)
```

#### Desktop

```bash
git bisect view --stat
```

`view` is an alias. Both open `gitk` when a display exists, else `git log`.

See: [Bisect visualize/view](https://git-scm.com/docs/git-bisect#_bisect_visualizeview)

### Try a nearby commit

```bash
git bisect good
git reset --hard HEAD~3
# compile and test the new checkout
git bisect bad
```

Use this when the suggested commit is unhelpful; the final mark still applies to the checked-out commit.

See: [Avoiding testing a commit](https://git-scm.com/docs/git-bisect#_avoiding_testing_a_commit)

## Automating the search

### Run a test script

```bash
git bisect run ./check.sh
```

#### Output

```
running './check.sh'
Bisecting: 0 revisions left to test after this (roughly 1 step)
[d0b04cc09288e52ff871da6492f6c2ad81c604ef] step 3 (ok)
54d3a03b8e30dbe3d6c45273ef21b6b9f8185918 is the first 'bad' commit
bisect found first 'bad' commit
```

Git runs the script on each candidate and uses its exit status as the mark.

See: [Bisect run](https://git-scm.com/docs/git-bisect#_bisect_run)

### Exit codes

| Exit | Git treats it as |
| --- | --- |
| `0` | good |
| `1`–`124` | bad |
| `125` | skip this commit |
| `128`+ | abort the run |

<!-- {: .-headers} -->

A passing test returns `0`; a failing test returns `1`. Use `125` when the commit cannot be tested at all.

See: [Bisect run](https://git-scm.com/docs/git-bisect#_bisect_run)

### Skip from a script

#### check.sh

```sh
#!/bin/sh
[ -f Makefile ] || exit 125
npm test
```

The script keeps its own test status for normal commits and returns `125` for those it cannot build.

See: [Bisect run](https://git-scm.com/docs/git-bisect#_bisect_run)

## Saving and resuming

### Save the log

```bash
git bisect log > bisect.log
```

#### Log

```
# bad: [241a3b46ef74aac4a923a9619bfe6ffa23439dc7] step 8 (broken)
# good: [3ae89023aaae3aa4b7331dd123cf1b18ccea81cd] step 1 (ok)
git bisect start 'HEAD' 'HEAD~7'
```

Each mark is recorded as a command, so the log can be edited and replayed.

See: [Bisect log and replay](https://git-scm.com/docs/git-bisect#_bisect_log_and_bisect_replay)

### Replay a log

```bash
git bisect reset
git bisect replay bisect.log
```

#### Replaying

```
Bisecting: 2 revisions left to test after this (roughly 2 steps)
[94400c6e8c4c369f04d690559f9261e827830745] step 4 (broken)
94400c6e8c4c369f04d690559f9261e827830745 is the first 'bad' commit
```

Delete a wrong `git bisect good` or `git bisect bad` line before replaying.

See: [Bisect log and replay](https://git-scm.com/docs/git-bisect#_bisect_log_and_bisect_replay)

### Reset the session

```bash
git bisect reset
git bisect reset bisect/bad
git bisect reset HEAD
```

#### Output

```
Previous HEAD position was d0b04cc step 3 (ok)
Switched to branch 'main'
```

Plain `reset` returns to the starting commit; `bisect/bad` leaves you on the culprit. Either clears the session.

See: [Bisect reset](https://git-scm.com/docs/git-bisect#_bisect_reset)

## Session options

### Avoid checkouts

```bash
git bisect start --no-checkout HEAD HEAD~7
```

Git records marks without rewriting files, for builds that manage their own working tree.

See: [Options](https://git-scm.com/docs/git-bisect#_options)

### Narrow the search

#### First parent

```bash
git bisect start --first-parent HEAD HEAD~7
```

#### Paths

```bash
git bisect start HEAD HEAD~7 -- src/parser
```

`--first-parent` ignores merged side branches; a pathspec considers only commits that touch those paths.

See: [Cutting down bisection](https://git-scm.com/docs/git-bisect#_cutting_down_bisection_by_giving_more_parameters_to_bisect_start)

## Also see

- [Git log cheatsheet](./git-log)
- [Git tricks cheatsheet](./git-tricks)
