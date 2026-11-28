---
title: Heroku
subtitle: Cloud application hosting platform
logo: { src: /assets/logos/heroku.svg, mono: true }
category: Devops
created_at: 2012-03-16
updated: 2026-11-25
tier: t3
last_verified_with: "Heroku CLI 11.14.0."
description: |
  A one-page reference to common Heroku CLI commands.
intro: |
  [Heroku](https://heroku.com/) is a web hosting platform supporting many languages. This guide is a reference to the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli-commands).
links:
  - title: Heroku
    url: https://www.heroku.com/
---

## Apps

### `login` - Log in

```bash
heroku login
heroku auth:whoami      # show the logged-in user
```
<!-- {: data-highlight="heroku login"} -->

See: [heroku auth:login](https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-auth-login)

### `create` - Create an app

```bash
heroku create sushi
```
<!-- {: data-highlight="heroku create"} -->

#### Deploy
```bash
git push heroku main
```
<!-- {: data-highlight="git push heroku main"} -->

Creates an app and adds a `heroku` git remote. Push a branch to deploy. ([docs](https://devcenter.heroku.com/articles/creating-apps))

See: [heroku apps:create](https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-apps-create-app)

### `git:remote` - Link an existing repo

```bash
heroku git:remote -a sushi
```
<!-- {: data-highlight="heroku git:remote"} -->

Adds the `heroku` remote to a repo that wasn't created by `heroku create`.

See: [heroku git:remote](https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-git-remote)

### `apps` - Applications

```bash
heroku apps                  # list
heroku apps:info
heroku open                  # open in browser
heroku apps:rename NEWNAME
heroku apps:destroy -a APP --confirm APP
```
<!-- {: data-highlight="heroku apps"} -->

See: [heroku apps](https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-apps)

### `access` - Collaboration

#### Manage collaborators

```bash
heroku access                     # list
heroku access:add me@xy.com
heroku access:remove me@xy.com
```
<!-- {: data-highlight="access:add; access:remove"} -->

#### Transfer to another owner

```bash
heroku apps:transfer new@owner.com
```
<!-- {: data-highlight="apps:transfer"} -->

See: [heroku access](https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-access)

## Deploy

### `container` - Docker containers

```bash
heroku create sushi --stack container
heroku container:login
heroku container:push web -a sushi
heroku container:release web -a sushi
```
<!-- {: data-highlight="container:push; container:release"} -->

Containers deploy via the Heroku Container Registry. ([docs](https://devcenter.heroku.com/articles/container-registry-and-runtime))

See: [heroku container:push](https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-container-push)

### `releases` - Releases and rollbacks

```bash
heroku releases
heroku releases:info v25
heroku releases:rollback v24   # roll back to v24
```
<!-- {: data-highlight="releases:rollback"} -->

See: [heroku releases](https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-releases)

## Processes

### `ps` - Managing processes

```bash
heroku ps                        # list dynos
heroku ps:scale web=1            # scale a process type
heroku ps:scale web=2:Standard-2X
heroku ps:restart                # restart all dynos
heroku ps:exec                   # SSH into a dyno
```
<!-- {: data-highlight="ps:scale; ps:exec"} -->

See: [heroku ps](https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-ps-type-type)

### `run` - Running tasks

```bash
heroku run bash
heroku run rails console
heroku run rake assets:precompile
```
<!-- {: data-highlight="heroku run"} -->

See: [heroku run](https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-run)

### `logs` - Show logs

```bash
heroku logs
heroku logs -t        # --tail (stream)
heroku logs -s app    # --source (app logs only)
heroku logs -p web    # --process-type
```
<!-- {: data-highlight="logs -t; logs -s app; logs -p web"} -->

See: [heroku logs](https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-logs)

### `maintenance` - Maintenance mode

```bash
heroku maintenance:on
heroku maintenance:off
```
<!-- {: data-highlight="maintenance:on; maintenance:off"} -->

See: [heroku maintenance](https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-maintenance)

## Database

### `pg` - Create a database

```bash
heroku addons:create heroku-postgresql:essential-0
heroku pg:info
```
<!-- {: data-highlight="heroku addons:create"} -->

`addons:create` takes a `SERVICE:PLAN` argument; `addons:add` still works as a hidden alias.

See: [heroku pg:info](https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-pg-info-database)

### `pg:backups` - Backups

```bash
heroku pg:backups:capture
heroku pg:backups:schedule DATABASE_URL --at '02:00 UTC'
heroku pg:backups
```
<!-- {: data-highlight="pg:backups:capture; pg:backups:schedule"} -->

Manual and scheduled backups are built into Heroku Postgres. ([docs](https://devcenter.heroku.com/articles/heroku-postgres-backups))

See: [heroku pg:backups](https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-pg-backups)

## Configuration

### `config` - Environment variables

```bash
heroku config        # list
heroku config -s     # shell format
heroku config:get KEY
heroku config:set KEY=val
heroku config:set KEY1=val KEY2=val
heroku config:unset KEY1
```
<!-- {: data-highlight="config:get; config:set; config:unset"} -->

See: [heroku config](https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-config)

### `domains` - Custom domains

```bash
heroku domains:add example.com
heroku domains:add www.example.com
heroku domains:remove example.com
heroku domains:clear
```
<!-- {: data-highlight="domains:add; domains:remove; domains:clear"} -->

#### Wildcard domains

```bash
heroku domains:add '*.example.com'
```
<!-- {: data-highlight="'*.example.com'"} -->

Wildcard domains are supported natively; no add-on is needed. ([docs](https://devcenter.heroku.com/articles/custom-domains))

See: [heroku domains](https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-domains)

## Local development

### `local` - Run the Procfile

```bash
heroku local              # run the Procfile
heroku local web          # one process type
```
<!-- {: data-highlight="heroku local"} -->

Reads config vars from `.env` (change with `-e`).

See: [heroku local](https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-local-processname)

### `local:run` - Run a command

```bash
heroku local:run bin/migrate
```
<!-- {: data-highlight="local:run"} -->

See: [heroku local:run](https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-local-run)

## References

- [Heroku CLI commands](https://devcenter.heroku.com/articles/heroku-cli-commands) _(devcenter.heroku.com)_
- [Heroku Dev Center](https://devcenter.heroku.com/) _(devcenter.heroku.com)_
