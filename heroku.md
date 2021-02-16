---
title: Heroku
category: Devops
layout: 2017/sheet
updated: 2017-10-11
description: |
  A one-page reference to common Heroku-CLI commands.
intro: |
  [Heroku](http://heroku.com/) is a web hosting platform supporting many languages, and this guide is a reference to Heroku's [command-line interface](http://heroku.com/).
---

### `create` - Create an app

```bash
heroku create sushi
```

```bash
git push heroku master
```

### `access` - Collaboration

#### Manage collaborators

```bash
heroku access                     # List
heroku access:add me@xy.com
heroku access:remove me@xy.com
```

#### Transfer to another owner

```bash
heroku apps:transfer new@owner.com
```

### `logs` - Show logs

```bash
heroku logs
heroku logs -t      # --tail (stream)
heroku logs -s app  # --source (only on app logs)
```

### `releases`

```bash
heroku releases
heroku releases:info v25
heroku rollback
```

### `pg` - PostgreSQL

#### Start a database

```bash
heroku addons:add heroku-postgresql
```

#### Enable backups

```bash
heroku addons:add pgbackups:auto-month
```

See: [Heroku PostgreSQL](https://devcenter.heroku.com/articles/heroku-postgresql) _(devcenter.heroku.com)_

### `config` - Environment var configuration

#### Listing

```bash
heroku config        # List
heroku config -s     # List in shell format
```

#### Getting

```bash
heroku config:get KEY
```

#### Setting

```bash
heroku config:set KEY=val
heroku config:set KEY1=val KEY2=val ...
```

```bash
heroku config:unset KEY1
```

### `apps` - Applications

```bash
heroku apps                  # list
heroku apps:create [NAME]
heroku apps:destroy --app APP
heroku apps:info
heroku apps:open             # open in browser
heroku apps:rename NEWNAME
```

### `maintenance`

```bash
heroku maintenance:on
```

```bash
heroku maintenance:off
```

## Processes


### `ps` - Managing processes

```bash
heroku ps              # list
heroku ps:scale web=1  # spawn more dynos
```

### `restart`

```bash
heroku restart
```

### `run` - Running tasks

```bash
heroku run bash
heroku run console                  # Rails console
heroku run rake assets:precompile
```

## Domains

### `domains` - Custom domains

#### Add both!

```bash
heroku domains:add example.com
heroku domains:add www.example.com
```

#### Removing

```bash
heroku domains:clear
heroku domains:remove example.com
```

See: [Custom domains](https://devcenter.heroku.com/articles/custom-domains) _(devcenter.heroku.com)_

### Wildcard domains

```bash
heroku addons:add wildcard_domains
```

```bash
*.yourdomain.com => heroku.com
```

## Other tricks

### htpasswd (for PHP apps)

Create an `.htaccess` file in the webroot:

```bash
AuthUserFile /app/www/.htpasswd
AuthType Basic
AuthName "Restricted Access"
Require valid-user
```

Create a `.htpasswd` file:

```bash
$ htpasswd -c .htpasswd [username]
```

See: [gist.github.com](https://gist.github.com/3316425)

## References

 * <https://addons.heroku.com/>
 * <https://devcenter.heroku.com/>
