---
title: How to run Claude Code headless
link_title: Claude Code headless tasks
subtitle: Run Claude Code from scripts
category: Agents
layout: snippet
last_verified_with: "Claude Code 2.1.330."
updated: 2026-11-23
tier: t1
fragments:
  - "claude -p"
  - "-p"
  - "--output-format"
  - "json"
  - "--allowedTools"
  - "Read,Edit,Bash"
  - "git diff |"
  - "review this diff"
  - "summarize"
  - "fix the lint"
  - "failing tests"
  - "claude"
links:
  - title: Claude Code headless mode
    url: https://code.claude.com/docs/en/headless
  - title: Claude Code CLI reference
    url: https://code.claude.com/docs/en/cli-reference
---

## Headless runs
<!-- {: .-snippets} -->

### One-shot prompt
<!-- {: .-snippet} -->

```bash
claude -p "summarize the failing tests"
```
<!-- {: data-highlight="-p"} -->

**Runs one prompt and exits.** `-p` prints the answer; pipe context in through stdin. See [headless mode](https://code.claude.com/docs/en/headless).

### Review a diff
<!-- {: .-snippet} -->

```bash
git diff | claude -p "review this diff for bugs"
```
<!-- {: data-highlight="git diff"} -->

**Reviews a diff from stdin.** Pipes the diff as context and returns a review. See [headless mode](https://code.claude.com/docs/en/headless).

### JSON output
<!-- {: .-snippet} -->

```bash
claude -p "list failing tests" \
  --output-format json
```
<!-- {: data-highlight="--output-format json"} -->

**Emits a JSON result.** Returns an envelope with `result`, session, and cost fields. See the [CLI reference](https://code.claude.com/docs/en/cli-reference).

### Pre-approve tools
<!-- {: .-snippet} -->

```bash
claude -p "fix the lint errors" \
  --allowedTools "Read,Edit,Bash"
```
<!-- {: data-highlight="--allowedTools"} -->

**Pre-approves tools for unattended runs.** Headless runs cannot answer prompts, so list only the tools the task needs. See [headless mode](https://code.claude.com/docs/en/headless).
