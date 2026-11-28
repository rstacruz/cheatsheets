---
title: Claude Code commands
subtitle: Slash command reference
logo: { src: /assets/logos/claude.svg }
category: Agents
updated: 2026-11-18
last_verified_at: 2026-11-18
last_verified_with: "Claude Code slash commands from the official commands reference."
tier: t1
fragments:
  - "/claude-api"
  - "CLAUDE.md"
  - "/ultrareview"
  - "/code-review"
  - "--fix"
  - "/subtask <task>"
  - "/permissions"
  - "/compact"
  - "/resume"
  - "/fork"
  - "/tasks"
  - "/background"
  - "/memory"
  - "/mcp"
  - "/model"
  - "/status"
  - "/skills"
  - "/team-onboarding"
keywords:
  - Slash commands
  - Commands
  - Review
  - Settings
  - Permissions
intro: |
  [Claude Code](https://code.claude.com/docs/en/commands) is Anthropic's AI coding agent for the terminal. This sheet lists every slash command it accepts.
links:
  - title: Commands
    url: https://code.claude.com/docs/en/commands
  - title: Interactive mode
    url: https://code.claude.com/docs/en/interactive-mode
  - title: Skills
    url: https://code.claude.com/docs/en/skills
---

## Slash commands

<!-- {: .-two-column} -->

### Conversation

| Command    | Description                     |
| ---------- | ------------------------------- |
| `/help`    | Show commands and shortcuts     |
| `/clear`   | Start with empty context        |
| `/compact` | Summarize to free context       |
| `/context` | Show context-window usage       |
| `/copy`    | Copy the last response          |
| `/btw`     | Ask a side question             |
| ---------- | ------------------------------- |
| `/recap`   | Summarize the session           |
| `/rename`  | Rename the session              |
| `/color`   | Set the prompt bar color        |
| `/exit`    | Exit the CLI (`/quit`)          |
| `/stop`    | Stop the attached session       |

See: [Commands](https://code.claude.com/docs/en/commands)

### Planning

| Command   | Description                        |
| --------- | ---------------------------------- |
| `/plan`   | Enter plan mode                    |
| `/goal`   | Work until a condition is met      |
| `/branch` | Branch the conversation here       |

Plan mode writes a plan before it edits. See: [Permission modes](https://code.claude.com/docs/en/permission-modes)

### History

| Command   | Description                     |
| --------- | ------------------------------- |
| `/resume` | Resume a previous conversation  |
| `/rewind` | Restore code and conversation   |
| `/export` | Export the conversation as text |

`/resume` opens the picker; pass an ID or name to skip it. See: [Checkpointing](https://code.claude.com/docs/en/checkpointing)

## Review and background

<!-- {: .-two-column} -->

### Review

| Command            | Description                       |
| ------------------ | --------------------------------- |
| `/diff`            | Review working-tree changes       |
| `/code-review`     | Review the diff, a PR, or a path  |
| `/review`          | Alias of `/code-review`           |
| `/security-review` | Scan changes for vulnerabilities  |
| `/simplify`        | Apply cleanup findings            |
| `/ultrareview`     | Deep multi-agent cloud review     |
| `/autofix-pr`      | Watch a PR and push fixes         |

`/code-review` also takes an effort level and `--fix`. See: [Review locally with /code-review](https://code.claude.com/docs/en/code-review-local)

### Background work

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `/background`     | Detach this session as an agent    |
| `/fork`           | Copy it into a background session  |
| `/subtask <task>` | Run a task in a forked subagent    |
| `/tasks`          | Show background work               |
| ----------------- | ---------------------------------- |
| `/batch`          | Fan work across worktrees          |
| `/loop`           | Repeat a prompt on a schedule      |
| `/schedule`       | Manage cloud scheduled tasks       |
| `/workflows`      | Watch running workflows            |

See: [Agent view](https://code.claude.com/docs/en/agent-view)

## Settings and usage

<!-- {: .-two-column} -->

### Usage

| Command                | Description                     |
| ---------------------- | ------------------------------- |
| `/status`              | Show version, model, account    |
| `/usage`               | Show cost and plan limits       |
| `/cost`                | Alias of `/usage`               |
| `/stats`               | Alias of `/usage`, stats tab    |
| `/insights`            | Analyze your recent sessions    |
| ---------------------- | ------------------------------- |
| `/release-notes`       | Browse the changelog            |
| `/rate-limit-options`  | Options when a limit hits       |
| `/usage-credits`       | Configure usage credits         |
| `/upgrade`             | Upgrade your plan               |
| `/passes`              | Share a free week               |

See: [Costs](https://code.claude.com/docs/en/costs)

### Settings

| Command            | Description                     |
| ------------------ | ------------------------------- |
| `/config`          | Open settings or set a value    |
| `/model`           | Switch the AI model             |
| `/effort`          | Set reasoning effort            |
| `/fast`            | Toggle fast mode                |
| `/advisor`         | Enable the advisor tool         |
| `/autocompact`     | Set the auto-compact window     |
| ------------------ | ------------------------------- |
| `/output-style`    | Switch output styles            |
| `/theme`           | Change the color theme          |
| `/tui`             | Pick the terminal renderer      |
| `/focus`           | Toggle the focus view           |
| `/statusline`      | Configure the status line       |
| `/keybindings`     | Edit keyboard shortcuts         |
| `/terminal-setup`  | Install a Shift+Enter binding   |
| `/scroll-speed`    | Adjust mouse scroll speed       |
| `/voice`           | Toggle voice dictation          |
| `/sandbox`         | Toggle sandbox mode             |

See: [Settings](https://code.claude.com/docs/en/settings)

### Account

| Command             | Description                    |
| ------------------- | ------------------------------ |
| `/login`            | Sign in                        |
| `/logout`           | Sign out                       |
| `/privacy-settings` | View privacy settings          |
| `/feedback`         | Send feedback                  |
| `/bug`              | Report a bug with context      |
| ------------------- | ------------------------------ |
| `/mobile`           | Show the mobile app QR code    |
| `/desktop`          | Continue in the Desktop app    |
| `/teleport`         | Pull a cloud session down      |
| `/remote-env`       | Pick a cloud environment       |
| `/restart`          | Restart and resume the session |

See: [Commands](https://code.claude.com/docs/en/commands)

## Project and integrations

<!-- {: .-two-column} -->

### Project

#### Files and memory

| Command        | Description                     |
| -------------- | ------------------------------- |
| `/init`        | Generate a starter CLAUDE.md    |
| `/memory`      | Edit memory files               |
| `/add-dir`     | Add a working directory         |
| `/cd`          | Move the session directory      |
| `/permissions` | Allow, ask, and deny rules      |
| `/hooks`       | View hook configurations        |

#### Extensions

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `/mcp`            | Manage MCP connections         |
| `/plugin`         | Manage plugins                 |
| `/reload-plugins` | Apply plugin changes           |
| ----------------- | ------------------------------ |
| `/agents`         | Create or manage subagents     |
| `/skills`         | List and filter skills         |
| `/reload-skills`  | Rescan skill directories       |
| `/doctor`         | Run a setup checkup            |
| `/debug`          | Diagnose runtime issues        |
| `/import`         | Import another agent's setup   |
| `/ide`            | Manage IDE integrations        |
| `/chrome`         | Configure Chrome integration   |

See: [Memory](https://code.claude.com/docs/en/memory)

### Integrations

| Command               | Description                       |
| --------------------- | --------------------------------- |
| `/install-github-app` | Install the Claude GitHub App     |
| `/install-slack-app`  | Install the Claude Slack app      |
| `/web-setup`          | Connect GitHub for cloud sessions |
| `/remote-control`     | Control from claude.ai            |
| --------------------- | --------------------------------- |
| `/setup-bedrock`      | Configure Amazon Bedrock          |
| `/setup-vertex`       | Configure Google Cloud            |
| `/team-onboarding`    | Generate a team onboarding guide  |
| `/list-agents`        | List messageable sessions         |

See: [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web)

### Bundled skills

| Command                     | Description                    |
| --------------------------- | ------------------------------ |
| `/run`                      | Launch and drive your app      |
| `/verify`                   | Prove a change works           |
| `/run-skill-generator`      | Teach `/run` your project      |
| `/deep-research`            | Research with cited sources    |
| `/dataviz`                  | Design charts and dashboards   |
| `/design`                   | Draft UI artboards             |
| --------------------------- | ------------------------------ |
| `/slides`                   | Build a presentation           |
| `/claude-api`               | Load Claude API reference      |
| `/claude-in-chrome`         | Drive a task in the browser    |
| `/update-config`            | Apply a settings change        |
| `/fewer-permission-prompts` | Build an allowlist             |
| `/artifacts`                | List and attach artifacts      |

Type `/` to see every skill your install ships. See: [Skills](https://code.claude.com/docs/en/skills)

## Also see

<!-- {: .-one-column} -->

- [Claude Code cheatsheet](./claude-code)
- [Commands](https://code.claude.com/docs/en/commands) _(code.claude.com)_
- [Skills](https://code.claude.com/docs/en/skills) _(code.claude.com)_
- [Interactive mode](https://code.claude.com/docs/en/interactive-mode) _(code.claude.com)_
- [Agent view](https://code.claude.com/docs/en/agent-view) _(code.claude.com)_
