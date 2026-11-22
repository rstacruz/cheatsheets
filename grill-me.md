---
title: Grill me
subtitle: Relentless design interview
category: Agents
tier: t2
updated: 2026-11-22
last_verified_with: mattpocock-skills 1.3.2
fragments:
  - "/grill-me"
  - "grill-with-docs"
  - "design tree"
  - "frontier"
  - "rounds"
  - "Q1"
  - "recommendation"
  - "facts"
  - "decisions"
  - "understanding"
  - "I don't know"
  - "prototype"
  - "plan mode off"
  - "one at a time"
  - "GLOSSARY.md"
  - "docs/adr/"
  - "ungrillable"
  - "dumb zone"
keywords: [grill-me, grilling, design tree, frontier, requirements interview, plan review]
intro: |
  `/grill-me` interviews you about a loose idea in rounds until every branch of the design tree is settled. No repo or files are needed.
links:
  - title: Grilling docs
    url: https://www.aihero.dev/skills-grilling
  - title: SKILL.md
    url: https://github.com/mattpocock/skills/blob/v1.3.2/skills/productivity/grilling/SKILL.md
  - title: Agent skills format
    url: /skills
  - title: Matt Pocock skills
    url: /mattpocock-skills
---

## Getting started

### What it does

| Start with | End with |
| --- | --- |
| A loose idea, not a plan | Decisions you can commit to |
| A fresh conversation | The same conversation handed to `/to-spec` |
| No repo | Nothing written to disk |

It runs the `grilling` primitive under another name. You type `/grill-me`; the agent never invokes it on its own. The session is stateless, so the result stays in the conversation.

