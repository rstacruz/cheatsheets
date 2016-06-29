---
title: Heroku
category: Devops
---

### `create` - Create an app

    heroku create sushi

### `access` - Collaboration

    # Manage collaborators
      heroku access                     # List
      heroku access:add me@xy.com
      heroku access:remove me@xy.com

    # Transfer to another owner
      heroku sharing:transfer new@owner.com

### `logs` - Show logs

    heroku logs
    heroku logs -t      # --tail (stream)
    heroku logs -s app  # --source (only on app logs)

### `releases`

    heroku releases
    heroku releases:info v25
    heroku rollback

### `pg` - Postgresql

    # Start a database
      heroku addons:add heroku-postgresql
      heroku pg:promote HEROKU_POSTGRESQL_PURPLE_URL

    # Enable backups
      heroku addons:add pgbackups:auto-month

### `ps` - Managing processes

    heroku ps              # list
    heroku ps:scale web=1  # spawn more dynos

### `restart`

    heroku restart

### `run` - Running

    heroku run bash
    heroku run console                  # Rails console
    heroku run rake assets:precompile

### `config` - Environment var configuration

    heroku config        # List
    heroku config -s     # List in shell format

    heroku config:get KEY

    heroku config:set KEY=val
    heroku config:set KEY1=val KEY2=val ...

    heroku config:unset KEY1

### `apps` - Applications

    heroku apps                  # list
    heroku apps:create [NAME]
    heroku apps:destroy --app APP
    heroku apps:info
    heroku apps:open             # open in browser
    heroku apps:rename NEWNAME

### `maintenance`

    heroku maintenance:on
    heroku maintenance:off

### `domains` - Custom domains

    # Add both!
      heroku domains:add example.com
      heroku domains:add www.example.com

    # Removing:
      heroku domains:clear
      heroku domains:remove example.com

### Wildcard domains

    heroku addons:add wildcard_domains

    *.yourdomain.com => heroku.com

### htpasswd (for PHP apps)

Create an `.htaccess` file in the webroot:

    AuthUserFile /app/www/.htpasswd
    AuthType Basic
    AuthName "Restricted Access"
    Require valid-user

Create a `.htpasswd` file:

    $ htpasswd -c .htpasswd [username]

See https://gist.github.com/3316425

### References:

 * https://addons.heroku.com/
 * https://devcenter.heroku.com/
 * https://devcenter.heroku.com/articles/custom-domains
 * https://devcenter.heroku.com/articles/heroku-postgresql
