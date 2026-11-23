---
title: How to run OpenCode headless
link_title: OpenCode headless tasks
subtitle: Run OpenCode from scripts
category: Task automation
layout: snippet
last_verified_with: "opencode 2.3.2."
updated: 2026-11-23
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

Sends one prompt, prints the reply, and exits. See [opencode run](https://opencode.ai/docs/cli/commands#run).

### Continue a session
<!-- {: .-snippet} -->

```bash
opencode run --continue "go on"
```
<!-- {: data-highlight="--continue"} -->

Continues the latest session instead of starting a new one. See [opencode run](https://opencode.ai/docs/cli/commands#run).

### JSON output
<!-- {: .-snippet} -->

```bash
opencode run --format json "list TODOs" | jq
```
<!-- {: data-highlight="--format json"} -->

Emits one JSON object per line for scripts and `jq`. See [opencode run](https://opencode.ai/docs/cli/commands#run).

### Standalone CI run
<!-- {: .-snippet} -->

```bash
opencode run --standalone "review the diff"
```
<!-- {: data-highlight="--standalone"} -->

Gives the run its own server, which keeps secrets and sessions out of the shared daemon. See [opencode run](https://opencode.ai/docs/cli/commands#run).