See: [grill-me docs](https://www.aihero.dev/skills-grill-me)

### Front doors

| What is in front of you | Reach for |
| --- | --- |
| Anything, anywhere | `/grill-me` |
| A repo, one session | `/grill-with-docs` |
| Too big for one session | `/wayfinder` |
| A question you must see or feel | `/prototype` |
| A bare interview | `/grilling` |

`grill-me` and `grill-with-docs` are the two user-invoked front doors; both run the same interview. Wayfinder and prototype are separate routes.

See: [Front doors](https://www.aihero.dev/skills-grilling)

[Matt Pocock skills cheatsheet](./mattpocock-skills)
<!-- {: .-crosslink} -->

### The round

```text
❓ **Q1** - **<question title>**: <question body>

➡️ <your recommended answer>

---

❓ **Q2** - **<question title>**: <question body>

➡️ <your recommended answer>
```

The whole frontier arrives at once. Each question is numbered, titled, and followed by a recommendation on its own `➡️` line. Word questions so "yes" accepts the recommendation.

See: [grilling SKILL.md](https://github.com/mattpocock/skills/blob/v1.3.2/skills/productivity/grilling/SKILL.md)

### A worked round

```text
❓ **Q1** - **Identity provider**: Okta, or Google Workspace?
➡️ Google Workspace: staff already have accounts.

You: 1 yes

❓ **Q2** - **Existing passwords**: keep local login during rollout?
➡️ Keep it for one release, then remove it.

You: 2 keep it for one release
```

The next round contains only questions those two answers unblocked. Later rounds build on earlier ones instead of restating them.

See: [grill-me docs](https://www.aihero.dev/skills-grill-me)

## How it runs

### Tree and frontier

```text
storage
├── where: Postgres or SQLite?
│   └── migrations: which tool?
└── retention: how long?
    └── delete: hard or soft?
```

A decision branches into the decisions hanging off it. The frontier is every branch whose prerequisites are settled; a round asks all of it. Questions depending on another open question wait for a later round.

See: [Tree, frontier, rounds](https://www.aihero.dev/skills-grilling)

### Facts vs decisions

| Concern | Owner | Move |
| --- | --- | --- |
| Fact | Agent | Dispatch a sub-agent with fresh context |
| Decision | You | Put it to you, then wait |
| Async mode | Nobody | No consolidated memo in your absence |

A running exploration is an unsettled prerequisite. Only the questions downstream of it wait; the rest of the frontier still gets asked. An agent answering its own decisions has broken the skill.

See: [Facts vs decisions](https://www.aihero.dev/skills-grilling)

## Running one well

### Answering a round

| Answer | Meaning |
| --- | --- |
| `1 yes` | Accept the recommendation for Q1 |
| `1 no` | Reject it |
| `2 the second option` | Pick a listed alternative |
| "answer the recommendation" | Use when the recommendation argues against its own question |

Numbered answers work because the format is fixed. Add a reason when it changes what the agent asks next.

See: [The round](https://www.aihero.dev/skills-grilling)

### Steering

| Move | Why |
| --- | --- |
| Push back on a vague question | Scope belongs to you |
| Say "I don't know" | A real answer; often a prototype signal |
| Count rounds, not questions | Forty-six questions over four rounds is ordinary |
| Around 200 questions | Scope is too big; split it and grill the pieces |
| No question cap | A cap is out of scope on purpose |

Long sessions drift into the dumb zone, where questions get worse. Ask it to wrap up, or accept the plan where it stands. Passive "agreed, agreed, agreed" answers produce confident nonsense.

See: [Long sessions and passivity](https://www.aihero.dev/skills-grill-me)

### Ungrillable

| Question | Move |
| --- | --- |
| "How should this interaction feel?" | Stop asking, build a throwaway |
| "One long form or three pages?" | Use `/prototype`, look, then answer in one line |

Talking cannot settle a question that needs something to react to. Building the throwaway is faster than rephrasing the same question.

See: [Grillable and ungrillable](https://www.aihero.dev/skills-grill-me)

## Paper trail

### What lands where

| Resolved | Lands in |
| --- | --- |
| A project term | `GLOSSARY.md`, inline, the moment it resolves |
| Hard to reverse, surprising, a real trade-off | `docs/adr/NNNN-slug.md` |
| Everything else | The conversation, and nowhere else |
<!-- {: .-headers} -->

Only `grill-with-docs` writes these files. `/grill-me` leaves no workspace behind, so feed its conversation straight to `/to-spec` if you want a durable record.

See: [The paper trail](https://www.aihero.dev/skills-grill-with-docs)

### Glossary shape

```md
**Order**:
A request for goods from a customer.
_Avoid_: Purchase, transaction
```

One or two sentences define what a term *is*. Keep project-specific terms only; implementation detail and specs do not belong in the glossary.

See: [GLOSSARY-FORMAT.md](https://github.com/mattpocock/skills/blob/v1.3.2/skills/engineering/domain-modeling/GLOSSARY-FORMAT.md)

### ADR shape

```md
# Short title of the decision

Context, decision, and reason in one to three sentences.
```

Files are numbered `docs/adr/NNNN-slug.md`. All three gates must pass, so most sessions produce none; a sharper glossary with zero ADRs is normal.

See: [ADR-FORMAT.md](https://github.com/mattpocock/skills/blob/v1.3.2/skills/engineering/domain-modeling/ADR-FORMAT.md)

## Gotchas

### Plan mode off

| Setting | Effect |
| --- | --- |
| Plan mode on | The agent hurries to produce a plan |
| Plan mode off | Rounds continue until the frontier is empty |

The session ends when every branch is visited. The agent then asks you to confirm shared understanding before it acts; it does not start building on its own.

See: [Start a fresh conversation](https://www.aihero.dev/skills-grill-me)

### Dependencies

| Skill | Needs |
| --- | --- |
| `/grill-me` | `grilling` |
| `/grill-with-docs` | `grilling` and `domain-modeling` |
| Partial load | Good interview, no paper trail |

A one-line wrapper delegates with a Skill tool call. Selective installs miss the primitives; ask the agent which skills it loaded if the round has no recommendations.

See: [Invocation rules](https://github.com/mattpocock/skills/blob/v1.3.2/.agents/invocation.md)

[Agent skills cheatsheet](./skills)
<!-- {: .-crosslink} -->

### One at a time

```yaml
# add to your global CLAUDE.md
When grilling, ask one question at a time.
```

The round-based default is a supported setting, not the only mode. Readers who prefer a slower cadence use this opt-out.

See: [One question at a time](https://www.aihero.dev/skills-grilling)

### Passivity

| Signal | Response |
| --- | --- |
| "Agreed, agreed, agreed" | Push back or ask for more detail |
| Scope drifting | Say so in the round |
| End with no disagreement | You did not need the session |

The quality of your answers decides the result. A long interview is not evidence that you decided anything.

See: [A conversation, not an interview](https://www.aihero.dev/skills-grill-me)
