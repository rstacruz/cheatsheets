---
title: GitHub Actions
subtitle: CI/CD workflow automation
logo: { src: /assets/logos/github.svg, mono: true }
category: Devops
tier: t1
prism_languages: [yaml]
last_verified_with: "GitHub Actions workflow schema, actions/checkout 7.0.1, actions/cache 6.1.0, actions/upload-artifact 7.0.2."
updated: 2026-11-27
fragments:
  - "on: [push]"
  - "dispatch:"
  - "runs-on"
  - "ubuntu-latest"
  - "checkout@v7"
  - "setup-node@v7"
  - "cache@v6"
  - "jobs:"
  - "steps:"
  - "needs: build"
  - "matrix:"
  - "strategy:"
  - "secrets.TOKEN"
  - "matrix.node"
  - "GITHUB_OUTPUT"
  - "permissions:"
keywords: [github actions workflow, workflow_dispatch, runs-on, actions cache, matrix build]
intro: |
  GitHub Actions runs YAML workflows from `.github/workflows` on GitHub-hosted or self-hosted runners. This covers triggers, jobs, steps, secrets, and caching.
links:
  - title: Workflow syntax
    url: https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax
  - title: Events that trigger workflows
    url: https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows
  - title: Contexts
    url: https://docs.github.com/en/actions/reference/workflows-and-actions/contexts
---

## Getting started

### Minimal workflow

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - run: npm ci
      - run: npm test
