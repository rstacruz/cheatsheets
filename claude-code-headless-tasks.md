---
title: Claude Code headless tasks
h1_title: How to run Claude Code headless
subtitle: Run Claude Code from scripts
category: Task automation
layout: snippet
last_verified_with: "Claude Code 2.1.330."
updated: 2026-11-23
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

`-p` prints the answer and exits; pipe context in through stdin. See [headless mode](https://code.claude.com/docs/en/headless).

### Review a diff
<!-- {: .-snippet} -->

```bash
git diff | claude -p "review this diff for bugs"
```
<!-- {: data-highlight="git diff"} -->

Pipes the diff as context and returns a review. See [headless mode](https://code.claude.com/docs/en/headless).

### JSON output
<!-- {: .-snippet} -->

```bash
claude -p "list failing tests" --output-format json
```
<!-- {: data-highlight="--output-format json"} -->

Returns a JSON envelope with `result`, session, and cost fields. See the [CLI reference](https://code.claude.com/docs/en/cli-reference).

### Pre-approve tools
<!-- {: .-snippet} -->

```bash
claude -p "fix the lint errors" \
  --allowedTools "Read,Edit,Bash"
```
<!-- {: data-highlight="--allowedTools"} -->

Headless runs cannot answer prompts, so pre-approve only the tools the task needs. See [headless mode](https://code.claude.com/docs/en/headless).
