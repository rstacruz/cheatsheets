---
title: How to trigger a GitHub Actions workflow manually
link_title: Manual workflow trigger
subtitle: Add a Run workflow button
category: Devops
layout: snippet
last_verified_with: "GitHub Actions workflow schema, gh 2.104.0."
updated: 2026-11-27
links:
  - title: workflow_dispatch
    url: https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#workflow_dispatch
  - title: gh workflow run
    url: https://cli.github.com/manual/gh_workflow_run
---

## Triggering by hand
<!-- {: .-snippets} -->

### Add a manual trigger
<!-- {: .-snippet} -->

```yaml
on:
  workflow_dispatch:
```
<!-- {: data-highlight="workflow_dispatch:"} -->

**Adds a Run workflow button.** The button only appears once the file is on the default branch; a dispatch run uses the workflow file at the selected ref. See [workflow_dispatch](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#workflow_dispatch).

### Add inputs
<!-- {: .-snippet} -->

```yaml
on:
  workflow_dispatch:
    inputs:
      level:
        type: choice
        options: [info, debug]
```
<!-- {: data-highlight="inputs:"} -->

**Prompts for values before the run.** Types are `string`, `choice`, `boolean`, `number`, and `environment`; `choice` needs `options`. See [inputs](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#onworkflow_dispatchinputs).

### Read the inputs
<!-- {: .-snippet} -->

```yaml
- run: echo "${{ inputs.level }}"
```
<!-- {: data-highlight="inputs.level"} -->

**Reads an input in a step.** `inputs` keeps booleans as booleans; `github.event.inputs` converts everything to strings. See [inputs context](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#inputs-context).

### Trigger from the CLI
<!-- {: .-snippet} -->

```bash
gh workflow run ci.yml -f level=debug
```
<!-- {: data-highlight="-f level=debug"} -->

**Starts a run from your terminal.** `-f` passes an input; add `--ref` to run another branch. See [gh workflow run](https://cli.github.com/manual/gh_workflow_run).

### Wait for the run
<!-- {: .-snippet} -->

```bash
# get the ID from gh run list
gh run watch --compact "$RUN_ID"
```
<!-- {: data-highlight="gh run watch"} -->

**Watches a run until it finishes.** Without an ID, the command prompts for an in-progress run. See [gh run watch](https://cli.github.com/manual/gh_run_watch).
