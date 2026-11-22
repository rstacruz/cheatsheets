---
title: Matt Pocock skills
subtitle: Spec-to-PR agent workflow
category: Agents
tier: t2
updated: 2026-11-22
last_verified_with: mattpocock-skills 1.3.2
fragments:
  - "/grill-with-docs"
  - "/to-spec"
  - "/to-tickets"
  - "/implement"
  - "/tdd"
  - "/code-review"
  - "/pr"
  - "/triage"
  - "/wayfinder"
  - "/handoff"
  - "GLOSSARY.md"
  - "docs/adr/"
  - ".scratch/"
keywords: [mattpocock, agent skills, grill-me, to-spec, to-tickets, spec-driven development]
intro: |
  [Matt Pocock skills](https://github.com/mattpocock/skills) run a spec-to-PR workflow: grill the plan, write a spec, slice tickets, implement test-first, review, then open the PR.
links:
  - title: GitHub repository
    url: https://github.com/mattpocock/skills
  - title: Agent skills format
    url: /skills
  - title: Grilling sessions
    url: /grill-me
---

## Getting started

### Install

| Agent | Install command |
| --- | --- |
| Claude Code | `claude plugin install mattpocock-skills@claude-plugins-official` |
| Codex | `codex plugin marketplace add mattpocock/skills`, then `codex plugin add mattpocock-skills@mattpocock` |
| Copilot CLI | `copilot plugin marketplace add mattpocock/skills`, then `copilot plugin install mattpocock-skills@mattpocock` |
| Gemini CLI | `gemini skills install https://github.com/mattpocock/skills.git --path skills/engineering`, plus `skills/productivity` |
| Others | `npx skills@latest add mattpocock/skills -a <agent>` |

See: [Install block](https://github.com/mattpocock/skills/blob/v1.3.2/.agents/install-block.md)

### First run

```text
/setup-matt-pocock-skills
```

Once per repo, before other engineering skills. It explores the repo, confirms answers one section at a time, and writes repo-local markdown. Only the human can invoke it.

See: [Setup skill](https://www.aihero.dev/skills-setup-matt-pocock-skills)

### What setup writes

| Path | Contents |
| --- | --- |
| `docs/agents/issue-tracker.md` | GitHub, GitLab, local markdown, or described workflow |
| `docs/agents/domain.md` | Single- or multi-context doc layout |
| `docs/agents/triage-labels.md` | Label mapping, only with `triage` installed |
| `CLAUDE.md` or `AGENTS.md` | `## Agent skills` block pointing at those files |

See: [Setup SKILL.md](https://github.com/mattpocock/skills/blob/v1.3.2/skills/engineering/setup-matt-pocock-skills/SKILL.md)

## The pipeline

### Flow

```text
/grill-with-docs ─▶ /to-spec ─▶ /to-tickets ─▶ /implement
        │                            │              │
        ├─ GLOSSARY.md, ADRs          │              ├─▶ /code-review
        └─ /wayfinder if multi-session│              └─▶ /pr ─▶ /retro
/triage ─▶ ready-for-agent ─▶ /implement
```

See: [Flow map](https://www.aihero.dev/skills-ask-matt)

### Gates

| Command | End state |
| --- | --- |
| `/grill-with-docs` | frontier empty, user confirms shared understanding |
| `/to-spec` | seam check confirmed, spec published `ready-for-agent` |
| `/to-tickets` | numbered breakdown approved, demoable slices with blocking edges |
| `/implement` | typecheck, single tests, full suite once, review, commit |
| `/code-review` | resolvable fixed point, non-empty diff, two reports |
| `/pr` | body has Summary, before/after Evidence, door and blast radius |

See: [Flow map](https://www.aihero.dev/skills-ask-matt)

### Which command

| Situation | Command |
| --- | --- |
| Unsure which skill fits | `/ask-matt` |
| Idea is fuzzy, no repo | `/grill-me` |
| Fuzzy, in a repo | `/grill-with-docs` |
| Too big for one session | `/wayfinder` |
| Aligned, want it written down | `/to-spec` |
| --- | --- |
| Spec split across sessions | `/to-tickets` |
| Tickets exist, ready to code | `/implement` |
| Whole spec, many tickets | `/implement-spec` |

See: [Router](https://www.aihero.dev/skills-ask-matt)

### Around the flow

| Command | Role |
| --- | --- |
| `/triage` | Moves incoming issues through state roles to `ready-for-agent` |
| `/handoff` | Writes a portable summary into the OS temp dir |
| `/retro` | Suggests changes to the agent's environment after a session |

See: [Triage](https://www.aihero.dev/skills-triage)

## Walkthrough

### Blur to decided

```text
/grill-with-docs add SSO for the admin console
❓ **Q1** - **Identity provider**: Okta, or Google Workspace?
➡️ Google Workspace: staff already have accounts.
❓ **Q2** - **Existing passwords**: keep local login during rollout?
➡️ Keep it for one release, then remove it.
```

Answer by number. Terms settle into `GLOSSARY.md`; only decisions passing all three ADR gates become files.

See: [grill-with-docs](https://www.aihero.dev/skills-grill-with-docs)

[Grill me cheatsheet](./grill-me)
<!-- {: .-crosslink} -->

### Decided to tickets

```text
/to-spec add SSO for the admin console
/to-tickets #42
```

See: [to-spec](https://www.aihero.dev/skills-to-spec)

### Tickets to PR

```text
/implement #43
/code-review main...HEAD
/pr
```

See: [pr](https://www.aihero.dev/skills-pr)

## Planning

### Spec

| Section | Holds |
| --- | --- |
| Problem Statement | The problem from the user's perspective |
| Solution | The solution from the user's perspective |
| User Stories | Numbered "As an actor, I want..." stories |
| Implementation Decisions | Modules, interfaces, constraints, no file paths |
| Testing Decisions | Good-test rule, modules, prior art |
| Out of Scope | Refused work |
| Further Notes | Anything left over |

See: [to-spec](https://www.aihero.dev/skills-to-spec)

### Tickets

| Rule | Meaning |
| --- | --- |
| Tracer bullet | Narrow path through schema, API, UI and tests |
| Demoable | Verifiable on its own |
| Single context | Sized for one fresh context window |
| Blocking edges | Prerequisites; work the frontier first |
| Wide refactor | Expand, migrate in batches, then contract |

See: [to-tickets](https://www.aihero.dev/skills-to-tickets)

### Domain docs

#### Glossary

```md
**Order**:
A request for goods from a customer.
_Avoid_: Purchase, transaction
```

#### ADRs

```md
# Write model
Orders go to Postgres; the read model is projected into Redis.
```

Terms go into `GLOSSARY.md` inline. An ADR needs all three gates: hard to reverse, surprising, a real trade-off.

See: [domain-modeling](https://www.aihero.dev/skills-domain-modeling)

## Building

### Implement

```text
/implement #43        # one ticket, one commit
/implement-spec       # whole spec on an integration branch
```

See: [implement](https://www.aihero.dev/skills-implement)

### TDD loop

| Anti-pattern | Tell |
| --- | --- |
| Implementation-coupled | Breaks on refactor, not behaviour |
| Tautological | Assertion recomputes the expected value |
| Refactor | Belongs in review, not in the loop |

See: [tdd](https://www.aihero.dev/skills-tdd)

### Review and PR

```md
## Summary
<diagram, diff-sketch, or tree>
## Evidence
**Before:** <screenshot or failing run>
**After:** <screenshot or passing run>
## Merge Danger
**Door:** two-way
**Blast Radius:** docs only
```

See: [code-review](https://www.aihero.dev/skills-code-review)

## Gotchas

### Invocation

| Reachable by | Examples |
| --- | --- |
| Human only | `/grill-me`, `/to-spec`, `/implement`, `/triage`, `/setup-matt-pocock-skills` |
| Model or human | `grilling`, `tdd`, `code-review`, `pr` |
| Never | A Skill tool call to a user-invoked skill |

See: [Invocation rules](https://github.com/mattpocock/skills/blob/v1.3.2/.agents/invocation.md)

### Tracker

| Tracker | Ticket store |
| --- | --- |
| GitHub | Issues via `gh` |
| GitLab | Issues via `glab` |
| Local markdown | `.scratch/<feature>/issues/NN-slug.md` |
| Other | Freeform workflow described in prose |

See: [Local tracker template](https://github.com/mattpocock/skills/blob/v1.3.2/skills/engineering/setup-matt-pocock-skills/issue-tracker-local.md)

### Updates

| Route | Update behaviour |
| --- | --- |
| Claude Code plugin | Updates by default |
| Codex plugin | Updates at startup by default |
| Copilot plugin | Needs one-time `autoUpdate: true` |
| VS Code plugin | Updates daily by default |
| skills.sh copy | `npx skills@latest update`, then `add` again |

Re-run setup to switch trackers or restart its config; stale templates can drift from newer skills.

See: [Install block](https://github.com/mattpocock/skills/blob/v1.3.2/.agents/install-block.md)
