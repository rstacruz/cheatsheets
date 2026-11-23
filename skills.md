---
title: Agent skills
subtitle: On-demand agent instructions
category: Agents
tags: [Featured]
updated: 2026-11-11
last_verified_with: "Agent Skills specification (unversioned)."
tier: t2
fragments:
  - "SKILL.md"
  - "name:"
  - "description:"
  - ".claude/skills/"
  - ".agents/skills/"
  - "allowed-tools"
  - "references/"
  - "scripts/"
  - "assets/"
  - "context: fork"
  - "license"
  - "compatibility"
  - "metadata"
  - "paths:"
keywords:
  - SKILL.md
  - agent skills
  - progressive disclosure
  - Claude Code skills
  - Codex skills
intro: |
  [Agent Skills](https://agentskills.io) is an open standard for instructions, scripts, and references loaded on demand. This reference covers layout, frontmatter, writing patterns, and discovery.
links:
  - title: Agent Skills specification
    url: https://agentskills.io/specification
  - title: Authoring best practices
    url: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
  - title: anthropics/skills
    url: https://github.com/anthropics/skills
---

## Getting started

### Anatomy

```
skill-name/
├── SKILL.md
├── scripts/
├── references/
└── assets/
```

`SKILL.md` is required; the rest are optional. Scripts execute without loading into context, references load on demand, and assets land in output.

See: [Skill structure](https://agentskills.io/specification)

### Sample skill

```md
---
name: summarize-changes
description: >
  Summarizes uncommitted changes. Use when asked what changed.
---

Run `git diff HEAD`, then list the risks.
```

Frontmatter first, then plain instructions. The body loads only when the skill activates.

See: [SKILL.md format](https://agentskills.io/specification)

### Locations

| Path                 | Harness     | Scope   |
| -------------------- | ----------- | ------- |
| `.claude/skills/`    | Claude Code | project |
| `~/.claude/skills/`  | Claude Code | user    |
| `.agents/skills/`    | Codex       | project |
| `~/.agents/skills/`  | Codex       | user    |
| `.gemini/skills/`    | Gemini CLI  | project |
| `~/.gemini/skills/`  | Gemini CLI  | user    |
| -------------------- | ----------- | ------- |
| `.cursor/skills/`    | Cursor      | project |
| `~/.cursor/skills/`  | Cursor      | user    |
| `.github/skills/`    | Copilot     | project |
| `~/.copilot/skills/` | Copilot     | user    |
<!-- {: .-headers} -->

Codex and Claude Code also scan parent directories; most harnesses read `.agents/skills/`. Review `allowed-tools` and scripts before trusting a repo skill.

See: [Claude Code skills](https://code.claude.com/docs/en/skills), [Codex skill locations](https://learn.chatgpt.com/docs/build-skills#where-to-save-skills)

## Frontmatter

### Fields

| Field | Required | Rules |
| --- | --- | --- |
| `name` | yes | 1–64 chars, lowercase, matches folder |
| `description` | yes | 1–1024 chars, what and when |
| `license` | no | name or bundled file |
| `compatibility` | no | environment needs, 500 chars |
| `metadata` | no | string map for client data |
| `allowed-tools` | no | pre-approved tools (experimental) |
<!-- {: .-headers} -->

Names use lowercase letters, numbers, and single hyphens. `PDF-Processing`, `-pdf`, and `pdf--processing` are invalid.

See: [Frontmatter fields](https://agentskills.io/specification)

### Claude Code

```yaml
# Use one invocation flag, not both
disable-model-invocation: true   # only /name runs it
# user-invocable: false          # only the model runs it
paths: "src/**/*.ts"             # activate on matching files
context: fork                    # run in a subagent
```
<!-- {: data-highlight="disable-model-invocation; paths; context: fork"} -->

These extras work in Claude Code, but claude.ai uploads and the Skills API accept only the six spec fields.

See: [Frontmatter reference](https://code.claude.com/docs/en/skills#frontmatter-reference)

### Codex

#### agents/openai.yaml

```yaml
interface:
  display_name: "Release notes"
policy:
  allow_implicit_invocation: false
```
<!-- {: data-highlight="display_name; allow_implicit_invocation"} -->

Codex keeps UI metadata and invocation policy in `agents/openai.yaml`.

See: [Optional metadata](https://learn.chatgpt.com/docs/build-skills#optional-metadata)

## Writing

### Descriptions

```yaml
description: >
  Extracts text and tables from PDFs, fills forms, and merges files.
  Use when the user mentions PDFs, forms, or document extraction.
```
<!-- {: data-highlight="description"} -->

Lead with the capability, then words a user would type. Third person: the description is injected into the system prompt. `Helps with documents` never triggers.

See: [Optimizing descriptions](https://agentskills.io/skill-creation/optimizing-descriptions)

### Progressive disclosure

| Stage | Loads | Budget |
| --- | --- | --- |
| Discovery | every skill's name and description | ~100 tokens |
| Activation | the full `SKILL.md` | under 5k tokens |
| Execution | `scripts/`, `references/` | none until read |
<!-- {: .-headers} -->

Keep `SKILL.md` under 500 lines, keep references one level deep, and say when to read each file.

See: [Progressive disclosure](https://agentskills.io/specification#progressive-disclosure)

### Gotchas

```md
## Gotchas

- `users` uses soft deletes: filter `WHERE deleted_at IS NULL`.
- `user_id` (db), `uid` (auth), `accountId` (billing) are one value.
- `/health` returns 200 with the database down; use `/ready`.
```

Usually the highest-value section: add a line every time an agent gets something wrong it could not have guessed.

See: [Gotchas sections](https://agentskills.io/skill-creation/best-practices#gotchas-sections)

## Workflows

### Loops

```md
- [ ] Analyze the form: `scripts/analyze.py input.pdf`
- [ ] Map fields into `fields.json`
- [ ] Validate the mapping
- [ ] Fill and verify the output
```

Validation is the gate: a script checks the plan against the source of truth before anything is written. Fix and re-run until it passes.

See: [Plan, validate, execute](https://agentskills.io/skill-creation/best-practices#plan-validate-execute)

### Scripts

```bash
python scripts/analyze.py input.pdf > fields.json
```
<!-- {: data-highlight="scripts/analyze.py"} -->

Non-interactive only: flags, env vars, or stdin. Data to stdout, diagnostics to stderr, `--help` works, and say whether to run or read it.

See: [Using scripts](https://agentskills.io/skill-creation/using-scripts)

## Testing

### Trigger evals

```json
[
  { "query": "extract tables from this PDF", "should_trigger": true },
  { "query": "rename this branch", "should_trigger": false }
]
```
<!-- {: data-highlight="should_trigger"} -->

Write about 20 queries (8–10 positive, 8–10 negative), run each three times, and keep a 60/40 train/validation split.

See: [Optimizing descriptions](https://agentskills.io/skill-creation/optimizing-descriptions)

### Output evals

```json
{
  "id": 1,
  "prompt": "Extract text from document.pdf",
  "files": ["evals/files/document.pdf"],
  "expected_output": "Every page read; text saved to output.txt"
}
```
<!-- {: data-highlight="expected_output"} -->

Cases live in `evals/evals.json`. Run each with and without the skill, grade the assertions, and read the traces; wasted exploration means vague instructions.

See: [Evaluating skills](https://agentskills.io/skill-creation/evaluating-skills)

## References

- [Specification](https://agentskills.io/specification)
- [Best practices](https://agentskills.io/skill-creation/best-practices)
- [Anthropic authoring guide](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [Claude Code skills](https://code.claude.com/docs/en/skills)
- [Codex skills](https://learn.chatgpt.com/docs/build-skills)
- [OpenAI Skills API](https://developers.openai.com/api/docs/guides/tools-skills)
- [Cursor skills](https://cursor.com/docs/skills)
- [Gemini CLI skills](https://geminicli.com/docs/cli/skills/)
- [Copilot agent skills](https://docs.github.com/en/copilot/concepts/customizations/agent-skills)
- [anthropics/skills](https://github.com/anthropics/skills)
- [Claude Code cheatsheet](./claude-code) _(devhints.io)_
- [Codex cheatsheet](./codex) _(devhints.io)_