```

A workflow holds jobs; each job picks a runner and holds steps, run in order.

See: [Workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax)

### Workflow file path

Workflow files live in `.github/workflows/` and end in `.yml` or `.yaml`. Push and PR runs use the file at the event ref; scheduled runs use the default branch copy, and manual runs the selected ref.

See: [About workflows](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows)

### Status badge

```md
![CI](https://github.com/me/app/actions/workflows/ci.yml/badge.svg)
```
<!-- {: data-highlight="badge.svg"} -->

Shows the workflow's latest result. Append `?branch=main` to badge another branch.

See: [Add a status badge](https://docs.github.com/en/actions/how-tos/monitor-workflows/add-a-status-badge)

## Triggers
<!-- {: .-three-column} -->

### Push and pull request

```yaml
on:
  push:
    branches: [main]
  pull_request:
```
<!-- {: data-highlight="push:; pull_request:"} -->

Runs on pushes to `main` and on every pull request. Add `branches` under `pull_request` to limit the target.

See: [on](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#on)

### Manual dispatch

```yaml
on:
  workflow_dispatch:
    inputs:
      level:
        type: choice
        options: [info, debug]
```
<!-- {: data-highlight="workflow_dispatch:"} -->

Adds a Run workflow button to the Actions tab.

See: [workflow_dispatch](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#workflow_dispatch)

### Schedule

```yaml
on:
  schedule:
    - cron: '0 6 * * 1-5'
```
<!-- {: data-highlight="cron: '0 6 * * 1-5'"} -->

Runs at 06:00 UTC on weekdays. The shortest interval is 5 minutes, and the run uses the latest commit on the default branch.

See: [schedule](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule)

### Run on a tag push

```yaml
on:
  push:
    tags: ['v*']
```
<!-- {: data-highlight="tags: ['v*']"} -->

Fires when a matching tag is pushed.

See: [push tags](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#onpushtagstags-ignore)

### Path filters

```yaml
on:
  pull_request:
    paths: ['src/**', 'package.json']
```
<!-- {: data-highlight="paths:"} -->

Only runs when the pull request touches these paths. A skipped required check stays pending and blocks merging.

See: [paths](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#onpushpull_requestpull_request_targetpathspaths-ignore)

### Skip a run

Add `[skip ci]` to a commit message to skip the push and pull request workflows for that commit.

See: [Skipping workflow runs](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/skip-workflow-runs)

## Jobs

### Job dependencies

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: npm run build
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: ./deploy.sh
```
<!-- {: data-highlight="needs: build"} -->

Jobs run in parallel unless `needs` lists an earlier job. The dependent job starts only when that job succeeds.

See: [needs](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idneeds)

### Matrix builds

```yaml
jobs:
  test:
    strategy:
      matrix:
        node: [20, 22, 24]
        os: [ubuntu-latest, macos-latest]
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/setup-node@v7
        with:
          node-version: ${{ matrix.node }}
```
<!-- {: data-highlight="matrix:"} -->

Runs one job per combination, six here. `fail-fast: false` keeps the rest running after one fails.

See: [strategy.matrix](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idstrategymatrix)

### Job outputs

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      tag: ${{ steps.v.outputs.tag }}
    steps:
      - id: v
        run: echo "tag=v1.2.3" >> "$GITHUB_OUTPUT"
  release:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: echo "${{ needs.build.outputs.tag }}"
```
<!-- {: data-highlight="outputs:"} -->

Outputs pass values from a job to the jobs that list it in `needs`.

See: [jobs.outputs](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idoutputs)

### Conditional job

```yaml
jobs:
  deploy:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
```
<!-- {: data-highlight="github.ref"} -->

A job whose `if` is false is skipped, and jobs that need it are skipped too.

See: [jobs.if](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idif)

### Concurrency

```yaml
concurrency:
  group: deploy-${{ github.ref }}
  cancel-in-progress: true
```
<!-- {: data-highlight="cancel-in-progress: true"} -->

Keeps one run per group and cancels the older one, so deploys never stack up.

See: [concurrency](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#concurrency)

## Steps

### Check out code

```yaml
- uses: actions/checkout@v7
  with:
    fetch-depth: 0
```
<!-- {: data-highlight="actions/checkout@v7"} -->

Clones the repository into `GITHUB_WORKSPACE`. `fetch-depth: 0` fetches all history for changelogs and versioning tools.

See: [actions/checkout](https://github.com/actions/checkout)

### Run a command

```yaml
- run: npm ci
- run: npm test -- --coverage
```
<!-- {: data-highlight="run:"} -->

Use `|` for a multi-line script; a non-zero exit fails the step.

See: [steps.run](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idstepsrun)

### Call an action

```yaml
- uses: actions/setup-node@v7
  with:
    node-version: 24
```
<!-- {: data-highlight="uses: actions/setup-node@v7"} -->

`uses` names the action and `with` passes its inputs.

See: [steps.uses](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idstepsuses)

### Step outputs

```yaml
- id: version
  run: echo "tag=v1.2.3" >> "$GITHUB_OUTPUT"
- run: echo "${{ steps.version.outputs.tag }}"
```
<!-- {: data-highlight="steps.version.outputs.tag"} -->

An `id` makes a step's outputs readable by later steps in the job.

See: [Setting an output parameter](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands#setting-an-output-parameter)

### Environment between steps

```yaml
- run: echo "BUILD_ID=42" >> "$GITHUB_ENV"
- run: echo "$BUILD_ID"
```
<!-- {: data-highlight="GITHUB_ENV"} -->

Writing to `$GITHUB_ENV` sets a variable for the rest of the job.

See: [Setting an environment variable](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands#setting-an-environment-variable)

### Artifacts

#### Upload

```yaml
- uses: actions/upload-artifact@v7
  with:
    name: dist
    path: dist/
```
<!-- {: data-highlight="actions/upload-artifact@v7"} -->

#### Download

```yaml
- uses: actions/download-artifact@v8
  with:
    name: dist
    path: dist/
```

Artifacts move files between jobs and attach them to the run; download one by name in a later job.

See: [actions/upload-artifact](https://github.com/actions/upload-artifact)

### Failure handling

```yaml
- run: ./flaky.sh
  continue-on-error: true
  timeout-minutes: 5
```
<!-- {: data-highlight="continue-on-error: true"} -->

`continue-on-error` lets the job pass when the step fails; `timeout-minutes` kills a hung step.

See: [steps.continue-on-error](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idstepscontinue-on-error)

## Environment and secrets

### Variable scopes

```yaml
env:
  NODE_ENV: test
jobs:
  test:
    env:
      CI: true
    steps:
      - run: npm test
        env:
          DEBUG: '1'
```
<!-- {: data-highlight="env:"} -->

Step env beats job env, which beats workflow env. An `env` value cannot reference another one.

See: [env](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#env)

### Secrets

```yaml
- run: ./deploy.sh
  env:
    TOKEN: ${{ secrets.DEPLOY_TOKEN }}
```
<!-- {: data-highlight="secrets.DEPLOY_TOKEN"} -->

Secrets come from repository, environment, or organization settings and are masked in logs. Pass them through `env`, not inline in a command.

See: [Secrets](https://docs.github.com/en/actions/concepts/security/secrets)

### Configuration variables

```yaml
- run: ./deploy.sh
  env:
    API_URL: ${{ vars.API_URL }}
```
<!-- {: data-highlight="vars.API_URL"} -->

`vars` holds non-secret settings and can differ per environment.

See: [vars context](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-variables#using-the-vars-context-to-access-configuration-variable-values)

### Default variables

| Variable | Holds |
| --- | --- |
| `GITHUB_SHA` | Commit that triggered the run |
| `GITHUB_REF_NAME` | Branch or tag name |
| `GITHUB_REPOSITORY` | `owner/repo` |
| `GITHUB_RUN_ID` | Unique run ID |
| `GITHUB_WORKSPACE` | Checkout directory |
| `RUNNER_OS` | `Linux`, `Windows`, or `macOS` |
| `CI` | `true` |
<!-- {: .-headers} -->

GitHub sets these for every step; `${{ github.sha }}` and `$GITHUB_SHA` hold the same value.

See: [Variables reference](https://docs.github.com/en/actions/reference/workflows-and-actions/variables)

### Token permissions

```yaml
permissions:
  contents: read
  pull-requests: write
```
<!-- {: data-highlight="permissions:"} -->

Setting any permission turns all the others off, so `secrets.GITHUB_TOKEN` gets exactly this access.

See: [permissions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#permissions)

## Runners

### Hosted runner labels

| Label | Image |
| --- | --- |
| `ubuntu-latest` | Newest Ubuntu, x64 |
| `ubuntu-26.04` | Ubuntu 26.04, x64 |
| `ubuntu-24.04` | Ubuntu 24.04, x64 |
| `ubuntu-22.04` | Ubuntu 22.04, x64 |
| --- | --- |
| `ubuntu-slim` | 1 CPU, 5 GB RAM |
| `ubuntu-26.04-arm` | Ubuntu 26.04, arm64 |
| --- | --- |
| `windows-latest` | Windows Server 2025, x64 |
| `macos-latest` | Newest macOS, arm64 |
| `macos-15-intel` | macOS 15, x64 |
<!-- {: .-headers} -->

`-latest` tracks the newest image and can change under you; pin the version for reproducibility.

See: [GitHub-hosted runners](https://docs.github.com/en/actions/reference/runners/github-hosted-runners)

### Self-hosted runners

```yaml
runs-on: [self-hosted, linux, x64, gpu]
```
<!-- {: data-highlight="self-hosted"} -->

Matches a runner that carries every label. List `self-hosted` first, though Actions Runner Controller omits that label.

See: [Self-hosted runners](https://docs.github.com/en/actions/concepts/runners/self-hosted-runners)

### Runner groups

```yaml
runs-on:
  group: my-runners
  labels: [linux]
```
<!-- {: data-highlight="group:"} -->

Targets any runner in the group that also has the labels.

See: [Runner groups](https://docs.github.com/en/actions/concepts/runners/runner-groups)

### Container jobs

```yaml
container:
  image: node:24
  options: --cpus 1
```
<!-- {: data-highlight="image: node:24"} -->

Runs the steps inside the container on a Linux runner. The default shell becomes `sh`.

See: [jobs.container](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idcontainer)

### Service containers

```yaml
services:
  postgres:
    image: postgres:17
    env:
      POSTGRES_PASSWORD: postgres
    ports: ['5432:5432']
```
<!-- {: data-highlight="services:"} -->

Services share a network with the job. A container job reaches `postgres` by name; a runner job uses `localhost:5432`.

See: [jobs.services](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idservices)

## Caching

### Cache with a setup action

```yaml
- uses: actions/setup-node@v7
  with:
    node-version: 24
    cache: pnpm
```
<!-- {: data-highlight="cache: pnpm"} -->

The `setup-*` actions cache their package manager when given `cache`. `setup-python`, `setup-java`, `setup-go`, and `setup-ruby` work the same way.

See: [setup-node caching](https://github.com/actions/setup-node#caching-global-packages-data)

### actions/cache

```yaml
- uses: actions/cache@v6
  with:
    path: ~/.npm
    key: npm-${{ hashFiles('package-lock.json') }}
    restore-keys: npm-
```
<!-- {: data-highlight="actions/cache@v6"} -->

A miss saves a new cache when the job succeeds; an exact hit skips the save.

See: [actions/cache](https://github.com/actions/cache)

### Restore keys

```yaml
key: npm-${{ hashFiles('package-lock.json') }}
restore-keys: |
  npm-
  node-
```
<!-- {: data-highlight="restore-keys:"} -->

On a key miss, each restore key is tried in order and the newest prefix match wins.

See: [Cache key matching](https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching#cache-key-matching)

## Conditions

### Step conditions

```yaml
- if: github.event_name == 'push'
  run: ./deploy.sh
```
<!-- {: data-highlight="if:"} -->

Step `if` is evaluated when the step is reached, so it sees contexts and earlier step outputs, not shell variables.

See: [Evaluate expressions](https://docs.github.com/en/actions/reference/workflows-and-actions/expressions)

### Status functions

```yaml
- if: always()
  run: ./report.sh
- if: failure()
  run: ./alert.sh
```
<!-- {: data-highlight="always(); failure()"} -->

`success()` is the default. `always()` runs even after a failure, and `failure()` only after one.

See: [Status check functions](https://docs.github.com/en/actions/reference/workflows-and-actions/expressions#status-check-functions)

### Contexts

| Context | Holds |
| --- | --- |
| `github` | Event, ref, actor, and SHA |
| `env` | Workflow, job, and step env |
| `vars` | Repository configuration variables |
| --- | --- |
| `secrets` | Encrypted secrets |
| `matrix` | Current matrix values |
| `inputs` | Dispatch and `workflow_call` inputs |
| --- | --- |
| `needs` | Outputs from dependency jobs |
| `steps` | Outputs from earlier steps |
| `runner` | OS, architecture, temp directory |
<!-- {: .-headers} -->

Wrap a context as `${{ }}`; inside `if`, the wrapper is optional.

See: [Contexts reference](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts)

## Reusable workflows

### Call a workflow

```yaml
jobs:
  ci:
    uses: ./.github/workflows/ci.yml
```
<!-- {: data-highlight="uses: ./.github/workflows/ci.yml"} -->

`./` calls the file at the same commit as the caller. Use `owner/repo/...@ref` for another repository.

See: [Reuse workflows](https://docs.github.com/en/actions/how-tos/reuse-automations/reuse-workflows)

### Define inputs

```yaml
on:
  workflow_call:
    inputs:
      node:
        type: number
        default: 24
```
<!-- {: data-highlight="workflow_call:"} -->

A called workflow declares `workflow_call` inputs and reads them from the `inputs` context.

See: [workflow_call inputs](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#onworkflow_callinputs)

### Pass inputs and secrets

```yaml
jobs:
  ci:
    uses: octo-org/ci/.github/workflows/node.yml@v1
    with:
      node: 24
    secrets: inherit
```
<!-- {: data-highlight="with:; secrets: inherit"} -->

`with` passes inputs, and `secrets: inherit` forwards every secret the caller can see.

See: [jobs.uses](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_iduses)

### Composite action

#### action.yml

```yaml
runs:
  using: composite
  steps:
    - run: npm ci
      shell: bash
```
<!-- {: data-highlight="using: composite"} -->

#### Workflow

```yaml
- uses: ./.github/actions/setup
```

A local composite action bundles steps; every `run` step needs `shell`.

See: [Create a composite action](https://docs.github.com/en/actions/tutorials/create-actions/create-a-composite-action)

## Security

### Pin third-party actions

```yaml
# Pin to a full commit SHA
- uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1
```
<!-- {: data-highlight="3d3c42e5aac5ba805825da76410c181273ba90b1"} -->

A tag can move; a full SHA cannot. Read the SHA from the action's release page.

See: [Using third-party actions](https://docs.github.com/en/actions/reference/security/secure-use#using-third-party-actions)

### Least-privilege token

```yaml
permissions: {}
jobs:
  release:
    permissions:
      contents: write
```
<!-- {: data-highlight="permissions: {}"} -->

Start with no permissions and grant them per job, so a compromised action cannot push.

See: [Secure use](https://docs.github.com/en/actions/reference/security/secure-use)

### Avoid pull_request_target with forks

`pull_request_target` runs with a write token and repository secrets. Never check out a fork's head and run its code in that workflow; use `pull_request` for untrusted code.

See: [pull_request_target](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#pull_request_target)

## Troubleshooting

### Enable debug logging

Set the repository secret `ACTIONS_STEP_DEBUG` to `true` for step debug logs. `ACTIONS_RUNNER_DEBUG` adds runner diagnostics.

See: [Enable debug logging](https://docs.github.com/en/actions/how-tos/monitor-workflows/enable-debug-logging)

### Job summaries

```yaml
- run: |
    echo "### Results" >> "$GITHUB_STEP_SUMMARY"
    echo "- 42 passed" >> "$GITHUB_STEP_SUMMARY"
```
<!-- {: data-highlight="$GITHUB_STEP_SUMMARY"} -->

Writes Markdown to the run's summary tab. Keep it to a few lines.

See: [Job summaries](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands#adding-a-job-summary)

### Inspect a run

```bash
# list recent runs for a workflow
gh run list --workflow=ci.yml
```

```bash
# print only the failed step logs
gh run view "$RUN_ID" --log-failed
```
<!-- {: data-highlight="--log-failed"} -->

List runs to get a run ID, then view only the failed step logs.

See: [gh run](https://cli.github.com/manual/gh_run)

### Common failures

| Symptom | Cause |
| --- | --- |
| Manual or scheduled workflow missing | File is not on the default branch |
| `Resource not accessible by integration` | `GITHUB_TOKEN` lacks the permission |
| Cache never hits | Key includes `github.run_id` |
| No Run workflow button | File is only on a feature branch |
<!-- {: .-headers} -->

See: [Troubleshooting](https://docs.github.com/en/actions/how-tos/troubleshoot-workflows)

## Also see

- [GitHub CLI cheatsheet](./gh-cli)
- [Git cheatsheet](./git)
- [YAML cheatsheet](./yaml)
