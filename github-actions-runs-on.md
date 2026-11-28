---
title: How to choose a runner in GitHub Actions
link_title: Choose a runner
subtitle: Hosted and self-hosted labels
category: Devops
layout: snippet
last_verified_with: "GitHub Actions runner images, ubuntu 24.04 and macos 15 labels."
updated: 2026-11-28
links:
  - title: GitHub-hosted runners
    url: https://docs.github.com/en/actions/reference/runners/github-hosted-runners
  - title: Self-hosted runners
    url: https://docs.github.com/en/actions/concepts/runners/self-hosted-runners
---

## Picking a runner
<!-- {: .-snippets} -->

### Pick a hosted runner
<!-- {: .-snippet} -->

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
```
<!-- {: data-highlight="runs-on: ubuntu-latest"} -->

**Runs on GitHub's Ubuntu image.** Free and unlimited on public repositories, and metered on private ones. See [GitHub-hosted runners](https://docs.github.com/en/actions/reference/runners/github-hosted-runners).

### Pin the image version
<!-- {: .-snippet} -->

```yaml
runs-on: ubuntu-24.04
```
<!-- {: data-highlight="ubuntu-24.04"} -->

**Pins the image version.** The `-latest` label moves as GitHub promotes new images, while a versioned label stays put. See [runner images](https://github.com/actions/runner-images).

### Choose an architecture
<!-- {: .-snippet} -->

```yaml
runs-on: ubuntu-24.04-arm
```
<!-- {: data-highlight="ubuntu-24.04-arm"} -->

**Runs on arm64.** Useful for Apple Silicon parity and ARM container builds. See [arm64 runners](https://docs.github.com/en/actions/reference/runners/github-hosted-runners#supported-runners-and-hardware-resources).

### Run across several runners
<!-- {: .-snippet} -->

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, macos-latest]
runs-on: ${{ matrix.os }}
```
<!-- {: data-highlight="${{ matrix.os }}"} -->

**Runs once per runner.** A matrix expands the job across each combination of labels you list. See [matrix](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idstrategymatrix).

### Target a self-hosted runner
<!-- {: .-snippet} -->

```yaml
runs-on: [self-hosted, linux, x64]
```
<!-- {: data-highlight="[self-hosted, linux, x64]"} -->

**Matches every label.** List `self-hosted` first; Actions Runner Controller omits that label. See [self-hosted runners](https://docs.github.com/en/actions/how-tos/manage-runners/self-hosted-runners/use-in-a-workflow).

### Use a runner group
<!-- {: .-snippet} -->

```yaml
runs-on:
  group: my-runners
  labels: [gpu]
```
<!-- {: data-highlight="group:"} -->

**Limits the job.** The runner must belong to the group and carry the listed labels. See [runner groups](https://docs.github.com/en/actions/concepts/runners/runner-groups).
