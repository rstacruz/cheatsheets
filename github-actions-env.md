---
title: How to set environment variables in GitHub Actions
link_title: Set env variables
subtitle: Env, secrets, and GITHUB_ENV
category: Devops
layout: snippet
last_verified_with: "GitHub Actions workflow schema."
updated: 2026-11-27
links:
  - title: env
    url: https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#env
  - title: Store information in variables
    url: https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-variables
---

## Setting variables
<!-- {: .-snippets} -->

### Set a workflow variable
<!-- {: .-snippet} -->

```yaml
env:
  NODE_ENV: test
```
<!-- {: data-highlight="NODE_ENV: test"} -->

**Applies to every job.** An `env` value cannot reference another `env` value. See [env](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#env).

### Scope it to a job or step
<!-- {: .-snippet} -->

```yaml
jobs:
  test:
    env:
      CI: true
    steps:
      - run: npm test
        env:
          DEBUG: '1'
```
<!-- {: data-highlight="DEBUG: '1'"} -->

**More specific wins.** Step env beats job env, which beats workflow env. See [env](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#env).

### Read it in a step
<!-- {: .-snippet} -->

```yaml
- run: echo "$NODE_ENV"
```
<!-- {: data-highlight="$NODE_ENV"} -->

**Uses shell syntax.** Runner variables work in `run`; use `${{ env.NODE_ENV }}` in `if` and `with`. See [env context](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#env-context).

### Pass a secret
<!-- {: .-snippet} -->

```yaml
- run: ./deploy.sh
  env:
    TOKEN: ${{ secrets.DEPLOY_TOKEN }}
```
<!-- {: data-highlight="secrets.DEPLOY_TOKEN"} -->

**Maps a secret to a variable.** Secrets are masked in logs; pass them through `env`, not inline in the command. See [secrets](https://docs.github.com/en/actions/concepts/security/secrets).

### Export from a step
<!-- {: .-snippet} -->

```yaml
- run: echo "BUILD_ID=42" >> "$GITHUB_ENV"
- run: echo "$BUILD_ID"
```
<!-- {: data-highlight="GITHUB_ENV"} -->

**Sets a variable for later steps.** The value applies to the rest of the job only. See [GITHUB_ENV](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands#setting-an-environment-variable).

### Use a repository variable
<!-- {: .-snippet} -->

```yaml
- run: ./deploy.sh
  env:
    API_URL: ${{ vars.API_URL }}
```
<!-- {: data-highlight="vars.API_URL"} -->

**Reads non-secret config.** Repository, organization, and environment settings all land in `vars`. See [vars context](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#vars-context).
