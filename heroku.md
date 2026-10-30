---
title: Heroku
category: Devops
updated: 2026-10-30
description: |
  A one-page reference to common Heroku CLI commands.
intro: |
  [Heroku](https://heroku.com/) is a web hosting platform supporting many languages. This guide is a reference to the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli-commands).
---

## Apps

### `login` - Log in

```bash
heroku login
heroku auth:whoami      # show the logged-in user
```

### `create` - Create an app

```bash
heroku create sushi
```

```bash
git push heroku main
```

Creates an app and adds a `heroku` git remote. Push a branch to deploy. ([docs](https://devcenter.heroku.com/articles/creating-apps))

### `git:remote` - Link an existing repo

```bash
heroku git:remote -a sushi
```

Adds the `heroku` remote to a repo that wasn't created by `heroku create`.

### `apps` - Applications

```bash
heroku apps                  # list
heroku apps:info
heroku open                  # open in browser
heroku apps:rename NEWNAME
heroku apps:destroy -a APP --confirm APP
```

### `access` - Collaboration

#### Manage collaborators

```bash
heroku access                     # list
heroku access:add me@xy.com
heroku access:remove me@xy.com
```

#### Transfer to another owner

```bash
heroku apps:transfer new@owner.com
```

## Deploy

### `container` - Docker containers

```bash
heroku create sushi --stack container
heroku container:login
heroku container:push web -a sushi
heroku container:release web -a sushi
```

Containers deploy via the Heroku Container Registry. ([docs](https://devcenter.heroku.com/articles/container-registry-and-runtime))

### `releases` - Releases and rollbacks

```bash
heroku releases
heroku releases:info v25
heroku releases:rollback v24   # roll back to v24
```

## Processes

### `ps` - Managing processes

```bash
heroku ps                        # list dynos
heroku ps:scale web=1            # scale a process type
heroku ps:scale web=2:Standard-2X
heroku ps:restart                # restart all dynos
heroku ps:exec                   # SSH into a dyno
```

### `run` - Running tasks

```bash
heroku run bash
heroku run rails console
heroku run rake assets:precompile
```

### `logs` - Show logs

```bash
heroku logs
heroku logs -t        # --tail (stream)
heroku logs -s app    # --source (app logs only)
heroku logs -p web    # --process-type
```

### `maintenance` - Maintenance mode

```bash
heroku maintenance:on
heroku maintenance:off
```

## Database

### `pg` - PostgreSQL

#### Create a database

```bash
heroku addons:create heroku-postgresql:essential-0
heroku pg:info
```

`addons:create` takes a `SERVICE:PLAN` argument; `addons:add` still works as a hidden alias.

#### Backups

```bash
heroku pg:backups:capture
heroku pg:backups:schedule DATABASE_URL --at '02:00 UTC'
heroku pg:backups
```

Manual and scheduled backups are built into Heroku Postgres. ([docs](https://devcenter.heroku.com/articles/heroku-postgres-backups))

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

### `domains` - Custom domains

```bash
heroku domains:add example.com
heroku domains:add www.example.com
heroku domains:remove example.com
heroku domains:clear
```

#### Wildcard domains

```bash
heroku domains:add '*.example.com'
```

Wildcard domains are supported natively; no add-on is needed. ([docs](https://devcenter.heroku.com/articles/custom-domains))

## Local development

### `local` - Run locally

```bash
heroku local              # run the Procfile
heroku local web          # one process type
heroku local:run bin/migrate
```

`heroku local` reads config vars from `.env` (change with `-e`).

## References

- [Heroku CLI commands](https://devcenter.heroku.com/articles/heroku-cli-commands) _(devcenter.heroku.com)_
- [Heroku Dev Center](https://devcenter.heroku.com/) _(devcenter.heroku.com)_
