---
title: Code review
category: AI
updated: 2026-10-31
keywords:
  - Code review
  - AI coding agents
  - Pull requests
  - Checklist
intro: |
  A severity-first checklist for code review. Five axes,
  in priority order: correctness, security, readability,
  performance, test coverage.
---

## Getting started

### Introduction
{: .-intro}

Every review answers one question: will this code
become someone else's problem in three months?

- Walk the five axes **in order** — order is priority
- Each axis gets **pass / fail / N-A**
- Every failure needs a **concrete fix**, not opinion

### Scope first

| Diff size | Action |
| --- | --- |
| ≤ ~400 lines | Review normally |
| > ~400 lines | Ask for split first |

## The five axes

### 1. Correctness (can block a merge)

- Edge cases handled: null, empty, zero,
  negative, oversized input
- Concurrency and timing assumptions hold; no races
- Errors are handled, not swallowed

### 2. Security (can block a merge)

- No user input concatenated into SQL, shell, or HTML
- No hard-coded secrets or tokens
- Logs do not leak sensitive data

### 3. Readability

- Names say what things are
- Each function does one thing
- Magic numbers are named constants
- Flag only what you cannot understand — not
  "I'd write it differently"

### 4. Performance

- No repeated queries or recomputation inside loops
- No N+1 query patterns
- No avoidable large-object copies
- No data-free speculation — "this might get
  slow" is not a comment

### 5. Test coverage

- New logic has tests
- Edge cases have cases
- All-green tests with the critical path
  uncovered still get sent back

## Writing comments

### Fixed format

```text
[axis] file:line problem → suggested fix
```

```text
[Must fix] order.py:87 empty list → guard empty
[Should fix] order.py:92 86400 → SECONDS_PER_DAY
```

### Triage

| Label | Axes | Blocks merge? |
| --- | --- | --- |
| Must fix | Correctness, Security | Yes |
| Should fix | Readability, Performance, Tests | No, say so |

### Hard rules

- **At most 10 comments** per review — more means
  "rewrite and resubmit", not a 50-item grade sheet
- **No style policing** — indentation, quotes, and
  semicolons are the linter's job
- **Speak with the diff** — a comment without a
  concrete line reference is invalid

## Anti-patterns

### What to avoid

| Anti-pattern | Why it fails |
| --- | --- |
| Drive-by LGTM | Approving before reading whole diff |
| Style police | Style nits hide real bugs |
| Comments without code | Which logic, which line? |
| Performance speculation | Claim without data is noise |
| Grading 50 items | Too many: send back |

## Quick checklist

### Copy-paste version

```markdown
## Code review checklist

- [ ] Correctness: edge cases handled, no
  swallowed exceptions
- [ ] Correctness: timing assumptions hold, no races
- [ ] Security: no injection points, no secrets,
  no sensitive data in logs
- [ ] Readability: descriptive names, one job per
  function, no magic numbers
- [ ] Performance: no repeated work in loops,
  no N+1, no evidence-free worries
- [ ] Tests: new logic covered, edge cases covered
- [ ] Scope: diff ≤ ~400 lines, else split first
```
