---
title: How to run OpenCode headless
link_title: OpenCode headless tasks
subtitle: Run OpenCode from scripts
logo: { src: /assets/logos/opencode.svg, mono: true }
category: Agents
layout: snippet
last_verified_with: "opencode 2.4.1."
created_at: 2026-11-23
updated: 2026-11-23
last_verified_at: 2026-11-26
tier: t1
fragments:
  - "opencode run"
  - "opencode"
  - "run"
  - "explain this"
  - "this repo"
  - "--continue"
  - "go on"
  - "--format json"
  - "--format"
  - "json"
  - "list TODOs"
  - "| jq"
  - "jq"
links:
  - title: opencode run
    url: https://opencode.ai/docs/cli/commands#run
intro: |
  [`opencode run`](https://opencode.ai/docs/cli/commands#run) executes one-shot prompts without opening the TUI. This sheet covers JSON output and session continuation.
---

## Headless runs
<!-- {: .-snippets} -->

### One-shot prompt
<!-- {: .-snippet} -->

```bash
opencode run "explain this repo"
```
<!-- {: data-highlight="opencode run"} -->

**Runs OpenCode non-interactively.** Sends one prompt, prints the reply, and exits. See [opencode run](https://opencode.ai/docs/cli/commands#run).

### Continue a session
<!-- {: .-snippet} -->

```bash
opencode run --continue "go on"
```
<!-- {: data-highlight="--continue"} -->

**Resumes the last session.** Continues it instead of starting a new one. See [opencode run](https://opencode.ai/docs/cli/commands#run).

### JSON output
<!-- {: .-snippet} -->

```bash
opencode run --format json "list TODOs" | jq
```
<!-- {: data-highlight="--format json"} -->

**Emits JSON lines for scripts.** Produces one JSON object per line for `jq`. See [opencode run](https://opencode.ai/docs/cli/commands#run).
