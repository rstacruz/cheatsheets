---
name: review-devhints-sheet
description: Reviews devhints.io sheets against the writing guidelines and reports each violation with its rule slug. Use when evaluating or reviewing *.md sheets, reviewing a sheet PR, asked to review or lint a sheet, or spawning this review in a read-only subagent whose caller applies the fixes.
---

# Review devhints sheets

Report violations; fix only when asked. In [subagent review](#subagent-review), the caller fixes.

## Input

- `$sheets` - filenames to review; defaults to the root sheets in `git diff --name-only '*.md'`.
- `$max-rounds` - subagent rounds, default `1`; only used by [subagent review](#subagent-review).

## Workflow

1. Read [_docs/rules.md](../../../_docs/rules.md). It is the rulebook — cite its slugs, never restate its rules. General authoring guidance is in [_docs/writing-guidelines.md](../../../_docs/writing-guidelines.md).
2. Review the named sheets; with none, use the root sheets changed in `git diff --name-only '*.md'`.
3. Run the automated checks:
   ```sh
   pnpm vitest run src/lib/sheetValidation
   ```
4. Read the baselines. A CI pass hides violations recorded in `src/lib/sheetValidation/baseline/*.json`; grep them for each sheet and report matches. Never regenerate baselines to silence findings.
5. Audit by hand every rule not marked 🤖, plus [content organisation](../../../_docs/writing-guidelines.md#content-organisation) and the [writing guidelines](../../../_docs/writing-guidelines.md#writing-guidelines). Verify accuracy against upstream docs or the tool's `--help`, and state the version checked.
6. Report in the format below.

## Report format

One block per sheet, most severe finding first:

```markdown
**superagent.md** — needs rewrite

- (file) `content/priority`: ...
- (line 1) `frontmatter/introduction`: no `intro` or `links`
- (line 9) `cards/size-limits`: one 61-line card, limit 50
```

- One line per finding
- End each sheet with `passes`, `needs fixes`, or `needs rewrite`.
- Don't list what passes unless asked.

## Subagent review

Use when the caller owns the fixes: each round is a fresh read-only subagent, and the caller edits between rounds.

### review-in-subagent($sheets, $max-rounds = 1)

```pseudocode
def review-in-subagent($sheets, $max-rounds = 1) {
  $round = 0
  loop {
    $round += 1
    $report = subagent(review) {
      run /review-devhints-sheet for $sheets
      if the skill is unavailable, read .agents/skills/review-devhints-sheet/SKILL.md and follow it
      use the current worktree; run the automated checks and baseline audit
      return the report in the format above
    }

    if ($report passes) { break }
    fix valid findings in the caller's chat
    run checks; commit and push
    if ($round == $max-rounds) { break }
  }
  return { report: $report, rounds: $round }
}
```

- The subagent is read-only: it never edits, commits, pushes, comments, or spawns further subagents.
- Spawn a fresh subagent per round; never reuse one or run rounds in parallel.
- Callers set `$max-rounds`; never exceed it. Stop early when a round reports `passes`; if the last round still reports findings, the caller fixes the valid ones and reports the rest.
- If a round cannot run (missing sheet, broken checks, unavailable subagent), report the blocker; never treat it as a pass.
