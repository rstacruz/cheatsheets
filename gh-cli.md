---
title: GitHub CLI
seo_title: GitHub CLI cheatsheet — gh commands and flags
description: "GitHub CLI reference: authenticate, clone repos, create and review pull requests, manage issues, watch Actions runs, and script with --json and gh api."
subtitle: GitHub from the terminal
category: Git
updated: 2026-11-23
last_verified_with: "gh 2.104.0."
tier: t1
fragments:
  - "gh auth login"
  - "gh repo clone"
  - "gh pr create"
  - "--fill"
  - "gh pr checkout"
  - "gh pr checks"
  - "gh pr merge"
  - "--squash"
  - "gh issue create"
  - "gh issue list"
  - "gh run watch"
  - "gh run list"
  - "gh release view"
  - "-p '*.rpm'"
  - "gh search repos"
  - "gh api"
  - "--json"
  - "--jq"
  - "-R cli/cli"
  - "gh alias set"
keywords:
  - GitHub CLI
  - gh
  - pull requests
  - issues
  - GitHub Actions
  - releases
  - gh api
intro: |
  [GitHub CLI](https://cli.github.com) works with pull requests, issues, and
  Actions from the terminal. This reference covers the most-used commands,
  JSON output, and `gh api`.
links:
  - title: GitHub CLI manual
    url: https://cli.github.com/manual/
  - title: Documentation
    url: https://cli.github.com
  - title: GitHub repository
    url: https://github.com/cli/cli
  - title: Installation
    url: https://github.com/cli/cli#installation
---

## Getting started

<!-- {: .-three-column} -->

### Install

```bash
brew install gh
winget install --id GitHub.cli
sudo apt install gh
sudo dnf install gh
```
<!-- {: data-highlight="brew; winget; apt; dnf"} -->

See: [Installation](https://github.com/cli/cli#installation)

### Sign in

```bash
gh auth login
gh auth status
gh auth switch
gh auth setup-git
```
<!-- {: data-highlight="gh auth login; gh auth setup-git"} -->

`gh auth login` walks through a browser or token flow. `setup-git` wires git to use gh as its credential helper.

See: [gh auth login](https://cli.github.com/manual/gh_auth_login)

### Check your queue

```bash
gh status
gh pr status
gh issue status
```
<!-- {: data-highlight="gh status"} -->

`gh status` combines assigned issues and PRs, review requests, mentions, and recent activity.

See: [gh status](https://cli.github.com/manual/gh_status)

## Repositories

<!-- {: .-three-column} -->

### Clone

```bash
gh repo clone cli/cli
```
<!-- {: data-highlight="gh repo clone"} -->

Cloning a fork adds its parent as an `upstream` remote.

See: [gh repo clone](https://cli.github.com/manual/gh_repo_clone)

### Create

```bash
gh repo create my-tool --private \
  --source=. --push
```
<!-- {: data-highlight="gh repo create"} -->

`--source` uses the current directory's git history; `--push` uploads existing commits.

See: [gh repo create](https://cli.github.com/manual/gh_repo_create)

### Fork

```bash
gh repo fork cli/cli --clone
gh repo fork --org my-org \
  --remote
```
<!-- {: data-highlight="gh repo fork"} -->

The fork becomes `origin`; the original repository is added as `upstream`.

See: [gh repo fork](https://cli.github.com/manual/gh_repo_fork)

### View and open

#### Repo details

```bash
gh repo view
gh repo view cli/cli --web
```
<!-- {: data-highlight="gh repo view"} -->

#### Files, issues, and PRs

```bash
gh browse src/main.ts
gh browse 42
gh browse -n 42
```
<!-- {: data-highlight="gh browse"} -->

`gh browse` accepts an issue or PR number, file path, or commit SHA. `-n` prints the URL instead of opening it.

See: [gh browse](https://cli.github.com/manual/gh_browse)

## Pull requests

<!-- {: .-three-column} -->

### Create

```bash
# interactive
gh pr create
```

```bash
# non-interactive
gh pr create --fill --base develop
gh pr create -t "Fix login" -F -
```
<!-- {: data-highlight="gh pr create"} -->

`--fill` uses the commits for the title and body; `-F -` reads the body from stdin.

See: [gh pr create](https://cli.github.com/manual/gh_pr_create)

### List and filter

```bash
gh pr list
gh pr list --author @me \
  --state all
gh pr list --search \
  "review:required"
gh pr list -l bug -L 50
```
<!-- {: data-highlight="gh pr list"} -->

`--search` takes GitHub search syntax; `-l` repeats for multiple labels.

See: [gh pr list](https://cli.github.com/manual/gh_pr_list)

### Inspect and check out

```bash
gh pr view 123
gh pr view 123 --comments
gh pr checkout 123
gh pr diff 123 --name-only
```
<!-- {: data-highlight="gh pr view; gh pr checkout; gh pr diff"} -->

`gh pr checkout` creates a local branch that tracks the PR head.

See: [gh pr checkout](https://cli.github.com/manual/gh_pr_checkout)

### Watch CI checks

```bash
gh pr checks
gh pr checks --watch \
  --fail-fast
gh pr checks --required
```
<!-- {: data-highlight="--watch"} -->

`--watch` refreshes until checks finish; `--required` shows only required checks.

See: [gh pr checks](https://cli.github.com/manual/gh_pr_checks)

### Review and comment

```bash
gh pr review --approve
gh pr review \
  --request-changes -b "Add tests"
gh pr comment -b "LGTM"
gh pr comment --edit-last -F -
```
<!-- {: data-highlight="gh pr review; gh pr comment"} -->

`gh pr review` approves or requests changes; `gh pr comment` leaves a plain comment, and `--edit-last` updates your last one.

See: [gh pr review](https://cli.github.com/manual/gh_pr_review)

### Merge

```bash
gh pr merge --squash \
  --delete-branch
gh pr merge --auto --rebase
gh pr merge 123 --merge
```
<!-- {: data-highlight="gh pr merge"} -->

`--auto` enables auto-merge; if the base branch uses a merge queue, the PR joins it once required checks pass.

See: [gh pr merge](https://cli.github.com/manual/gh_pr_merge)

## Issues

<!-- {: .-three-column} -->

### Create

```bash
gh issue create \
  -t "Login fails" \
  -b "Steps to reproduce"
gh issue create -l bug -a @me
gh issue create --parent 100
```
<!-- {: data-highlight="gh issue create"} -->

`--parent` creates a sub-issue.

See: [gh issue create](https://cli.github.com/manual/gh_issue_create)

### List and filter

```bash
gh issue list
gh issue list -a @me -l bug
gh issue list --search \
  "is:open no:assignee"
gh issue list --state all -L 50
```
<!-- {: data-highlight="gh issue list"} -->

`-a @me` filters to your issues; `--search` takes GitHub search syntax such as `no:assignee`.

See: [gh issue list](https://cli.github.com/manual/gh_issue_list)

### Read and comment

```bash
gh issue view 123 --comments
gh issue comment 123 \
  -b "Fixed in #456"
gh issue view 123 --web
```
<!-- {: data-highlight="gh issue view; gh issue comment"} -->

`--comments` (`-c`) includes the comment thread; `--web` opens the issue.

See: [gh issue view](https://cli.github.com/manual/gh_issue_view)

### Close

```bash
gh issue close 123
gh issue close 123 \
  --reason "not planned"
gh issue close 123 \
  --duplicate-of 456
```
<!-- {: data-highlight="gh issue close"} -->

`--duplicate-of` closes the issue as a duplicate of the one you pass; a `Fixes #123` line in a PR closes it on merge.

See: [gh issue close](https://cli.github.com/manual/gh_issue_close)

## Actions

<!-- {: .-three-column} -->

### List runs

```bash
gh run list
gh run list \
  --workflow ci.yml \
  --status failure
gh run list --branch main \
  --limit 10
```
<!-- {: data-highlight="gh run list"} -->

`--status` also takes `in_progress`, `queued`, and `success`.

See: [gh run list](https://cli.github.com/manual/gh_run_list)

### Watch a run

```bash
gh run watch 123456789
gh run watch --compact \
  --exit-status
```
<!-- {: data-highlight="gh run watch"} -->

`--exit-status` fails the command when the run fails, which suits CI scripts.

See: [gh run watch](https://cli.github.com/manual/gh_run_watch)

### Inspect and rerun

```bash
gh run view 123456789 \
  --log-failed
gh run rerun 123456789 --failed
```
<!-- {: data-highlight="gh run view; gh run rerun"} -->

`--log-failed` prints only failed steps; `--failed` reruns only failed jobs.

See: [gh run view](https://cli.github.com/manual/gh_run_view), [gh run rerun](https://cli.github.com/manual/gh_run_rerun)

### Run a workflow

```bash
gh workflow list
gh workflow run ci.yml
gh workflow run deploy.yml \
  -f environment=staging
gh workflow run deploy.yml \
  --ref my-branch
```
<!-- {: data-highlight="gh workflow run"} -->

`-f` sets a `workflow_dispatch` input; repeat it for more inputs.

See: [gh workflow run](https://cli.github.com/manual/gh_workflow_run)

## Releases

<!-- {: .-three-column} -->

### Create

```bash
gh release create v1.2.0 \
  --generate-notes
gh release create v1.2.0 \
  --draft -F notes.md
gh release create v1.2.0 \
  dist/*.tgz
```
<!-- {: data-highlight="gh release create"} -->

`--generate-notes` writes notes from merged PRs; assets after the tag are uploaded with the release.

See: [gh release create](https://cli.github.com/manual/gh_release_create)

### Download

```bash
gh release download v1.2.0
gh release download \
  --pattern '*.deb'
gh release download v1.2.0 \
  --archive=zip
gh release download \
  -p '*.rpm' -D /tmp
```
<!-- {: data-highlight="gh release download"} -->

Without a tag, pass `--pattern` or `--archive`; gh uses the latest release. `--archive` fetches source, not assets.

See: [gh release download](https://cli.github.com/manual/gh_release_download)

### List and view

```bash
gh release list
gh release view v1.2.0
gh release view v1.2.0 --web
```
<!-- {: data-highlight="gh release view"} -->

See: [gh release view](https://cli.github.com/manual/gh_release_view)

## Search and API

<!-- {: .-three-column} -->

### Search repositories

```bash
gh search repos \
  "static site generator" \
  --language go
gh search repos --owner cli \
  --topic gh-extension
gh search repos "database" \
  --sort stars --limit 10
```
<!-- {: data-highlight="gh search repos"} -->

`--sort` takes `stars`, `forks`, `updated`, or `help-wanted-issues`.

See: [gh search repos](https://cli.github.com/manual/gh_search_repos)

### Search issues and PRs

```bash
gh search issues "panic" \
  --repo cli/cli
gh search prs \
  --review-requested=@me \
  --state=open
gh search prs --draft \
  --author=@me
```
<!-- {: data-highlight="gh search issues; gh search prs"} -->

Both accept a free-text query and field filters such as `--author` and `--state`.

See: [gh search issues](https://cli.github.com/manual/gh_search_issues), [gh search prs](https://cli.github.com/manual/gh_search_prs)

### Call the API

```bash
gh api repos/cli/cli
gh api repos/cli/cli \
  --jq '.stargazers_count'
gh api repos/{owner}/{repo}/issues \
  -f title='Bug'
gh api graphql \
  -f query='{ viewer { login } }'
```
<!-- {: data-highlight="gh api"} -->

`--jq` filters the response; `{owner}` and `{repo}` expand from the current repo. `-f` sends a string and switches to POST, so the `issues` line creates an issue.

See: [gh api](https://cli.github.com/manual/gh_api)

### JSON output

```bash
gh pr list --json \
  number,title,author
gh pr list --json number,title \
  --jq '.[].title'
gh pr list --json number \
  --template \
  '{{range .}}#{{.number}} {{end}}'
```
<!-- {: data-highlight="--json"} -->

`--jq` and `--template` need `--json`; omit the field list to see available fields.

See: [gh help formatting](https://cli.github.com/manual/gh_help_formatting)

## Configuration

<!-- {: .-three-column} -->

### Target another repo

```bash
gh pr list -R cli/cli
gh issue view 42 -R cli/cli
gh release list -R cli/cli
```
<!-- {: data-highlight="-R cli/cli"} -->

`-R` takes `OWNER/REPO` for one command.

See: [gh manual](https://cli.github.com/manual/gh_help_reference)

### Aliases

```bash
gh alias set pv 'pr view'
gh alias set bugs \
  'issue list --label bug'
gh alias set --shell count \
  'gh pr list --json number | jq length'
gh alias list
```
<!-- {: data-highlight="gh alias set"} -->

Shell aliases run through `sh`, so pipes and other commands work.

See: [gh alias set](https://cli.github.com/manual/gh_alias_set)

### Extensions

```bash
gh extension install dlvhdr/gh-dash
gh extension list
gh extension upgrade --all
```
<!-- {: data-highlight="gh extension install"} -->

Extensions add commands that run as `gh <name>`, such as `gh dash`.

See: [gh extension](https://cli.github.com/manual/gh_extension)

### Config

```bash
gh config set editor nvim
gh config set git_protocol ssh
gh config list
```
<!-- {: data-highlight="gh config set"} -->

On Linux, settings live in `~/.config/gh/config.yml`.

See: [gh config](https://cli.github.com/manual/gh_config)

### Environment

```bash
export GH_TOKEN=$(gh auth token)
export GH_REPO=cli/cli
export GH_HOST=github.com
```
<!-- {: data-highlight="GH_TOKEN"} -->

`GH_TOKEN` takes precedence over stored credentials; `GH_REPO` and `GH_HOST` set defaults.

See: [gh help environment](https://cli.github.com/manual/gh_help_environment)
