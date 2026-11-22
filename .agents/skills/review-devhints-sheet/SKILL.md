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

- **`cards/size-limits`** — one 61-line card, limit 50. `superagent.md:9` [auto]
- **`frontmatter/introduction`** — no `intro` or `links`. `superagent.md:1` [manual]
```

- One line per finding: slug, problem, `file:line`.
- Tag automated findings `[auto]`, judgement calls `[manual]`.
- Unmapped findings use `content/priority`, `content/accuracy`, `content/consistency`, `content/links`, `content/staleness`, or `content/minor`.
- `fragments` and `frontmatter/h3-links` are required only on [tiered sheets](../../../_docs/tiers.md); on untiered sheets they are advisory, not violations.
- End each sheet with `passes`, `needs fixes`, or `needs rewrite`.
- Don't list what passes unless asked.
