---
title: How to run OpenCode headless
link_title: OpenCode headless tasks
subtitle: Run OpenCode from scripts
category: Task automation
layout: snippet
last_verified_with: "opencode 2.4.1."
updated: 2026-11-23
tier: t1
fragments:
  - "opencode run"
  - "opencode"
  - "run"
  - "list TODOs"
  - "--continue"
  - "go on"
  - "| jq"
  - "--format json"
  - "json"
  - "review the diff"
  - "--standalone"
  - "this repo"
  - "explain this"
  - "--format"
  - "standalone"
links:
  - title: opencode run
    url: https://opencode.ai/docs/cli/commands#run
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

### Standalone CI run
<!-- {: .-snippet} -->

```bash
opencode run --standalone "review the diff"
```
<!-- {: data-highlight="--standalone"} -->

**Isolates the run in its own server.** Keeps secrets and sessions out of the shared daemon. See [opencode run](https://opencode.ai/docs/cli/commands#run).
