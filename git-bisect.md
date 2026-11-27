---
title: Git bisect
subtitle: Find the first bad commit
logo: { set: icon-park-outline, name: bug }
category: Git
tier: t2
updated: 2026-11-21
last_verified_with: "Git."
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
  - "--term-good"
  - "--no-checkout"
  - "--first-parent"
intro: |
  `git bisect` binary-searches history for a commit that introduced a bug, testing each midpoint between good and bad endpoints before reset.
links:
  - title: git-bisect manual
    url: https://git-scm.com/docs/git-bisect
  - title: "Pro Git: Debugging with Git"
    url: https://git-scm.com/book/en/v2/Git-Tools-Debugging-with-Git
  - title: git-bisect examples
    url: https://git-scm.com/docs/git-bisect#_examples
---

## Starting a session

### Step 1: Mark the endpoints

#### Interactively

```bash
git bisect start
git bisect bad             # HEAD fails
git bisect good v1.2.0     # last known good tag
```
<!-- {: data-highlight="git bisect start"} -->

#### In one command

```bash
git bisect start HEAD v1.2.0
```
<!-- {: data-highlight="HEAD v1.2.0"} -->

#### Output

```
Bisecting: 3 revisions left to test after this (roughly 2 steps)
[d093306e4c74e27178f4332bc119b125a541d286] step 4 (broken)
```

The bracketed commit is checked out; test and mark it.

See: [Basic bisect commands](https://git-scm.com/docs/git-bisect#_basic_bisect_commands_start_bad_good)

### Step 2: Test and mark

#### Test

```bash
make test    # placeholder: your project's test command
```

#### Mark

```bash
git bisect good    # current commit works
git bisect bad     # current commit fails
```
<!-- {: data-highlight="bisect good; bisect bad"} -->

#### Result

```
d093306e4c74e27178f4332bc119b125a541d286 is the first 'bad' commit
```

`refs/bisect/bad` points at that commit until the session is reset.

See: [Basic bisect commands](https://git-scm.com/docs/git-bisect#_basic_bisect_commands_start_bad_good)

### Step 3: Rename the outcomes

```bash
git bisect start --term-good=passing --term-bad=failing HEAD HEAD~7
git bisect terms
```
<!-- {: data-highlight="--term-good=passing; --term-bad=failing"} -->

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
<!-- {: data-highlight="bisect skip"} -->

`skip` covers commits that fail for unrelated reasons, such as a broken build. If every remaining commit is skipped, Git lists candidates.

See: [Bisect skip](https://git-scm.com/docs/git-bisect#_bisect_skip)

### Visualize remaining commits

#### Terminal

```bash
git bisect visualize --oneline
```
<!-- {: data-highlight="bisect visualize"} -->

#### Output

```
d778145 step 8 (broken)
e3d3902 step 7 (broken)
d27c8f4 step 6 (broken)
1d61b4c step 5 (broken)
d093306 step 4 (broken)
941212d step 3 (ok)
c835f75 step 2 (ok)
```

#### Desktop

```bash
git bisect view --stat
```
<!-- {: data-highlight="bisect view"} -->

`view` is an alias. Both open `gitk` when a display exists, else `git log`.

See: [Bisect visualize/view](https://git-scm.com/docs/git-bisect#_bisect_visualizeview)

### Try a nearby commit

```bash
git bisect good
git reset --hard HEAD~3
# compile and test the new checkout
git bisect bad
```

When the suggested commit is unhelpful, the final mark still applies to the checked-out commit.

See: [Avoiding testing a commit](https://git-scm.com/docs/git-bisect#_avoiding_testing_a_commit)

## Automating the search

### Run a test script

```bash
git bisect run ./check.sh
```
<!-- {: data-highlight="bisect run"} -->

#### Output

```
running './check.sh'
Bisecting: 0 revisions left to test after this (roughly 1 step)
[941212d998fb435277ab5ebf955092f2d7d3af95] step 3 (ok)
running './check.sh'
d093306e4c74e27178f4332bc119b125a541d286 is the first 'bad' commit
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
| `126`–`127` | abort (bogus exit code) |
| `128`+ | abort the run |

<!-- {: .-headers} -->

See: [Bisect run](https://git-scm.com/docs/git-bisect#_bisect_run)

## Saving and resuming

### Save the log

```bash
git bisect log > bisect.log
```
<!-- {: data-highlight="bisect log"} -->

#### Log

```
# bad: [d778145b4e9053434911b243e65b796603f12480] step 8 (broken)
# good: [2319d13da6615005584f096d817ea027afb6e0ee] step 1 (ok)
git bisect start 'HEAD' 'HEAD~7'
git bisect bad d093306e4c74e27178f4332bc119b125a541d286
git bisect good 941212d998fb435277ab5ebf955092f2d7d3af95
```

Each mark is recorded as a command, so the log can be edited and replayed.

See: [Bisect log and replay](https://git-scm.com/docs/git-bisect#_bisect_log_and_bisect_replay)

### Replay a log

```bash
git bisect reset
git bisect replay bisect.log
```
<!-- {: data-highlight="bisect replay"} -->

Delete a wrong `git bisect good` or `git bisect bad` line before replaying.

See: [Bisect log and replay](https://git-scm.com/docs/git-bisect#_bisect_log_and_bisect_replay)

### Reset the session

```bash
git bisect reset
git bisect reset bisect/bad
git bisect reset HEAD
```
<!-- {: data-highlight="bisect reset"} -->

#### Output

```
Previous HEAD position was 941212d step 3 (ok)
Switched to branch 'main'
```

Plain `reset` returns to the starting commit; `bisect/bad` leaves the bad commit checked out. Either clears the session.

See: [Bisect reset](https://git-scm.com/docs/git-bisect#_bisect_reset)

## Session options

### Avoid checkouts

```bash
git bisect start --no-checkout HEAD HEAD~7
```
<!-- {: data-highlight="--no-checkout"} -->

Git records marks without rewriting files, for builds that manage their own working tree.

See: [Options](https://git-scm.com/docs/git-bisect#_options)

### Narrow the search

#### First parent

```bash
git bisect start --first-parent HEAD HEAD~7
```
<!-- {: data-highlight="--first-parent"} -->

#### Paths

```bash
git bisect start HEAD HEAD~7 -- src/parser
```
<!-- {: data-highlight="src/parser"} -->

`--first-parent` ignores merged side branches; a pathspec considers only commits that touch those paths.

See: [Cutting down bisection](https://git-scm.com/docs/git-bisect#_cutting_down_bisection_by_giving_more_parameters_to_bisect_start)

## Also see

- [Git log cheatsheet](./git-log)
- [Git tricks cheatsheet](./git-tricks)
