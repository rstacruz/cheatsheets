---
title: How to run OpenAI Codex headless
link_title: OpenAI Codex headless tasks
subtitle: Run Codex from scripts
logo: { src: /assets/logos/codex.svg, mono: true }
category: Agents
layout: snippet
last_verified_with: "codex-cli 0.171.0."
updated: 2026-11-23
last_verified_at: 2026-11-23
tier: t1
fragments:
  - "codex exec"
  - "--json"
  - "-o summary.md"
  - "git diff |"
  - "review this diff"
  - "--sandbox"
  - "workspace-write"
  - "summary.md"
  - "codex"
  - "summarize"
  - "failing tests"
  - "exec"
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

**Runs one prompt non-interactively.** Prints the final agent message to stdout. See [non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode).

### Review a diff
<!-- {: .-snippet} -->

```bash
git diff | codex exec "review this diff"
```
<!-- {: data-highlight="git diff"} -->

**Reviews a diff from stdin.** Pipes the diff as additional context; progress goes to stderr. See [non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode).

### JSON events
<!-- {: .-snippet} -->

```bash
codex exec --json "list failing tests"
```
<!-- {: data-highlight="--json"} -->

**Streams machine-readable events.** Emits JSONL for scripts, including thread and turn events. See [non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode).

### Save the final message
<!-- {: .-snippet} -->

```bash
codex exec -o summary.md "summarize this repo"
```
<!-- {: data-highlight="-o"} -->

**Saves the final message.** Writes it to a file; runs are read-only unless `--sandbox workspace-write` is set. See [non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode).
