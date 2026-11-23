---
name: autofix-devhints-sheet
description: Reviews a devhints sheet in a fresh read-only subagent and applies valid fixes in the caller's chat, up to a caller-set round limit. Use to autofix a sheet without letting the reviewer edit the branch.
---

# Autofix devhints sheets

The subagent reviews; the caller fixes. Use this to autofix a sheet when the caller owns the working tree.

## Goals

Definition of done: a sheet review has run in a read-only subagent, valid findings are fixed in the caller's chat, and any residual findings are reported.

- [ ] Each round ran in a fresh read-only subagent.
- [ ] Valid findings are fixed and pushed by the caller.
- [ ] Residual or disputed findings are in the handover.

## Input

- `$sheets` - filenames to review; defaults to the root sheets in `git diff --name-only '*.md'`.
- `--max-rounds <n>` - review rounds, default `2`. Stops early on `passes`.

## Skill dependencies

- `/review-devhints-sheet` - the reviewing protocol and report format

## Workflow

```pseudocode
begin($sheets, { --max-rounds 2 }) {
  $round = 0
  loop {
    $round += 1
    $report = subagent(review) {
      run /review-devhints-sheet for $sheets
      if the skill is unavailable, read .agents/skills/review-devhints-sheet/SKILL.md and follow it
      use the current worktree; run the automated checks and baseline audit
      do not edit, commit, push, or comment
      return the report in its format
    }

    if ($report passes) { break }
    fix valid findings in this chat
    run checks; commit and push
    if ($round == --max-rounds) { break }
  }

  if ($report does not pass) {
    report remaining and disputed findings in the handover
  }
  return { report: $report, rounds: $round }
}
```

## Guidelines

- Spawn a fresh subagent per round; never reuse one or run rounds in parallel.
- The subagent is read-only: it never edits, commits, pushes, comments, or spawns further subagents.
- Never exceed `--max-rounds`; a round is one review run, not one finding.
- If a round cannot run (missing sheet, broken checks, unavailable subagent), report the blocker; never treat it as a pass.
- If you disagree with a finding, record why in the handover instead of silently dropping it.
