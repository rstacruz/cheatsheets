---
title: Codex headless tasks
h1_title: How to run Codex headless
subtitle: Run Codex from scripts
category: Task automation
layout: snippet
last_verified_with: "codex-cli 0.171.0."
updated: 2026-11-23
links:
  - title: Codex non-interactive mode
    url: https://learn.chatgpt.com/docs/non-interactive-mode
---

## Headless runs
<!-- {: .-snippets} -->

### One-shot prompt
<!-- {: .-snippet} -->

```bash
codex exec "summarize this repo"
```
<!-- {: data-highlight="codex exec"} -->

Runs non-interactively and prints the final agent message to stdout. See [non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode).

### Review a diff
<!-- {: .-snippet} -->

```bash
git diff | codex exec "review this diff"
```
<!-- {: data-highlight="git diff"} -->

Pipes the diff as additional context; progress goes to stderr. See [non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode).

### JSON events
<!-- {: .-snippet} -->

```bash
codex exec --json "list failing tests"
```
<!-- {: data-highlight="--json"} -->

Emits JSONL events for scripts, including thread and turn events. See [non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode).

### Save the final message
<!-- {: .-snippet} -->

```bash
codex exec -o summary.md "summarize this repo"
```
<!-- {: data-highlight="-o"} -->

Writes the final message to a file; runs are read-only unless `--sandbox workspace-write` is set. See [non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode).
