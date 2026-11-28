---
title: How to use an action in GitHub Actions
link_title: Use an action
subtitle: Call, pin, and reuse actions
category: Devops
layout: snippet
last_verified_with: "actions/setup-node 7.1.0, actions/checkout 7.0.1, codeql-action 4."
updated: 2026-11-28
links:
  - title: steps.uses
    url: https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idstepsuses
---

## Calling actions
<!-- {: .-snippets} -->

### Call a published action
<!-- {: .-snippet} -->

```yaml
- uses: actions/setup-node@v7
  with:
    node-version: 24
```
<!-- {: data-highlight="uses: actions/setup-node@v7"} -->

**Runs an action with inputs.** `with` passes named inputs; the action's README lists them. See [steps.uses](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idstepsuses).

### Pin the version
<!-- {: .-snippet} -->

```yaml
- uses: actions/checkout@v7
```
<!-- {: data-highlight="@v7"} -->

**Tracks a major version.** `@v7` picks up patches; pin a full commit SHA for third-party actions. See [secure use](https://docs.github.com/en/actions/reference/security/secure-use#using-third-party-actions).

### Call an action in a subdirectory
<!-- {: .-snippet} -->

```yaml
- uses: github/codeql-action/upload-sarif@v4
```
<!-- {: data-highlight="upload-sarif"} -->

**Points at a subdirectory action.** The path between the repo and `@ref` selects the action folder. See [steps.uses](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idstepsuses).

### Call a local action
<!-- {: .-snippet} -->

```yaml
- uses: ./.github/actions/setup
```
<!-- {: data-highlight="./.github/actions/setup"} -->

**Runs a local action.** It comes from your repository. The folder holds an `action.yml`, and the repo must be checked out first. See [Local actions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idstepsuses).

### Run a Docker image
<!-- {: .-snippet} -->

```yaml
- uses: docker://alpine:3.21
  with:
    args: echo hello
```
<!-- {: data-highlight="docker://alpine:3.21"} -->

**Runs a Docker image.** It runs as a step. `args` and `entrypoint` control what it executes. See [Docker actions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idstepsuses).

### Read the action's outputs
<!-- {: .-snippet} -->

```yaml
- id: build
  uses: docker/build-push-action@v7
- run: echo ${{ steps.build.outputs.digest }}
```
<!-- {: data-highlight="steps.build.outputs.digest"} -->

**Reads outputs through `steps`.** An `id` on the `uses` step exposes whatever the action writes. See [Contexts](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#steps-context).
