---
title: Herdr agents
category: AI
updated: 2026-10-06
keywords:
  - coding agents
  - agent states
  - agent automation
  - integrations
  - terminal
intro: |
  [Herdr](https://herdr.dev) recognizes coding agents running in panes and
  tracks their state. This reference covers the `herdr agent` and
  `herdr integration` commands.
---

## Agents

### Introduction
{: .-intro}

Herdr detects coding agents inside panes, tracks their `idle`, `working`,
`blocked`, `done`, and `unknown` states, and rolls state up to tabs and
workspaces. This reference covers the `herdr agent` command group.

- [Agents](https://herdr.dev/docs/agents/) _(herdr.dev)_
- [Agent automation](https://herdr.dev/docs/agent-automation/) _(herdr.dev)_
- [Integrations](https://herdr.dev/docs/integrations/) _(herdr.dev)_

[Herdr cheatsheet](./herdr)
{: .-crosslink}

### Supported agents

Agents get support in one of two ways: Herdr supports them, or they support
Herdr themselves. Either way you see each agent's `idle`, `working`, and
`blocked` state and can wait on it from scripts.

#### Supported by Herdr, with an integration

| Agent | Integration | Notes |
| --- | --- | --- |
| Claude Code | `claude` | |
| Codex | `codex` | |
| GitHub Copilot CLI | `copilot` | |
| Cursor Agent CLI | `cursor` | |
| OpenCode | `opencode` | also reports state |
| Pi | `pi` | also reports state |
| OMP | `omp` | state requires the integration |
| Droid | `droid` | |
| Devin CLI | `devin` | |
| Kimi Code CLI | `kimi` | also reports state |
| Kilo Code CLI | `kilo` | also reports state |
| Hermes Agent | `hermes` | |
| Qoder CLI | `qodercli` | |
| Qwen Code | `qwen` | |
| Letta Code | `letta` | CLI install only |
| MastraCode | `mastracode` | state requires the integration |
| Grok CLI | `grok` | |
| Antigravity CLI | `antigravity-cli` | |

#### Detected, state only

These agents get state detection without an integration: Amp, Kiro CLI,
Maki, and Gemini CLI and Cline (both less tested).

#### Supported by the agent

These agents report their own state; there is nothing to install.

- [Crush](https://github.com/charmbracelet/crush)
- Command Code
- Muse
- [Prime Agent](https://github.com/PrimeIntellect-ai/prime-agent)

An agent that also reports its resume command comes back in the same session
after a server restart.

Agents Herdr does not recognize still run normally in panes; they just show
up as plain terminals.

### Start an agent

```bash
herdr agent start reviewer --kind codex --pane w1:p2
herdr agent start reviewer --kind codex --pane w1:p2 --timeout 30000
herdr agent start reviewer --kind claude --pane w1:p2 \
  -- --model sonnet
```

The pane must be an available interactive shell at its prompt. `agent start`
never creates, splits, or moves layout. It returns once the expected agent is
detected in the same terminal and is ready for input; the startup timeout
defaults to 30000 ms (max 300000).

#### Kinds

| Kind | Agent |
| --- | --- |
| `claude` | Claude Code |
| `codex` | Codex |
| `copilot` | GitHub Copilot CLI |
| `cursor` | Cursor Agent CLI |
| `opencode` | OpenCode |
| `pi` | Pi |
| `omp` | OMP |
| --- | --- |
| `droid` | Droid |
| `devin` | Devin CLI |
| `kimi` | Kimi Code CLI |
| `kilo` | Kilo Code CLI |
| `hermes` | Hermes Agent |
| `qodercli` | Qoder CLI |
| `qwen` | Qwen Code |
| --- | --- |
| `letta` | Letta Code |
| `mastracode` | MastraCode |
| `grok` | Grok CLI |
| `agy` | Antigravity CLI |
| `amp` | Amp |
| `kiro` | Kiro CLI |
| `maki` | Maki |
| `gemini` | Gemini CLI |
| `cline` | Cline |
| `muse` | Muse |

Names must match `[a-z][a-z0-9_-]{0,31}` and be unique among live agents.
A name follows the current pane occupant and clears when the agent exits,
is released, or is replaced. Targets accept a unique live agent name or the
pane ID currently hosting the agent; terminal IDs and bare kind labels are
not accepted.

### Prompt and wait

```bash
herdr agent prompt reviewer "Review the current diff." --wait
herdr agent prompt reviewer "Ship it" --wait --timeout 120000
herdr agent prompt reviewer "Keep going" --wait --until working
herdr agent wait reviewer --until blocked --timeout 120000
```

`--wait` settles on the first `idle`, `done`, or `blocked` state. `--until`
can be repeated for specific states. Submitting to an already-blocked agent
is rejected with `agent_blocked` before any input is sent.

When an accepted prompt starts from another non-working state, `--wait`
requires an observed `working` or `blocked` state within 5 s; otherwise it
returns `agent_prompt_stalled`. A caller `--timeout` that expires first
returns `timeout`. The wait tracks lifecycle state, not one turn — if the
agent is already working, that turn's completion may match.

Standalone `agent wait` matches the same settled defaults; add `--until` for
a state-specific wait. Without `--timeout` it waits indefinitely.

### States

| State | Meaning |
| --- | --- |
| `idle` | Ready for input; seen in the UI |
| `working` | Actively running |
| `blocked` | Needs input, approval, or a decision |
| `done` | Finished; you have not looked at it yet |
| `unknown` | Present, but Herdr cannot classify it |

`idle` and `done` are the same underlying state; `done` is the unseen
variant. Focusing the tab or targeting the pane with a focus command marks
it seen; CLI reads do not.

The sidebar rolls state up: a `blocked` agent makes its pane, tab, and
workspace look blocked, a `working` agent makes the workspace active, and a
`done` agent stays visible until you view it.

### Inspect

```bash
herdr agent list
herdr agent get reviewer
herdr agent read reviewer --source recent-unwrapped --lines 120
herdr agent explain reviewer
herdr agent explain --file screen.txt --agent codex --json
```

#### Read sources

| Source | Returns |
| --- | --- |
| `visible` | Currently rendered viewport |
| `recent` | Recent output, including soft wraps |
| `recent-unwrapped` | Recent output, soft wraps joined |
| `detection` | Bottom-buffer snapshot used for detection |

`agent get` shows the resolved agent and its state. `agent explain` reports
detection state, the matched rule, and why an idle fallback happened. Use
`--format ansi` (or `--ansi`) when colors and styling are evidence.

### Keys and focus

```bash
herdr agent send-keys reviewer esc
herdr agent send-keys reviewer ctrl+c
herdr agent focus reviewer
herdr agent rename reviewer reviewer-2
herdr agent rename reviewer --clear
herdr agent attach reviewer --takeover
```

Herdr validates all keys before writing any bytes to the pane. Inspect a
blocked agent with `agent get` and `agent read` before deciding what input
to send. `attach` takes over the current terminal; detach with `ctrl+b q`,
and send a literal `ctrl+b` with `ctrl+b ctrl+b`. Use `--takeover` when
another attach client already owns input.

[Herdr keys cheatsheet](./herdr-keys)
{: .-crosslink}

### Integrations

```bash
herdr integration install claude
herdr integration uninstall claude
herdr integration status --outdated-only
```

Install values: `pi`, `omp`, `claude`, `codex`, `copilot`, `devin`,
`droid`, `kimi`, `opencode`, `kilo`, `hermes`, `qodercli`, `qwen`,
`cursor`, `mastracode`, `antigravity-cli`, `grok`, `letta`.

Every integration tells Herdr which session the agent is in, so the same
session resumes after a server restart. Turn that off with
`[session] resume_agents_on_restore = false`.

The Pi, OMP, Kimi, OpenCode, Kilo, and MastraCode integrations also report
state; while they report, Herdr uses that instead of reading the screen.
The others leave state to screen detection.

### Patterns

#### New tab, start, prompt

```bash
PANE=$(herdr tab create --workspace "$HERDR_WORKSPACE_ID" \
  | jq -r '.result.root_pane.pane_id') \
  && herdr agent start reviewer --kind omp --pane "$PANE" \
  && herdr agent prompt reviewer "Review the diff." --wait
```

#### Split pane, start agent

```bash
PANE=$(herdr pane split --current --direction right --cwd "$PWD" \
  --no-focus | jq -r '.result.pane.pane_id') \
  && herdr agent start reviewer --kind claude --pane "$PANE" \
  -- --model sonnet
```

#### Prompt, then read

```bash
herdr agent prompt reviewer "Summarize the failing tests." --wait \
  --timeout 120000
herdr agent read reviewer --source recent-unwrapped --lines 120
```

#### Wait until blocked

```bash
herdr agent wait reviewer --until blocked --timeout 120000
herdr agent get reviewer
herdr agent read reviewer --source detection --lines 40
```

Herdr returns JSON; extract IDs with `jq`, and target a unique agent name,
an explicit pane ID, or `--current` rather than the UI-focused pane.
