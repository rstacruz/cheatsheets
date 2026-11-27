---
title: GitLab CLI
seo_title: GitLab CLI cheatsheet — glab commands and flags
description: "GitLab CLI reference: authenticate, clone projects, open merge requests, triage issues, watch CI/CD pipelines, and script with glab api and jq."
subtitle: GitLab from the terminal
logo: { set: logos, name: gitlab-icon }
category: Git
updated: 2026-11-25
last_verified_with: "glab 1.130.0."
tier: t1
fragments:
  - "glab auth login"
  - "glab mr create"
  - "glab repo clone"
  - "--related-issue"
  - "glab ci status"
  - "--fill"
  - "glab issue list"
  - "--draft"
  - "glab ci trace"
  - "--masked"
  - "glab ci lint"
  - "--paginate"
  - "glab api"
  - "--jq"
  - "glab alias set"
  - "--asset-name"
  - "GITLAB_TOKEN"
  - "--notes-file"
  - "--squash"
  - "-R group/proj"
keywords:
  - GitLab CLI
  - glab
  - merge requests
  - GitLab CI
  - pipelines
  - issues
  - releases
  - glab api
intro: |
  [GitLab CLI](https://gitlab.com/gitlab-org/cli) works with merge requests,
  issues, and CI/CD from the terminal. This reference covers the most-used
  commands, JSON output, and `glab api`.
links:
  - title: GitLab CLI documentation
    url: https://docs.gitlab.com/cli/
  - title: GitLab CLI repository
    url: https://gitlab.com/gitlab-org/cli
  - title: Installation options
    url: https://gitlab.com/gitlab-org/cli/-/blob/main/docs/installation_options.md
  - title: REST API
    url: https://docs.gitlab.com/api/rest/
---

## Getting started
<!-- {: .-three-column} -->

### Install

```bash
brew install glab
winget install glab.glab
sudo snap install glab
sudo dnf install glab
```
<!-- {: data-highlight="brew; winget; snap; dnf"} -->

Homebrew is the only officially supported package manager; the rest come from the community.

See: [Installation options](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/installation_options.md)

### Sign in

```bash
glab auth login
glab auth status
glab auth status --show-token
```
<!-- {: data-highlight="glab auth login"} -->

`auth login` walks through OAuth or a token and stores it in the OS keyring when one is available, falling back to the plaintext config file; `--stdin` reads a token from a pipe.

See: [Authenticate with GitLab](https://docs.gitlab.com/cli/authentication/)

### Self-managed GitLab

```bash
glab auth login \
  --hostname gitlab.example.com
glab config set -g host gitlab.example.com
```
<!-- {: data-highlight="--hostname"} -->

`config set -g host` makes it your default host. `GITLAB_HOST` overrides the host for a single command.

See: [Connect to your instance](https://docs.gitlab.com/cli/connection/)

### To-dos

```bash
glab todo list
glab todo list --action=assigned
glab todo list --state done
glab todo done --all
```
<!-- {: data-highlight="glab todo list"} -->

To-dos collect assignments, mentions, and failed pipelines. `--action` filters by reason, `--state done` lists cleared ones, and `todo done --all` clears them.

See: [glab todo list](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/todo/list.md)

## Projects
<!-- {: .-three-column} -->

### Clone

```bash
glab repo clone group/project
glab repo clone group/project mydir
```
<!-- {: data-highlight="glab repo clone"} -->

A fork you own gets an `upstream` remote. Flags after `--` go to `git clone`.

See: [glab repo clone](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/repo/clone.md)

### Clone a group

```bash
glab repo clone -g mygroup --paginate
glab repo clone -g mygroup \
  --archived=false --paginate
```
<!-- {: data-highlight="-g mygroup"} -->

`--paginate` clones every project in the group; `--archived=false` skips archived ones.

See: [glab repo clone](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/repo/clone.md)

### Create

```bash
glab repo create
glab repo create my-project --private
glab repo create --group mygroup
```
<!-- {: data-highlight="glab repo create"} -->

`--internal` and `--public` set visibility; without one, the instance default applies. `--skipGitInit` skips `git init` and cloning.

See: [glab repo create](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/repo/create.md)

### Fork

```bash
glab repo fork group/project --clone
glab repo fork --remote
```
<!-- {: data-highlight="glab repo fork"} -->

Without `--clone` or `--remote`, forking prompts.

See: [glab repo fork](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/repo/fork.md)

### View and list

#### View

```bash
glab repo view
glab repo view group/project --web
```
<!-- {: data-highlight="glab repo view"} -->

#### List

```bash
glab repo list -m
glab repo list -g mygroup \
  --include-subgroups
```
<!-- {: data-highlight="glab repo list"} -->

`-m` lists projects you own; `--member` widens that to every project you belong to.

See: [glab repo list](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/repo/list.md)

### Archive

```bash
glab repo archive group/project
glab repo archive group/project \
  --format=tar.gz
```
<!-- {: data-highlight="glab repo archive"} -->

Downloads the repository's source as a zip; `--format` picks another archive type.

See: [glab repo archive](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/repo/archive.md)

### Prune

```bash
glab repo prune --dry-run
glab repo prune --yes
```
<!-- {: data-highlight="glab repo prune"} -->

`prune` deletes local branches whose merge requests merged; `--merged` checks with Git instead of the API, but only detects fast-forward merges.

See: [glab repo prune](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/repo/prune.md)

## Merge requests
<!-- {: .-three-column} -->

### Create

#### Interactive

```bash
glab mr create
```
<!-- {: data-highlight="glab mr create"} -->

#### Non-interactive

```bash
glab mr create --fill --yes
glab mr create -t "Fix login" \
  -d "Closes #42"
```
<!-- {: data-highlight="--fill"} -->

#### From an issue

```bash
glab mr create --related-issue 34
glab mr create --related-issue 34 \
  --draft
```
<!-- {: data-highlight="--related-issue"} -->

`--fill` takes the title and description from commits and pushes the branch; `--push=false` skips the push. `--related-issue` reuses the issue title.

See: [glab mr create](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/mr/create.md)

### List and filter

```bash
glab mr list
glab mr list --assignee=@me \
  --reviewer=@me
glab mr list --label bug --merged
```
<!-- {: data-highlight="--assignee=@me; --reviewer=@me; --merged"} -->

`--closed` and `--merged` narrow the state; `--all` widens it past open requests.

See: [glab mr list](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/mr/list.md)

### Inspect and check out

#### View

```bash
glab mr view 123 --comments
glab mr view 123 --web
```
<!-- {: data-highlight="glab mr view"} -->

#### Check out

```bash
glab mr checkout 123
glab mr checkout 123 \
  --worktree ../review-123
```
<!-- {: data-highlight="--worktree"} -->

#### Diff

```bash
glab mr diff 123 --raw
```
<!-- {: data-highlight="--raw"} -->

`--worktree` checks out beside your changes instead of replacing them; `--raw` prints a patch for `git apply`.

See: [glab mr checkout](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/mr/checkout.md), [glab mr diff](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/mr/diff.md)

### Review

#### Approve

```bash
glab mr approve 123
glab mr approve 123 --sha abc123
```
<!-- {: data-highlight="--sha"} -->

#### Comment

```bash
glab mr note create 123 -m "LGTM"
glab mr note create 123 -m "Rename this" \
  --file src/app.ts --line 42
```
<!-- {: data-highlight="--file src/app.ts"} -->

`--sha` refuses unless the merge request's HEAD matches; `--file` and `--line` leave a comment on the diff. The `note` subcommands are experimental in glab 1.130.

See: [glab mr approve](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/mr/approve.md), [glab mr note](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/mr/note/_index.md)

### Discussions

#### List

```bash
glab mr note list 123 \
  --state unresolved
```
<!-- {: data-highlight="--state unresolved"} -->

#### Resolve

```bash
glab mr note resolve 123 abc12345
```
<!-- {: data-highlight="glab mr note resolve"} -->

The merge request comes first, then the discussion ID or an 8-character prefix; `note list` shows the threads.

See: [glab mr note](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/mr/note/_index.md)

### Merge

```bash
glab mr merge 123 --squash --yes
glab mr merge 123 --rebase
glab mr merge 123 --remove-source-branch
```
<!-- {: data-highlight="glab mr merge"} -->

While a pipeline runs, `merge` enables auto-merge; pass `--auto-merge=false` to merge immediately.

See: [glab mr merge](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/mr/merge.md)

### Close and reopen

```bash
glab mr close 123
glab mr reopen 123
```
<!-- {: data-highlight="glab mr close; glab mr reopen"} -->

Closing keeps the source branch; `mr list --all` includes closed merge requests.

See: [glab mr close](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/mr/close.md)

## Issues
<!-- {: .-three-column} -->

### Create

```bash
glab issue create \
  -t "Login fails" \
  -d "Steps to reproduce"
glab issue create -t "Bug" -l bug
glab issue create -t "Security" -c
```
<!-- {: data-highlight="glab issue create"} -->

`-c` marks the issue confidential; `--template bug` starts from `.gitlab/issue_templates/`; `--description-file -` reads the body from stdin.

See: [glab issue create](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/issue/create.md)

### List and filter

```bash
glab issue list
glab issue list -a @me -l bug
glab issue list --search "timeout" \
  --in title
```
<!-- {: data-highlight="-a @me; -l bug; --in title"} -->

`@none` and `@any` filter unassigned or assigned issues; `--all` includes closed ones.

See: [glab issue list](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/issue/list.md)

### Read and comment

#### View

```bash
glab issue view 123 --comments
glab issue view 123 --web
```
<!-- {: data-highlight="glab issue view"} -->

#### Comment

```bash
glab issue note 123 -m "Fixed in !456"
glab issue note 123 -m "Rotating now" \
  --internal
```
<!-- {: data-highlight="--internal"} -->

`--internal` keeps the note visible to project members only.

See: [glab issue view](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/issue/view.md), [glab issue note](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/issue/note.md)

### Close and reopen

```bash
glab issue close 123
glab issue reopen 123
```
<!-- {: data-highlight="glab issue close; glab issue reopen"} -->

A merge request description containing `Closes #123` closes the issue on merge.

See: [glab issue close](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/issue/close.md)

### Board

```bash
glab issue board view
glab issue board create "Sprint 12"
```
<!-- {: data-highlight="glab issue board view"} -->

`board view` is an interactive kanban board with assignee and label filters.

See: [glab issue board](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/issue/board/_index.md)

## Pipelines
<!-- {: .-three-column} -->

### List

```bash
glab ci list
glab ci list --status=failed
glab ci list --ref main \
  --per-page 10
```
<!-- {: data-highlight="glab ci list"} -->

`--source merge_request_event` filters to merge request pipelines; `--scope running` shows active ones.

See: [glab ci list](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/ci/list.md)

### Status

```bash
glab ci status
glab ci status --live
glab ci status --wait --compact
```
<!-- {: data-highlight="--live; --wait"} -->

Reports the current branch's pipeline. `--live` redraws until it ends; `--wait` returns when it does, without redrawing.

See: [glab ci status](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/ci/status.md)

### View

```bash
glab ci view
glab ci view main
glab ci view --web
```
<!-- {: data-highlight="glab ci view"} -->

In the TUI, Enter opens a job's log, `Ctrl+R` runs or retries, `Ctrl+D` cancels, and `Ctrl+Q` quits.

See: [glab ci view](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/ci/view.md)

### Run

```bash
glab ci run --branch main
glab ci run --mr
glab ci run --variables STAGE:staging
```
<!-- {: data-highlight="glab ci run"} -->

`--variables` passes CI variables, repeatable or comma-separated. `--mr` runs a merge request pipeline.

See: [glab ci run](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/ci/run.md)

### Lint

```bash
glab ci lint
glab ci lint --dry-run --ref main
```
<!-- {: data-highlight="--dry-run"} -->

`--dry-run` simulates pipeline creation, resolving `include:` and rules; `--include-jobs` lists the jobs it would produce.

See: [glab ci lint](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/ci/lint.md)

### CI variables

```bash
glab variable set API_KEY "s3cret42" \
  --masked --protected
glab variable set KUBECONFIG \
  "$(cat kubeconfig)" --type file
glab variable list
```
<!-- {: data-highlight="--masked; --protected"} -->

`--masked` hides the value in job logs; `--protected` limits it to protected branches. `-g mygroup` sets a group variable.

See: [glab variable set](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/variable/set.md)

## Jobs
<!-- {: .-three-column} -->

### Trace

```bash
glab ci trace
glab ci trace lint
glab ci trace 224356863 \
  --pipeline-id 42
```
<!-- {: data-highlight="glab ci trace"} -->

Without a job, `trace` prompts from the current branch. The log streams while the job runs.

See: [glab ci trace](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/ci/trace.md)

### Retry and cancel

```bash
glab ci retry lint
glab ci cancel job 1504182795
glab ci cancel pipeline 42
```
<!-- {: data-highlight="glab ci retry; glab ci cancel"} -->

`retry` takes a job name or ID; `cancel` takes `job <id>` or `pipeline <id>`. `--dry-run` previews a job cancel.

See: [glab ci retry](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/ci/retry.md), [glab ci cancel](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/ci/cancel/_index.md)

### Artifacts

```bash
glab job artifact main build
glab job artifact main build \
  --path dist/
glab job artifact \
  refs/merge-requests/123/head build
```
<!-- {: data-highlight="glab job artifact"} -->

The ref is a branch, tag, or `refs/merge-requests/<iid>/head`. `--list-paths` prints what was fetched.

See: [glab job artifact](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/job/artifact.md)

## Releases
<!-- {: .-three-column} -->

### Create

```bash
glab release create v1.2.0 \
  --notes "First stable"
glab release create v1.2.0 \
  --notes-file CHANGELOG.md
glab release create v1.2.0 \
  --ref main --tag-message "v1.2.0"
```
<!-- {: data-highlight="glab release create"} -->

A missing tag is created from the default branch unless `--ref` names another commit. An existing release is updated, not duplicated.

See: [glab release create](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/release/create.md)

### Upload assets

```bash
glab release upload v1.2.0 dist/*.tgz
glab release upload v1.2.0 \
  'logo.png#Logo#image'
```
<!-- {: data-highlight="glab release upload"} -->

Append `#Display name` and `#type` to a path to control how the asset is listed. `release create` also accepts files after the tag.

See: [glab release upload](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/release/upload.md)

### Download

```bash
glab release download
glab release download v1.2.0 \
  --asset-name '*.tar.gz'
glab release download v1.2.0 \
  --dir /tmp --clobber
```
<!-- {: data-highlight="glab release download"} -->

Without a tag it takes the latest release; `--skip-existing` fetches only missing files.

See: [glab release download](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/release/download.md)

### List and view

```bash
glab release list
glab release view v1.2.0 --web
```
<!-- {: data-highlight="glab release view"} -->

Without a tag, `release view` shows the latest release; `--web` opens it in the browser.

See: [glab release list](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/release/list.md), [glab release view](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/release/view.md)

## API and JSON
<!-- {: .-three-column} -->

### Call the API

```bash
glab api projects/:fullpath
glab api projects/:fullpath/issues
glab api projects/gitlab-org%2Fcli
```
<!-- {: data-highlight=":fullpath"} -->

`:fullpath` expands from the current project. A path written by hand needs its slash encoded as `%2F`.

See: [glab api](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/api/_index.md)

### Send a request

```bash
glab api --method POST \
  projects/:fullpath/issues \
  -f title="Bug"
glab api --method PUT \
  projects/:fullpath/issues/42 \
  -f state_event=close
```
<!-- {: data-highlight="--method POST; --method PUT"} -->

`-f` sends a string; `-F` converts booleans, numbers, and JSON arrays. A field makes the request a POST, so a GET with params needs an explicit method.

See: [REST API](https://docs.gitlab.com/api/rest/)

### GraphQL

```bash
glab api graphql \
  -f query='{ currentUser { username } }'
```
<!-- {: data-highlight="graphql"} -->

The `query` field holds the document; any other field becomes a GraphQL variable. Paginated queries need an `$endCursor` variable.

See: [GraphQL API](https://docs.gitlab.com/api/graphql/)

### Paginate

```bash
glab api issues --paginate
glab api issues --paginate \
  --output ndjson \
  | jq 'select(.state == "opened")'
```
<!-- {: data-highlight="--paginate"} -->

`--output ndjson` prints one object per line, which streams straight into `jq`.

See: [Pagination](https://docs.gitlab.com/api/rest/#pagination)

### JSON output

```bash
glab mr list -F json --jq '.[].title'
glab issue list -O json \
  | jq -r '.[].iid'
```
<!-- {: data-highlight="-F json; -O json"} -->

Both print JSON: `mr list` with `-F json`, `issue list` with `-O json`. In `glab api`, `-F` is an input field instead.

See: [glab mr list](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/mr/list.md)

## Configuration
<!-- {: .-three-column} -->

### Target another project

```bash
glab mr list -R group/project
glab issue view 42 -R group/project
glab release list -R group/project
```
<!-- {: data-highlight="-R group/project"} -->

`-R` accepts `GROUP/PROJECT`, a subgroup path, or a full URL, for one command only.

See: [glab mr](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/mr/_index.md)

### Aliases

```bash
glab alias set pv 'mr view'
glab alias set createissue \
  'issue create --title "$1"'
glab alias set --shell igrep \
  'glab issue list | grep "$1"'
glab alias list
```
<!-- {: data-highlight="glab alias set"} -->

`$1` and `$2` expand arguments. `--shell` runs the alias through `sh`, so pipes work and `$@` expands to all arguments.

See: [glab alias set](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/alias/set.md)

### Config

```bash
glab config set -g editor nvim
glab config set -g host gitlab.example.com
glab config get -g host
glab config path
```
<!-- {: data-highlight="glab config set"} -->

`-g` writes the global file; without it the setting goes to `.git/glab-cli/config.yml` for this repository. `config edit` opens the global file; add `--local` for the repository file.

See: [glab config set](https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/config/set.md)

### Environment

```bash
export GITLAB_TOKEN=glpat-xxxxxxxxxxxx
export GITLAB_HOST=gitlab.example.com
export GLAB_NO_PROMPT=true
export GLAB_CHECK_UPDATE=false
```
<!-- {: data-highlight="GITLAB_TOKEN"} -->

`GITLAB_TOKEN` beats the stored token; `GITLAB_HOST` picks the instance. Most config keys have a matching variable.

See: [Environment variables](https://docs.gitlab.com/cli/configuration/#environment-variables)
