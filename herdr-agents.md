---
title: Herdr agents
category: Agents
updated: 2026-11-15
tier: t2
keywords:
  - coding agents
  - agent states
  - agent automation
  - integrations
  - terminal
intro: |
  Herdr detects coding agents inside panes, tracks their `idle`, `working`,
  `blocked`, `done`, and `unknown` states, and rolls state up to tabs and
  workspaces. This reference covers the `herdr agent` command group.
links:
  - title: Agents
    url: https://herdr.dev/tui/docs/agents/
  - title: Agent automation
    url: https://herdr.dev/tui/docs/agent-automation/
  - title: Integrations
    url: https://herdr.dev/tui/docs/integrations/
  - title: Herdr cheatsheet
    url: "./herdr"
---

## Agents

### Supported agents

- Herdr supports the agent, or the agent supports Herdr
- Either way you see `idle`, `working`, and `blocked`, and can wait on it from scripts

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
| --- | --- | --- |
| Droid | `droid` | |
| Devin CLI | `devin` | |
| Kimi Code CLI | `kimi` | also reports state |
| Kilo Code CLI | `kilo` | also reports state |
| Hermes Agent | `hermes` | |
| Qoder CLI | `qodercli` | |
| Qwen Code | `qwen` | |
| --- | --- | --- |
| Letta Code | `letta` | CLI install only |
| MastraCode | `mastracode` | state requires the integration |
| Grok CLI | `grok` | |
| Antigravity CLI | `antigravity-cli` | |

#### Detected, state only

- Amp
- Kiro CLI
- Maki
- Gemini CLI (less tested)
- Cline (less tested)

#### Supported by the agent

- [Command Code](https://commandcode.ai)
- [Crush](https://github.com/charmbracelet/crush)
- [Kiro CLI](https://kiro.dev/cli/)
- [Muse Code](https://dev.meta.ai/products/muse-code)
- [Prime Agent](https://github.com/PrimeIntellect-ai/prime-agent)

An agent that reports its resume command returns in the same session after a restart.

Unrecognized agents still run in panes as plain terminals; prefix a wrapper with `HERDR_AGENT=claude` so Herdr sees the agent.

See: [Agents](https://herdr.dev/tui/docs/agents/#supported-agents)

### Start an agent

```bash
# needs an interactive shell at its prompt; never moves layout
# returns once the agent is ready; timeout defaults to 30000 ms
herdr agent start reviewer --kind codex --pane w1:p2
herdr agent start reviewer --kind codex --pane w1:p2 --timeout 30000
herdr agent start reviewer --kind claude --pane w1:p2 \
  -- --model sonnet
```

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
| `muse` | Muse Code |

Names must match `[a-z][a-z0-9_-]{0,31}` and be unique among live agents.
A name follows the pane occupant and clears when the agent exits.
Targets take a live agent name or its pane ID; bare kinds are rejected.

See: [Agent automation](https://herdr.dev/tui/docs/agent-automation/#agent-identity-and-launch)

### Prompt and wait

```bash
herdr agent prompt reviewer "Review the current diff." --wait
herdr agent prompt reviewer "Ship it" --wait --timeout 120000
herdr agent prompt reviewer "Keep going" --wait --until working
herdr agent wait reviewer --until blocked --timeout 120000
```

`--wait` settles on the first `idle`, `done`, or `blocked` state. `--until`
can be repeated. Submitting to a blocked agent is rejected before input.

Standalone `agent wait` uses the same defaults; `--timeout` bounds it.

See: [Agent automation](https://herdr.dev/tui/docs/agent-automation/#choose-the-control-surface)

### Wait timing

| Situation | Result |
| --- | --- |
| Prompt accepted from a non-working state | Needs `working` or `blocked` within 5 s |
| That 5 s window passes | `agent_prompt_stalled` |
| A caller `--timeout` expires first | `timeout` |

The wait tracks lifecycle state, not one turn: an already-working agent's current turn may satisfy it.

See: [Agent automation](https://herdr.dev/tui/docs/agent-automation/#choose-the-control-surface)

### States

| State | Meaning |
| --- | --- |
| `idle` | Ready for input; seen in the UI |
| `working` | Actively running |
| `blocked` | Needs input, approval, or a decision |
| `done` | Finished; you have not looked at it yet |
| `unknown` | Present, but Herdr cannot classify it |

`done` is the unseen variant of `idle`; focus marks it seen, CLI reads do not.

The sidebar rolls state up: `blocked` marks its pane, tab, and workspace blocked; `working` makes the workspace active; `done` stays visible until viewed.

See: [Agents](https://herdr.dev/tui/docs/agents/#how-status-works)

## Inspect and control

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

`agent get` shows the resolved state. `agent explain` reports detection, the matched rule, and idle fallbacks; add `--json` for machine output. Use `--ansi` when styling is evidence.

See: [CLI reference](https://herdr.dev/tui/docs/cli-reference/#agents)

### Scrollback reads

```bash
herdr agent read reviewer --source recent --lines 200
```

With an idle alternate-screen agent, `--lines` beyond the visible screen scrolls its transcript. While the agent is busy, the read returns `agent_not_idle`.

See: [CLI reference](https://herdr.dev/tui/docs/cli-reference/#agents)

### Keys and focus

```bash
herdr agent send-keys reviewer esc
herdr agent send-keys reviewer ctrl+c
herdr agent focus reviewer
herdr agent rename reviewer reviewer-2
herdr agent rename reviewer --clear
herdr agent attach reviewer --takeover   # another client owns input
```

Herdr validates keys before writing bytes. Inspect a blocked agent with `agent get` and `agent read`. `attach` takes over the terminal; detach with `ctrl+b q`, and send a literal `ctrl+b` as `ctrl+b ctrl+b`.

[Herdr keys cheatsheet](./herdr-keys)

<!-- {: .-crosslink} -->

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

Herdr returns JSON; extract IDs with `jq`, and target a live agent name or explicit pane ID rather than the UI-focused pane.

See: [Agent automation](https://herdr.dev/tui/docs/agent-automation/#recipes)

## Integrations

### Installing integrations

```bash
herdr integration install claude
herdr integration uninstall claude
herdr integration status --outdated-only
```

#### Install values

- `pi`, `omp`, `claude`, `codex`, `copilot`, `devin`, `droid`
- `kimi`, `opencode`, `kilo`, `hermes`, `qodercli`, `qwen`
- `cursor`, `mastracode`, `antigravity-cli`, `grok`, `letta`

Every integration tells Herdr which session the agent is in, so the session resumes after a restart. Turn that off with `[session] resume_agents_on_restore = false`.

Native restore needs current integrations; check `herdr integration status` after upgrading.

See: [Integrations](https://herdr.dev/tui/docs/integrations/)

### State reporting

| Integration | State |
| --- | --- |
| `pi`, `omp`, `kimi`, `opencode`, `kilo`, `mastracode` | Reported by the agent |
| Others | Read from the screen |

Integrations that report state have it used instead of screen detection; the rest rely on the screen.

See: [Integrations](https://herdr.dev/tui/docs/integrations/)
