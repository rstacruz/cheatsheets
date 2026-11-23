---
name: review-devhints-sheet
description: Reviews devhints.io sheets against the writing guidelines and reports each violation with its rule slug. Use when evaluating or reviewing *.md sheets, reviewing a sheet PR, or asked to review or lint a sheet.
---

# Review devhints sheets

Report violations; fix only when asked.

## Workflow

1. Read [_docs/writing-guidelines.md](../../../_docs/writing-guidelines.md#rules). It is the rulebook — cite its slugs, never restate its rules.
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
