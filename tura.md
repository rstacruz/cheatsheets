---
title: Tura
category: AI
updated: 2026-07-16
keywords:
  - Coding agent
  - CLI
  - Local-first
  - Provider routing
  - Session management
---

## Getting started
{: .-three-column}

### Introduction
{: .-intro}

[Tura](https://turaai.net/) is an open-source, local-first coding agent with interactive and scriptable terminal clients. It supports multiple model providers, persistent sessions, and per-run model and shell overrides.

- [Documentation](https://github.com/Tura-AI/tura/tree/main/docs) _(github.com)_
- [GitHub repository](https://github.com/Tura-AI/tura) _(github.com)_

### Installation

```bash
# Install from npm
npm install -g tura-ai

# Verify the CLI
tura --help
```

### Provider setup

```bash
# List configured providers
tura provider list

# Start a provider login flow
tura provider login codex

# Print the login URL without opening a browser
tura provider login openai --no-open
```

## Core usage
{: .-three-column}

### Interactive client
{: .-prime}

```bash
# Open the interactive terminal UI
tura

# Open a specific workspace
tura --cwd /path/to/project

# Use Chinese interface text
tura --lang zh-CN
```

### Run a prompt

```bash
# Run a non-interactive prompt
tura run "Inspect the workspace and summarize the architecture"

# Select a model for one request
tura run --model openai/gpt-5 "Fix the failing tests"

# Increase the timeout for a longer task
tura run --timeout 1200 "Run the release verifier"
```

### Rust CLI front

```bash
# Run the script-friendly CLI front in a workspace
tura exec --cwd . --model openai/gpt-5 "Inspect the workspace"

# Suppress progress written to stderr
tura exec --quiet "Return only the final answer"

# Keep working until the goal is marked done or needs a question
tura exec --goal "Fix and verify the failing tests"
```

## Runtime controls
{: .-three-column}

### Shell surface

```bash
# Force Bash command tools
tura bash "Inspect the shell scripts"

# Force Zsh command tools
tura zsh "Inspect the startup files"

# Force the system shell-command surface
tura shel "Inspect the workspace"
```

### Common run options

| Option                 | Description             |
| ---------------------- | ----------------------- |
| `--session ID`         | Continue a session      |
| `-m, --model MODEL`    | Override the model      |
| `-a, --agent-id ID`    | Select an agent         |
| `-p, --priority`       | Enable priority routing |
| `--output FORMAT`      | Use text, JSON, or JSONL |
| `--stream`             | Stream gateway events   |
| `--no-stream`          | Poll for completion     |
| `--timeout SECONDS`    | Set the turn timeout    |
| `-c, --config K=V`     | Set a runtime override  |

### Structured output

```bash
# Stream newline-delimited JSON events
tura run --output ndjson "Fix the failing test"

# Emit JSONL events from the Rust CLI front
echo "Summarize the architecture" | tura exec --json

# Write the final assistant message to a file
tura exec --output-last-message result.md "Review this repository"
```

## Sessions and agents
{: .-three-column}

### Sessions

```bash
# List sessions as JSON
tura session list --json

# Show a session
tura session show SESSION_ID --json

# Resume the latest session with a follow-up prompt
tura resume --last "Continue and verify the result"

# Abort a running session
tura session abort SESSION_ID --json
```

### Agents

```bash
# List configured agents
tura agent list --json

# Inspect an agent
tura agent show AGENT_ID --json

# Set an agent's model
tura agent model AGENT_ID openai/gpt-5 --reasoning high

# Use an agent for one request
tura run --agent-id AGENT_ID "Review the current changes"
```

### Configuration

```bash
# Read all workspace session configuration
tura config get

# Update one or more values
tura config set model=openai/gpt-5 planning=on

# Inspect the default model tiers
tura config model-tiers --json
```

## Shell completion
{: .-three-column}

### Bash

```bash
tura completion bash > ~/.local/share/bash-completion/completions/tura
```

### Zsh

```bash
tura completion zsh > "${fpath[1]}/_tura"
```

### Fish

```bash
tura completion fish > ~/.config/fish/completions/tura.fish
```

## Also see
{: .-one-column}

- [Tura documentation](https://github.com/Tura-AI/tura/tree/main/docs) _(github.com)_
- [Tura website](https://turaai.net/) _(turaai.net)_
- [Tura releases](https://github.com/Tura-AI/tura/releases) _(github.com)_
