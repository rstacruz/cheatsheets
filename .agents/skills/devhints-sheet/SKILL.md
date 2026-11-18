---
name: devhints-sheet
description: Guides editing devhints.io cheatsheet *.md files and reviewing sheet PRs, covering formatting checks, table shortcuts, and output verification. Use when editing *.md sheets or reviewing sheet PRs.
---

# Devhints sheet authoring

Full rules live in [_docs/writing-guidelines.md](../../../_docs/writing-guidelines.md) and [_docs/markdown-dialect.md](../../../_docs/markdown-dialect.md). This checklist covers the fixes that come up in review.

## Review checklist

- [ ] `data-line` values point to lines inside the fenced block; no off-by-one.
- [ ] Code lines stay short; add `.-wrap` when they still overflow.
- [ ] Break long `const f = (x) => ...` lines into `=> (` … `)` blocks.
- [ ] Split setup from use into separate pre blocks, each with an H4 label.
- [ ] Split oversized `All options` cards, and trim trailing prose.

## Output verification

1. Run the example against the real runtime.
2. Capture its actual output.
3. Paste that output verbatim into the sheet, watching for NBSP and other invisible characters.
